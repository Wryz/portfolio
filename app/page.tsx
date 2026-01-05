'use client';

import { Suspense, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Timeline, Timestamp } from "@/components/Timeline";
import { ProjectModal } from "@/components/ProjectModal";
import { projects } from "@/data/projects";

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Transform projects into timestamps for Timeline component
  const timestamps: Timestamp[] = useMemo(() => {
    return projects.map(project => ({
      date: project.date,
      thumbnail: project.thumbnail,
      id: project.id,
    }));
  }, []);
  
  // Derive selected project from URL params instead of using state + effect
  const selectedProject = useMemo(() => {
    const projectId = searchParams.get('project');
    if (projectId) {
      return projects.find(p => p.id === projectId) || null;
    }
    return null;
  }, [searchParams]);

  const handleProjectClick = (projectId: string) => {
    // Update URL without navigation
    const url = new URL(window.location.href);
    url.searchParams.set('project', projectId);
    router.push(url.pathname + url.search, { scroll: false });
  };

  const handleCloseModal = () => {
    // Remove project param from URL without navigation
    router.push('/', { scroll: false });
  };

  return (
    <>
      {/* Full-screen timeline that can be scrolled from anywhere */}
      <Timeline data={timestamps} onProjectClick={handleProjectClick} />
      
      {/* Header overlay on top of timeline */}
      <header className="fixed top-0 left-0 right-0 text-center px-4 py-8 z-20 pointer-events-none">
        <h1 className="text-5xl sm:text-6xl text-white mb-6" style={{ fontFamily: 'cursive' }}>
          My Phung
        </h1>
        <div className="flex items-center justify-center gap-6 pointer-events-auto">
          {/* LinkedIn Icon */}
          <a 
            href="https://www.linkedin.com/in/my-phung/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-white/80 transition-colors"
            aria-label="LinkedIn"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          
          {/* GitHub Icon */}
          <a 
            href="https://github.com/Wryz" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-white/80 transition-colors"
            aria-label="GitHub"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
            </svg>
          </a>
          
          {/* TikTok Icon */}
          <a 
            href="https://www.tiktok.com/@myphungvlogs" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-white/80 transition-colors"
            aria-label="TikTok"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
            </svg>
          </a>
        </div>
      </header>
      
      {/* Fade overlays for left and right edges - viewport relative */}
      <div 
        className="fixed left-0 top-0 bottom-0 w-12 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.95) 20%, rgba(0, 0, 0, 0.7) 40%, rgba(0, 0, 0, 0.3) 60%, rgba(0, 0, 0, 0) 100%)',
          backdropFilter: 'blur(1px)',
          WebkitBackdropFilter: 'blur(1px)'
        }}
      ></div>
      <div 
        className="fixed right-0 top-0 bottom-0 w-12 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.95) 20%, rgba(0, 0, 0, 0.7) 40%, rgba(0, 0, 0, 0.3) 60%, rgba(0, 0, 0, 0) 100%)',
          backdropFilter: 'blur(1px)',
          WebkitBackdropFilter: 'blur(1px)'
        }}
      ></div>
      
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={handleCloseModal} />
      )}
    </>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white">Loading...</div>}>
        <HomeContent />
      </Suspense>
    </div>
  );
}
