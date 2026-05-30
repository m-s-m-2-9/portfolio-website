/* ═══════════════════════════════════════════════════════════════════
   admin-control/pages/profiles.js
   ───────────────────────────────────────────────────────────────────
   WHAT THIS FILE DOES:
   Controls the external profile / social media links shown on
   the "Profiles / Digital Presence" page.

   HOW TO ADD A PROFILE:
   Copy any existing object and paste it at the bottom of the array.
   Change the id, icon, label, and url.

   icon — can be any emoji, or a 2–3 letter abbreviation string.
═══════════════════════════════════════════════════════════════════ */

window.ADMIN_PROFILES = {

  sectionLabel: '05 — Digital Presence',
  heading     : 'Find me around\nthe internet.',  /* \n = line break */

  /* ── Profile Links Array ────────────────────────────────────────── */
  links: [
    {
      id    : 'linkedin',
      icon  : '<svg xmlns="http://w3.org" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:24px;height:24px;"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>',
      label : 'LinkedIn',
      handle: '@manomay-shailendra-misra',            
      url   : 'https://linkedin.com',           
    },
    {
      id    : 'github',
      icon  : '<svg xmlns="http://w3.org" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:24px;height:24px;"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>',
      label : 'GitHub',
      handle: '@m-s-m-2-9',
      url   : 'https://github.com/m-s-m-2-9',
    },
    {
      id    : 'instagram',
      icon  : '<svg xmlns="http://w3.org" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:24px;height:24px;"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>',
      label : 'Instagram',
      handle: '@m_s_m_2_9',
      url   : 'https://www.instagram.com/m_s_m_2_9/',           
    },
    {
      id    : 'whatsapp',
      icon  : '<svg xmlns="http://w3.org" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:24px;height:24px;"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>',
      label : 'WhatsApp',
      handle: 'Offline / Paused',
      url   : 'javascript:void(0);',
    },
    {
      id    : 'copy-url',
      icon  : '<svg xmlns="http://w3.org" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:24px;height:24px;"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',
      label : 'Share Portfolio',
      handle: 'Click to Copy Link',
      url   : 'javascript:navigator.clipboard.writeText("https://github.io").then(() => { alert("Portfolio link copied to clipboard!"); });',
    },
  ],

};
