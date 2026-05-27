/* ═══════════════════════════════════════════════════════════════════
   admin-control/pages/profiles.js
   ───────────────────────────────────────────────────────────────────
   WHAT THIS FILE DOES:
   Controls the external profile / social media links shown on
   the "Profiles / Digital Presence" page.

   HOW TO ADD A PROFILE:
   Copy any existing object and paste it at the bottom of the array.
   Change the id, icon, label, and url.

   icon — can be any emoji, or a 2–3 letter abbreviation string.
═══════════════════════════════════════════════════════════════════ */

window.ADMIN_PROFILES = {

  sectionLabel: '04 — Digital Presence',
  heading     : 'Find me around\nthe internet.',  /* \n = line break */

  /* ── Profile Links Array ────────────────────────────────────────── */
  links: [
    {
      id    : 'linkedin',
      icon  : '💼',
      label : 'LinkedIn',
      handle: '',            /* ← optional: @yourhandle shown below label */
      url   : '#',           /* ← paste your LinkedIn URL here            */
    },
    {
      id    : 'instagram',
      icon  : '📸',
      label : 'Instagram',
      handle: '',
      url   : '#',           /* ← paste your Instagram URL here           */
    },
    {
      id    : 'resume',
      icon  : '📄',
      label : 'Resume',
      handle: '',
      url   : 'manomay-cv.pdf',
    },
    /* ── Add more profiles here ──
    {
      id    : 'github',
      icon  : '👾',
      label : 'GitHub',
      handle: '@yourusername',
      url   : 'https://github.com/yourusername',
    },
    ─────────────────────────── */
  ],

};
