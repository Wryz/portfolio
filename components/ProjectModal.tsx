'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { Project, ProjectMetadata } from '@/types/project';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const ProjectComponent = project.component;
  const projectMetadata: ProjectMetadata = {
    id: project.id,
    title: project.title,
    date: project.date,
    discipline: project.discipline,
    thumbnail: project.thumbnail,
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/90 backdrop-blur-sm overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div 
        className="relative w-full max-w-4xl bg-black m-4 my-8"
        style={{ border: '2px solid rgba(255, 255, 255, 0.4)' }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black transition-colors"
          style={{ border: '1px solid rgba(255, 255, 255, 0.4)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 1)';
            const svg = e.currentTarget.querySelector('svg');
            if (svg) svg.style.color = 'rgba(255, 255, 255, 1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
            const svg = e.currentTarget.querySelector('svg');
            if (svg) svg.style.color = 'rgba(255, 255, 255, 0.4)';
          }}
          aria-label="Close modal"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            style={{ color: 'rgba(255, 255, 255, 0.4)' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Article content */}
        <article className="p-8 sm:p-12">
          {/* Header */}
          <header className="mb-8">
            <div className="mb-4">
              <span 
                className="inline-block px-3 py-1 text-sm font-medium mb-3 project-tag"
              >
                {project.discipline}
              </span>
            </div>
            <h1 
              className="text-4xl sm:text-5xl font-bold mb-4 project-title"
            >
              {project.title}
            </h1>
            <time 
              className="text-sm project-date"
            >
              {new Date(project.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </time>
          </header>

          {/* Thumbnail */}
          <div 
            className="relative w-full h-64 sm:h-96 mb-8 overflow-hidden"
            style={{ border: '2px solid rgba(255, 255, 255, 0.4)' }}
          >
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover invert"
            />
          </div>

          {/* Project-specific content component */}
          <div className="prose prose-lg max-w-none project-content">
            <ProjectComponent project={projectMetadata} />
          </div>
        </article>
      </div>
    </div>
  );
}

