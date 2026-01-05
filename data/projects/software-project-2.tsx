import React from 'react';
import { Project, ProjectMetadata } from '@/types/project';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function SoftwareProject2Content({ project: _project }: { project: ProjectMetadata }) {
  return (
    <>
      <p className="mb-6 leading-relaxed">
        Developed a cross-platform mobile application using React Native. The app provides a seamless experience on both iOS and Android platforms.
      </p>
      <p className="mb-6 leading-relaxed">
        The application includes features such as offline mode, push notifications, and secure authentication. Performance optimization was a key focus, resulting in fast load times and smooth animations.
      </p>
      <p className="mb-6 leading-relaxed">
        User testing revealed high satisfaction rates, and the app has been downloaded over 10,000 times since launch.
      </p>
    </>
  );
}

export const project: Project = {
  id: 'software-project-2',
  title: 'Mobile Application Development',
  date: '2024-04-05',
  discipline: 'Software',
  thumbnail: '/window.svg',
  component: SoftwareProject2Content,
};

