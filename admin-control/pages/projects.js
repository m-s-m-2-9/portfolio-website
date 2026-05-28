/* ═══════════════════════════════════════════════════════════
   admin-control/pages/projects.js
   ───────────────────────────────────────────────────────────
   Controls the PROJECTS page (page 11).

   NEW DESIGN: Single flat list (no tabs).
   Each project has a status label on the right.
   Clicking any project opens a popup with the full description.

   STATUS OPTIONS (copy-paste exactly):
     'completed' → green badge
     'ongoing'   → gold badge
     'abandoned' → red badge

   ⚠️  NATIONALS RULE:
   Nationals must ALWAYS be the LAST object in the array.
   Add new projects ABOVE the Nationals entry.
═══════════════════════════════════════════════════════════ */

window.ADMIN_PROJECTS = {

  sectionLabel: '11 — Projects',
  heading     : 'Things I\'ve built.\nThings I\'m building.',

  /* ── Flat projects list ───────────────────────────────── */
  projects: [

    {
      title      : 'E-commerce Prototype',
      meta       : 'Web · 2026',
      status     : 'completed',
      label      : 'Completed',
      /* This text appears in the popup when user clicks the project.
         Write as much or as little as you want.
         Use \n for line breaks. */
      description: 'Replace this with a real description of the E-commerce Prototype.\n\nWhat did you build? What tech did you use? What did you learn?\n\nThis is your space to tell the story of the project — its challenges, what worked, and what you would do differently.',
    },

    {
      title      : 'Until The Bullet Woke Me',
      meta       : 'Novel Writing · 2025',
      status     : 'completed',
      label      : 'Completed',
      description: 'Replace this with a description of "Until The Bullet Woke Me".\n\nWhat is it? A story, a script, a poem? What was the theme? What inspired it? Where was it published or shared?',
    },

    {
      title      : 'MSM Personal Website',
      meta       : 'Web · 2025 – Present',
      status     : 'ongoing',
      label      : 'Currently Working On',
      description: 'This website you\'re currently on.\n\nBuilt from scratch with vanilla HTML, CSS, and JavaScript. No frameworks, no templates. Features a cinematic intro, a custom content management system, a sidebar navigation system, 5 built-in games, photo albums, and a full thoughts section.\n\nEvery pixel was placed deliberately.',
    },


  ],

};
