import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SUPPORTED_LANGUAGES = ['en-us', 'es', 'fr', 'de', 'pl', 'ro'];
const DEFAULT_LANGUAGE = 'en-us';

// Map browser language codes to our supported languages
const mapBrowserLanguage = (browserLang: string): string => {
  const lang = browserLang.toLowerCase();
  
  // Exact match
  if (SUPPORTED_LANGUAGES.includes(lang)) {
    return lang;
  }
  
  // Check for language without region (e.g., 'en' -> 'en-us')
  const langWithoutRegion = lang.split('-')[0];
  if (langWithoutRegion === 'en') return 'en-us';
  if (SUPPORTED_LANGUAGES.includes(langWithoutRegion)) {
    return langWithoutRegion;
  }
  
  return DEFAULT_LANGUAGE;
};

export const LanguageRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Only redirect if we're on the root path
    if (location.pathname === '/') {
      // Get browser language
      const browserLang = navigator.language || navigator.languages?.[0] || DEFAULT_LANGUAGE;
      const targetLang = mapBrowserLanguage(browserLang);
      
      // Check if user has a saved language preference
      const savedLang = localStorage.getItem('preferredLanguage');
      const finalLang = savedLang && SUPPORTED_LANGUAGES.includes(savedLang) 
        ? savedLang 
        : targetLang;
      
      // Redirect to language-specific home page
      navigate(`/${finalLang}`, { replace: true });
    }
  }, [location.pathname, navigate]);

  return null;
};
