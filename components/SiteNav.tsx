'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { sections } from '@/lib/projects';
import { useTheme } from '@/lib/ThemeContext';

/** The bar at the top of the landing page and the section pages: home, the sections, and the theme switch. */
export function SiteNav() {
  const pathname = usePathname();
  const { mode, toggleTheme } = useTheme();

  return (
    <nav
      aria-label="Site"
      className="sticky top-0 z-40 border-b backdrop-blur-md"
      style={{ backgroundColor: 'color-mix(in srgb, var(--bg) 88%, transparent)', borderColor: 'var(--border)' }}
    >
      {/* Below sm the sections drop to a second row, so all four fit on a phone */}
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-2 px-4 sm:h-14 sm:flex-nowrap sm:gap-4 sm:px-6 lg:px-8">
        <Link href="/" className="site-nav-link mr-auto py-3 text-base font-bold sm:py-0 sm:text-lg" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text)' }}>
          My Phung
        </Link>
        <ul className="order-last flex w-full items-center justify-center gap-0.5 pb-2.5 sm:order-none sm:w-auto sm:gap-1 sm:pb-0">
          {sections.map((s) => {
            const href = `/${s.slug}`;
            const current = pathname === href;
            return (
              <li key={s.slug}>
                <Link
                  href={href}
                  aria-current={current ? 'page' : undefined}
                  className="site-nav-link rounded-full px-2.5 py-1.5 text-sm font-medium sm:px-3.5"
                  style={current ? { backgroundColor: 'var(--text)', color: 'var(--bg)' } : { color: 'var(--text-secondary)' }}
                >
                  {s.title}
                </Link>
              </li>
            );
          })}
        </ul>
        <button
          type="button"
          onClick={toggleTheme}
          className="site-nav-link ml-1 rounded-full p-2"
          style={{ color: 'var(--text-secondary)' }}
          aria-label={mode === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          {mode === 'dark' ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.66 7.66l-.71-.71M4.05 4.05l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.005 9.005 0 0012 21a9.005 9.005 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
}
