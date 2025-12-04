import React, { createContext, useContext, useState } from 'react';
import { getTranslation } from '../utils/translations';

const LanguageContext = createContext();

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en'); // Default to English

    const t = (key) => getTranslation(language, key);

    const changeLanguage = (lang) => {
        if (['en', 'si', 'ta'].includes(lang)) {
            setLanguage(lang);
            localStorage.setItem('language', lang);
        }
    };

    // Load language from localStorage on mount
    React.useEffect(() => {
        const savedLang = localStorage.getItem('language');
        if (savedLang && ['en', 'si', 'ta'].includes(savedLang)) {
            setLanguage(savedLang);
        }
    }, []);

    return (
        <LanguageContext.Provider value={{ language, changeLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};
