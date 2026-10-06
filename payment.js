(() => {
  "use strict";
  const tokenKey = "dragonbible_access_token";
  const getToken = () => {
    try {
      return localStorage.getItem(tokenKey);
    } catch {
      return null;
    }
  };
  let configPromise;
  async function request(path, options = {}) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const token = getToken();
      const response = await fetch(path, {
        ...options,
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...options.headers,
        },
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok)
        throw new Error(
          data.error ||
            "This service is not connected yet. Please contact noah@dragonbible.com.",
        );
      return data;
    } catch (error) {
      if (error.name === "AbortError")
        throw new Error(
          "The service took too long to respond. Please try again.",
        );
      throw error;
    } finally {
      clearTimeout(timeout);
    }
  }
  function getConfig() {
    if (!configPromise)
      configPromise = request("/api/config").catch(() => ({
        plans: {},
        oracle: false,
      }));
    return configPromise;
  }
  function redirect(url) {
    const destination = new URL(url);
    if (
      destination.protocol !== "https:" ||
      !["checkout.stripe.com", "billing.stripe.com"].includes(
        destination.hostname,
      )
    )
      throw new Error(
        "Checkout returned an unexpected destination. Please contact support.",
      );
    window.location.assign(destination.href);
  }
  async function createCheckoutSession(planType) {
    if (!["monthly", "lifetime"].includes(planType))
      throw new Error("Choose a valid plan.");
    const result = await request("/api/create-checkout-session", {
      method: "POST",
      body: JSON.stringify({ planType }),
    });
    if (!result.url)
      throw new Error("Checkout is unavailable. Please try again later.");
    redirect(result.url);
  }
  async function handlePaymentSuccess(sessionId) {
    const result = await request(
      `/api/verify-session/${encodeURIComponent(sessionId)}`,
    );
    if (!result.success || !result.token)
      throw new Error(
        "Payment has not been confirmed yet. Please check your receipt or contact support.",
      );
    try {
      localStorage.setItem(tokenKey, result.token);
    } catch {
      throw new Error(
        "Payment confirmed, but this browser could not save your access. Enable browser storage and reopen this confirmation link.",
      );
    }
    return result;
  }
  async function checkSubscriptionStatus() {
    if (!getToken()) return false;
    try {
      const result = await request("/api/subscription");
      return result.active === true;
    } catch {
      return false;
    }
  }
  async function openCustomerPortal() {
    const result = await request("/api/create-portal-session", {
      method: "POST",
      body: "{}",
    });
    redirect(result.url);
  }
  window.DragonPayment = {
    getConfig,
    createCheckoutSession,
    handlePaymentSuccess,
    checkSubscriptionStatus,
    openCustomerPortal,
    request,
  };
})();
