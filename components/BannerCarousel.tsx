'use client';

import Image from 'next/image';
import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BANNER_ASSETS = [
  { src: '/banner/ESP32_tutorial.mov', type: 'video' as const },
  { src: '/banner/IMG_1775.MOV', type: 'video' as const },
  { src: '/banner/capital_factory_speech.jpeg', type: 'image' as const },
  { src: '/banner/texas_mccombs_speech.jpeg', type: 'image' as const },
];

const ROTATE_INTERVAL_MS = 5000;

function VideoSlide({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const playPromise = video.play();
    return () => {
      video.pause();
      playPromise.catch(() => {});
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      playsInline
      loop
      className="absolute inset-0 h-full w-full object-cover"
      aria-label="Banner video"
    />
  );
}

export function BannerCarousel() {
  const [index, setIndex] = useState(0);

  const goTo = useCallback((i: number) => {
    setIndex(((i % BANNER_ASSETS.length) + BANNER_ASSETS.length) % BANNER_ASSETS.length);
  }, []);

  const next = useCallback(() => {
    goTo(index + 1);
  }, [index, goTo]);

  useEffect(() => {
    const id = setInterval(next, ROTATE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [next]);

  const current = BANNER_ASSETS[index];

  return (
    <div className="relative h-full w-full overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {current.type === 'video' ? (
            <VideoSlide src={current.src} />
          ) : (
            <Image
              src={current.src}
              alt={`Banner image ${index + 1}`}
              fill
              className="object-cover"
              sizes="100vw"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10" aria-label="Banner pagination">
        {BANNER_ASSETS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="h-2 w-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
            style={{
              backgroundColor: i === index ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)',
            }}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index ? 'true' : undefined}
          />
        ))}
      </div>
    </div>
  );
}
