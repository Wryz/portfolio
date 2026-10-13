import { projects, sections } from '@/lib/projects';
import { SiteNav } from './SiteNav';
import { ProjectTile } from './ProjectTile';
import { Footer } from './Footer';

/** One section of the site (/games, /apps, /websites): its projects as a grid of tiles. */
export function SectionPage({ slug }: { slug: string }) {
  const section = sections.find((s) => s.slug === slug)!;
  return (
    <>
      <SiteNav />
      <main className="mx-auto min-h-[70vh] max-w-6xl px-4 pb-24 pt-14 sm:px-6 sm:pt-20 lg:px-8">
        <h1 className="mb-2 text-4xl font-bold sm:text-5xl" style={{ color: 'var(--text)' }}>
          {section.title}
        </h1>
        <div className="mb-5 h-1 w-16 rounded-full" style={{ backgroundColor: '#D4834A' }} />
        <p className="mb-12 max-w-xl text-base sm:text-lg" style={{ color: 'var(--text-secondary)' }}>
          {section.intro}
        </p>
        <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {projects
            .filter((p) => p.category === section.category)
            .map((project) => (
              <ProjectTile key={project.slug} project={project} />
            ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
