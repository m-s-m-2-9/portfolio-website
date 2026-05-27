/* ═══════════════════════════════════════════════════════════════════
   admin-control/pages/thoughts.js
   ───────────────────────────────────────────────────────────────────
   WHAT THIS FILE DOES:
   Controls the THOUGHTS & BELIEFS page.
   Organised into categories. Each category has posts inside it.

   HOW TO ADD A CATEGORY:
   Add a new object to the 'categories' array.

   HOW TO ADD A POST to an existing category:
   Find the category by its id, then add to its 'posts' array.

   POST FORMAT:
   {
     date  : 'Month YYYY',
     title : 'Post Title',
     body  : 'Your thoughts here.',
   }
═══════════════════════════════════════════════════════════════════ */

window.ADMIN_THOUGHTS = {

  sectionLabel: '11 — Thoughts',
  heading     : 'On everything that matters.',

  /* ── Belief Categories ──────────────────────────────────────────── */
  categories: [

    {
      id     : 'politics',
      icon   : '🏛️',
      title  : 'Politics',
      preview: 'Power, governance, and what it means to be Indian.',
      posts  : [
        {
          date : 'May 2026',
          title: 'Replace — Post Title',
          body : 'Replace this with your actual thoughts. Be honest. Be specific. Say what you actually think.',
        },
        /* ── Add more posts here ── */
      ],
    },

    {
      id     : 'god',
      icon   : '✦',
      title  : 'God & Faith',
      preview: 'Questions I sit with. Answers I\'m still finding.',
      posts  : [
        {
          date : 'April 2026',
          title: 'Replace — Post Title',
          body : 'Replace this with your thoughts on faith, religion, or the absence of it.',
        },
      ],
    },

    {
      id     : 'science',
      icon   : '🔬',
      title  : 'Science',
      preview: 'The universe doesn\'t care. And somehow that\'s beautiful.',
      posts  : [
        {
          date : 'March 2026',
          title: 'Replace — Post Title',
          body : 'Replace this with your thoughts on science, the cosmos, or discovery.',
        },
      ],
    },

    {
      id     : 'life',
      icon   : '◎',
      title  : 'Life & Philosophy',
      preview: 'Why we\'re here, how to live well, and the rest of it.',
      posts  : [
        {
          date : 'February 2026',
          title: 'Replace — Post Title',
          body : 'Replace this with your thoughts on how to live.',
        },
      ],
    },

    {
      id     : 'society',
      icon   : '🌐',
      title  : 'Society & Culture',
      preview: 'Patterns in people. What we celebrate. What we should question.',
      posts  : [
        {
          date : 'January 2026',
          title: 'Replace — Post Title',
          body : 'Replace with your observations about society.',
        },
      ],
    },

    {
      id     : 'tech',
      icon   : '⌬',
      title  : 'Technology',
      preview: 'AI, the internet, attention — and what it\'s doing to us.',
      posts  : [
        {
          date : 'December 2025',
          title: 'Replace — Post Title',
          body : 'Replace with your thoughts on technology.',
        },
      ],
    },

  ],

};
