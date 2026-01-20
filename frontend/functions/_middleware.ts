// Cloudflare Pages Function - Middleware for geo-location based language redirect
// This runs on Cloudflare's edge and adds country information to the request

interface CFProperties {
  country?: string;
}

export const onRequest: PagesFunction = async (context) => {
  const { request, next } = context;
  const url = new URL(request.url);
  
  // Only redirect on the root path
  if (url.pathname === '/') {
    // Get country from Cloudflare's cf object
    const cf = (request as Request & { cf?: CFProperties }).cf;
    const country = cf?.country || 'US';
    
    // Map countries to language codes
    const countryToLanguage: Record<string, string> = {
      'RO': 'ro',      // Romania
      'MD': 'ro',      // Moldova (Romanian speaking)
      'ES': 'es',      // Spain
      'MX': 'es',      // Mexico
      'AR': 'es',      // Argentina
      'CO': 'es',      // Colombia
      'PE': 'es',      // Peru
      'CL': 'es',      // Chile
      'FR': 'fr',      // France
      'BE': 'fr',      // Belgium (French region)
      'CH': 'fr',      // Switzerland (could be fr/de)
      'CA': 'fr',      // Canada (could be en/fr)
      'DE': 'de',      // Germany
      'AT': 'de',      // Austria
      'PL': 'pl',      // Poland
      'US': 'en-us',   // United States
      'GB': 'en-us',   // United Kingdom
      'AU': 'en-us',   // Australia
      'NZ': 'en-us',   // New Zealand
      'IE': 'en-us',   // Ireland
    };
    
    const targetLang = countryToLanguage[country] || 'en-us';
    
    // Check if user has a cookie preference (set by the app)
    const cookies = request.headers.get('Cookie') || '';
    const prefMatch = cookies.match(/preferredLanguage=([a-z-]+)/);
    const preferredLang = prefMatch ? prefMatch[1] : null;
    
    // Use preference if exists, otherwise use geo-detected language
    const finalLang = preferredLang || targetLang;
    
    // Redirect to the language-specific page
    return Response.redirect(`${url.origin}/${finalLang}`, 302);
  }
  
  // For all other paths, continue normally
  return next();
};
