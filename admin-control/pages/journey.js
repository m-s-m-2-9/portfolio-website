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
  body      : 'By 2011, the fog had finally started clearing. This was the year my memories truly began to exist. At the end of 2010, we had moved from Mumbai to Jaipur, and somewhere between that shift, my mind slowly switched on like an old television warming up after being plugged in.\n\nI started going to a preschool called Star Kids. Life was incredibly simple back then, almost suspiciously peaceful when I think about it now. Our house had a jail-bar styled window that should have looked restrictive, yet the entire atmosphere around it felt strangely comforting. There was no stress. No pressure. Mornings belonged to school uniforms and sleepy walks to class, afternoons belonged to old 90s songs playing softly on the radio, and evenings belonged to homework notebooks spread across the floor while daylight slowly disappeared outside.\n\nSometimes my father would drop me to school on his bike, and sometimes I walked there myself. I still remember going to D-Mart with him, sitting squeezed between grocery bags on that single bike while the city passed around us. At that age, nothing felt embarrassing, difficult, or complicated. Even ordinary moments carried a strange kind of warmth.\n\nI was an extremely talkative child who could never sit still for more than two minutes. I danced to everything — party songs, sad songs, romantic songs — none of it mattered. If music existed, I was already moving. I asked endless questions about almost everything around me, as if the world was some giant mystery personally designed for me to investigate. Most of the children around me were older, so I grew up trying to keep up with them instead of staying inside my own age group. Somehow, the older didis around me absolutely adored me too. Maybe it was the nonstop talking, maybe the dancing, or maybe I was just a dangerously charming child with zero awareness of it.\n\nTelevision became another small universe of its own. Doraemon and Shinchan practically ruled my afternoons, while shows like Ben 10, Dragon Ball Z, or Chhota Bheem never really interested me the way they did for everyone else. I remember doing mathematics homework seriously back then, which feels deeply ironic now considering how much I absolutely hate the subject today.\n\nLooking back, 2011 feels calm. Safe. Warm. Even if life had difficulties hidden somewhere in the background, my family never allowed them to reach me. I was simply a curious, energetic, dreamy child searching for attention, dancing through rooms, talking endlessly, and unknowingly building the personality I would carry for years to come.',

  hasContent: true,
  private   : false,
},


{
 year      : 2012,
 title     : 'A Tiny Crush & a Dusty Fall.',
 body      :   'By 2012, Jaipur no longer felt unfamiliar. Life had settled into routines, and childhood had started becoming clearer, louder, and far more memorable. I was still studying at Star Kids, and strangely enough, mathematics had become my strongest subject. I used to score full marks constantly — 40 out of 40 almost every time — and the questions felt so easy that I genuinely started wondering whether I had accidentally been placed in the wrong class. Eventually, I was promoted directly from LKG to UKG, which, at that age, felt less like an academic achievement and more like proof that I was secretly some tiny genius wandering around in a school uniform.\\n\\nI barely remember my teachers now except for faint flashes of the principal, but I definitely remember being known around school. I was energetic, loud, constantly involved in something, and weirdly popular for one very specific reason that shall remain classified forever. Dance performances, sports competitions, school activities — I jumped into everything with full confidence and somehow managed to conquer most of it. Sitting quietly was never really an option for me.\\n\\nFragments of old classmates still survive in my memory like scattered names written on the last pages of a forgotten notebook — Poorvi, Anjali, Ram, Saurabh, and many others I can no longer fully remember. Some faces faded with time, but the feeling of those school years never really disappeared.\\n\\nAnd then there was my first crush, which still sounds absolutely ridiculous considering I was barely four or five years old. One day while walking back home from school with my mother, I randomly asked her, “Mummy, once I grow up, you’ll have to find a bride for me, right?” She casually said yes. With the confidence of a man who apparently had his entire future planned already, I proudly announced, “No need mummy, I already found her.” Immediately after delivering this historic statement, I ran away in embarrassment like my life depended on it. Unfortunately, destiny had other plans. Before reaching home, I fell straight onto the dusty road and earned the kind of scraped injury every child remembers — the burning, sandy pain where your skin feels completely shredded for days afterward. Childhood romance lasted approximately thirty seconds before gravity personally intervened.\\n\\nOutside school, one of my favorite places in the world was Nehru Garden. To reach it, we crossed the sabji mandi and the railway crossing before finally arriving there. Even though it was close to home, visiting it only once a week somehow made it feel magical. That park felt enormous to me back then, almost like another universe hidden inside Jaipur.\\n\\nTechnology barely existed in my life during those years. No phones, no computers, no gaming obsession, nothing. I did not even know devices could be used for entertainment. My world was built from school corridors, dance stages, evening walks, playground dust, radio songs, and imagination. Looking back now, it feels beautifully untouched.',
 hasContent: true, 
 private : false,
},

     { 
        
        year        : 2013,
        title       : 'The Boy Who Kept Dancing.',
        body        : '2013 was my final year at Star Kids, and by then I had fully transformed into the child everyone in school seemed to recognize instantly. Studies still felt ridiculously easy to me. Mischief was practically part of my personality, yet somehow my talent constantly saved me from punishments. I talked too much, created chaos wherever I went, participated in almost everything possible, and still somehow remained a teacher’s favorite. Looking back now, I honestly have no idea how I managed that balance.\\n\\nSchool events had slowly started becoming my territory. Fancy dress competitions turned into full performances rather than simple costumes. One day I became Gandhi, another day Krishna, and somehow at one point even a lotus flower. I danced everywhere I could. Annual functions, competitions, performances — if there was a stage, I wanted to be on it. Songs like Chammak Challo and Lungi Dance completely ruled that phase of my life, and apparently those performances became memorable enough for my family to still talk about them years later.\\n\\nOne particular moment stayed frozen in everyone’s memory. During a performance, my scarf suddenly fell off in the middle of the stage. Most children would have panicked or stopped dancing, but I simply ignored it and continued performing like nothing had happened. The audience erupted into cheers, and somehow that tiny moment accidentally became one of my earliest “main character” memories. I rarely remember standing anywhere except first place back then. Winning had quietly started feeling normal.\\n\\nOutside school, life still carried that warm Jaipur atmosphere I had grown attached to. Frequent power cuts would throw the entire neighborhood into darkness, creating a strange mix of chaos and beauty at the same time. Those evenings felt alive in a way modern life rarely does now. I never properly learned how to fly kites myself, but I loved standing beside the older neighborhood boys while they controlled them in the sky. My job was usually holding the chakri while watching the battles happening far above the rooftops.\\n\\nOne of my most prized possessions was a huge pink water bottle shaped almost like a tank. That thing was practically indestructible. I desperately wanted one of the newer steel bottles everyone else carried, but my parents refused until the old one broke. Eventually, childhood logic took over and I decided to solve the problem personally by trying to destroy it myself.\\n\\nThat year also planted one of my earliest serious questions about faith. I remember my parents organizing a yagya after some strange-looking pandit insisted it was necessary. He demanded a large amount of money even though almost everything was arranged and handled by my own family while he mostly sat in one place reciting phrases I could not even understand properly. Somewhere during that experience, my tiny brain started questioning things for the first time. If God truly wanted people to work hard, do good karma, and live honestly, then why did devotion sometimes feel so dependent on expensive rituals, endless effort, and fear? It was probably the first moment in my life where blind belief stopped feeling automatic.\\n\\nLooking back now, 2013 feels loud, dramatic, playful, and strangely important. It was the year I realized I loved attention, loved performing, loved making people react, and perhaps most importantly, loved asking questions even when adults did not always have answers.',
        hasContent  : true,
        private     : false,
     
     },

{
  year      : 2014,
  title     : 'The Boy Who Looked at Stars.',
  body      : '2014 marked the beginning of my Kendriya Vidyalaya journey, a journey that would continue for years afterward. My first school there was Kendriya Vidyalaya Number 1 Jaipur, and even today my memories of those early KV years feel strangely blurred together. Sometimes I still get confused trying to remember which events belonged to which school or which year. It almost feels like my brain switched off again after the vivid memories of Star Kids.\\n\\nThe school itself felt enormous compared to everything I had experienced before. Yet I never really missed Star Kids. Kendriya Vidyalaya brought new opportunities, and I wanted to try everything it offered. This was the first time I started learning instruments properly. I learned harmonium, congo, ragas, school songs, and performances that slowly became part of my everyday life. Fancy dress competitions and playful chaos had now transformed into EVS projects, mathematics posters, assemblies, discipline, and structured activities. Childhood was slowly becoming more organized.\\n\\nMy uniform had changed too. Gone were the bib-like jumpsuits from preschool days. Now it was grey shorts, a red-white-blue checkered shirt, a KV logo belt, and polished black shoes that somehow made me feel older than I actually was. Every morning I waited for the school van to arrive, carrying me toward this giant new world that felt far more serious than the tiny comforting universe of Star Kids.\\n\\nAcademically, mathematics still felt unbelievably easy to me, almost like a game rather than a subject. But gradually my favorite subject shifted toward EVS because for the first time studies actually felt connected to the real world. Science, society, politics, nature — everything started making sense in a way I had never noticed before. It no longer felt like memorizing random things from textbooks. It felt useful. Real.\\n\\nThe teachers, however, were extremely strict. I could no longer behave like the endlessly chaotic child I had been earlier. Discipline became unavoidable. I sat on the front bench constantly because teachers were already annoyed enough by my nonstop energy. Still, even within those rules, I found ways to stay creative. I performed in choir groups, played congo during functions, and continued participating in anything involving music or performance.\\n\\nSome of my strangest childhood habits also belonged to this year. For reasons even I cannot explain properly today, I absolutely loved eating chalk and licking the iron mesh on windows because of its metallic taste. Deeply unhygienic? Completely. But childhood logic rarely follows health guidelines.\\n\\nAt home, life still carried a comforting rhythm. I often sat in the kitchen while my mother cooked food, proudly reciting English poems and textbook stories to her as if I were performing inside some grand auditorium instead of a small kitchen. Cartoons still ruled my free time, and evenings remained simple in the best possible way.\\n\\nBut perhaps the most important memory from 2014 was my obsession with stars. Whenever I got time, I simply stared at the night sky wondering if one day I would somehow reach there myself. Later, I would learn how impossibly far stars actually are, millions of light years away from us. Yet even after understanding that distance, a strange part of me still believes I will reach them someday. Maybe not physically, maybe not scientifically, but somehow, in some form, I still will.',
  
  hasContent: true,
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
