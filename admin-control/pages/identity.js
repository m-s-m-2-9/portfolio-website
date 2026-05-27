/* ═══════════════════════════════════════════════════════════════════
   admin-control/pages/identity.js
   ───────────────────────────────────────────────────────────────────
   WHAT THIS FILE DOES:
   Controls all text on the IDENTITY / ABOUT page.
   ───────────────────────────────────────────────────────────────────
   SECTIONS YOU CAN EDIT:
   · sectionLabel   — the small "01 — Identity" label
   · introQuote     — the large italic quote at the top
   · bodyText       — the main paragraph (150–200 words recommended)
   · photoCaption   — the label on your photo
   · secretText     — the private text (visible after password unlock)
═══════════════════════════════════════════════════════════════════ */

window.ADMIN_IDENTITY = {

  /* ── Section label ─────────────────────────────────────────────── */
  sectionLabel: '01 — Identity',

  /* ── Photo caption ─────────────────────────────────────────────── */
  photoCaption: 'Manomay — 2024',

  /* ── Intro quote (large italic, above body text) ──────────────── */
  introQuote: '"Building legacy without losing softness."',

  /* ── Main body text ───────────────────────────────────────────── */
  /*
    Write in plain text. Paragraphs separated by \n\n (double newline).
    Keep to 150–200 words total for best readability.
    ─────────────────────────────────────────────────────────────────
    Currently placeholder — replace with your real story.
  */
  bodyText: `Replace this with your actual about text. Write in first person. Tell the reader who you are, what drives you, what you're building. Keep it honest and specific — the more personal the better. Avoid generic phrases like "passionate about" or "hard-working". Instead, talk about something real you did, made, or felt.

This section should feel like the first page of a book, not a LinkedIn profile. You have about 150–200 words. Use them well.`,

  /* ── Secret / private text (unlocked by password) ─────────────── */
  /*
    This is only visible after entering the correct password
    from admin-control/other/passwords.js → about.
    Write whatever you want here — it's private.
  */
  secretText: 'Your private story goes here. This is only visible to people with the password.',

};
