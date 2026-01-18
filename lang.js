document.addEventListener("DOMContentLoaded", () => {
  const DICT = {
    en: {
      home: "Home",
      subtitle: "group exhibition",
      artists: "Artists",
      works: "Works",
      press: "Press",
      rsvp: "RSVP",
      coming: "COMING SOON",
      intro: `
<u>Vernissage February 14th 2026</u><br><br>
Hotel le Pigalle<br>
9 rue Frochot<br>
75009 Paris<br><br>
<!-- <strong>Central themes</strong>: Community around a physical place. Renaissance of community. Experiencing daily life. Rue Frochot, South Pigalle, Paris. -->
      `
    },
    fr: {
      home: "Accueil",
      subtitle: "exposition collective",
      artists: "Artistes",
      works: "Œuvres",
      press: "Presse",
      rsvp: "RSVP",
      coming: "BIENTÔT",
      intro: `
<u><b>Vernissage le 14 février 2026</b></u><br><br>
Hôtel Le Pigalle<br>
9 rue Frochot<br>
75009 Paris<br><br>
<!--<strong>Thématiques centrales</strong> : communauté autour d’un lieu physique. Renaissance du lien collectif. Expérience du quotidien. Rue Frochot, South Pigalle, Paris. -->
      `
    }
  };

  const langBtns = document.querySelectorAll(".lang-btn");
  const menuItems = document.querySelectorAll("[data-i18n]");
  const comingEl = document.querySelector(".coming");
  const introEl = document.querySelector("[data-i18n-block='intro']");

  function setLang(lang) {
    if (!DICT[lang]) return;

    // Menu + small labels
    menuItems.forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (DICT[lang][key]) el.textContent = DICT[lang][key];
    });

    // Curatorial intro (HTML allowed)
    if (introEl) {
      introEl.innerHTML = DICT[lang].intro;
    }

    // Coming soon
    if (comingEl) {
      comingEl.textContent = DICT[lang].coming;
    }

    // Toggle button state
    langBtns.forEach(btn => {
      btn.setAttribute(
        "aria-pressed",
        btn.dataset.lang === lang ? "true" : "false"
      );
    });

    // Persist language
    localStorage.setItem("site_lang", lang);

    const url = new URL(window.location.href);
    url.searchParams.set("lang", lang);
    window.history.replaceState({}, "", url);
  }

  const urlLang = new URL(window.location.href).searchParams.get("lang");
  const savedLang = localStorage.getItem("site_lang");
  const initialLang =
    urlLang === "fr" || urlLang === "en"
      ? urlLang
      : savedLang === "fr" || savedLang === "en"
      ? savedLang
      : "fr";

  setLang(initialLang);

  langBtns.forEach(btn => {
    btn.addEventListener("click", () => setLang(btn.dataset.lang));
  });
});
