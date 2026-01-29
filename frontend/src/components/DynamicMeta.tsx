import { Helmet } from "react-helmet-async";
import { useParams, useLocation } from "react-router-dom";

// 1. Define your supported URL language codes explicitly
const SUPPORTED_LANGUAGES = ['en-us', 'es', 'de', 'fr', 'pl', 'ro'];

// 2. Dictionary of Titles & Descriptions
// Note: Added 'en-us' mapping to ensure it finds the data correctly
const LOCALIZED_METADATA: Record<string, { title: string; description: string }> = {
  'en-us': {
    title: "MathHub - Step-by-Step Math Calculator",
    description: "Free step-by-step calculator for matrices, derivatives, integrals. Solve complex math problems instantly.",
  },
  'en': { // Fallback just in case
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
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();

  // Handle the language fallback safely
  const urlLang = lang || 'en-us';
  const currentMetadata = LOCALIZED_METADATA[urlLang] || LOCALIZED_METADATA['en-us'];

  // --- LOGIC FOR HREFLANG TAGS ---
  
  // 1. Get the "clean path" (The part of the URL after the language)
  // Example: if URL is "/ro/matrix", cleanPath is "/matrix"
  const currentPath = location.pathname;
  const cleanPath = currentPath.replace(/^\/(en-us|en|es|fr|de|pl|ro)/, '') || '';
  
  // 2. Define Base URL
  const baseUrl = 'https://mathhub.me';

  return (
    <Helmet>
      {/* --- Basic Metadata --- */}
      <title>{currentMetadata.title}</title>
      <meta name="description" content={currentMetadata.description} />
      <meta property="og:title" content={currentMetadata.title} />
      <meta property="og:description" content={currentMetadata.description} />
      
      {/* Set the document language (e.g., <html lang="ro">) */}
      <html lang={urlLang} /> 

      {/* --- Canonical Tag --- */}
      {/* Points to the current page itself */}
      <link rel="canonical" href={`${baseUrl}${location.pathname}`} />

      {/* --- Hreflang Tags (THE MISSING PIECE) --- */}
      {/* This loop generates the links that connect all your languages together */}
      {SUPPORTED_LANGUAGES.map((code) => (
        <link 
          key={code}
          rel="alternate" 
          hrefLang={code} 
          href={`${baseUrl}/${code}${cleanPath}`} 
        />
      ))}

      {/* --- x-default Tag --- */}
      {/* Points to the generic version (usually English) for users with unsupported languages */}
      <link 
        rel="alternate" 
        hrefLang="x-default" 
        href={`${baseUrl}/en-us${cleanPath}`} 
      />
    </Helmet>
  );
};