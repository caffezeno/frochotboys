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
          <u><b>Vernissage 14.02.2026 - 18:00</b></u><br><br>
          Hotel le Pigalle<br>
          9 rue Frochot<br>
          75009 Paris<br><br>
          <!-- <strong>Central themes</strong>: Community around a physical place. Renaissance of community. Experiencing daily life. Rue Frochot, South Pigalle, Paris. -->
      `,
      rsvp_title: "RSVP",
      rsvp_subtitle: "Please fill in the form below.",
      rsvp_name: "Name",
      rsvp_email: "Email",
      rsvp_guests: "Number of guests",
      rsvp_note: "Note (optional)",
      rsvp_submit: "Send",
      rsvp_reassurance: "You will receive a confirmation email closer to the date.",
      thanks_title: "Thank you",
      thanks_text: "Your RSVP has been received.<br>We look forward to welcoming you.",
      thanks_back: "Back to home",
        



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
        <u><b>Vernissage 14.02.2026 - 18:00</b></u><br><br>
        Hôtel Le Pigalle<br>
        9 rue Frochot<br>
        75009 Paris<br><br>
        <!--<strong>Thématiques centrales</strong> : communauté autour d’un lieu physique. Renaissance du lien collectif. Expérience du quotidien. Rue Frochot, South Pigalle, Paris. -->
      `,
      rsvp_title: "RSVP",
      rsvp_subtitle: "Merci de remplir le formulaire ci-dessous.",
      rsvp_name: "Nom",
      rsvp_email: "Email",
      rsvp_guests: "Nombre d’invités",
      rsvp_note: "Note (facultatif)",
      rsvp_submit: "Envoyer",
      rsvp_reassurance: "Vous recevrez un email de confirmation à l’approche de la date.",
      thanks_title: "Merci",
      thanks_text: "Votre inscription a bien été prise en compte.<br>Au plaisir de vous accueillir.",
      thanks_back: "Retour à l’accueil",



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

    // HTML blocks (allow <br>, <strong>, etc.)
    const blockItems = document.querySelectorAll("[data-i18n-block]");

    blockItems.forEach(el => {
      const key = el.getAttribute("data-i18n-block");
      if (DICT[lang][key]) el.innerHTML = DICT[lang][key];
    });

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
