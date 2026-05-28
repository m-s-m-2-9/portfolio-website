/* ═══════════════════════════════════════════════════════════════════
   admin-control/pages/journey.js
   ───────────────────────────────────────────────────────────────────
   WHAT THIS FILE DOES:
   Controls the JOURNEY / TIMELINE page.
   Each year has a title and a body paragraph.

   HOW TO ADD A YEAR:
   Add a new object to the 'years' array following the pattern below.

   HOW IT WORKS:
   · Each year appears as a dot on the horizontal timeline.
   · Clicking a dot reveals the title + body text below.
   · Years with hasContent: false show a placeholder message.
   ───────────────────────────────────────────────────────────────────
   PRIVATE ENTRIES:
   Any entry with  private: true  is only shown after password unlock.
   Set its body text in the normal 'body' field — it is hidden by
   the password gate, not stored separately.
═══════════════════════════════════════════════════════════════════ */

window.ADMIN_JOURNEY = {

  sectionLabel      : '09 — Journey',
  heading           : '2008 to present.',
  subheading        : 'Click a year on the timeline to explore that chapter.',
  emptyPlaceholder  : 'Nothing recorded yet for this year.',

  /* ── Timeline Years ─────────────────────────────────────────────── */
  years: [

    {
      year      : 2008,
      title     : 'Born.',
      body      : `I arrived in Mumbai before I even understood what a beginning meant. While most babies announced themselves to the world with tears and panic, I apparently decided to do the exact opposite. They say I smiled. Laughed, even. A strange little creature entering the world as if life was already some private joke only he understood. Ever since then, the nickname “Manu” stayed stitched to me like an old family tradition, surviving years, cities, and growing up.

I do not remember the house I lived in back then. I do not remember the walls, the streets, or the sound of that neighborhood. My memories begin much later, as if my mind took time to switch on properly. The year exists more through stories than recollection, through fragments told by others instead of scenes I can replay myself. Yet somewhere in Mumbai, in a room I no longer remember, the first page of my story quietly began.`,
      hasContent: true,
      private   : false,
    },

    {
      year      : 2009,
      title     : 'Year One.',
      body      : `Replace this with what happened this year — or leave it blank.`,
      hasContent: false,
      private   : false,
    },

    {
      year      : 2010,
      title     : 'Year Two.',
      body      : '',
      hasContent: false,
      private   : false,
    },

    {
      year      : 2011,
      title     : 'Year Three.',
      body      : '',
      hasContent: false,
      private   : false,
    },

    {
      year      : 2012,
      title     : 'Year Four.',
      body      : '',
      hasContent: false,
      private   : false,
    },

    {
      year      : 2013,
      title     : 'Year Five.',
      body      : '',
      hasContent: false,
      private   : false,
    },

    {
      year      : 2014,
      title     : 'Year Six.',
      body      : '',
      hasContent: false,
      private   : false,
    },

    {
      year      : 2015,
      title     : 'Year Seven.',
      body      : '',
      hasContent: false,
      private   : false,
    },

    {
      year      : 2016,
      title     : 'Year Eight.',
      body      : '',
      hasContent: false,
      private   : false,
    },

    {
      year      : 2017,
      title     : 'Year Nine.',
      body      : '',
      hasContent: false,
      private   : false,
    },

    {
      year      : 2018,
      title     : 'Year Ten.',
      body      : '',
      hasContent: false,
      private   : false,
    },

    {
      year      : 2019,
      title     : 'Year Eleven.',
      body      : '',
      hasContent: false,
      private   : false,
    },

    {
      year      : 2020,
      title     : 'The Lockdown Year.',
      body      : `Replace this with your 2020 story — what happened to you during lockdown?`,
      hasContent: false,
      private   : false,
    },

    {
      year      : 2021,
      title     : 'Year Thirteen.',
      body      : '',
      hasContent: false,
      private   : false,
    },

    {
      year      : 2022,
      title     : 'Year Fourteen.',
      body      : '',
      hasContent: false,
      private   : false,
    },

    {
      year      : 2023,
      title     : 'Year Fifteen.',
      body      : '',
      hasContent: false,
      private   : false,
    },

    {
      year      : 2024,
      title     : 'ISKCON. Nationals. Things built.',
      body      : `Led 40+ students at ISKCON Summer Camp as Creative Educator and Media Coordinator. Competed at Nationals. Built the first real projects. This year was the beginning of something.`,
      hasContent: true,
      private   : false,
    },

    {
      year      : 2025,
      title     : 'Building in public.',
      body      : `Replace this with your 2025 story.`,
      hasContent: true,
      private   : false,
    },

    {
      year      : 2026,
      title     : 'Right now.',
      body      : `This is where you are. Replace this with what is happening today.`,
      hasContent: true,
      private   : false,
    },

  ],

};
