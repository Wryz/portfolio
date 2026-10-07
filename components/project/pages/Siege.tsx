import Image from 'next/image';
import type { Project } from '@/lib/projects';
import { Section } from '../parts';

const figures = [
  { value: '100,000+', label: 'unique players' },
  { value: '1,000+', label: 'custom items' },
  { value: '60+', label: 'volunteers on the team' },
];

export function SiegeHero({ project }: { project: Project }) {
  return (
    <section className="relative flex min-h-[78vh] items-end overflow-hidden">
      <Image
        src="/projects/siege/hero.webp"
        alt="A sunset view of a floating mountain and rope bridge on the Siege server"
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ imageRendering: 'auto' }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, #17121F 0%, rgba(23,18,31,0.82) 32%, rgba(23,18,31,0.1) 75%)' }}
        aria-hidden
      />
      <div className="relative mx-auto w-full max-w-6xl px-4 pb-14 pt-40 sm:px-6 lg:px-8">
        <Image src="/projects/siege/logo.png" alt="" width={256} height={256} className="mb-5 h-20 w-20 sm:h-24 sm:w-24" style={{ imageRendering: 'pixelated' }} />
        <h1 className="text-7xl leading-none sm:text-8xl lg:text-9xl" style={{ fontWeight: 700, letterSpacing: '0.04em' }}>
          SIEGE
        </h1>
        <p className="mt-4 text-xl sm:text-2xl" style={{ color: 'var(--p-accent)', fontFamily: 'var(--p-display)' }}>
          {project.tagline}
        </p>
        <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-5">
          {figures.map((f) => (
            <div key={f.label} className="flex flex-col-reverse">
              <dt className="text-base" style={{ color: 'var(--p-soft)' }}>{f.label}</dt>
              <dd className="text-3xl sm:text-4xl" style={{ fontFamily: 'var(--p-display)', fontWeight: 600 }}>{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function SiegeExtra({ project }: { project: Project }) {
  return (
    <Section className="grid gap-10 pt-0 sm:pt-0 lg:grid-cols-[1.4fr_1fr]">
      <div>
        <h2 className="text-2xl sm:text-3xl" style={{ fontWeight: 600 }}>Official trailer</h2>
        <div className="relative mt-5 aspect-video w-full" style={{ border: '3px solid var(--p-line)' }}>
          <iframe
            src="https://www.youtube.com/embed/6ke_CKSm1dM"
            title="SiegeRPG official trailer"
            loading="lazy"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </div>
      <div>
        <h2 className="text-2xl sm:text-3xl" style={{ fontWeight: 600 }}>Source</h2>
        <ul className="mt-5" style={{ border: '3px solid var(--p-line)' }}>
          {project.githubRepos?.map((repo, i) => (
            <li key={repo.href} style={{ borderTop: i ? '3px solid var(--p-line)' : undefined }}>
              <a
                href={repo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="siege-repo flex items-center justify-between gap-3 px-4 py-3.5"
              >
                <span style={{ fontWeight: 600 }}>{repo.label}</span>
                <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-label="opens on GitHub">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M9 7h8v8" />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
