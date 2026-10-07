'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { Project } from '@/lib/projects';
import { ProjectLinks, Section } from '../parts';

const tests = [
  'Reaction Time', 'Aim Trainer', 'Chimp Test', 'Visual Memory', 'Number Memory', 'Memory Game', 'Stroop Test',
  'Typing Test', 'Time Estimation', 'Arithmetic', 'Algebra', 'Geometry', 'Sudoku', 'Tangrams', 'Maze', 'Word Search',
];

type Phase = 'idle' | 'waiting' | 'go' | 'early' | 'done';

const panel: Record<Phase, { bg: string; title: string; hint: string }> = {
  idle: { bg: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)', title: 'Test your reaction time', hint: 'Click to start' },
  waiting: { bg: '#B4234A', title: 'Wait for green', hint: 'Click as soon as the colour changes' },
  go: { bg: '#12854A', title: 'Click!', hint: '' },
  early: { bg: '#3F4A63', title: 'Too soon', hint: 'Click to try again' },
  done: { bg: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)', title: '', hint: 'Click to try again' },
};

/** A working copy of the site's simplest test, so the page opens with the thing itself. */
function ReactionTest() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [ms, setMs] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startedAt = useRef(0);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const press = () => {
    if (phase === 'waiting') {
      if (timer.current) clearTimeout(timer.current);
      setPhase('early');
    } else if (phase === 'go') {
      setMs(Math.round(performance.now() - startedAt.current));
      setPhase('done');
    } else {
      setPhase('waiting');
      timer.current = setTimeout(() => {
        startedAt.current = performance.now();
        setPhase('go');
      }, 1500 + Math.random() * 2500);
    }
  };

  const view = panel[phase];
  return (
    <button
      type="button"
      onPointerDown={(e) => { e.preventDefault(); press(); }}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); press(); } }}
      className="flex aspect-[4/3] w-full cursor-pointer select-none flex-col items-center justify-center p-6 text-center text-white"
      style={{ background: view.bg, borderRadius: 28, boxShadow: '0 20px 40px -18px rgba(102, 126, 234, 0.7)', transition: 'none' }}
      aria-live="polite"
    >
      <span className="text-3xl sm:text-4xl" style={{ fontWeight: 600 }}>
        {phase === 'done' ? `${ms} ms` : view.title}
      </span>
      {view.hint && <span className="mt-3 text-base sm:text-lg" style={{ opacity: 0.92 }}>{view.hint}</span>}
    </button>
  );
}

export function BrainBenchmarkHero({ project }: { project: Project }) {
  return (
    <div style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #F6F8FF 50%, #E6F0FF 100%)' }}>
      <Section className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <Image
            src="/projects/brain-benchmark/brain.webp"
            alt=""
            width={900}
            height={776}
            priority
            className="h-auto w-36 sm:w-44"
          />
          <h1
            className="mt-6 text-5xl leading-[1.05] sm:text-6xl lg:text-7xl"
            style={{
              fontWeight: 700,
              background: 'linear-gradient(135deg, #5A6FE0 0%, #764BA2 55%, #0891B2 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Brain Benchmark
          </h1>
          <p className="mt-5 max-w-lg text-xl leading-relaxed" style={{ color: 'var(--p-soft)' }}>
            {project.tagline} Start with the one on this page.
          </p>
          <ProjectLinks project={project} className="mt-8" />
        </div>
        <ReactionTest />
      </Section>
    </div>
  );
}

export function BrainBenchmarkExtra() {
  return (
    <Section className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
      <div>
        <h2 className="text-3xl sm:text-4xl" style={{ fontWeight: 600 }}>
          Sixteen tests
        </h2>
        <ul className="mt-6 flex flex-wrap gap-2.5">
          {tests.map((t) => (
            <li
              key={t}
              className="px-4 py-2 text-base"
              style={{
                borderRadius: 9999,
                backgroundColor: 'var(--p-surface)',
                border: '1.5px solid var(--p-line)',
                fontWeight: 500,
              }}
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
      <figure className="min-w-0">
        <div className="overflow-hidden" style={{ borderRadius: 20, border: '1.5px solid var(--p-line)' }}>
          <Image
            src="/brain-benchmark/analytics.png"
            alt="Traffic analytics chart for Brain Benchmark"
            width={2257}
            height={1669}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="block h-auto w-full"
          />
        </div>
        <figcaption className="mt-3 text-base" style={{ color: 'var(--p-soft)' }}>
          Traffic in the first 5 days after launch
        </figcaption>
      </figure>
    </Section>
  );
}
