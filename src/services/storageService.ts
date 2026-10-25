// Storage service for persisting data in localStorage
const STORAGE_KEYS = {
  USER_PROFILE: 'hera_user_profile',
  SYMPTOMS: 'hera_symptoms',
  CYCLE_ENTRIES: 'hera_cycle_entries',
  REMINDERS: 'hera_reminders',
  WELLNESS: 'hera_wellness',
  ONBOARDING_COMPLETE: 'hera_onboarding_complete',
};

export interface UserProfile {
  name: string;
  ageRange: string;
  cycleTracking: boolean;
  healthInterests: string[];
  createdAt: string;
}

export interface SymptomEntry {
  id: string;
  name: string;
  date: string;
  time: string;
  severity: number;
  duration: string;
  bodyArea: string;
  cycleAssociation: string;
  mood: number;
  energy: number;
  sleepQuality: number;
  notes: string;
  triggers: string;
  createdAt: string;
}

export interface CycleEntry {
  id: string;
  startDate: string;
  endDate: string;
  symptoms: string[];
  notes: string;
}

export interface Reminder {
  id: string;
  title: string;
  date: string;
  time: string;
  type: string;
  completed: boolean;
  recurring: boolean;
}

export interface WellnessEntry {
  id: string;
  date: string;
  waterIntake: number;
  sleepHours: number;
  mood: number;
  energy: number;
  activity: string;
  activityDuration: number;
  stressLevel: number;
  notes: string;
}

function getItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Storage error:', e);
  }
}

// User Profile
export const getUserProfile = (): UserProfile | null => getItem(STORAGE_KEYS.USER_PROFILE, null);
export const saveUserProfile = (profile: UserProfile) => setItem(STORAGE_KEYS.USER_PROFILE, profile);

// Onboarding
export const isOnboardingComplete = (): boolean => getItem(STORAGE_KEYS.ONBOARDING_COMPLETE, false);
export const setOnboardingComplete = (val: boolean) => setItem(STORAGE_KEYS.ONBOARDING_COMPLETE, val);

// Symptoms
export const getSymptoms = (): SymptomEntry[] => getItem(STORAGE_KEYS.SYMPTOMS, []);
export const saveSymptoms = (symptoms: SymptomEntry[]) => setItem(STORAGE_KEYS.SYMPTOMS, symptoms);
export const addSymptom = (symptom: SymptomEntry) => {
  const symptoms = getSymptoms();
  symptoms.push(symptom);
  saveSymptoms(symptoms);
};
export const updateSymptom = (id: string, updated: Partial<SymptomEntry>) => {
  const symptoms = getSymptoms().map(s => s.id === id ? { ...s, ...updated } : s);
  saveSymptoms(symptoms);
};
export const deleteSymptom = (id: string) => {
  const symptoms = getSymptoms().filter(s => s.id !== id);
  saveSymptoms(symptoms);
};

// Cycle
export const getCycleEntries = (): CycleEntry[] => getItem(STORAGE_KEYS.CYCLE_ENTRIES, []);
export const saveCycleEntries = (entries: CycleEntry[]) => setItem(STORAGE_KEYS.CYCLE_ENTRIES, entries);
export const addCycleEntry = (entry: CycleEntry) => {
  const entries = getCycleEntries();
  entries.push(entry);
  saveCycleEntries(entries);
};
export const deleteCycleEntry = (id: string) => {
  const entries = getCycleEntries().filter(e => e.id !== id);
  saveCycleEntries(entries);
};

// Reminders
export const getReminders = (): Reminder[] => getItem(STORAGE_KEYS.REMINDERS, []);
export const saveReminders = (reminders: Reminder[]) => setItem(STORAGE_KEYS.REMINDERS, reminders);
export const addReminder = (reminder: Reminder) => {
  const reminders = getReminders();
  reminders.push(reminder);
  saveReminders(reminders);
};
export const updateReminder = (id: string, updated: Partial<Reminder>) => {
  const reminders = getReminders().map(r => r.id === id ? { ...r, ...updated } : r);
  saveReminders(reminders);
};
export const deleteReminder = (id: string) => {
  const reminders = getReminders().filter(r => r.id !== id);
  saveReminders(reminders);
};

// Wellness
export const getWellnessEntries = (): WellnessEntry[] => getItem(STORAGE_KEYS.WELLNESS, []);
export const saveWellnessEntries = (entries: WellnessEntry[]) => setItem(STORAGE_KEYS.WELLNESS, entries);
export const addWellnessEntry = (entry: WellnessEntry) => {
  const entries = getWellnessEntries();
  entries.push(entry);
  saveWellnessEntries(entries);
};

// Clear all data
export const clearAllData = () => {
  Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
};

// Export all data
export const exportAllData = () => {
  return {
    profile: getUserProfile(),
    symptoms: getSymptoms(),
    cycleEntries: getCycleEntries(),
    reminders: getReminders(),
    wellness: getWellnessEntries(),
    exportedAt: new Date().toISOString(),
  };
};
