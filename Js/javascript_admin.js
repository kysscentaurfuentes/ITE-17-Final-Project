// dashboard.js - FBW Gym Admin Dashboard Interactive Features

document.addEventListener("DOMContentLoaded", function () {
  // ================ GLOBAL VARIABLES ================
  const dashboardData = {
    members: 142,
    revenue: 12850,
    staff: 8,
    pendingActions: 5,
    pendingApprovals: [
      {
        id: 10045,
        type: "Membership Upgrade",
        name: "Maria Santos",
        plan: "Premium Plan",
        status: "Review",
      },
      {
        id: 10046,
        type: "New Trainer Application",
        name: "James Wilson",
        status: "Interview",
      },
    ],
    alerts: [
      {
        title: "Backup Required",
        message: "System backup overdue by 2 days",
        priority: "High",
        icon: "server",
      },
      {
        title: "Equipment Maintenance",
        message: "5 machines due for service",
        priority: "Medium",
        icon: "tools",
      },
    ],
  };

  // ================ INITIALIZATION ================
  initDashboard();

  // ================ MAIN FUNCTIONS ================
  function initDashboard() {
    updateStats();
    renderPendingApprovals();
    renderAlerts();
    setupEventListeners();
    setupRealTimeUpdates();
  }

  function updateStats() {
    document.querySelector(".stat-card:nth-child(1) h2").textContent =
      dashboardData.members;
    document.querySelector(
      ".stat-card:nth-child(2) h2"
    ).textContent = `$${dashboardData.revenue.toLocaleString()}`;
    document.querySelector(".stat-card:nth-child(3) h2").textContent =
      dashboardData.staff;
    document.querySelector(".stat-card:nth-child(5) h2").textContent =
      dashboardData.pendingActions;
  }

  function renderPendingApprovals() {
    const container = document.querySelector(".schedule-container");
    container.innerHTML = "";

    dashboardData.pendingApprovals.forEach((item) => {
      const approvalItem = document.createElement("div");
      approvalItem.className = "schedule-item";
      approvalItem.innerHTML = `
                <div class="workout-time">#${item.id}</div>
                <div class="workout-name">
                    ${item.type}
                    <div class="workout-trainer">${item.name}${
        item.plan ? " - " + item.plan : ""
      }</div>
                </div>
                <div class="workout-status status-pending">${item.status}</div>
                <div class="approval-actions">
                    <button class="btn-approve" data-id="${
                      item.id
                    }"><i class="fas fa-check"></i></button>
                    <button class="btn-deny" data-id="${
                      item.id
                    }"><i class="fas fa-times"></i></button>
                </div>
            `;
      container.appendChild(approvalItem);
    });
  }

  function renderAlerts() {
    const container = document.querySelector(".activities-container");
    container.innerHTML = "";

    dashboardData.alerts.forEach((alert) => {
      const priorityClass =
        alert.priority === "High" ? "high-priority" : "medium-priority";
      const alertItem = document.createElement("div");
      alertItem.className = "activity-item";
      alertItem.innerHTML = `
                <div class="activity-icon ${priorityClass}">
                    <i class="fas fa-${alert.icon}"></i>
                </div>
                <div class="activity-info">
                    <h4>${alert.title}</h4>
                    <p>${alert.message}</p>
                </div>
                <div class="activity-time ${priorityClass}">${alert.priority} Priority</div>
                <button class="btn-dismiss" data-title="${alert.title}">
                    <i class="fas fa-times"></i>
                </button>
            `;
      container.appendChild(alertItem);
    });
  }

  // ================ EVENT HANDLERS ================
  function setupEventListeners() {
    // Quick Action Buttons
    document.querySelectorAll(".schedule-container button").forEach((btn) => {
      btn.addEventListener("click", handleQuickAction);
    });

    // Approval Actions
    document.addEventListener("click", function (e) {
      if (e.target.closest(".btn-approve")) {
        handleApproval(e.target.closest(".btn-approve"), true);
      }
      if (e.target.closest(".btn-deny")) {
        handleApproval(e.target.closest(".btn-deny"), false);
      }
      if (e.target.closest(".btn-dismiss")) {
        dismissAlert(e.target.closest(".btn-dismiss"));
      }
    });

    // Navigation Menu
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.addEventListener("click", function () {
        document
          .querySelectorAll(".nav-item")
          .forEach((i) => i.classList.remove("active"));
        this.classList.add("active");
        // Here you would load the appropriate module
        showNotification(
          `Switched to ${this.querySelector("span").textContent}`
        );
      });
    });

    // Search functionality would go here
  }

  function handleQuickAction(e) {
    const action = e.target.textContent.trim();
    showNotification(`Initiating: ${action}`);

    // Simulate action processing
    setTimeout(() => {
      showNotification(`${action} completed successfully!`, "success");
    }, 1500);
  }

  function handleApproval(button, isApproved) {
    const id = button.dataset.id;
    const itemIndex = dashboardData.pendingApprovals.findIndex(
      (item) => item.id == id
    );

    if (itemIndex !== -1) {
      const action = isApproved ? "approved" : "rejected";
      const item = dashboardData.pendingApprovals[itemIndex];

      showNotification(
        `${item.type} #${id} ${action}`,
        isApproved ? "success" : "warning"
      );

      // Remove from pending approvals
      dashboardData.pendingApprovals.splice(itemIndex, 1);
      dashboardData.pendingActions--;

      // Update UI
      renderPendingApprovals();
      updateStats();
    }
  }

  function dismissAlert(button) {
    const title = button.dataset.title;
    const alertIndex = dashboardData.alerts.findIndex((a) => a.title === title);

    if (alertIndex !== -1) {
      showNotification(`Dismissed alert: ${title}`);
      dashboardData.alerts.splice(alertIndex, 1);
      renderAlerts();
    }
  }

  // ================ UI ENHANCEMENTS ================
  function showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.innerHTML = `
            <i class="fas fa-${
              type === "success"
                ? "check-circle"
                : type === "warning"
                ? "exclamation-triangle"
                : "info-circle"
            }"></i>
            <span>${message}</span>
            <button class="btn-close"><i class="fas fa-times"></i></button>
        `;

    document.body.appendChild(notification);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      notification.classList.add("fade-out");
      setTimeout(() => notification.remove(), 300);
    }, 5000);

    // Manual close
    notification.querySelector(".btn-close").addEventListener("click", () => {
      notification.remove();
    });
  }

  function setupRealTimeUpdates() {
    // Simulate real-time updates
    setInterval(() => {
      // Randomly update member count
      const memberChange = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
      if (memberChange !== 0) {
        dashboardData.members += memberChange;
        document.querySelector(".stat-card:nth-child(1) h2").textContent =
          dashboardData.members;

        if (memberChange > 0) {
          showNotification(
            `New member registered! Total: ${dashboardData.members}`,
            "success"
          );
        }
      }

      // Random revenue update
      if (Math.random() > 0.7) {
        const revenueChange = Math.floor(Math.random() * 500);
        dashboardData.revenue += revenueChange;
        document.querySelector(
          ".stat-card:nth-child(2) h2"
        ).textContent = `$${dashboardData.revenue.toLocaleString()}`;
      }
    }, 10000);
  }

  // ================ UTILITY FUNCTIONS ================
  function formatCurrency(amount) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  }
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
