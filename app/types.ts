// types.ts
export interface Symptom {
    name: string;
    category: string;
    severity: 'Urgent' | 'Important' | 'Modéré';
    description: string;
    recommendations: string[];
  }
  
  export interface Treatment {
    name: string;
    description: string;
    frequency: string;
    dosage: string;
    warnings: string[];
  }
  
  export interface NaturalRemedy {
    name: string;
    benefits: string[];
    usage: string;
    contraindications: string[];
    evidence: 'Forte' | 'Modérée' | 'Faible';
  }
  
  // hooks/useLocalStorage.ts
  import { useState, useEffect } from 'react';
  
  export function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(() => {
      if (typeof window === "undefined") return initialValue;
      
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.error(error);
        return initialValue;
      }
    });
  
    useEffect(() => {
      try {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        console.error(error);
      }
    }, [key, storedValue]);
  
    return [storedValue, setStoredValue] as const;
  }