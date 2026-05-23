/* ═══════════════════════════════════════════════════════════════════════
   sidebar-controller.js
   Premium Desktop-Only Hamburger Sidebar System
   MSM Personal Portfolio — v1.0
   ─────────────────────────────────────────────────────────────────────
   DESKTOP ONLY (≥1024px). Mobile navigation is COMPLETELY untouched.

   Controls:
   · Desktop hamburger button — injected into existing top nav
   · Sidebar panel — slides in from RIGHT (22–28vw)
   · Overlay — blur + dim on main content (no scale / zoom / parallax)
   · Active page indicator — right-side vertical line per nav item
   · Scroll freeze — no layout shift, scrollbar width compensated
   · Step-by-step close sequence → then page transition fires
   · Sidebar item hover — shift right 4px + theme color + mechanical sound
   · Hamburger three-line morph → X on open, back on close
   · RoRo AI page state — window.SidebarController.currentPage
   · ACCESS LEVEL: PUBLIC footer

   Sidebar sections: Journey · Clock · Lists · Games · Photos · Thoughts

   DO NOT TOUCH: mobile navigation, mobile hamburger, mobile styles,
   mobile interactions — those remain 100% unchanged.
═══════════════════════════════════════════════════════════════════════ */

(function (global, doc) {
  'use strict';

  /* ══════════════════════════════════════════════════════════════════
     CONFIGURATION
  ══════════════════════════════════════════════════════════════════ */
  var CFG = {
    BREAKPOINT  : 1024,        // px — sidebar system only activates above this
    WIDTH_VW    : 26,          // sidebar width in vw  (stays in 22–28 range)
    OPEN_MS     : 540,         // sidebar slide-in duration
    CLOSE_MS    : 420,         // sidebar slide-out duration
    BLUR_MS     : 360,         // content blur/unblur duration
    EASE_OUT    : 'cubic-bezier(0.16, 1, 0.3, 1)',  // premium decelerate
    EASE_IN     : 'cubic-bezier(0.76, 0, 0.24, 1)', // premium accelerate
    HOVER_SHIFT : 4,           // px rightward shift on hover
    CONTENT_BLUR: 7,           // px blur applied to main content
    CONTENT_DIM : 0.38,        // opacity of dim layer over content

    /* Sidebar section pages */
    PAGES: [
      { id: 'journey',  label: 'Journey',  num: '01' },
      { id: 'clock',    label: 'Clock',    num: '02' },
      { id: 'lists',    label: 'Lists',    num: '03' },
      { id: 'games',    label: 'Games',    num: '04' },
      { id: 'photos',   label: 'Photos',   num: '05' },
      { id: 'thoughts', label: 'Thoughts', num: '06' }
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
    /* DOM refs — populated during init */
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

  /** True only when viewport qualifies as desktop/laptop */
  function isDesktop() {
    return window.innerWidth >= CFG.BREAKPOINT;
  }

  /** Read a CSS custom property value from :root */
  function getCssVar(name) {
    return getComputedStyle(doc.documentElement)
      .getPropertyValue(name).trim();
  }

  /**
   * Parse a hex color string into an RGB object.
   * Returns { r, g, b } or null if parsing fails.
   */
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

  /**
   * Inject --sb-accent-r/g/b custom properties so CSS can build
   * rgba() tints that follow the active theme colour.
   */
  function syncAccentRgb() {
    var hex = getCssVar('--accent') || '#c8a96e';
    var rgb = hexToRgb(hex);
    if (!rgb) rgb = { r: 200, g: 169, b: 110 };
    var root = doc.documentElement;
    root.style.setProperty('--sb-accent-r', rgb.r);
    root.style.setProperty('--sb-accent-g', rgb.g);
    root.style.setProperty('--sb-accent-b', rgb.b);
  }

  /**
   * Play the existing mechanical click sound.
   * Tries several common patterns used across the codebase.
   * Will never create a new sound — only reuse what already exists.
   */
  function playMechanicalClick() {
    /* Global function patterns */
    if (typeof global.playMechanicalSound === 'function') {
      global.playMechanicalSound(); return;
    }
    if (typeof global.playClick === 'function') {
      global.playClick(); return;
    }
    if (typeof global.triggerClickSound === 'function') {
      global.triggerClickSound(); return;
    }
    if (typeof global.navClick === 'function') {
      global.navClick(); return;
    }
    /* Audio element patterns */
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
     All sidebar-specific desktop styles live here so the file is
     fully self-contained. nav.css / components.css handle the rest
     of the nav restructuring.
  ══════════════════════════════════════════════════════════════════ */
  function injectStyles() {
    if (doc.getElementById('sb-styles')) return;

    var s = doc.createElement('style');
    s.id = 'sb-styles';
    s.textContent = [

      /* ── Hamburger Button ──────────────────────────────────────── */
      '.sb-hamburger {',
      '  display: none;',               /* hidden on mobile */
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

      /* The three elegant thin lines */
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

      /* Lines at rest — descending lengths (right-aligned) */
      '.sb-hamburger .sb-line-1 { width: 24px; }',
      '.sb-hamburger .sb-line-2 { width: 18px; }',
      '.sb-hamburger .sb-line-3 { width: 12px; }',

      /* Morph to X when sidebar is open */
      '.sb-hamburger.sb-is-open .sb-line-1 {',
      '  width: 22px;',
      '  transform: translateY(6.5px) rotate(45deg);',
      '}',
      '.sb-hamburger.sb-is-open .sb-line-2 {',
      '  opacity: 0;',
      '  width: 0;',
      '}',
      '.sb-hamburger.sb-is-open .sb-line-3 {',
      '  width: 22px;',
      '  transform: translateY(-6.5px) rotate(-45deg);',
      '}',

      /* ── Nav vertical divider between page links and controls ─── */
      '.sb-nav-sep {',
      '  display: none;',
      '  width: 1px;',
      '  height: 18px;',
      '  background: rgba(255, 255, 255, 0.12);',
      '  flex-shrink: 0;',
      '  align-self: center;',
      '  margin: 0 4px;',
      '}',

      '@media (min-width: ' + CFG.BREAKPOINT + 'px) {',
      '  .sb-nav-sep { display: block; }',
      '}',

      /* ── Overlay — blur + dim on main content only ───────────── */
      '.sb-overlay {',
      '  position: fixed;',
      '  inset: 0;',
      '  z-index: 800;',
      '  pointer-events: none;',
      '  opacity: 0;',
      '  background: rgba(0, 0, 0, 0);',
      '  backdrop-filter: blur(0px);',
      '  -webkit-backdrop-filter: blur(0px);',
      '  transition:',
      '    opacity          ' + CFG.BLUR_MS + 'ms cubic-bezier(0.16, 1, 0.3, 1),',
      '    background       ' + CFG.BLUR_MS + 'ms cubic-bezier(0.16, 1, 0.3, 1),',
      '    backdrop-filter  ' + CFG.BLUR_MS + 'ms cubic-bezier(0.16, 1, 0.3, 1),',
      '    -webkit-backdrop-filter ' + CFG.BLUR_MS + 'ms cubic-bezier(0.16, 1, 0.3, 1);',
      '  visibility: hidden;',
      '}',

      '.sb-overlay.sb-overlay--visible {',
      '  visibility: visible;',
      '}',

      '.sb-overlay.sb-overlay--active {',
      '  pointer-events: auto;',
      '  opacity: 1;',
      '  background: rgba(0, 0, 0, ' + CFG.CONTENT_DIM + ');',
      '  backdrop-filter: blur(' + CFG.CONTENT_BLUR + 'px);',
      '  -webkit-backdrop-filter: blur(' + CFG.CONTENT_BLUR + 'px);',
      '}',

      /* ── Sidebar Panel ──────────────────────────────────────────── */
      '.sb-panel {',
      '  position: fixed;',
      '  top: 0;',
      '  right: 0;',
      '  bottom: 0;',
      '  width: ' + CFG.WIDTH_VW + 'vw;',
      '  min-width: 240px;',
      '  max-width: 380px;',
      '  z-index: 900;',
      '  display: flex;',
      '  flex-direction: column;',
      '  background: var(--bg, #080808);',
      '  transform: translateX(100%);',
      '  opacity: 0;',
      '  pointer-events: none;',
      '  will-change: transform, opacity;',
      '  overflow: hidden;',
      '  transition:',
      '    transform ' + CFG.OPEN_MS + 'ms cubic-bezier(0.16, 1, 0.3, 1),',
      '    opacity   ' + CFG.OPEN_MS + 'ms ease;',
      '}',

      /* Theme-tinted left edge — ultra-subtle, like a paint brush */
      '.sb-panel::before {',
      '  content: "";',
      '  position: absolute;',
      '  top: 0;',
      '  left: 0;',
      '  bottom: 0;',
      '  width: 16.667%;',          /* ~1/6th of sidebar */
      '  pointer-events: none;',
      '  z-index: 0;',
      '  background: linear-gradient(',
      '    to right,',
      '    rgba(var(--sb-accent-r, 200), var(--sb-accent-g, 169), var(--sb-accent-b, 110), 0.018) 0%,',
      '    rgba(var(--sb-accent-r, 200), var(--sb-accent-g, 169), var(--sb-accent-b, 110), 0.048) 55%,',
      '    rgba(var(--sb-accent-r, 200), var(--sb-accent-g, 169), var(--sb-accent-b, 110), 0.022) 80%,',
      '    transparent 100%',
      '  );',
      '  transition: background 0.5s ease;',
      '}',

      '.sb-panel.sb-panel--open {',
      '  transform: translateX(0);',
      '  opacity: 1;',
      '  pointer-events: auto;',
      '}',

      /* Closing state — faster, accelerating ease */
      '.sb-panel.sb-panel--closing {',
      '  transform: translateX(100%);',
      '  opacity: 0;',
      '  pointer-events: none;',
      '  transition:',
      '    transform ' + CFG.CLOSE_MS + 'ms cubic-bezier(0.76, 0, 0.24, 1),',
      '    opacity   ' + CFG.CLOSE_MS + 'ms ease;',
      '}',

      /* ── Sidebar inner container ────────────────────────────────── */
      '.sb-inner {',
      '  position: relative;',
      '  z-index: 1;',
      '  display: flex;',
      '  flex-direction: column;',
      '  height: 100%;',
      '}',

      /* ── Sidebar header ─────────────────────────────────────────── */
      '.sb-header {',
      '  padding: clamp(32px, 5.5vh, 52px) clamp(24px, 2.8vw, 40px) clamp(22px, 3vh, 34px);',
      '  border-bottom: 1px solid rgba(255, 255, 255, 0.04);',
      '  flex-shrink: 0;',
      '}',

      '.sb-header-label {',
      '  font-family: var(--ff-mono, "JetBrains Mono", monospace);',
      '  font-size: 0.50rem;',
      '  letter-spacing: 0.26em;',
      '  text-transform: uppercase;',
      '  color: var(--text3, rgba(240, 235, 224, 0.32));',
      '}',

      /* ── Sidebar nav list ───────────────────────────────────────── */
      '.sb-nav {',
      '  flex: 1;',
      '  padding: clamp(18px, 2.8vh, 32px) 0;',
      '  overflow-y: auto;',
      '  scrollbar-width: none;',
      '}',

      '.sb-nav::-webkit-scrollbar { display: none; }',

      /* Individual nav item */
      '.sb-nav-item {',
      '  display: flex;',
      '  align-items: center;',
      '  justify-content: space-between;',
      '  padding: clamp(11px, 1.6vh, 19px) clamp(24px, 2.8vw, 40px);',
      '  cursor: pointer;',
      '  transition: transform 0.24s cubic-bezier(0.16, 1, 0.3, 1);',
      '  user-select: none;',
      '  outline: none;',
      '}',

      '.sb-nav-item:hover {',
      '  transform: translateX(' + CFG.HOVER_SHIFT + 'px);',
      '}',

      '.sb-nav-item-left {',
      '  display: flex;',
      '  align-items: baseline;',
      '  gap: 12px;',
      '}',

      '.sb-nav-num {',
      '  font-family: var(--ff-mono, "JetBrains Mono", monospace);',
      '  font-size: 0.55rem;',
      '  color: rgba(var(--sb-accent-r, 200), var(--sb-accent-g, 169), var(--sb-accent-b, 110), 0.45);',
      '  transition: color 0.3s ease;',
      '}',

      '.sb-nav-label {',
      '  font-family: var(--ff-sans, "Inter", sans-serif);',
      '  font-size: clamp(0.9rem, 1.1vw, 1.1rem);',
      '  font-weight: 400;',
      '  letter-spacing: -0.01em;',
      '  color: var(--text2, rgba(240, 235, 224, 0.7));',
      '  transition: color 0.3s ease;',
      '}',

      '.sb-nav-item:hover .sb-nav-label {',
      '  color: var(--text, #f0ebe0);',
      '}',

      /* Active indicator line */
      '.sb-nav-indicator {',
      '  width: 1.5px;',
      '  height: 14px;',
      '  background: rgba(var(--sb-accent-r, 200), var(--sb-accent-g, 169), var(--sb-accent-b, 110), 1);',
      '  opacity: 0;',
      '  transform: scaleY(0);',
      '  transform-origin: center;',
      '  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;',
      '}',

      '.sb-nav-item--active .sb-nav-indicator {',
      '  opacity: 1;',
      '  transform: scaleY(1);',
      '}',

      '.sb-nav-item--active .sb-nav-label {',
      '  color: var(--text, #f0ebe0);',
      '  font-weight: 500;',
      '}',

      '.sb-nav-item--active .sb-nav-num {',
      '  color: rgba(var(--sb-accent-r, 200), var(--sb-accent-g, 169), var(--sb-accent-b, 110), 1);',
      '}',

      /* ── Visual rule ── */
      '.sb-rule {',
      '  height: 1px;',
      '  margin: 0 clamp(24px, 2.8vw, 40px);',
      '  background: rgba(255, 255, 255, 0.04);',
      '}',

      /* ── Footer ── */
      '.sb-footer {',
      '  padding: clamp(24px, 3.5vh, 42px) clamp(24px, 2.8vw, 40px) clamp(32px, 5.5vh, 52px);',
      '  flex-shrink: 0;',
      '}',

      '.sb-access-row {',
      '  display: flex;',
      '  align-items: center;',
      '  gap: 10px;',
      '}',

      '.sb-access-key {',
      '  font-family: var(--ff-mono, "JetBrains Mono", monospace);',
      '  font-size: 0.52rem;',
      '  text-transform: uppercase;',
      '  letter-spacing: 0.12em;',
      '  color: var(--text3, rgba(240, 235, 224, 0.32));',
      '}',

      '.sb-access-val {',
      '  font-family: var(--ff-mono, "JetBrains Mono", monospace);',
      '  font-size: 0.52rem;',
      '  text-transform: uppercase;',
      '  letter-spacing: 0.12em;',
      '  color: rgba(var(--sb-accent-r, 200), var(--sb-accent-g, 169), var(--sb-accent-b, 110), 0.85);',
      '  background: rgba(var(--sb-accent-r, 200), var(--sb-accent-g, 169), var(--sb-accent-b, 110), 0.08);',
      '  padding: 2px 6px;',
      '  border-radius: 2px;',
      '}'

    ].join('\n');
    doc.head.appendChild(s);
  }

  /* ══════════════════════════════════════════════════════════════════
     DOM — BUILD OVERLAY
  ══════════════════════════════════════════════════════════════════ */
  function buildOverlay() {
    if (doc.getElementById('sb-overlay')) {
      S.overlay = doc.getElementById('sb-overlay');
      return;
    }
    var el = doc.createElement('div');
    el.id        = 'sb-overlay';
    el.className = 'sb-overlay';
    el.setAttribute('aria-hidden', 'true');
    doc.body.appendChild(el);
    S.overlay = el;
  }

  /* ══════════════════════════════════════════════════════════════════
     DOM — BUILD SIDEBAR PANEL
  ══════════════════════════════════════════════════════════════════ */
  function buildPanel() {
    if (doc.getElementById('sb-panel')) {
      S.panel = doc.getElementById('sb-panel');
      return;
    }

    var panel = doc.createElement('aside');
    panel.id        = 'sb-panel';
    panel.className = 'sb-panel';
    panel.setAttribute('role',        'navigation');
    panel.setAttribute('aria-label',  'Site sections');
    panel.setAttribute('aria-hidden', 'true');

    var inner = doc.createElement('div');
    inner.className = 'sb-inner';

    /* Header */
    var header = doc.createElement('div');
    header.className = 'sb-header';
    var hLabel = doc.createElement('span');
    hLabel.className   = 'sb-header-label';
    hLabel.textContent = 'Sections';
    header.appendChild(hLabel);
    inner.appendChild(header);

    /* Nav list */
    var nav = doc.createElement('nav');
    nav.className = 'sb-nav';

    CFG.PAGES.forEach(function (page) {
      var item = doc.createElement('div');
      item.className          = 'sb-nav-item';
      item.dataset.sbPage     = page.id;
      item.setAttribute('role',       'button');
      item.setAttribute('tabindex',   '0');
      item.setAttribute('aria-label', 'Go to ' + page.label);

      /* Left side: number + label */
      var left = doc.createElement('div');
      left.className = 'sb-nav-item-left';

      var num = doc.createElement('span');
      num.className   = 'sb-nav-num';
      num.textContent = page.num;

      var label = doc.createElement('span');
      label.className   = 'sb-nav-label';
      label.textContent = page.label;

      left.appendChild(num);
      left.appendChild(label);

      /* Right side: active indicator */
      var indicator = doc.createElement('span');
      indicator.className = 'sb-nav-indicator';
      indicator.setAttribute('aria-hidden', 'true');

      item.appendChild(left);
      item.appendChild(indicator);

      /* Hover — play mechanical click */
      item.addEventListener('mouseenter', function () {
        if (isDesktop()) playMechanicalClick();
      });

      /* Click — trigger step-by-step navigation */
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

    /* Visual rule above footer */
    var rule = doc.createElement('div');
    rule.className = 'sb-rule';
    inner.appendChild(rule);

    /* Footer — ACCESS LEVEL */
    var footer = doc.createElement('footer');
    footer.className = 'sb-footer';

    var row = doc.createElement('div');
    row.className = 'sb-access-row';

    var key = doc.createElement('span');
    key.className   = 'sb-access-key';
    key.textContent = 'Access Level';

    var val = doc.createElement('span');
    val.className   = 'sb-access-val';
    val.textContent = 'Public';

    row.appendChild(key);
    row.appendChild(val);
    footer.appendChild(row);
    inner.appendChild(footer);

    panel.appendChild(inner);
    doc.body.appendChild(panel);
    S.panel = panel;
  }

  /* ══════════════════════════════════════════════════════════════════
     DOM — BUILD & INJECT DESKTOP HAMBURGER INTO TOP NAV
  ══════════════════════════════════════════════════════════════════ */
  function buildHamburger() {
    if (doc.getElementById('sb-hamburger')) {
      S.hamburger = doc.getElementById('sb-hamburger');
      S.line1     = S.hamburger.querySelector('.sb-line-1');
      S.line2     = S.hamburger.querySelector('.sb-line-2');
      S.line3     = S.hamburger.querySelector('.sb-line-3');
      return;
    }

    var btn = doc.createElement('button');
    btn.id        = 'sb-hamburger';
    btn.className = 'sb-hamburger';
    btn.setAttribute('type',          'button');
    btn.setAttribute('aria-label',    'Open site sections');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', 'sb-panel');

    /* Three elegant thin lines */
    var l1 = doc.createElement('span');
    l1.className = 'sb-line sb-line-1';
    var l2 = doc.createElement('span');
    l2.className = 'sb-line sb-line-2';
    var l3 = doc.createElement('span');
    l3.className = 'sb-line sb-line-3';

    btn.appendChild(l1);
    btn.appendChild(l2);
    btn.appendChild(l3);

    btn.addEventListener('click', onHamburgerClick);

    S.hamburger = btn;
    S.line1     = l1;
    S.line2     = l2;
    S.line3     = l3;

    /* Find the desktop nav container and inject hamburger + divider */
    var nav = findDesktopNav();
    if (nav) {
      var sep = doc.createElement('div');
      sep.className = 'sb-nav-sep';
      nav.appendChild(sep);
      nav.appendChild(btn);
    } else {
      /* Fallback — fixed position top-right */
      btn.style.cssText = [
        'position:fixed',
        'top:20px',
        'right:24px',
        'z-index:950'
      ].join(';');
      doc.body.appendChild(btn);
    }
  }

  /**
   * Attempt to locate the desktop nav element using common selectors.
   * Returns the first match, or null if nothing is found.
   */
  function findDesktopNav() {
    var selectors = [
      '.nav-desktop',
      '.desktop-nav',
      '#desktop-nav',
      '#nav-desktop',
      '.nav-bar',
      '.navbar',
      '[data-desktop-nav]',
      'header nav',
      '.header__nav',
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
     Prevents layout shift when body overflow is locked.
     Compensates for scrollbar width so content does not jump.
  ══════════════════════════════════════════════════════════════════ */
  function freezeScroll() {
    S.savedScrollY = window.scrollY;
    S.scrollbarW   = window.innerWidth - doc.documentElement.clientWidth;

    doc.documentElement.style.setProperty(
      '--sb-scrollbar-width', S.scrollbarW + 'px'
    );

    var body = doc.body;
    body.style.overflow     = 'hidden';
    body.style.position     = 'fixed';
    body.style.top          = '-' + S.savedScrollY + 'px';
    body.style.width        = '100%';
    body.style.paddingRight = S.scrollbarW + 'px';
  }

  function unfreezeScroll() {
    var body = doc.body;
    body.style.overflow     = '';
    body.style.position     = '';
    body.style.top          = '';
    body.style.width        = '';
    body.style.paddingRight = '';
    window.scrollTo(0, S.savedScrollY);
  }

  /* ══════════════════════════════════════════════════════════════════
     OPEN SIDEBAR
  ══════════════════════════════════════════════════════════════════ */
  function openSidebar() {
    if (!isDesktop() || S.open || S.animating) return;

    S.animating = true;
    S.open      = true;

    /* Re-sync theme tint in case theme changed */
    syncAccentRgb();

    /* Play mechanical click */
    playMechanicalClick();

    /* Freeze scroll without layout shift */
    freezeScroll();

    /* Show overlay — make visible then transition active state */
    S.overlay.classList.add('sb-overlay--visible');
    /* Force reflow so transition fires correctly */
    void S.overlay.offsetHeight;
    S.overlay.classList.add('sb-overlay--active');

    /* Slide panel in */
    S.panel.classList.remove('sb-panel--closing');
    void S.panel.offsetHeight;
    S.panel.classList.add('sb-panel--open');
    S.panel.setAttribute('aria-hidden', 'false');

    /* Morph hamburger lines → X */
    S.hamburger.classList.add('sb-is-open');
    S.hamburger.setAttribute('aria-expanded', 'true');
    S.hamburger.setAttribute('aria-label',    'Close site sections');

    /* Expose updated state to RoRo */
    exposePageState(S.activePage);

    setTimeout(function () {
      S.animating = false;
    }, CFG.OPEN_MS + 40);
  }

  /* ══════════════════════════════════════════════════════════════════
     CLOSE SIDEBAR
     Optional callback fires AFTER the closing animation completes.
  ══════════════════════════════════════════════════════════════════ */
  function closeSidebar(callback) {
    if (!S.open || S.animating) return;

    S.animating = true;
    S.open      = false;

    /* Revert hamburger X → three lines */
    S.hamburger.classList.remove('sb-is-open');
    S.hamburger.setAttribute('aria-expanded', 'false');
    S.hamburger.setAttribute('aria-label',    'Open site sections');

    /* Slide panel out */
    S.panel.classList.remove('sb-panel--open');
    S.panel.classList.add('sb-panel--closing');
    S.panel.setAttribute('aria-hidden', 'true');

    /* Fade + unblur overlay */
    S.overlay.classList.remove('sb-overlay--active');

    var totalMs = Math.max(CFG.CLOSE_MS, CFG.BLUR_MS) + 40;

    setTimeout(function () {
      S.panel.classList.remove('sb-panel--closing');
      S.overlay.classList.remove('sb-overlay--visible');
      unfreezeScroll();
      S.animating = false;

      /* Expose updated state to RoRo */
      exposePageState(S.activePage);

      if (typeof callback === 'function') callback();
    }, totalMs);
  }

  /* ══════════════════════════════════════════════════════════════════
     HAMBURGER CLICK
  ══════════════════════════════════════════════════════════════════ */
  function onHamburgerClick() {
    if (!isDesktop()) return;
    if (S.open) {
      closeSidebar();
    } else {
      openSidebar();
    }
  }

  /* ══════════════════════════════════════════════════════════════════
     STEP-BY-STEP NAVIGATION SEQUENCE
     Step 1 — sidebar slides closed
     Step 2 — blur disappears  (part of close animation)
     Step 3 — existing page transition fires
     Animations never overlap.
  ══════════════════════════════════════════════════════════════════ */
  function handleNavigation(pageId) {
    if (S.animating) return;
    closeSidebar(function () {
      firePageTransition(pageId);
    });
  }

  /**
   * Fire the existing page navigation system.
   * Tries multiple common patterns in portfolio codebases.
   */
  function firePageTransition(pageId) {
    /* Pattern 1 — global navigation functions */
    if (typeof global.navigateTo   === 'function') { global.navigateTo(pageId);   return; }
    if (typeof global.showPage     === 'function') { global.showPage(pageId);     return; }
    if (typeof global.loadPage     === 'function') { global.loadPage(pageId);     return; }
    if (typeof global.switchPage   === 'function') { global.switchPage(pageId);   return; }
    if (typeof global.goToPage     === 'function') { global.goToPage(pageId);     return; }

    /* Pattern 2 — click existing nav link (avoid re-clicking sidebar item) */
    var link =
      doc.querySelector('[data-page="' + pageId + '"]:not(.sb-nav-item)') ||
      doc.querySelector('[data-target="' + pageId + '"]')                  ||
      doc.querySelector('[href="#' + pageId + '"]')                        ||
      doc.querySelector('#nav-' + pageId);

    if (link) { link.click(); return; }

    /* Pattern 3 — custom event */
    doc.dispatchEvent(new CustomEvent('sb:navigate', {
      bubbles: true,
      detail:  { page: pageId }
    }));

    /* Pattern 4 — hash fallback */
    global.location.hash = pageId;
  }

  /* ══════════════════════════════════════════════════════════════════
     ACTIVE PAGE INDICATOR
     Marks the sidebar item that corresponds to the current page.
  ══════════════════════════════════════════════════════════════════ */
  function setActivePage(pageId) {
    if (!pageId || S.activePage === pageId) return;
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

  /**
   * Scans the document for existing active page markers that the site
   * manages page state in the codebase.
   */
  function detectActivePage() {
    /* Data attribute on .page elements */
    var active =
      doc.querySelector('.page.active[data-page]')          ||
      doc.querySelector('[data-page][data-active="true"]')   ||
      doc.querySelector('.page-section.is-active[data-page]')||
      doc.querySelector('[data-current-page]');

    if (active) {
      setActivePage(
        active.dataset.page || active.dataset.currentPage
      );
      return;
    }

    /* Body attribute */
    if (doc.body.dataset.page || doc.body.dataset.currentPage) {
      setActivePage(doc.body.dataset.page || doc.body.dataset.currentPage);
      return;
    }

    /* Hash */
    var hash = global.location.hash.replace('#', '');
    if (hash) {
      setActivePage(hash);
    }
  }

  /**
   * Watch the DOM for page changes using MutationObserver,
   * hash changes, and custom events dispatched by the page system.
   */
  function watchPageChanges() {
    /* 
       CRITICAL FIX: Removed aggressive subtree observer that caused hangs.
       We now only watch the body element itself for direct attribute changes.
    */
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function(m) {
        if (m.attributeName === 'class' || m.attributeName === 'data-page') {
           detectActivePage();
        }
      });
    });
    
    observer.observe(doc.body, {
      attributes    : true,
      subtree       : false, // DO NOT USE SUBTREE - CAUSES HANGS
      attributeFilter: ['class', 'data-page']
    });

    /* Custom events from the existing navigation system */
    doc.addEventListener('pageChanged',  function (e) {
      if (e.detail && e.detail.page) setActivePage(e.detail.page);
    });
    doc.addEventListener('navigated', function (e) {
      if (e.detail && e.detail.page) setActivePage(e.detail.page);
    });
    doc.addEventListener('pageSwitch', function (e) {
      if (e.detail && e.detail.page) setActivePage(e.detail.page);
    });

    /* Allow external code to set active page directly */
    doc.addEventListener('sb:setPage', function (e) {
      if (e.detail && e.detail.page) setActivePage(e.detail.page);
    });

    /* Hash changes */
    global.addEventListener('hashchange', function () {
      var hash = global.location.hash.replace('#', '');
      if (hash) setActivePage(hash);
    });
  }

  /* ══════════════════════════════════════════════════════════════════
     RORO PAGE STATE EXPOSURE
     Makes the current page context available so RoRo AI can respond
     contextually. Architecture is extensible for future context needs.
  ══════════════════════════════════════════════════════════════════ */
  function exposePageState(pageId) {
    if (!pageId) return;
    
    /* Expose via body data attribute */
    // Using setAttribute to avoid triggering dataset observers unnecessarily
    doc.body.setAttribute('data-current-page', pageId);

    /* Update public API object */
    if (global.SidebarController) {
      global.SidebarController.currentPage  = pageId;
      global.SidebarController.sidebarOpen  = S.open;
      global.SidebarController.activePage   = pageId;
    }

    /* Dispatch event for any listener — RoRo, analytics, debug, etc. */
    doc.dispatchEvent(new CustomEvent('sb:pageActive', {
      bubbles: true,
      detail: {
        page        : pageId,
        sidebarOpen : S.open,
        timestamp   : Date.now()
      }
    }));
  }

  /* ══════════════════════════════════════════════════════════════════
     EVENT BINDINGS
  ══════════════════════════════════════════════════════════════════ */

  /** Close sidebar when clicking the dim overlay */
  function bindOverlay() {
    S.overlay.addEventListener('click', function () {
      if (S.open && !S.animating) closeSidebar();
    });
  }

  /** ESC key closes the sidebar */
  function bindKeyboard() {
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && S.open && isDesktop()) {
        closeSidebar();
      }
    });
  }

  /**
   * If the window is resized down to mobile while the sidebar is open,
   * forcefully reset everything without animation to avoid broken state.
   */
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
          S.open      = false;
          S.animating = false;
        }
        /* Re-sync theme tint on resize */
        syncAccentRgb();
      }, 120);
    });
  }

  /**
   * If the site has a theme-switcher, re-sync the accent RGB values
   * whenever the theme changes so the sidebar tint updates correctly.
   */
  function bindThemeChange() {
    var themeObserver = new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        if (m.attributeName === 'data-theme' || m.attributeName === 'class') {
          syncAccentRgb();
        }
      });
    });
    themeObserver.observe(doc.documentElement, {
      attributes    : true,
      attributeFilter: ['data-theme', 'class']
    });

    /* Listen for custom theme-change events */
    doc.addEventListener('themeChanged',  syncAccentRgb);
    doc.addEventListener('theme:changed', syncAccentRgb);
    doc.addEventListener('sb:themeSync',  syncAccentRgb);
  }

  /* ══════════════════════════════════════════════════════════════════
     PUBLIC API
     Exposed on window.SidebarController so RoRo and other modules
     can read and interact with the sidebar state.
  ══════════════════════════════════════════════════════════════════ */
  function buildPublicAPI() {
    global.SidebarController = {

      /* ── State (read-only references) ── */
      currentPage : S.activePage,
      activePage  : S.activePage,
      sidebarOpen : S.open,

      /* ── Actions ── */
      open  : openSidebar,
      close : closeSidebar,
      toggle: onHamburgerClick,

      /* ── Queries ── */
      isOpen   : function () { return S.open;      },
      isDesktop: function () { return isDesktop();  },

      /**
       * setActivePage(pageId)
       * Called by the page system whenever the active page changes.
       * RoRo can also call this to force a specific active state.
       * @param {string} pageId
       */
      setActivePage: function (pageId) {
        setActivePage(pageId);
      },

      /**
       * notifyPageChange(pageId)
       * Alias for setActivePage — more descriptive for external callers.
       * @param {string} pageId
       */
      notifyPageChange: function (pageId) {
        setActivePage(pageId);
      },

      /**
       * getPageContext()
       * Returns a snapshot of the current page context for RoRo.
       * @returns {Object}
       */
      getPageContext: function () {
        return {
          currentPage : S.activePage,
          sidebarOpen : S.open,
          timestamp   : Date.now(),
          pages       : CFG.PAGES.map(function (p) { return p.id; })
        };
      }
    };
  }

  /* ══════════════════════════════════════════════════════════════════
     INIT
  ══════════════════════════════════════════════════════════════════ */
  function init() {
    if (global.SidebarController) return;

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
     BOOT — run after DOM is ready
  ══════════════════════════════════════════════════════════════════ */
  if (doc.readyState === 'loading') {
    doc.addEventListener('DOMContentLoaded', init);
  } else {
    /* DOMContentLoaded already fired */
    init();
  }

})(window, document);
