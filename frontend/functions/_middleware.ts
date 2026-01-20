// functions/_middleware.ts

// 1. Import 'Response' as a Type alias (CFResponse) to use for casting
import type { PagesFunction, Response as CFResponse } from '@cloudflare/workers-types';

export const onRequest: PagesFunction = async (context) => {
  const { request, next } = context;
  const url = new URL(request.url);

  if (url.pathname === '/') {
    // Cast request to 'any' to access 'cf' without strict type errors 
    // (or define a custom interface if you prefer strictness)
    const cf = (request as any).cf; 
    const country = cf?.country || 'US';

    const countryToLanguage: Record<string, string> = {
      'RO': 'ro', 'MD': 'ro', 'ES': 'es', 'MX': 'es', 'AR': 'es', 
      'CO': 'es', 'PE': 'es', 'CL': 'es', 'FR': 'fr', 'BE': 'fr', 
      'CH': 'fr', 'CA': 'fr', 'DE': 'de', 'AT': 'de', 'PL': 'pl', 
      'US': 'en-us', 'GB': 'en-us', 'AU': 'en-us', 'NZ': 'en-us', 'IE': 'en-us',
    };

    const targetLang = countryToLanguage[country] || 'en-us';

    const cookies = request.headers.get('Cookie') || '';
    const prefMatch = cookies.match(/preferredLanguage=([a-z-]+)/);
    let preferredLang = prefMatch ? prefMatch[1] : null;

    const validLangs = Object.values(countryToLanguage);
    if (preferredLang && !validLangs.includes(preferredLang)) {
        preferredLang = null;
    }

    const finalLang = preferredLang || targetLang;

    // 2. THE FIX: Create the Response, then cast it using 'as unknown as CFResponse'
    // This resolves the "missing webSocket" error.
    return new Response(null, {
      status: 302,
      headers: {
        'Location': `${url.origin}/${finalLang}`,
        'Vary': 'Cookie'
      },
    }) as unknown as CFResponse;
  }

  return next();
};