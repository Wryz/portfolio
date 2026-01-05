import React from 'react';
import { Project, ProjectMetadata } from '@/types/project';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function EventsProject1Content({ project: _project }: { project: ProjectMetadata }) {
  return (
    <>
      <p className="mb-6 leading-relaxed">
        Organized and executed a major technology conference featuring industry leaders and innovators. The event attracted over 500 attendees and featured 20+ speakers.
      </p>
      <p className="mb-6 leading-relaxed">
        Responsibilities included venue selection, speaker coordination, marketing campaigns, and on-site event management. The conference covered topics ranging from AI/ML to sustainable technology.
      </p>
      <p className="mb-6 leading-relaxed">
        The event was a resounding success, with positive feedback from attendees and sponsors. Post-event analysis showed high engagement rates and valuable networking opportunities for participants.
      </p>
    </>
  );
}

export const project: Project = {
  id: 'events-project-1',
  title: 'Tech Conference 2024',
  date: '2024-03-10',
  discipline: 'Events',
  thumbnail: '/globe.svg',
  component: EventsProject1Content,
};

