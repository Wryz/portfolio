'use client';

import { useEffect, useCallback, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import type { MediaItem, Project } from '@/lib/careerData';

interface MediaLightboxProps {
  media: MediaItem[];
  initialIndex: number;
  project: Project;
  onClose: () => void;
}

const SWIPE_THRESHOLD = 50;

export function MediaLightbox({ media, initialIndex, project, onClose }: MediaLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [videoAspect, setVideoAspect] = useState<string | null>(null);
  const [imageAspect, setImageAspect] = useState<string | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const item = media[currentIndex];
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < media.length - 1;

  const goPrev = useCallback(() => {
    if (canGoPrev) {
      setCurrentIndex((i) => i - 1);
      setVideoAspect(null);
      setImageAspect(null);
    }
  }, [canGoPrev]);

  const goNext = useCallback(() => {
    if (canGoNext) {
      setCurrentIndex((i) => i + 1);
      setVideoAspect(null);
      setImageAspect(null);
    }
  }, [canGoNext]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    },
    [onClose, goPrev, goNext],
  );

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (touchStartX.current == null || touchEndX.current == null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > SWIPE_THRESHOLD) goNext();
    else if (diff < -SWIPE_THRESHOLD) goPrev();
    touchStartX.current = null;
    touchEndX.current = null;
  }, [goPrev, goNext]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  const goTo = useCallback((index: number) => {
    setCurrentIndex(index);
    setVideoAspect(null);
    setImageAspect(null);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex flex-col bg-black"
      onClick={onClose}
    >
      {/* Media — full screen */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full h-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            {item.type === 'video' ? (
              <motion.div
                key={item.src}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full flex items-center justify-center"
              >
                <video
                  src={item.src}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
              </motion.div>
            ) : (
              <motion.div
                key={item.src}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-contain"
                  onLoad={(e) => {
                    const img = e.target as HTMLImageElement;
                    if (img.naturalWidth && img.naturalHeight) {
                      setImageAspect(`${img.naturalWidth}/${img.naturalHeight}`);
                    }
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Close — overlay top right */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-opacity hover:opacity-100 opacity-80"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)', color: 'white' }}
        aria-label="Close"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Dots — overlay bottom */}
      {media.length > 1 && (
        <div
          className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-2 flex-wrap px-4 z-20"
          onClick={(e) => e.stopPropagation()}
        >
          {media.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full transition-all duration-200 cursor-pointer"
              style={{
                width: currentIndex === i ? 24 : 8,
                height: 8,
                backgroundColor: currentIndex === i ? '#D4834A' : 'rgba(255,255,255,0.4)',
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
