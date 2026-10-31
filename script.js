const form = document.getElementById("rfq");
const status = document.getElementById("form-status");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  status.textContent = "Sending your request...";

  try {
    const response = await fetch(
      "https://formsubmit.co/ajax/sales@valtirondoors.com",
      {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json"
        }
      }
    );

    const result = await response.json();

    if (!response.ok || result.success !== "true") {
      throw new Error("Submission failed");
    }

    status.textContent =
      "✓ Thank you! Your quote request has been submitted successfully.";

    status.style.cssText =
      "background:#e6f6e9;color:#155c2c;padding:16px;border-radius:8px;font-weight:600;";

    form.reset();

  } catch (error) {
    status.textContent =
      "Unable to submit your request. Please try again.";

    status.style.cssText =
      "background:#fff0f0;color:#b42318;padding:16px;border-radius:8px;";
  } finally {
    button.disabled = false;
  }
});
