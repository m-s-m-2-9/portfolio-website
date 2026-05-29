/* ═══════════════════════════════════════════════════════════
   js/inspect-terminal.js
   MSM://SYS_CORE — Hidden Developer Terminal Extension
   ─────────────────────────────────────────────────────────
   Custom context menu · Draggable resizable terminal panel
   Safe CSS variable editor · Session-only modifications
   Keyboard: Ctrl+Shift+M · Minimize preserves · Close restores
   ─────────────────────────────────────────────────────────
   ADD TO index.html before </body> (after all other scripts):
   <script src="admin-control/crazy/terminal-config.js"></script>
   <script src="js/inspect-terminal.js"></script>
   ─────────────────────────────────────────────────────────
   SECURITY: only document.documentElement.style.setProperty()
   is ever used. No eval(). No new Function(). No DOM injection.
   All values are sanitized and clamped before application.
═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ═══════════════════════════════════════════════════════
     § 0 — INJECTED CSS
     All SYS_CORE styles live here. Uses site CSS variables
     so all four themes (Noir/Ivory/Slate/Forest) work
     automatically. New sys-specific vars added to :root.
  ═══════════════════════════════════════════════════════ */

  const SYS_CSS = `

    /* ── SYS_CORE root variables ──────────────────── */
    :root {
      --sys-terminal-blur:        18px;
      --sys-terminal-radius:      10px;
      --sys-ctx-blur:             20px;
      --sys-ctx-radius:           10px;
      --sys-open-duration:        0.36s;
      --sys-ctx-duration:         0.18s;
      --sys-terminal-bg-opacity:  0.94;
    }

    /* ═══════════════════════════════════════════════
       CONTEXT MENU
    ═══════════════════════════════════════════════ */

    .msm-ctx {
      position:       fixed;
      z-index:        9999990;
      min-width:      210px;
      padding:        5px;
      border-radius:  var(--sys-ctx-radius, 10px);
      border:         1px solid rgba(255,255,255,0.07);
      box-shadow:
        0 12px 40px rgba(0,0,0,0.55),
        0 2px  8px  rgba(0,0,0,0.3),
        0 0 0 0.5px rgba(255,255,255,0.04);
      backdrop-filter:         blur(var(--sys-ctx-blur, 20px)) saturate(1.5);
      -webkit-backdrop-filter: blur(var(--sys-ctx-blur, 20px)) saturate(1.5);
      opacity:        0;
      transform:      scale(0.94) translateY(-6px);
      transform-origin: top left;
      transition:
        opacity   var(--sys-ctx-duration, 0.18s) ease,
        transform var(--sys-ctx-duration, 0.18s) cubic-bezier(0.16,1,0.3,1);
      pointer-events: none;
      user-select:    none;

      /* Noise grain texture */
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
    }

    /* Theme-aware backgrounds */
    [data-theme="dark"]   .msm-ctx,
    [data-theme=""]       .msm-ctx { background-color: rgba(10,10,10,0.93);  color: #e8e4dc; }
    [data-theme="light"]  .msm-ctx { background-color: rgba(250,247,243,0.96); color: #1a1a1a; border-color: rgba(0,0,0,0.08); }
    [data-theme="slate"]  .msm-ctx { background-color: rgba(14,20,28,0.94);  color: #d4d8dc; }
    [data-theme="forest"] .msm-ctx { background-color: rgba(10,15,12,0.94);  color: #d0d8d0; }

    .msm-ctx.msm-ctx--visible {
      opacity:        1;
      transform:      scale(1) translateY(0);
      pointer-events: all;
    }

    /* Context menu items */
    .msm-ctx-item {
      display:       flex;
      align-items:   center;
      gap:           10px;
      padding:       6px 10px;
      border-radius: 6px;
      font-family:   var(--ff-body, -apple-system, sans-serif);
      font-size:     0.8rem;
      line-height:   1;
      cursor:        pointer;
      transition:    background 0.12s ease;
      position:      relative;
    }
    .msm-ctx-item:hover {
      background: rgba(255,255,255,0.07);
    }
    [data-theme="light"] .msm-ctx-item:hover {
      background: rgba(0,0,0,0.06);
    }

    .msm-ctx-icon {
      font-size:   0.85rem;
      width:       16px;
      text-align:  center;
      flex-shrink: 0;
      opacity:     0.6;
    }
    .msm-ctx-label {
      flex: 1;
    }
    .msm-ctx-shortcut {
      font-family: var(--ff-mono, monospace);
      font-size:   0.62rem;
      opacity:     0.38;
      letter-spacing: 0.04em;
    }

    /* Disabled item */
    .msm-ctx-item--disabled {
      opacity:        0.35;
      cursor:         default;
      pointer-events: none;
    }

    /* Special "Inspect System" item */
    .msm-ctx-item--special {
      color: var(--accent, #c8a96e);
    }
    .msm-ctx-item--special .msm-ctx-icon {
      opacity: 1;
    }
    .msm-ctx-item--special:hover {
      background: rgba(200,169,110,0.1);
    }
    [data-theme="light"] .msm-ctx-item--special:hover {
      background: rgba(200,169,110,0.12);
    }

    /* Separator */
    .msm-ctx-sep {
      height:     1px;
      margin:     4px 6px;
      background: rgba(255,255,255,0.07);
    }
    [data-theme="light"] .msm-ctx-sep {
      background: rgba(0,0,0,0.08);
    }

    /* ═══════════════════════════════════════════════
       TERMINAL WINDOW
    ═══════════════════════════════════════════════ */

    .msm-terminal {
      position:   fixed;
      z-index:    9999900;
      width:      460px;
      height:     390px;
      min-width:  340px;
      min-height: 260px;
      left:       24px;
      top:        80px;
      display:    flex;
      flex-direction: column;
      overflow:   hidden;
      border-radius: var(--sys-terminal-radius, 10px);
      border:     1px solid rgba(255,255,255,0.06);
      box-shadow:
        0 32px 80px rgba(0,0,0,0.7),
        0 8px  24px rgba(0,0,0,0.5),
        0 0 0 0.5px rgba(255,255,255,0.04),
        inset 0 1px 0 rgba(255,255,255,0.06);
      backdrop-filter:         blur(var(--sys-terminal-blur, 18px)) saturate(1.4);
      -webkit-backdrop-filter: blur(var(--sys-terminal-blur, 18px)) saturate(1.4);
      opacity:    0;
      transform:  translateY(12px) scale(0.97);
      transition:
        opacity   var(--sys-open-duration, 0.36s) cubic-bezier(0.16,1,0.3,1),
        transform var(--sys-open-duration, 0.36s) cubic-bezier(0.16,1,0.3,1);
      pointer-events: none;
      resize:     both;

      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");
    }

    /* Theme-aware terminal backgrounds */
    [data-theme="dark"]   .msm-terminal,
    [data-theme=""]       .msm-terminal { background-color: rgba(8,8,8,0.94);       color: #e8e4dc; }
    [data-theme="light"]  .msm-terminal { background-color: rgba(248,245,240,0.97); color: #1a1a1a; border-color: rgba(0,0,0,0.1); }
    [data-theme="slate"]  .msm-terminal { background-color: rgba(12,18,26,0.94);    color: #d0d6dc; }
    [data-theme="forest"] .msm-terminal { background-color: rgba(8,14,10,0.95);     color: #ccd4cc; }

    .msm-terminal.msm-terminal--visible {
      opacity:        1;
      transform:      translateY(0) scale(1);
      pointer-events: all;
    }
    .msm-terminal.msm-terminal--hidden {
      display: none;
    }

    /* ── Topbar ───────────────────────────────────── */
    .msm-t-topbar {
      display:       flex;
      align-items:   center;
      justify-content: space-between;
      padding:       0 12px;
      height:        38px;
      flex-shrink:   0;
      cursor:        move;
      border-bottom: 1px solid rgba(255,255,255,0.05);
      background:    rgba(255,255,255,0.02);
      user-select:   none;
    }
    [data-theme="light"] .msm-t-topbar {
      border-bottom-color: rgba(0,0,0,0.08);
      background: rgba(0,0,0,0.02);
    }

    .msm-t-topbar-left {
      display:     flex;
      align-items: center;
      gap:         8px;
    }
    .msm-t-indicator {
      width:  6px;
      height: 6px;
      border-radius: 50%;
      background: var(--accent, #c8a96e);
      flex-shrink: 0;
      animation: msmPulse 3s ease-in-out infinite;
    }
    @keyframes msmPulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }
    .msm-t-title {
      font-family:    var(--ff-mono, monospace);
      font-size:      0.65rem;
      letter-spacing: 0.12em;
      color:          var(--accent, #c8a96e);
      text-transform: uppercase;
    }
    .msm-t-topbar-right {
      display:     flex;
      align-items: center;
      gap:         10px;
    }
    .msm-t-build {
      font-family:    var(--ff-mono, monospace);
      font-size:      0.52rem;
      letter-spacing: 0.12em;
      opacity:        0.28;
      text-transform: uppercase;
    }
    .msm-t-ctrl {
      width:         20px;
      height:        20px;
      border-radius: 50%;
      border:        1px solid rgba(255,255,255,0.1);
      background:    rgba(255,255,255,0.04);
      color:         currentColor;
      cursor:        pointer;
      display:       flex;
      align-items:   center;
      justify-content: center;
      font-size:     0.65rem;
      line-height:   1;
      opacity:       0.55;
      transition:    opacity 0.2s, background 0.2s;
      outline:       none;
      padding:       0;
    }
    .msm-t-ctrl:hover { opacity: 1; background: rgba(255,255,255,0.08); }
    [data-theme="light"] .msm-t-ctrl { border-color: rgba(0,0,0,0.12); background: rgba(0,0,0,0.04); }

    /* ── Tab bar ──────────────────────────────────── */
    .msm-t-tabs {
      display:       flex;
      align-items:   center;
      gap:           1px;
      padding:       6px 10px 0;
      flex-shrink:   0;
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    [data-theme="light"] .msm-t-tabs { border-bottom-color: rgba(0,0,0,0.08); }

    .msm-t-tab {
      font-family:    var(--ff-mono, monospace);
      font-size:      0.58rem;
      letter-spacing: 0.06em;
      padding:        5px 10px 6px;
      border-radius:  5px 5px 0 0;
      border:         1px solid transparent;
      background:     none;
      color:          currentColor;
      opacity:        0.38;
      cursor:         pointer;
      transition:     opacity 0.18s, background 0.18s;
      white-space:    nowrap;
      outline:        none;
      margin-bottom:  -1px;
    }
    .msm-t-tab:hover { opacity: 0.7; background: rgba(255,255,255,0.04); }
    .msm-t-tab.msm-t-tab--active {
      opacity:    1;
      background: rgba(255,255,255,0.06);
      border-color: rgba(255,255,255,0.07) rgba(255,255,255,0.07) transparent;
      color: var(--accent, #c8a96e);
    }
    [data-theme="light"] .msm-t-tab--active {
      background:   rgba(0,0,0,0.04);
      border-color: rgba(0,0,0,0.09) rgba(0,0,0,0.09) transparent;
    }
    .msm-t-tab--help {
      margin-left: auto;
      opacity:     0.3;
    }
    .msm-t-tab--help.msm-t-tab--active { opacity: 1; }

    /* ── Content area ─────────────────────────────── */
    .msm-t-content {
      flex:       1;
      overflow-y: auto;
      overflow-x: hidden;
      padding:    0;
      scrollbar-width: thin;
      scrollbar-color: rgba(255,255,255,0.1) transparent;
    }
    .msm-t-content::-webkit-scrollbar       { width: 3px; }
    .msm-t-content::-webkit-scrollbar-track { background: transparent; }
    .msm-t-content::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }

    /* File header */
    .msm-t-file-header {
      padding:       10px 14px 8px;
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    [data-theme="light"] .msm-t-file-header { border-bottom-color: rgba(0,0,0,0.07); }
    .msm-t-file-header-name {
      font-family:    var(--ff-mono, monospace);
      font-size:      0.62rem;
      letter-spacing: 0.1em;
      color:          var(--accent, #c8a96e);
      margin-bottom:  3px;
    }
    .msm-t-file-header-desc {
      font-family: var(--ff-body, sans-serif);
      font-size:   0.72rem;
      opacity:     0.4;
      line-height: 1.4;
    }

    /* Group label */
    .msm-t-group-label {
      font-family:    var(--ff-mono, monospace);
      font-size:      0.52rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      opacity:        0.28;
      padding:        10px 14px 4px;
    }

    /* Variable row */
    .msm-t-var-row {
      display:       flex;
      align-items:   center;
      gap:           8px;
      padding:       6px 14px;
      border-bottom: 1px solid rgba(255,255,255,0.03);
      transition:    background 0.15s;
    }
    .msm-t-var-row:hover { background: rgba(255,255,255,0.02); }
    [data-theme="light"] .msm-t-var-row { border-bottom-color: rgba(0,0,0,0.04); }
    [data-theme="light"] .msm-t-var-row:hover { background: rgba(0,0,0,0.02); }

    .msm-t-var-label {
      font-family:  var(--ff-body, sans-serif);
      font-size:    0.76rem;
      flex:         1;
      min-width:    0;
      overflow:     hidden;
      text-overflow: ellipsis;
      white-space:  nowrap;
    }
    .msm-t-var-key {
      font-family:    var(--ff-mono, monospace);
      font-size:      0.58rem;
      opacity:        0.35;
      letter-spacing: 0.04em;
      display:        block;
      margin-top:     2px;
      overflow:       hidden;
      text-overflow:  ellipsis;
    }
    .msm-t-var-input-wrap {
      display:     flex;
      align-items: center;
      gap:         5px;
      flex-shrink: 0;
    }
    .msm-t-var-input {
      font-family:    var(--ff-mono, monospace);
      font-size:      0.7rem;
      width:          110px;
      padding:        4px 7px;
      border-radius:  4px;
      border:         1px solid rgba(255,255,255,0.1);
      background:     rgba(255,255,255,0.04);
      color:          currentColor;
      outline:        none;
      transition:     border-color 0.18s;
    }
    .msm-t-var-input:focus { border-color: var(--accent, #c8a96e); }
    [data-theme="light"] .msm-t-var-input {
      border-color: rgba(0,0,0,0.12);
      background:   rgba(0,0,0,0.04);
    }
    .msm-t-var-input--modified { border-color: var(--accent, #c8a96e); }

    .msm-t-color-swatch {
      width:         20px;
      height:        20px;
      border-radius: 3px;
      border:        1px solid rgba(255,255,255,0.12);
      cursor:        pointer;
      flex-shrink:   0;
      overflow:      hidden;
      position:      relative;
    }
    .msm-t-color-swatch input[type="color"] {
      position: absolute;
      inset:    -4px;
      width:    calc(100% + 8px);
      height:   calc(100% + 8px);
      opacity:  0;
      cursor:   pointer;
      padding:  0;
      border:   none;
    }
    .msm-t-restore-btn {
      font-size:     0.65rem;
      padding:       2px 5px;
      border-radius: 3px;
      border:        1px solid rgba(255,255,255,0.08);
      background:    none;
      color:         currentColor;
      opacity:       0.35;
      cursor:        pointer;
      transition:    opacity 0.15s;
      outline:       none;
      flex-shrink:   0;
      display:       none; /* shown only when modified */
    }
    .msm-t-restore-btn:hover { opacity: 0.8; }
    .msm-t-restore-btn--visible { display: block; }

    /* Number / range row */
    .msm-t-var-input--number { width: 72px; }
    .msm-t-range {
      width:  70px;
      accent-color: var(--accent, #c8a96e);
    }

    /* Help tab content */
    .msm-t-help {
      padding: 10px 14px;
    }
    .msm-t-help-section {
      margin-bottom: 14px;
    }
    .msm-t-help-title {
      font-family:    var(--ff-mono, monospace);
      font-size:      0.56rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      opacity:        0.35;
      margin-bottom:  6px;
    }
    .msm-t-help-row {
      display:       flex;
      gap:           10px;
      padding:       4px 0;
      border-bottom: 1px solid rgba(255,255,255,0.03);
      font-size:     0.74rem;
      line-height:   1.4;
    }
    [data-theme="light"] .msm-t-help-row { border-bottom-color: rgba(0,0,0,0.04); }
    .msm-t-help-key {
      font-family:    var(--ff-mono, monospace);
      font-size:      0.62rem;
      min-width:      100px;
      color:          var(--accent, #c8a96e);
      flex-shrink:    0;
    }
    .msm-t-help-val { opacity: 0.65; }
    .msm-t-tip {
      font-size:   0.72rem;
      opacity:     0.45;
      padding:     3px 0;
      line-height: 1.5;
    }
    .msm-t-tip::before { content: '· '; }

    /* ── System log ───────────────────────────────── */
    .msm-t-log {
      height:       52px;
      flex-shrink:  0;
      overflow-y:   auto;
      overflow-x:   hidden;
      padding:      4px 14px;
      border-top:   1px solid rgba(255,255,255,0.05);
      scrollbar-width: none;
    }
    .msm-t-log::-webkit-scrollbar { display: none; }
    [data-theme="light"] .msm-t-log { border-top-color: rgba(0,0,0,0.07); }

    .msm-t-log-line {
      font-family:    var(--ff-mono, monospace);
      font-size:      0.58rem;
      letter-spacing: 0.04em;
      opacity:        0.5;
      line-height:    1.7;
      white-space:    nowrap;
    }
    .msm-t-log-line--accent { color: var(--accent, #c8a96e); opacity: 0.85; }
    .msm-t-log-line--error  { color: #f87171; opacity: 0.85; }
    .msm-t-log-line--ok     { color: #4ade80; opacity: 0.85; }

    /* ── CLI input ────────────────────────────────── */
    .msm-t-cli {
      display:       flex;
      align-items:   center;
      gap:           8px;
      padding:       6px 14px 8px;
      border-top:    1px solid rgba(255,255,255,0.05);
      flex-shrink:   0;
    }
    [data-theme="light"] .msm-t-cli { border-top-color: rgba(0,0,0,0.07); }
    .msm-t-prompt {
      font-family:    var(--ff-mono, monospace);
      font-size:      0.65rem;
      color:          var(--accent, #c8a96e);
      letter-spacing: 0.08em;
      flex-shrink:    0;
      opacity:        0.8;
    }
    .msm-t-input {
      flex:         1;
      background:   none;
      border:       none;
      color:        currentColor;
      font-family:  var(--ff-mono, monospace);
      font-size:    0.68rem;
      outline:      none;
      padding:      0;
      letter-spacing: 0.04em;
      caret-color:  var(--accent, #c8a96e);
    }
    .msm-t-input::placeholder {
      opacity: 0.22;
      font-size: 0.62rem;
    }

    /* ── Resize handle ────────────────────────────── */
    .msm-t-resize {
      position:  absolute;
      bottom:    0;
      right:     0;
      width:     14px;
      height:    14px;
      cursor:    se-resize;
      opacity:   0.2;
      transition: opacity 0.2s;
    }
    .msm-t-resize:hover { opacity: 0.55; }
    .msm-t-resize svg { width: 14px; height: 14px; display: block; }

    /* ── QR Overlay ───────────────────────────────── */
    .msm-qr-overlay {
      position:   fixed;
      inset:      0;
      z-index:    9999980;
      display:    flex;
      align-items: center;
      justify-content: center;
      background: rgba(0,0,0,0.7);
      backdrop-filter: blur(8px);
      opacity:    0;
      pointer-events: none;
      transition: opacity 0.25s ease;
    }
    .msm-qr-overlay.msm-qr-overlay--visible {
      opacity:        1;
      pointer-events: all;
    }
    .msm-qr-box {
      padding:       32px;
      border-radius: 14px;
      border:        1px solid rgba(255,255,255,0.08);
      text-align:    center;
      max-width:     320px;
      background:    rgba(10,10,10,0.96);
    }
    [data-theme="light"] .msm-qr-box { background: rgba(248,245,240,0.98); border-color: rgba(0,0,0,0.1); }
    .msm-qr-title {
      font-family:    var(--ff-mono, monospace);
      font-size:      0.6rem;
      letter-spacing: 0.14em;
      color:          var(--accent, #c8a96e);
      text-transform: uppercase;
      margin-bottom:  16px;
    }
    .msm-qr-url {
      font-family:    var(--ff-mono, monospace);
      font-size:      0.72rem;
      opacity:        0.65;
      word-break:     break-all;
      margin-bottom:  20px;
      line-height:    1.5;
    }
    .msm-qr-hint {
      font-size: 0.76rem;
      opacity:   0.4;
      line-height: 1.5;
    }
    .msm-qr-close {
      margin-top:    20px;
      font-family:   var(--ff-mono, monospace);
      font-size:     0.62rem;
      padding:       6px 16px;
      border:        1px solid rgba(255,255,255,0.1);
      border-radius: 4px;
      background:    none;
      color:         currentColor;
      cursor:        pointer;
      opacity:       0.55;
      transition:    opacity 0.18s;
    }
    .msm-qr-close:hover { opacity: 1; }

    /* Mobile — hide terminal on very small screens */
    @media (max-width: 480px) {
      .msm-terminal { width: calc(100vw - 20px) !important; left: 10px !important; }
    }
  `;

  /* ═══════════════════════════════════════════════════════
     § 1 — CONFIG LOADER
     Reads from window.MSM_TERMINAL_CONFIG (terminal-config.js)
     or falls back to built-in defaults.
  ═══════════════════════════════════════════════════════ */

  const CFG = window.MSM_TERMINAL_CONFIG || {
    system:      { label: 'MSM://SYS_CORE', build: 'MMXXVI', subtitle: 'Runtime Configuration Layer' },
    contextMenu: { showBack:true,showForward:true,showReload:true,showSaveAs:true,showPrint:true,showCast:true,showQR:true,showInspect:true },
    files:       [],
    help:        { shortcuts:[], commands:[], tips:[] },
  };

  /* ═══════════════════════════════════════════════════════
     § 2 — SECURITY LAYER
     Strict value sanitizer and type validator.
     Only safe CSS values are ever applied to the document.
  ═══════════════════════════════════════════════════════ */

  const Security = {

    /* Allowed CSS variable key format */
    VAR_PATTERN: /^--[a-z][a-z0-9-]*$/,

    /* Validate key is in the whitelist */
    isAllowedKey(key) {
      if (!this.VAR_PATTERN.test(key)) return false;
      for (const file of (CFG.files || [])) {
        for (const varDef of (file.vars || [])) {
          if (varDef.key === key) return true;
        }
      }
      return false;
    },

    /* Get var definition from config */
    getVarDef(key) {
      for (const file of (CFG.files || [])) {
        for (const varDef of (file.vars || [])) {
          if (varDef.key === key) return varDef;
        }
      }
      return null;
    },

    /* Sanitize a value based on its type */
    sanitize(key, value) {
      const def = this.getVarDef(key);
      if (!def) return null;
      const val = String(value).trim();
      return this['_sanitize_' + def.type]
        ? this['_sanitize_' + def.type](val, def)
        : null;
    },

    _sanitize_color(val) {
      /* Accept: #hex3, #hex6, #hex8, rgb(), rgba(), hsl(), hsla(), named (limited) */
      const hexPat  = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
      const rgbPat  = /^rgba?\(\s*[\d.]+\s*,\s*[\d.]+\s*,\s*[\d.]+\s*(,\s*[\d.]+\s*)?\)$/;
      const hslPat  = /^hsla?\(\s*[\d.]+\s*,\s*[\d.]+%\s*,\s*[\d.]+%\s*(,\s*[\d.]+\s*)?\)$/;
      const safe    = ['transparent', 'white', 'black', 'inherit', 'currentcolor'];
      if (hexPat.test(val) || rgbPat.test(val) || hslPat.test(val) || safe.includes(val.toLowerCase())) {
        return val;
      }
      return null;
    },

    _sanitize_rgba(val) {
      return this._sanitize_color(val);
    },

    _sanitize_px(val, def) {
      /* Strip 'px' suffix if present, parse as number, clamp, re-add px */
      const num = parseFloat(val.replace(/px$/i, ''));
      if (isNaN(num)) return null;
      const min = def.min !== undefined ? def.min : 0;
      const max = def.max !== undefined ? def.max : 9999;
      return Math.min(max, Math.max(min, num)) + 'px';
    },

    _sanitize_number(val, def) {
      const num = parseFloat(val);
      if (isNaN(num)) return null;
      const min  = def.min  !== undefined ? def.min  : -Infinity;
      const max  = def.max  !== undefined ? def.max  : Infinity;
      const step = def.step !== undefined ? def.step : 0.001;
      const clamped = Math.min(max, Math.max(min, num));
      return String(Math.round(clamped / step) * step);
    },

    _sanitize_duration(val) {
      /* Accept: 0.3s, 300ms, 0s, 1s etc. */
      if (/^\d*\.?\d+(s|ms)$/.test(val)) return val;
      return null;
    },

    _sanitize_select(val, def) {
      const options = def.options || [];
      return options.includes(val) ? val : null;
    },
  };

  /* ═══════════════════════════════════════════════════════
     § 3 — STATE
     Tracks modified variables and their originals.
     All state is session-only (no localStorage).
  ═══════════════════════════════════════════════════════ */

  const State = {
    isOpen:       false,
    isMinimized:  false,
    activeFile:   null,
    modified:     {},   /* { '--var': 'newValue' } */
    originals:    {},   /* { '--var': 'originalValue' } */
    cmdHistory:   [],
    cmdIndex:     -1,
  };

  /* ═══════════════════════════════════════════════════════
     § 4 — CSS APPLICATION ENGINE
     Only ever calls document.documentElement.style.setProperty.
     Captures originals before any change for restore().
  ═══════════════════════════════════════════════════════ */

  const CSSEngine = {

    /* Get live value from :root */
    read(key) {
      return getComputedStyle(document.documentElement).getPropertyValue(key).trim();
    },

    /* Apply a sanitized value, capturing original first */
    apply(key, sanitizedValue) {
      if (!State.originals.hasOwnProperty(key)) {
        State.originals[key] = this.read(key);
      }
      document.documentElement.style.setProperty(key, sanitizedValue);
      State.modified[key] = sanitizedValue;
    },

    /* Restore a single variable */
    restore(key) {
      if (State.originals.hasOwnProperty(key)) {
        const orig = State.originals[key];
        if (orig) {
          document.documentElement.style.setProperty(key, orig);
        } else {
          document.documentElement.style.removeProperty(key);
        }
      } else {
        document.documentElement.style.removeProperty(key);
      }
      delete State.modified[key];
      delete State.originals[key];
    },

    /* Restore all modified variables */
    restoreAll() {
      for (const key of Object.keys(State.originals)) {
        this.restore(key);
      }
    },
  };

  /* ═══════════════════════════════════════════════════════
     § 5 — CONTEXT MENU
  ═══════════════════════════════════════════════════════ */

  const ContextMenu = {
    el:      null,
    visible: false,

    items: [
      { id: 'back',    icon: '←', label: 'Back',       shortcut: '',    disabled: false, special: false },
      { id: 'forward', icon: '→', label: 'Forward',    shortcut: '',    disabled: false, special: false },
      { id: 'reload',  icon: '↻', label: 'Reload',     shortcut: '',    disabled: false, special: false },
      { id: 'sep1',    sep: true },
      { id: 'save',    icon: '⬇', label: 'Save As…',   shortcut: '',    disabled: true,  special: false },
      { id: 'print',   icon: '⎙', label: 'Print…',     shortcut: '',    disabled: false, special: false },
      { id: 'cast',    icon: '⊡', label: 'Cast…',      shortcut: '',    disabled: true,  special: false },
      { id: 'qr',      icon: '⊞', label: 'Create QR Code', shortcut: '', disabled: false, special: false },
      { id: 'sep2',    sep: true },
      { id: 'inspect', icon: '⌬', label: 'Inspect System', shortcut: '⌃⇧M', disabled: false, special: true },
    ],

    build() {
      this.el = document.createElement('div');
      this.el.className = 'msm-ctx';
      this.el.setAttribute('role', 'menu');

      const cm = CFG.contextMenu || {};

      this.items.forEach(item => {
        if (item.sep) {
          const sep = document.createElement('div');
          sep.className = 'msm-ctx-sep';
          this.el.appendChild(sep);
          return;
        }
        /* Check visibility toggle in config */
        const showKey = 'show' + item.id.charAt(0).toUpperCase() + item.id.slice(1);
        if (cm[showKey] === false) return;

        const row = document.createElement('div');
        row.className = 'msm-ctx-item' +
          (item.disabled ? ' msm-ctx-item--disabled' : '') +
          (item.special  ? ' msm-ctx-item--special'  : '');
        row.setAttribute('role', 'menuitem');
        row.dataset.action = item.id;
        row.innerHTML = `
          <span class="msm-ctx-icon">${item.icon}</span>
          <span class="msm-ctx-label">${item.label}</span>
          ${item.shortcut ? `<span class="msm-ctx-shortcut">${item.shortcut}</span>` : ''}
        `;
        if (!item.disabled) {
          row.addEventListener('click', (e) => { e.stopPropagation(); this.hide(); this._act(item.id); });
        }
        this.el.appendChild(row);
      });

      document.body.appendChild(this.el);
    },

    show(x, y) {
      if (!this.el) return;
      /* Adjust so menu stays within viewport */
      const vpW = window.innerWidth, vpH = window.innerHeight;
      const menuW = 220, menuH = 300;
      const left = Math.min(x, vpW - menuW - 8);
      const top  = Math.min(y, vpH - menuH - 8);
      this.el.style.left = left + 'px';
      this.el.style.top  = top  + 'px';
      /* Adjust transform-origin based on position */
      this.el.style.transformOrigin = (x > vpW / 2 ? 'right' : 'left') + ' ' + (y > vpH * 0.7 ? 'bottom' : 'top');
      this.visible = true;
      this.el.classList.add('msm-ctx--visible');
    },

    hide() {
      if (!this.el) return;
      this.visible = false;
      this.el.classList.remove('msm-ctx--visible');
    },

    _act(action) {
      switch (action) {
        case 'back':    history.back();           break;
        case 'forward': history.forward();        break;
        case 'reload':  location.reload();        break;
        case 'print':   window.print();           break;
        case 'qr':      QROverlay.show();         break;
        case 'inspect': Terminal.toggle();        break;
      }
    },
  };

  /* ═══════════════════════════════════════════════════════
     § 6 — QR OVERLAY
     Shows the current page URL with instructions.
  ═══════════════════════════════════════════════════════ */

  const QROverlay = {
    el: null,

    build() {
      this.el = document.createElement('div');
      this.el.className = 'msm-qr-overlay';
      this.el.innerHTML = `
        <div class="msm-qr-box">
          <div class="msm-qr-title">Share This Page</div>
          <div class="msm-qr-url">${window.location.href}</div>
          <div class="msm-qr-hint">
            Open your phone's camera app and point it at the URL above,<br>
            or use any QR code generator with the link below.
          </div>
          <button class="msm-qr-close" id="msm-qr-close">Close</button>
        </div>
      `;
      this.el.addEventListener('click', (e) => { if (e.target === this.el) this.hide(); });
      this.el.querySelector('#msm-qr-close').addEventListener('click', () => this.hide());
      document.body.appendChild(this.el);
    },

    show() {
      if (!this.el) return;
      this.el.classList.add('msm-qr-overlay--visible');
    },

    hide() {
      if (!this.el) return;
      this.el.classList.remove('msm-qr-overlay--visible');
    },
  };

  /* ═══════════════════════════════════════════════════════
     § 7 — TERMINAL
  ═══════════════════════════════════════════════════════ */

  const Terminal = {
    el:      null,
    chatEl:  null,
    inputEl: null,
    logEl:   null,
    tabEls:  [],

    /* Drag state */
    _drag:   { active: false, startX: 0, startY: 0, origLeft: 0, origTop: 0 },
    /* Resize state */
    _resize: { active: false, startX: 0, startY: 0, origW: 0, origH: 0 },

    /* ── Build DOM ──────────────────────────────── */
    build() {
      this.el = document.createElement('div');
      this.el.id        = 'msm-terminal';
      this.el.className = 'msm-terminal';
      this.el.setAttribute('role', 'dialog');
      this.el.setAttribute('aria-label', CFG.system.label);

      this.el.innerHTML = `
        <div class="msm-t-topbar" id="msm-t-topbar">
          <div class="msm-t-topbar-left">
            <div class="msm-t-indicator"></div>
            <span class="msm-t-title">${CFG.system.label}</span>
          </div>
          <div class="msm-t-topbar-right">
            <span class="msm-t-build">BUILD ${CFG.system.build}</span>
            <button class="msm-t-ctrl" id="msm-t-min"   title="Minimize — preserves all changes">−</button>
            <button class="msm-t-ctrl" id="msm-t-close" title="Close — restores original state">✕</button>
          </div>
        </div>

        <div class="msm-t-tabs" id="msm-t-tabs">
          ${(CFG.files || []).map((f, i) =>
            `<button class="msm-t-tab${i === 0 ? ' msm-t-tab--active' : ''}" data-file="${f.id}">/${f.name}</button>`
          ).join('')}
          <button class="msm-t-tab msm-t-tab--help" data-file="help">?</button>
        </div>

        <div class="msm-t-content" id="msm-t-content"></div>

        <div class="msm-t-log" id="msm-t-log"></div>

        <div class="msm-t-cli">
          <span class="msm-t-prompt">SYS &gt;</span>
          <input
            class="msm-t-input"
            id="msm-t-input"
            type="text"
            placeholder="type 'help' for commands"
            autocomplete="off"
            spellcheck="false"
            maxlength="200"
          />
        </div>

        <div class="msm-t-resize" id="msm-t-resize" title="Drag to resize">
          <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 3L3 11M11 7L7 11M11 11H11.01" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
          </svg>
        </div>
      `;

      document.body.appendChild(this.el);

      this.contentEl = this.el.querySelector('#msm-t-content');
      this.logEl     = this.el.querySelector('#msm-t-log');
      this.inputEl   = this.el.querySelector('#msm-t-input');

      /* Open first file by default */
      const firstFile = (CFG.files || [])[0];
      if (firstFile) {
        State.activeFile = firstFile.id;
        this._renderFile(firstFile.id);
      }

      this._bindInternalEvents();
    },

    /* ── Internal event binding ─────────────────── */
    _bindInternalEvents() {
      /* Minimize button */
      this.el.querySelector('#msm-t-min').addEventListener('click', (e) => {
        e.stopPropagation();
        this.minimize();
      });

      /* Close button */
      this.el.querySelector('#msm-t-close').addEventListener('click', (e) => {
        e.stopPropagation();
        this.close();
      });

      /* Tab clicks */
      this.el.querySelector('#msm-t-tabs').addEventListener('click', (e) => {
        const tab = e.target.closest('.msm-t-tab');
        if (!tab) return;
        const fileId = tab.dataset.file;
        this._activateTab(fileId);
      });

      /* CLI input */
      this.inputEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const cmd = this.inputEl.value.trim();
          if (cmd) {
            State.cmdHistory.unshift(cmd);
            State.cmdIndex = -1;
            this.inputEl.value = '';
            this._handleCommand(cmd);
          }
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          State.cmdIndex = Math.min(State.cmdIndex + 1, State.cmdHistory.length - 1);
          this.inputEl.value = State.cmdHistory[State.cmdIndex] || '';
        }
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          State.cmdIndex = Math.max(State.cmdIndex - 1, -1);
          this.inputEl.value = State.cmdIndex < 0 ? '' : (State.cmdHistory[State.cmdIndex] || '');
        }
      });

      /* Drag — topbar */
      const topbar = this.el.querySelector('#msm-t-topbar');
      topbar.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('msm-t-ctrl')) return;
        e.preventDefault();
        const rect = this.el.getBoundingClientRect();
        this._drag = { active: true, startX: e.clientX, startY: e.clientY, origLeft: rect.left, origTop: rect.top };
        document.addEventListener('mousemove', this._onDragMove, { passive: true });
        document.addEventListener('mouseup',   this._onDragEnd,  { once: true });
      });

      /* Resize — handle */
      const resizeHandle = this.el.querySelector('#msm-t-resize');
      resizeHandle.addEventListener('mousedown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const rect = this.el.getBoundingClientRect();
        this._resize = { active: true, startX: e.clientX, startY: e.clientY, origW: rect.width, origH: rect.height };
        document.addEventListener('mousemove', this._onResizeMove, { passive: false });
        document.addEventListener('mouseup',   this._onResizeEnd,  { once: true });
      });
    },

    /* ── Drag handlers ──────────────────────────── */
    _onDragMove: null,
    _onResizeMove: null,

    _initHandlers() {
      this._onDragMove = (e) => {
        if (!this._drag.active) return;
        const dx  = e.clientX - this._drag.startX;
        const dy  = e.clientY - this._drag.startY;
        let   newLeft = this._drag.origLeft + dx;
        let   newTop  = this._drag.origTop  + dy;
        /* Constrain to viewport */
        newLeft = Math.max(0, Math.min(window.innerWidth  - 80, newLeft));
        newTop  = Math.max(0, Math.min(window.innerHeight - 40, newTop));
        this.el.style.left  = newLeft + 'px';
        this.el.style.top   = newTop  + 'px';
        this.el.style.right  = 'auto';
        this.el.style.bottom = 'auto';
      };
      this._onDragEnd = () => { this._drag.active = false; document.removeEventListener('mousemove', this._onDragMove); };

      this._onResizeMove = (e) => {
        if (!this._resize.active) return;
        const dx = e.clientX - this._resize.startX;
        const dy = e.clientY - this._resize.startY;
        const newW = Math.max(340, Math.min(window.innerWidth  * 0.85, this._resize.origW + dx));
        const newH = Math.max(260, Math.min(window.innerHeight * 0.85, this._resize.origH + dy));
        this.el.style.width  = newW + 'px';
        this.el.style.height = newH + 'px';
      };
      this._onResizeEnd = () => { this._resize.active = false; document.removeEventListener('mousemove', this._onResizeMove); };
    },

    /* ── Tab management ─────────────────────────── */
    _activateTab(fileId) {
      State.activeFile = fileId;
      this.el.querySelectorAll('.msm-t-tab').forEach(t => {
        t.classList.toggle('msm-t-tab--active', t.dataset.file === fileId);
      });
      this._renderFile(fileId);
    },

    /* ── Render file content ────────────────────── */
    _renderFile(fileId) {
      const content = this.contentEl;
      content.innerHTML = '';

      if (fileId === 'help') {
        this._renderHelp(content);
        return;
      }

      const fileDef = (CFG.files || []).find(f => f.id === fileId);
      if (!fileDef) return;

      /* File header */
      const header = document.createElement('div');
      header.className = 'msm-t-file-header';
      header.innerHTML = `
        <div class="msm-t-file-header-name">${fileDef.icon || '◈'} /${fileDef.name}</div>
        <div class="msm-t-file-header-desc">${fileDef.desc || ''}</div>
      `;
      content.appendChild(header);

      /* Group vars */
      const groups = {};
      (fileDef.vars || []).forEach(v => {
        const g = v.group || 'General';
        if (!groups[g]) groups[g] = [];
        groups[g].push(v);
      });

      for (const [groupName, vars] of Object.entries(groups)) {
        const glEl = document.createElement('div');
        glEl.className   = 'msm-t-group-label';
        glEl.textContent = groupName;
        content.appendChild(glEl);

        vars.forEach(varDef => {
          content.appendChild(this._buildVarRow(varDef));
        });
      }
    },

    /* ── Build a variable editing row ───────────── */
    _buildVarRow(varDef) {
      const current = CSSEngine.read(varDef.key) || varDef.default || '';
      const isModified = State.modified.hasOwnProperty(varDef.key);

      const row = document.createElement('div');
      row.className    = 'msm-t-var-row';
      row.dataset.varKey = varDef.key;

      /* Label */
      const labelWrap = document.createElement('div');
      labelWrap.className = 'msm-t-var-label';
      labelWrap.innerHTML = `
        ${varDef.label}
        <span class="msm-t-var-key">${varDef.key}</span>
      `;
      row.appendChild(labelWrap);

      /* Input area */
      const inputWrap = document.createElement('div');
      inputWrap.className = 'msm-t-var-input-wrap';

      /* Color swatch for color type */
      if (varDef.type === 'color' || varDef.type === 'rgba') {
        const swatch = document.createElement('div');
        swatch.className = 'msm-t-color-swatch';
        swatch.style.background = current;
        const colorInput = document.createElement('input');
        colorInput.type  = 'color';
        colorInput.title = 'Pick a colour';
        /* Try to set value — may fail for rgba/complex values */
        try { colorInput.value = this._toHex(current) || '#c8a96e'; } catch {}
        colorInput.addEventListener('input', () => {
          swatch.style.background = colorInput.value;
          textInput.value         = colorInput.value;
        });
        colorInput.addEventListener('change', () => {
          this._applyVar(varDef.key, colorInput.value, row, restoreBtn);
        });
        swatch.appendChild(colorInput);
        inputWrap.appendChild(swatch);
      }

      /* Number with range for px/number */
      if (varDef.type === 'number' || varDef.type === 'px') {
        const range = document.createElement('input');
        range.type  = 'range';
        range.className = 'msm-t-range';
        range.min   = String(varDef.min   !== undefined ? varDef.min   : 0);
        range.max   = String(varDef.max   !== undefined ? varDef.max   : 100);
        range.step  = String(varDef.step  !== undefined ? varDef.step  : 1);
        range.value = parseFloat(current) || varDef.default || '0';
        range.addEventListener('input', () => {
          textInput.value = range.value + (varDef.type === 'px' ? 'px' : '');
        });
        range.addEventListener('change', () => {
          const val = range.value + (varDef.type === 'px' ? 'px' : '');
          this._applyVar(varDef.key, val, row, restoreBtn);
        });
        inputWrap.appendChild(range);
      }

      /* Text input */
      const textInput = document.createElement('input');
      textInput.type      = 'text';
      textInput.className = 'msm-t-var-input' +
        (varDef.type === 'number' || varDef.type === 'px' ? ' msm-t-var-input--number' : '') +
        (isModified ? ' msm-t-var-input--modified' : '');
      textInput.value       = State.modified[varDef.key] || current;
      textInput.placeholder = varDef.example || '';
      textInput.title       = varDef.hint    || '';
      textInput.spellcheck  = false;

      textInput.addEventListener('input', () => {
        /* Live-update range if present */
        const rangeEl = inputWrap.querySelector('input[type="range"]');
        if (rangeEl) rangeEl.value = parseFloat(textInput.value) || 0;
        /* Live-update swatch if present */
        const swatchEl = inputWrap.querySelector('.msm-t-color-swatch');
        if (swatchEl) swatchEl.style.background = textInput.value;
      });

      textInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this._applyVar(varDef.key, textInput.value, row, restoreBtn);
        }
        if (e.key === 'Escape') {
          textInput.blur();
        }
      });

      textInput.addEventListener('blur', () => {
        /* Apply on blur if value changed */
        const currentApplied = State.modified[varDef.key] || CSSEngine.read(varDef.key);
        if (textInput.value !== currentApplied) {
          this._applyVar(varDef.key, textInput.value, row, restoreBtn);
        }
      });

      inputWrap.appendChild(textInput);

      /* Restore button */
      const restoreBtn = document.createElement('button');
      restoreBtn.className = 'msm-t-restore-btn' + (isModified ? ' msm-t-restore-btn--visible' : '');
      restoreBtn.title     = 'Restore original value';
      restoreBtn.textContent = '↺';
      restoreBtn.addEventListener('click', () => {
        CSSEngine.restore(varDef.key);
        const original = CSSEngine.read(varDef.key) || varDef.default || '';
        textInput.value = original;
        textInput.classList.remove('msm-t-var-input--modified');
        restoreBtn.classList.remove('msm-t-restore-btn--visible');
        const swatchEl = inputWrap.querySelector('.msm-t-color-swatch');
        if (swatchEl) swatchEl.style.background = original;
        const rangeEl = inputWrap.querySelector('input[type="range"]');
        if (rangeEl) rangeEl.value = parseFloat(original) || 0;
        this._log(`${varDef.key} restored`, 'ok');
      });

      inputWrap.appendChild(restoreBtn);
      row.appendChild(inputWrap);
      return row;
    },

    /* ── Apply a variable change ────────────────── */
    _applyVar(key, rawValue, rowEl, restoreBtn) {
      const sanitized = Security.sanitize(key, rawValue);
      if (sanitized === null) {
        this._log(`Invalid value for ${key}: "${rawValue}"`, 'error');
        return;
      }
      CSSEngine.apply(key, sanitized);

      /* Update row visuals */
      if (rowEl) {
        const inp = rowEl.querySelector('.msm-t-var-input');
        if (inp) { inp.value = sanitized; inp.classList.add('msm-t-var-input--modified'); }
      }
      if (restoreBtn) restoreBtn.classList.add('msm-t-restore-btn--visible');

      this._log(`${key} → ${sanitized}`, 'accent');
    },

    /* ── Render help tab ────────────────────────── */
    _renderHelp(content) {
      const help = CFG.help || { shortcuts:[], commands:[], tips:[] };
      const wrap = document.createElement('div');
      wrap.className = 'msm-t-help';

      const mkSection = (title, rows, keyField, valField) => {
        const sec = document.createElement('div');
        sec.className = 'msm-t-help-section';
        const tl = document.createElement('div');
        tl.className   = 'msm-t-help-title';
        tl.textContent = title;
        sec.appendChild(tl);
        rows.forEach(r => {
          const row = document.createElement('div');
          row.className = 'msm-t-help-row';
          row.innerHTML = `<span class="msm-t-help-key">${r[keyField]}</span><span class="msm-t-help-val">${r[valField]}</span>`;
          sec.appendChild(row);
        });
        return sec;
      };

      if (help.shortcuts && help.shortcuts.length) {
        wrap.appendChild(mkSection('Keyboard Shortcuts', help.shortcuts, 'keys', 'action'));
      }
      if (help.commands && help.commands.length) {
        wrap.appendChild(mkSection('Commands', help.commands, 'cmd', 'desc'));
      }
      if (help.tips && help.tips.length) {
        const tipsSection = document.createElement('div');
        tipsSection.className = 'msm-t-help-section';
        const tl = document.createElement('div');
        tl.className = 'msm-t-help-title';
        tl.textContent = 'Tips';
        tipsSection.appendChild(tl);
        help.tips.forEach(tip => {
          const t = document.createElement('div');
          t.className   = 'msm-t-tip';
          t.textContent = tip;
          tipsSection.appendChild(t);
        });
        wrap.appendChild(tipsSection);
      }

      content.appendChild(wrap);
    },

    /* ── System log ─────────────────────────────── */
    _logQueue: [],
    _log(message, type = '') {
      if (!this.logEl) return;
      const line = document.createElement('div');
      line.className = 'msm-t-log-line' +
        (type === 'accent' ? ' msm-t-log-line--accent' : '') +
        (type === 'error'  ? ' msm-t-log-line--error'  : '') +
        (type === 'ok'     ? ' msm-t-log-line--ok'     : '');
      const ts = new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit', second:'2-digit' });
      line.textContent = `[${ts}] ${message}`;
      this.logEl.appendChild(line);
      this.logEl.scrollTop = this.logEl.scrollHeight;
      /* Keep max 60 lines */
      while (this.logEl.children.length > 60) this.logEl.removeChild(this.logEl.firstChild);
    },

    /* ── Command interpreter ────────────────────── */
    _handleCommand(cmd) {
      this._log(`> ${cmd}`);
      const parts = cmd.trim().split(/\s+/);
      const verb  = parts[0].toLowerCase();
      const args  = parts.slice(1);

      switch (verb) {

        case 'help':
        case '?':
          this._activateTab('help');
          this._log('Opening help panel.', 'ok');
          break;

        case 'ls':
          (CFG.files || []).forEach(f => this._log(`  /${f.name} — ${f.label}`));
          break;

        case 'open': {
          const fname = args[0] ? args[0].replace(/^\//, '') : '';
          const file  = (CFG.files || []).find(f => f.name === fname || f.id === fname);
          if (file) {
            this._activateTab(file.id);
            this._log(`Opened /${file.name}`, 'ok');
          } else {
            this._log(`File not found: ${fname}. Use 'ls' to list files.`, 'error');
          }
          break;
        }

        case 'set': {
          const key = args[0];
          const val = args.slice(1).join(' ');
          if (!key || !val) {
            this._log('Usage: set <variable> <value>  e.g. set --accent #ff6b6b', 'error');
            break;
          }
          if (!Security.isAllowedKey(key)) {
            this._log(`"${key}" is not in the allowed variable list.`, 'error');
            break;
          }
          const sanitized = Security.sanitize(key, val);
          if (!sanitized) {
            this._log(`Invalid value: "${val}" for ${key}`, 'error');
            break;
          }
          CSSEngine.apply(key, sanitized);
          this._log(`${key} → ${sanitized}`, 'accent');
          /* Re-render active file so UI stays in sync */
          if (State.activeFile) this._renderFile(State.activeFile);
          break;
        }

        case 'get': {
          const key = args[0];
          if (!key) { this._log('Usage: get <variable>', 'error'); break; }
          const val = CSSEngine.read(key);
          this._log(`${key} : ${val || '(not set)'}`);
          break;
        }

        case 'restore': {
          const key = args[0];
          if (key) {
            if (State.originals.hasOwnProperty(key)) {
              CSSEngine.restore(key);
              this._log(`${key} restored to original`, 'ok');
              if (State.activeFile) this._renderFile(State.activeFile);
            } else {
              this._log(`No override found for ${key}`, 'error');
            }
          } else {
            const count = Object.keys(State.modified).length;
            if (!count) { this._log('No modifications to restore.'); break; }
            CSSEngine.restoreAll();
            this._log(`Restored ${count} variable(s) to original values.`, 'ok');
            if (State.activeFile) this._renderFile(State.activeFile);
          }
          break;
        }

        case 'status': {
          const mods = Object.entries(State.modified);
          if (!mods.length) { this._log('No modifications this session.'); break; }
          this._log(`${mods.length} modification(s) active:`);
          mods.forEach(([k, v]) => this._log(`  ${k} : ${v}`, 'accent'));
          break;
        }

        case 'clear':
          if (this.logEl) this.logEl.innerHTML = '';
          break;

        case 'theme': {
          const themeName = args[0];
          const validThemes = ['dark', 'light', 'slate', 'forest'];
          if (!themeName || !validThemes.includes(themeName)) {
            this._log(`Usage: theme <dark|light|slate|forest>`, 'error');
            break;
          }
          if (typeof window.setTheme === 'function') {
            window.setTheme(themeName);
            this._log(`Site theme changed to: ${themeName}`, 'ok');
          } else {
            document.documentElement.setAttribute('data-theme', themeName);
            this._log(`Theme applied: ${themeName}`, 'ok');
          }
          break;
        }

        case 'minimize':
          this.minimize();
          this._log('Terminal minimized. Changes preserved.', 'ok');
          break;

        case 'exit':
        case 'close':
          this._log('Closing. Restoring original state…', 'ok');
          setTimeout(() => this.close(), 600);
          break;

        default:
          this._log(`Unknown command: "${verb}". Type 'help' for available commands.`, 'error');
          break;
      }
    },

    /* ── Color utility ──────────────────────────── */
    _toHex(colorStr) {
      if (!colorStr) return null;
      const s = colorStr.trim();
      if (/^#[0-9a-fA-F]{3,8}$/.test(s)) return s.slice(0, 7);
      /* Use canvas to convert named colors / rgb() */
      try {
        const c  = document.createElement('canvas');
        c.width  = c.height = 1;
        const ctx = c.getContext('2d');
        ctx.fillStyle = s;
        ctx.fillRect(0, 0, 1, 1);
        const d = ctx.getImageData(0, 0, 1, 1).data;
        return '#' + [d[0], d[1], d[2]].map(x => x.toString(16).padStart(2, '0')).join('');
      } catch { return null; }
    },

    /* ── Panel visibility ───────────────────────── */
    open() {
      if (!this.el) return;
      State.isOpen      = true;
      State.isMinimized = false;
      this.el.classList.remove('msm-terminal--hidden');
      /* Small delay so CSS transition fires */
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this.el.classList.add('msm-terminal--visible');
        });
      });
      this._log('MSM://SYS_CORE initialized.', 'ok');
      this._log(`Build ${CFG.system.build} · ${Object.keys(Security).length} security checks active.`);
    },

    close() {
      if (!this.el) return;
      /* Restore ALL CSS variables before closing */
      const count = Object.keys(State.modified).length;
      CSSEngine.restoreAll();
      if (count) this._log(`Restored ${count} override(s). Original state recovered.`, 'ok');
      State.isOpen      = false;
      State.isMinimized = false;
      this.el.classList.remove('msm-terminal--visible');
      setTimeout(() => { this.el.classList.add('msm-terminal--hidden'); }, 380);
    },

    minimize() {
      if (!this.el) return;
      State.isMinimized = true;
      this.el.classList.remove('msm-terminal--visible');
      setTimeout(() => { this.el.classList.add('msm-terminal--hidden'); }, 380);
    },

    toggle() {
      if (!State.isOpen || State.isMinimized) {
        State.isOpen      = true;
        State.isMinimized = false;
        this.el.classList.remove('msm-terminal--hidden');
        requestAnimationFrame(() => requestAnimationFrame(() => this.el.classList.add('msm-terminal--visible')));
        setTimeout(() => { if (this.inputEl) this.inputEl.focus(); }, 400);
        if (!State.isOpen) this._log('MSM://SYS_CORE initialized.', 'ok');
      } else {
        this.minimize();
      }
    },
  };

  /* ═══════════════════════════════════════════════════════
     § 8 — GLOBAL EVENT LISTENERS
     Keyboard shortcut · Right-click intercept · Click-away
  ═══════════════════════════════════════════════════════ */

  function bindGlobalEvents() {

    /* Custom right-click */
    document.addEventListener('contextmenu', (e) => {
      /* Let browser DevTools (actual F12 inspect) work normally */
      /* Only intercept on non-editable elements */
      const tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) return;
      e.preventDefault();
      ContextMenu.hide();
      ContextMenu.show(e.clientX, e.clientY);
    });

    /* Hide context menu on left-click or scroll */
    document.addEventListener('click',  () => { if (ContextMenu.visible) ContextMenu.hide(); });
    document.addEventListener('scroll', () => { if (ContextMenu.visible) ContextMenu.hide(); }, { capture: true, passive: true });
    document.addEventListener('keydown', (e) => {
      /* Ctrl+Shift+M → toggle terminal */
      if (e.ctrlKey && e.shiftKey && e.key === 'M') {
        e.preventDefault();
        Terminal.toggle();
      }
      /* Escape → hide context menu (do NOT override browser escape behavior otherwise) */
      if (e.key === 'Escape') {
        if (ContextMenu.visible) ContextMenu.hide();
      }
      /* Ctrl+Shift+I → do NOT override. Let browser DevTools open normally. */
    });
  }

  /* ═══════════════════════════════════════════════════════
     § 9 — STYLE INJECTION
  ═══════════════════════════════════════════════════════ */

  function injectStyles() {
    if (document.getElementById('msm-sys-styles')) return;
    const el = document.createElement('style');
    el.id          = 'msm-sys-styles';
    el.textContent = SYS_CSS;
    document.head.appendChild(el);
  }

  /* ═══════════════════════════════════════════════════════
     § 10 — INITIALISATION
  ═══════════════════════════════════════════════════════ */

  function init() {
    injectStyles();
    Terminal._initHandlers();
    Terminal.build();
    ContextMenu.build();
    QROverlay.build();
    bindGlobalEvents();

    /* Expose public API */
    window.MSMSysCore = {
      open:     () => Terminal.open(),
      close:    () => Terminal.close(),
      minimize: () => Terminal.minimize(),
      toggle:   () => Terminal.toggle(),
      restore:  () => CSSEngine.restoreAll(),
      status:   () => ({ modified: { ...State.modified }, originals: { ...State.originals } }),
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})(); /* end IIFE */
