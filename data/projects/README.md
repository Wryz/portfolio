# Projects Directory

This directory contains individual project files. Each project is stored in its own TypeScript React component file (`.tsx`) for easy customization.

## Adding a New Project

1. Create a new `.tsx` file in this directory with a descriptive name (e.g., `my-awesome-project.tsx`)
2. Use the following template:

```tsx
import React from 'react';
import { Project, ProjectMetadata } from '@/types/project';
import Image from 'next/image'; // Optional: if you need images

function MyProjectContent({ project }: { project: ProjectMetadata }) {
  return (
    <>
      {/* Your custom React component content here */}
      <p className="text-white mb-6 leading-relaxed">
        First paragraph describing your project...
      </p>
      <p className="text-white mb-6 leading-relaxed">
        Second paragraph with more details...
      </p>
      
      {/* You can add custom layouts, images, videos, etc. */}
      <div className="relative w-full h-64 sm:h-96 border-2 border-white overflow-hidden my-8">
        <Image
          src="/path/to/image.jpg"
          alt="Description"
          fill
          className="object-cover invert"
        />
      </div>
      
      {/* Embed videos */}
      <div className="relative w-full aspect-video border-2 border-white my-8">
        <iframe
          src="https://www.youtube.com/embed/VIDEO_ID"
          className="w-full h-full"
          allowFullScreen
        />
      </div>
    </>
  );
}

export const project: Project = {
  id: 'unique-project-id',
  title: 'Project Title',
  date: '2024-01-15', // Format: YYYY-MM-DD
  discipline: 'Software' | 'Hardware' | 'Events',
  thumbnail: '/path/to/thumbnail.svg',
  component: MyProjectContent,
};
```

3. Import your project in `index.ts`:
   - Add an import statement: `import { project as yourProjectName } from './your-project-file';`
   - Add it to the projects array

4. Projects are automatically sorted by date when exported.

## Customization

Each project file exports a React component, giving you complete control over the layout and content. You can:
- Create custom layouts with any HTML/JSX structure
- Add images, videos, interactive elements
- Use any React hooks or components
- Style with Tailwind CSS classes
- Access project metadata via the `project` prop

## Example

See `software-project-1.tsx` for a complete example.

