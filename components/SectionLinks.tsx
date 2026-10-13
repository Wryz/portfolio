import Image from 'next/image';
import Link from 'next/link';
import { projects, sections } from '@/lib/projects';

/** The landing page's way into the site: one card per section, showing a few of its thumbnails. */
export function SectionLinks() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-4 pt-20 sm:px-6 sm:pt-28 lg:px-8">
      <h2 className="mb-2 text-3xl font-bold sm:text-4xl" style={{ color: 'var(--text)' }}>
        What I make
      </h2>
      <div className="mb-10 h-1 w-16 rounded-full" style={{ backgroundColor: '#D4834A' }} />
      <ul className="grid gap-6 md:grid-cols-3">
        {sections.map((s) => {
          const items = projects.filter((p) => p.category === s.category);
          const preview = items.slice(0, 4);
          return (
            <li key={s.slug}>
              <Link
                href={`/${s.slug}`}
                className="section-card group block overflow-hidden rounded-2xl"
                style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
              >
                <div className={`grid gap-0.5 ${preview.length > 1 ? 'grid-cols-2' : ''}`} style={{ aspectRatio: '16 / 9', backgroundColor: 'var(--border)' }} aria-hidden>
                  {preview.map((p) => (
                    <div key={p.slug} className="relative overflow-hidden">
                      <Image src={p.tile.thumbnail} alt="" fill sizes="(min-width: 768px) 190px, 50vw" className="section-card-image object-cover" />
                    </div>
                  ))}
                </div>
                <div className="flex items-end gap-4 p-5">
                  <div className="min-w-0 flex-1">
                    <p className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text)' }}>
                      {s.title}
                      <span className="ml-2 text-base font-medium" style={{ color: 'var(--text-muted)' }}>{items.length}</span>
                    </p>
                    <p className="mt-1 text-sm leading-snug" style={{ color: 'var(--text-secondary)' }}>
                      {items.slice(0, 3).map((p) => p.name).join(', ')}
                      {items.length > 3 ? ' and more' : ''}
                    </p>
                  </div>
                  <svg className="section-card-arrow h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: '#D4834A' }} aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
