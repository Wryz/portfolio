'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { MediaItem, MediaSection } from '@/lib/projects';
import { MediaLightbox } from '@/components/MediaLightbox';

function Thumb({ item, onOpen }: { item: MediaItem; onOpen: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ratio, setRatio] = useState('9/16');
  const label = `Open ${item.type}: ${item.alt}`;

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={label}
      className="media-thumb relative block w-full cursor-pointer overflow-hidden border-0 p-0"
      style={{ aspectRatio: ratio, backgroundColor: 'var(--p-surface)', borderRadius: 'min(var(--p-radius), 14px)' }}
      onMouseEnter={() => videoRef.current?.play()?.catch(() => {})}
      onMouseLeave={() => {
        const v = videoRef.current;
        if (v) {
          v.pause();
          v.currentTime = 0.1;
        }
      }}
    >
      {item.type === 'video' ? (
        <>
          <video
            ref={videoRef}
            src={`${item.src}#t=0.1`}
            poster={item.thumbnail}
            muted
            playsInline
            preload="metadata"
            className="block h-full w-full object-cover"
            onLoadedMetadata={(e) => {
              const v = e.currentTarget;
              if (v.videoWidth && v.videoHeight) setRatio(`${v.videoWidth}/${v.videoHeight}`);
            }}
          />
          <span
            className="absolute bottom-2 left-2 flex h-7 w-7 items-center justify-center rounded-full"
            style={{ backgroundColor: 'rgba(0,0,0,0.55)', color: '#fff' }}
            aria-hidden
          >
            <svg className="h-3.5 w-3.5 translate-x-px" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </>
      ) : (
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover"
          onLoad={(e) => {
            const img = e.currentTarget;
            if (img.naturalWidth && img.naturalHeight) setRatio(`${img.naturalWidth}/${img.naturalHeight}`);
          }}
        />
      )}
    </button>
  );
}

export function MediaGallery({ sections }: { sections: MediaSection[] }) {
  const all = sections.flatMap((s) => s.media);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const starts = sections.map((_, i) => sections.slice(0, i).reduce((n, s) => n + s.media.length, 0));

  return (
    <div className="space-y-12">
      {sections.map((section, sectionIndex) => {
        const start = starts[sectionIndex];
        return (
          <div key={section.name}>
            <h3 className="text-xl sm:text-2xl" style={{ fontFamily: 'var(--p-display)', fontWeight: 600 }}>
              {section.name}
            </h3>
            {section.subtitle && (
              <p className="mt-1 text-sm sm:text-base" style={{ color: 'var(--p-soft)' }}>
                {section.subtitle}
              </p>
            )}
            <div className="mt-4 columns-2 gap-3 sm:columns-3 lg:columns-4 [&>*]:mb-3">
              {section.media.map((item, i) => (
                <Thumb key={`${item.src}-${i}`} item={item} onOpen={() => setOpenIndex(start + i)} />
              ))}
            </div>
          </div>
        );
      })}
      <AnimatePresence>
        {openIndex !== null && (
          <MediaLightbox media={all} initialIndex={openIndex} onClose={() => setOpenIndex(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
