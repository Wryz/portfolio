'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Project } from '@/types/project';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const router = useRouter();

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

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/90 backdrop-blur-sm overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-4xl bg-black border-2 border-white m-4 my-8">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black border border-white hover:bg-white hover:text-black transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Article content */}
        <article className="p-8 sm:p-12">
          {/* Header */}
          <header className="mb-8">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-white text-black mb-3">
                {project.discipline}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {project.title}
            </h1>
            <time className="text-sm text-white opacity-60">
              {new Date(project.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </time>
          </header>

          {/* Thumbnail */}
          <div className="relative w-full h-64 sm:h-96 mb-8 border-2 border-white overflow-hidden">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover invert"
            />
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {project.content.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-white mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}

            {/* Videos */}
            {project.content.videos && project.content.videos.length > 0 && (
              <div className="space-y-6 my-8">
                {project.content.videos.map((video, index) => (
                  <div key={index} className="relative w-full aspect-video border-2 border-white">
                    <iframe
                      src={video}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Images */}
            {project.content.images && project.content.images.length > 0 && (
              <div className="space-y-6 my-8">
                {project.content.images.map((image, index) => (
                  <div key={index} className="relative w-full h-64 sm:h-96 border-2 border-white overflow-hidden">
                    <Image
                      src={image}
                      alt={`${project.title} - Image ${index + 1}`}
                      fill
                      className="object-cover invert"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}

