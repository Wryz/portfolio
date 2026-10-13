import Image from 'next/image';
import type { Project } from '@/lib/projects';
import { Section } from '../parts';

/* The brand's own colours, from the game's design notes */
const green = '#3FA87A';
const yellow = '#FFC044';
const wood = '#C98F4E';

/* What a day in the game looks like, from the corner shop to the chain */
const loop = [
  { title: 'Ring up customers', text: 'Click the register to scan each item, with a beep, the till and a "+$" as they pay.' },
  { title: 'Stock the shelves', text: 'Order stock, meet the delivery truck at the back door and carry the boxes out to the shelves.' },
  { title: 'Hire staff', text: 'Cashiers, stockers, cleaners and managers take every chore off your hands, at a price.' },
  { title: 'Open a chain', text: 'Open more stores around town, each run by a manager you pick, against rivals that play by the same rules.' },
];

const customers = ['Bargain hunters', 'Convenience shoppers', 'Brand loyalists', 'Impulse buyers'];

export function ShelfMadeHero({ project }: { project: Project }) {
  return (
    <Section className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
      <div>
        <span
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold"
          style={{ backgroundColor: 'var(--p-ink)', color: '#FFFFFF' }}
        >
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: yellow }} aria-hidden />
          In development
        </span>
        <h1 className="mt-6 text-6xl leading-[0.95] sm:text-7xl lg:text-8xl" style={{ fontWeight: 700 }}>
          Shelf <span style={{ color: green }}>Made</span>
        </h1>
        {/* The wordmark's shelf-bracket underline */}
        <svg viewBox="0 0 280 16" className="mt-4 h-4 w-64 sm:w-72" aria-hidden>
          <rect x="0" y="2" width="280" height="7" rx="3.5" fill={wood} />
          <rect x="20" y="6" width="7" height="10" rx="2" fill="#38383D" />
          <rect x="253" y="6" width="7" height="10" rx="2" fill="#38383D" />
        </svg>
        <p className="mt-6 max-w-md text-xl leading-relaxed" style={{ color: 'var(--p-soft)' }}>
          {project.tagline}
        </p>
      </div>
      <Image
        src="/projects/shelf-made/shelf.webp"
        alt="A grocery shelf under a green and white awning, stocked with bottles, boxes, cans and fruit"
        width={820}
        height={760}
        priority
        className="mx-auto h-auto w-full max-w-md"
      />
    </Section>
  );
}

export function ShelfMadeExtra() {
  return (
    <Section>
      <h2 className="text-3xl sm:text-4xl" style={{ fontWeight: 700 }}>
        From the register to a chain of stores
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
      <p className="mt-10 text-lg" style={{ color: 'var(--p-soft)' }}>
        Every store is scored by four kinds of customer:{' '}
        <span style={{ color: 'var(--p-ink)', fontWeight: 600 }}>{customers.join(', ')}</span>.
      </p>
    </Section>
  );
}
