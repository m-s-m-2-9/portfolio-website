/* ═══════════════════════════════════════════════════════════
   admin-control/crazy/favicon-config.js
   MSM Living Favicon — Admin Configuration
   ─────────────────────────────────────────────────────────
   Edit these values to tune the favicon creature's behaviour.
   No code changes needed for normal adjustments.
═══════════════════════════════════════════════════════════ */

window.MSM_FAVICON_CONFIG = {

  /* ── Master switch ───────────────────────────────── */
  enabled: true,

  /* ── Debug mode ──────────────────────────────────── */
  /* true = logs state transitions to console */
  debug: false,

  /* ── Theme ───────────────────────────────────────── */
  /*
    'auto'  — detects OS/browser preference
    'dark'  — always use dark style (white eyes, dark bg)
    'light' — always use light style (dark eyes, white bg)
  */
  theme: 'auto',

  /* ── Canvas & visual ─────────────────────────────── */
  canvas: {
    size:          32,
    leftEye:       { cx: 10, cy: 14 },
    rightEye:      { cx: 22, cy: 14 },
    eyeRX:         4.5,           /* eye oval half-width */
    eyeRY:         6.0,           /* eye oval half-height */
    pupilRadius:   2.2,
    maxPupilOffset: 2.6,          /* max px pupil moves from center */
    browHalfW:     4.5,           /* half-width of eyebrow lines */
    browBaseY:     6.5,           /* base y for eyebrows */
  },

  /* ── Blink timing ────────────────────────────────── */
  blink: {
    minInterval:        2000,   /* ms minimum between blinks */
    maxInterval:        7000,   /* ms maximum between blinks */
    closeDuration:      80,     /* ms to close eye */
    openDuration:       100,    /* ms to open eye again */
    doubleBlinkChance:  0.15,   /* 0-1 probability of double blink */
    slowBlinkChance:    0.08,   /* 0-1 probability of slow sleepy blink */
    slowCloseDuration:  200,    /* ms slow blink close */
    slowOpenDuration:   260,    /* ms slow blink open */
  },

  /* ── Cursor tracking ─────────────────────────────── */
  cursor: {
    enabled:     true,
    ease:        0.07,   /* 0 = snap, 1 = never moves */
    microJitter: 0.35,   /* max px random micro-movement per axis */
  },

  /* ── Emotion timing ──────────────────────────────── */
  emotion: {
    transitionSpeed: 0.06,      /* lerp speed for visual transitions */
    idleMinDuration: 5000,      /* ms minimum time in idle */
    idleMaxDuration: 14000,     /* ms maximum time in idle */
  },

  /* ── Absence phases (when tab is hidden) ─────────── */
  /* Each value = ms spent in that phase before advancing */
  absence: {
    searchDuration:    22000,   /* phase 1 – searching */
    curiousDuration:   28000,   /* phase 2 – curious waiting */
    boredDuration:     30000,   /* phase 3 – bored */
    sadDuration:       20000,   /* phase 4 – becoming sad */
    cryingDuration:    35000,   /* phase 5 – crying */
    dryingDuration:    18000,   /* phase 6 – trying to stop */
    tiredDuration:     22000,   /* phase 7 – getting tired */
    fallingDuration:   12000,   /* phase 8 – falling asleep */
    sleepingDuration:  70000,   /* phase 9 – sleeping */
    wakingDuration:    10000,   /* phase 10 – waking up */
    /* phase 11 loops back to phase 1 */
  },

  /* ── Terminal integration ────────────────────────── */
  terminal: {
    enabled: true,
    /* react when MSM://SYS_CORE opens/closes/minimizes */
  },

  /* ── Fallback assets ─────────────────────────────── */
  /* Used if canvas/toDataURL fails in this browser */
  fallback: {
    dark:  'assets/photos/whitefavicon.png',
    light: 'assets/photos/blackfavicon.png',
  },

};
