import Image from 'next/image';
import Link from 'next/link';
import { projectHref, type GameListing, type Project } from '@/lib/projects';

/**
 * A game in the home page's games grid: the thumbnail says what the game is about,
 * the name sits under it, and a click goes straight to the game.
 */
export function GameTile({ project, game }: { project: Project; game: GameListing }) {
  const playable = !!game.play;
  const host = game.play && new URL(game.play).hostname.replace(/^www\./, '');

  const tile = (
    <>
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{ aspectRatio: '16 / 10', backgroundColor: 'var(--bg-muted)', boxShadow: '0 1px 0 var(--border)' }}
      >
        <Image
          src={game.thumbnail}
          alt=""
          fill
          sizes="(min-width: 1024px) 368px, (min-width: 640px) 50vw, 100vw"
          className="game-tile-image object-cover"
        />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/75 px-3 py-1 text-xs font-semibold text-white">
          {playable ? (
            <>
              <svg className="h-3 w-3" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
                <path d="M3 1.5v9l7.5-4.5z" />
              </svg>
              Play
            </>
          ) : (
            project.kind
          )}
        </span>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/65 to-transparent px-4 pb-3.5 pt-10">
          <p className="text-sm leading-snug text-white">{game.blurb}</p>
        </div>
      </div>
      <p className="mt-3 pr-24 text-lg font-semibold leading-tight" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text)' }}>
        {project.name}
      </p>
      <p className="mt-0.5 pr-24 text-sm" style={{ color: 'var(--text-secondary)' }}>
        {host ? `${project.kind} · ${host}` : project.kind}
      </p>
    </>
  );

  return (
    <li className="relative">
      {playable ? (
        <a href={game.play} target="_blank" rel="noopener noreferrer" className="game-tile block">
          {tile}
        </a>
      ) : (
        <Link href={projectHref(project)} className="game-tile block">
          {tile}
        </Link>
      )}
      {/* The tile itself plays the game, so the story behind it gets its own link */}
      {playable && (
        <Link
          href={projectHref(project)}
          className="game-tile-about absolute bottom-0 right-0 rounded-full px-3 py-1.5 text-sm font-medium"
          style={{ color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
          aria-label={`About ${project.name}`}
        >
          About
        </Link>
      )}
    </li>
  );
}
