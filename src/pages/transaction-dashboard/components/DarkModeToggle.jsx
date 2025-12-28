import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement?.classList?.add('dark');
    } else {
      document.documentElement?.classList?.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleDarkMode}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full shadow-lg bg-card border border-border hover:scale-110 transition-transform"
      aria-label="Toggle dark mode"
    >
      <Icon 
        name={isDarkMode ? 'Sun' : 'Moon'} 
        size={20} 
        color="var(--color-foreground)" 
      />
    </Button>
  );
};

export default DarkModeToggle;