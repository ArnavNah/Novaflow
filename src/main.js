import { Chart, registerables } from 'chart.js';
import * as lucide from 'lucide';

Chart.register(...registerables);

// Initialize Lucide Icons
window.addEventListener("DOMContentLoaded", () => {
  if (lucide && lucide.createIcons) {
    lucide.createIcons();
  }

  // Set current year in footer
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear().toString();
  }

  // --- Chart.js Configuration ---
  const engagementCtx = document.getElementById("engagementChart");
  if (engagementCtx) {
    new Chart(engagementCtx, {
      type: "bar",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
          label: "Engagement",
          data: [26, 42, 32, 22, 36, 74, 58, 28, 44, 38, 20, 20],
          backgroundColor: function(ctx) {
            const index = ctx.dataIndex;
            return index === 5 ? "rgba(56, 189, 248, 1)" : "rgba(56, 189, 248, 0.35)";
          },
          borderRadius: 999,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "rgba(15,23,42,0.95)",
            titleColor: "#e5e7eb",
            bodyColor: "#e5e7eb",
            borderColor: "rgba(148,163,184,0.4)",
            borderWidth: 1,
            displayColors: false
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: "rgba(148,163,184,1)",
              font: { size: 10, family: "Inter" }
            }
          },
          y: {
            beginAtZero: true,
            grid: { color: "rgba(30,64,175,0.35)" },
            ticks: {
              color: "rgba(148,163,184,0.8)",
              font: { size: 9, family: "Inter" },
              callback: (value) => value + "k"
            }
          }
        }
      }
    });
  }

  const distributionCtx = document.getElementById("distributionChart");
  if (distributionCtx) {
    new Chart(distributionCtx, {
      type: "doughnut",
      data: {
        labels: ["Enterprise", "SMB", "Startups"],
        datasets: [{
          data: [45, 35, 20],
          backgroundColor: [
            "rgba(56, 189, 248, 1)",
            "rgba(59, 130, 246, 1)",
            "rgba(30, 64, 175, 0.6)"
          ],
          borderWidth: 0,
          hoverOffset: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "70%",
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "rgba(15,23,42,0.95)",
            titleColor: "#e5e7eb",
            bodyColor: "#e5e7eb",
            borderColor: "rgba(148,163,184,0.4)",
            borderWidth: 1
          }
        }
      }
    });
  }
});

// --- Scroll Reveal Animations ---
(function () {
  const once = true;
  const inViewObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        if (once) {
          inViewObserver.unobserve(entry.target);
        }
      }
    });
  }, { threshold: 0.2, rootMargin: "0px 0px -10% 0px" });

  window.initInViewAnimations = function (selector = ".animate-on-scroll") {
    document.querySelectorAll(selector).forEach((el) => {
      inViewObserver.observe(el);
    });
  };
  
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => window.initInViewAnimations());
  } else {
    setTimeout(() => window.initInViewAnimations(), 100);
  }
})();

// --- UnicornStudio Dynamic Script Loader ---
(function () {
  function initUnicornStudio() {
    if (window.UnicornStudio && !window.UnicornStudio.isInitialized) {
      window.UnicornStudio.init();
      window.UnicornStudio.isInitialized = true;
    }
  }

  if (!window.UnicornStudio || !window.UnicornStudio.init) {
    window.UnicornStudio = window.UnicornStudio || { isInitialized: false };
    var i = document.createElement("script");
    i.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js";
    i.onload = initUnicornStudio;
    (document.head || document.body).appendChild(i);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initUnicornStudio, { once: true });
  } else {
    initUnicornStudio();
  }
})();

// --- Interactive Mobile Menu Toggle ---
(function () {
  window.addEventListener("DOMContentLoaded", () => {
    // Hamburger button
    const navHeader = document.querySelector("header");
    if (!navHeader) return;

    const hamburgerBtn = navHeader.querySelector("button.lg\\:hidden");
    if (!hamburgerBtn) return;

    // Create mobile menu overlay container
    const mobileMenu = document.createElement("div");
    mobileMenu.className = "fixed inset-0 z-40 hidden flex-col bg-slate-950/95 backdrop-blur-md p-6 pt-24 space-y-6 text-xl font-medium text-slate-200 transition-all duration-300";
    
    // Copy nav links
    const navLinks = navHeader.querySelectorAll("nav a");
    const menuLinksContainer = document.createElement("div");
    menuLinksContainer.className = "flex flex-col space-y-6 text-center";
    
    navLinks.forEach(link => {
      const newLink = link.cloneNode(true);
      newLink.className = "hover:text-sky-400 transition-colors";
      // Close menu on click
      newLink.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        document.body.classList.remove("overflow-hidden");
      });
      menuLinksContainer.appendChild(newLink);
    });

    mobileMenu.appendChild(menuLinksContainer);
    document.body.appendChild(mobileMenu);

    // Toggle menu logic
    hamburgerBtn.addEventListener("click", () => {
      const isHidden = mobileMenu.classList.contains("hidden");
      if (isHidden) {
        mobileMenu.classList.remove("hidden");
        document.body.classList.add("overflow-hidden");
        hamburgerBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;
      } else {
        mobileMenu.classList.add("hidden");
        document.body.classList.remove("overflow-hidden");
        hamburgerBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`;
      }
    });
  });
})();

// --- Interactive FAQ Accordion ---
(function () {
  window.addEventListener("DOMContentLoaded", () => {
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(item => {
      const trigger = item.querySelector(".faq-trigger");
      const content = item.querySelector(".faq-content");
      const icon = item.querySelector(".faq-icon");
      
      if (trigger && content && icon) {
        trigger.addEventListener("click", () => {
          const isHidden = content.classList.contains("hidden");
          // Close all other FAQs
          faqItems.forEach(otherItem => {
            const otherContent = otherItem.querySelector(".faq-content");
            const otherIcon = otherItem.querySelector(".faq-icon");
            if (otherContent && otherContent !== content) {
              otherContent.classList.add("hidden");
            }
            if (otherIcon && otherIcon !== icon) {
              otherIcon.classList.remove("bg-slate-800", "text-sky-400");
              otherIcon.classList.add("bg-white/5", "text-slate-400");
              otherIcon.innerHTML = `<svg class="lucide lucide-plus" fill="none" height="14" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="14" xmlns="http://www.w3.org/2000/svg"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>`;
            }
          });
          
          if (isHidden) {
            content.classList.remove("hidden");
            icon.classList.remove("bg-white/5", "text-slate-400");
            icon.classList.add("bg-slate-800", "text-sky-400");
            icon.innerHTML = `<svg class="lucide lucide-minus" fill="none" height="14" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="14" xmlns="http://www.w3.org/2000/svg"><path d="M5 12h14"></path></svg>`;
          } else {
            content.classList.add("hidden");
            icon.classList.remove("bg-slate-800", "text-sky-400");
            icon.classList.add("bg-white/5", "text-slate-400");
            icon.innerHTML = `<svg class="lucide lucide-plus" fill="none" height="14" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="14" xmlns="http://www.w3.org/2000/svg"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>`;
          }
        });
      }
    });
  });
})();

