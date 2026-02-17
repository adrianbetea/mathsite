import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SUPPORTED_LANGUAGES = ['en-us', 'es', 'fr', 'de', 'pl', 'ro'];
const DEFAULT_LANGUAGE = 'en-us';

export const LanguageRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Check LocalStorage First (Return user to their last choice)
    const savedLang = localStorage.getItem('mathhub-lang');
    if (savedLang && SUPPORTED_LANGUAGES.includes(savedLang)) {
      navigate(`/${savedLang}`, { replace: true });
      return;
    }

    // 2. Detect Browser Language
    const browserLangs = navigator.languages || [navigator.language];
    let targetLang = DEFAULT_LANGUAGE;

    for (const lang of browserLangs) {
      const cleanLang = lang.toLowerCase();
      
      // Handle exact match (e.g. 'ro')
      if (SUPPORTED_LANGUAGES.includes(cleanLang)) {
        targetLang = cleanLang;
        break;
      }
      
      // Handle region codes (e.g. 'ro-RO' -> 'ro')
      const shortCode = cleanLang.split('-')[0];
      if (SUPPORTED_LANGUAGES.includes(shortCode)) {
        targetLang = shortCode;
        break;
      }
    }

    navigate(`/${targetLang}`, { replace: true });
  }, [navigate]);

  // 3. Render a minimal loader while redirecting
  return (
    <div className="flex h-screen w-full items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        {/* Simple CSS Spinner */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
        <p className="text-sm font-medium text-gray-500">Loading MathHub...</p>
      </div>
    </div>
  );
};