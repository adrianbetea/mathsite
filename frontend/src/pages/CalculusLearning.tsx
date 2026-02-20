import { ArrowLeft, ArrowDown, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/contexts/LanguageContext";
import { calculusFundamentalsLearningTranslations } from "@/lib/translations/calculus_fundamentals_learning_translations";
import { calculusFundamentalsCourse } from "@/lib/translations/courses/calculus_fundamentals_course";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import katex from "katex";
import "katex/dist/katex.min.css";

const CalculusLearning = () => {
  const { language, languageCode } = useLanguage();
  const t = calculusFundamentalsLearningTranslations[language as keyof typeof calculusFundamentalsLearningTranslations] || calculusFundamentalsLearningTranslations.en;
  const course = calculusFundamentalsCourse[language as keyof typeof calculusFundamentalsCourse] || calculusFundamentalsCourse.en;
  const lesson1 = course.limits.lessons.lesson1;
  const lesson2 = (course as any).derivatives.lessons.lesson2;
  const lesson3 = (course as any).applications_derivatives.lessons.lesson3;
  const lesson4 = (course as any).integration.lessons.lesson4;
  const lesson5 = (course as any).sequences_series.lessons.lesson5;
  const lesson6 = (course as any).differential_equations.lessons.lesson1;

  const scrollToLesson = (lessonId: string) => {
    const element = document.getElementById(lessonId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 100;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  const renderMath = (latex: string, displayMode: boolean = true) => {
    try {
      return katex.renderToString(latex, { displayMode, throwOnError: false });
    } catch (e) {
      return latex;
    }
  };

  const renderTextWithMath = (text: string) => {
    // Replace inline LaTeX patterns with rendered math
    let processed = text;
    
    // PRIORITY 0: Handle inline math delimiters $...$ FIRST
    processed = processed.replace(/\$([^$]+)\$/g, (match, latex) => {
      try {
        return katex.renderToString(latex, { displayMode: false, throwOnError: false });
      } catch (e) {
        return match;
      }
    });
    
    // PRIORITY 1: Handle complete block expressions FIRST (these contain other LaTeX inside)
    
    // Handle matrix blocks (bmatrix, pmatrix, etc.) - MUST come before subscripts
    processed = processed.replace(/\\begin\{(b|p|v|V|B|smallmatrix)matrix\}[\s\S]*?\\end\{\1matrix\}/g, (match) => {
      try {
        return katex.renderToString(match, { displayMode: false, throwOnError: false });
      } catch (e) {
        return match;
      }
    });
    
    // Handle \sum with subscripts and superscripts (process BEFORE individual symbols)
    processed = processed.replace(/\\sum_\{([^}]+)\}\^\{([^}]+)\}/g, (match, subscript, superscript) => {
      try {
        return katex.renderToString(`\\sum_{${subscript}}^{${superscript}}`, { displayMode: false, throwOnError: false });
      } catch (e) {
        return match;
      }
    });
    
    // Handle \sum with only subscripts (no superscript) - process BEFORE individual symbols
    processed = processed.replace(/\\sum_\{([^}]+)\}/g, (match, subscript) => {
      try {
        return katex.renderToString(`\\sum_{${subscript}}`, { displayMode: false, throwOnError: false });
      } catch (e) {
        return match;
      }
    });
    
    // PRIORITY 2: Handle subscripts and other inline patterns
    
    // Handle letter with subscript and superscript like F_2^{n x n} BEFORE other patterns
    processed = processed.replace(/([A-Za-z])_([a-zA-Z0-9])\^\{([^}]+)\}/g, (match, letter, subscript, superscript) => {
      try {
        return katex.renderToString(`${letter}_{${subscript}}^{${superscript}}`, { displayMode: false, throwOnError: false });
      } catch (e) {
        return match;
      }
    });
    
    // Handle complex subscripts with commas and parentheses like a_{\pi(i),i}
    processed = processed.replace(/([a-zA-Z])_\{([^}]+)\}/g, (match, letter, subscript) => {
      try {
        return katex.renderToString(`${letter}_{${subscript}}`, { displayMode: false, throwOnError: false });
      } catch (e) {
        return match;
      }
    });
    
    // Handle simple subscripts without braces for single characters (like I_m, I_n, S_n, S_2)
    // But NOT if followed by ^ (superscript) since those are handled above
    processed = processed.replace(/([A-Za-z])_([a-zA-Z0-9])(?![a-zA-Z0-9_^])/g, (match, letter, subscript) => {
      try {
        return katex.renderToString(`${letter}_{${subscript}}`, { displayMode: false, throwOnError: false });
      } catch (e) {
        return match;
      }
    });
    
    // Handle superscripts with braces like (-1)^{i+j} or x^{2}
    processed = processed.replace(/([a-zA-Z0-9()]+)\^\{([^}]+)\}/g, (match, base, superscript) => {
      try {
        return katex.renderToString(`${base}^{${superscript}}`, { displayMode: false, throwOnError: false });
      } catch (e) {
        return match;
      }
    });
    
    // Handle \text{} commands
    processed = processed.replace(/\\text\{([^}]+)\}/g, (match, content) => {
      try {
        return katex.renderToString(`\\text{${content}}`, { displayMode: false, throwOnError: false });
      } catch (e) {
        return content;
      }
    });
    
    // Handle \pi (Greek letter)
    processed = processed.replace(/\\pi(?![a-zA-Z])/g, () => {
      try {
        return katex.renderToString('\\pi', { displayMode: false, throwOnError: false });
      } catch (e) {
        return 'π';
      }
    });
    
    // Handle \in (element of)
    processed = processed.replace(/\\in(?![a-zA-Z])/g, () => {
      try {
        return katex.renderToString('\\in', { displayMode: false, throwOnError: false });
      } catch (e) {
        return '∈';
      }
    });
    
    // Handle \iff (if and only if)
    processed = processed.replace(/\\iff(?![a-zA-Z])/g, () => {
      try {
        return katex.renderToString('\\iff', { displayMode: false, throwOnError: false });
      } catch (e) {
        return '⟺';
      }
    });
    
    // Handle bold vectors like \mathbf{a}_1, \mathbf{b}_2
    processed = processed.replace(/\\mathbf\{([a-zA-Z0-9])\}_\{?([0-9a-zA-Z]+)\}?/g, (match, letter, subscript) => {
      try {
        return katex.renderToString(`\\mathbf{${letter}}_{${subscript}}`, { displayMode: false, throwOnError: false });
      } catch (e) {
        return match;
      }
    });
    
    // Handle bold vectors without subscripts (including \mathbf{0})
    processed = processed.replace(/\\mathbf\{([a-zA-Z0-9])\}/g, (match, letter) => {
      try {
        return katex.renderToString(`\\mathbf{${letter}}`, { displayMode: false, throwOnError: false });
      } catch (e) {
        return match;
      }
    });
    
    // Handle \mathbb{} with superscripts like \mathbb{R}^{n}
    processed = processed.replace(/\\mathbb\{([^}]+)\}\^\{([^}]+)\}/g, (match, p1, p2) => {
      try {
        return katex.renderToString(`\\mathbb{${p1}}^{${p2}}`, { displayMode: false, throwOnError: false });
      } catch (e) {
        return match;
      }
    });
    
    // Handle \mathbb{} with single character superscripts like \mathbb{R}^n
    processed = processed.replace(/\\mathbb\{([^}]+)\}\^([a-zA-Z0-9])/g, (match, letter, superscript) => {
      try {
        return katex.renderToString(`\\mathbb{${letter}}^{${superscript}}`, { displayMode: false, throwOnError: false });
      } catch (e) {
        return match;
      }
    });
    
    // Handle \mathbb{} with subscripts like \mathbb{P}_{n}
    processed = processed.replace(/\\mathbb\{([^}]+)\}_\{([^}]+)\}/g, (match, letter, subscript) => {
      try {
        return katex.renderToString(`\\mathbb{${letter}}_{${subscript}}`, { displayMode: false, throwOnError: false });
      } catch (e) {
        return match;
      }
    });
    
    // Handle \mathbb{} with single character subscripts like \mathbb{P}_n
    processed = processed.replace(/\\mathbb\{([^}]+)\}_([a-zA-Z0-9])/g, (match, letter, subscript) => {
      try {
        return katex.renderToString(`\\mathbb{${letter}}_{${subscript}}`, { displayMode: false, throwOnError: false });
      } catch (e) {
        return match;
      }
    });
    
    // Handle plain \mathbb{} like \mathbb{R}, \mathbb{P} 
    // But NOT if followed by _ or ^ (those are handled above)
    processed = processed.replace(/\\mathbb\{([^}]+)\}(?![_^])/g, (match, letter) => {
      try {
        return katex.renderToString(`\\mathbb{${letter}}`, { displayMode: false, throwOnError: false });
      } catch (e) {
        return match;
      }
    });
    
    // Handle \mathcal{} like \mathcal{B} (calligraphic font)
    processed = processed.replace(/\\mathcal\{([^}]+)\}/g, (match, letter) => {
      try {
        return katex.renderToString(`\\mathcal{${letter}}`, { displayMode: false, throwOnError: false });
      } catch (e) {
        return match;
      }
    });
    
    // Handle sum notation with subscripts in the expression - MUST come before general subscripts
    processed = processed.replace(/\\sum_\{([^}]+)\}\^\{([^}]+)\}\s+([a-zA-Z])_\{([a-zA-Z0-9]+)\}\s+([a-zA-Z])_\{([a-zA-Z0-9]+)\}/g, (match, lower, upper, var1, sub1, var2, sub2) => {
      try {
        return katex.renderToString(`\\sum_{${lower}}^{${upper}} ${var1}_{${sub1}} ${var2}_{${sub2}}`, { displayMode: false, throwOnError: false });
      } catch (e) {
        return match;
      }
    });
    
    // Handle cdots
    processed = processed.replace(/\\cdots/g, () => {
      try {
        return katex.renderToString('\\cdots', { displayMode: false, throwOnError: false });
      } catch (e) {
        return '⋯';
      }
    });
    
    // Handle dots (lower dots)
    processed = processed.replace(/\\dots(?![a-zA-Z])/g, () => {
      try {
        return katex.renderToString('\\dots', { displayMode: false, throwOnError: false });
      } catch (e) {
        return '…';
      }
    });
    
    // Handle complex transpose patterns like (A^T)^T, (AB)^T, (A + B)^T
    processed = processed.replace(/\(([^)]+)\)\^T/g, (match, inner) => {
      try {
        return katex.renderToString(`(${inner})^T`, { displayMode: false, throwOnError: false });
      } catch (e) {
        return match;
      }
    });
    
    // Handle simple A^T notation (must come after complex patterns)
    processed = processed.replace(/([A-Z])\^T/g, (match, letter) => {
      try {
        return katex.renderToString(`${letter}^T`, { displayMode: false, throwOnError: false });
      } catch (e) {
        return match;
      }
    });
    
    // Handle lambda notation
    processed = processed.replace(/\\lambda/g, () => {
      try {
        return katex.renderToString('\\lambda', { displayMode: false, throwOnError: false });
      } catch (e) {
        return 'λ';
      }
    });
    
    // Handle ne (not equal)
    processed = processed.replace(/\\ne/g, () => {
      try {
        return katex.renderToString('\\ne', { displayMode: false, throwOnError: false });
      } catch (e) {
        return '≠';
      }
    });
    
    // Handle \ge (greater than or equal)
    processed = processed.replace(/\\ge(?![a-zA-Z])/g, () => {
      try {
        return katex.renderToString('\\ge', { displayMode: false, throwOnError: false });
      } catch (e) {
        return '≥';
      }
    });
    
    // Handle \le (less than or equal)
    processed = processed.replace(/\\le(?![a-zA-Z])/g, () => {
      try {
        return katex.renderToString('\\le', { displayMode: false, throwOnError: false });
      } catch (e) {
        return '≤';
      }
    });
    
    // Handle \infty (infinity)
    processed = processed.replace(/\\infty(?![a-zA-Z])/g, () => {
      try {
        return katex.renderToString('\\infty', { displayMode: false, throwOnError: false });
      } catch (e) {
        return '∞';
      }
    });
    
    return processed;
  };

  const sections = [
    {
      id: "limits",
      lessonId: "lesson-limits",
      color: "from-blue-500/10 to-blue-500/5 hover:from-blue-500/20 hover:to-blue-500/10",
      borderColor: "hover:border-blue-500/30"
    },
    {
      id: "derivatives",
      lessonId: "lesson-derivatives",
      color: "from-purple-500/10 to-purple-500/5 hover:from-purple-500/20 hover:to-purple-500/10",
      borderColor: "hover:border-purple-500/30"
    },
    {
      id: "applications",
      lessonId: "lesson-applications",
      color: "from-pink-500/10 to-pink-500/5 hover:from-pink-500/20 hover:to-pink-500/10",
      borderColor: "hover:border-pink-500/30"
    },
    {
      id: "integration",
      lessonId: "lesson-integration",
      color: "from-green-500/10 to-green-500/5 hover:from-green-500/20 hover:to-green-500/10",
      borderColor: "hover:border-green-500/30"
    },
    {
      id: "series",
      lessonId: "lesson-series",
      color: "from-orange-500/10 to-orange-500/5 hover:from-orange-500/20 hover:to-orange-500/10",
      borderColor: "hover:border-orange-500/30"
    },
    {
      id: "differential",
      lessonId: "lesson-differential",
      color: "from-teal-500/10 to-teal-500/5 hover:from-teal-500/20 hover:to-teal-500/10",
      borderColor: "hover:border-teal-500/30"
    }
  ];

  // FAQ Schema for Google Rich Results
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a limit in calculus?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A limit describes the value that a function approaches as the input approaches a certain point. Written as lim(x→a) f(x) = L, it means f(x) gets arbitrarily close to L as x gets close to a. Limits are fundamental to defining derivatives and integrals, and understanding continuity of functions."
        }
      },
      {
        "@type": "Question",
        "name": "How do you calculate a derivative?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The derivative measures the rate of change of a function. It's defined as f'(x) = lim(h→0) [f(x+h) - f(x)]/h. Common rules include: Power rule: d/dx(xⁿ) = nxⁿ⁻¹, Product rule: (uv)' = u'v + uv', Quotient rule: (u/v)' = (u'v - uv')/v², and Chain rule: (f(g(x)))' = f'(g(x)) × g'(x)."
        }
      },
      {
        "@type": "Question",
        "name": "What is the Chain Rule?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Chain Rule is used to differentiate composite functions. If y = f(g(x)), then dy/dx = f'(g(x)) × g'(x). In Leibniz notation: dy/dx = (dy/du) × (du/dx) where u = g(x). For example, to differentiate (x² + 1)³, let u = x² + 1, then d/dx[(x²+1)³] = 3(x²+1)² × 2x = 6x(x²+1)²."
        }
      },
      {
        "@type": "Question",
        "name": "What is an integral?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An integral represents the accumulation of quantities, often visualized as the area under a curve. The definite integral ∫ᵃᵇ f(x)dx gives the signed area between f(x) and the x-axis from a to b. The indefinite integral ∫f(x)dx = F(x) + C is the antiderivative (a function whose derivative is f(x)), where C is an arbitrary constant."
        }
      },
      {
        "@type": "Question",
        "name": "What is the Fundamental Theorem of Calculus?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Fundamental Theorem of Calculus links differentiation and integration. Part 1: If F(x) = ∫ᵃˣ f(t)dt, then F'(x) = f(x). Part 2: ∫ᵃᵇ f(x)dx = F(b) - F(a), where F is any antiderivative of f. This means we can evaluate definite integrals by finding antiderivatives, connecting the two main operations of calculus."
        }
      },
      {
        "@type": "Question",
        "name": "What are differential equations?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A differential equation is an equation involving derivatives of a function. First-order equations involve dy/dx, while higher-order equations involve d²y/dx² and beyond. Solutions describe functions that satisfy the equation. Differential equations model many real-world phenomena including population growth, radioactive decay, oscillations, and heat transfer. Common types include separable equations, linear equations, and exact equations."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen relative">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      <Navbar />

      <main className="container mx-auto px-3 sm:px-4 pt-6 sm:pt-8 pb-12">
        {/* Back Button */}
        <Link
          to={`/${languageCode}/learning`}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backToLearning}</span>
        </Link>

        {/* Hero Section */}
        <div className="text-center mb-12 animate-slide-up">
          <div className="flex justify-center mb-4">
            <Badge variant="secondary" className="text-sm px-4 py-1.5">
              {t.hero.badge}
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
            <span className="text-gradient">{t.title}</span>
          </h1>
          <p className="text-foreground text-base sm:text-lg md:text-xl mb-2">
            {t.subtitle}
          </p>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
            {t.hero.description}
          </p>
        </div>

        {/* Floating Scroll to Bottom Button */}
        <button
          onClick={scrollToBottom}
          className="hidden md:block fixed right-6 bottom-6 z-50 p-4 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
          aria-label="Scroll to bottom"
        >
          <ArrowDown className="w-6 h-6" />
        </button>

        {/* Lesson 1: Limits & Continuity */}
        <div id="lesson-limits" className="max-w-4xl mx-auto mb-12">
          <div className="mb-6">
            <Badge className="mb-3">Lesson 1</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">{course.limits.title}</h2>
            <p className="text-muted-foreground">{course.limits.description}</p>
          </div>

          <Accordion type="multiple" defaultValue={["section1"]} className="space-y-4">
            {/* Section 1: Introduction to Limits */}
            <AccordionItem value="section1" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold">{lesson1.section1.title1}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                <p className="text-muted-foreground">{lesson1.section1.def1_1}</p>
                <p className="text-muted-foreground">{lesson1.section1.def1_2}</p>
                <div className="my-4 p-4 bg-muted/30 rounded-lg overflow-x-auto">
                  <div dangerouslySetInnerHTML={{ __html: renderMath(lesson1.section1.math1_1) }} />
                </div>
                <p className="text-muted-foreground">{lesson1.section1.text1_1}</p>
                <p className="text-muted-foreground mt-4">{lesson1.section1.def1_3}</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.section1.list1_1) }} />
                  <li className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.section1.list1_2) }} />
                </ul>
                <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="font-semibold mb-2">Theorem:</p>
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.section1.theorem1_1) }} />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 2: Computing Limits & Limit Laws */}
            <AccordionItem value="section2" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold">{lesson1.section2.title2}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                <p className="text-muted-foreground">{lesson1.section2.desc2_1}</p>
                <h4 className="font-semibold mt-4">{lesson1.section2.def2_1_title}</h4>
                <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.section2.text2_1) }} />
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.section2.list2_1) }} />
                  <li className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.section2.list2_2) }} />
                  <li className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.section2.list2_3) }} />
                  <li className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.section2.list2_4) }} />
                </ul>
                <h4 className="font-semibold mt-4">{lesson1.section2.title_tech}</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-muted-foreground mb-2">{lesson1.section2.tech1}</p>
                    <div className="ml-4 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                      <div dangerouslySetInnerHTML={{ __html: renderMath(lesson1.section2.tech1_ex, false) }} />
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-2">{lesson1.section2.tech2}</p>
                    <div className="ml-4 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                      <div dangerouslySetInnerHTML={{ __html: renderMath(lesson1.section2.tech2_ex, false) }} />
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.section2.tech3) }} />
                    <div className="ml-4 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                      <div dangerouslySetInnerHTML={{ __html: renderMath(lesson1.section2.tech3_ex, false) }} />
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 3: Infinite Limits & Limits at Infinity */}
            <AccordionItem value="section3" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold">{lesson1.section3.title3}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                <h4 className="font-semibold">{lesson1.section3.def3_1_title}</h4>
                <p className="text-muted-foreground">{lesson1.section3.def3_1}</p>
                <div className="my-4 p-4 bg-muted/30 rounded-lg overflow-x-auto">
                  <div dangerouslySetInnerHTML={{ __html: renderMath(lesson1.section3.math3_1) }} />
                </div>
                <p className="text-muted-foreground">{lesson1.section3.text3_1}</p>
                <h4 className="font-semibold mt-4">{lesson1.section3.def3_2_title}</h4>
                <p className="text-muted-foreground">{lesson1.section3.def3_2}</p>
                <div className="my-4 p-4 bg-muted/30 rounded-lg overflow-x-auto">
                  <div dangerouslySetInnerHTML={{ __html: renderMath(lesson1.section3.math3_2) }} />
                </div>
                <p className="text-muted-foreground">{lesson1.section3.text3_2}</p>
                <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-muted-foreground">{lesson1.section3.rule3_1}</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 4: Continuity */}
            <AccordionItem value="section4" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold">{lesson1.section4.title4}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                <p className="text-muted-foreground">{lesson1.section4.def4_1}</p>
                <p className="text-muted-foreground mt-4">{lesson1.section4.def4_2}</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li className="text-muted-foreground">{lesson1.section4.cond4_1}</li>
                  <li className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.section4.cond4_2) }} />
                  <li className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.section4.cond4_3) }} />
                </ul>
                <h4 className="font-semibold mt-4">{lesson1.section4.types_title}</h4>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li className="text-muted-foreground">{lesson1.section4.type1}</li>
                  <li className="text-muted-foreground">{lesson1.section4.type2}</li>
                  <li className="text-muted-foreground">{lesson1.section4.type3}</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* Examples Section */}
            <AccordionItem value="examples" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold">{lesson1.example_section.title_ex}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-8">
                {/* Example 1 */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-primary">{lesson1.example_section.ex1.title}</h4>
                  <p className="text-muted-foreground">{lesson1.example_section.ex1.problem}</p>
                  <div className="my-4 p-4 bg-muted/30 rounded-lg overflow-x-auto">
                    <div dangerouslySetInnerHTML={{ __html: renderMath(lesson1.example_section.ex1.problem_math) }} />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.example_section.ex1.step1_title) }} />
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.example_section.ex1.step1_desc) }} />
                    </div>
                    <div>
                      <p className="font-semibold text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.example_section.ex1.step2_title) }} />
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson1.example_section.ex1.step2_math) }} />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.example_section.ex1.step3_title) }} />
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.example_section.ex1.step3_desc) }} />
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson1.example_section.ex1.step3_math) }} />
                      </div>
                    </div>
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="font-semibold text-lg text-green-700 dark:text-green-400">{lesson1.example_section.ex1.result_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.example_section.ex1.result) }} />
                    </div>
                  </div>
                </div>

                {/* Example 2 */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-primary">{lesson1.example_section.ex2.title}</h4>
                  <p className="text-muted-foreground">{lesson1.example_section.ex2.problem}</p>
                  <div className="my-4 p-4 bg-muted/30 rounded-lg overflow-x-auto">
                    <div dangerouslySetInnerHTML={{ __html: renderMath(lesson1.example_section.ex2.problem_math) }} />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.example_section.ex2.step1_title) }} />
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.example_section.ex2.step1_desc) }} />
                    </div>
                    <div>
                      <p className="font-semibold text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.example_section.ex2.step2_title) }} />
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.example_section.ex2.step2_desc) }} />
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson1.example_section.ex2.step2_math) }} />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.example_section.ex2.step3_title) }} />
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.example_section.ex2.step3_desc) }} />
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson1.example_section.ex2.step3_math) }} />
                      </div>
                    </div>
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="font-semibold text-lg text-green-700 dark:text-green-400">{lesson1.example_section.ex2.result_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.example_section.ex2.result) }} />
                    </div>
                  </div>
                </div>

                {/* Example 3 */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-primary">{lesson1.example_section.ex3.title}</h4>
                  <p className="text-muted-foreground">{lesson1.example_section.ex3.problem}</p>
                  <div className="my-4 p-4 bg-muted/30 rounded-lg overflow-x-auto">
                    <div dangerouslySetInnerHTML={{ __html: renderMath(lesson1.example_section.ex3.problem_math) }} />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.example_section.ex3.step1_title) }} />
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.example_section.ex3.step1_desc) }} />
                    </div>
                    <div>
                      <p className="font-semibold text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.example_section.ex3.step2_title) }} />
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson1.example_section.ex3.step2_math) }} />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.example_section.ex3.step3_title) }} />
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.example_section.ex3.step3_desc) }} />
                    </div>
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="font-semibold text-lg text-green-700 dark:text-green-400">{lesson1.example_section.ex3.result_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.example_section.ex3.result) }} />
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Lesson 2: Derivatives */}
        <div id="lesson-derivatives" className="max-w-4xl mx-auto mb-12">
          <div className="mb-6">
            <Badge className="mb-3">Lesson 2</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">{(course as any).derivatives.title}</h2>
            <p className="text-muted-foreground">{(course as any).derivatives.description}</p>
          </div>

          <Accordion type="multiple" defaultValue={["der-section1"]} className="space-y-4">
            {/* Section 1: The Definition of the Derivative */}
            <AccordionItem value="der-section1" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold">{lesson2.section1.title1}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                <p className="text-muted-foreground">{lesson2.section1.def1_1}</p>
                <p className="text-muted-foreground">{lesson2.section1.def1_2}</p>
                <div className="my-4 p-4 bg-muted/30 rounded-lg overflow-x-auto">
                  <div dangerouslySetInnerHTML={{ __html: renderMath(lesson2.section1.math1_1) }} />
                </div>
                <p className="text-muted-foreground">{lesson2.section1.text1_1}</p>
                <p className="text-muted-foreground mt-4">{lesson2.section1.def1_3}</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section1.list1_1) }} />
                  <li className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section1.list1_2) }} />
                </ul>
                <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section1.theorem1_1) }} />
                </div>

                {/* Visual Examples: Plots */}
                {lesson2.section1.plot1_title && (
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Plot 1: Differentiable Function */}
                    <div className="border rounded-lg p-4 bg-card">
                      <h5 className="font-semibold text-sm mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section1.plot1_title) }} />
                      <p className="text-xs text-muted-foreground mb-3" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section1.plot1_desc) }} />
                      <div className="aspect-square bg-muted/20 rounded-lg flex items-center justify-center relative overflow-hidden">
                        <svg viewBox="-5 -5 10 10" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                          {/* Grid */}
                          <line x1="-5" y1="0" x2="5" y2="0" stroke="currentColor" strokeWidth="0.05" opacity="0.3" />
                          <line x1="0" y1="-5" x2="0" y2="5" stroke="currentColor" strokeWidth="0.05" opacity="0.3" />
                          
                          {/* Function: f(x) = x^2 */}
                          <path
                            d={Array.from({ length: 101 }, (_, i) => {
                              const x = (i - 50) / 10;
                              const y = -x * x; // negative for SVG coordinates
                              return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                            }).join(' ')}
                            stroke="rgb(59, 130, 246)"
                            strokeWidth="0.15"
                            fill="none"
                          />
                          
                          {/* Point at x=0 */}
                          <circle cx="0" cy="0" r="0.2" fill="rgb(239, 68, 68)" />
                          <text x="0.3" y="-0.3" fontSize="0.5" fill="currentColor">x=0</text>
                          
                          {/* Tangent line at x=0 (slope = 0) */}
                          <line x1="-2" y1="0" x2="2" y2="0" stroke="rgb(34, 197, 94)" strokeWidth="0.1" strokeDasharray="0.2,0.2" />
                        </svg>
                      </div>
                      <p className="text-xs text-center mt-2 text-green-600 dark:text-green-400">✓ {lesson2.section1.plot1_simple_desc}</p>
                    </div>

                    {/* Plot 2: Non-Differentiable Function */}
                    <div className="border rounded-lg p-4 bg-card">
                      <h5 className="font-semibold text-sm mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section1.plot2_title) }} />
                      <p className="text-xs text-muted-foreground mb-3" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section1.plot2_desc) }} />
                      <div className="aspect-square bg-muted/20 rounded-lg flex items-center justify-center relative overflow-hidden">
                        <svg viewBox="-5 -5 10 10" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                          {/* Grid */}
                          <line x1="-5" y1="0" x2="5" y2="0" stroke="currentColor" strokeWidth="0.05" opacity="0.3" />
                          <line x1="0" y1="-5" x2="0" y2="5" stroke="currentColor" strokeWidth="0.05" opacity="0.3" />
                          
                          {/* Function: f(x) = |x| - Left side (x < 0): f(x) = -x */}
                          <line x1="-5" y1="-5" x2="0" y2="0" stroke="rgb(168, 85, 247)" strokeWidth="0.15" />
                          
                          {/* Function: f(x) = |x| - Right side (x > 0): f(x) = x */}
                          <line x1="0" y1="0" x2="5" y2="-5" stroke="rgb(168, 85, 247)" strokeWidth="0.15" />
                          
                          {/* Point at x=0 (the corner) */}
                          <circle cx="0" cy="0" r="0.2" fill="rgb(239, 68, 68)" />
                          <text x="0.3" y="-0.3" fontSize="0.5" fill="currentColor">x=0</text>
                          
                          {/* Left tangent (slope = -1 in math coords, appears as slope +1 in SVG) */}
                          <line x1="-2" y1="-2" x2="0" y2="0" stroke="rgb(251, 146, 60)" strokeWidth="0.1" strokeDasharray="0.2,0.2" />
                          
                          {/* Right tangent (slope = 1) */}
                          <line x1="0" y1="0" x2="2" y2="-2" stroke="rgb(251, 146, 60)" strokeWidth="0.1" strokeDasharray="0.2,0.2" />
                        </svg>
                      </div>
                      <p className="text-xs text-center mt-2 text-red-600 dark:text-red-400">X {lesson2.section1.plot2_simple_desc}</p>
                    </div>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>

            {/* Section 2: Basic Differentiation Rules */}
            <AccordionItem value="der-section2" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold">{lesson2.section2.title2}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                <p className="text-muted-foreground">{lesson2.section2.desc2_1}</p>
                <h4 className="font-semibold mt-4">{lesson2.section2.def2_1_title}</h4>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section2.list2_1) }} />
                  <li className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section2.list2_2) }} />
                  <li className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section2.list2_3) }} />
                </ul>

                {/* Example: Power & Sum Rules */}
                <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">{lesson2.section2.ex2_1_title}</h5>
                  <p className="text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section2.ex2_1_problem) }} />
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section2.ex2_1_step1) }} />
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section2.ex2_1_step2) }} />
                    <p className="font-semibold text-lg text-green-700 dark:text-green-400 mt-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section2.ex2_1_solution) }} />
                  </div>
                </div>

                <h4 className="font-semibold mt-4">{lesson2.section2.def2_2_title}</h4>
                <p className="text-muted-foreground">{lesson2.section2.text2_1}</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section2.list2_4) }} />
                  <li className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section2.list2_5) }} />
                </ul>
                <p className="text-muted-foreground italic mt-2">{lesson2.section2.text2_2}</p>

                {/* Example: Product Rule */}
                <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">{lesson2.section2.ex2_2_title}</h5>
                  <p className="text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section2.ex2_2_problem) }} />
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section2.ex2_2_step1) }} />
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section2.ex2_2_step2) }} />
                    <p className="font-semibold text-lg text-green-700 dark:text-green-400 mt-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section2.ex2_2_solution) }} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 3: The Chain Rule & Trigonometry */}
            <AccordionItem value="der-section3" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold">{lesson2.section3.title3}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                <h4 className="font-semibold">{lesson2.section3.def3_1_title}</h4>
                <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section3.def3_1) }} />
                <div className="my-4 p-4 bg-muted/30 rounded-lg overflow-x-auto">
                  <div dangerouslySetInnerHTML={{ __html: renderMath(lesson2.section3.math3_1) }} />
                </div>
                <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section3.text3_1) }} />

                {/* Example: Chain Rule */}
                <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">{lesson2.section3.ex3_1_title}</h5>
                  <p className="text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section3.ex3_1_problem) }} />
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section3.ex3_1_step1) }} />
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section3.ex3_1_step2) }} />
                    <p className="font-semibold text-lg text-green-700 dark:text-green-400 mt-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section3.ex3_1_solution) }} />
                  </div>
                </div>

                <h4 className="font-semibold mt-4">{lesson2.section3.def3_2_title}</h4>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section3.list3_1) }} />
                  <li className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section3.list3_2) }} />
                  <li className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section3.list3_3) }} />
                </ul>

                {/* Example: Trig + Chain Rule */}
                <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">{lesson2.section3.ex3_2_title}</h5>
                  <p className="text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section3.ex3_2_problem) }} />
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section3.ex3_2_step1) }} />
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section3.ex3_2_step2) }} />
                    <p className="font-semibold text-lg text-green-700 dark:text-green-400 mt-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section3.ex3_2_solution) }} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 4: Implicit Differentiation */}
            <AccordionItem value="der-section4" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold">{lesson2.section4.title4}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section4.def4_1) }} />
                <p className="text-muted-foreground mt-4">{lesson2.section4.def4_2}</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li className="text-muted-foreground">{lesson2.section4.cond4_1}</li>
                  <li className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section4.cond4_2) }} />
                  <li className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section4.cond4_3) }} />
                </ul>
                <h4 className="font-semibold mt-4">{lesson2.section4.types_title}</h4>
                <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section4.type1) }} />

                {/* Example: Implicit Differentiation */}
                <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">{lesson2.section4.ex4_1_title}</h5>
                  <p className="text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section4.ex4_1_problem) }} />
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section4.ex4_1_step1) }} />
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section4.ex4_1_step2) }} />
                    <p className="font-semibold text-lg text-green-700 dark:text-green-400 mt-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section4.ex4_1_solution) }} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Examples Section */}
            <AccordionItem value="der-examples" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold">{lesson2.example_section.title_ex}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-8">
                {/* Example 1 */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-primary">{lesson2.example_section.ex1.title}</h4>
                  <p className="text-muted-foreground">{lesson2.example_section.ex1.problem}</p>
                  <div className="my-4 p-4 bg-muted/30 rounded-lg overflow-x-auto">
                    <div dangerouslySetInnerHTML={{ __html: renderMath(lesson2.example_section.ex1.problem_math) }} />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.example_section.ex1.step1_title) }} />
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.example_section.ex1.step1_desc) }} />
                    </div>
                    <div>
                      <p className="font-semibold text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.example_section.ex1.step2_title) }} />
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson2.example_section.ex1.step2_math) }} />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.example_section.ex1.step3_title) }} />
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.example_section.ex1.step3_desc) }} />
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson2.example_section.ex1.step3_math) }} />
                      </div>
                    </div>
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="font-semibold text-lg text-green-700 dark:text-green-400">{lesson2.example_section.ex1.result_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.example_section.ex1.result) }} />
                    </div>
                  </div>
                </div>

                {/* Example 2 */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-primary">{lesson2.example_section.ex2.title}</h4>
                  <p className="text-muted-foreground">{lesson2.example_section.ex2.problem}</p>
                  <div className="my-4 p-4 bg-muted/30 rounded-lg overflow-x-auto">
                    <div dangerouslySetInnerHTML={{ __html: renderMath(lesson2.example_section.ex2.problem_math) }} />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.example_section.ex2.step1_title) }} />
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.example_section.ex2.step1_desc) }} />
                    </div>
                    <div>
                      <p className="font-semibold text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.example_section.ex2.step2_title) }} />
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.example_section.ex2.step2_desc) }} />
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson2.example_section.ex2.step2_math) }} />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.example_section.ex2.step3_title) }} />
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.example_section.ex2.step3_desc) }} />
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson2.example_section.ex2.step3_math) }} />
                      </div>
                    </div>
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="font-semibold text-lg text-green-700 dark:text-green-400">{lesson2.example_section.ex2.result_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.example_section.ex2.result) }} />
                    </div>
                  </div>
                </div>

                {/* Example 3 */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-primary">{lesson2.example_section.ex3.title}</h4>
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.example_section.ex3.problem) }} />
                  <div className="my-4 p-4 bg-muted/30 rounded-lg overflow-x-auto">
                    <div dangerouslySetInnerHTML={{ __html: renderMath(lesson2.example_section.ex3.problem_math) }} />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.example_section.ex3.step1_title) }} />
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.example_section.ex3.step1_desc) }} />
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson2.example_section.ex3.step1_math) }} />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.example_section.ex3.step2_title) }} />
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.example_section.ex3.step2_desc) }} />
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson2.example_section.ex3.step2_math) }} />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.example_section.ex3.step3_title) }} />
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.example_section.ex3.step3_desc) }} />
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson2.example_section.ex3.step3_math) }} />
                      </div>
                    </div>
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="font-semibold text-lg text-green-700 dark:text-green-400">{lesson2.example_section.ex3.result_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.example_section.ex3.result) }} />
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Lesson 3: Applications of Derivatives */}
        <div id="lesson-applications" className="max-w-4xl mx-auto mb-12">
          <div className="mb-6">
            <Badge className="mb-3">Lesson 3</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">{(course as any).applications_derivatives.title}</h2>
            <p className="text-muted-foreground">{(course as any).applications_derivatives.description}</p>
          </div>

          <Accordion type="multiple" defaultValue={["app-section1"]} className="space-y-4">
            {/* Section 1: MVT & L'Hôpital's Rule */}
            <AccordionItem value="app-section1" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold">{lesson3.section1.title1}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                <p className="text-muted-foreground">{lesson3.section1.def1_1}</p>

                {/* MVT Visual Plot */}
                {lesson3.section1.plot1_title && (
                  <div className="border rounded-lg p-4 bg-card mt-4 max-w-lg mx-auto">
                    <h5 className="font-semibold text-sm mb-2">{lesson3.section1.plot1_title}</h5>
                    <p className="text-xs text-muted-foreground mb-3">{lesson3.section1.plot1_desc}</p>
                    <div className="w-full bg-muted/20 rounded-lg flex items-center justify-center p-4">
                      <svg viewBox="-0.5 -0.5 5 6" className="w-full max-w-md" preserveAspectRatio="xMidYMid meet">
                        {/* Axes */}
                        <line x1="0" y1="5" x2="4.5" y2="5" stroke="currentColor" strokeWidth="0.02" />
                        <line x1="0" y1="5" x2="0" y2="0" stroke="currentColor" strokeWidth="0.02" />
                        
                        {/* Axis labels */}
                        <text x="4.3" y="5.3" fontSize="0.25" fill="currentColor">x</text>
                        <text x="-0.3" y="0.3" fontSize="0.25" fill="currentColor">y</text>
                        
                        {/* X-axis tick marks and values */}
                        <line x1="1" y1="5" x2="1" y2="5.1" stroke="currentColor" strokeWidth="0.015" />
                        <text x="0.9" y="5.35" fontSize="0.2" fill="currentColor">1</text>
                        <line x1="2" y1="5" x2="2" y2="5.1" stroke="currentColor" strokeWidth="0.015" />
                        <text x="1.9" y="5.35" fontSize="0.2" fill="currentColor">2</text>
                        <line x1="3" y1="5" x2="3" y2="5.1" stroke="currentColor" strokeWidth="0.015" />
                        <text x="2.9" y="5.35" fontSize="0.2" fill="currentColor">3</text>
                        <line x1="4" y1="5" x2="4" y2="5.1" stroke="currentColor" strokeWidth="0.015" />
                        <text x="3.9" y="5.35" fontSize="0.2" fill="currentColor">4</text>
                        
                        {/* Y-axis tick marks and values */}
                        <line x1="0" y1="4" x2="-0.1" y2="4" stroke="currentColor" strokeWidth="0.015" />
                        <text x="-0.4" y="4.1" fontSize="0.2" fill="currentColor">1</text>
                        <line x1="0" y1="3" x2="-0.1" y2="3" stroke="currentColor" strokeWidth="0.015" />
                        <text x="-0.4" y="3.1" fontSize="0.2" fill="currentColor">2</text>
                        <line x1="0" y1="2" x2="-0.1" y2="2" stroke="currentColor" strokeWidth="0.015" />
                        <text x="-0.4" y="2.1" fontSize="0.2" fill="currentColor">3</text>
                        <line x1="0" y1="1" x2="-0.1" y2="1" stroke="currentColor" strokeWidth="0.015" />
                        <text x="-0.4" y="1.1" fontSize="0.2" fill="currentColor">4</text>
                        
                        {/* Parabola: f(x) = -(x-2)^2 + 4 */}
                        <path
                          d={Array.from({ length: 81 }, (_, i) => {
                            const x = i / 20;
                            const y = -(x - 2) * (x - 2) + 4;
                            return `${i === 0 ? 'M' : 'L'} ${x} ${5 - y}`;
                          }).join(' ')}
                          stroke="rgb(168, 85, 247)"
                          strokeWidth="0.08"
                          fill="none"
                        />
                        
                        {/* Secant line from a(0,0) to b(4,0) */}
                        <line x1="0" y1="5" x2="4" y2="5" stroke="rgb(59, 130, 246)" strokeWidth="0.06" strokeDasharray="0.1,0.1" />
                        
                        {/* Point a */}
                        <circle cx="0" cy="5" r="0.08" fill="rgb(239, 68, 68)" />
                        <text x="-0.2" y="5.5" fontSize="0.25" fill="rgb(239, 68, 68)" fontWeight="bold">a(0,0)</text>
                        
                        {/* Point b */}
                        <circle cx="4" cy="5" r="0.08" fill="rgb(239, 68, 68)" />
                        <text x="3.5" y="5.5" fontSize="0.25" fill="rgb(239, 68, 68)" fontWeight="bold">b(4,0)</text>
                        
                        {/* Point c with tangent line (horizontal at y=4) */}
                        <circle cx="2" cy="1" r="0.08" fill="rgb(239, 68, 68)" />
                        <text x="2.1" y="0.8" fontSize="0.25" fill="rgb(239, 68, 68)" fontWeight="bold">c(2,4)</text>
                        
                        {/* Tangent line at c (horizontal, slope=0) */}
                        <line x1="0.5" y1="1" x2="3.5" y2="1" stroke="rgb(34, 197, 94)" strokeWidth="0.06" />
                      </svg>
                    </div>
                    <p className="text-xs text-center mt-2 text-blue-600 dark:text-blue-400">{lesson3.section1.plot1_description}</p>
                  </div>
                )}

                <p className="text-muted-foreground">{lesson3.section1.def1_2}</p>
                <div className="my-4 p-4 bg-muted/30 rounded-lg overflow-x-auto">
                  <div dangerouslySetInnerHTML={{ __html: renderMath(lesson3.section1.math1_1) }} />
                </div>
                <p className="text-muted-foreground">{lesson3.section1.text1_1}</p>

                <p className="text-muted-foreground mt-4" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section1.def1_3) }} />
                
                

                <div className="my-4 p-4 bg-muted/30 rounded-lg overflow-x-auto">
                  <div dangerouslySetInnerHTML={{ __html: renderMath(lesson3.section1.math1_2) }} />
                </div>
                {/* L'Hôpital Example */}
                <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">{lesson3.section1.ex1_1_title}</h5>
                  <p className="text-muted-foreground text-lg mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section1.ex1_1_problem) }} />
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-lg">{lesson3.section1.ex1_1_step1}</p>
                    <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                      <div dangerouslySetInnerHTML={{ __html: renderMath(lesson3.section1.ex1_1_math) }} />
                    </div>
                    <p className="font-semibold text-lg text-green-700 dark:text-green-400 mt-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section1.ex1_1_result) }} />
                  </div>
                </div>
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <p className="text-muted-foreground">{lesson3.section1.warning1}</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 2: Curve Sketching */}
            <AccordionItem value="app-section2" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold">{lesson3.section2.title2}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                <p className="text-muted-foreground">{lesson3.section2.desc2_1}</p>
                <h4 className="font-semibold mt-4">{lesson3.section2.def2_1_title}</h4>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section2.list2_1) }} />
                  <li className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section2.list2_2) }} />
                  <li className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section2.list2_3) }} />
                </ul>

                {/* Extrema Visual Plot */}
                {lesson3.section2.plot2_title && (
                  <div className="border rounded-lg p-4 bg-card mt-4 max-w-lg mx-auto">
                    <h5 className="font-semibold text-sm mb-2">{lesson3.section2.plot2_title}</h5>
                    <p className="text-xs text-muted-foreground mb-3">{lesson3.section2.plot2_desc}</p>
                    <div className="w-full bg-muted/20 rounded-lg flex items-center justify-center p-4">
                      <svg viewBox="-3.5 -3.5 7 7" className="w-full max-w-md" preserveAspectRatio="xMidYMid meet">
                        {/* Axes */}
                        <line x1="-3" y1="0" x2="3" y2="0" stroke="currentColor" strokeWidth="0.03" />
                        <line x1="0" y1="-3" x2="0" y2="3" stroke="currentColor" strokeWidth="0.03" />
                        
                        {/* Axis labels */}
                        <text x="2.7" y="0.4" fontSize="0.3" fill="currentColor">x</text>
                        <text x="0.2" y="-2.7" fontSize="0.3" fill="currentColor">y</text>
                        
                        {/* X-axis tick marks and values */}
                        <line x1="-2" y1="0" x2="-2" y2="0.1" stroke="currentColor" strokeWidth="0.02" />
                        <text x="-2.15" y="0.4" fontSize="0.25" fill="currentColor">-2</text>
                        <line x1="-1" y1="0" x2="-1" y2="0.1" stroke="currentColor" strokeWidth="0.02" />
                        <text x="-1.15" y="0.4" fontSize="0.25" fill="currentColor">-1</text>
                        <line x1="1" y1="0" x2="1" y2="0.1" stroke="currentColor" strokeWidth="0.02" />
                        <text x="0.9" y="0.4" fontSize="0.25" fill="currentColor">1</text>
                        <line x1="2" y1="0" x2="2" y2="0.1" stroke="currentColor" strokeWidth="0.02" />
                        <text x="1.9" y="0.4" fontSize="0.25" fill="currentColor">2</text>
                        
                        {/* Y-axis tick marks and values */}
                        <line x1="0" y1="-2" x2="-0.1" y2="-2" stroke="currentColor" strokeWidth="0.02" />
                        <text x="-0.5" y="-1.85" fontSize="0.25" fill="currentColor">2</text>
                        <line x1="0" y1="-1" x2="-0.1" y2="-1" stroke="currentColor" strokeWidth="0.02" />
                        <text x="-0.5" y="-0.85" fontSize="0.25" fill="currentColor">1</text>
                        <line x1="0" y1="1" x2="-0.1" y2="1" stroke="currentColor" strokeWidth="0.02" />
                        <text x="-0.5" y="1.15" fontSize="0.25" fill="currentColor">-1</text>
                        <line x1="0" y1="2" x2="-0.1" y2="2" stroke="currentColor" strokeWidth="0.02" />
                        <text x="-0.5" y="2.15" fontSize="0.25" fill="currentColor">-2</text>
                        
                        {/* Cubic function: f(x) = x^3 - 3x */}
                        <path
                          d={Array.from({ length: 101 }, (_, i) => {
                            const x = (i - 50) / 20;
                            const y = -(x * x * x - 3 * x); // negative for SVG coords
                            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                          }).join(' ')}
                          stroke="rgb(168, 85, 247)"
                          strokeWidth="0.08"
                          fill="none"
                        />
                        
                        {/* Local Maximum at (-1, 2) */}
                        <circle cx="-1" cy="-2" r="0.12" fill="rgb(239, 68, 68)" />
                        <text x="-1.7" y="-2.3" fontSize="0.3" fill="rgb(239, 68, 68)" fontWeight="bold">(-1, 2)</text>
                        
                        {/* Local Minimum at (1, -2) */}
                        <circle cx="1" cy="2" r="0.12" fill="rgb(59, 130, 246)" />
                        <text x="0.5" y="2.5" fontSize="0.3" fill="rgb(59, 130, 246)" fontWeight="bold">(1, -2)</text>
                      </svg>
                    </div>
                    <p className="text-xs text-center mt-2 text-purple-600 dark:text-purple-400">{lesson3.section2.plot2_description}</p>
                  </div>
                )}

                <h4 className="font-semibold mt-4">{lesson3.section2.def2_2_title}</h4>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section2.list2_4) }} />
                  <li className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section2.list2_5) }} />
                  <li className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section2.list2_6) }} />
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* Section 3: Optimization */}
            <AccordionItem value="app-section3" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold">{lesson3.section3.title3}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                <p className="text-muted-foreground">{lesson3.section3.def3_1}</p>

                {/* Optimization Visual Plot */}
                {lesson3.section3.plot3_title && (
                  <div className="border rounded-lg p-4 bg-card mt-4 max-w-lg mx-auto">
                    <h5 className="font-semibold text-sm mb-2">{lesson3.section3.plot3_title}</h5>
                    <p className="text-xs text-muted-foreground mb-3">{lesson3.section3.plot3_desc}</p>
                    <div className="w-full bg-muted/20 rounded-lg flex items-center justify-center p-4">
                      <svg viewBox="-1 -0.5 7 5.5" className="w-full max-w-md" preserveAspectRatio="xMidYMid meet">
                        {/* Axes */}
                        <line x1="0" y1="0" x2="6.5" y2="0" stroke="currentColor" strokeWidth="0.03" />
                        <line x1="0" y1="0" x2="0" y2="5" stroke="currentColor" strokeWidth="0.03" />
                        
                        {/* Axis labels */}
                        <text x="6.2" y="-0.1" fontSize="0.3" fill="currentColor">x (in)</text>
                        <text x="0.2" y="0.4" fontSize="0.3" fill="currentColor">V (in³)</text>
                        
                        {/* X-axis tick marks and values */}
                        <line x1="1" y1="0" x2="1" y2="-0.08" stroke="currentColor" strokeWidth="0.02" />
                        <text x="0.9" y="-0.15" fontSize="0.2" fill="currentColor">1</text>
                        <line x1="2" y1="0" x2="2" y2="-0.08" stroke="currentColor" strokeWidth="0.02" />
                        <text x="1.9" y="-0.15" fontSize="0.2" fill="currentColor">2</text>
                        <line x1="3" y1="0" x2="3" y2="-0.08" stroke="currentColor" strokeWidth="0.02" />
                        <text x="2.9" y="-0.15" fontSize="0.2" fill="currentColor">3</text>
                        <line x1="4" y1="0" x2="4" y2="-0.08" stroke="currentColor" strokeWidth="0.02" />
                        <text x="3.9" y="-0.15" fontSize="0.2" fill="currentColor">4</text>
                        <line x1="5" y1="0" x2="5" y2="-0.08" stroke="currentColor" strokeWidth="0.02" />
                        <text x="4.9" y="-0.15" fontSize="0.2" fill="currentColor">5</text>
                        <line x1="6" y1="0" x2="6" y2="-0.08" stroke="currentColor" strokeWidth="0.02" />
                        <text x="5.9" y="-0.15" fontSize="0.2" fill="currentColor">6</text>
                        
                        {/* Y-axis tick marks and values (scaled down from 0-128 to 0-5) */}
                        <line x1="0" y1="1" x2="-0.08" y2="1" stroke="currentColor" strokeWidth="0.02" />
                        <text x="-0.6" y="1.1" fontSize="0.2" fill="currentColor">32</text>
                        <line x1="0" y1="2" x2="-0.08" y2="2" stroke="currentColor" strokeWidth="0.02" />
                        <text x="-0.6" y="2.1" fontSize="0.2" fill="currentColor">64</text>
                        <line x1="0" y1="3" x2="-0.08" y2="3" stroke="currentColor" strokeWidth="0.02" />
                        <text x="-0.6" y="3.1" fontSize="0.2" fill="currentColor">96</text>
                        <line x1="0" y1="4" x2="-0.08" y2="4" stroke="currentColor" strokeWidth="0.02" />
                        <text x="-0.7" y="4.1" fontSize="0.2" fill="currentColor">128</text>
                        
                        {/* Volume function: V(x) = x(12-2x)^2, scaled to fit 0-5 range */}
                        <path
                          d={Array.from({ length: 121 }, (_, i) => {
                            const x = i / 20;
                            const volume = x * (12 - 2 * x) * (12 - 2 * x);
                            const scaledVolume = (volume / 128) * 4; // Scale 0-128 to 0-4
                            return `${i === 0 ? 'M' : 'L'} ${x} ${scaledVolume}`;
                          }).join(' ')}
                          stroke="rgb(168, 85, 247)"
                          strokeWidth="0.08"
                          fill="none"
                        />
                        
                        {/* Maximum point at x=2, V=128 (scaled to y=4) */}
                        <circle cx="2" cy="4" r="0.12" fill="rgb(34, 197, 94)" />
                        <text x="2.3" y="3.8" fontSize="0.25" fill="rgb(34, 197, 94)" fontWeight="bold">(2, 128)</text>
                      </svg>
                    </div>
                    <p className="text-xs text-center mt-2 text-green-600 dark:text-green-400">{lesson3.section3.plot3_description}</p>
                  </div>
                )}
                
                <h4 className="font-semibold mt-4">{lesson3.section3.strategy_title}</h4>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li className="text-muted-foreground">{lesson3.section3.step3_1}</li>
                  <li className="text-muted-foreground">{lesson3.section3.step3_2}</li>
                  <li className="text-muted-foreground">{lesson3.section3.step3_3}</li>
                  <li className="text-muted-foreground">{lesson3.section3.step3_4}</li>
                  <li className="text-muted-foreground">{lesson3.section3.step3_5}</li>
                </ul>

                {/* Optimization Example */}
                <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">{lesson3.section3.ex3_1_title}</h5>
                  <p className="text-muted-foreground text-lg mb-2">{lesson3.section3.ex3_1_problem}</p>
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section3.ex3_1_step1) }} />
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section3.ex3_1_step2) }} />
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section3.ex3_1_step3) }} />
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section3.ex3_1_step4) }} />
                    <p className="font-semibold text-lg text-green-700 dark:text-green-400 mt-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section3.ex3_1_solution) }} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 4: Related Rates */}
            <AccordionItem value="app-section4" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold">{lesson3.section4.title4}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                <p className="text-muted-foreground">{lesson3.section4.def4_1}</p>

                {/* Related Rates Ladder Visual */}
                {lesson3.section4.plot4_title && (
                  <div className="border rounded-lg p-4 bg-card mt-4 max-w-lg mx-auto">
                    <h5 className="font-semibold text-sm mb-2">{lesson3.section4.plot4_title}</h5>
                    <p className="text-xs text-muted-foreground mb-3">{lesson3.section4.plot4_desc}</p>
                    <div className="w-full bg-muted/20 rounded-lg flex items-center justify-center p-4">
                      <svg viewBox="-1.5 -1 13 12" className="w-full max-w-md" preserveAspectRatio="xMidYMid meet">
                        {/* Wall (y-axis) */}
                        <line x1="0" y1="0" x2="0" y2="10.5" stroke="rgb(107, 114, 128)" strokeWidth="0.25" strokeLinecap="round" />
                        <text x="-1.2" y="0.5" fontSize="0.5" fill="currentColor" fontWeight="bold">Wall</text>
                        
                        {/* Ground (x-axis) */}
                        <line x1="0" y1="10" x2="11" y2="10" stroke="rgb(107, 114, 128)" strokeWidth="0.25" strokeLinecap="round" />
                        <text x="10" y="10.8" fontSize="0.5" fill="currentColor" fontWeight="bold">Ground</text>
                        
                        {/* Ladder (10 ft long) from (6, 10) to (0, 2) */}
                        <line x1="6" y1="10" x2="0" y2="2" stroke="rgb(251, 146, 60)" strokeWidth="0.2" />
                        <text x="2.5" y="5.5" fontSize="0.5" fill="rgb(251, 146, 60)" fontWeight="bold" transform="rotate(-53.13, 2.5, 5.5)">L=10 {lesson3.section4.distance}</text>
                        
                        {/* X-axis measurements */}
                        <line x1="2" y1="10" x2="2" y2="9.5" stroke="currentColor" strokeWidth="0.1" />
                        <text x="1.8" y="9.3" fontSize="0.4" fill="currentColor">2</text>
                        <line x1="4" y1="10" x2="4" y2="9.5" stroke="currentColor" strokeWidth="0.1" />
                        <text x="3.8" y="9.3" fontSize="0.4" fill="currentColor">4</text>
                        <line x1="6" y1="10" x2="6" y2="9.5" stroke="currentColor" strokeWidth="0.1" />
                        <text x="5.8" y="9.3" fontSize="0.4" fill="currentColor">6</text>
                        <line x1="8" y1="10" x2="8" y2="9.5" stroke="currentColor" strokeWidth="0.1" />
                        <text x="7.8" y="9.3" fontSize="0.4" fill="currentColor">8</text>
                        <line x1="10" y1="10" x2="10" y2="9.5" stroke="currentColor" strokeWidth="0.1" />
                        <text x="9.7" y="9.3" fontSize="0.4" fill="currentColor">10</text>
                        
                        {/* Y-axis measurements */}
                        <line x1="0" y1="2" x2="0.5" y2="2" stroke="currentColor" strokeWidth="0.1" />
                        <text x="-1.2" y="2.2" fontSize="0.4" fill="currentColor">8</text>
                        <line x1="0" y1="4" x2="0.5" y2="4" stroke="currentColor" strokeWidth="0.1" />
                        <text x="-1.2" y="4.2" fontSize="0.4" fill="currentColor">6</text>
                        <line x1="0" y1="6" x2="0.5" y2="6" stroke="currentColor" strokeWidth="0.1" />
                        <text x="-1.2" y="6.2" fontSize="0.4" fill="currentColor">4</text>
                        <line x1="0" y1="8" x2="0.5" y2="8" stroke="currentColor" strokeWidth="0.1" />
                        <text x="-1.2" y="8.2" fontSize="0.4" fill="currentColor">2</text>
                        
                        {/* Bottom of ladder (x=6) */}
                        <circle cx="6" cy="10" r="0.2" fill="rgb(239, 68, 68)" />
                        <text x="6.3" y="10.8" fontSize="0.5" fill="rgb(239, 68, 68)" fontWeight="bold">x = 6 {lesson3.section4.distance}</text>
                        
                        {/* Top of ladder (y=8) */}
                        <circle cx="0" cy="2" r="0.2" fill="rgb(59, 130, 246)" />
                        <text x="0.3" y="1.5" fontSize="0.5" fill="rgb(59, 130, 246)" fontWeight="bold">y = 8 {lesson3.section4.distance}</text>
                        
                        {/* Arrow showing x moving away */}
                        <line x1="6.2" y1="9.3" x2="7.5" y2="9.3" stroke="rgb(239, 68, 68)" strokeWidth="0.15" markerEnd="url(#arrowred)" />
                        <text x="6.5" y="8.9" fontSize="0.45" fill="rgb(239, 68, 68)" fontWeight="bold">dx/dt = 2 {lesson3.section4.distance}/s</text>
                        
                        {/* Arrow showing y moving down */}
                        <line x1="0.7" y1="2" x2="0.7" y2="3.3" stroke="rgb(59, 130, 246)" strokeWidth="0.15" markerEnd="url(#arrowblue)" />
                        <text x="1" y="2.8" fontSize="0.45" fill="rgb(59, 130, 246)" fontWeight="bold">dy/dt = ?</text>
                        
                        {/* Defs for arrows */}
                        <defs>
                          <marker id="arrowred" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto" markerUnits="strokeWidth">
                            <path d="M0,0 L0,6 L9,3 z" fill="rgb(239, 68, 68)" />
                          </marker>
                          <marker id="arrowblue" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto" markerUnits="strokeWidth">
                            <path d="M0,0 L0,6 L9,3 z" fill="rgb(59, 130, 246)" />
                          </marker>
                        </defs>
                      </svg>
                    </div>
                    <p className="text-xs text-center mt-2 text-orange-600 dark:text-orange-400">x² + y² = 100 ({lesson3.section4.plot4_description})</p>
                  </div>
                )}

                <div className="my-4 p-4 bg-muted/30 rounded-lg overflow-x-auto">
                  <div dangerouslySetInnerHTML={{ __html: renderMath(lesson3.section4.math4_1) }} />
                </div>
                <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section4.text4_1) }} />

                {/* Related Rates Example */}
                <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">{lesson3.section4.ex4_1_title}</h5>
                  <p className="text-muted-foreground text-lg mb-2">{lesson3.section4.ex4_1_problem}</p>
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section4.ex4_1_step1) }} />
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section4.ex4_1_step2) }} />
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section4.ex4_1_step3) }} />
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section4.ex4_1_step4) }} />
                    <p className="font-semibold text-lg text-green-700 dark:text-green-400 mt-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section4.ex4_1_solution) }} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Examples Section */}
            <AccordionItem value="app-examples" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold">{lesson3.example_section.title_ex}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-8">
                {/* Example 1: L'Hôpital */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-primary">{lesson3.example_section.ex1.title}</h4>
                  <p className="text-muted-foreground">{lesson3.example_section.ex1.problem}</p>
                  <div className="my-4 p-4 bg-muted/30 rounded-lg overflow-x-auto">
                    <div dangerouslySetInnerHTML={{ __html: renderMath(lesson3.example_section.ex1.problem_math) }} />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-lg">{lesson3.example_section.ex1.step1_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.example_section.ex1.step1_desc) }} />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{lesson3.example_section.ex1.step2_title}</p>
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson3.example_section.ex1.step2_math) }} />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{lesson3.example_section.ex1.step3_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.example_section.ex1.step3_desc) }} />
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson3.example_section.ex1.step3_math) }} />
                      </div>
                    </div>
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="font-semibold text-lg text-green-700 dark:text-green-400">{lesson3.example_section.ex1.result_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.example_section.ex1.result) }} />
                    </div>
                  </div>
                </div>

                {/* Example 2: Optimization */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-primary">{lesson3.example_section.ex2.title}</h4>
                  <p className="text-muted-foreground">{lesson3.example_section.ex2.problem}</p>
                  <div className="my-4 p-4 bg-muted/30 rounded-lg overflow-x-auto">
                    <div dangerouslySetInnerHTML={{ __html: renderMath(lesson3.example_section.ex2.problem_math) }} />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-lg">{lesson3.example_section.ex2.step1_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.example_section.ex2.step1_desc) }} />
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson3.example_section.ex2.step1_math) }} />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{lesson3.example_section.ex2.step2_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.example_section.ex2.step2_desc) }} />
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson3.example_section.ex2.step2_math) }} />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{lesson3.example_section.ex2.step3_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.example_section.ex2.step3_desc) }} />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{lesson3.example_section.ex2.step4_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.example_section.ex2.step4_desc) }} />
                    </div>
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="font-semibold text-lg text-green-700 dark:text-green-400">{lesson3.example_section.ex2.result_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.example_section.ex2.result) }} />
                    </div>
                  </div>
                </div>

                {/* Example 3: Related Rates */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-primary">{lesson3.example_section.ex3.title}</h4>
                  <p className="text-muted-foreground">{lesson3.example_section.ex3.problem}</p>
                  <div className="my-4 p-4 bg-muted/30 rounded-lg overflow-x-auto">
                    <div dangerouslySetInnerHTML={{ __html: renderMath(lesson3.example_section.ex3.problem_math) }} />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-lg">{lesson3.example_section.ex3.step1_title}</p>
                      <p className="text-muted-foreground text-lg">{lesson3.example_section.ex3.step1_desc}</p>
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson3.example_section.ex3.step1_math) }} />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{lesson3.example_section.ex3.step2_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.example_section.ex3.step2_desc) }} />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{lesson3.example_section.ex3.step3_title}</p>
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson3.example_section.ex3.step3_math) }} />
                      </div>
                    </div>
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="font-semibold text-lg text-green-700 dark:text-green-400">{lesson3.example_section.ex3.result_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.example_section.ex3.result) }} />
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Lesson 4: Integration */} 
        <div id="lesson-integration" className="max-w-4xl mx-auto mb-12">
          <Badge className="mb-3">Lesson 4</Badge>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold">{(course as any).integration.lessons.lesson4_title}</h2>
          </div>
          
          <Accordion type="multiple" defaultValue={["section4-1"]} className="space-y-4">
            {/* Section 1: Antiderivatives */}
            <AccordionItem value="section4-1" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-semibold text-lg">{lesson4.section1.title1}</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                <p className="text-muted-foreground text-lg">{lesson4.section1.def1_1}</p>
                <div className="my-4 p-4 bg-muted/30 rounded-lg overflow-x-auto">
                  <div dangerouslySetInnerHTML={{ __html: renderMath(lesson4.section1.math1_1) }} />
                </div>
                <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section1.text1_1) }} />
                
                {/* Simple Example inline */}
                <div className="my-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <h4 className="font-semibold text-lg mb-2">{lesson4.section1.ex1_1_title}</h4>
                  <p className="text-muted-foreground text-lg mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section1.ex1_1_problem) }} />
                  <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section1.ex1_1_step1) }} />
                  <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                    <div dangerouslySetInnerHTML={{ __html: renderMath(lesson4.section1.ex1_1_math) }} />
                  </div>
                </div>

                <h4 className="font-semibold text-lg mt-4">{lesson4.section1.def1_2}</h4>
                <div className="my-4 p-4 bg-muted/30 rounded-lg overflow-x-auto">
                  <div dangerouslySetInnerHTML={{ __html: renderMath(lesson4.section1.math1_2) }} />
                </div>
                <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section1.text1_2) }} />
              </AccordionContent>
            </AccordionItem>

            {/* Section 2: The Definite Integral & Area */}
            <AccordionItem value="section4-2" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-semibold text-lg">{lesson4.section2.title2}</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section2.def2_1) }} />
                <div className="my-4 p-4 bg-muted/30 rounded-lg overflow-x-auto">
                  <div dangerouslySetInnerHTML={{ __html: renderMath(lesson4.section2.math2_1) }} />
                </div>

                {/* Area Visual Plot */}
                {lesson4.section2.plot2_title && (
                  <div className="border rounded-lg p-4 bg-card mt-4 max-w-lg mx-auto">
                    <h5 className="font-semibold text-sm mb-2">{lesson4.section2.plot2_title}</h5>
                    <p className="text-xs text-muted-foreground mb-3" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section2.plot2_desc) }} />
                    <div className="w-full bg-muted/20 rounded-lg flex items-center justify-center p-4">
                      <svg viewBox="-0.5 -0.5 5 5.5" className="w-full max-w-md" preserveAspectRatio="xMidYMid meet">
                        {/* Axes */}
                        <line x1="0" y1="5" x2="4.5" y2="5" stroke="currentColor" strokeWidth="0.03" />
                        <line x1="0" y1="5" x2="0" y2="0" stroke="currentColor" strokeWidth="0.03" />
                        
                        {/* Axis labels */}
                        <text x="4.2" y="5.3" fontSize="0.3" fill="currentColor">x</text>
                        <text x="0.2" y="0.4" fontSize="0.3" fill="currentColor">y</text>
                        
                        {/* X-axis ticks */}
                        <line x1="1" y1="5" x2="1" y2="5.1" stroke="currentColor" strokeWidth="0.02" />
                        <text x="0.9" y="5.35" fontSize="0.2" fill="currentColor">1</text>
                        <line x1="2" y1="5" x2="2" y2="5.1" stroke="currentColor" strokeWidth="0.02" />
                        <text x="1.9" y="5.35" fontSize="0.2" fill="currentColor">2</text>
                        <line x1="3" y1="5" x2="3" y2="5.1" stroke="currentColor" strokeWidth="0.02" />
                        <text x="2.9" y="5.35" fontSize="0.2" fill="currentColor">3</text>
                        <line x1="4" y1="5" x2="4" y2="5.1" stroke="currentColor" strokeWidth="0.02" />
                        <text x="3.9" y="5.35" fontSize="0.2" fill="currentColor">4</text>
                        
                        {/* Y-axis ticks */}
                        <line x1="0" y1="4" x2="-0.08" y2="4" stroke="currentColor" strokeWidth="0.02" />
                        <text x="-0.4" y="4.1" fontSize="0.2" fill="currentColor">1</text>
                        <line x1="0" y1="3" x2="-0.08" y2="3" stroke="currentColor" strokeWidth="0.02" />
                        <text x="-0.4" y="3.1" fontSize="0.2" fill="currentColor">2</text>
                        <line x1="0" y1="2" x2="-0.08" y2="2" stroke="currentColor" strokeWidth="0.02" />
                        <text x="-0.4" y="2.1" fontSize="0.2" fill="currentColor">3</text>
                        <line x1="0" y1="1" x2="-0.08" y2="1" stroke="currentColor" strokeWidth="0.02" />
                        <text x="-0.4" y="1.1" fontSize="0.2" fill="currentColor">4</text>
                        
                        {/* Shaded area from x=1 to x=3 */}
                        <path
                          d={Array.from({ length: 41 }, (_, i) => {
                            const x = 1 + (i / 20);
                            const y = 0.5 * x * x;
                            return `${i === 0 ? 'M' : 'L'} ${x} ${5 - y}`;
                          }).join(' ') + ' L 3 5 L 1 5 Z'}
                          fill="rgb(59, 130, 246)"
                          fillOpacity="0.2"
                          stroke="none"
                        />
                        
                        {/* Function curve: f(x) = 0.5x^2 */}
                        <path
                          d={Array.from({ length: 81 }, (_, i) => {
                            const x = i / 20;
                            const y = 0.5 * x * x;
                            return `${i === 0 ? 'M' : 'L'} ${x} ${5 - y}`;
                          }).join(' ')}
                          stroke="rgb(168, 85, 247)"
                          strokeWidth="0.08"
                          fill="none"
                        />
                        
                        {/* Vertical lines at bounds */}
                        <line x1="1" y1="5" x2="1" y2="4.5" stroke="rgb(59, 130, 246)" strokeWidth="0.04" strokeDasharray="0.05,0.05" />
                        <line x1="3" y1="5" x2="3" y2="0.5" stroke="rgb(59, 130, 246)" strokeWidth="0.04" strokeDasharray="0.05,0.05" />
                        
                        {/* Labels for bounds */}
                        <text x="0.8" y="4.3" fontSize="0.25" fill="rgb(59, 130, 246)" fontWeight="bold">a</text>
                        <text x="2.8" y="4.3" fontSize="0.25" fill="rgb(59, 130, 246)" fontWeight="bold">b</text>
                      </svg>
                    </div>
                    <p className="text-xs text-center mt-2 text-blue-600 dark:text-blue-400">f(x) = 0.5x²</p>
                  </div>
                )}

                <p className="text-muted-foreground text-lg">{lesson4.section2.text2_1}</p>
                
                {/* Example inline */}
                <div className="my-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <h4 className="font-semibold text-lg mb-2">{lesson4.section2.ex2_1_title}</h4>
                  <p className="text-muted-foreground text-lg mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section2.ex2_1_problem) }} />
                  <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section2.ex2_1_step1) }} />
                  <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section2.ex2_1_step2) }} />
                  <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                    <div dangerouslySetInnerHTML={{ __html: renderMath(lesson4.section2.ex2_1_math) }} />
                  </div>
                  <p className="text-muted-foreground text-lg font-semibold text-green-700 dark:text-green-400">{lesson4.section2.ex2_1_result}</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 3: Fundamental Theorem of Calculus */}
            <AccordionItem value="section4-3" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-semibold text-lg">{lesson4.section3.title3}</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                <p className="text-muted-foreground text-lg">{lesson4.section3.def3_1}</p>

                {/* FTC Visual Plot */}
                {lesson4.section3.plot3_title && (
                  <div className="border rounded-lg p-4 bg-card mt-4 max-w-lg mx-auto">
                    <h5 className="font-semibold text-sm mb-2">{lesson4.section3.plot3_title}</h5>
                    <p className="text-xs text-muted-foreground mb-3" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section3.plot3_desc) }} />
                    <div className="w-full bg-muted/20 rounded-lg flex items-center justify-center p-4">
                      <svg viewBox="-0.5 -0.5 4 4" className="w-full max-w-md" preserveAspectRatio="xMidYMid meet">
                        {/* Axes */}
                        <line x1="0" y1="3" x2="3.5" y2="3" stroke="currentColor" strokeWidth="0.03" />
                        <line x1="0" y1="3" x2="0" y2="0" stroke="currentColor" strokeWidth="0.03" />
                        
                        {/* Axis labels */}
                        <text x="3.2" y="3.3" fontSize="0.25" fill="currentColor">x</text>
                        <text x="0.2" y="0.3" fontSize="0.25" fill="currentColor">y</text>
                        
                        {/* X-axis ticks */}
                        <line x1="1" y1="3" x2="1" y2="3.08" stroke="currentColor" strokeWidth="0.02" />
                        <text x="0.9" y="3.3" fontSize="0.2" fill="currentColor">1</text>
                        <line x1="2" y1="3" x2="2" y2="3.08" stroke="currentColor" strokeWidth="0.02" />
                        <text x="1.9" y="3.3" fontSize="0.2" fill="currentColor">2</text>
                        <line x1="3" y1="3" x2="3" y2="3.08" stroke="currentColor" strokeWidth="0.02" />
                        <text x="2.9" y="3.3" fontSize="0.2" fill="currentColor">3</text>
                        
                        {/* Y-axis ticks */}
                        <line x1="0" y1="2" x2="-0.08" y2="2" stroke="currentColor" strokeWidth="0.02" />
                        <text x="-0.35" y="2.1" fontSize="0.2" fill="currentColor">1</text>
                        <line x1="0" y1="1" x2="-0.08" y2="1" stroke="currentColor" strokeWidth="0.02" />
                        <text x="-0.35" y="1.1" fontSize="0.2" fill="currentColor">2</text>
                        
                        {/* Triangle area (shaded) from x=0 to x=2 under f(x)=x */}
                        <path
                          d="M 0 3 L 2 1 L 2 3 Z"
                          fill="rgb(34, 197, 94)"
                          fillOpacity="0.2"
                          stroke="none"
                        />
                        
                        {/* Function line: f(x) = x */}
                        <line x1="0" y1="3" x2="3" y2="0" stroke="rgb(168, 85, 247)" strokeWidth="0.08" />
                        
                        {/* Vertical line at x=2 */}
                        <line x1="2" y1="3" x2="2" y2="1" stroke="rgb(34, 197, 94)" strokeWidth="0.04" strokeDasharray="0.05,0.05" />
                        
                        {/* Label */}
                        <text x="0.8" y="2.2" fontSize="0.25" fill="rgb(34, 197, 94)" fontWeight="bold">{lesson4.section3.plot3_description}</text>
                      </svg>
                    </div>
                    <p className="text-xs text-center mt-2 text-green-600 dark:text-green-400">f(x) = {lesson4.section3.plot3_description}</p>
                  </div>
                )}

                <div className="my-4 p-4 bg-muted/30 rounded-lg overflow-x-auto">
                  <div dangerouslySetInnerHTML={{ __html: renderMath(lesson4.section3.math3_1) }} />
                </div>
                <p className="text-muted-foreground text-lg">{lesson4.section3.text3_1}</p>
                
                {/* Example inline */}
                <div className="my-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <h4 className="font-semibold text-lg mb-2">{lesson4.section3.ex3_1_title}</h4>
                  <p className="text-muted-foreground text-lg mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section3.ex3_1_problem) }} />
                  <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section3.ex3_1_step1) }} />
                  <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section3.ex3_1_step2) }} />
                  <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                    <div dangerouslySetInnerHTML={{ __html: renderMath(lesson4.section3.ex3_1_math) }} />
                  </div>
                  <p className="text-muted-foreground text-lg font-semibold text-green-700 dark:text-green-400">{lesson4.section3.ex3_1_result}</p>
                </div>

                <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section3.theorem3_1) }} />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 4: Integration Techniques */}
            <AccordionItem value="section4-4" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-semibold text-lg">{lesson4.section4.title4}</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                {/* U-Substitution */}
                <h4 className="font-semibold text-lg">{lesson4.section4.def4_1_title}</h4>
                <p className="text-muted-foreground text-lg">{lesson4.section4.def4_1}</p>
                <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section4.step4_1) }} />
                
                {/* U-Sub Example inline */}
                <div className="my-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <h4 className="font-semibold text-lg mb-2">{lesson4.section4.ex4_1_title}</h4>
                  <p className="text-muted-foreground text-lg mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section4.ex4_1_problem) }} />
                  <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section4.ex4_1_step1) }} />
                  <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section4.ex4_1_step2) }} />
                  <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section4.ex4_1_step3) }} />
                  <p className="text-muted-foreground text-lg font-semibold text-green-700 dark:text-green-400" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section4.ex4_1_result) }} />
                </div>

                {/* Integration by Parts */}
                <h4 className="font-semibold text-lg mt-6">{lesson4.section4.def4_2_title}</h4>
                <p className="text-muted-foreground text-lg">{lesson4.section4.def4_2}</p>
                <div className="my-4 p-4 bg-muted/30 rounded-lg overflow-x-auto">
                  <div dangerouslySetInnerHTML={{ __html: renderMath(lesson4.section4.math4_2) }} />
                </div>

                {/* LIATE Rule */}
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <h5 className="font-semibold text-sm mb-2">{lesson4.section4.graphic4_1_title}</h5>
                  <p className="text-muted-foreground text-sm">{lesson4.section4.graphic4_1_desc}</p>
                </div>

                <p className="text-muted-foreground text-lg">{lesson4.section4.text4_2}</p>
                
                {/* By Parts Example inline */}
                <div className="my-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <h4 className="font-semibold text-lg mb-2">{lesson4.section4.ex4_2_title}</h4>
                  <p className="text-muted-foreground text-lg mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section4.ex4_2_problem) }} />
                  <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section4.ex4_2_step1) }} />
                  <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section4.ex4_2_step2) }} />
                  <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section4.ex4_2_step3) }} />
                  <p className="text-muted-foreground text-lg font-semibold text-green-700 dark:text-green-400" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section4.ex4_2_result) }} />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 5: Integrals Cheat Sheet */}
            <AccordionItem value="section4-5" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-semibold text-lg">{lesson4.section5.title5}</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-6">
                {/* 1. General Rules */}
                <div>
                  <h4 className="font-semibold text-lg mb-3 text-blue-700 dark:text-blue-400">{lesson4.section5.cheat_title1}</h4>
                  <div className="space-y-3">
                    <div className="border-l-4 border-blue-500/30 pl-4">
                      <p className="font-medium text-sm">{lesson4.section5.rule1_title}</p>
                      <div className="mt-1 p-2 bg-muted/30 rounded overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson4.section5.rule1_math, false) }} />
                      </div>
                    </div>
                    <div className="border-l-4 border-blue-500/30 pl-4">
                      <p className="font-medium text-sm">{lesson4.section5.rule2_title}</p>
                      <div className="mt-1 p-2 bg-muted/30 rounded overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson4.section5.rule2_math, false) }} />
                      </div>
                    </div>
                    <div className="border-l-4 border-blue-500/30 pl-4">
                      <p className="font-medium text-sm">{lesson4.section5.rule3_title}</p>
                      <div className="mt-1 p-2 bg-muted/30 rounded overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson4.section5.rule3_math, false) }} />
                      </div>
                    </div>
                    <div className="border-l-4 border-blue-500/30 pl-4">
                      <p className="font-medium text-sm">{lesson4.section5.rule4_title}</p>
                      <div className="mt-1 p-2 bg-muted/30 rounded overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson4.section5.rule4_math, false) }} />
                      </div>
                    </div>
                    <div className="border-l-4 border-blue-500/30 pl-4">
                      <p className="font-medium text-sm">{lesson4.section5.rule5_title}</p>
                      <div className="mt-1 p-2 bg-muted/30 rounded overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson4.section5.rule5_math, false) }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Common Integrals */}
                <div>
                  <h4 className="font-semibold text-lg mb-3 text-purple-700 dark:text-purple-400">{lesson4.section5.cheat_title2}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="p-2 bg-muted/20 rounded text-sm" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section5.basic1) }} />
                    <div className="p-2 bg-muted/20 rounded text-sm" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section5.basic2) }} />
                    <div className="p-2 bg-muted/20 rounded text-sm" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section5.basic3) }} />
                    <div className="p-2 bg-muted/20 rounded text-sm" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section5.basic4) }} />
                    <div className="p-2 bg-muted/20 rounded text-sm col-span-1 md:col-span-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section5.basic5) }} />
                  </div>
                </div>

                {/* 3. Trigonometric */}
                <div>
                  <h4 className="font-semibold text-lg mb-3 text-green-700 dark:text-green-400">{lesson4.section5.cheat_title3}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="p-2 bg-muted/20 rounded text-sm" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section5.trig1) }} />
                    <div className="p-2 bg-muted/20 rounded text-sm" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section5.trig2) }} />
                    <div className="p-2 bg-muted/20 rounded text-sm" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section5.trig3) }} />
                    <div className="p-2 bg-muted/20 rounded text-sm" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section5.trig4) }} />
                    <div className="p-2 bg-muted/20 rounded text-sm" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section5.trig5) }} />
                    <div className="p-2 bg-muted/20 rounded text-sm" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section5.trig6) }} />
                  </div>
                </div>

                {/* 4. Inverse Trigonometric */}
                <div>
                  <h4 className="font-semibold text-lg mb-3 text-orange-700 dark:text-orange-400">{lesson4.section5.cheat_title4}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="p-2 bg-muted/20 rounded text-sm" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section5.arctrig1) }} />
                    <div className="p-2 bg-muted/20 rounded text-sm" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section5.arctrig2) }} />
                    <div className="p-2 bg-muted/20 rounded text-sm" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section5.arctrig3) }} />
                    <div className="p-2 bg-muted/20 rounded text-sm" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section5.arctrig4) }} />
                    <div className="p-2 bg-muted/20 rounded text-sm col-span-1 md:col-span-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section5.arctrig5) }} />
                  </div>
                </div>

                {/* 5. Hyperbolic */}
                <div>
                  <h4 className="font-semibold text-lg mb-3 text-pink-700 dark:text-pink-400">{lesson4.section5.cheat_title5}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="p-2 bg-muted/20 rounded text-sm" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section5.hyp1) }} />
                    <div className="p-2 bg-muted/20 rounded text-sm" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section5.hyp2) }} />
                    <div className="p-2 bg-muted/20 rounded text-sm" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section5.hyp3) }} />
                    <div className="p-2 bg-muted/20 rounded text-sm" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section5.hyp4) }} />
                  </div>
                </div>

                {/* 6. Special Functions */}
                <div>
                  <h4 className="font-semibold text-lg mb-3 text-teal-700 dark:text-teal-400">{lesson4.section5.cheat_title6}</h4>
                  <p className="text-xs text-muted-foreground italic mb-3">{lesson4.section5.spec1_desc}</p>
                  <div className="space-y-2">
                    <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded text-sm" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section5.spec1) }} />
                    <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded text-sm" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section5.spec2) }} />
                    <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded text-sm" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section5.spec3) }} />
                    <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded text-sm" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section5.spec4) }} />
                    <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded text-sm" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section5.spec5) }} />
                    <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded text-sm" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section5.spec6) }} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Example Section */}
            <AccordionItem value="section4-examples" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-semibold text-lg">{lesson4.example_section.title_ex}</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                {/* Example 1 */}
                <div className="mb-6 pb-6 border-b">
                  <h3 className="text-lg font-bold mb-2">{lesson4.example_section.ex1.title}</h3>
                  <p className="text-muted-foreground text-lg mb-2">{lesson4.example_section.ex1.problem}</p>
                  <div className="my-3 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                    <div dangerouslySetInnerHTML={{ __html: renderMath(lesson4.example_section.ex1.problem_math) }} />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-lg">{lesson4.example_section.ex1.step1_title}</p>
                      <p className="text-muted-foreground text-lg">{lesson4.example_section.ex1.step1_desc}</p>
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson4.example_section.ex1.step1_math) }} />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{lesson4.example_section.ex1.step2_title}</p>
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson4.example_section.ex1.step2_math) }} />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{lesson4.example_section.ex1.step3_title}</p>
                      <p className="text-muted-foreground text-lg">{lesson4.example_section.ex1.step3_desc}</p>
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson4.example_section.ex1.step3_math) }} />
                      </div>
                    </div>
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="font-semibold text-lg text-green-700 dark:text-green-400">{lesson4.example_section.ex1.result_title}</p>
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson4.example_section.ex1.result) }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Example 2 */}
                <div className="mb-6 pb-6 border-b">
                  <h3 className="text-lg font-bold mb-2">{lesson4.example_section.ex2.title}</h3>
                  <p className="text-muted-foreground text-lg mb-2">{lesson4.example_section.ex2.problem}</p>
                  <div className="my-3 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                    <div dangerouslySetInnerHTML={{ __html: renderMath(lesson4.example_section.ex2.problem_math) }} />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-lg">{lesson4.example_section.ex2.step1_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.example_section.ex2.step1_desc) }} />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{lesson4.example_section.ex2.step2_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.example_section.ex2.step2_desc) }} />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{lesson4.example_section.ex2.step3_title}</p>
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson4.example_section.ex2.step3_math) }} />
                      </div>
                    </div>
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="font-semibold text-lg text-green-700 dark:text-green-400">{lesson4.example_section.ex2.result_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.example_section.ex2.result) }} />
                    </div>
                  </div>
                </div>

                {/* Example 3 */}
                <div>
                  <h3 className="text-lg font-bold mb-2">{lesson4.example_section.ex3.title}</h3>
                  <p className="text-muted-foreground text-lg mb-2">{lesson4.example_section.ex3.problem}</p>
                  <div className="my-3 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                    <div dangerouslySetInnerHTML={{ __html: renderMath(lesson4.example_section.ex3.problem_math) }} />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-lg">{lesson4.example_section.ex3.step1_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.example_section.ex3.step1_desc) }} />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{lesson4.example_section.ex3.step2_title}</p>
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson4.example_section.ex3.step2_math) }} />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{lesson4.example_section.ex3.step3_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.example_section.ex3.step3_desc) }} />
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson4.example_section.ex3.step3_math) }} />
                      </div>
                    </div>
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="font-semibold text-lg text-green-700 dark:text-green-400">{lesson4.example_section.ex3.result_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.example_section.ex3.result) }} />
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Lesson 5: Series & Sequences */}
        <div id="lesson-series" className="max-w-4xl mx-auto mb-12">
          <Badge className="mb-3">Lesson 5</Badge>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold">{(course as any).sequences_series.lessons.lesson5_title}</h2>
          </div>

          <Accordion type="multiple" defaultValue={["section5-1"]} className="space-y-4">
            {/* Section 1: Sequences */}
            <AccordionItem value="section5-1" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-semibold text-lg">{lesson5.section1.title1}</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section1.def1_1) }} />

                {/* Sequence Convergence Plot */}
                {lesson5.section1.plot1_title && (
                  <div className="border rounded-lg p-4 bg-card mt-4 max-w-3xl mx-auto">
                    <h5 className="font-semibold text-sm mb-2">{lesson5.section1.plot1_title}</h5>
                    <p className="text-xs text-muted-foreground mb-3" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section1.plot1_desc) }} />
                    <div className="w-full bg-muted/20 rounded-lg flex items-center justify-center p-4">
                      <svg viewBox="-1 0 12 3" className="w-full max-w-3xl" preserveAspectRatio="xMidYMid meet">
                        {/* Axes */}
                        <line x1="0" y1="2.5" x2="11" y2="2.5" stroke="currentColor" strokeWidth="0.03" />
                        <line x1="0" y1="0" x2="0" y2="2.8" stroke="currentColor" strokeWidth="0.03" />
                        
                        {/* Axis labels */}
                        <text x="10.5" y="2.8" fontSize="0.25" fill="currentColor">n</text>
                        <text x="0.2" y="0.3" fontSize="0.25" fill="currentColor">aₙ</text>
                        
                        {/* Limit line at y=1 */}
                        <line x1="0" y1="1.5" x2="11" y2="1.5" stroke="rgb(239, 68, 68)" strokeWidth="0.04" strokeDasharray="0.1,0.1" />
                        <text x="9.5" y="1.3" fontSize="0.25" fill="rgb(239, 68, 68)">L=1</text>
                        
                        {/* Sequence points: a_n = 1 + 1/n */}
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => {
                          const an = 1 + 1/n;
                          const y = 2.5 - an; // flip for SVG
                          return (
                            <circle key={n} cx={n} cy={y} r="0.08" fill="rgb(59, 130, 246)" />
                          );
                        })}
                        
                        {/* X-axis ticks */}
                        <line x1="2" y1="2.5" x2="2" y2="2.6" stroke="currentColor" strokeWidth="0.02" />
                        <text x="1.9" y="2.85" fontSize="0.2" fill="currentColor">2</text>
                        <line x1="5" y1="2.5" x2="5" y2="2.6" stroke="currentColor" strokeWidth="0.02" />
                        <text x="4.9" y="2.85" fontSize="0.2" fill="currentColor">5</text>
                        <line x1="10" y1="2.5" x2="10" y2="2.6" stroke="currentColor" strokeWidth="0.02" />
                        <text x="9.8" y="2.85" fontSize="0.2" fill="currentColor">10</text>
                        
                        {/* Y-axis ticks */}
                        <line x1="0" y1="1.5" x2="-0.1" y2="1.5" stroke="currentColor" strokeWidth="0.02" />
                        <text x="-0.5" y="1.6" fontSize="0.2" fill="currentColor">1</text>
                        <line x1="0" y1="0.5" x2="-0.1" y2="0.5" stroke="currentColor" strokeWidth="0.02" />
                        <text x="-0.5" y="0.6" fontSize="0.2" fill="currentColor">2</text>
                      </svg>
                    </div>
                    <p className="text-xs text-center mt-2 text-blue-600 dark:text-blue-400">{lesson5.section1.plot1_description}</p>
                  </div>
                )}

                <h4 className="font-semibold text-lg mt-4">{lesson5.section1.def1_2}</h4>
                <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section1.text1_1) }} />
                <div className="my-4 p-4 bg-muted/30 rounded-lg overflow-x-auto">
                  <div dangerouslySetInnerHTML={{ __html: renderMath(lesson5.section1.math1_1) }} />
                </div>
                <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section1.text1_2) }} />
                
                <div className="mt-4 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <p className="text-muted-foreground text-lg">{lesson5.section1.theorem1_1}</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 2: Series Tests */}
            <AccordionItem value="section5-2" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-semibold text-lg">{lesson5.section2.title2}</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section2.def2_1) }} />
                <h4 className="font-semibold text-lg mt-4">{lesson5.section2.def2_2_title}</h4>
                <ul className="list-none space-y-3 ml-0">
                  <li className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section2.list2_1) }} />
                  <li className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section2.list2_2) }} />
                  
                  {/* Geometric Example inline */}
                  <div className="my-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg ml-6">
                    <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">{lesson5.section2.ex2_1_title}</h5>
                    <p className="text-muted-foreground text-lg mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section2.ex2_1_problem) }} />
                    <div className="space-y-1">
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section2.ex2_1_step1) }} />
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section2.ex2_1_step2) }} />
                      <p className="font-semibold text-lg text-green-700 dark:text-green-400 mt-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section2.ex2_1_solution) }} />
                    </div>
                  </div>
                  
                  <li className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section2.list2_3) }} />
                  <li className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section2.list2_4) }} />
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* Section 3: Power Series */}
            <AccordionItem value="section5-3" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-semibold text-lg">{lesson5.section3.title3}</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                <p className="text-muted-foreground text-lg">{lesson5.section3.def3_1}</p>
                <div className="my-4 p-4 bg-muted/30 rounded-lg overflow-x-auto">
                  <div dangerouslySetInnerHTML={{ __html: renderMath(lesson5.section3.math3_1) }} />
                </div>
                <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section3.text3_1) }} />
                
                <h4 className="font-semibold text-lg mt-4">{lesson5.section3.def3_2}</h4>
                <p className="text-muted-foreground text-lg">{lesson5.section3.text3_2}</p>

                {/* Convergence Interval Plot */}
                {lesson5.section3.plot3_title && (
                  <div className="border rounded-lg p-4 bg-card mt-4 max-w-2xl mx-auto">
                    <h5 className="font-semibold text-sm mb-2">{lesson5.section3.plot3_title}</h5>
                    <p className="text-xs text-muted-foreground mb-3">{lesson5.section3.plot3_desc}</p>
                    <div className="w-full bg-muted/20 rounded-lg flex items-center justify-center p-4">
                      <svg viewBox="-2.5 -0.5 5 2" className="w-full max-w-2xl" preserveAspectRatio="xMidYMid meet">
                        {/* Number line */}
                        <line x1="-2.5" y1="0.5" x2="2.5" y2="0.5" stroke="currentColor" strokeWidth="0.04" />
                        
                        {/* Convergence interval (green) */}
                        <line x1="-1" y1="0.5" x2="1" y2="0.5" stroke="rgb(34, 197, 94)" strokeWidth="0.15" />
                        
                        {/* Center point (a=0) */}
                        <circle cx="0" cy="0.5" r="0.08" fill="black" />
                        <text x="0.15" y="0.3" fontSize="0.25" fill="currentColor">a</text>
                        
                        {/* Left endpoint (a-R) */}
                        <circle cx="-1" cy="0.5" r="0.08" fill="rgb(239, 68, 68)" />
                        <text x="-1.3" y="0.3" fontSize="0.25" fill="rgb(239, 68, 68)">a-R</text>
                        
                        {/* Right endpoint (a+R) */}
                        <circle cx="1" cy="0.5" r="0.08" fill="rgb(239, 68, 68)" />
                        <text x="0.8" y="0.3" fontSize="0.25" fill="rgb(239, 68, 68)">a+R</text>
                        
                        {/* Labels */}
                        <text x="-0.3" y="0.9" fontSize="0.2" fill="rgb(34, 197, 94)" fontWeight="bold">{lesson5.section3.plot3_label_center}</text>
                        <text x="-2.3" y="0.9" fontSize="0.2" fill="rgb(239, 68, 68)">{lesson5.section3.plot3_label_left}</text>
                        <text x="1.5" y="0.9" fontSize="0.2" fill="rgb(239, 68, 68)">{lesson5.section3.plot3_label_right}</text>
                      </svg>
                    </div>
                    <p className="text-xs text-center mt-2 text-green-600 dark:text-green-400">{lesson5.section3.plot3_description}</p>
                  </div>
                )}

                {/* Power Series Example inline */}
                <div className="my-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">{lesson5.section3.ex3_1_title}</h5>
                  <p className="text-muted-foreground text-lg mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section3.ex3_1_problem) }} />
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section3.ex3_1_step1) }} />
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section3.ex3_1_step2) }} />
                    <p className="font-semibold text-lg text-green-700 dark:text-green-400 mt-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section3.ex3_1_solution) }} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 4: Taylor & Maclaurin Series */}
            <AccordionItem value="section5-4" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-semibold text-lg">{lesson5.section4.title4}</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section4.def4_1) }} />

                {/* Taylor Approximation Plot */}
                {lesson5.section4.plot4_title && (
                  <div className="border rounded-lg p-4 bg-card mt-4 max-w-2xl mx-auto">
                    <h5 className="font-semibold text-sm mb-2">{lesson5.section4.plot4_title}</h5>
                    <p className="text-xs text-muted-foreground mb-3" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section4.plot4_desc) }} />
                    <div className="w-full bg-muted/20 rounded-lg flex items-center justify-center p-4">
                      <svg viewBox="-7 -1.5 14 3" className="w-full max-w-2xl" preserveAspectRatio="xMidYMid meet">
                        {/* Axes */}
                        <line x1="-7" y1="0" x2="7" y2="0" stroke="currentColor" strokeWidth="0.03" />
                        <line x1="0" y1="-1.5" x2="0" y2="1.5" stroke="currentColor" strokeWidth="0.03" />
                        
                        {/* sin(x) - red curve */}
                        <path
                          d={Array.from({ length: 141 }, (_, i) => {
                            const x = (i - 70) / 10;
                            const y = -Math.sin(x);
                            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                          }).join(' ')}
                          stroke="rgb(239, 68, 68)"
                          strokeWidth="0.08"
                          fill="none"
                        />
                        
                        {/* Approximation n=1: x (blue line) */}
                        <line x1="-2" y1="2" x2="2" y2="-2" stroke="rgb(59, 130, 246)" strokeWidth="0.06" strokeDasharray="0.1,0.05" />
                        
                        {/* Approximation n=3: x - x^3/6 (green) */}
                        <path
                          d={Array.from({ length: 81 }, (_, i) => {
                            const x = (i - 40) / 10;
                            const y = -(x - (x*x*x)/6);
                            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                          }).join(' ')}
                          stroke="rgb(34, 197, 94)"
                          strokeWidth="0.06"
                          fill="none"
                        />
                        
                        {/* Labels */}
                        <text x="5.5" y="-0.8" fontSize="0.3" fill="rgb(239, 68, 68)">sin(x)</text>
                        <text x="2.2" y="-0.5" fontSize="0.25" fill="rgb(59, 130, 246)">n=1</text>
                        <text x="3.5" y="0.8" fontSize="0.25" fill="rgb(34, 197, 94)">n=3</text>
                      </svg>
                    </div>
                    <p className="text-xs text-center mt-2 text-orange-600 dark:text-orange-400">{lesson5.section4.plot4_description}</p>
                  </div>
                )}

                <h4 className="font-semibold text-lg mt-4">{lesson5.section4.def4_2}</h4>
                <div className="my-4 p-4 bg-muted/30 rounded-lg overflow-x-auto">
                  <div dangerouslySetInnerHTML={{ __html: renderMath(lesson5.section4.math4_1) }} />
                </div>
                
                <h4 className="font-semibold text-lg mt-4">{lesson5.section4.def4_3}</h4>
                <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section4.text4_1) }} />
                <div className="my-4 p-4 bg-muted/30 rounded-lg overflow-x-auto">
                  <div dangerouslySetInnerHTML={{ __html: renderMath(lesson5.section4.math4_2) }} />
                </div>

                {/* Maclaurin Example inline */}
                <div className="my-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">{lesson5.section4.ex4_1_title}</h5>
                  <p className="text-muted-foreground text-lg mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section4.ex4_1_problem) }} />
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section4.ex4_1_step1) }} />
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section4.ex4_1_step2) }} />
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section4.ex4_1_step3) }} />
                    <p className="font-semibold text-lg text-green-700 dark:text-green-400 mt-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section4.ex4_1_result) }} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Examples Section */}
            <AccordionItem value="section5-examples" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-semibold text-lg">{lesson5.example_section.title_ex}</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                {/* Example 1 */}
                <div className="mb-6 pb-6 border-b">
                  <h3 className="text-lg font-bold mb-2">{lesson5.example_section.ex1.title}</h3>
                  <p className="text-muted-foreground text-lg mb-2">{lesson5.example_section.ex1.problem}</p>
                  <div className="my-3 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                    <div dangerouslySetInnerHTML={{ __html: renderMath(lesson5.example_section.ex1.problem_math) }} />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-lg">{lesson5.example_section.ex1.step1_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.example_section.ex1.step1_desc) }} />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{lesson5.example_section.ex1.step2_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.example_section.ex1.step2_desc) }} />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{lesson5.example_section.ex1.step3_title}</p>
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson5.example_section.ex1.step3_math) }} />
                      </div>
                    </div>
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="font-semibold text-lg text-green-700 dark:text-green-400">{lesson5.example_section.ex1.result_title}</p>
                      <p className="text-muted-foreground text-lg">{lesson5.example_section.ex1.result}</p>
                    </div>
                  </div>
                </div>

                {/* Example 2 */}
                <div className="mb-6 pb-6 border-b">
                  <h3 className="text-lg font-bold mb-2">{lesson5.example_section.ex2.title}</h3>
                  <p className="text-muted-foreground text-lg mb-2">{lesson5.example_section.ex2.problem}</p>
                  <div className="my-3 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                    <div dangerouslySetInnerHTML={{ __html: renderMath(lesson5.example_section.ex2.problem_math) }} />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-lg">{lesson5.example_section.ex2.step1_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.example_section.ex2.step1_desc) }} />
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson5.example_section.ex2.step1_math) }} />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{lesson5.example_section.ex2.step2_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.example_section.ex2.step2_desc) }} />
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson5.example_section.ex2.step2_math) }} />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{lesson5.example_section.ex2.step3_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.example_section.ex2.step3_desc) }} />
                    </div>
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="font-semibold text-lg text-green-700 dark:text-green-400">{lesson5.example_section.ex2.result_title}</p>
                      <p className="text-muted-foreground text-lg">{lesson5.example_section.ex2.result}</p>
                    </div>
                  </div>
                </div>

                {/* Example 3 */}
                <div>
                  <h3 className="text-lg font-bold mb-2">{lesson5.example_section.ex3.title}</h3>
                  <p className="text-muted-foreground text-lg mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.example_section.ex3.problem) }} />
                  <div className="my-3 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                    <div dangerouslySetInnerHTML={{ __html: renderMath(lesson5.example_section.ex3.problem_math) }} />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-lg">{lesson5.example_section.ex3.step1_title}</p>
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson5.example_section.ex3.step1_math) }} />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{lesson5.example_section.ex3.step2_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.example_section.ex3.step2_desc) }} />
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson5.example_section.ex3.step2_math) }} />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{lesson5.example_section.ex3.step3_title}</p>
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson5.example_section.ex3.step3_math) }} />
                      </div>
                    </div>
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="font-semibold text-lg text-green-700 dark:text-green-400">{lesson5.example_section.ex3.result_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.example_section.ex3.result) }} />
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Lesson 6: Differential Equations */}
        <div id="lesson-differential" className="max-w-4xl mx-auto mb-12">
          <Badge className="mb-3">Lesson 6</Badge>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold">{(course as any).differential_equations.lessons.lesson1_title}</h2>
          </div>

          <Accordion type="multiple" className="space-y-4">
            {/* Section 1: Introduction & Separable Equations */}
            <AccordionItem value="section6-1" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-semibold text-lg">{lesson6.section1.title1}</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section1.def1_1) }} />

                {/* Slope Field Plot */}
                {lesson6.section1.plot1_title && (
                  <div className="border rounded-lg p-4 bg-card mt-4 max-w-lg mx-auto">
                    <h5 className="font-semibold text-sm mb-2">{lesson6.section1.plot1_title}</h5>
                    <p className="text-xs text-muted-foreground mb-3" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section1.plot1_desc) }} />
                    <div className="w-full bg-muted/20 rounded-lg flex items-center justify-center p-4">
                      <svg viewBox="-3.5 -3.5 7 7" className="w-full max-w-lg" preserveAspectRatio="xMidYMid meet">
                        {/* Axes */}
                        <line x1="-3" y1="0" x2="3" y2="0" stroke="currentColor" strokeWidth="0.03" />
                        <line x1="0" y1="-3" x2="0" y2="3" stroke="currentColor" strokeWidth="0.03" />
                        
                        {/* Slope field for dy/dx = x */}
                        {Array.from({ length: 13 }, (_, i) => i - 6).map(ix => 
                          Array.from({ length: 13 }, (_, j) => j - 6).map(iy => {
                            const x = ix * 0.5;
                            const y = iy * 0.5;
                            const slope = x; // dy/dx = x
                            const angle = Math.atan(slope);
                            const len = 0.15;
                            const dx = len * Math.cos(angle);
                            const dy = -len * Math.sin(angle); // negative for SVG coords
                            return (
                              <line
                                key={`${ix}-${iy}`}
                                x1={x - dx}
                                y1={y - dy}
                                x2={x + dx}
                                y2={y + dy}
                                stroke="rgb(156, 163, 175)"
                                strokeWidth="0.02"
                              />
                            );
                          })
                        )}
                        
                        {/* Solution curve: y = x²/2 + 1 */}
                        <path
                          d={Array.from({ length: 61 }, (_, i) => {
                            const x = (i - 30) / 10;
                            const y = -(x * x / 2 + 1);
                            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                          }).join(' ')}
                          stroke="rgb(59, 130, 246)"
                          strokeWidth="0.08"
                          fill="none"
                        />
                        
                        {/* Axis labels */}
                        <text x="2.7" y="-0.2" fontSize="0.25" fill="currentColor">x</text>
                        <text x="0.2" y="-2.7" fontSize="0.25" fill="currentColor">y</text>
                      </svg>
                    </div>
                    <p className="text-xs text-center mt-2 text-blue-600 dark:text-blue-400">{lesson6.section1.plot1_description}</p>
                  </div>
                )}

                <h4 className="font-semibold text-lg mt-4">{lesson6.section1.def1_2}</h4>
                <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section1.text1_1) }} />
                <div className="my-4 p-4 bg-muted/30 rounded-lg overflow-x-auto">
                  <div dangerouslySetInnerHTML={{ __html: renderMath(lesson6.section1.math1_1) }} />
                </div>

                {/* Separable Example inline */}
                <div className="my-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">{lesson6.section1.ex1_1_title}</h5>
                  <p className="text-muted-foreground text-lg mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section1.ex1_1_problem) }} />
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section1.ex1_1_step1) }} />
                    <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                      <div dangerouslySetInnerHTML={{ __html: renderMath(lesson6.section1.ex1_1_math, false) }} />
                    </div>
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section1.ex1_1_step2) }} />
                    <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                      <div dangerouslySetInnerHTML={{ __html: renderMath(lesson6.section1.ex1_1_math2, false) }} />
                    </div>
                    <p className="font-semibold text-lg text-green-700 dark:text-green-400 mt-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section1.ex1_1_solution) }} />
                  </div>
                </div>

                <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <p className="text-muted-foreground text-lg">{lesson6.section1.warning1}</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 2: First-Order Linear Equations */}
            <AccordionItem value="section6-2" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-semibold text-lg">{lesson6.section2.title2}</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section2.def2_1) }} />
                <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section2.text2_1) }} />
                
                <h4 className="font-semibold text-lg mt-4">{lesson6.section2.def2_2_title}</h4>
                <ul className="list-none space-y-2 ml-0">
                  <li className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section2.step2_1) }} />
                  <li className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section2.step2_2) }} />
                  <li className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section2.step2_3) }} />
                  <li className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section2.step2_4) }} />
                </ul>

                {/* Integrating Factor Example inline */}
                <div className="my-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">{lesson6.section2.ex2_1_title}</h5>
                  <p className="text-muted-foreground text-lg mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section2.ex2_1_problem) }} />
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section2.ex2_1_step1) }} />
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section2.ex2_1_step2) }} />
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section2.ex2_1_step3) }} />
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section2.ex2_1_step4) }} />
                    <p className="font-semibold text-lg text-green-700 dark:text-green-400 mt-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section2.ex2_1_solution) }} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 3: Second-Order Equations */}
            <AccordionItem value="section6-3" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-semibold text-lg">{lesson6.section3.title3}</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section3.def3_1) }} />
                <div className="my-4 p-4 bg-muted/30 rounded-lg overflow-x-auto">
                  <div dangerouslySetInnerHTML={{ __html: renderMath(lesson6.section3.math3_1) }} />
                </div>
                <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section3.text3_1) }} />

                {/* Damped Oscillation Plot */}
                {lesson6.section3.plot3_title && (
                  <div className="border rounded-lg p-4 bg-card mt-4 max-w-4xl mx-auto">
                    <h5 className="font-semibold text-sm mb-2">{lesson6.section3.plot3_title}</h5>
                    <p className="text-xs text-muted-foreground mb-3" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section3.plot3_desc) }} />
                    <div className="w-full bg-muted/20 rounded-lg flex items-center justify-center p-4">
                      <svg viewBox="0 -1.2 10 2.4" className="w-full max-w-4xl" preserveAspectRatio="xMidYMid meet">
                        {/* Axes */}
                        <line x1="0" y1="0" x2="10" y2="0" stroke="currentColor" strokeWidth="0.03" />
                        
                        {/* Damped oscillation curve: e^(-0.5*x) * cos(3*x) */}
                        <path
                          d={Array.from({ length: 201 }, (_, i) => {
                            const x = i / 20;
                            const y = -Math.exp(-0.5 * x) * Math.cos(3 * x);
                            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                          }).join(' ')}
                          stroke="rgb(59, 130, 246)"
                          strokeWidth="0.04"
                          fill="none"
                        />
                        
                        {/* Envelope curves */}
                        <path
                          d={Array.from({ length: 201 }, (_, i) => {
                            const x = i / 20;
                            const y = -Math.exp(-0.5 * x);
                            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                          }).join(' ')}
                          stroke="rgb(239, 68, 68)"
                          strokeWidth="0.02"
                          strokeDasharray="0.1,0.05"
                          fill="none"
                        />
                        <path
                          d={Array.from({ length: 201 }, (_, i) => {
                            const x = i / 20;
                            const y = Math.exp(-0.5 * x);
                            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                          }).join(' ')}
                          stroke="rgb(239, 68, 68)"
                          strokeWidth="0.02"
                          strokeDasharray="0.1,0.05"
                          fill="none"
                        />
                        
                        {/* Axis labels */}
                        <text x="9.5" y="0.3" fontSize="0.25" fill="currentColor">t</text>
                        <text x="0.2" y="-1" fontSize="0.25" fill="currentColor">y</text>
                      </svg>
                    </div>
                    <p className="text-xs text-center mt-2 text-purple-600 dark:text-purple-400">{lesson6.section3.plot3_label}</p>
                  </div>
                )}

                <h4 className="font-semibold text-lg mt-4">{lesson6.section3.def3_2}</h4>
                <div className="my-4 p-4 bg-muted/30 rounded-lg overflow-x-auto">
                  <div dangerouslySetInnerHTML={{ __html: renderMath(lesson6.section3.math3_2) }} />
                </div>
                <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section3.text3_2) }} />

                {/* Example inline */}
                <div className="my-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">{lesson6.section3.ex3_1_title}</h5>
                  <p className="text-muted-foreground text-lg mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section3.ex3_1_problem) }} />
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section3.ex3_1_step1) }} />
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section3.ex3_1_step2) }} />
                    <p className="font-semibold text-lg text-green-700 dark:text-green-400 mt-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section3.ex3_1_solution) }} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 4: Initial Value Problems & Applications */}
            <AccordionItem value="section6-4" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-semibold text-lg">{lesson6.section4.title4}</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                <h4 className="font-semibold text-lg">{lesson6.section4.def4_1}</h4>
                <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section4.text4_1) }} />

                {/* Harmonic Motion Plot */}
                {lesson6.section4.plot4_title && (
                  <div className="border rounded-lg p-4 bg-card mt-4 max-w-lg mx-auto">
                    <h5 className="font-semibold text-sm mb-2">{lesson6.section4.plot4_title}</h5>
                    <p className="text-xs text-muted-foreground mb-3" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section4.plot4_desc) }} />
                    <div className="w-full bg-muted/20 rounded-lg flex items-center justify-center p-4">
                      <svg viewBox="0 -4.5 10 9" className="w-full max-w-lg" preserveAspectRatio="xMidYMid meet">
                        {/* Axes */}
                        <line x1="0" y1="0" x2="10" y2="0" stroke="currentColor" strokeWidth="0.05" />
                        
                        {/* Harmonic motion: 3*cos(2*x) */}
                        <path
                          d={Array.from({ length: 201 }, (_, i) => {
                            const x = i / 20;
                            const y = -3 * Math.cos(2 * x);
                            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                          }).join(' ')}
                          stroke="rgb(34, 197, 94)"
                          strokeWidth="0.08"
                          fill="none"
                        />
                        
                        {/* Reference lines */}
                        <line x1="0" y1="-3" x2="10" y2="-3" stroke="rgb(239, 68, 68)" strokeWidth="0.02" strokeDasharray="0.1,0.05" />
                        <line x1="0" y1="3" x2="10" y2="3" stroke="rgb(239, 68, 68)" strokeWidth="0.02" strokeDasharray="0.1,0.05" />
                        
                        {/* Axis labels */}
                        <text x="9.5" y="0.5" fontSize="0.3" fill="currentColor">t</text>
                        <text x="0.2" y="-3.5" fontSize="0.3" fill="currentColor">y</text>
                      </svg>
                    </div>
                    <p className="text-xs text-center mt-2 text-green-600 dark:text-green-400">{lesson6.section4.plot4_label}</p>
                  </div>
                )}

                <h4 className="font-semibold text-lg mt-4">{lesson6.section4.def4_2_title}</h4>
                <ul className="list-none space-y-2 ml-0">
                  <li className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section4.list4_1) }} />
                  <li className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section4.list4_2) }} />
                  <li className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section4.list4_3) }} />
                </ul>

                {/* IVP Example inline */}
                <div className="my-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">{lesson6.section4.ex4_1_title}</h5>
                  <p className="text-muted-foreground text-lg mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section4.ex4_1_problem) }} />
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section4.ex4_1_step1) }} />
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section4.ex4_1_step2) }} />
                    <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                      <div dangerouslySetInnerHTML={{ __html: renderMath(lesson6.section4.ex4_1_math, false) }} />
                    </div>
                    <p className="font-semibold text-lg text-green-700 dark:text-green-400 mt-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section4.ex4_1_solution) }} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Examples Section */}
            <AccordionItem value="section6-examples" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-semibold text-lg">{lesson6.example_section.title_ex}</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                {/* Example 1 */}
                <div className="mb-6 pb-6 border-b">
                  <h3 className="text-lg font-bold mb-2">{lesson6.example_section.ex1.title}</h3>
                  <p className="text-muted-foreground text-lg mb-2">{lesson6.example_section.ex1.problem}</p>
                  <div className="my-3 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                    <div dangerouslySetInnerHTML={{ __html: renderMath(lesson6.example_section.ex1.problem_math) }} />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-lg">{lesson6.example_section.ex1.step1_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.example_section.ex1.step1_desc) }} />
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson6.example_section.ex1.step1_math) }} />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{lesson6.example_section.ex1.step2_title}</p>
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson6.example_section.ex1.step2_math) }} />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{lesson6.example_section.ex1.step3_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.example_section.ex1.step3_desc) }} />
                    </div>
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="font-semibold text-lg text-green-700 dark:text-green-400">{lesson6.example_section.ex1.result_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderMath(lesson6.example_section.ex1.result, false) }} />
                    </div>
                  </div>
                </div>

                {/* Example 2 */}
                <div className="mb-6 pb-6 border-b">
                  <h3 className="text-lg font-bold mb-2">{lesson6.example_section.ex2.title}</h3>
                  <p className="text-muted-foreground text-lg mb-2">{lesson6.example_section.ex2.problem}</p>
                  <div className="my-3 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                    <div dangerouslySetInnerHTML={{ __html: renderMath(lesson6.example_section.ex2.problem_math) }} />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-lg">{lesson6.example_section.ex2.step1_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.example_section.ex2.step1_desc) }} />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{lesson6.example_section.ex2.step2_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.example_section.ex2.step2_desc) }} />
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson6.example_section.ex2.step2_math) }} />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{lesson6.example_section.ex2.step3_title}</p>
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson6.example_section.ex2.step3_math) }} />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{lesson6.example_section.ex2.step4_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.example_section.ex2.step4_desc) }} />
                    </div>
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="font-semibold text-lg text-green-700 dark:text-green-400">{lesson6.example_section.ex2.result_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderMath(lesson6.example_section.ex2.result, false) }} />
                    </div>
                  </div>
                </div>

                {/* Example 3 */}
                <div>
                  <h3 className="text-lg font-bold mb-2">{lesson6.example_section.ex3.title}</h3>
                  <p className="text-muted-foreground text-lg mb-2">{lesson6.example_section.ex3.problem}</p>
                  <div className="my-3 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                    <div dangerouslySetInnerHTML={{ __html: renderMath(lesson6.example_section.ex3.problem_math) }} />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-lg">{lesson6.example_section.ex3.step1_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.example_section.ex3.step1_desc) }} />
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson6.example_section.ex3.step1_math) }} />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{lesson6.example_section.ex3.step2_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.example_section.ex3.step2_desc) }} />
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson6.example_section.ex3.step2_math) }} />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{lesson6.example_section.ex3.step3_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.example_section.ex3.step3_desc) }} />
                    </div>
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="font-semibold text-lg text-green-700 dark:text-green-400">{lesson6.example_section.ex3.result_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderMath(lesson6.example_section.ex3.result, false) }} />
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Topics Grid */}
        <div className="max-w-6xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
            {t.topicsCovered}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section, index) => {
              const sectionData = t.sections[section.id as keyof typeof t.sections];
              return (
                <Card
                  key={section.id}
                  className={`p-6 bg-gradient-to-br ${section.color} ${section.borderColor} transition-all duration-300 hover:shadow-lg animate-slide-up cursor-pointer group border-2`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => scrollToLesson(section.lessonId)}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-background/50 flex items-center justify-center text-xl font-bold group-hover:scale-110 transition-transform">
                      {sectionData.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1 text-foreground">
                        {sectionData.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {sectionData.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {sectionData.topics.map((topic: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{topic}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Features */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
            What You'll Learn
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(t.features).map(([key, value], index) => (
              <Card
                key={key}
                className="p-6 text-center hover:shadow-lg transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CheckCircle className="w-10 h-10 mx-auto mb-3 text-green-500" />
                <p className="text-sm text-muted-foreground">{value}</p>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CalculusLearning;
