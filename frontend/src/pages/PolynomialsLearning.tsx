import { ArrowLeft, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/contexts/LanguageContext";
import { polynomialsLearningTranslations } from "@/lib/translations/polynomials_learning_translations";
import { polynomialCourse } from "@/lib/translations/courses/polynomial_course";
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

const PolynomialsLearning = () => {
  const { language, languageCode } = useLanguage();
  const t = polynomialsLearningTranslations[language as keyof typeof polynomialsLearningTranslations] || polynomialsLearningTranslations.en;
  const course = polynomialCourse[language as keyof typeof polynomialCourse] || polynomialCourse.en;
  const lesson1 = course.polynomial_basics.lessons.lesson1;
  const lesson2 = course.polynomial_operations.lessons.lesson2;
  const lesson3 = (course as any).factorization_techniques?.lessons.lesson3 || polynomialCourse.en.factorization_techniques.lessons.lesson3;
  const lesson4 = (course as any).roots_zeros?.lessons.lesson4 || polynomialCourse.en.roots_zeros.lessons.lesson4;
  const lesson5 = (course as any).polynomial_equations?.lessons.lesson5 || polynomialCourse.en.polynomial_equations.lessons.lesson5;

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
    let processed = text;

    // Handle inline math delimiters $...$
    processed = processed.replace(/\$([^$]+)\$/g, (match, latex) => {
      try {
        return katex.renderToString(latex, { displayMode: false, throwOnError: false });
      } catch (e) {
        return match;
      }
    });

    // Handle **bold** markdown
    processed = processed.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    return processed;
  };

  const sections = [
    {
      id: "basics",
      lessonId: "lesson-basics",
      color: "from-blue-500/10 to-blue-500/5 hover:from-blue-500/20 hover:to-blue-500/10",
      borderColor: "hover:border-blue-500/30"
    },
    {
      id: "operations",
      lessonId: "lesson-operations",
      color: "from-purple-500/10 to-purple-500/5 hover:from-purple-500/20 hover:to-purple-500/10",
      borderColor: "hover:border-purple-500/30"
    },
    {
      id: "factoring",
      lessonId: "lesson-factoring",
      color: "from-pink-500/10 to-pink-500/5 hover:from-pink-500/20 hover:to-pink-500/10",
      borderColor: "hover:border-pink-500/30"
    },
    {
      id: "roots",
      lessonId: "lesson-roots",
      color: "from-green-500/10 to-green-500/5 hover:from-green-500/20 hover:to-green-500/10",
      borderColor: "hover:border-green-500/30"
    },
    {
      id: "equations",
      lessonId: "lesson-equations",
      color: "from-orange-500/10 to-orange-500/5 hover:from-orange-500/20 hover:to-orange-500/10",
      borderColor: "hover:border-orange-500/30"
    },
    {
      id: "applications",
      lessonId: "lesson-applications",
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

        {/* Lesson 1: Polynomial Basics - Structure & Terminology */}
        <div id="lesson-basics" className="max-w-4xl mx-auto mb-12">
          <div className="mb-6">
            <Badge className="mb-3">Lesson 1</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">{course.polynomial_basics.title}</h2>
            <p className="text-muted-foreground">{course.polynomial_basics.description}</p>
          </div>

          <Accordion type="multiple" className="space-y-4">
            {/* Section 1: Definition & Terminology */}
            <AccordionItem value="section1-1" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-semibold text-lg">{lesson1.section1.title1}</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                <p className="text-muted-foreground text-lg">{lesson1.section1.def1_1}</p>
                <div className="my-4 p-4 bg-muted/30 rounded-lg overflow-x-auto">
                  <div dangerouslySetInnerHTML={{ __html: renderMath(lesson1.section1.math1_1) }} />
                </div>

                {/* Anatomy of a Polynomial Plot */}
                {lesson1.section1.plot1_title && (
                  <div className="border rounded-lg p-4 bg-card mt-4 max-w-2xl mx-auto">
                    <h5 className="font-semibold text-sm mb-2">{lesson1.section1.plot1_title}</h5>
                    <p className="text-xs text-muted-foreground mb-3" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.section1.plot1_desc) }} />
                    <div className="w-full bg-muted/20 rounded-lg flex items-center justify-center p-6">
                      <svg viewBox="0 0 350 160" className="w-full max-w-md" preserveAspectRatio="xMidYMid meet">
                        {/* The term 3x² centered */}
                        <text x="175" y="85" fontSize="48" fontWeight="bold" textAnchor="middle" fill="currentColor">3x²</text>

                        {/* Coefficient - Improved diagonal angle and arrowhead alignment */}
                        <line x1="100" y1="45" x2="140" y2="65" stroke="rgb(59, 130, 246)" strokeWidth="2" />
                        <polygon points="140,65 131,65 136,58" fill="rgb(59, 130, 246)" />
                        <text x="80" y="40" fontSize="14" textAnchor="middle" fill="rgb(59, 130, 246)" fontWeight="bold">{lesson1.section1.plot1_data.labels[0].text}</text>

                        {/* Variable - Arrow now points UP towards the 'x' */}
                        <line x1="180" y1="125" x2="180" y2="95" stroke="currentColor" strokeWidth="2" />
                        <polygon points="180,90 176,96 184,96" fill="currentColor" />
                        <text x="180" y="145" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="bold">{lesson1.section1.plot1_data.labels[1].text}</text>

                        {/* Exponent/Degree - Adjusted to point exactly at the '2' */}
                        <line x1="250" y1="35" x2="220" y2="50" stroke="rgb(239, 68, 68)" strokeWidth="2" />
                        <polygon points="220,50 229,50 224  ,43" fill="rgb(239, 68, 68)" />
                        <text x="285" y="30" fontSize="14" textAnchor="middle" fill="rgb(239, 68, 68)" fontWeight="bold">{lesson1.section1.plot1_data.labels[2].text}</text>
                        <text x="285" y="45" fontSize="12" textAnchor="middle" fill="rgb(239, 68, 68)">{lesson1.section1.plot1_data.labels[3].text}</text>
                      </svg>
                    </div>
                  </div>
                )}

                <h4 className="font-semibold text-lg mt-4" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.section1.text1_1) }} />
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.section1.list1_1) }} />
                  <li className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.section1.list1_2) }} />
                  <li className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.section1.list1_3) }} />
                </ul>

                <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.section1.warning1) }} />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 2: Degree & Leading Coefficient */}
            <AccordionItem value="section1-2" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-semibold text-lg">{lesson1.section2.title2}</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                <p className="text-muted-foreground text-lg">{lesson1.section2.def2_1}</p>
                <p className="text-muted-foreground text-lg">{lesson1.section2.def2_2}</p>

                {/* Quick Check Example */}
                <div className="my-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">{lesson1.section2.ex2_1_title}</h5>
                  <p className="text-muted-foreground text-lg mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.section2.ex2_1_problem) }} />
                  <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.section2.ex2_1_solution) }} />
                </div>

                <p className="text-muted-foreground text-lg">{lesson1.section2.text2_1}</p>
              </AccordionContent>
            </AccordionItem>

            {/* Section 3: Standard Form */}
            <AccordionItem value="section1-3" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-semibold text-lg">{lesson1.section3.title3}</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                <p className="text-muted-foreground text-lg">{lesson1.section3.def3_1}</p>

                {/* Reordering Example */}
                <div className="my-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">{lesson1.section3.ex3_1_title}</h5>
                  <p className="text-muted-foreground text-lg mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.section3.ex3_1_problem) }} />
                  <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.section3.ex3_1_step1) }} />
                  <p className="font-semibold text-lg text-green-700 dark:text-green-400 mt-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.section3.ex3_1_solution) }} />
                </div>

                <div className="my-4 p-4 bg-muted/30 rounded-lg overflow-x-auto">
                  <div dangerouslySetInnerHTML={{ __html: renderMath(lesson1.section3.math3_1) }} />
                </div>
                <p className="text-muted-foreground text-lg">{lesson1.section3.text3_1}</p>
              </AccordionContent>
            </AccordionItem>

            {/* Section 4: Types of Polynomials */}
            <AccordionItem value="section1-4" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-semibold text-lg">{lesson1.section4.title4}</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                <h4 className="font-semibold text-lg">{lesson1.section4.def4_1_title}</h4>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.section4.list4_1) }} />
                  <li className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.section4.list4_2) }} />
                  <li className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.section4.list4_3) }} />
                </ul>

                <h4 className="font-semibold text-lg mt-4">{lesson1.section4.def4_2_title}</h4>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.section4.list4_4) }} />
                  <li className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.section4.list4_5) }} />
                  <li className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.section4.list4_6) }} />
                </ul>

                {/* Comparing Degrees Plot */}
                {lesson1.section4.plot4_title && (
                  <div className="border rounded-lg p-4 bg-card mt-4 max-w-2xl mx-auto">
                    <h5 className="font-semibold text-sm mb-2">{lesson1.section4.plot4_title}</h5>
                    <p className="text-xs text-muted-foreground mb-3">{lesson1.section4.plot4_desc}</p>
                    <div className="w-full bg-muted/20 rounded-lg flex items-center justify-center p-4">
                      <svg viewBox="-3.5 -3 7 6" className="w-full max-w-2xl" preserveAspectRatio="xMidYMid meet">
                        {/* Grid lines */}
                        {[-2, -1, 1, 2].map(v => (
                          <g key={`grid-${v}`}>
                            <line x1={v} y1="-3" x2={v} y2="3" stroke="currentColor" strokeWidth="0.01" opacity="0.1" />
                            <line x1="-3.5" y1={v} x2="3.5" y2={v} stroke="currentColor" strokeWidth="0.01" opacity="0.1" />
                          </g>
                        ))}

                        {/* Axes */}
                        <line x1="-3.5" y1="0" x2="3.5" y2="0" stroke="currentColor" strokeWidth="0.03" />
                        <line x1="0" y1="-3" x2="0" y2="3" stroke="currentColor" strokeWidth="0.03" />
                        {/* Linear: y = x (blue) */}
                        <line x1="-3" y1="3" x2="3" y2="-3" stroke="rgb(59, 130, 246)" strokeWidth="0.06" />

                        {/* Quadratic: y = x² (green) */}
                        <path
                          d={Array.from({ length: 61 }, (_, i) => {
                            const x = (i - 30) / 10;
                            const y = -(x * x);
                            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                          }).join(' ')}
                          stroke="rgb(34, 197, 94)"
                          strokeWidth="0.06"
                          fill="none"
                        />

                        {/* Cubic: y = x³ (red) */}
                        <path
                          d={Array.from({ length: 61 }, (_, i) => {
                            const x = (i - 30) / 10;
                            const y = -(x * x * x);
                            if (Math.abs(y) > 3) return '';
                            return `${i === 0 || (i > 0 && Math.abs((((i - 1) - 30) / 10) ** 3) > 3) ? 'M' : 'L'} ${x} ${y}`;
                          }).filter(s => s !== '').join(' ')}
                          stroke="rgb(239, 68, 68)"
                          strokeWidth="0.06"
                          fill="none"
                        />

                        {/* Labels */}
                        <text x="2.8" y="-2.2" fontSize="0.3" fill="rgb(59, 130, 246)" fontWeight="bold">x</text>
                        <text x="1.8" y="-2.6" fontSize="0.3" fill="rgb(34, 197, 94)" fontWeight="bold">x²</text>
                        <text x="1.2" y="-1.5" fontSize="0.3" fill="rgb(239, 68, 68)" fontWeight="bold">x³</text>

                        {/* Axis labels */}
                        <text x="3.2" y="0.3" fontSize="0.25" fill="currentColor">x</text>
                        <text x="0.15" y="-2.7" fontSize="0.25" fill="currentColor">y</text>
                        <text x="1.9" y="0.35" fontSize="0.2" fill="currentColor">2</text>
                        <line x1="-1" y1="-0.1" x2="-1" y2="0.1" stroke="currentColor" strokeWidth="0.02" />
                        <text x="-1.2" y="0.35" fontSize="0.2" fill="currentColor">-1</text>
                        <line x1="-2" y1="-0.1" x2="-2" y2="0.1" stroke="currentColor" strokeWidth="0.02" />
                        <text x="-2.3" y="0.35" fontSize="0.2" fill="currentColor">-2</text>
                        <line x1="-0.1" y1="-1" x2="0.1" y2="-1" stroke="currentColor" strokeWidth="0.02" />
                        <text x="-0.4" y="-0.9" fontSize="0.2" fill="currentColor">1</text>
                        <line x1="-0.1" y1="-2" x2="0.1" y2="-2" stroke="currentColor" strokeWidth="0.02" />
                        <text x="-0.4" y="-1.9" fontSize="0.2" fill="currentColor">2</text>
                      </svg>
                    </div>
                    <div className="flex justify-center gap-6 mt-3">
                      <span className="text-xs font-semibold text-blue-500">{lesson1.section4.plot4_functions[0].label}</span>
                      <span className="text-xs font-semibold text-green-500">{lesson1.section4.plot4_functions[1].label}</span>
                      <span className="text-xs font-semibold text-red-500">{lesson1.section4.plot4_functions[2].label}</span>
                    </div>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>

            {/* Section 5: Polynomial Equality */}
            <AccordionItem value="section1-5" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-semibold text-lg">{lesson1.section5.title5}</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                <p className="text-muted-foreground text-lg">{lesson1.section5.def5_1}</p>

                {/* Example: Finding Constants */}
                <div className="my-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">{lesson1.section5.ex5_1_title}</h5>
                  <p className="text-muted-foreground text-lg mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.section5.ex5_1_problem) }} />
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.section5.ex5_1_step1) }} />
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.section5.ex5_1_step2) }} />
                    <p className="font-semibold text-lg text-green-700 dark:text-green-400 mt-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.section5.ex5_1_solution) }} />
                  </div>
                </div>

                <div className="my-4 p-4 bg-muted/30 rounded-lg overflow-x-auto">
                  <div dangerouslySetInnerHTML={{ __html: renderMath(lesson1.section5.math5_1) }} />
                </div>
                <p className="text-muted-foreground text-lg">{lesson1.section5.text5_1}</p>
              </AccordionContent>
            </AccordionItem>

            {/* Examples Section */}
            <AccordionItem value="section1-examples" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-semibold text-lg">{lesson1.example_section.title_ex}</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                {/* Example 1: Standard Form & Identification */}
                <div className="mb-6 pb-6 border-b">
                  <h3 className="text-lg font-bold mb-2">{lesson1.example_section.ex1.title}</h3>
                  <p className="text-muted-foreground text-lg mb-2">{lesson1.example_section.ex1.problem}</p>
                  <div className="my-3 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                    <div dangerouslySetInnerHTML={{ __html: renderMath(lesson1.example_section.ex1.problem_math) }} />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-lg">{lesson1.example_section.ex1.step1_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.example_section.ex1.step1_desc) }} />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{lesson1.example_section.ex1.step2_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.example_section.ex1.step2_desc) }} />
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson1.example_section.ex1.step2_math) }} />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{lesson1.example_section.ex1.step3_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.example_section.ex1.step3_desc) }} />
                    </div>
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="font-semibold text-lg text-green-700 dark:text-green-400">{lesson1.example_section.ex1.result_title}</p>
                      <p className="text-muted-foreground text-lg">{lesson1.example_section.ex1.result}</p>
                    </div>
                  </div>
                </div>

                {/* Example 2: Validating Polynomials */}
                <div className="mb-6 pb-6 border-b">
                  <h3 className="text-lg font-bold mb-2">{lesson1.example_section.ex2.title}</h3>
                  <p className="text-muted-foreground text-lg mb-2">{lesson1.example_section.ex2.problem}</p>
                  <div className="my-3 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                    <div dangerouslySetInnerHTML={{ __html: renderMath(lesson1.example_section.ex2.problem_math) }} />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-lg">{lesson1.example_section.ex2.step1_title}</p>
                      <p className="text-muted-foreground text-lg">{lesson1.example_section.ex2.step1_desc}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{lesson1.example_section.ex2.step2_title}</p>
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson1.example_section.ex2.step2_math) }} />
                      </div>
                    </div>
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="font-semibold text-lg text-green-700 dark:text-green-400">{lesson1.example_section.ex2.result_title}</p>
                      <p className="text-muted-foreground text-lg">{lesson1.example_section.ex2.result}</p>
                    </div>
                  </div>
                </div>

                {/* Example 3: Finding Coefficients (Equality) */}
                <div>
                  <h3 className="text-lg font-bold mb-2">{lesson1.example_section.ex3.title}</h3>
                  <p className="text-muted-foreground text-lg mb-2">{lesson1.example_section.ex3.problem}</p>
                  <div className="my-3 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                    <div dangerouslySetInnerHTML={{ __html: renderMath(lesson1.example_section.ex3.problem_math) }} />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-lg">{lesson1.example_section.ex3.step1_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.example_section.ex3.step1_desc) }} />
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson1.example_section.ex3.step1_math) }} />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{lesson1.example_section.ex3.step2_title}</p>
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson1.example_section.ex3.step2_math) }} />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{lesson1.example_section.ex3.step3_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson1.example_section.ex3.step3_desc) }} />
                    </div>
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="font-semibold text-lg text-green-700 dark:text-green-400">{lesson1.example_section.ex3.result_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderMath(lesson1.example_section.ex3.result, false) }} />
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Lesson 2: Polynomial Operations */}
        <div id="lesson-operations" className="max-w-4xl mx-auto mb-12">
          <div className="mb-6">
            <Badge className="mb-3">Lesson 2</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">{course.polynomial_operations.title}</h2>
            <p className="text-muted-foreground">{course.polynomial_operations.description}</p>
          </div>

          <Accordion type="multiple" className="space-y-4">
            {/* Section 1: Addition & Subtraction */}
            <AccordionItem value="section2-1" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-semibold text-lg">{lesson2.section1.title1}</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                <p className="text-muted-foreground text-lg font-semibold">{lesson2.section1.def1_1}</p>
                <p className="text-muted-foreground text-lg">{lesson2.section1.def1_2}</p>

                <div className="my-4 p-4 bg-muted/30 rounded-lg overflow-x-auto">
                  <div dangerouslySetInnerHTML={{ __html: renderMath(lesson2.section1.math1_1) }} />
                </div>
                <div className="my-4 p-4 bg-muted/30 rounded-lg overflow-x-auto">
                  <div dangerouslySetInnerHTML={{ __html: renderMath(lesson2.section1.math1_2) }} />
                </div>

                <p className="text-muted-foreground text-lg">{lesson2.section1.text1_1}</p>

                {/* Example: Subtraction */}
                <div className="my-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">{lesson2.section1.ex1_1_title}</h5>
                  <p className="text-muted-foreground text-lg mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section1.ex1_1_problem) }} />
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section1.ex1_1_step1) }} />
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section1.ex1_1_step2) }} />
                    <p className="font-semibold text-lg text-green-700 dark:text-green-400 mt-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section1.ex1_1_solution) }} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 2: Multiplication */}
            <AccordionItem value="section2-2" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-semibold text-lg">{lesson2.section2.title2}</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section2.def2_1) }} />

                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li className="text-muted-foreground text-lg">{lesson2.section2.list2_1}</li>
                  <li className="text-muted-foreground text-lg">{lesson2.section2.list2_2}</li>
                  <li className="text-muted-foreground text-lg">{lesson2.section2.list2_3}</li>
                </ul>

                {/* Box Method Plot */}
                {lesson2.section2.plot2_title && (
                  <div className="border rounded-lg p-4 bg-card mt-4 max-w-md mx-auto">
                    <h5 className="font-semibold text-sm mb-2">{lesson2.section2.plot2_title}</h5>
                    <p className="text-xs text-muted-foreground mb-3" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section2.plot2_desc) }} />
                    <div className="w-full bg-muted/20 rounded-lg flex items-center justify-center p-4">
                      <svg viewBox="0 0 200 200" className="w-full max-w-xs" preserveAspectRatio="xMidYMid meet">
                        {/* Grid */}
                        <rect x="40" y="40" width="70" height="70" fill="rgb(191, 219, 254)" stroke="currentColor" strokeWidth="2" />
                        <rect x="110" y="40" width="70" height="70" fill="rgb(187, 247, 208)" stroke="currentColor" strokeWidth="2" />
                        <rect x="40" y="110" width="70" height="70" fill="rgb(187, 247, 208)" stroke="currentColor" strokeWidth="2" />
                        <rect x="110" y="110" width="70" height="70" fill="rgb(254, 249, 195)" stroke="currentColor" strokeWidth="2" />

                        {/* Labels */}
                        <text x="75" y="25" fontSize="18" textAnchor="middle" fontWeight="bold" fill="currentColor">x</text>
                        <text x="145" y="25" fontSize="18" textAnchor="middle" fontWeight="bold" fill="currentColor">+3</text>
                        <text x="25" y="75" fontSize="18" textAnchor="middle" fontWeight="bold" fill="currentColor">x</text>
                        <text x="25" y="145" fontSize="18" textAnchor="middle" fontWeight="bold" fill="currentColor">+2</text>

                        {/* Cell values */}
                        <text x="75" y="80" fontSize="16" textAnchor="middle" fontWeight="bold" fill="rgb(37, 99, 235)">x²</text>
                        <text x="145" y="80" fontSize="16" textAnchor="middle" fontWeight="bold" fill="rgb(21, 128, 61)">3x</text>
                        <text x="75" y="150" fontSize="16" textAnchor="middle" fontWeight="bold" fill="rgb(21, 128, 61)">2x</text>
                        <text x="145" y="150" fontSize="16" textAnchor="middle" fontWeight="bold" fill="rgb(161, 98, 7)">6</text>
                      </svg>
                    </div>
                    <p className="text-xs text-center mt-2 text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderTextWithMath("Sum: $x^2 + 3x + 2x + 6 = x^2 + 5x + 6$") }} />
                  </div>
                )}

                {/* Example: FOIL */}
                <div className="my-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">{lesson2.section2.ex2_1_title}</h5>
                  <p className="text-muted-foreground text-lg mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section2.ex2_1_problem) }} />
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section2.ex2_1_step1) }} />
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section2.ex2_1_step2) }} />
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section2.ex2_1_step3) }} />
                    <p className="font-semibold text-lg text-green-700 dark:text-green-400 mt-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section2.ex2_1_solution) }} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 3: Polynomial Long Division */}
            <AccordionItem value="section2-3" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-semibold text-lg">{lesson2.section3.title3}</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                <p className="text-muted-foreground text-lg">{lesson2.section3.def3_1}</p>

                <h4 className="font-semibold text-lg mt-4">Algorithm Steps:</h4>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li className="text-muted-foreground text-lg">{lesson2.section3.step3_1}</li>
                  <li className="text-muted-foreground text-lg">{lesson2.section3.step3_2}</li>
                  <li className="text-muted-foreground text-lg">{lesson2.section3.step3_3}</li>
                  <li className="text-muted-foreground text-lg">{lesson2.section3.step3_4}</li>
                </ul>

                <div className="my-4 p-4 bg-muted/30 rounded-lg overflow-x-auto">
                  <div dangerouslySetInnerHTML={{ __html: renderMath(lesson2.section3.math3_1) }} />
                </div>
                <p className="text-muted-foreground text-lg">{lesson2.section3.text3_1}</p>

                {/* Example: Long Division */}
                <div className="my-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">{lesson2.section3.ex3_1_title}</h5>
                  <p className="text-muted-foreground text-lg mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section3.ex3_1_problem) }} />
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section3.ex3_1_step1) }} />
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section3.ex3_1_step2) }} />
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section3.ex3_1_step3) }} />
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section3.ex3_1_step4) }} />
                    <p className="font-semibold text-lg text-green-700 dark:text-green-400 mt-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section3.ex3_1_solution) }} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 4: Synthetic Division */}
            <AccordionItem value="section2-4" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-semibold text-lg">{lesson2.section4.title4}</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                <p className="text-muted-foreground text-lg">{lesson2.section4.def4_1}</p>

                <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section4.warning4_1) }} />
                </div>

                <h4 className="font-semibold text-lg mt-4">Steps:</h4>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section4.step4_1) }} />
                  <li className="text-muted-foreground text-lg">{lesson2.section4.step4_2}</li>
                  <li className="text-muted-foreground text-lg">{lesson2.section4.step4_3}</li>
                </ul>

                <p className="text-muted-foreground text-lg">{lesson2.section4.text4_2}</p>

                {/* Example: Synthetic Division */}
                <div className="my-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">{lesson2.section4.ex4_1_title}</h5>
                  <p className="text-muted-foreground text-lg mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section4.ex4_1_problem) }} />
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section4.ex4_1_step1) }} />
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section4.ex4_1_step2) }} />
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section4.ex4_1_step3) }} />
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section4.ex4_1_step4) }} />
                    <p className="font-semibold text-lg text-green-700 dark:text-green-400 mt-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.section4.ex4_1_solution) }} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Examples Section */}
            <AccordionItem value="section2-examples" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-semibold text-lg">{lesson2.example_section.title_ex}</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                {/* Example 1: Multiplying Polynomials */}
                <div className="mb-6 pb-6 border-b">
                  <h3 className="text-lg font-bold mb-2">{lesson2.example_section.ex1.title}</h3>
                  <p className="text-muted-foreground text-lg mb-2">{lesson2.example_section.ex1.problem}</p>
                  <div className="my-3 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                    <div dangerouslySetInnerHTML={{ __html: renderMath(lesson2.example_section.ex1.problem_math) }} />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-lg">{lesson2.example_section.ex1.step1_title}</p>
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson2.example_section.ex1.step1_math) }} />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{lesson2.example_section.ex1.step2_title}</p>
                      <p className="text-muted-foreground text-lg">{lesson2.example_section.ex1.step2_desc}</p>
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson2.example_section.ex1.step2_math) }} />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{lesson2.example_section.ex1.step3_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.example_section.ex1.step3_desc) }} />
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson2.example_section.ex1.step3_math) }} />
                      </div>
                    </div>
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="font-semibold text-lg text-green-700 dark:text-green-400">{lesson2.example_section.ex1.result_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderMath(lesson2.example_section.ex1.result, false) }} />
                    </div>
                  </div>
                </div>

                {/* Example 2: Polynomial Long Division */}
                <div className="mb-6 pb-6 border-b">
                  <h3 className="text-lg font-bold mb-2">{lesson2.example_section.ex2.title}</h3>
                  <p className="text-muted-foreground text-lg mb-2">{lesson2.example_section.ex2.problem}</p>
                  <div className="my-3 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                    <div dangerouslySetInnerHTML={{ __html: renderMath(lesson2.example_section.ex2.problem_math) }} />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-lg">{lesson2.example_section.ex2.step1_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.example_section.ex2.step1_desc) }} />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{lesson2.example_section.ex2.step2_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.example_section.ex2.step2_desc) }} />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{lesson2.example_section.ex2.step3_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.example_section.ex2.step3_desc) }} />
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson2.example_section.ex2.step3_math) }} />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{lesson2.example_section.ex2.step4_title}</p>
                      <p className="text-muted-foreground text-lg">{lesson2.example_section.ex2.step4_desc}</p>
                    </div>
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="font-semibold text-lg text-green-700 dark:text-green-400">{lesson2.example_section.ex2.result_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderMath(lesson2.example_section.ex2.result, false) }} />
                    </div>
                  </div>
                </div>

                {/* Example 3: Synthetic Division */}
                <div>
                  <h3 className="text-lg font-bold mb-2">{lesson2.example_section.ex3.title}</h3>
                  <p className="text-muted-foreground text-lg mb-2">{lesson2.example_section.ex3.problem}</p>
                  <div className="my-3 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                    <div dangerouslySetInnerHTML={{ __html: renderMath(lesson2.example_section.ex3.problem_math) }} />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-lg">{lesson2.example_section.ex3.step1_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson2.example_section.ex3.step1_desc) }} />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{lesson2.example_section.ex3.step2_title}</p>
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson2.example_section.ex3.step2_math) }} />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{lesson2.example_section.ex3.step3_title}</p>
                      <p className="text-muted-foreground text-lg">{lesson2.example_section.ex3.step3_desc}</p>
                    </div>
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="font-semibold text-lg text-green-700 dark:text-green-400">{lesson2.example_section.ex3.result_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderMath(lesson2.example_section.ex3.result, false) }} />
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Lesson 3: Factorization Techniques */}
        <div id="lesson-factoring" className="max-w-4xl mx-auto mb-12">
          <div className="mb-6">
            <Badge className="mb-3">Lesson 3</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">{(course as any).factorization_techniques?.title || polynomialCourse.en.factorization_techniques.title}</h2>
            <p className="text-muted-foreground">{(course as any).factorization_techniques?.description || polynomialCourse.en.factorization_techniques.description}</p>
          </div>

          <Accordion type="multiple" className="space-y-4">
            {/* Section 1: GCF */}
            <AccordionItem value="section3-1" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-semibold text-lg">{lesson3.section1.title1}</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                <p className="text-muted-foreground text-lg font-semibold">{lesson3.section1.def1_1}</p>

                <p className="text-muted-foreground text-lg">{lesson3.section1.text1_1}</p>

                <div className="my-4 p-4 bg-muted/30 rounded-lg overflow-x-auto">
                  <div dangerouslySetInnerHTML={{ __html: renderMath(lesson3.section1.math1_1) }} />
                </div>

                <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <p className="text-muted-foreground text-lg">{lesson3.section1.warning1}</p>
                </div>

                {/* Example: GCF */}
                <div className="my-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">{lesson3.section1.ex1_1_title}</h5>
                  <p className="text-muted-foreground text-lg mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section1.ex1_1_problem) }} />
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-lg">{lesson3.section1.ex1_1_step1}</p>
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section1.ex1_1_step2) }} />
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section1.ex1_1_step3) }} />
                    <p className="font-semibold text-lg text-green-700 dark:text-green-400 mt-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section1.ex1_1_solution) }} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 2: Special Patterns */}
            <AccordionItem value="section3-2" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-semibold text-lg">{lesson3.section2.title2}</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                <h4 className="font-semibold text-lg">{lesson3.section2.def2_1_title}</h4>
                <p className="text-muted-foreground text-lg">{lesson3.section2.def2_1}</p>
                <div className="my-4 p-4 bg-muted/30 rounded-lg overflow-x-auto">
                  <div dangerouslySetInnerHTML={{ __html: renderMath(lesson3.section2.math2_1) }} />
                </div>

                {/* Difference of Squares Geometry Plot */}
                {lesson3.section2.plot2_title && (
                  <div className="border rounded-lg p-4 bg-card mt-4 max-w-xl mx-auto">
                    <h5 className="font-semibold text-sm mb-2">{lesson3.section2.plot2_title}</h5>
                    <p className="text-xs text-muted-foreground mb-3" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section2.plot2_desc) }} />
                    <div className="w-full bg-muted/20 rounded-lg flex items-center justify-center p-4">
                      <svg viewBox="0 0 280 240" className="w-full max-w-md" preserveAspectRatio="xMidYMid meet">
                        {/* Large square (a²) */}
                        <rect x="20" y="20" width="140" height="140" fill="rgb(191, 219, 254)" stroke="currentColor" strokeWidth="2" />
                        <text x="90" y="95" fontSize="20" textAnchor="middle" fontWeight="bold" fill="rgb(37, 99, 235)">a²</text>

                        {/* Small square (b²) - cut out */}
                        <rect x="100" y="100" width="60" height="60" fill="white" stroke="red" strokeWidth="2" strokeDasharray="4" />
                        <text x="130" y="135" fontSize="16" textAnchor="middle" fontWeight="bold" fill="red">b²</text>

                        {/* Rectangle rearrangement (right side) */}
                        <g transform="translate(180, 20)">
                          <rect x="0" y="0" width="80" height="60" fill="rgb(187, 247, 208)" stroke="currentColor" strokeWidth="2" />
                          <text x="40" y="35" fontSize="14" textAnchor="middle" fontWeight="bold" fill="rgb(21, 128, 61)">(a-b)(a+b)</text>
                        </g>

                        {/* Labels */}
                        <text x="90" y="175" fontSize="14" textAnchor="middle" fill="currentColor">a</text>
                        <text x="5" y="95" fontSize="14" textAnchor="middle" fill="currentColor">a</text>
                        <text x="220" y="95" fontSize="12" textAnchor="middle" fill="currentColor">a-b</text>
                        <text x="220" y="10" fontSize="12" textAnchor="middle" fill="currentColor">a+b</text>

                        {/* Arrow showing transformation */}
                        <path d="M 165 90 Q 175 90 180 90" stroke="currentColor" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
                        <defs>
                          <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                            <polygon points="0 0, 10 3, 0 6" fill="currentColor" />
                          </marker>
                        </defs>

                        <text x="140" y="220" fontSize="12" textAnchor="middle" fill="currentColor" fontStyle="italic">{lesson3.section3.plot3_description}</text>
                      </svg>
                    </div>
                  </div>
                )}

                {/* Example: Difference of Squares */}
                <div className="my-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">{lesson3.section2.ex2_1_title}</h5>
                  <p className="text-muted-foreground text-lg mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section2.ex2_1_problem) }} />
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section2.ex2_1_step1) }} />
                    <p className="font-semibold text-lg text-green-700 dark:text-green-400 mt-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section2.ex2_1_solution) }} />
                  </div>
                </div>

                <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section2.text2_1) }} />

                <h4 className="font-semibold text-lg mt-6">{lesson3.section2.def2_2_title}</h4>
                <p className="text-muted-foreground text-lg">{lesson3.section2.def2_2}</p>
                <div className="my-4 p-4 bg-muted/30 rounded-lg overflow-x-auto">
                  <div dangerouslySetInnerHTML={{ __html: renderMath(lesson3.section2.math2_2) }} />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 3: Factoring by Grouping */}
            <AccordionItem value="section3-3" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-semibold text-lg">{lesson3.section3.title3}</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                <p className="text-muted-foreground text-lg">{lesson3.section3.def3_1}</p>

                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li className="text-muted-foreground text-lg">{lesson3.section3.step3_1}</li>
                  <li className="text-muted-foreground text-lg">{lesson3.section3.step3_2}</li>
                  <li className="text-muted-foreground text-lg">{lesson3.section3.step3_3}</li>
                </ul>

                <div className="my-4 p-4 bg-muted/30 rounded-lg overflow-x-auto">
                  <div dangerouslySetInnerHTML={{ __html: renderMath(lesson3.section3.math3_1) }} />
                </div>

                {/* Grouping Visualization */}
                {lesson3.section3.plot3_title && (
                  <div className="border rounded-lg p-4 bg-card mt-4 max-w-2xl mx-auto">
                    <h5 className="font-semibold text-sm mb-2">{lesson3.section3.plot3_title}</h5>
                    <p className="text-xs text-muted-foreground mb-3" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section3.plot3_desc) }} />
                    <div className="w-full bg-muted/20 rounded-lg p-6">
                      <div className="space-y-3">
                        <div className="text-center">
                          <span className="text-lg font-mono" dangerouslySetInnerHTML={{ __html: renderTextWithMath("$x^3 + 2x^2 + 3x + 6$") }} />
                        </div>
                        <div className="flex items-center justify-center gap-4">
                          <div className="p-3 bg-blue-500/10 border-2 border-blue-500 rounded-lg">
                            <span className="text-base font-mono" dangerouslySetInnerHTML={{ __html: renderTextWithMath("$x^2(x + 2)$") }} />
                          </div>
                          <span className="text-xl font-bold">+</span>
                          <div className="p-3 bg-green-500/10 border-2 border-green-500 rounded-lg">
                            <span className="text-base font-mono" dangerouslySetInnerHTML={{ __html: renderTextWithMath("$3(x + 2)$") }} />
                          </div>
                        </div>
                        <div className="text-center pt-2 border-t-2 border-dashed">
                          <div className="p-3 bg-purple-500/10 border-2 border-purple-500 rounded-lg inline-block">
                            <span className="text-base font-mono font-bold" dangerouslySetInnerHTML={{ __html: renderTextWithMath("$(x^2 + 3)(x + 2)$") }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Example: Grouping */}
                <div className="my-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">{lesson3.section3.ex3_1_title}</h5>
                  <p className="text-muted-foreground text-lg mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section3.ex3_1_problem) }} />
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section3.ex3_1_step1) }} />
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section3.ex3_1_step2) }} />
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section3.ex3_1_step3) }} />
                    <p className="font-semibold text-lg text-green-700 dark:text-green-400 mt-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section3.ex3_1_solution) }} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 4: Advanced Techniques */}
            <AccordionItem value="section3-4" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-semibold text-lg">{lesson3.section4.title4}</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                <h4 className="font-semibold text-lg">{lesson3.section4.def4_1_title}</h4>
                <div className="my-4 p-4 bg-muted/30 rounded-lg overflow-x-auto">
                  <div dangerouslySetInnerHTML={{ __html: renderMath(lesson3.section4.math4_1) }} />
                </div>
                <div className="my-4 p-4 bg-muted/30 rounded-lg overflow-x-auto">
                  <div dangerouslySetInnerHTML={{ __html: renderMath(lesson3.section4.math4_2) }} />
                </div>

                {/* SOAP Mnemonic */}
                {lesson3.section4.plot4_title && (
                  <div className="border rounded-lg p-4 bg-card mt-4 max-w-2xl mx-auto">
                    <h5 className="font-semibold text-sm mb-2">{lesson3.section4.plot4_title}</h5>
                    <p className="text-xs text-muted-foreground mb-3">{lesson3.section4.plot4_desc}</p>
                    <div className="w-full bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg p-4">
                      <div className="flex items-center justify-center gap-3">
                        <div className="text-center">
                          <div className="text-5xl font-bold text-blue-600 dark:text-blue-400">S</div>
                          <div className="text-sm mt-1 font-semibold">{lesson3.section4.plot4_data.meaning[0]}</div>
                        </div> 
                        <div className="text-center">
                          <div className="text-5xl font-bold text-green-600 dark:text-green-400">O</div>
                          <div className="text-sm mt-1 font-semibold">{lesson3.section4.plot4_data.meaning[1]}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-5xl font-bold text-orange-600 dark:text-orange-400">A</div>
                          <div className="text-sm mt-1 font-semibold">{lesson3.section4.plot4_data.meaning[2]}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-5xl font-bold text-purple-600 dark:text-purple-400">P</div>
                          <div className="text-sm mt-1 font-semibold">{lesson3.section4.plot4_data.meaning[3]}</div>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-center mt-2 text-muted-foreground">{lesson3.section4.text4_1}</p>
                  </div>
                )}

                {/* Example: Cubes */}
                <div className="my-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">{lesson3.section4.ex4_1_title}</h5>
                  <p className="text-muted-foreground text-lg mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section4.ex4_1_problem) }} />
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section4.ex4_1_step1) }} />
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section4.ex4_1_step2) }} />
                    <p className="font-semibold text-lg text-green-700 dark:text-green-400 mt-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section4.ex4_1_solution) }} />
                  </div>
                </div>

                <h4 className="font-semibold text-lg mt-6">{lesson3.section4.def4_2_title}</h4>
                <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section4.text4_2) }} />

                {/* Example: AC Method */}
                <div className="my-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">{lesson3.section4.ex4_2_title}</h5>
                  <p className="text-muted-foreground text-lg mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section4.ex4_2_problem) }} />
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section4.ex4_2_step1) }} />
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section4.ex4_2_step2) }} />
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section4.ex4_2_step3) }} />
                    <p className="font-semibold text-lg text-green-700 dark:text-green-400 mt-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.section4.ex4_2_solution) }} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Examples Section */}
            <AccordionItem value="section3-examples" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-semibold text-lg">{lesson3.example_section.title_ex}</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                {/* Example 1: GCF & Difference of Squares */}
                <div className="mb-6 pb-6 border-b">
                  <h3 className="text-lg font-bold mb-2">{lesson3.example_section.ex1.title}</h3>
                  <p className="text-muted-foreground text-lg mb-2">{lesson3.example_section.ex1.problem}</p>
                  <div className="my-3 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                    <div dangerouslySetInnerHTML={{ __html: renderMath(lesson3.example_section.ex1.problem_math) }} />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-lg">{lesson3.example_section.ex1.step1_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.example_section.ex1.step1_desc) }} />
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson3.example_section.ex1.step1_math) }} />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{lesson3.example_section.ex1.step2_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.example_section.ex1.step2_desc) }} />
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson3.example_section.ex1.step2_math) }} />
                      </div>
                    </div>
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="font-semibold text-lg text-green-700 dark:text-green-400">{lesson3.example_section.ex1.result_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderMath(lesson3.example_section.ex1.result, false) }} />
                    </div>
                  </div>
                </div>

                {/* Example 2: Factoring by Grouping */}
                <div className="mb-6 pb-6 border-b">
                  <h3 className="text-lg font-bold mb-2">{lesson3.example_section.ex2.title}</h3>
                  <p className="text-muted-foreground text-lg mb-2">{lesson3.example_section.ex2.problem}</p>
                  <div className="my-3 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                    <div dangerouslySetInnerHTML={{ __html: renderMath(lesson3.example_section.ex2.problem_math) }} />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-lg">{lesson3.example_section.ex2.step1_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.example_section.ex2.step1_desc) }} />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{lesson3.example_section.ex2.step2_title}</p>
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson3.example_section.ex2.step2_math) }} />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{lesson3.example_section.ex2.step3_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.example_section.ex2.step3_desc) }} />
                    </div>
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="font-semibold text-lg text-green-700 dark:text-green-400">{lesson3.example_section.ex2.result_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderMath(lesson3.example_section.ex2.result, false) }} />
                    </div>
                  </div>
                </div>

                {/* Example 3: AC Method */}
                <div>
                  <h3 className="text-lg font-bold mb-2">{lesson3.example_section.ex3.title}</h3>
                  <p className="text-muted-foreground text-lg mb-2">{lesson3.example_section.ex3.problem}</p>
                  <div className="my-3 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                    <div dangerouslySetInnerHTML={{ __html: renderMath(lesson3.example_section.ex3.problem_math) }} />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-lg">{lesson3.example_section.ex3.step1_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.example_section.ex3.step1_desc) }} />
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson3.example_section.ex3.step1_math) }} />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{lesson3.example_section.ex3.step2_title}</p>
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson3.example_section.ex3.step2_math) }} />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{lesson3.example_section.ex3.step3_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson3.example_section.ex3.step3_desc) }} />
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson3.example_section.ex3.step3_math) }} />
                      </div>
                    </div>
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="font-semibold text-lg text-green-700 dark:text-green-400">{lesson3.example_section.ex3.result_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderMath(lesson3.example_section.ex3.result, false) }} />
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Lesson 4: Roots & Zeros */}
        <div id="lesson-roots" className="max-w-4xl mx-auto mb-12">
          <div className="mb-6">
            <Badge className="mb-3">Lesson 4</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">{(course as any).roots_zeros?.title || polynomialCourse.en.roots_zeros.title}</h2>
            <p className="text-muted-foreground">{(course as any).roots_zeros?.description || polynomialCourse.en.roots_zeros.description}</p>
          </div>

          <Accordion type="multiple" className="space-y-4">
            {/* Section 1: Fundamental & Factor Theorems */}
            <AccordionItem value="section4-1" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-semibold text-lg">{lesson4.section1.title1}</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                <p className="text-muted-foreground text-lg font-semibold" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section1.def1_1) }} />

                <p className="text-muted-foreground text-lg">{lesson4.section1.text1_1}</p>

                {/* Root-Factor Connection Visual */}
                {lesson4.section1.plot1_title && (
                  <div className="border rounded-lg p-4 bg-card mt-4 max-w-2xl mx-auto">
                    <h5 className="font-semibold text-sm mb-2">{lesson4.section1.plot1_title}</h5>
                    <p className="text-xs text-muted-foreground mb-3" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section1.plot1_desc) }} />
                    <div className="w-full bg-muted/20 rounded-lg flex items-center justify-center p-4">
                      <svg viewBox="0 0 320 200" className="w-full max-w-md" preserveAspectRatio="xMidYMid meet">
                        {/* X-axis */}
                        <line x1="20" y1="120" x2="300" y2="120" stroke="currentColor" strokeWidth="1.5" />
                        {/* Y-axis */}
                        <line x1="60" y1="10" x2="60" y2="190" stroke="currentColor" strokeWidth="1.5" />
                        
                        {/* Cubic curve passing through x=2 */}
                        <path d="M 30 160 Q 60 180, 90 120 Q 110 70, 140 30 Q 160 10, 180 40 Q 200 80, 220 120 Q 240 150, 260 160 Q 280 170, 290 140" 
                              fill="none" stroke="rgb(59, 130, 246)" strokeWidth="2.5" />
                        
                        {/* Root point at x=2 */}
                        <circle cx="220" cy="120" r="6" fill="rgb(239, 68, 68)" stroke="white" strokeWidth="2" />
                        
                        {/* Root label */}
                        <text x="220" y="145" fontSize="12" textAnchor="middle" fill="rgb(239, 68, 68)" fontWeight="bold">c = 2</text>
                        
                        {/* Factor label */}
                        <rect x="180" y="55" width="90" height="28" rx="4" fill="rgb(220, 252, 231)" stroke="rgb(34, 197, 94)" strokeWidth="1.5" />
                        <text x="225" y="74" fontSize="12" textAnchor="middle" fill="rgb(21, 128, 61)" fontWeight="bold">(x − 2) is a factor</text>
                        
                        {/* Arrow from label to point */}
                        <line x1="220" y1="83" x2="220" y2="112" stroke="rgb(34, 197, 94)" strokeWidth="1.5" strokeDasharray="3" />
                        
                        {/* P(c)=0 label */}
                        <text x="250" y="105" fontSize="11" fill="rgb(239, 68, 68)" fontStyle="italic">P(2) = 0</text>
                        
                        {/* Axis labels */}
                        <text x="290" y="115" fontSize="10" fill="currentColor">x</text>
                        <text x="65" y="15" fontSize="10" fill="currentColor">y</text>
                      </svg>
                    </div>
                  </div>
                )}

                <p className="text-muted-foreground text-lg">{lesson4.section1.def1_2}</p>
                <div className="my-4 p-4 bg-muted/30 rounded-lg overflow-x-auto">
                  <div dangerouslySetInnerHTML={{ __html: renderMath(lesson4.section1.math1_1) }} />
                </div>
                <p className="text-muted-foreground text-lg">{lesson4.section1.text1_2}</p>
              </AccordionContent>
            </AccordionItem>

            {/* Section 2: Rational Root Theorem */}
            <AccordionItem value="section4-2" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-semibold text-lg">{lesson4.section2.title2}</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section2.def2_1) }} />

                <div className="my-4 p-4 bg-muted/30 rounded-lg overflow-x-auto">
                  <div dangerouslySetInnerHTML={{ __html: renderMath(lesson4.section2.math2_1) }} />
                </div>

                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section2.step2_1) }} />
                  <li className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section2.step2_2) }} />
                  <li className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section2.step2_3) }} />
                </ul>

                {/* Example: Rational Root Theorem */}
                <div className="my-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">{lesson4.section2.ex2_1_title}</h5>
                  <p className="text-muted-foreground text-lg mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section2.ex2_1_problem) }} />
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section2.ex2_1_step1) }} />
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section2.ex2_1_step2) }} />
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section2.ex2_1_step3) }} />
                    <p className="font-semibold text-lg text-green-700 dark:text-green-400 mt-2">{lesson4.section2.ex2_1_solution}</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 3: Multiplicity */}
            <AccordionItem value="section4-3" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-semibold text-lg">{lesson4.section3.title3}</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                <p className="text-muted-foreground text-lg">{lesson4.section3.def3_1}</p>
                <div className="my-4 p-4 bg-muted/30 rounded-lg overflow-x-auto">
                  <div dangerouslySetInnerHTML={{ __html: renderMath(lesson4.section3.math3_1) }} />
                </div>

                {/* Multiplicity Behavior Visual */}
                {lesson4.section3.plot3_title && (
                  <div className="border rounded-lg p-4 bg-card mt-4 max-w-2xl mx-auto">
                    <h5 className="font-semibold text-sm mb-2">{lesson4.section3.plot3_title}</h5>
                    <p className="text-xs text-muted-foreground mb-3" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section3.plot3_desc) }} />
                    <div className="w-full bg-muted/20 rounded-lg flex items-center justify-center p-4">
                      <svg viewBox="0 0 320 200" className="w-full max-w-md" preserveAspectRatio="xMidYMid meet">
                        {/* X-axis */}
                        <line x1="20" y1="130" x2="300" y2="130" stroke="currentColor" strokeWidth="1.5" />
                        
                        {/* Curve: (x-1)(x-2)^2 behavior */}
                        <path d="M 30 180 Q 60 190, 100 130 Q 120 80, 140 40 Q 160 20, 190 80 Q 210 130, 230 130 Q 250 130, 270 80" 
                              fill="none" stroke="rgb(59, 130, 246)" strokeWidth="2.5" />
                        
                        {/* Cross point at x=1 */}
                        <circle cx="100" cy="130" r="6" fill="rgb(34, 197, 94)" stroke="white" strokeWidth="2" />
                        <text x="100" y="155" fontSize="11" textAnchor="middle" fill="rgb(21, 128, 61)" fontWeight="bold">x = 1</text>
                        <text x="100" y="168" fontSize="9" textAnchor="middle" fill="rgb(21, 128, 61)">Crosses (odd)</text>
                        
                        {/* Bounce point at x=2 */}
                        <circle cx="230" cy="130" r="6" fill="rgb(239, 68, 68)" stroke="white" strokeWidth="2" />
                        <text x="230" y="155" fontSize="11" textAnchor="middle" fill="rgb(239, 68, 68)" fontWeight="bold">x = 2</text>
                        <text x="230" y="168" fontSize="9" textAnchor="middle" fill="rgb(239, 68, 68)">Bounces (even)</text>
                        
                        {/* Arrow indicators */}
                        <path d="M 90 110 L 110 150" stroke="rgb(34, 197, 94)" strokeWidth="1.5" fill="none" />
                        <path d="M 220 110 Q 230 130, 240 110" stroke="rgb(239, 68, 68)" strokeWidth="1.5" fill="none" />
                      </svg>
                    </div>
                  </div>
                )}

                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section3.list3_1) }} />
                  <li className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section3.list3_2) }} />
                </ul>

                {/* Example: Multiplicity */}
                <div className="my-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">{lesson4.section3.ex3_1_title}</h5>
                  <p className="text-muted-foreground text-lg mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section3.ex3_1_problem) }} />
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section3.ex3_1_step1) }} />
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section3.ex3_1_step2) }} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 4: Complex Roots */}
            <AccordionItem value="section4-4" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-semibold text-lg">{lesson4.section4.title4}</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                <p className="text-muted-foreground text-lg">{lesson4.section4.def4_1}</p>
                <div className="my-4 p-4 bg-muted/30 rounded-lg overflow-x-auto">
                  <div dangerouslySetInnerHTML={{ __html: renderMath(lesson4.section4.math4_2) }} />
                </div>
                <p className="text-muted-foreground text-lg">{lesson4.section4.text4_1}</p>

                {/* Example: Complex Conjugates */}
                <div className="my-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">{lesson4.section4.ex4_1_title}</h5>
                  <p className="text-muted-foreground text-lg mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section4.ex4_1_problem) }} />
                  <div className="space-y-1">
                    <p className="font-semibold text-lg text-green-700 dark:text-green-400 mt-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.section4.ex4_1_solution) }} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Examples Section */}
            <AccordionItem value="section4-examples" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-semibold text-lg">{lesson4.example_section.title_ex}</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                {/* Example 1: Rational Root Theorem */}
                <div className="mb-6 pb-6 border-b">
                  <h3 className="text-lg font-bold mb-2">{lesson4.example_section.ex1.title}</h3>
                  <p className="text-muted-foreground text-lg mb-2">{lesson4.example_section.ex1.problem}</p>
                  <div className="my-3 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                    <div dangerouslySetInnerHTML={{ __html: renderMath(lesson4.example_section.ex1.problem_math) }} />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-lg">{lesson4.example_section.ex1.step1_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.example_section.ex1.step1_desc) }} />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{lesson4.example_section.ex1.step2_title}</p>
                      <p className="text-muted-foreground text-lg">{lesson4.example_section.ex1.step2_desc}</p>
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson4.example_section.ex1.step2_math) }} />
                      </div>
                    </div>
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="font-semibold text-lg text-green-700 dark:text-green-400">{lesson4.example_section.ex1.result_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderMath(lesson4.example_section.ex1.result, false) }} />
                    </div>
                  </div>
                </div>

                {/* Example 2: Factor Theorem */}
                <div className="mb-6 pb-6 border-b">
                  <h3 className="text-lg font-bold mb-2">{lesson4.example_section.ex2.title}</h3>
                  <p className="text-muted-foreground text-lg mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.example_section.ex2.problem) }} />
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-lg">{lesson4.example_section.ex2.step1_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.example_section.ex2.step1_desc) }} />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{lesson4.example_section.ex2.step2_title}</p>
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson4.example_section.ex2.step2_math) }} />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{lesson4.example_section.ex2.step3_title}</p>
                      <p className="text-muted-foreground text-lg">{lesson4.example_section.ex2.step3_desc}</p>
                    </div>
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="font-semibold text-lg text-green-700 dark:text-green-400">{lesson4.example_section.ex2.result_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson4.example_section.ex2.result) }} />
                    </div>
                  </div>
                </div>

                {/* Example 3: Multiplicity Analysis */}
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

        {/* Lesson 5: Polynomial Equations */}
        <div id="lesson-equations" className="max-w-4xl mx-auto mb-12">
          <div className="mb-6">
            <Badge className="mb-3">Lesson 5</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">{(course as any).polynomial_equations?.title || polynomialCourse.en.polynomial_equations.title}</h2>
            <p className="text-muted-foreground">{(course as any).polynomial_equations?.description || polynomialCourse.en.polynomial_equations.description}</p>
          </div>

          <Accordion type="multiple" className="space-y-4">
            {/* Section 1: Linear Equations */}
            <AccordionItem value="section5-1" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-semibold text-lg">{lesson5.section1.title1}</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                <p className="text-muted-foreground text-lg">{lesson5.section1.def1_1}</p>

                {/* Linear Solving Visual */}
                {lesson5.section1.plot1_title && (
                  <div className="border rounded-lg p-4 bg-card mt-4 max-w-2xl mx-auto">
                    <h5 className="font-semibold text-sm mb-2">{lesson5.section1.plot1_title}</h5>
                    <p className="text-xs text-muted-foreground mb-3" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section1.plot1_desc) }} />
                    <div className="w-full bg-muted/20 rounded-lg flex items-center justify-center p-4">
                      <svg viewBox="0 0 320 180" className="w-full max-w-md" preserveAspectRatio="xMidYMid meet">
                        {/* Step boxes */}
                        <rect x="10" y="20" width="90" height="50" rx="8" fill="rgb(239, 246, 255)" stroke="rgb(59, 130, 246)" strokeWidth="2" />
                        <text x="55" y="40" fontSize="11" textAnchor="middle" fill="rgb(37, 99, 235)" fontWeight="bold">2x - 6 = 0</text>
                        <text x="55" y="58" fontSize="9" textAnchor="middle" fill="rgb(100, 116, 139)">Original</text>

                        {/* Arrow 1 */}
                        <path d="M 100 45 L 120 45" stroke="rgb(34, 197, 94)" strokeWidth="2" fill="none" markerEnd="url(#arrowGreen)" />
                        <text x="110" y="38" fontSize="8" textAnchor="middle" fill="rgb(21, 128, 61)">+6</text>

                        <rect x="120" y="20" width="80" height="50" rx="8" fill="rgb(240, 253, 244)" stroke="rgb(34, 197, 94)" strokeWidth="2" />
                        <text x="160" y="40" fontSize="11" textAnchor="middle" fill="rgb(21, 128, 61)" fontWeight="bold">2x = 6</text>
                        <text x="160" y="58" fontSize="9" textAnchor="middle" fill="rgb(100, 116, 139)">Isolate term</text>

                        {/* Arrow 2 */}
                        <path d="M 200 45 L 220 45" stroke="rgb(168, 85, 247)" strokeWidth="2" fill="none" markerEnd="url(#arrowPurple)" />
                        <text x="210" y="38" fontSize="8" textAnchor="middle" fill="rgb(126, 34, 206)">÷2</text>

                        <rect x="220" y="20" width="80" height="50" rx="8" fill="rgb(250, 245, 255)" stroke="rgb(168, 85, 247)" strokeWidth="2" />
                        <text x="260" y="45" fontSize="14" textAnchor="middle" fill="rgb(126, 34, 206)" fontWeight="bold">x = 3</text>

                        {/* Number line */}
                        <line x1="30" y1="130" x2="290" y2="130" stroke="currentColor" strokeWidth="1.5" />
                        {[0, 1, 2, 3, 4, 5, 6].map(n => (
                          <g key={`nl-${n}`}>
                            <line x1={30 + n * 40} y1={125} x2={30 + n * 40} y2={135} stroke="currentColor" strokeWidth="1" />
                            <text x={30 + n * 40} y={148} fontSize="10" textAnchor="middle" fill="currentColor">{n}</text>
                          </g>
                        ))}
                        <circle cx={150} cy={130} r="5" fill="rgb(239, 68, 68)" stroke="white" strokeWidth="2" />
                        <text x={150} y={165} fontSize="11" textAnchor="middle" fill="rgb(239, 68, 68)" fontWeight="bold">x = 3 ✓</text>

                        <defs>
                          <marker id="arrowGreen" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><polygon points="0 0, 8 4, 0 8" fill="rgb(34, 197, 94)" /></marker>
                          <marker id="arrowPurple" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><polygon points="0 0, 8 4, 0 8" fill="rgb(168, 85, 247)" /></marker>
                        </defs>
                      </svg>
                    </div>
                  </div>
                )}

                <div className="my-4 p-4 bg-muted/30 rounded-lg overflow-x-auto">
                  <div dangerouslySetInnerHTML={{ __html: renderMath(lesson5.section1.math1_1) }} />
                </div>
                <p className="text-muted-foreground text-lg">{lesson5.section1.text1_1}</p>

                {/* Example: Linear */}
                <div className="my-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">{lesson5.section1.ex1_1_title}</h5>
                  <p className="text-muted-foreground text-lg mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section1.ex1_1_problem) }} />
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section1.ex1_1_step1) }} />
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section1.ex1_1_step2) }} />
                    <p className="font-semibold text-lg text-green-700 dark:text-green-400 mt-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section1.ex1_1_solution) }} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 2: Quadratic Equations */}
            <AccordionItem value="section5-2" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-semibold text-lg">{lesson5.section2.title2}</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section2.def2_1) }} />

                <h4 className="font-semibold text-lg mt-4">{lesson5.section2.def2_2_title}</h4>
                <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section2.text2_1) }} />

                {/* Example: Factoring */}
                <div className="my-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">{lesson5.section2.ex2_1_title}</h5>
                  <p className="text-muted-foreground text-lg mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section2.ex2_1_problem) }} />
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section2.ex2_1_step1) }} />
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section2.ex2_1_step2) }} />
                    <p className="font-semibold text-lg text-green-700 dark:text-green-400 mt-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section2.ex2_1_solution) }} />
                  </div>
                </div>

                <h4 className="font-semibold text-lg mt-6">{lesson5.section2.def2_3_title}</h4>
                <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section2.text2_2) }} />
                <div className="my-4 p-4 bg-muted/30 rounded-lg overflow-x-auto">
                  <div dangerouslySetInnerHTML={{ __html: renderMath(lesson5.section2.math2_1) }} />
                </div>

                {/* Example: Quadratic Formula */}
                <div className="my-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">{lesson5.section2.ex2_2_title}</h5>
                  <p className="text-muted-foreground text-lg mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section2.ex2_2_problem) }} />
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section2.ex2_2_step1) }} />
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section2.ex2_2_step2) }} />
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section2.ex2_2_step3) }} />
                    <p className="font-semibold text-lg text-green-700 dark:text-green-400 mt-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section2.ex2_2_solution) }} />
                  </div>
                </div>

                <h4 className="font-semibold text-lg mt-6">{lesson5.section2.def2_4_title}</h4>
                <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section2.text2_3) }} />

                {/* Discriminant Cases Visual */}
                {lesson5.section2.plot2_title && (
                  <div className="border rounded-lg p-4 bg-card mt-4 max-w-2xl mx-auto">
                    <h5 className="font-semibold text-sm mb-2">{lesson5.section2.plot2_title}</h5>
                    <p className="text-xs text-muted-foreground mb-3" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section2.plot2_desc) }} />
                    <div className="w-full bg-muted/20 rounded-lg flex items-center justify-center p-4">
                      <svg viewBox="0 0 320 220" className="w-full max-w-md" preserveAspectRatio="xMidYMid meet">
                        {/* X-axis */}
                        <line x1="20" y1="150" x2="300" y2="150" stroke="currentColor" strokeWidth="1.5" />
                        {/* Y-axis */}
                        <line x1="160" y1="10" x2="160" y2="210" stroke="currentColor" strokeWidth="1.5" />

                        {/* Δ > 0: x² - 4 (crosses twice) */}
                        <path d="M 40 170 Q 100 30, 160 110 Q 220 30, 280 170" fill="none" stroke="rgb(59, 130, 246)" strokeWidth="2.5" />
                        <circle cx="100" cy="150" r="4" fill="rgb(59, 130, 246)" />
                        <circle cx="220" cy="150" r="4" fill="rgb(59, 130, 246)" />

                        {/* Δ = 0: x² (touches once) */}
                        <path d="M 80 190 Q 120 140, 160 150 Q 200 140, 240 190" fill="none" stroke="rgb(34, 197, 94)" strokeWidth="2.5" strokeDasharray="6" />
                        <circle cx="160" cy="150" r="4" fill="rgb(34, 197, 94)" />

                        {/* Δ < 0: x² + 2 (no real roots) */}
                        <path d="M 80 130 Q 120 80, 160 90 Q 200 80, 240 130" fill="none" stroke="rgb(239, 68, 68)" strokeWidth="2.5" strokeDasharray="3" />

                        {/* Labels */}
                        <text x="280" y="175" fontSize="10" fill="rgb(59, 130, 246)" fontWeight="bold">Δ &gt; 0</text>
                        <text x="245" y="200" fontSize="10" fill="rgb(34, 197, 94)" fontWeight="bold">Δ = 0</text>
                        <text x="245" y="125" fontSize="10" fill="rgb(239, 68, 68)" fontWeight="bold">Δ &lt; 0</text>

                        <text x="295" y="147" fontSize="10" fill="currentColor">x</text>
                        <text x="163" y="15" fontSize="10" fill="currentColor">y</text>
                      </svg>
                    </div>
                  </div>
                )}

                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section2.list2_1) }} />
                  <li className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section2.list2_2) }} />
                  <li className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section2.list2_3) }} />
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* Section 3: Cubic & Higher Degree */}
            <AccordionItem value="section5-3" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-semibold text-lg">{lesson5.section3.title3}</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                <p className="text-muted-foreground text-lg font-semibold">{lesson5.section3.def3_1}</p>

                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li className="text-muted-foreground text-lg">{lesson5.section3.step3_1}</li>
                  <li className="text-muted-foreground text-lg">{lesson5.section3.step3_2}</li>
                  <li className="text-muted-foreground text-lg">{lesson5.section3.step3_3}</li>
                </ul>

                <p className="text-muted-foreground text-lg">{lesson5.section3.text3_1}</p>

                {/* Example: Solving a Cubic */}
                <div className="my-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">{lesson5.section3.ex3_1_title}</h5>
                  <p className="text-muted-foreground text-lg mb-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section3.ex3_1_problem) }} />
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section3.ex3_1_step1) }} />
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section3.ex3_1_step2) }} />
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section3.ex3_1_step3) }} />
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section3.ex3_1_step4) }} />
                    <p className="font-semibold text-lg text-green-700 dark:text-green-400 mt-2" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section3.ex3_1_solution) }} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 4: Word Problems & Modeling */}
            <AccordionItem value="section5-4" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-semibold text-lg">{lesson5.section4.title4}</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                <p className="text-muted-foreground text-lg font-semibold">{lesson5.section4.def4_1}</p>

                {/* Projectile Motion Visual */}
                {lesson5.section4.plot4_title && (
                  <div className="border rounded-lg p-4 bg-card mt-4 max-w-2xl mx-auto">
                    <h5 className="font-semibold text-sm mb-2">{lesson5.section4.plot4_title}</h5>
                    <p className="text-xs text-muted-foreground mb-3" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section4.plot4_desc) }} />
                    <div className="w-full bg-muted/20 rounded-lg flex items-center justify-center p-4">
                      <svg viewBox="0 0 320 200" className="w-full max-w-md" preserveAspectRatio="xMidYMid meet">
                        {/* Ground line */}
                        <line x1="20" y1="170" x2="300" y2="170" stroke="currentColor" strokeWidth="1.5" />
                        {/* Y-axis */}
                        <line x1="40" y1="10" x2="40" y2="170" stroke="currentColor" strokeWidth="1" strokeDasharray="4" opacity="0.3" />

                        {/* Parabolic arc: h(t) = -16t² + 64t, t in [0,4] */}
                        <path d="M 40 170 Q 80 100, 120 50 Q 160 10, 200 50 Q 240 100, 280 170" fill="none" stroke="rgb(59, 130, 246)" strokeWidth="2.5" />

                        {/* Start point */}
                        <circle cx="40" cy="170" r="5" fill="rgb(34, 197, 94)" stroke="white" strokeWidth="2" />
                        <text x="40" y="188" fontSize="10" textAnchor="middle" fill="rgb(21, 128, 61)" fontWeight="bold">t=0</text>

                        {/* Max height point */}
                        <circle cx="160" cy="25" r="5" fill="rgb(168, 85, 247)" stroke="white" strokeWidth="2" />
                        <text x="160" y="17" fontSize="10" textAnchor="middle" fill="rgb(126, 34, 206)" fontWeight="bold">Max Height</text>
                        <line x1="160" y1="30" x2="160" y2="170" stroke="rgb(168, 85, 247)" strokeWidth="1" strokeDasharray="3" opacity="0.4" />
                        <text x="160" y="188" fontSize="10" textAnchor="middle" fill="rgb(126, 34, 206)">t=2s</text>

                        {/* Ground impact point */}
                        <circle cx="280" cy="170" r="5" fill="rgb(239, 68, 68)" stroke="white" strokeWidth="2" />
                        <text x="280" y="188" fontSize="10" textAnchor="middle" fill="rgb(239, 68, 68)" fontWeight="bold">t=4s</text>
                        <text x="280" y="160" fontSize="9" textAnchor="middle" fill="rgb(239, 68, 68)">Ground</text>

                        {/* Axis labels */}
                        <text x="300" y="166" fontSize="10" fill="currentColor">t</text>
                        <text x="30" y="15" fontSize="10" fill="currentColor">h</text>
                      </svg>
                    </div>
                  </div>
                )}

                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section4.list4_1) }} />
                  <li className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section4.list4_2) }} />
                  <li className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section4.list4_3) }} />
                </ul>

                {/* Example: Area Problem */}
                <div className="my-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">{lesson5.section4.ex4_1_title}</h5>
                  <p className="text-muted-foreground text-lg mb-2">{lesson5.section4.ex4_1_problem}</p>
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section4.ex4_1_step1) }} />
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section4.ex4_1_step2) }} />
                    <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.section4.ex4_1_step3) }} />
                    <p className="font-semibold text-lg text-green-700 dark:text-green-400 mt-2">{lesson5.section4.ex4_1_solution}</p>
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
                {/* Example 1: Quadratic Formula */}
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
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson5.example_section.ex1.step2_math) }} />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{lesson5.example_section.ex1.step3_title}</p>
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson5.example_section.ex1.step3_math) }} />
                      </div>
                    </div>
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="font-semibold text-lg text-green-700 dark:text-green-400">{lesson5.example_section.ex1.result_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.example_section.ex1.result) }} />
                    </div>
                  </div>
                </div>

                {/* Example 2: Solving a Cubic by Grouping */}
                <div className="mb-6 pb-6 border-b">
                  <h3 className="text-lg font-bold mb-2">{lesson5.example_section.ex2.title}</h3>
                  <p className="text-muted-foreground text-lg mb-2">{lesson5.example_section.ex2.problem}</p>
                  <div className="my-3 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                    <div dangerouslySetInnerHTML={{ __html: renderMath(lesson5.example_section.ex2.problem_math) }} />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-lg">{lesson5.example_section.ex2.step1_title}</p>
                      <p className="text-muted-foreground text-lg">{lesson5.example_section.ex2.step1_desc}</p>
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson5.example_section.ex2.step1_math) }} />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{lesson5.example_section.ex2.step2_title}</p>
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson5.example_section.ex2.step2_math) }} />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{lesson5.example_section.ex2.step3_title}</p>
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson5.example_section.ex2.step3_math) }} />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{lesson5.example_section.ex2.step4_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.example_section.ex2.step4_desc) }} />
                    </div>
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="font-semibold text-lg text-green-700 dark:text-green-400">{lesson5.example_section.ex2.result_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderMath(lesson5.example_section.ex2.result, false) }} />
                    </div>
                  </div>
                </div>

                {/* Example 3: Optimization Word Problem */}
                <div>
                  <h3 className="text-lg font-bold mb-2">{lesson5.example_section.ex3.title}</h3>
                  <p className="text-muted-foreground text-lg mb-2">{lesson5.example_section.ex3.problem}</p>
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
                      <p className="text-muted-foreground text-lg">{lesson5.example_section.ex3.step2_desc}</p>
                      <div className="my-2 p-3 bg-muted/30 rounded-lg overflow-x-auto">
                        <div dangerouslySetInnerHTML={{ __html: renderMath(lesson5.example_section.ex3.step2_math) }} />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{lesson5.example_section.ex3.step3_title}</p>
                      <p className="text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: renderTextWithMath(lesson5.example_section.ex3.step3_desc) }} />
                    </div>
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="font-semibold text-lg text-green-700 dark:text-green-400">{lesson5.example_section.ex3.result_title}</p>
                      <p className="text-muted-foreground text-lg">{lesson5.example_section.ex3.result}</p>
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

export default PolynomialsLearning;
