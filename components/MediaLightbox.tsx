'use client';

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { MediaItem, Project } from '@/lib/careerData';

interface MediaLightboxProps {
  item: MediaItem;
  project: Project;
  onClose: () => void;
}

export function MediaLightbox({ item, project, onClose }: MediaLightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl"
        style={{ backgroundColor: 'var(--bg-card)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', color: 'white' }}
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {item.type === 'video' ? (
          <video
            src={item.src}
            controls
            autoPlay
            playsInline
            className="w-full rounded-t-xl"
          />
        ) : (
          <div className="relative w-full aspect-video">
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-contain rounded-t-xl"
            />
          </div>
        )}

        <div className="p-6 sm:p-8">
          <h3
            className="text-lg sm:text-xl font-bold mb-3"
            style={{ color: 'var(--text)' }}
          >
            {project.title} — {item.alt}
          </h3>
          <div className="space-y-2">
            {project.description.map((p, i) => (
              <p
                key={i}
                className="text-sm leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                {p}
              </p>
            ))}
          </div>
          {project.links.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-4">
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200"
                  style={{ backgroundColor: '#D4834A', color: '#ffffff' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#B86E3C';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#D4834A';
                  }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
