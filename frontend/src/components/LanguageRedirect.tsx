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

// Map common browser locale codes that include regions
const mapBrowserLocale = (locale: string): string => {
  const normalized = locale.toLowerCase();
  
  // Romanian locales
  if (normalized.startsWith('ro')) return 'ro';
  
  // Spanish locales (Spain, Mexico, Argentina, etc.)
  if (normalized.startsWith('es')) return 'es';
  
  // French locales (France, Canada, Belgium, etc.)
  if (normalized.startsWith('fr')) return 'fr';
  
  // German locales (Germany, Austria, Switzerland)
  if (normalized.startsWith('de')) return 'de';
  
  // Polish locales
  if (normalized.startsWith('pl')) return 'pl';
  
  // English locales - all map to en-us
  if (normalized.startsWith('en')) return 'en-us';
  
  return DEFAULT_LANGUAGE;
};

export const LanguageRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Only redirect if we're on the root path
    // Note: On Cloudflare, the edge middleware handles geo-based redirect
    // This is a fallback for local development or if middleware doesn't run
    if (location.pathname === '/') {
      // Check if user has a saved language preference (from cookie or localStorage)
      const savedLang = localStorage.getItem('preferredLanguage');
      
      if (savedLang && SUPPORTED_LANGUAGES.includes(savedLang)) {
        navigate(`/${savedLang}`, { replace: true });
        return;
      }
      
      // Try to detect from browser languages (ordered by preference)
      const browserLanguages = navigator.languages || [navigator.language];
      let detectedLang = DEFAULT_LANGUAGE;
      
      for (const browserLang of browserLanguages) {
        if (!browserLang) continue;
        const mapped = mapBrowserLocale(browserLang);
        if (mapped !== DEFAULT_LANGUAGE || browserLang.toLowerCase().startsWith('en')) {
          detectedLang = mapped;
          break;
        }
      }
      
      // Redirect to language-specific home page
      navigate(`/${detectedLang}`, { replace: true });
    }
  }, [location.pathname, navigate]);

  return null;
};
