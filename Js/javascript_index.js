document.addEventListener("DOMContentLoaded", function () {
  // Update login status text when user type changes
  const userTypeRadios = document.querySelectorAll('input[name="userType"]');
  const loginStatus = document.getElementById("loginStatus");

  // Set initial login status text
  updateLoginStatus();

  userTypeRadios.forEach((radio) => {
    radio.addEventListener("change", updateLoginStatus);
  });

  function updateLoginStatus() {
    const selectedRadio = document.querySelector(
      'input[name="userType"]:checked'
    );
    if (selectedRadio) {
      loginStatus.textContent = `Logging in as: ${
        selectedRadio.value.charAt(0).toUpperCase() +
        selectedRadio.value.slice(1)
      }`;
    }
  }

  // Handle login button click
  document.getElementById("loginBtn").addEventListener("click", function () {
    const selectedUserType = document.querySelector(
      'input[name="userType"]:checked'
    )?.value;

    if (!selectedUserType) {
      alert("Please select a user type");
      return;
    }

    // Redirect based on user type
    const dashboardPages = {
      customer: "customer-dashboard.html",
      employee: "employee-dashboard.html",
      admin: "admin-dashboard.html",
    };

    if (dashboardPages[selectedUserType]) {
      window.location.href = dashboardPages[selectedUserType];
    } else {
      alert("Invalid user type selected");
    }
  });

  // Enhanced bubbles creation
  function createBubbles() {
    const container = document.querySelector(".bubbles");
    const bubbleCount = 40; // Increased number of bubbles

    // Clear existing bubbles
    container.innerHTML = "";

    // Create new bubbles
    for (let i = 0; i < bubbleCount; i++) {
      const bubble = document.createElement("span");
      const size = Math.random() * 40 + 20; // 20px to 60px

      // Random positioning
      bubble.style.left = Math.random() * 100 + "vw";
      bubble.style.width = size + "px";
      bubble.style.height = size + "px";

      // Random animation properties
      bubble.style.setProperty("--i", Math.random() * 15);
      bubble.style.animationDuration = 8 + Math.random() * 10 + "s";

      // Depth effect
      bubble.style.opacity = Math.random() * 0.6 + 0.1;

      container.appendChild(bubble);
    }
  }

  // Initialize on page load
  createBubbles();

  // Refresh bubbles every 30 seconds
  setInterval(createBubbles, 30000);

  // PAUSE ANIMATIONS ON SCROLL
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

  setupScrollPause();
});
