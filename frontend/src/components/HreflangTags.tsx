import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// 1. Set strictly to non-www to match your Sitemap and Canonical tags
const DOMAIN = 'https://mathhub.me'; 

const languages = ['en-us', 'fr', 'de', 'es', 'pl', 'ro'];

export const HreflangTags = () => {
  const location = useLocation();

  useEffect(() => {
    // Helper function to remove tags
    const removeTags = () => {
      const existingTags = document.querySelectorAll('link[rel="alternate"][hreflang]');
      existingTags.forEach(tag => tag.remove());
    };

    // 1. Clean up old tags first
    removeTags();

    // 2. Get current path without language prefix (e.g., turns "/ro/matrix" into "/matrix")
    const pathWithoutLang = location.pathname.replace(/^\/(en-us|[a-z]{2})/, '') || '';

    // 3. Add new Hreflang tags
    languages.forEach(lang => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = lang;
      link.href = `${DOMAIN}/${lang}${pathWithoutLang}`;
      document.head.appendChild(link);
    });

    // 4. Add x-default tag (pointing to en-us)
    const defaultLink = document.createElement('link');
    defaultLink.rel = 'alternate';
    defaultLink.hreflang = 'x-default';
    defaultLink.href = `${DOMAIN}/en-us${pathWithoutLang}`;
    document.head.appendChild(defaultLink);

    // Cleanup function: React runs this when the component unmounts or updates
    return () => {
      removeTags();
    };
  }, [location.pathname]);

  return null;
};