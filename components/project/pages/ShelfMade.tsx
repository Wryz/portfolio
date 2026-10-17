import Image from 'next/image';
import type { Project } from '@/lib/projects';
import { ProjectLinks, Section } from '../parts';

/* The brand's own colours, from the game */
const green = '#3FA87A';
const yellow = '#FFC044';
const wood = '#C98F4E';

/* A day in the game, from bare walls to a second branch, in the game's own words */
const loop = [
  { title: 'Pick your corner', text: 'Main Road for passing drivers, Elm Street for loyal regulars, or the bus stop for commuters. Each has its own traffic and rent.' },
  { title: 'Stock every shelf', text: 'Order from three wholesalers, then carry the boxes from the pallet at the back door out to the shelves.' },
  { title: 'Ring up every basket', text: 'Scan each item at the till yourself, until you can hire a cashier on day 3.' },
  { title: 'Open a second branch', text: 'Hire stockers and a manager who reorders, prices and advertises by your rules, then grow into a chain.' },
];

export function ShelfMadeHero({ project }: { project: Project }) {
  return (
    <Section className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
      <div>
        <div className="flex items-center gap-4">
          <Image src="/projects/shelf-made/logo.png" alt="" width={180} height={180} priority className="h-20 w-20 sm:h-24 sm:w-24" />
          <span
            className="inline-flex -rotate-3 flex-col rounded-xl px-4 py-2 leading-tight shadow-md"
            style={{ backgroundColor: yellow, color: '#38383D' }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.14em]">Free beta</span>
            <span className="font-semibold">until Dec 10, 2026</span>
          </span>
        </div>
        <h1 className="mt-6 text-6xl leading-[0.95] sm:text-7xl" style={{ fontWeight: 700 }}>
          Shelf <span style={{ color: green }}>Made</span>
        </h1>
        {/* The wordmark's shelf-bracket underline */}
        <svg viewBox="0 0 280 16" className="mt-4 h-4 w-64 sm:w-72" aria-hidden>
          <rect x="0" y="2" width="280" height="7" rx="3.5" fill={wood} />
          <rect x="20" y="6" width="7" height="10" rx="2" fill="#38383D" />
          <rect x="253" y="6" width="7" height="10" rx="2" fill="#38383D" />
        </svg>
        <p className="mt-6 max-w-md text-xl leading-relaxed" style={{ color: 'var(--p-soft)' }}>
          Four bare walls on a busy crossroads, and three rivals across the street. Build the corner everyone shops at, one shelf at a time.
        </p>
        <ProjectLinks project={project} className="mt-8" />
      </div>
      <div className="overflow-hidden" style={{ borderRadius: 18, border: `4px solid ${green}`, aspectRatio: '16 / 10', backgroundColor: '#CFE8DA' }}>
        <Image
          src="/projects/shelf-made/gameplay.webp"
          alt="A Shelf Made shop on its first morning: staff stock the shelves while a customer browses and another parks outside"
          width={1260}
          height={787}
          priority
          sizes="(min-width: 1024px) 640px, 100vw"
          className="h-full w-full object-cover"
        />
      </div>
    </Section>
  );
}

export function ShelfMadeExtra() {
  return (
    <Section>
      <h2 className="text-3xl sm:text-4xl" style={{ fontWeight: 700 }}>
        From bare concrete to a chain of stores
      </h2>
      <p className="mt-3 max-w-2xl text-lg" style={{ color: 'var(--p-soft)' }}>
        Early on you do the hands-on work yourself. As the shop grows, each job can go to staff, so it never turns into a chore.
      </p>
      <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {loop.map((step, i) => (
          <li key={step.title} className="p-5" style={{ borderRadius: 14, backgroundColor: 'var(--p-surface)', border: '1px solid var(--p-line)' }}>
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full text-lg"
              style={{ backgroundColor: green, color: '#FFFFFF', fontWeight: 700 }}
              aria-hidden
            >
              {i + 1}
            </span>
            <h3 className="mt-4 text-xl" style={{ fontWeight: 600 }}>{step.title}</h3>
            <p className="mt-1.5 leading-relaxed" style={{ color: 'var(--p-soft)' }}>{step.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
