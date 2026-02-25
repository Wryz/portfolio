'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCareer } from '@/lib/CareerContext';
import { careerData, type Project, type MediaItem } from '@/lib/careerData';
import { MediaLightbox } from './MediaLightbox';

function VideoThumbnail({
  item,
  onClick,
}: {
  item: MediaItem;
  onClick: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <button
      onClick={onClick}
      className="relative aspect-video w-full rounded-lg overflow-hidden cursor-pointer group text-left"
      onMouseEnter={() => videoRef.current?.play()}
      onMouseLeave={() => {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }}
    >
      <video
        ref={videoRef}
        src={item.src}
        poster={item.thumbnail}
        muted
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors duration-300">
        <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 group-hover:opacity-0 transition-all duration-300">
          <svg
            className="w-5 h-5 text-gray-900 ml-0.5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </button>
  );
}

function ImageThumbnail({
  item,
  onClick,
}: {
  item: MediaItem;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="relative aspect-video w-full rounded-lg overflow-hidden cursor-pointer group text-left"
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </button>
  );
}

export function ProjectsSection() {
  const { career } = useCareer();
  const projects = careerData[career].projects;
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [lightboxItem, setLightboxItem] = useState<{
    item: MediaItem;
    project: Project;
  } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const ticking = useRef(false);

  // Reset on career change
  useEffect(() => {
    setActiveIndex(0);
    setDisplayedIndex(0);
    requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft = 0;
      }
    });
  }, [career]);

  // Debounce gallery updates so it doesn't flicker while scrolling
  useEffect(() => {
    const timer = setTimeout(() => setDisplayedIndex(activeIndex), 250);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  const handleScroll = useCallback(() => {
    if (ticking.current) return;
    ticking.current = true;
    requestAnimationFrame(() => {
      const container = scrollRef.current;
      if (!container) {
        ticking.current = false;
        return;
      }
      const center = container.scrollLeft + container.clientWidth / 2;
      const cards =
        container.querySelectorAll<HTMLElement>('[data-card-index]');
      let closest = 0;
      let minDist = Infinity;
      cards.forEach((card) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const dist = Math.abs(center - cardCenter);
        const idx = parseInt(card.dataset.cardIndex || '0', 10);
        if (dist < minDist) {
          minDist = dist;
          closest = idx;
        }
      });
      setActiveIndex(closest);
      ticking.current = false;
    });
  }, []);

  const scrollTo = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.querySelector<HTMLElement>(
      `[data-card-index="${index}"]`,
    );
    if (card) {
      const scrollTarget =
        card.offsetLeft + card.offsetWidth / 2 - container.clientWidth / 2;
      container.scrollTo({ left: scrollTarget, behavior: 'smooth' });
    }
  }, []);

  const displayedProject = projects[displayedIndex];

  return (
    <section
      id="projects"
      className="py-20 sm:py-28"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      {/* Section header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-3xl sm:text-4xl font-bold mb-2"
            style={{ color: 'var(--text)' }}
          >
            Projects
          </h2>
          <div
            className="w-16 h-1 rounded-full mb-12"
            style={{ backgroundColor: '#D4834A' }}
          />
        </motion.div>
      </div>

      {/* Carousel — full width */}
      <div className="relative">
        {/* Left arrow */}
        {activeIndex > 0 && (
          <button
            onClick={() => scrollTo(activeIndex - 1)}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-colors duration-200"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
            }}
            aria-label="Previous project"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {/* Right arrow */}
        {activeIndex < projects.length - 1 && (
          <button
            onClick={() => scrollTo(activeIndex + 1)}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-colors duration-200"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
            }}
            aria-label="Next project"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}

        {/* Scroll track */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        >
          {/* Left spacer — matches half viewport minus half card width */}
          <div
            className="shrink-0 sm:hidden"
            style={{ width: 'calc(50vw - 160px)' }}
            aria-hidden="true"
          />
          <div
            className="shrink-0 hidden sm:block"
            style={{ width: 'calc(50vw - 200px)' }}
            aria-hidden="true"
          />

          {projects.map((project, i) => (
            <motion.div
              key={`${career}-${project.title}`}
              data-card-index={i}
              className="shrink-0 w-80 sm:w-[400px] snap-center cursor-pointer"
              animate={{
                scale: activeIndex === i ? 1 : 0.88,
                opacity: activeIndex === i ? 1 : 0.5,
              }}
              transition={{ duration: 0.3 }}
              onClick={() => scrollTo(i)}
            >
              <div className="relative h-52 sm:h-72 rounded-xl overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)',
                  }}
                />
                <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{
                          backgroundColor: 'rgba(212, 131, 74, 0.25)',
                          color: '#EDAE82',
                          backdropFilter: 'blur(4px)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/70 mt-0.5">
                    {project.subtitle}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Right spacer */}
          <div
            className="shrink-0 sm:hidden"
            style={{ width: 'calc(50vw - 160px)' }}
            aria-hidden="true"
          />
          <div
            className="shrink-0 hidden sm:block"
            style={{ width: 'calc(50vw - 200px)' }}
            aria-hidden="true"
          />
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className="rounded-full transition-all duration-300 cursor-pointer"
              style={{
                width: activeIndex === i ? 24 : 8,
                height: 8,
                backgroundColor:
                  activeIndex === i ? '#D4834A' : 'var(--border)',
              }}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Media gallery for active project */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${career}-${displayedIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Description */}
            <div className="mb-8">
              <h3
                className="text-xl sm:text-2xl font-bold mb-3"
                style={{ color: 'var(--text)' }}
              >
                {displayedProject.title}
              </h3>
              <div className="space-y-3 mb-4">
                {displayedProject.description.map((p, i) => (
                  <p
                    key={i}
                    className="text-sm sm:text-base leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {p}
                  </p>
                ))}
              </div>
              {displayedProject.links.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {displayedProject.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200"
                      style={{
                        backgroundColor: '#D4834A',
                        color: '#ffffff',
                      }}
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

            {/* Media grid */}
            {displayedProject.media.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayedProject.media.map((item, i) => (
                  <motion.div
                    key={`${item.src}-${i}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.08 }}
                  >
                    {item.type === 'video' ? (
                      <VideoThumbnail
                        item={item}
                        onClick={() =>
                          setLightboxItem({
                            item,
                            project: displayedProject,
                          })
                        }
                      />
                    ) : (
                      <ImageThumbnail
                        item={item}
                        onClick={() =>
                          setLightboxItem({
                            item,
                            project: displayedProject,
                          })
                        }
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <MediaLightbox
            item={lightboxItem.item}
            project={lightboxItem.project}
            onClose={() => setLightboxItem(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
