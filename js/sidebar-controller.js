/* ═══════════════════════════════════════════════════════════════════════
   sidebar-controller.js
   Premium Desktop-Only Hamburger Sidebar System
   MSM Personal Portfolio — v1.1
   ─────────────────────────────────────────────────────────────────────
   FIXES v1.1:
   · Clock page ID fixed: 'clock' → 'birthday' (matches navigateTo)
   · Panel + overlay now start at top: 64px (below navbar, not over it)
   · Sidebar visual style matches mobile hamburger exactly
     (large italic serif, counter number stacked above label)
   · Per-page-section MutationObserver for reliable active indicator
   · Page order: Photos · Journey · Clock · Lists · Thoughts · Games
   ─────────────────────────────────────────────────────────────────────
   DESKTOP ONLY (≥1024px). Mobile navigation is COMPLETELY untouched.
═══════════════════════════════════════════════════════════════════════ */

(function (global, doc) {
  'use strict';

  /* ══════════════════════════════════════════════════════════════════
     CONFIGURATION
  ══════════════════════════════════════════════════════════════════ */
  var CFG = {
    BREAKPOINT  : 1024,      /* px — desktop only above this            */
    WIDTH_VW    : 26,        /* sidebar width vw (22–28 range)          */
    OPEN_MS     : 540,       /* slide-in duration                       */
    CLOSE_MS    : 420,       /* slide-out duration                      */
    BLUR_MS     : 360,       /* content blur/unblur duration            */
    EASE_OUT    : 'cubic-bezier(0.16, 1, 0.3, 1)',
    EASE_IN     : 'cubic-bezier(0.76, 0, 0.24, 1)',
    HOVER_SHIFT : 4,         /* px rightward shift on hover             */
    CONTENT_BLUR: 7,         /* px blur on main content                 */
    CONTENT_DIM : 0.38,      /* dim opacity on main content             */
    NAV_HEIGHT  : 64,        /* px — must match #nav height in nav.css  */

    /*
      FIX v1.1 — page IDs must exactly match what navigateTo() in
      main.js understands. 'clock' renamed to 'birthday' because the
      page section is #page-birthday and navigateTo('birthday') is
      what main.js expects. Wrong ID = black screen + broken nav.
    */
    PAGES: [
      { id: 'photos',   label: 'Photos',   num: '01' },
      { id: 'journey',  label: 'Journey',  num: '02' },
      { id: 'birthday', label: 'Clock',    num: '03' }, /* was 'clock' — FIXED */
      { id: 'lists',    label: 'Lists',    num: '04' },
      { id: 'thoughts', label: 'Thoughts', num: '05' },
      { id: 'games',    label: 'Games',    num: '06' }
    ]
  };

  /* ══════════════════════════════════════════════════════════════════
     STATE
  ══════════════════════════════════════════════════════════════════ */
  var S = {
    open        : false,
    animating   : false,
    activePage  : null,
    savedScrollY: 0,
    scrollbarW  : 0,
    panel       : null,
    overlay     : null,
    hamburger   : null,
    line1       : null,
    line2       : null,
    line3       : null,
    navItems    : []
  };

  /* ══════════════════════════════════════════════════════════════════
     UTILITIES
  ══════════════════════════════════════════════════════════════════ */

  function isDesktop() {
    return window.innerWidth >= CFG.BREAKPOINT;
  }

  function getCssVar(name) {
    return getComputedStyle(doc.documentElement).getPropertyValue(name).trim();
  }

  function hexToRgb(hex) {
    var clean = hex.replace('#', '').trim();
    if (clean.length === 3) {
      clean = clean[0]+clean[0]+clean[1]+clean[1]+clean[2]+clean[2];
    }
    if (clean.length !== 6) return null;
    return {
      r: parseInt(clean.slice(0, 2), 16),
      g: parseInt(clean.slice(2, 4), 16),
      b: parseInt(clean.slice(4, 6), 16)
    };
  }

  /* Sync accent colour as R/G/B vars so CSS rgba() tints update with theme */
  function syncAccentRgb() {
    var hex = getCssVar('--accent') || '#c8a96e';
    var rgb = hexToRgb(hex);
    if (!rgb) rgb = { r: 200, g: 169, b: 110 };
    doc.documentElement.style.setProperty('--sb-accent-r', rgb.r);
    doc.documentElement.style.setProperty('--sb-accent-g', rgb.g);
    doc.documentElement.style.setProperty('--sb-accent-b', rgb.b);
  }

  /* Reuse the existing mechanical click sound — never creates a new one */
  function playMechanicalClick() {
    if (typeof global.playMechanicalSound === 'function') { global.playMechanicalSound(); return; }
    if (typeof global.playClick           === 'function') { global.playClick();            return; }
    if (typeof global.triggerClickSound   === 'function') { global.triggerClickSound();    return; }
    if (typeof global.navClick            === 'function') { global.navClick();             return; }
    var audio =
      doc.getElementById('mechanical-sound') ||
      doc.getElementById('click-sound')      ||
      doc.getElementById('nav-click-sound')  ||
      doc.getElementById('ui-click')         ||
      doc.querySelector('audio[data-sound="mechanical"]') ||
      doc.querySelector('audio[data-sound="click"]');
    if (audio && typeof audio.play === 'function') {
      audio.currentTime = 0;
      audio.play().catch(function () {});
    }
  }

  /* ══════════════════════════════════════════════════════════════════
     CSS INJECTION
     v1.1 changes highlighted with ← FIX comments
  ══════════════════════════════════════════════════════════════════ */
  function injectStyles() {
    if (doc.getElementById('sb-styles')) return;
    var s = doc.createElement('style');
    s.id = 'sb-styles';
    s.textContent = [

      /* ── Desktop hamburger button ───────────────────────────────── */
      '.sb-hamburger {',
      '  display: none;',
      '  flex-direction: column;',
      '  justify-content: center;',
      '  align-items: flex-end;',
      '  gap: 5px;',
      '  width: 36px;',
      '  height: 36px;',
      '  cursor: pointer;',
      '  background: none;',
      '  border: none;',
      '  padding: 0;',
      '  flex-shrink: 0;',
      '  outline: none;',
      '  -webkit-tap-highlight-color: transparent;',
      '}',
      '@media (min-width: ' + CFG.BREAKPOINT + 'px) {',
      '  .sb-hamburger { display: flex; }',
      '}',

      /* Three descending-length thin lines */
      '.sb-hamburger .sb-line {',
      '  display: block;',
      '  height: 1.5px;',
      '  background: var(--text, #f0ebe0);',
      '  border-radius: 1px;',
      '  transform-origin: center center;',
      '  will-change: transform, opacity, width;',
      '  transition:',
      '    width     0.36s cubic-bezier(0.16, 1, 0.3, 1),',
      '    transform 0.40s cubic-bezier(0.16, 1, 0.3, 1),',
      '    opacity   0.30s ease;',
      '}',
      '.sb-hamburger .sb-line-1 { width: 24px; }',
      '.sb-hamburger .sb-line-2 { width: 18px; }',
      '.sb-hamburger .sb-line-3 { width: 12px; }',

      /* Morph to X on open */
      '.sb-hamburger.sb-is-open .sb-line-1 { width: 22px; transform: translateY(6.5px) rotate(45deg); }',
      '.sb-hamburger.sb-is-open .sb-line-2 { opacity: 0; width: 0; }',
      '.sb-hamburger.sb-is-open .sb-line-3 { width: 22px; transform: translateY(-6.5px) rotate(-45deg); }',
      '.sb-hamburger:hover .sb-line { opacity: 0.7; }',

      /* ── Divider between page links and control buttons ─────────── */
      '.sb-nav-sep {',
      '  display: none;',
      '  width: 1px;',
      '  height: 18px;',
      '  background: rgba(255,255,255,0.12);',
      '  flex-shrink: 0;',
      '  align-self: center;',
      '  margin: 0 6px;',
      '}',
      '@media (min-width: ' + CFG.BREAKPOINT + 'px) { .sb-nav-sep { display: block; } }',

      /* ── Overlay — FIX: top:64px so navbar is never blurred/dimmed ─ */
      '.sb-overlay {',
      '  position: fixed;',
      '  top: ' + CFG.NAV_HEIGHT + 'px;',    /* ← FIX was: top: 0 */
      '  left: 0; right: 0; bottom: 0;',
      '  z-index: 800;',
      '  pointer-events: none;',
      '  opacity: 0;',
      '  background: rgba(0,0,0,0);',
      '  backdrop-filter: blur(0px);',
      '  -webkit-backdrop-filter: blur(0px);',
      '  transition:',
      '    opacity         ' + CFG.BLUR_MS + 'ms cubic-bezier(0.16,1,0.3,1),',
      '    background      ' + CFG.BLUR_MS + 'ms cubic-bezier(0.16,1,0.3,1),',
      '    backdrop-filter ' + CFG.BLUR_MS + 'ms cubic-bezier(0.16,1,0.3,1),',
      '    -webkit-backdrop-filter ' + CFG.BLUR_MS + 'ms cubic-bezier(0.16,1,0.3,1);',
      '  visibility: hidden;',
      '}',
      '.sb-overlay.sb-overlay--visible { visibility: visible; }',
      '.sb-overlay.sb-overlay--active {',
      '  pointer-events: auto; opacity: 1;',
      '  background: rgba(0,0,0,' + CFG.CONTENT_DIM + ');',
      '  backdrop-filter: blur(' + CFG.CONTENT_BLUR + 'px);',
      '  -webkit-backdrop-filter: blur(' + CFG.CONTENT_BLUR + 'px);',
      '}',

      /* ── Sidebar panel — FIX: top:64px so it appears below navbar ── */
      '.sb-panel {',
      '  position: fixed;',
      '  top: ' + CFG.NAV_HEIGHT + 'px;',    /* ← FIX was: top: 0 */
      '  right: 0; bottom: 0;',
      '  width: ' + CFG.WIDTH_VW + 'vw;',
      '  min-width: 260px;',
      '  max-width: 420px;',
      '  z-index: 900;',
      '  display: flex;',
      '  flex-direction: column;',
      '  background: var(--bg, #080808);',
      '  border-left: 1px solid var(--border, rgba(255,255,255,0.06));',
      '  transform: translateX(100%);',
      '  opacity: 0;',
      '  pointer-events: none;',
      '  will-change: transform, opacity;',
      '  overflow: hidden;',
      '  transition:',
      '    transform ' + CFG.OPEN_MS + 'ms cubic-bezier(0.16,1,0.3,1),',
      '    opacity   ' + CFG.OPEN_MS + 'ms ease;',
      '}',

      /* Ultra-subtle theme-tinted left edge (paint brush effect, 1/6 width) */
      '.sb-panel::before {',
      '  content: "";',
      '  position: absolute; top: 0; left: 0; bottom: 0;',
      '  width: 16.667%;',
      '  pointer-events: none; z-index: 0;',
      '  background: linear-gradient(to right,',
      '    rgba(var(--sb-accent-r,200),var(--sb-accent-g,169),var(--sb-accent-b,110),0.018) 0%,',
      '    rgba(var(--sb-accent-r,200),var(--sb-accent-g,169),var(--sb-accent-b,110),0.048) 55%,',
      '    rgba(var(--sb-accent-r,200),var(--sb-accent-g,169),var(--sb-accent-b,110),0.022) 80%,',
      '    transparent 100%);',
      '  transition: background 0.5s ease;',
      '}',

      '.sb-panel.sb-panel--open    { transform: translateX(0); opacity: 1; pointer-events: auto; }',
      '.sb-panel.sb-panel--closing {',
      '  transform: translateX(100%); opacity: 0; pointer-events: none;',
      '  transition:',
      '    transform ' + CFG.CLOSE_MS + 'ms cubic-bezier(0.76,0,0.24,1),',
      '    opacity   ' + CFG.CLOSE_MS + 'ms ease;',
      '}',

      /* ── Sidebar inner container ─────────────────────────────────── */
      '.sb-inner {',
      '  position: relative; z-index: 1;',
      '  display: flex; flex-direction: column; height: 100%;',
      '}',

      /* ── Sidebar header ─────────────────────────────────────────── */
      '.sb-header {',
      '  padding: clamp(20px,3.5vh,36px) clamp(24px,2.8vw,40px) clamp(14px,2vh,24px);',
      '  border-bottom: 1px solid var(--border, rgba(255,255,255,0.06));',
      '  flex-shrink: 0;',
      '}',
      '.sb-header-label {',
      '  font-family: var(--ff-mono, "DM Mono", monospace);',
      '  font-size: 0.50rem; letter-spacing: 0.26em; text-transform: uppercase;',
      '  color: var(--text3, rgba(240,235,224,0.32));',
      '}',

      /* ── Sidebar nav list ───────────────────────────────────────── */
      '.sb-nav {',
      '  flex: 1;',
      '  padding: clamp(8px,1.5vh,18px) 0;',
      '  overflow-y: auto; scrollbar-width: none;',
      '  position: relative;',
      '}',
      '.sb-nav::-webkit-scrollbar { display: none; }',

      /*
        Vertical accent line on the LEFT — identical to mobile nav ::before.
        Mobile uses left: 6% from left edge of the overlay.
        We mirror that here inside the sidebar panel.
      */
      '.sb-nav::before {',
      '  content: "";',
      '  position: absolute; top: 0; bottom: 0; left: 6%; width: 1px;',
      '  background: linear-gradient(to bottom,',
      '    transparent 0%,',
      '    var(--border2, rgba(255,255,255,0.08)) 10%,',
      '    var(--border2, rgba(255,255,255,0.08)) 90%,',
      '    transparent 100%);',
      '  pointer-events: none; z-index: 0;',
      '}',

      /*
        FIX v1.1 — nav item now EXACTLY matches mobile nav link:
        · padding mirrors #mobile-nav a (0.6rem vertical, 9% left indent)
        · hover: translateX instead of padding shift (cleaner on desktop)
        · no description / subtitle / extra text
      */
      '.sb-nav-item {',
      '  display: flex; align-items: center; justify-content: space-between;',
      '  padding: 0.6rem 1.5rem 0.6rem 9%;',  /* matches mobile link padding */
      '  cursor: pointer; user-select: none;',
      '  position: relative; z-index: 1;',
      '  transform: translateX(0);',
      '  will-change: transform;',
      '  transition: transform 0.25s ease;',
      '}',
      '.sb-nav-item:hover { transform: translateX(' + CFG.HOVER_SHIFT + 'px); }',

      /*
        Left group: counter number stacked ABOVE the label.
        Mirrors mobile nav counter pseudo-element (display:block above link).
      */
      '.sb-nav-item-left {',
      '  display: flex; flex-direction: column;',
      '  align-items: flex-start; gap: 0.08rem;',
      '}',

      /* Counter — identical to mobile ::before pseudo-element */
      '.sb-nav-num {',
      '  font-family: var(--ff-mono, "DM Mono", monospace);',
      '  font-size: 0.5rem; letter-spacing: 0.12em;',
      '  color: var(--text3, rgba(240,235,224,0.35));',
      '  opacity: 0.45; display: block; line-height: 1;',
      '  transition: color 0.25s ease, opacity 0.25s ease;',
      '}',

      /* Label — identical to mobile nav link text (large italic serif) */
      '.sb-nav-label {',
      '  font-family: var(--ff-display, "Cormorant Garamond", serif);',
      '  font-size: 1.35rem; font-weight: 300; font-style: italic;',
      '  letter-spacing: 0.05em; line-height: 1;',
      '  color: var(--text3, rgba(240,235,224,0.5));',
      '  transition: color 0.25s ease;',
      '}',

      /* Hover — accent colour, matches mobile hover */
      '.sb-nav-item:hover .sb-nav-label { color: var(--accent, #c8a96e); }',
      '.sb-nav-item:hover .sb-nav-num   { color: var(--accent, #c8a96e); opacity: 0.65; }',

      /* Active — bright text (matches mobile active link) */
      '.sb-nav-item.sb-nav-item--active .sb-nav-label { color: var(--text, #f0ebe0); }',
      '.sb-nav-item.sb-nav-item--active .sb-nav-num   { color: var(--text3, rgba(240,235,224,0.5)); opacity: 0.6; }',

      /* Right-side active indicator — vertical line, only on active page */
      '.sb-nav-indicator {',
      '  width: 1.5px; height: clamp(12px,1.8vh,18px);',
      '  background: var(--accent, #c8a96e); border-radius: 1px;',
      '  opacity: 0; transform: scaleY(0); transform-origin: center; flex-shrink: 0;',
      '  transition: opacity 0.30s ease, transform 0.30s cubic-bezier(0.16,1,0.3,1);',
      '}',
      '.sb-nav-item.sb-nav-item--active .sb-nav-indicator { opacity: 1; transform: scaleY(1); }',

      /* ── Thin rule above footer ─────────────────────────────────── */
      '.sb-rule {',
      '  height: 1px; margin: 0 clamp(24px,2.8vw,40px);',
      '  background: rgba(255,255,255,0.04); flex-shrink: 0;',
      '}',

      /* ── Footer — ACCESS LEVEL: PUBLIC ──────────────────────────── */
      '.sb-footer {',
      '  padding: clamp(14px,2vh,24px) clamp(24px,2.8vw,40px);',
      '  border-top: 1px solid var(--border, rgba(255,255,255,0.06));',
      '  flex-shrink: 0;',
      '}',
      '.sb-access-row { display: flex; align-items: center; gap: 10px; }',
      '.sb-access-key {',
      '  font-family: var(--ff-mono, "DM Mono", monospace);',
      '  font-size: 0.46rem; letter-spacing: 0.28em; text-transform: uppercase;',
      '  color: var(--text3, rgba(240,235,224,0.28)); opacity: 0.55;',
      '}',
      '.sb-access-val {',
      '  font-family: var(--ff-mono, "DM Mono", monospace);',
      '  font-size: 0.50rem; letter-spacing: 0.2em; text-transform: uppercase;',
      '  color: var(--text3, rgba(240,235,224,0.32)); opacity: 0.65;',
      '}',

      /* ── Hard hide on mobile — never interfere with mobile nav ────── */
      '@media (max-width: ' + (CFG.BREAKPOINT - 1) + 'px) {',
      '  .sb-panel, .sb-overlay, .sb-hamburger, .sb-nav-sep { display: none !important; }',
      '}'

    ].join('\n');
    doc.head.appendChild(s);
  }

  /* ══════════════════════════════════════════════════════════════════
     DOM — BUILD OVERLAY
  ══════════════════════════════════════════════════════════════════ */
  function buildOverlay() {
    if (doc.getElementById('sb-overlay')) {
      S.overlay = doc.getElementById('sb-overlay'); return;
    }
    var el = doc.createElement('div');
    el.id = 'sb-overlay'; el.className = 'sb-overlay';
    el.setAttribute('aria-hidden', 'true');
    doc.body.appendChild(el);
    S.overlay = el;
  }

  /* ══════════════════════════════════════════════════════════════════
     DOM — BUILD SIDEBAR PANEL
     v1.1: Item HTML restructured — counter number stacked above label,
           matching the mobile nav counter pseudo-element exactly.
  ══════════════════════════════════════════════════════════════════ */
  function buildPanel() {
    if (doc.getElementById('sb-panel')) {
      S.panel = doc.getElementById('sb-panel'); return;
    }

    var panel = doc.createElement('aside');
    panel.id = 'sb-panel'; panel.className = 'sb-panel';
    panel.setAttribute('role', 'navigation');
    panel.setAttribute('aria-label', 'Site sections');
    panel.setAttribute('aria-hidden', 'true');

    var inner = doc.createElement('div');
    inner.className = 'sb-inner';

    /* Header */
    var header = doc.createElement('div');
    header.className = 'sb-header';
    var hLabel = doc.createElement('span');
    hLabel.className = 'sb-header-label';
    hLabel.textContent = 'Sections';
    header.appendChild(hLabel);
    inner.appendChild(header);

    /* Nav list */
    var nav = doc.createElement('nav');
    nav.className = 'sb-nav';

    CFG.PAGES.forEach(function (page) {
      var item = doc.createElement('div');
      item.className = 'sb-nav-item';
      item.dataset.sbPage = page.id;
      item.setAttribute('role', 'button');
      item.setAttribute('tabindex', '0');
      item.setAttribute('aria-label', 'Go to ' + page.label);

      /*
        v1.1 FIX — matches mobile nav structure exactly:
        .sb-nav-num  (small mono counter) displayed as block ABOVE
        .sb-nav-label (large italic serif)
        This mirrors how #mobile-nav a::before shows the counter.
      */
      var left = doc.createElement('div');
      left.className = 'sb-nav-item-left';

      var num = doc.createElement('span');
      num.className = 'sb-nav-num';
      num.textContent = page.num;            /* "01", "02" … */

      var label = doc.createElement('span');
      label.className = 'sb-nav-label';
      label.textContent = page.label;       /* "Photos", "Journey" … */

      left.appendChild(num);
      left.appendChild(label);

      /* Right-side active indicator line */
      var indicator = doc.createElement('span');
      indicator.className = 'sb-nav-indicator';
      indicator.setAttribute('aria-hidden', 'true');

      item.appendChild(left);
      item.appendChild(indicator);

      /* Hover — play mechanical click */
      item.addEventListener('mouseenter', function () {
        if (isDesktop()) playMechanicalClick();
      });

      /* Click — close sidebar then navigate */
      item.addEventListener('click', function () {
        if (!isDesktop()) return;
        handleNavigation(page.id);
      });

      /* Keyboard — Enter / Space */
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (!isDesktop()) return;
          handleNavigation(page.id);
        }
      });

      nav.appendChild(item);
      S.navItems.push(item);
    });

    inner.appendChild(nav);

    /* Rule */
    var rule = doc.createElement('div');
    rule.className = 'sb-rule';
    inner.appendChild(rule);

    /* Footer */
    var footer = doc.createElement('footer');
    footer.className = 'sb-footer';
    var row = doc.createElement('div');
    row.className = 'sb-access-row';
    var key = doc.createElement('span');
    key.className = 'sb-access-key'; key.textContent = 'Access Level';
    var val = doc.createElement('span');
    val.className = 'sb-access-val'; val.textContent = 'Public';
    row.appendChild(key); row.appendChild(val);
    footer.appendChild(row);
    inner.appendChild(footer);

    panel.appendChild(inner);
    doc.body.appendChild(panel);
    S.panel = panel;
  }

  /* ══════════════════════════════════════════════════════════════════
     DOM — BUILD DESKTOP HAMBURGER & INJECT INTO NAV-RIGHT
  ══════════════════════════════════════════════════════════════════ */
  function buildHamburger() {
    if (doc.getElementById('sb-hamburger')) {
      S.hamburger = doc.getElementById('sb-hamburger');
      S.line1 = S.hamburger.querySelector('.sb-line-1');
      S.line2 = S.hamburger.querySelector('.sb-line-2');
      S.line3 = S.hamburger.querySelector('.sb-line-3');
      return;
    }

    var btn = doc.createElement('button');
    btn.id = 'sb-hamburger'; btn.className = 'sb-hamburger';
    btn.setAttribute('type', 'button');
    btn.setAttribute('aria-label', 'Open site sections');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', 'sb-panel');

    var l1 = doc.createElement('span'); l1.className = 'sb-line sb-line-1';
    var l2 = doc.createElement('span'); l2.className = 'sb-line sb-line-2';
    var l3 = doc.createElement('span'); l3.className = 'sb-line sb-line-3';
    btn.appendChild(l1); btn.appendChild(l2); btn.appendChild(l3);
    btn.addEventListener('click', onHamburgerClick);

    S.hamburger = btn; S.line1 = l1; S.line2 = l2; S.line3 = l3;

    /* Inject after theme dots, inside .nav-right */
    var navRight = findDesktopNav();
    if (navRight) {
      var sep = doc.createElement('div');
      sep.className = 'sb-nav-sep';
      navRight.appendChild(sep);
      navRight.appendChild(btn);
    } else {
      /* Fallback if nav not found */
      btn.style.cssText = 'position:fixed;top:20px;right:24px;z-index:950;';
      doc.body.appendChild(btn);
    }
  }

  /* Try selectors in priority order. data-desktop-nav is set in index.html */
  function findDesktopNav() {
    var selectors = [
      '[data-desktop-nav]',  /* set on .nav-right in index.html */
      '.nav-right',
      '.nav-desktop',
      '.desktop-nav',
      '#desktop-nav',
      'header nav',
      '.header-nav',
      'nav.main-nav'
    ];
    for (var i = 0; i < selectors.length; i++) {
      var el = doc.querySelector(selectors[i]);
      if (el) return el;
    }
    return null;
  }

  /* ══════════════════════════════════════════════════════════════════
     SCROLL FREEZE
     Locks body scroll without any layout shift.
     Compensates for scrollbar width to prevent content jump.
  ══════════════════════════════════════════════════════════════════ */
  function freezeScroll() {
    S.savedScrollY = window.scrollY;
    S.scrollbarW   = window.innerWidth - doc.documentElement.clientWidth;
    doc.documentElement.style.setProperty('--sb-scrollbar-width', S.scrollbarW + 'px');
    var b = doc.body;
    b.style.overflow = 'hidden'; b.style.position = 'fixed';
    b.style.top = '-' + S.savedScrollY + 'px';
    b.style.width = '100%'; b.style.paddingRight = S.scrollbarW + 'px';
  }

  function unfreezeScroll() {
    var b = doc.body;
    b.style.overflow = ''; b.style.position = '';
    b.style.top = ''; b.style.width = ''; b.style.paddingRight = '';
    window.scrollTo(0, S.savedScrollY);
  }

  /* ══════════════════════════════════════════════════════════════════
     OPEN SIDEBAR
  ══════════════════════════════════════════════════════════════════ */
  function openSidebar() {
    if (!isDesktop() || S.open || S.animating) return;
    S.animating = true; S.open = true;
    syncAccentRgb();
    playMechanicalClick();
    freezeScroll();
    S.overlay.classList.add('sb-overlay--visible');
    void S.overlay.offsetHeight; /* force reflow so transition fires */
    S.overlay.classList.add('sb-overlay--active');
    S.panel.classList.remove('sb-panel--closing');
    void S.panel.offsetHeight;
    S.panel.classList.add('sb-panel--open');
    S.panel.setAttribute('aria-hidden', 'false');
    S.hamburger.classList.add('sb-is-open');
    S.hamburger.setAttribute('aria-expanded', 'true');
    S.hamburger.setAttribute('aria-label', 'Close site sections');
    exposePageState(S.activePage);
    setTimeout(function () { S.animating = false; }, CFG.OPEN_MS + 40);
  }

  /* ══════════════════════════════════════════════════════════════════
     CLOSE SIDEBAR
     Optional callback fires AFTER animation completes.
  ══════════════════════════════════════════════════════════════════ */
  function closeSidebar(callback) {
    if (!S.open || S.animating) return;
    S.animating = true; S.open = false;
    S.hamburger.classList.remove('sb-is-open');
    S.hamburger.setAttribute('aria-expanded', 'false');
    S.hamburger.setAttribute('aria-label', 'Open site sections');
    S.panel.classList.remove('sb-panel--open');
    S.panel.classList.add('sb-panel--closing');
    S.panel.setAttribute('aria-hidden', 'true');
    S.overlay.classList.remove('sb-overlay--active');
    var totalMs = Math.max(CFG.CLOSE_MS, CFG.BLUR_MS) + 40;
    setTimeout(function () {
      S.panel.classList.remove('sb-panel--closing');
      S.overlay.classList.remove('sb-overlay--visible');
      unfreezeScroll();
      S.animating = false;
      exposePageState(S.activePage);
      if (typeof callback === 'function') callback();
    }, totalMs);
  }

  function onHamburgerClick() {
    if (!isDesktop()) return;
    if (S.open) { closeSidebar(); } else { openSidebar(); }
  }

  /* ══════════════════════════════════════════════════════════════════
     NAVIGATION — step-by-step:
     1. Sidebar slides closed
     2. Blur disappears (part of close)
     3. navigateTo() fires (page transition)
     Animations never overlap.
  ══════════════════════════════════════════════════════════════════ */
  function handleNavigation(pageId) {
    if (S.animating) return;
    closeSidebar(function () { firePageTransition(pageId); });
  }

  function firePageTransition(pageId) {
    /* Try global navigation functions defined in main.js */
    if (typeof global.navigateTo === 'function') { global.navigateTo(pageId); return; }
    if (typeof global.showPage   === 'function') { global.showPage(pageId);   return; }
    if (typeof global.loadPage   === 'function') { global.loadPage(pageId);   return; }
    if (typeof global.switchPage === 'function') { global.switchPage(pageId); return; }
    if (typeof global.goToPage   === 'function') { global.goToPage(pageId);   return; }
    /* Fallback: click an existing nav link */
    var link =
      doc.querySelector('[data-page="' + pageId + '"]:not(.sb-nav-item)') ||
      doc.querySelector('[data-target="' + pageId + '"]') ||
      doc.querySelector('[href="#' + pageId + '"]') ||
      doc.querySelector('#nav-' + pageId);
    if (link) { link.click(); return; }
    /* Last resort: custom event then hash */
    doc.dispatchEvent(new CustomEvent('sb:navigate', { bubbles: true, detail: { page: pageId } }));
    global.location.hash = pageId;
  }

  /* ══════════════════════════════════════════════════════════════════
     ACTIVE PAGE INDICATOR
  ══════════════════════════════════════════════════════════════════ */
  function setActivePage(pageId) {
    if (!pageId) return;
    S.activePage = pageId;
    S.navItems.forEach(function (item) {
      if (item.dataset.sbPage === pageId) {
        item.classList.add('sb-nav-item--active');
      } else {
        item.classList.remove('sb-nav-item--active');
      }
    });
    exposePageState(pageId);
  }

  function detectActivePage() {
    var active =
      doc.querySelector('.page.active[data-page]')           ||
      doc.querySelector('[data-page][data-active="true"]')   ||
      doc.querySelector('.page-section.is-active[data-page]');
    if (active) { setActivePage(active.dataset.page); return; }
    if (doc.body.dataset.page || doc.body.dataset.currentPage) {
      setActivePage(doc.body.dataset.page || doc.body.dataset.currentPage); return;
    }
    var hash = global.location.hash.replace('#', '');
    if (hash) setActivePage(hash);
  }

  /* ══════════════════════════════════════════════════════════════════
     PAGE CHANGE WATCHER
     v1.1 FIX: Added per-page-section observer.
     Watches each .page[data-page] section for the 'active' class
     being added by main.js → navigateTo(). This is safe (targeted,
     no subtree:true on body which caused hangs in older version).
  ══════════════════════════════════════════════════════════════════ */
  function watchPageChanges() {
    /* Body-level observer (keeps existing behaviour) */
    var bodyObs = new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        if (m.attributeName === 'class' || m.attributeName === 'data-page') {
          detectActivePage();
        }
      });
    });
    bodyObs.observe(doc.body, {
      attributes: true, subtree: false,
      attributeFilter: ['class', 'data-page']
    });

    /*
      FIX v1.1 — Per-page-section MutationObserver.
      Watches each individual page section for class changes.
      When navigateTo() in main.js adds/removes .active from a section,
      this fires immediately and updates the sidebar indicator correctly.
    */
    var pageSections = doc.querySelectorAll('.page[data-page]');
    pageSections.forEach(function (section) {
      var sectionObs = new MutationObserver(function () {
        if (section.classList.contains('active')) {
          setActivePage(section.dataset.page);
        }
      });
      sectionObs.observe(section, {
        attributes: true,
        attributeFilter: ['class']
      });
    });

    /* Custom events from navigation system */
    doc.addEventListener('pageChanged', function (e) {
      if (e.detail && e.detail.page) setActivePage(e.detail.page);
    });
    doc.addEventListener('navigated',   function (e) {
      if (e.detail && e.detail.page) setActivePage(e.detail.page);
    });
    doc.addEventListener('pageSwitch',  function (e) {
      if (e.detail && e.detail.page) setActivePage(e.detail.page);
    });
    doc.addEventListener('sb:setPage',  function (e) {
      if (e.detail && e.detail.page) setActivePage(e.detail.page);
    });

    global.addEventListener('hashchange', function () {
      var hash = global.location.hash.replace('#', '');
      if (hash) setActivePage(hash);
    });
  }

  /* ══════════════════════════════════════════════════════════════════
     RORO PAGE STATE EXPOSURE
     Exposes active page for RoRo AI contextual awareness.
  ══════════════════════════════════════════════════════════════════ */
  function exposePageState(pageId) {
    if (!pageId) return;
    doc.body.setAttribute('data-current-page', pageId);
    if (global.SidebarController) {
      global.SidebarController.currentPage = pageId;
      global.SidebarController.sidebarOpen = S.open;
      global.SidebarController.activePage  = pageId;
    }
    doc.dispatchEvent(new CustomEvent('sb:pageActive', {
      bubbles: true,
      detail: { page: pageId, sidebarOpen: S.open, timestamp: Date.now() }
    }));
  }

  /* ══════════════════════════════════════════════════════════════════
     EVENT BINDINGS
  ══════════════════════════════════════════════════════════════════ */

  function bindOverlay() {
    S.overlay.addEventListener('click', function () {
      if (S.open && !S.animating) closeSidebar();
    });
  }

  function bindKeyboard() {
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && S.open && isDesktop()) closeSidebar();
    });
  }

  function bindResize() {
    var timer;
    global.addEventListener('resize', function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        if (!isDesktop() && S.open) {
          S.panel.classList.remove('sb-panel--open', 'sb-panel--closing');
          S.overlay.classList.remove('sb-overlay--active', 'sb-overlay--visible');
          S.hamburger.classList.remove('sb-is-open');
          unfreezeScroll();
          S.open = false; S.animating = false;
        }
        syncAccentRgb();
      }, 120);
    });
  }

  function bindThemeChange() {
    var obs = new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        if (m.attributeName === 'data-theme' || m.attributeName === 'class') {
          syncAccentRgb();
        }
      });
    });
    obs.observe(doc.documentElement, {
      attributes: true, attributeFilter: ['data-theme', 'class']
    });
    doc.addEventListener('themeChanged',  syncAccentRgb);
    doc.addEventListener('theme:changed', syncAccentRgb);
    doc.addEventListener('sb:themeSync',  syncAccentRgb);
  }

  /* ══════════════════════════════════════════════════════════════════
     PUBLIC API — window.SidebarController
     Used by RoRo (manager-roro.js) to read current page context.
  ══════════════════════════════════════════════════════════════════ */
  function buildPublicAPI() {
    global.SidebarController = {
      currentPage : S.activePage,
      activePage  : S.activePage,
      sidebarOpen : S.open,
      open        : openSidebar,
      close       : closeSidebar,
      toggle      : onHamburgerClick,
      isOpen      : function () { return S.open; },
      isDesktop   : function () { return isDesktop(); },
      setActivePage   : function (id) { setActivePage(id); },
      notifyPageChange: function (id) { setActivePage(id); },
      getPageContext  : function () {
        return {
          currentPage: S.activePage,
          sidebarOpen: S.open,
          timestamp  : Date.now(),
          pages      : CFG.PAGES.map(function (p) { return p.id; })
        };
      }
    };
  }

  /* ══════════════════════════════════════════════════════════════════
     INIT
  ══════════════════════════════════════════════════════════════════ */
  function init() {
    if (global.SidebarController) return; /* prevent double init */
    syncAccentRgb();
    injectStyles();
    buildOverlay();
    buildPanel();
    buildHamburger();
    buildPublicAPI();
    bindOverlay();
    bindKeyboard();
    bindResize();
    bindThemeChange();
    detectActivePage();
    watchPageChanges();
    exposePageState(S.activePage);
  }

  /* ══════════════════════════════════════════════════════════════════
     BOOT
  ══════════════════════════════════════════════════════════════════ */
  if (doc.readyState === 'loading') {
    doc.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})(window, document);
