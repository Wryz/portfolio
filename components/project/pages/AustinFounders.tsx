import Image from 'next/image';
import type { Project } from '@/lib/projects';
import { ProjectLinks } from '../parts';

/* Figures as published on the community's site. */
const figures = [
  { value: '54', label: 'Startups' },
  { value: '$20M+', label: 'Collective ARR' },
  { value: '$30M+', label: 'Capital raised' },
  { value: '300+', label: 'Events hosted' },
];

export function AustinFoundersHero({ project }: { project: Project }) {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ backgroundImage: "url('/background/austin-skyline.webp')", backgroundSize: 'cover', backgroundPosition: 'center' }}
        aria-hidden
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to right bottom, rgba(44,44,44,0.96), rgba(44,44,44,0.84) 55%, rgba(44,44,44,0.35))' }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <Image src="/projects/austin-founders/logo.webp" alt="" width={144} height={144} priority className="mb-6 h-20 w-20 sm:h-24 sm:w-24" />
        <h1 className="max-w-3xl text-4xl leading-[1.15] sm:text-5xl lg:text-6xl" style={{ fontWeight: 700 }}>
          Austin Founders Community
        </h1>
        <div
          className="mt-6 h-1 w-40 rounded-full"
          style={{ background: 'linear-gradient(to right, #BF5700, #4A90A4, #F25C54)' }}
          aria-hidden
        />
        <p className="mt-6 max-w-2xl text-lg leading-relaxed sm:text-xl" style={{ color: 'rgba(255,255,255,0.9)' }}>
          An invite-only community for founders building in Austin, centered on entrepreneurship, business, and
          authentic connections.
        </p>
        <dl className="mt-10 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
          {figures.map((f) => (
            <div key={f.label} className="flex flex-col-reverse">
              <dt className="text-base" style={{ color: 'var(--p-soft)' }}>{f.label}</dt>
              <dd className="text-3xl sm:text-4xl" style={{ fontWeight: 700 }}>{f.value}</dd>
            </div>
          ))}
        </dl>
        <ProjectLinks project={project} className="mt-10" />
      </div>
    </section>
  );
}
