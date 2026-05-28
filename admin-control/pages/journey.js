/* ═══════════════════════════════════════════════════════════════════
   admin-control/pages/journey.js
   ───────────────────────────────────────────────────────────────────
   WHAT THIS FILE DOES:
   Controls the JOURNEY / TIMELINE page.
   Each year has a title and a body paragraph.

   HOW TO ADD A YEAR:
   Add a new object to the 'years' array following the pattern below.

   HOW IT WORKS:
   · Each year appears as a dot on the horizontal timeline.
   · Clicking a dot reveals the title + body text below.
   · Years with hasContent: false show a placeholder message.
   ───────────────────────────────────────────────────────────────────
   PRIVATE ENTRIES:
   Any entry with  private: true  is only shown after password unlock.
   Set its body text in the normal 'body' field — it is hidden by
   the password gate, not stored separately.
═══════════════════════════════════════════════════════════════════ */

window.ADMIN_JOURNEY = {

  sectionLabel      : '09 — Journey',
  heading           : '2008 to present.',
  subheading        : 'Click a year on the timeline to explore that chapter.',
  emptyPlaceholder  : 'Nothing recorded yet for this year.',

  /* ── Timeline Years ─────────────────────────────────────────────── */
  years: [

    {
      year      : 2008,
      title     : 'The Beginning.',
      body      : `I arrived in Mumbai before I even understood what a beginning meant. While most babies announced themselves to the world with tears and panic, I apparently decided to do the exact opposite. They say I smiled. Laughed, even. A strange little creature entering the world as if life was already some private joke only he understood. Ever since then, the nickname “Manu” stayed stitched to me like an old family tradition, surviving years, cities, and growing up.

I do not remember the house I lived in back then. I do not remember the walls, the streets, or the sound of that neighborhood. My memories begin much later, as if my mind took time to switch on properly. The year exists more through stories than recollection, through fragments told by others instead of scenes I can replay myself. Yet somewhere in Mumbai, in a room I no longer remember, the first page of my story quietly began.`,
      hasContent: true,
      private   : false,
    },

    {
      year      : 2009,
      title     : 'The Boy Made of Cardboard Worlds.',
      body      : `
Mumbai was still home, though I remember it less as a place and more as a faded atmosphere that existed before memory fully learned how to hold shape. These years survive through stories told at family gatherings, through laughter in between conversations, through old boxes that probably still carry photographs no one has properly unpacked in years.

Apparently, I was not the quiet kind of child. I was sharp, curious, and just mischievous enough to keep everyone alert. The sort of kid who could turn ordinary afternoons into chaos without even trying. Yet there was something strangely simple about me too. While other children were surrounded by flashy toys, I found entire worlds inside empty cardboard boxes and used matchboxes. A small box could become a car, a building, a spaceship, or some mysterious machine only my imagination understood.

Even though I was born in 2008, there was something oddly old-school about the way I grew up. Before algorithms, before constant screens, before childhood became filtered through tablets and notifications, there were just random objects, imagination, and long hours of making stories out of nothing. I danced whenever music played, without caring who was watching. Somewhere in those tiny rented rooms and crowded Mumbai spaces, a loud little child was unknowingly building the first version of himself.
`,
      hasContent: true,
      private   : false,
    },

    {
      year      : 2010,
      title     : 'Blurred Years & Packed Suitcases.',
      body      : 'By 2010, life still felt like an unfinished sketch. The memories remain blurry, almost inaccessible, like trying to remember a dream after waking up too quickly. I cannot recall the streets of Mumbai clearly, nor the exact homes we lived in. What remains instead is a strange emotional texture — movement, packed belongings, old phones filled with forgotten pictures, cartons shifting from one city to another without ever being fully opened. My childhood did not revolve around expensive things. It revolved around curiosity. Empty boxes became treasures. Matchboxes became toys. Ordinary household objects became entire universes inside my head. Looking back now, it feels strangely beautiful. There was no pressure to be aesthetic, productive, or perfect. Childhood was simply lived. I have seen very few photographs from those years, and the funny part is that most of them apparently feature baby-me existing without a single concern in the world, proudly unaware of concepts like embarrassment or future dignity. Somewhere, hidden in old storage boxes or sleeping inside broken phones nobody charges anymore, those moments probably still exist. Tiny frozen fragments of a boy who knew nothing about the future waiting for him. The world around me was changing quickly, but my own little universe was still innocent, loud, playful, and wonderfully unaware. Those years may be difficult to remember clearly, yet they remain important because they built the foundations of everything that came later.',
      hasContent: true,
      private   : false,
    },

    {
      year      : 2011,
      title     : 'The Year My Mind Switched On.',
      body      : 'By 2011, the fog had finally started clearing. This was the year my memories truly began to exist. At the end of 2010, we had moved from Mumbai to Jaipur, and somewhere between that shift, my mind slowly switched on like an old television warming up after being plugged in.\n I started going to a preschool called Star Kids. Life was incredibly simple back then, almost suspiciously peaceful when I think about it now. Our house had a jail-bar styled window that should have looked restrictive, yet the entire atmosphere around it felt strangely comforting. There was no stress. No pressure. Mornings belonged to school uniforms and sleepy walks to class, afternoons belonged to old 90s songs playing softly on the radio, and evenings belonged to homework notebooks spread across the floor while daylight slowly disappeared outside.\n Sometimes my father would drop me to school on his bike, and sometimes I walked there myself. I still remember going to D-Mart with him, sitting squeezed between grocery bags on that single bike while the city passed around us. At that age, nothing felt embarrassing, difficult, or complicated. Even ordinary moments carried a strange kind of warmth.\n I was an extremely talkative child who could never sit still for more than two minutes. I danced to everything — party songs, sad songs, romantic songs — none of it mattered. If music existed, I was already moving. I asked endless questions about almost everything around me, as if the world was some giant mystery personally designed for me to investigate. Most of the children around me were older, so I grew up trying to keep up with them instead of staying inside my own age group. Somehow, the older didis around me absolutely adored me too. Maybe it was the nonstop talking, maybe the dancing, or maybe I was just a dangerously charming child with zero awareness of it.\n Television became another small universe of its own. Doraemon and Shinchan practically ruled my afternoons, while shows like Ben 10, Dragon Ball Z, or Chhota Bheem never really interested me the way they did for everyone else. I remember doing mathematics homework seriously back then, which feels deeply ironic now considering how much I absolutely hate the subject today. \n Looking back, 2011 feels calm. Safe. Warm. Even if life had difficulties hidden somewhere in the background, my family never allowed them to reach me. I was simply a curious, energetic, dreamy child searching for attention, dancing through rooms, talking endlessly, and unknowingly building the personality I would carry for years to come.
',
      hasContent: true,
      private   : false,
    },

    {
      year      : 2012,
      title     : 'Year Four.',
      body      : '',
      hasContent: false,
      private   : false,
    },

    {
      year      : 2013,
      title     : 'Year Five.',
      body      : '',
      hasContent: false,
      private   : false,
    },

    {
      year      : 2014,
      title     : 'Year Six.',
      body      : '',
      hasContent: false,
      private   : false,
    },

    {
      year      : 2015,
      title     : 'Year Seven.',
      body      : '',
      hasContent: false,
      private   : false,
    },

    {
      year      : 2016,
      title     : 'Year Eight.',
      body      : '',
      hasContent: false,
      private   : false,
    },

    {
      year      : 2017,
      title     : 'Year Nine.',
      body      : '',
      hasContent: false,
      private   : false,
    },

    {
      year      : 2018,
      title     : 'Year Ten.',
      body      : '',
      hasContent: false,
      private   : false,
    },

    {
      year      : 2019,
      title     : 'Year Eleven.',
      body      : '',
      hasContent: false,
      private   : false,
    },

    {
      year      : 2020,
      title     : 'The Lockdown Year.',
      body      : `Replace this with your 2020 story — what happened to you during lockdown?`,
      hasContent: false,
      private   : false,
    },

    {
      year      : 2021,
      title     : 'Year Thirteen.',
      body      : '',
      hasContent: false,
      private   : false,
    },

    {
      year      : 2022,
      title     : 'Year Fourteen.',
      body      : '',
      hasContent: false,
      private   : false,
    },

    {
      year      : 2023,
      title     : 'Year Fifteen.',
      body      : '',
      hasContent: false,
      private   : false,
    },

    {
      year      : 2024,
      title     : 'ISKCON. Nationals. Things built.',
      body      : `Led 40+ students at ISKCON Summer Camp as Creative Educator and Media Coordinator. Competed at Nationals. Built the first real projects. This year was the beginning of something.`,
      hasContent: true,
      private   : false,
    },

    {
      year      : 2025,
      title     : 'Building in public.',
      body      : `Replace this with your 2025 story.`,
      hasContent: true,
      private   : false,
    },

    {
      year      : 2026,
      title     : 'Right now.',
      body      : `This is where you are. Replace this with what is happening today.`,
      hasContent: true,
      private   : false,
    },

  ],

};
