'use client';

import { createContext, useContext, useRef, useCallback, type ReactNode } from 'react';

type Resolver = () => void;

interface TypingQueueValue {
  waitForTurn: () => Promise<void>;
  releaseTurn: () => void;
}

const TypingQueueContext = createContext<TypingQueueValue | undefined>(undefined);

export function TypingQueueProvider({ children }: { children: ReactNode }) {
  const queueRef = useRef<Resolver[]>([]);
  const activeRef = useRef(false);

  const waitForTurn = useCallback((): Promise<void> => {
    return new Promise<void>((resolve) => {
      if (!activeRef.current) {
        activeRef.current = true;
        resolve();
      } else {
        queueRef.current.push(resolve);
      }
    });
  }, []);

  const releaseTurn = useCallback(() => {
    const next = queueRef.current.shift();
    if (next) {
      next();
    } else {
      activeRef.current = false;
    }
  }, []);

  return (
    <TypingQueueContext.Provider value={{ waitForTurn, releaseTurn }}>
      {children}
    </TypingQueueContext.Provider>
  );
}

export function useTypingQueue() {
  return useContext(TypingQueueContext);
}
