import { Project } from '@/types/project';

// Import all project files
import { project as softwareProject1 } from './software-project-1';
import { project as hardwareProject1 } from './hardware-project-1';
import { project as eventsProject1 } from './events-project-1';
import { project as softwareProject2 } from './software-project-2';
import { project as hardwareProject2 } from './hardware-project-2';
import { project as eventsProject2 } from './events-project-2';

// Export all projects as an array
// Projects are automatically sorted by date
export const projects: Project[] = [
  softwareProject1,
  hardwareProject1,
  eventsProject1,
  softwareProject2,
  hardwareProject2,
  eventsProject2,
].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

