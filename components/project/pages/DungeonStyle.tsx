import Image from 'next/image';
import type { Project } from '@/lib/projects';
import { ProjectLinks, Section } from '../parts';

/* Some of the arenas, captured from the game, with the weapons lying around in each */
const arenas = [
  { id: 'ring', name: 'The boxing ring', weapons: 'A folding chair' },
  { id: 'street', name: 'The street', weapons: 'A bat and a machete' },
  { id: 'grocery', name: 'The grocery store', weapons: 'A cleaver and a frying pan' },
  { id: 'bar', name: 'The biker bar', weapons: 'A pool cue and a beer bottle' },
  { id: 'rooftop', name: 'The rooftop at night', weapons: 'A lead pipe and a fire axe' },
  { id: 'colosseum', name: 'The colosseum', weapons: 'A gladius and a battle axe. Every fourth round, a boss' },
];

export function DungeonStyleHero({ project }: { project: Project }) {
  return (
    <Section className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <Image src="/projects/dungeon-style/mark.png" alt="" width={96} height={96} priority className="h-20 w-20 sm:h-24 sm:w-24" />
        <h1 className="mt-6 text-5xl leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl" style={{ fontWeight: 800 }}>
          Dungeon<span style={{ color: 'var(--p-accent)' }}>Style</span>
        </h1>
        <p className="mt-5 max-w-md text-xl leading-relaxed" style={{ color: 'var(--p-soft)' }}>
          {project.tagline}
        </p>
        <ProjectLinks project={project} className="mt-8" />
      </div>
      <div className="relative overflow-hidden" style={{ borderRadius: 14, border: '1px solid var(--p-line)', aspectRatio: '16 / 10' }}>
        <Image
          src="/projects/dungeon-style/hero.webp"
          alt="Facing the Minotaur in the DungeonStyle colosseum, with a battle axe lying on the sand"
          fill
          priority
          sizes="(min-width: 1024px) 640px, 100vw"
          className="object-cover"
        />
      </div>
    </Section>
  );
}

export function DungeonStyleExtra() {
  return (
    <Section>
      <h2 className="text-3xl tracking-tight sm:text-4xl" style={{ fontWeight: 800 }}>
        A new arena every round
      </h2>
      <p className="mt-3 max-w-2xl text-lg" style={{ color: 'var(--p-soft)' }}>
        Seven arenas take turns, each with its own props, floor sounds and weapons. Every fourth round is a giant in the
        colosseum: the Champion, the Minotaur, the Cyclops or the Troll.
      </p>
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {arenas.map((a) => (
          <li key={a.id} className="overflow-hidden" style={{ borderRadius: 12, backgroundColor: 'var(--p-surface)', border: '1px solid var(--p-line)' }}>
            <div className="relative" style={{ aspectRatio: '16 / 10' }}>
              <Image src={`/projects/dungeon-style/arenas/${a.id}.webp`} alt={`${a.name} in DungeonStyle`} fill sizes="(min-width: 1024px) 368px, (min-width: 640px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="p-4">
              <h3 className="text-lg" style={{ fontWeight: 700 }}>{a.name}</h3>
              <p className="mt-1 text-sm" style={{ color: 'var(--p-soft)' }}>{a.weapons}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
