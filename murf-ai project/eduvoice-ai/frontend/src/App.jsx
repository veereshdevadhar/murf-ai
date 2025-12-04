import React, { createContext, useState, useEffect } from 'react';
import VoiceTutor from './components/VoiceTutor';

// Create Dark Mode Context
export const DarkModeContext = createContext();

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage for saved preference
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    
    // Apply dark mode class to html element
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <div className={`min-h-screen transition-colors duration-300 ${
        darkMode 
          ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900' 
          : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
      }`}>
        <VoiceTutor />
      </div>
    </DarkModeContext.Provider>
  );
}

export default App;