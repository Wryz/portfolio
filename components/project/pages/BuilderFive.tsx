import Image from 'next/image';
import type { Project } from '@/lib/projects';
import { ProjectLinks } from '../parts';

/** Wireframe globe, after the one on BuilderFive's own site. */
function Globe() {
  const meridians = [300, 250, 185, 110, 35];
  const parallels = [-225, -150, -75, 0, 75, 150, 225];
  return (
    <svg viewBox="-310 -310 620 620" className="h-full w-full" aria-hidden>
      <circle r="300" fill="#05070D" stroke="#61ABFF" strokeOpacity="0.9" strokeWidth="2" />
      <g transform="rotate(-14)" fill="none" stroke="#61ABFF" strokeOpacity="0.38" strokeWidth="1.2">
        {meridians.map((rx) => (
          <ellipse key={rx} rx={rx} ry="300" />
        ))}
        {parallels.map((y) => {
          const half = Math.sqrt(300 * 300 - y * y);
          return <line key={y} x1={-half} x2={half} y1={y} y2={y} />;
        })}
      </g>
      <circle r="300" fill="none" stroke="#61ABFF" strokeOpacity="0.25" strokeWidth="14" />
    </svg>
  );
}

export function BuilderFiveHero({ project }: { project: Project }) {
  return (
    <section className="b5-sky relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-3xl px-4 pt-20 text-center sm:px-6 sm:pt-28">
        <p className="flex items-center justify-center gap-3 text-2xl" style={{ color: '#fff', fontWeight: 600 }}>
          <Image src="/projects/builderfive/logo.webp" alt="" width={120} height={120} priority className="h-11 w-11" style={{ borderRadius: '22%' }} />
          BuilderFive
        </p>
        <h1 className="mt-6 text-6xl leading-[0.98] sm:text-7xl lg:text-8xl" style={{ fontWeight: 600, color: '#fff' }}>
          pioneer
          <br />
          the world
        </h1>
        <p className="mx-auto mt-6 max-w-md text-xl leading-snug" style={{ color: '#fff', fontWeight: 500 }}>
          and earn money while you visit coffee shops, malls, and more
        </p>
        <p className="mt-5 text-lg" style={{ color: '#FBBF24', fontWeight: 500 }}>
          {project.tagline}
        </p>
        <ProjectLinks project={project} className="mt-8 justify-center" />
      </div>
      <div className="relative mx-auto -mb-[38%] mt-14 w-[115%] max-w-3xl -translate-x-[6.5%] sm:-mb-[30%] sm:w-full sm:translate-x-0">
        <Globe />
      </div>
    </section>
  );
}
