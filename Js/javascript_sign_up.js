document.addEventListener("DOMContentLoaded", () => {
  initGenderToggle();
  initTermsLinks();
  initRoleSelection();
  initSignupProcess();
  initBubblesEffect();
  setupScrollPause();
});

/* GENDER TOGGLE: Show "specify" field if 'Other' is selected */
function initGenderToggle() {
  const otherGender = document.getElementById("other-gender");
  const genderSpecify = document.getElementById("gender-specify");

  if (otherGender && genderSpecify) {
    otherGender.addEventListener("change", () => {
      genderSpecify.style.display = otherGender.checked ? "block" : "none";
    });
  }
}

/* TERMS OF SERVICE LINKS: Simulated link clicks */
function initTermsLinks() {
  document.querySelectorAll(".terms-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Opening terms document...");
      // window.location.href = "privacy-policy.html";
    });
  });
}

/* ROLE SELECTION: Update selected role text dynamically */
function initRoleSelection() {
  const roleRadios = document.querySelectorAll('input[name="userType"]');
  const selectedRole = document.getElementById("selectedRole");

  function updateSelectedRole() {
    const selected = document.querySelector('input[name="userType"]:checked');
    if (selected) {
      selectedRole.textContent =
        selected.value.charAt(0).toUpperCase() + selected.value.slice(1);
    }
  }

  roleRadios.forEach((radio) => {
    radio.addEventListener("change", updateSelectedRole);
  });

  updateSelectedRole(); // Set initial value
}

/* SIGNUP BUTTON: Validations + Redirection */
function initSignupProcess() {
  const signupBtn = document.getElementById("signupBtn");
  if (!signupBtn) return;

  signupBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (!document.getElementById("agree-terms").checked) {
      alert("Please agree to the Terms of Service");
      return;
    }

    const userType = document.querySelector(
      'input[name="userType"]:checked'
    )?.value;

    const requiredFields = [
      "username",
      "password",
      "confirm-password",
      "email",
      "firstname",
      "lastname",
    ];
    let formValid = true;

    requiredFields.forEach((id) => {
      const field = document.getElementById(id);
      if (field && !field.value.trim()) {
        formValid = false;
        field.style.border = "1px solid #ff6b6b";
      } else if (field) {
        field.style.border = ""; // Reset border if valid
      }
    });

    if (!formValid) {
      alert("Please fill in all required fields.");
      return;
    }

    switch (userType) {
      case "customer":
        window.location.href = "customer-dashboard.html";
        break;
      case "employee":
        window.location.href = "employee-dashboard.html";
        break;
      case "admin":
        alert("Admin account requires verification. Redirecting to login.");
        window.location.href = "index.html";
        break;
      default:
        alert("Please select a valid user type.");
    }
  });
}

/* BUBBLE BACKGROUND EFFECT */
function initBubblesEffect() {
  const container = document.querySelector(".bubbles");
  if (!container) return;

  function createBubbles(count = 40) {
    container.innerHTML = "";
    for (let i = 0; i < count; i++) {
      const bubble = document.createElement("span");
      const size = Math.random() * 40 + 20;

      bubble.style.left = `${Math.random() * 100}vw`;
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.setProperty("--i", Math.random() * 15);
      bubble.style.animationDuration = `${8 + Math.random() * 10}s`;
      bubble.style.opacity = Math.random() * 0.6 + 0.1;

      container.appendChild(bubble);
    }
  }

  createBubbles();
  setInterval(() => createBubbles(), 30000);
}

/* PAUSE ANIMATIONS ON SCROLL */
function setupScrollPause() {
  let scrollTimer;
  window.addEventListener("scroll", () => {
    document.body.classList.add("scrolling");
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      document.body.classList.remove("scrolling");
    }, 100);
  });
}

function initTermsLinks() {
  document.querySelectorAll(".terms-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "Privacy and terms of service.html"; // <-- Update ito kung iba ang filename
    });
  });
}
