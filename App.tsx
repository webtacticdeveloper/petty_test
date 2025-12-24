import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { TrackerView } from './features/TrackerView';
import { FinanceView } from './features/FinanceView';
import { DashboardView } from './features/DashboardView';
import { Journey, Expense, ThemeMode } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('tracker');
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  
  // Theme State
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  // Persist Theme
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleJourneyComplete = (journey: Journey) => {
    setJourneys(prev => [...prev, journey]);
    // Auto switch to finance tab to log expense for this trip
    if (journey.totalDistanceKm > 0) {
        setTimeout(() => setActiveTab('expenses'), 500);
    }
  };

  const handleAddExpense = (expense: Expense) => {
    setExpenses(prev => [...prev, expense]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  return (
    <Layout 
      activeTab={activeTab} 
      onTabChange={setActiveTab}
      theme={theme}
      toggleTheme={toggleTheme}
    >
      {activeTab === 'tracker' && (
        <TrackerView onJourneyComplete={handleJourneyComplete} />
      )}
      
      {activeTab === 'expenses' && (
        <FinanceView 
          expenses={expenses} 
          journeys={journeys} 
          onAddExpense={handleAddExpense}
          onDeleteExpense={handleDeleteExpense}
        />
      )}

      {activeTab === 'insights' && (
        <DashboardView 
          expenses={expenses}
          journeys={journeys}
        />
      )}

      {activeTab === 'settings' && (
        <div className="max-w-md mx-auto py-10">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Settings</h2>
            <p className="text-gray-500 mb-6">Application preferences</p>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-700">
                    <span className="text-gray-700 dark:text-gray-200">Dark Mode</span>
                    <button 
                        onClick={toggleTheme}
                        className={`w-11 h-6 flex items-center rounded-full transition-colors duration-200 ${theme === 'dark' ? 'bg-brand-600' : 'bg-gray-300'}`}
                    >
                        <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                </div>
                <div className="p-4 text-xs text-gray-400 text-center">
                    Version 1.0.0 • VoyageCash AI
                </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default App;