const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const projectForm = document.getElementById("projectForm");
const successPopup = document.getElementById("successPopup");
const clickBurst = document.getElementById("ctaClickBurst");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuBtn.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuBtn.classList.remove("active");
  });
});

document.addEventListener("click", (e) => {
  const isInsideNav = navLinks.contains(e.target);
  const isMenuButton = menuBtn.contains(e.target);

  if (!isInsideNav && !isMenuButton) {
    navLinks.classList.remove("active");
    menuBtn.classList.remove("active");
  }
});

window.addEventListener("load", () => {
  requestAnimationFrame(() => {
    document.body.classList.add("loaded");
  });
});

const popups = document.querySelectorAll(".pop-up");

function revealOnScroll() {
  popups.forEach((item) => {
    const top = item.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (top < windowHeight - 70) {
      item.classList.add("show");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

const tiltCards = document.querySelectorAll(".tilt-card");

tiltCards.forEach((card) => {
  let rafId = null;

  card.addEventListener("mousemove", (e) => {
    if (window.innerWidth <= 820) return;
    if (rafId) return;

    rafId = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateY = ((x / rect.width) - 0.5) * 4;
      const rotateX = ((y / rect.height) - 0.5) * -4;

      card.style.transform =
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;

      rafId = null;
    });
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
  });
});

const pricingCards = document.querySelectorAll(".pricing-card");

pricingCards.forEach((card) => {
  let rafId = null;

  card.addEventListener("mousemove", (e) => {
    if (window.innerWidth <= 820) return;
    if (rafId) return;

    rafId = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateY = ((x / rect.width) - 0.5) * 5.5;
      const rotateX = ((y / rect.height) - 0.5) * -5.5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;

      card.style.background = `
        radial-gradient(circle at ${x}px ${y}px, rgba(167,139,250,0.28), rgba(255,255,255,0.03) 34%, rgba(255,255,255,0.02) 72%)
      `;

      card.style.boxShadow = `
        0 0 46px rgba(167,139,250,0.20),
        0 0 92px rgba(139,92,246,0.08),
        0 20px 50px rgba(0,0,0,0.35)
      `;

      rafId = null;
    });
  });

  card.addEventListener("mouseleave", () => {
    if (card.classList.contains("featured")) {
      card.style.background =
        "linear-gradient(180deg, rgba(139,92,246,0.18), rgba(255,255,255,0.03))";
    } else {
      card.style.background =
        "linear-gradient(180deg, rgba(139,92,246,0.11), rgba(255,255,255,0.02))";
    }

    card.style.boxShadow = "";
    card.style.transform = "";
  });
});

function triggerOrderBurst(x, y) {
  if (!clickBurst) return;

  clickBurst.style.left = `${x}px`;
  clickBurst.style.top = `${y}px`;
  clickBurst.classList.remove("active");

  requestAnimationFrame(() => {
    clickBurst.classList.add("active");
  });

  setTimeout(() => {
    clickBurst.classList.remove("active");
  }, 1000);
}

document.querySelectorAll(".trigger-order-animation").forEach((el) => {
  el.addEventListener("click", () => {
    const rect = el.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    triggerOrderBurst(x, y);

    el.animate(
      [
        { transform: "perspective(900px) translateZ(0) scale(1) rotateX(0deg) rotateY(0deg)" },
        { transform: "perspective(900px) translateZ(28px) scale(0.94) rotateX(16deg) rotateY(-8deg)" },
        { transform: "perspective(900px) translateZ(12px) scale(1.04) rotateX(-6deg) rotateY(4deg)" },
        { transform: "perspective(900px) translateZ(0) scale(1) rotateX(0deg) rotateY(0deg)" }
      ],
      {
        duration: 780,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)"
      }
    );

    document.body.classList.remove("order-zoom");
    requestAnimationFrame(() => {
      document.body.classList.add("order-zoom");
    });

    setTimeout(() => {
      document.body.classList.remove("order-zoom");
    }, 900);
  });
});

if (projectForm) {
  projectForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const customerName = document.getElementById("customerName").value.trim();
    const phoneNumber = document.getElementById("phoneNumber").value.trim();
    const whatsappNumber = document.getElementById("whatsappNumber").value.trim();
    const emailAddress = document.getElementById("emailAddress").value.trim();
    const businessName = document.getElementById("businessName").value.trim();
    const businessCategory = document.getElementById("businessCategory").value.trim();
    const websitePurpose = document.getElementById("websitePurpose").value.trim();
    const businessLocation = document.getElementById("businessLocation").value.trim();
    const requiredPages = document.getElementById("requiredPages").value.trim();
    const featuresNeeded = document.getElementById("featuresNeeded").value.trim();

    const message = `Hi Kolaru Codings, I want to build a website for my business.

*Your Details*
Name: ${customerName}
Phone Number: ${phoneNumber}
WhatsApp Number: ${whatsappNumber}
Email Address: ${emailAddress || "Not provided"}

*Business Details*
Business Name: ${businessName}
Business Category: ${businessCategory}
Purpose of Website: ${websitePurpose}
Business Location: ${businessLocation || "Not provided"}
Required Pages: ${requiredPages || "Not provided"}
Features Needed: ${featuresNeeded || "Not provided"}`;

    const whatsappUrl = `https://wa.me/919360310580?text=${encodeURIComponent(message)}`;

    successPopup.classList.add("show");
    projectForm.reset();

    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
    }, 900);

    setTimeout(() => {
      successPopup.classList.remove("show");
    }, 4200);
  });
}
