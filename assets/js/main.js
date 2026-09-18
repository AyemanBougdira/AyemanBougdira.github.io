(function () {
  "use strict";

  var root = document.documentElement;

  /* ---------------------------------------------------------------------
   * Theme (light / dark)
   * ------------------------------------------------------------------- */
  var themeBtn = document.getElementById("theme-toggle");
  var storedTheme = localStorage.getItem("theme");
  if (storedTheme) root.setAttribute("data-theme", storedTheme);

  function currentTheme() {
    if (root.getAttribute("data-theme")) return root.getAttribute("data-theme");
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyThemeIcon() {
    if (!themeBtn) return;
    themeBtn.textContent = currentTheme() === "dark" ? "☀" : "◐";
  }
  applyThemeIcon();

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
      applyThemeIcon();
    });
  }

  /* ---------------------------------------------------------------------
   * Language (EN / FR)
   * ------------------------------------------------------------------- */
  var langButtons = document.querySelectorAll(".lang-switch button");
  var bilingualEls = document.querySelectorAll("[data-en][data-fr]");

  function setLang(lang) {
    root.setAttribute("lang", lang);
    bilingualEls.forEach(function (el) {
      var text = lang === "fr" ? el.getAttribute("data-fr") : el.getAttribute("data-en");
      if (text !== null) el.textContent = text;
    });
    langButtons.forEach(function (btn) {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });
    localStorage.setItem("lang", lang);
  }

  langButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLang(btn.dataset.lang);
    });
  });

  var storedLang = localStorage.getItem("lang");
  var browserLang = (navigator.language || "en").slice(0, 2) === "fr" ? "fr" : "en";
  setLang(storedLang || browserLang);

  /* ---------------------------------------------------------------------
   * Mobile nav
   * ------------------------------------------------------------------- */
  var navToggle = document.getElementById("nav-toggle");
  var mobileMenu = document.getElementById("mobile-menu");
  if (navToggle && mobileMenu) {
    navToggle.addEventListener("click", function () {
      mobileMenu.classList.toggle("open");
    });
    mobileMenu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mobileMenu.classList.remove("open");
      });
    });
  }

  /* ---------------------------------------------------------------------
   * Scroll reveal
   * ------------------------------------------------------------------- */
  var revealEls = document.querySelectorAll(".reveal");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window) || !revealEls.length) {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { observer.observe(el); });

    // Safety net: a jump-scroll (skip link, "End" key, programmatic scroll,
    // fast flick) can move an element past the viewport without ever
    // intersecting it, leaving it permanently hidden. Sweep on scroll/resize
    // so nothing stays invisible regardless of how the user got there.
    var sweepScheduled = false;
    function sweep() {
      sweepScheduled = false;
      var vh = window.innerHeight;
      document.querySelectorAll(".reveal:not(.in)").forEach(function (el) {
        var rect = el.getBoundingClientRect();
        if (rect.top < vh && rect.bottom > 0) {
          el.classList.add("in");
          observer.unobserve(el);
        }
      });
    }
    function scheduleSweep() {
      if (sweepScheduled) return;
      sweepScheduled = true;
      requestAnimationFrame(sweep);
    }
    window.addEventListener("scroll", scheduleSweep, { passive: true });
    window.addEventListener("resize", scheduleSweep);
    window.addEventListener("hashchange", scheduleSweep);
    window.addEventListener("pageshow", scheduleSweep);
  }

  /* ---------------------------------------------------------------------
   * Footer year
   * ------------------------------------------------------------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
