/* ═══════════════════════════════════════════════════════════════════
   admin-control/other/passwords.js
   ───────────────────────────────────────────────────────────────────
   WHAT THIS FILE DOES:
   ALL passwords for every locked section of your site live here.
   One place. Never hunt through code again.

   ⚠️  SECURITY WARNING:
   These passwords ARE visible in browser DevTools if someone looks.
   This is fine for a personal portfolio — it just keeps casual
   visitors out. Do NOT put bank passwords or secrets here.
   ───────────────────────────────────────────────────────────────────
   HOW TO EDIT:
   Change the password string after the colon.
   Keep quotes. Keep the key names exactly as they are.
═══════════════════════════════════════════════════════════════════ */

window.ADMIN_PASSWORDS = {

  /* ── Page Section Passwords ─────────────────────────────────────── */
  about   : 'YOUR_ABOUT_PASSWORD',    /* ← locks "More · Private" on Identity  */
  photos  : 'YOUR_PHOTOS_PASSWORD',   /* ← locks private photo albums          */
  journey : 'YOUR_JOURNEY_PASSWORD',  /* ← locks private journey entries       */
  lists   : 'YOUR_LISTS_PASSWORD',    /* ← locks full curations list           */
  birthday: 'YOUR_BIRTHDAY_PASSWORD', /* ← locks birth details on Clock page   */
  games   : 'YOUR_GAMES_PASSWORD',    /* ← locks private/family games          */

  /* ── Full-Page Gate Password ───────────────────────────────────── */
  /*
    If you ever want a page completely gated (like Profiles or a
    secret page), put its ID and password here.
    Format:  pageId: 'password'
  */
  gate: {
    /* example:  secret: 'onlymanomayknows' */
  },

};
