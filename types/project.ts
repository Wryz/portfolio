import { ReactNode } from 'react';

export type Discipline = 'Software' | 'Hardware' | 'Events';

export interface ProjectMetadata {
  id: string;
  title: string;
  date: string;
  discipline: Discipline;
  thumbnail: string;
}

export interface Project extends ProjectMetadata {
  component: React.ComponentType<{ project: ProjectMetadata }>;
}

