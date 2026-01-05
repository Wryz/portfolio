import React from 'react';
import { Project, ProjectMetadata } from '@/types/project';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function SoftwareProject1Content({ project: _project }: { project: ProjectMetadata }) {
  return (
    <>
      <p className="mb-6 leading-relaxed">
        This project showcases a modern full-stack web application built with Next.js and TypeScript. The application features a responsive design, real-time data updates, and seamless user experience.
      </p>
      <p className="mb-6 leading-relaxed">
        The backend is powered by a RESTful API that handles complex data operations efficiently. The frontend utilizes React hooks for state management and Tailwind CSS for styling.
      </p>
      <p className="mb-6 leading-relaxed">
        Key features include user authentication, data visualization, and API integration. The project demonstrates proficiency in modern web development practices and clean code architecture.
      </p>
    </>
  );
}

export const project: Project = {
  id: 'software-project-1',
  title: 'Full-Stack Web Application',
  date: '2024-01-15',
  discipline: 'Software',
  thumbnail: '/next.svg',
  component: SoftwareProject1Content,
};

