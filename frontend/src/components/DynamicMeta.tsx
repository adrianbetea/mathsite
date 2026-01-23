import { Helmet } from "react-helmet-async";
import { useParams, useLocation } from "react-router-dom";

// 1. Dictionary of Titles & Descriptions
const LOCALIZED_METADATA: Record<string, { title: string; description: string }> = {
  en: {
    title: "MathHub - Step-by-Step Math Calculator",
    description: "Free step-by-step calculator for matrices, derivatives, integrals. Solve complex math problems instantly.",
  },
  es: {
    title: "MathHub - Calculadora Matemática Paso a Paso",
    description: "Calculadora paso a paso gratuita para matrices, derivadas, integrales. Resuelve problemas matemáticos complejos al instante.",
  },
  de: {
    title: "MathHub - Schritt-für-Schritt Mathe-Rechner",
    description: "Kostenloser Schritt-für-Schritt-Rechner für Matrizen, Ableitungen, Integrale. Lösen Sie komplexe Matheaufgaben sofort.",
  },
  fr: {
    title: "MathHub - Calculatrice Mathématique Étape par Étape",
    description: "Calculatrice gratuite étape par étape pour matrices, dérivées, intégrales. Résolvez des problèmes mathématiques complexes instantanément.",
  },
  pl: {
    title: "MathHub - Kalkulator Matematyczny Krok po Kroku",
    description: "Darmowy kalkulator krok po kroku do macierzy, pochodnych, całek. Rozwiązuj złożone problemy matematyczne natychmiast.",
  },
  ro: {
    title: "MathHub - Calculator Matematic Pas cu Pas",
    description: "Calculator gratuit pas cu pas pentru matrice, derivate, integrale. Rezolvă probleme matematice complexe instantaneu.",
  },
};

export const DynamicMeta = () => {
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();

  // Default to English if lang is missing or invalid
  const currentLang = (lang && LOCALIZED_METADATA[lang]) ? lang : "en";
  const metadata = LOCALIZED_METADATA[currentLang];

  // Optional: Logic to change title based on page (e.g., Matrix vs Calculus)
  // You can extend this later if you want titles like "Matrix Calculator - MathHub"
  
  return (
    <Helmet>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      
      {/* Crucial for SEO: Tells Google this page is in this language */}
      <html lang={currentLang} /> 
      
      {/* Canonical URL (prevents duplicate content issues) */}
      <link rel="canonical" href={`https://mathhub.me${location.pathname}`} />
    </Helmet>
  );
};