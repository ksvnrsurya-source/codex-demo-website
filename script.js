// Replace this with the deployed Google Apps Script Web App URL before launch.
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwCL6iJQ-ahmSMA9hrels5UBVpV90gV5VlxCLO8eLACF5CLkATwlt6V-aaVSMaXcUI/exec";
const form = document.querySelector("#leadCapture");
const status = document.querySelector("#formStatus");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  status.textContent = "Sending your details...";
  try {
    if (!APPS_SCRIPT_URL) {
      const demoLeads = JSON.parse(localStorage.getItem("profilepilot_demo_leads") || "[]");
      demoLeads.push({ ...data, submittedAt: new Date().toISOString() });
      localStorage.setItem("profilepilot_demo_leads", JSON.stringify(demoLeads));
      status.textContent = "Demo submission saved in this browser. Add your Apps Script URL to send it to Sheets.";
    } else {
      await fetch(APPS_SCRIPT_URL, { method: "POST", mode: "no-cors", body: new URLSearchParams(data) });
      status.textContent = "Thanks — your details have been received.";
      form.reset();
    }
  } catch (error) {
    status.textContent = "Something went wrong. Please try again.";
  }
});
