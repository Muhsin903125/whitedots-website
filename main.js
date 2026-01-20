import "./style.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

// 1. Smooth Scroll (Lenis)
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: "vertical",
  gestureOrientation: "vertical",
  smoothWheel: true,
  wheelMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// 2. Fluid Cursor
const cursor = document.querySelector(".cursor");
const cursorLabel = document.querySelector(".cursor-label");

if (cursor) {
  window.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.1,
      ease: "power2.out",
    });
  });

  // Cursor Hover Effects
  document.querySelectorAll('[data-cursor="VIEW"]').forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("view-mode");
    });
    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("view-mode");
    });
  });
}

// 3. Mobile Menu Toggle
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    document.body.style.overflow = mobileMenu.classList.contains("active") ? "hidden" : "";
  });

  // Close menu when clicking a link
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      mobileMenu.classList.remove("active");
      document.body.style.overflow = "";
    });
  });
}

// 3.5 Theme Toggle
const themeToggle = document.getElementById("themeToggle");
const htmlElement = document.documentElement;

// Check for saved theme preference or default to dark
const savedTheme = localStorage.getItem("theme") || "dark";
if (savedTheme === "light") {
  htmlElement.setAttribute("data-theme", "light");
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = htmlElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    
    htmlElement.setAttribute("data-theme", newTheme === "light" ? "light" : "");
    localStorage.setItem("theme", newTheme);
  });
}

// 4. Magnetic Links
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("mousemove", (e) => {
    const rect = link.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(link, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  link.addEventListener("mouseleave", () => {
    gsap.to(link, {
      x: 0,
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  });
});

// 5. Split-Type Text Animations
const splitTexts = document.querySelectorAll(".split-text");
splitTexts.forEach((text) => {
  const nextSplit = new SplitType(text, { types: "chars,lines" });

  gsap.set(nextSplit.chars, { y: 100, opacity: 0 });

  ScrollTrigger.batch(nextSplit.chars, {
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        stagger: 0.02,
        duration: 1,
        ease: "power4.out",
        overwrite: true,
      }),
    start: "top 90%",
  });
});

// 6. Service Cards Animation
// const serviceCards = document.querySelectorAll(".service-card");
// if (serviceCards.length > 0) {
//   gsap.from(serviceCards, {
//     scrollTrigger: {
//       trigger: ".services-grid",
//       start: "top 70%",
//     },
//     y: 50,
//     opacity: 0,
//     duration: 1,
//     stagger: 0.1,
//     ease: "power3.out",
//   });
// }

// 7. Portfolio Items Animation
const portfolioItems = document.querySelectorAll(".portfolio-item");
if (portfolioItems.length > 0) {
  gsap.from(portfolioItems, {
    scrollTrigger: {
      trigger: ".portfolio-grid",
      start: "top 70%",
    },
    y: 60,
    opacity: 0,
    duration: 1,
    stagger: 0.15,
    ease: "power3.out",
  });
}

// 8. About Section Animation
const aboutGrid = document.querySelector(".about-grid");
if (aboutGrid) {
  gsap.from(".about-content", {
    scrollTrigger: {
      trigger: ".about-grid",
      start: "top 70%",
    },
    x: -50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from(".about-image", {
    scrollTrigger: {
      trigger: ".about-grid",
      start: "top 70%",
    },
    x: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });
}

// 9. Stats Counter Animation
const statItems = document.querySelectorAll(".stat-item h3");
statItems.forEach((stat) => {
  const value = stat.textContent;
  const numMatch = value.match(/[\d.]+/);
  
  if (numMatch) {
    const num = parseFloat(numMatch[0]);
    const suffix = value.replace(numMatch[0], "");
    
    ScrollTrigger.create({
      trigger: stat,
      start: "top 80%",
      onEnter: () => {
        gsap.from(stat, {
          textContent: 0,
          duration: 2,
          ease: "power2.out",
          snap: { textContent: 1 },
          onUpdate: function() {
            stat.textContent = Math.round(this.targets()[0].textContent) + suffix;
          }
        });
      },
      once: true
    });
  }
});

// 10. Contact Form Handling
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.name || !data.email || !data.service || !data.message) {
      alert("Please fill in all required fields.");
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    
    // Success message (in production, this would send to a server)
    alert("Thank you for your message! We'll get back to you shortly.");
    contactForm.reset();
  });
}

// 11. Fade In Elements on Scroll
const fadeElements = document.querySelectorAll(".fade-in");
fadeElements.forEach((el) => {
  ScrollTrigger.create({
    trigger: el,
    start: "top 85%",
    onEnter: () => el.classList.add("visible"),
    once: true,
  });
});

// 12. Parallax Effect on Hero
const heroSection = document.querySelector(".hero");
if (heroSection) {
  const heroContent = heroSection.querySelector(".hero-content");
  if (heroContent) {
    gsap.to(heroContent, {
      y: 100,
      opacity: 0.5,
      ease: "none",
      scrollTrigger: {
        trigger: heroSection,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }
}

// 13. Navigation Background on Scroll
// 13. Navigation Background on Scroll (Disabled to preserve Glass CSS)
/*
const nav = document.querySelector("nav");
if (nav) {
  ScrollTrigger.create({
    start: "top -50",
    onUpdate: (self) => {
      // Logic managed by CSS backdrop-filter now
    },
  });
}
*/

// 14. Image Reveal Animation
const images = document.querySelectorAll(".about-image img, .portfolio-item img");
images.forEach((img) => {
  gsap.from(img, {
    scrollTrigger: {
      trigger: img,
      start: "top 80%",
    },
    scale: 1.1,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
  });
});


