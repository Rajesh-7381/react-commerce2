import React, { createContext, useState } from 'react';

const ThemeContext = createContext();

const LightDarkTheme = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
// console.log(theme)
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { LightDarkTheme, ThemeContext };