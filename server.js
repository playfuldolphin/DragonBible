// Optional same-origin API server. The free library also runs on static hosting.
require("dotenv").config();
const express = require("express");
const crypto = require("node:crypto");
const path = require("node:path");
const { ORACLE_SYSTEM_PROMPT } = require("./lore-context");

function createApp({ env = process.env, stripe, anthropic } = {}) {
  if (stripe === undefined && env.STRIPE_SECRET_KEY)
    stripe = require("stripe")(env.STRIPE_SECRET_KEY);
  if (anthropic === undefined && env.ANTHROPIC_API_KEY) {
    const Anthropic = require("@anthropic-ai/sdk");
    anthropic = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });
  }
  const app = express();
  app.disable("x-powered-by");
  const proxyHops = Number(env.TRUST_PROXY_HOPS || 0);
  if (Number.isInteger(proxyHops) && proxyHops > 0)
    app.set("trust proxy", proxyHops);
  const domain = new URL(env.DOMAIN || "http://localhost:3000").origin;
  const secret = env.ACCESS_TOKEN_SECRET || "";
  const prices = {
    monthly: env.STRIPE_PRICE_MONTHLY,
    lifetime: env.STRIPE_PRICE_LIFETIME,
  };
  const expectedAmounts = { monthly: 500, lifetime: 4000 };
  const checkoutReady = (plan) =>
    Boolean(stripe && secret.length >= 32 && prices[plan] && anthropic);
  const unavailable = (res) =>
    res
      .status(503)
      .json({
        error:
          "This service is not connected yet. Please contact noah@dragonbible.com.",
      });
  const fail = (res) =>
    res
      .status(502)
      .json({
        error:
          "The service could not complete your request. Please try again shortly.",
      });
  const sign = (value) =>
    crypto.createHmac("sha256", secret).update(value).digest("base64url");
  function makeToken(sessionId) {
    const payload = Buffer.from(JSON.stringify({ sessionId })).toString(
      "base64url",
    );
    return `${payload}.${sign(payload)}`;
  }
  function sessionFromToken(req) {
    if (secret.length < 32) return null;
    const token = req.get("authorization")?.match(/^Bearer ([\w.-]+)$/)?.[1];
    if (!token || token.length > 1000) return null;
    const parts = token.split(".");
    if (parts.length !== 2) return null;
    const expected = Buffer.from(sign(parts[0])),
      actual = Buffer.from(parts[1]);
    if (
      actual.length !== expected.length ||
      !crypto.timingSafeEqual(actual, expected)
    )
      return null;
    try {
      const { sessionId } = JSON.parse(Buffer.from(parts[0], "base64url"));
      return /^cs_[\w]+$/.test(sessionId) ? sessionId : null;
    } catch {
      return null;
    }
  }
  async function paidSession(sessionId) {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const plan = session.metadata?.planType;
    if (
      !Object.hasOwn(prices, plan) ||
      !prices[plan] ||
      session.payment_status !== "paid" ||
      !session.customer
    )
      return null;
    if (
      session.currency !== "usd" ||
      session.amount_total !== expectedAmounts[plan]
    )
      return null;
    const items = await stripe.checkout.sessions.listLineItems(sessionId, {
      limit: 2,
    });
    if (
      items.data.length !== 1 ||
      items.data[0].price?.id !== prices[plan] ||
      items.data[0].quantity !== 1
    )
      return null;
    return session;
  }
  async function isActive(session) {
    if (!session) return false;
    if (session.metadata.planType === "monthly") {
      if (!session.subscription) return false;
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription,
      );
      return ["active", "trialing"].includes(subscription.status);
    }
    if (!session.payment_intent) return false;
    const intent = await stripe.paymentIntents.retrieve(
      session.payment_intent,
      { expand: ["latest_charge"] },
    );
    return (
      intent.status === "succeeded" &&
      Boolean(intent.latest_charge) &&
      intent.latest_charge.amount_refunded === 0 &&
      !intent.latest_charge.disputed
    );
  }
  async function authenticatedSession(req) {
    const sessionId = sessionFromToken(req);
    return stripe && sessionId ? paidSession(sessionId) : null;
  }
  app.use("/api", (req, res, next) => {
    res.set("Cache-Control", "no-store");
    const origin = req.get("origin");
    if (origin && origin !== domain)
      return res
        .status(403)
        .json({ error: "Requests must come from this website." });
    next();
  });
  // Signature verification must receive raw bytes, before express.json().
  app.post(
    "/api/webhook",
    express.raw({ type: "application/json", limit: "256kb" }),
    (req, res) => {
      if (!stripe || !env.STRIPE_WEBHOOK_SECRET) return unavailable(res);
      try {
        stripe.webhooks.constructEvent(
          req.body,
          req.get("stripe-signature"),
          env.STRIPE_WEBHOOK_SECRET,
        );
        // Entitlements are checked directly with Stripe on each authenticated request.
        res.json({ received: true });
      } catch {
        res.status(400).json({ error: "Invalid webhook signature." });
      }
    },
  );
  app.use(express.json({ limit: "16kb" }));
  app.get("/api/config", (req, res) =>
    res.json({
      plans: {
        monthly: checkoutReady("monthly"),
        lifetime: checkoutReady("lifetime"),
      },
      oracle: Boolean(anthropic),
    }),
  );
  app.post("/api/create-checkout-session", async (req, res) => {
    const plan = req.body?.planType;
    if (!Object.hasOwn(prices, plan))
      return res
        .status(400)
        .json({ error: "Choose monthly or lifetime access." });
    if (!checkoutReady(plan)) return unavailable(res);
    try {
      const price = await stripe.prices.retrieve(prices[plan]);
      const recurringCorrect =
        plan === "monthly"
          ? price.recurring?.interval === "month" &&
            price.recurring.interval_count === 1
          : !price.recurring;
      if (
        !price.active ||
        price.currency !== "usd" ||
        price.unit_amount !== expectedAmounts[plan] ||
        !recurringCorrect
      )
        return unavailable(res);
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [{ price: prices[plan], quantity: 1 }],
        mode: plan === "monthly" ? "subscription" : "payment",
        ...(plan === "lifetime" ? { customer_creation: "always" } : {}),
        success_url: `${domain}/success.html?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${domain}/index.html#pricing`,
        metadata: { planType: plan },
      });
      res.json({ url: session.url });
    } catch {
      fail(res);
    }
  });
  app.get("/api/verify-session/:sessionId", async (req, res) => {
    if (!stripe || secret.length < 32) return unavailable(res);
    if (!/^cs_[\w]+$/.test(req.params.sessionId))
      return res.status(400).json({ error: "Invalid confirmation link." });
    try {
      const session = await paidSession(req.params.sessionId);
      if (!(await isActive(session)))
        return res
          .status(409)
          .json({
            error:
              "Payment has not been confirmed or access is no longer active. Please contact support.",
          });
      res.json({
        success: true,
        token: makeToken(session.id),
        planType: session.metadata.planType,
      });
    } catch {
      fail(res);
    }
  });
  app.get("/api/subscription", async (req, res) => {
    if (!stripe) return unavailable(res);
    try {
      res.json({ active: await isActive(await authenticatedSession(req)) });
    } catch {
      fail(res);
    }
  });
  app.post("/api/create-portal-session", async (req, res) => {
    if (!stripe) return unavailable(res);
    try {
      const session = await authenticatedSession(req);
      if (!session)
        return res
          .status(401)
          .json({
            error:
              "Restore your access using the confirmation link from your checkout, or contact support.",
          });
      const portal = await stripe.billingPortal.sessions.create({
        customer: session.customer,
        return_url: `${domain}/index.html#pricing`,
      });
      res.json({ url: portal.url });
    } catch {
      fail(res);
    }
  });
  const demoUsage = new Map();
  const windowMs = 24 * 60 * 60 * 1000;
  app.post("/api/oracle", async (req, res) => {
    const question = req.body?.question;
    if (
      typeof question !== "string" ||
      !question.trim() ||
      question.length > 800
    )
      return res
        .status(400)
        .json({ error: "Enter a question between 1 and 800 characters." });
    if (!anthropic) return unavailable(res);
    let record,
      reserved = false;
    try {
      const subscriber = await isActive(await authenticatedSession(req));
      if (!subscriber) {
        const now = Date.now();
        for (const [key, value] of demoUsage)
          if (value.expires <= now) demoUsage.delete(key);
        record = demoUsage.get(req.ip);
        if (!record) {
          if (demoUsage.size >= 10000)
            return res
              .status(503)
              .json({ error: "The Oracle is busy. Please try again later." });
          record = { count: 0, expires: now + windowMs };
          demoUsage.set(req.ip, record);
        }
        if (record.count >= 3)
          return res
            .status(429)
            .json({
              error:
                "Your three free questions have been used. Try again in 24 hours or visit DM access.",
            });
        record.count++;
        reserved = true;
      }
      const message = await anthropic.messages.create({
        model: env.ANTHROPIC_MODEL || "claude-opus-4-5",
        max_tokens: subscriber ? 1500 : 800,
        system: ORACLE_SYSTEM_PROMPT,
        messages: [{ role: "user", content: question.trim() }],
      });
      const answer = message.content
        .filter((block) => block.type === "text" || block.text)
        .map((block) => block.text)
        .join("\n");
      if (!answer) throw new Error("Empty response");
      res.json({ answer, subscriber });
    } catch {
      if (reserved) record.count--;
      fail(res);
    }
  });
  app.use("/api", (req, res) =>
    res.status(404).json({ error: "This service is not available." }),
  );
  // Serve only public assets, never server source, environment files, or backups.
  const publicFiles = new Set([
    "app",
    "app/",
    "app/index.html",
    "app/app.css",
    "app/app.js",
    "app/game.js",
    "app/sw.js",
    "app/icon.svg",
    "app/icon-192.png",
    "app/icon-512.png",
    "app/manifest.webmanifest",
    "index.html",
    "about.html",
    "blog.html",
    "contact.html",
    "cosmology.html",
    "how-to-run.html",
    "lore-oracle.html",
    "privacy.html",
    "terms.html",
    "sampler.html",
    "success.html",
    "404.html",
    "styles.css",
    "site.css",
    "site.js",
    "script.js",
    "content.js",
    "payment.js",
    "oracle.js",
    "success.js",
    "favicon.svg",
    "manifest.json",
    "service-worker.js",
    "robots.txt",
    "sitemap.xml",
    "api/config",
  ]);
  app.use((req, res, next) => {
    const file = req.path === "/" ? "index.html" : req.path.slice(1);
    if (
      publicFiles.has(file) ||
      /^images\/[\w.-]+$/.test(file) ||
      /^blog\/[\w-]+\.html$/.test(file)
    )
      return next();
    res.status(404).sendFile(path.join(__dirname, "404.html"));
  });
  app.use(express.static(__dirname, { dotfiles: "deny", index: "index.html" }));
  app.use((req, res) =>
    res.status(404).sendFile(path.join(__dirname, "404.html")),
  );
  app.use((err, req, res, next) =>
    res
      .status(err.status === 413 ? 413 : 400)
      .json({ error: "The request could not be read." }),
  );
  return app;
}
if (require.main === module) {
  const port = process.env.PORT || 3000;
  createApp().listen(port, process.env.HOST || "127.0.0.1", () =>
    console.log(`Dragon Bible: http://localhost:${port}`),
  );
}
module.exports = { createApp };
