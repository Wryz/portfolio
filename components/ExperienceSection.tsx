'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCareer } from '@/lib/CareerContext';
import { careerData } from '@/lib/careerData';

export function ExperienceSection() {
  const { career } = useCareer();
  const experiences = careerData[career].experience;

  return (
    <section id="experience" className="py-20 sm:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Experience
          </h2>
          <div className="w-16 h-1 rounded-full mb-12" style={{ backgroundColor: '#D4834A' }} />
        </motion.div>

        <div className="relative">
          <div
            className="absolute left-4 sm:left-6 top-0 bottom-0 w-px"
            style={{ backgroundColor: 'var(--border)' }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={career}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-12"
            >
              {experiences.map((exp, i) => (
                <motion.div
                  key={`${career}-${i}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="relative pl-12 sm:pl-16"
                >
                  <div
                    className="absolute left-2.5 sm:left-4.5 top-1.5 w-3 h-3 rounded-full border-2"
                    style={{
                      backgroundColor: '#D4834A',
                      borderColor: 'var(--bg)',
                    }}
                  />

                  <span className="text-sm font-medium" style={{ color: '#D4834A' }}>
                    {exp.period}
                  </span>
                  <h3 className="text-xl font-semibold mt-1" style={{ color: 'var(--text)' }}>
                    {exp.role}
                  </h3>
                  <p className="text-sm font-medium mt-0.5" style={{ color: 'var(--text-muted)' }}>
                    {exp.company}
                  </p>
                  <p className="mt-3 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {exp.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
