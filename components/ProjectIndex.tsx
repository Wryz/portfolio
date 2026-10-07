import { projects } from '@/lib/projects';
import { ProjectBand } from './project/ProjectBand';

/** The home page's project list: one band per project, each in that project's own colours and type. */
export function ProjectIndex() {
  return (
    <section id="projects" className="pt-20 sm:pt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-2 text-3xl font-bold sm:text-4xl" style={{ color: 'var(--text)' }}>
          Projects
        </h2>
        <div className="mb-5 h-1 w-16 rounded-full" style={{ backgroundColor: '#D4834A' }} />
        <p className="mb-10 max-w-xl text-base sm:text-lg" style={{ color: 'var(--text-secondary)' }}>
          Each one looks like itself. Pick a project to open its page.
        </p>
      </div>
      <ul>
        {projects.map((project) => (
          <li key={project.slug}>
            <ProjectBand project={project} />
          </li>
        ))}
      </ul>
    </section>
  );
}
