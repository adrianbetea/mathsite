import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DOMAIN = 'https://yourdomain.com'; // Update this with your actual domain when deployed

const languages = ['en-us', 'fr', 'de', 'es', 'pl', 'ro'];

export const HreflangTags = () => {
  const location = useLocation();

  useEffect(() => {
    // Remove existing hreflang tags
    const existingTags = document.querySelectorAll('link[rel="alternate"][hreflang]');
    existingTags.forEach(tag => tag.remove());

    // Get current path without language prefix
    const pathWithoutLang = location.pathname.replace(/^\/[a-z]{2}(-[a-z]{2})?/, '') || '';

    // Add hreflang tags for each language with their specific URLs
    languages.forEach(lang => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = lang;
      link.href = `${DOMAIN}/${lang}${pathWithoutLang}`;
      document.head.appendChild(link);
    });

    // Add x-default tag pointing to en-us
    const defaultLink = document.createElement('link');
    defaultLink.rel = 'alternate';
    defaultLink.hreflang = 'x-default';
    defaultLink.href = `${DOMAIN}/en-us${pathWithoutLang}`;
    document.head.appendChild(defaultLink);
  }, [location.pathname]);

  return null; // This component doesn't render anything
};
