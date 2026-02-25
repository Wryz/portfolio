'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCareer } from '@/lib/CareerContext';
import { careerData } from '@/lib/careerData';
import { TypingText } from '@/components/TypingText';

export function SkillsSection() {
  const { career } = useCareer();
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
      </div>
    </section>
  );
}
