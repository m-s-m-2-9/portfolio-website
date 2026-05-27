/* ═══════════════════════════════════════════════════════════════════
   admin-control/buttons/home.js
   ───────────────────────────────────────────────────────────────────
   WHAT THIS FILE DOES:
   Controls the quick-link grid at the bottom of the homepage.
   These are the 6 boxes with arrows like "Identity →".
   ───────────────────────────────────────────────────────────────────
   HOW TO EDIT:
   · Change 'label' to rename a button.
   · Change 'page' to link to a different page.
   · Reorder objects to reorder the grid.
   · Keep exactly 6 items for the best visual layout (or adjust CSS).
═══════════════════════════════════════════════════════════════════ */

window.ADMIN_HOME_BUTTONS = {

  /* ── Hero Quick-Links Grid ─────────────────────────────────────── */
  links: [
    { label: 'Identity',    page: 'about'    },
    { label: 'Journey',     page: 'journey'  },
    { label: 'CV / Résumé', page: 'resume'   },
    { label: 'Thoughts',    page: 'thoughts' },
    { label: 'Photos',      page: 'photos'   },
    { label: 'Get in touch',page: 'contact'  },
  ],

};
