import React from 'react';
import { Project, ProjectMetadata } from '@/types/project';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function HardwareProject2Content({ project: _project }: { project: ProjectMetadata }) {
  return (
    <>
      <p className="mb-6 leading-relaxed">
        Designed and built a precision robotic arm controller with six degrees of freedom. The system uses stepper motors and encoders for accurate positioning.
      </p>
      <p className="mb-6 leading-relaxed">
        The controller board features a microcontroller running custom firmware that processes sensor data and executes movement commands. A user interface allows for both manual control and automated sequences.
      </p>
      <p className="mb-6 leading-relaxed">
        The project demonstrates expertise in embedded systems, motor control, and mechanical design. Testing showed positioning accuracy within 0.1mm.
      </p>
    </>
  );
}

export const project: Project = {
  id: 'hardware-project-2',
  title: 'Robotic Arm Controller',
  date: '2024-05-12',
  discipline: 'Hardware',
  thumbnail: '/file.svg',
  component: HardwareProject2Content,
};

