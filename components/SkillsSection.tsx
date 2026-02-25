'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCareer } from '@/lib/CareerContext';
import { useReveal } from '@/lib/RevealContext';
import { getItemsForSection } from '@/lib/revealData';
import { careerData } from '@/lib/careerData';
import { TypingText } from '@/components/TypingText';

const skillsRevealItems = getItemsForSection('skills');

export function SkillsSection() {
  const { career } = useCareer();
  const { revealed } = useReveal();
  const skillCategories = careerData[career].skills;

  return (
    <section id="skills" className="py-20 sm:py-28" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-3xl sm:text-4xl font-bold mb-2"
            style={{ color: 'var(--text)' }}
          >
            Skills &amp; Technologies
          </h2>
          <div className="w-16 h-1 rounded-full mb-12" style={{ backgroundColor: '#D4834A' }} />
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={career}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {skillCategories.map((category, i) => (
              <motion.div
                key={`${career}-${category.title}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-xl p-6"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                }}
              >
                <TypingText
                  text={category.title}
                  triggerKey={career}
                  as="h3"
                  className="text-lg font-semibold mb-4"
                  style={{ color: '#D4834A' }}
                />
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs sm:text-sm px-3 py-1 rounded-full font-medium"
                      style={{
                        backgroundColor: 'var(--bg-muted)',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Reveal extra skills */}
        <AnimatePresence>
          {revealed && skillsRevealItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-8 overflow-hidden"
            >
              <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>
                Bonus skills
              </p>
              <div className="flex flex-wrap gap-2.5">
                {skillsRevealItems.map((item) => (
                  <motion.span
                    key={item.content}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ delay: item.globalIndex * 0.12, duration: 0.35 }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs sm:text-sm font-medium"
                    style={{
                      backgroundColor: 'rgba(212, 131, 74, 0.1)',
                      color: '#D4834A',
                      border: '1px solid rgba(212, 131, 74, 0.25)',
                    }}
                  >
                    <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74L12 2z" />
                    </svg>
                    {item.content}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
