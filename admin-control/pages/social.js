/* ═══════════════════════════════════════════════════════════════════
   admin-control/pages/social.js
   ───────────────────────────────────────────────────────────────────
   WHAT THIS FILE DOES:
   Controls the SOCIAL PROOF page — logos marquee + testimonials.
═══════════════════════════════════════════════════════════════════ */

window.ADMIN_SOCIAL = {

  sectionLabel: '13 — Social Proof',
  heading     : 'People & places\nI\'ve worked with.',

  /* ── Scrolling logos / company names ────────────────────────────── */
  /*
    These appear in the infinite scrolling strip.
    Add your real company/org names here.
  */
  logos: [
    'ISKCON',
    'Replace Company',
    'Replace Organisation',
    'Replace Studio',
    'Replace Brand',
    /* Add more: 'Company Name', */
  ],

  /* ── Testimonials ───────────────────────────────────────────────── */
  testimonials: [
    {
      stars : 5,
      text  : '"Replace this with a real testimonial from someone you worked with."',
      author: '— Name, Role @ Company',
    },
    {
      stars : 5,
      text  : '"Replace this with another testimonial."',
      author: '— Name, Role @ Company',
    },
    {
      stars : 5,
      text  : '"Replace this with a third testimonial."',
      author: '— Name, Role @ Company',
    },
  ],

};
