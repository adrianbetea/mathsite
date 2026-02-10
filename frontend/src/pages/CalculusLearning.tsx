import { ArrowLeft, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
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

  return (
    <div className="min-h-screen relative">
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

        {/* Lesson 1: Limits & Continuity */}
        <div id="lesson-limits" className="max-w-4xl mx-auto mb-12">
          <div className="mb-6">
            <Badge className="mb-3">Lesson 1</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">{course.limits.title}</h2>
            <p className="text-muted-foreground">{course.limits.description}</p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
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

          <Accordion type="single" collapsible className="space-y-4">
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
                      <p className="text-xs text-center mt-2 text-green-600 dark:text-green-400">✓ Differentiable (smooth curve)</p>
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
                      <p className="text-xs text-center mt-2 text-red-600 dark:text-red-400">✗ Not differentiable (sharp corner)</p>
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
