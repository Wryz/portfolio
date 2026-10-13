import Image from 'next/image';
import Link from 'next/link';
import { projects, sections, type ProjectCategory } from '@/lib/projects';
import { AutoVideo } from './games/AutoVideo';
import { AiRankBadge } from './community/AiRank';

/* What each section shows off, at a glance */
const skills: Record<ProjectCategory, string[]> = {
  game: ['Three.js', 'Physics', 'Realtime multiplayer', 'Web Audio'],
  app: ['Mobile frontend', 'iOS and Android', 'Chrome extension', 'Hardware over Bluetooth'],
  website: ['Next.js', 'Supabase', 'Stripe', 'AI'],
  community: ['Founder', 'Event host', 'Community site'],
};

/* Everything I build with, for the ticker under the heading */
const ticker = [
  'TypeScript', 'React', 'Next.js', 'Three.js', 'React Native', 'Supabase', 'Rapier physics', 'Tailwind CSS',
  'Stripe', 'Gemini', 'Mapbox', 'Web Audio', 'ESP32', 'Java', 'PostHog', 'Vite',
];

function count(category: ProjectCategory) {
  return projects.filter((p) => p.category === category).length;
}

function hrefOf(category: ProjectCategory) {
  return `/${sections.find((s) => s.category === category)!.slug}`;
}

function Chips({ items, tone }: { items: string[]; tone: 'light' | 'dark' }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((s) => (
        <li
          key={s}
          className="rounded-full px-2.5 py-1 text-xs font-medium"
          style={
            tone === 'light'
              ? { backgroundColor: 'rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.92)', border: '1px solid rgba(255,255,255,0.2)' }
              : { backgroundColor: 'rgba(0,0,0,0.06)', color: 'rgba(0,0,0,0.75)', border: '1px solid rgba(0,0,0,0.1)' }
          }
        >
          {s}
        </li>
      ))}
    </ul>
  );
}

function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg className={`section-card-arrow h-6 w-6 shrink-0 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/** Title row shared by the cards: the section name, how many things are in it, and an arrow */
function CardTitle({ title, n, unit, ink, soft }: { title: string; n: number; unit: string; ink: string; soft: string }) {
  return (
    <div className="flex items-end gap-3">
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: soft }}>
          {n} {n === 1 ? unit : `${unit}s`}
        </p>
        <p className="mt-1 text-3xl font-bold leading-none sm:text-4xl" style={{ fontFamily: 'var(--font-heading)', color: ink }}>
          {title}
        </p>
      </div>
      <Arrow />
    </div>
  );
}

function GamesCard() {
  const games = projects.filter((p) => p.category === 'game');
  return (
    <Link
      href={hrefOf('game')}
      className="section-card group relative flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-3xl p-6 sm:p-8 md:col-span-2 lg:col-span-7 lg:row-span-2 lg:min-h-0"
      style={{ backgroundColor: '#0B1220', color: '#FFFFFF', border: '1px solid var(--border)' }}
    >
      <AutoVideo
        src="/projects/reelearth/demo.mp4"
        webm="/projects/reelearth/demo.webm"
        poster="/projects/reelearth/demo-poster.webp"
        className="section-card-image absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,12,22,0.98) 0%, rgba(8,12,22,0.85) 42%, rgba(8,12,22,0.05) 78%)' }} aria-hidden />
      <span className="absolute left-6 top-6 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold backdrop-blur sm:left-8 sm:top-8">
        <svg className="h-3 w-3" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
          <path d="M3 1.5v9l7.5-4.5z" />
        </svg>
        Free to play in your browser
      </span>

      <div className="relative">
        {/* Every game's thumbnail, overlapping like a hand of cards */}
        <ul className="mb-5 flex" aria-hidden>
          {games.map((g, i) => (
            <li
              key={g.slug}
              className="relative h-12 w-20 overflow-hidden rounded-lg sm:h-14 sm:w-24"
              style={{ marginLeft: i ? -14 : 0, border: '2px solid #0B1220', transform: `rotate(${(i - games.length / 2) * 2}deg)`, zIndex: games.length - i }}
            >
              <Image src={g.tile.thumbnail} alt="" fill sizes="96px" className="object-cover" />
            </li>
          ))}
        </ul>
        <CardTitle title="Games" n={games.length} unit="game" ink="#FFFFFF" soft="rgba(255,255,255,0.7)" />
        <p className="mt-3 max-w-md text-sm leading-relaxed sm:text-base" style={{ color: 'rgba(255,255,255,0.8)' }}>
          Fish famous landmarks, brawl through seven arenas, topple castles. {games.slice(0, 3).map((g) => g.name).join(', ')} and more.
        </p>
        <div className="mt-4">
          <Chips items={skills.game} tone="light" />
        </div>
      </div>
    </Link>
  );
}

function AppsCard() {
  const icons = [
    { src: '/projects/bibli/logo.webp', style: { top: '18%', left: '14%', transform: 'rotate(-12deg)' } },
    { src: '/projects/builderfive/logo.webp', style: { top: '52%', left: '28%', transform: 'rotate(8deg)' } },
    { src: '/projects/miqo/mark.webp', style: { top: '30%', right: '12%', transform: 'rotate(10deg)' } },
  ];
  return (
    <Link
      href={hrefOf('app')}
      className="section-card group relative flex min-h-80 flex-col justify-between overflow-hidden rounded-3xl p-6 sm:p-8 lg:col-span-5"
      style={{ background: 'linear-gradient(150deg, #FCF4EB 0%, #F4E1CC 55%, #EDB98A 100%)', color: '#1F1A16', border: '1px solid var(--border)' }}
    >
      {/* A phone running Stressie, cut off by the card's edge, with app icons floating around it */}
      <div className="relative -mx-6 -mt-6 mb-4 h-44 overflow-hidden sm:-mx-8 sm:-mt-8" aria-hidden>
        <div className="absolute left-1/2 top-5 w-32 -translate-x-1/2 sm:w-36" style={{ rotate: '6deg', filter: 'drop-shadow(0 18px 24px rgba(80,40,0,0.3))' }}>
          <Image src="/projects/stressie/phone.webp" alt="" width={600} height={1176} sizes="144px" className="section-card-image h-auto w-full" />
        </div>
        {icons.map((icon) => (
          <span key={icon.src} className="absolute h-12 w-12 overflow-hidden rounded-2xl bg-white shadow-lg sm:h-14 sm:w-14" style={icon.style}>
            <Image src={icon.src} alt="" fill sizes="56px" className="object-contain p-1" />
          </span>
        ))}
      </div>
      <div className="relative">
        <CardTitle title="Apps" n={count('app')} unit="app" ink="#1F1A16" soft="#8A5A33" />
        <p className="mt-2 max-w-[16rem] text-sm leading-relaxed" style={{ color: '#5B4A3C' }}>
          On phones, in Chrome, and one inside a robot.
        </p>
        <div className="mt-3">
          <Chips items={skills.app} tone="dark" />
        </div>
      </div>
    </Link>
  );
}

function WebsitesCard() {
  const site = projects.find((p) => p.category === 'website')!;
  const host = site.tile.href ? new URL(site.tile.href).hostname : '';
  return (
    <Link
      href={hrefOf('website')}
      className="section-card group relative flex min-h-80 flex-col justify-between gap-6 overflow-hidden rounded-3xl p-6 sm:p-8 lg:col-span-5"
      style={{ background: 'linear-gradient(160deg, #EEF0FB 0%, #D5DCEB 100%)', color: '#252A3A', border: '1px solid var(--border)' }}
    >
      {/* A browser window with the site in it */}
      <div className="overflow-hidden rounded-xl bg-white shadow-xl" style={{ transform: 'rotate(-1.5deg)' }} aria-hidden>
        <div className="flex items-center gap-1.5 px-3 py-2" style={{ backgroundColor: '#F2F3F8', borderBottom: '1px solid #E1E4EE' }}>
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          <span className="ml-2 flex-1 truncate rounded-md bg-white px-2 py-0.5 text-[11px]" style={{ color: '#5A6070' }}>{host}</span>
        </div>
        <div className="relative aspect-[16/7] overflow-hidden">
          <Image src={site.tile.thumbnail} alt="" fill sizes="(min-width: 1024px) 420px, 90vw" className="section-card-image object-cover object-top" />
        </div>
      </div>
      <div>
        <CardTitle title="Websites" n={count('website')} unit="site" ink="#252A3A" soft="#5B68C8" />
        <div className="mt-3">
          <Chips items={skills.website} tone="dark" />
        </div>
      </div>
    </Link>
  );
}

function CommunitiesCard() {
  const photos = [
    { src: '/projects/austin-founders/gallery/03.webp', rotate: -6 },
    { src: '/projects/austin-founders/gallery/05.webp', rotate: 4 },
    { src: '/projects/austin-founders/gallery/08.webp', rotate: -2 },
    { src: '/projects/austin-founders/gallery/14.webp', rotate: 7 },
  ];
  return (
    <Link
      href={hrefOf('community')}
      className="section-card group relative grid grid-cols-[minmax(0,1fr)] overflow-hidden rounded-3xl md:col-span-2 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:col-span-12"
      style={{ background: 'radial-gradient(120% 160% at 100% 0%, #4A2A12 0%, #222222 55%)', color: '#FFFFFF', border: '1px solid var(--border)' }}
    >
      <div className="relative flex flex-col justify-end gap-4 p-6 sm:p-8">
        <AiRankBadge className="self-start" />
        <div>
          <CardTitle title="Communities" n={count('community')} unit="community" ink="#FFFFFF" soft="#F5A35C" />
          <p className="mt-3 max-w-md leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
            I founded and run Austin Founders Community: 54 startups and 300+ coworking sessions and meetups so far.
          </p>
        </div>
        <Chips items={skills.community} tone="light" />
      </div>
      {/* Snapshots from the sessions, pinned up like prints */}
      <ul className="relative flex min-h-56 items-center justify-center px-6 pb-8 sm:min-h-64 md:pb-0" aria-hidden>
        {photos.map((p, i) => (
          <li
            key={p.src}
            className="relative -ml-8 w-24 shrink-0 bg-white p-1.5 pb-5 shadow-2xl first:ml-0 sm:w-36 sm:pb-6 lg:w-40"
            style={{ transform: `rotate(${p.rotate}deg) translateY(${i % 2 ? 10 : -6}px)` }}
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image src={p.src} alt="" fill sizes="160px" className="object-cover" />
            </div>
          </li>
        ))}
      </ul>
    </Link>
  );
}

/** The landing page's way into the site: one card per section, each dressed in its own work. */
export function SectionLinks() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-4 pt-20 sm:px-6 sm:pt-28 lg:px-8">
      <h2 className="mb-2 text-3xl font-bold sm:text-4xl" style={{ color: 'var(--text)' }}>
        What I make
      </h2>
      <div className="mb-6 h-1 w-16 rounded-full" style={{ backgroundColor: '#D4834A' }} />

      {/* What I build with, drifting past */}
      <div className="skill-ticker mb-8 overflow-hidden" aria-label="Skills">
        <ul className="postcards flex w-max gap-2">
          {[...ticker, ...ticker].map((s, i) => (
            <li
              key={i}
              aria-hidden={i >= ticker.length || undefined}
              className="whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium"
              style={{ color: 'var(--text-secondary)', border: '1px solid var(--border)', backgroundColor: 'var(--bg-card)' }}
            >
              {s}
            </li>
          ))}
        </ul>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-12 lg:grid-rows-[minmax(20rem,auto)_minmax(20rem,auto)]">
        <GamesCard />
        <AppsCard />
        <WebsitesCard />
        <CommunitiesCard />
      </div>
    </section>
  );
}
