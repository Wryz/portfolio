import Image from 'next/image';
import type { Project } from '@/lib/projects';
import { ProjectLinks, Section } from '../parts';

const steps = [
  { title: "Send your pet's photos", body: 'Pick them from your phone or computer. Any album, any order.' },
  { title: 'Read their story', body: 'Organized into chapters, written with love. Ready in minutes.' },
  { title: 'Keep the hardcover', body: 'A custom cover with their photo, name, and years. Change titles, wording and photo order before you order.' },
];

export function OurTailTalesHero({ project }: { project: Project }) {
  return (
    <section className="ott-hero relative overflow-hidden">
      <Image
        src="/projects/ourtailtales/hero.webp"
        alt="Three hardcover pet memoirs on a coffee table: Gracie, Milo and Luna"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[50%_58%]"
      />
      <div className="ott-hero-fade absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <div className="max-w-xl">
          <div className="flex items-center gap-3">
            <Image src="/projects/ourtailtales/logo.png" alt="" width={56} height={56} className="h-14 w-14" />
            <span className="text-xl" style={{ fontFamily: 'var(--p-display)', fontWeight: 700 }}>
              ourTailTales
            </span>
          </div>
          <h1 className="mt-8 text-4xl leading-[1.15] sm:text-5xl lg:text-6xl" style={{ fontWeight: 700 }}>
            {project.tagline}
          </h1>
          <p className="mt-6 text-lg leading-relaxed" style={{ color: '#3F4556' }}>
            Drop in your pet&apos;s photo album. ourTailTales organizes the years, builds the chapters, and creates a
            hardcover book you can keep forever.
          </p>
          <ProjectLinks project={project} className="mt-9" />
        </div>
      </div>
    </section>
  );
}

/* The product photo, placed the way the book places prints: white border, slight tilt, washi tape. */
function Polaroid() {
  return (
    <figure className="relative mx-auto w-full max-w-sm min-w-0" style={{ transform: 'rotate(-2.5deg)' }}>
      <span
        className="absolute -top-3 left-8 z-10 h-7 w-24"
        style={{ backgroundColor: 'rgba(226, 215, 245, 0.9)', transform: 'rotate(-6deg)' }}
        aria-hidden
      />
      <span
        className="absolute -top-2 right-10 z-10 h-7 w-20"
        style={{ backgroundColor: 'rgba(201, 222, 215, 0.9)', transform: 'rotate(5deg)' }}
        aria-hidden
      />
      <div
        className="bg-white p-3 pb-4"
        style={{ boxShadow: '0 1px 2px rgb(0 0 0 / 0.15), 0 18px 40px -14px rgb(37 42 58 / 0.45)' }}
      >
        <Image
          src="/projects/ourtailtales/book.webp"
          alt="A hardcover pet memoir standing on a dresser, with a dog named Gracie on the cover"
          width={1100}
          height={1100}
          sizes="(min-width: 1024px) 384px, 90vw"
          className="block h-auto w-full"
        />
        <figcaption
          className="pt-3 text-center text-2xl"
          style={{ fontFamily: 'var(--font-caveat), cursive', color: '#252A3A' }}
        >
          Gracie, in hardcover
        </figcaption>
      </div>
    </figure>
  );
}

export function OurTailTalesExtra() {
  return (
    <div style={{ backgroundColor: '#EEF1FB' }}>
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div>
        <h2 className="text-3xl sm:text-4xl" style={{ fontWeight: 700 }}>
          How it works
        </h2>
        <ol className="mt-10 grid gap-8">
          {steps.map((step, i) => (
            <li key={step.title}>
              <span
                className="flex h-11 w-11 items-center justify-center rounded-full text-lg"
                style={{
                  fontFamily: 'var(--p-display)',
                  fontWeight: 700,
                  backgroundColor: 'var(--p-accent)',
                  color: 'var(--p-on-accent)',
                }}
              >
                {i + 1}
              </span>
              <h3 className="mt-4 text-xl" style={{ fontWeight: 700 }}>
                {step.title}
              </h3>
              <p className="mt-2 leading-relaxed" style={{ color: 'var(--p-soft)' }}>
                {step.body}
              </p>
            </li>
          ))}
        </ol>
          </div>
          <Polaroid />
        </div>
      </Section>
    </div>
  );
}
