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
      meta  : 'Colleen Hoover - It Ends With Us · Year',
      status: 'reading',
      label : 'Reading',
    },


{
      title : 'It Starts With Us',
      meta  : 'Colleen Hoover - It Ends With Us · Year',
      status: 'reading',
      label : 'Reading',
    },



     {
      title : 'It Starts With Us',
      meta  : 'Colleen Hoover - It Ends With Us · Year',
      status: 'reading',
      label : 'Reading',
    },




     {
      title : 'It Starts With Us',
      meta  : 'Colleen Hoover - It Ends With Us · Year',
      status: 'reading',
      label : 'Reading',
    },




     {
      title : 'It Starts With Us',
      meta  : 'Colleen Hoover - It Ends With Us · Year',
      status: 'reading',
      label : 'Reading',
    },





     {
      title : 'It Starts With Us',
      meta  : 'Colleen Hoover - It Ends With Us · Year',
      status: 'reading',
      label : 'Reading',
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
