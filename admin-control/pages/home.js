/* ═══════════════════════════════════════════════════════════════════
   admin-control/pages/home.js
   ───────────────────────────────────────────────────────────────────
   WHAT THIS FILE DOES:
   Controls all text content on the HOMEPAGE (the first page you see).
   ───────────────────────────────────────────────────────────────────
   SECTIONS YOU CAN EDIT:
   · heroName     — the big name on the screen
   · tagline      — the small uppercase line below the name
   · navHint      — the paragraph with the "contact me" link
   · scrollLabel  — the word under the scroll indicator line
   · footer       — bottom strip text
═══════════════════════════════════════════════════════════════════ */

window.ADMIN_HOME = {

  /* ── Hero Name ─────────────────────────────────────────────────── */
  /*
    Split into 3 words because they animate in separately.
    DO NOT combine them into one string.
  */
  heroName: {
    word1: 'Manomay',     /* ← first word  */
    word2: 'Shailendra',  /* ← second word */
    word3: 'Misra',       /* ← third word  */
  },

  /* ── Tagline (below hero name) ────────────────────────────────── */
  tagline: 'Connecting the dots · Making something of it all',

  /* ── Nav hint paragraph ───────────────────────────────────────── */
  /*
    The small paragraph below the tagline.
    Keep it short. The {contactLink} token is replaced with a
    clickable link that goes to the Contact page.
    Leave {contactLink} exactly as-is.
  */
  navHint: 'Navigate using the links above. Some sections are protected — {contactLink} for the password.',
  navHintLinkText: 'contact Manomay Shailendra Misra', /* ← the clickable part */

  /* ── Scroll indicator ─────────────────────────────────────────── */
  scrollLabel: 'Explore',

  /* ── Footer strip ─────────────────────────────────────────────── */
  footerLeft : '© 2026 Manomay Shailendra Misra',
  footerRight: 'Built with intention, not a template.',

};
