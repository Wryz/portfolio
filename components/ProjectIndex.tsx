import { projects, type Project, type ProjectCategory } from '@/lib/projects';
import { ProjectBand } from './project/ProjectBand';
import { GameTile } from './GameTile';

const inCategory = (category: ProjectCategory) => projects.filter((p) => p.category === category);

const games = inCategory('game').flatMap((p) => (p.game ? [{ project: p, game: p.game }] : []));

function ShelfHeading({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <h2 id={id} className="mb-2 scroll-mt-20 text-3xl font-bold sm:text-4xl" style={{ color: 'var(--text)' }}>
        {title}
      </h2>
      <div className="mb-5 h-1 w-16 rounded-full" style={{ backgroundColor: '#D4834A' }} />
      <p className="mb-10 max-w-xl text-base sm:text-lg" style={{ color: 'var(--text-secondary)' }}>
        {children}
      </p>
    </div>
  );
}

/** A shelf of project bands, each in that project's own colours and type. */
function BandShelf({ projects }: { projects: Project[] }) {
  return (
    <ul>
      {projects.map((project) => (
        <li key={project.slug}>
          <ProjectBand project={project} />
        </li>
      ))}
    </ul>
  );
}

/** The home page's projects, split into games, apps and websites. */
export function ProjectIndex() {
  return (
    <section id="projects" className="space-y-20 pt-20 sm:space-y-28 sm:pt-28">
      <div>
        <ShelfHeading id="games" title="Games">
          Free to play in your browser. Pick one and jump straight in.
        </ShelfHeading>
        <ul className="mx-auto grid max-w-6xl gap-x-6 gap-y-10 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
          {games.map(({ project, game }) => (
            <GameTile key={project.slug} project={project} game={game} />
          ))}
        </ul>
      </div>

      <div>
        <ShelfHeading id="apps" title="Apps">
          Apps for iPhone and Chrome, and the app that drives my robot. Each one looks like itself.
        </ShelfHeading>
        <BandShelf projects={inCategory('app')} />
      </div>

      <div>
        <ShelfHeading id="websites" title="Websites">
          Sites I designed, built and run.
        </ShelfHeading>
        <BandShelf projects={inCategory('website')} />
      </div>
    </section>
  );
}
