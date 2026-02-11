import { ArrowLeft, BookOpen, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/contexts/LanguageContext";
import { linearAlgebraLearningTranslations } from "@/lib/translations/linear_algebra_learning_translations";
import { linearAlgebraCourse } from "@/lib/translations/courses/linear_algebra_course";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import * as katex from "katex";
import "katex/dist/katex.min.css";

const LinearAlgebraLearning = () => {
  const { language, languageCode } = useLanguage();
  const t = linearAlgebraLearningTranslations[language as keyof typeof linearAlgebraLearningTranslations] || linearAlgebraLearningTranslations.en;
  const course = linearAlgebraCourse[language as keyof typeof linearAlgebraCourse] || linearAlgebraCourse.en;
  const lesson1 = course.matrixBasics.lessons.lesson1;
  const lesson2 = course.determinants.lessons.lesson2;
  const lesson3 = (course as any).matrixInverse.lessons.lesson3;
  const lesson4 = (course as any).linearEquations.lessons.lesson4;
  const lesson5 = (course as any).vectorSpaces.lessons.lesson5;
  const lesson6 = (course as any).eigenvalues.lessons.lesson6;

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
      id: "matrices",
      lessonId: "lesson-matrices",
      color: "from-blue-500/10 to-blue-500/5 hover:from-blue-500/20 hover:to-blue-500/10",
      borderColor: "hover:border-blue-500/30"
    },
    {
      id: "determinants",
      lessonId: "lesson-determinants",
      color: "from-purple-500/10 to-purple-500/5 hover:from-purple-500/20 hover:to-purple-500/10",
      borderColor: "hover:border-purple-500/30"
    },
    {
      id: "inverse",
      lessonId: "lesson-inverse",
      color: "from-pink-500/10 to-pink-500/5 hover:from-pink-500/20 hover:to-pink-500/10",
      borderColor: "hover:border-pink-500/30"
    },
    {
      id: "systems",
      lessonId: "lesson-systems",
      color: "from-green-500/10 to-green-500/5 hover:from-green-500/20 hover:to-green-500/10",
      borderColor: "hover:border-green-500/30"
    },
    {
      id: "vectors",
      lessonId: "lesson-vectors",
      color: "from-orange-500/10 to-orange-500/5 hover:from-orange-500/20 hover:to-orange-500/10",
      borderColor: "hover:border-orange-500/30"
    },
    {
      id: "eigenvalues",
      lessonId: "lesson-eigenvalues",
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

        {/* Lesson 1: Matrix Basics */}
        <div id="lesson-matrices" className="max-w-4xl mx-auto mb-12">
          <div className="mb-6">
            <Badge className="mb-3">Lesson 1</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">{course.matrixBasics.lessons.lesson1_title}</h2>
            <p className="text-muted-foreground">{course.matrixBasics.description}</p>
          </div>

          <Accordion type="multiple" className="space-y-4">
            {/* Section 1: What is a Matrix? */}
            <AccordionItem value="section1" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">
                {lesson1.section1.title1}
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="space-y-4">
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.section1.def1_1) }} />
                  <div 
                    className="my-4 overflow-x-auto"
                    dangerouslySetInnerHTML={{ __html: renderMath(lesson1.section1.ex1_1, true) }}
                  />
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.section1.expl1_1) }} />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 2: Matrix Addition and Vectors */}
            <AccordionItem value="section2" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">
                {lesson1.section2.title2}
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="space-y-4">
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.section2.def1_2) }} />
                  <div 
                    className="my-4 text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.section2.ex1_2) }}
                  />
                  <div 
                    className="my-4 text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.section2.ex1_3) }}
                  />
                </div>
                
              </AccordionContent>
            </AccordionItem>

            {/* Section 3: Matrix Multiplication */}
            <AccordionItem value="section3" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">
                {lesson1.section3.title3}
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="space-y-4">
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.section3.def1_3) }} />
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.section3.def1_3_2) }} />
                  <p className="text-muted-foreground italic" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.section3.text1_3) }} />
                  <p className="text-muted-foreground font-semibold mt-4">{lesson1.section3.text2_3}</p>
                  <div 
                    className="my-4 overflow-x-auto"
                    dangerouslySetInnerHTML={{ __html: renderMath(lesson1.section3.ex1_3, true) }}
                  />
                  <div 
                    className="my-4 overflow-x-auto"
                    dangerouslySetInnerHTML={{ __html: renderMath(lesson1.section3.ex1_3_2, true) }}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 4: Transpose of a Matrix */}
            <AccordionItem value="section4" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">
                {lesson1.section4.title4}
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="space-y-4">
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.section4.def1_4) }} />
                  <div 
                    className="my-4 overflow-x-auto"
                    dangerouslySetInnerHTML={{ __html: renderMath(lesson1.section4.ex1_4, true) }}
                  />
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.section4.def2_4) }} />
                  <div className="mt-4">
                    <p className="font-semibold mb-2">{lesson1.section4.proposition1_4}</p>
                    <ul className="list-none space-y-1 ml-4 text-muted-foreground">
                      <li dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.section4.item1_4) }} />
                      <li dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.section4.item2_4) }} />
                      <li dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.section4.item3_4) }} />
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 5: Algebra of Matrices */}
            <AccordionItem value="section5" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">
                {lesson1.section5.title5}
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="space-y-4">
                  <p className="text-muted-foreground">{lesson1.section5.def1_5}</p>
                  <p className="font-semibold">{lesson1.section5.proposition1_5}</p>
                  <ul className="list-none space-y-1 ml-4 text-muted-foreground">
                    <li dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.section5.item1_5) }} />
                    <li dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.section5.item2_5) }} />
                    <li dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.section5.item3_5) }} />
                    <li dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.section5.item4_5) }} />
                    <li dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.section5.item5_5) }} />
                    <li dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.section5.item6_5) }} />
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Examples Section */}
            <AccordionItem value="examples" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">
                {lesson1.example_section.title_ex}
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="space-y-8">
                  {/* Example 1 */}
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold mb-3">{lesson1.example_section.example1.title}</h4>
                    <p className="text-muted-foreground mb-3 font-medium">Problem:</p>
                    <div 
                      className="mb-4"
                      dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.example_section.example1.problem) }}
                    />
                    
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold text-sm mb-1">{lesson1.example_section.example1.step1_title}</p>
                        <p className="text-sm text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.example_section.example1.step1_desc) }} />
                        <div 
                          className="overflow-x-auto"
                          dangerouslySetInnerHTML={{ __html: renderMath(lesson1.example_section.example1.step1_math, true) }}
                        />
                      </div>
                      
                      <div>
                        <p className="font-semibold text-sm mb-1">{lesson1.example_section.example1.step2_title}</p>
                        <p className="text-sm text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.example_section.example1.step2_desc) }} />
                        <div 
                          className="overflow-x-auto"
                          dangerouslySetInnerHTML={{ __html: renderMath(lesson1.example_section.example1.step2_math, true) }}
                        />
                      </div>
                      
                      <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded">
                        <p className="font-semibold text-sm mb-2 text-green-700 dark:text-green-400">{lesson1.example_section.example1.result_title}</p>
                        <div 
                          dangerouslySetInnerHTML={{ __html: renderMath(lesson1.example_section.example1.result, true) }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Example 2 */}
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold mb-3">{lesson1.example_section.example2.title}</h4>
                    <p className="text-muted-foreground mb-3 font-medium">Problem:</p>
                    <div 
                      className="mb-4"
                      dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.example_section.example2.problem) }}
                    />
                    
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold text-sm mb-1">{lesson1.example_section.example2.step1_title}</p>
                        <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.example_section.example2.step1_desc) }} />
                      </div>
                      
                      <div>
                        <p className="font-semibold text-sm mb-1">{lesson1.example_section.example2.step2_title}</p>
                        <p className="text-sm text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.example_section.example2.step2_desc) }} />
                        <div 
                          className="overflow-x-auto"
                          dangerouslySetInnerHTML={{ __html: renderMath(lesson1.example_section.example2.step2_math, true) }}
                        />
                      </div>
                      
                      <div>
                        <p className="font-semibold text-sm mb-1">{lesson1.example_section.example2.step3_title}</p>
                        <div 
                          className="overflow-x-auto"
                          dangerouslySetInnerHTML={{ __html: renderMath(lesson1.example_section.example2.step3_math, true) }}
                        />
                      </div>
                      
                      <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded">
                        <p className="font-semibold text-sm mb-2 text-green-700 dark:text-green-400">{lesson1.example_section.example2.result_title}</p>
                        <div 
                          dangerouslySetInnerHTML={{ __html: renderMath(lesson1.example_section.example2.result, true) }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Example 3 */}
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold mb-3">{lesson1.example_section.example3.title}</h4>
                    <p className="text-muted-foreground mb-3 font-medium">Problem:</p>
                    <div 
                      className="mb-4"
                      dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.example_section.example3.problem) }}
                    />
                    
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold text-sm mb-1">{lesson1.example_section.example3.step1_title}</p>
                        <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.example_section.example3.step1_desc) }} />
                      </div>
                      
                      <div>
                        <p className="font-semibold text-sm mb-1">{lesson1.example_section.example3.step2_title}</p>
                        <p className="text-sm text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.example_section.example3.step2_desc) }} />
                        <div 
                          className="overflow-x-auto"
                          dangerouslySetInnerHTML={{ __html: renderMath(lesson1.example_section.example3.step2_math, true) }}
                        />
                      </div>
                      
                      <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded">
                        <p className="font-semibold text-sm mb-2 text-green-700 dark:text-green-400">{lesson1.example_section.example3.result_title}</p>
                        <div 
                          dangerouslySetInnerHTML={{ __html: renderMath(lesson1.example_section.example3.result, true) }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Lesson 2: Determinants */}
        <div id="lesson-determinants" className="max-w-4xl mx-auto mb-12">
          <div className="mb-6">
            <Badge className="mb-3">Lesson 2</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">{course.determinants.lessons.lesson2_title}</h2>
            <p className="text-muted-foreground">{course.determinants.description}</p>
          </div>

          <Accordion type="multiple" className="space-y-4">
            {/* Section 1: Introduction to Determinants */}
            <AccordionItem value="det-section1" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">
                {lesson2.section1.title1}
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="space-y-4">
                  <p className="text-muted-foreground">{lesson2.section1.def1_1}</p>
                  <p className="text-muted-foreground font-semibold">{lesson2.section1.def2_2}</p>
                  <div 
                    className="my-4 overflow-x-auto"
                    dangerouslySetInnerHTML={{ __html: renderMath(lesson2.section1.def2_2_formula, true) }}
                  />
                  <p className="text-muted-foreground font-semibold">{lesson2.section1.def2_2_explanation}</p>
                  <ul className="list-none space-y-2 ml-4 text-muted-foreground">
                    <li dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section1.def2_2_item1_1) }} />
                    <li dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section1.def2_2_item1_2) }} />
                    <li dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section1.def2_2_item1_3) }} />
                  </ul>
                  <p className="text-muted-foreground mt-4" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section1.text_1_1) }} />
                  <div 
                    className="my-4 overflow-x-auto"
                    dangerouslySetInnerHTML={{ __html: renderMath(lesson2.section1.ex1_1, true) }}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 2: 2x2 and 3x3 Determinants */}
            <AccordionItem value="det-section2" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">
                {lesson2.section2.title2}
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="space-y-4">
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section2.def1_2) }} />
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section2.ex1_2) }} />
                  <p className="text-muted-foreground mt-6" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section2.def2_2) }} />
                  <div 
                    className="my-4 overflow-x-auto"
                    dangerouslySetInnerHTML={{ __html: renderMath(lesson2.section2.def2_2_formula, true) }}
                  />
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section2.ex2_2) }} />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 3: Cofactor Expansion */}
            <AccordionItem value="det-section3" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">
                {lesson2.section3.titl3}
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="space-y-4">
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section3.def1_3) }} />
                  <p className="text-muted-foreground mt-4" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section3.def2_3) }} />
                  <div 
                    className="my-4 overflow-x-auto"
                    dangerouslySetInnerHTML={{ __html: renderMath(lesson2.section3.def2_3_formula, true) }}
                  />
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section3.def2_3_explanation) }} />
                  <p className="text-muted-foreground mt-4" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section3.ex1_3) }} />
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section3.ex1_3_end) }} />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 4: Properties of Determinants */}
            <AccordionItem value="det-section4" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">
                {lesson2.section4.title4}
              </AccordionTrigger>
              <AccordionContent className="pb-8">
                <div className="space-y-4">
                  <p className="text-muted-foreground">{lesson2.section4.description}</p>
                  
                  <div className="mt-4">
                    <p className="font-semibold mb-1">{lesson2.section4.prop1_name}</p>
                    <p className="text-muted-foreground text-sm mb-2">{lesson2.section4.prop1_description}</p>
                    <div 
                      className="overflow-x-auto"
                      dangerouslySetInnerHTML={{ __html: renderMath(lesson2.section4.prop1_formula, false) }}
                    />
                  </div>

                  <div className="mt-4">
                    <p className="font-semibold mb-1">{lesson2.section4.prop2_name}</p>
                    <p className="text-muted-foreground text-sm mb-2">{lesson2.section4.prop2_description}</p>
                    <div 
                      className="overflow-x-auto"
                      dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section4.prop2_formula) }}
                    />
                  </div>

                  <div className="mt-4">
                    <p className="font-semibold mb-1">{lesson2.section4.prop3_name}</p>
                    <p className="text-muted-foreground text-sm mb-2">{lesson2.section4.prop3_description}</p>
                    <div 
                      className="overflow-x-auto"
                      dangerouslySetInnerHTML={{ __html: renderMath(lesson2.section4.prop3_formula, true) }}
                    />
                  </div>

                  <div className="mt-4">
                    <p className="font-semibold mb-1">{lesson2.section4.prop4_name}</p>
                    <p className="text-muted-foreground text-sm mb-">{lesson2.section4.prop4_description}</p>
                    <div 
                      className="overflow-x-auto"
                      dangerouslySetInnerHTML={{ __html: renderMath(lesson2.section4.prop4_formula, true) }}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Examples Section */}
            <AccordionItem value="det-examples" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">
                {lesson2.example_section.title_ex}
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="space-y-8">
                  {/* Example 1 */}
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold mb-3">{lesson2.example_section.ex1.title}</h4>
                    <p className="text-muted-foreground mb-3 font-medium">Problem:</p>
                    <div 
                      className="mb-4"
                      dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.example_section.ex1.problem) }}
                    />
                    
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold text-sm mb-1">{lesson2.example_section.ex1.step1_title}</p>
                        <p className="text-sm text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.example_section.ex1.step1_desc) }} />
                      </div>
                      
                      <div>
                        <p className="font-semibold text-sm mb-1">{lesson2.example_section.ex1.step2_title}</p>
                        <p className="text-sm text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.example_section.ex1.step2_desc) }} />
                        <div 
                          className="overflow-x-auto"
                          dangerouslySetInnerHTML={{ __html: renderMath(lesson2.example_section.ex1.step2_math, true) }}
                        />
                      </div>
                      
                      <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded">
                        <p className="font-semibold text-sm mb-2 text-green-700 dark:text-green-400">{lesson2.example_section.ex1.result_title}</p>
                        <div 
                          dangerouslySetInnerHTML={{ __html: renderMath(lesson2.example_section.ex1.result, true) }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Example 2 */}
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold mb-3">{lesson2.example_section.ex2.title}</h4>
                    <p className="text-muted-foreground mb-3 font-medium">Problem:</p>
                    <div 
                      className="mb-4"
                      dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.example_section.ex2.problem) }}
                    />
                    
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold text-sm mb-1">{lesson2.example_section.ex2.step1_title}</p>
                        <p className="text-sm text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.example_section.ex2.step1_desc) }} />
                        <div 
                          className="overflow-x-auto"
                          dangerouslySetInnerHTML={{ __html: renderMath(lesson2.example_section.ex2.step1_math, true) }}
                        />
                      </div>
                      
                      <div>
                        <p className="font-semibold text-sm mb-1">{lesson2.example_section.ex2.step2_title}</p>
                        <p className="text-sm text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.example_section.ex2.step2_desc) }} />
                        <div 
                          className="overflow-x-auto"
                          dangerouslySetInnerHTML={{ __html: renderMath(lesson2.example_section.ex2.step2_math, true) }}
                        />
                      </div>

                      <div>
                        <p className="font-semibold text-sm mb-1">{lesson2.example_section.ex2.step3_title}</p>
                        <p className="text-sm text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.example_section.ex2.step3_desc) }} />
                      </div>
                      
                      <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded">
                        <p className="font-semibold text-sm mb-2 text-green-700 dark:text-green-400">{lesson2.example_section.ex2.result_title}</p>
                        <div 
                          dangerouslySetInnerHTML={{ __html: renderMath(lesson2.example_section.ex2.result, true) }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Example 3 */}
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold mb-3">{lesson2.example_section.ex3.title}</h4>
                    <p className="text-muted-foreground mb-3 font-medium">Problem:</p>
                    <div 
                      className="mb-4"
                      dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.example_section.ex3.problem) }}
                    />
                    
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold text-sm mb-1">{lesson2.example_section.ex3.step1_title}</p>
                        <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.example_section.ex3.step1_desc) }} />
                      </div>
                      
                      <div>
                        <p className="font-semibold text-sm mb-1">{lesson2.example_section.ex3.step2_title}</p>
                        <p className="text-sm text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.example_section.ex3.step2_desc) }} />
                        <div 
                          className="overflow-x-auto"
                          dangerouslySetInnerHTML={{ __html: renderMath(lesson2.example_section.ex3.step2_math, true) }}
                        />
                      </div>
                      
                      <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded">
                        <p className="font-semibold text-sm mb-2 text-green-700 dark:text-green-400">{lesson2.example_section.ex3.result_title}</p>
                        <div 
                          dangerouslySetInnerHTML={{ __html: renderMath(lesson2.example_section.ex3.result, true) }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Lesson 3: Matrix Inverse */}
        <div id="lesson-inverse" className="max-w-4xl mx-auto mb-12">
          <div className="mb-6">
            <Badge className="mb-3">Lesson 3</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">{(course as any).matrixInverse.lessons.lesson3_title}</h2>
            <p className="text-muted-foreground">{(course as any).matrixInverse.description}</p>
          </div>

          <Accordion type="multiple" className="space-y-4">
            {/* Section 1: Definition of Matrix Inverse */}
            <AccordionItem value="inv-section1" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">
                {lesson3.section1.title1}
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="space-y-4">
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section1.def1_1) }} />
                  <p className="text-muted-foreground font-semibold" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section1.proposition1_1) }} />
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section1.proof1_1) }} />
                  <div 
                    className="my-4 overflow-x-auto"
                    dangerouslySetInnerHTML={{ __html: renderMath(lesson3.section1.proof1_1_math, true) }}
                  />
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section1.expl1_1) }} />
                  <p className="text-muted-foreground mt-4" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section1.ex1_1) }} />
                  <ul className="list-none space-y-2 ml-4 text-muted-foreground text-sm">
                    <li dangerouslySetInnerHTML={{ __html: renderMath(lesson3.section1.ex1_1_list1, false) }} />
                    <li dangerouslySetInnerHTML={{ __html: renderMath(lesson3.section1.ex1_1_list2, false) }} />
                    <li dangerouslySetInnerHTML={{ __html: renderMath(lesson3.section1.ex1_1_list3, false) }} />
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 2: Method 1 for Finding the Inverse */}
            <AccordionItem value="inv-section2" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">
                {lesson3.section2.title2}
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="space-y-4">
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section2.def1_2) }} />
                  <p className="text-muted-foreground mt-4" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section2.text1_2) }} />
                  <p className="text-muted-foreground font-semibold" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section2.method1_1) }} />
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section2.ex1_2) }} />
                  <div 
                    className="my-4 overflow-x-auto"
                    dangerouslySetInnerHTML={{ __html: renderMath(lesson3.section2.ex1_2_matrix, true) }}
                  />
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section2.ex1_2_steps1) }} />
                  <div 
                    className="my-4 overflow-x-auto text-sm"
                    dangerouslySetInnerHTML={{ __html: renderMath(lesson3.section2.ex1_2_steps2, true) }}
                  />
                  <div 
                    className="my-4 overflow-x-auto text-sm"
                    dangerouslySetInnerHTML={{ __html: renderMath(lesson3.section2.ex1_2_steps3, true) }}
                  />
                  <div 
                    className="my-4 overflow-x-auto"
                    dangerouslySetInnerHTML={{ __html: renderMath(lesson3.section2.ex1_2_steps4, true) }}
                  />
                  <div 
                    className="my-4 overflow-x-auto"
                    dangerouslySetInnerHTML={{ __html: renderMath(lesson3.section2.ex1_2_result, true) }}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 3: Method 2 for Finding the Inverse */}
            <AccordionItem value="inv-section3" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">
                {lesson3.section3.title2}
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="space-y-4">
                  <p className="text-muted-foreground font-semibold" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section3.method2_1) }} />
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section3.ex2_2) }} />
                  <div 
                    className="my-4 overflow-x-auto"
                    dangerouslySetInnerHTML={{ __html: renderMath(lesson3.section3.ex2_2_matrix, true) }}
                  />
                  
                  <div className="mt-4">
                    <p className="font-semibold text-sm mb-1" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section3.ex2_2_steps1) }} />
                    <div 
                      className="overflow-x-auto"
                      dangerouslySetInnerHTML={{ __html: renderMath(lesson3.section3.ex2_2_steps1_math, true) }}
                    />
                  </div>

                  <div className="mt-4">
                    <p className="font-semibold text-sm mb-1" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section3.ex2_2_steps2) }} />
                    <p className="text-muted-foreground text-sm mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section3.ex2_2_steps2_desc) }} />
                    <div className="space-y-2 text-sm">
                      <div dangerouslySetInnerHTML={{ __html: renderMath(lesson3.section3.ex2_2_steps2_math, false) }} />
                      <div dangerouslySetInnerHTML={{ __html: renderMath(lesson3.section3.ex2_2_steps2_math2, false) }} />
                      <div dangerouslySetInnerHTML={{ __html: renderMath(lesson3.section3.ex2_2_steps2_math3, false) }} />
                      <div dangerouslySetInnerHTML={{ __html: renderMath(lesson3.section3.ex2_2_steps2_math4, false) }} />
                      <div dangerouslySetInnerHTML={{ __html: renderMath(lesson3.section3.ex2_2_steps2_math5, false) }} />
                      <div dangerouslySetInnerHTML={{ __html: renderMath(lesson3.section3.ex2_2_steps2_math6, false) }} />
                      <div dangerouslySetInnerHTML={{ __html: renderMath(lesson3.section3.ex2_2_steps2_math7, false) }} />
                      <div dangerouslySetInnerHTML={{ __html: renderMath(lesson3.section3.ex2_2_steps2_math8, false) }} />
                      <div dangerouslySetInnerHTML={{ __html: renderMath(lesson3.section3.ex2_2_steps2_math9, false) }} />
                    </div>
                    <div 
                      className="my-4 overflow-x-auto"
                      dangerouslySetInnerHTML={{ __html: renderMath(lesson3.section3.ex2_2_steps2_matrix, true) }}
                    />
                  </div>

                  <div className="mt-4">
                    <p className="font-semibold text-sm mb-1" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section3.ex2_2_steps3) }} />
                    <div 
                      className="overflow-x-auto"
                      dangerouslySetInnerHTML={{ __html: renderMath(lesson3.section3.ex2_2_steps3_math, true) }}
                    />
                  </div>

                  <div className="mt-4">
                    <p className="font-semibold text-sm mb-1" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section3.ex2_2_steps4) }} />
                    <div 
                      className="overflow-x-auto"
                      dangerouslySetInnerHTML={{ __html: renderMath(lesson3.section3.ex2_2_result, true) }}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 4: Properties of Invertible Matrices */}
            <AccordionItem value="inv-section4" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">
                {lesson3.section4.title4}
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="space-y-4">
                  <p className="text-muted-foreground">{lesson3.section4.description}</p>
                  
                  <div className="mt-4">
                    <p className="font-semibold mb-1">{lesson3.section4.prop1_title}</p>
                    <p className="text-muted-foreground text-sm mb-2">{lesson3.section4.prop1_desc}</p>
                    <div 
                      className="overflow-x-auto"
                      dangerouslySetInnerHTML={{ __html: renderMath(lesson3.section4.prop1_math, true) }}
                    />
                  </div>

                  <div className="mt-4">
                    <p className="font-semibold mb-1">{lesson3.section4.prop2_title}</p>
                    <p className="text-muted-foreground text-sm mb-2">{lesson3.section4.prop2_desc}</p>
                    <div 
                      className="overflow-x-auto"
                      dangerouslySetInnerHTML={{ __html: renderMath(lesson3.section4.prop2_math, true) }}
                    />
                  </div>

                  <div className="mt-4">
                    <p className="font-semibold mb-1">{lesson3.section4.prop3_title}</p>
                    <p className="text-muted-foreground text-sm mb-2">{lesson3.section4.prop3_desc}</p>
                    <div 
                      className="overflow-x-auto"
                      dangerouslySetInnerHTML={{ __html: renderMath(lesson3.section4.prop3_math, true) }}
                    />
                  </div>

                  <div className="mt-4">
                    <p className="font-semibold mb-1">{lesson3.section4.prop4_title}</p>
                    <p className="text-muted-foreground text-sm mb-2">{lesson3.section4.prop4_desc}</p>
                    <div 
                      className="overflow-x-auto"
                      dangerouslySetInnerHTML={{ __html: renderMath(lesson3.section4.prop4_math, true) }}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 5: Applications of Matrix Inverses */}
            <AccordionItem value="inv-section5" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">
                {lesson3.section5.title5}
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="space-y-4">
                  <p className="text-muted-foreground">{lesson3.section5.description}</p>
                  
                  <div className="mt-4">
                    <p className="font-semibold mb-2">{lesson3.section5.app1_title}</p>
                    <p className="text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section5.app1_desc) }} />
                    <p className="text-muted-foreground mt-4">{lesson3.section5.ex1_5}</p>
                    <div 
                      className="my-4 overflow-x-auto"
                      dangerouslySetInnerHTML={{ __html: renderMath(lesson3.section5.ex1_5_equations, true) }}
                    />
                    <div 
                      className="my-4 overflow-x-auto"
                      dangerouslySetInnerHTML={{ __html: renderMath(lesson3.section5.ex1_5_matrix, true) }}
                    />
                    <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section5.ex1_5_solution) }} />
                    
                    <div className="space-y-3 mt-4">
                      <div>
                        <p className="font-semibold text-sm mb-1" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section5.ex1_5_steps1) }} />
                        <div 
                          className="overflow-x-auto"
                          dangerouslySetInnerHTML={{ __html: renderMath(lesson3.section5.ex1_5_steps1_math, true) }}
                        />
                      </div>
                      
                      <div>
                        <p className="font-semibold text-sm mb-1" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section5.ex1_5_steps2) }} />
                        <div 
                          className="overflow-x-auto"
                          dangerouslySetInnerHTML={{ __html: renderMath(lesson3.section5.ex1_5_steps2_math, true) }}
                        />
                      </div>
                      
                      <div>
                        <p className="font-semibold text-sm mb-1" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section5.ex1_5_steps3) }} />
                        <div 
                          className="overflow-x-auto"
                          dangerouslySetInnerHTML={{ __html: renderMath(lesson3.section5.ex1_5_steps3_math, true) }}
                        />
                      </div>
                      
                      <div>
                        <p className="font-semibold text-sm mb-1" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section5.ex1_5_steps4) }} />
                        <div 
                          className="overflow-x-auto"
                          dangerouslySetInnerHTML={{ __html: renderMath(lesson3.section5.ex1_5_steps4_math, true) }}
                        />
                      </div>

                      <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded">
                        <p className="font-semibold text-sm text-green-700 dark:text-green-400">{lesson3.section5.ex1_5_result}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Examples Section */}
            <AccordionItem value="inv-examples" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">
                {(lesson3 as any).example_section.title_ex}
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="space-y-8">
                  {/* Example 1 */}
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold mb-3">{(lesson3 as any).example_section.ex1.ex1_title}</h4>
                    <p className="text-muted-foreground mb-3 font-medium">{(lesson3 as any).example_section.ex1.ex1_problem}</p>
                    <div 
                      className="mb-4 overflow-x-auto"
                      dangerouslySetInnerHTML={{ __html: renderMath((lesson3 as any).example_section.ex1.ex1_matrix, true) }}
                    />
                    
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold text-sm mb-1">{(lesson3 as any).example_section.ex1.ex1_step1_title}</p>
                        <div 
                          className="overflow-x-auto"
                          dangerouslySetInnerHTML={{ __html: renderMath((lesson3 as any).example_section.ex1.ex1_step1_math, true) }}
                        />
                      </div>
                      
                      <div>
                        <p className="font-semibold text-sm mb-1">{(lesson3 as any).example_section.ex1.ex1_step2_title}</p>
                        <p className="text-sm text-muted-foreground mb-2">{(lesson3 as any).example_section.ex1.ex1_step2_desc}</p>
                        <div 
                          className="overflow-x-auto"
                          dangerouslySetInnerHTML={{ __html: renderMath((lesson3 as any).example_section.ex1.ex1_step2_math, true) }}
                        />
                      </div>
                      
                      <div>
                        <p className="font-semibold text-sm mb-1">{(lesson3 as any).example_section.ex1.ex1_step3_title}</p>
                        <p className="text-sm text-muted-foreground mb-2">{(lesson3 as any).example_section.ex1.ex1_step3_desc}</p>
                        <div 
                          className="overflow-x-auto"
                          dangerouslySetInnerHTML={{ __html: renderMath((lesson3 as any).example_section.ex1.ex1_step3_math, true) }}
                        />
                      </div>
                      
                      <div>
                        <p className="font-semibold text-sm mb-1">{(lesson3 as any).example_section.ex1.ex1_step4_title}</p>
                        <p className="text-sm text-muted-foreground mb-2">{(lesson3 as any).example_section.ex1.ex1_step4_desc}</p>
                        <div 
                          className="overflow-x-auto"
                          dangerouslySetInnerHTML={{ __html: renderMath((lesson3 as any).example_section.ex1.ex1_step4_math, true) }}
                        />
                      </div>
                      
                      <div>
                        <p className="font-semibold text-sm mb-1">{(lesson3 as any).example_section.ex1.ex1_step5_title}</p>
                        <p className="text-sm text-muted-foreground mb-2">{(lesson3 as any).example_section.ex1.ex1_step5_desc}</p>
                        <div 
                          className="overflow-x-auto"
                          dangerouslySetInnerHTML={{ __html: renderMath((lesson3 as any).example_section.ex1.ex1_step5_math, true) }}
                        />
                      </div>
                      
                      <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded">
                        <p className="font-semibold text-sm mb-2 text-green-700 dark:text-green-400">Final Answer</p>
                        <div 
                          dangerouslySetInnerHTML={{ __html: renderMath((lesson3 as any).example_section.ex1.ex1_result, true) }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Example 2 */}
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold mb-3">{(lesson3 as any).example_section.ex2.ex2_title}</h4>
                    <p className="text-muted-foreground mb-3 font-medium">{(lesson3 as any).example_section.ex2.ex2_problem}</p>
                    <div 
                      className="mb-4 overflow-x-auto"
                      dangerouslySetInnerHTML={{ __html: renderMath((lesson3 as any).example_section.ex2.ex2_matrix, true) }}
                    />
                    
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold text-sm mb-1">{(lesson3 as any).example_section.ex2.ex2_step1_title}</p>
                        <div 
                          className="overflow-x-auto"
                          dangerouslySetInnerHTML={{ __html: renderMath((lesson3 as any).example_section.ex2.ex2_step1_math, true) }}
                        />
                      </div>
                      
                      <div>
                        <p className="font-semibold text-sm mb-1">{(lesson3 as any).example_section.ex2.ex2_step2_title}</p>
                        <div className="text-sm space-y-1">
                          <div dangerouslySetInnerHTML={{ __html: renderMath((lesson3 as any).example_section.ex2.ex2_step2_row1, false) }} />
                          <div dangerouslySetInnerHTML={{ __html: renderMath((lesson3 as any).example_section.ex2.ex2_step2_row2, false) }} />
                          <div dangerouslySetInnerHTML={{ __html: renderMath((lesson3 as any).example_section.ex2.ex2_step2_row3, false) }} />
                        </div>
                        <div 
                          className="mt-2 overflow-x-auto"
                          dangerouslySetInnerHTML={{ __html: renderMath((lesson3 as any).example_section.ex2.ex2_step2_matrix, true) }}
                        />
                      </div>
                      
                      <div>
                        <p className="font-semibold text-sm mb-1">{(lesson3 as any).example_section.ex2.ex2_step3_title}</p>
                        <div 
                          className="overflow-x-auto"
                          dangerouslySetInnerHTML={{ __html: renderMath((lesson3 as any).example_section.ex2.ex2_step3_math, true) }}
                        />
                      </div>
                      
                      <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded">
                        <p className="font-semibold text-sm mb-2 text-green-700 dark:text-green-400">Final Answer</p>
                        <div 
                          dangerouslySetInnerHTML={{ __html: renderMath((lesson3 as any).example_section.ex2.ex2_result, true) }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Example 3 */}
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold mb-3">{(lesson3 as any).example_section.ex3.ex3_title}</h4>
                    <p className="text-muted-foreground mb-3 font-medium">{(lesson3 as any).example_section.ex3.ex3_problem}</p>
                    <div 
                      className="mb-4 overflow-x-auto"
                      dangerouslySetInnerHTML={{ __html: renderMath((lesson3 as any).example_section.ex3.ex3_system, true) }}
                    />
                    
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold text-sm mb-1">{(lesson3 as any).example_section.ex3.ex3_step1_title}</p>
                        <div 
                          className="overflow-x-auto"
                          dangerouslySetInnerHTML={{ __html: renderMath((lesson3 as any).example_section.ex3.ex3_step1_math, true) }}
                        />
                      </div>
                      
                      <div>
                        <p className="font-semibold text-sm mb-1">{(lesson3 as any).example_section.ex3.ex3_step2_title}</p>
                        <p className="text-sm text-muted-foreground mb-2">{(lesson3 as any).example_section.ex3.ex3_step2_desc}</p>
                        <div 
                          className="overflow-x-auto"
                          dangerouslySetInnerHTML={{ __html: renderMath((lesson3 as any).example_section.ex3.ex3_step2_math, true) }}
                        />
                      </div>
                      
                      <div>
                        <p className="font-semibold text-sm mb-1">{(lesson3 as any).example_section.ex3.ex3_step3_title}</p>
                        <div 
                          className="overflow-x-auto"
                          dangerouslySetInnerHTML={{ __html: renderMath((lesson3 as any).example_section.ex3.ex3_step3_math, true) }}
                        />
                      </div>
                      
                      <div>
                        <p className="font-semibold text-sm mb-1">{(lesson3 as any).example_section.ex3.ex3_step4_title}</p>
                        <div className="text-sm space-y-1">
                          <div dangerouslySetInnerHTML={{ __html: renderMath((lesson3 as any).example_section.ex3.ex3_step4_x, false) }} />
                          <div dangerouslySetInnerHTML={{ __html: renderMath((lesson3 as any).example_section.ex3.ex3_step4_y, false) }} />
                          <div dangerouslySetInnerHTML={{ __html: renderMath((lesson3 as any).example_section.ex3.ex3_step4_z, false) }} />
                        </div>
                      </div>
                      
                      <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded">
                        <p className="font-semibold text-sm mb-2 text-green-700 dark:text-green-400">Final Answer</p>
                        <div 
                          dangerouslySetInnerHTML={{ __html: renderMath((lesson3 as any).example_section.ex3.ex3_result, false) }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Lesson 4: Systems of Linear Equations */}
        <div id="lesson-systems" className="max-w-4xl mx-auto mb-12">
          <div className="mb-6">
            <Badge className="mb-3">Lesson 4</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">{(course as any).linearEquations.lessons.lesson4_title}</h2>
            <p className="text-muted-foreground">{(course as any).linearEquations.description}</p>
          </div>

          <Accordion type="multiple" className="space-y-4">
            {/* Section 1: Introduction */}
            <AccordionItem value="sys-section1" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">
                {lesson4.section1.title1}
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="space-y-4">
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section1.def1_1) }} />
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section1.def1_2) }} />
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section1.def1_3) }} />
                  <div 
                    className="my-4 overflow-x-auto"
                    dangerouslySetInnerHTML={{ __html: renderMath(lesson4.section1.def1_3_math, true) }}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 2: Homogeneous Systems */}
            <AccordionItem value="sys-section2" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">
                {lesson4.section2.title2}
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="space-y-4">
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section2.def2_1) }} />
                  <p className="text-muted-foreground font-semibold mt-4">{lesson4.section2.subtitle2_1}</p>
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section2.text2_1) }} />
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section2.def2_2) }} />
                  
                  <p className="text-muted-foreground mt-4" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section2.ex2_1) }} />
                  <div 
                    className="my-4 overflow-x-auto"
                    dangerouslySetInnerHTML={{ __html: renderMath(lesson4.section2.ex2_1_system, true) }}
                  />
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section2.ex2_1_desc) }} />
                  <div 
                    className="my-4 overflow-x-auto"
                    dangerouslySetInnerHTML={{ __html: renderMath(lesson4.section2.ex2_1_matrix, true) }}
                  />
                  
                  <div className="mt-4">
                    <p className="font-semibold text-sm mb-1">{lesson4.section2.ex2_1_step1_title}</p>
                    <div 
                      className="overflow-x-auto text-sm"
                      dangerouslySetInnerHTML={{ __html: renderMath(lesson4.section2.ex2_1_step1_math, true) }}
                    />
                  </div>
                  
                  <div className="mt-4">
                    <p className="font-semibold text-sm mb-1">{lesson4.section2.ex2_1_step2_title}</p>
                    <p className="text-sm text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section2.ex2_1_step2_desc) }} />
                    <div 
                      className="overflow-x-auto text-sm"
                      dangerouslySetInnerHTML={{ __html: renderMath(lesson4.section2.ex2_1_step2_math, false) }}
                    />
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded mt-4">
                    <div 
                      className="text-sm"
                      dangerouslySetInnerHTML={{ __html: renderMath(lesson4.section2.ex2_1_result, false) }}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 3: Non-Homogeneous Systems */}
            <AccordionItem value="sys-section3" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">
                {lesson4.section3.title3}
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="space-y-4">
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section3.def3_1) }} />
                  <p className="text-muted-foreground mt-4" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section3.ex3_1) }} />
                  <div 
                    className="my-4 overflow-x-auto"
                    dangerouslySetInnerHTML={{ __html: renderMath(lesson4.section3.ex3_1_system, true) }}
                  />
                  <div 
                    className="my-4 overflow-x-auto"
                    dangerouslySetInnerHTML={{ __html: renderMath(lesson4.section3.ex3_1_matrix, true) }}
                  />
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section3.ex3_1_step1) }} />
                  <div 
                    className="my-4 overflow-x-auto"
                    dangerouslySetInnerHTML={{ __html: renderMath(lesson4.section3.ex3_1_math, true) }}
                  />
                  <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded mt-4">
                    <div 
                      className="text-sm"
                      dangerouslySetInnerHTML={{ __html: renderMath(lesson4.section3.ex3_1_result, false) }}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 4: RREF */}
            <AccordionItem value="sys-section4" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">
                {lesson4.section4.title4}
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="space-y-4">
                  <p className="text-muted-foreground">{lesson4.section4.description}</p>
                  
                  <div className="mt-4">
                    <p className="font-semibold mb-1">{lesson4.section4.def_title}</p>
                    <p className="text-muted-foreground text-sm">{lesson4.section4.def_desc}</p>
                  </div>
                  
                  <div className="mt-4">
                    <p className="font-semibold mb-2">{lesson4.section4.cond_title}</p>
                    <ul className="list-none space-y-1 ml-4 text-muted-foreground text-sm">
                      <li>{lesson4.section4.cond1}</li>
                      <li>{lesson4.section4.cond2}</li>
                      <li>{lesson4.section4.cond3}</li>
                      <li>{lesson4.section4.cond4}</li>
                    </ul>
                  </div>
                  
                  <div className="mt-6">
                    <p className="font-semibold mb-2">{lesson4.section4.comparison_title}</p>
                    <p className="text-muted-foreground text-sm mb-4">{lesson4.section4.comparison_desc}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4 bg-blue-50/50 dark:bg-blue-950/20">
                        <p className="font-semibold mb-1">{lesson4.section4.ref_title}</p>
                        <p className="text-sm text-muted-foreground mb-2">{lesson4.section4.ref_desc}</p>
                        <p className="text-sm text-muted-foreground italic mb-2">{lesson4.section4.ref_method}</p>
                        <div 
                          className="overflow-x-auto"
                          dangerouslySetInnerHTML={{ __html: renderMath(lesson4.section4.ref_ex, true) }}
                        />
                      </div>
                      
                      <div className="border rounded-lg p-4 bg-green-50/50 dark:bg-green-950/20">
                        <p className="font-semibold mb-1">{lesson4.section4.rref_title}</p>
                        <p className="text-sm text-muted-foreground mb-2">{lesson4.section4.rref_desc}</p>
                        <p className="text-sm text-muted-foreground italic mb-2">{lesson4.section4.rref_method}</p>
                        <div 
                          className="overflow-x-auto"
                          dangerouslySetInnerHTML={{ __html: renderMath(lesson4.section4.rref_ex, true) }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded">
                    <p className="font-semibold text-sm mb-1">{lesson4.section4.note_title}</p>
                    <p className="text-sm text-muted-foreground">{lesson4.section4.note_desc}</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Examples Section */}
            <AccordionItem value="sys-examples" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">
                {lesson4.example_section.title_ex}
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="space-y-8">
                  {/* Example 1 */}
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold mb-3">{lesson4.example_section.ex1.title}</h4>
                    <p className="text-muted-foreground mb-3 font-medium">{lesson4.example_section.ex1.problem}</p>
                    <div 
                      className="mb-4 overflow-x-auto"
                      dangerouslySetInnerHTML={{ __html: renderMath(lesson4.example_section.ex1.system_latex, true) }}
                    />
                    
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold text-sm mb-1">{lesson4.example_section.ex1.step1_title}</p>
                        <p className="text-sm text-muted-foreground mb-2">{lesson4.example_section.ex1.step1_desc}</p>
                        <div 
                          className="overflow-x-auto"
                          dangerouslySetInnerHTML={{ __html: renderMath(lesson4.example_section.ex1.step1_math, true) }}
                        />
                      </div>
                      
                      <div>
                        <p className="font-semibold text-sm mb-1">{lesson4.example_section.ex1.step2_title}</p>
                        <p className="text-sm text-muted-foreground mb-2">{lesson4.example_section.ex1.step2_desc}</p>
                        <div 
                          className="overflow-x-auto"
                          dangerouslySetInnerHTML={{ __html: renderMath(lesson4.example_section.ex1.step2_math, true) }}
                        />
                      </div>
                      
                      <div>
                        <p className="font-semibold text-sm mb-1">{lesson4.example_section.ex1.step3_title}</p>
                        <p className="text-sm text-muted-foreground mb-2">{lesson4.example_section.ex1.step3_desc}</p>
                        <div 
                          className="overflow-x-auto"
                          dangerouslySetInnerHTML={{ __html: renderMath(lesson4.example_section.ex1.step3_math, true) }}
                        />
                      </div>
                      
                      <div>
                        <p className="font-semibold text-sm mb-1">{lesson4.example_section.ex1.step4_title}</p>
                        <p className="text-sm text-muted-foreground mb-2">{lesson4.example_section.ex1.step4_desc}</p>
                        <div 
                          className="overflow-x-auto"
                          dangerouslySetInnerHTML={{ __html: renderMath(lesson4.example_section.ex1.step4_math, true) }}
                        />
                      </div>
                      
                      <div>
                        <p className="font-semibold text-sm mb-1">{lesson4.example_section.ex1.step5_title}</p>
                        <p className="text-sm text-muted-foreground mb-2">{lesson4.example_section.ex1.step5_desc}</p>
                        <div 
                          className="overflow-x-auto text-sm"
                          dangerouslySetInnerHTML={{ __html: renderMath(lesson4.example_section.ex1.step5_math, false) }}
                        />
                      </div>
                      
                      <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded">
                        <p className="font-semibold text-sm mb-2 text-green-700 dark:text-green-400">{lesson4.example_section.ex1.result_title}</p>
                        <div 
                          dangerouslySetInnerHTML={{ __html: renderMath(lesson4.example_section.ex1.result, false) }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Example 2 */}
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold mb-3">{lesson4.example_section.ex2.title}</h4>
                    <p className="text-muted-foreground mb-3 font-medium">{lesson4.example_section.ex2.problem}</p>
                    <div 
                      className="mb-4 overflow-x-auto"
                      dangerouslySetInnerHTML={{ __html: renderMath(lesson4.example_section.ex2.system_latex, true) }}
                    />
                    
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold text-sm mb-1">{lesson4.example_section.ex2.step1_title}</p>
                        <p className="text-sm text-muted-foreground mb-2">{lesson4.example_section.ex2.step1_desc}</p>
                        <div 
                          className="overflow-x-auto text-sm"
                          dangerouslySetInnerHTML={{ __html: renderMath(lesson4.example_section.ex2.step1_math, true) }}
                        />
                      </div>
                      
                      <div>
                        <p className="font-semibold text-sm mb-1">{lesson4.example_section.ex2.step2_title}</p>
                        <p className="text-sm text-muted-foreground mb-2">{lesson4.example_section.ex2.step2_desc}</p>
                        <div 
                          className="overflow-x-auto text-sm"
                          dangerouslySetInnerHTML={{ __html: renderMath(lesson4.example_section.ex2.step2_math, true) }}
                        />
                      </div>
                      
                      <div>
                        <p className="font-semibold text-sm mb-1">{lesson4.example_section.ex2.step3_title}</p>
                        <p className="text-sm text-muted-foreground mb-2">{lesson4.example_section.ex2.step3_desc}</p>
                        <div 
                          className="overflow-x-auto text-sm"
                          dangerouslySetInnerHTML={{ __html: renderMath(lesson4.example_section.ex2.step3_math, false) }}
                        />
                      </div>
                      
                      <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded">
                        <p className="font-semibold text-sm mb-2 text-green-700 dark:text-green-400">{lesson4.example_section.ex2.result_title}</p>
                        <div 
                          dangerouslySetInnerHTML={{ __html: renderMath(lesson4.example_section.ex2.result, true) }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Example 3 */}
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold mb-3">{lesson4.example_section.ex3.title}</h4>
                    <p className="text-muted-foreground mb-3 font-medium">{lesson4.example_section.ex3.problem}</p>
                    <div 
                      className="mb-4 overflow-x-auto"
                      dangerouslySetInnerHTML={{ __html: renderMath(lesson4.example_section.ex3.system_latex, true) }}
                    />
                    
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold text-sm mb-1">{lesson4.example_section.ex3.step1_title}</p>
                        <div 
                          className="overflow-x-auto"
                          dangerouslySetInnerHTML={{ __html: renderMath(lesson4.example_section.ex3.step1_math, true) }}
                        />
                      </div>
                      
                      <div>
                        <p className="font-semibold text-sm mb-1">{lesson4.example_section.ex3.step2_title}</p>
                        <p className="text-sm text-muted-foreground mb-2">{lesson4.example_section.ex3.step2_desc}</p>
                        <div 
                          className="overflow-x-auto"
                          dangerouslySetInnerHTML={{ __html: renderMath(lesson4.example_section.ex3.step2_math, true) }}
                        />
                      </div>
                      
                      <div>
                        <p className="font-semibold text-sm mb-1">{lesson4.example_section.ex3.step3_title}</p>
                        <p className="text-sm text-muted-foreground mb-2">{lesson4.example_section.ex3.step3_desc}</p>
                        <div 
                          className="overflow-x-auto text-sm"
                          dangerouslySetInnerHTML={{ __html: renderMath(lesson4.example_section.ex3.step3_math, false) }}
                        />
                      </div>
                      
                      <div className="bg-red-50 dark:bg-red-950/20 p-3 rounded">
                        <p className="font-semibold text-sm mb-2 text-red-700 dark:text-red-400">{lesson4.example_section.ex3.result_title}</p>
                        <p className="text-sm text-muted-foreground">{lesson4.example_section.ex3.result}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Lesson 5: Vector Spaces */}
        <div id="lesson-vectors" className="max-w-4xl mx-auto mb-12">
          <div className="mb-6">
            <Badge className="mb-3">Lesson 5</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">{(course as any).vectorSpaces.lessons.lesson5_title}</h2>
            <p className="text-muted-foreground">{(course as any).vectorSpaces.description}</p>
          </div>

          <Accordion type="multiple" className="space-y-4">
            {/* Section 1: What is a Vector Space? */}
            <AccordionItem value="vec-section1" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">
                {lesson5.section1.title1}
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="space-y-4">
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section1.def1_1) }} />
                  
                  <p className="text-muted-foreground font-semibold mt-4" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section1.axiom_intro) }} />
                  
                  <div className="mt-4">
                    <p className="font-semibold mb-2">{lesson5.section1.axiom_title_add}</p>
                    <ul className="list-none space-y-1 ml-4 text-muted-foreground">
                      <li dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section1.axiom_add_1) }} />
                      <li dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section1.axiom_add_2) }} />
                      <li dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section1.axiom_add_3) }} />
                      <li dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section1.axiom_add_4) }} />
                      <li dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section1.axiom_add_5) }} />
                    </ul>
                  </div>
                  
                  <div className="mt-4">
                    <p className="font-semibold mb-2">{lesson5.section1.axiom_title_scal}</p>
                    <ul className="list-none space-y-1 ml-4 text-muted-foreground">
                      <li dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section1.axiom_scal_1) }} />
                      <li dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section1.axiom_scal_2) }} />
                      <li dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section1.axiom_scal_3) }} />
                      <li dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section1.axiom_scal_4) }} />
                      <li dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section1.axiom_scal_5) }} />
                    </ul>
                  </div>
                  
                  <p className="text-muted-foreground font-semibold mt-6" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section1.title_ex1) }} />
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section1.text_ex1) }} />
                  
                  <div className="mt-4">
                    <p className="font-semibold mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section1.def_ops_title) }} />
                    <p className="text-muted-foreground mb-2">{lesson5.section1.def_ops_add}</p>
                    <div 
                      className="my-3 overflow-x-auto"
                      dangerouslySetInnerHTML={{ __html: renderMath(lesson5.section1.math_ops_add, true) }}
                    />
                    <p className="text-muted-foreground mb-2 mt-4">{lesson5.section1.def_ops_scal}</p>
                    <div 
                      className="my-3 overflow-x-auto"
                      dangerouslySetInnerHTML={{ __html: renderMath(lesson5.section1.math_ops_scal, true) }}
                    />
                  </div>
                  
                  <p className="text-muted-foreground font-semibold mt-6" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section1.title_ex2) }} />
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section1.text_ex2) }} />
                  <ul className="list-none space-y-1 ml-4 text-muted-foreground mt-2">
                    <li dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section1.list_ex2_1) }} />
                    <li dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section1.list_ex2_2) }} />
                    <li dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section1.list_ex2_3) }} />
                  </ul>
                  
                  <div className="mt-6 bg-blue-50 dark:bg-blue-950/20 p-4 rounded">
                    <p className="font-semibold mb-2 text-blue-700 dark:text-blue-400">{lesson5.section1.simple_ex_title}</p>
                    <p className="text-sm text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section1.simple_ex_desc) }} />
                    <div 
                      className="my-2 overflow-x-auto"
                      dangerouslySetInnerHTML={{ __html: renderMath(lesson5.section1.simple_ex_math, true) }}
                    />
                    <p className="text-sm text-muted-foreground mt-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section1.simple_ex_note) }} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 2: Subspaces */}
            <AccordionItem value="vec-section2" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">
                {lesson5.section2.title2}
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="space-y-4">
                  <p className="text-muted-foreground italic">{lesson5.section2.description}</p>
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section2.def2_1) }} />
                  <p className="text-muted-foreground mt-4" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section2.text2_1) }} />
                  
                  <div className="mt-4">
                    <p className="font-semibold mb-2">{lesson5.section2.theorem2_1_title}</p>
                    <p className="text-muted-foreground mb-2">{lesson5.section2.theorem2_1_desc}</p>
                    <ul className="list-none space-y-1 ml-4 text-muted-foreground">
                      <li dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section2.cond2_1) }} />
                      <li dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section2.cond2_2) }} />
                      <li dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section2.cond2_3) }} />
                    </ul>
                  </div>
                  
                  <p className="text-muted-foreground font-semibold mt-6" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section2.title_ex2) }} />
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section2.text_ex2) }} />
                  <ul className="list-none space-y-1 ml-4 text-muted-foreground mt-2">
                    <li dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section2.list_ex2_1) }} />
                    <li dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section2.list_ex2_2) }} />
                    <li dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section2.list_ex2_3) }} />
                    <li dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section2.list_ex2_4) }} />
                  </ul>
                  
                  <p className="text-muted-foreground font-semibold mt-6">{lesson5.section2.title_non_ex2}</p>
                  <ul className="list-none space-y-1 ml-4 text-muted-foreground mt-2">
                    <li dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section2.non_ex2_1) }} />
                    <li dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section2.non_ex2_2) }} />
                    <li dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section2.non_ex2_3) }} />
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 3: Linear Combinations and Span */}
            <AccordionItem value="vec-section3" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">
                {lesson5.section3.title3}
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="space-y-4">
                  <p className="text-muted-foreground italic">{lesson5.section3.description}</p>
                  
                  <div className="mt-4">
                    <p className="font-semibold mb-2">{lesson5.section3.def3_1_title}</p>
                    <p className="text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section3.def3_1) }} />
                    <div 
                      className="my-3 overflow-x-auto"
                      dangerouslySetInnerHTML={{ __html: renderMath(lesson5.section3.math3_1, true) }}
                    />
                    <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section3.text3_1) }} />
                  </div>
                  
                  <div className="mt-4">
                    <p className="font-semibold mb-2">{lesson5.section3.def3_2_title}</p>
                    <p className="text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section3.def3_2) }} />
                    <div 
                      className="my-3 overflow-x-auto"
                      dangerouslySetInnerHTML={{ __html: renderMath(lesson5.section3.math3_2, true) }}
                    />
                  </div>
                  
                  <p className="text-muted-foreground font-semibold mt-6" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section3.visual_title) }} />
                  <p className="text-muted-foreground mb-2">{lesson5.section3.visual_desc}</p>
                  <ul className="list-none space-y-1 ml-4 text-muted-foreground">
                    <li dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section3.visual_item1) }} />
                    <li dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section3.visual_item2) }} />
                    <li dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section3.visual_item3) }} />
                  </ul>
                  
                  <div className="mt-4 bg-green-50 dark:bg-green-950/20 p-4 rounded">
                    <p className="font-semibold mb-2 text-green-700 dark:text-green-400">{lesson5.section3.connection_title}</p>
                    <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section3.connection_text) }} />
                  </div>
                  
                  <p className="text-muted-foreground font-semibold mt-6" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section3.theorem3_1) }} />
                  
                  <div className="mt-6 bg-blue-50 dark:bg-blue-950/20 p-4 rounded">
                    <p className="font-semibold mb-2 text-blue-700 dark:text-blue-400">{lesson5.section3.simple_ex_title}</p>
                    <p className="text-sm text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section3.simple_ex_desc) }} />
                    <div 
                      className="my-2 overflow-x-auto"
                      dangerouslySetInnerHTML={{ __html: renderMath(lesson5.section3.simple_ex_math1, true) }}
                    />
                    <p className="text-sm text-muted-foreground mt-3 mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section3.simple_ex_desc2) }} />
                    <div 
                      className="my-2 overflow-x-auto"
                      dangerouslySetInnerHTML={{ __html: renderMath(lesson5.section3.simple_ex_math2, true) }}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 4: Linear Independence */}
            <AccordionItem value="vec-section4" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">
                {lesson5.section4.title4}
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="space-y-4">
                  <p className="text-muted-foreground italic">{lesson5.section4.description}</p>
                  
                  <div className="mt-4">
                    <p className="font-semibold mb-2">{lesson5.section4.def4_1_title}</p>
                    <p className="text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section4.def4_1) }} />
                    <div 
                      className="my-3 overflow-x-auto"
                      dangerouslySetInnerHTML={{ __html: renderMath(lesson5.section4.math4_1, true) }}
                    />
                    <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section4.def4_1_conclusion) }} />
                  </div>
                  
                  <div className="mt-4">
                    <p className="font-semibold mb-2">{lesson5.section4.def4_2_title}</p>
                    <p className="text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section4.def4_2) }} />
                    <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section4.text4_2) }} />
                  </div>
                  
                  <div className="mt-6 bg-blue-50 dark:bg-blue-950/20 p-4 rounded">
                    <p className="font-semibold mb-2 text-blue-700 dark:text-blue-400">{lesson5.section4.simple_ex_title}</p>
                    <p className="text-sm text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section4.simple_ex_desc) }} />
                    <div 
                      className="my-2 overflow-x-auto"
                      dangerouslySetInnerHTML={{ __html: renderMath(lesson5.section4.simple_ex_math, true) }}
                    />
                    <p className="text-sm text-muted-foreground mt-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section4.simple_ex_conc) }} />
                  </div>
                  
                  <p className="text-muted-foreground font-semibold mt-6">{lesson5.section4.visual_title}</p>
                  <ul className="list-none space-y-2 ml-4 text-muted-foreground">
                    <li dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section4.visual_2d) }} />
                    <li dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section4.visual_3d) }} />
                  </ul>
                  
                  <div className="mt-4">
                    <p className="font-semibold mb-2">{lesson5.section4.test_title}</p>
                    <p className="text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section4.test_desc) }} />
                    <ul className="list-none space-y-1 ml-4 text-muted-foreground">
                      <li dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section4.test_cond1) }} />
                      <li dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section4.test_cond2) }} />
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 5: Basis and Dimension */}
            <AccordionItem value="vec-section5" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">
                {lesson5.section5.title5}
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="space-y-4">
                  <p className="text-muted-foreground italic">{lesson5.section5.description}</p>
                  
                  <div className="mt-4">
                    <p className="font-semibold mb-2">{lesson5.section5.def5_1_title}</p>
                    <p className="text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section5.def5_1) }} />
                    <ul className="list-none space-y-1 ml-4 text-muted-foreground">
                      <li dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section5.cond5_1) }} />
                      <li dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section5.cond5_2) }} />
                    </ul>
                    <p className="text-muted-foreground mt-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section5.text5_1) }} />
                  </div>
                  
                  <div className="mt-6 bg-blue-50 dark:bg-blue-950/20 p-4 rounded">
                    <p className="font-semibold mb-2 text-blue-700 dark:text-blue-400">{lesson5.section5.simple_ex_title}</p>
                    <p className="text-sm text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section5.simple_ex_desc) }} />
                    <div 
                      className="my-2 overflow-x-auto"
                      dangerouslySetInnerHTML={{ __html: renderMath(lesson5.section5.simple_ex_math, true) }}
                    />
                    <p className="text-sm text-muted-foreground mt-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section5.simple_ex_note) }} />
                  </div>
                  
                  <div className="mt-4">
                    <p className="font-semibold mb-2">{lesson5.section5.def5_2_title}</p>
                    <p className="text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section5.def5_2) }} />
                    <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section5.text5_2) }} />
                  </div>
                  
                  <p className="text-muted-foreground font-semibold mt-6">{lesson5.section5.visual_title}</p>
                  <ul className="list-none space-y-1 ml-4 text-muted-foreground">
                    <li dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section5.visual_0d) }} />
                    <li dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section5.visual_1d) }} />
                    <li dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section5.visual_2d) }} />
                    <li dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section5.visual_3d) }} />
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Examples Section */}
            <AccordionItem value="vec-examples" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">
                {lesson5.example_section.title_ex}
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="space-y-8">
                  {/* Example 1 */}
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold mb-3">{lesson5.example_section.ex1.title}</h4>
                    <p className="text-muted-foreground mb-3 font-medium">Problem:</p>
                    <div 
                      className="mb-4"
                      dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.example_section.ex1.problem) }}
                    />
                    
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold text-sm mb-1">{lesson5.example_section.ex1.step1_title}</p>
                        <p className="text-sm text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.example_section.ex1.step1_desc) }} />
                        <div 
                          className="overflow-x-auto text-sm"
                          dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.example_section.ex1.step1_math) }}
                        />
                      </div>
                      
                      <div>
                        <p className="font-semibold text-sm mb-1">{lesson5.example_section.ex1.step2_title}</p>
                        <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.example_section.ex1.step2_desc) }} />
                      </div>
                      
                      <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded">
                        <p className="font-semibold text-sm mb-2 text-green-700 dark:text-green-400">{lesson5.example_section.ex1.result_title}</p>
                        <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.example_section.ex1.result) }} />
                      </div>
                    </div>
                  </div>

                  {/* Example 2 */}
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold mb-3">{lesson5.example_section.ex2.title}</h4>
                    <p className="text-muted-foreground mb-3 font-medium">Problem:</p>
                    <div 
                      className="mb-4"
                      dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.example_section.ex2.problem) }}
                    />
                    
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold text-sm mb-1">{lesson5.example_section.ex2.step1_title}</p>
                        <p className="text-sm text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.example_section.ex2.step1_desc) }} />
                        <div 
                          className="overflow-x-auto"
                          dangerouslySetInnerHTML={{ __html: renderMath(lesson5.example_section.ex2.step1_math, true) }}
                        />
                      </div>
                      
                      <div>
                        <p className="font-semibold text-sm mb-1">{lesson5.example_section.ex2.step2_title}</p>
                        <p className="text-sm text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.example_section.ex2.step2_desc) }} />
                        <div 
                          className="overflow-x-auto"
                          dangerouslySetInnerHTML={{ __html: renderMath(lesson5.example_section.ex2.step2_math, true) }}
                        />
                      </div>
                      
                      <div>
                        <p className="font-semibold text-sm mb-1">{lesson5.example_section.ex2.step3_title}</p>
                        <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.example_section.ex2.step3_desc) }} />
                      </div>
                      
                      <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded">
                        <p className="font-semibold text-sm mb-2 text-green-700 dark:text-green-400">{lesson5.example_section.ex2.result_title}</p>
                        <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.example_section.ex2.result) }} />
                      </div>
                    </div>
                  </div>

                  {/* Example 3 */}
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold mb-3">{lesson5.example_section.ex3.title}</h4>
                    <p className="text-muted-foreground mb-3 font-medium">Problem:</p>
                    <div 
                      className="mb-4"
                      dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.example_section.ex3.problem) }}
                    />
                    
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold text-sm mb-1">{lesson5.example_section.ex3.step1_title}</p>
                        <p className="text-sm text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.example_section.ex3.step1_desc) }} />
                        <div 
                          className="overflow-x-auto text-sm"
                          dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.example_section.ex3.step1_math) }}
                        />
                      </div>
                      
                      <div>
                        <p className="font-semibold text-sm mb-1">{lesson5.example_section.ex3.step2_title}</p>
                        <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.example_section.ex3.step2_desc) }} />
                      </div>
                      
                      <div>
                        <p className="font-semibold text-sm mb-1">{lesson5.example_section.ex3.step3_title}</p>
                        <div 
                          className="overflow-x-auto"
                          dangerouslySetInnerHTML={{ __html: renderMath(lesson5.example_section.ex3.step3_math, true) }}
                        />
                      </div>
                      
                      <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded">
                        <p className="font-semibold text-sm mb-2 text-green-700 dark:text-green-400">{lesson5.example_section.ex3.result_title}</p>
                        <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.example_section.ex3.result) }} />
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Lesson 6 - Eigenvalues & Eigenvectors */}
        <div id="lesson-eigenvalues" className="max-w-4xl mx-auto mb-12">
          <div className="mb-6">
            <Badge className="mb-3">Lesson 6</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">{(course as any).eigenvalues.lessons.lesson6_title}</h2>
            <p className="text-muted-foreground mb-6">{(course as any).eigenvalues.description}</p>
          </div>
          
          
          <Accordion type="multiple" className="space-y-4">
            {/* Section 1: What are Eigenvalues and Eigenvectors */}
            <AccordionItem value="section6-1" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-semibold">{lesson6.section1.title1}</span>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div>
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section1.def1_1) }} />
                  <div 
                    className="my-4 overflow-x-auto"
                    dangerouslySetInnerHTML={{ __html: renderMath(lesson6.section1.math1_1, true) }}
                  />
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section1.def1_2) }} />
                  <p className="text-muted-foreground mt-4" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section1.text1_1) }} />
                  
                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">{lesson6.section1.simple_ex_title}</p>
                    <p className="text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section1.simple_ex_desc) }} />
                    <div 
                      className="my-2 overflow-x-auto"
                      dangerouslySetInnerHTML={{ __html: renderMath(lesson6.section1.simple_ex_math, true) }}
                    />
                    <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section1.simple_ex_conc) }} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 2: The Characteristic Polynomial */}
            <AccordionItem value="section6-2" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-semibold">{lesson6.section2.title2}</span>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div>
                  <p className="text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section2.description) }} />
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section2.def2_1) }} />
                  <p className="text-muted-foreground mt-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section2.def2_2) }} />
                  <div 
                    className="my-4 overflow-x-auto"
                    dangerouslySetInnerHTML={{ __html: renderMath(lesson6.section2.math2_1, true) }}
                  />
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section2.text2_1) }} />
                  
                  <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <p className="font-semibold text-purple-700 dark:text-purple-400 mb-2">{lesson6.section2.prop2_1_title}</p>
                    <p className="text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section2.prop2_1_desc) }} />
                    <div 
                      className="overflow-x-auto"
                      dangerouslySetInnerHTML={{ __html: renderMath(lesson6.section2.math2_2, true) }}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 3: Finding Eigenvectors and Eigenspaces */}
            <AccordionItem value="section6-3" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-semibold">{lesson6.section3.title3}</span>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div>
                  <p className="text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section3.description) }} />
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section3.def3_1) }} />
                  <div 
                    className="my-4 overflow-x-auto"
                    dangerouslySetInnerHTML={{ __html: renderMath(lesson6.section3.math3_1, true) }}
                  />
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section3.def3_2) }} />
                  <p className="text-muted-foreground mt-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section3.text3_1) }} />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 4: Diagonalization */}
            <AccordionItem value="section6-4" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-semibold">{lesson6.section4.title4}</span>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div>
                  <p className="text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section4.description) }} />
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section4.def4_1) }} />
                  <div 
                    className="my-4 overflow-x-auto"
                    dangerouslySetInnerHTML={{ __html: renderMath(lesson6.section4.math4_1, true) }}
                  />
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section4.text4_1) }} />
                  
                  <div className="mt-6 space-y-3">
                    <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <p className="font-semibold text-green-700 dark:text-green-400 mb-2">{lesson6.section4.cond4_1_title}</p>
                      <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section4.cond4_1_desc) }} />
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.section4.cond4_2_desc) }} />
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Examples Section */}
            <AccordionItem value="examples6" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-semibold">{lesson6.example_section.title_ex}</span>
              </AccordionTrigger>
              <AccordionContent className="space-y-6 pt-4">
                <div className="space-y-6">
                  {/* Example 1 */}
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold mb-3">{lesson6.example_section.ex1.title}</h4>
                    <p className="text-muted-foreground mb-3 font-medium">Problem:</p>
                    <p className="text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.example_section.ex1.problem) }} />
                    <div 
                      className="mb-4 overflow-x-auto"
                      dangerouslySetInnerHTML={{ __html: renderMath(lesson6.example_section.ex1.problem_math, true) }}
                    />
                    
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold text-sm mb-1">{lesson6.example_section.ex1.step1_title}</p>
                        <p className="text-sm text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.example_section.ex1.step1_desc) }} />
                        <div 
                          className="overflow-x-auto"
                          dangerouslySetInnerHTML={{ __html: renderMath(lesson6.example_section.ex1.step1_math, true) }}
                        />
                      </div>
                      
                      <div>
                        <p className="font-semibold text-sm mb-1">{lesson6.example_section.ex1.step2_title}</p>
                        <p className="text-sm text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.example_section.ex1.step2_desc) }} />
                        <div 
                          className="overflow-x-auto"
                          dangerouslySetInnerHTML={{ __html: renderMath(lesson6.example_section.ex1.step2_math, true) }}
                        />
                      </div>
                      
                      <div>
                        <p className="font-semibold text-sm mb-1">{lesson6.example_section.ex1.step3_title}</p>
                        <div 
                          className="overflow-x-auto"
                          dangerouslySetInnerHTML={{ __html: renderMath(lesson6.example_section.ex1.step3_math, true) }}
                        />
                      </div>
                      
                      <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded">
                        <p className="font-semibold text-sm mb-2 text-green-700 dark:text-green-400">{lesson6.example_section.ex1.result_title}</p>
                        <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.example_section.ex1.result) }} />
                      </div>
                    </div>
                  </div>

                  {/* Example 2 */}
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold mb-3">{lesson6.example_section.ex2.title}</h4>
                    <p className="text-muted-foreground mb-3 font-medium">Problem:</p>
                    <p className="text-muted-foreground mb-4" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.example_section.ex2.problem) }} />
                    
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold text-sm mb-1" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.example_section.ex2.step1_title) }} />
                        <p className="text-sm text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.example_section.ex2.step1_desc) }} />
                        <div 
                          className="overflow-x-auto"
                          dangerouslySetInnerHTML={{ __html: renderMath(lesson6.example_section.ex2.step1_math, true) }}
                        />
                      </div>
                      
                      <div>
                        <p className="font-semibold text-sm mb-1" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.example_section.ex2.step2_title) }} />
                        <p className="text-sm text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.example_section.ex2.step2_desc) }} />
                        <div 
                          className="overflow-x-auto"
                          dangerouslySetInnerHTML={{ __html: renderMath(lesson6.example_section.ex2.step2_math, true) }}
                        />
                      </div>
                      
                      <div>
                        <p className="font-semibold text-sm mb-1" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.example_section.ex2.step3_title) }} />
                        <p className="text-sm text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.example_section.ex2.step3_desc) }} />
                        <div 
                          className="overflow-x-auto"
                          dangerouslySetInnerHTML={{ __html: renderMath(lesson6.example_section.ex2.step3_math, true) }}
                        />
                      </div>
                      
                      <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded">
                        <p className="font-semibold text-sm mb-2 text-green-700 dark:text-green-400">{lesson6.example_section.ex2.result_title}</p>
                        <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.example_section.ex2.result) }} />
                      </div>
                    </div>
                  </div>

                  {/* Example 3 */}
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold mb-3">{lesson6.example_section.ex3.title}</h4>
                    <p className="text-muted-foreground mb-3 font-medium">Problem:</p>
                    <p className="text-muted-foreground mb-4" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.example_section.ex3.problem) }} />
                    
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold text-sm mb-1" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.example_section.ex3.step1_title) }} />
                        <p className="text-sm text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.example_section.ex3.step1_desc) }} />
                        <div 
                          className="overflow-x-auto"
                          dangerouslySetInnerHTML={{ __html: renderMath(lesson6.example_section.ex3.step1_math, true) }}
                        />
                      </div>
                      
                      <div>
                        <p className="font-semibold text-sm mb-1" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.example_section.ex3.step2_title) }} />
                        <p className="text-sm text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.example_section.ex3.step2_desc) }} />
                        <div 
                          className="overflow-x-auto"
                          dangerouslySetInnerHTML={{ __html: renderMath(lesson6.example_section.ex3.step2_math, true) }}
                        />
                      </div>
                      
                      <div>
                        <p className="font-semibold text-sm mb-1" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.example_section.ex3.step3_title) }} />
                        <p className="text-sm text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.example_section.ex3.step3_desc) }} />
                      </div>
                      
                      <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded">
                        <p className="font-semibold text-sm mb-2 text-green-700 dark:text-green-400">{lesson6.example_section.ex3.result_title}</p>
                        <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson6.example_section.ex3.result) }} />
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Topics Grid */
        <div className="max-w-6xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
            {t.topics_covered}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section, index) => {
              const sectionData = t.sections[section.id as keyof typeof t.sections];
              return (
                <Card
                  key={section.id}
                  className={`p-6 bg-gradient-to-br ${section.color} ${section.borderColor} transition-all duration-300 hover:shadow-lg animate-slide-up cursor-pointer group border-2`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => section.lessonId && scrollToLesson(section.lessonId)}
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
        }
        {/* Features */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
            {t.what_you_will_learn}
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

export default LinearAlgebraLearning;
