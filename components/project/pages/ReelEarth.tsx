import Image from 'next/image';
import type { Project } from '@/lib/projects';
import { ProjectLinks, Section } from '../parts';

/* The four islands, as the game describes them, with each one's legendary fish */
const islands = [
  {
    id: 'gullrock',
    region: 'Isle 01 · North Reach',
    name: 'Gullrock Cliffs',
    blurb: 'High cliffs, an old lighthouse and a humpback that surfaces now and then.',
    legendary: 'Starlight Lanternfish, after a shooting star',
  },
  {
    id: 'coralbay',
    region: 'Isle 02 · Sunward Sea',
    name: 'Coralbay Atoll',
    blurb: 'White sand, palms and a turquoise lagoon with the reef just below the surface.',
    legendary: 'Sunburst Marlin, on a clear midday',
  },
  {
    id: 'rimeholm',
    region: 'Isle 03 · Far North',
    name: 'Rimeholm',
    blurb: 'Snowy sea cliffs, drifting icebergs and the northern lights on clear nights.',
    legendary: 'Aurora Char, under the northern lights',
  },
  {
    id: 'cinder',
    region: 'Isle 04 · Ember Shoals',
    name: 'Cinder Isle',
    blurb: 'Black sand, basalt stacks and a smoking volcano that glows after dark.',
    legendary: 'Phoenix Ray, at sunset',
  },
];

/* The game's small caps label: "Isle 01 · North Reach" */
const eyebrow = 'text-xs font-semibold uppercase tracking-[0.14em]';

export function ReelEarthHero({ project }: { project: Project }) {
  return (
    <Section className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <Image src="/projects/reelearth/logo.png" alt="" width={72} height={72} priority className="h-16 w-16" style={{ borderRadius: '25%' }} />
        <h1 className="mt-6 text-5xl leading-[1.05] sm:text-6xl lg:text-7xl" style={{ fontWeight: 400 }}>
          ReelEarth
        </h1>
        <p className="mt-5 max-w-md text-xl leading-relaxed" style={{ color: 'var(--p-soft)' }}>
          {project.tagline} Make an angler, cast from the cliffs and chat with whoever else is fishing.
        </p>
        <ProjectLinks project={project} className="mt-8" />
      </div>
      <div className="relative overflow-hidden" style={{ borderRadius: 16, border: '1px solid var(--p-line)', aspectRatio: '16 / 10' }}>
        <Image
          src="/projects/reelearth/hero.webp"
          alt="Anglers fishing from the clifftop on Gullrock Cliffs, with the lighthouse behind them"
          fill
          priority
          sizes="(min-width: 1024px) 640px, 100vw"
          className="object-cover"
        />
      </div>
    </Section>
  );
}

export function ReelEarthExtra() {
  return (
    <Section>
      <h2 className="text-3xl sm:text-4xl" style={{ fontWeight: 400 }}>
        Four islands, one shared sky
      </h2>
      <p className="mt-3 max-w-2xl text-lg" style={{ color: 'var(--p-soft)' }}>
        Everyone on an island sees the same time of day, tide and weather. Sail between them from the travel map.
      </p>
      <ul className="mt-10 grid gap-6 sm:grid-cols-2">
        {islands.map((isle) => (
          <li key={isle.id} className="overflow-hidden" style={{ borderRadius: 16, backgroundColor: 'var(--p-surface)', border: '1px solid var(--p-line)' }}>
            <div className="relative" style={{ aspectRatio: '16 / 10' }}>
              <Image src={`/projects/reelearth/islands/${isle.id}.webp`} alt={`${isle.name} in ReelEarth`} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="p-5 sm:p-6">
              <p className={eyebrow} style={{ color: 'var(--p-soft)' }}>{isle.region}</p>
              <h3 className="mt-1 text-2xl" style={{ fontWeight: 400 }}>{isle.name}</h3>
              <p className="mt-2 leading-relaxed" style={{ color: 'var(--p-soft)' }}>{isle.blurb}</p>
              <p className="mt-4 text-sm">
                <span className={eyebrow} style={{ color: 'var(--p-accent)' }}>Legendary</span>{' '}
                <span style={{ color: '#84D6C8' }}>{isle.legendary}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
