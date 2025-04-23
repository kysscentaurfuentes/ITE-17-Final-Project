// Set dynamic dates
document.getElementById("current-date").textContent =
  new Date().toLocaleDateString();
document.getElementById("current-date-2").textContent =
  new Date().toLocaleDateString();
document.getElementById("current-year").textContent = new Date().getFullYear();

// Tab functionality
function openTab(tabName) {
  const tabs = document.getElementsByClassName("policy-content");
  const buttons = document.getElementsByClassName("tab-btn");
  for (let i = 0; i < tabs.length; i++) tabs[i].classList.remove("active-tab");
  for (let i = 0; i < buttons.length; i++)
    buttons[i].classList.remove("active");
  document.getElementById(tabName).classList.add("active-tab");
  event.currentTarget.classList.add("active");
}

// Handle agreement and redirect to sign_up.html
function handleAgreement() {
  const checkbox = document.getElementById("agreeCheckbox");
  const msg = document.getElementById("redirectMsg");

  if (!checkbox.checked) {
    alert("Please agree to the Privacy Policy and Terms of Service.");
    return;
  }

  msg.style.display = "block";

  // Always redirect to sign_up.html
  setTimeout(() => {
    window.location.href = "sign_up.html";
  }, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
  const from = new URLSearchParams(window.location.search).get("from");

  const continueBtn = document.getElementById("continueBtn");
  const backBtn = document.getElementById("backBtn");

  continueBtn.addEventListener("click", handleAgreement);

  // Show back button only for dashboard
  if (from === "dashboard") {
    backBtn.style.display = "inline-block";
    backBtn.addEventListener("click", () => {
      window.location.href = "dashboard.html";
    });
  } else {
    backBtn.style.display = "none";
  }
});
