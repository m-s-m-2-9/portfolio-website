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

  sectionLabel: '04 — Projects',
  heading     : 'Things I\'ve built.\nThings I\'m building.',

  /* ── Completed Projects ─────────────────────────────────────────── */
  completed: [

    {
      title : 'E-commerce Prototype',
      meta  : 'Web · 2026',
      status: 'completed',
      label : 'Completed',
    },

    {
      title : 'Until The Bullet Woke Me',
      meta  : 'Novel · 2026',
      status: 'Abandoned',
      label : 'Abandoned',
    },

    /* ── Add new COMPLETED projects above this line ── */

  ],

  /* ── Currently Working On ───────────────────────────────────────── */
  working: [

    {
      title : 'MSM Personal Website',
      meta  : 'Website · 2026 – Present',
      status: 'ongoing',
      label : 'Currently Working On',
    },

    /* ── Add new WORKING projects above this line ── */
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

   

  ],

};
