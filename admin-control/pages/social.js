/* ═══════════════════════════════════════════════════════════════════
   admin-control/pages/social.js
   ───────────────────────────────────────────────────────────────────
   WHAT THIS FILE DOES:
   Controls the SOCIAL PROOF page — logos marquee + testimonials.
═══════════════════════════════════════════════════════════════════ */

window.ADMIN_SOCIAL = {

  sectionLabel: '02 — Social Proof',
  heading     : 'People & places\nI\'ve worked with.',

  /* ── Scrolling logos / company names ────────────────────────────── */
  /*
    These appear in the infinite scrolling strip.
    Add your real company/org names here.
  */
  logos: [
    'Iskcon',
    'Mayura Woods',
    'Golden Star PG',
    'Work In Progress',
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
      text  : '"Manomay successfully integrated our website’s chatbot automation, delivering human-like, 24/7 customer support. Their technical expertise and smart workflows reduced our support workload and streamlined lead qualification. Highly recommended for anyone wanting to elevate their digital presence!"',
      author: '— Ramaiah SK, Manager @ Mayura Woods',
    },
    {
      stars : 5,
      text  : '"Replace this with a third testimonial."',
      author: '— Name, Role @ Company',
    },
  ],

};
