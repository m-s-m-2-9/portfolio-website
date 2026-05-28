/* ═══════════════════════════════════════════════════════════════════
   admin-control/pages/lists.js
   ───────────────────────────────────────────────────────────────────
   WHAT THIS FILE DOES:
   Controls the CURATIONS / LISTS page.
   Four tabs: Series · Books · Places · Movies

   HOW TO ADD AN ITEM:
   Add a new object to any category array below.

   STATUS OPTIONS (copy-paste exactly):
   'seen'    → watched / read / visited  (green)
   'want'    → want to watch/read/visit  (gold)
   'reading' → currently reading         (blue)
   'ongoing' → currently watching        (gold)

   STATUS LABEL:
   The text shown on the badge (you can write anything).
═══════════════════════════════════════════════════════════════════ */

window.ADMIN_LISTS = {

  sectionLabel: '10 — Curations',
  heading     : 'Things worth\nexperiencing.',  /* \n = line break */

  /* ── Web Series ─────────────────────────────────────────────────── */
  series: [
    {
      title : 'Breaking Bad',
      meta  : 'Drama · 2008–2013',
      status: 'seen',
      label : 'Watched',
    },
    /* ── Add more ──
    {
      title : 'Series Name',
      meta  : 'Genre · Year',
      status: 'want',
      label : 'Want to watch',
    },
    ──────────────── */

     {
      title : 'Squid Game',
      meta  : 'Survival Thriller · 2021–2025',
      status: 'seen',
      label : 'Watched',
    },



     {
      title : 'Asur',
      meta  : 'Psychological Crime Thriller · 2020–2023',
      status: 'seen',
      label : 'Watched',
    },


     {
      title : 'Money Heist',
      meta  : 'Crime Drama, Heist Thriller, and Suspense  · 2017–2021',
      status: 'seen',
      label : 'Watched',
    },


     {
      title : 'Stranger Things',
      meta  : 'Science-Fiction, Horror, and Supernatural Drama · 2016–2025',
      status: 'seen',
      label : 'Watched',
    },


     {
      title : 'House M.D',
      meta  : 'Medical Drama, Mystery · 2004–2012',
      status: 'ongoing',
      label : 'Watching',
    },


     {
      title : 'Suits',
      meta  : 'Legal Drama, Comedy-Drama · 2011–2019',
      status: 'seen',
      label : 'Watched',
    },

 {
      title : 'The Rookie',
      meta  : 'Police Procedural, Crime Drama, Action · 2018–Present',
      status: 'ongoing',
      label : 'Watching',
    },


     
  ],

  /* ── Books ──────────────────────────────────────────────────────── */
  books: [
{
title : 'It Starts With Us',
meta  : 'Colleen Hoover · 2022',
status: 'seen',
label : 'read',
},

{
title : 'It Ends With Us',
meta  : 'Colleen Hoover · 2016',
status: 'seen',
label : 'read',
},

{
title : 'Twisted Love',
meta  : 'Ana Huang · 2021',
status: 'ongoing',
label : 'currently watching',
},

{
title : 'Ikigai',
meta  : 'Héctor García and Francesc Miralles · 2016',
status: 'seen',
label : 'read / seen',
},

{
title : 'To Kill a Mockingbird',
meta  : 'Harper Lee · 1960',
status: 'seen',
label : 'read / seen',
},

{
title : 'Rich Dad Poor Dad',
meta  : 'Robert T. Kiyosaki · 1997',
status: 'seen',
label : 'read / seen',
},

{
title : 'The Psychology of Money',
meta  : 'Morgan Housel · 2020',
status: 'ongoing',
label : 'currently watching',
},

{
title : 'A Man Called Ove',
meta  : 'Fredrik Backman · 2012',
status: 'seen',
label : 'read',
},

{
title : 'The Subtle Art of Not Giving a F*ck',
meta  : 'Mark Manson · 2016',
status: 'seen',
label : 'read',
},

{
title : 'Everything Is F*cked',
meta  : 'Mark Manson · 2019',
status: 'want',
label : 'want to watch/read/visit',
},

{
title : 'Without Merit',
meta  : 'Colleen Hoover · 2017',
status: 'want',
label : 'read',
},

{
title : 'Man Kya Hai',
meta  : 'J. Krishnamurti · 2015',
status: 'seen',
label : 'read',
},
],
  /* ── Places ─────────────────────────────────────────────────────── */
  places: [
    {
      title : 'Tokyo, Japan',
      meta  : 'Asia · Someday',
      status: 'want',
      label : 'Bucket list',
    },
    /* ── Add more ── */
  ],

  /* ── Movies ─────────────────────────────────────────────────────── */
  movies: [
    {
      title : 'Replace — Movie Title',
      meta  : 'Director · Year',
      status: 'seen',
      label : 'Watched',
    },
    /* ── Add more ── */
  ],

};
