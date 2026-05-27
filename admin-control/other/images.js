/* ═══════════════════════════════════════════════════════════════════
   admin-control/other/images.js
   ───────────────────────────────────────────────────────────────────
   WHAT THIS FILE DOES:
   Every image path / URL used across the whole site lives here.
   Change a photo once here — it updates everywhere automatically.

   HOW TO REFERENCE IMAGES:
   · Local files: use the path relative to your index.html
     Example: 'assets/photos/my-photo.jpg'
   · External URLs: paste the full URL
     Example: 'https://i.imgur.com/abc123.jpg'
═══════════════════════════════════════════════════════════════════ */

window.ADMIN_IMAGES = {

  /* ── Core Profile Photos ─────────────────────────────────────────── */
  hero : 'assets/photos/profilepic.jpeg', /* ← circular photo on homepage     */
  about: 'assets/photos/stagepic.jpeg',  /* ← portrait on Identity page       */

  /* ── Photo Albums — Public ──────────────────────────────────────── */
  /*
    Each album entry:
    {
      id       : 'unique-id',         ← used internally, don't duplicate
      title    : 'Album Name',        ← shown on hover
      desc     : 'Short caption',     ← shown on hover
      cover    : 'path/to/thumb.jpg', ← cover thumbnail (or '' for placeholder)
      count    : 12,                  ← number shown on album card
      photos   : [                    ← array of photos inside the album
        { src: 'path.jpg', title: 'Photo title', desc: 'Caption' },
      ]
    }
  */
  publicAlbums: [
    {
      id    : 'nationals',
      title : 'NATIONALS',
      desc  : 'My Nationals Journey',
      cover : '',      /* ← paste thumbnail path here when you have one */
      icon  : '🌆',   /* ← shown when no cover image */
      count : 12,
      photos: [
        /* Add photos here:
           { src: 'assets/photos/nationals/1.jpg', title: 'Day 1', desc: 'Caption' }, */
      ],
    },
    {
      id    : 'captain',
      title : 'Captain Arc',
      desc  : 'My Captainship Journey',
      cover : '',
      icon  : '🎭',
      count : 8,
      photos: [],
    },
    {
      id    : 'farewell',
      title : 'Farewell',
      desc  : 'My Class X and XII Farewell',
      cover : '',
      icon  : '🌊',
      count : 20,
      photos: [],
    },
  ],

  /* ── Photo Albums — Private (password locked) ────────────────────── */
  privateAlbums: [
    {
      id    : 'me-us',
      title : 'Me/Us',
      desc  : 'Me With You ALL',
      cover : '',
      icon  : '💫',
      count : 15,
      photos: [],
    },
    {
      id    : 'secret',
      title : 'Secret',
      desc  : 'xyz description',
      cover : '',
      icon  : '🌹',
      count : 9,
      photos: [],
    },
  ],

};
