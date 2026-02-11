export const polynomialCourse = {
    en: {
        polynomial_basics: {
            title: "Polynomial Basics",
            description: "The building blocks of algebra: understanding the structure, terminology, and classification of polynomials.",
            lessons: {
                lesson1_title: "Structure & Terminology",
                lesson1: {
                    section1: {
                        title1: "Definition & Terminology",
                        def1_1: "A polynomial is a mathematical expression consisting of variables (also called indeterminates) and coefficients, that involves only the operations of addition, subtraction, multiplication, and non-negative integer exponents of variables.",
                        math1_1: `P(x) = a_n x^n + a_{n-1} x^{n-1} + \\dots + a_1 x + a_0`,
                        text1_1: "Key Vocabulary:",
                        list1_1: "Term: Each part of the polynomial separated by + or - signs.",
                        list1_2: "Coefficient: The numerical factor of a term (e.g., in $5x^2$, 5 is the coefficient).",
                        list1_3: "Constant: A term with no variable (degree 0).",
                        // TODO: Insert a diagram labeling parts of a polynomial: "3x^2" (Term), "3" (Coefficient), "2" (Exponent)
                        warning1: "Expressions with negative exponents ($x^{-1}$) or fractional exponents ($\\sqrt{x}$) are NOT polynomials."
                    },
                    section2: {
                        title2: "Degree & Leading Coefficient",
                        def2_1: "The Degree of a polynomial is the highest exponent of the variable present in the expression.",
                        def2_2: "The Leading Coefficient (LC) is the coefficient of the term with the highest degree.",
                        // TODO: Insert simple inline example: "For 7x^3 - 2x, Degree = 3, LC = 7"
                        text2_1: "The degree determines the end behavior of the graph (whether it goes up or down at infinity)."
                    },
                    section3: {
                        title3: "Standard Form",
                        def3_1: "A polynomial is in Standard Form when its terms are ordered from the highest degree to the lowest degree.",
                        math3_1: `\\text{Example: } f(x) = -2x^3 + 4x^2 - x + 7`,
                        text3_1: "It is standard practice to always rewrite polynomials this way before analyzing them."
                    },
                    section4: {
                        title4: "Types of Polynomials",
                        def4_1_title: "Classification by Number of Terms",
                        list4_1: "Monomial: 1 term (e.g., $3x^2$)",
                        list4_2: "Binomial: 2 terms (e.g., $x + 5$)",
                        list4_3: "Trinomial: 3 terms (e.g., $x^2 + 3x - 4$)",
                        def4_2_title: "Classification by Degree",
                        list4_4: "Linear: Degree 1 ($mx + b$)",
                        list4_5: "Quadratic: Degree 2 ($ax^2 + bx + c$)",
                        list4_6: "Cubic: Degree 3",
                        // TODO: Insert a plot comparing a Line (Linear), Parabola (Quadratic), and S-curve (Cubic)
                    },
                    section5: {
                        title5: "Polynomial Equality",
                        def5_1: "Two polynomials are equal if and only if they have the same degree and their corresponding coefficients are identical.",
                        math5_1: `Ax^2 + Bx + C = 2x^2 - 5x + 1 \\implies A=2, B=-5, C=1`,
                        text5_1: "This principle is often used to solve for unknown constants."
                    },
                    example_section: {
                        title_ex: "Examples with Step-by-Step Solutions",
                        ex1: {
                            title: "1. Standard Form & Identification",
                            problem: "Rewrite in standard form and identify the degree and leading coefficient.",
                            problem_math: `P(x) = 4 - 2x + 7x^5 - 3x^2`,
                            step1_title: "Step 1: Identify Exponents",
                            step1_desc: "The powers are 0 (constant), 1 ($2x$), 5 ($7x^5$), and 2 ($-3x^2$).",
                            step2_title: "Step 2: Reorder",
                            step2_desc: "Place terms in descending order of powers: 5, then 2, then 1, then 0.",
                            step2_math: `P(x) = 7x^5 - 3x^2 - 2x + 4`,
                            step3_title: "Step 3: Identify Degree and LC",
                            step3_desc: "Highest power is 5. The number in front of $x^5$ is 7.",
                            result_title: "Final Answer",
                            result: "Degree: 5, Leading Coefficient: 7."
                        },
                        ex2: {
                            title: "2. Validating Polynomials",
                            problem: "Which of the following are polynomials?",
                            problem_math: `A) \\; 3x^2 + 2x^{-1} \\quad B) \\; 5\\sqrt{x} + 2 \\quad C) \\; \\frac{1}{2}x^3 - \\pi`,
                            step1_title: "Step 1: Analyze Exponents",
                            step1_desc: "Polynomials must have non-negative integer exponents (0, 1, 2, ...).",
                            step2_title: "Step 2: Check Each Case",
                            step2_math: `A: x^{-1} \\text{ has a negative exponent. (Not a polynomial)} \\\\ B: \\sqrt{x} = x^{1/2} \\text{ has a fraction. (Not a polynomial)} \\\\ C: \\text{Coefficients can be fractions (1/2) or irrational (}\\pi\\text{). Powers are integers.}`,
                            result_title: "Final Answer",
                            result: "Only C is a polynomial."
                        },
                        ex3: {
                            title: "3. Finding Coefficients (Equality)",
                            problem: "Find A and B if the equation is true for all x:",
                            problem_math: `2x(x + 3) = Ax^2 + Bx`,
                            step1_title: "Step 1: Expand Left Side",
                            step1_desc: "Distribute the $2x$.",
                            step1_math: `2x \\cdot x + 2x \\cdot 3 = 2x^2 + 6x`,
                            step2_title: "Step 2: Compare Coefficients",
                            step2_math: `2x^2 + 6x = Ax^2 + Bx`,
                            step3_title: "Step 3: Match Terms",
                            step3_desc: "The $x^2$ term matches A. The $x$ term matches B.",
                            result_title: "Final Answer",
                            result: `A = 2, \\quad B = 6`
                        }
                    }
                }
            }
        },
    }

}