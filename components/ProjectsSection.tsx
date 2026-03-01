'use client';

import { useState, useRef } from 'react';

/** Renders text with **bold** segments as <strong> */
function DescriptionText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={i} style={{ color: 'inherit', fontWeight: 700 }}>
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        )
      )}
    </>
  );
}
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCareer } from '@/lib/CareerContext';
import { careerData, type Project, type MediaItem } from '@/lib/careerData';
import { MediaLightbox } from './MediaLightbox';
import { FaRobot, FaGlobeAmericas, FaCube, FaBrain, FaCross } from 'react-icons/fa';
import { LinkEmbed, GitHubReposEmbed } from './LinkEmbed';
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
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      className="relative block w-full overflow-hidden cursor-pointer group text-left m-0 p-0 border-0 bg-transparent"
      style={{ aspectRatio }}
      onMouseEnter={() => videoRef.current?.play()?.catch(() => {})}
      onMouseLeave={() => {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }}
    >
      {!isLoaded && (
        <div
          className="absolute inset-0 flex items-center justify-center z-10"
          style={{ backgroundColor: 'var(--bg-muted)' }}
        >
          <svg
            className="animate-spin h-6 w-6 opacity-40"
            style={{ color: 'var(--text-muted)' }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
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
        </div>
      )}
      <video
        ref={videoRef}
        src={item.src}
        poster={item.thumbnail}
        muted
        playsInline
        preload="auto"
        className="block w-full h-full object-cover"
        onLoadedMetadata={(e) => {
          const v = e.currentTarget;
          if (v.videoWidth && v.videoHeight) {
            setAspectRatio(`${v.videoWidth}/${v.videoHeight}`);
          }
        }}
        onLoadedData={(e) => {
          e.currentTarget.currentTime = 0.1;
          setIsLoaded(true);
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
      type="button"
      onClick={onClick}
      className="relative block w-full overflow-hidden cursor-pointer group text-left m-0 p-0 border-0 bg-transparent"
      style={{ aspectRatio }}
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        className="object-cover"
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
    project: Project;
    initialIndex: number;
    media: MediaItem[];
  } | null>(null);

  const [prevCareer, setPrevCareer] = useState(career);
  if (career !== prevCareer) {
    setPrevCareer(career);
    setDisplayedIndex(0);
  }

  const safeIndex =
    projects.length > 0 ? Math.min(displayedIndex, projects.length - 1) : 0;
  if (displayedIndex !== safeIndex) {
    setDisplayedIndex(safeIndex);
  }
  const displayedProject = projects[safeIndex];
  const hasMediaSections =
    displayedProject?.mediaSections && displayedProject.mediaSections.length > 0;
  const allMedia = hasMediaSections
    ? displayedProject!.mediaSections!.flatMap((s) => s.media)
    : (displayedProject?.media ?? []);

  if (!displayedProject) {
    return null;
  }

  return (
    <section
      id="projects"
      className="py-20 sm:py-28 overflow-x-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden">
        {/* Project icons + names */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-6 lg:gap-12 mb-16 overflow-visible">
          {projects.map((project, i) => {
            const isActive = displayedIndex === i;
            return (
              <button
                key={`${career}-${project.title}`}
                type="button"
                onMouseEnter={() => setDisplayedIndex(i)}
                className="flex flex-col items-center gap-3 cursor-pointer transition-all duration-200 group w-14 sm:w-20 lg:w-24 shrink-0 py-1"
              >
                <span
                  className="flex items-center justify-center min-w-10 min-h-10 sm:min-w-11 sm:min-h-11 transition-all duration-200"
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
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
                <h3
                  className="text-xl sm:text-2xl font-bold"
                  style={{ color: 'var(--text)' }}
                >
                  {displayedProject.title}
                </h3>
                {displayedProject.highlights && displayedProject.highlights.length > 0 && (
                  <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    {displayedProject.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="text-xs sm:text-sm px-2 py-0.5 rounded-full font-medium"
                        style={{
                          backgroundColor: 'var(--bg-muted)',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {h}
                      </span>
                    ))}
                  </span>
                )}
              </div>
              <div className="space-y-3 mb-6">
                {displayedProject.description.map((p, i) => (
                  <p
                    key={i}
                    className="text-sm sm:text-base leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <DescriptionText text={p} />
                  </p>
                ))}
              </div>

              {/* Link embeds — YouTube, featured image, GitHub repos, Website */}
              {(displayedProject.links.length > 0 || (displayedProject.githubRepos?.length ?? 0) > 0 || displayedProject.featuredImage) && (
                <div
                  className={
                    displayedProject.featuredImage
                      ? 'flex flex-col md:flex-row gap-4 mb-8'
                      : 'grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'
                  }
                >
                  {displayedProject.featuredImage && (
                    <div
                      className="rounded-xl overflow-hidden border w-fit max-w-[500px] shrink-0"
                      style={{
                        borderColor: 'var(--border)',
                        backgroundColor: 'var(--bg-card)',
                      }}
                    >
                      <div className="relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={displayedProject.featuredImage.src}
                          alt={displayedProject.featuredImage.alt}
                          className="w-full h-auto block"
                        />
                      </div>
                    </div>
                  )}
                  <div
                    className={
                      displayedProject.featuredImage
                        ? 'flex flex-col gap-4 flex-1 min-w-0'
                        : 'contents'
                    }
                  >
                    {displayedProject.links.map((link) => (
                      <LinkEmbed key={link.label} link={link} />
                    ))}
                    {displayedProject.githubRepos && displayedProject.githubRepos.length > 0 && (
                      <GitHubReposEmbed repos={displayedProject.githubRepos} />
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Media — either sections (Gameplay, Cinematics, Mobs) or flat list */}
            {hasMediaSections ? (
              <div className="space-y-10">
                {displayedProject.mediaSections!.map((section, sectionIndex) => {
                  let runningIndex = 0;
                  for (let k = 0; k < sectionIndex; k++) {
                    runningIndex += displayedProject.mediaSections![k].media.length;
                  }
                  return (
                    <div key={section.name}>
                      <h4
                        className="text-lg font-semibold mb-3"
                        style={{ color: 'var(--text)' }}
                      >
                        {section.name}
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-0">
                        {section.media.map((item, i) => {
                          const globalIndex = runningIndex + i;
                          return (
                            <motion.div
                              key={`${item.src}-${globalIndex}`}
                              className="m-0 p-0 min-w-0"
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: (sectionIndex * 10 + i) * 0.03 }}
                            >
                              {item.type === 'video' ? (
                                <VideoThumbnail
                                  item={item}
                                  onClick={() =>
                                    setLightboxItem({
                                      project: displayedProject,
                                      initialIndex: globalIndex,
                                      media: allMedia,
                                    })
                                  }
                                />
                              ) : (
                                <ImageThumbnail
                                  item={item}
                                  onClick={() =>
                                    setLightboxItem({
                                      project: displayedProject,
                                      initialIndex: globalIndex,
                                      media: allMedia,
                                    })
                                  }
                                />
                              )}
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              allMedia.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-0">
                  {allMedia.map((item, i) => (
                    <motion.div
                      key={`${item.src}-${i}`}
                      className="m-0 p-0 min-w-0"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.08 }}
                    >
                      {item.type === 'video' ? (
                        <VideoThumbnail
                          item={item}
                          onClick={() =>
                            setLightboxItem({
                              project: displayedProject,
                              initialIndex: i,
                              media: allMedia,
                            })
                          }
                        />
                      ) : (
                        <ImageThumbnail
                          item={item}
                          onClick={() =>
                            setLightboxItem({
                              project: displayedProject,
                              initialIndex: i,
                              media: allMedia,
                            })
                          }
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
              )
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <MediaLightbox
            media={lightboxItem.media}
            initialIndex={lightboxItem.initialIndex}
            project={lightboxItem.project}
            onClose={() => setLightboxItem(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
