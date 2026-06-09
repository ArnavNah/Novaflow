import { Chart, registerables } from 'chart.js';
import * as lucide from 'lucide';

Chart.register(...registerables);

// Initialize Lucide Icons
function initApp() {
  console.log("initApp: started");
  try {
    if (lucide && lucide.createIcons) {
      console.log("initApp: initializing Lucide icons");
      lucide.createIcons();
    }
  } catch (err) {
    console.error("initApp: error in lucide.createIcons", err);
  }

  // Set current year in footer
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear().toString();
  }

  // --- Chart.js Configuration ---
  try {
    const engagementCtx = document.getElementById("engagementChart");
    if (engagementCtx) {
      console.log("initApp: initializing engagementChart");
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
  } catch (err) {
    console.error("initApp: error initializing engagementChart", err);
  }

  try {
    const distributionCtx = document.getElementById("distributionChart");
    if (distributionCtx) {
      console.log("initApp: initializing distributionChart");
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
  } catch (err) {
    console.error("initApp: error initializing distributionChart", err);
  }

  // --- Testimonial Slider Configuration ---
  console.log("initApp: setting up testimonial slider");
  try {
  const testimonials = [
    {
      quote: "“NovaFlow gave our CS team complete account clarity. We consolidated four disconnected analytics tools into one central console, allowing us to spot upgrades early and grow our NRR by 18% in under one quarter.”",
      author: "VP of Customer Operations",
      company: "Enterprise SaaS Provider · +18% NRR Uplift",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
      metrics: [
        { label: "Average NRR Uplift", value: "+15%", sub: "within 90 days" },
        { label: "Handoff Efficiency", value: "4.2×", sub: "faster response" },
        { label: "Contraction Prevented", value: "−30%", sub: "fewer customer downgrades" }
      ]
    },
    {
      quote: "“Before NovaFlow, we were manually checking spreadsheets for customer usage spikes. Now, automated playbooks trigger the moment a client reaches seat limits. It has scaled our upsell volume by 4.5x.”",
      author: "Sarah Chen",
      company: "VP of Customer Success, CloudScale · +22% NRR Uplift",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
      metrics: [
        { label: "Average NRR Uplift", value: "+22%", sub: "within 90 days" },
        { label: "Handoff Efficiency", value: "4.5×", sub: "faster response" },
        { label: "Contraction Prevented", value: "−40%", sub: "fewer customer downgrades" }
      ]
    },
    {
      quote: "“NovaFlow's integration with Segment and Stripe was incredibly smooth. Our CSMs receive real-time alerts in Slack when accounts are ripe for contract expansion, helping us secure renewals with ease.”",
      author: "Marcus Vance",
      company: "Director of RevOps, VibeMetrics · +15% NRR Uplift",
      avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80",
      metrics: [
        { label: "Average NRR Uplift", value: "+15%", sub: "within 90 days" },
        { label: "Handoff Efficiency", value: "2.8×", sub: "faster response" },
        { label: "Contraction Prevented", value: "−25%", sub: "fewer customer downgrades" }
      ]
    }
  ];

  let currentTestimonialIndex = 0;

  const quoteEl = document.getElementById("testimonialQuote");
  const avatarEl = document.getElementById("testimonialAvatar");
  const authorEl = document.getElementById("testimonialAuthor");
  const companyEl = document.getElementById("testimonialCompany");
  const prevBtn = document.getElementById("testimonialPrevBtn");
  const nextBtn = document.getElementById("testimonialNextBtn");
  const progressBar = document.getElementById("testimonialProgressBar");

  const m1Label = document.getElementById("testimonialMetric1Label");
  const m1Value = document.getElementById("testimonialMetric1Value");
  const m1Sub = document.getElementById("testimonialMetric1Sub");

  const m2Label = document.getElementById("testimonialMetric2Label");
  const m2Value = document.getElementById("testimonialMetric2Value");
  const m2Sub = document.getElementById("testimonialMetric2Sub");

  const m3Label = document.getElementById("testimonialMetric3Label");
  const m3Value = document.getElementById("testimonialMetric3Value");
  const m3Sub = document.getElementById("testimonialMetric3Sub");

  const cardContainer = document.getElementById("testimonialCard");

  function updateTestimonial(index) {
    console.log("updateTestimonial called with index:", index);
    if (!quoteEl) {
      console.error("updateTestimonial: quoteEl is missing!");
      return;
    }
    
    // Smooth transition: fade out, swap text, fade in
    if (cardContainer) {
      cardContainer.style.opacity = "0";
      cardContainer.style.transform = "translateY(5px)";
      cardContainer.style.transition = "opacity 0.2s ease, transform 0.2s ease";
    }

    setTimeout(() => {
      const data = testimonials[index];
      
      quoteEl.textContent = data.quote;
      if (avatarEl) avatarEl.src = data.avatar;
      if (authorEl) authorEl.textContent = data.author;
      if (companyEl) companyEl.textContent = data.company;

      if (m1Label) m1Label.textContent = data.metrics[0].label;
      if (m1Value) m1Value.textContent = data.metrics[0].value;
      if (m1Sub) m1Sub.textContent = data.metrics[0].sub;

      if (m2Label) m2Label.textContent = data.metrics[1].label;
      if (m2Value) m2Value.textContent = data.metrics[1].value;
      if (m2Sub) m2Sub.textContent = data.metrics[1].sub;

      if (m3Label) m3Label.textContent = data.metrics[2].label;
      if (m3Value) m3Value.textContent = data.metrics[2].value;
      if (m3Sub) m3Sub.textContent = data.metrics[2].sub;

      // Update progress bar
      if (progressBar) {
        const percentage = ((index + 1) / testimonials.length) * 100;
        progressBar.style.width = percentage + "%";
      }

      if (cardContainer) {
        cardContainer.style.opacity = "1";
        cardContainer.style.transform = "translateY(0)";
      }
    }, 200);
  }

  console.log("initApp: elements queried:", {
    quoteEl, avatarEl, authorEl, companyEl, prevBtn, nextBtn, progressBar, cardContainer
  });

  if (prevBtn && nextBtn) {
    console.log("initApp: binding click listeners to buttons");
    prevBtn.addEventListener("click", () => {
      console.log("initApp: prev button clicked");
      currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
      updateTestimonial(currentTestimonialIndex);
    });

    nextBtn.addEventListener("click", () => {
      console.log("initApp: next button clicked");
      currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
      updateTestimonial(currentTestimonialIndex);
    });
  } else {
    console.warn("initApp: prevBtn or nextBtn is missing!", { prevBtn, nextBtn });
  }
  } catch (err) {
    console.error("initApp: error setting up testimonial slider", err);
  }
}

if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}

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

