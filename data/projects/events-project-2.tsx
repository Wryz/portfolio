import React from 'react';
import { Project, ProjectMetadata } from '@/types/project';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function EventsProject2Content({ project: _project }: { project: ProjectMetadata }) {
  return (
    <>
      <p className="mb-6 leading-relaxed">
        Led the organization of a 48-hour hackathon that brought together 200+ developers, designers, and entrepreneurs. The event featured workshops, mentorship sessions, and a competitive coding challenge.
      </p>
      <p className="mb-6 leading-relaxed">
        Coordinated with sponsors, secured prizes worth $10,000, and managed logistics including venue setup, catering, and technical infrastructure.
      </p>
      <p className="mb-6 leading-relaxed">
        The hackathon resulted in 30+ innovative projects, with winning teams receiving funding and mentorship opportunities. The event strengthened the local tech community and fostered collaboration.
      </p>
    </>
  );
}

export const project: Project = {
  id: 'events-project-2',
  title: 'Hackathon Organization',
  date: '2024-06-18',
  discipline: 'Events',
  thumbnail: '/globe.svg',
  component: EventsProject2Content,
};

