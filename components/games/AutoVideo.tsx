'use client';

import { useEffect, useRef } from 'react';

/**
 * A muted, looping clip that plays only while it is on screen (and not at all for people who
 * ask for reduced motion, who see the poster). Pass `webm` for browsers without H.264.
 */
export function AutoVideo({
  src,
  webm,
  poster,
  label,
  eager = false,
  className = '',
  style,
}: {
  src: string;
  webm?: string;
  poster?: string;
  label?: string;
  /** Start loading straight away (for the clip at the top of the page) */
  eager?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.35 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      poster={poster}
      muted
      loop
      playsInline
      preload={eager ? 'auto' : 'none'}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={className}
      style={style}
    >
      <source src={src} type="video/mp4" />
      {webm && <source src={webm} type="video/webm" />}
    </video>
  );
}
