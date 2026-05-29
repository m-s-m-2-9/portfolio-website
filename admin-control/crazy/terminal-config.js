/* ═══════════════════════════════════════════════════════════
   admin-control/crazy/terminal-config.js
   MSM://SYS_CORE — Terminal Configuration
   ─────────────────────────────────────────────────────────
   Edit this file to control what variables appear in the
   terminal, their labels, hints, defaults, and limits.
   DO NOT add code that runs eval() or injects arbitrary HTML.
═══════════════════════════════════════════════════════════ */

window.MSM_TERMINAL_CONFIG = {

  /* ── System identity ─────────────────────────────── */
  system: {
    label:    'MSM://SYS_CORE',
    build:    'MMXXVI',
    subtitle: 'Runtime Configuration Layer',
    author:   'Manomay Shailendra Misra',
    version:  '2.0.0',
  },

  /* ── Context menu items ──────────────────────────── */
  /* Set enabled: false to hide an item from the menu */
  contextMenu: {
    showBack:       true,
    showForward:    true,
    showReload:     true,
    showSaveAs:     true,   /* always disabled visually */
    showPrint:      true,
    showCast:       true,   /* always disabled visually */
    showQR:         true,
    showInspect:    true,
  },

  /* ── Editable config files shown in the terminal ─── */
  /* ─────────────────────────────────────────────────
     Each file defines a group of CSS variables.
     TYPES:
       color    — any valid CSS color (#hex, rgb, rgba, hsl)
       rgba     — rgba() value with 0-1 alpha
       px       — number in pixels, clamped to min/max
       number   — float/int, clamped to min/max
       duration — CSS duration string (e.g. 0.3s, 300ms)
       select   — choose from a predefined list of values
     SAFE: only document.documentElement.style.setProperty()
     is ever called. No eval. No DOM injection.
  ───────────────────────────────────────────────────── */

  files: [

    /* ── /theme.vars ─────────────────────────────── */
    {
      id:    'theme',
      name:  'theme.vars',
      label: 'Theme Variables',
      desc:  'Live-edit the site colour system. All changes reset on page refresh.',
      icon:  '◈',
      vars: [

        {
          key:     '--accent',
          label:   'Accent Color',
          type:    'color',
          default: null,         /* null = read live from :root */
          hint:    'The main highlight color used for links, borders, and active states.',
          example: '#c8a96e',
          group:   'Colors',
        },

        {
          key:     '--bg',
          label:   'Background',
          type:    'color',
          default: null,
          hint:    'Primary page background. Keep contrast high for readability.',
          example: '#080808',
          group:   'Colors',
        },

        {
          key:     '--bg2',
          label:   'Surface Background',
          type:    'color',
          default: null,
          hint:    'Card and panel background — slightly lighter than --bg.',
          example: '#0f0f0f',
          group:   'Colors',
        },

        {
          key:     '--bg3',
          label:   'Elevated Surface',
          type:    'color',
          default: null,
          hint:    'Used for hover states and input fields.',
          example: 'rgba(255,255,255,0.04)',
          group:   'Colors',
        },

        {
          key:     '--text',
          label:   'Primary Text',
          type:    'color',
          default: null,
          hint:    'Main body text color.',
          example: '#e8e4dc',
          group:   'Text',
        },

        {
          key:     '--text2',
          label:   'Secondary Text',
          type:    'color',
          default: null,
          hint:    'Subdued text — captions, metadata, secondary labels.',
          example: 'rgba(232,228,220,0.6)',
          group:   'Text',
        },

        {
          key:     '--text3',
          label:   'Muted Text',
          type:    'color',
          default: null,
          hint:    'Placeholder text and least prominent copy.',
          example: 'rgba(232,228,220,0.3)',
          group:   'Text',
        },

        {
          key:     '--border',
          label:   'Border Color',
          type:    'color',
          default: null,
          hint:    'Standard divider and card border.',
          example: 'rgba(255,255,255,0.08)',
          group:   'Borders',
        },

        {
          key:     '--border2',
          label:   'Secondary Border',
          type:    'color',
          default: null,
          hint:    'Subtler border used on inputs and chips.',
          example: 'rgba(255,255,255,0.12)',
          group:   'Borders',
        },

      ],
    },

    /* ── /atmosphere.vars ────────────────────────── */
    {
      id:    'atmosphere',
      name:  'atmosphere.vars',
      label: 'Atmosphere Variables',
      desc:  'Customise the look and feel of the SYS_CORE terminal and context menu panels.',
      icon:  '◎',
      vars: [

        {
          key:     '--sys-terminal-bg-opacity',
          label:   'Terminal Background Opacity',
          type:    'number',
          min:     0.6,
          max:     1.0,
          step:    0.01,
          default: 0.94,
          hint:    'How opaque the terminal background is. Lower = more transparent.',
          example: '0.94',
          group:   'Terminal Panel',
          cssApply: (val) => ({
            property: '--sys-terminal-bg-opacity',
            value:    String(Math.min(1, Math.max(0.6, parseFloat(val)))),
          }),
        },

        {
          key:     '--sys-terminal-blur',
          label:   'Terminal Backdrop Blur',
          type:    'px',
          min:     0,
          max:     40,
          default: 18,
          hint:    'Gaussian blur applied behind the terminal glass. 0 = no blur.',
          example: '18px',
          group:   'Terminal Panel',
        },

        {
          key:     '--sys-ctx-blur',
          label:   'Context Menu Blur',
          type:    'px',
          min:     0,
          max:     40,
          default: 20,
          hint:    'Backdrop blur on the right-click context menu.',
          example: '20px',
          group:   'Context Menu',
        },

        {
          key:     '--sys-terminal-radius',
          label:   'Terminal Corner Radius',
          type:    'px',
          min:     0,
          max:     24,
          default: 10,
          hint:    'Border radius of the terminal window.',
          example: '10px',
          group:   'Terminal Panel',
        },

        {
          key:     '--sys-ctx-radius',
          label:   'Context Menu Radius',
          type:    'px',
          min:     0,
          max:     20,
          default: 10,
          hint:    'Border radius of the right-click context menu.',
          example: '10px',
          group:   'Context Menu',
        },

      ],
    },

    /* ── /motion.vars ─────────────────────────────── */
    {
      id:    'motion',
      name:  'motion.vars',
      label: 'Motion Variables',
      desc:  'Adjust animation timing for the SYS_CORE layer. Site-level transitions are unaffected.',
      icon:  '◷',
      vars: [

        {
          key:     '--sys-open-duration',
          label:   'Panel Open Duration',
          type:    'duration',
          default: '0.36s',
          hint:    'How long the terminal takes to open/close. e.g. 0.2s, 0.5s.',
          example: '0.36s',
          group:   'Timing',
        },

        {
          key:     '--sys-log-speed',
          label:   'Log Type Speed (ms/char)',
          type:    'number',
          min:     0,
          max:     60,
          step:    1,
          default: 12,
          hint:    'Characters per millisecond in the system log. 0 = instant.',
          example: '12',
          group:   'Timing',
        },

        {
          key:     '--sys-ctx-duration',
          label:   'Context Menu Fade',
          type:    'duration',
          default: '0.18s',
          hint:    'How fast the right-click menu appears/disappears.',
          example: '0.18s',
          group:   'Timing',
        },

      ],
    },

  ], /* end files */

  /* ── Help content shown in the ? tab ─────────────── */
  help: {
    shortcuts: [
      { keys: 'Ctrl + Shift + M',  action: 'Open / close MSM://SYS_CORE terminal' },
      { keys: 'Right-click',        action: 'Open premium context menu' },
      { keys: 'Escape',             action: 'Close context menu or minimise terminal' },
    ],
    commands: [
      { cmd: 'help',               desc: 'Show this help panel' },
      { cmd: 'ls',                 desc: 'List all available config files' },
      { cmd: 'open <file>',        desc: 'Open a config file (e.g. open theme.vars)' },
      { cmd: 'set <var> <value>',  desc: 'Set a CSS variable (e.g. set --accent #ff6b6b)' },
      { cmd: 'get <var>',          desc: 'Read the current value of a CSS variable' },
      { cmd: 'restore',            desc: 'Restore ALL variables to their original values' },
      { cmd: 'restore <var>',      desc: 'Restore a specific variable (e.g. restore --accent)' },
      { cmd: 'status',             desc: 'Show all variables modified this session' },
      { cmd: 'theme <name>',       desc: 'Switch site theme: dark · light · slate · forest' },
      { cmd: 'clear',              desc: 'Clear the system log' },
      { cmd: 'exit',               desc: 'Close terminal and restore original state' },
      { cmd: 'minimize',           desc: 'Minimise terminal (preserves all changes)' },
    ],
    tips: [
      'All changes are runtime-only — they reset on page refresh.',
      'MINIMIZE keeps your edits active. CLOSE restores the original site.',
      'Drag the topbar to reposition. Drag the bottom-right corner to resize.',
      'Right-click anywhere on the site to open the context menu.',
      'Use "status" to see everything you\'ve changed this session.',
    ],
  },

};
