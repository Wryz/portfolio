'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { BannerCarousel } from './BannerCarousel';
import { FaChessPawn, FaGraduationCap } from 'react-icons/fa';
import { useCareer } from '@/lib/CareerContext';
import { useTheme } from '@/lib/ThemeContext';

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/Wryz',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/my-phung/',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

const heroOverlays = {
  dark: 'linear-gradient(to top, rgba(30, 30, 30, 0.85) 0%, rgba(30, 30, 30, 0.85) 10%, transparent 100%)',
  light: 'linear-gradient(to top, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0.92) 20%, transparent 100%)',
} as const;

const CHESS_COM_URL = 'https://www.chess.com/member/MyPhung0';

function DetailBadge({
  children,
  tooltip,
  href,
  'aria-label': ariaLabel,
}: {
  children: React.ReactNode;
  tooltip: string;
  href?: string;
  'aria-label': string;
}) {
  const wrapperClass = 'relative inline-flex items-center justify-center transition-colors duration-200 group';
  const tooltipClass =
    'absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-200 z-10 group-hover:opacity-100';
  const tooltipStyle = {
    backgroundColor: 'var(--bg-card)',
    color: 'var(--text)',
    border: '1px solid var(--border)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  };

  const content = (
    <>
      <span className={tooltipClass} style={tooltipStyle} role="tooltip">
        {tooltip}
      </span>
      {children}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className={`${wrapperClass} cursor-pointer`}
        style={{ color: 'var(--text-secondary)' }}
        onMouseEnter={(e) => { e.currentTarget.style.color = '#D4834A'; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
      >
        {content}
      </a>
    );
  }

  return (
    <span
      aria-label={ariaLabel}
      title={tooltip}
      className={wrapperClass}
      style={{ color: 'var(--text-secondary)' }}
      onMouseEnter={(e) => { e.currentTarget.style.color = '#D4834A'; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
    >
      {content}
    </span>
  );
}

export function Hero() {
  const { career, setCareer } = useCareer();
  const { mode } = useTheme();

  return (
    <section className="relative">
      {/* Banner - 16:9 landscape, full width */}
      <div className="relative w-full aspect-video overflow-hidden">
        <BannerCarousel />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: heroOverlays[mode] }}
          aria-hidden
        />
      </div>

      {/* Profile + Info */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center -mt-20 sm:-mt-24"
        >
          <div
            className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden"
          >
            <Image
              src="/Linkedin.png"
              alt="My Phung"
              fill
              priority
              className="object-cover scale-[1.3]"
            />
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-5 text-4xl sm:text-5xl font-bold"
            style={{ color: 'var(--text)' }}
          >
            My Phung
          </motion.h1>

          {/* Career switch */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="mt-6 flex items-center gap-3"
          >
            <span
              className="text-sm font-medium cursor-pointer"
              style={{ color: career === 'software' ? 'var(--text)' : 'var(--text-muted)' }}
              onClick={() => setCareer('software')}
            >
              Software Engineer
            </span>
            <button
              onClick={() => setCareer(career === 'software' ? 'community' : 'software')}
              className="relative w-12 h-7 rounded-full cursor-pointer shrink-0"
              style={{ backgroundColor: career === 'software' ? 'var(--bg-muted)' : '#D4834A' }}
              aria-label="Toggle career mode"
            >
              <motion.div
                className="absolute top-1 w-5 h-5 rounded-full"
                style={{ backgroundColor: career === 'software' ? '#D4834A' : '#ffffff' }}
                animate={{ left: career === 'software' ? '4px' : '28px' }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
            <span
              className="text-sm font-medium cursor-pointer"
              style={{ color: career === 'community' ? 'var(--text)' : 'var(--text-muted)' }}
              onClick={() => setCareer('community')}
            >
              Community Manager
            </span>
          </motion.div>

          {/* Social badges */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="mt-5 flex items-center gap-3"
          >
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                style={{
                  backgroundColor: 'var(--bg-muted)',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#D4834A';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.borderColor = '#D4834A';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-muted)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.borderColor = 'var(--border)';
                }}
              >
                {link.icon}
                {link.label}
              </a>
            ))}
          </motion.div>

          {/* Detail badges: chess, graduation */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="my-4 flex items-center justify-center gap-2"
          >
            <DetailBadge
              tooltip="1900 chess.com elo"
              href={CHESS_COM_URL}
              aria-label="Chess.com profile, 1900 elo"
            >
              <FaChessPawn className="w-4 h-4" style={{ color: 'inherit' }} />
            </DetailBadge>
            <DetailBadge
              tooltip="Graduated from UConn, BS in Economics, 2024"
              aria-label="UConn BS Economics 2024"
            >
              <FaGraduationCap className="w-4 h-4" style={{ color: 'inherit' }} />
            </DetailBadge>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
