'use client';

import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Full-Stack Web App',
    description:
      'A modern web application built with Next.js and PostgreSQL, featuring real-time updates, authentication, and a polished UI.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind'],
    link: '#',
  },
  {
    title: 'Event Management Platform',
    description:
      'A platform to manage tech conferences and hackathons, including registration, scheduling, and live engagement tools.',
    tags: ['React', 'Node.js', 'Firebase', 'Stripe'],
    link: '#',
  },
  {
    title: 'Portfolio Website',
    description:
      'This very website — a responsive, theme-aware portfolio built with Next.js, Tailwind CSS, and Framer Motion.',
    tags: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    link: '#',
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 sm:py-28" style={{ backgroundColor: 'var(--bg-secondary)' }}>
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
            Projects
          </h2>
          <div className="w-16 h-1 rounded-full mb-12" style={{ backgroundColor: '#D4834A' }} />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.link}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group block rounded-xl p-6 transition-all duration-200"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#D4834A';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
              }}
            >
              <h3
                className="text-xl font-semibold mb-2 group-hover:text-primary-500 transition-colors"
                style={{ color: 'var(--text)' }}
              >
                {project.title}
              </h3>
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: 'var(--text-secondary)' }}
              >
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{
                      backgroundColor: 'rgba(212, 131, 74, 0.12)',
                      color: '#E8954E',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
