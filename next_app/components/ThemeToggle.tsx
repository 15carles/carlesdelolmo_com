"use client";

import { useTheme } from './ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ThemeToggleProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function ThemeToggle({ id = 'theme-toggle', className = 'theme-toggle', style }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting for mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button id={id} className={className} style={style} aria-label="Cambiar tema">
        <Sun className="theme-toggle__icon theme-toggle__icon--sun" size={20} />
      </button>
    );
  }

  return (
    <button id={id} className={className} style={style} onClick={toggleTheme} aria-label="Cambiar tema" title="Cambiar tema">
      {theme === 'dark' ? (
        <Sun className="theme-toggle__icon theme-toggle__icon--sun" size={20} />
      ) : (
        <Moon className="theme-toggle__icon theme-toggle__icon--moon" size={20} />
      )}
    </button>
  );
}
