document.addEventListener("DOMContentLoaded", () => {
  const customerNameSpan = document.querySelector(".user-profile span");
  const profileImage = document.querySelector(".user-profile img");

  customerNameSpan.textContent = "Cesar Rhyan Banac";
  profileImage.src = "images/banac.jpg";
  profileImage.alt = "Cesar Rhyan Banac";

  const headerTitle = document.querySelector(".header h1");
  const now = new Date();
  const hour = now.getHours();
  let greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  headerTitle.textContent = `${greeting}, ${customerNameSpan.textContent}!`;

  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      navItems.forEach((i) => i.classList.remove("active"));
      this.classList.add("active");
      const clickedPage = this.querySelector("span").textContent;
      console.log(`Navigating to: ${clickedPage}`);
    });
  });

  const statCards = document.querySelectorAll(".stat-card");
  statCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    setTimeout(() => {
      card.style.transition = "all 0.5s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 200);
  });

  const scheduleItems = document.querySelectorAll(".schedule-item");
  scheduleItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      item.style.transform = "scale(1.02)";
      item.style.transition = "transform 0.3s ease";
    });
    item.addEventListener("mouseleave", () => {
      item.style.transform = "scale(1)";
    });
  });

  window.addEventListener("load", () => {
    const activityItems = document.querySelectorAll(".activity-item");
    activityItems.forEach((item, i) => {
      item.style.opacity = "0";
      item.style.transform = "translateX(-20px)";
      setTimeout(() => {
        item.style.transition = "all 0.6s ease";
        item.style.opacity = "1";
        item.style.transform = "translateX(0)";
      }, 400 + i * 200);
    });
  });

  const allSelects = document.querySelectorAll("select");
  allSelects.forEach((select) => {
    select.style.color = "#000";
    select.addEventListener("change", () => {
      select.style.color = select.value ? "#000" : "#aaa";
    });
  });

  const sidebar = document.querySelector(".sidebar");
  const toggleBtn = document.createElement("div");
  toggleBtn.className = "toggle-btn";
  toggleBtn.innerHTML = "<i class='fas fa-bars'></i>";
  document.querySelector(".dashboard").prepend(toggleBtn);
  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
  });

  navItems.forEach((item) => {
    item.addEventListener("mouseover", () => {
      item.style.backgroundColor = "#444";
    });
    item.addEventListener("mouseout", () => {
      item.style.backgroundColor = "";
    });
  });

  const greetingHeader = document.createElement("div");
  greetingHeader.className = "greeting";
  const hours = new Date().getHours();
  let greetingText =
    hours < 12
      ? "Good Morning ☀️"
      : hours < 18
      ? "Good Afternoon 🌤️"
      : "Good Evening 🌙";
  greetingHeader.textContent = greetingText;
  document.querySelector(".header").prepend(greetingHeader);

  window.addEventListener("keydown", (e) => {
    if (e.altKey && e.key === "1") navItems[0].click();
    if (e.altKey && e.key === "2") navItems[1].click();
    if (e.altKey && e.key === "3") navItems[2].click();
  });

  window.addEventListener("resize", () => {
    console.log("Window size: ", window.innerWidth, "x", window.innerHeight);
  });
});

// Add to your existing JavaScript file or create new one
document.addEventListener("DOMContentLoaded", function () {
  const logoutBtn = document.querySelector(".logout-btn");

  logoutBtn.addEventListener("click", function () {
    // Create custom confirmation modal
    const modal = document.createElement("div");
    modal.className = "logout-modal";
    modal.innerHTML = `
        <div class="modal-content">
          <h3>Are you sure you want to log out?</h3>
          <div class="modal-buttons">
            <button class="confirm-logout">Yes, Logout</button>
            <button class="cancel-logout">Cancel</button>
          </div>
        </div>
      `;

    document.body.appendChild(modal);

    // Handle button clicks
    document
      .querySelector(".confirm-logout")
      .addEventListener("click", function () {
        window.location.href = "index.html"; // Redirect to sign-in page
      });

    document
      .querySelector(".cancel-logout")
      .addEventListener("click", function () {
        modal.remove();
      });
  });
});
