/* ═══════════════════════════════════════════════════════════════════
   admin-control/pages/projects.js
   ───────────────────────────────────────────────────────────────────
   WHAT THIS FILE DOES:
   Controls the PROJECTS page.
   Three tabs: Completed · Currently Working On · Abandoned

   ⚠️  NATIONALS RULE:
   Nationals must ALWAYS be the LAST item in whatever tab it
   appears in. Never add items after the Nationals entry.
   Add new items BEFORE the Nationals entry.

   HOW TO ADD A PROJECT:
   Add a new object to the relevant array.
   Add it BEFORE the Nationals entry.

   STATUS OPTIONS:
   'completed' → green badge
   'ongoing'   → gold badge
   'abandoned' → red badge
═══════════════════════════════════════════════════════════════════ */

window.ADMIN_PROJECTS = {

  sectionLabel: '11 — Projects',
  heading     : 'Things I\'ve built.\nThings I\'m building.',

  /* ── Completed Projects ─────────────────────────────────────────── */
  completed: [

    {
      title : 'E-commerce Prototype',
      meta  : 'Web · 2024',
      status: 'completed',
      label : 'Completed',
    },

    {
      title : 'Until The Bullet Woke Me',
      meta  : 'Creative Writing · 2024',
      status: 'completed',
      label : 'Completed',
    },

    /* ── Add new COMPLETED projects above this line ── */

    /* ⚠️  NATIONALS — ALWAYS LAST. DO NOT MOVE. */
    {
      title : 'Nationals',
      meta  : 'Competition · 2024',
      status: 'completed',
      label : 'Completed',
    },

  ],

  /* ── Currently Working On ───────────────────────────────────────── */
  working: [

    {
      title : 'MSM Personal Website',
      meta  : 'Web · 2025 – Present',
      status: 'ongoing',
      label : 'Currently Working On',
    },

    /* ── Add new WORKING projects above this line ── */

    /* ⚠️  NATIONALS — ALWAYS LAST. DO NOT MOVE. */
    {
      title : 'Nationals',
      meta  : 'Competition · Ongoing',
      status: 'ongoing',
      label : 'Currently Working On',
    },

  ],

  /* ── Abandoned ──────────────────────────────────────────────────── */
  abandoned: [

    {
      title : 'Replace — Abandoned Project',
      meta  : 'Type · Year',
      status: 'abandoned',
      label : 'Abandoned',
    },

    /* ── Add new ABANDONED projects above this line ── */

    /* ⚠️  NATIONALS — ALWAYS LAST. DO NOT MOVE. */
    {
      title : 'Nationals',
      meta  : 'Competition · Reference',
      status: 'abandoned',
      label : 'Abandoned',
    },

  ],

};
