'use client';

import { motion } from 'framer-motion';

export function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-28">
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
            About Me
          </h2>
          <div className="w-16 h-1 rounded-full mb-8" style={{ backgroundColor: '#D4834A' }} />

          <div className="space-y-5 text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            <p>
              I&apos;m a passionate engineer with a love for building things that matter &mdash; whether that&apos;s elegant software solutions or memorable community events. Based in Austin, TX, I thrive at the intersection of technology and creativity.
            </p>
            <p>
              With experience spanning full-stack web development and project leadership, I bring a versatile skill set to every challenge. I believe the best solutions come from understanding problems deeply and iterating fearlessly.
            </p>
            <p>
              When I&apos;m not coding, you can find me exploring Austin&apos;s food scene, contributing to open-source projects, or mentoring the next generation of engineers.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
