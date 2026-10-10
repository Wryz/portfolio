import { projects, type ProjectCategory } from '@/lib/projects';
import { ProjectTile } from './ProjectTile';

const shelves: { category: ProjectCategory; id: string; title: string; intro: string }[] = [
  { category: 'game', id: 'games', title: 'Games', intro: 'Free to play in your browser. Pick one and jump straight in.' },
  { category: 'app', id: 'apps', title: 'Apps', intro: 'Apps for iPhone and Chrome, and the app that drives my robot.' },
  { category: 'website', id: 'websites', title: 'Websites', intro: 'Sites I designed, built and run.' },
];

/** The home page's projects, split into games, apps and websites, each a grid of tiles. */
export function ProjectIndex() {
  return (
    <section id="projects" className="mx-auto max-w-6xl space-y-20 px-4 pt-20 sm:space-y-28 sm:px-6 sm:pt-28 lg:px-8">
      {shelves.map(({ category, id, title, intro }) => (
        <div key={id}>
          <h2 id={id} className="mb-2 scroll-mt-20 text-3xl font-bold sm:text-4xl" style={{ color: 'var(--text)' }}>
            {title}
          </h2>
          <div className="mb-5 h-1 w-16 rounded-full" style={{ backgroundColor: '#D4834A' }} />
          <p className="mb-10 max-w-xl text-base sm:text-lg" style={{ color: 'var(--text-secondary)' }}>
            {intro}
          </p>
          <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {projects
              .filter((p) => p.category === category)
              .map((project) => (
                <ProjectTile key={project.slug} project={project} />
              ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
