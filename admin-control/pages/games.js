/* ═══════════════════════════════════════════════════════════════════
   admin-control/pages/games.js
   ───────────────────────────────────────────────────────────────────
   WHAT THIS FILE DOES:
   Controls the GAMES page — both public games and private family games.

   HOW TO ADD A PUBLIC GAME:
   Add an object to the 'publicGames' array.
   The 'type' field tells main.js which game engine to launch.
   Existing types: 'snake' | 'memory' | '2048' | 'reaction' | 'word'

   HOW TO ADD A PRIVATE GAME:
   Add an object to the 'privateGames' array.
   Set 'linkType' to 'github' or 'apk'.
═══════════════════════════════════════════════════════════════════ */

window.ADMIN_GAMES = {

  sectionLabel: '13 — Games',
  heading     : 'Take a break.\nPlay something.',

  /* ── Public Games ───────────────────────────────────────────────── */
  publicGames: [
    {
      type : 'snake',
      icon : '🐍',
      name : 'Snake',
      desc : 'Classic snake. Swipe,Arrow keys or WASD. Eat, grow, don\'t die.',
    },
    {
      type : 'memory',
      icon : '🧠',
      name : 'Memory Match',
      desc : 'Flip cards and find matching pairs. How fast can you clear the board?',
    },
    {
      type : '2048',
      icon : '🔢',
      name : '2048',
      desc : 'Slide tiles, combine numbers, reach 2048. Sounds easy. It\'s not.',
    },
    {
      type : 'reaction',
      icon : '⚡',
      name : 'Reaction Time',
      desc : 'Wait for the flash. Click as fast as you can. Test your reflexes.',
    },
    {
      type : 'word',
      icon : '📝',
      name : 'Word Scramble',
      desc : 'Unscramble the letters. Vocab meets speed. Can you crack them all?',
    },
  ],

  /* ── Private / Family Games ──────────────────────────────────────── */
  privateGames: [
    {
      icon    : '🎮',
      name    : 'Private Game 1 — REPLACE',
      desc    : 'A personal game for family only. Replace this description.',
      linkType: 'github',        /* ← 'github' or 'apk' */
      url     : 'YOUR_GITHUB_LINK_HERE',
    },
    {
      icon    : '📱',
      name    : 'Private Game 2 — REPLACE',
      desc    : 'Download the APK and install to play.',
      linkType: 'apk',
      url     : 'YOUR_APK_LINK_HERE',
    },
  ],

};
