import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance, useColorScheme } from 'react-native';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const systemScheme = useColorScheme();
    const [theme, setTheme] = useState(systemScheme);
    const [isAutoTheme, setIsAutoTheme] = useState(true);


    useEffect(() => {
        if (isAutoTheme) {
            setTheme(systemScheme);
        }
    }, [systemScheme, isAutoTheme]);


    const toggleAutoTheme = () => {
        setIsAutoTheme(!isAutoTheme);
    }
    const toggleManualTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');

    }

    return (
        <ThemeContext.Provider value={{ theme, isAutoTheme, toggleAutoTheme, toggleManualTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);



