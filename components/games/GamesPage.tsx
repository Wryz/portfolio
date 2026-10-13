import Image from 'next/image';
import Link from 'next/link';
import { getProject, themeVars, type Project, type ProjectTheme } from '@/lib/projects';
import { SiteNav } from '../SiteNav';
import { Footer } from '../Footer';
import { AutoVideo } from './AutoVideo';

/* ------------------------------------------------------------------ */
/* What each game shows off on this page                               */
/* ------------------------------------------------------------------ */

interface Showcase {
  slug: string;
  /** Genre line above the name */
  eyebrow: string;
  pitch: string;
  stats: { value: string; label: string }[];
  media: { video?: string; webm?: string; image?: string; poster?: string; label: string };
  /** Small pictures or words under the main media */
  extras: { kind: 'images'; items: { src: string; alt: string }[] } | { kind: 'chips'; items: string[] };
  /** Overrides for games whose look has moved on since their page here was made */
  theme?: Partial<ProjectTheme>;
  /** Extra class on the band, for games with their own button styles */
  className?: string;
  /** Leave the logo out (when the one on file predates the game's current look) */
  noLogo?: boolean;
}

const showcases: Showcase[] = [
  {
    slug: 'dungeon-style',
    eyebrow: 'Physics brawler · gauntlet',
    pitch: 'You choose when to strike; your fighter blocks, ducks and counters on its own. Win the round and the arena changes, until a giant waits in the colosseum.',
    stats: [
      { value: '7', label: 'arenas' },
      { value: '17', label: 'opponents' },
      { value: '3', label: 'giant bosses' },
    ],
    media: {
      video: '/projects/dungeon-style/gameplay.mp4',
      webm: '/projects/dungeon-style/gameplay.webm',
      poster: '/projects/dungeon-style/gameplay-poster.webp',
      label: 'DungeonStyle gameplay: fights on the street, in the grocery store and in the biker bar',
    },
    extras: {
      kind: 'images',
      items: [
        { src: '/projects/dungeon-style/arenas/street.webp', alt: 'The street arena' },
        { src: '/projects/dungeon-style/arenas/grocery.webp', alt: 'The grocery store arena' },
        { src: '/projects/dungeon-style/arenas/bar.webp', alt: 'The biker bar arena' },
        { src: '/projects/dungeon-style/arenas/rooftop.webp', alt: 'The rooftop arena at night' },
      ],
    },
  },
  {
    slug: 'hex-hordes',
    eyebrow: 'Strategy card game',
    pitch: 'Build a deck of four, read the land and march on the enemy castle. A campaign of fifteen regions, from goblin woods to the dragon’s peak, and it keeps working offline.',
    stats: [
      { value: '150', label: 'battles' },
      { value: '15', label: 'regions' },
      { value: '50', label: 'monsters' },
    ],
    media: {
      video: '/banner/hex-hordes.mp4',
      webm: '/banner/hex-hordes.webm',
      poster: '/banner/hex-hordes.webp',
      label: 'Hex Hordes: troops and castles on a turning hex island',
    },
    extras: {
      kind: 'images',
      items: [
        { src: '/projects/hex-hordes/cards/infantry.jpg', alt: 'Swordsmen card art' },
        { src: '/projects/hex-hordes/cards/helicopter.jpg', alt: 'Knights card art' },
        { src: '/projects/hex-hordes/cards/medic.jpg', alt: 'Mages card art' },
        { src: '/projects/hex-hordes/cards/pegasus.jpg', alt: 'Pegasus Knights card art' },
      ],
    },
    className: 'hh',
  },
  {
    slug: 'brain-benchmark',
    eyebrow: 'Brain tests · leaderboards',
    pitch: 'Short, honest tests of speed, memory, attention, perception, reasoning, numeracy and language. Every run is ranked against everyone, and mapped into your own capability profile.',
    stats: [
      { value: '21', label: 'tests' },
      { value: '7', label: 'capabilities' },
      { value: '$0', label: 'to play' },
    ],
    media: { image: '/projects/brain-benchmark/thumb.webp', label: 'Brain Benchmark: How capable is a human mind? Measure yours.' },
    extras: {
      kind: 'chips',
      items: ['Reaction Time', 'Aim Trainer', 'Chimp Test', 'Visual Memory', 'Number Memory', 'Stroop Test', 'Maze', 'Mental Rotation', 'Typing Test', 'Sudoku'],
    },
    noLogo: true,
    /* Brain Benchmark's current look: near-black with a lime highlight */
    theme: {
      bg: '#0E0E0D',
      surface: '#1A1A18',
      ink: '#F4F3EE',
      soft: '#A6A59E',
      accent: '#D7F45B',
      onAccent: '#0E0E0D',
      line: '#2B2B28',
      display: 'var(--font-heading), ui-sans-serif, system-ui, sans-serif',
      body: 'var(--font-body), ui-sans-serif, system-ui, sans-serif',
      radius: '9999px',
    },
  },
];

/* ------------------------------------------------------------------ */
/* Pieces                                                              */
/* ------------------------------------------------------------------ */

function Featured({ project }: { project: Project }) {
  const play = project.tile.href!;
  return (
    <section className="relative isolate overflow-hidden" style={{ ...themeVars(project.theme), backgroundColor: project.theme.bg }}>
      <AutoVideo
        src="/projects/reelearth/demo.mp4"
        webm="/projects/reelearth/demo.webm"
        poster="/projects/reelearth/demo-poster.webp"
        eager
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0 -z-10"
        style={{ background: 'linear-gradient(90deg, rgba(13,26,37,0.97) 0%, rgba(13,26,37,0.9) 42%, rgba(13,26,37,0.25) 78%), linear-gradient(0deg, rgba(13,26,37,0.9) 0%, transparent 35%)' }}
        aria-hidden
      />
      <div className="mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8" style={{ color: 'var(--p-ink)' }}>
        <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: '#84D6C8', fontFamily: 'var(--p-body)' }}>
          Featured · live multiplayer
        </p>
        <div className="mt-5 flex items-center gap-4">
          <Image src="/projects/reelearth/logo.png" alt="" width={72} height={72} priority className="h-14 w-14 sm:h-16 sm:w-16" />
          <h1 className="text-5xl leading-none sm:text-7xl" style={{ fontFamily: 'var(--p-display)', fontWeight: 400 }}>
            Reel<span style={{ color: 'var(--p-accent)' }}>Earth</span>
          </h1>
        </div>
        <p className="mt-6 max-w-lg text-lg leading-relaxed sm:text-xl" style={{ fontFamily: 'var(--p-body)', color: 'rgba(244,239,229,0.86)' }}>
          Fish with friends on sixteen miniature landmark islands, from the Statue of Liberty to the pyramids, under one shared sky.
        </p>
        <ul className="mt-6 flex flex-wrap gap-2" style={{ fontFamily: 'var(--p-body)' }}>
          {['16 landmark islands', '44 fish to catch', 'Play with friends'].map((c) => (
            <li key={c} className="rounded-full px-3.5 py-1.5 text-sm" style={{ backgroundColor: 'rgba(244,239,229,0.1)', border: '1px solid rgba(244,239,229,0.18)' }}>
              {c}
            </li>
          ))}
        </ul>
        <div className="mt-9 flex flex-wrap gap-3" style={{ fontFamily: 'var(--p-body)' }}>
          <a href={play} target="_blank" rel="noopener noreferrer" className="p-btn text-lg">
            <PlayIcon /> Play now
          </a>
          <Link href={`/${project.slug}`} className="p-btn p-btn-ghost text-lg" style={{ color: 'var(--p-ink)', borderColor: 'rgba(244,239,229,0.35)' }}>
            About the game
          </Link>
        </div>
      </div>
    </section>
  );
}

/** ReelEarth's islands drifting past like a row of postcards */
function Postcards() {
  const islands = ['liberty', 'paris', 'giza', 'miyajima', 'rio', 'agra', 'santorini', 'sydney', 'london', 'rome', 'borabora', 'iceland'];
  // The row is drawn twice so the scroll can loop without a gap
  return (
    <div className="overflow-hidden py-6" style={{ backgroundColor: '#0D1A25' }} aria-hidden>
      <ul className="postcards flex w-max gap-4">
        {[...islands, ...islands].map((id, i) => (
          <li key={i} className="relative h-28 w-48 shrink-0 overflow-hidden rounded-xl sm:h-36 sm:w-60" style={{ border: '1px solid rgba(244,239,229,0.12)' }}>
            <Image src={`/projects/reelearth/islands/${id}.webp`} alt="" fill sizes="240px" loading="eager" className="object-cover" />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Band({ showcase, project, flip }: { showcase: Showcase; project: Project; flip: boolean }) {
  const theme = { ...project.theme, ...showcase.theme };
  const play = project.tile.href;
  const { media, extras } = showcase;
  return (
    <section
      id={project.slug}
      className={`scroll-mt-14 ${showcase.className ?? ''}`}
      style={{ ...themeVars(theme), backgroundColor: theme.bg, color: theme.ink, fontFamily: theme.body }}
    >
      <div className={`mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[1.25fr_1fr] lg:gap-14 lg:px-8 ${flip ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        <div>
          <div className="relative overflow-hidden shadow-2xl" style={{ aspectRatio: '16 / 9', borderRadius: 18, border: `1px solid ${theme.line}`, backgroundColor: '#000' }}>
            {media.video ? (
              <AutoVideo src={media.video} webm={media.webm} poster={media.poster} label={media.label} className="h-full w-full object-cover" />
            ) : (
              <Image src={media.image!} alt={media.label} fill sizes="(min-width: 1024px) 620px, 100vw" className="object-cover" />
            )}
          </div>
          {extras.kind === 'images' ? (
            <ul className="mt-4 grid grid-cols-4 gap-3">
              {extras.items.map((item) => (
                <li key={item.src} className="relative overflow-hidden" style={{ aspectRatio: '16 / 10', borderRadius: 10, border: `1px solid ${theme.line}` }}>
                  <Image src={item.src} alt={item.alt} fill sizes="150px" className="object-cover" />
                </li>
              ))}
            </ul>
          ) : (
            <ul className="mt-5 flex flex-wrap gap-2">
              {extras.items.map((t) => (
                <li key={t} className="rounded-full px-3 py-1 text-sm" style={{ border: `1px solid ${theme.line}`, color: theme.soft }}>
                  {t}
                </li>
              ))}
              <li className="px-1 py-1 text-sm" style={{ color: theme.soft }}>and more</li>
            </ul>
          )}
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: theme.soft }}>{showcase.eyebrow}</p>
          <div className="mt-4 flex items-center gap-4">
            {project.band.logo && !showcase.noLogo && (
              <Image src={project.band.logo} alt="" width={64} height={64} className="h-12 w-12 sm:h-14 sm:w-14" style={project.band.logoStyle} />
            )}
            <h2
              className={`text-4xl leading-none sm:text-5xl ${showcase.className === 'hh' ? 'hh-wordmark' : ''}`}
              style={{ fontFamily: theme.display, ...project.band.nameStyle, ...(showcase.className === 'hh' ? { color: '#FBBF24' } : {}) }}
            >
              {project.name}
            </h2>
          </div>
          <p className="mt-5 text-lg leading-relaxed" style={{ color: theme.soft }}>{showcase.pitch}</p>
          <dl className="mt-8 grid grid-cols-3 gap-4">
            {showcase.stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-sm" style={{ color: theme.soft }}>{s.label}</dt>
                <dd className="text-4xl leading-none sm:text-5xl" style={{ fontFamily: theme.display, color: theme.accent, fontWeight: 700 }}>{s.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-9 flex flex-wrap gap-3">
            {play && (
              <a href={play} target="_blank" rel="noopener noreferrer" className="p-btn text-lg">
                <PlayIcon /> Play {project.name}
              </a>
            )}
            <Link href={`/${project.slug}`} className="p-btn p-btn-ghost text-lg">About</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/** The game still being built, and the one that has closed */
function Elsewhere({ shelf, siege }: { shelf: Project; siege: Project }) {
  return (
    <section className="mx-auto grid max-w-6xl gap-6 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-2 lg:px-8">
      <Link
        href={`/${shelf.slug}`}
        className="section-card group block overflow-hidden rounded-2xl"
        style={{ ...themeVars(shelf.theme), backgroundColor: shelf.theme.bg, color: shelf.theme.ink, fontFamily: shelf.theme.body, border: `1px solid ${shelf.theme.line}` }}
      >
        <div className="relative" style={{ aspectRatio: '16 / 9' }}>
          <Image src={shelf.tile.thumbnail} alt="" fill sizes="(min-width: 1024px) 560px, 100vw" className="section-card-image object-cover" />
          <span className="absolute left-4 top-4 rounded-full bg-amber-300 px-3 py-1 text-xs font-bold tracking-wider text-neutral-900">IN DEVELOPMENT</span>
        </div>
        <div className="p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: shelf.theme.soft }}>In the works</p>
          <h2 className="mt-2 text-3xl" style={{ fontFamily: shelf.theme.display, fontWeight: 700 }}>{shelf.name}</h2>
          <p className="mt-2 text-lg leading-relaxed" style={{ color: shelf.theme.soft }}>
            A grocery store tycoon: ring up customers, stock the shelves and grow a corner shop into a chain. Coming to the browser first.
          </p>
        </div>
      </Link>

      <Link
        href={`/${siege.slug}`}
        className="section-card group block overflow-hidden rounded-2xl"
        style={{ backgroundColor: siege.theme.bg, color: siege.theme.ink, fontFamily: siege.theme.body, border: `1px solid ${siege.theme.line}` }}
      >
        <div className="relative" style={{ aspectRatio: '16 / 9' }}>
          <AutoVideo src="/banner/siege.mp4" webm="/banner/siege.webm" poster="/banner/siege.webp" className="h-full w-full object-cover" />
          <span className="absolute left-4 top-4 rounded-full bg-red-600 px-3 py-1 text-xs font-bold tracking-wider text-white">CLOSED</span>
        </div>
        <div className="p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: siege.theme.soft }}>From the archive</p>
          <h2 className="mt-2 text-3xl uppercase tracking-wide" style={{ fontFamily: siege.theme.display, fontWeight: 700 }}>{siege.name}</h2>
          <p className="mt-2 text-lg leading-relaxed" style={{ color: siege.theme.soft }}>
            The Minecraft MMORPG I ran: 1,000+ custom items, custom mobs and 100,000+ players. Read how it was built.
          </p>
        </div>
      </Link>
    </section>
  );
}

function PlayIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
      <path d="M3 1.5v9l7.5-4.5z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */

/** The games section: not a catalog, but each game showing itself off. */
export function GamesPage() {
  const reel = getProject('reelearth')!;
  return (
    <>
      <SiteNav />
      <main className="overflow-x-hidden">
        <Featured project={reel} />
        <Postcards />
        {showcases.map((s, i) => (
          <Band key={s.slug} showcase={s} project={getProject(s.slug)!} flip={i % 2 === 1} />
        ))}
        <Elsewhere shelf={getProject('shelf-made')!} siege={getProject('siege')!} />
      </main>
      <Footer />
    </>
  );
}
