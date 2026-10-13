import type { CSSProperties } from 'react';

export interface MediaItem {
  type: 'video' | 'image';
  src: string;
  thumbnail?: string;
  alt: string;
}

export interface MediaSection {
  name: string;
  subtitle?: string;
  media: MediaItem[];
}

export interface ProjectLink {
  label: string;
  href: string;
}

/** Colours and typefaces taken from each project's own product. */
export interface ProjectTheme {
  bg: string;
  surface: string;
  ink: string;
  soft: string;
  accent: string;
  onAccent: string;
  line: string;
  display: string;
  body: string;
  /** Corner radius used for buttons and panels on the page */
  radius: string;
}

/** How the project appears as a band on the home page and in "next project" links. */
export interface ProjectBand {
  bg: string;
  ink: string;
  soft: string;
  /** Extra CSS applied to the project name (letter-spacing, case, weight) */
  nameStyle?: CSSProperties;
  logo?: string;
  /** Extra CSS for the logo (rounded corners for app icons, pixelated scaling for pixel art) */
  logoStyle?: CSSProperties;
  /** Photo behind the band. `bg` is drawn over it, so make `bg` a gradient that keeps the text readable. */
  image?: string;
}

/** Which section of the site the project sits in */
export type ProjectCategory = 'game' | 'app' | 'website';

/** The site's sections, each with its own page of tiles (/games, /apps, /websites) */
export const sections: { category: ProjectCategory; slug: string; title: string; intro: string }[] = [
  { category: 'game', slug: 'games', title: 'Games', intro: 'Free to play in your browser. Pick one and jump straight in.' },
  { category: 'app', slug: 'apps', title: 'Apps', intro: 'Apps for iPhone and Chrome, and the app that drives my robot.' },
  { category: 'website', slug: 'websites', title: 'Websites', intro: 'Sites I designed, built and run.' },
];

export function sectionOf(category: ProjectCategory) {
  return sections.find((s) => s.category === category)!;
}

/** What a click on a project's tile does, shown as a badge on the thumbnail */
export type TileAction = 'play' | 'visit' | 'download';

/** How a project appears as a tile in its section. */
export interface ProjectTile {
  /** Where a click on the tile goes. Without one, it opens the project's page (or its externalUrl). */
  href?: string;
  action?: TileAction;
  /** Not playable right now: the badge says CLOSED or IN DEVELOPMENT */
  status?: 'closed' | 'in-development';
  /** 16:9 picture for the tile */
  thumbnail: string;
  /** What the project is about, shown on the thumbnail */
  blurb: string;
}

export interface Project {
  slug: string;
  name: string;
  /** One line shown under the name */
  tagline: string;
  /** What kind of thing it is, in plain words */
  kind: string;
  category: ProjectCategory;
  tile: ProjectTile;
  /** When set, the project has no page here and links straight out */
  externalUrl?: string;
  theme: ProjectTheme;
  band: ProjectBand;
  about: string[];
  stack: string[];
  /** Label for the stack row when "Built with" doesn't fit */
  stackLabel?: string;
  /** Shorter name for the project switcher */
  short?: string;
  links: ProjectLink[];
  githubRepos?: ProjectLink[];
  mediaSections?: MediaSection[];
}

const siegeCinematics = [
  '2021.09.29 - 00.58.42.88',
  '2021.09.29 - 00.59.12.91',
  '2021.09.29 - 01.00.46.15',
  '2021.09.29 - 01.01.08.85',
  '2021.09.29 - 01.02.55.91',
  '2021.09.29 - 01.03.05.15',
  '2021.10.23 - 21.39.57.53',
  '2021.10.30 - 01.46.02.17',
  '2021.10.31 - 18.51.38.56',
  '2021.10.31 - 19.00.37.90',
  '2021.10.31 - 19.01.03.81',
  '2021.10.31 - 22.52.34.95',
].map<MediaItem>((stamp) => ({
  type: 'image',
  src: `/siege/cinematics/Badlion Client Screenshot ${stamp}.webp`,
  alt: 'Siege cinematic',
}));

const video = (src: string, alt: string): MediaItem => ({ type: 'video', src, alt });

export const projects: Project[] = [
  /* Games */
  {
    slug: 'reelearth',
    name: 'ReelEarth',
    tagline: 'Fish the world\'s landmarks with friends.',
    kind: 'Multiplayer game',
    category: 'game',
    tile: {
      href: 'https://reelearth.vercel.app/',
      action: 'play',
      thumbnail: '/projects/reelearth/thumb.webp',
      blurb: 'A cozy multiplayer fishing game on miniature famous places, from the Statue of Liberty to the pyramids. Fish and hang out with friends.',
    },
    theme: {
      bg: '#0D1A25',
      surface: '#15283A',
      ink: '#F4EFE5',
      soft: '#AEB4B1',
      accent: '#F0B45C',
      onAccent: '#0D1A25',
      line: '#2A3B4A',
      display: 'var(--font-young-serif), Georgia, serif',
      body: 'var(--font-figtree), ui-sans-serif, system-ui, sans-serif',
      radius: '12px',
    },
    band: {
      bg: 'linear-gradient(90deg, rgba(13,26,37,0.96) 0%, rgba(13,26,37,0.85) 45%, rgba(13,26,37,0.35) 100%)',
      ink: '#F4EFE5',
      soft: 'rgba(244,239,229,0.82)',
      logo: '/projects/reelearth/logo.png',
      image: '/projects/reelearth/islands/liberty.webp',
    },
    about: [
      'ReelEarth is a cozy multiplayer fishing game in the browser, set on **sixteen** low-poly miniatures of famous places: the Statue of Liberty, the pyramids of Giza, the Eiffel Tower, the Taj Mahal and more. Everyone on an island shares its sky, tide and weather, so you fish, chat and hang out together.',
      'Each island has its own landmark, islanders, food stall and **legendary fish**. Fish fight differently, as runners, jumpers, divers or thrashers; feeding frenzies bring fast bites for everyone, and a legendary catch sets off fireworks over the whole island. Coins, your fish room and cosmetics travel with you.',
      'Every island\'s time of day comes from **one shared sun** and its real longitude, and the travel map is a low-poly **globe** that shows the same day and night. Sailing flies you along the great circle to the next island. It is drawn in **Three.js**, multiplayer runs on **Supabase Realtime**, and the music and sound are generated in the browser.',
    ],
    stack: ['JavaScript', 'Three.js', 'Supabase Realtime', 'Web Audio'],
    links: [{ label: 'Play ReelEarth', href: 'https://reelearth.vercel.app/' }],
  },
  {
    slug: 'dungeon-style',
    name: 'DungeonStyle',
    tagline: 'You choose when to strike. Your fighter defends on its own.',
    kind: 'Browser game',
    category: 'game',
    tile: {
      href: 'https://dungeon-style.vercel.app/',
      action: 'play',
      thumbnail: '/projects/dungeon-style/thumb.webp',
      blurb: 'A physics-driven 3D brawler. Pick when to strike while your fighter defends itself, through a gauntlet of arenas and giant bosses.',
    },
    theme: {
      bg: '#111216',
      surface: '#1A1C22',
      ink: '#F2EDE2',
      soft: '#A39E94',
      accent: '#FFD36B',
      onAccent: '#111216',
      line: '#2B2D35',
      display: 'var(--font-figtree), ui-sans-serif, system-ui, sans-serif',
      body: 'var(--font-figtree), ui-sans-serif, system-ui, sans-serif',
      radius: '10px',
    },
    band: {
      bg: 'linear-gradient(90deg, rgba(17,18,22,0.96) 0%, rgba(17,18,22,0.85) 45%, rgba(17,18,22,0.3) 100%)',
      ink: '#F2EDE2',
      soft: 'rgba(242,237,226,0.82)',
      nameStyle: { fontWeight: 800, letterSpacing: '-0.02em' },
      logo: '/projects/dungeon-style/logo.png',
      image: '/projects/dungeon-style/arenas/colosseum.webp',
    },
    about: [
      'DungeonStyle is a 3D low-poly brawler where the combat is automatic and physics-driven: **you only choose when and how to attack**, and your fighter blocks, ducks, weaves and counters on its own. Punches, kicks and weapon blows land on simulated bodies, so hits snap heads back, fold fighters over and knock them off their feet.',
      'It is a roguelike gauntlet of one-on-one fights. Every round is a new arena and a tougher opponent, across **seven arenas**: a boxing ring, the street, a grocery store, a warehouse fight club, a biker bar, a dojo and a rooftop at night. Every fourth round is a **boss** in the colosseum: the Champion, the Minotaur or the Cyclops. KOs pay coins for armour that changes your stats and shows on your fighter.',
      'Each arena has its own weapons lying around, from a folding chair and a frying pan to a katana and a battle axe, and each one is swung the way it really is. It is built in **TypeScript** with **Three.js** and the **Rapier** physics engine, and every sound is generated in the browser.',
    ],
    stack: ['TypeScript', 'Three.js', 'Rapier physics', 'Vite', 'Web Audio'],
    links: [
      { label: 'Play DungeonStyle', href: 'https://dungeon-style.vercel.app/' },
      { label: 'GitHub', href: 'https://github.com/Wryz/Dungeon-Style' },
    ],
    mediaSections: [
      {
        name: 'Fight clips',
        media: [
          {
            type: 'video',
            src: '/projects/dungeon-style/clips/street-brawler.mp4',
            thumbnail: '/projects/dungeon-style/clips/street-brawler.webp',
            alt: 'Round 2 on the street against the Brawler',
          },
          {
            type: 'video',
            src: '/projects/dungeon-style/clips/street-brawler-2.mp4',
            thumbnail: '/projects/dungeon-style/clips/street-brawler-2.webp',
            alt: 'Round 2 on the street, another fight with the Brawler',
          },
          {
            type: 'video',
            src: '/projects/dungeon-style/clips/grocery-kicker.mp4',
            thumbnail: '/projects/dungeon-style/clips/grocery-kicker.webp',
            alt: 'Round 3 in the grocery store against the Kicker',
          },
          {
            type: 'video',
            src: '/projects/dungeon-style/clips/bar-brawler.mp4',
            thumbnail: '/projects/dungeon-style/clips/bar-brawler.webp',
            alt: 'Round 6 in the biker bar against the Brawler',
          },
          {
            type: 'video',
            src: '/projects/dungeon-style/clips/bar-boxer.mp4',
            thumbnail: '/projects/dungeon-style/clips/bar-boxer.webp',
            alt: 'Round 6 in the biker bar against The Boxer',
          },
        ],
      },
    ],
  },
  {
    slug: 'hex-hordes',
    name: 'Hex Hordes',
    tagline: 'Play your cards, read the land, topple the castle.',
    kind: 'Browser game',
    category: 'game',
    tile: {
      href: 'https://www.hexhordes.com',
      action: 'play',
      thumbnail: '/projects/hex-hordes/thumb.webp',
      blurb: 'A fantasy strategy card game on a 3D hex battlefield. Play your troops, read the land and topple the enemy castle.',
    },
    theme: {
      bg: '#B3E1FF',
      surface: '#0F172A',
      ink: '#0F172A',
      soft: '#334155',
      accent: '#F59E0B',
      onAccent: '#0F172A',
      line: '#7FC4EE',
      display: 'var(--font-dynapuff), ui-rounded, system-ui, sans-serif',
      body: 'var(--font-fredoka), ui-rounded, system-ui, sans-serif',
      radius: '12px',
    },
    band: {
      bg: '#B3E1FF',
      ink: '#0F172A',
      soft: '#334155',
      nameStyle: { fontWeight: 700 },
      logo: '/projects/hex-hordes/logo.png',
    },
    about: [
      'A turn-based strategy card game on a 3D hexagonal battlefield. Your troops are cards: bring four into each battle, deploy them beside your castle, and use the terrain to bring down the enemy\'s castle before it brings down yours.',
      'The campaign runs **150 battles** across **15 regions**, against **50 monsters** in ten factions, each with its own boss. Twelve card bonds, tactic cards and signature abilities reward building a deck rather than massing troops, and coins from each win buy and upgrade cards.',
      'The battlefield is rendered with **Three.js** and React Three Fiber. Progress saves in the browser, and a service worker keeps the game playable **offline** after one visit.',
    ],
    stack: ['Next.js', 'TypeScript', 'Three.js', 'React Three Fiber', 'Tailwind CSS'],
    links: [
      { label: 'Play at hexhordes.com', href: 'https://www.hexhordes.com' },
      { label: 'GitHub', href: 'https://github.com/Wryz/world-war-hex' },
    ],
  },
  {
    slug: 'brain-benchmark',
    name: 'Brain Benchmark',
    tagline: 'Brain games to test your mental fitness.',
    kind: 'Browser game',
    category: 'game',
    tile: {
      href: 'https://brain-benchmark.com/',
      action: 'play',
      thumbnail: '/projects/brain-benchmark/thumb.webp',
      blurb: 'Quick tests of reaction time, memory, attention and reasoning. Set a score and see how you rank against everyone.',
    },
    theme: {
      bg: '#F6F8FF',
      surface: '#FFFFFF',
      ink: '#1E293B',
      soft: '#56627A',
      accent: '#667EEA',
      onAccent: '#FFFFFF',
      line: '#DBE3F5',
      display: 'var(--font-fredoka), ui-rounded, system-ui, sans-serif',
      body: 'var(--font-fredoka), ui-rounded, system-ui, sans-serif',
      radius: '16px',
    },
    band: {
      bg: 'linear-gradient(135deg, #667EEA 0%, #764BA2 55%, #0E91AD 100%)',
      ink: '#FFFFFF',
      soft: 'rgba(255,255,255,0.86)',
      nameStyle: { fontWeight: 600 },
      logo: '/projects/brain-benchmark/brain.webp',
    },
    about: [
      'Built in **3 hours**, Brain Benchmark is a collection of brain games designed to assess and improve mental fitness. Each test measures one skill, such as memory, reaction time, attention or processing speed, and puts your score on a leaderboard.',
      'It has since grown to sixteen tests, with profiles, a category radar of your strengths, and shareable progress cards.',
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostHog'],
    links: [
      { label: 'Play at brain-benchmark.com', href: 'https://brain-benchmark.com/' },
      { label: 'GitHub', href: 'https://github.com/Wryz/games' },
    ],
    mediaSections: [
      {
        name: 'In play',
        media: [
          video('/brain-benchmark/IMG_3524.mp4', 'Brain Benchmark demo'),
          video('/brain-benchmark/IMG_3616.mp4', 'Brain Benchmark demo'),
          video('/brain-benchmark/IMG_3617.mp4', 'Brain Benchmark demo'),
          { type: 'image', src: '/brain-benchmark/IMG_3530.JPG', alt: 'Brain Benchmark' },
        ],
      },
    ],
  },
  {
    slug: 'shelf-made',
    name: 'Shelf Made',
    tagline: 'Grow a tiny corner shop into a grocery chain.',
    kind: 'Tycoon game',
    category: 'game',
    tile: {
      status: 'in-development',
      thumbnail: '/projects/shelf-made/thumb.webp',
      blurb: 'A grocery store tycoon: ring up customers, stock the shelves and grow a corner shop into a chain of stores.',
    },
    theme: {
      bg: '#F7F4EA',
      surface: '#FFFFFF',
      ink: '#38383D',
      soft: '#5F5F66',
      accent: '#2B7D59',
      onAccent: '#FFFFFF',
      line: '#E3DED0',
      display: 'var(--font-fredoka), ui-rounded, system-ui, sans-serif',
      body: 'var(--font-fredoka), ui-rounded, system-ui, sans-serif',
      radius: '14px',
    },
    band: {
      bg: '#3FA87A',
      ink: '#FFFFFF',
      soft: 'rgba(255,255,255,0.9)',
      nameStyle: { fontWeight: 700 },
    },
    about: [
      'Shelf Made is a grocery store tycoon I am building for the browser. You start with a tiny corner shop in a small town with rival stores. Customers drive in from the main road, park, shop, queue and pay, and you grow from ringing them up by hand to running a **chain of stores** with managers.',
      'The economy is meant to be visible: you watch the line back up, the parking lot fill and a rival\'s sale pull shoppers away. Early on you scan items at the register and carry stock to the shelves yourself, and **every chore can later be handed to staff**. The strategy comes from customer types, reputation, rivals, ads, loans, store layout and franchises.',
      'It is built on a deterministic simulation in **TypeScript**, with **React** for the interface and **three.js** for a bright, chunky low-poly town. A free web beta comes first, then a desktop release on Steam.',
    ],
    stack: ['TypeScript', 'React', 'three.js', 'Vite'],
    stackLabel: 'Building with',
    links: [],
  },
  {
    slug: 'siege',
    name: 'Siege',
    tagline: 'A Minecraft MMORPG with 100k+ players.',
    kind: 'Minecraft server',
    category: 'game',
    tile: {
      status: 'closed',
      thumbnail: '/projects/siege/thumb.webp',
      blurb: 'A Minecraft MMORPG server with 1,000+ custom items and custom mobs, played by 100,000+ people.',
    },
    theme: {
      bg: '#17121F',
      surface: '#231B30',
      ink: '#F6EFE6',
      soft: '#B9ABC4',
      accent: '#F2A36B',
      onAccent: '#17121F',
      line: '#392E4A',
      display: 'var(--font-pixelify), ui-monospace, monospace',
      body: 'var(--font-body), ui-sans-serif, system-ui, sans-serif',
      radius: '0px',
    },
    band: {
      bg: 'linear-gradient(90deg, rgba(23,18,31,0.94) 0%, rgba(23,18,31,0.78) 45%, rgba(23,18,31,0.15) 100%)',
      ink: '#FFF4E6',
      soft: 'rgba(255,244,230,0.9)',
      nameStyle: { fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' },
      logo: '/projects/siege/logo.png',
      logoStyle: { imageRendering: 'pixelated' },
      image: '/projects/siege/band.webp',
    },
    about: [
      'Identified and filled a genre gap, creating a profitable Minecraft MMORPG server in just **2 weeks** with nearly **500** eager participants on launch. Coded in **Java** and **Kotlin** for server plugins, mobs, and game logic.',
      'Built over **1,000** custom items and grew the server to **100,000+** unique players. Recruited and managed a team of **60+** specialized volunteers across development, moderation and content creation.',
      'Gained deep expertise in gaming communities and player psychology while growing the online presence from **200** to **100,000** users through a website, Reddit, and Discord.',
    ],
    stack: ['Java', 'Kotlin', 'Paper plugins', 'MythicMobs', 'Game design'],
    links: [],
    githubRepos: [
      { label: 'Siege (server)', href: 'https://github.com/WrysBowl/Siege' },
      { label: 'Siege-MythicMobs', href: 'https://github.com/WrysBowl/Siege-MythicMobs' },
      { label: 'SiegeCore', href: 'https://github.com/WrysBowl/SiegeCore' },
      { label: 'LastStraw-Skripts', href: 'https://github.com/WrysBowl/LastStraw-Skripts' },
      { label: 'KotlinPaperPlugin', href: 'https://github.com/WrysBowl/KotlinPaperPlugin' },
    ],
    mediaSections: [
      { name: 'Gameplay', media: [video('/siege/gameplay/Goo Battle.mp4', 'Goo Battle')] },
      { name: 'Cinematics', media: siegeCinematics },
      {
        name: 'Mobs',
        subtitle: 'Coded mob pathfinding and aggressive focus behavior with loot drop mechanics',
        media: [
          video('/siege/mobs/Bandit.mp4', 'Bandit'),
          video('/siege/mobs/Bandit Archers.mp4', 'Bandit Archers'),
          video('/siege/mobs/Infected Digger.mp4', 'Infected Digger'),
          video('/siege/mobs/Necromancy.mp4', 'Necromancy'),
          video('/siege/mobs/OldGoblins.mp4', 'Old Goblins'),
          video('/siege/mobs/Squilliams AI 2.0.mp4', 'Squilliams AI 2.0'),
        ],
      },
    ],
  },
  /* Apps */
  {
    slug: 'bibli',
    name: 'Bibli',
    tagline: 'Scripture, one step at a time.',
    kind: 'iOS app',
    category: 'app',
    tile: {
      action: 'visit',
      thumbnail: '/projects/bibli/thumb.webp',
      blurb: 'A Bible app for new Christians: short reading paths by theme, like Love or Faith, unlocked one step at a time.',
    },
    externalUrl: 'https://bibli-website-brown.vercel.app',
    theme: {
      bg: '#F5F0E8',
      surface: '#EDE6DC',
      ink: '#6B5344',
      soft: '#8B7355',
      accent: '#5A8F5A',
      onAccent: '#FFFFFF',
      line: '#D9CEC0',
      display: 'var(--font-fredoka), ui-rounded, system-ui, sans-serif',
      body: 'var(--font-fredoka), ui-rounded, system-ui, sans-serif',
      radius: '16px',
    },
    band: {
      bg: '#EDE6DC',
      ink: '#6B5344',
      soft: '#75603F',
      nameStyle: { fontWeight: 700 },
      logo: '/projects/bibli/logo.webp',
      logoStyle: { borderRadius: '22%' },
    },
    about: [],
    stack: [],
    links: [],
  },
  {
    slug: 'builderfive',
    name: 'BuilderFive',
    tagline: 'Explore. Collect. Learn.',
    kind: 'iOS app',
    category: 'app',
    tile: {
      href: 'https://apps.apple.com/us/app/builderfive/id6747997481',
      action: 'download',
      thumbnail: '/projects/builderfive/thumb.webp',
      blurb: 'Earn rewards for visiting local spots, claim territory on a 3D map and learn the history of each place.',
    },
    theme: {
      bg: '#0B0D16',
      surface: '#171A27',
      ink: '#ECEDEE',
      soft: '#A9B4CC',
      accent: '#61ABFF',
      onAccent: '#0B0D16',
      line: '#2A2F42',
      display: 'var(--font-fredoka), ui-rounded, system-ui, sans-serif',
      body: 'var(--font-fredoka), ui-rounded, system-ui, sans-serif',
      radius: '8px',
    },
    band: {
      bg: 'linear-gradient(180deg, #0B0D16 0%, #1A2036 100%)',
      ink: '#FFFFFF',
      soft: '#A9B4CC',
      nameStyle: { fontWeight: 600 },
      logo: '/projects/builderfive/logo.webp',
      logoStyle: { borderRadius: '22%' },
    },
    about: [
      'BuilderFive is a time-based rewards app where users earn money by attending local events hosted by businesses. Built with **Three.js** for 3D map visualization.',
      'The app included a gamified component where users could claim territory on the map and discover the rarity of each area, using **AI** to analyze points of interest and their historical context. It rewards real-world visits and helps local businesses drive foot traffic.',
      'I documented the build in a TikTok vlog that reached **300k+** total views.',
    ],
    stack: ['React Native', 'Next.js', 'Three.js', 'Mapbox', 'AI'],
    links: [
      { label: 'Get it on the App Store', href: 'https://apps.apple.com/us/app/builderfive/id6747997481' },
      { label: 'TikTok', href: 'https://www.tiktok.com/@builderfive/' },
    ],
    mediaSections: [
      {
        name: 'In the app',
        media: [
          video('/builderfive/5fac3adad5df48eeb439d4ef59a6924f.mp4', 'BuilderFive app demo'),
          video('/builderfive/98b5b3f0b7bc4bd8aa893f501b0d0c0b.mp4', 'BuilderFive app demo'),
          video('/builderfive/110950e34c4845a5b4292bc196db005f.mp4', 'BuilderFive app demo'),
        ],
      },
    ],
  },
  {
    slug: 'job-updates',
    name: 'Job Updates',
    tagline: 'Every application I\'m waiting on, in one tab.',
    kind: 'Chrome extension',
    category: 'app',
    tile: {
      thumbnail: '/projects/job-updates/thumb.webp',
      blurb: 'A Chrome extension that watches about twenty job platforms and reports what changed, ranked by pay and urgency.',
    },
    theme: {
      bg: '#121417',
      surface: '#1B1E23',
      ink: '#EDEEF0',
      soft: '#9BA1AB',
      accent: '#FF7A1A',
      onAccent: '#121417',
      line: '#2C3038',
      display: 'var(--font-plex-mono), ui-monospace, monospace',
      body: 'var(--font-plex-sans), ui-sans-serif, system-ui, sans-serif',
      radius: '4px',
    },
    band: { bg: '#121417', ink: '#EDEEF0', soft: '#9BA1AB', nameStyle: { letterSpacing: '-0.04em', fontWeight: 500 } },
    about: [
      'I work across about twenty AI-training, survey and user-testing platforms. Most of them never email when a job opens or an application moves, so the only way to know is to log in to each one and look.',
      'Job Updates does the looking. It checks every platform, reads the job pages themselves, and reports what changed. It also notices when a login has expired, so a silent platform is never mistaken for a quiet one.',
      'Jobs are ranked by **pay, hiring urgency, fit with my resume** and what the platform itself recommends. An earnings calendar pulls each site\'s payments onto one month view.',
    ],
    stack: ['Change detection', 'Priority ranking', 'Expired-login checks', 'Email alerts', 'Earnings calendar'],
    stackLabel: 'Does',
    links: [],
  },
  {
    slug: 'miqo',
    name: 'Miqo',
    tagline: 'A voice-commanded robot with a phone for a brain.',
    kind: 'Robot',
    category: 'app',
    tile: {
      thumbnail: '/projects/miqo/thumb.webp',
      blurb: 'A voice-commanded robot inspired by Wall-E, with a phone app as its brain over Bluetooth.',
    },
    theme: {
      bg: '#DAD7D2',
      surface: '#E8E6E2',
      ink: '#1B1B1B',
      soft: '#55524D',
      accent: '#1B1B1B',
      onAccent: '#F2F0EC',
      line: '#BDB9B2',
      display: 'var(--font-chakra), ui-sans-serif, system-ui, sans-serif',
      body: 'var(--font-chakra), ui-sans-serif, system-ui, sans-serif',
      radius: '14px',
    },
    band: {
      bg: '#DAD7D2',
      ink: '#1B1B1B',
      soft: '#55524D',
      nameStyle: { fontWeight: 700, textTransform: 'lowercase', letterSpacing: '-0.02em' },
      logo: '/projects/miqo/mark.webp',
      logoStyle: { borderRadius: '22%' },
    },
    about: [
      'Miqo is a voice-commanded embodied AI agent designed to resemble Wall-E. I built both the hardware robot and a mobile app that serves as the robot\'s brain.',
      'The app acts as the CPU, using **Bluetooth** to receive real-time data from the robot and send it commands. It also processes voice commands and renders the robot in 3D with **Three.js**.',
    ],
    stack: ['ESP32', 'Bluetooth', 'Three.js', 'Mobile app', 'Embedded'],
    links: [{ label: 'GitHub', href: 'https://github.com/Wryz/miqo' }],
    mediaSections: [
      {
        name: 'Demo',
        media: [
          video('/miqo/7eb3684a0b834822a2b6ae2b734ad769.mp4', 'Miqo demo'),
          video('/miqo/052aa446334841b9b152facffa54a355.mp4', 'Miqo demo'),
          video('/miqo/6153e757d8764db49ae576bd98c283df.mp4', 'Miqo demo'),
        ],
      },
      {
        name: 'Tutorials',
        subtitle: 'Over 25k total views on TikTok',
        media: [
          '4073ac29f47047d697efab593b7fef71',
          '4611d3bf6cba45b596c40301a18e12bc',
          '39d82a6ef9984651aeee7787c7072b85',
          '25eeb0d1473a405a9fd126a0723a7c2f',
          'e78b16c01bdd41d49e61b6471fec62ab',
          '3f703f6954f64ef1b3c82a6eb5d41973',
          '586b10c8bbba41f397dcd1bf89bdead1',
          '13fb6393a41a4b0bad518000f3b6afea',
          'e5de3bd1ad37410ca0000ffde1187203',
          '8a3ea956b1244ed890d3df31b3edda40',
          '99fa0712c0c84f708f6effc3e0b98169',
        ].map((id) => video(`/miqo/${id}.mp4`, 'Miqo build tutorial')),
      },
    ],
  },
  /* Websites */
  {
    slug: 'ourtailtales',
    name: 'ourTailTales',
    tagline: 'Their life, in chapters.',
    kind: 'Web app',
    category: 'website',
    tile: {
      href: 'https://our-tail-tales.vercel.app',
      action: 'visit',
      thumbnail: '/projects/ourtailtales/thumb.webp',
      blurb: 'Turns your pet\'s camera roll into a hardcover memoir, with the chapters drafted for you to edit.',
    },
    theme: {
      bg: '#FAF7F2',
      surface: '#FFFFFF',
      ink: '#252A3A',
      soft: '#5A6070',
      accent: '#5B68C8',
      onAccent: '#FFFFFF',
      line: '#D5DCEB',
      display: 'var(--font-merienda), ui-serif, Georgia, serif',
      body: 'var(--font-inter), ui-sans-serif, system-ui, sans-serif',
      radius: '9999px',
    },
    band: {
      bg: 'linear-gradient(90deg, #FAF7F2 0%, #FAF7F2 38%, rgba(250,247,242,0.8) 60%, rgba(250,247,242,0.5) 100%)',
      ink: '#252A3A',
      soft: '#3F4556',
      nameStyle: { fontWeight: 700 },
      logo: '/projects/ourtailtales/logo.png',
      image: '/projects/ourtailtales/band.webp',
    },
    about: [
      'ourTailTales turns a pet\'s camera roll into a memoir. You drop in an album; it sorts the years, drafts the chapters, and lays out a hardcover book you can edit before you order.',
      'Inside the book, photos are treated as prints placed by hand: white borders, a slight tilt, washi tape in colours drawn from the pet\'s own coat or collar. The same layout definition drives the on-screen editor and the print-ready PDF.',
      'A free digital edition arrives by email, and short videos can be printed into the book as **QR-code pages**.',
    ],
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Stripe', 'Gemini', 'pdf-lib', 'Resend', 'PostHog'],
    links: [
      { label: 'Visit ourTailTales', href: 'https://our-tail-tales.vercel.app' },
      { label: 'GitHub', href: 'https://github.com/ourTailTales/ourTailTales' },
    ],
  },
  {
    slug: 'austin-founders',
    name: 'Austin Founders Community',
    tagline: 'Invite-only coworking for founders building in Austin.',
    kind: 'Community',
    category: 'website',
    tile: {
      href: 'https://www.austinfoundercoworking.com',
      action: 'visit',
      thumbnail: '/projects/austin-founders/thumb.webp',
      blurb: 'An invite-only community where Austin founders cowork and back each other up. I founded it and run it.',
    },
    theme: {
      bg: '#222222',
      surface: '#2C2C2C',
      ink: '#FFFFFF',
      soft: '#AFAFAF',
      accent: '#BF5700',
      onAccent: '#FFFFFF',
      line: '#424242',
      display: 'var(--font-merienda), ui-serif, Georgia, serif',
      body: 'var(--font-lato), ui-sans-serif, system-ui, sans-serif',
      radius: '6px',
    },
    band: {
      bg: 'linear-gradient(90deg, rgba(44,44,44,0.96) 0%, rgba(44,44,44,0.86) 45%, rgba(191,87,0,0.55) 100%)',
      ink: '#FFFFFF',
      soft: 'rgba(255,255,255,0.9)',
      nameStyle: { fontWeight: 700 },
      logo: '/projects/austin-founders/logo.webp',
      image: '/projects/austin-founders/band.webp',
    },
    about: [
      'I founded Austin Founders Community in 2024 as a non-profit, and I plan, promote and host its coworking sessions. It is a place for founders, builders and operators to work alongside each other and get real peer support, rather than another for-profit tech mixer.',
      'The community lives on WhatsApp. Every request to join is verified personally before the founder is added. I also built and maintain the website, including the startup directory and event gallery.',
    ],
    stack: ['Founder', 'Events organizer', 'Website'],
    stackLabel: 'My role',
    short: 'Austin Founders',
    links: [
      { label: 'Visit the community site', href: 'https://www.austinfoundercoworking.com' },
      { label: 'Instagram', href: 'https://www.instagram.com/atx.founders' },
    ],
  },
];

/** Projects that have their own page on this site (everything except link-outs). */
export const pagedProjects = projects.filter((p) => !p.externalUrl);

export function getProject(slug: string) {
  return pagedProjects.find((p) => p.slug === slug);
}

export function projectHref(p: Project) {
  return p.externalUrl ?? `/${p.slug}`;
}

/** CSS custom properties that skin a subtree in a project's own colours and type. */
export function themeVars(t: ProjectTheme): CSSProperties {
  return {
    '--p-bg': t.bg,
    '--p-surface': t.surface,
    '--p-ink': t.ink,
    '--p-soft': t.soft,
    '--p-accent': t.accent,
    '--p-on-accent': t.onAccent,
    '--p-line': t.line,
    '--p-display': t.display,
    '--p-body': t.body,
    '--p-radius': t.radius,
  } as CSSProperties;
}
