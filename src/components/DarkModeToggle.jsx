import React, { useEffect, useState } from 'react';

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return saved === 'true';
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.setAttribute('data-bs-theme', 'dark');
    } else {
      html.setAttribute('data-bs-theme', 'light');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const buttonStyle = {
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    border: '1px solid #ccc',
    backgroundColor: darkMode ? '#343a40' : 'transparent',
    color: darkMode ? '#f8f9fa' : '#343a40',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    
  };

  return (
    <button
      type="button"
      style={buttonStyle}
      onClick={toggleDarkMode}
      aria-label="Toggle dark mode"
      title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? '🌞' : '🌙'}
    </button>
  );
};

export default DarkModeToggle;
