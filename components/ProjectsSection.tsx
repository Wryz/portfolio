'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCareer } from '@/lib/CareerContext';
import { careerData, type Project, type MediaItem } from '@/lib/careerData';
import { MediaLightbox } from './MediaLightbox';
import { FaRobot, FaGlobeAmericas, FaCube, FaBrain, FaCross } from 'react-icons/fa';
import { FaCalendarDays, FaGamepad, FaPeopleGroup } from 'react-icons/fa6';

const PROJECT_ICONS: Record<string, React.ReactNode> = {
  'Miqo': <FaRobot className="w-7 h-7 sm:w-9 sm:h-9" />,
  'BuilderFive': <FaGlobeAmericas className="w-7 h-7 sm:w-9 sm:h-9" />,
  'Siege': <FaCube className="w-7 h-7 sm:w-9 sm:h-9" />,
  'Brain Benchmark': <FaBrain className="w-7 h-7 sm:w-9 sm:h-9" />,
  'Verses Widget': <FaCross className="w-7 h-7 sm:w-9 sm:h-9" />,
  'Austin Coworking Events': <FaCalendarDays className="w-7 h-7 sm:w-9 sm:h-9" />,
  'UConn Minecraft Club': <FaGamepad className="w-7 h-7 sm:w-9 sm:h-9" />,
  'Siege Gaming Community': <FaPeopleGroup className="w-7 h-7 sm:w-9 sm:h-9" />,
};

function VideoThumbnail({
  item,
  onClick,
}: {
  item: MediaItem;
  onClick: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [aspectRatio, setAspectRatio] = useState<string>('9/16');

  return (
    <button
      onClick={onClick}
      className="relative w-full rounded-lg overflow-hidden cursor-pointer group text-left"
      style={{ aspectRatio }}
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
        className="w-full h-full object-contain"
        onLoadedMetadata={(e) => {
          const v = e.currentTarget;
          if (v.videoWidth && v.videoHeight) {
            setAspectRatio(`${v.videoWidth}/${v.videoHeight}`);
          }
        }}
      />
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
  const [aspectRatio, setAspectRatio] = useState<string>('9/16');

  return (
    <button
      onClick={onClick}
      className="relative w-full rounded-lg overflow-hidden cursor-pointer group text-left"
      style={{ aspectRatio }}
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        className="object-contain group-hover:scale-105 transition-transform duration-500"
        onLoad={(e) => {
          const img = e.target as HTMLImageElement;
          if (img.naturalWidth && img.naturalHeight) {
            setAspectRatio(`${img.naturalWidth}/${img.naturalHeight}`);
          }
        }}
      />
    </button>
  );
}

export function ProjectsSection() {
  const { career } = useCareer();
  const projects = careerData[career].projects;
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [lightboxItem, setLightboxItem] = useState<{
    item: MediaItem;
    project: Project;
  } | null>(null);

  const [prevCareer, setPrevCareer] = useState(career);
  if (career !== prevCareer) {
    setPrevCareer(career);
    setDisplayedIndex(0);
  }

  const displayedProject = projects[displayedIndex];

  return (
    <section
      id="projects"
      className="py-20 sm:py-28"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
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

        {/* Project icons + names */}
        <div className="flex flex-wrap justify-center gap-8 sm:gap-12 mb-16">
          {projects.map((project, i) => {
            const isActive = displayedIndex === i;
            return (
              <button
                key={`${career}-${project.title}`}
                type="button"
                onMouseEnter={() => setDisplayedIndex(i)}
                className="flex flex-col items-center gap-3 cursor-pointer transition-all duration-200 group w-20 sm:w-24 shrink-0"
              >
                <span
                  className="transition-all duration-200"
                  style={{
                    transform: isActive ? 'scale(1.15)' : 'scale(1)',
                    color: isActive ? '#D4834A' : 'var(--text-secondary)',
                  }}
                >
                  {PROJECT_ICONS[project.title] ?? <FaCube className="w-7 h-7 sm:w-9 sm:h-9" />}
                </span>
                <span
                  className="text-sm sm:text-base font-medium transition-colors duration-200 text-center break-words w-full"
                  style={{
                    color: isActive ? '#D4834A' : 'var(--text-secondary)',
                  }}
                >
                  {project.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Project content — swaps on hover */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${career}-${displayedIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
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

            {/* Media flex — 200–250px per item, flexes to fill row with side padding */}
            {displayedProject.media.length > 0 && (
              <div className="flex flex-wrap gap-x-2">
                {displayedProject.media.map((item, i) => (
                  <motion.div
                    key={`${item.src}-${i}`}
                    className="min-w-[140px] max-w-[200px] flex-1"
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
