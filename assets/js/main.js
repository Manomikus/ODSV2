const setupPreloader = () => {
  if (!document.body) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const preloader = document.createElement("div");
  preloader.className = "site-preloader";
  preloader.setAttribute("aria-hidden", "true");
  preloader.innerHTML = `
    <div class="preloader-core">
      <div class="preloader-orb">
        <span class="preloader-ring ring-a"></span>
        <span class="preloader-ring ring-b"></span>
        <span class="preloader-ring ring-c"></span>
        <img class="preloader-logo" src="img/Image.png" alt="" />
      </div>
      <p class="preloader-label">ODS Group</p>
      <div class="preloader-bar"><span></span></div>
    </div>
  `;

  document.body.prepend(preloader);
  document.body.classList.add("is-loading");

  const minVisibleDuration = prefersReducedMotion ? 220 : 1050;
  const startedAt = performance.now();
  let dismissed = false;

  const dismissPreloader = () => {
    if (dismissed) return;
    dismissed = true;

    const elapsed = performance.now() - startedAt;
    const delay = Math.max(0, minVisibleDuration - elapsed);

    window.setTimeout(() => {
      preloader.classList.add("is-exit");
      document.body.classList.remove("is-loading");
      window.setTimeout(() => preloader.remove(), prefersReducedMotion ? 80 : 700);
    }, delay);
  };

  if (document.readyState === "complete") {
    requestAnimationFrame(dismissPreloader);
  } else {
    window.addEventListener("load", dismissPreloader, { once: true });
    window.setTimeout(dismissPreloader, 5000);
  }
};

setupPreloader();

const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const pageId = document.body.dataset.page || "";

if (header) {
  const onScroll = () => {
    if (window.scrollY > 10) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (pageId) {
  document.querySelectorAll(".nav-link[data-page]").forEach((link) => {
    if (link.dataset.page === pageId) {
      link.classList.add("active");
    }
  });
}

const revealNodes = document.querySelectorAll(".reveal");
if (revealNodes.length > 0 && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealNodes.forEach((node) => observer.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add("is-visible"));
}

const form = document.querySelector("#contact-form");
const status = document.querySelector("#form-status");

if (form && status) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const fullname = String(formData.get("fullname") || "").trim();

    status.textContent = fullname
      ? `Merci ${fullname}, votre demande a été préparée. Nous revenons vers vous rapidement.`
      : "Merci, votre demande a été préparée. Nous revenons vers vous rapidement.";

    form.reset();
  });
}
