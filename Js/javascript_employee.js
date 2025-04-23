// Js/javascript_employee.js

document.addEventListener("DOMContentLoaded", () => {
  // Update Employee Name and Picture
  const employeeNameSpan = document.querySelector(".user-profile span");
  const profileImage = document.querySelector(".user-profile img");

  employeeNameSpan.textContent = "Justin Ronnie Wang";
  profileImage.src = "images/wang.png";
  profileImage.alt = "Justin Ronnie Wang";

  // Dynamic Greeting for Employee
  const headerTitle = document.querySelector(".header h1");
  const now = new Date();
  const hour = now.getHours();

  let greeting;
  if (hour < 12) {
    greeting = "Good morning";
  } else if (hour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  headerTitle.textContent = `${greeting}, Trainer Justin Ronnie Wang!`;

  // "Active" Class Handling for Navigation
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      navItems.forEach((navItem) => navItem.classList.remove("active"));
      this.classList.add("active");
      const clickedSection = this.textContent.trim();
      console.log(`Employee navigating to: ${clickedSection}`);
      // In a real app, you would load content related to this section
      // For example, if "Manage Clients" is clicked, you'd display a list of clients.
    });
  });

  // Simple Animation for Stats Cards on Load (Slightly different timing)
  const statCards = document.querySelectorAll(".stat-card");
  statCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.transform = "scale(1)";
      card.style.opacity = 1;
    }, 150 * (index + 1));
    card.style.transform = "scale(0.9)";
    card.style.opacity = 0;
    card.style.transition = "transform 0.2s ease-out, opacity 0.2s ease-out";
  });

  // Interactive Schedule - Highlight Upcoming Sessions
  const scheduleItems = document.querySelectorAll(".schedule-item");
  scheduleItems.forEach((item) => {
    const status = item.querySelector(".workout-status");
    if (status && status.textContent.toLowerCase() === "upcoming") {
      item.classList.add("upcoming-session");
      // You could add a subtle animation or style to these
    }
  });

  // Add a "View Details" button to schedule items (as an example of more interactivity)
  scheduleItems.forEach((item) => {
    const detailsButton = document.createElement("button");
    detailsButton.textContent = "View Details";
    detailsButton.classList.add("details-button");
    item.appendChild(detailsButton);

    detailsButton.addEventListener("click", function () {
      const workoutName = item.querySelector(".workout-name").textContent;
      alert(`Details for: ${workoutName} (Functionality to be implemented)`);
      // In a real application, this would show more details about the session
    });
  });

  // Style for the "View Details" button (add to employee.css)
  const style = document.createElement("style");
  style.textContent = `
        .details-button {
            background-color: #f39c12;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 0.9em;
            transition: background-color 0.3s ease;
            margin-top: 10px;
        }
        .details-button:hover {
            background-color: #e08e0b;
        }
        .upcoming-session {
            border-left: 5px solid #f39c12; /* Highlight upcoming sessions */
            padding-left: 10px;
        }
    `;
  document.head.appendChild(style);

  // Interactive Recent Activities - Show More Info on Hover
  const activityItems = document.querySelectorAll(".activity-item");
  activityItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.backgroundColor = "#f0f0f0";
      this.style.transition = "background-color 0.2s ease-in-out";
    });
    item.addEventListener("mouseleave", function () {
      this.style.backgroundColor = "";
    });
  });

  // You can add more employee-specific interactions here, such as:
  // - Functionality to manage clients (display lists, filter, etc.)
  // - Displaying detailed reports
  // - Allowing employees to update their profile information
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
