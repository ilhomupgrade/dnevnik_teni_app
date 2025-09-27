import { useState, useEffect } from "react";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { MainDashboard } from "./components/MainDashboard";
import { DailyChallenge } from "./components/DailyChallenge";
import { ProgressScreen } from "./components/ProgressScreen";
import { JournalScreen } from "./components/JournalScreen";
import { SettingsScreen } from "./components/SettingsScreen";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner@2.0.3";

interface JournalEntry {
  id: string;
  date: string;
  day: number;
  content: string;
  title: string;
}

interface Settings {
  notifications: boolean;
  darkMode: boolean;
  reminders: boolean;
}

interface AppState {
  hasStarted: boolean;
  currentDay: number;
  completedDays: boolean[];
  dailyReflections: Record<number, string>;
  journalEntries: JournalEntry[];
  settings: Settings;
}

const initialState: AppState = {
  hasStarted: false,
  currentDay: 1,
  completedDays: new Array(30).fill(false),
  dailyReflections: {},
  journalEntries: [],
  settings: {
    notifications: true,
    darkMode: true,
    reminders: true
  }
};

export default function App() {
  const [state, setState] = useState<AppState>(initialState);
  const [currentScreen, setCurrentScreen] = useState<string>('welcome');

  // Load data from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('shadow-app-state');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        setState(parsedState);
        if (parsedState.hasStarted) {
          setCurrentScreen('dashboard');
        }
      } catch (error) {
        console.error('Error loading saved state:', error);
      }
    }

    // Set dark mode class on body
    document.body.classList.add('dark');
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('shadow-app-state', JSON.stringify(state));
  }, [state]);

  const handleStart = () => {
    setState(prev => ({ ...prev, hasStarted: true }));
    setCurrentScreen('dashboard');
    toast.success("Добро пожаловать в путешествие к целостности");
  };

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen);
  };

  const handleCompleteDay = (day: number, reflection: string) => {
    setState(prev => {
      const newCompletedDays = [...prev.completedDays];
      const newReflections = { ...prev.dailyReflections };
      const newJournalEntries = [...prev.journalEntries];

      newCompletedDays[day - 1] = true;
      newReflections[day] = reflection;

      // Add/update journal entry for this day
      const existingEntryIndex = newJournalEntries.findIndex(entry => entry.day === day);
      const journalEntry: JournalEntry = {
        id: existingEntryIndex >= 0 ? newJournalEntries[existingEntryIndex].id : `day-${day}-${Date.now()}`,
        date: new Date().toLocaleDateString('ru-RU'),
        day: day,
        title: `День ${day}: Рефлексия`,
        content: reflection
      };

      if (existingEntryIndex >= 0) {
        newJournalEntries[existingEntryIndex] = journalEntry;
      } else {
        newJournalEntries.unshift(journalEntry);
      }

      // Advance to next day if this is the current day
      const newCurrentDay = day === prev.currentDay && day < 30 ? day + 1 : prev.currentDay;

      return {
        ...prev,
        currentDay: newCurrentDay,
        completedDays: newCompletedDays,
        dailyReflections: newReflections,
        journalEntries: newJournalEntries
      };
    });

    toast.success(`День ${day} завершен!`);
    
    // Navigate back to dashboard after a short delay
    setTimeout(() => {
      setCurrentScreen('dashboard');
    }, 1500);
  };

  const handleSaveJournalEntry = (entry: Omit<JournalEntry, 'id'>) => {
    setState(prev => ({
      ...prev,
      journalEntries: [
        {
          ...entry,
          id: `journal-${Date.now()}`
        },
        ...prev.journalEntries
      ]
    }));
    toast.success("Запись сохранена в журнал");
  };

  const handleUpdateSettings = (newSettings: Settings) => {
    setState(prev => ({
      ...prev,
      settings: newSettings
    }));
    toast.success("Настройки обновлены");
  };

  const handleReset = () => {
    if (confirm("Вы уверены, что хотите сбросить весь прогресс? Это действие нельзя отменить.")) {
      setState(initialState);
      setCurrentScreen('welcome');
      localStorage.removeItem('shadow-app-state');
      toast.success("Прогресс сброшен. Добро пожаловать в новое путешествие!");
    }
  };

  // Don't show welcome screen if user has already started
  if (!state.hasStarted && currentScreen === 'welcome') {
    return <WelcomeScreen onStart={handleStart} />;
  }

  return (
    <div className="min-h-screen bg-black max-w-md mx-auto relative overflow-hidden">
      {/* Mobile viewport container */}
      <div className="w-full h-full">
        {currentScreen === 'dashboard' && (
          <MainDashboard
            currentDay={state.currentDay}
            onNavigate={handleNavigate}
            completedDays={state.completedDays}
          />
        )}

        {currentScreen === 'daily' && (
          <DailyChallenge
            currentDay={state.currentDay}
            onBack={() => setCurrentScreen('dashboard')}
            onComplete={handleCompleteDay}
            isCompleted={state.completedDays[state.currentDay - 1]}
            savedReflection={state.dailyReflections[state.currentDay]}
          />
        )}

        {currentScreen === 'progress' && (
          <ProgressScreen
            onBack={() => setCurrentScreen('dashboard')}
            completedDays={state.completedDays}
            currentDay={state.currentDay}
          />
        )}

        {currentScreen === 'journal' && (
          <JournalScreen
            onBack={() => setCurrentScreen('dashboard')}
            journalEntries={state.journalEntries}
            onSaveEntry={handleSaveJournalEntry}
          />
        )}

        {currentScreen === 'settings' && (
          <SettingsScreen
            onBack={() => setCurrentScreen('dashboard')}
            onReset={handleReset}
            settings={state.settings}
            onUpdateSettings={handleUpdateSettings}
          />
        )}
      </div>

      <Toaster 
        theme="dark"
        position="top-center"
        toastOptions={{
          style: {
            background: 'rgba(28, 28, 30, 0.9)',
            color: '#ffffff',
            border: '1px solid rgba(84, 84, 88, 0.65)',
            borderRadius: '12px',
            backdropFilter: 'blur(20px)',
          }
        }}
      />
    </div>
  );
}