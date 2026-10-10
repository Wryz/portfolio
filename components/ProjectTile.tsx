import Image from 'next/image';
import Link from 'next/link';
import { projectHref, type Project, type TileAction } from '@/lib/projects';

const actionLabel: Record<TileAction, string> = { play: 'Play', visit: 'Visit', download: 'App Store' };

function displayHost(href: string) {
  const host = new URL(href).hostname.replace(/^www\./, '');
  return host === 'apps.apple.com' ? 'App Store' : host;
}

function Badge({ project }: { project: Project }) {
  const { tile } = project;
  if (tile.closed) {
    return <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold tracking-wider text-white">CLOSED</span>;
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/75 px-3 py-1 text-xs font-semibold text-white">
      {tile.action === 'play' && (
        <svg className="h-3 w-3" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
          <path d="M3 1.5v9l7.5-4.5z" />
        </svg>
      )}
      {tile.action ? actionLabel[tile.action] : project.kind}
      {(tile.action === 'visit' || tile.action === 'download') && (
        <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M9 7h8v8" />
        </svg>
      )}
    </span>
  );
}

/**
 * A project on the home page: the thumbnail says what it is about, the name sits under it,
 * and a click goes straight to the thing itself (the game, the site, the App Store) where there is one.
 */
export function ProjectTile({ project }: { project: Project }) {
  const { tile } = project;
  const href = tile.href ?? project.externalUrl;
  // The project's own page here, when the tile leads somewhere else
  const about = href && !project.externalUrl ? projectHref(project) : undefined;

  const inner = (
    <>
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{ aspectRatio: '16 / 10', backgroundColor: 'var(--bg-muted)', boxShadow: '0 1px 0 var(--border)' }}
      >
        <Image
          src={tile.thumbnail}
          alt=""
          fill
          sizes="(min-width: 1024px) 368px, (min-width: 640px) 50vw, 100vw"
          className="project-tile-image object-cover"
        />
        <span className="absolute left-3 top-3">
          <Badge project={project} />
        </span>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/65 to-transparent px-4 pb-3.5 pt-10">
          <p className="text-sm leading-snug text-white">{tile.blurb}</p>
        </div>
      </div>
      <p className={`mt-3 text-lg font-semibold leading-tight ${about ? 'pr-24' : ''}`} style={{ fontFamily: 'var(--font-heading)', color: 'var(--text)' }}>
        {project.name}
      </p>
      <p className={`mt-0.5 truncate text-sm ${about ? 'pr-24' : ''}`} style={{ color: 'var(--text-secondary)' }}>
        {href ? `${project.kind} · ${displayHost(href)}` : project.kind}
      </p>
    </>
  );

  return (
    <li className="relative">
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="project-tile block">
          {inner}
        </a>
      ) : (
        <Link href={projectHref(project)} className="project-tile block">
          {inner}
        </Link>
      )}
      {/* The tile leads to the project itself, so the story behind it gets its own link */}
      {about && (
        <Link
          href={about}
          className="project-tile-about absolute bottom-0 right-0 rounded-full px-3 py-1.5 text-sm font-medium"
          style={{ color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
          aria-label={`About ${project.name}`}
        >
          About
        </Link>
      )}
    </li>
  );
}
