(async () => {
  const title = document.getElementById("confirmationTitle");
  const status = document.getElementById("confirmationStatus");
  const sessionId = new URLSearchParams(location.search).get("session_id");
  if (!sessionId) {
    title.textContent = "No checkout confirmation found";
    status.textContent =
      "Open the confirmation link from your checkout, or contact Noah for help with an existing purchase.";
    return;
  }
  try {
    const result = await window.DragonPayment.handlePaymentSuccess(sessionId);
    title.textContent = "Your DM access is confirmed";
    document.title = "Access confirmed — Dragon Bible";
    status.textContent =
      result.planType === "lifetime"
        ? "Your Founding DM payment is confirmed. Thank you for supporting the world."
        : "Your monthly subscription is confirmed. Thank you for supporting the world.";
    document.getElementById("confirmationNote").textContent =
      "Access is saved in this browser. Keep this private confirmation link to restore access on another device. Manage a monthly subscription from the library’s DM access section.";
  } catch (error) {
    title.textContent = "We could not confirm your access";
    status.textContent = error.message;
  }
})();
