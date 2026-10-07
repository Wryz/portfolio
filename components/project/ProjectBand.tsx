import Link from 'next/link';
import Image from 'next/image';
import { projectHref, type Project } from '@/lib/projects';

/**
 * A full-width band set in the project's own colours and typeface.
 * Used as the project index on the home page and as the "next project" link.
 */
export function ProjectBand({ project, lead }: { project: Project; lead?: string }) {
  const { band, theme } = project;
  const external = !!project.externalUrl;
  const inner = (
    <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-7 sm:gap-6 sm:px-6 sm:py-9 lg:px-8">
      {band.logo && (
        <Image
          src={band.logo}
          alt=""
          width={72}
          height={72}
          className="project-band-logo h-12 w-12 shrink-0 object-contain sm:h-16 sm:w-16"
          style={band.logoStyle}
        />
      )}
      <div className="min-w-0 flex-1">
        {lead && (
          <p className="mb-1 text-sm" style={{ color: band.soft, fontFamily: theme.body }}>
            {lead}
          </p>
        )}
        <p
          className="text-[1.75rem] leading-[1.1] sm:text-4xl lg:text-5xl"
          style={{ fontFamily: theme.display, ...band.nameStyle }}
        >
          {project.name}
        </p>
        <p className="mt-2 text-sm sm:text-base" style={{ color: band.soft, fontFamily: theme.body }}>
          {project.tagline}
        </p>
      </div>
      <div className="hidden shrink-0 text-right text-sm sm:block" style={{ color: band.soft, fontFamily: theme.body }}>
        {project.kind}
        {external && <span className="block">Opens its own site</span>}
      </div>
      <svg
        className="project-band-arrow h-6 w-6 shrink-0 sm:h-7 sm:w-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden
      >
        {external ? (
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M9 7h8v8" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
        )}
      </svg>
    </div>
  );

  const className = 'project-band block';
  const style = {
    background: band.image ? `${band.bg}, url('${band.image}') center / cover no-repeat` : band.bg,
    color: band.ink,
  };

  return external ? (
    <a href={projectHref(project)} target="_blank" rel="noopener noreferrer" className={className} style={style}>
      {inner}
    </a>
  ) : (
    <Link href={projectHref(project)} className={className} style={style}>
      {inner}
    </Link>
  );
}
