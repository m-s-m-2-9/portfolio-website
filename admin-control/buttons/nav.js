/* ═══════════════════════════════════════════════════════════════════
   admin-control/buttons/nav.js
   ───────────────────────────────────────────────────────────────────
   WHAT THIS FILE DOES:
   Controls which pages appear in the DESKTOP top navigation bar
   and which appear in the MOBILE hamburger menu.

   Desktop nav order:
   MSM → [desktopLinks] → | → controls → | → hamburger

   Sidebar-only pages (not in desktop nav):
   Photos, Journey, Clock, Lists, Thoughts, Games
   These appear only inside the sidebar hamburger panel.
   ───────────────────────────────────────────────────────────────────
   HOW TO EDIT:
   · To reorder links: change the order of objects in the array.
   · To rename a link: change 'label'.
   · To add a page: add a new object with page: 'your-page-id'.
     The page ID must match navigateTo('YOUR-ID') in main.js.
═══════════════════════════════════════════════════════════════════ */

window.ADMIN_NAV = {

  /* ── Desktop Top Navigation (visible on ≥1024px) ─────────────── */
  desktopLinks: [
    { label: 'Home',     page: 'home'     },
    { label: 'Identity', page: 'about'    },
    { label: 'Social',   page: 'social'   },
    { label: 'Projects', page: 'projects' },
    { label: 'Profile',  page: 'profiles' },
    { label: 'CV',       page: 'resume'   },
    { label: 'Contact',  page: 'contact'  },
  ],

  /* ── Mobile Navigation (inside hamburger menu on mobile) ──────── */
  mobileLinks: [
    { label: 'Home',     page: 'home'     },
    { label: 'Identity', page: 'about'    },
    { label: 'Social',   page: 'social'   },
    { label: 'Projects', page: 'projects' }, 
    { label: 'Profiles', page: 'profiles' },
    { label: 'CV',       page: 'resume'   },  
    { label: 'Contact',  page: 'contact'  },
    
    { label: 'Photos',   page: 'photos'   },
    { label: 'Traits',   page: 'skills'   },
    { label: 'Journey',  page: 'journey'  },
    { label: 'Clock',    page: 'birthday' }, 
    { label: 'Lists',    page: 'lists'    },
    { label: 'Thoughts', page: 'thoughts' },
    { label: 'Games',    page: 'games'    },
    
    
  ],

  /* ── Sidebar Panel (desktop only, opened by hamburger) ──────────
     These match CFG.PAGES in sidebar-controller.js.
     Do not change order here without also changing it there.
  ─────────────────────────────────────────────────────────────────*/
  sidebarLinks: [
    { label: 'Traits',   page: 'skills', num:   '07' },
    { label: 'Photos',   page: 'photos',   num: '08' },
    { label: 'Journey',  page: 'journey',  num: '09' },
    { label: 'Clock',    page: 'birthday', num: '10' },
    { label: 'Lists',    page: 'lists',    num: '11' },
    { label: 'Thoughts', page: 'thoughts', num: '12' },
    { label: 'Games',    page: 'games',    num: '13' },
  ],

};
