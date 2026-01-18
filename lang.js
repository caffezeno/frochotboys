document.addEventListener("DOMContentLoaded", () => {
  const DICT = {
    en: {
      home: "Home",
      artists: "Artists",
      works: "Works",
      press: "Press",
      rsvp: "RSVP",
      coming: "COMING SOON",
      intro: `
a group exhibition exploring the renaissance of offline community, centered around a physical place.<br><br>
<strong>Central themes</strong>: Community around a physical place. Renaissance of community. Experiencing daily life. Rue Frochot, South Pigalle, Paris.
      `
    },
    fr: {
      home: "Accueil",
      artists: "Artistes",
      works: "Œuvres",
      press: "Presse",
      rsvp: "RSVP",
      coming: "BIENTÔT",
      intro: `
une exposition collective explorant la renaissance des communautés hors ligne, centrée autour d’un lieu physique.<br><br>
<strong>Thématiques centrales</strong> : communauté autour d’un lieu physique. Renaissance du lien collectif. Expérience du quotidien. Rue Frochot, South Pigalle, Paris.
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
