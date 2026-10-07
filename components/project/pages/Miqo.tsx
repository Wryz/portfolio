import Image from 'next/image';
import type { Project } from '@/lib/projects';
import { ProjectLinks, Section } from '../parts';

const spec = [
  ['Brain', 'A mobile app that acts as the CPU'],
  ['Link', 'Bluetooth, both directions, in real time'],
  ['Body', 'ESP32 driving the motors and servos'],
  ['Input', 'Voice commands'],
];

export function MiqoHero({ project }: { project: Project }) {
  return (
    <Section className="grid items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
      <div>
        <h1 className="text-8xl leading-[0.85] sm:text-9xl" style={{ fontWeight: 700, letterSpacing: '-0.03em' }}>
          miqo
        </h1>
        <p className="mt-6 max-w-md text-2xl leading-snug" style={{ fontWeight: 500 }}>
          {project.tagline}
        </p>
        <dl className="mt-8 max-w-md" style={{ borderTop: '2px solid var(--p-ink)' }}>
          {spec.map(([k, v]) => (
            <div key={k} className="flex gap-4 py-2.5" style={{ borderBottom: '1px solid var(--p-line)' }}>
              <dt className="w-16 shrink-0" style={{ fontWeight: 700 }}>{k}</dt>
              <dd style={{ color: 'var(--p-soft)' }}>{v}</dd>
            </div>
          ))}
        </dl>
        <ProjectLinks project={project} className="mt-8" />
      </div>
      <figure className="min-w-0">
        <Image
          src="/projects/miqo/render.webp"
          alt="Concept render of Miqo: a small white two-wheeled robot with a tilting head and two round camera eyes"
          width={1024}
          height={1024}
          priority
          className="block h-auto w-full"
          style={{ borderRadius: 28 }}
        />
        <figcaption className="mt-3 text-base" style={{ color: 'var(--p-soft)' }}>Concept render</figcaption>
      </figure>
    </Section>
  );
}

export function MiqoExtra() {
  return (
    <Section className="pt-0 sm:pt-0">
      <figure className="min-w-0">
        <Image
          src="/projects/miqo/sketch.webp"
          alt="Whiteboard sketches of the robot, then called Buddy, showing the head tilt and head rotate mechanisms"
          width={1600}
          height={1200}
          sizes="(min-width: 1152px) 1152px, 100vw"
          className="block h-auto w-full"
          style={{ borderRadius: 14 }}
        />
        <figcaption className="mt-3 max-w-2xl text-base" style={{ color: 'var(--p-soft)' }}>
          Working out the neck on a whiteboard: a ball and socket to hold the head, bevel gears to tilt it, and an
          axle through the neck to rotate it.
        </figcaption>
      </figure>
    </Section>
  );
}
