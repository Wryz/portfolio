import type { Project } from '@/lib/projects';
import { Section } from '../parts';

/* Sample rows that show the shape of the tracker. Not real listings. */
const rows = [
  { score: 94, title: 'Software engineering evaluator', site: 'AI training', change: 'New opening', tone: 'new' },
  { score: 88, title: 'Code review, Python', site: 'AI training', change: 'Moved to screening', tone: 'moved' },
  { score: 71, title: 'Mobile app usability test', site: 'User testing', change: 'New opening', tone: 'new' },
  { score: 52, title: 'Consumer habits study', site: 'Survey', change: 'No change', tone: 'quiet' },
  { score: 0, title: 'Session expired', site: 'AI training', change: 'Log in again', tone: 'warn' },
] as const;

const tones = {
  new: { color: '#FF7A1A', bg: 'rgba(255,122,26,0.14)' },
  moved: { color: '#6FD08C', bg: 'rgba(111,208,140,0.14)' },
  quiet: { color: '#9BA1AB', bg: 'rgba(155,161,171,0.12)' },
  warn: { color: '#F5C451', bg: 'rgba(245,196,81,0.14)' },
};

function Mark() {
  return (
    <svg viewBox="0 0 32 32" className="h-10 w-10" aria-hidden>
      <rect width="32" height="32" rx="6" fill="#FF7A1A" />
      <rect x="7" y="16" width="4" height="9" fill="#121417" />
      <rect x="14" y="11" width="4" height="14" fill="#121417" />
      <rect x="21" y="6" width="4" height="19" fill="#121417" />
    </svg>
  );
}

export function JobUpdatesHero({ project }: { project: Project }) {
  return (
    <Section className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
      <div>
        <Mark />
        <h1 className="mt-6 text-5xl leading-none sm:text-6xl" style={{ fontWeight: 500, letterSpacing: '-0.04em' }}>
          Job Updates
        </h1>
        <p className="mt-6 max-w-md text-xl leading-snug">{project.tagline}</p>
        <p className="mt-4 max-w-md text-base leading-relaxed" style={{ color: 'var(--p-soft)' }}>
          A Chrome extension that watches the platforms that won&apos;t email you, and tells you what changed.
        </p>
      </div>

      <figure className="min-w-0">
        <div style={{ backgroundColor: 'var(--p-surface)', border: '1px solid var(--p-line)', borderRadius: 8 }}>
          <div
            className="flex items-center justify-between gap-3 px-4 py-3 text-sm"
            style={{ borderBottom: '1px solid var(--p-line)', fontFamily: 'var(--p-display)' }}
          >
            <span>3 changes since last check</span>
            <span className="hidden sm:inline" style={{ color: 'var(--p-soft)' }}>sorted by priority</span>
          </div>
          <ul>
            {rows.map((r, i) => (
              <li
                key={r.title}
                className="flex items-center gap-3 px-4 py-3 sm:gap-4"
                style={{ borderTop: i ? '1px solid var(--p-line)' : undefined }}
              >
                <span
                  className="w-8 shrink-0 text-right text-lg tabular-nums"
                  style={{ fontFamily: 'var(--p-display)', fontWeight: 600, color: r.score ? 'var(--p-ink)' : 'var(--p-soft)' }}
                >
                  {r.score || '!'}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-base">{r.title}</span>
                  <span className="block text-sm" style={{ color: 'var(--p-soft)' }}>{r.site}</span>
                </span>
                <span
                  className="max-w-[7.5rem] shrink-0 px-2 py-1 text-right text-xs sm:max-w-none sm:text-sm"
                  style={{ fontFamily: 'var(--p-display)', borderRadius: 4, color: tones[r.tone].color, backgroundColor: tones[r.tone].bg }}
                >
                  {r.change}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <figcaption className="mt-3 text-sm" style={{ color: 'var(--p-soft)' }}>
          Sample data, to show how the list reads.
        </figcaption>
      </figure>
    </Section>
  );
}
