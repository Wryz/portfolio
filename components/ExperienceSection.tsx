'use client';

import { motion } from 'framer-motion';

const experiences = [
  {
    role: 'Software Engineer',
    company: 'Company Name',
    period: '2024 - Present',
    description:
      'Led development of full-stack web applications using React, Node.js, and cloud infrastructure. Improved system performance and delivered features used by thousands of users.',
  },
  {
    role: 'Project Lead',
    company: 'University Organization',
    period: '2022 - 2023',
    description:
      'Organized large-scale tech events, managed teams of volunteers, and built tools to streamline event logistics and attendee engagement.',
  },
];

export function ExperienceSection() {
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
          {/* Vertical line */}
          <div
            className="absolute left-4 sm:left-6 top-0 bottom-0 w-px"
            style={{ backgroundColor: 'var(--border)' }}
          />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative pl-12 sm:pl-16"
              >
                {/* Dot on the timeline */}
                <div
                  className="absolute left-2.5 sm:left-4.5 top-1.5 w-3 h-3 rounded-full border-2"
                  style={{
                    backgroundColor: '#D4834A',
                    borderColor: 'var(--bg)',
                  }}
                />

                <span
                  className="text-sm font-medium"
                  style={{ color: '#D4834A' }}
                >
                  {exp.period}
                </span>
                <h3
                  className="text-xl font-semibold mt-1"
                  style={{ color: 'var(--text)' }}
                >
                  {exp.role}
                </h3>
                <p
                  className="text-sm font-medium mt-0.5"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {exp.company}
                </p>
                <p
                  className="mt-3 text-base leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {exp.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
