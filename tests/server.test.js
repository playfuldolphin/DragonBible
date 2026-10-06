const { test } = require("node:test");
const assert = require("node:assert/strict");
const { createApp } = require("../server");
function fixtures() {
  const env = {
    DOMAIN: "https://dragonbible.com",
    ACCESS_TOKEN_SECRET: "test-secret-that-is-at-least-32-characters",
    STRIPE_PRICE_MONTHLY: "price_monthly",
    STRIPE_PRICE_LIFETIME: "price_lifetime",
    STRIPE_WEBHOOK_SECRET: "webhook-test",
  };
  const state = {
    status: "active",
    refunded: 0,
    price: 500,
    calls: 0,
    session: {
      id: "cs_test_paid",
      payment_status: "paid",
      customer: "cus_test",
      subscription: "sub_test",
      payment_intent: "pi_test",
      metadata: { planType: "monthly" },
      currency: "usd",
      amount_total: 500,
    },
  };
  const stripe = {
    prices: {
      retrieve: async () => ({
        active: true,
        currency: "usd",
        unit_amount: state.price,
        recurring: { interval: "month", interval_count: 1 },
      }),
    },
    checkout: {
      sessions: {
        create: async (args) => {
          state.checkout = args;
          return { url: "https://checkout.stripe.com/test" };
        },
        retrieve: async () => state.session,
        listLineItems: async () => ({
          data: [
            {
              quantity: 1,
              price: { id: `price_${state.session.metadata.planType}` },
            },
          ],
        }),
      },
    },
    subscriptions: { retrieve: async () => ({ status: state.status }) },
    paymentIntents: {
      retrieve: async () => ({
        status: "succeeded",
        latest_charge: { amount_refunded: state.refunded, disputed: false },
      }),
    },
    billingPortal: {
      sessions: {
        create: async (args) => {
          state.portal = args;
          return { url: "https://billing.stripe.com/test" };
        },
      },
    },
    webhooks: {
      constructEvent: (body) => {
        assert.ok(Buffer.isBuffer(body));
        return {};
      },
    },
  };
  const anthropic = {
    messages: {
      create: async () => {
        state.calls++;
        if (state.fail) throw new Error("provider unavailable");
        return { content: [{ type: "text", text: "Lore answer" }] };
      },
    },
  };
  return { env, stripe, anthropic, state };
}
async function serve(t, options) {
  const server = createApp(options).listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  t.after(
    () =>
      new Promise((resolve) => {
        server.closeAllConnections();
        server.close(resolve);
      }),
  );
  return async (url, data, token, extraHeaders = {}) => {
    const response = await fetch(
      `http://127.0.0.1:${server.address().port}${url}`,
      {
        method: data === undefined ? "GET" : "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...extraHeaders,
        },
        ...(data === undefined ? {} : { body: JSON.stringify(data) }),
      },
    );
    return {
      status: response.status,
      data: await response.json().catch(() => null),
    };
  };
}
test("server starts without credentials, serves the library, and disables checkout", async (t) => {
  const request = await serve(t, { env: {}, stripe: null, anthropic: null });
  assert.equal((await request("/api/config")).data.plans.monthly, false);
  assert.equal(
    (await request("/api/create-checkout-session", { planType: "monthly" }))
      .status,
    503,
  );
  assert.equal(
    (await request("/api/oracle", { question: "Who are the Watchers?" }))
      .status,
    503,
  );
  assert.equal((await request("/server.js")).status, 404);
  assert.equal((await request("/.env")).status, 404);
  assert.equal((await request("/")).status, 200);
});
test("checkout uses server prices and return URLs, rejects mismatched prices", async (t) => {
  const f = fixtures(),
    request = await serve(t, f);
  assert.equal(
    (
      await request("/api/create-checkout-session", {
        planType: "monthly",
        priceId: "attacker_price",
        successUrl: "https://example.com",
      })
    ).status,
    200,
  );
  assert.equal(f.state.checkout.line_items[0].price, "price_monthly");
  assert.equal(
    f.state.checkout.success_url,
    "https://dragonbible.com/success.html?session_id={CHECKOUT_SESSION_ID}",
  );
  f.state.price = 999;
  assert.equal(
    (await request("/api/create-checkout-session", { planType: "monthly" }))
      .status,
    503,
  );
  assert.equal(
    (await request("/api/create-checkout-session", { planType: "__proto__" }))
      .status,
    400,
  );
  assert.equal(
    (
      await request(
        "/api/create-checkout-session",
        { planType: "monthly" },
        null,
        { Origin: "https://example.com" },
      )
    ).status,
    403,
  );
});
test("verified purchases authorize access and portal, raw customer IDs do not", async (t) => {
  const f = fixtures(),
    request = await serve(t, f);
  assert.equal(
    (await request("/api/create-portal-session", { customerId: "cus_test" }))
      .status,
    401,
  );
  const verify = await request("/api/verify-session/cs_test_paid");
  assert.equal(verify.status, 200);
  const token = verify.data.token;
  assert.equal(
    (await request("/api/subscription", undefined, token)).data.active,
    true,
  );
  assert.equal(
    (await request("/api/subscription", undefined, token + "bad")).data.active,
    false,
  );
  assert.equal(
    (
      await request(
        "/api/create-portal-session",
        { customerId: "cus_wrong", returnUrl: "https://example.com" },
        token,
      )
    ).status,
    200,
  );
  assert.deepEqual(f.state.portal, {
    customer: "cus_test",
    return_url: "https://dragonbible.com/index.html#pricing",
  });
  f.state.status = "canceled";
  assert.equal(
    (await request("/api/subscription", undefined, token)).data.active,
    false,
  );
  f.state.session.payment_status = "unpaid";
  assert.equal((await request("/api/verify-session/cs_test_paid")).status, 409);
});
test("lifetime purchases are recognized and refunded access is revoked", async (t) => {
  const f = fixtures();
  f.state.session.metadata.planType = "lifetime";
  f.state.session.amount_total = 4000;
  const request = await serve(t, f),
    verify = await request("/api/verify-session/cs_test_paid");
  assert.equal(verify.status, 200);
  assert.equal(
    (await request("/api/subscription", undefined, verify.data.token)).data
      .active,
    true,
  );
  f.state.refunded = 4000;
  assert.equal(
    (await request("/api/subscription", undefined, verify.data.token)).data
      .active,
    false,
  );
});
test("Oracle rate limit resists forwarded header spoofing and excludes failed calls", async (t) => {
  const f = fixtures(),
    request = await serve(t, f);
  f.state.fail = true;
  assert.equal(
    (await request("/api/oracle", { question: "Hello" })).status,
    502,
  );
  f.state.fail = false;
  for (let i = 0; i < 3; i++)
    assert.equal(
      (
        await request(
          "/api/oracle",
          { question: "Who are the Watchers?", customerId: "cus_test" },
          null,
          { "X-Forwarded-For": `10.0.0.${i}` },
        )
      ).status,
      200,
    );
  assert.equal(
    (
      await request("/api/oracle", { question: "Again" }, null, {
        "X-Forwarded-For": "11.0.0.1",
      })
    ).status,
    429,
  );
  const verify = await request("/api/verify-session/cs_test_paid");
  assert.equal(
    (
      await request(
        "/api/oracle",
        { question: "Subscriber question" },
        verify.data.token,
      )
    ).status,
    200,
  );
});
test("webhooks receive raw bytes and invalid questions fail cleanly", async (t) => {
  const request = await serve(t, fixtures());
  assert.equal(
    (await request("/api/webhook", { type: "checkout.session.completed" }))
      .status,
    200,
  );
  assert.equal(
    (await request("/api/oracle", { question: "x".repeat(801) })).status,
    400,
  );
});
