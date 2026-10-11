import Image from 'next/image';
import type { Project } from '@/lib/projects';
import { ProjectLinks, Section } from '../parts';

/* The sixteen islands in the game's own order, with each one's landmark, snack and legendary fish */
/* The eth (U+00F0) in Budakirkja is escaped: written literally in this file, it makes the Turbopack
   build fail with "next/font/google queries have exactly one entry". */
const islands = [
  { id: 'liberty', name: 'Liberty Island', region: 'New York Harbor, USA', landmark: 'Statue of Liberty', food: 'Hot dog', legendary: 'Lady Liberty Sturgeon' },
  { id: 'giza', name: 'Giza', region: 'Nile Delta, Egypt', landmark: 'Pyramids of Giza', food: 'Falafel', legendary: 'Phoenix Ray' },
  { id: 'tenochtitlan', name: 'Tenochtitlan', region: 'Lake Texcoco, Mexico', landmark: 'Templo Mayor', food: 'Tacos', legendary: 'Quetzal Gar' },
  { id: 'paris', name: 'Île de Paris', region: 'Seine, France', landmark: 'Eiffel Tower', food: 'Crêpe', legendary: 'Golden Seine Carp' },
  { id: 'london', name: 'Westminster', region: 'River Thames, UK', landmark: 'Big Ben', food: 'Fish and chips', legendary: 'Royal Thames Salmon' },
  { id: 'rapanui', name: 'Rapa Nui', region: 'Easter Island, Chile', landmark: 'Ahu Tongariki', food: 'Tuna skewer', legendary: 'Moai Grouper' },
  { id: 'miyajima', name: 'Miyajima', region: 'Itsukushima, Japan', landmark: 'Itsukushima torii', food: 'Ramen', legendary: 'Sakura Koi' },
  { id: 'santorini', name: 'Santorini', region: 'Aegean Sea, Greece', landmark: 'Oia', food: 'Gyros', legendary: 'Aegean Swordfish' },
  { id: 'sydney', name: 'Bennelong Point', region: 'Sydney Harbour, Australia', landmark: 'Sydney Opera House', food: 'Meat pie', legendary: 'Opal Kingfish' },
  { id: 'rio', name: 'Guanabara', region: 'Rio de Janeiro, Brazil', landmark: 'Christ the Redeemer', food: 'Açaí bowl', legendary: 'Carnival Parrotfish' },
  { id: 'agra', name: 'Yamuna Isle', region: 'Agra, India', landmark: 'Taj Mahal', food: 'Chai and samosa', legendary: 'Golden Mahseer' },
  { id: 'greatwall', name: 'Great Wall', region: 'Hebei, China', landmark: 'The Great Wall', food: 'Dumplings', legendary: 'Dragon Carp' },
  { id: 'machupicchu', name: 'Machu Picchu', region: 'Andes, Peru', landmark: 'Machu Picchu', food: 'Choclo', legendary: 'Starlight Lanternfish' },
  { id: 'rome', name: 'Isola Tiberina', region: 'Tiber, Italy', landmark: 'Colosseum', food: 'Gelato', legendary: 'Imperial Bluefin' },
  { id: 'borabora', name: 'Bora Bora', region: 'French Polynesia', landmark: 'Overwater bungalows', food: 'Coconut', legendary: 'Sunburst Marlin' },
  { id: 'iceland', name: 'Snæfellsnes', region: 'West Iceland', landmark: 'Bú\u00f0akirkja', food: 'Pylsur hot dog', legendary: 'Aurora Char' },
];

/* The game's small caps label: "Seine, France" */
const eyebrow = 'text-xs font-semibold uppercase tracking-[0.14em]';

export function ReelEarthHero({ project }: { project: Project }) {
  return (
    <Section className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <Image src="/projects/reelearth/logo.png" alt="" width={72} height={72} priority className="h-16 w-16" />
        <h1 className="mt-6 text-5xl leading-[1.05] sm:text-6xl lg:text-7xl" style={{ fontWeight: 400 }}>
          ReelEarth
        </h1>
        <p className="mt-5 max-w-md text-xl leading-relaxed" style={{ color: 'var(--p-soft)' }}>
          {project.tagline} Sixteen miniature famous places, one shared sky, and a globe to sail between them.
        </p>
        <ProjectLinks project={project} className="mt-8" />
      </div>
      <div className="relative overflow-hidden" style={{ borderRadius: 16, border: '1px solid var(--p-line)', aspectRatio: '860 / 760' }}>
        <Image
          src="/projects/reelearth/globe.webp"
          alt="The ReelEarth travel globe, with pins for Isola Tiberina, Île de Paris, Westminster, Santorini, Giza and the other islands"
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
        Sixteen famous places
      </h2>
      <p className="mt-3 max-w-2xl text-lg" style={{ color: 'var(--p-soft)' }}>
        Each island has its landmark, a local snack at the food stall and a legendary fish of its own.
      </p>
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {islands.map((isle) => (
          <li key={isle.id} className="overflow-hidden" style={{ borderRadius: 14, backgroundColor: 'var(--p-surface)', border: '1px solid var(--p-line)' }}>
            <div className="relative" style={{ aspectRatio: '16 / 10' }}>
              <Image
                src={`/projects/reelearth/islands/${isle.id}.webp`}
                alt={`${isle.name} in ReelEarth, with the ${isle.landmark}`}
                fill
                sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <p className={eyebrow} style={{ color: 'var(--p-soft)' }}>{isle.region}</p>
              <h3 className="mt-1 text-xl" style={{ fontWeight: 400 }}>{isle.name}</h3>
              <p className="mt-0.5 text-sm" style={{ color: 'var(--p-soft)' }}>{isle.landmark} · {isle.food}</p>
              <p className="mt-3 text-sm">
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
