// Small interactions: nav toggle and smooth scrolling
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("nav-toggle");
  const navList = document.getElementById("nav-list");
  const themeToggle = document.getElementById("theme-toggle");

  // Nav toggle for small screens
  navToggle &&
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      navList.classList.toggle("show");
    });

  // Close nav when clicking outside
  document.addEventListener("click", (e) => {
    if (
      navToggle &&
      navList &&
      !navToggle.contains(e.target) &&
      !navList.contains(e.target)
    ) {
      navList.classList.remove("show");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  // Close nav when clicking on nav links (mobile)
  const navLinks = document.querySelectorAll(".main-nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768 && navList && navToggle) {
        navList.classList.remove("show");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Remove theme toggle functionality (dark theme only)
  if (themeToggle) {
    themeToggle.style.display = "none";
  }

  // Smooth scroll for same-page links
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (href.length > 1) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        // close nav on mobile
        if (window.innerWidth <= 768 && navList && navToggle) {
          navList.classList.remove("show");
          navToggle.setAttribute("aria-expanded", "false");
        }
      }
    });
  });

  // Copy email + toast
  const copyBtn = document.getElementById("copy-email");
  const emailEl = document.getElementById("email");

  function showToast(msg) {
    let t = document.createElement("div");
    t.className = "toast";
    t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(() => t.classList.add("show"));
    setTimeout(() => {
      t.classList.remove("show");
      setTimeout(() => t.remove(), 300);
    }, 2500);
  }

  if (copyBtn && emailEl) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(emailEl.textContent.trim());
        showToast("Email copied to clipboard");
      } catch (e) {
        showToast("Copy failed — select & copy manually");
      }
    });
  }

  // Initialize AOS (Animate On Scroll) for timeline animations
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 100,
    });
  }

  // Add enhanced timeline interactions
  const timelineItems = document.querySelectorAll(".timeline-item");
  timelineItems.forEach((item, index) => {
    item.addEventListener("mouseenter", () => {
      const marker = item.querySelector(".timeline-marker");
      if (marker) {
        marker.style.transform = "scale(1.2)";
        marker.style.boxShadow = "0 0 0 6px var(--accent)";
      }
    });

    item.addEventListener("mouseleave", () => {
      const marker = item.querySelector(".timeline-marker");
      if (marker) {
        marker.style.transform = "scale(1)";
        marker.style.boxShadow = "0 0 0 3px var(--accent)";
      }
    });
  });
});
