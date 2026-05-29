/* ═══════════════════════════════════════════════════════════
   js/manager-roro.js  v2.0
   RoRo — Website Intelligence System for MSM
   ─────────────────────────────────────────────────────────
   Phantom AI · Vanilla JS · Zero external dependencies
   ─────────────────────────────────────────────────────────
   § 0  — Injected CSS (existing design preserved + new)
   § 1  — Expanded Knowledge Base
   § 2  — Response Variation Pools
   § 3  — Fuzzy / Semantic Utilities
   § 4  — Intent Engine (expanded)
   § 5  — Memory Engine
   § 6  — Tone Engine
   § 7  — Recruiter Profiler
   § 8  — Context Manager
   § 9  — Prompt Library
   § 10 — RoRoManager Class
   § 11 — Export & Auto-Init
═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ═══════════════════════════════════════════════════════
     § 0 — INJECTED CSS
     All existing styles preserved exactly.
     New additions appended at the end of this string:
       · Prompt ticker (news-banner strip above input)
       · In-chat action buttons (for links / CV / social)
       · Idle state overrides (handled via JS, not new classes)
  ═══════════════════════════════════════════════════════ */

  const RORO_CSS = `

    /* ── Nav trigger button ─────────────────────────── */
    #roro-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 1px solid var(--border2, rgba(255,255,255,0.12));
      background: var(--bg3, rgba(255,255,255,0.04));
      cursor: pointer;
      position: relative;
      transition: border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
      flex-shrink: 0;
      outline: none;
    }
    #roro-btn:hover {
      border-color: var(--accent);
      box-shadow: 0 0 10px var(--accent-glow, rgba(200,169,110,0.25));
      background: var(--bg4, rgba(255,255,255,0.08));
    }
    #roro-btn.roro-btn--active {
      border-color: var(--accent);
      box-shadow: 0 0 10px var(--accent-glow, rgba(200,169,110,0.25));
    }
    #roro-btn svg { width: 15px; height: 15px; display: block; }

    .roro-badge {
      position: absolute;
      top: -3px; right: -3px;
      width: 8px; height: 8px;
      border-radius: 50%;
      background: var(--accent);
      border: 2px solid var(--bg);
      display: none;
      pointer-events: none;
    }
    #roro-btn.roro-has-unread .roro-badge { display: block; }

    /* ── Panel base ─────────────────────────────────── */
    .roro-panel {
      position: fixed;
      bottom: 28px; right: 28px;
      width: 340px; height: 500px;
      background: var(--bg2);
      border: 1px solid var(--border);
      border-radius: 14px;
      display: flex; flex-direction: column;
      overflow: hidden;
      z-index: 9900;
      box-shadow: 0 24px 64px rgba(0,0,0,0.45), 0 0 0 1px var(--border2);
      opacity: 0; pointer-events: none;
      transform: translateY(18px) scale(0.96);
      transition:
        transform  0.38s cubic-bezier(0.16, 1, 0.3, 1),
        opacity    0.3s  ease,
        width      0.32s cubic-bezier(0.16, 1, 0.3, 1),
        height     0.32s cubic-bezier(0.16, 1, 0.3, 1),
        bottom     0.32s cubic-bezier(0.16, 1, 0.3, 1),
        right      0.32s cubic-bezier(0.16, 1, 0.3, 1),
        border-radius 0.32s ease;
    }
    .roro-panel.roro-panel--open {
      opacity: 1; pointer-events: all;
      transform: translateY(0) scale(1);
    }
    .roro-panel.roro-panel--minimized {
      height: 48px; width: 188px;
      border-radius: 24px; cursor: pointer;
      bottom: 28px; right: 28px;
    }
    .roro-panel.roro-panel--fullscreen {
      width: 100vw !important; height: 100vh !important;
      bottom: 0 !important; right: 0 !important;
      border-radius: 0 !important;
    }

    /* ── Header ─────────────────────────────────────── */
    .roro-header {
      display: flex; align-items: center; gap: 10px;
      padding: 12px 14px;
      border-bottom: 1px solid var(--border);
      background: var(--bg2);
      flex-shrink: 0; user-select: none; position: relative;
    }
    .roro-panel--minimized .roro-header {
      border-bottom: none; justify-content: center;
      padding: 0 16px; height: 100%;
    }

    .roro-avatar {
      width: 36px; height: 36px; border-radius: 50%;
      background: var(--bg3); border: 1px solid var(--border2);
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; position: relative;
    }
    .roro-avatar-pulse {
      position: absolute; inset: -5px; border-radius: 50%;
      border: 1px solid var(--accent); opacity: 0;
      animation: roroPulse 3.5s ease-in-out infinite;
      pointer-events: none;
    }
    @keyframes roroPulse {
      0%, 100% { opacity: 0;    transform: scale(1);    }
      50%       { opacity: 0.28; transform: scale(1.12); }
    }
    .roro-avatar svg { width: 18px; height: 18px; }

    .roro-identity { flex: 1; min-width: 0; }
    .roro-name {
      font-family: var(--ff-display); font-size: 0.92rem;
      font-weight: 400; color: var(--text);
      line-height: 1; margin-bottom: 3px;
    }
    .roro-subtitle {
      font-family: var(--ff-mono); font-size: 0.58rem;
      color: var(--accent); letter-spacing: 0.1em;
      text-transform: uppercase; margin-bottom: 2px;
    }
    .roro-status {
      display: flex; align-items: center; gap: 4px;
      font-family: var(--ff-mono); font-size: 0.55rem;
      color: var(--text3); letter-spacing: 0.04em;
    }
    .roro-status-dot {
      width: 5px; height: 5px; border-radius: 50%;
      background: #4ade80; flex-shrink: 0;
      animation: roroBlink 2.2s ease-in-out infinite;
    }
    @keyframes roroBlink {
      0%, 100% { opacity: 1;    }
      50%       { opacity: 0.35; }
    }

    .roro-controls { display: flex; gap: 4px; align-items: center; flex-shrink: 0; }
    .roro-ctrl {
      width: 24px; height: 24px; border-radius: 50%;
      border: 1px solid var(--border2); background: var(--bg3);
      color: var(--text3); cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      font-size: 0.7rem;
      transition: border-color 0.2s, color 0.2s, background 0.2s;
      outline: none; line-height: 1; padding: 0;
    }
    .roro-ctrl:hover { border-color: var(--accent); color: var(--accent); background: var(--bg4); }

    .roro-minimized-label {
      display: none; align-items: center; gap: 8px;
      font-family: var(--ff-mono); font-size: 0.72rem;
      color: var(--text2); letter-spacing: 0.1em;
    }
    .roro-minimized-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: #4ade80; flex-shrink: 0;
      animation: roroBlink 2.2s ease-in-out infinite;
    }
    .roro-panel--minimized .roro-avatar,
    .roro-panel--minimized .roro-identity,
    .roro-panel--minimized .roro-controls { display: none; }
    .roro-panel--minimized .roro-minimized-label { display: flex; }

    /* ── Encryption notice bar ──────────────────────── */
    .roro-enc-bar {
      font-family: var(--ff-mono); font-size: 0.53rem;
      color: var(--text3); letter-spacing: 0.06em;
      padding: 4px 14px; border-bottom: 1px solid var(--border);
      text-align: center; flex-shrink: 0; background: var(--bg2);
    }
    .roro-panel--minimized .roro-enc-bar,
    .roro-panel--minimized .roro-chat,
    .roro-panel--minimized .roro-input-row,
    .roro-panel--minimized .roro-prompt-ticker { display: none; }

    /* ── Chat area ──────────────────────────────────── */
    .roro-chat {
      flex: 1; overflow-y: auto; overflow-x: hidden;
      padding: 14px 14px 6px;
      display: flex; flex-direction: column; gap: 8px;
      scrollbar-width: thin; scrollbar-color: var(--border2) transparent;
    }
    .roro-chat::-webkit-scrollbar       { width: 3px; }
    .roro-chat::-webkit-scrollbar-track { background: transparent; }
    .roro-chat::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 2px; }

    .roro-separator {
      text-align: center; font-family: var(--ff-mono);
      font-size: 0.52rem; color: var(--text3);
      letter-spacing: 0.1em; text-transform: uppercase;
      opacity: 0.55; padding: 2px 0 6px; flex-shrink: 0;
    }

    /* ── Message rows ───────────────────────────────── */
    .roro-msg {
      display: flex; flex-direction: column;
      max-width: 84%; gap: 3px;
      animation: roroMsgIn 0.28s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes roroMsgIn {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0);    }
    }
    .roro-msg--bot  { align-self: flex-start; align-items: flex-start; }
    .roro-msg--user { align-self: flex-end;   align-items: flex-end;   }

    .roro-bubble {
      padding: 8px 12px; border-radius: 16px;
      font-size: 0.82rem; line-height: 1.65;
      font-family: var(--ff-body); word-break: break-word;
    }
    .roro-msg--bot .roro-bubble {
      background: var(--bg3); border: 1px solid var(--border);
      color: var(--text); border-bottom-left-radius: 4px;
    }
    .roro-msg--user .roro-bubble {
      background: var(--accent); color: var(--bg);
      border-bottom-right-radius: 4px;
    }
    .roro-timestamp {
      font-family: var(--ff-mono); font-size: 0.52rem;
      color: var(--text3); letter-spacing: 0.04em; padding: 0 4px;
    }

    .roro-msg--typing .roro-bubble {
      display: flex; gap: 5px; align-items: center; padding: 10px 14px;
    }
    .roro-tdot {
      width: 5px; height: 5px; border-radius: 50%;
      background: var(--text3); animation: roroTypeDot 1.3s ease-in-out infinite;
    }
    .roro-tdot:nth-child(2) { animation-delay: 0.18s; }
    .roro-tdot:nth-child(3) { animation-delay: 0.36s; }
    @keyframes roroTypeDot {
      0%, 60%, 100% { transform: translateY(0);   opacity: 0.38; }
      30%            { transform: translateY(-5px); opacity: 1;    }
    }

    /* ── Quick option chips ─────────────────────────── */
    .roro-options {
      display: flex; flex-wrap: wrap; gap: 6px;
      padding: 0 14px 10px;
      animation: roroMsgIn 0.28s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .roro-opt {
      font-family: var(--ff-mono); font-size: 0.62rem;
      letter-spacing: 0.06em; color: var(--text2);
      border: 1px solid var(--border2); background: var(--bg3);
      padding: 5px 11px; border-radius: 20px; cursor: pointer;
      transition: border-color 0.2s, color 0.2s, background 0.2s;
      outline: none; white-space: nowrap; line-height: 1;
    }
    .roro-opt:hover { border-color: var(--accent); color: var(--accent); background: var(--bg4); }

    /* ── Input row ──────────────────────────────────── */
    .roro-input-row {
      display: flex; gap: 8px; align-items: center;
      padding: 10px 12px 13px;
      border-top: 1px solid var(--border);
      flex-shrink: 0; background: var(--bg2);
    }
    .roro-input {
      flex: 1; background: var(--bg3);
      border: 1px solid var(--border2); border-radius: 20px;
      color: var(--text); font-family: var(--ff-body);
      font-size: 0.82rem; padding: 8px 14px;
      outline: none; transition: border-color 0.25s;
      resize: none; line-height: 1.4;
    }
    .roro-input::placeholder { color: var(--text3); }
    .roro-input:focus         { border-color: var(--accent); }

    .roro-send-btn {
      width: 34px; height: 34px; border-radius: 50%;
      border: none; background: var(--accent); color: var(--bg);
      cursor: pointer; display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; transition: opacity 0.2s, transform 0.15s; outline: none;
    }
    .roro-send-btn:hover  { opacity: 0.82; }
    .roro-send-btn:active { transform: scale(0.88); }
    .roro-send-btn svg    { width: 14px; height: 14px; display: block; }

    /* ── Fullscreen layout adjustments ─────────────── */
    .roro-panel--fullscreen .roro-chat,
    .roro-panel--fullscreen .roro-options,
    .roro-panel--fullscreen .roro-input-row {
      max-width: 680px; width: 100%;
      margin-left: auto; margin-right: auto;
    }

    /* ── Mobile ─────────────────────────────────────── */
    @media (max-width: 480px) {
      .roro-panel { width: calc(100vw - 20px); right: 10px; bottom: 10px; }
      .roro-panel.roro-panel--fullscreen {
        width: 100vw !important; right: 0 !important; bottom: 0 !important;
      }
    }

    /* ══════════════════════════════════════════════════
       NEW § 0a — PROMPT TICKER
       Scrolls right→left like a news banner.
       Single line. Compact. Hover pauses. Click sends.
    ══════════════════════════════════════════════════ */
    .roro-prompt-ticker {
      height: 26px; overflow: hidden;
      border-top: 1px solid var(--border);
      background: var(--bg2); flex-shrink: 0;
      position: relative; user-select: none; cursor: pointer;
    }
    .roro-prompt-track {
      display: inline-flex; align-items: center;
      white-space: nowrap; height: 26px;
      animation: roroTickerScroll 60s linear infinite;
      will-change: transform;
    }
    .roro-prompt-ticker:hover .roro-prompt-track {
      animation-play-state: paused;
    }
    @keyframes roroTickerScroll {
      from { transform: translateX(0);   }
      to   { transform: translateX(-50%); }
    }
    .roro-prompt-item {
      display: inline-flex; align-items: center;
      height: 26px; padding: 0 12px;
      font-family: var(--ff-mono); font-size: 0.56rem;
      color: var(--text3); letter-spacing: 0.04em;
      white-space: nowrap; flex-shrink: 0;
      transition: color 0.18s;
    }
    .roro-prompt-item:hover { color: var(--accent); }
    .roro-prompt-sep {
      display: inline-flex; align-items: center;
      height: 26px; color: var(--border2);
      font-size: 0.44rem; flex-shrink: 0;
      padding: 0 2px; pointer-events: none;
    }
    .roro-ticker-fade-l,
    .roro-ticker-fade-r {
      position: absolute; top: 0; bottom: 0; width: 20px;
      pointer-events: none; z-index: 2;
    }
    .roro-ticker-fade-l { left:  0; background: linear-gradient(to right, var(--bg2) 30%, transparent); }
    .roro-ticker-fade-r { right: 0; background: linear-gradient(to left,  var(--bg2) 30%, transparent); }

    /* ══════════════════════════════════════════════════
       NEW § 0b — IN-CHAT ACTION BUTTONS
       For CV download, LinkedIn, Instagram, Email, etc.
    ══════════════════════════════════════════════════ */
    .roro-action-btns {
      display: flex; flex-wrap: wrap; gap: 5px;
      padding: 2px 0 4px 2px; max-width: 84%;
      align-self: flex-start;
      animation: roroMsgIn 0.28s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .roro-action-btn {
      display: inline-flex; align-items: center; gap: 5px;
      font-family: var(--ff-mono); font-size: 0.59rem;
      letter-spacing: 0.05em; color: var(--text2);
      border: 1px solid var(--border2); background: var(--bg3);
      padding: 5px 11px; border-radius: 4px; cursor: pointer;
      text-decoration: none; white-space: nowrap; line-height: 1;
      transition: border-color 0.2s, color 0.2s, background 0.2s;
      outline: none;
    }
    .roro-action-btn:hover {
      border-color: var(--accent); color: var(--accent); background: var(--bg4);
    }
    .roro-action-btn--primary {
      background: var(--accent); color: var(--bg); border-color: var(--accent);
    }
    .roro-action-btn--primary:hover { opacity: 0.84; color: var(--bg); }
  `;

  /* ═══════════════════════════════════════════════════════
     § 1 — EXPANDED KNOWLEDGE BASE
     Every piece of content RoRo can reference or describe.
     Update this section as the site grows.
  ═══════════════════════════════════════════════════════ */

  const KB = {

    owner: {
      name:        'Manomay Shailendra Misra',
      shortName:   'Manomay',
      born:        'August 29, 2008',
      birthplace:  'Andheri, Maharashtra, India',
      city:        'Mumbai, now Bengaluru',
      tagline:     'Born 2008 · Mumbai · Making something of it all',
      philosophy:  'Building legacy without losing softness.',
      description: 'A seventeen-year-old creator, thinker, and builder from Mumbai. Nomadic by upbringing — eight cities, one consistent ambition. He designs with intention, builds from scratch, and believes the process matters as much as the output.',
      traits:      ['Ambitious', 'Detail-oriented', 'Nomadic by upbringing', 'Calm under pressure', 'Deeply curious', 'Storyteller at heart'],
      inspirations:['Dieter Rams', 'Paul Graham', 'Japanese minimalism', 'The craft of writing', 'Architecture and space'],
      workStyle:   'Everything from scratch. No templates, no shortcuts. Each project is deliberate and considered.',
      goals:       'Build systems and stories that outlast trends. Contribute to something that matters before 25.',
      contact:     'manomaysmisra2908@gmail.com',
    },

    pages: {
      home: {
        label:    'Home',
        summary:  "The entry point. Manomay's name, a tagline, and a curated navigation grid. Clean, minimal, intentional — the whole site in one scroll.",
        features: ['Animated hero', 'Theme switcher (4 themes)', 'Music player', 'Navigation grid', 'Easter egg (7 name clicks → vinyl record)']
      },
      about: {
        label:    'Identity',
        summary:  "Manomay's identity in written form — where he came from, what shaped him, what drives him. A private layer exists behind a password.",
        features: ['Personal biography', 'Private extended section', 'Portrait photo', 'Philosophy statement']
      },
      photos: {
        label:    'Photos',
        summary:  "Curated visual moments. Public albums open to all, private albums behind a password. Visual diary, not a social feed.",
        features: ['Public photo albums', 'Private albums (password protected)', 'Full-screen viewer']
      },
      resume: {
        label:    'CV / Résumé',
        summary:  "A clean formal résumé — experience, education, skills — in the same minimalist aesthetic as the site. Downloadable PDF at the bottom.",
        features: ['Work experience', 'Education history', 'Skills', 'Downloadable PDF']
      },
      projects: {
        label:    'Projects',
        summary:  "Where the work lives — a flat list of projects each with a status label. Click any project for a full description popup. Nationals is always last.",
        features: ['Flat project list', 'Status labels (Completed / Ongoing / Abandoned)', 'Click-to-popup descriptions']
      },
      profiles: {
        label:    'Profiles',
        summary:  "All of Manomay's public internet presence — LinkedIn, Instagram, and a résumé link. No clutter.",
        features: ['LinkedIn', 'Instagram', 'Résumé link']
      },
      journey: {
        label:    'Journey',
        summary:  "A year-by-year timeline from 2008 to the present. Click any year and read that chapter. Spans eight cities across India.",
        features: ['Interactive timeline (2008–2026)', 'Chapter detail per year', 'Private entries']
      },
      birthday: {
        label:    'Clock',
        summary:  "A live countdown to August 29th running to the millisecond. Birth details locked behind password. Something changes on the day itself.",
        features: ['Millisecond countdown', 'Birthday: 29 August 2008', 'Birth details (password protected)', 'Special birthday state']
      },
      thoughts: {
        label:    'Thoughts',
        summary:  "Six categories of beliefs: Politics, God & Faith, Science, Life & Philosophy, Society & Culture, Technology. Multiple posts each. Unfiltered.",
        features: ['Politics', 'God & Faith', 'Science', 'Life & Philosophy', 'Society & Culture', 'Technology']
      },
      contact: {
        label:    'Contact',
        summary:  "A direct message form. Manomay reads every submission. Explaining your reason for the password significantly improves your chances.",
        features: ['Contact form', 'EmailJS integration', 'Password request channel']
      },
      lists: {
        label:    'Lists',
        summary:  "Curated taste across Web Series, Books, Places, and Movies. Full list requires the site password.",
        features: ['Web Series', 'Books', 'Places', 'Movies', 'Password protected full list']
      },
      skills: {
        label:    'Traits',
        summary:  "Animated skill bars, a scrolling marquee of keywords, and a hobbies section. An honest map of capability and curiosity.",
        features: ['Animated skill bars', 'Hobbies & interests', 'Keyword marquee']
      },
      games: {
        label:    'Games',
        summary:  "Five built-in games: Snake, Memory Match, 2048, Reaction Time, Word Scramble. Private section with family games behind a password.",
        features: ['Snake', 'Memory Match', '2048', 'Reaction Time', 'Word Scramble', 'Private family games (password protected)']
      },
      social: {
        label:    'Social Proof',
        summary:  "Brands and organisations Manomay has worked with, plus written testimonials from collaborators.",
        features: ['Brand logos marquee', 'Testimonials']
      }
    },

    projects: {
      nationals: {
        title:       'Nationals',
        description: 'A competition-level initiative. Always the final entry in the projects list — the benchmark everything else is measured against.',
        status:      'Completed · 2024',
        type:        'Competition',
        keywords:    ['nationals', 'competition', 'achievement', 'win']
      },
      ecommerce: {
        title:       'E-commerce Prototype',
        description: 'A full e-commerce prototype built from scratch — product listings, cart, and checkout flow. Handcrafted, no frameworks.',
        status:      'Completed · 2024',
        type:        'Web / Development',
        keywords:    ['ecommerce', 'shop', 'store', 'web', 'development', 'prototype']
      },
      iskcon: {
        title:       'ISKCON Summer Camp',
        description: 'Creative Educator and Media Lead for a 40+ student summer programme at ISKCON Centre. Ran workshops in origami and paper engineering, produced vlogs and photography, coordinated temple excursions.',
        status:      'Completed · 2024',
        type:        'Education / Media',
        keywords:    ['iskcon', 'iskon', 'isckon', 'camp', 'summer', 'educator', 'media', 'photography', 'krishna', 'temple', 'workshop', 'children', 'education']
      },
      website: {
        title:       'MSM Personal Website',
        description: 'This website. Pure HTML, CSS, and JavaScript. Zero frameworks, zero templates. Cinematic intro, custom CMS, sidebar system, 5 mini-games, photo albums, thoughts blog, and a full AI assistant layer.',
        status:      'Ongoing · 2025–Present',
        type:        'Web / Design',
        keywords:    ['website', 'portfolio', 'personal', 'site', 'this', 'here']
      },
      writing: {
        title:       'Until The Bullet Woke Me',
        description: 'A creative writing project. A story, composed with deliberate craft. The title carries the weight of the content.',
        status:      'Completed · 2024',
        type:        'Creative Writing',
        keywords:    ['writing', 'story', 'bullet', 'creative', 'fiction', 'narrative']
      }
    },

    years: {
      2008: "The Beginning — Born in Maharashtra at the intersection of India's old soul and its financial ambition. The nomadic blueprint was set from day one.",
      2009: "Year One — A period of deep, silent growth. Developing early observation skills, absorbing structure and discipline from the household.",
      2010: "Growing Up — First major move to Jaipur. First school: Star Kids Pre-school. First real social ecosystem outside the family.",
      2011: "Discovery — Double promotion from LKG to UKG in six months. Teachers recognised an exceptional IQ and intrinsic motivation beyond his years.",
      2012: "Early Years — 1st Rank for academic and behavioral excellence. His father was honoured with the school's Best Father Award that same year.",
      2013: "Shifting — Details being written.",
      2014: "New Ground — Details being written.",
      2015: "The Turn — Details being written.",
      2016: "Momentum — Details being written.",
      2017: "Building — Details being written.",
      2018: "Defining — Details being written.",
      2019: "Expanding — Details being written.",
      2020: "The Pause — The year the world stopped. Something changed internally too.",
      2021: "Rebuilding — Details being written.",
      2022: "Acceleration — Details being written.",
      2023: "Clarity — Details being written.",
      2024: "Intention — ISKCON Camp. Nationals. E-commerce. The year of execution.",
      2025: "Transformation — Details being written.",
      2026: "Present — This website exists. That already means something."
    },

    design: {
      summary:     "Built entirely from scratch — no templates, no frameworks. Pure HTML, CSS, and JavaScript. Four themes: Noir, Ivory, Slate, Forest. Typographic, geometric, deliberately minimal. Every animation hand-coded.",
      philosophy:  "The site should feel like a conversation, not a brochure. Every element is intentional. Nothing is decorative without purpose.",
      stack:       ['Vanilla HTML', 'Vanilla CSS', 'Vanilla JavaScript', 'EmailJS (contact form)', 'Web Audio API (sound)', 'localStorage (memory)'],
      themes: {
        dark:   { id: 'dark',   label: 'Noir',   desc: 'Deep black. The default. Serious, cinematic.' },
        light:  { id: 'light',  label: 'Ivory',  desc: 'Warm white. Premium, editorial, minimal.' },
        slate:  { id: 'slate',  label: 'Slate',  desc: 'Cool blue-grey. Clean, technical, precise.' },
        forest: { id: 'forest', label: 'Forest', desc: 'Muted green. Calm, organic, grounded.' }
      }
    },

    password: {
      hint: "Multiple sections carry a password lock — photo albums, journal chapters, the full curated lists, and more. It isn't publicly distributed. Best route: the Contact page — explain why you want access, and Manomay decides.",
      lockedSections: ['Private photo albums', 'Private journey entries', 'Full curated lists', 'Birth details', 'Private games', 'Extended identity section']
    },

    features: {
      music:    "Built-in music player with two tracks — background ambience loops by default. The easter-egg song unlocks after clicking Manomay's name on the homepage exactly seven times. A vinyl record then appears.",
      themes:   "Four visual themes: Noir (dark), Ivory (light), Slate (cool grey), Forest (muted green). Four dots top-right switch between them.",
      roro:     "That's me — RoRo. The site's intelligence layer. I know every section, can navigate for you, switch themes, control music, and answer anything about this site.",
      cursor:   "Custom animated cursor — dot and ring. Hover states change the cursor. Disabled on touch devices.",
      sound:    "Mechanical click/tick sounds on interactions — toggle the push-button icon in the nav bar.",
      easter:   "Seven clicks on the hero name → vinyl record appears. Hidden keyboard code: type 'manomay' anywhere → accent colour flash. Splash can be skipped with rapid clicks.",
      sidebar:  "Desktop sidebar accessed via the hamburger icon (desktop only). Contains navigation to sidebar-only pages: Photos, Journey, Clock, Thoughts, Lists, Games."
    },

    social: {
      linkedin:  { label: 'LinkedIn',    hint: 'Professional profile and work history.' },
      instagram: { label: 'Instagram',   hint: 'Visual work and personal moments.' },
      email:     { label: 'Email',       hint: 'Direct inbox — manomaysmisra2908@gmail.com', url: 'mailto:manomaysmisra2908@gmail.com' },
      cv:        { label: 'Download CV', hint: 'Full résumé as a PDF.', url: 'manomay-cv.pdf', download: true }
    },

    faq: {
      age:          'Manomay was born on August 29, 2008. Use the Clock page for a live countdown and exact age.',
      location:     'Originally from Mumbai, Maharashtra. Currently based in Bengaluru, Karnataka.',
      stack:        'Vanilla HTML, CSS, and JavaScript. No React, no Vue, no templates. Everything hand-coded.',
      contactReason:'If you\'re reaching out for the site password — explain your reason. Genuine curiosity gets a response.',
      password:     'The password isn\'t public. Contact Manomay via the Contact page and explain why you want access.',
      frameworks:   'None. This site uses zero JavaScript frameworks. Every animation, every interaction — pure vanilla JS.',
      hiring:       'Manomay is open to interesting creative and technical opportunities. The Contact page is the right channel.',
      cv:           'The CV page has the full résumé. There\'s a downloadable PDF at the bottom of that page.',
    }
  };

  /* ═══════════════════════════════════════════════════════
     § 2 — RESPONSE VARIATION POOLS
     Tone-aware. Multiple phrasings prevent repetition.
     Tone keys: neutral · formal · casual · terse
  ═══════════════════════════════════════════════════════ */

  const POOL = {

    first_hello:  ["Hello.", "Hello there.", "Good to have you here.", "Hi."],
    first_intro:  [
      "I'm RoRo — the intelligence layer running this site.",
      "The name's RoRo. I manage everything on this site.",
      "RoRo. I know every corner of this place.",
      "I'm RoRo — your guide through everything here."
    ],
    first_name_q: [
      "Before we go further — what should I call you?",
      "One thing first. What's your name?",
      "I like to know who I'm talking to. What do people call you?",
      "What should I call you?"
    ],

    name_ack: [
      (n) => `Nice to meet you, ${n}.`,
      (n) => `${n}. Good.`,
      (n) => `Got it — ${n}.`,
      (n) => `${n}. I'll remember that.`,
      (n) => `${n}. Noted.`
    ],
    name_followup: [
      "Ask me anything about this site. I know all of it.",
      "This place has more layers than it looks. I can guide you through all of it.",
      "I have full access to everything here. Where do you want to start?",
      "I'm wired to this entire site. What are you looking for?"
    ],

    name_change_ack: [
      (o, n) => o ? `Switching from ${o} to ${n}. Done.` : `${n} it is. I'll use that going forward.`,
      (o, n) => `Got it. ${n} from now on.`,
      (o, n) => `Done — I'll call you ${n}.`,
    ],

    return_greet: [
      (n) => `Welcome back, ${n}.`,
      (n) => `${n}. You're back.`,
      (n) => `Good to see you again, ${n}.`,
      (n) => `Back again, ${n}.`
    ],
    return_last_page: [
      (p) => `Last time you were exploring ${p}.`,
      (p) => `You left off at ${p} last time.`,
      (p) => `You were on ${p} when you last visited.`
    ],
    return_prompt: [
      "What would you like to explore today?",
      "Where should we go this time?",
      "What are you looking for?",
      "Anything specific you want to dive into?"
    ],

    nav_confirm: [
      (p) => `Taking you to ${p}.`,
      (p) => `Opening ${p}.`,
      (p) => `${p}. On it.`,
      (p) => `Navigating to ${p}.`
    ],

    theme_confirm: {
      dark:   ["Switched to Noir. Deep and cinematic.", "Noir mode. Dark, precise.", "Noir. Good choice."],
      light:  ["Switched to Ivory. Clean and editorial.", "Ivory mode. Minimal and bright.", "Ivory. Premium aesthetic."],
      slate:  ["Switched to Slate. Cool and precise.", "Slate mode. Technical and calm.", "Slate. Clean."],
      forest: ["Switched to Forest. Muted and grounded.", "Forest mode. Organic, calm.", "Forest."]
    },
    theme_already: [
      (t) => `Already on ${t}. Nothing changed.`,
      (t) => `You're already in ${t} mode.`
    ],

    music_play:  ["Music on.", "Playing background ambience.", "Audio on.", "Music started."],
    music_pause: ["Music paused.", "Paused.", "Audio off.", "Stopped."],

    thanks:    ["Any time.", "Of course.", "That's what I'm here for.", "Always.", "Sure thing."],
    compliment:["The credit goes to Manomay.", "I just run the systems. He built everything.", "I'll pass that on.", "Noted. It's his work — I just know it well."],
    surprise:  ["Picking somewhere you might not have been.", "Let's go off-script.", "Random destination incoming.", "Choosing for you."],

    unknown: [
      "That's a bit outside my scope — I'm specifically wired to this site.",
      "I don't have that one. My knowledge is bounded to what's here.",
      "Interesting question. But I'm built for this site, not general conversation.",
      "That's beyond my access."
    ],
    unknown_clarify: [
      "Could you be more specific? Are you asking about a page, a project, or something about Manomay?",
      "I want to help — can you tell me more about what you're looking for?",
      "I'm not sure I followed that. Are you looking for a specific section of the site?",
    ],
    unknown_redir: [
      "If you need a real answer, I can route you to the Contact page.",
      "You could always ask Manomay directly — want me to open Contact?",
      "The Contact form is the right channel for this. Want me to go there?"
    ],

    clear_confirm: [
      "Done. Everything cleared. Fresh start.",
      "All your data has been removed. You're anonymous again.",
      "Cleared. I won't remember anything about you from this point."
    ],
    clear_prompt: [
      "I can remove everything I know about you — your name, visit history, preferences. This can't be undone.",
      "This will erase your name, viewed sections, and all stored preferences. Shall I proceed?"
    ],

    recruiter_detected: [
      "You're looking at this from a hiring perspective — I'll make sure to highlight the most relevant work.",
      "I'm picking up a professional interest here. Let me point you to what matters most."
    ],
    founder_detected: [
      "Building something? Manomay thinks similarly — everything from scratch, no shortcuts.",
    ],
    creative_detected: [
      "Aesthetic and craft matter here. This entire site is evidence of that approach."
    ]
  };

  /* ── Utility: pick random from pool ──────────────── */
  function pick(arr, ...args) {
    if (!arr || !arr.length) return '';
    const item = arr[Math.floor(Math.random() * arr.length)];
    return typeof item === 'function' ? item(...args) : item;
  }

  /* ═══════════════════════════════════════════════════════
     § 3 — FUZZY / SEMANTIC UTILITIES
     Levenshtein distance, n-gram similarity, synonym
     expansion — all in vanilla JS, zero dependencies.
  ═══════════════════════════════════════════════════════ */

  /* Levenshtein edit distance (classic DP) */
  function levenshtein(a, b) {
    const m = a.length, n = b.length;
    if (!m) return n;
    if (!n) return m;
    const dp = [];
    for (let i = 0; i <= m; i++) { dp[i] = [i]; }
    for (let j = 0; j <= n; j++) { dp[0][j] = j; }
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (a[i-1] === b[j-1]) dp[i][j] = dp[i-1][j-1];
        else dp[i][j] = 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
      }
    }
    return dp[m][n];
  }

  /* Bigram (2-char) similarity — Dice coefficient */
  function bigramSimilarity(a, b) {
    if (a.length < 2 || b.length < 2) return 0;
    const getBigrams = (str) => {
      const s = new Set();
      for (let i = 0; i < str.length - 1; i++) s.add(str.slice(i, i+2));
      return s;
    };
    const bA = getBigrams(a), bB = getBigrams(b);
    let intersection = 0;
    for (const bi of bA) { if (bB.has(bi)) intersection++; }
    return (2 * intersection) / (bA.size + bB.size);
  }

  /* Synonym / abbreviation table */
  const SYNONYMS = {
    'cv':         ['resume','curriculum','vitae','pdf','résumé'],
    'photo':      ['photography','image','picture','gallery','album','pic','shoot'],
    'photos':     ['photography','images','pictures','gallery','albums','pics'],
    'contact':    ['email','message','reach','inbox','write','dm','form'],
    'linkedin':   ['li','linked in','professional','network'],
    'instagram':  ['ig','insta','gram'],
    'iskcon':     ['iskon','isckon','iskcon','hare krishna','krishna','temple','camp','summer camp'],
    'nationality':['nationals','national','competition'],
    'skill':      ['ability','trait','capability','strength','talent'],
    'traits':     ['skills','abilities','hobbies','interests','talents'],
    'journey':    ['timeline','history','past','chapter','story','life'],
    'thoughts':   ['beliefs','opinions','blog','posts','views','philosophy'],
    'dark':       ['noir','black','night','midnight'],
    'light':      ['ivory','white','bright','day','cream'],
    'slate':      ['grey','gray','blue','steel','cool'],
    'forest':     ['green','nature','olive','earthy'],
    'music':      ['song','audio','sound','track','ambience','vinyl','play'],
    'home':       ['main','start','landing','beginning','front'],
    'surprise':   ['random','anywhere','idk','dunno','whatever','choose','pick'],
    'help':       ['assist','guide','show me','tell me','explain','how'],
    'password':   ['pw','pass','key','code','access','unlock','locked','gate'],
    'download':   ['get','save','export','pdf','file'],
    'play':       ['start','run','open','begin','launch'],
    'theme':      ['mode','appearance','look','style','colour','color'],
    'project':    ['work','build','app','website','thing','built','made'],
    'ecommerce':  ['ecom','shop','store','shopping','commerce','online store'],
  };

  /* Expand token list with synonym variants */
  function expandSynonyms(tokens) {
    const expanded = new Set(tokens);
    for (const t of tokens) {
      if (SYNONYMS[t]) { SYNONYMS[t].forEach(s => expanded.add(s)); }
      /* Also check if token IS a synonym and expand to canonical */
      for (const [canonical, variants] of Object.entries(SYNONYMS)) {
        if (variants.includes(t)) expanded.add(canonical);
      }
    }
    return [...expanded];
  }

  /* Tokenise input to lowercase word array */
  function tokenise(str) {
    return str.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
  }

  /* Enhanced scoring: exact match, prefix, fuzzy, bigram */
  function fuzzyScoreTokens(tokens, keywords) {
    let score = 0;
    const expanded = expandSynonyms(tokens);
    for (const t of expanded) {
      for (const kw of keywords) {
        if (typeof kw === 'string') {
          if (t === kw)                            { score += 10; continue; }
          if (t.startsWith(kw) || kw.startsWith(t)) { score += 6;  continue; }
          /* Fuzzy: only worth checking strings longer than 3 chars */
          if (t.length > 3 && kw.length > 3) {
            const dist = levenshtein(t, kw);
            if (dist === 1)                                      { score += 7; continue; }
            if (dist === 2 && Math.max(t.length,kw.length) > 6) { score += 3; continue; }
            const sim = bigramSimilarity(t, kw);
            if (sim > 0.65)                                      { score += Math.round(sim * 5); continue; }
          }
        } else if (kw instanceof RegExp && kw.test(t)) {
          score += 10;
        }
      }
    }
    return score;
  }

  /* ═══════════════════════════════════════════════════════
     § 4 — INTENT ENGINE
     Expanded intent list. Uses fuzzyScoreTokens.
     Includes navigation, info, control, and utility intents.
  ═══════════════════════════════════════════════════════ */

  const INTENTS = [
    /* ── Navigation ─────────────────────────────────── */
    { id: 'nav_home',     page: 'home',     kw: ['home','main','start','beginning','front','landing','back to home','go home'] },
    { id: 'nav_about',    page: 'about',    kw: ['about','identity','who','person','bio','biography','story','background','himself'] },
    { id: 'nav_photos',   page: 'photos',   kw: ['photo','photos','photography','picture','gallery','album','image','visual','shoot','pics'] },
    { id: 'nav_resume',   page: 'resume',   kw: ['resume','cv','curriculum','vitae','experience','work history','career','qualification','pdf'] },
    { id: 'nav_projects', page: 'projects', kw: ['project','projects','national','nationals','ecommerce','ecom','iskcon','iskon','camp','work','build','built','portfolio','made'] },
    { id: 'nav_profiles', page: 'profiles', kw: ['profiles','profile','linkedin','instagram','social','handle','accounts','internet','online presence'] },
    { id: 'nav_journey',  page: 'journey',  kw: ['journey','timeline','year','years','history','childhood','past','chapter','2008','2009','2010','2020','2024','life story','growing up'] },
    { id: 'nav_birthday', page: 'birthday', kw: ['birthday','clock','countdown','timer','born','age','birth','august','29','years old'] },
    { id: 'nav_thoughts', page: 'thoughts', kw: ['thought','thoughts','belief','beliefs','opinion','politics','faith','god','science','philosophy','life','society','culture','tech','technology','blog','post','views','opinion'] },
    { id: 'nav_contact',  page: 'contact',  kw: ['contact','message','email','reach','write','talk','send','inbox','form','get in touch'] },
    { id: 'nav_lists',    page: 'lists',    kw: ['list','lists','series','books','movie','movies','places','watch','read','curation','recommend','curated','favourites'] },
    { id: 'nav_skills',   page: 'skills',   kw: ['skill','skills','trait','traits','ability','abilities','hobby','hobbies','interest','talent','marquee'] },
    { id: 'nav_games',    page: 'games',    kw: ['game','games','play','snake','memory','2048','reaction','word','scramble','fun','puzzle'] },
    { id: 'nav_social',   page: 'social',   kw: ['social proof','testimonial','testimonials','company','companies','brand','brands','collab','worked with','clients'] },

    /* ── Information ─────────────────────────────────── */
    { id: 'info_current',  kw: ['where','current','here','viewing','what page','am i','what is this','which page'] },
    { id: 'info_password', kw: ['password','pw','pass','access','private','locked','unlock','key','secret','restricted','gate','how do i'] },
    { id: 'info_owner',    kw: ['manomay','he','him','his','who','maker','creator','owner','about him','tell me about','who is'] },
    { id: 'info_site',     kw: ['site','website','this site','built','made','tech','stack','design','aesthetic','framework','how was this','no framework','vanilla'] },
    { id: 'info_music',    kw: ['music','song','audio','sound','track','vinyl','easter egg','background'] },
    { id: 'info_design',   kw: ['design','look','aesthetic','theme','colour','color','dark','light','font','style','appearance','typography'] },
    { id: 'info_year',     kw: [/^20(0[89]|1[0-9]|2[0-6])$/] },
    { id: 'info_project',  kw: ['iskcon','iskon','nationals','ecommerce','writing','bullet','website project','camp project'] },
    { id: 'info_age',      kw: ['age','how old','born','birthday','years old','birth year','dob'] },
    { id: 'info_contact_why', kw: ['hiring','opportunity','collaborate','work together','partner','commission','freelance'] },
    { id: 'info_easter',   kw: ['easter','secret','hidden','surprise','easter egg','click name','vinyl','unlock','cheat'] },

    /* ── Site Controls ───────────────────────────────── */
    { id: 'ctrl_theme',        kw: ['theme','switch','change','dark','light','noir','ivory','slate','forest','mode','appearance','make it','brighter','darker'] },
    { id: 'ctrl_music_play',   kw: ['play music','start music','turn on music','resume music','play song','enable music','music on','unmute'] },
    { id: 'ctrl_music_pause',  kw: ['pause music','stop music','turn off music','mute music','music off','silence','quiet','no music'] },
    { id: 'ctrl_scroll_down',  kw: ['scroll down','scroll','go down','page down','more','below'] },
    { id: 'ctrl_scroll_up',    kw: ['scroll up','go up','top','back to top','page top'] },

    /* ── Social / External Links ─────────────────────── */
    { id: 'social_linkedin',  kw: ['linkedin','linked in','li','professional profile','connect on','network','work profile'] },
    { id: 'social_instagram', kw: ['instagram','ig','insta','gram','photos on instagram','follow'] },
    { id: 'social_email',     kw: ['email','send email','mail','write to','contact email','email address','directly'] },
    { id: 'social_cv',        kw: ['download cv','download resume','get cv','get resume','cv pdf','resume pdf','save cv'] },

    /* ── Memory / Identity ───────────────────────────── */
    { id: 'name_change', kw: ['call me','my name is','rename','actually','i go by','you can call me','just call me','from now on'] },
    { id: 'clear_data',  kw: ['clear','delete','forget','remove','reset','wipe','erase','privacy','my data','start over','fresh start','be forgotten'] },

    /* ── Utility ─────────────────────────────────────── */
    { id: 'thanks',       kw: ['thanks','thank','ty','appreciate','thx','cheers','helpful','great help'] },
    { id: 'compliment',   kw: ['nice','great','cool','amazing','love','beautiful','awesome','incredible','good','wow','impressive','perfect','gorgeous','stunning','incredible','brilliant'] },
    { id: 'greeting',     kw: ['hi','hello','hey','sup','yo','hola','howdy','greetings','good morning','good evening','what\'s up','wassup'] },
    { id: 'help',         kw: ['help','assist','guide','lost','navigate','how','explain','show me','tell me','what can','options','what do you do','capabilities'] },
    { id: 'surprise',     kw: ['surprise','random','anywhere','whatever','anything','dunno','idk','choose','pick','you decide'] },
    { id: 'who_are_you',  kw: ['who are you','what are you','roro','your name','about you','what is roro','how do you work'] },
  ];

  /* Classify best matching intent using fuzzy scoring */
  function detectIntent(input) {
    const tokens = tokenise(input);
    let best = null, bestScore = 0;
    for (const intent of INTENTS) {
      const s = fuzzyScoreTokens(tokens, intent.kw);
      if (s > bestScore) { bestScore = s; best = intent; }
    }
    /* Require minimum score to avoid false positives */
    return bestScore >= 4 ? best : null;
  }

  /* Extract year (2008–2026) if present in input */
  function extractYear(input) {
    const m = input.match(/\b(20(0[89]|1[0-9]|2[0-6]))\b/);
    return m ? parseInt(m[1]) : null;
  }

  /* ═══════════════════════════════════════════════════════
     § 5 — MEMORY ENGINE
     Cross-session localStorage persistence.
     Stores: name, viewed pages, visit count, last seen,
     recruiter type, tone preference. 90-day expiry.
  ═══════════════════════════════════════════════════════ */

  const MemoryEngine = {
    KEY:     'roroUser',
    EXPIRY:  90 * 24 * 60 * 60 * 1000, /* 90 days */

    load() {
      try {
        const raw = localStorage.getItem(this.KEY);
        if (!raw) return null;
        const data = JSON.parse(raw);
        /* Expire stale records */
        if (data.lastSeen && (Date.now() - data.lastSeen) > this.EXPIRY) {
          this.clear();
          return null;
        }
        return data;
      } catch { return null; }
    },

    save(data) {
      try {
        data.lastSeen = Date.now();
        localStorage.setItem(this.KEY, JSON.stringify(data));
      } catch {}
    },

    clear() {
      try { localStorage.removeItem(this.KEY); } catch {}
    },

    trackPageView(data, pageId) {
      if (!data) return data;
      if (!data.viewedPages) data.viewedPages = {};
      if (!data.viewedPages[pageId]) {
        data.viewedPages[pageId] = { count: 0, firstSeen: Date.now() };
      }
      data.viewedPages[pageId].count++;
      data.viewedPages[pageId].lastSeen = Date.now();
      data.lastPage = pageId;
      return data;
    },

    getMostViewedPage(data) {
      if (!data || !data.viewedPages) return null;
      let max = 0, best = null;
      for (const [id, info] of Object.entries(data.viewedPages)) {
        if (info.count > max) { max = info.count; best = id; }
      }
      return best;
    },

    getLastPage(data) {
      return data && data.lastPage ? data.lastPage : null;
    },

    incrementVisits(data) {
      if (!data) return data;
      data.visitCount = (data.visitCount || 0) + 1;
      return data;
    }
  };

  /* ═══════════════════════════════════════════════════════
     § 6 — TONE ENGINE
     Detects user's communication style from text signals.
     Adapts RoRo's response phrasing accordingly.
     Tones: neutral · formal · casual · terse · recruiter
  ═══════════════════════════════════════════════════════ */

  const ToneEngine = {
    current: 'neutral',
    history: [], /* last N tone readings */

    FORMAL_SIGNALS:   /\b(i would like|could you|please|kindly|regarding|furthermore|therefore|inquire|appreciate|professional|opportunity|position|team|candidate|qualification|experience)\b/i,
    CASUAL_SIGNALS:   /\b(bruh|bro|lol|lmao|omg|ngl|tbh|fr|rn|wtf|damn|lit|fire|vibe|goat|haha|lmk|imo|btw|nope|yep|yup|yeah|cool|sick|dope)\b/i,
    EMOJI_SIGNAL:     /[\u{1F300}-\u{1FFFF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u,
    RECRUITER_SIGNALS:/\b(hire|hiring|position|role|opportunity|talent|candidate|team|recruitment|hr|startup|company|agency|portfolio review)\b/i,
    CREATIVE_SIGNALS: /\b(aesthetic|design|art|creative|visual|brand|concept|direction|mood|vibe|craft)\b/i,

    detect(text) {
      if (!text || !text.trim()) return 'neutral';
      const isRecruiter = this.RECRUITER_SIGNALS.test(text);
      const isCreative  = this.CREATIVE_SIGNALS.test(text);
      const isFormal    = this.FORMAL_SIGNALS.test(text);
      const isCasual    = this.CASUAL_SIGNALS.test(text) || this.EMOJI_SIGNAL.test(text);
      const tokens      = tokenise(text);
      const isTerse     = tokens.length <= 3;

      if (isRecruiter) return 'recruiter';
      if (isCreative)  return 'creative';
      if (isFormal)    return 'formal';
      if (isCasual)    return 'casual';
      if (isTerse)     return 'terse';
      return 'neutral';
    },

    update(text) {
      const tone = this.detect(text);
      this.history.push(tone);
      if (this.history.length > 8) this.history.shift();
      /* Dominant tone from recent history */
      const counts = {};
      for (const t of this.history) counts[t] = (counts[t] || 0) + 1;
      this.current = Object.entries(counts).sort((a,b) => b[1]-a[1])[0][0];
      return tone;
    },

    /* Adapt a neutral message based on current tone */
    adapt(msg, tone) {
      tone = tone || this.current;
      if (!msg) return msg;
      if (tone === 'casual') {
        return msg.replace(/\bNavigating to\b/g, 'Taking you to')
                  .replace(/\bI cannot\b/g, "I can't")
                  .replace(/\bThank you\b/g, 'Thanks');
      }
      if (tone === 'formal') {
        return msg.replace(/\bOn it\.\b/g, 'Navigating to the requested page.')
                  .replace(/\bGot it\.\b/g, 'Understood.')
                  .replace(/\bSure thing\.\b/g, 'Of course.');
      }
      return msg;
    }
  };

  /* ═══════════════════════════════════════════════════════
     § 7 — RECRUITER PROFILER
     Infers visitor type from signals over the session.
     Adapts suggestions to match the inferred role.
  ═══════════════════════════════════════════════════════ */

  const RecruiterProfiler = {
    type:       'newcomer',
    confidence: 0,

    SIGNALS: {
      recruiter:  { kw: ['hire','hiring','position','role','opportunity','talent','candidate','team','hr','recruitment'], weight: 3 },
      founder:    { kw: ['startup','venture','build','scale','product','user','market','traction','mvp','launch','cofounder'], weight: 3 },
      creative:   { kw: ['aesthetic','design','art','creative','visual','brand','portfolio','concept','direction','photographer'], weight: 3 },
      developer:  { kw: ['code','develop','engineer','stack','framework','javascript','html','css','api','github','repo','open source'], weight: 2 },
      teacher:    { kw: ['student','class','assignment','project','school','college','learn','teach','grade','subject','course'], weight: 2 },
      friend:     { kw: ['hey','lol','bro','btw','omg','bruh','haha','nice','dude','man','bhai','yaar'], weight: 2 },
      collaborator: { kw: ['collaborate','collab','work together','partner','joint','team up','commission'], weight: 3 },
    },

    scores: {},

    update(text) {
      const tokens = tokenise(text);
      for (const [type, cfg] of Object.entries(this.SIGNALS)) {
        const score = fuzzyScoreTokens(tokens, cfg.kw);
        this.scores[type] = (this.scores[type] || 0) + Math.floor(score / cfg.weight);
      }
      /* Update dominant type */
      let max = 5, best = 'newcomer'; /* min threshold */
      for (const [t, s] of Object.entries(this.scores)) {
        if (s > max) { max = s; best = t; }
      }
      this.type       = best;
      this.confidence = max;
    },

    getSuggestions() {
      const map = {
        recruiter:   ["Open the CV", "See all projects", "Download résumé PDF", "What achievements stand out?"],
        founder:     ["What's been built here?", "How was this made?", "Show me the most ambitious project", "Explore the Identity section"],
        creative:    ["Show me the photography", "What themes are available?", "Tell me about the design philosophy", "Explore the Traits section"],
        developer:   ["How was this site built?", "What tech stack?", "Show me the projects", "Any open source work?"],
        teacher:     ["Who is Manomay?", "Show the Journey timeline", "What projects are completed?", "Tell me about the ISKCON camp"],
        friend:      ["Surprise me", "Show me the games", "What easter eggs are there?", "Play some music"],
        collaborator:["Show the projects", "How to get in touch?", "Download the CV", "What skills does Manomay have?"],
        newcomer:    ["Who is Manomay?", "What is this site?", "Show me the best work", "Take a tour"],
      };
      return map[this.type] || map.newcomer;
    }
  };

  /* ═══════════════════════════════════════════════════════
     § 8 — CONTEXT MANAGER
     Tracks the last entity discussed so pronoun references
     like "it", "that", "the same one" resolve correctly.
  ═══════════════════════════════════════════════════════ */

  const ContextManager = {
    entity:      null,  /* last project / page / topic */
    entityType:  null,  /* 'project' | 'page' | 'year' | 'topic' */
    entityLabel: null,  /* human-readable label */
    history:     [],    /* last 12 exchanges [{role, text}] */

    PRONOUNS: /\b(it|that|this|the project|the page|there|that one|same|this one|the same|this thing)\b/i,

    set(type, id, label) {
      this.entity      = id;
      this.entityType  = type;
      this.entityLabel = label;
    },

    hasPronoun(text) {
      return this.PRONOUNS.test(text);
    },

    resolve(text) {
      /* If text contains pronoun and we have context, return enriched text */
      if (this.hasPronoun(text) && this.entity) {
        return `${text} [referring to: ${this.entityLabel || this.entity}]`;
      }
      return text;
    },

    addHistory(role, text) {
      this.history.push({ role, text, ts: Date.now() });
      if (this.history.length > 12) this.history.shift();
    },

    getRecentTopics() {
      return this.history
        .filter(h => h.role === 'bot')
        .slice(-3)
        .map(h => h.text.slice(0, 60));
    }
  };

  /* ═══════════════════════════════════════════════════════
     § 9 — PROMPT LIBRARY
     Compact single-line prompts for the ticker.
     Categories help future filtering if needed.
  ═══════════════════════════════════════════════════════ */

  const PROMPT_LIBRARY = [
    { text: "Who is Manomay?",                     cat: "identity"  },
    { text: "What has he built?",                  cat: "projects"  },
    { text: "Open the CV",                         cat: "nav"       },
    { text: "What skills does Manomay have?",      cat: "traits"    },
    { text: "Switch to ivory theme",               cat: "theme"     },
    { text: "Show me the photography",             cat: "nav"       },
    { text: "Download the résumé PDF",             cat: "cv"        },
    { text: "Tell me about the ISKCON project",    cat: "projects"  },
    { text: "Show me LinkedIn",                    cat: "social"    },
    { text: "Tell me about 2024",                  cat: "journey"   },
    { text: "Play background music",               cat: "music"     },
    { text: "How do I get the password?",          cat: "password"  },
    { text: "What games are built into this site?",cat: "games"     },
    { text: "Tell me about the Nationals project", cat: "projects"  },
    { text: "Open the Thoughts section",           cat: "nav"       },
    { text: "What's Manomay's philosophy?",        cat: "identity"  },
    { text: "Show me the timeline",                cat: "journey"   },
    { text: "Switch to dark mode",                 cat: "theme"     },
    { text: "Who should I contact?",               cat: "contact"   },
    { text: "Surprise me",                         cat: "explore"   },
    { text: "How was this site built?",            cat: "site"      },
    { text: "What books does Manomay recommend?",  cat: "lists"     },
    { text: "Tell me about the easter eggs",       cat: "explore"   },
    { text: "Show me the social profiles",         cat: "nav"       },
  ];

  /* ═══════════════════════════════════════════════════════
     § 10 — RoRoManager CLASS
     All existing methods preserved. Extended with:
       · Idle detection + status transitions
       · Prompt ticker
       · In-chat action buttons
       · Theme / music / social / scroll control
       · Name change detection
       · Data clear flow
       · Contextual memory + pronoun resolution
       · Tone-adapted responses
       · Recruiter profiling
       · Enhanced getBotResponse()
  ═══════════════════════════════════════════════════════ */

  class RoRoManager {

    constructor() {
      /* ── Core state (unchanged) ── */
      this._state = {
        isOpen:           false,
        isMinimized:      false,
        isFullscreen:     false,
        hasStarted:       false,
        awaitingName:     false,
        awaitingRedirect: false,
        awaitingClear:    false,
        lastIntent:       null
      };

      this._userData  = MemoryEngine.load();
      this._queue     = [];
      this._queueBusy = false;
      this._optionsEl = null;

      /* ── Idle tracking ── */
      this._idleState    = 'active';
      this._lastActivity = Date.now();
      this._idleInterval = null;

      /* Boot sequence */
      this._injectStyles();
      this._buildPanel();
      this._injectNavButton();
      this._bindEvents();
      this._buildTicker();
      this._setupIdleDetection();
    }

    /* ──────────────────────────────────────────────────
       PERSISTENCE  (unchanged)
    ────────────────────────────────────────────────── */

    _loadUser()      { return MemoryEngine.load(); }
    _saveUser(data)  { MemoryEngine.save(data); }

    /* ──────────────────────────────────────────────────
       STYLE INJECTION  (unchanged)
    ────────────────────────────────────────────────── */

    _injectStyles() {
      if (document.getElementById('roro-styles')) return;
      const el = document.createElement('style');
      el.id          = 'roro-styles';
      el.textContent = RORO_CSS;
      document.head.appendChild(el);
    }

    /* ──────────────────────────────────────────────────
       PANEL DOM — existing structure preserved.
       Only addition: roro-prompt-ticker between chat
       and input row.
    ────────────────────────────────────────────────── */

    _buildPanel() {
      this._panel = document.createElement('div');
      this._panel.className = 'roro-panel';
      this._panel.setAttribute('role', 'dialog');
      this._panel.setAttribute('aria-label', 'RoRo — Website Intelligence');

      this._panel.innerHTML = `
        <div class="roro-header" id="roro-header">
          <div class="roro-avatar" aria-hidden="true">
            <div class="roro-avatar-pulse"></div>
            ${this._svgAvatar()}
          </div>
          <div class="roro-identity">
            <div class="roro-name">RoRo</div>
            <div class="roro-subtitle">Website Manager</div>
            <div class="roro-status">
              <div class="roro-status-dot" id="roro-status-dot"></div>
              <span id="roro-status-text">Active</span>
            </div>
          </div>
          <div class="roro-controls">
            <button class="roro-ctrl" id="roro-minimize"   title="Minimize"   aria-label="Minimize">−</button>
            <button class="roro-ctrl" id="roro-fullscreen" title="Fullscreen" aria-label="Toggle fullscreen">⤢</button>
            <button class="roro-ctrl" id="roro-close"      title="Close"      aria-label="Close">✕</button>
          </div>
          <div class="roro-minimized-label" aria-hidden="true">
            <div class="roro-minimized-dot"></div>
            <span>RoRo · Online</span>
          </div>
        </div>
        <div class="roro-enc-bar">End-to-end encrypted · Messages disappear on reload</div>
        <div class="roro-chat" id="roro-chat" aria-live="polite"></div>

        <!-- ↓ NEW: Prompt ticker — news-banner of example prompts -->
        <div class="roro-prompt-ticker" id="roro-ticker">
          <div class="roro-ticker-fade-l" aria-hidden="true"></div>
          <div class="roro-prompt-track"  id="roro-prompt-track"></div>
          <div class="roro-ticker-fade-r" aria-hidden="true"></div>
        </div>

        <div class="roro-input-row">
          <input
            class="roro-input"
            id="roro-input"
            type="text"
            placeholder="Ask anything about this site…"
            autocomplete="off"
            maxlength="320"
            aria-label="Message RoRo"
          />
          <button class="roro-send-btn" id="roro-send" aria-label="Send message">
            ${this._svgSend()}
          </button>
        </div>
      `;

      document.body.appendChild(this._panel);
      this._chatEl  = this._panel.querySelector('#roro-chat');
      this._inputEl = this._panel.querySelector('#roro-input');
    }

    /* ──────────────────────────────────────────────────
       SVG ASSETS  (unchanged)
    ────────────────────────────────────────────────── */

    _svgAvatar() {
      return `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9"   stroke="var(--accent)" stroke-width="1"/>
        <circle cx="12" cy="12" r="4.5" stroke="var(--accent)" stroke-width="0.75" opacity="0.5"/>
        <circle cx="12" cy="12" r="1.5" fill="var(--accent)"/>
        <line x1="12" y1="3"    x2="12" y2="7.5"  stroke="var(--accent)" stroke-width="0.8"/>
        <line x1="12" y1="16.5" x2="12" y2="21"   stroke="var(--accent)" stroke-width="0.8"/>
        <line x1="3"  y1="12"   x2="7.5"  y2="12" stroke="var(--accent)" stroke-width="0.8"/>
        <line x1="16.5" y1="12" x2="21"   y2="12" stroke="var(--accent)" stroke-width="0.8"/>
      </svg>`;
    }

    _svgSend() {
      return `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="22" y1="2" x2="11" y2="13"/>
        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
      </svg>`;
    }

    _svgRoroBtn() {
      return `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" aria-hidden="true">
        <circle cx="12" cy="8.5" r="3.5" stroke="var(--accent)" stroke-width="1.2"/>
        <path d="M5.5 20c0-3.59 2.91-6.5 6.5-6.5s6.5 2.91 6.5 6.5"
          stroke="var(--accent)" stroke-width="1.2" stroke-linecap="round"/>
        <circle cx="12" cy="12" r="10.5" stroke="var(--accent)" stroke-width="0.5" opacity="0.3"/>
      </svg>`;
    }

    /* ──────────────────────────────────────────────────
       NAV BUTTON INJECTION  (unchanged)
    ────────────────────────────────────────────────── */

    _injectNavButton() {
      if (document.getElementById('roro-btn')) return;
      const btn = document.createElement('button');
      btn.id    = 'roro-btn';
      btn.title = 'RoRo — Website Assistant';
      btn.setAttribute('aria-label', 'Open RoRo assistant');
      btn.innerHTML = `${this._svgRoroBtn()}<div class="roro-badge" aria-hidden="true"></div>`;

      const anchor = document.getElementById('music-toggle');
      if (anchor && anchor.parentNode) {
        anchor.parentNode.insertBefore(btn, anchor);
      } else {
        const navRight = document.querySelector('.nav-right');
        if (navRight) navRight.appendChild(btn);
        else document.body.appendChild(btn);
      }
    }

    /* ──────────────────────────────────────────────────
       EVENT BINDING  (unchanged + idle reset)
    ────────────────────────────────────────────────── */

    _bindEvents() {
      document.addEventListener('click', (e) => {
        if (e.target.closest('#roro-btn')) this._onNavBtnClick();
      });

      this._panel.querySelector('#roro-close')
        .addEventListener('click',      (e) => { e.stopPropagation(); this.close(); });
      this._panel.querySelector('#roro-minimize')
        .addEventListener('click',      (e) => { e.stopPropagation(); this.minimize(); });
      this._panel.querySelector('#roro-fullscreen')
        .addEventListener('click',      (e) => { e.stopPropagation(); this.toggleFullscreen(); });

      this._panel.querySelector('#roro-header').addEventListener('click', () => {
        if (this._state.isMinimized) this.restore();
      });

      this._panel.querySelector('#roro-send')
        .addEventListener('click', () => this._submitInput());
      this._inputEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this._submitInput(); }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this._state.isOpen && !this._state.isFullscreen) this.close();
      });

      /* Activity detection for idle system */
      this._panel.addEventListener('mouseenter', () => this._resetIdleTimer());
      this._panel.addEventListener('click',      () => this._resetIdleTimer());
      this._inputEl.addEventListener('focus',    () => this._resetIdleTimer());
      this._inputEl.addEventListener('input',    () => this._resetIdleTimer());
    }

    /* ──────────────────────────────────────────────────
       IDLE DETECTION  (NEW)
       3 min → Idle (accent dot)
       6 min → Offline (grey dot, static)
       Any interaction → Active (green dot, blinking)
    ────────────────────────────────────────────────── */

    _setupIdleDetection() {
      const IDLE_MS = 3 * 60 * 1000; /* 3 minutes */
      const AWAY_MS = 6 * 60 * 1000; /* 6 minutes */

      this._idleInterval = setInterval(() => {
        if (!this._state.isOpen || this._state.isMinimized) return;
        const elapsed = Date.now() - this._lastActivity;
        if (elapsed >= AWAY_MS && this._idleState !== 'offline') {
          this._applyActivityState('offline');
        } else if (elapsed >= IDLE_MS && elapsed < AWAY_MS && this._idleState === 'active') {
          this._applyActivityState('idle');
        }
      }, 20 * 1000); /* check every 20s */
    }

    _resetIdleTimer() {
      this._lastActivity = Date.now();
      if (this._idleState !== 'active') {
        this._applyActivityState('active');
      }
    }

    _applyActivityState(state) {
      this._idleState = state;
      const dot  = this._panel.querySelector('#roro-status-dot');
      const text = this._panel.querySelector('#roro-status-text');
      if (!dot || !text) return;

      if (state === 'active') {
        dot.style.background      = '#4ade80';
        dot.style.animation       = 'roroBlink 2.2s ease-in-out infinite';
        dot.style.opacity         = '1';
        text.textContent          = 'Active';
      } else if (state === 'idle') {
        dot.style.background      = 'var(--accent)';
        dot.style.animation       = 'roroBlink 4s ease-in-out infinite';
        dot.style.opacity         = '0.8';
        text.textContent          = 'Idle';
      } else if (state === 'offline') {
        dot.style.background      = 'var(--text3, #555)';
        dot.style.animation       = 'none';
        dot.style.opacity         = '0.6';
        text.textContent          = 'Offline';
      }
    }

    /* ──────────────────────────────────────────────────
       PROMPT TICKER  (NEW)
       Builds the news-banner strip. Items duplicate for
       seamless CSS loop. Click sends prompt to chat.
    ────────────────────────────────────────────────── */

    _buildTicker() {
      const track = this._panel.querySelector('#roro-prompt-track');
      if (!track) return;

      const makeItem = (p) =>
        `<span class="roro-prompt-item" data-prompt="${this._esc(p.text)}">${p.text}</span>` +
        `<span class="roro-prompt-sep" aria-hidden="true">◆</span>`;

      /* Duplicate array for seamless loop (animation moves by 50%) */
      const html = [...PROMPT_LIBRARY, ...PROMPT_LIBRARY].map(makeItem).join('');
      track.innerHTML = html;

      /* Click anywhere on the ticker sends the prompt */
      track.addEventListener('click', (e) => {
        const item = e.target.closest('.roro-prompt-item');
        if (!item) return;
        const prompt = item.dataset.prompt;
        if (!prompt) return;

        /* Ensure panel is visible and started */
        if (!this._state.hasStarted) {
          this.open();
          setTimeout(() => { this._inputEl.value = prompt; this._submitInput(); }, 900);
        } else {
          if (this._state.isMinimized) this.restore();
          if (!this._state.isOpen)     this.open();
          this._inputEl.value = prompt;
          setTimeout(() => this._submitInput(), 80);
        }

        this._resetIdleTimer();
      });
    }

    /* ──────────────────────────────────────────────────
       PANEL MODE MANAGEMENT  (unchanged + idle reset)
    ────────────────────────────────────────────────── */

    _onNavBtnClick() {
      const btn = document.getElementById('roro-btn');
      if (btn) btn.classList.remove('roro-has-unread');

      if (!this._state.isOpen)           this.open();
      else if (this._state.isMinimized)  this.restore();
      else                               this.minimize();
    }

    open() {
      this._state.isOpen      = true;
      this._state.isMinimized = false;
      this._panel.classList.add('roro-panel--open');
      this._panel.classList.remove('roro-panel--minimized');
      const btn = document.getElementById('roro-btn');
      if (btn) btn.classList.add('roro-btn--active');

      this._resetIdleTimer();

      if (!this._state.hasStarted) {
        this._state.hasStarted = true;
        this._addSeparator();
        this._startConversation();
      }
      setTimeout(() => { this._inputEl.focus(); }, 380);
    }

    close() {
      this._state.isOpen       = false;
      this._state.isMinimized  = false;
      this._state.isFullscreen = false;
      this._panel.classList.remove('roro-panel--open', 'roro-panel--minimized', 'roro-panel--fullscreen');
      const btn = document.getElementById('roro-btn');
      if (btn) btn.classList.remove('roro-btn--active');
    }

    minimize() {
      this._state.isMinimized  = true;
      this._state.isFullscreen = false;
      this._panel.classList.add('roro-panel--minimized');
      this._panel.classList.remove('roro-panel--fullscreen');
    }

    restore() {
      this._state.isMinimized = false;
      this._panel.classList.remove('roro-panel--minimized');
      this._resetIdleTimer();
      setTimeout(() => { this._inputEl.focus(); }, 200);
    }

    toggleFullscreen() {
      this._state.isFullscreen = !this._state.isFullscreen;
      this._state.isMinimized  = false;
      this._panel.classList.remove('roro-panel--minimized');
      this._panel.classList.toggle('roro-panel--fullscreen', this._state.isFullscreen);
      const fsBtn = this._panel.querySelector('#roro-fullscreen');
      if (fsBtn) fsBtn.textContent = this._state.isFullscreen ? '⤡' : '⤢';
    }

    /* ──────────────────────────────────────────────────
       CONVERSATION FLOW  (extended with last-page recall)
    ────────────────────────────────────────────────── */

    _startConversation() {
      if (this._userData && this._userData.name) {
        const n        = this._userData.name;
        const lastPage = MemoryEngine.getLastPage(this._userData);
        const lastPd   = lastPage ? KB.pages[lastPage] : null;

        this._enqueue(pick(POOL.return_greet, n));
        if (lastPd) {
          this._enqueue(pick(POOL.return_last_page, lastPd.label));
        }
        this._enqueue(pick(POOL.return_prompt));
        this._enqueue(null, () => this._renderOptions(this._contextualOptions()));
      } else {
        this._enqueue(pick(POOL.first_hello));
        this._enqueue(pick(POOL.first_intro));
        this._enqueue(pick(POOL.first_name_q));
        this._state.awaitingName = true;
      }
    }

    /* ──────────────────────────────────────────────────
       INPUT PROCESSING & ROUTING  (extended)
    ────────────────────────────────────────────────── */

    _submitInput() {
      const text = this._inputEl.value.trim();
      if (!text) return;
      this._inputEl.value = '';
      this._clearOptions();
      this._addUserMsg(text);
      this._resetIdleTimer();
      ContextManager.addHistory('user', text);
      ToneEngine.update(text);
      RecruiterProfiler.update(text);
      this._route(text);
    }

    _route(text) {

      /* ── 1. Name capture (first visit) ── */
      if (this._state.awaitingName) {
        this._state.awaitingName = false;
        const name = this._parseName(text);
        this._userData = MemoryEngine.incrementVisits({ name, visited: true });
        MemoryEngine.save(this._userData);
        this._enqueue(pick(POOL.name_ack, name));
        this._enqueue(pick(POOL.name_followup));
        this._enqueue(null, () => this._renderOptions(this._getSmartOptions()));
        return;
      }

      /* ── 2. Data-clear confirmation ── */
      if (this._state.awaitingClear) {
        this._state.awaitingClear = false;
        if (/^(yes|sure|ok|yeah|yep|please|go|confirm|clear|y|do it)$/i.test(text.trim())) {
          MemoryEngine.clear();
          this._userData = null;
          this._enqueue(pick(POOL.clear_confirm));
          setTimeout(() => {
            this._enqueue("What should I call you?");
            this._state.awaitingName = true;
          }, 1200);
        } else {
          this._enqueue("No changes made. Everything is still here.");
          this._enqueue(null, () => this._renderOptions(this._contextualOptions().slice(0, 4)));
        }
        return;
      }

      /* ── 3. Contact-redirect confirmation ── */
      if (this._state.awaitingRedirect) {
        this._state.awaitingRedirect = false;
        if (/^(yes|sure|ok|yeah|yep|please|go|take|open|redirect|y)$/i.test(text.trim())) {
          this._enqueue(pick(POOL.nav_confirm, 'Contact'));
          this._enqueue(null, () => this._go('contact'));
        } else {
          this._enqueue("Understood. Ask me anything else.");
          this._enqueue(null, () => this._renderOptions(this._contextualOptions().slice(0, 4)));
        }
        return;
      }

      /* ── 4. Name-change detection ── */
      const nameChange = this._detectNameChange(text);
      if (nameChange) {
        const oldName = this._userData ? this._userData.name : null;
        if (!this._userData) this._userData = {};
        this._userData.name = nameChange;
        MemoryEngine.save(this._userData);
        this._enqueue(pick(POOL.name_change_ack, oldName, nameChange));
        return;
      }

      /* ── 5. Data-clear request ── */
      if (this._detectClearRequest(text)) {
        this._enqueue(pick(POOL.clear_prompt));
        this._state.awaitingClear = true;
        this._enqueue(null, () => {
          this._renderActionButtons([
            { label: '✕ Yes, clear everything', primary: true, href: '#', action: () => {
                this._clearOptions();
                this._addUserMsg('Yes, clear everything');
                this._state.awaitingClear = false;
                MemoryEngine.clear();
                this._userData = null;
                this._enqueue(pick(POOL.clear_confirm));
                setTimeout(() => {
                  this._enqueue("What should I call you?");
                  this._state.awaitingName = true;
                }, 1200);
              }
            },
            { label: 'Cancel', href: '#', action: () => {
                this._clearOptions();
                this._addUserMsg('Cancel');
                this._state.awaitingClear = false;
                this._enqueue("No changes made.");
              }
            }
          ]);
        });
        return;
      }

      /* ── 6. Theme control ── */
      const themeResp = this._handleThemeIntent(text);
      if (themeResp) { this._dispatchResponse(themeResp); return; }

      /* ── 7. Music control ── */
      const musicResp = this._handleMusicIntent(text);
      if (musicResp) { this._dispatchResponse(musicResp); return; }

      /* ── 8. Social / external links ── */
      const socialResp = this._handleSocialIntent(text);
      if (socialResp) { this._dispatchResponse(socialResp); return; }

      /* ── 9. Scroll control ── */
      const scrollResp = this._handleScrollIntent(text);
      if (scrollResp) { this._dispatchResponse(scrollResp); return; }

      /* ── 10. Context resolution (pronoun) ── */
      const resolvedText = ContextManager.resolve(text);

      /* ── 11. Main NLP engine ── */
      const resp = this.getBotResponse(resolvedText, this._currentPage());
      this._dispatchResponse(resp);
    }

    /* ──────────────────────────────────────────────────
       RESPONSE DISPATCH  (extended: handles buttons, action)
    ────────────────────────────────────────────────── */

    _dispatchResponse(resp) {
      if (!resp) return;

      if (typeof resp === 'string') { this._enqueue(resp); return; }

      if (resp.messages) resp.messages.forEach(m => this._enqueue(m));

      /* Execute site action (theme, music, scroll) */
      if (resp.action) {
        this._enqueue(null, () => this._executeAction(resp.action, resp.actionData));
      }

      if (resp.navigate) {
        this._enqueue(null, () => {
          this._go(resp.navigate);
          if (this._userData) {
            this._userData = MemoryEngine.trackPageView(this._userData, resp.navigate);
            MemoryEngine.save(this._userData);
          }
          ContextManager.set('page', resp.navigate, KB.pages[resp.navigate]?.label || resp.navigate);
        });
        const pd = KB.pages[resp.navigate];
        if (pd) {
          this._enqueue(null, () => setTimeout(() => {
            this._enqueue(`You're now on ${pd.label}.`);
            if (resp.buttons)  this._enqueue(null, () => this._renderActionButtons(resp.buttons));
            else if (resp.options) this._enqueue(null, () => this._renderOptions(resp.options));
          }, 600));
          return;
        }
      }

      if (resp.awaitRedirect) this._state.awaitingRedirect = true;

      if (resp.buttons) {
        this._enqueue(null, () => this._renderActionButtons(resp.buttons));
      } else if (resp.options) {
        this._enqueue(null, () => this._renderOptions(resp.options));
      }
    }

    /* ──────────────────────────────────────────────────
       THEME HANDLER  (NEW)
    ────────────────────────────────────────────────── */

    _handleThemeIntent(input) {
      const lower = input.toLowerCase();

      /* Must contain a theme-related signal */
      const isThemeRequest =
        /\b(switch|change|use|apply|set|make|go to|toggle|turn on|enable|activate|put on)\b/i.test(lower) ||
        /\b(theme|mode|look|appearance)\b/i.test(lower) ||
        /\b(darker|brighter|lighter|whiter|cleaner)\b/i.test(lower);

      if (!isThemeRequest) return null;

      const THEME_MAP = {
        dark:   ['dark','noir','black','night','midnight','dim'],
        light:  ['light','ivory','white','bright','day','cream','minimal','clean','brighter','lighter','whiter'],
        slate:  ['slate','grey','gray','blue','steel','cool','muted blue'],
        forest: ['forest','green','nature','olive','earthy'],
      };

      let target = null;
      for (const [theme, kws] of Object.entries(THEME_MAP)) {
        if (kws.some(kw => lower.includes(kw))) { target = theme; break; }
      }
      if (!target) return null;

      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const info    = KB.design.themes[target];

      if (current === target) {
        return { messages: [pick(POOL.theme_already, info.label)] };
      }

      return {
        messages:    [pick(POOL.theme_confirm[target])],
        action:      'theme',
        actionData:  target,
        options:     Object.values(KB.design.themes)
                       .filter(t => t.id !== target)
                       .slice(0, 3)
                       .map(t => `Switch to ${t.label}`)
      };
    }

    /* ──────────────────────────────────────────────────
       MUSIC HANDLER  (NEW)
    ────────────────────────────────────────────────── */

    _handleMusicIntent(input) {
      const lower = input.toLowerCase();
      const hasMusic = /\b(music|song|audio|sound|track|ambience|vinyl)\b/i.test(lower);
      if (!hasMusic) return null;

      const isPause = /\b(pause|stop|off|mute|silence|turn off|disable|quiet|no)\b/i.test(lower);
      const isPlay  = /\b(play|start|on|resume|turn on|enable|begin|start)\b/i.test(lower);

      if (isPause) {
        return {
          messages: [pick(POOL.music_pause)],
          action:   'pause_music',
          options:  ["Play music again", "Tell me about the easter-egg song", "Show me Games"]
        };
      }
      return {
        messages: [pick(POOL.music_play)],
        action:   'play_music',
        options:  ["Pause music", "What's the easter-egg song?", "Switch to ivory theme"]
      };
    }

    /* ──────────────────────────────────────────────────
       SOCIAL LINK HANDLER  (NEW)
    ────────────────────────────────────────────────── */

    _handleSocialIntent(input) {
      const lower = input.toLowerCase();

      /* LinkedIn */
      if (/\b(linkedin|linked in|li|professional profile|connect on linkedin)\b/i.test(lower)) {
        const url = this._getSocialUrl('linkedin');
        return {
          messages: ["LinkedIn — Manomay's professional profile."],
          buttons:  [
            { label: '↗ Open LinkedIn', href: url, primary: true },
            { label: 'Open Profiles page', href: '#', action: () => this._go('profiles') }
          ],
          options: ["Show me Instagram", "Download CV", "Take me to CV page"]
        };
      }

      /* Instagram */
      if (/\b(instagram|ig|insta|gram|follow)\b/i.test(lower)) {
        const url = this._getSocialUrl('instagram');
        return {
          messages: ["Instagram — visual work and personal moments."],
          buttons:  [
            { label: '↗ Open Instagram', href: url, primary: true },
            { label: 'Open Profiles page', href: '#', action: () => this._go('profiles') }
          ],
          options: ["Show me Photos", "Open Profiles", "Who is Manomay?"]
        };
      }

      /* CV Download */
      if (/\b(download|get|save)\b.{0,12}\b(cv|resume|pdf|résumé)\b/i.test(lower) ||
          /\b(cv|resume|résumé)\b.{0,12}\b(download|pdf|link|file|get)\b/i.test(lower)) {
        const cvUrl = this._getSocialUrl('cv');
        return {
          messages: ["Full résumé — ready to download."],
          buttons: [
            { label: '↓ Download CV (PDF)', href: cvUrl, primary: true, download: 'Manomay-Misra-CV.pdf' },
            { label: 'Open CV page', href: '#', action: () => this._go('resume') }
          ],
          options: ["See experience section", "What skills are listed?", "Who is Manomay?"]
        };
      }

      /* Email */
      if (/\b(email|send email|mail|write to|contact email|email address|contact directly)\b/i.test(lower)) {
        return {
          messages: ["Direct line to Manomay."],
          buttons: [
            { label: '✉ Send Email', href: 'mailto:manomaysmisra2908@gmail.com', primary: true },
            { label: 'Open Contact form', href: '#', action: () => this._go('contact') }
          ],
          options: ["Open Contact form", "What's the best way to reach him?"]
        };
      }

      return null;
    }

    /* ──────────────────────────────────────────────────
       SCROLL HANDLER  (NEW)
    ────────────────────────────────────────────────── */

    _handleScrollIntent(input) {
      const lower = input.toLowerCase();
      if (/\b(scroll down|go down|page down|more content|below)\b/i.test(lower)) {
        return { messages: ["Scrolling down."], action: 'scroll_down' };
      }
      if (/\b(scroll up|go up|back to top|page top|top of page|beginning)\b/i.test(lower)) {
        return { messages: ["Back to the top."], action: 'scroll_top' };
      }
      return null;
    }

    /* ──────────────────────────────────────────────────
       SITE ACTION EXECUTOR  (NEW)
    ────────────────────────────────────────────────── */

    _executeAction(type, data) {
      switch (type) {
        case 'theme': {
          if (typeof window.setTheme === 'function') {
            window.setTheme(data);
          } else {
            document.documentElement.setAttribute('data-theme', data);
          }
          break;
        }
        case 'play_music': {
          const bgMusic = document.getElementById('bg-music');
          if (bgMusic) bgMusic.play().catch(() => {});
          break;
        }
        case 'pause_music': {
          const bg = document.getElementById('bg-music');
          const rn = document.getElementById('rain-song');
          if (bg) bg.pause();
          if (rn) rn.pause();
          break;
        }
        case 'scroll_down': {
          const page = document.querySelector('.page.active');
          if (page) page.scrollBy({ top: window.innerHeight * 0.65, behavior: 'smooth' });
          break;
        }
        case 'scroll_top': {
          const pg = document.querySelector('.page.active');
          if (pg) pg.scrollTo({ top: 0, behavior: 'smooth' });
          break;
        }
      }
    }

    /* ──────────────────────────────────────────────────
       SOCIAL URL RESOLVER  (NEW)
       Reads from MSM_DATA if available, else falls back.
    ────────────────────────────────────────────────── */

    _getSocialUrl(type) {
      const D = window.MSM_DATA;
      if (D) {
        /* Try profiles links array */
        const links = (D.profiles && D.profiles.links) || [];
        if (type === 'linkedin') {
          const l = links.find(x => /linkedin/i.test(x.name || x.id || ''));
          if (l && l.url) return l.url;
          /* Try direct linkedin-link element */
          const el = document.getElementById('linkedin-link');
          if (el && el.href && el.href !== window.location.href) return el.href;
        }
        if (type === 'instagram') {
          const l = links.find(x => /instagram/i.test(x.name || x.id || ''));
          if (l && l.url) return l.url;
          const el = document.getElementById('instagram-link');
          if (el && el.href && el.href !== window.location.href) return el.href;
        }
        if (type === 'cv') {
          const path = (D.resume && D.resume.pdfPath) || 'manomay-cv.pdf';
          return path;
        }
      }
      const fallback = { linkedin: '#', instagram: '#', cv: 'manomay-cv.pdf' };
      return fallback[type] || '#';
    }

    /* ──────────────────────────────────────────────────
       NAME CHANGE DETECTION  (NEW)
    ────────────────────────────────────────────────── */

    _detectNameChange(text) {
      const patterns = [
        /^(?:please\s+)?call me\s+(.+?)(?:\s+from now on)?\.?$/i,
        /^my name(?:\s+is)?\s+(.+?)\.?$/i,
        /^rename me(?:\s+to)?\s+(.+?)\.?$/i,
        /^actually[,]?\s+(?:i am|i'm|im)\s+(.+?)\.?$/i,
        /^you can call me\s+(.+?)\.?$/i,
        /^just call me\s+(.+?)\.?$/i,
        /^i go by\s+(.+?)\.?$/i,
        /^they call me\s+(.+?)\.?$/i,
      ];
      for (const pat of patterns) {
        const m = text.match(pat);
        if (m) return this._parseName(m[1]);
      }
      return null;
    }

    /* ──────────────────────────────────────────────────
       CLEAR DATA DETECTION  (NEW)
    ────────────────────────────────────────────────── */

    _detectClearRequest(text) {
      return /\b(clear|delete|forget|remove|reset|wipe|erase)\b.{0,25}\b(data|me|memory|cache|history|info|all|everything|my info)\b/i.test(text) ||
             /\b(i want to|please|can you)\b.{0,12}\b(be forgotten|start fresh|start over|clear everything|wipe everything)\b/i.test(text);
    }

    /* ──────────────────────────────────────────────────
       CORE RESPONSE ENGINE  (extended)
    ────────────────────────────────────────────────── */

    getBotResponse(input, context) {
      const intent = detectIntent(input);
      const page   = context || this._currentPage();
      const year   = extractYear(input);

      /* ── Year query ── */
      if (year && KB.years[year]) {
        ContextManager.set('year', year, `year ${year}`);
        return {
          messages: [`${year} — ${KB.years[year]}`, "The full timeline is on the Journey page."],
          options:  ["Show me the Journey", "Tell me about 2008", "Tell me about 2020", "Who is Manomay?"]
        };
      }

      /* ── No intent detected — smart fallback ── */
      if (!intent) {
        /* Try to infer what the user might mean */
        const tokens = tokenise(input);
        const isQuestion = /\?$/.test(input.trim()) || /^(what|who|how|when|where|why|is|are|can|does|did)\b/i.test(input);
        if (isQuestion) {
          return {
            messages: [
              "I'm not quite sure what you're asking. Could you be more specific?",
              "For example: are you asking about a page, a project, or something about Manomay?"
            ],
            options: ["Who is Manomay?", "Show me Projects", "What pages are here?", "Take me to Contact"]
          };
        }
        return {
          messages: [pick(POOL.unknown), pick(POOL.unknown_redir)],
          awaitRedirect: true
        };
      }

      /* ── Navigation intents ── */
      if (intent.id.startsWith('nav_') && intent.page) {
        const pd = KB.pages[intent.page];
        if (!pd) return { messages: ["On it."], navigate: intent.page };
        ContextManager.set('page', intent.page, pd.label);
        return {
          messages: [pick(POOL.nav_confirm, pd.label), pd.summary],
          navigate: intent.page,
          options:  this._pageFollowOptions(intent.page)
        };
      }

      /* ── Current page info ── */
      if (intent.id === 'info_current') {
        const pd = KB.pages[page];
        return pd
          ? { messages: [`You're on the ${pd.label} page.`, pd.summary], options: this._pageFollowOptions(page) }
          : { messages: ["You're navigating the site. The menu above shows all sections."] };
      }

      /* ── Password ── */
      if (intent.id === 'info_password') {
        return {
          messages: ["Several sections require a password.", KB.password.hint, `Locked sections include: ${KB.password.lockedSections.slice(0,3).join(', ')}, and more.`],
          options:  ["Take me to Contact", "What exactly is locked?", "Who is Manomay?"]
        };
      }

      /* ── Owner ── */
      if (intent.id === 'info_owner') {
        const o = KB.owner;
        return {
          messages: [
            `${o.name} — born ${o.born}, ${o.birthplace}.`,
            o.description,
            `"${o.philosophy}"`
          ],
          options: ["Show me Identity", "Show me the Journey", "Show me Projects", "What has he built?"]
        };
      }

      /* ── Age ── */
      if (intent.id === 'info_age') {
        const born = new Date(2008, 7, 29);
        const now  = new Date();
        let age    = now.getFullYear() - born.getFullYear();
        if (now < new Date(now.getFullYear(), 7, 29)) age--;
        return {
          messages: [`${age} years old. Born August 29, 2008. The Clock page has a millisecond-level live countdown.`],
          options:  ["Open the Clock", "Tell me more about Manomay", "Show me the Journey"]
        };
      }

      /* ── Who is RoRo ── */
      if (intent.id === 'who_are_you') {
        return {
          messages: [
            "I'm RoRo — the intelligence layer built into this site.",
            "I know every section, can navigate for you, switch themes, control music, and answer anything about Manomay or this site.",
            "I'm also context-aware — I'll remember what we've been discussing and adapt to how you communicate."
          ],
          options: ["What can you do?", "Show me Projects", "Who is Manomay?"]
        };
      }

      /* ── Site info ── */
      if (intent.id === 'info_site') {
        const d = KB.design;
        return {
          messages: [
            `${KB.owner.name}'s personal portfolio — built from scratch, no templates, no frameworks.`,
            d.philosophy,
            `Stack: ${d.stack.slice(0,3).join(', ')}.`
          ],
          options: ["Show me Projects", "Tell me about the design choices", "Show me the Journey", "What themes are there?"]
        };
      }

      /* ── Design ── */
      if (intent.id === 'info_design') {
        const themes = Object.values(KB.design.themes).map(t => `${t.label} — ${t.desc}`).join(' · ');
        return {
          messages: [
            KB.design.summary,
            `Themes: ${themes}`
          ],
          options: ["Switch to ivory theme", "Switch to dark mode", "Show me Projects", "Who is Manomay?"]
        };
      }

      /* ── Music ── */
      if (intent.id === 'info_music') {
        return {
          messages: [
            KB.features.music,
            "You can also ask me to play or pause the music — I have direct control."
          ],
          options: ["Play music", "Take me to Home", "Tell me about the easter eggs", "Show me Games"]
        };
      }

      /* ── Easter eggs ── */
      if (intent.id === 'info_easter') {
        return {
          messages: [
            "There are a few hidden things here.",
            "Click Manomay's name on the homepage exactly seven times — a vinyl record appears and a hidden song plays.",
            "Type 'manomay' anywhere on the keyboard and the accent colour flashes.",
            "The splash screen can also be skipped by clicking rapidly — 20-25 clicks and it exits early."
          ],
          options: ["Take me to Home", "Play music", "Show me Games", "Surprise me"]
        };
      }

      /* ── Project info ── */
      if (intent.id === 'info_project') {
        const tokens = tokenise(input);
        /* Find best matching project */
        let bestProj = null, bestScore = 0;
        for (const [key, proj] of Object.entries(KB.projects)) {
          const s = fuzzyScoreTokens(tokens, proj.keywords);
          if (s > bestScore) { bestScore = s; bestProj = proj; }
        }
        if (bestProj && bestScore >= 4) {
          ContextManager.set('project', bestProj.title, bestProj.title);
          return {
            messages: [
              `${bestProj.title} — ${bestProj.type}`,
              bestProj.description,
              `Status: ${bestProj.status}`
            ],
            options: ["Show me all projects", "Tell me about another project", "Show me Identity", "Take me to Contact"]
          };
        }
        /* Fallback: go to projects page */
        return {
          messages: ["Let me take you to the Projects section — you can browse everything there."],
          navigate: 'projects',
          options:  this._pageFollowOptions('projects')
        };
      }

      /* ── Contact / collaboration intent ── */
      if (intent.id === 'info_contact_why') {
        return {
          messages: [
            "Manomay is open to interesting opportunities — creative, technical, or collaborative.",
            "The Contact page is the right channel. State your intent clearly — he reads every message."
          ],
          buttons: [
            { label: '→ Open Contact', href: '#', primary: true, action: () => this._go('contact') },
            { label: '✉ Send Email', href: 'mailto:manomaysmisra2908@gmail.com' }
          ],
          options: ["Show me the CV", "See all projects"]
        };
      }

      /* ── Greeting ── */
      if (intent.id === 'greeting') {
        const n = this._userData?.name;
        return {
          messages: [n ? `${n}.` : "Hello.", "What do you need?"],
          options:  this._getSmartOptions()
        };
      }

      /* ── Thanks ── */
      if (intent.id === 'thanks') {
        return {
          messages: [pick(POOL.thanks)],
          options:  this._contextualOptions().slice(0, 4)
        };
      }

      /* ── Compliment ── */
      if (intent.id === 'compliment') {
        return {
          messages: [pick(POOL.compliment)],
          options:  this._contextualOptions().slice(0, 3)
        };
      }

      /* ── Help ── */
      if (intent.id === 'help') {
        return {
          messages: [
            "I can navigate the site, describe any section, answer questions about Manomay, switch themes, control music, show social links, or download the CV.",
            "Try: 'Open Projects', 'Switch to ivory', 'Download CV', 'Who is Manomay?', 'Show LinkedIn', or 'Play music'."
          ],
          options: ["What is this site?", "Who is Manomay?", "Show me Projects", "Switch to ivory theme", "Surprise me"]
        };
      }

      /* ── Surprise ── */
      if (intent.id === 'surprise') {
        const ids    = Object.keys(KB.pages);
        const randId = ids[Math.floor(Math.random() * ids.length)];
        const pd     = KB.pages[randId];
        return {
          messages: [pick(POOL.surprise), `Going to ${pd.label}.`, pd.summary],
          navigate: randId
        };
      }

      /* ── Fallback ── */
      return {
        messages: [pick(POOL.unknown), pick(POOL.unknown_redir)],
        awaitRedirect: true
      };
    }

    /* ──────────────────────────────────────────────────
       SMART OPTIONS  (NEW — uses recruiter profile)
    ────────────────────────────────────────────────── */

    _getSmartOptions() {
      /* Blend contextual + profiler suggestions */
      const ctx      = this._contextualOptions();
      const profiled = RecruiterProfiler.getSuggestions();
      const merged   = [...new Set([...profiled.slice(0, 2), ...ctx])].slice(0, 6);
      return merged;
    }

    _contextualOptions() {
      const page = this._currentPage();
      const shared = [
        "Who is Manomay?", "What is this site?",
        "Show me Projects", "Take me to Contact",
        "Show me Games",    "Surprise me"
      ];
      const specific = {
        home:     ["Tell me about the design", "Explore the site"],
        about:    ["Show me the Journey", "How do I get the password?"],
        resume:   ["See Projects too", "Download CV"],
        projects: ["Show me the CV", "Tell me about Nationals"],
        journey:  ["Tell me about 2008", "Tell me about 2024"],
        birthday: ["When is the birthday?", "Open the Clock"],
        thoughts: ["Show me Politics posts", "Show me Tech posts"],
        games:    ["What games are there?", "Show me Projects"],
        photos:   ["How do I see private albums?", "Take me to Contact"],
        contact:  ["What can I ask you?", "Show me Projects"],
        lists:    ["How to unlock the full list?", "Show me Games"],
        skills:   ["Show me Projects", "Show me the Journey"],
        profiles: ["Show me CV", "Show Instagram"],
        social:   ["Show me Projects", "Who is Manomay?"]
      };
      return [...(specific[page] || []), ...shared].slice(0, 6);
    }

    _pageFollowOptions(pageId) {
      const others = Object.values(KB.pages)
        .filter(p => p.label !== KB.pages[pageId]?.label)
        .slice(0, 2)
        .map(p => `Show me ${p.label}`);
      return ["What else is here?", ...others, "Take me to Contact"].slice(0, 4);
    }

    /* ──────────────────────────────────────────────────
       IN-CHAT ACTION BUTTONS  (NEW)
    ────────────────────────────────────────────────── */

    _renderActionButtons(buttons) {
      if (!buttons || !buttons.length) return;
      const wrap = document.createElement('div');
      wrap.className = 'roro-action-btns';

      buttons.forEach(btn => {
        const el = document.createElement(btn.href ? 'a' : 'button');
        el.className = 'roro-action-btn' + (btn.primary ? ' roro-action-btn--primary' : '');
        el.textContent = btn.label;

        if (btn.href) {
          el.href = btn.href;
          if (btn.download) {
            el.download = btn.download === true ? 'file' : btn.download;
          } else if (btn.href !== '#' && !btn.href.startsWith('mailto:')) {
            el.target = '_blank';
            el.rel    = 'noopener noreferrer';
          }
        }

        if (btn.action) {
          el.addEventListener('click', (e) => {
            if (!btn.href || btn.href === '#') e.preventDefault();
            this._resetIdleTimer();
            btn.action();
          });
        }
        wrap.appendChild(el);
      });

      this._chatEl.appendChild(wrap);
      this._scrollBottom();
    }

    /* ──────────────────────────────────────────────────
       QUICK OPTION CHIPS  (unchanged)
    ────────────────────────────────────────────────── */

    _renderOptions(options) {
      this._clearOptions();
      if (!options || !options.length) return;
      const wrap = document.createElement('div');
      wrap.className = 'roro-options';
      options.forEach(text => {
        const btn = document.createElement('button');
        btn.className   = 'roro-opt';
        btn.textContent = text;
        btn.addEventListener('click', () => {
          this._clearOptions();
          this._addUserMsg(text);
          this._route(text);
        });
        wrap.appendChild(btn);
      });
      this._chatEl.appendChild(wrap);
      this._optionsEl = wrap;
      this._scrollBottom();
    }

    _clearOptions() {
      if (this._optionsEl && this._optionsEl.parentNode) this._optionsEl.remove();
      this._optionsEl = null;
    }

    /* ──────────────────────────────────────────────────
       MESSAGE QUEUE & RENDERING  (unchanged)
    ────────────────────────────────────────────────── */

    _enqueue(text, callback) {
      this._queue.push({ text, callback });
      if (!this._queueBusy) this._processQueue();
    }

    _processQueue() {
      if (!this._queue.length) { this._queueBusy = false; return; }
      this._queueBusy = true;
      const { text, callback } = this._queue.shift();

      if (!text && callback) {
        setTimeout(() => { callback(); this._processQueue(); }, 150);
        return;
      }

      const typing = this._addTypingIndicator();
      this._scrollBottom();
      const delay = Math.min(380 + Math.random() * 440 + (text?.length || 0) * 12, 2000);

      setTimeout(() => {
        typing.remove();
        this._addBotMsg(text || '', callback, () => this._processQueue());
      }, delay);
    }

    _addTypingIndicator() {
      const wrap = document.createElement('div');
      wrap.className = 'roro-msg roro-msg--bot roro-msg--typing';
      wrap.innerHTML = `<div class="roro-bubble"><div class="roro-tdot"></div><div class="roro-tdot"></div><div class="roro-tdot"></div></div>`;
      this._chatEl.appendChild(wrap);
      this._scrollBottom();
      return wrap;
    }

    _addBotMsg(text, preCallback, done) {
      const wrap   = document.createElement('div');
      wrap.className = 'roro-msg roro-msg--bot';
      const bubble = document.createElement('div');
      bubble.className = 'roro-bubble';
      const ts = document.createElement('div');
      ts.className   = 'roro-timestamp';
      ts.textContent = this._now();
      wrap.appendChild(bubble);
      wrap.appendChild(ts);
      this._chatEl.appendChild(wrap);
      this._scrollBottom();
      if (preCallback) preCallback();

      /* Tone-adapt the text before rendering */
      const adapted = ToneEngine.adapt(text, ToneEngine.current);
      ContextManager.addHistory('bot', adapted);

      this._type(bubble, adapted, () => { this._scrollBottom(); done && done(); });
    }

    _type(el, text, done) {
      const chars = [...text];
      let i = 0;
      const tick = () => {
        if (i >= chars.length) { done && done(); return; }
        el.textContent += chars[i++];
        this._scrollBottom();
        setTimeout(tick, 9 + Math.random() * 18);
      };
      tick();
    }

    _addUserMsg(text) {
      const wrap = document.createElement('div');
      wrap.className = 'roro-msg roro-msg--user';
      wrap.innerHTML = `
        <div class="roro-bubble">${this._esc(text)}</div>
        <div class="roro-timestamp">${this._now()}</div>
      `;
      this._chatEl.appendChild(wrap);
      this._scrollBottom();
    }

    _addSeparator() {
      const sep = document.createElement('div');
      sep.className   = 'roro-separator';
      sep.textContent = this._today();
      this._chatEl.appendChild(sep);
    }

    /* ──────────────────────────────────────────────────
       NAVIGATION  (unchanged)
    ────────────────────────────────────────────────── */

    _go(pageId) {
      if (typeof window.navigateTo === 'function') window.navigateTo(pageId);
    }

    /* ──────────────────────────────────────────────────
       UTILITIES  (unchanged)
    ────────────────────────────────────────────────── */

    _currentPage() {
      const active = document.querySelector('.page.active');
      if (!active) return 'home';
      return active.id.replace('page-', '') || 'home';
    }

    _parseName(input) {
      const cleaned = input
        .replace(/^(i am|i'm|im|my name is|call me|it's|its|they call me|name's|names|just|it is)\s+/i, '')
        .replace(/[^a-zA-Z\s'-]/g, '')
        .trim();
      const words = cleaned.split(/\s+/).slice(0, 2);
      return words.map(w => w ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : '').join(' ').trim() || 'friend';
    }

    _scrollBottom() {
      requestAnimationFrame(() => { this._chatEl.scrollTop = this._chatEl.scrollHeight; });
    }

    _now() {
      return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    _today() {
      return new Date().toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
    }

    _esc(str) {
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

  } /* end class RoRoManager */

  /* ═══════════════════════════════════════════════════════
     § 11 — EXPORT & AUTO-INITIALISATION
  ═══════════════════════════════════════════════════════ */

  window.RoRoManager = RoRoManager;

  document.addEventListener('DOMContentLoaded', () => {
    window.roro = new RoRoManager();
  });

})(); /* end IIFE */
