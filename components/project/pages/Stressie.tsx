import Image from 'next/image';
import type { Project } from '@/lib/projects';
import { ProjectLinks, Section } from '../parts';

/* Stressie's headline style: serif, with the key words in orange italics */
function Accent({ children }: { children: React.ReactNode }) {
  return (
    <em className="italic" style={{ color: 'var(--p-accent)', fontWeight: 500 }}>
      {children}
    </em>
  );
}

const eyebrow = 'text-xs font-semibold uppercase tracking-[0.14em]';

/* What the app does on shift, and what I built for each part */
const features = [
  { name: 'Private check-ins', text: 'Staff say how they feel and what is weighing on them, anonymously and without judgement.' },
  { name: 'Pre-shift resets', text: 'Three-minute exercises, music and affirmations to settle in before the rush.' },
  { name: 'Points and rewards', text: 'Every reset earns points to spend on gift cards, spa days and more.' },
  { name: 'Insights', text: 'Stress before and after coping, top stressors and trends over time, for each person and the team.' },
];

/* Figures from the six-month pilot, as published on stressieapp.com */
const pilot = [
  { value: '22%', label: 'less stress' },
  { value: '35%', label: 'felt more supported' },
  { value: '17%', label: 'more happy customers' },
];

const moments = [
  { src: '/projects/stressie/preshift.webp', title: 'Before the shift', text: 'A quick reset at the start of the day sets the mood with customers.' },
  { src: '/projects/stressie/ratio.webp', title: 'Through the week', text: 'Rewards that recognise the effort, so people stay.' },
  { src: '/projects/stressie/music.webp', title: 'On a break', text: 'Unwinding music and short exercises, a tap away.' },
];

export function StressieHero({ project }: { project: Project }) {
  return (
    <Section className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
      <div>
        <Image src="/projects/stressie/wordmark.webp" alt="" width={900} height={138} priority className="h-auto w-48 sm:w-60" />
        <h1 className="mt-8 text-4xl leading-[1.12] sm:text-5xl" style={{ fontWeight: 400 }}>
          The most <Accent>rewarding</Accent> wellness program for <Accent>shift teams</Accent>
        </h1>
        <p className="mt-5 max-w-md text-lg leading-relaxed" style={{ color: 'var(--p-soft)' }}>
          {project.tagline} I led the mobile frontend: the app crews open before, during and after a shift.
        </p>
        <ProjectLinks project={project} className="mt-8" />
      </div>
      <Image
        src="/projects/stressie/insights.webp"
        alt="Stressie on a phone, showing a team's top stressors, beside the managers' dashboard on a laptop"
        width={1400}
        height={704}
        priority
        sizes="(min-width: 1024px) 640px, 100vw"
        className="h-auto w-full"
      />
    </Section>
  );
}

export function StressieExtra() {
  return (
    <>
      {/* What I built, beside the app itself */}
      <section style={{ backgroundColor: 'var(--p-accent)', color: '#FFFFFF' }}>
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div className="mx-auto w-56 sm:w-64" style={{ filter: 'drop-shadow(0 24px 40px rgba(60, 25, 0, 0.35))' }}>
            <Image src="/projects/stressie/phone.webp" alt="The Team Insights screen in the Stressie app" width={600} height={1176} className="h-auto w-full" />
          </div>
          <div>
            <p className={eyebrow} style={{ color: 'rgba(255,255,255,0.75)' }}>The app I built</p>
            <h2 className="mt-3 text-3xl leading-tight sm:text-4xl" style={{ fontWeight: 400 }}>
              Made for <em className="italic" style={{ color: '#F0C24B' }}>a few minutes</em> between orders
            </h2>
            <dl className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {features.map((f) => (
                <div key={f.name} style={{ borderTop: '1px solid rgba(255,255,255,0.35)' }} className="pt-4">
                  <dt className="text-lg" style={{ fontFamily: 'var(--p-display)', fontWeight: 500 }}>{f.name}</dt>
                  <dd className="mt-1 leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>{f.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* The pilot */}
      <Section>
        <h2 className="text-3xl sm:text-4xl" style={{ fontWeight: 400 }}>
          Built in the <Accent>field</Accent>
        </h2>
        <p className="mt-3 max-w-xl text-lg" style={{ color: 'var(--p-soft)' }}>
          Refined through a six-month pilot with Ember in Austin, with feedback from managers and frontline staff.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-[1.4fr_1fr]">
          <div className="relative min-h-72 overflow-hidden" style={{ borderRadius: 'var(--p-radius)' }}>
            <Image src="/projects/stressie/ember.webp" alt="The Ember restaurant sign in Austin" fill sizes="(min-width: 768px) 640px, 100vw" className="object-cover" />
          </div>
          <dl className="grid" style={{ border: '1px solid var(--p-accent)', borderRadius: 'var(--p-radius)' }}>
            {pilot.map((p, i) => (
              <div key={p.label} className="flex items-baseline gap-4 px-6 py-5" style={i ? { borderTop: '1px solid var(--p-line)' } : undefined}>
                <dd className="text-4xl italic sm:text-5xl" style={{ fontFamily: 'var(--p-display)', color: 'var(--p-accent)', fontWeight: 500 }}>
                  {p.value}
                </dd>
                <dt className="text-lg" style={{ color: 'var(--p-soft)' }}>{p.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* Through the day */}
      <Section className="pt-0 sm:pt-0">
        <ul className="grid gap-8 md:grid-cols-3">
          {moments.map((m) => (
            <li key={m.title}>
              <div className="relative aspect-square overflow-hidden" style={{ borderRadius: 'var(--p-radius)' }}>
                <Image src={m.src} alt="" fill sizes="(min-width: 768px) 360px, 100vw" className="object-cover" />
              </div>
              <h3 className="mt-4 text-xl" style={{ color: 'var(--p-accent)', fontWeight: 500 }}>{m.title}</h3>
              <p className="mt-1 leading-relaxed" style={{ color: 'var(--p-soft)' }}>{m.text}</p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
