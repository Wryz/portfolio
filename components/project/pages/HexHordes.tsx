import Image from 'next/image';
import { GiBootPrints, GiCrossedSwords, GiHearts } from 'react-icons/gi';
import type { Project } from '@/lib/projects';
import { ProjectLinks, Section } from '../parts';

const biome = {
  plain: '#9CDE57',
  forest: '#38A63C',
  mountain: '#B8B8B8',
  water: '#5AD2FF',
  desert: '#FFE066',
} as const;

type Biome = keyof typeof biome;

/* A small board, in the game's own tile colours. Rows are offset like the real hex grid. */
const board: Biome[][] = [
  ['forest', 'plain', 'plain', 'mountain', 'mountain'],
  ['plain', 'plain', 'water', 'plain', 'forest'],
  ['desert', 'plain', 'water', 'water', 'plain'],
  ['desert', 'desert', 'plain', 'forest', 'plain'],
  ['mountain', 'plain', 'plain', 'plain', 'forest'],
];

/* Your castle in the Kingdom's blue, the enemy's in red */
const castles: Record<string, string> = { '3-0': '#3B82F6', '1-4': '#DC2626' };

function hexPoints(cx: number, cy: number, r: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 30);
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join(' ');
}

function Board() {
  const r = 50;
  const w = Math.sqrt(3) * r;
  return (
    <svg
      viewBox={`-10 -10 ${w * 5.5 + 20} ${r * 1.5 * 4 + r * 2 + 20}`}
      className="h-auto w-full drop-shadow-[0_8px_0_rgba(15,23,42,0.25)]"
      role="img"
      aria-label="A hexagonal battlefield with plains, forest, mountain, water and desert tiles, and a blue and a red castle"
    >
      {board.map((row, y) =>
        row.map((b, x) => {
          const cx = w / 2 + x * w + (y % 2 ? w / 2 : 0);
          const cy = r + y * r * 1.5;
          const castle = castles[`${y}-${x}`];
          return (
            <g key={`${y}-${x}`}>
              <polygon points={hexPoints(cx, cy, r - 3)} fill={biome[b]} stroke="#B3E1FF" strokeWidth="4" strokeLinejoin="round" />
              {castle && (
                <>
                  <rect x={cx - 15} y={cy - 12} width="30" height="26" rx="3" fill={castle} stroke="#0F172A" strokeWidth="3" />
                  <path d={`M${cx - 15} ${cy - 12}v-9h8v6h4v-6h6v6h4v-6h8v9z`} fill={castle} stroke="#0F172A" strokeWidth="3" strokeLinejoin="round" />
                </>
              )}
            </g>
          );
        }),
      )}
    </svg>
  );
}

/* Rarity frames, as the game draws them */
const rarity = {
  common: { frame: '#94A3B8', label: 'Common' },
  rare: { frame: '#3B82F6', label: 'Rare' },
  epic: { frame: '#A855F7', label: 'Epic' },
  legendary: { frame: '#F59E0B', label: 'Legendary' },
} as const;

/* A few of the Kingdom's cards, with their art and base stats from the game */
const cards = [
  { name: 'Swordsmen', art: 'infantry', rarity: 'common', attack: 4, health: 10, move: 2, role: 'Cheap all-rounder' },
  { name: 'Archers', art: 'artillery', rarity: 'common', attack: 10, health: 6, move: 1, role: 'Hits hard from 2 hexes' },
  { name: 'Knights', art: 'helicopter', rarity: 'rare', attack: 8, health: 10, move: 5, role: 'Fast mounted cavalry' },
  { name: 'Mages', art: 'medic', rarity: 'rare', attack: 6, health: 8, move: 2, role: 'Ranged spells, heals allies' },
  { name: 'Longbowmen', art: 'longbow', rarity: 'epic', attack: 12, health: 8, move: 2, role: 'Shoots from 3 hexes' },
  { name: 'Pegasus Knights', art: 'pegasus', rarity: 'legendary', attack: 12, health: 18, move: 5, role: 'Flies over water and mountains' },
] as const;

const facts = [
  { value: '150', label: 'battles' },
  { value: '15', label: 'regions' },
  { value: '50', label: 'monsters' },
  { value: '12', label: 'card bonds' },
];

/* Dark game-menu panel with a solid drop shadow */
const panel = { backgroundColor: '#0F172A', color: '#F1F5F9', borderRadius: 16, boxShadow: '0 6px 0 rgba(15,23,42,0.45)' };

export function HexHordesHero({ project }: { project: Project }) {
  return (
    <Section className="hh grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
      <div>
        <div className="flex items-center gap-4">
          <Image
            src="/projects/hex-hordes/logo.png"
            alt=""
            width={128}
            height={128}
            priority
            className="h-20 w-20 drop-shadow-[0_6px_0_rgba(15,23,42,0.35)] sm:h-28 sm:w-28"
          />
          <h1 className="leading-[0.85]" style={{ fontWeight: 700 }}>
            <span className="block text-3xl sm:text-4xl" style={{ color: '#1E293B' }}>
              Hex
            </span>
            <span className="hh-wordmark block text-6xl sm:text-7xl lg:text-8xl" style={{ color: '#FBBF24' }}>
              HORDES
            </span>
          </h1>
        </div>
        <p className="mt-6 max-w-lg text-xl font-semibold leading-relaxed sm:text-2xl" style={{ color: 'var(--p-soft)' }}>
          {project.tagline}
        </p>
        <ProjectLinks project={project} className="mt-8" />
      </div>
      <Board />
    </Section>
  );
}

export function HexHordesExtra() {
  return (
    <Section>
      <h2 className="text-3xl sm:text-4xl" style={{ fontWeight: 700 }}>
        Your army is a deck
      </h2>
      <p className="mt-3 max-w-2xl text-lg" style={{ color: 'var(--p-soft)' }}>
        Every troop is a card. Pick four for each battle, then upgrade them with the coins you win.
      </p>

      <ul className="mt-10 grid grid-cols-3 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-6">
        {cards.map((c) => (
          <li key={c.name}>
            <div
              className="hh-card p-[3px]"
              style={{ backgroundColor: rarity[c.rarity].frame, borderRadius: 12, boxShadow: '0 5px 0 rgba(15,23,42,0.55)' }}
            >
              <div className="flex flex-col p-1.5" style={{ backgroundColor: '#0F172A', borderRadius: 9 }}>
                <div className="relative overflow-hidden" style={{ aspectRatio: '5 / 4', borderRadius: 6 }}>
                  <Image
                    src={`/projects/hex-hordes/cards/${c.art}.jpg`}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 180px, 33vw"
                    className="object-cover"
                  />
                </div>
                <p
                  className="mt-1.5 flex min-h-[2.5em] items-center justify-center text-center text-sm leading-tight sm:min-h-0 sm:text-base"
                  style={{ fontFamily: 'var(--p-display)', color: '#F1F5F9' }}
                >
                  {c.name}
                </p>
                <dl className="mt-0.5 flex justify-around text-xs font-bold tabular-nums sm:text-sm" style={{ color: '#F1F5F9' }}>
                  <div className="flex items-center gap-0.5">
                    <dt><GiCrossedSwords aria-label="Attack" style={{ color: '#FCA5A5' }} /></dt>
                    <dd>{c.attack}</dd>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <dt><GiHearts aria-label="Health" style={{ color: '#86EFAC' }} /></dt>
                    <dd>{c.health}</dd>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <dt><GiBootPrints aria-label="Movement" style={{ color: '#7DD3FC' }} /></dt>
                    <dd>{c.move}</dd>
                  </div>
                </dl>
              </div>
            </div>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--p-soft)' }}>
              {rarity[c.rarity].label}
            </p>
            <p className="mt-0.5 text-sm leading-snug">{c.role}</p>
          </li>
        ))}
      </ul>

      <dl className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {facts.map((f) => (
          <div key={f.label} className="flex flex-col-reverse px-5 py-4" style={panel}>
            <dt className="mt-1 text-sm font-semibold uppercase tracking-widest" style={{ color: '#CBD5E1' }}>{f.label}</dt>
            <dd className="text-4xl" style={{ fontFamily: 'var(--p-display)', color: '#FCD34D' }}>{f.value}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
