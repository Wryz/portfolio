import Image from 'next/image';
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

const bases: Record<string, string> = { '3-0': '#2F6FE0', '1-4': '#D93B3B' };

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
    <svg viewBox={`-10 -10 ${w * 5.5 + 20} ${r * 1.5 * 4 + r * 2 + 20}`} className="h-auto w-full" role="img" aria-label="A hexagonal game board with plains, forest, mountain, water and desert tiles, and a blue and a red base">
      {board.map((row, y) =>
        row.map((b, x) => {
          const cx = w / 2 + x * w + (y % 2 ? w / 2 : 0);
          const cy = r + y * r * 1.5;
          const base = bases[`${y}-${x}`];
          return (
            <g key={`${y}-${x}`}>
              <polygon points={hexPoints(cx, cy, r - 3)} fill={biome[b]} stroke="#FFF9DD" strokeWidth="4" strokeLinejoin="round" />
              {base && (
                <>
                  <rect x={cx - 15} y={cy - 12} width="30" height="26" rx="3" fill={base} stroke="#2E3138" strokeWidth="3" />
                  <path d={`M${cx - 15} ${cy - 12}v-9h8v6h4v-6h6v6h4v-6h8v9z`} fill={base} stroke="#2E3138" strokeWidth="3" strokeLinejoin="round" />
                </>
              )}
            </g>
          );
        }),
      )}
    </svg>
  );
}

const units = [
  { name: 'Infantry', move: 2, attack: 2, life: 5, cost: 5, note: 'Cheap and durable' },
  { name: 'Medic', move: 2, attack: 1, life: 4, cost: 8, note: 'Heals other units' },
  { name: 'Artillery', move: 1, attack: 5, life: 3, cost: 10, note: 'Attacks from range' },
  { name: 'Tank', move: 3, attack: 4, life: 8, cost: 12, note: 'Bonus from terrain' },
  { name: 'Helicopter', move: 5, attack: 3, life: 4, cost: 15, note: 'Crosses the board fast' },
];

export function WorldWarHexHero({ project }: { project: Project }) {
  return (
    <Section className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
      <div>
        <Image src="/projects/world-war-hex/logo.png" alt="" width={120} height={120} priority className="h-24 w-24 sm:h-28 sm:w-28" />
        <h1 className="mt-6 text-5xl leading-[1.02] sm:text-6xl lg:text-7xl" style={{ fontWeight: 700 }}>
          World War Hex
        </h1>
        <p className="mt-5 max-w-lg text-xl leading-relaxed" style={{ color: 'var(--p-soft)' }}>
          {project.tagline}
        </p>
        <ProjectLinks project={project} className="mt-8" />
      </div>
      <Board />
    </Section>
  );
}

export function WorldWarHexExtra() {
  return (
    <div style={{ backgroundColor: 'var(--p-accent)' }}>
      <Section>
        <h2 className="text-3xl sm:text-4xl" style={{ fontWeight: 700 }}>
          The army you can buy
        </h2>
        <div className="mt-8 overflow-x-auto" style={{ borderRadius: 16, backgroundColor: 'var(--p-surface)', border: '3px solid var(--p-ink)' }}>
          <table className="w-full min-w-[34rem] text-left text-base">
            <thead>
              <tr style={{ borderBottom: '3px solid var(--p-ink)' }}>
                {['Unit', 'Move', 'Attack', 'Lifespan', 'Cost', ''].map((h, i) => (
                  <th key={i} scope="col" className="px-4 py-3" style={{ fontWeight: 600 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {units.map((u, i) => (
                <tr key={u.name} style={{ borderTop: i ? '1.5px solid var(--p-line)' : undefined }}>
                  <th scope="row" className="px-4 py-3" style={{ fontWeight: 700 }}>{u.name}</th>
                  <td className="px-4 py-3">{u.move}</td>
                  <td className="px-4 py-3">{u.attack}</td>
                  <td className="px-4 py-3">{u.life}</td>
                  <td className="px-4 py-3">{u.cost}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--p-soft)' }}>{u.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}
