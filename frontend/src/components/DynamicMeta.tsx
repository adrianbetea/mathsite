import { Helmet } from "react-helmet-async";
import { useLocation, useParams } from "react-router-dom";

// 1. Define supported languages exactly as they appear in your URLs
const SUPPORTED_LANGUAGES = ['en-us', 'es', 'de', 'fr', 'pl', 'ro'];

// 2. SEO Dictionary - Path-specific metadata for each language
const LOCALIZED_METADATA: Record<string, Record<string, { title: string; description: string }>> = {
  'en-us': {
    '': {
      title: "Free Step-by-Step Math Calculator | MathHub",
      description: "Free step-by-step calculator for matrices, derivatives, integrals, and polynomials. Solve complex math problems instantly with detailed explanations."
    },
    '/matrix': {
      title: "Matrix Calculator with Steps - Determinant & Inverse | MathHub",
      description: "Solve matrix equations instantly with our free step-by-step matrix calculator. Easily calculate determinants, inverses, rank, and matrix multiplication."
    },
    '/calculus': {
      title: "Calculus Calculator - Derivatives, Integrals & Limits | MathHub",
      description: "Free step-by-step calculus calculator. Solve derivatives, integrals, limits, and series problems instantly with detailed explanations."
    },
    '/polynomials': {
      title: "Polynomial Calculator - Factoring & Equations | MathHub",
      description: "Master polynomial equations with our step-by-step calculator. Find roots, factorize, and graph polynomials easily."
    },
    '/learning': {
      title: "Math Learning Hub - Free Study Materials | MathHub",
      description: "Master linear algebra, calculus, and polynomials with MathHub. Access free, easy-to-understand tutorials, formulas, and examples."
    },
    '/learning/linear-algebra': {
      title: "Learn Linear Algebra - Tutorials & Formulas | MathHub",
      description: "Master linear algebra with MathHub. Access free tutorials, formulas, and examples for matrices, vectors, and linear equations."
    },
    '/learning/calculus': {
      title: "Learn Calculus - Step-by-Step Guides & Examples | MathHub",
      description: "Learn calculus from scratch. Free step-by-step guides and examples for limits, derivatives, and integrals."
    },
    '/learning/polynomials': {
      title: "Learn Polynomials - Rules, Operations & Theory | MathHub",
      description: "Everything you need to know about polynomials. Free learning materials covering operations, factoring, and polynomial theory."
    },
    '/privacy': {
      title: "Privacy Policy | MathHub",
      description: "Read the MathHub privacy policy to understand how we protect your data."
    },
    '/about': {
      title: "About Us - Our Mission for Free Math Education | MathHub",
      description: "MathHub is a free, indie-built math platform providing step-by-step solutions for matrices, calculus, and polynomials. Learn about our mission to keep math education accessible."
    }
  },
  
  'es': {
    '': {
      title: "Calculadora Matemática Paso a Paso Gratis | MathHub",
      description: "Calculadora paso a paso gratuita para matrices, derivadas, integrales y polinomios. Resuelve problemas matemáticos complejos al instante con explicaciones detalladas."
    },
    '/matrix': {
      title: "Calculadora de Matrices Paso a Paso - Determinante e Inversa | MathHub",
      description: "Resuelve ecuaciones matriciales al instante con nuestra calculadora gratuita. Calcula fácilmente determinantes, inversas, rango y multiplicación de matrices."
    },
    '/calculus': {
      title: "Calculadora de Cálculo - Derivadas, Integrales y Límites | MathHub",
      description: "Calculadora de cálculo gratuita paso a paso. Resuelve problemas de derivadas, integrales, límites y series al instante con explicaciones detalladas."
    },
    '/polynomials': {
      title: "Calculadora de Polinomios - Factorización y Ecuaciones | MathHub",
      description: "Domina las ecuaciones polinómicas con nuestra calculadora paso a paso. Encuentra raíces, factoriza y grafica polinomios fácilmente."
    },
    '/learning': {
      title: "Centro de Aprendizaje de Matemáticas - Materiales Gratis | MathHub",
      description: "Domina el álgebra lineal, el cálculo y los polinomios con MathHub. Accede a tutoriales, fórmulas y ejemplos gratuitos y fáciles de entender."
    },
    '/learning/linear-algebra': {
      title: "Aprende Álgebra Lineal - Tutoriales y Fórmulas | MathHub",
      description: "Domina el álgebra lineal con MathHub. Accede a tutoriales, fórmulas y ejemplos gratuitos para matrices, vectores y ecuaciones lineales."
    },
    '/learning/calculus': {
      title: "Aprende Cálculo - Guías Paso a Paso y Ejemplos | MathHub",
      description: "Aprende cálculo desde cero. Guías y ejemplos gratuitos paso a paso para límites, derivadas e integrales."
    },
    '/learning/polynomials': {
      title: "Aprende Polinomios - Reglas, Operaciones y Teoría | MathHub",
      description: "Todo lo que necesitas saber sobre polinomios. Materiales de aprendizaje gratuitos que cubren operaciones, factorización y teoría polinómica."
    },
    '/privacy': {
      title: "Política de Privacidad | MathHub",
      description: "Lee la política de privacidad de MathHub para entender cómo protegemos tus datos personales."
    },
    '/about': {
      title: "Sobre Nosotros - Nuestra Misión por la Educación Matemática Gratuita | MathHub",
      description: "MathHub es una plataforma matemática gratuita creada por un desarrollador independiente con soluciones paso a paso para matrices, cálculo y polinomios. Conoce nuestra misión."
    }
  },

  'ro': {
    '': {
      title: "Calculator Matematic Gratuit Pas cu Pas | MathHub",
      description: "Calculator gratuit pas cu pas pentru matrice, derivate, integrale și polinoame. Rezolvă probleme matematice complexe instantaneu cu explicații detaliate."
    },
    '/matrix': {
      title: "Calculator Matrice Pas cu Pas - Determinant și Inversă | MathHub",
      description: "Rezolvă ecuații cu matrice instantaneu cu calculatorul nostru gratuit. Calculează ușor determinanți, inverse, rang și înmulțirea matricelor."
    },
    '/calculus': {
      title: "Calculator Analiză Matematică - Derivate, Integrale și Limite | MathHub",
      description: "Calculator gratuit de analiză matematică pas cu pas. Rezolvă derivate, integrale, limite și serii instantaneu cu explicații detaliate."
    },
    '/polynomials': {
      title: "Calculator Polinoame - Factorizare și Ecuații | MathHub",
      description: "Stăpânește ecuațiile polinomiale cu calculatorul nostru pas cu pas. Găsește rădăcini, factorizează și trasează grafice ale polinoamelor cu ușurință."
    },
    '/learning': {
      title: "Centru de Învățare Matematică - Materiale de Studiu Gratuite | MathHub",
      description: "Învață algebră liniară, analiză matematică și polinoame cu MathHub. Accesează tutoriale, formule și exemple gratuite, ușor de înțeles."
    },
    '/learning/linear-algebra': {
      title: "Învață Algebră Liniară - Tutoriale și Formule | MathHub",
      description: "Învață algebra liniară cu MathHub. Accesează tutoriale, formule și exemple gratuite pentru matrice, vectori și ecuații liniare."
    },
    '/learning/calculus': {
      title: "Învață Analiză Matematică - Ghiduri Pas cu Pas și Exemple | MathHub",
      description: "Învață analiza matematică de la zero. Ghiduri și exemple gratuite pas cu pas pentru limite, derivate și integrale."
    },
    '/learning/polynomials': {
      title: "Învață Polinoame - Reguli, Operații și Teorie | MathHub",
      description: "Tot ce trebuie să știi despre polinoame. Materiale de învățare gratuite care acoperă operații, factorizare și teoria polinoamelor."
    },
    '/privacy': {
      title: "Politica de Confidențialitate | MathHub",
      description: "Citește politica de confidențialitate MathHub pentru a înțelege cum îți protejăm datele."
    },
    '/about': {
      title: "Despre Noi - Misiunea Noastră pentru Educația Matematică Gratuită | MathHub",
      description: "MathHub este o platformă matematică gratuită creată de un dezvoltator independent cu soluții pas cu pas pentru matrici, analiză și polinoame. Află despre misiunea noastră."
    }
  },

  'de': {
    '': {
      title: "Kostenloser Schritt-für-Schritt Mathe-Rechner | MathHub",
      description: "Kostenloser Schritt-für-Schritt-Rechner für Matrizen, Ableitungen, Integrale und Polynome. Lösen Sie komplexe Matheaufgaben sofort mit Erklärungen."
    },
    '/matrix': {
      title: "Matrizen-Rechner mit Lösungsweg - Determinante & Inverse | MathHub",
      description: "Lösen Sie Matrizengleichungen sofort mit unserem kostenlosen Rechner. Berechnen Sie ganz einfach Determinanten, Inversen, Rang und Matrizenmultiplikation."
    },
    '/calculus': {
      title: "Analysis-Rechner - Ableitungen, Integrale & Grenzwerte | MathHub",
      description: "Kostenloser Analysis-Rechner. Lösen Sie Ableitungen, Integrale, Grenzwerte und Reihen sofort mit detaillierten Erklärungen."
    },
    '/polynomials': {
      title: "Polynom-Rechner - Faktorisierung & Gleichungen | MathHub",
      description: "Meistern Sie Polynomgleichungen mit unserem Rechner. Finden Sie ganz einfach Nullstellen, faktorisieren und zeichnen Sie Polynome."
    },
    '/learning': {
      title: "Mathe-Lernzentrum - Kostenlose Lernmaterialien | MathHub",
      description: "Lernen Sie lineare Algebra, Analysis und Polynome mit MathHub. Kostenlose, leicht verständliche Tutorials, Formeln und Beispiele."
    },
    '/learning/linear-algebra': {
      title: "Lineare Algebra Lernen - Tutorials & Formeln | MathHub",
      description: "Meistern Sie lineare Algebra mit MathHub. Kostenlose Tutorials, Formeln und Beispiele für Matrizen, Vektoren und lineare Gleichungen."
    },
    '/learning/calculus': {
      title: "Analysis Lernen - Schritt-für-Schritt Anleitungen | MathHub",
      description: "Lernen Sie Analysis von Grund auf. Kostenlose Anleitungen und Beispiele für Grenzwerte, Ableitungen und Integrale."
    },
    '/learning/polynomials': {
      title: "Polynome Lernen - Regeln, Operationen & Theorie | MathHub",
      description: "Alles, was Sie über Polynome wissen müssen. Kostenlose Lernmaterialien zu Operationen, Faktorisierung und Polynomtheorie."
    },
    '/privacy': {
      title: "Datenschutzbestimmungen | MathHub",
      description: "Lesen Sie die MathHub-Datenschutzrichtlinie, um zu verstehen, wie wir Ihre Daten schützen."
    },
    '/about': {
      title: "Über Uns - Unsere Mission für Kostenlose Mathematik-Bildung | MathHub",
      description: "MathHub ist eine kostenlose, unabhängig entwickelte Mathe-Plattform mit Schritt-für-Schritt-Lösungen für Matrizen, Analysis und Polynome. Erfahren Sie mehr über unsere Mission."
    }
  },

  'fr': {
    '': {
      title: "Calculatrice Mathématique Étape par Étape Gratuite | MathHub",
      description: "Calculatrice gratuite étape par étape pour matrices, dérivées, intégrales et polynômes. Résolvez instantanément des problèmes mathématiques complexes."
    },
    '/matrix': {
      title: "Calculatrice de Matrices Étape par Étape - Déterminant & Inverse | MathHub",
      description: "Résolvez des équations matricielles avec notre calculatrice gratuite. Calculez facilement les déterminants, inverses, rangs et multiplications."
    },
    '/calculus': {
      title: "Calculatrice de Calcul Différentiel - Dérivées & Intégrales | MathHub",
      description: "Calculatrice gratuite étape par étape. Résolvez des dérivées, intégrales, limites et séries instantanément avec des explications détaillées."
    },
    '/polynomials': {
      title: "Calculatrice de Polynômes - Factorisation & Équations | MathHub",
      description: "Maîtrisez les équations polynomiales avec notre calculatrice. Trouvez les racines, factorisez et tracez des polynômes facilement."
    },
    '/learning': {
      title: "Centre d'Apprentissage des Mathématiques - Cours Gratuits | MathHub",
      description: "Maîtrisez l'algèbre linéaire, le calcul et les polynômes avec MathHub. Accédez à des tutoriels, formules et exemples gratuits."
    },
    '/learning/linear-algebra': {
      title: "Apprendre l'Algèbre Linéaire - Tutoriels & Formules | MathHub",
      description: "Maîtrisez l'algèbre linéaire avec MathHub. Accédez à des tutoriels et exemples gratuits pour matrices, vecteurs et équations."
    },
    '/learning/calculus': {
      title: "Apprendre le Calcul Différentiel - Guides & Exemples | MathHub",
      description: "Apprenez le calcul de zéro. Guides gratuits étape par étape et exemples pour limites, dérivées et intégrales."
    },
    '/learning/polynomials': {
      title: "Apprendre les Polynômes - Règles, Opérations & Théorie | MathHub",
      description: "Tout ce qu'il faut savoir sur les polynômes. Cours gratuits sur les opérations, la factorisation et la théorie polynomiale."
    },
    '/privacy': {
      title: "Politique de Confidentialité | MathHub",
      description: "Lisez la politique de confidentialité de MathHub pour comprendre comment nous protégeons vos données."
    },
    '/about': {
      title: "À Propos - Notre Mission pour l'Éducation Mathématique Gratuite | MathHub",
      description: "MathHub est une plateforme mathématique gratuite créée par un développeur indépendant avec des solutions étape par étape pour matrices, calcul et polynômes. Découvrez notre mission."
    }
  },

  'pl': {
    '': {
      title: "Darmowy Kalkulator Matematyczny Krok po Kroku | MathHub",
      description: "Darmowy kalkulator krok po kroku dla macierzy, pochodnych, całek i wielomianów. Rozwiązuj złożone problemy matematyczne z wyjaśnieniami."
    },
    '/matrix': {
      title: "Kalkulator Macierzy Krok po Kroku - Wyznacznik i Odwrotność | MathHub",
      description: "Rozwiązuj równania macierzowe za pomocą darmowego kalkulatora. Łatwo obliczaj wyznaczniki, macierze odwrotne, rząd i mnożenie macierzy."
    },
    '/calculus': {
      title: "Kalkulator Analizy Matematycznej - Pochodne i Całki | MathHub",
      description: "Darmowy kalkulator analizy matematycznej krok po kroku. Rozwiązuj pochodne, całki, granice i szeregi natychmiast z wyjaśnieniami."
    },
    '/polynomials': {
      title: "Kalkulator Wielomianów - Faktoryzacja i Równania | MathHub",
      description: "Opanuj równania wielomianowe dzięki naszemu kalkulatorowi. Znajdź pierwiastki, rozłóż na czynniki i narysuj wykresy wielomianów."
    },
    '/learning': {
      title: "Centrum Nauki Matematyki - Darmowe Materiały | MathHub",
      description: "Opanuj algebrę liniową, analizę matematyczną i wielomiany z MathHub. Uzyskaj dostęp do darmowych samouczków, wzorów i przykładów."
    },
    '/learning/linear-algebra': {
      title: "Nauka Algebry Liniowej - Samouczki i Wzory | MathHub",
      description: "Opanuj algebrę liniową z MathHub. Uzyskaj dostęp do darmowych samouczków i przykładów dla macierzy, wektorów i równań liniowych."
    },
    '/learning/calculus': {
      title: "Nauka Analizy Matematycznej - Przewodniki i Przykłady | MathHub",
      description: "Ucz się analizy matematycznej od podstaw. Darmowe przewodniki krok po kroku i przykłady granic, pochodnych i całek."
    },
    '/learning/polynomials': {
      title: "Nauka Wielomianów - Zasady, Operacje i Teoria | MathHub",
      description: "Wszystko, co musisz wiedzieć o wielomianach. Darmowe materiały obejmujące operacje, faktoryzację i teorię wielomianów."
    },
    '/privacy': {
      title: "Polityka Prywatności | MathHub",
      description: "Przeczytaj politykę prywatności MathHub, aby zrozumieć, jak chronimy Twoje dane."
    },
    '/about': {
      title: "O Nas - Nasza Misja na Rzecz Darmowej Edukacji Matematycznej | MathHub",
      description: "MathHub to darmowa platforma matematyczna stworzona przez niezależnego programistę z rozwiązaniami krok po kroku dla macierzy, analizy i wielomianów. Poznaj naszą misję."
    }
  }
};

export const DynamicMeta = () => {
  const { lang } = useParams<{ lang?: string }>();
  const location = useLocation();

  // Safety check: if lang is missing or invalid, default to en-us
  const urlLang = (lang && SUPPORTED_LANGUAGES.includes(lang)) ? lang : 'en-us';

  // --- PATH CLEANING LOGIC ---
  // Strip the current language from the path to get the clean path for metadata lookup
  // Example: "/ro/matrix" -> "/matrix"
  // Example: "/en-us" -> ""
  const currentPath = location.pathname;
  
  // Regex explanation: Match a leading slash, followed by one of the languages, 
  // followed by optional trailing slash or end of string.
  const langRegex = new RegExp(`^/(${SUPPORTED_LANGUAGES.join('|')})`);
  const cleanPath = currentPath.replace(langRegex, '') || '';

  // Get metadata for the specific page in the specific language
  // Fall back to home page ('') if path not found, then to en-us if language not found
  const languageMetadata = LOCALIZED_METADATA[urlLang] || LOCALIZED_METADATA['en-us'];
  const metadata: { title: string; description: string } = languageMetadata[cleanPath] || languageMetadata[''] || LOCALIZED_METADATA['en-us'][''];

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