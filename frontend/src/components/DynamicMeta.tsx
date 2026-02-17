import { Helmet } from "react-helmet-async";
import { useLocation, useParams } from "react-router-dom";

// 1. Define supported languages exactly as they appear in your URLs
const SUPPORTED_LANGUAGES = ['en-us', 'es', 'de', 'fr', 'pl', 'ro'];

// 2. SEO Dictionary
const LOCALIZED_METADATA: Record<string, { title: string; description: string }> = {
  'en-us': {
    title: "MathHub - Step-by-Step Math Calculator",
    description: "Free step-by-step calculator for matrices, derivatives, integrals. Solve complex math problems instantly.",
  },
  'es': {
    title: "MathHub - Calculadora Matemática Paso a Paso",
    description: "Calculadora paso a paso gratuita para matrices, derivadas, integrales. Resuelve problemas matemáticos complejos al instante.",
  },
  'de': {
    title: "MathHub - Schritt-für-Schritt Mathe-Rechner",
    description: "Kostenloser Schritt-für-Schritt-Rechner für Matrizen, Ableitungen, Integrale. Lösen Sie komplexe Matheaufgaben sofort.",
  },
  'fr': {
    title: "MathHub - Calculatrice Mathématique Étape par Étape",
    description: "Calculatrice gratuite étape par étape pour matrices, dérivées, intégrales. Résolvez des problèmes mathématiques complexes instantanément.",
  },
  'pl': {
    title: "MathHub - Kalkulator Matematyczny Krok po Kroku",
    description: "Darmowy kalkulator krok po kroku do macierzy, pochodnych, całek. Rozwiązuj złożone problemy matematyczne natychmiast.",
  },
  'ro': {
    title: "MathHub - Calculator Matematic Pas cu Pas",
    description: "Calculator gratuit pas cu pas pentru matrice, derivate, integrale. Rezolvă probleme matematice complexe instantaneu.",
  },
};

export const DynamicMeta = () => {
  const { lang } = useParams<{ lang?: string }>();
  const location = useLocation();

  // Safety check: if lang is missing or invalid, default to en-us
  const urlLang = (lang && SUPPORTED_LANGUAGES.includes(lang)) ? lang : 'en-us';
  const metadata = LOCALIZED_METADATA[urlLang] || LOCALIZED_METADATA['en-us'];

  // --- PATH CLEANING LOGIC ---
  // We need to strip the current language from the path to generate links for OTHER languages.
  // Example: "/ro/matrix" -> "/matrix"
  // Example: "/en-us" -> ""
  const currentPath = location.pathname;
  
  // Regex explanation: Match a leading slash, followed by one of the languages, 
  // followed by optional trailing slash or end of string.
  const langRegex = new RegExp(`^/(${SUPPORTED_LANGUAGES.join('|')})`);
  const cleanPath = currentPath.replace(langRegex, '') || '';

  const baseUrl = 'https://mathhub.me';

  return (
    <Helmet>
      {/* 1. Basic Meta Tags */}
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:url" content={`${baseUrl}${currentPath}`} />
      
      {/* 2. Canonical Tag (Self-referencing) */}
      <link rel="canonical" href={`${baseUrl}${currentPath}`} />

      {/* 3. Hreflang Tags (The Critical Part) */}
      {/* This loop generates a link for EVERY supported language for the CURRENT page */}
      {SUPPORTED_LANGUAGES.map((code) => (
        <link 
          key={code}
          rel="alternate" 
          hrefLang={code} 
          href={`${baseUrl}/${code}${cleanPath}`} 
        />
      ))}

      {/* 4. x-default Tag (Fallback for unsupported languages, pointing to English) */}
      <link 
        rel="alternate" 
        hrefLang="x-default" 
        href={`${baseUrl}/en-us${cleanPath}`} 
      />
    </Helmet>
  );
};