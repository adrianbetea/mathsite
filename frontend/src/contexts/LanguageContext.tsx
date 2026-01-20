import { createContext, useContext, useState, useEffect, useMemo, useCallback, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { translations } from '../lib/translations';

type Language = 'en' | 'es' | 'fr' | 'de' | 'pl' | 'ro';
type LanguageCode = 'en-us' | 'es' | 'fr' | 'de' | 'pl' | 'ro';

interface LanguageContextType {
  language: Language;
  languageCode: LanguageCode;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Map URL language codes to translation keys
const urlToLang: Record<string, Language> = {
  'en-us': 'en',
  'en': 'en',
  'es': 'es',
  'fr': 'fr',
  'de': 'de',
  'pl': 'pl',
  'ro': 'ro',
};

// Map translation keys to URL language codes
const langToUrl: Record<Language, LanguageCode> = {
  'en': 'en-us',
  'es': 'es',
  'fr': 'fr',
  'de': 'de',
  'pl': 'pl',
  'ro': 'ro',
};

// Map language codes to hreflang codes
const langToHreflang: Record<LanguageCode, string> = {
  'en-us': 'en-us',
  'es': 'es',
  'fr': 'fr',
  'de': 'de',
  'pl': 'pl',
  'ro': 'ro',
};

export const LanguageProvider = ({
  children,
  languageFromUrl,
}: {
  children: ReactNode;
  languageFromUrl?: string;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get language from URL, default to 'en' if not found
  const urlLang = languageFromUrl || 'en-us';
  const initialLang = urlToLang[urlLang] || 'en';
  
  const [language, setLanguageState] = useState<Language>(initialLang);
  const [languageCode, setLanguageCode] = useState<LanguageCode>(langToUrl[initialLang]);

  // Update language when URL changes
  useEffect(() => {
    const urlLang = languageFromUrl || 'en-us';
    const newLang = urlToLang[urlLang] || 'en';
    const newLangCode = langToUrl[newLang];

    setLanguageState(newLang);
    setLanguageCode(newLangCode);
    document.documentElement.lang = langToHreflang[newLangCode];
  }, [languageFromUrl]);

  const setLanguage = useCallback((lang: Language) => {
    const newLangCode = langToUrl[lang];

    // Save preference to localStorage
    localStorage.setItem('preferredLanguage', newLangCode);
    
    // Also save to cookie for Cloudflare middleware to read
    document.cookie = `preferredLanguage=${newLangCode};path=/;max-age=31536000;SameSite=Lax`;
    
    // Navigate to the same page but with new language
    const currentPath = location.pathname;
    const pathWithoutLang = currentPath.replace(/^\/[a-z]{2}(-[a-z]{2})?/, '') || '';
    const newPath = `/${newLangCode}${pathWithoutLang}`;
    
    navigate(newPath);
  }, [location.pathname, navigate]);

  const value = useMemo(() => ({
    language,
    languageCode,
    setLanguage,
    t: translations[language],
  }), [language, languageCode, setLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
