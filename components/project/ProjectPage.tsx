import { pagedProjects, themeVars, type Project } from '@/lib/projects';
import { ProjectSwitcher } from './ProjectSwitcher';
import { ProjectBand } from './ProjectBand';
import { MediaGallery } from './MediaGallery';
import { RichText, Section } from './parts';
import { OurTailTalesHero, OurTailTalesExtra } from './pages/OurTailTales';
import { BrainBenchmarkHero, BrainBenchmarkExtra } from './pages/BrainBenchmark';
import { BuilderFiveHero } from './pages/BuilderFive';
import { HexHordesHero, HexHordesExtra } from './pages/HexHordes';
import { AustinFoundersHero } from './pages/AustinFounders';
import { JobUpdatesHero } from './pages/JobUpdates';
import { MiqoHero, MiqoExtra } from './pages/Miqo';
import { SiegeHero, SiegeExtra } from './pages/Siege';

type Part = (props: { project: Project }) => React.ReactNode;

/** Every project opens with its own hero; some add a section that only makes sense for them. */
const layouts: Record<string, { Hero: Part; Extra?: Part }> = {
  ourtailtales: { Hero: OurTailTalesHero, Extra: OurTailTalesExtra },
  'brain-benchmark': { Hero: BrainBenchmarkHero, Extra: BrainBenchmarkExtra },
  builderfive: { Hero: BuilderFiveHero },
  'hex-hordes': { Hero: HexHordesHero, Extra: HexHordesExtra },
  'austin-founders': { Hero: AustinFoundersHero },
  'job-updates': { Hero: JobUpdatesHero },
  miqo: { Hero: MiqoHero, Extra: MiqoExtra },
  siege: { Hero: SiegeHero, Extra: SiegeExtra },
};

export function ProjectPage({ project }: { project: Project }) {
  const { Hero, Extra } = layouts[project.slug];
  const index = pagedProjects.findIndex((p) => p.slug === project.slug);
  const next = pagedProjects[(index + 1) % pagedProjects.length];

  return (
    <div className="project-page" style={themeVars(project.theme)}>
      <ProjectSwitcher current={project.slug} />
      <main>
        <Hero project={project} />

        <Section className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <div className="max-w-2xl space-y-5 text-lg leading-relaxed" style={{ color: 'var(--p-soft)' }}>
            {project.about.map((p, i) => (
              <p key={i}>
                <RichText text={p} />
              </p>
            ))}
          </div>
          <dl className="self-start" style={{ borderTop: '2px solid var(--p-ink)' }}>
            <div className="flex gap-4 py-3" style={{ borderBottom: '1px solid var(--p-line)' }}>
              <dt className="w-20 shrink-0" style={{ color: 'var(--p-soft)' }}>Type</dt>
              <dd style={{ fontWeight: 600 }}>{project.kind}</dd>
            </div>
            <div className="flex gap-4 py-3" style={{ borderBottom: '1px solid var(--p-line)' }}>
              <dt className="w-20 shrink-0" style={{ color: 'var(--p-soft)' }}>{project.stackLabel ?? 'Built with'}</dt>
              <dd style={{ fontWeight: 600 }}>{project.stack.join(', ')}</dd>
            </div>
          </dl>
        </Section>

        {Extra && <Extra project={project} />}

        {project.mediaSections && (
          <Section>
            <MediaGallery sections={project.mediaSections} />
          </Section>
        )}
      </main>

      <ProjectBand project={next} lead="Next project" />
    </div>
  );
}
