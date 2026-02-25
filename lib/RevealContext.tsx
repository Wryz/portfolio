'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

interface RevealContextValue {
  revealed: boolean;
  toggleReveal: () => void;
}

const RevealContext = createContext<RevealContextValue | undefined>(undefined);

export function RevealProvider({ children }: { children: ReactNode }) {
  const [revealed, setRevealed] = useState(false);

  const toggleReveal = () => setRevealed((prev) => !prev);

  return (
    <RevealContext.Provider value={{ revealed, toggleReveal }}>
      {children}
    </RevealContext.Provider>
  );
}

export function useReveal() {
  const context = useContext(RevealContext);
  if (!context) {
    throw new Error('useReveal must be used within a RevealProvider');
  }
  return context;
}
