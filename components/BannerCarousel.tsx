'use client';

import Image from 'next/image';
import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * What the banner shows, in order. Videos are recorded from the games themselves; `poster` is the
 * clip's first frame, shown while it loads. Wide pictures fill the strip; `whole` pictures (portrait
 * or square) are shown in full over a blurred copy of themselves, so nothing important is cropped off.
 */
type Slide =
  | { type: 'video'; src: string; poster: string; label: string }
  | { type: 'image'; src: string; label: string; whole?: boolean };

const BANNER_SLIDES: Slide[] = [
  { type: 'video', src: '/banner/reelearth-paris.mp4', poster: '/banner/reelearth-paris.webp', label: 'ReelEarth: anglers fishing around the Eiffel Tower island' },
  { type: 'video', src: '/banner/hex-hordes.mp4', poster: '/banner/hex-hordes.webp', label: 'Hex Hordes: troops and castles on a hex island' },
  { type: 'image', src: '/banner/capital_factory_speech.jpeg', label: 'Pitching BuilderFive at Capital Factory', whole: true },
  { type: 'video', src: '/banner/siege.mp4', poster: '/banner/siege.webp', label: 'Siege: fighting the Infected Digger' },
  { type: 'image', src: '/projects/ourtailtales/hero.webp', label: 'ourTailTales: three pet memoir books on a table', whole: true },
  { type: 'video', src: '/banner/reelearth-giza.mp4', poster: '/banner/reelearth-giza.webp', label: 'ReelEarth: the pyramids of Giza island' },
  { type: 'image', src: '/banner/texas_mccombs_speech.jpeg', label: 'Speaking at Texas McCombs', whole: true },
  { type: 'image', src: '/projects/austin-founders/band.webp', label: 'Austin Founders Community: the Austin skyline' },
];

const ROTATE_INTERVAL_MS = 5000;

function VideoSlide({ src, poster, label }: { src: string; poster: string; label: string }) {
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
      poster={poster}
      muted
      playsInline
      loop
      preload="auto"
      className="absolute inset-0 h-full w-full object-cover"
      aria-label={label}
    />
  );
}

function ImageSlide({ src, label, whole }: { src: string; label: string; whole?: boolean }) {
  if (!whole) return <Image src={src} alt={label} fill className="object-cover" sizes="100vw" />;
  return (
    <>
      <Image src={src} alt="" fill className="scale-110 object-cover opacity-70 blur-2xl" sizes="100vw" aria-hidden />
      <Image src={src} alt={label} fill className="object-contain" sizes="100vw" />
    </>
  );
}

export function BannerCarousel() {
  const [index, setIndex] = useState(0);

  const goTo = useCallback((i: number) => {
    setIndex(((i % BANNER_SLIDES.length) + BANNER_SLIDES.length) % BANNER_SLIDES.length);
  }, []);

  const next = useCallback(() => {
    goTo(index + 1);
  }, [index, goTo]);

  useEffect(() => {
    const id = setInterval(next, ROTATE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [next]);

  const current = BANNER_SLIDES[index];

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
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
            <VideoSlide src={current.src} poster={current.poster} label={current.label} />
          ) : (
            <ImageSlide src={current.src} label={current.label} whole={current.whole} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Dots: top left below lg, where the avatar sits centred over the bottom of the strip */}
      <div className="absolute top-5 left-4 lg:top-auto lg:bottom-3 lg:left-1/2 lg:-translate-x-1/2 flex gap-2 z-10" aria-label="Banner pagination">
        {BANNER_SLIDES.map((slide, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="h-2 w-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
            style={{
              backgroundColor: i === index ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)',
            }}
            aria-label={`Go to slide ${i + 1}: ${slide.label}`}
            aria-current={i === index ? 'true' : undefined}
          />
        ))}
      </div>
    </div>
  );
}
