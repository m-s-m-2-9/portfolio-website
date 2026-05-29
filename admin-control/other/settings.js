/* ═══════════════════════════════════════════════════════════════════
   admin-control/other/settings.js
   ───────────────────────────────────────────────────────────────────
   WHAT THIS FILE DOES:
   Controls site-wide settings: your name, EmailJS keys, site title,
   social metadata, and any global configuration.

   EDIT FREELY. Nothing here will break the site structure.
   ───────────────────────────────────────────────────────────────────
   HOW TO EDIT:
   · Change any value after the colon.
   · Strings must stay inside quotes: 'like this'
   · Don't delete any keys — set them to '' if unused.
═══════════════════════════════════════════════════════════════════ */

window.ADMIN_SETTINGS = {

  /* ── Site Identity ─────────────────────────────────────────────── */
  site: {
    fullName    : 'Manomay Shailendra Misra',  /* ← your full name   */
    shortName   : 'MSM',                        /* ← initials/logo    */
    title       : 'MSM — Manomay Shailendra Misra',  /* ← browser tab  */
    description : 'Portfolio of Manomay Shailendra Misra. Born 2008, Mumbai.',
    location    : 'Bengaluru, Karnataka, India',
    email       : 'manomaysmisra2908@gmail.com', /* ← contact email   */
    phone       : '+91 8369139301',              /* ← your number     */
  },

  /* ── EmailJS — Contact Form ────────────────────────────────────── */
  /*
    To set up EmailJS:
    1. Go to https://www.emailjs.com and create a free account.
    2. Create a Service and copy the Service ID.
    3. Create a Template and copy the Template ID.
    4. Get your Public Key from Account settings.
    Paste all three below.
  */
  emailjs: {
    publicKey  : 'T0a9vyHOtW0qWGOlF',   /* ← from EmailJS account     */
    serviceId  : 'service_pz72agg',           /* ← from EmailJS Services    */
    templateId : 'template_ilxtv3c',          /* ← from EmailJS Templates   */
  },

  /* ── Aesthetic / Behaviour ─────────────────────────────────────── */
  behaviour: {
    /* How many clicks on your name triggers the vinyl easter egg */
    vinylClickCount   : 7,

    /* Whether the birthday mode ambient glow activates on your birthday */
    birthdayModeActive: true,

    /* Default theme when someone first visits (dark / light / slate / forest) */
    defaultTheme      : 'dark',
  },

};
