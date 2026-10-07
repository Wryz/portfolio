'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { projects, projectHref } from '@/lib/projects';

/** Fixed bar on every project page: back to the home page, and hop straight to any other project. */
export function ProjectSwitcher({ current }: { current: string }) {
  const activeRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: 'nearest', inline: 'center' });
  }, [current]);

  return (
    <nav
      aria-label="Projects"
      className="fixed inset-x-0 top-0 z-40 border-b backdrop-blur-md"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--p-bg) 86%, transparent)',
        borderColor: 'var(--p-line)',
        color: 'var(--p-ink)',
        fontFamily: 'var(--font-body), system-ui, sans-serif',
      }}
    >
      <div className="mx-auto flex h-12 max-w-6xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/#projects" className="switcher-link flex shrink-0 items-center gap-1.5 text-sm font-semibold">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M11 6l-6 6 6 6" />
          </svg>
          My Phung
        </Link>
        <span className="h-5 w-px shrink-0" style={{ backgroundColor: 'var(--p-line)' }} aria-hidden />
        <ul className="switcher-list scrollbar-hide flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto">
          {projects.map((p) => {
            const isCurrent = p.slug === current;
            const common = {
              className: 'switcher-link flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1.5 text-[13px]',
              style: isCurrent
                ? { backgroundColor: 'var(--p-ink)', color: 'var(--p-bg)', fontWeight: 600 }
                : { color: 'var(--p-soft)' },
            };
            const dot = (
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ background: p.band.image ? p.theme.accent : p.band.bg, boxShadow: '0 0 0 1px color-mix(in srgb, currentColor 45%, transparent)' }}
                aria-hidden
              />
            );
            return (
              <li key={p.slug} className="shrink-0">
                {p.externalUrl ? (
                  <a href={projectHref(p)} target="_blank" rel="noopener noreferrer" {...common}>
                    {dot}
                    {p.short ?? p.name}
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-label="opens in a new tab">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M9 7h8v8" />
                    </svg>
                  </a>
                ) : (
                  <Link
                    href={projectHref(p)}
                    ref={isCurrent ? activeRef : undefined}
                    aria-current={isCurrent ? 'page' : undefined}
                    {...common}
                  >
                    {dot}
                    {p.short ?? p.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
