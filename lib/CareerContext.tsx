'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

export type CareerMode = 'software' | 'community';

interface CareerContextValue {
  career: CareerMode;
  setCareer: (mode: CareerMode) => void;
}

const CareerContext = createContext<CareerContextValue | undefined>(undefined);

export function CareerProvider({ children }: { children: ReactNode }) {
  const [career, setCareer] = useState<CareerMode>('software');

  return (
    <CareerContext.Provider value={{ career, setCareer }}>
      {children}
    </CareerContext.Provider>
  );
}

export function useCareer() {
  const context = useContext(CareerContext);
  if (!context) {
    throw new Error('useCareer must be used within a CareerProvider');
  }
  return context;
}
