import React from 'react';
import { Project, ProjectMetadata } from '@/types/project';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function HardwareProject1Content({ project: _project }: { project: ProjectMetadata }) {
  return (
    <>
      <p className="mb-6 leading-relaxed">
        An Internet of Things (IoT) sensor network designed to collect and transmit environmental data in real-time. The system consists of multiple sensor nodes connected wirelessly.
      </p>
      <p className="mb-6 leading-relaxed">
        Each node is equipped with temperature, humidity, and motion sensors. Data is collected and transmitted to a central hub using low-power wireless protocols.
      </p>
      <p className="mb-6 leading-relaxed">
        The hardware design focuses on energy efficiency and reliability. Custom PCBs were designed and manufactured, incorporating power management systems to ensure long battery life.
      </p>
    </>
  );
}

export const project: Project = {
  id: 'hardware-project-1',
  title: 'IoT Sensor Network',
  date: '2024-02-20',
  discipline: 'Hardware',
  thumbnail: '/vercel.svg',
  component: HardwareProject1Content,
};

