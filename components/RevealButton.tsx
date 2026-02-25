'use client';

import { motion } from 'framer-motion';
import { useReveal } from '@/lib/RevealContext';

export function RevealButton() {
  const { revealed, toggleReveal } = useReveal();

  return (
    <div className="py-8 flex justify-center">
      <button
        onClick={toggleReveal}
        className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold cursor-pointer transition-all duration-300"
        style={{
          color: revealed ? '#D4834A' : 'var(--text-secondary)',
          backgroundColor: revealed ? 'rgba(212, 131, 74, 0.1)' : 'var(--bg-muted)',
          border: `1px solid ${revealed ? 'rgba(212, 131, 74, 0.3)' : 'var(--border)'}`,
        }}
      >
        {/* Sparkle icon */}
        <motion.svg
          className="w-5 h-5 sparkle-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          animate={revealed ? { rotate: [0, 15, -15, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74L12 2z"
            fill={revealed ? 'currentColor' : 'none'}
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 3l.6 1.8L7.4 5.4 5.6 6 5 7.8 4.4 6 2.6 5.4 4.4 4.8z"
            fill={revealed ? 'currentColor' : 'none'}
            opacity={0.6}
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 16l.6 1.8 1.8.6-1.8.6-.6 1.8-.6-1.8-1.8-.6 1.8-.6z"
            fill={revealed ? 'currentColor' : 'none'}
            opacity={0.6}
          />
        </motion.svg>

        {revealed ? 'Hide details' : 'Reveal more details?'}
      </button>
    </div>
  );
}
