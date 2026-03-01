'use client';

import { useEffect, useCallback, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import type { MediaItem, Project } from '@/lib/careerData';

function VideoWithPlaceholder({
  src,
  isCurrent,
  alt,
}: {
  src: string;
  isCurrent: boolean;
  alt: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleCanPlay = useCallback(() => setIsLoaded(true), []);

  // Reset load state when src changes (e.g. navigating to different video)
  useEffect(() => {
    setIsLoaded(false);
  }, [src]);

  // If video was cached and already has data, show immediately
  useEffect(() => {
    const v = videoRef.current;
    if (v && v.readyState >= 2) setIsLoaded(true);
  }, [isCurrent]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {!isLoaded && (
        <div
          className="absolute inset-0 flex items-center justify-center z-10"
          style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}
        >
          <div className="flex flex-col items-center gap-3">
            <svg
              className="animate-spin h-10 w-10 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="text-sm text-white/80">Loading video...</span>
          </div>
        </div>
      )}
      <video
        ref={videoRef}
        src={src}
        controls
        controlsList="playpause volume timeline fullscreen"
        autoPlay={isCurrent}
        playsInline
        preload="auto"
        className="w-full h-full object-contain"
        onCanPlay={handleCanPlay}
        onLoadedData={handleCanPlay}
        {...(!isCurrent && { muted: true })}
      />
    </div>
  );
}

interface MediaLightboxProps {
  media: MediaItem[];
  initialIndex: number;
  project: Project;
  onClose: () => void;
}

const SWIPE_THRESHOLD = 50;
/** Sliding window: keep current ± 2 in DOM so back/forward is instant */
const CACHE_WINDOW = 2;

export function MediaLightbox({ media, initialIndex, project, onClose }: MediaLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const item = media[currentIndex];
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < media.length - 1;

  const goPrev = useCallback(() => {
    if (canGoPrev) setCurrentIndex((i) => i - 1);
  }, [canGoPrev]);

  const goNext = useCallback(() => {
    if (canGoNext) setCurrentIndex((i) => i + 1);
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
  }, []);

  const minCached = Math.max(0, currentIndex - CACHE_WINDOW);
  const maxCached = Math.min(media.length - 1, currentIndex + CACHE_WINDOW);

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
        <div className="relative w-full h-full flex items-center justify-center">
          {media.slice(minCached, maxCached + 1).map((m, offset) => {
            const i = minCached + offset;
            const isCurrent = i === currentIndex;
            return (
              <div
                key={`${m.src}-${i}`}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  visibility: isCurrent ? 'visible' : 'hidden',
                  zIndex: isCurrent ? 1 : 0,
                  pointerEvents: isCurrent ? 'auto' : 'none',
                }}
              >
                {m.type === 'video' ? (
                  <VideoWithPlaceholder
                    src={m.src}
                    isCurrent={isCurrent}
                    alt={m.alt}
                  />
                ) : (
                  <Image
                    src={m.src}
                    alt={m.alt}
                    fill
                    className="object-contain"
                  />
                )}
              </div>
            );
          })}
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

      {/* Dots — overlay bottom (higher when video to avoid covering controls) */}
      {media.length > 1 && (
        <div
          className={`absolute left-0 right-0 flex justify-center items-center gap-2 flex-wrap px-4 z-20 ${item.type === 'video' ? 'bottom-16' : 'bottom-4'}`}
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
