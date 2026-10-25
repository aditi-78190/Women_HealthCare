import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  getUserProfile, saveUserProfile, UserProfile,
  getSymptoms, saveSymptoms, SymptomEntry,
  getCycleEntries, saveCycleEntries, CycleEntry,
  getReminders, saveReminders, Reminder,
  getWellnessEntries, saveWellnessEntries, WellnessEntry,
  isOnboardingComplete, setOnboardingComplete,
} from '../services/storageService';

interface AppContextType {
  profile: UserProfile | null;
  setProfile: (p: UserProfile) => void;
  symptoms: SymptomEntry[];
  setSymptoms: (s: SymptomEntry[]) => void;
  cycleEntries: CycleEntry[];
  setCycleEntries: (e: CycleEntry[]) => void;
  reminders: Reminder[];
  setReminders: (r: Reminder[]) => void;
  wellnessEntries: WellnessEntry[];
  setWellnessEntries: (w: WellnessEntry[]) => void;
  onboardingComplete: boolean;
  setOnboardingDone: (v: boolean) => void;
  refreshData: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState<UserProfile | null>(null);
  const [symptoms, setSymptomsState] = useState<SymptomEntry[]>([]);
  const [cycleEntries, setCycleEntriesState] = useState<CycleEntry[]>([]);
  const [reminders, setRemindersState] = useState<Reminder[]>([]);
  const [wellnessEntries, setWellnessEntriesState] = useState<WellnessEntry[]>([]);
  const [onboardingComplete, setOnboardingState] = useState(false);

  const refreshData = () => {
    setProfileState(getUserProfile());
    setSymptomsState(getSymptoms());
    setCycleEntriesState(getCycleEntries());
    setRemindersState(getReminders());
    setWellnessEntriesState(getWellnessEntries());
    setOnboardingState(isOnboardingComplete());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const setProfile = (p: UserProfile) => {
    saveUserProfile(p);
    setProfileState(p);
  };

  const setSymptoms = (s: SymptomEntry[]) => {
    saveSymptoms(s);
    setSymptomsState(s);
  };

  const setCycleEntries = (e: CycleEntry[]) => {
    saveCycleEntries(e);
    setCycleEntriesState(e);
  };

  const setReminders = (r: Reminder[]) => {
    saveReminders(r);
    setRemindersState(r);
  };

  const setWellnessEntries = (w: WellnessEntry[]) => {
    saveWellnessEntries(w);
    setWellnessEntriesState(w);
  };

  const setOnboardingDone = (v: boolean) => {
    setOnboardingComplete(v);
    setOnboardingState(v);
  };

  return (
    <AppContext.Provider value={{
      profile, setProfile,
      symptoms, setSymptoms,
      cycleEntries, setCycleEntries,
      reminders, setReminders,
      wellnessEntries, setWellnessEntries,
      onboardingComplete, setOnboardingDone,
      refreshData,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
