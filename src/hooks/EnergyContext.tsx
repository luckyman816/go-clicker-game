

import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';

interface EnergyContextType {
  remainedEnergy: number;
  setRemainedEnergy: React.Dispatch<React.SetStateAction<number>>;
  startRecovery: () => void;
  stopRecovery: () => void;
}

const EnergyContext = createContext<EnergyContextType | undefined>(undefined);

export const useEnergy = () => {
  const context = useContext(EnergyContext);
  if (!context) {
    throw new Error('useEnergy must be used within an EnergyProvider');
  }
  return context;
};

interface EnergyProviderProps {
  children: ReactNode;
}

export const EnergyProvider: React.FC<EnergyProviderProps> = ({ children }) => {
  const [remainedEnergy, setRemainedEnergy] = useState(() => {
    const storedEnergy = localStorage.getItem('remainedEnergy');
    return storedEnergy ? parseInt(storedEnergy, 10) : 0;
  });
  const recoveryIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    const storedTimestamp = localStorage.getItem('lastTimestamp');
    if (storedTimestamp) {
      const elapsedSeconds = Math.floor((Date.now() - parseInt(storedTimestamp, 10)) / 1000);
      const updatedEnergy = Math.min(remainedEnergy + elapsedSeconds, 2000);
      setRemainedEnergy(updatedEnergy);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('remainedEnergy', remainedEnergy.toString());
    localStorage.setItem('lastTimestamp', Date.now().toString());
  }, [remainedEnergy]);

  const startRecovery = () => {
    stopRecovery();
    recoveryIntervalRef.current = window.setInterval(() => {
      setRemainedEnergy((prev) => {
        if (prev < 2000) {
          return prev + 1;
        } else {
          stopRecovery();
          return prev;
        }
      });
    }, 1000);
  };

  const stopRecovery = () => {
    if (recoveryIntervalRef.current) {
      clearInterval(recoveryIntervalRef.current);
      recoveryIntervalRef.current = null;
    }
  };

  useEffect(() => {
    startRecovery();
    return () => stopRecovery();
  }, []);

  return (
    <EnergyContext.Provider value={{ remainedEnergy, setRemainedEnergy, startRecovery, stopRecovery }}>
      {children}
    </EnergyContext.Provider>
  );
};
