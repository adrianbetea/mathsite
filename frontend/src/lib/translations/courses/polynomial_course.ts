import { sign } from "crypto";
import { max } from "date-fns";
import { text } from "stream/consumers";

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

                        // Plot: Anatomy of a Polynomial
                        plot1_title: "Anatomy of a Polynomial",
                        plot1_desc: "Visual breakdown of the term $3x^2$.",
                        plot1_type: "polynomial_anatomy",
                        plot1_data: {
                            expression: "3x^2",
                            labels: [
                                { text: "Coefficient", target: "3", color: "blue" },
                                { text: "Variable", target: "x", color: "black" },
                                { text: "Exponent", target: "2", color: "red" },
                                { text: "Degree", target: "2", color: "red" }
                            ]
                        },
                        text1_1: "Key Vocabulary:",
                        list1_1: "Term: Each part of the polynomial separated by + or - signs.",
                        list1_2: "Coefficient: The numerical factor of a term (e.g., in $5x^2$, 5 is the coefficient).",
                        list1_3: "Constant: A term with no variable (degree 0).",
                        warning1: "Expressions with negative exponents ($x^{-1}$) or fractional exponents ($\\sqrt{x}$) are NOT polynomials."
                    },
                    section2: {
                        title2: "Degree & Leading Coefficient",
                        def2_1: "The Degree of a polynomial is the highest exponent of the variable present in the expression.",
                        def2_2: "The Leading Coefficient (LC) is the coefficient of the term with the highest degree.",

                        // Example: Degree & LC
                        ex2_1_title: "Quick Check",
                        ex2_1_problem: "Analyze the polynomial $P(x) = 7x^3 - 2x + 5$.",
                        ex2_1_solution: "The highest power is 3, so **Degree = 3**. The coefficient of $x^3$ is 7, so **Leading Coefficient = 7**.",

                        text2_1: "The degree determines the end behavior of the graph (whether it goes up or down at infinity)."
                    },
                    section3: {
                        title3: "Standard Form",
                        def3_1: "A polynomial is in Standard Form when its terms are ordered from the highest degree to the lowest degree.",

                        // Example: Reordering to Standard Form
                        ex3_1_title: "Example",
                        ex3_1_problem: "Rewrite $f(x) = 4 + x^3 - 2x$ in standard form.",
                        ex3_1_step1: "Identify degrees: $4$ (deg 0), $x^3$ (deg 3), $-2x$ (deg 1).",
                        ex3_1_solution: "Order by degree (3, 1, 0): $f(x) = x^3 - 2x + 4$.",

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

                        // Plot: Polynomial Types Comparison
                        plot4_title: "Comparing Degrees",
                        plot4_desc: "Linear is a straight line. Quadratic is a U-shaped parabola. Cubic is an S-shaped curve.",
                        plot4_type: "multi_function",
                        plot4_domain: [-3, 3],
                        plot4_functions: [
                            { expression: "x", color: "blue", label: "Linear (x)" },
                            { expression: "x^2", color: "green", label: "Quadratic (x^2)" },
                            { expression: "x^3", color: "red", label: "Cubic (x^3)" }
                        ]
                    },
                    section5: {
                        title5: "Polynomial Equality",
                        def5_1: "Two polynomials are equal if and only if they have the same degree and their corresponding coefficients are identical.",

                        // Example: Solving for Constants
                        ex5_1_title: "Example (Finding Constants)",
                        ex5_1_problem: "Find A and B if $2x + 5 = Ax + B$.",
                        ex5_1_step1: "Compare x coefficients: $2 = A$.",
                        ex5_1_step2: "Compare constant terms: $5 = B$.",
                        ex5_1_solution: "So, $A=2$ and $B=5$.",

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
        polynomial_operations: {
            title: "Polynomial Operations",
            description: "Mastering the arithmetic of polynomials: adding, subtracting, multiplying, and two powerful methods for division.",
            lessons: {
                lesson2_title: "Arithmetic & Division Algorithms",
                lesson2: {
                    section1: {
                        title1: "Addition & Subtraction",
                        def1_1: "The Golden Rule: You can only add or subtract Like Terms.",
                        def1_2: "Like Terms are terms that have the exact same variable raised to the exact same exponent.",

                        // Plot: Grouping Like Terms
                        plot1_title: "Visualizing Like Terms",
                        plot1_desc: "We group terms by their variable parts. $x^2$ terms go together, $x$ terms go together.",
                        plot1_type: "polynomial_grouping",
                        plot1_data: {
                            expression: "(2x^2 + 3x) + (4x^2 - x)",
                            groups: [
                                { terms: ["2x^2", "4x^2"], color: "red", label: "Quadratic" },
                                { terms: ["3x", "-x"], color: "blue", label: "Linear" }
                            ]
                        },

                        math1_1: `3x^2 + 5x^2 = 8x^2 \\quad \\text{(Correct)}`,
                        math1_2: `3x^2 + 5x = \\text{Cannot Combine}`,
                        text1_1: "When subtracting polynomials, remember to distribute the negative sign to every term in the second polynomial.",

                        // Example: Subtraction
                        ex1_1_title: "Example (Subtraction)",
                        ex1_1_problem: "Simplify $(5x^2 + 2x - 1) - (3x^2 - 4x + 2)$.",
                        ex1_1_step1: "Distribute the negative: $5x^2 + 2x - 1 - 3x^2 + 4x - 2$.",
                        ex1_1_step2: "Group like terms: $(5x^2 - 3x^2) + (2x + 4x) + (-1 - 2)$.",
                        ex1_1_solution: "Result: $2x^2 + 6x - 3$."
                    },
                    section2: {
                        title2: "Multiplication",
                        def2_1: "Multiplication relies on the Distributive Property and the Exponent Rule: $x^a \\cdot x^b = x^{a+b}$.",
                        list2_1: "Monomial × Polynomial: Distribute the single term to all terms inside.",
                        list2_2: "Binomial × Binomial: Use the FOIL method (First, Outer, Inner, Last).",
                        list2_3: "General Multiplication: Multiply every term in the first polynomial by every term in the second.",

                        // Plot: Box Method (Area Model)
                        plot2_title: "The Box Method (Area Model)",
                        plot2_desc: "Visualizing $(x+2)(x+3)$. The area of the four inner rectangles sums up to the product.",
                        plot2_type: "polynomial_box_method",
                        plot2_data: {
                            top_labels: ["x", "+3"],
                            side_labels: ["x", "+2"],
                            cells: [
                                { val: "x^2", color: "light-blue" }, { val: "3x", color: "light-green" },
                                { val: "2x", color: "light-green" }, { val: "6", color: "light-yellow" }
                            ]
                        },

                        // Example: Binomial Multiplication
                        ex2_1_title: "Example (FOIL)",
                        ex2_1_problem: "Multiply $(2x + 1)(x - 5)$.",
                        ex2_1_step1: "First: $2x \\cdot x = 2x^2$. Outer: $2x \\cdot -5 = -10x$.",
                        ex2_1_step2: "Inner: $1 \\cdot x = 1x$. Last: $1 \\cdot -5 = -5$.",
                        ex2_1_step3: "Combine like terms (-10x + 1x).",
                        ex2_1_solution: "Result: $2x^2 - 9x - 5$."
                    },
                    section3: {
                        title3: "Polynomial Long Division",
                        def3_1: "Used to divide a polynomial by another polynomial of any degree. It follows the same algorithm as arithmetic long division.",

                        step3_1: "1. Divide: Divide the leading term of the dividend by the leading term of the divisor.",
                        step3_2: "2. Multiply: Multiply the result by the entire divisor.",
                        step3_3: "3. Subtract: Subtract this result from the original (flip signs!).",
                        step3_4: "4. Bring Down: Bring down the next term and repeat.",

                        math3_1: `\\frac{P(x)}{D(x)} = Q(x) + \\frac{R(x)}{D(x)}`,
                        text3_1: "Where Q is Quotient, R is Remainder, and D is Divisor.",

                        // Example: Long Division
                        ex3_1_title: "Example (Long Division)",
                        ex3_1_problem: "Divide $2x^2 + 7x + 6$ by $x + 2$.",
                        ex3_1_step1: "Divide: $2x^2 \\div x = 2x$. Write $2x$ on top.",
                        ex3_1_step2: "Multiply: $2x(x + 2) = 2x^2 + 4x$.",
                        ex3_1_step3: "Subtract: $(2x^2 + 7x) - (2x^2 + 4x) = 3x$. Bring down the $+6$.",
                        ex3_1_step4: "Repeat: $3x \\div x = 3$. Multiply $3(x+2) = 3x + 6$. Subtract to get $0$.",
                        ex3_1_solution: "Quotient is $2x + 3$ with Remainder $0$."
                    },
                    section4: {
                        title4: "Synthetic Division",
                        def4_1: "A shortcut method for division that uses only the coefficients. It is faster but has a strict requirement.",
                        warning4_1: "Constraint: Synthetic Division only works when dividing by a linear binomial of the form $(x - c)$.",

                        step4_1: "1. Setup: Write 'c' on the outside (if dividing by $x-3$, use 3). Write coefficients inside.",
                        step4_2: "2. Bring Down: Bring the first coefficient straight down.",
                        step4_3: "3. Multiply & Add: Multiply the bottom number by 'c', place it in the next column, add down.",
                        text4_2: "The numbers on the bottom row represent the coefficients of the quotient (which is always one degree lower).",

                        // Example: Synthetic Division
                        ex4_1_title: "Example (Synthetic)",
                        ex4_1_problem: "Divide $x^3 - 4x^2 + 2x - 5$ by $x - 3$.",
                        ex4_1_step1: "Setup: $c = 3$. Coefficients are $[1, -4, 2, -5]$.",
                        ex4_1_step2: "Drop 1. Multiply $3(1)=3$. Add to -4: $-4+3 = -1$.",
                        ex4_1_step3: "Multiply $3(-1)=-3$. Add to 2: $2-3 = -1$.",
                        ex4_1_step4: "Multiply $3(-1)=-3$. Add to -5: $-5-3 = -8$ (Remainder).",
                        ex4_1_solution: "Quotient: $x^2 - x - 1$, Remainder: $-8$."
                    },
                    example_section: {
                        title_ex: "Examples with Step-by-Step Solutions",
                        ex1: {
                            title: "1. Multiplying Polynomials",
                            problem: "Expand and simplify:",
                            problem_math: `(2x - 3)(x^2 + 4x - 1)`,
                            step1_title: "Step 1: Distribute 2x",
                            step1_math: `2x(x^2) + 2x(4x) + 2x(-1) = 2x^3 + 8x^2 - 2x`,
                            step2_title: "Step 2: Distribute -3",
                            step2_desc: "Be careful with signs.",
                            step2_math: `-3(x^2) - 3(4x) - 3(-1) = -3x^2 - 12x + 3`,
                            step3_title: "Step 3: Combine Like Terms",
                            step3_desc: "Combine $x^2$ terms and $x$ terms.",
                            step3_math: `2x^3 + (8x^2 - 3x^2) + (-2x - 12x) + 3`,
                            result_title: "Final Answer",
                            result: `2x^3 + 5x^2 - 14x + 3`
                        },
                        ex2: {
                            title: "2. Polynomial Long Division",
                            problem: "Divide using Long Division:",
                            problem_math: `(x^2 - 5x + 6) \\div (x - 2)`,
                            step1_title: "Step 1: Divide Leading Terms",
                            step1_desc: "How many times does $x$ go into $x^2$? Answer: $x$.",
                            step2_title: "Step 2: Multiply and Subtract",
                            step2_desc: "Multiply $x(x-2) = x^2 - 2x$. Subtract this from the top row: $(-5x) - (-2x) = -3x$.",
                            step3_title: "Step 3: Bring Down and Repeat",
                            step3_desc: "Bring down $+6$. Now divide $-3x$ by $x$. Answer: $-3$.",
                            step3_math: `-3(x - 2) = -3x + 6`,
                            step4_title: "Step 4: Remainder",
                            step4_desc: "Subtracting gives 0.",
                            result_title: "Final Answer",
                            result: `x - 3`
                        },
                        ex3: {
                            title: "3. Synthetic Division",
                            problem: "Divide using Synthetic Division:",
                            problem_math: `(3x^3 - 2x^2 + x - 5) \\div (x - 2)`,
                            step1_title: "Step 1: Setup",
                            step1_desc: "Divisor is $x-2$, so use $c = 2$. Coefficients are [3, -2, 1, -5].",
                            step2_title: "Step 2: The Algorithm",
                            step2_math: `\\text{Down: } 3 \\\\ \\text{Mult: } 2 \\cdot 3 = 6 \\rightarrow \\text{Add to -2} = 4 \\\\ \\text{Mult: } 2 \\cdot 4 = 8 \\rightarrow \\text{Add to 1} = 9 \\\\ \\text{Mult: } 2 \\cdot 9 = 18 \\rightarrow \\text{Add to -5} = 13`,
                            step3_title: "Step 3: Interpret Result",
                            step3_desc: "The bottom row is 3, 4, 9 with remainder 13. The degree drops from 3 to 2.",
                            result_title: "Final Answer",
                            result: `3x^2 + 4x + 9 + \\frac{13}{x-2}`
                        }
                    }
                }
            }
        },
        factorization_techniques: {
            title: "Factorization Techniques",
            description: "The art of breaking polynomials down: converting complex expressions into products of simpler factors.",
            lessons: {
                lesson3_title: "Core Factorization Methods",
                lesson3: {
                    section1: {
                        title1: "Greatest Common Factor (GCF)",
                        def1_1: "The first rule of factoring: Always look for a Common Factor first.",

                        // Plot: Visualizing GCF
                        plot1_title: "Visualizing the GCF",
                        plot1_desc: "We 'pull out' the common term $2x$ from both parts of the expression.",
                        plot1_type: "polynomial_gcf_visual",
                        plot1_data: {
                            original: "2x^2 + 6x",
                            gcf: "2x",
                            remainder: "(x + 3)",
                            color_gcf: "blue",
                            color_rem: "black"
                        },

                        text1_1: "Identify the largest number and the highest power of the variable that divides evenly into every term.",
                        math1_1: `ab + ac = a(b + c)`,
                        warning1: "If the leading term is negative, it is usually best to factor out the negative sign as well.",

                        // Example: GCF
                        ex1_1_title: "Example (GCF)",
                        ex1_1_problem: "Factor $12x^3 - 8x^2$.",
                        ex1_1_step1: "Coefficients: GCF of 12 and 8 is 4.",
                        ex1_1_step2: "Variables: GCF of $x^3$ and $x^2$ is $x^2$.",
                        ex1_1_step3: "Divide each term by $4x^2$.",
                        ex1_1_solution: "Result: $4x^2(3x - 2)$."
                    },
                    section2: {
                        title2: "Special Patterns",
                        def2_1_title: "Difference of Squares",
                        def2_1: "Two perfect squares separated by a minus sign.",
                        math2_1: `a^2 - b^2 = (a - b)(a + b)`,

                        // Plot: Difference of Squares Geometry
                        plot2_title: "Geometric Proof",
                        plot2_desc: "The area of a large square ($a^2$) minus a small square ($b^2$) can be rearranged into a rectangle with dimensions $(a-b)$ and $(a+b)$.",
                        plot2_type: "diff_squares_geometry",
                        plot2_data: { a: 5, b: 2 }, // Visualization data

                        // Example: Difference of Squares
                        ex2_1_title: "Example (Diff of Squares)",
                        ex2_1_problem: "Factor $9x^2 - 16$.",
                        ex2_1_step1: "Identify squares: $9x^2 = (3x)^2$ so $a=3x$. $16 = 4^2$ so $b=4$.",
                        ex2_1_solution: "Apply formula: $(3x - 4)(3x + 4)$.",

                        text2_1: "Note: A 'Sum of Squares' ($a^2 + b^2$) cannot be factored over real numbers.",

                        def2_2_title: "Perfect Square Trinomials",
                        def2_2: "Result from squaring a binomial.",
                        math2_2: `a^2 + 2ab + b^2 = (a + b)^2 \\quad \\text{and} \\quad a^2 - 2ab + b^2 = (a - b)^2`
                    },
                    section3: {
                        title3: "Factoring by Grouping",
                        def3_1: "Used primarily when a polynomial has 4 terms.",

                        // Plot: Visualizing Grouping
                        plot3_title: "Visualizing Grouping",
                        plot3_desc: "We split the 4 terms into two pairs. The goal is to find a common binomial factor (the part in parentheses).",
                        plot3_type: "grouping_visual",
                        plot3_data: {
                            expr: "x^3 + 2x^2 + 3x + 6",
                            group1: "x^2(x + 2)",
                            group2: "+ 3(x + 2)",
                            common: "(x + 2)"
                        },
                        plot3_description: "Same area, different shape",
                        step3_1: "1. Group terms: Group the first two terms and the last two terms.",
                        step3_2: "2. Factor GCF: Extract the GCF from each pair separately.",
                        step3_3: "3. Binomial Factor: If done correctly, the parentheses will match. Factor out this common binomial.",

                        math3_1: `ax + ay + bx + by = a(x+y) + b(x+y) = (a+b)(x+y)`,

                        // Example: Grouping
                        ex3_1_title: "Example (Grouping)",
                        ex3_1_problem: "Factor $2x^3 - 3x^2 + 4x - 6$.",
                        ex3_1_step1: "Group: $(2x^3 - 3x^2) + (4x - 6)$.",
                        ex3_1_step2: "Factor GCFs: $x^2(2x - 3) + 2(2x - 3)$.",
                        ex3_1_step3: "Check match: $(2x - 3)$ is in both.",
                        ex3_1_solution: "Result: $(x^2 + 2)(2x - 3)$."
                    },
                    section4: {
                        title4: "Advanced Techniques",

                        // --- Cubes ---
                        def4_1_title: "Sum & Difference of Cubes",
                        math4_1: `a^3 - b^3 = (a - b)(a^2 + ab + b^2)`,
                        math4_2: `a^3 + b^3 = (a + b)(a^2 - ab + b^2)`,

                        // Plot: SOAP Mnemonic
                        plot4_title: "The SOAP Method",
                        plot4_desc: "Visual aid for sign placement in cubic factoring.",
                        plot4_type: "mnemonic_visual",
                        plot4_data: { mnemonic: "SOAP", meaning: ["Same", "Opposite", "Always", "Positive"] },

                        text4_1: "Mnemonic: SOAP (Same sign, Opposite sign, Always Positive).",

                        // Example: Difference of Cubes
                        ex4_1_title: "Example (Cubes)",
                        ex4_1_problem: "Factor $8x^3 - 27$.",
                        ex4_1_step1: "Identify cubes: $(2x)^3 - 3^3$. So $a=2x, b=3$.",
                        ex4_1_step2: "Apply SOAP: $(2x - 3)((2x)^2 + (2x)(3) + 3^2)$.",
                        ex4_1_solution: "Result: $(2x - 3)(4x^2 + 6x + 9)$.",

                        // --- AC Method ---
                        def4_2_title: "Quadratic Trinomials (AC Method)",
                        text4_2: "For $ax^2 + bx + c$, find two numbers that multiply to $a \\cdot c$ and add up to $b$. Split the middle term and use grouping.",

                        // Example: AC Method
                        ex4_2_title: "Example (AC Method)",
                        ex4_2_problem: "Factor $3x^2 + 10x + 8$.",
                        ex4_2_step1: "Multiply $a \\cdot c$: $3(8) = 24$. Find factors of 24 adding to 10: 6 and 4.",
                        ex4_2_step2: "Split middle term: $3x^2 + 6x + 4x + 8$.",
                        ex4_2_step3: "Group: $3x(x + 2) + 4(x + 2)$.",
                        ex4_2_solution: "Result: $(3x + 4)(x + 2)$."
                    },
                    example_section: {
                        title_ex: "Examples with Step-by-Step Solutions",
                        ex1: {
                            title: "1. GCF & Difference of Squares",
                            problem: "Factor completely:",
                            problem_math: `3x^3 - 27x`,
                            step1_title: "Step 1: Factor out GCF",
                            step1_desc: "Both terms are divisible by $3x$.",
                            step1_math: `3x(x^2 - 9)`,
                            step2_title: "Step 2: Identify Pattern",
                            step2_desc: "Inside the parenthesis, $x^2 - 9$ is a Difference of Squares ($x^2 - 3^2$).",
                            step2_math: `(x - 3)(x + 3)`,
                            result_title: "Final Answer",
                            result: `3x(x - 3)(x + 3)`
                        },
                        ex2: {
                            title: "2. Factoring by Grouping",
                            problem: "Factor the four-term polynomial:",
                            problem_math: `x^3 + 4x^2 + 3x + 12`,
                            step1_title: "Step 1: Group Terms",
                            step1_desc: "Group $(x^3 + 4x^2)$ and $(3x + 12)$.",
                            step2_title: "Step 2: Factor GCF from Groups",
                            step2_math: `x^2(x + 4) + 3(x + 4)`,
                            step3_title: "Step 3: Factor Common Binomial",
                            step3_desc: "The term $(x+4)$ is common to both parts.",
                            result_title: "Final Answer",
                            result: `(x^2 + 3)(x + 4)`
                        },
                        ex3: {
                            title: "3. The AC Method (Trinomials)",
                            problem: "Factor:",
                            problem_math: `2x^2 + 7x + 3`,
                            step1_title: "Step 1: Multiply A and C",
                            step1_desc: "$A=2, C=3$. Product is $6$. We need factors of 6 that add to $B=7$.",
                            step1_math: `\\text{Factors: } 6 \\text{ and } 1 \\quad (6 \\cdot 1 = 6, \\; 6+1 = 7)`,
                            step2_title: "Step 2: Split Middle Term",
                            step2_math: `2x^2 + 6x + 1x + 3`,
                            step3_title: "Step 3: Group and Solve",
                            step3_desc: "Factor by grouping.",
                            step3_math: `2x(x + 3) + 1(x + 3)`,
                            result_title: "Final Answer",
                            result: `(2x + 1)(x + 3)`
                        }
                    }
                }
            }
        },
        roots_zeros: {
            title: "Roots & Zeros",
            description: "Bridging algebra and geometry: finding the exact values where a polynomial equals zero and understanding the Fundamental Theorem of Algebra.",
            lessons: {
                lesson4_title: "Theorems & Solving Strategies",
                lesson4: {
                    section1: {
                        title1: "The Fundamental & Factor Theorems",
                        def1_1: "The Fundamental Theorem of Algebra: Every polynomial of degree $n$ has exactly $n$ complex roots (counting multiplicity).",
                        text1_1: "This guarantees that a degree 5 equation has exactly 5 solutions.",

                        // Plot: Roots vs Factors
                        plot1_title: "Connection: Roots & Factors",
                        plot1_desc: "If the graph crosses the x-axis at $c=2$, then $(x-2)$ is a factor of the polynomial.",
                        plot1_type: "root_factor_visual",
                        plot1_data: {
                            root: 2,
                            factor: "(x - 2)",
                            function: "(x-2)(x+1)(x-4)", // Cubic passing through 2
                            domain: [-2, 5]
                        },
                        plot1_description: "- factor",
                        def1_2: "The Factor Theorem:",
                        math1_1: `P(c) = 0 \\iff (x - c) \\text{ is a factor of } P(x)`,
                        text1_2: "This provides a direct link between algebraic factors and geometric x-intercepts."
                    },
                    section2: {
                        title2: "Rational Root Theorem",
                        def2_1: "A strategy to find a list of *possible* rational roots when the polynomial has integer coefficients.",

                        math2_1: `\\text{Possible Roots} = \\pm \\frac{\\text{Factors of Constant Term } (p)}{\\text{Factors of Leading Coefficient } (q)}`,

                        step2_1: "1. List all factors of the constant term ($p$).",
                        step2_2: "2. List all factors of the leading coefficient ($q$).",
                        step2_3: "3. Form all fractions $p/q$ and test them using synthetic division.",

                        // Example: Rational Root Theorem
                        ex2_1_title: "Example (Finding Candidates)",
                        ex2_1_problem: "Find possible rational roots for $2x^3 + x^2 - 13x + 6$.",
                        ex2_1_step1: "Constant $p = 6$. Factors: $\\pm 1, \\pm 2, \\pm 3, \\pm 6$.",
                        ex2_1_step2: "Leading Coeff $q = 2$. Factors: $\\pm 1, \\pm 2$.",
                        ex2_1_step3: "Form ratios $p/q$: $\\pm 1, \\pm 2, \\pm 3, \\pm 6, \\pm 1/2, \\pm 3/2$.",
                        ex2_1_solution: "These are the only possible rational roots to test."
                    },
                    section3: {
                        title3: "Multiplicity",
                        def3_1: "Multiplicity refers to how many times a specific factor appears in the polynomial factorization.",
                        math3_1: `P(x) = (x - 2)^3 (x + 1)^2`,

                        // Plot: Multiplicity Behavior
                        plot3_title: "Visualizing Multiplicity",
                        plot3_desc: "At x=1 (odd power ^1), the graph crosses. At x=2 (even power ^2), the graph bounces.",
                        plot3_type: "multiplicity_visual",
                        plot3_data: {
                            function: "(x-1)(x-2)^2",
                            roots: [
                                { x: 1, type: "cross", label: "Odd (Crosses)" },
                                { x: 2, type: "bounce", label: "Even (Bounces)" }
                            ]
                        },

                        list3_1: "Odd Multiplicity (e.g., ^1, ^3): The graph **crosses** the x-axis.",
                        list3_2: "Even Multiplicity (e.g., ^2, ^4): The graph **touches** (bounces off) the x-axis.",

                        // Example: Multiplicity
                        ex3_1_title: "Example (Graph Behavior)",
                        ex3_1_problem: "Describe the behavior of $f(x) = (x+3)^2 (x-1)^3$ at the intercepts.",
                        ex3_1_step1: "Root $x=-3$: Multiplicity 2 (Even). Graph bounces.",
                        ex3_1_step2: "Root $x=1$: Multiplicity 3 (Odd). Graph crosses."
                    },
                    section4: {
                        title4: "Complex Roots",
                        def4_1: "If a polynomial has real coefficients, complex roots always come in conjugate pairs.",
                        math4_2: `\\text{If } a + bi \\text{ is a root, then } a - bi \\text{ is also a root.}`,
                        text4_1: "This explains why polynomials of odd degree must have at least one real root (complex roots use up degree in pairs of 2).",

                        // Example: Complex Conjugates
                        ex4_1_title: "Example (Finding Roots)",
                        ex4_1_problem: "A cubic polynomial has roots $3$ and $2 - i$. Find the third root.",
                        ex4_1_solution: "Since complex roots come in pairs, the third root must be the conjugate: $2 + i$."
                    },
                    example_section: {
                        title_ex: "Examples with Step-by-Step Solutions",
                        ex1: {
                            title: "1. Using the Rational Root Theorem",
                            problem: "Find all possible rational roots for:",
                            problem_math: `P(x) = 2x^3 + x^2 - 13x + 6`,
                            step1_title: "Step 1: Identify p and q",
                            step1_desc: "Constant term (6) factors: $p = 1, 2, 3, 6$. Leading coeff (2) factors: $q = 1, 2$.",
                            step2_title: "Step 2: List Combinations",
                            step2_desc: "Take every p divided by every q.",
                            step2_math: `\\pm \\frac{1, 2, 3, 6}{1} \\implies \\pm 1, \\pm 2, \\pm 3, \\pm 6 \\\\ \\pm \\frac{1, 2, 3, 6}{2} \\implies \\pm \\frac{1}{2}, \\pm \\frac{3}{2} \\quad (1 \\text{ and } 3 \\text{ are duplicates})`,
                            result_title: "Final Answer",
                            result: `\\text{Candidates: } \\pm 1, \\pm 2, \\pm 3, \\pm 6, \\pm \\frac{1}{2}, \\pm \\frac{3}{2}`
                        },
                        ex2: {
                            title: "2. Solving with the Factor Theorem",
                            problem: "Is $(x-2)$ a factor of $P(x) = x^3 - 4x^2 + 3x + 2$?",
                            step1_title: "Step 1: Apply Theorem",
                            step1_desc: "If $(x-2)$ is a factor, then $P(2)$ must equal 0.",
                            step2_title: "Step 2: Evaluate P(2)",
                            step2_math: `P(2) = (2)^3 - 4(2)^2 + 3(2) + 2 \\\\ = 8 - 16 + 6 + 2 \\\\ = 0`,
                            step3_title: "Step 3: Conclusion",
                            step3_desc: "Since the remainder is 0, it is a factor.",
                            result_title: "Final Answer",
                            result: "Yes, $(x-2)$ is a factor."
                        },
                        ex3: {
                            title: "3. Analyzing Multiplicity from Factored Form",
                            problem: "Describe the graph behavior at the intercepts:",
                            problem_math: `P(x) = -2(x - 3)^2 (x + 1)^3`,
                            step1_title: "Step 1: Identify Roots",
                            step1_desc: "Roots are at $x = 3$ and $x = -1$.",
                            step2_title: "Step 2: Check Multiplicity",
                            step2_math: `\\text{At } x=3: \\text{ Power is 2 (Even)} \\\\ \\text{At } x=-1: \\text{ Power is 3 (Odd)}`,
                            step3_title: "Step 3: Determine Behavior",
                            result_title: "Final Answer",
                            result: "At $x=3$, graph touches/bounces. At $x=-1$, graph crosses the axis."
                        }
                    }
                }
            }
        },
        polynomial_equations: {
            title: "Polynomial Equations",
            description: "Finding the values of x that make the equation true: from simple linear isolations to complex higher-degree problem solving.",
            lessons: {
                lesson5_title: "Solving Strategies & Applications",
                lesson5: {
                    section1: {
                        title1: "Linear Equations (Degree 1)",
                        def1_1: "The simplest form of a polynomial equation.",

                        // Plot: Visualizing Equation Solving
                        plot1_title: "Isolating the Variable",
                        plot1_desc: "Solving $2x - 6 = 0$. To get x alone, we must move the constant (-6) and then divide by the coefficient (2).",
                        plot1_type: "linear_solver_visual",
                        plot1_data: {
                            equation: "2x - 6 = 0",
                            step1: "Add 6 to both sides -> 2x = 6",
                            step2: "Divide by 2 -> x = 3",
                            root: 3
                        },

                        math1_1: `ax + b = 0 \\implies x = -\\frac{b}{a}`,
                        text1_1: "The goal is simply to isolate the variable using inverse operations (add/subtract, then multiply/divide).",

                        // Example: Linear
                        ex1_1_title: "Example (Linear)",
                        ex1_1_problem: "Solve $3x + 7 = 22$.",
                        ex1_1_step1: "Subtract 7 from both sides: $3x = 15$.",
                        ex1_1_step2: "Divide by 3: $x = 5$.",
                        ex1_1_solution: "Solution: $x = 5$."
                    },
                    section2: {
                        title2: "Quadratic Equations (Degree 2)",
                        def2_1: "Standard Form: $ax^2 + bx + c = 0$.",

                        def2_2_title: "Method 1: Factoring (Zero Product Property)",
                        text2_1: "If $(x-r)(x-s) = 0$, then either $x=r$ or $x=s$. This is the fastest method if the numbers are nice.",

                        // Example: Factoring
                        ex2_1_title: "Example (Factoring)",
                        ex2_1_problem: "Solve $x^2 - 5x + 6 = 0$.",
                        ex2_1_step1: "Find numbers that multiply to 6 and add to -5: (-2, -3).",
                        ex2_1_step2: "Factor: $(x - 2)(x - 3) = 0$.",
                        ex2_1_solution: "Roots: $x = 2, x = 3$.",

                        def2_3_title: "Method 2: The Quadratic Formula",
                        text2_2: "Used when factoring is difficult or impossible. It works for *every* quadratic equation.",
                        math2_1: `x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}`,

                        // Example: Quadratic Formula
                        ex2_2_title: "Example (Quadratic Formula)",
                        ex2_2_problem: "Solve $2x^2 + 5x - 3 = 0$.",
                        ex2_2_step1: "Identify $a=2, b=5, c=-3$.",
                        ex2_2_step2: "Discriminant: $5^2 - 4(2)(-3) = 25 + 24 = 49$.",
                        ex2_2_step3: "Formula: $\\frac{-5 \\pm 7}{4}$.",
                        ex2_2_solution: "Roots: $x = \\frac{1}{2}, x = -3$.",

                        def2_4_title: "The Discriminant ($\\Delta$)",
                        text2_3: "The value inside the square root ($b^2 - 4ac$) tells us about the solutions:",

                        // Plot: Discriminant Cases
                        plot2_title: "The Discriminant & Roots",
                        plot2_desc: "Blue (Pos): 2 Roots. Green (Zero): 1 Root. Red (Neg): No Real Roots.",
                        plot2_type: "multi_function",
                        plot2_domain: [-4, 4],
                        plot2_functions: [
                            { expression: "x^2 - 4", color: "blue", label: "D > 0 (2 Real)" },
                            { expression: "x^2", color: "green", label: "D = 0 (1 Real)" },
                            { expression: "x^2 + 2", color: "red", label: "D < 0 (0 Real)" }
                        ],

                        list2_1: "$\\Delta > 0$: Two distinct real solutions (Crosses x-axis twice).",
                        list2_2: "$\\Delta = 0$: One repeated real solution (Touches x-axis once).",
                        list2_3: "$\\Delta < 0$: Two complex (imaginary) solutions (Never touches x-axis)."
                    },
                    section3: {
                        title3: "Cubic & Higher Degree Equations",
                        def3_1: "Strategy: Reduce the Degree.",

                        step3_1: "1. Is there a GCF? Factor it out.",
                        step3_2: "2. Can you use Grouping? (Common for 4-term cubics).",
                        step3_3: "3. If not, use the Rational Root Theorem and Synthetic Division to divide the polynomial down to a Quadratic.",

                        text3_1: "Once you reach a Quadratic quotient, solve it using the Quadratic Formula.",

                        // Example: Solving a Cubic
                        ex3_1_title: "Example (Solving Higher Degree)",
                        ex3_1_problem: "Solve $x^3 - 2x^2 - 5x + 6 = 0$.",
                        ex3_1_step1: "Test rational roots. Try $x=1$: $1 - 2 - 5 + 6 = 0$. It works!",
                        ex3_1_step2: "Synthetic Division by 1: Coefficients [1, -2, -5, 6] $\\to$ Remainder 0.",
                        ex3_1_step3: "Depressed Polynomial: $x^2 - x - 6 = 0$.",
                        ex3_1_step4: "Solve Quadratic: Factor $(x-3)(x+2) = 0$.",
                        ex3_1_solution: "Roots: $x = 1, x = 3, x = -2$."
                    },
                    section4: {
                        title4: "Word Problems & Modeling",
                        def4_1: "Translating English into Math.",

                        // Plot: Projectile Motion
                        plot4_title: "Projectile Motion",
                        plot4_desc: "The path of an object thrown in the air follows a parabolic curve ($h(t) = -16t^2 + vt + h$). The max height is the vertex; hitting the ground is the root.",
                        plot4_type: "projectile_motion_visual",
                        plot4_data: {
                            function: "-16*t^2 + 64*t", // Start at 0, initial vel 64
                            domain: [0, 4],
                            points: [
                                { x: 2, y: 64, label: "Max Height" },
                                { x: 4, y: 0, label: "Ground" }
                            ]
                        },

                        list4_1: "Area Problems: Length $\\times$ Width ($x(x+5) = Area$).",
                        list4_2: "Projectile Motion: Height over time ($h(t) = -16t^2 + v_0t + h_0$).",
                        list4_3: "Volume: Volume of a box ($V = l \\cdot w \\cdot h$).",

                        // Example: Area Problem
                        ex4_1_title: "Example (Geometry)",
                        ex4_1_problem: "A rectangle's length is 3 more than its width. The area is 40. Find the dimensions.",
                        ex4_1_step1: "Let $w = x$. Then $l = x+3$.",
                        ex4_1_step2: "Equation: $x(x+3) = 40 \\implies x^2 + 3x - 40 = 0$.",
                        ex4_1_step3: "Factor: $(x+8)(x-5) = 0$.",
                        ex4_1_solution: "x cannot be negative length (-8). So Width = 5, Length = 8."
                    },
                    example_section: {
                        title_ex: "Examples with Step-by-Step Solutions",
                        ex1: {
                            title: "1. Quadratic Formula",
                            problem: "Solve for x (exact answers):",
                            problem_math: `3x^2 - 5x - 7 = 0`,
                            step1_title: "Step 1: Identify Coefficients",
                            step1_desc: "$a = 3, \\; b = -5, \\; c = -7$.",
                            step2_title: "Step 2: Plug into Formula",
                            step2_math: `x = \\frac{-(-5) \\pm \\sqrt{(-5)^2 - 4(3)(-7)}}{2(3)}`,
                            step3_title: "Step 3: Simplify",
                            step3_math: `x = \\frac{5 \\pm \\sqrt{25 + 84}}{6} = \\frac{5 \\pm \\sqrt{109}}{6}`,
                            result_title: "Final Answer",
                            result: "The two roots are $\\frac{5 + \\sqrt{109}}{6}$ and $\\frac{5 - \\sqrt{109}}{6}$."
                        },
                        ex2: {
                            title: "2. Solving a Cubic by Grouping",
                            problem: "Find all roots:",
                            problem_math: `x^3 - 2x^2 - 9x + 18 = 0`,
                            step1_title: "Step 1: Group Terms",
                            step1_desc: "Group the first two and last two.",
                            step1_math: `(x^3 - 2x^2) - (9x - 18) = 0`,
                            step2_title: "Step 2: Factor GCFs",
                            step2_math: `x^2(x - 2) - 9(x - 2) = 0`,
                            step3_title: "Step 3: Extract Common Binomial",
                            step3_math: `(x^2 - 9)(x - 2) = 0`,
                            step4_title: "Step 4: Solve Factors",
                            step4_desc: "$x^2 - 9$ is a difference of squares $(x-3)(x+3)$.",
                            result_title: "Final Answer",
                            result: `x = 2, \\; x = 3, \\; x = -3`
                        },
                        ex3: {
                            title: "3. Optimization Word Problem",
                            problem: "A rectangular garden has an area of 40 m². The length is 3m more than the width. Find the dimensions.",
                            problem_math: `\\text{Area} = 40, \\quad L = W + 3`,
                            step1_title: "Step 1: Set up Equation",
                            step1_math: `W(W + 3) = 40 \\implies W^2 + 3W - 40 = 0`,
                            step2_title: "Step 2: Solve for W",
                            step2_desc: "Factor the quadratic. Factors of -40 that add to 3 are +8 and -5.",
                            step2_math: `(W + 8)(W - 5) = 0`,
                            step3_title: "Step 3: Discard Invalid Solutions",
                            step3_desc: "$W = -8$ or $W = 5$. Width cannot be negative, so $W = 5$.",
                            result_title: "Final Answer",
                            result: "Width = 5m, Length = 8m."
                        }
                    }
                }
            }
        },
        real_world_applications: {
            title: "Real-World Applications",
            description: "Seeing polynomials in action: modeling physical space, analyzing motion, optimizing business profits, and fitting data trends.",
            lessons: {
                lesson6_title: "Modeling & Problem Solving",
                lesson6: {
                    section1: {
                        title1: "Area & Volume (Geometry)",
                        def1_1: "Polynomials describe the dimensions of geometric shapes when variables are involved.",
                        text1_1: "Common Scenario: Creating a box from a flat sheet by cutting out corners of size 'x'.",
                        math1_1: `V(x) = x(L - 2x)(W - 2x)`,

                        // Plot: Box Problem Diagram
                        plot1_title: "Visualizing the Cut",
                        plot1_desc: "A flat sheet of cardboard with corners cut out. Folding up the flaps creates a 3D box.",
                        plot1_type: "box_cut_visual",
                        plot1_data: {
                            sheet_width: 12,
                            sheet_height: 12,
                            cut_size: "x",
                            folded_dim: "(12-2x) by (12-2x) by x"
                        },
                        caption: "Cut corners → Fold up → Box!",
                        text1_2: "Here, $V(x)$ becomes a cubic polynomial (degree 3). Finding the maximum volume requires finding the vertex of this polynomial curve."
                    },
                    section2: {
                        title2: "Motion Problems (Physics)",
                        def2_1: "Projectile Motion: The height of an object thrown into the air is modeled by a quadratic polynomial due to gravity.",
                        math2_1: `h(t) = -16t^2 + v_0t + h_0 \\quad (\\text{Imperial units})`,
                        math2_2: `h(t) = -4.9t^2 + v_0t + h_0 \\quad (\\text{Metric units})`,
                        list2_1: "$t$: Time in seconds.",
                        list2_2: "$v_0$: Initial velocity.",
                        list2_3: "$h_0$: Initial height.",

                        // Plot: Projectile Trajectory
                        plot2_title: "Parabolic Trajectory",
                        plot2_desc: "Height over time. The vertex is the peak height; the positive x-intercept is when it hits the ground.",
                        plot2_type: "projectile_motion_visual",
                        plot2_data: {
                            function: "-16*t^2 + 64*t + 5",
                            domain: [0, 4.1],
                            points: [
                                { x: 0, y: 5, label: "Start (h0)" },
                                { x: 2, y: 69, label: "Max Height" },
                                { x: 4.08, y: 0, label: "Impact" }
                            ]
                        },
                        max_height: "Max Height (Vertex)",
                        impact: "Impact",
                        gravity: "gravity",
                        text2_1: "Solving $h(t) = 0$ tells you when the object hits the ground."
                    },
                    section3: {
                        title3: "Business Applications (Economics)",
                        def3_1: "Polynomials model financial health.",
                        math3_1: `P(x) = R(x) - C(x)`,
                        list3_1: "Revenue $R(x)$: Price $\\times$ Quantity sold.",
                        list3_2: "Cost $C(x)$: Fixed costs + Variable costs.",
                        list3_3: "Profit $P(x)$: The difference between Revenue and Cost.",

                        // Plot: Profit Analysis
                        plot3_title: "Visualizing Profit",
                        plot3_desc: "The green region is Profit (where Revenue > Cost). The peak of the Profit curve is the Maximum Profit. The points where Revenue equals Cost are Break-Even points.",
                        plot3_type: "profit_loss_visual",
                        plot3_data: {
                            revenue: "-0.5*x^2 + 50*x", // Parabolic Revenue
                            cost: "10*x + 200",       // Linear Cost
                            profit: "-0.5*x^2 + 40*x - 200", // P(x)
                            domain: [0, 100],
                            break_even_points: [5.36, 74.64] // Roots of P(x)
                        },
                        revenue: "Revenue",
                        cost: "Cost",
                        profit: "Profit",
                        break_even: "Break-Even",
                        text3_1: "Break-Even Points: The roots of $P(x)$ (where Profit = 0).",
                        text3_2: "To maximize profit, we find the vertex of the Profit parabola (for quadratic models).",

                        // Example: Max Profit
                        ex3_1_title: "Example (Maximizing Profit)",
                        ex3_1_problem: "Revenue is $R(x) = 50x - 0.5x^2$ and Cost is $C(x) = 10x + 200$. Find the production level $x$ for maximum profit.",
                        ex3_1_step1: "Profit Equation: $P(x) = (50x - 0.5x^2) - (10x + 200)$.",
                        ex3_1_step2: "Simplify: $P(x) = -0.5x^2 + 40x - 200$.",
                        ex3_1_step3: "Find Vertex ($x = -b/2a$): $x = -40 / (2 \\cdot -0.5) = -40 / -1 = 40$.",
                        ex3_1_solution: "Maximize profit by producing 40 units."
                    },
                    section4: {
                        title4: "Engineering & Data Modeling",
                        def4_1: "Curve Fitting (Regression): Engineers use polynomials to approximate complex real-world data points.",

                        // Plot: Curve Fitting
                        plot4_title: "Fitting a Trend",
                        plot4_desc: "The red dots are real-world data (scatter plot). The blue line is a polynomial model (Regression) used to predict future trends.",
                        plot4_type: "scatter_plot_fit",
                        plot4_data: {
                            points: [{ x: 1, y: 2 }, { x: 2, y: 5 }, { x: 3, y: 10 }, { x: 4, y: 17 }],
                            model: "x^2 + 1", // Fits 1, 4, 9, 16 (+1) pattern
                            prediction_point: { x: 5, y: 26 },
                            label: "Quadratic Fit"
                        },
                        data: "Data",
                        prediction: "Prediction",
                        text4_1: "A set of scattered data points can often be modeled by a 'Line of Best Fit' (Linear) or a curve (Quadratic/Cubic) to predict future outcomes.",
                        warning4_1: "Overfitting: Using a polynomial with too high of a degree might fit the noise rather than the trend.",

                        // Example: Modeling
                        ex4_1_title: "Example (Pattern Recognition)",
                        ex4_1_problem: "Find a polynomial model for the sequence: 2, 5, 10, 17...",
                        ex4_1_step1: "First Differences: $5-2=3, 10-5=5, 17-10=7$ (Not linear).",
                        ex4_1_step2: "Second Differences: $5-3=2, 7-5=2$ (Constant).",
                        ex4_1_step3: "Constant second difference implies a Quadratic model ($n^2 + 1$).",
                        ex4_1_solution: "Model: $y = x^2 + 1$."
                    },
                    example_section: {
                        title_ex: "Examples with Step-by-Step Solutions",
                        ex1: {
                            title: "1. Projectile Motion",
                            problem: "A rocket is launched from the ground ($h_0=0$) with initial velocity $v_0 = 98$ m/s. When does it return to earth?",
                            problem_math: `h(t) = -4.9t^2 + 98t + 0`,
                            step1_title: "Step 1: Set Height to Zero",
                            step1_desc: "We want to find $t$ when $h(t) = 0$.",
                            step1_math: `-4.9t^2 + 98t = 0`,
                            step2_title: "Step 2: Factor",
                            step2_desc: "Factor out $t$ (or $-4.9t$).",
                            step2_math: `t(-4.9t + 98) = 0`,
                            step3_title: "Step 3: Solve for t",
                            step3_desc: "Two solutions: $t = 0$ (launch) and $-4.9t + 98 = 0$.",
                            step3_math: `4.9t = 98 \\implies t = 20`,
                            result_title: "Final Answer",
                            result: "The rocket hits the ground after 20 seconds."
                        },
                        ex2: {
                            title: "2. Maximizing Profit",
                            problem: "A company's profit is modeled by $P(x) = -x^2 + 100x - 900$. How many units ($x$) should be sold to maximize profit?",
                            step1_title: "Step 1: Identify Function Type",
                            step1_desc: "This is a downward-opening parabola (Quadratic). The maximum is at the Vertex.",
                            step2_title: "Step 2: Vertex Formula",
                            step2_math: `x = \\frac{-b}{2a}`,
                            step3_title: "Step 3: Substitute Coefficients",
                            step3_desc: "$a = -1, b = 100$.",
                            step3_math: `x = \\frac{-100}{2(-1)} = \\frac{-100}{-2} = 50`,
                            result_title: "Final Answer",
                            result: "Selling 50 units yields the maximum profit."
                        },
                        ex3: {
                            title: "3. Volume Construction",
                            problem: "A box is made from a 10x8 sheet by cutting squares of side $x$. Express the Volume polynomial.",
                            problem_math: `V = L \\cdot W \\cdot H`,
                            step1_title: "Step 1: Define Dimensions",
                            step1_desc: "Height = $x$. Length = $10 - 2x$. Width = $8 - 2x$.",
                            step2_title: "Step 2: Set up Equation",
                            step2_math: `V(x) = x(10 - 2x)(8 - 2x)`,
                            step3_title: "Step 3: Expand (Standard Form)",
                            step3_desc: "Multiply binomials first: $(80 - 20x - 16x + 4x^2)$. Then multiply by $x$.",
                            result_title: "Final Answer",
                            result: `V(x) = 4x^3 - 36x^2 + 80x`
                        }
                    }
                }
            }
        },
    },
    es: {
        polynomial_basics: {
            title: "Conceptos Básicos de Polinomios",
            description: "Los bloques de construcción del álgebra: entendiendo la estructura, terminología y clasificación de los polinomios.",
            lessons: {
                lesson1_title: "Estructura y Terminología",
                lesson1: {
                    section1: {
                        title1: "Definición y Terminología",
                        def1_1: "Un polinomio es una expresión matemática que consiste en variables (también llamadas indeterminadas) y coeficientes, que involucra solo las operaciones de suma, resta, multiplicación y exponentes enteros no negativos de variables.",
                        math1_1: `P(x) = a_n x^n + a_{n-1} x^{n-1} + \\dots + a_1 x + a_0`,

                        // Plot: Anatomía de un Polinomio
                        plot1_title: "Anatomía de un Polinomio",
                        plot1_desc: "Desglose visual del término $3x^2$.",
                        plot1_type: "polynomial_anatomy",
                        plot1_data: {
                            expression: "3x^2",
                            labels: [
                                { text: "Coeficiente", target: "3", color: "blue" },
                                { text: "Variable", target: "x", color: "black" },
                                { text: "Exponente", target: "2", color: "red" },
                                { text: "Grado", target: "2", color: "red" }
                            ]
                        },
                        text1_1: "Vocabulario Clave:",
                        list1_1: "Término: Cada parte del polinomio separada por signos + o -.",
                        list1_2: "Coeficiente: El factor numérico de un término (ej. en $5x^2$, 5 es el coeficiente).",
                        list1_3: "Constante: Un término sin variable (grado 0).",
                        warning1: "Las expresiones con exponentes negativos ($x^{-1}$) o exponentes fraccionarios ($\\sqrt{x}$) NO son polinomios."
                    },
                    section2: {
                        title2: "Grado y Coeficiente Principal",
                        def2_1: "El Grado de un polinomio es el exponente más alto de la variable presente en la expresión.",
                        def2_2: "El Coeficiente Principal (CP) es el coeficiente del término con el grado más alto.",

                        // Ejemplo: Grado y CP
                        ex2_1_title: "Comprobación Rápida",
                        ex2_1_problem: "Analiza el polinomio $P(x) = 7x^3 - 2x + 5$.",
                        ex2_1_solution: "La potencia más alta es 3, así que **Grado = 3**. El coeficiente de $x^3$ es 7, así que **Coeficiente Principal = 7**.",

                        text2_1: "El grado determina el comportamiento final del gráfico (si va hacia arriba o hacia abajo en el infinito)."
                    },
                    section3: {
                        title3: "Forma Estándar",
                        def3_1: "Un polinomio está en Forma Estándar cuando sus términos están ordenados del grado más alto al grado más bajo.",

                        // Ejemplo: Reordenar a Forma Estándar
                        ex3_1_title: "Ejemplo",
                        ex3_1_problem: "Reescribe $f(x) = 4 + x^3 - 2x$ en forma estándar.",
                        ex3_1_step1: "Identifica grados: $4$ (grado 0), $x^3$ (grado 3), $-2x$ (grado 1).",
                        ex3_1_solution: "Ordena por grado (3, 1, 0): $f(x) = x^3 - 2x + 4$.",

                        math3_1: `\\text{Ejemplo: } f(x) = -2x^3 + 4x^2 - x + 7`,
                        text3_1: "Es práctica estándar reescribir siempre los polinomios de esta manera antes de analizarlos."
                    },
                    section4: {
                        title4: "Tipos de Polinomios",
                        def4_1_title: "Clasificación por Número de Términos",
                        list4_1: "Monomio: 1 término (ej. $3x^2$)",
                        list4_2: "Binomio: 2 términos (ej. $x + 5$)",
                        list4_3: "Trinomio: 3 términos (ej. $x^2 + 3x - 4$)",

                        def4_2_title: "Clasificación por Grado",
                        list4_4: "Lineal: Grado 1 ($mx + b$)",
                        list4_5: "Cuadrática: Grado 2 ($ax^2 + bx + c$)",
                        list4_6: "Cúbica: Grado 3",

                        // Plot: Comparación de Tipos de Polinomios
                        plot4_title: "Comparando Grados",
                        plot4_desc: "Lineal es una línea recta. Cuadrática es una parábola en forma de U. Cúbica es una curva en forma de S.",
                        plot4_type: "multi_function",
                        plot4_domain: [-3, 3],
                        plot4_functions: [
                            { expression: "x", color: "blue", label: "Lineal (x)" },
                            { expression: "x^2", color: "green", label: "Cuadrática (x^2)" },
                            { expression: "x^3", color: "red", label: "Cúbica (x^3)" }
                        ]
                    },
                    section5: {
                        title5: "Igualdad de Polinomios",
                        def5_1: "Dos polinomios son iguales si y solo si tienen el mismo grado y sus coeficientes correspondientes son idénticos.",

                        // Ejemplo: Resolviendo para Constantes
                        ex5_1_title: "Ejemplo (Encontrando Constantes)",
                        ex5_1_problem: "Encuentra A y B si $2x + 5 = Ax + B$.",
                        ex5_1_step1: "Compara coeficientes de x: $2 = A$.",
                        ex5_1_step2: "Compara términos constantes: $5 = B$.",
                        ex5_1_solution: "Entonces, $A=2$ y $B=5$.",

                        math5_1: `Ax^2 + Bx + C = 2x^2 - 5x + 1 \\implies A=2, B=-5, C=1`,
                        text5_1: "Este principio se usa a menudo para resolver constantes desconocidas."
                    },
                    example_section: {
                        title_ex: "Ejemplos con Soluciones Paso a Paso",
                        ex1: {
                            title: "1. Forma Estándar e Identificación",
                            problem: "Reescribe en forma estándar e identifica el grado y el coeficiente principal.",
                            problem_math: `P(x) = 4 - 2x + 7x^5 - 3x^2`,
                            step1_title: "Paso 1: Identificar Exponentes",
                            step1_desc: "Las potencias son 0 (constante), 1 ($2x$), 5 ($7x^5$) y 2 ($-3x^2$).",
                            step2_title: "Paso 2: Reordenar",
                            step2_desc: "Coloca los términos en orden descendente de potencias: 5, luego 2, luego 1, luego 0.",
                            step2_math: `P(x) = 7x^5 - 3x^2 - 2x + 4`,
                            step3_title: "Paso 3: Identificar Grado y CP",
                            step3_desc: "La potencia más alta es 5. El número frente a $x^5$ es 7.",
                            result_title: "Respuesta Final",
                            result: "Grado: 5, Coeficiente Principal: 7."
                        },
                        ex2: {
                            title: "2. Validando Polinomios",
                            problem: "¿Cuáles de los siguientes son polinomios?",
                            problem_math: `A) \\; 3x^2 + 2x^{-1} \\quad B) \\; 5\\sqrt{x} + 2 \\quad C) \\; \\frac{1}{2}x^3 - \\pi`,
                            step1_title: "Paso 1: Analizar Exponentes",
                            step1_desc: "Los polinomios deben tener exponentes enteros no negativos (0, 1, 2, ...).",
                            step2_title: "Paso 2: Verificar Cada Caso",
                            step2_math: `A: x^{-1} \\text{ tiene un exponente negativo. (No es un polinomio)} \\\\ B: \\sqrt{x} = x^{1/2} \\text{ tiene una fracción. (No es un polinomio)} \\\\ C: \\text{Los coeficientes pueden ser fracciones (1/2) o irracionales (}\\pi\\text{). Las potencias son enteros.}`,
                            result_title: "Respuesta Final",
                            result: "Solo C es un polinomio."
                        },
                        ex3: {
                            title: "3. Encontrando Coeficientes (Igualdad)",
                            problem: "Encuentra A y B si la ecuación es verdadera para todo x:",
                            problem_math: `2x(x + 3) = Ax^2 + Bx`,
                            step1_title: "Paso 1: Expandir Lado Izquierdo",
                            step1_desc: "Distribuye el $2x$.",
                            step1_math: `2x \\cdot x + 2x \\cdot 3 = 2x^2 + 6x`,
                            step2_title: "Paso 2: Comparar Coeficientes",
                            step2_math: `2x^2 + 6x = Ax^2 + Bx`,
                            step3_title: "Paso 3: Emparejar Términos",
                            step3_desc: "El término $x^2$ coincide con A. El término $x$ coincide con B.",
                            result_title: "Respuesta Final",
                            result: `A = 2, \\quad B = 6`
                        }
                    }
                }
            }
        },
        polynomial_operations: {
            title: "Operaciones con Polinomios",
            description: "Dominando la aritmética de polinomios: sumar, restar, multiplicar y dos métodos poderosos para la división.",
            lessons: {
                lesson2_title: "Aritmética y Algoritmos de División",
                lesson2: {
                    section1: {
                        title1: "Suma y Resta",
                        def1_1: "La Regla de Oro: Solo puedes sumar o restar Términos Semejantes.",
                        def1_2: "Términos Semejantes son términos que tienen exactamente la misma variable elevada al mismo exponente exacto.",

                        // Plot: Agrupando Términos Semejantes
                        plot1_title: "Visualizando Términos Semejantes",
                        plot1_desc: "Agrupamos términos por sus partes variables. Los términos $x^2$ van juntos, los términos $x$ van juntos.",
                        plot1_type: "polynomial_grouping",
                        plot1_data: {
                            expression: "(2x^2 + 3x) + (4x^2 - x)",
                            groups: [
                                { terms: ["2x^2", "4x^2"], color: "red", label: "Cuadrático" },
                                { terms: ["3x", "-x"], color: "blue", label: "Lineal" }
                            ]
                        },

                        math1_1: `3x^2 + 5x^2 = 8x^2 \\quad \\text{(Correcto)}`,
                        math1_2: `3x^2 + 5x = \\text{No se puede combinar}`,
                        text1_1: "Al restar polinomios, recuerda distribuir el signo negativo a cada término en el segundo polinomio.",

                        // Ejemplo: Resta
                        ex1_1_title: "Ejemplo (Resta)",
                        ex1_1_problem: "Simplifica $(5x^2 + 2x - 1) - (3x^2 - 4x + 2)$.",
                        ex1_1_step1: "Distribuye el negativo: $5x^2 + 2x - 1 - 3x^2 + 4x - 2$.",
                        ex1_1_step2: "Agrupa términos semejantes: $(5x^2 - 3x^2) + (2x + 4x) + (-1 - 2)$.",
                        ex1_1_solution: "Resultado: $2x^2 + 6x - 3$."
                    },
                    section2: {
                        title2: "Multiplicación",
                        def2_1: "La multiplicación se basa en la Propiedad Distributiva y la Regla de los Exponentes: $x^a \\cdot x^b = x^{a+b}$.",
                        list2_1: "Monomio × Polinomio: Distribuye el término único a todos los términos dentro.",
                        list2_2: "Binomio × Binomio: Usa el método FOIL (Primero, Exterior, Interior, Último).",
                        list2_3: "Multiplicación General: Multiplica cada término del primer polinomio por cada término del segundo.",

                        // Plot: Método de la Caja (Modelo de Área)
                        plot2_title: "El Método de la Caja (Modelo de Área)",
                        plot2_desc: "Visualizando $(x+2)(x+3)$. El área de los cuatro rectángulos interiores suma el producto.",
                        plot2_type: "polynomial_box_method",
                        plot2_data: {
                            top_labels: ["x", "+3"],
                            side_labels: ["x", "+2"],
                            cells: [
                                { val: "x^2", color: "light-blue" }, { val: "3x", color: "light-green" },
                                { val: "2x", color: "light-green" }, { val: "6", color: "light-yellow" }
                            ]
                        },

                        // Ejemplo: Multiplicación de Binomios
                        ex2_1_title: "Ejemplo (FOIL)",
                        ex2_1_problem: "Multiplica $(2x + 1)(x - 5)$.",
                        ex2_1_step1: "Primero: $2x \\cdot x = 2x^2$. Exterior: $2x \\cdot -5 = -10x$.",
                        ex2_1_step2: "Interior: $1 \\cdot x = 1x$. Último: $1 \\cdot -5 = -5$.",
                        ex2_1_step3: "Combina términos semejantes (-10x + 1x).",
                        ex2_1_solution: "Resultado: $2x^2 - 9x - 5$."
                    },
                    section3: {
                        title3: "División Larga de Polinomios",
                        def3_1: "Se usa para dividir un polinomio por otro polinomio de cualquier grado. Sigue el mismo algoritmo que la división larga aritmética.",

                        step3_1: "1. Dividir: Divide el término principal del dividendo por el término principal del divisor.",
                        step3_2: "2. Multiplicar: Multiplica el resultado por todo el divisor.",
                        step3_3: "3. Restar: Resta este resultado del original (¡cambia los signos!).",
                        step3_4: "4. Bajar: Baja el siguiente término y repite.",

                        math3_1: `\\frac{P(x)}{D(x)} = Q(x) + \\frac{R(x)}{D(x)}`,
                        text3_1: "Donde Q es Cociente, R es Resto y D es Divisor.",

                        // Ejemplo: División Larga
                        ex3_1_title: "Ejemplo (División Larga)",
                        ex3_1_problem: "Divide $2x^2 + 7x + 6$ entre $x + 2$.",
                        ex3_1_step1: "Divide: $2x^2 \\div x = 2x$. Escribe $2x$ arriba.",
                        ex3_1_step2: "Multiplica: $2x(x + 2) = 2x^2 + 4x$.",
                        ex3_1_step3: "Resta: $(2x^2 + 7x) - (2x^2 + 4x) = 3x$. Baja el $+6$.",
                        ex3_1_step4: "Repite: $3x \\div x = 3$. Multiplica $3(x+2) = 3x + 6$. Resta para obtener $0$.",
                        ex3_1_solution: "El cociente es $2x + 3$ con Resto $0$."
                    },
                    section4: {
                        title4: "División Sintética",
                        def4_1: "Un método abreviado para la división que usa solo los coeficientes. Es más rápido pero tiene un requisito estricto.",
                        warning4_1: "Restricción: La División Sintética solo funciona al dividir por un binomio lineal de la forma $(x - c)$.",

                        step4_1: "1. Configuración: Escribe 'c' afuera (si divides por $x-3$, usa 3). Escribe coeficientes adentro.",
                        step4_2: "2. Bajar: Baja el primer coeficiente directamente.",
                        step4_3: "3. Multiplicar y Sumar: Multiplica el número de abajo por 'c', colócalo en la siguiente columna, suma hacia abajo.",
                        text4_2: "Los números en la fila inferior representan los coeficientes del cociente (que siempre es un grado menor).",

                        // Ejemplo: División Sintética
                        ex4_1_title: "Ejemplo (Sintética)",
                        ex4_1_problem: "Divide $x^3 - 4x^2 + 2x - 5$ entre $x - 3$.",
                        ex4_1_step1: "Configuración: $c = 3$. Coeficientes son $[1, -4, 2, -5]$.",
                        ex4_1_step2: "Baja 1. Multiplica $3(1)=3$. Suma a -4: $-4+3 = -1$.",
                        ex4_1_step3: "Multiplica $3(-1)=-3$. Suma a 2: $2-3 = -1$.",
                        ex4_1_step4: "Multiplica $3(-1)=-3$. Suma a -5: $-5-3 = -8$ (Resto).",
                        ex4_1_solution: "Cociente: $x^2 - x - 1$, Resto: $-8$."
                    },
                    example_section: {
                        title_ex: "Ejemplos con Soluciones Paso a Paso",
                        ex1: {
                            title: "1. Multiplicando Polinomios",
                            problem: "Expande y simplifica:",
                            problem_math: `(2x - 3)(x^2 + 4x - 1)`,
                            step1_title: "Paso 1: Distribuir 2x",
                            step1_math: `2x(x^2) + 2x(4x) + 2x(-1) = 2x^3 + 8x^2 - 2x`,
                            step2_title: "Paso 2: Distribuir -3",
                            step2_desc: "Ten cuidado con los signos.",
                            step2_math: `-3(x^2) - 3(4x) - 3(-1) = -3x^2 - 12x + 3`,
                            step3_title: "Paso 3: Combinar Términos Semejantes",
                            step3_desc: "Combina términos $x^2$ y términos $x$.",
                            step3_math: `2x^3 + (8x^2 - 3x^2) + (-2x - 12x) + 3`,
                            result_title: "Respuesta Final",
                            result: `2x^3 + 5x^2 - 14x + 3`
                        },
                        ex2: {
                            title: "2. División Larga de Polinomios",
                            problem: "Divide usando División Larga:",
                            problem_math: `(x^2 - 5x + 6) \\div (x - 2)`,
                            step1_title: "Paso 1: Dividir Términos Principales",
                            step1_desc: "¿Cuántas veces cabe $x$ en $x^2$? Respuesta: $x$.",
                            step2_title: "Paso 2: Multiplicar y Restar",
                            step2_desc: "Multiplica $x(x-2) = x^2 - 2x$. Resta esto de la fila superior: $(-5x) - (-2x) = -3x$.",
                            step3_title: "Paso 3: Bajar y Repetir",
                            step3_desc: "Baja $+6$. Ahora divide $-3x$ entre $x$. Respuesta: $-3$.",
                            step3_math: `-3(x - 2) = -3x + 6`,
                            step4_title: "Paso 4: Resto",
                            step4_desc: "Restar da 0.",
                            result_title: "Respuesta Final",
                            result: `x - 3`
                        },
                        ex3: {
                            title: "3. División Sintética",
                            problem: "Divide usando División Sintética:",
                            problem_math: `(3x^3 - 2x^2 + x - 5) \\div (x - 2)`,
                            step1_title: "Paso 1: Configuración",
                            step1_desc: "El divisor es $x-2$, así que usa $c = 2$. Los coeficientes son [3, -2, 1, -5].",
                            step2_title: "Paso 2: El Algoritmo",
                            step2_math: `\\text{Abajo: } 3 \\\\ \\text{Mult: } 2 \\cdot 3 = 6 \\rightarrow \\text{Sumar a -2} = 4 \\\\ \\text{Mult: } 2 \\cdot 4 = 8 \\rightarrow \\text{Sumar a 1} = 9 \\\\ \\text{Mult: } 2 \\cdot 9 = 18 \\rightarrow \\text{Sumar a -5} = 13`,
                            step3_title: "Paso 3: Interpretar Resultado",
                            step3_desc: "La fila inferior es 3, 4, 9 con resto 13. El grado baja de 3 a 2.",
                            result_title: "Respuesta Final",
                            result: `3x^2 + 4x + 9 + \\frac{13}{x-2}`
                        }
                    }
                }
            }
        },
        factorization_techniques: {
            title: "Técnicas de Factorización",
            description: "El arte de descomponer polinomios: convertir expresiones complejas en productos de factores más simples.",
            lessons: {
                lesson3_title: "Métodos Fundamentales de Factorización",
                lesson3: {
                    section1: {
                        title1: "Máximo Común Divisor (MCD)",
                        def1_1: "La primera regla de la factorización: Busca siempre un Factor Común primero.",

                        // Plot: Visualizando MCD
                        plot1_title: "Visualizando el MCD",
                        plot1_desc: "Sacamos el término común $2x$ de ambas partes de la expresión.",
                        plot1_type: "polynomial_gcf_visual",
                        plot1_data: {
                            original: "2x^2 + 6x",
                            gcf: "2x",
                            remainder: "(x + 3)",
                            color_gcf: "blue",
                            color_rem: "black"
                        },

                        text1_1: "Identifica el número más grande y la potencia más alta de la variable que divide exactamente a cada término.",
                        math1_1: `ab + ac = a(b + c)`,
                        warning1: "Si el término principal es negativo, generalmente es mejor factorizar también el signo negativo.",

                        // Ejemplo: MCD
                        ex1_1_title: "Ejemplo (MCD)",
                        ex1_1_problem: "Factoriza $12x^3 - 8x^2$.",
                        ex1_1_step1: "Coeficientes: El MCD de 12 y 8 es 4.",
                        ex1_1_step2: "Variables: El MCD de $x^3$ y $x^2$ es $x^2$.",
                        ex1_1_step3: "Divide cada término por $4x^2$.",
                        ex1_1_solution: "Resultado: $4x^2(3x - 2)$."
                    },
                    section2: {
                        title2: "Patrones Especiales",
                        def2_1_title: "Diferencia de Cuadrados",
                        def2_1: "Dos cuadrados perfectos separados por un signo menos.",
                        math2_1: `a^2 - b^2 = (a - b)(a + b)`,

                        // Plot: Geometría de Diferencia de Cuadrados
                        plot2_title: "Prueba Geométrica",
                        plot2_desc: "El área de un cuadrado grande ($a^2$) menos un cuadrado pequeño ($b^2$) se puede reorganizar en un rectángulo con dimensiones $(a-b)$ y $(a+b)$.",
                        plot2_type: "diff_squares_geometry",
                        plot2_data: { a: 5, b: 2 },

                        // Ejemplo: Diferencia de Cuadrados
                        ex2_1_title: "Ejemplo (Dif. de Cuadrados)",
                        ex2_1_problem: "Factoriza $9x^2 - 16$.",
                        ex2_1_step1: "Identifica cuadrados: $9x^2 = (3x)^2$ así que $a=3x$. $16 = 4^2$ así que $b=4$.",
                        ex2_1_solution: "Aplica la fórmula: $(3x - 4)(3x + 4)$.",

                        text2_1: "Nota: Una 'Suma de Cuadrados' ($a^2 + b^2$) no se puede factorizar en los números reales.",

                        def2_2_title: "Trinomios Cuadrados Perfectos",
                        def2_2: "Resultado de elevar un binomio al cuadrado.",
                        math2_2: `a^2 + 2ab + b^2 = (a + b)^2 \\quad \\text{y} \\quad a^2 - 2ab + b^2 = (a - b)^2`
                    },
                    section3: {
                        title3: "Factorización por Agrupación",
                        def3_1: "Se usa principalmente cuando un polinomio tiene 4 términos.",

                        // Plot: Visualizando Agrupación
                        plot3_title: "Visualizando Agrupación",
                        plot3_desc: "Dividimos los 4 términos en dos pares. El objetivo es encontrar un factor binomio común (la parte entre paréntesis).",
                        plot3_type: "grouping_visual",
                        plot3_data: {
                            expr: "x^3 + 2x^2 + 3x + 6",
                            group1: "x^2(x + 2)",
                            group2: "+ 3(x + 2)",
                            common: "(x + 2)"
                        },
                        plot3_description: "Misma área, diferente forma",
                        step3_1: "1. Agrupar términos: Agrupa los dos primeros términos y los dos últimos.",
                        step3_2: "2. Factorizar MCD: Extrae el MCD de cada par por separado.",
                        step3_3: "3. Binomio Factor: Si se hace correctamente, los paréntesis coincidirán. Factoriza este binomio común.",

                        math3_1: `ax + ay + bx + by = a(x+y) + b(x+y) = (a+b)(x+y)`,

                        // Ejemplo: Agrupación
                        ex3_1_title: "Ejemplo (Agrupación)",
                        ex3_1_problem: "Factoriza $2x^3 - 3x^2 + 4x - 6$.",
                        ex3_1_step1: "Agrupa: $(2x^3 - 3x^2) + (4x - 6)$.",
                        ex3_1_step2: "Factoriza MCDs: $x^2(2x - 3) + 2(2x - 3)$.",
                        ex3_1_step3: "Verifica coincidencia: $(2x - 3)$ está en ambos.",
                        ex3_1_solution: "Resultado: $(x^2 + 2)(2x - 3)$."
                    },
                    section4: {
                        title4: "Técnicas Avanzadas",

                        // --- Cubos ---
                        def4_1_title: "Suma y Diferencia de Cubos",
                        math4_1: `a^3 - b^3 = (a - b)(a^2 + ab + b^2)`,
                        math4_2: `a^3 + b^3 = (a + b)(a^2 - ab + b^2)`,

                        // Plot: Mnemotecnia SOAP
                        plot4_title: "El Método SOAP",
                        plot4_desc: "Ayuda visual para la colocación de signos en la factorización cúbica.",
                        plot4_type: "mnemonic_visual",
                        plot4_data: { mnemonic: "SOAP", meaning: ["Same (Mismo)", "Opposite (Opuesto)", "Always (Siempre)", "Positive (Positivo)"] },

                        text4_1: "Mnemotecnia: SOAP (Mismo signo, Signo Opuesto, Siempre Positivo).",

                        // Ejemplo: Diferencia de Cubos
                        ex4_1_title: "Ejemplo (Cubos)",
                        ex4_1_problem: "Factoriza $8x^3 - 27$.",
                        ex4_1_step1: "Identifica cubos: $(2x)^3 - 3^3$. Así que $a=2x, b=3$.",
                        ex4_1_step2: "Aplica SOAP: $(2x - 3)((2x)^2 + (2x)(3) + 3^2)$.",
                        ex4_1_solution: "Resultado: $(2x - 3)(4x^2 + 6x + 9)$.",

                        // --- Método AC ---
                        def4_2_title: "Trinomios Cuadráticos (Método AC)",
                        text4_2: "Para $ax^2 + bx + c$, encuentra dos números que multiplicados den $a \\cdot c$ y sumados den $b$. Divide el término medio y usa agrupación.",

                        // Ejemplo: Método AC
                        ex4_2_title: "Ejemplo (Método AC)",
                        ex4_2_problem: "Factoriza $3x^2 + 10x + 8$.",
                        ex4_2_step1: "Multiplica $a \\cdot c$: $3(8) = 24$. Busca factores de 24 que sumen 10: 6 y 4.",
                        ex4_2_step2: "Divide término medio: $3x^2 + 6x + 4x + 8$.",
                        ex4_2_step3: "Agrupa: $3x(x + 2) + 4(x + 2)$.",
                        ex4_2_solution: "Resultado: $(3x + 4)(x + 2)$."
                    },
                    example_section: {
                        title_ex: "Ejemplos con Soluciones Paso a Paso",
                        ex1: {
                            title: "1. MCD y Diferencia de Cuadrados",
                            problem: "Factoriza completamente:",
                            problem_math: `3x^3 - 27x`,
                            step1_title: "Paso 1: Factorizar el MCD",
                            step1_desc: "Ambos términos son divisibles por $3x$.",
                            step1_math: `3x(x^2 - 9)`,
                            step2_title: "Paso 2: Identificar Patrón",
                            step2_desc: "Dentro del paréntesis, $x^2 - 9$ es una Diferencia de Cuadrados ($x^2 - 3^2$).",
                            step2_math: `(x - 3)(x + 3)`,
                            result_title: "Respuesta Final",
                            result: `3x(x - 3)(x + 3)`
                        },
                        ex2: {
                            title: "2. Factorización por Agrupación",
                            problem: "Factoriza el polinomio de cuatro términos:",
                            problem_math: `x^3 + 4x^2 + 3x + 12`,
                            step1_title: "Paso 1: Agrupar Términos",
                            step1_desc: "Agrupa $(x^3 + 4x^2)$ y $(3x + 12)$.",
                            step2_title: "Paso 2: Factorizar MCD de Grupos",
                            step2_math: `x^2(x + 4) + 3(x + 4)`,
                            step3_title: "Paso 3: Factorizar Binomio Común",
                            step3_desc: "El término $(x+4)$ es común a ambas partes.",
                            result_title: "Respuesta Final",
                            result: `(x^2 + 3)(x + 4)`
                        },
                        ex3: {
                            title: "3. El Método AC (Trinomios)",
                            problem: "Factoriza:",
                            problem_math: `2x^2 + 7x + 3`,
                            step1_title: "Paso 1: Multiplicar A y C",
                            step1_desc: "$A=2, C=3$. El producto es $6$. Necesitamos factores de 6 que sumen $B=7$.",
                            step1_math: `\\text{Factores: } 6 \\text{ y } 1 \\quad (6 \\cdot 1 = 6, \\; 6+1 = 7)`,
                            step2_title: "Paso 2: Dividir Término Medio",
                            step2_math: `2x^2 + 6x + 1x + 3`,
                            step3_title: "Paso 3: Agrupar y Resolver",
                            step3_desc: "Factoriza por agrupación.",
                            step3_math: `2x(x + 3) + 1(x + 3)`,
                            result_title: "Respuesta Final",
                            result: `(2x + 1)(x + 3)`
                        }
                    }
                }
            }
        },
        roots_zeros: {
            title: "Raíces y Ceros",
            description: "Uniendo álgebra y geometría: encontrando los valores exactos donde un polinomio es igual a cero y entendiendo el Teorema Fundamental del Álgebra.",
            lessons: {
                lesson4_title: "Teoremas y Estrategias de Resolución",
                lesson4: {
                    section1: {
                        title1: "El Teorema Fundamental y el Teorema del Factor",
                        def1_1: "El Teorema Fundamental del Álgebra: Todo polinomio de grado $n$ tiene exactamente $n$ raíces complejas (contando la multiplicidad).",
                        text1_1: "Esto garantiza que una ecuación de grado 5 tenga exactamente 5 soluciones.",

                        // Plot: Raíces vs Factores
                        plot1_title: "Conexión: Raíces y Factores",
                        plot1_desc: "Si el gráfico cruza el eje x en $c=2$, entonces $(x-2)$ es un factor del polinomio.",
                        plot1_type: "root_factor_visual",
                        plot1_data: {
                            root: 2,
                            factor: "(x - 2)",
                            function: "(x-2)(x+1)(x-4)",
                            domain: [-2, 5]
                        },
                        plot1_description: "- factor",
                        def1_2: "El Teorema del Factor:",
                        math1_1: `P(c) = 0 \\iff (x - c) \\text{ es un factor de } P(x)`,
                        text1_2: "Esto proporciona un vínculo directo entre los factores algebraicos y las intersecciones geométricas con el eje x."
                    },
                    section2: {
                        title2: "Teorema de la Raíz Racional",
                        def2_1: "Una estrategia para encontrar una lista de *posibles* raíces racionales cuando el polinomio tiene coeficientes enteros.",

                        math2_1: `\\text{Raíces Posibles} = \\pm \\frac{\\text{Factores del Término Constante } (p)}{\\text{Factores del Coeficiente Principal } (q)}`,

                        step2_1: "1. Lista todos los factores del término constante ($p$).",
                        step2_2: "2. Lista todos los factores del coeficiente principal ($q$).",
                        step2_3: "3. Forma todas las fracciones $p/q$ y pruébalas usando división sintética.",

                        // Ejemplo: Teorema de la Raíz Racional
                        ex2_1_title: "Ejemplo (Buscando Candidatos)",
                        ex2_1_problem: "Encuentra posibles raíces racionales para $2x^3 + x^2 - 13x + 6$.",
                        ex2_1_step1: "Constante $p = 6$. Factores: $\\pm 1, \\pm 2, \\pm 3, \\pm 6$.",
                        ex2_1_step2: "Coef. Principal $q = 2$. Factores: $\\pm 1, \\pm 2$.",
                        ex2_1_step3: "Forma razones $p/q$: $\\pm 1, \\pm 2, \\pm 3, \\pm 6, \\pm 1/2, \\pm 3/2$.",
                        ex2_1_solution: "Estas son las únicas posibles raíces racionales para probar."
                    },
                    section3: {
                        title3: "Multiplicidad",
                        def3_1: "La multiplicidad se refiere a cuántas veces aparece un factor específico en la factorización del polinomio.",
                        math3_1: `P(x) = (x - 2)^3 (x + 1)^2`,

                        // Plot: Comportamiento de Multiplicidad
                        plot3_title: "Visualizando Multiplicidad",
                        plot3_desc: "En x=1 (potencia impar ^1), el gráfico cruza. En x=2 (potencia par ^2), el gráfico rebota.",
                        plot3_type: "multiplicity_visual",
                        plot3_data: {
                            function: "(x-1)(x-2)^2",
                            roots: [
                                { x: 1, type: "cross", label: "Impar (Cruza)" },
                                { x: 2, type: "bounce", label: "Par (Rebota)" }
                            ]
                        },

                        list3_1: "Multiplicidad Impar (ej., ^1, ^3): El gráfico **cruza** el eje x.",
                        list3_2: "Multiplicidad Par (ej., ^2, ^4): El gráfico **toca** (rebota en) el eje x.",

                        // Ejemplo: Multiplicidad
                        ex3_1_title: "Ejemplo (Comportamiento del Gráfico)",
                        ex3_1_problem: "Describe el comportamiento de $f(x) = (x+3)^2 (x-1)^3$ en las intersecciones.",
                        ex3_1_step1: "Raíz $x=-3$: Multiplicidad 2 (Par). El gráfico rebota.",
                        ex3_1_step2: "Raíz $x=1$: Multiplicidad 3 (Impar). El gráfico cruza."
                    },
                    section4: {
                        title4: "Raíces Complejas",
                        def4_1: "Si un polinomio tiene coeficientes reales, las raíces complejas siempre vienen en pares conjugados.",
                        math4_2: `\\text{Si } a + bi \\text{ es una raíz, entonces } a - bi \\text{ también es una raíz.}`,
                        text4_1: "Esto explica por qué los polinomios de grado impar deben tener al menos una raíz real (las raíces complejas usan el grado en pares de 2).",

                        // Ejemplo: Conjugados Complejos
                        ex4_1_title: "Ejemplo (Encontrando Raíces)",
                        ex4_1_problem: "Un polinomio cúbico tiene raíces $3$ y $2 - i$. Encuentra la tercera raíz.",
                        ex4_1_solution: "Como las raíces complejas vienen en pares, la tercera raíz debe ser el conjugado: $2 + i$."
                    },
                    example_section: {
                        title_ex: "Ejemplos con Soluciones Paso a Paso",
                        ex1: {
                            title: "1. Usando el Teorema de la Raíz Racional",
                            problem: "Encuentra todas las posibles raíces racionales para:",
                            problem_math: `P(x) = 2x^3 + x^2 - 13x + 6`,
                            step1_title: "Paso 1: Identificar p y q",
                            step1_desc: "Factores del término constante (6): $p = 1, 2, 3, 6$. Factores del coef. principal (2): $q = 1, 2$.",
                            step2_title: "Paso 2: Listar Combinaciones",
                            step2_desc: "Toma cada p dividido por cada q.",
                            step2_math: `\\pm \\frac{1, 2, 3, 6}{1} \\implies \\pm 1, \\pm 2, \\pm 3, \\pm 6 \\\\ \\pm \\frac{1, 2, 3, 6}{2} \\implies \\pm \\frac{1}{2}, \\pm \\frac{3}{2} \\quad (1 \\text{ y } 3 \\text{ son duplicados})`,
                            result_title: "Respuesta Final",
                            result: `\\text{Candidatos: } \\pm 1, \\pm 2, \\pm 3, \\pm 6, \\pm \\frac{1}{2}, \\pm \\frac{3}{2}`
                        },
                        ex2: {
                            title: "2. Resolviendo con el Teorema del Factor",
                            problem: "¿Es $(x-2)$ un factor de $P(x) = x^3 - 4x^2 + 3x + 2$?",
                            step1_title: "Paso 1: Aplicar Teorema",
                            step1_desc: "Si $(x-2)$ es un factor, entonces $P(2)$ debe ser igual a 0.",
                            step2_title: "Paso 2: Evaluar P(2)",
                            step2_math: `P(2) = (2)^3 - 4(2)^2 + 3(2) + 2 \\\\ = 8 - 16 + 6 + 2 \\\\ = 0`,
                            step3_title: "Paso 3: Conclusión",
                            step3_desc: "Dado que el resto es 0, es un factor.",
                            result_title: "Respuesta Final",
                            result: "Sí, $(x-2)$ es un factor."
                        },
                        ex3: {
                            title: "3. Analizando Multiplicidad desde Forma Factorizada",
                            problem: "Describe el comportamiento del gráfico en las intersecciones:",
                            problem_math: `P(x) = -2(x - 3)^2 (x + 1)^3`,
                            step1_title: "Paso 1: Identificar Raíces",
                            step1_desc: "Las raíces están en $x = 3$ y $x = -1$.",
                            step2_title: "Paso 2: Verificar Multiplicidad",
                            step2_math: `\\text{En } x=3: \\text{ Potencia es 2 (Par)} \\\\ \\text{En } x=-1: \\text{ Potencia es 3 (Impar)}`,
                            step3_title: "Paso 3: Determinar Comportamiento",
                            result_title: "Respuesta Final",
                            result: "En $x=3$, el gráfico toca/rebota. En $x=-1$, el gráfico cruza el eje."
                        }
                    }
                }
            }
        },
        polynomial_equations: {
            title: "Ecuaciones Polinómicas",
            description: "Encontrando los valores de x que hacen verdadera la ecuación: desde simples aislamientos lineales hasta la resolución de problemas complejos de grado superior.",
            lessons: {
                lesson5_title: "Estrategias de Resolución y Aplicaciones",
                lesson5: {
                    section1: {
                        title1: "Ecuaciones Lineales (Grado 1)",
                        def1_1: "La forma más simple de una ecuación polinómica.",

                        // Plot: Visualizando Resolución de Ecuaciones
                        plot1_title: "Aislando la Variable",
                        plot1_desc: "Resolviendo $2x - 6 = 0$. Para dejar x sola, debemos mover la constante (-6) y luego dividir por el coeficiente (2).",
                        plot1_type: "linear_solver_visual",
                        plot1_data: {
                            equation: "2x - 6 = 0",
                            step1: "Sumar 6 a ambos lados -> 2x = 6",
                            step2: "Dividir por 2 -> x = 3",
                            root: 3
                        },

                        math1_1: `ax + b = 0 \\implies x = -\\frac{b}{a}`,
                        text1_1: "El objetivo es simplemente aislar la variable usando operaciones inversas (sumar/restar, luego multiplicar/dividir).",

                        // Ejemplo: Lineal
                        ex1_1_title: "Ejemplo (Lineal)",
                        ex1_1_problem: "Resuelve $3x + 7 = 22$.",
                        ex1_1_step1: "Resta 7 de ambos lados: $3x = 15$.",
                        ex1_1_step2: "Divide por 3: $x = 5$.",
                        ex1_1_solution: "Solución: $x = 5$."
                    },
                    section2: {
                        title2: "Ecuaciones Cuadráticas (Grado 2)",
                        def2_1: "Forma Estándar: $ax^2 + bx + c = 0$.",

                        def2_2_title: "Método 1: Factorización (Propiedad del Producto Cero)",
                        text2_1: "Si $(x-r)(x-s) = 0$, entonces $x=r$ o $x=s$. Este es el método más rápido si los números son agradables.",

                        // Ejemplo: Factorización
                        ex2_1_title: "Ejemplo (Factorización)",
                        ex2_1_problem: "Resuelve $x^2 - 5x + 6 = 0$.",
                        ex2_1_step1: "Encuentra números que multipliquen a 6 y sumen -5: (-2, -3).",
                        ex2_1_step2: "Factoriza: $(x - 2)(x - 3) = 0$.",
                        ex2_1_solution: "Raíces: $x = 2, x = 3$.",

                        def2_3_title: "Método 2: La Fórmula Cuadrática",
                        text2_2: "Se usa cuando la factorización es difícil o imposible. Funciona para *toda* ecuación cuadrática.",
                        math2_1: `x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}`,

                        // Ejemplo: Fórmula Cuadrática
                        ex2_2_title: "Ejemplo (Fórmula Cuadrática)",
                        ex2_2_problem: "Resuelve $2x^2 + 5x - 3 = 0$.",
                        ex2_2_step1: "Identifica $a=2, b=5, c=-3$.",
                        ex2_2_step2: "Discriminante: $5^2 - 4(2)(-3) = 25 + 24 = 49$.",
                        ex2_2_step3: "Fórmula: $\\frac{-5 \\pm 7}{4}$.",
                        ex2_2_solution: "Raíces: $x = \\frac{1}{2}, x = -3$.",

                        def2_4_title: "El Discriminante ($\\Delta$)",
                        text2_3: "El valor dentro de la raíz cuadrada ($b^2 - 4ac$) nos dice sobre las soluciones:",

                        // Plot: Casos del Discriminante
                        plot2_title: "El Discriminante y las Raíces",
                        plot2_desc: "Azul (Pos): 2 Raíces. Verde (Cero): 1 Raíz. Rojo (Neg): Sin Raíces Reales.",
                        plot2_type: "multi_function",
                        plot2_domain: [-4, 4],
                        plot2_functions: [
                            { expression: "x^2 - 4", color: "blue", label: "D > 0 (2 Reales)" },
                            { expression: "x^2", color: "green", label: "D = 0 (1 Real)" },
                            { expression: "x^2 + 2", color: "red", label: "D < 0 (0 Reales)" }
                        ],

                        list2_1: "$\\Delta > 0$: Dos soluciones reales distintas (Cruza el eje x dos veces).",
                        list2_2: "$\\Delta = 0$: Una solución real repetida (Toca el eje x una vez).",
                        list2_3: "$\\Delta < 0$: Dos soluciones complejas (imaginarias) (Nunca toca el eje x)."
                    },
                    section3: {
                        title3: "Ecuaciones Cúbicas y de Grado Superior",
                        def3_1: "Estrategia: Reducir el Grado.",

                        step3_1: "1. ¿Hay un MCD? Factorízalo.",
                        step3_2: "2. ¿Puedes usar Agrupación? (Común para cúbicas de 4 términos).",
                        step3_3: "3. Si no, usa el Teorema de la Raíz Racional y la División Sintética para dividir el polinomio a una Cuadrática.",

                        text3_1: "Una vez que alcances un cociente Cuadrático, resuélvelo usando la Fórmula Cuadrática.",

                        // Ejemplo: Resolviendo una Cúbica
                        ex3_1_title: "Ejemplo (Resolviendo Grado Superior)",
                        ex3_1_problem: "Resuelve $x^3 - 2x^2 - 5x + 6 = 0$.",
                        ex3_1_step1: "Prueba raíces racionales. Prueba $x=1$: $1 - 2 - 5 + 6 = 0$. ¡Funciona!",
                        ex3_1_step2: "División Sintética por 1: Coeficientes [1, -2, -5, 6] $\\to$ Resto 0.",
                        ex3_1_step3: "Polinomio Deprimido: $x^2 - x - 6 = 0$.",
                        ex3_1_step4: "Resuelve Cuadrática: Factoriza $(x-3)(x+2) = 0$.",
                        ex3_1_solution: "Raíces: $x = 1, x = 3, x = -2$."
                    },
                    section4: {
                        title4: "Problemas Verbales y Modelado",
                        def4_1: "Traduciendo Español a Matemáticas.",

                        // Plot: Movimiento de Proyectil
                        plot4_title: "Movimiento de Proyectil",
                        plot4_desc: "La trayectoria de un objeto lanzado al aire sigue una curva parabólica ($h(t) = -16t^2 + vt + h$). La altura máxima es el vértice; golpear el suelo es la raíz.",
                        plot4_type: "projectile_motion_visual",
                        plot4_data: {
                            function: "-16*t^2 + 64*t",
                            domain: [0, 4],
                            points: [
                                { x: 2, y: 64, label: "Altura Máx" },
                                { x: 4, y: 0, label: "Suelo" }
                            ]
                        },

                        list4_1: "Problemas de Área: Largo $\\times$ Ancho ($x(x+5) = Área$).",
                        list4_2: "Movimiento de Proyectil: Altura sobre el tiempo ($h(t) = -16t^2 + v_0t + h_0$).",
                        list4_3: "Volumen: Volumen de una caja ($V = l \\cdot w \\cdot h$).",

                        // Ejemplo: Problema de Área
                        ex4_1_title: "Ejemplo (Geometría)",
                        ex4_1_problem: "El largo de un rectángulo es 3 más que su ancho. El área es 40. Encuentra las dimensiones.",
                        ex4_1_step1: "Sea $w = x$. Entonces $l = x+3$.",
                        ex4_1_step2: "Ecuación: $x(x+3) = 40 \\implies x^2 + 3x - 40 = 0$.",
                        ex4_1_step3: "Factoriza: $(x+8)(x-5) = 0$.",
                        ex4_1_solution: "x no puede ser una longitud negativa (-8). Así que Ancho = 5, Largo = 8."
                    },
                    example_section: {
                        title_ex: "Ejemplos con Soluciones Paso a Paso",
                        ex1: {
                            title: "1. Fórmula Cuadrática",
                            problem: "Resuelve para x (respuestas exactas):",
                            problem_math: `3x^2 - 5x - 7 = 0`,
                            step1_title: "Paso 1: Identificar Coeficientes",
                            step1_desc: "$a = 3, \\; b = -5, \\; c = -7$.",
                            step2_title: "Paso 2: Sustituir en la Fórmula",
                            step2_math: `x = \\frac{-(-5) \\pm \\sqrt{(-5)^2 - 4(3)(-7)}}{2(3)}`,
                            step3_title: "Paso 3: Simplificar",
                            step3_math: `x = \\frac{5 \\pm \\sqrt{25 + 84}}{6} = \\frac{5 \\pm \\sqrt{109}}{6}`,
                            result_title: "Respuesta Final",
                            result: "Las dos raíces son $\\frac{5 + \\sqrt{109}}{6}$ y $\\frac{5 - \\sqrt{109}}{6}$."
                        },
                        ex2: {
                            title: "2. Resolviendo una Cúbica por Agrupación",
                            problem: "Encuentra todas las raíces:",
                            problem_math: `x^3 - 2x^2 - 9x + 18 = 0`,
                            step1_title: "Paso 1: Agrupar Términos",
                            step1_desc: "Agrupa los dos primeros y los dos últimos.",
                            step1_math: `(x^3 - 2x^2) - (9x - 18) = 0`,
                            step2_title: "Paso 2: Factorizar MCDs",
                            step2_math: `x^2(x - 2) - 9(x - 2) = 0`,
                            step3_title: "Paso 3: Extraer Binomio Común",
                            step3_math: `(x^2 - 9)(x - 2) = 0`,
                            step4_title: "Paso 4: Resolver Factores",
                            step4_desc: "$x^2 - 9$ es una diferencia de cuadrados $(x-3)(x+3)$.",
                            result_title: "Respuesta Final",
                            result: `x = 2, \\; x = 3, \\; x = -3`
                        },
                        ex3: {
                            title: "3. Problema Verbal de Optimización",
                            problem: "Un jardín rectangular tiene un área de 40 m². El largo es 3m más que el ancho. Encuentra las dimensiones.",
                            problem_math: `\\text{Área} = 40, \\quad L = W + 3`,
                            step1_title: "Paso 1: Establecer Ecuación",
                            step1_math: `W(W + 3) = 40 \\implies W^2 + 3W - 40 = 0`,
                            step2_title: "Paso 2: Resolver para W",
                            step2_desc: "Factoriza la cuadrática. Factores de -40 que suman 3 son +8 y -5.",
                            step2_math: `(W + 8)(W - 5) = 0`,
                            step3_title: "Paso 3: Descartar Soluciones Inválidas",
                            step3_desc: "$W = -8$ o $W = 5$. El ancho no puede ser negativo, así que $W = 5$.",
                            result_title: "Respuesta Final",
                            result: "Ancho = 5m, Largo = 8m."
                        }
                    }
                }
            }
        },
        real_world_applications: {
            title: "Aplicaciones en el Mundo Real",
            description: "Viendo polinomios en acción: modelando el espacio físico, analizando el movimiento, optimizando ganancias comerciales y ajustando tendencias de datos.",
            lessons: {
                lesson6_title: "Modelado y Resolución de Problemas",
                lesson6: {
                    section1: {
                        title1: "Área y Volumen (Geometría)",
                        def1_1: "Los polinomios describen las dimensiones de formas geométricas cuando hay variables involucradas.",
                        text1_1: "Escenario Común: Crear una caja a partir de una hoja plana cortando esquinas de tamaño 'x'.",
                        math1_1: `V(x) = x(L - 2x)(W - 2x)`,

                        // Plot: Diagrama Problema de Caja
                        plot1_title: "Visualizando el Corte",
                        plot1_desc: "Una hoja plana de cartón con esquinas cortadas. Doblar las solapas crea una caja 3D.",
                        plot1_type: "box_cut_visual",
                        plot1_data: {
                            sheet_width: 12,
                            sheet_height: 12,
                            cut_size: "x",
                            folded_dim: "(12-2x) by (12-2x) by x"
                        },
                        caption: "¡Cortar esquinas → Doblar → Caja!",
                        text1_2: "Aquí, $V(x)$ se convierte en un polinomio cúbico (grado 3). Encontrar el volumen máximo requiere encontrar el vértice de esta curva polinómica."
                    },
                    section2: {
                        title2: "Problemas de Movimiento (Física)",
                        def2_1: "Movimiento de Proyectil: La altura de un objeto lanzado al aire es modelada por un polinomio cuadrático debido a la gravedad.",
                        math2_1: `h(t) = -16t^2 + v_0t + h_0 \\quad (\\text{Unidades imperiales})`,
                        math2_2: `h(t) = -4.9t^2 + v_0t + h_0 \\quad (\\text{Unidades métricas})`,
                        list2_1: "$t$: Tiempo en segundos.",
                        list2_2: "$v_0$: Velocidad inicial.",
                        list2_3: "$h_0$: Altura inicial.",

                        // Plot: Trayectoria de Proyectil
                        plot2_title: "Trayectoria Parabólica",
                        plot2_desc: "Altura sobre el tiempo. El vértice es la altura máxima; la intersección positiva con x es cuando golpea el suelo.",
                        plot2_type: "projectile_motion_visual",
                        plot2_data: {
                            function: "-16*t^2 + 64*t + 5",
                            domain: [0, 4.1],
                            points: [
                                { x: 0, y: 5, label: "Inicio (h0)" },
                                { x: 2, y: 69, label: "Altura Máx" },
                                { x: 4.08, y: 0, label: "Impacto" }
                            ]
                        },
                        max_height: "Altura Máx (Vértice)",
                        impact: "Impacto",
                        gravity: "gravedad",
                        text2_1: "Resolver $h(t) = 0$ te dice cuándo el objeto golpea el suelo."
                    },
                    section3: {
                        title3: "Aplicaciones Comerciales (Economía)",
                        def3_1: "Los polinomios modelan la salud financiera.",
                        math3_1: `P(x) = R(x) - C(x)`,
                        list3_1: "Ingresos $R(x)$: Precio $\\times$ Cantidad vendida.",
                        list3_2: "Costo $C(x)$: Costos fijos + Costos variables.",
                        list3_3: "Beneficio $P(x)$: La diferencia entre Ingresos y Costo.",

                        // Plot: Análisis de Beneficios
                        plot3_title: "Visualizando Beneficios",
                        plot3_desc: "La región verde es Beneficio (donde Ingresos > Costo). El pico de la curva de Beneficio es el Beneficio Máximo. Los puntos donde Ingresos igualan Costo son puntos de Equilibrio.",
                        plot3_type: "profit_loss_visual",
                        plot3_data: {
                            revenue: "-0.5*x^2 + 50*x", // Ingreso Parabólico
                            cost: "10*x + 200",       // Costo Lineal
                            profit: "-0.5*x^2 + 40*x - 200", // P(x)
                            domain: [0, 100],
                            break_even_points: [5.36, 74.64] // Raíces de P(x)
                        },
                        revenue: "Ingresos",
                        cost: "Costo",
                        profit: "Beneficio",
                        break_even: "Punto de Equilibrio",
                        text3_1: "Puntos de Equilibrio: Las raíces de $P(x)$ (donde Beneficio = 0).",
                        text3_2: "Para maximizar el beneficio, encontramos el vértice de la parábola de Beneficio (para modelos cuadráticos).",

                        // Ejemplo: Max Beneficio
                        ex3_1_title: "Ejemplo (Maximizando Beneficio)",
                        ex3_1_problem: "Ingresos es $R(x) = 50x - 0.5x^2$ y Costo es $C(x) = 10x + 200$. Encuentra el nivel de producción $x$ para beneficio máximo.",
                        ex3_1_step1: "Ecuación de Beneficio: $P(x) = (50x - 0.5x^2) - (10x + 200)$.",
                        ex3_1_step2: "Simplifica: $P(x) = -0.5x^2 + 40x - 200$.",
                        ex3_1_step3: "Encuentra Vértice ($x = -b/2a$): $x = -40 / (2 \\cdot -0.5) = -40 / -1 = 40$.",
                        ex3_1_solution: "Maximiza beneficio produciendo 40 unidades."
                    },
                    section4: {
                        title4: "Ingeniería y Modelado de Datos",
                        def4_1: "Ajuste de Curvas (Regresión): Los ingenieros usan polinomios para aproximar puntos de datos complejos del mundo real.",

                        // Plot: Ajuste de Curvas
                        plot4_title: "Ajustando una Tendencia",
                        plot4_desc: "Los puntos rojos son datos del mundo real (gráfico de dispersión). La línea azul es un modelo polinómico (Regresión) usado para predecir tendencias futuras.",
                        plot4_type: "scatter_plot_fit",
                        plot4_data: {
                            points: [{ x: 1, y: 2 }, { x: 2, y: 5 }, { x: 3, y: 10 }, { x: 4, y: 17 }],
                            model: "x^2 + 1", // Ajusta patrón 1, 4, 9, 16 (+1)
                            prediction_point: { x: 5, y: 26 },
                            label: "Ajuste Cuadrático"
                        },
                        data: "Datos",
                        prediction: "Predicción",
                        text4_1: "Un conjunto de puntos de datos dispersos a menudo se puede modelar mediante una 'Línea de Mejor Ajuste' (Lineal) o una curva (Cuadrática/Cúbica) para predecir resultados futuros.",
                        warning4_1: "Sobreajuste: Usar un polinomio con un grado demasiado alto podría ajustarse al ruido en lugar de a la tendencia.",

                        // Ejemplo: Modelado
                        ex4_1_title: "Ejemplo (Reconocimiento de Patrones)",
                        ex4_1_problem: "Encuentra un modelo polinómico para la secuencia: 2, 5, 10, 17...",
                        ex4_1_step1: "Primeras Diferencias: $5-2=3, 10-5=5, 17-10=7$ (No lineal).",
                        ex4_1_step2: "Segundas Diferencias: $5-3=2, 7-5=2$ (Constante).",
                        ex4_1_step3: "Segunda diferencia constante implica un modelo Cuadrático ($n^2 + 1$).",
                        ex4_1_solution: "Modelo: $y = x^2 + 1$."
                    },
                    example_section: {
                        title_ex: "Ejemplos con Soluciones Paso a Paso",
                        ex1: {
                            title: "1. Movimiento de Proyectil",
                            problem: "Un cohete se lanza desde el suelo ($h_0=0$) con velocidad inicial $v_0 = 98$ m/s. ¿Cuándo regresa a la tierra?",
                            problem_math: `h(t) = -4.9t^2 + 98t + 0`,
                            step1_title: "Paso 1: Establecer Altura a Cero",
                            step1_desc: "Queremos encontrar $t$ cuando $h(t) = 0$.",
                            step1_math: `-4.9t^2 + 98t = 0`,
                            step2_title: "Paso 2: Factorizar",
                            step2_desc: "Factoriza $t$ (o $-4.9t$).",
                            step2_math: `t(-4.9t + 98) = 0`,
                            step3_title: "Paso 3: Resolver para t",
                            step3_desc: "Dos soluciones: $t = 0$ (lanzamiento) y $-4.9t + 98 = 0$.",
                            step3_math: `4.9t = 98 \\implies t = 20`,
                            result_title: "Respuesta Final",
                            result: "El cohete golpea el suelo después de 20 segundos."
                        },
                        ex2: {
                            title: "2. Maximizando Beneficio",
                            problem: "El beneficio de una empresa es modelado por $P(x) = -x^2 + 100x - 900$. ¿Cuántas unidades ($x$) deben venderse para maximizar el beneficio?",
                            step1_title: "Paso 1: Identificar Tipo de Función",
                            step1_desc: "Esta es una parábola que se abre hacia abajo (Cuadrática). El máximo está en el Vértice.",
                            step2_title: "Paso 2: Fórmula del Vértice",
                            step2_math: `x = \\frac{-b}{2a}`,
                            step3_title: "Paso 3: Sustituir Coeficientes",
                            step3_desc: "$a = -1, b = 100$.",
                            step3_math: `x = \\frac{-100}{2(-1)} = \\frac{-100}{-2} = 50`,
                            result_title: "Respuesta Final",
                            result: "Vender 50 unidades produce el beneficio máximo."
                        },
                        ex3: {
                            title: "3. Construcción de Volumen",
                            problem: "Una caja se hace de una hoja de 10x8 cortando cuadrados de lado $x$. Expresa el polinomio de Volumen.",
                            problem_math: `V = L \\cdot W \\cdot H`,
                            step1_title: "Paso 1: Definir Dimensiones",
                            step1_desc: "Altura = $x$. Largo = $10 - 2x$. Ancho = $8 - 2x$.",
                            step2_title: "Paso 2: Establecer Ecuación",
                            step2_math: `V(x) = x(10 - 2x)(8 - 2x)`,
                            step3_title: "Paso 3: Expandir (Forma Estándar)",
                            step3_desc: "Multiplica binomios primero: $(80 - 20x - 16x + 4x^2)$. Luego multiplica por $x$.",
                            result_title: "Respuesta Final",
                            result: `V(x) = 4x^3 - 36x^2 + 80x`
                        }
                    }
                }
            }
        },
    },
    fr: {
        polynomial_basics: {
            title: "Bases des Polynômes",
            description: "Les éléments constitutifs de l'algèbre : comprendre la structure, la terminologie et la classification des polynômes.",
            lessons: {
                lesson1_title: "Structure et Terminologie",
                lesson1: {
                    section1: {
                        title1: "Définition et Terminologie",
                        def1_1: "Un polynôme est une expression mathématique composée de variables (aussi appelées indéterminées) et de coefficients, qui implique uniquement les opérations d'addition, de soustraction, de multiplication et d'exposants entiers non négatifs de variables.",
                        math1_1: `P(x) = a_n x^n + a_{n-1} x^{n-1} + \\dots + a_1 x + a_0`,

                        // Plot : Anatomie d'un Polynôme
                        plot1_title: "Anatomie d'un Polynôme",
                        plot1_desc: "Décomposition visuelle du terme $3x^2$.",
                        plot1_type: "polynomial_anatomy",
                        plot1_data: {
                            expression: "3x^2",
                            labels: [
                                { text: "Coefficient", target: "3", color: "blue" },
                                { text: "Variable", target: "x", color: "black" },
                                { text: "Exposant", target: "2", color: "red" },
                                { text: "Degré", target: "2", color: "red" }
                            ]
                        },
                        text1_1: "Vocabulaire Clé :",
                        list1_1: "Terme : Chaque partie du polynôme séparée par des signes + ou -.",
                        list1_2: "Coefficient : Le facteur numérique d'un terme (ex. dans $5x^2$, 5 est le coefficient).",
                        list1_3: "Constante : Un terme sans variable (degré 0).",
                        warning1: "Les expressions avec des exposants négatifs ($x^{-1}$) ou fractionnaires ($\\sqrt{x}$) ne sont PAS des polynômes."
                    },
                    section2: {
                        title2: "Degré et Coefficient Dominant",
                        def2_1: "Le Degré d'un polynôme est l'exposant le plus élevé de la variable présente dans l'expression.",
                        def2_2: "Le Coefficient Dominant (CD) est le coefficient du terme ayant le degré le plus élevé.",

                        // Exemple : Degré et CD
                        ex2_1_title: "Vérification Rapide",
                        ex2_1_problem: "Analysez le polynôme $P(x) = 7x^3 - 2x + 5$.",
                        ex2_1_solution: "La puissance la plus élevée est 3, donc **Degré = 3**. Le coefficient de $x^3$ est 7, donc **Coefficient Dominant = 7**.",

                        text2_1: "Le degré détermine le comportement final du graphique (s'il monte ou descend à l'infini)."
                    },
                    section3: {
                        title3: "Forme Standard",
                        def3_1: "Un polynôme est sous Forme Standard lorsque ses termes sont ordonnés du degré le plus élevé au degré le plus bas.",

                        // Exemple : Réordonner en Forme Standard
                        ex3_1_title: "Exemple",
                        ex3_1_problem: "Réécrivez $f(x) = 4 + x^3 - 2x$ sous forme standard.",
                        ex3_1_step1: "Identifier les degrés : $4$ (deg 0), $x^3$ (deg 3), $-2x$ (deg 1).",
                        ex3_1_solution: "Ordonner par degré (3, 1, 0) : $f(x) = x^3 - 2x + 4$.",

                        math3_1: `\\text{Exemple : } f(x) = -2x^3 + 4x^2 - x + 7`,
                        text3_1: "C'est une pratique standard de toujours réécrire les polynômes de cette manière avant de les analyser."
                    },
                    section4: {
                        title4: "Types de Polynômes",
                        def4_1_title: "Classification par Nombre de Termes",
                        list4_1: "Monôme : 1 terme (ex. $3x^2$)",
                        list4_2: "Binôme : 2 termes (ex. $x + 5$)",
                        list4_3: "Trinôme : 3 termes (ex. $x^2 + 3x - 4$)",

                        def4_2_title: "Classification par Degré",
                        list4_4: "Linéaire : Degré 1 ($mx + b$)",
                        list4_5: "Quadratique : Degré 2 ($ax^2 + bx + c$)",
                        list4_6: "Cubique : Degré 3",

                        // Plot : Comparaison des Types de Polynômes
                        plot4_title: "Comparaison des Degrés",
                        plot4_desc: "Linéaire est une ligne droite. Quadratique est une parabole en forme de U. Cubique est une courbe en forme de S.",
                        plot4_type: "multi_function",
                        plot4_domain: [-3, 3],
                        plot4_functions: [
                            { expression: "x", color: "blue", label: "Linéaire (x)" },
                            { expression: "x^2", color: "green", label: "Quadratique (x^2)" },
                            { expression: "x^3", color: "red", label: "Cubique (x^3)" }
                        ]
                    },
                    section5: {
                        title5: "Égalité des Polynômes",
                        def5_1: "Deux polynômes sont égaux si et seulement si ils ont le même degré et leurs coefficients correspondants sont identiques.",

                        // Exemple : Résoudre pour des Constantes
                        ex5_1_title: "Exemple (Trouver des Constantes)",
                        ex5_1_problem: "Trouvez A et B si $2x + 5 = Ax + B$.",
                        ex5_1_step1: "Comparer les coefficients de x : $2 = A$.",
                        ex5_1_step2: "Comparer les termes constants : $5 = B$.",
                        ex5_1_solution: "Donc, $A=2$ et $B=5$.",

                        math5_1: `Ax^2 + Bx + C = 2x^2 - 5x + 1 \\implies A=2, B=-5, C=1`,
                        text5_1: "Ce principe est souvent utilisé pour résoudre des constantes inconnues."
                    },
                    example_section: {
                        title_ex: "Exemples avec Solutions Étape par Étape",
                        ex1: {
                            title: "1. Forme Standard et Identification",
                            problem: "Réécrivez sous forme standard et identifiez le degré et le coefficient dominant.",
                            problem_math: `P(x) = 4 - 2x + 7x^5 - 3x^2`,
                            step1_title: "Étape 1 : Identifier les Exposants",
                            step1_desc: "Les puissances sont 0 (constante), 1 ($2x$), 5 ($7x^5$) et 2 ($-3x^2$).",
                            step2_title: "Étape 2 : Réordonner",
                            step2_desc: "Placez les termes par ordre décroissant de puissances : 5, puis 2, puis 1, puis 0.",
                            step2_math: `P(x) = 7x^5 - 3x^2 - 2x + 4`,
                            step3_title: "Étape 3 : Identifier Degré et CD",
                            step3_desc: "La puissance la plus élevée est 5. Le nombre devant $x^5$ est 7.",
                            result_title: "Réponse Finale",
                            result: "Degré : 5, Coefficient Dominant : 7."
                        },
                        ex2: {
                            title: "2. Validation de Polynômes",
                            problem: "Lequel des éléments suivants sont des polynômes ?",
                            problem_math: `A) \\; 3x^2 + 2x^{-1} \\quad B) \\; 5\\sqrt{x} + 2 \\quad C) \\; \\frac{1}{2}x^3 - \\pi`,
                            step1_title: "Étape 1 : Analyser les Exposants",
                            step1_desc: "Les polynômes doivent avoir des exposants entiers non négatifs (0, 1, 2, ...).",
                            step2_title: "Étape 2 : Vérifier Chaque Cas",
                            step2_math: `A : x^{-1} \\text{ a un exposant négatif. (Pas un polynôme)} \\\\ B : \\sqrt{x} = x^{1/2} \\text{ a une fraction. (Pas un polynôme)} \\\\ C : \\text{Les coefficients peuvent être des fractions (1/2) ou irrationnels (}\\pi\\text{). Les puissances sont des entiers.}`,
                            result_title: "Réponse Finale",
                            result: "Seul C est un polynôme."
                        },
                        ex3: {
                            title: "3. Trouver des Coefficients (Égalité)",
                            problem: "Trouvez A et B si l'équation est vraie pour tout x :",
                            problem_math: `2x(x + 3) = Ax^2 + Bx`,
                            step1_title: "Étape 1 : Développer le Côté Gauche",
                            step1_desc: "Distribuez le $2x$.",
                            step1_math: `2x \\cdot x + 2x \\cdot 3 = 2x^2 + 6x`,
                            step2_title: "Étape 2 : Comparer les Coefficients",
                            step2_math: `2x^2 + 6x = Ax^2 + Bx`,
                            step3_title: "Étape 3 : Correspondre les Termes",
                            step3_desc: "Le terme $x^2$ correspond à A. Le terme $x$ correspond à B.",
                            result_title: "Réponse Finale",
                            result: `A = 2, \\quad B = 6`
                        }
                    }
                }
            }
        },
        polynomial_operations: {
            title: "Opérations sur les Polynômes",
            description: "Maîtriser l'arithmétique des polynômes : addition, soustraction, multiplication et deux méthodes puissantes pour la division.",
            lessons: {
                lesson2_title: "Arithmétique et Algorithmes de Division",
                lesson2: {
                    section1: {
                        title1: "Addition et Soustraction",
                        def1_1: "La Règle d'Or : Vous ne pouvez additionner ou soustraire que des Termes Semblables.",
                        def1_2: "Les Termes Semblables sont des termes qui ont exactement la même variable élevée à la même puissance exacte.",

                        // Plot : Regroupement des Termes Semblables
                        plot1_title: "Visualisation des Termes Semblables",
                        plot1_desc: "Nous regroupons les termes par leurs parties variables. Les termes $x^2$ vont ensemble, les termes $x$ vont ensemble.",
                        plot1_type: "polynomial_grouping",
                        plot1_data: {
                            expression: "(2x^2 + 3x) + (4x^2 - x)",
                            groups: [
                                { terms: ["2x^2", "4x^2"], color: "red", label: "Quadratique" },
                                { terms: ["3x", "-x"], color: "blue", label: "Linéaire" }
                            ]
                        },

                        math1_1: `3x^2 + 5x^2 = 8x^2 \\quad \\text{(Correct)}`,
                        math1_2: `3x^2 + 5x = \\text{Ne peut pas combiner}`,
                        text1_1: "Lors de la soustraction de polynômes, n'oubliez pas de distribuer le signe négatif à chaque terme du second polynôme.",

                        // Exemple : Soustraction
                        ex1_1_title: "Exemple (Soustraction)",
                        ex1_1_problem: "Simplifiez $(5x^2 + 2x - 1) - (3x^2 - 4x + 2)$.",
                        ex1_1_step1: "Distribuer le négatif : $5x^2 + 2x - 1 - 3x^2 + 4x - 2$.",
                        ex1_1_step2: "Regrouper les termes semblables : $(5x^2 - 3x^2) + (2x + 4x) + (-1 - 2)$.",
                        ex1_1_solution: "Résultat : $2x^2 + 6x - 3$."
                    },
                    section2: {
                        title2: "Multiplication",
                        def2_1: "La multiplication repose sur la Propriété Distributive et la Règle des Exposants : $x^a \\cdot x^b = x^{a+b}$.",
                        list2_1: "Monôme × Polynôme : Distribuez le terme unique à tous les termes à l'intérieur.",
                        list2_2: "Binôme × Binôme : Utilisez la méthode FOIL (Premier, Extérieur, Intérieur, Dernier).",
                        list2_3: "Multiplication Générale : Multipliez chaque terme du premier polynôme par chaque terme du second.",

                        // Plot : Méthode de la Boîte (Modèle de Surface)
                        plot2_title: "La Méthode de la Boîte (Modèle de Surface)",
                        plot2_desc: "Visualisation de $(x+2)(x+3)$. L'aire des quatre rectangles intérieurs totalise le produit.",
                        plot2_type: "polynomial_box_method",
                        plot2_data: {
                            top_labels: ["x", "+3"],
                            side_labels: ["x", "+2"],
                            cells: [
                                { val: "x^2", color: "light-blue" }, { val: "3x", color: "light-green" },
                                { val: "2x", color: "light-green" }, { val: "6", color: "light-yellow" }
                            ]
                        },

                        // Exemple : Multiplication de Binômes
                        ex2_1_title: "Exemple (FOIL)",
                        ex2_1_problem: "Multipliez $(2x + 1)(x - 5)$.",
                        ex2_1_step1: "Premier : $2x \\cdot x = 2x^2$. Extérieur : $2x \\cdot -5 = -10x$.",
                        ex2_1_step2: "Intérieur : $1 \\cdot x = 1x$. Dernier : $1 \\cdot -5 = -5$.",
                        ex2_1_step3: "Combiner les termes semblables (-10x + 1x).",
                        ex2_1_solution: "Résultat : $2x^2 - 9x - 5$."
                    },
                    section3: {
                        title3: "Division Longue de Polynômes",
                        def3_1: "Utilisé pour diviser un polynôme par un autre polynôme de n'importe quel degré. Il suit le même algorithme que la division longue arithmétique.",

                        step3_1: "1. Diviser : Divisez le terme dominant du dividende par le terme dominant du diviseur.",
                        step3_2: "2. Multiplier : Multipliez le résultat par le diviseur entier.",
                        step3_3: "3. Soustraire : Soustrayez ce résultat de l'original (inversez les signes !).",
                        step3_4: "4. Abaisser : Abaissez le terme suivant et répétez.",

                        math3_1: `\\frac{P(x)}{D(x)} = Q(x) + \\frac{R(x)}{D(x)}`,
                        text3_1: "Où Q est le Quotient, R est le Reste, et D est le Diviseur.",

                        // Exemple : Division Longue
                        ex3_1_title: "Exemple (Division Longue)",
                        ex3_1_problem: "Divisez $2x^2 + 7x + 6$ par $x + 2$.",
                        ex3_1_step1: "Diviser : $2x^2 \\div x = 2x$. Écrivez $2x$ au-dessus.",
                        ex3_1_step2: "Multiplier : $2x(x + 2) = 2x^2 + 4x$.",
                        ex3_1_step3: "Soustraire : $(2x^2 + 7x) - (2x^2 + 4x) = 3x$. Abaissez le $+6$.",
                        ex3_1_step4: "Répéter : $3x \\div x = 3$. Multipliez $3(x+2) = 3x + 6$. Soustrayez pour obtenir $0$.",
                        ex3_1_solution: "Le quotient est $2x + 3$ avec un Reste de $0$."
                    },
                    section4: {
                        title4: "Division Synthétique",
                        def4_1: "Une méthode raccourcie pour la division qui n'utilise que les coefficients. Elle est plus rapide mais a une exigence stricte.",
                        warning4_1: "Contrainte : La Division Synthétique ne fonctionne que lors de la division par un binôme linéaire de la forme $(x - c)$.",

                        step4_1: "1. Configuration : Écrivez 'c' à l'extérieur (si division par $x-3$, utilisez 3). Écrivez les coefficients à l'intérieur.",
                        step4_2: "2. Abaisser : Abaissez le premier coefficient directement.",
                        step4_3: "3. Multiplier et Additionner : Multipliez le nombre du bas par 'c', placez-le dans la colonne suivante, additionnez vers le bas.",
                        text4_2: "Les nombres sur la ligne du bas représentent les coefficients du quotient (qui est toujours un degré inférieur).",

                        // Exemple : Division Synthétique
                        ex4_1_title: "Exemple (Synthétique)",
                        ex4_1_problem: "Divisez $x^3 - 4x^2 + 2x - 5$ par $x - 3$.",
                        ex4_1_step1: "Configuration : $c = 3$. Les coefficients sont $[1, -4, 2, -5]$.",
                        ex4_1_step2: "Abaisser 1. Multipliez $3(1)=3$. Ajoutez à -4 : $-4+3 = -1$.",
                        ex4_1_step3: "Multipliez $3(-1)=-3$. Ajoutez à 2 : $2-3 = -1$.",
                        ex4_1_step4: "Multipliez $3(-1)=-3$. Ajoutez à -5 : $-5-3 = -8$ (Reste).",
                        ex4_1_solution: "Quotient : $x^2 - x - 1$, Reste : $-8$."
                    },
                    example_section: {
                        title_ex: "Exemples avec Solutions Étape par Étape",
                        ex1: {
                            title: "1. Multiplication de Polynômes",
                            problem: "Développez et simplifiez :",
                            problem_math: `(2x - 3)(x^2 + 4x - 1)`,
                            step1_title: "Étape 1 : Distribuer 2x",
                            step1_math: `2x(x^2) + 2x(4x) + 2x(-1) = 2x^3 + 8x^2 - 2x`,
                            step2_title: "Étape 2 : Distribuer -3",
                            step2_desc: "Faites attention aux signes.",
                            step2_math: `-3(x^2) - 3(4x) - 3(-1) = -3x^2 - 12x + 3`,
                            step3_title: "Étape 3 : Combiner les Termes Semblables",
                            step3_desc: "Combinez les termes $x^2$ et les termes $x$.",
                            step3_math: `2x^3 + (8x^2 - 3x^2) + (-2x - 12x) + 3`,
                            result_title: "Réponse Finale",
                            result: `2x^3 + 5x^2 - 14x + 3`
                        },
                        ex2: {
                            title: "2. Division Longue de Polynômes",
                            problem: "Divisez en utilisant la Division Longue :",
                            problem_math: `(x^2 - 5x + 6) \\div (x - 2)`,
                            step1_title: "Étape 1 : Diviser les Termes Dominants",
                            step1_desc: "Combien de fois $x$ va-t-il dans $x^2$ ? Réponse : $x$.",
                            step2_title: "Étape 2 : Multiplier et Soustraire",
                            step2_desc: "Multipliez $x(x-2) = x^2 - 2x$. Soustrayez cela de la ligne supérieure : $(-5x) - (-2x) = -3x$.",
                            step3_title: "Étape 3 : Abaisser et Répéter",
                            step3_desc: "Abaissez $+6$. Maintenant divisez $-3x$ par $x$. Réponse : $-3$.",
                            step3_math: `-3(x - 2) = -3x + 6`,
                            step4_title: "Étape 4 : Reste",
                            step4_desc: "La soustraction donne 0.",
                            result_title: "Réponse Finale",
                            result: `x - 3`
                        },
                        ex3: {
                            title: "3. Division Synthétique",
                            problem: "Divisez en utilisant la Division Synthétique :",
                            problem_math: `(3x^3 - 2x^2 + x - 5) \\div (x - 2)`,
                            step1_title: "Étape 1 : Configuration",
                            step1_desc: "Le diviseur est $x-2$, donc utilisez $c = 2$. Les coefficients sont [3, -2, 1, -5].",
                            step2_title: "Étape 2 : L'Algorithme",
                            step2_math: `\\text{Bas : } 3 \\\\ \\text{Mult : } 2 \\cdot 3 = 6 \\rightarrow \\text{Ajouter à -2} = 4 \\\\ \\text{Mult : } 2 \\cdot 4 = 8 \\rightarrow \\text{Ajouter à 1} = 9 \\\\ \\text{Mult : } 2 \\cdot 9 = 18 \\rightarrow \\text{Ajouter à -5} = 13`,
                            step3_title: "Étape 3 : Interpréter le Résultat",
                            step3_desc: "La ligne du bas est 3, 4, 9 avec reste 13. Le degré chute de 3 à 2.",
                            result_title: "Réponse Finale",
                            result: `3x^2 + 4x + 9 + \\frac{13}{x-2}`
                        }
                    }
                }
            }
        },
        factorization_techniques: {
            title: "Techniques de Factorisation",
            description: "L'art de décomposer les polynômes : convertir des expressions complexes en produits de facteurs plus simples.",
            lessons: {
                lesson3_title: "Méthodes Fondamentales de Factorisation",
                lesson3: {
                    section1: {
                        title1: "Plus Grand Commun Diviseur (PGCD)",
                        def1_1: "La première règle de la factorisation : Cherchez toujours un Facteur Commun en premier.",

                        // Plot : Visualisation PGCD
                        plot1_title: "Visualisation du PGCD",
                        plot1_desc: "Nous 'extrayons' le terme commun $2x$ des deux parties de l'expression.",
                        plot1_type: "polynomial_gcf_visual",
                        plot1_data: {
                            original: "2x^2 + 6x",
                            gcf: "2x",
                            remainder: "(x + 3)",
                            color_gcf: "blue",
                            color_rem: "black"
                        },

                        text1_1: "Identifiez le plus grand nombre et la plus haute puissance de la variable qui divisent exactement chaque terme.",
                        math1_1: `ab + ac = a(b + c)`,
                        warning1: "Si le terme dominant est négatif, il est généralement préférable de factoriser également le signe moins.",

                        // Exemple : PGCD
                        ex1_1_title: "Exemple (PGCD)",
                        ex1_1_problem: "Factorisez $12x^3 - 8x^2$.",
                        ex1_1_step1: "Coefficients : Le PGCD de 12 et 8 est 4.",
                        ex1_1_step2: "Variables : Le PGCD de $x^3$ et $x^2$ est $x^2$.",
                        ex1_1_step3: "Divisez chaque terme par $4x^2$.",
                        ex1_1_solution: "Résultat : $4x^2(3x - 2)$."
                    },
                    section2: {
                        title2: "Modèles Spéciaux",
                        def2_1_title: "Différence de Carrés",
                        def2_1: "Deux carrés parfaits séparés par un signe moins.",
                        math2_1: `a^2 - b^2 = (a - b)(a + b)`,

                        // Plot : Géométrie Différence de Carrés
                        plot2_title: "Preuve Géométrique",
                        plot2_desc: "L'aire d'un grand carré ($a^2$) moins un petit carré ($b^2$) peut être réorganisée en un rectangle de dimensions $(a-b)$ et $(a+b)$.",
                        plot2_type: "diff_squares_geometry",
                        plot2_data: { a: 5, b: 2 },

                        // Exemple : Différence de Carrés
                        ex2_1_title: "Exemple (Diff de Carrés)",
                        ex2_1_problem: "Factorisez $9x^2 - 16$.",
                        ex2_1_step1: "Identifier les carrés : $9x^2 = (3x)^2$ donc $a=3x$. $16 = 4^2$ donc $b=4$.",
                        ex2_1_solution: "Appliquer la formule : $(3x - 4)(3x + 4)$.",

                        text2_1: "Note : Une 'Somme de Carrés' ($a^2 + b^2$) ne peut pas être factorisée dans les réels.",

                        def2_2_title: "Trinômes Carrés Parfaits",
                        def2_2: "Résultat de la mise au carré d'un binôme.",
                        math2_2: `a^2 + 2ab + b^2 = (a + b)^2 \\quad \\text{et} \\quad a^2 - 2ab + b^2 = (a - b)^2`
                    },
                    section3: {
                        title3: "Factorisation par Regroupement",
                        def3_1: "Utilisé principalement lorsqu'un polynôme a 4 termes.",

                        // Plot : Visualisation Regroupement
                        plot3_title: "Visualisation du Regroupement",
                        plot3_desc: "Nous divisons les 4 termes en deux paires. Le but est de trouver un facteur binôme commun (la partie entre parenthèses).",
                        plot3_type: "grouping_visual",
                        plot3_data: {
                            expr: "x^3 + 2x^2 + 3x + 6",
                            group1: "x^2(x + 2)",
                            group2: "+ 3(x + 2)",
                            common: "(x + 2)"
                        },
                        plot3_description: "Même aire, forme différente",
                        step3_1: "1. Grouper les termes : Groupez les deux premiers termes et les deux derniers.",
                        step3_2: "2. Factoriser PGCD : Extrayez le PGCD de chaque paire séparément.",
                        step3_3: "3. Binôme Facteur : Si cela est fait correctement, les parenthèses correspondront. Factorisez ce binôme commun.",

                        math3_1: `ax + ay + bx + by = a(x+y) + b(x+y) = (a+b)(x+y)`,

                        // Exemple : Regroupement
                        ex3_1_title: "Exemple (Regroupement)",
                        ex3_1_problem: "Factorisez $2x^3 - 3x^2 + 4x - 6$.",
                        ex3_1_step1: "Grouper : $(2x^3 - 3x^2) + (4x - 6)$.",
                        ex3_1_step2: "Factoriser PGCDs : $x^2(2x - 3) + 2(2x - 3)$.",
                        ex3_1_step3: "Vérifier correspondance : $(2x - 3)$ est dans les deux.",
                        ex3_1_solution: "Résultat : $(x^2 + 2)(2x - 3)$."
                    },
                    section4: {
                        title4: "Techniques Avancées",

                        // --- Cubes ---
                        def4_1_title: "Somme et Différence de Cubes",
                        math4_1: `a^3 - b^3 = (a - b)(a^2 + ab + b^2)`,
                        math4_2: `a^3 + b^3 = (a + b)(a^2 - ab + b^2)`,

                        // Plot : Mnémonique SOAP
                        plot4_title: "La Méthode SOAP",
                        plot4_desc: "Aide visuelle pour le placement des signes dans la factorisation cubique.",
                        plot4_type: "mnemonic_visual",
                        plot4_data: { mnemonic: "SOAP", meaning: ["Same (Même)", "Opposite (Opposé)", "Always (Toujours)", "Positive (Positif)"] },

                        text4_1: "Mnémonique : SOAP (Même signe, Signe Opposé, Toujours Positif).",

                        // Exemple : Différence de Cubes
                        ex4_1_title: "Exemple (Cubes)",
                        ex4_1_problem: "Factorisez $8x^3 - 27$.",
                        ex4_1_step1: "Identifier les cubes : $(2x)^3 - 3^3$. Donc $a=2x, b=3$.",
                        ex4_1_step2: "Appliquer SOAP : $(2x - 3)((2x)^2 + (2x)(3) + 3^2)$.",
                        ex4_1_solution: "Résultat : $(2x - 3)(4x^2 + 6x + 9)$.",

                        // --- Méthode AC ---
                        def4_2_title: "Trinômes Quadratiques (Méthode AC)",
                        text4_2: "Pour $ax^2 + bx + c$, trouvez deux nombres qui multipliés donnent $a \\cdot c$ et additionnés donnent $b$. Divisez le terme du milieu et utilisez le regroupement.",

                        // Exemple : Méthode AC
                        ex4_2_title: "Exemple (Méthode AC)",
                        ex4_2_problem: "Factorisez $3x^2 + 10x + 8$.",
                        ex4_2_step1: "Multiplier $a \\cdot c$ : $3(8) = 24$. Trouvez des facteurs de 24 s'additionnant à 10 : 6 et 4.",
                        ex4_2_step2: "Diviser terme milieu : $3x^2 + 6x + 4x + 8$.",
                        ex4_2_step3: "Grouper : $3x(x + 2) + 4(x + 2)$.",
                        ex4_2_solution: "Résultat : $(3x + 4)(x + 2)$."
                    },
                    example_section: {
                        title_ex: "Exemples avec Solutions Étape par Étape",
                        ex1: {
                            title: "1. PGCD & Différence de Carrés",
                            problem: "Factorisez complètement :",
                            problem_math: `3x^3 - 27x`,
                            step1_title: "Étape 1 : Factoriser le PGCD",
                            step1_desc: "Les deux termes sont divisibles par $3x$.",
                            step1_math: `3x(x^2 - 9)`,
                            step2_title: "Étape 2 : Identifier le Modèle",
                            step2_desc: "À l'intérieur de la parenthèse, $x^2 - 9$ est une Différence de Carrés ($x^2 - 3^2$).",
                            step2_math: `(x - 3)(x + 3)`,
                            result_title: "Réponse Finale",
                            result: `3x(x - 3)(x + 3)`
                        },
                        ex2: {
                            title: "2. Factorisation par Regroupement",
                            problem: "Factorisez le polynôme à quatre termes :",
                            problem_math: `x^3 + 4x^2 + 3x + 12`,
                            step1_title: "Étape 1 : Grouper les Termes",
                            step1_desc: "Groupez $(x^3 + 4x^2)$ et $(3x + 12)$.",
                            step2_title: "Étape 2 : Factoriser le PGCD des Groupes",
                            step2_math: `x^2(x + 4) + 3(x + 4)`,
                            step3_title: "Étape 3 : Factoriser le Binôme Commun",
                            step3_desc: "Le terme $(x+4)$ est commun aux deux parties.",
                            result_title: "Réponse Finale",
                            result: `(x^2 + 3)(x + 4)`
                        },
                        ex3: {
                            title: "3. La Méthode AC (Trinômes)",
                            problem: "Factorisez :",
                            problem_math: `2x^2 + 7x + 3`,
                            step1_title: "Étape 1 : Multiplier A et C",
                            step1_desc: "$A=2, C=3$. Le produit est $6$. Nous avons besoin de facteurs de 6 qui s'additionnent à $B=7$.",
                            step1_math: `\\text{Facteurs : } 6 \\text{ et } 1 \\quad (6 \\cdot 1 = 6, \\; 6+1 = 7)`,
                            step2_title: "Étape 2 : Diviser le Terme du Milieu",
                            step2_math: `2x^2 + 6x + 1x + 3`,
                            step3_title: "Étape 3 : Grouper et Résoudre",
                            step3_desc: "Factorisez par regroupement.",
                            step3_math: `2x(x + 3) + 1(x + 3)`,
                            result_title: "Réponse Finale",
                            result: `(2x + 1)(x + 3)`
                        }
                    }
                }
            }
        },
        roots_zeros: {
            title: "Racines et Zéros",
            description: "Combler l'algèbre et la géométrie : trouver les valeurs exactes où un polynôme est égal à zéro et comprendre le Théorème Fondamental de l'Algèbre.",
            lessons: {
                lesson4_title: "Théorèmes et Stratégies de Résolution",
                lesson4: {
                    section1: {
                        title1: "Le Théorème Fondamental et le Théorème du Facteur",
                        def1_1: "Le Théorème Fondamental de l'Algèbre : Tout polynôme de degré $n$ a exactement $n$ racines complexes (en comptant la multiplicité).",
                        text1_1: "Cela garantit qu'une équation de degré 5 a exactement 5 solutions.",

                        // Plot : Racines vs Facteurs
                        plot1_title: "Connexion : Racines et Facteurs",
                        plot1_desc: "Si le graphique traverse l'axe des x en $c=2$, alors $(x-2)$ est un facteur du polynôme.",
                        plot1_type: "root_factor_visual",
                        plot1_data: {
                            root: 2,
                            factor: "(x - 2)",
                            function: "(x-2)(x+1)(x-4)",
                            domain: [-2, 5]
                        },
                        plot1_description: "- facteur",
                        def1_2: "Le Théorème du Facteur :",
                        math1_1: `P(c) = 0 \\iff (x - c) \\text{ est un facteur de } P(x)`,
                        text1_2: "Ceci fournit un lien direct entre les facteurs algébriques et les abscisses à l'origine géométriques."
                    },
                    section2: {
                        title2: "Théorème de la Racine Rationnelle",
                        def2_1: "Une stratégie pour trouver une liste de racines rationnelles *possibles* lorsque le polynôme a des coefficients entiers.",

                        math2_1: `\\text{Racines Possibles} = \\pm \\frac{\\text{Facteurs du Terme Constant } (p)}{\\text{Facteurs du Coefficient Dominant } (q)}`,

                        step2_1: "1. Listez tous les facteurs du terme constant ($p$).",
                        step2_2: "2. Listez tous les facteurs du coefficient dominant ($q$).",
                        step2_3: "3. Formez toutes les fractions $p/q$ et testez-les en utilisant la division synthétique.",

                        // Exemple : Théorème de la Racine Rationnelle
                        ex2_1_title: "Exemple (Trouver des Candidats)",
                        ex2_1_problem: "Trouvez les racines rationnelles possibles pour $2x^3 + x^2 - 13x + 6$.",
                        ex2_1_step1: "Constant $p = 6$. Facteurs : $\\pm 1, \\pm 2, \\pm 3, \\pm 6$.",
                        ex2_1_step2: "Coef. Dominant $q = 2$. Facteurs : $\\pm 1, \\pm 2$.",
                        ex2_1_step3: "Former les ratios $p/q$ : $\\pm 1, \\pm 2, \\pm 3, \\pm 6, \\pm 1/2, \\pm 3/2$.",
                        ex2_1_solution: "Ce sont les seules racines rationnelles possibles à tester."
                    },
                    section3: {
                        title3: "Multiplicité",
                        def3_1: "La multiplicité fait référence au nombre de fois qu'un facteur spécifique apparaît dans la factorisation du polynôme.",
                        math3_1: `P(x) = (x - 2)^3 (x + 1)^2`,

                        // Plot : Comportement de Multiplicité
                        plot3_title: "Visualisation de la Multiplicité",
                        plot3_desc: "À x=1 (puissance impaire ^1), le graphique traverse. À x=2 (puissance paire ^2), le graphique rebondit.",
                        plot3_type: "multiplicity_visual",
                        plot3_data: {
                            function: "(x-1)(x-2)^2",
                            roots: [
                                { x: 1, type: "cross", label: "Impair (Traverse)" },
                                { x: 2, type: "bounce", label: "Pair (Rebondit)" }
                            ]
                        },

                        list3_1: "Multiplicité Impaire (ex., ^1, ^3) : Le graphique **traverse** l'axe des x.",
                        list3_2: "Multiplicité Paire (ex., ^2, ^4) : Le graphique **touche** (rebondit sur) l'axe des x.",

                        // Exemple : Multiplicité
                        ex3_1_title: "Exemple (Comportement du Graphique)",
                        ex3_1_problem: "Décrivez le comportement de $f(x) = (x+3)^2 (x-1)^3$ aux abscisses à l'origine.",
                        ex3_1_step1: "Racine $x=-3$ : Multiplicité 2 (Paire). Le graphique rebondit.",
                        ex3_1_step2: "Racine $x=1$ : Multiplicité 3 (Impaire). Le graphique traverse."
                    },
                    section4: {
                        title4: "Racines Complexes",
                        def4_1: "Si un polynôme a des coefficients réels, les racines complexes viennent toujours par paires conjuguées.",
                        math4_2: `\\text{Si } a + bi \\text{ est une racine, alors } a - bi \\text{ est aussi une racine.}`,
                        text4_1: "Cela explique pourquoi les polynômes de degré impair doivent avoir au moins une racine réelle (les racines complexes utilisent le degré par paires de 2).",

                        // Exemple : Conjugués Complexes
                        ex4_1_title: "Exemple (Trouver des Racines)",
                        ex4_1_problem: "Un polynôme cubique a des racines $3$ et $2 - i$. Trouvez la troisième racine.",
                        ex4_1_solution: "Puisque les racines complexes viennent par paires, la troisième racine doit être le conjugué : $2 + i$."
                    },
                    example_section: {
                        title_ex: "Exemples avec Solutions Étape par Étape",
                        ex1: {
                            title: "1. Utiliser le Théorème de la Racine Rationnelle",
                            problem: "Trouvez toutes les racines rationnelles possibles pour :",
                            problem_math: `P(x) = 2x^3 + x^2 - 13x + 6`,
                            step1_title: "Étape 1 : Identifier p et q",
                            step1_desc: "Facteurs du terme constant (6) : $p = 1, 2, 3, 6$. Facteurs du coef. dominant (2) : $q = 1, 2$.",
                            step2_title: "Étape 2 : Lister les Combinaisons",
                            step2_desc: "Prenez chaque p divisé par chaque q.",
                            step2_math: `\\pm \\frac{1, 2, 3, 6}{1} \\implies \\pm 1, \\pm 2, \\pm 3, \\pm 6 \\\\ \\pm \\frac{1, 2, 3, 6}{2} \\implies \\pm \\frac{1}{2}, \\pm \\frac{3}{2} \\quad (1 \\text{ et } 3 \\text{ sont des doublons})`,
                            result_title: "Réponse Finale",
                            result: `\\text{Candidats : } \\pm 1, \\pm 2, \\pm 3, \\pm 6, \\pm \\frac{1}{2}, \\pm \\frac{3}{2}`
                        },
                        ex2: {
                            title: "2. Résoudre avec le Théorème du Facteur",
                            problem: "Est-ce que $(x-2)$ est un facteur de $P(x) = x^3 - 4x^2 + 3x + 2$ ?",
                            step1_title: "Étape 1 : Appliquer le Théorème",
                            step1_desc: "Si $(x-2)$ est un facteur, alors $P(2)$ doit être égal à 0.",
                            step2_title: "Étape 2 : Évaluer P(2)",
                            step2_math: `P(2) = (2)^3 - 4(2)^2 + 3(2) + 2 \\\\ = 8 - 16 + 6 + 2 \\\\ = 0`,
                            step3_title: "Étape 3 : Conclusion",
                            step3_desc: "Puisque le reste est 0, c'est un facteur.",
                            result_title: "Réponse Finale",
                            result: "Oui, $(x-2)$ est un facteur."
                        },
                        ex3: {
                            title: "3. Analyser la Multiplicité depuis la Forme Factorisée",
                            problem: "Décrivez le comportement du graphique aux abscisses à l'origine :",
                            problem_math: `P(x) = -2(x - 3)^2 (x + 1)^3`,
                            step1_title: "Étape 1 : Identifier les Racines",
                            step1_desc: "Les racines sont à $x = 3$ et $x = -1$.",
                            step2_title: "Étape 2 : Vérifier la Multiplicité",
                            step2_math: `\\text{À } x=3 : \\text{ Puissance est 2 (Paire)} \\\\ \\text{À } x=-1 : \\text{ Puissance est 3 (Impaire)}`,
                            step3_title: "Étape 3 : Déterminer le Comportement",
                            result_title: "Réponse Finale",
                            result: "À $x=3$, le graphique touche/rebondit. À $x=-1$, le graphique traverse l'axe."
                        }
                    }
                }
            }
        },
        polynomial_equations: {
            title: "Équations Polynomiales",
            description: "Trouver les valeurs de x qui rendent l'équation vraie : des isolations linéaires simples à la résolution de problèmes complexes de degré supérieur.",
            lessons: {
                lesson5_title: "Stratégies de Résolution et Applications",
                lesson5: {
                    section1: {
                        title1: "Équations Linéaires (Degré 1)",
                        def1_1: "La forme la plus simple d'une équation polynomiale.",

                        // Plot : Visualisation Résolution Équation
                        plot1_title: "Isoler la Variable",
                        plot1_desc: "Résolution de $2x - 6 = 0$. Pour isoler x, nous devons déplacer la constante (-6) puis diviser par le coefficient (2).",
                        plot1_type: "linear_solver_visual",
                        plot1_data: {
                            equation: "2x - 6 = 0",
                            step1: "Ajouter 6 aux deux côtés -> 2x = 6",
                            step2: "Diviser par 2 -> x = 3",
                            root: 3
                        },

                        math1_1: `ax + b = 0 \\implies x = -\\frac{b}{a}`,
                        text1_1: "Le but est simplement d'isoler la variable en utilisant des opérations inverses (ajouter/soustraire, puis multiplier/diviser).",

                        // Exemple : Linéaire
                        ex1_1_title: "Exemple (Linéaire)",
                        ex1_1_problem: "Résoudre $3x + 7 = 22$.",
                        ex1_1_step1: "Soustraire 7 des deux côtés : $3x = 15$.",
                        ex1_1_step2: "Diviser par 3 : $x = 5$.",
                        ex1_1_solution: "Solution : $x = 5$."
                    },
                    section2: {
                        title2: "Équations Quadratiques (Degré 2)",
                        def2_1: "Forme Standard : $ax^2 + bx + c = 0$.",

                        def2_2_title: "Méthode 1 : Factorisation (Propriété du Produit Nul)",
                        text2_1: "Si $(x-r)(x-s) = 0$, alors $x=r$ ou $x=s$. C'est la méthode la plus rapide si les nombres sont agréables.",

                        // Exemple : Factorisation
                        ex2_1_title: "Exemple (Factorisation)",
                        ex2_1_problem: "Résoudre $x^2 - 5x + 6 = 0$.",
                        ex2_1_step1: "Trouver des nombres qui multipliés font 6 et additionnés font -5 : (-2, -3).",
                        ex2_1_step2: "Factoriser : $(x - 2)(x - 3) = 0$.",
                        ex2_1_solution: "Racines : $x = 2, x = 3$.",

                        def2_3_title: "Méthode 2 : La Formule Quadratique",
                        text2_2: "Utilisé lorsque la factorisation est difficile ou impossible. Elle fonctionne pour *toute* équation quadratique.",
                        math2_1: `x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}`,

                        // Exemple : Formule Quadratique
                        ex2_2_title: "Exemple (Formule Quadratique)",
                        ex2_2_problem: "Résoudre $2x^2 + 5x - 3 = 0$.",
                        ex2_2_step1: "Identifier $a=2, b=5, c=-3$.",
                        ex2_2_step2: "Discriminant : $5^2 - 4(2)(-3) = 25 + 24 = 49$.",
                        ex2_2_step3: "Formule : $\\frac{-5 \\pm 7}{4}$.",
                        ex2_2_solution: "Racines : $x = \\frac{1}{2}, x = -3$.",

                        def2_4_title: "Le Discriminant ($\\Delta$)",
                        text2_3: "La valeur à l'intérieur de la racine carrée ($b^2 - 4ac$) nous renseigne sur les solutions :",

                        // Plot : Cas du Discriminant
                        plot2_title: "Le Discriminant et les Racines",
                        plot2_desc: "Bleu (Pos) : 2 Racines. Vert (Zéro) : 1 Racine. Rouge (Nég) : Pas de Racines Réelles.",
                        plot2_type: "multi_function",
                        plot2_domain: [-4, 4],
                        plot2_functions: [
                            { expression: "x^2 - 4", color: "blue", label: "D > 0 (2 Réelles)" },
                            { expression: "x^2", color: "green", label: "D = 0 (1 Réelle)" },
                            { expression: "x^2 + 2", color: "red", label: "D < 0 (0 Réelles)" }
                        ],

                        list2_1: "$\\Delta > 0$ : Deux solutions réelles distinctes (Traverse l'axe des x deux fois).",
                        list2_2: "$\\Delta = 0$ : Une solution réelle répétée (Touche l'axe des x une fois).",
                        list2_3: "$\\Delta < 0$ : Deux solutions complexes (imaginaires) (Ne touche jamais l'axe des x)."
                    },
                    section3: {
                        title3: "Équations Cubiques et de Degré Supérieur",
                        def3_1: "Stratégie : Réduire le Degré.",

                        step3_1: "1. Y a-t-il un PGCD ? Factorisez-le.",
                        step3_2: "2. Pouvez-vous utiliser le Regroupement ? (Courant pour les cubiques à 4 termes).",
                        step3_3: "3. Sinon, utilisez le Théorème de la Racine Rationnelle et la Division Synthétique pour diviser le polynôme en une Quadratique.",

                        text3_1: "Une fois que vous atteignez un quotient Quadratique, résolvez-le en utilisant la Formule Quadratique.",

                        // Exemple : Résolution d'une Cubique
                        ex3_1_title: "Exemple (Résolution Degré Supérieur)",
                        ex3_1_problem: "Résoudre $x^3 - 2x^2 - 5x + 6 = 0$.",
                        ex3_1_step1: "Tester les racines rationnelles. Essayez $x=1$ : $1 - 2 - 5 + 6 = 0$. Ça marche !",
                        ex3_1_step2: "Division Synthétique par 1 : Coefficients [1, -2, -5, 6] $\\to$ Reste 0.",
                        ex3_1_step3: "Polynôme Réduit : $x^2 - x - 6 = 0$.",
                        ex3_1_step4: "Résoudre Quadratique : Factoriser $(x-3)(x+2) = 0$.",
                        ex3_1_solution: "Racines : $x = 1, x = 3, x = -2$."
                    },
                    section4: {
                        title4: "Problèmes Verbaux et Modélisation",
                        def4_1: "Traduire le Français en Mathématiques.",

                        // Plot : Mouvement de Projectile
                        plot4_title: "Mouvement de Projectile",
                        plot4_desc: "La trajectoire d'un objet lancé en l'air suit une courbe parabolique ($h(t) = -16t^2 + vt + h$). La hauteur max est le sommet ; toucher le sol est la racine.",
                        plot4_type: "projectile_motion_visual",
                        plot4_data: {
                            function: "-16*t^2 + 64*t",
                            domain: [0, 4],
                            points: [
                                { x: 2, y: 64, label: "Hauteur Max" },
                                { x: 4, y: 0, label: "Sol" }
                            ]
                        },

                        list4_1: "Problèmes d'Aire : Longueur $\\times$ Largeur ($x(x+5) = Aire$).",
                        list4_2: "Mouvement de Projectile : Hauteur en fonction du temps ($h(t) = -16t^2 + v_0t + h_0$).",
                        list4_3: "Volume : Volume d'une boîte ($V = l \\cdot w \\cdot h$).",

                        // Exemple : Problème d'Aire
                        ex4_1_title: "Exemple (Géométrie)",
                        ex4_1_problem: "La longueur d'un rectangle est de 3 de plus que sa largeur. L'aire est de 40. Trouvez les dimensions.",
                        ex4_1_step1: "Soit $w = x$. Alors $l = x+3$.",
                        ex4_1_step2: "Équation : $x(x+3) = 40 \\implies x^2 + 3x - 40 = 0$.",
                        ex4_1_step3: "Factoriser : $(x+8)(x-5) = 0$.",
                        ex4_1_solution: "x ne peut pas être une longueur négative (-8). Donc Largeur = 5, Longueur = 8."
                    },
                    example_section: {
                        title_ex: "Exemples avec Solutions Étape par Étape",
                        ex1: {
                            title: "1. Formule Quadratique",
                            problem: "Résoudre pour x (réponses exactes) :",
                            problem_math: `3x^2 - 5x - 7 = 0`,
                            step1_title: "Étape 1 : Identifier les Coefficients",
                            step1_desc: "$a = 3, \\; b = -5, \\; c = -7$.",
                            step2_title: "Étape 2 : Insérer dans la Formule",
                            step2_math: `x = \\frac{-(-5) \\pm \\sqrt{(-5)^2 - 4(3)(-7)}}{2(3)}`,
                            step3_title: "Étape 3 : Simplifier",
                            step3_math: `x = \\frac{5 \\pm \\sqrt{25 + 84}}{6} = \\frac{5 \\pm \\sqrt{109}}{6}`,
                            result_title: "Réponse Finale",
                            result: "Les deux racines sont $\\frac{5 + \\sqrt{109}}{6}$ et $\\frac{5 - \\sqrt{109}}{6}$."
                        },
                        ex2: {
                            title: "2. Résoudre une Cubique par Regroupement",
                            problem: "Trouver toutes les racines :",
                            problem_math: `x^3 - 2x^2 - 9x + 18 = 0`,
                            step1_title: "Étape 1 : Grouper les Termes",
                            step1_desc: "Groupez les deux premiers et les deux derniers.",
                            step1_math: `(x^3 - 2x^2) - (9x - 18) = 0`,
                            step2_title: "Étape 2 : Factoriser les PGCD",
                            step2_math: `x^2(x - 2) - 9(x - 2) = 0`,
                            step3_title: "Étape 3 : Extraire le Binôme Commun",
                            step3_math: `(x^2 - 9)(x - 2) = 0`,
                            step4_title: "Étape 4 : Résoudre les Facteurs",
                            step4_desc: "$x^2 - 9$ est une différence de carrés $(x-3)(x+3)$.",
                            result_title: "Réponse Finale",
                            result: `x = 2, \\; x = 3, \\; x = -3`
                        },
                        ex3: {
                            title: "3. Problème Verbal d'Optimisation",
                            problem: "Un jardin rectangulaire a une aire de 40 m². La longueur est de 3m de plus que la largeur. Trouvez les dimensions.",
                            problem_math: `\\text{Aire} = 40, \\quad L = W + 3`,
                            step1_title: "Étape 1 : Poser l'Équation",
                            step1_math: `W(W + 3) = 40 \\implies W^2 + 3W - 40 = 0`,
                            step2_title: "Étape 2 : Résoudre pour W",
                            step2_desc: "Factorisez la quadratique. Facteurs de -40 qui s'additionnent à 3 sont +8 et -5.",
                            step2_math: `(W + 8)(W - 5) = 0`,
                            step3_title: "Étape 3 : Écarter les Solutions Invalides",
                            step3_desc: "$W = -8$ ou $W = 5$. La largeur ne peut pas être négative, donc $W = 5$.",
                            result_title: "Réponse Finale",
                            result: "Largeur = 5m, Longueur = 8m."
                        }
                    }
                }
            }
        },
        real_world_applications: {
            title: "Applications dans le Monde Réel",
            description: "Voir les polynômes en action : modélisation de l'espace physique, analyse du mouvement, optimisation des profits commerciaux et ajustement des tendances de données.",
            lessons: {
                lesson6_title: "Modélisation et Résolution de Problèmes",
                lesson6: {
                    section1: {
                        title1: "Aire et Volume (Géométrie)",
                        def1_1: "Les polynômes décrivent les dimensions des formes géométriques lorsque des variables sont impliquées.",
                        text1_1: "Scénario Courant : Créer une boîte à partir d'une feuille plate en découpant des coins de taille 'x'.",
                        math1_1: `V(x) = x(L - 2x)(W - 2x)`,

                        // Plot : Diagramme Problème de Boîte
                        plot1_title: "Visualisation de la Découpe",
                        plot1_desc: "Une feuille de carton plate avec des coins découpés. Replier les rabats crée une boîte 3D.",
                        plot1_type: "box_cut_visual",
                        plot1_data: {
                            sheet_width: 12,
                            sheet_height: 12,
                            cut_size: "x",
                            folded_dim: "(12-2x) by (12-2x) by x"
                        },
                        caption: "Couper les coins → Plier → Boîte !",
                        text1_2: "Ici, $V(x)$ devient un polynôme cubique (degré 3). Trouver le volume maximal nécessite de trouver le sommet de cette courbe polynomiale."
                    },
                    section2: {
                        title2: "Problèmes de Mouvement (Physique)",
                        def2_1: "Mouvement de Projectile : La hauteur d'un objet lancé en l'air est modélisée par un polynôme quadratique dû à la gravité.",
                        math2_1: `h(t) = -16t^2 + v_0t + h_0 \\quad (\\text{Unités impériales})`,
                        math2_2: `h(t) = -4.9t^2 + v_0t + h_0 \\quad (\\text{Unités métriques})`,
                        list2_1: "$t$ : Temps en secondes.",
                        list2_2: "$v_0$ : Vitesse initiale.",
                        list2_3: "$h_0$ : Hauteur initiale.",

                        // Plot : Trajectoire de Projectile
                        plot2_title: "Trajectoire Parabolique",
                        plot2_desc: "Hauteur en fonction du temps. Le sommet est la hauteur maximale ; l'intersection positive avec x est le moment où il touche le sol.",
                        plot2_type: "projectile_motion_visual",
                        plot2_data: {
                            function: "-16*t^2 + 64*t + 5",
                            domain: [0, 4.1],
                            points: [
                                { x: 0, y: 5, label: "Début (h0)" },
                                { x: 2, y: 69, label: "Hauteur Max" },
                                { x: 4.08, y: 0, label: "Impact" }
                            ]
                        },
                        max_height: "Hauteur Max (Sommet)",
                        impact: "Impact",
                        gravity: "gravité",
                        text2_1: "Résoudre $h(t) = 0$ vous dit quand l'objet touche le sol."
                    },
                    section3: {
                        title3: "Applications Commerciales (Économie)",
                        def3_1: "Les polynômes modélisent la santé financière.",
                        math3_1: `P(x) = R(x) - C(x)`,
                        list3_1: "Revenus $R(x)$ : Prix $\\times$ Quantité vendue.",
                        list3_2: "Coût $C(x)$ : Coûts fixes + Coûts variables.",
                        list3_3: "Profit $P(x)$ : La différence entre Revenus et Coût.",

                        // Plot : Analyse de Profit
                        plot3_title: "Visualisation du Profit",
                        plot3_desc: "La région verte est le Profit (où Revenus > Coût). Le pic de la courbe de Profit est le Profit Maximum. Les points où Revenus égalent Coût sont les points Morts.",
                        plot3_type: "profit_loss_visual",
                        plot3_data: {
                            revenue: "-0.5*x^2 + 50*x", // Revenu Parabolique
                            cost: "10*x + 200",       // Coût Linéaire
                            profit: "-0.5*x^2 + 40*x - 200", // P(x)
                            domain: [0, 100],
                            break_even_points: [5.36, 74.64] // Racines de P(x)
                        },
                        revenue: "Revenus",
                        cost: "Coût",
                        profit: "Profit",
                        break_even: "Point Mort",
                        text3_1: "Points Morts : Les racines de $P(x)$ (où Profit = 0).",
                        text3_2: "Pour maximiser le profit, nous trouvons le sommet de la parabole de Profit (pour les modèles quadratiques).",

                        // Exemple : Max Profit
                        ex3_1_title: "Exemple (Maximiser le Profit)",
                        ex3_1_problem: "Le revenu est $R(x) = 50x - 0.5x^2$ et le coût est $C(x) = 10x + 200$. Trouvez le niveau de production $x$ pour un profit maximum.",
                        ex3_1_step1: "Équation de Profit : $P(x) = (50x - 0.5x^2) - (10x + 200)$.",
                        ex3_1_step2: "Simplifier : $P(x) = -0.5x^2 + 40x - 200$.",
                        ex3_1_step3: "Trouver Sommet ($x = -b/2a$) : $x = -40 / (2 \\cdot -0.5) = -40 / -1 = 40$.",
                        ex3_1_solution: "Maximisez le profit en produisant 40 unités."
                    },
                    section4: {
                        title4: "Ingénierie et Modélisation de Données",
                        def4_1: "Ajustement de Courbes (Régression) : Les ingénieurs utilisent des polynômes pour approximer des points de données complexes du monde réel.",

                        // Plot : Ajustement de Courbes
                        plot4_title: "Ajustement d'une Tendance",
                        plot4_desc: "Les points rouges sont des données réelles (nuage de points). La ligne bleue est un modèle polynomial (Régression) utilisé pour prédire les tendances futures.",
                        plot4_type: "scatter_plot_fit",
                        plot4_data: {
                            points: [{ x: 1, y: 2 }, { x: 2, y: 5 }, { x: 3, y: 10 }, { x: 4, y: 17 }],
                            model: "x^2 + 1", // Ajuste motif 1, 4, 9, 16 (+1)
                            prediction_point: { x: 5, y: 26 },
                            label: "Ajustement Quadratique"
                        },
                        data: "Données",
                        prediction: "Prédiction",
                        text4_1: "Un ensemble de points de données dispersés peut souvent être modélisé par une 'Ligne de Meilleur Ajustement' (Linéaire) ou une courbe (Quadratique/Cubique) pour prédire les résultats futurs.",
                        warning4_1: "Surajustement : Utiliser un polynôme avec un degré trop élevé pourrait ajuster le bruit plutôt que la tendance.",

                        // Exemple : Modélisation
                        ex4_1_title: "Exemple (Reconnaissance de Motifs)",
                        ex4_1_problem: "Trouvez un modèle polynomial pour la suite : 2, 5, 10, 17...",
                        ex4_1_step1: "Premières Différences : $5-2=3, 10-5=5, 17-10=7$ (Pas linéaire).",
                        ex4_1_step2: "Secondes Différences : $5-3=2, 7-5=2$ (Constant).",
                        ex4_1_step3: "Seconde différence constante implique un modèle Quadratique ($n^2 + 1$).",
                        ex4_1_solution: "Modèle : $y = x^2 + 1$."
                    },
                    example_section: {
                        title_ex: "Exemples avec Solutions Étape par Étape",
                        ex1: {
                            title: "1. Mouvement de Projectile",
                            problem: "Une fusée est lancée du sol ($h_0=0$) avec une vitesse initiale $v_0 = 98$ m/s. Quand revient-elle sur terre ?",
                            problem_math: `h(t) = -4.9t^2 + 98t + 0`,
                            step1_title: "Étape 1 : Mettre la Hauteur à Zéro",
                            step1_desc: "Nous voulons trouver $t$ quand $h(t) = 0$.",
                            step1_math: `-4.9t^2 + 98t = 0`,
                            step2_title: "Étape 2 : Factoriser",
                            step2_desc: "Factoriser $t$ (ou $-4.9t$).",
                            step2_math: `t(-4.9t + 98) = 0`,
                            step3_title: "Étape 3 : Résoudre pour t",
                            step3_desc: "Deux solutions : $t = 0$ (lancement) et $-4.9t + 98 = 0$.",
                            step3_math: `4.9t = 98 \\implies t = 20`,
                            result_title: "Réponse Finale",
                            result: "La fusée touche le sol après 20 secondes."
                        },
                        ex2: {
                            title: "2. Maximiser le Profit",
                            problem: "Le profit d'une entreprise est modélisé par $P(x) = -x^2 + 100x - 900$. Combien d'unités ($x$) doivent être vendues pour maximiser le profit ?",
                            step1_title: "Étape 1 : Identifier le Type de Fonction",
                            step1_desc: "C'est une parabole s'ouvrant vers le bas (Quadratique). Le maximum est au Sommet.",
                            step2_title: "Étape 2 : Formule du Sommet",
                            step2_math: `x = \\frac{-b}{2a}`,
                            step3_title: "Étape 3 : Substituer les Coefficients",
                            step3_desc: "$a = -1, b = 100$.",
                            step3_math: `x = \\frac{-100}{2(-1)} = \\frac{-100}{-2} = 50`,
                            result_title: "Réponse Finale",
                            result: "Vendre 50 unités produit le profit maximum."
                        },
                        ex3: {
                            title: "3. Construction de Volume",
                            problem: "Une boîte est faite à partir d'une feuille de 10x8 en coupant des carrés de côté $x$. Exprimez le polynôme de Volume.",
                            problem_math: `V = L \\cdot W \\cdot H`,
                            step1_title: "Étape 1 : Définir les Dimensions",
                            step1_desc: "Hauteur = $x$. Longueur = $10 - 2x$. Largeur = $8 - 2x$.",
                            step2_title: "Étape 2 : Poser l'Équation",
                            step2_math: `V(x) = x(10 - 2x)(8 - 2x)`,
                            step3_title: "Étape 3 : Développer (Forme Standard)",
                            step3_desc: "Multipliez les binômes d'abord : $(80 - 20x - 16x + 4x^2)$. Ensuite multipliez par $x$.",
                            result_title: "Réponse Finale",
                            result: `V(x) = 4x^3 - 36x^2 + 80x`
                        }
                    }
                }
            }
        },
    },
    de: {
        polynomial_basics: {
            title: "Polynom-Grundlagen",
            description: "Die Bausteine der Algebra: Verständnis der Struktur, Terminologie und Klassifizierung von Polynomen.",
            lessons: {
                lesson1_title: "Struktur & Terminologie",
                lesson1: {
                    section1: {
                        title1: "Definition & Terminologie",
                        def1_1: "Ein Polynom ist ein mathematischer Ausdruck bestehend aus Variablen (auch Unbestimmte genannt) und Koeffizienten, der nur die Operationen Addition, Subtraktion, Multiplikation und nicht-negative ganzzahlige Exponenten von Variablen beinhaltet.",
                        math1_1: `P(x) = a_n x^n + a_{n-1} x^{n-1} + \\dots + a_1 x + a_0`,

                        // Plot: Anatomie eines Polynoms
                        plot1_title: "Anatomie eines Polynoms",
                        plot1_desc: "Visuelle Aufschlüsselung des Terms $3x^2$.",
                        plot1_type: "polynomial_anatomy",
                        plot1_data: {
                            expression: "3x^2",
                            labels: [
                                { text: "Koeffizient", target: "3", color: "blue" },
                                { text: "Variable", target: "x", color: "black" },
                                { text: "Exponent", target: "2", color: "red" },
                                { text: "Grad", target: "2", color: "red" }
                            ]
                        },
                        text1_1: "Schlüsselvokabular:",
                        list1_1: "Term: Jeder Teil des Polynoms, getrennt durch + oder - Zeichen.",
                        list1_2: "Koeffizient: Der numerische Faktor eines Terms (z.B. in $5x^2$ ist 5 der Koeffizient).",
                        list1_3: "Konstante: Ein Term ohne Variable (Grad 0).",
                        warning1: "Ausdrücke mit negativen Exponenten ($x^{-1}$) oder gebrochenen Exponenten ($\\sqrt{x}$) sind KEINE Polynome."
                    },
                    section2: {
                        title2: "Grad & Leitkoeffizient",
                        def2_1: "Der Grad eines Polynoms ist der höchste Exponent der Variable, der im Ausdruck vorkommt.",
                        def2_2: "Der Leitkoeffizient (LK) ist der Koeffizient des Terms mit dem höchsten Grad.",

                        // Beispiel: Grad & LK
                        ex2_1_title: "Schnelltest",
                        ex2_1_problem: "Analysiere das Polynom $P(x) = 7x^3 - 2x + 5$.",
                        ex2_1_solution: "Die höchste Potenz ist 3, also **Grad = 3**. Der Koeffizient von $x^3$ ist 7, also **Leitkoeffizient = 7**.",

                        text2_1: "Der Grad bestimmt das Endverhalten des Graphen (ob er im Unendlichen nach oben oder unten geht)."
                    },
                    section3: {
                        title3: "Standardform",
                        def3_1: "Ein Polynom ist in Standardform, wenn seine Terme vom höchsten zum niedrigsten Grad geordnet sind.",

                        // Beispiel: Umordnen in Standardform
                        ex3_1_title: "Beispiel",
                        ex3_1_problem: "Schreibe $f(x) = 4 + x^3 - 2x$ in Standardform um.",
                        ex3_1_step1: "Identifiziere Grade: $4$ (Grad 0), $x^3$ (Grad 3), $-2x$ (Grad 1).",
                        ex3_1_solution: "Ordne nach Grad (3, 1, 0): $f(x) = x^3 - 2x + 4$.",

                        math3_1: `\\text{Beispiel: } f(x) = -2x^3 + 4x^2 - x + 7`,
                        text3_1: "Es ist gängige Praxis, Polynome immer auf diese Weise umzuschreiben, bevor man sie analysiert."
                    },
                    section4: {
                        title4: "Arten von Polynomen",
                        def4_1_title: "Klassifizierung nach Anzahl der Terme",
                        list4_1: "Monom: 1 Term (z.B. $3x^2$)",
                        list4_2: "Binom: 2 Terme (z.B. $x + 5$)",
                        list4_3: "Trinom: 3 Terme (z.B. $x^2 + 3x - 4$)",

                        def4_2_title: "Klassifizierung nach Grad",
                        list4_4: "Linear: Grad 1 ($mx + b$)",
                        list4_5: "Quadratisch: Grad 2 ($ax^2 + bx + c$)",
                        list4_6: "Kubisch: Grad 3",

                        // Plot: Vergleich von Polynomtypen
                        plot4_title: "Vergleich der Grade",
                        plot4_desc: "Linear ist eine gerade Linie. Quadratisch ist eine U-förmige Parabel. Kubisch ist eine S-förmige Kurve.",
                        plot4_type: "multi_function",
                        plot4_domain: [-3, 3],
                        plot4_functions: [
                            { expression: "x", color: "blue", label: "Linear (x)" },
                            { expression: "x^2", color: "green", label: "Quadratisch (x^2)" },
                            { expression: "x^3", color: "red", label: "Kubisch (x^3)" }
                        ]
                    },
                    section5: {
                        title5: "Polynomgleichheit",
                        def5_1: "Zwei Polynome sind genau dann gleich, wenn sie denselben Grad haben und ihre entsprechenden Koeffizienten identisch sind.",

                        // Beispiel: Lösen nach Konstanten
                        ex5_1_title: "Beispiel (Konstanten finden)",
                        ex5_1_problem: "Finde A und B, wenn $2x + 5 = Ax + B$.",
                        ex5_1_step1: "Vergleiche x-Koeffizienten: $2 = A$.",
                        ex5_1_step2: "Vergleiche konstante Terme: $5 = B$.",
                        ex5_1_solution: "Also, $A=2$ und $B=5$.",

                        math5_1: `Ax^2 + Bx + C = 2x^2 - 5x + 1 \\implies A=2, B=-5, C=1`,
                        text5_1: "Dieses Prinzip wird oft verwendet, um unbekannte Konstanten zu lösen."
                    },
                    example_section: {
                        title_ex: "Beispiele mit Schritt-für-Schritt-Lösungen",
                        ex1: {
                            title: "1. Standardform & Identifikation",
                            problem: "Schreibe in Standardform um und identifiziere Grad und Leitkoeffizienten.",
                            problem_math: `P(x) = 4 - 2x + 7x^5 - 3x^2`,
                            step1_title: "Schritt 1: Exponenten identifizieren",
                            step1_desc: "Die Potenzen sind 0 (Konstante), 1 ($2x$), 5 ($7x^5$) und 2 ($-3x^2$).",
                            step2_title: "Schritt 2: Umordnen",
                            step2_desc: "Platziere Terme in absteigender Reihenfolge der Potenzen: 5, dann 2, dann 1, dann 0.",
                            step2_math: `P(x) = 7x^5 - 3x^2 - 2x + 4`,
                            step3_title: "Schritt 3: Grad und LK identifizieren",
                            step3_desc: "Höchste Potenz ist 5. Die Zahl vor $x^5$ ist 7.",
                            result_title: "Endergebnis",
                            result: "Grad: 5, Leitkoeffizient: 7."
                        },
                        ex2: {
                            title: "2. Polynome validieren",
                            problem: "Welche der folgenden sind Polynome?",
                            problem_math: `A) \\; 3x^2 + 2x^{-1} \\quad B) \\; 5\\sqrt{x} + 2 \\quad C) \\; \\frac{1}{2}x^3 - \\pi`,
                            step1_title: "Schritt 1: Exponenten analysieren",
                            step1_desc: "Polynome müssen nicht-negative ganzzahlige Exponenten haben (0, 1, 2, ...).",
                            step2_title: "Schritt 2: Jeden Fall prüfen",
                            step2_math: `A: x^{-1} \\text{ hat einen negativen Exponenten. (Kein Polynom)} \\\\ B: \\sqrt{x} = x^{1/2} \\text{ hat einen Bruch. (Kein Polynom)} \\\\ C: \\text{Koeffizienten können Brüche (1/2) oder irrational (}\\pi\\text{) sein. Potenzen sind ganze Zahlen.}`,
                            result_title: "Endergebnis",
                            result: "Nur C ist ein Polynom."
                        },
                        ex3: {
                            title: "3. Koeffizienten finden (Gleichheit)",
                            problem: "Finde A und B, wenn die Gleichung für alle x wahr ist:",
                            problem_math: `2x(x + 3) = Ax^2 + Bx`,
                            step1_title: "Schritt 1: Linke Seite erweitern",
                            step1_desc: "Verteile $2x$.",
                            step1_math: `2x \\cdot x + 2x \\cdot 3 = 2x^2 + 6x`,
                            step2_title: "Schritt 2: Koeffizienten vergleichen",
                            step2_math: `2x^2 + 6x = Ax^2 + Bx`,
                            step3_title: "Schritt 3: Terme abgleichen",
                            step3_desc: "Der $x^2$-Term entspricht A. Der $x$-Term entspricht B.",
                            result_title: "Endergebnis",
                            result: `A = 2, \\quad B = 6`
                        }
                    }
                }
            }
        },
        polynomial_operations: {
            title: "Polynomoperationen",
            description: "Beherrschung der Arithmetik von Polynomen: Addition, Subtraktion, Multiplikation und zwei leistungsstarke Methoden zur Division.",
            lessons: {
                lesson2_title: "Arithmetik & Divisionsalgorithmen",
                lesson2: {
                    section1: {
                        title1: "Addition & Subtraktion",
                        def1_1: "Die goldene Regel: Du kannst nur gleichartige Terme addieren oder subtrahieren.",
                        def1_2: "Gleichartige Terme sind Terme, die exakt dieselbe Variable mit exakt demselben Exponenten haben.",

                        // Plot: Gruppierung gleichartiger Terme
                        plot1_title: "Visualisierung gleichartiger Terme",
                        plot1_desc: "Wir gruppieren Terme nach ihren variablen Teilen. $x^2$-Terme gehören zusammen, $x$-Terme gehören zusammen.",
                        plot1_type: "polynomial_grouping",
                        plot1_data: {
                            expression: "(2x^2 + 3x) + (4x^2 - x)",
                            groups: [
                                { terms: ["2x^2", "4x^2"], color: "red", label: "Quadratisch" },
                                { terms: ["3x", "-x"], color: "blue", label: "Linear" }
                            ]
                        },

                        math1_1: `3x^2 + 5x^2 = 8x^2 \\quad \\text{(Richtig)}`,
                        math1_2: `3x^2 + 5x = \\text{Kann nicht kombiniert werden}`,
                        text1_1: "Beim Subtrahieren von Polynomen daran denken, das negative Vorzeichen auf jeden Term im zweiten Polynom zu verteilen.",

                        // Beispiel: Subtraktion
                        ex1_1_title: "Beispiel (Subtraktion)",
                        ex1_1_problem: "Vereinfache $(5x^2 + 2x - 1) - (3x^2 - 4x + 2)$.",
                        ex1_1_step1: "Verteile das Minus: $5x^2 + 2x - 1 - 3x^2 + 4x - 2$.",
                        ex1_1_step2: "Gruppiere gleichartige Terme: $(5x^2 - 3x^2) + (2x + 4x) + (-1 - 2)$.",
                        ex1_1_solution: "Ergebnis: $2x^2 + 6x - 3$."
                    },
                    section2: {
                        title2: "Multiplikation",
                        def2_1: "Multiplikation beruht auf dem Distributivgesetz und der Potenzregel: $x^a \\cdot x^b = x^{a+b}$.",
                        list2_1: "Monom × Polynom: Verteile den einzelnen Term auf alle Terme innerhalb.",
                        list2_2: "Binom × Binom: Verwende die FOIL-Methode (First, Outer, Inner, Last).",
                        list2_3: "Allgemeine Multiplikation: Multipliziere jeden Term im ersten Polynom mit jedem Term im zweiten.",

                        // Plot: Box-Methode (Flächenmodell)
                        plot2_title: "Die Box-Methode (Flächenmodell)",
                        plot2_desc: "Visualisierung von $(x+2)(x+3)$. Die Fläche der vier inneren Rechtecke ergibt das Produkt.",
                        plot2_type: "polynomial_box_method",
                        plot2_data: {
                            top_labels: ["x", "+3"],
                            side_labels: ["x", "+2"],
                            cells: [
                                { val: "x^2", color: "light-blue" }, { val: "3x", color: "light-green" },
                                { val: "2x", color: "light-green" }, { val: "6", color: "light-yellow" }
                            ]
                        },

                        // Beispiel: Binomische Multiplikation
                        ex2_1_title: "Beispiel (FOIL)",
                        ex2_1_problem: "Multipliziere $(2x + 1)(x - 5)$.",
                        ex2_1_step1: "Erste: $2x \\cdot x = 2x^2$. Äußere: $2x \\cdot -5 = -10x$.",
                        ex2_1_step2: "Innere: $1 \\cdot x = 1x$. Letzte: $1 \\cdot -5 = -5$.",
                        ex2_1_step3: "Kombiniere gleichartige Terme (-10x + 1x).",
                        ex2_1_solution: "Ergebnis: $2x^2 - 9x - 5$."
                    },
                    section3: {
                        title3: "Polynomdivision (Schriftlich)",
                        def3_1: "Wird verwendet, um ein Polynom durch ein anderes Polynom beliebigen Grades zu dividieren. Es folgt demselben Algorithmus wie die schriftliche Division von Zahlen.",

                        step3_1: "1. Dividieren: Teile den führenden Term des Dividenden durch den führenden Term des Divisors.",
                        step3_2: "2. Multiplizieren: Multipliziere das Ergebnis mit dem gesamten Divisor.",
                        step3_3: "3. Subtrahieren: Subtrahiere dieses Ergebnis vom Original (Vorzeichen umkehren!).",
                        step3_4: "4. Herunterholen: Hole den nächsten Term herunter und wiederhole.",

                        math3_1: `\\frac{P(x)}{D(x)} = Q(x) + \\frac{R(x)}{D(x)}`,
                        text3_1: "Wobei Q der Quotient, R der Rest und D der Divisor ist.",

                        // Beispiel: Schriftliche Division
                        ex3_1_title: "Beispiel (Schriftliche Division)",
                        ex3_1_problem: "Dividiere $2x^2 + 7x + 6$ durch $x + 2$.",
                        ex3_1_step1: "Dividiere: $2x^2 \\div x = 2x$. Schreibe $2x$ oben hin.",
                        ex3_1_step2: "Multipliziere: $2x(x + 2) = 2x^2 + 4x$.",
                        ex3_1_step3: "Subtrahiere: $(2x^2 + 7x) - (2x^2 + 4x) = 3x$. Hole die $+6$ herunter.",
                        ex3_1_step4: "Wiederhole: $3x \\div x = 3$. Multipliziere $3(x+2) = 3x + 6$. Subtrahiere, um $0$ zu erhalten.",
                        ex3_1_solution: "Der Quotient ist $2x + 3$ mit Rest $0$."
                    },
                    section4: {
                        title4: "Synthetische Division",
                        def4_1: "Eine abgekürzte Methode zur Division, die nur die Koeffizienten verwendet. Sie ist schneller, hat aber eine strenge Voraussetzung.",
                        warning4_1: "Einschränkung: Synthetische Division funktioniert nur beim Teilen durch ein lineares Binom der Form $(x - c)$.",

                        step4_1: "1. Aufbau: Schreibe 'c' nach außen (wenn durch $x-3$ geteilt wird, nutze 3). Schreibe Koeffizienten nach innen.",
                        step4_2: "2. Herunterholen: Hole den ersten Koeffizienten direkt herunter.",
                        step4_3: "3. Multiplizieren & Addieren: Multipliziere die untere Zahl mit 'c', platziere sie in der nächsten Spalte, addiere nach unten.",
                        text4_2: "Die Zahlen in der unteren Reihe repräsentieren die Koeffizienten des Quotienten (der immer einen Grad niedriger ist).",

                        // Beispiel: Synthetische Division
                        ex4_1_title: "Beispiel (Synthetisch)",
                        ex4_1_problem: "Dividiere $x^3 - 4x^2 + 2x - 5$ durch $x - 3$.",
                        ex4_1_step1: "Aufbau: $c = 3$. Koeffizienten sind $[1, -4, 2, -5]$.",
                        ex4_1_step2: "Hole 1 herunter. Multipliziere $3(1)=3$. Addiere zu -4: $-4+3 = -1$.",
                        ex4_1_step3: "Multipliziere $3(-1)=-3$. Addiere zu 2: $2-3 = -1$.",
                        ex4_1_step4: "Multipliziere $3(-1)=-3$. Addiere zu -5: $-5-3 = -8$ (Rest).",
                        ex4_1_solution: "Quotient: $x^2 - x - 1$, Rest: $-8$."
                    },
                    example_section: {
                        title_ex: "Beispiele mit Schritt-für-Schritt-Lösungen",
                        ex1: {
                            title: "1. Multiplikation von Polynomen",
                            problem: "Multipliziere aus und vereinfache:",
                            problem_math: `(2x - 3)(x^2 + 4x - 1)`,
                            step1_title: "Schritt 1: Verteile 2x",
                            step1_math: `2x(x^2) + 2x(4x) + 2x(-1) = 2x^3 + 8x^2 - 2x`,
                            step2_title: "Schritt 2: Verteile -3",
                            step2_desc: "Achte auf die Vorzeichen.",
                            step2_math: `-3(x^2) - 3(4x) - 3(-1) = -3x^2 - 12x + 3`,
                            step3_title: "Schritt 3: Kombiniere gleichartige Terme",
                            step3_desc: "Kombiniere $x^2$-Terme und $x$-Terme.",
                            step3_math: `2x^3 + (8x^2 - 3x^2) + (-2x - 12x) + 3`,
                            result_title: "Endergebnis",
                            result: `2x^3 + 5x^2 - 14x + 3`
                        },
                        ex2: {
                            title: "2. Schriftliche Polynomdivision",
                            problem: "Dividiere schriftlich:",
                            problem_math: `(x^2 - 5x + 6) \\div (x - 2)`,
                            step1_title: "Schritt 1: Führende Terme dividieren",
                            step1_desc: "Wie oft passt $x$ in $x^2$? Antwort: $x$.",
                            step2_title: "Schritt 2: Multiplizieren und Subtrahieren",
                            step2_desc: "Multipliziere $x(x-2) = x^2 - 2x$. Subtrahiere dies von der oberen Reihe: $(-5x) - (-2x) = -3x$.",
                            step3_title: "Schritt 3: Herunterholen und Wiederholen",
                            step3_desc: "Hole $+6$ herunter. Jetzt dividiere $-3x$ durch $x$. Antwort: $-3$.",
                            step3_math: `-3(x - 2) = -3x + 6`,
                            step4_title: "Schritt 4: Rest",
                            step4_desc: "Subtraktion ergibt 0.",
                            result_title: "Endergebnis",
                            result: `x - 3`
                        },
                        ex3: {
                            title: "3. Synthetische Division",
                            problem: "Dividiere synthetisch:",
                            problem_math: `(3x^3 - 2x^2 + x - 5) \\div (x - 2)`,
                            step1_title: "Schritt 1: Aufbau",
                            step1_desc: "Der Divisor ist $x-2$, also verwende $c = 2$. Koeffizienten sind [3, -2, 1, -5].",
                            step2_title: "Schritt 2: Der Algorithmus",
                            step2_math: `\\text{Unten: } 3 \\\\ \\text{Mult: } 2 \\cdot 3 = 6 \\rightarrow \\text{Addiere zu -2} = 4 \\\\ \\text{Mult: } 2 \\cdot 4 = 8 \\rightarrow \\text{Addiere zu 1} = 9 \\\\ \\text{Mult: } 2 \\cdot 9 = 18 \\rightarrow \\text{Addiere zu -5} = 13`,
                            step3_title: "Schritt 3: Ergebnis interpretieren",
                            step3_desc: "Die untere Reihe ist 3, 4, 9 mit rest 13. Der Grad fällt von 3 auf 2.",
                            result_title: "Endergebnis",
                            result: `3x^2 + 4x + 9 + \\frac{13}{x-2}`
                        }
                    }
                }
            }
        },
        factorization_techniques: {
            title: "Faktorisierungstechniken",
            description: "Die Kunst, Polynome zu zerlegen: Umwandlung komplexer Ausdrücke in Produkte einfacherer Faktoren.",
            lessons: {
                lesson3_title: "Grundlegende Faktorisierungsmethoden",
                lesson3: {
                    section1: {
                        title1: "Größter Gemeinsamer Teiler (GGT)",
                        def1_1: "Die erste Regel der Faktorisierung: Suche immer zuerst nach einem gemeinsamen Faktor.",

                        // Plot: Visualisierung GGT
                        plot1_title: "Visualisierung des GGT",
                        plot1_desc: "Wir 'ziehen' den gemeinsamen Term $2x$ aus beiden Teilen des Ausdrucks heraus.",
                        plot1_type: "polynomial_gcf_visual",
                        plot1_data: {
                            original: "2x^2 + 6x",
                            gcf: "2x",
                            remainder: "(x + 3)",
                            color_gcf: "blue",
                            color_rem: "black"
                        },

                        text1_1: "Identifiziere die größte Zahl und die höchste Potenz der Variable, die jeden Term ohne Rest teilt.",
                        math1_1: `ab + ac = a(b + c)`,
                        warning1: "Wenn der führende Term negativ ist, ist es meist am besten, auch das negative Vorzeichen auszuklammern.",

                        // Beispiel: GGT
                        ex1_1_title: "Beispiel (GGT)",
                        ex1_1_problem: "Faktorisiere $12x^3 - 8x^2$.",
                        ex1_1_step1: "Koeffizienten: GGT von 12 und 8 ist 4.",
                        ex1_1_step2: "Variablen: GGT von $x^3$ und $x^2$ ist $x^2$.",
                        ex1_1_step3: "Teile jeden Term durch $4x^2$.",
                        ex1_1_solution: "Ergebnis: $4x^2(3x - 2)$."
                    },
                    section2: {
                        title2: "Spezielle Muster",
                        def2_1_title: "Differenz zweier Quadrate",
                        def2_1: "Zwei perfekte Quadrate, getrennt durch ein Minuszeichen.",
                        math2_1: `a^2 - b^2 = (a - b)(a + b)`,

                        // Plot: Geometrie Differenz zweier Quadrate
                        plot2_title: "Geometrischer Beweis",
                        plot2_desc: "Die Fläche eines großen Quadrats ($a^2$) minus eines kleinen Quadrats ($b^2$) kann in ein Rechteck mit den Maßen $(a-b)$ und $(a+b)$ umgeordnet werden.",
                        plot2_type: "diff_squares_geometry",
                        plot2_data: { a: 5, b: 2 },

                        // Beispiel: Differenz zweier Quadrate
                        ex2_1_title: "Beispiel (Diff. Quadrate)",
                        ex2_1_problem: "Faktorisiere $9x^2 - 16$.",
                        ex2_1_step1: "Identifiziere Quadrate: $9x^2 = (3x)^2$ also $a=3x$. $16 = 4^2$ also $b=4$.",
                        ex2_1_solution: "Wende Formel an: $(3x - 4)(3x + 4)$.",

                        text2_1: "Hinweis: Eine 'Summe von Quadraten' ($a^2 + b^2$) kann in den reellen Zahlen nicht faktorisiert werden.",

                        def2_2_title: "Perfekte Quadratische Trinome",
                        def2_2: "Ergebnis der Quadrierung eines Binoms.",
                        math2_2: `a^2 + 2ab + b^2 = (a + b)^2 \\quad \\text{und} \\quad a^2 - 2ab + b^2 = (a - b)^2`
                    },
                    section3: {
                        title3: "Faktorisierung durch Gruppierung",
                        def3_1: "Wird hauptsächlich verwendet, wenn ein Polynom 4 Terme hat.",

                        // Plot: Visualisierung Gruppierung
                        plot3_title: "Visualisierung der Gruppierung",
                        plot3_desc: "Wir teilen die 4 Terme in zwei Paare. Ziel ist es, einen gemeinsamen Binomfaktor zu finden (der Teil in Klammern).",
                        plot3_type: "grouping_visual",
                        plot3_data: {
                            expr: "x^3 + 2x^2 + 3x + 6",
                            group1: "x^2(x + 2)",
                            group2: "+ 3(x + 2)",
                            common: "(x + 2)"
                        },
                        plot3_description: "Gleiche Fläche, andere Form",
                        step3_1: "1. Terme gruppieren: Gruppiere die ersten beiden und die letzten beiden Terme.",
                        step3_2: "2. GGT ausklammern: Ziehe den GGT aus jedem Paar separat heraus.",
                        step3_3: "3. Binomfaktor: Wenn es richtig gemacht wurde, stimmen die Klammern überein. Klammere dieses gemeinsame Binom aus.",

                        math3_1: `ax + ay + bx + by = a(x+y) + b(x+y) = (a+b)(x+y)`,

                        // Beispiel: Gruppierung
                        ex3_1_title: "Beispiel (Gruppierung)",
                        ex3_1_problem: "Faktorisiere $2x^3 - 3x^2 + 4x - 6$.",
                        ex3_1_step1: "Gruppiere: $(2x^3 - 3x^2) + (4x - 6)$.",
                        ex3_1_step2: "GGT ausklammern: $x^2(2x - 3) + 2(2x - 3)$.",
                        ex3_1_step3: "Prüfe Übereinstimmung: $(2x - 3)$ ist in beiden.",
                        ex3_1_solution: "Ergebnis: $(x^2 + 2)(2x - 3)$."
                    },
                    section4: {
                        title4: "Fortgeschrittene Techniken",

                        // --- Kuben ---
                        def4_1_title: "Summe & Differenz von Kuben",
                        math4_1: `a^3 - b^3 = (a - b)(a^2 + ab + b^2)`,
                        math4_2: `a^3 + b^3 = (a + b)(a^2 - ab + b^2)`,

                        // Plot: SOAP Eselsbrücke
                        plot4_title: "Die SOAP-Methode",
                        plot4_desc: "Visuelle Hilfe für die Vorzeichensetzung bei der kubischen Faktorisierung.",
                        plot4_type: "mnemonic_visual",
                        plot4_data: { mnemonic: "SOAP", meaning: ["Same (Gleich)", "Opposite (Entgegengesetzt)", "Always (Immer)", "Positive (Positiv)"] },

                        text4_1: "Eselsbrücke: SOAP (Selbes Vorzeichen, Entgegengesetztes Vorzeichen, Immer Positiv).",

                        // Beispiel: Differenz von Kuben
                        ex4_1_title: "Beispiel (Kuben)",
                        ex4_1_problem: "Faktorisiere $8x^3 - 27$.",
                        ex4_1_step1: "Identifiziere Kuben: $(2x)^3 - 3^3$. Also $a=2x, b=3$.",
                        ex4_1_step2: "Wende SOAP an: $(2x - 3)((2x)^2 + (2x)(3) + 3^2)$.",
                        ex4_1_solution: "Ergebnis: $(2x - 3)(4x^2 + 6x + 9)$.",

                        // --- AC Methode ---
                        def4_2_title: "Quadratische Trinome (AC-Methode)",
                        text4_2: "Für $ax^2 + bx + c$, finde zwei Zahlen, die multipliziert $a \\cdot c$ und addiert $b$ ergeben. Spalte den mittleren Term und verwende Gruppierung.",

                        // Beispiel: AC Methode
                        ex4_2_title: "Beispiel (AC-Methode)",
                        ex4_2_problem: "Faktorisiere $3x^2 + 10x + 8$.",
                        ex4_2_step1: "Multipliziere $a \\cdot c$: $3(8) = 24$. Finde Faktoren von 24, die 10 ergeben: 6 und 4.",
                        ex4_2_step2: "Spalte mittleren Term: $3x^2 + 6x + 4x + 8$.",
                        ex4_2_step3: "Gruppiere: $3x(x + 2) + 4(x + 2)$.",
                        ex4_2_solution: "Ergebnis: $(3x + 4)(x + 2)$."
                    },
                    example_section: {
                        title_ex: "Beispiele mit Schritt-für-Schritt-Lösungen",
                        ex1: {
                            title: "1. GGT & Differenz zweier Quadrate",
                            problem: "Faktorisiere vollständig:",
                            problem_math: `3x^3 - 27x`,
                            step1_title: "Schritt 1: GGT ausklammern",
                            step1_desc: "Beide Terme sind durch $3x$ teilbar.",
                            step1_math: `3x(x^2 - 9)`,
                            step2_title: "Schritt 2: Muster identifizieren",
                            step2_desc: "Innerhalb der Klammer ist $x^2 - 9$ eine Differenz zweier Quadrate ($x^2 - 3^2$).",
                            step2_math: `(x - 3)(x + 3)`,
                            result_title: "Endergebnis",
                            result: `3x(x - 3)(x + 3)`
                        },
                        ex2: {
                            title: "2. Faktorisierung durch Gruppierung",
                            problem: "Faktorisiere das Polynom mit vier Termen:",
                            problem_math: `x^3 + 4x^2 + 3x + 12`,
                            step1_title: "Schritt 1: Terme gruppieren",
                            step1_desc: "Gruppiere $(x^3 + 4x^2)$ und $(3x + 12)$.",
                            step2_title: "Schritt 2: GGT aus Gruppen ausklammern",
                            step2_math: `x^2(x + 4) + 3(x + 4)`,
                            step3_title: "Schritt 3: Gemeinsames Binom ausklammern",
                            step3_desc: "Der Term $(x+4)$ ist beiden Teilen gemeinsam.",
                            result_title: "Endergebnis",
                            result: `(x^2 + 3)(x + 4)`
                        },
                        ex3: {
                            title: "3. Die AC-Methode (Trinome)",
                            problem: "Faktorisiere:",
                            problem_math: `2x^2 + 7x + 3`,
                            step1_title: "Schritt 1: Multipliziere A und C",
                            step1_desc: "$A=2, C=3$. Das Produkt ist $6$. Wir brauchen Faktoren von 6, die $B=7$ ergeben.",
                            step1_math: `\\text{Faktoren: } 6 \\text{ und } 1 \\quad (6 \\cdot 1 = 6, \\; 6+1 = 7)`,
                            step2_title: "Schritt 2: Mittleren Term spalten",
                            step2_math: `2x^2 + 6x + 1x + 3`,
                            step3_title: "Schritt 3: Gruppieren und Lösen",
                            step3_desc: "Faktorisiere durch Gruppierung.",
                            step3_math: `2x(x + 3) + 1(x + 3)`,
                            result_title: "Endergebnis",
                            result: `(2x + 1)(x + 3)`
                        }
                    }
                }
            }
        },
        roots_zeros: {
            title: "Wurzeln und Nullstellen",
            description: "Brückenschlag zwischen Algebra und Geometrie: Finden der exakten Werte, bei denen ein Polynom gleich Null ist, und Verstehen des Fundamentalsatzes der Algebra.",
            lessons: {
                lesson4_title: "Sätze & Lösungsstrategien",
                lesson4: {
                    section1: {
                        title1: "Der Fundamentalsatz & Faktorsatz",
                        def1_1: "Der Fundamentalsatz der Algebra: Jedes Polynom vom Grad $n$ hat genau $n$ komplexe Wurzeln (unter Berücksichtigung der Vielfachheit).",
                        text1_1: "Dies garantiert, dass eine Gleichung 5. Grades genau 5 Lösungen hat.",

                        // Plot: Wurzeln vs Faktoren
                        plot1_title: "Verbindung: Wurzeln & Faktoren",
                        plot1_desc: "Wenn der Graph die x-Achse bei $c=2$ schneidet, dann ist $(x-2)$ ein Faktor des Polynoms.",
                        plot1_type: "root_factor_visual",
                        plot1_data: {
                            root: 2,
                            factor: "(x - 2)",
                            function: "(x-2)(x+1)(x-4)",
                            domain: [-2, 5]
                        },
                        plot1_description: "- faktor",
                        def1_2: "Der Faktorsatz:",
                        math1_1: `P(c) = 0 \\iff (x - c) \\text{ ist ein Faktor von } P(x)`,
                        text1_2: "Dies liefert eine direkte Verbindung zwischen algebraischen Faktoren und geometrischen x-Achsenabschnitten."
                    },
                    section2: {
                        title2: "Satz über rationale Nullstellen",
                        def2_1: "Eine Strategie, um eine Liste *möglicher* rationaler Wurzeln zu finden, wenn das Polynom ganzzahlige Koeffizienten hat.",

                        math2_1: `\\text{Mögliche Wurzeln} = \\pm \\frac{\\text{Faktoren des konstanten Terms } (p)}{\\text{Faktoren des Leitkoeffizienten } (q)}`,

                        step2_1: "1. Liste alle Faktoren des konstanten Terms ($p$).",
                        step2_2: "2. Liste alle Faktoren des Leitkoeffizienten ($q$).",
                        step2_3: "3. Bilde alle Brüche $p/q$ und teste sie mittels synthetischer Division.",

                        // Beispiel: Satz über rationale Nullstellen
                        ex2_1_title: "Beispiel (Kandidaten finden)",
                        ex2_1_problem: "Finde mögliche rationale Wurzeln für $2x^3 + x^2 - 13x + 6$.",
                        ex2_1_step1: "Konstante $p = 6$. Faktoren: $\\pm 1, \\pm 2, \\pm 3, \\pm 6$.",
                        ex2_1_step2: "Leitkoeff. $q = 2$. Faktoren: $\\pm 1, \\pm 2$.",
                        ex2_1_step3: "Bilde Verhältnisse $p/q$: $\\pm 1, \\pm 2, \\pm 3, \\pm 6, \\pm 1/2, \\pm 3/2$.",
                        ex2_1_solution: "Dies sind die einzigen möglichen rationalen Wurzeln zum Testen."
                    },
                    section3: {
                        title3: "Vielfachheit",
                        def3_1: "Vielfachheit bezieht sich darauf, wie oft ein spezifischer Faktor in der Polynomfaktorisierung vorkommt.",
                        math3_1: `P(x) = (x - 2)^3 (x + 1)^2`,

                        // Plot: Verhalten bei Vielfachheit
                        plot3_title: "Visualisierung der Vielfachheit",
                        plot3_desc: "Bei x=1 (ungerade Potenz ^1) schneidet der Graph. Bei x=2 (gerade Potenz ^2) prallt der Graph ab.",
                        plot3_type: "multiplicity_visual",
                        plot3_data: {
                            function: "(x-1)(x-2)^2",
                            roots: [
                                { x: 1, type: "cross", label: "Ungerade (Schneidet)" },
                                { x: 2, type: "bounce", label: "Gerade (Prallt ab)" }
                            ]
                        },

                        list3_1: "Ungerade Vielfachheit (z.B. ^1, ^3): Der Graph **schneidet** die x-Achse.",
                        list3_2: "Gerade Vielfachheit (z.B. ^2, ^4): Der Graph **berührt** (prallt ab von) der x-Achse.",

                        // Beispiel: Vielfachheit
                        ex3_1_title: "Beispiel (Graphverhalten)",
                        ex3_1_problem: "Beschreibe das Verhalten von $f(x) = (x+3)^2 (x-1)^3$ an den Achsenabschnitten.",
                        ex3_1_step1: "Wurzel $x=-3$: Vielfachheit 2 (Gerade). Graph prallt ab.",
                        ex3_1_step2: "Wurzel $x=1$: Vielfachheit 3 (Ungerade). Graph schneidet."
                    },
                    section4: {
                        title4: "Komplexe Wurzeln",
                        def4_1: "Wenn ein Polynom reelle Koeffizienten hat, treten komplexe Wurzeln immer in konjugierten Paaren auf.",
                        math4_2: `\\text{Wenn } a + bi \\text{ eine Wurzel ist, dann ist } a - bi \\text{ auch eine Wurzel.}`,
                        text4_1: "Dies erklärt, warum Polynome ungeraden Grades mindestens eine reelle Wurzel haben müssen (komplexe Wurzeln verbrauchen Grad in 2er-Paaren).",

                        // Beispiel: Komplexe Konjugierte
                        ex4_1_title: "Beispiel (Wurzeln finden)",
                        ex4_1_problem: "Ein kubisches Polynom hat die Wurzeln $3$ und $2 - i$. Finde die dritte Wurzel.",
                        ex4_1_solution: "Da komplexe Wurzeln paarweise auftreten, muss die dritte Wurzel das Konjugat sein: $2 + i$."
                    },
                    example_section: {
                        title_ex: "Beispiele mit Schritt-für-Schritt-Lösungen",
                        ex1: {
                            title: "1. Verwendung des Satzes über rationale Nullstellen",
                            problem: "Finde alle möglichen rationalen Wurzeln für:",
                            problem_math: `P(x) = 2x^3 + x^2 - 13x + 6`,
                            step1_title: "Schritt 1: Identifiziere p und q",
                            step1_desc: "Faktoren des konstanten Terms (6): $p = 1, 2, 3, 6$. Faktoren des Leitkoeff. (2): $q = 1, 2$.",
                            step2_title: "Schritt 2: Kombinationen auflisten",
                            step2_desc: "Nimm jedes p geteilt durch jedes q.",
                            step2_math: `\\pm \\frac{1, 2, 3, 6}{1} \\implies \\pm 1, \\pm 2, \\pm 3, \\pm 6 \\\\ \\pm \\frac{1, 2, 3, 6}{2} \\implies \\pm \\frac{1}{2}, \\pm \\frac{3}{2} \\quad (1 \\text{ und } 3 \\text{ sind Duplikate})`,
                            result_title: "Endergebnis",
                            result: `\\text{Kandidaten: } \\pm 1, \\pm 2, \\pm 3, \\pm 6, \\pm \\frac{1}{2}, \\pm \\frac{3}{2}`
                        },
                        ex2: {
                            title: "2. Lösen mit dem Faktorsatz",
                            problem: "Ist $(x-2)$ ein Faktor von $P(x) = x^3 - 4x^2 + 3x + 2$?",
                            step1_title: "Schritt 1: Satz anwenden",
                            step1_desc: "Wenn $(x-2)$ ein Faktor ist, dann muss $P(2)$ gleich 0 sein.",
                            step2_title: "Schritt 2: P(2) auswerten",
                            step2_math: `P(2) = (2)^3 - 4(2)^2 + 3(2) + 2 \\\\ = 8 - 16 + 6 + 2 \\\\ = 0`,
                            step3_title: "Schritt 3: Schlussfolgerung",
                            step3_desc: "Da der Rest 0 ist, ist es ein Faktor.",
                            result_title: "Endergebnis",
                            result: "Ja, $(x-2)$ ist ein Faktor."
                        },
                        ex3: {
                            title: "3. Analyse der Vielfachheit aus faktorisierter Form",
                            problem: "Beschreibe das Verhalten des Graphen an den Achsenabschnitten:",
                            problem_math: `P(x) = -2(x - 3)^2 (x + 1)^3`,
                            step1_title: "Schritt 1: Wurzeln identifizieren",
                            step1_desc: "Die Wurzeln sind bei $x = 3$ und $x = -1$.",
                            step2_title: "Schritt 2: Vielfachheit prüfen",
                            step2_math: `\\text{Bei } x=3: \\text{ Potenz ist 2 (Gerade)} \\\\ \\text{Bei } x=-1: \\text{ Potenz ist 3 (Ungerade)}`,
                            step3_title: "Schritt 3: Verhalten bestimmen",
                            result_title: "Endergebnis",
                            result: "Bei $x=3$ berührt/prallt der Graph ab. Bei $x=-1$ schneidet der Graph die Achse."
                        }
                    }
                }
            }
        },
        polynomial_equations: {
            title: "Polynomgleichungen",
            description: "Finden der Werte von x, die die Gleichung wahr machen: von einfachen linearen Isolationen bis hin zum Lösen komplexer Probleme höheren Grades.",
            lessons: {
                lesson5_title: "Lösungsstrategien & Anwendungen",
                lesson5: {
                    section1: {
                        title1: "Lineare Gleichungen (Grad 1)",
                        def1_1: "Die einfachste Form einer Polynomgleichung.",

                        // Plot: Visualisierung Gleichungslösen
                        plot1_title: "Isolieren der Variable",
                        plot1_desc: "Löse $2x - 6 = 0$. Um x allein zu bekommen, müssen wir die Konstante (-6) verschieben und dann durch den Koeffizienten (2) teilen.",
                        plot1_type: "linear_solver_visual",
                        plot1_data: {
                            equation: "2x - 6 = 0",
                            step1: "Addiere 6 auf beiden Seiten -> 2x = 6",
                            step2: "Teile durch 2 -> x = 3",
                            root: 3
                        },

                        math1_1: `ax + b = 0 \\implies x = -\\frac{b}{a}`,
                        text1_1: "Das Ziel ist einfach, die Variable mittels Umkehroperationen zu isolieren (Addieren/Subtrahieren, dann Multiplizieren/Dividieren).",

                        // Beispiel: Linear
                        ex1_1_title: "Beispiel (Linear)",
                        ex1_1_problem: "Löse $3x + 7 = 22$.",
                        ex1_1_step1: "Subtrahiere 7 von beiden Seiten: $3x = 15$.",
                        ex1_1_step2: "Teile durch 3: $x = 5$.",
                        ex1_1_solution: "Lösung: $x = 5$."
                    },
                    section2: {
                        title2: "Quadratische Gleichungen (Grad 2)",
                        def2_1: "Standardform: $ax^2 + bx + c = 0$.",

                        def2_2_title: "Methode 1: Faktorisierung (Nullproduktregel)",
                        text2_1: "Wenn $(x-r)(x-s) = 0$, dann ist $x=r$ oder $x=s$. Dies ist die schnellste Methode, wenn die Zahlen schön sind.",

                        // Beispiel: Faktorisierung
                        ex2_1_title: "Beispiel (Faktorisierung)",
                        ex2_1_problem: "Löse $x^2 - 5x + 6 = 0$.",
                        ex2_1_step1: "Finde Zahlen, die multipliziert 6 und addiert -5 ergeben: (-2, -3).",
                        ex2_1_step2: "Faktorisiere: $(x - 2)(x - 3) = 0$.",
                        ex2_1_solution: "Wurzeln: $x = 2, x = 3$.",

                        def2_3_title: "Methode 2: Die Mitternachtsformel",
                        text2_2: "Verwendet, wenn Faktorisierung schwierig oder unmöglich ist. Sie funktioniert für *jede* quadratische Gleichung.",
                        math2_1: `x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}`,

                        // Beispiel: Mitternachtsformel
                        ex2_2_title: "Beispiel (Mitternachtsformel)",
                        ex2_2_problem: "Löse $2x^2 + 5x - 3 = 0$.",
                        ex2_2_step1: "Identifiziere $a=2, b=5, c=-3$.",
                        ex2_2_step2: "Diskriminante: $5^2 - 4(2)(-3) = 25 + 24 = 49$.",
                        ex2_2_step3: "Formel: $\\frac{-5 \\pm 7}{4}$.",
                        ex2_2_solution: "Wurzeln: $x = \\frac{1}{2}, x = -3$.",

                        def2_4_title: "Die Diskriminante ($\\Delta$)",
                        text2_3: "Der Wert unter der Wurzel ($b^2 - 4ac$) sagt uns etwas über die Lösungen:",

                        // Plot: Fälle der Diskriminante
                        plot2_title: "Die Diskriminante & Wurzeln",
                        plot2_desc: "Blau (Pos): 2 Wurzeln. Grün (Null): 1 Wurzel. Rot (Neg): Keine reellen Wurzeln.",
                        plot2_type: "multi_function",
                        plot2_domain: [-4, 4],
                        plot2_functions: [
                            { expression: "x^2 - 4", color: "blue", label: "D > 0 (2 Reelle)" },
                            { expression: "x^2", color: "green", label: "D = 0 (1 Reelle)" },
                            { expression: "x^2 + 2", color: "red", label: "D < 0 (0 Reelle)" }
                        ],

                        list2_1: "$\\Delta > 0$: Zwei verschiedene reelle Lösungen (Schneidet x-Achse zweimal).",
                        list2_2: "$\\Delta = 0$: Eine doppelte reelle Lösung (Berührt x-Achse einmal).",
                        list2_3: "$\\Delta < 0$: Zwei komplexe (imaginäre) Lösungen (Berührt x-Achse nie)."
                    },
                    section3: {
                        title3: "Kubische Gleichungen und höheren Grades",
                        def3_1: "Strategie: Reduziere den Grad.",

                        step3_1: "1. Gibt es einen GGT? Klammere ihn aus.",
                        step3_2: "2. Kannst du Gruppierung verwenden? (Üblich bei kubischen Gl. mit 4 Termen).",
                        step3_3: "3. Wenn nicht, verwende den Satz über rationale Nullstellen und synthetische Division, um das Polynom auf ein Quadratisches zu reduzieren.",

                        text3_1: "Sobald du einen quadratischen Quotienten erreichst, löse ihn mit der Mitternachtsformel.",

                        // Beispiel: Lösen einer Kubischen
                        ex3_1_title: "Beispiel (Lösen höheren Grades)",
                        ex3_1_problem: "Löse $x^3 - 2x^2 - 5x + 6 = 0$.",
                        ex3_1_step1: "Teste rationale Wurzeln. Versuche $x=1$: $1 - 2 - 5 + 6 = 0$. Es funktioniert!",
                        ex3_1_step2: "Synthetische Division durch 1: Koeffizienten [1, -2, -5, 6] $\\to$ Rest 0.",
                        ex3_1_step3: "Reduziertes Polynom: $x^2 - x - 6 = 0$.",
                        ex3_1_step4: "Löse Quadratisch: Faktorisiere $(x-3)(x+2) = 0$.",
                        ex3_1_solution: "Wurzeln: $x = 1, x = 3, x = -2$."
                    },
                    section4: {
                        title4: "Textaufgaben & Modellierung",
                        def4_1: "Übersetzen von Deutsch in Mathe.",

                        // Plot: Wurfbewegung
                        plot4_title: "Wurfbewegung",
                        plot4_desc: "Der Pfad eines in die Luft geworfenen Objekts folgt einer parabolischen Kurve ($h(t) = -16t^2 + vt + h$). Die maximale Höhe ist der Scheitelpunkt; das Auftreffen auf den Boden ist die Nullstelle.",
                        plot4_type: "projectile_motion_visual",
                        plot4_data: {
                            function: "-16*t^2 + 64*t",
                            domain: [0, 4],
                            points: [
                                { x: 2, y: 64, label: "Max Höhe" },
                                { x: 4, y: 0, label: "Boden" }
                            ]
                        },

                        list4_1: "Flächenprobleme: Länge $\\times$ Breite ($x(x+5) = Fläche$).",
                        list4_2: "Wurfbewegung: Höhe über Zeit ($h(t) = -16t^2 + v_0t + h_0$).",
                        list4_3: "Volumen: Volumen einer Box ($V = l \\cdot w \\cdot h$).",

                        // Beispiel: Flächenproblem
                        ex4_1_title: "Beispiel (Geometrie)",
                        ex4_1_problem: "Die Länge eines Rechtecks ist 3 mehr als seine Breite. Die Fläche ist 40. Finde die Maße.",
                        ex4_1_step1: "Sei $w = x$. Dann $l = x+3$.",
                        ex4_1_step2: "Gleichung: $x(x+3) = 40 \\implies x^2 + 3x - 40 = 0$.",
                        ex4_1_step3: "Faktorisiere: $(x+8)(x-5) = 0$.",
                        ex4_1_solution: "x kann keine negative Länge sein (-8). Also Breite = 5, Länge = 8."
                    },
                    example_section: {
                        title_ex: "Beispiele mit Schritt-für-Schritt-Lösungen",
                        ex1: {
                            title: "1. Mitternachtsformel",
                            problem: "Löse nach x auf (exakte Antworten):",
                            problem_math: `3x^2 - 5x - 7 = 0`,
                            step1_title: "Schritt 1: Koeffizienten identifizieren",
                            step1_desc: "$a = 3, \\; b = -5, \\; c = -7$.",
                            step2_title: "Schritt 2: In Formel einsetzen",
                            step2_math: `x = \\frac{-(-5) \\pm \\sqrt{(-5)^2 - 4(3)(-7)}}{2(3)}`,
                            step3_title: "Schritt 3: Vereinfachen",
                            step3_math: `x = \\frac{5 \\pm \\sqrt{25 + 84}}{6} = \\frac{5 \\pm \\sqrt{109}}{6}`,
                            result_title: "Endergebnis",
                            result: "Die zwei Wurzeln sind $\\frac{5 + \\sqrt{109}}{6}$ und $\\frac{5 - \\sqrt{109}}{6}$."
                        },
                        ex2: {
                            title: "2. Lösen einer Kubischen durch Gruppierung",
                            problem: "Finde alle Wurzeln:",
                            problem_math: `x^3 - 2x^2 - 9x + 18 = 0`,
                            step1_title: "Schritt 1: Terme gruppieren",
                            step1_desc: "Gruppiere die ersten zwei und letzten zwei.",
                            step1_math: `(x^3 - 2x^2) - (9x - 18) = 0`,
                            step2_title: "Schritt 2: GGT ausklammern",
                            step2_math: `x^2(x - 2) - 9(x - 2) = 0`,
                            step3_title: "Schritt 3: Gemeinsames Binom extrahieren",
                            step3_math: `(x^2 - 9)(x - 2) = 0`,
                            step4_title: "Schritt 4: Faktoren lösen",
                            step4_desc: "$x^2 - 9$ ist eine Differenz zweier Quadrate $(x-3)(x+3)$.",
                            result_title: "Endergebnis",
                            result: `x = 2, \\; x = 3, \\; x = -3`
                        },
                        ex3: {
                            title: "3. Optimierungs-Textaufgabe",
                            problem: "Ein rechteckiger Garten hat eine Fläche von 40 m². Die Länge ist 3m mehr als die Breite. Finde die Maße.",
                            problem_math: `\\text{Fläche} = 40, \\quad L = W + 3`,
                            step1_title: "Schritt 1: Gleichung aufstellen",
                            step1_math: `W(W + 3) = 40 \\implies W^2 + 3W - 40 = 0`,
                            step2_title: "Schritt 2: Nach W auflösen",
                            step2_desc: "Faktorisiere die Quadratische. Faktoren von -40, die 3 ergeben, sind +8 und -5.",
                            step2_math: `(W + 8)(W - 5) = 0`,
                            step3_title: "Schritt 3: Ungültige Lösungen verwerfen",
                            step3_desc: "$W = -8$ oder $W = 5$. Breite kann nicht negativ sein, also $W = 5$.",
                            result_title: "Endergebnis",
                            result: "Breite = 5m, Länge = 8m."
                        }
                    }
                }
            }
        },
        real_world_applications: {
            title: "Anwendungen in der realen Welt",
            description: "Polynome in Aktion sehen: Modellierung des physischen Raums, Analyse von Bewegung, Optimierung von Geschäftsgewinnen und Anpassung von Datentrends.",
            lessons: {
                lesson6_title: "Modellierung & Problemlösung",
                lesson6: {
                    section1: {
                        title1: "Fläche & Volumen (Geometrie)",
                        def1_1: "Polynome beschreiben die Dimensionen geometrischer Formen, wenn Variablen involviert sind.",
                        text1_1: "Häufiges Szenario: Erstellen einer Box aus einem flachen Blatt durch Ausschneiden von Ecken der Größe 'x'.",
                        math1_1: `V(x) = x(L - 2x)(W - 2x)`,

                        // Plot: Box-Problem Diagramm
                        plot1_title: "Visualisierung des Schnitts",
                        plot1_desc: "Ein flaches Stück Pappe mit ausgeschnittenen Ecken. Das Hochklappen der Laschen erzeugt eine 3D-Box.",
                        plot1_type: "box_cut_visual",
                        plot1_data: {
                            sheet_width: 12,
                            sheet_height: 12,
                            cut_size: "x",
                            folded_dim: "(12-2x) by (12-2x) by x"
                        },
                        caption: "Ecken schneiden → Falten → Box!",
                        text1_2: "Hier wird $V(x)$ zu einem kubischen Polynom (Grad 3). Das Finden des maximalen Volumens erfordert das Finden des Scheitelpunkts dieser Polynomkurve."
                    },
                    section2: {
                        title2: "Bewegungsprobleme (Physik)",
                        def2_1: "Wurfbewegung: Die Höhe eines in die Luft geworfenen Objekts wird durch ein quadratisches Polynom aufgrund der Schwerkraft modelliert.",
                        math2_1: `h(t) = -16t^2 + v_0t + h_0 \\quad (\\text{Imperiale Einheiten})`,
                        math2_2: `h(t) = -4.9t^2 + v_0t + h_0 \\quad (\\text{Metrische Einheiten})`,
                        list2_1: "$t$: Zeit in Sekunden.",
                        list2_2: "$v_0$: Anfangsgeschwindigkeit.",
                        list2_3: "$h_0$: Anfangshöhe.",

                        // Plot: Wurfparabel
                        plot2_title: "Parabolische Flugbahn",
                        plot2_desc: "Höhe über Zeit. Der Scheitelpunkt ist die maximale Höhe; der positive x-Achsenabschnitt ist der Aufprall.",
                        plot2_type: "projectile_motion_visual",
                        plot2_data: {
                            function: "-16*t^2 + 64*t + 5",
                            domain: [0, 4.1],
                            points: [
                                { x: 0, y: 5, label: "Start (h0)" },
                                { x: 2, y: 69, label: "Max Höhe" },
                                { x: 4.08, y: 0, label: "Aufprall" }
                            ]
                        },
                        max_height: "Max Höhe (Scheitelpunkt)",
                        impact: "Aufprall",
                        gravity: "Schwerkraft",
                        text2_1: "Das Lösen von $h(t) = 0$ sagt dir, wann das Objekt auf den Boden trifft."
                    },
                    section3: {
                        title3: "Geschäftsanwendungen (Wirtschaft)",
                        def3_1: "Polynome modellieren die finanzielle Gesundheit.",
                        math3_1: `P(x) = R(x) - C(x)`,
                        list3_1: "Umsatz $R(x)$: Preis $\\times$ Verkaufte Menge.",
                        list3_2: "Kosten $C(x)$: Fixkosten + Variable Kosten.",
                        list3_3: "Gewinn $P(x)$: Die Differenz zwischen Umsatz und Kosten.",

                        // Plot: Gewinnanalyse
                        plot3_title: "Visualisierung des Gewinns",
                        plot3_desc: "Der grüne Bereich ist Gewinn (wo Umsatz > Kosten). Die Spitze der Gewinnkurve ist der maximale Gewinn. Die Punkte, an denen Umsatz gleich Kosten ist, sind Break-Even-Punkte.",
                        plot3_type: "profit_loss_visual",
                        plot3_data: {
                            revenue: "-0.5*x^2 + 50*x", // Parabolischer Umsatz
                            cost: "10*x + 200",       // Lineare Kosten
                            profit: "-0.5*x^2 + 40*x - 200", // P(x)
                            domain: [0, 100],
                            break_even_points: [5.36, 74.64] // Wurzeln von P(x)
                        },
                        revenue: "Umsatz",
                        cost: "Kosten",
                        profit: "Gewinn",
                        break_even: "Break-Even",
                        text3_1: "Break-Even-Punkte: Die Wurzeln von $P(x)$ (wo Gewinn = 0).",
                        text3_2: "Um den Gewinn zu maximieren, finden wir den Scheitelpunkt der Gewinnparabel (für quadratische Modelle).",

                        // Beispiel: Max Gewinn
                        ex3_1_title: "Beispiel (Gewinn Maximieren)",
                        ex3_1_problem: "Umsatz ist $R(x) = 50x - 0.5x^2$ und Kosten sind $C(x) = 10x + 200$. Finde das Produktionsniveau $x$ für maximalen Gewinn.",
                        ex3_1_step1: "Gewinngleichung: $P(x) = (50x - 0.5x^2) - (10x + 200)$.",
                        ex3_1_step2: "Vereinfachen: $P(x) = -0.5x^2 + 40x - 200$.",
                        ex3_1_step3: "Finde Scheitelpunkt ($x = -b/2a$): $x = -40 / (2 \\cdot -0.5) = -40 / -1 = 40$.",
                        ex3_1_solution: "Maximiere Gewinn durch Produktion von 40 Einheiten."
                    },
                    section4: {
                        title4: "Ingenieurwesen & Datenmodellierung",
                        def4_1: "Kurvenanpassung (Regression): Ingenieure verwenden Polynome, um komplexe reale Datenpunkte anzunähern.",

                        // Plot: Kurvenanpassung
                        plot4_title: "Anpassung eines Trends",
                        plot4_desc: "Die roten Punkte sind reale Daten (Streudiagramm). Die blaue Linie ist ein Polynommodell (Regression), das zur Vorhersage zukünftiger Trends verwendet wird.",
                        plot4_type: "scatter_plot_fit",
                        plot4_data: {
                            points: [{ x: 1, y: 2 }, { x: 2, y: 5 }, { x: 3, y: 10 }, { x: 4, y: 17 }],
                            model: "x^2 + 1", // Passt Muster 1, 4, 9, 16 (+1)
                            prediction_point: { x: 5, y: 26 },
                            label: "Quadratische Anpassung"
                        },
                        data: "Daten",
                        prediction: "Vorhersage",
                        text4_1: "Ein Satz verstreuter Datenpunkte kann oft durch eine 'Linie der besten Anpassung' (Linear) oder eine Kurve (Quadratisch/Kubisch) modelliert werden, um zukünftige Ergebnisse vorherzusagen.",
                        warning4_1: "Overfitting: Die Verwendung eines Polynoms mit zu hohem Grad könnte eher das Rauschen als den Trend anpassen.",

                        // Beispiel: Modellierung
                        ex4_1_title: "Beispiel (Mustererkennung)",
                        ex4_1_problem: "Finde ein Polynommodell für die Sequenz: 2, 5, 10, 17...",
                        ex4_1_step1: "Erste Differenzen: $5-2=3, 10-5=5, 17-10=7$ (Nicht linear).",
                        ex4_1_step2: "Zweite Differenzen: $5-3=2, 7-5=2$ (Konstant).",
                        ex4_1_step3: "Konstante zweite Differenz impliziert ein quadratisches Modell ($n^2 + 1$).",
                        ex4_1_solution: "Modell: $y = x^2 + 1$."
                    },
                    example_section: {
                        title_ex: "Beispiele mit Schritt-für-Schritt-Lösungen",
                        ex1: {
                            title: "1. Wurfbewegung",
                            problem: "Eine Rakete wird vom Boden ($h_0=0$) mit einer Anfangsgeschwindigkeit $v_0 = 98$ m/s gestartet. Wann kehrt sie zur Erde zurück?",
                            problem_math: `h(t) = -4.9t^2 + 98t + 0`,
                            step1_title: "Schritt 1: Höhe auf Null setzen",
                            step1_desc: "Wir wollen $t$ finden, wenn $h(t) = 0$.",
                            step1_math: `-4.9t^2 + 98t = 0`,
                            step2_title: "Schritt 2: Faktorisieren",
                            step2_desc: "Klammere $t$ (oder $-4.9t$) aus.",
                            step2_math: `t(-4.9t + 98) = 0`,
                            step3_title: "Schritt 3: Nach t auflösen",
                            step3_desc: "Zwei Lösungen: $t = 0$ (Start) und $-4.9t + 98 = 0$.",
                            step3_math: `4.9t = 98 \\implies t = 20`,
                            result_title: "Endergebnis",
                            result: "Die Rakete trifft nach 20 Sekunden auf den Boden."
                        },
                        ex2: {
                            title: "2. Gewinn Maximieren",
                            problem: "Der Gewinn eines Unternehmens wird durch $P(x) = -x^2 + 100x - 900$ modelliert. Wie viele Einheiten ($x$) sollten verkauft werden, um den Gewinn zu maximieren?",
                            step1_title: "Schritt 1: Funktionstyp identifizieren",
                            step1_desc: "Dies ist eine nach unten geöffnete Parabel (Quadratisch). Das Maximum liegt beim Scheitelpunkt.",
                            step2_title: "Schritt 2: Scheitelpunktformel",
                            step2_math: `x = \\frac{-b}{2a}`,
                            step3_title: "Schritt 3: Koeffizienten einsetzen",
                            step3_desc: "$a = -1, b = 100$.",
                            step3_math: `x = \\frac{-100}{2(-1)} = \\frac{-100}{-2} = 50`,
                            result_title: "Endergebnis",
                            result: "Der Verkauf von 50 Einheiten bringt den maximalen Gewinn."
                        },
                        ex3: {
                            title: "3. Volumenkonstruktion",
                            problem: "Eine Box wird aus einem 10x8 Blatt hergestellt, indem Quadrate der Seite $x$ ausgeschnitten werden. Drücke das Volumenpolynom aus.",
                            problem_math: `V = L \\cdot W \\cdot H`,
                            step1_title: "Schritt 1: Dimensionen definieren",
                            step1_desc: "Höhe = $x$. Länge = $10 - 2x$. Breite = $8 - 2x$.",
                            step2_title: "Schritt 2: Gleichung aufstellen",
                            step2_math: `V(x) = x(10 - 2x)(8 - 2x)`,
                            step3_title: "Schritt 3: Ausmultiplizieren (Standardform)",
                            step3_desc: "Multipliziere zuerst Binome: $(80 - 20x - 16x + 4x^2)$. Dann multipliziere mit $x$.",
                            result_title: "Endergebnis",
                            result: `V(x) = 4x^3 - 36x^2 + 80x`
                        }
                    }
                }
            }
        },
    },
    pl: {
        polynomial_basics: {
            title: "Podstawy Wielomianów",
            description: "Cegiełki algebry: zrozumienie struktury, terminologii i klasyfikacji wielomianów.",
            lessons: {
                lesson1_title: "Struktura i Terminologia",
                lesson1: {
                    section1: {
                        title1: "Definicja i Terminologia",
                        def1_1: "Wielomian to wyrażenie matematyczne składające się ze zmiennych (zwanych też niewiadomymi) i współczynników, które obejmuje tylko operacje dodawania, odejmowania, mnożenia i nieujemnych całkowitych wykładników zmiennych.",
                        math1_1: `P(x) = a_n x^n + a_{n-1} x^{n-1} + \\dots + a_1 x + a_0`,

                        // Wykres: Anatomia Wielomianu
                        plot1_title: "Anatomia Wielomianu",
                        plot1_desc: "Wizualny rozkład wyrazu $3x^2$.",
                        plot1_type: "polynomial_anatomy",
                        plot1_data: {
                            expression: "3x^2",
                            labels: [
                                { text: "Współczynnik", target: "3", color: "blue" },
                                { text: "Zmienna", target: "x", color: "black" },
                                { text: "Wykładnik", target: "2", color: "red" },
                                { text: "Stopień", target: "2", color: "red" }
                            ]
                        },
                        text1_1: "Kluczowe Słownictwo:",
                        list1_1: "Wyraz: Każda część wielomianu oddzielona znakami + lub -.",
                        list1_2: "Współczynnik: Czynnik liczbowy wyrazu (np. w $5x^2$, 5 jest współczynnikiem).",
                        list1_3: "Stała: Wyraz bez zmiennej (stopień 0).",
                        warning1: "Wyrażenia z ujemnymi wykładnikami ($x^{-1}$) lub wykładnikami ułamkowymi ($\\sqrt{x}$) NIE są wielomianami."
                    },
                    section2: {
                        title2: "Stopień i Współczynnik Wiodący",
                        def2_1: "Stopień wielomianu to najwyższy wykładnik zmiennej obecny w wyrażeniu.",
                        def2_2: "Współczynnik Wiodący (WW) to współczynnik wyrazu o najwyższym stopniu.",

                        // Przykład: Stopień i WW
                        ex2_1_title: "Szybki Test",
                        ex2_1_problem: "Przeanalizuj wielomian $P(x) = 7x^3 - 2x + 5$.",
                        ex2_1_solution: "Najwyższa potęga to 3, więc **Stopień = 3**. Współczynnik przy $x^3$ to 7, więc **Współczynnik Wiodący = 7**.",

                        text2_1: "Stopień określa zachowanie końcowe wykresu (czy idzie w górę czy w dół w nieskończoności)."
                    },
                    section3: {
                        title3: "Postać Standardowa",
                        def3_1: "Wielomian jest w Postaci Standardowej, gdy jego wyrazy są uporządkowane od najwyższego do najniższego stopnia.",

                        // Przykład: Porządkowanie do Postaci Standardowej
                        ex3_1_title: "Przykład",
                        ex3_1_problem: "Przepisz $f(x) = 4 + x^3 - 2x$ w postaci standardowej.",
                        ex3_1_step1: "Zidentyfikuj stopnie: $4$ (st 0), $x^3$ (st 3), $-2x$ (st 1).",
                        ex3_1_solution: "Uporządkuj według stopnia (3, 1, 0): $f(x) = x^3 - 2x + 4$.",

                        math3_1: `\\text{Przykład: } f(x) = -2x^3 + 4x^2 - x + 7`,
                        text3_1: "Standardową praktyką jest zawsze przepisywanie wielomianów w ten sposób przed ich analizą."
                    },
                    section4: {
                        title4: "Rodzaje Wielomianów",
                        def4_1_title: "Klasyfikacja według Liczby Wyrazów",
                        list4_1: "Jednomian: 1 wyraz (np. $3x^2$)",
                        list4_2: "Dwumian: 2 wyrazy (np. $x + 5$)",
                        list4_3: "Trójmian: 3 wyrazy (np. $x^2 + 3x - 4$)",

                        def4_2_title: "Klasyfikacja według Stopnia",
                        list4_4: "Liniowy: Stopień 1 ($mx + b$)",
                        list4_5: "Kwadratowy: Stopień 2 ($ax^2 + bx + c$)",
                        list4_6: "Sześcienny: Stopień 3",

                        // Wykres: Porównanie Typów Wielomianów
                        plot4_title: "Porównanie Stopni",
                        plot4_desc: "Liniowy to linia prosta. Kwadratowy to parabola w kształcie U. Sześcienny to krzywa w kształcie S.",
                        plot4_type: "multi_function",
                        plot4_domain: [-3, 3],
                        plot4_functions: [
                            { expression: "x", color: "blue", label: "Liniowy (x)" },
                            { expression: "x^2", color: "green", label: "Kwadratowy (x^2)" },
                            { expression: "x^3", color: "red", label: "Sześcienny (x^3)" }
                        ]
                    },
                    section5: {
                        title5: "Równość Wielomianów",
                        def5_1: "Dwa wielomiany są równe wtedy i tylko wtedy, gdy mają ten sam stopień, a ich odpowiednie współczynniki są identyczne.",

                        // Przykład: Rozwiązywanie dla Stałych
                        ex5_1_title: "Przykład (Znajdowanie Stałych)",
                        ex5_1_problem: "Znajdź A i B, jeśli $2x + 5 = Ax + B$.",
                        ex5_1_step1: "Porównaj współczynniki x: $2 = A$.",
                        ex5_1_step2: "Porównaj wyrazy wolne: $5 = B$.",
                        ex5_1_solution: "Więc, $A=2$ i $B=5$.",

                        math5_1: `Ax^2 + Bx + C = 2x^2 - 5x + 1 \\implies A=2, B=-5, C=1`,
                        text5_1: "Ta zasada jest często używana do rozwiązywania nieznanych stałych."
                    },
                    example_section: {
                        title_ex: "Przykłady z Rozwiązaniami Krok po Kroku",
                        ex1: {
                            title: "1. Postać Standardowa i Identyfikacja",
                            problem: "Przepisz w postaci standardowej i zidentyfikuj stopień oraz współczynnik wiodący.",
                            problem_math: `P(x) = 4 - 2x + 7x^5 - 3x^2`,
                            step1_title: "Krok 1: Zidentyfikuj Wykładniki",
                            step1_desc: "Potęgi to 0 (stała), 1 ($2x$), 5 ($7x^5$) i 2 ($-3x^2$).",
                            step2_title: "Krok 2: Przeorganizuj",
                            step2_desc: "Umieść wyrazy w kolejności malejących potęg: 5, potem 2, potem 1, potem 0.",
                            step2_math: `P(x) = 7x^5 - 3x^2 - 2x + 4`,
                            step3_title: "Krok 3: Zidentyfikuj Stopień i WW",
                            step3_desc: "Najwyższa potęga to 5. Liczba przed $x^5$ to 7.",
                            result_title: "Odpowiedź Końcowa",
                            result: "Stopień: 5, Współczynnik Wiodący: 7."
                        },
                        ex2: {
                            title: "2. Walidacja Wielomianów",
                            problem: "Które z poniższych są wielomianami?",
                            problem_math: `A) \\; 3x^2 + 2x^{-1} \\quad B) \\; 5\\sqrt{x} + 2 \\quad C) \\; \\frac{1}{2}x^3 - \\pi`,
                            step1_title: "Krok 1: Analizuj Wykładniki",
                            step1_desc: "Wielomiany muszą mieć nieujemne całkowite wykładniki (0, 1, 2, ...).",
                            step2_title: "Krok 2: Sprawdź Każdy Przypadek",
                            step2_math: `A: x^{-1} \\text{ ma ujemny wykładnik. (Nie wielomian)} \\\\ B: \\sqrt{x} = x^{1/2} \\text{ ma ułamek. (Nie wielomian)} \\\\ C: \\text{Współczynniki mogą być ułamkami (1/2) lub niewymierne (}\\pi\\text{). Potęgi są całkowite.}`,
                            result_title: "Odpowiedź Końcowa",
                            result: "Tylko C jest wielomianem."
                        },
                        ex3: {
                            title: "3. Znajdowanie Współczynników (Równość)",
                            problem: "Znajdź A i B, jeśli równanie jest prawdziwe dla każdego x:",
                            problem_math: `2x(x + 3) = Ax^2 + Bx`,
                            step1_title: "Krok 1: Rozwiń Lewą Stronę",
                            step1_desc: "Rozdziel $2x$.",
                            step1_math: `2x \\cdot x + 2x \\cdot 3 = 2x^2 + 6x`,
                            step2_title: "Krok 2: Porównaj Współczynniki",
                            step2_math: `2x^2 + 6x = Ax^2 + Bx`,
                            step3_title: "Krok 3: Dopasuj Wyrazy",
                            step3_desc: "Wyraz $x^2$ pasuje do A. Wyraz $x$ pasuje do B.",
                            result_title: "Odpowiedź Końcowa",
                            result: `A = 2, \\quad B = 6`
                        }
                    }
                }
            }
        },
        polynomial_operations: {
            title: "Działania na Wielomianach",
            description: "Opanowanie arytmetyki wielomianów: dodawanie, odejmowanie, mnożenie i dwie potężne metody dzielenia.",
            lessons: {
                lesson2_title: "Arytmetyka i Algorytmy Dzielenia",
                lesson2: {
                    section1: {
                        title1: "Dodawanie i Odejmowanie",
                        def1_1: "Złota Zasada: Możesz dodawać lub odejmować tylko Wyrazy Podobne.",
                        def1_2: "Wyrazy Podobne to wyrazy, które mają dokładnie tę samą zmienną podniesioną do dokładnie tej samej potęgi.",

                        // Wykres: Grupowanie Wyrazów Podobnych
                        plot1_title: "Wizualizacja Wyrazów Podobnych",
                        plot1_desc: "Grupujemy wyrazy według ich części zmiennych. Wyrazy z $x^2$ idą razem, wyrazy z $x$ idą razem.",
                        plot1_type: "polynomial_grouping",
                        plot1_data: {
                            expression: "(2x^2 + 3x) + (4x^2 - x)",
                            groups: [
                                { terms: ["2x^2", "4x^2"], color: "red", label: "Kwadratowe" },
                                { terms: ["3x", "-x"], color: "blue", label: "Liniowe" }
                            ]
                        },

                        math1_1: `3x^2 + 5x^2 = 8x^2 \\quad \\text{(Poprawnie)}`,
                        math1_2: `3x^2 + 5x = \\text{Nie można połączyć}`,
                        text1_1: "Przy odejmowaniu wielomianów pamiętaj, aby rozdzielić znak minus na każdy wyraz w drugim wielomianie.",

                        // Przykład: Odejmowanie
                        ex1_1_title: "Przykład (Odejmowanie)",
                        ex1_1_problem: "Uprość $(5x^2 + 2x - 1) - (3x^2 - 4x + 2)$.",
                        ex1_1_step1: "Rozdziel minus: $5x^2 + 2x - 1 - 3x^2 + 4x - 2$.",
                        ex1_1_step2: "Grupuj wyrazy podobne: $(5x^2 - 3x^2) + (2x + 4x) + (-1 - 2)$.",
                        ex1_1_solution: "Wynik: $2x^2 + 6x - 3$."
                    },
                    section2: {
                        title2: "Mnożenie",
                        def2_1: "Mnożenie opiera się na Własności Rozdzielności i Regule Potęg: $x^a \\cdot x^b = x^{a+b}$.",
                        list2_1: "Jednomian × Wielomian: Rozdziel pojedynczy wyraz na wszystkie wyrazy wewnątrz.",
                        list2_2: "Dwumian × Dwumian: Użyj metody FOIL (Pierwszy, Zewnętrzny, Wewnętrzny, Ostatni).",
                        list2_3: "Mnożenie Ogólne: Pomnóż każdy wyraz pierwszego wielomianu przez każdy wyraz drugiego.",

                        // Wykres: Metoda Pudełkowa (Model Pola)
                        plot2_title: "Metoda Pudełkowa (Model Pola)",
                        plot2_desc: "Wizualizacja $(x+2)(x+3)$. Pole czterech wewnętrznych prostokątów sumuje się do iloczynu.",
                        plot2_type: "polynomial_box_method",
                        plot2_data: {
                            top_labels: ["x", "+3"],
                            side_labels: ["x", "+2"],
                            cells: [
                                { val: "x^2", color: "light-blue" }, { val: "3x", color: "light-green" },
                                { val: "2x", color: "light-green" }, { val: "6", color: "light-yellow" }
                            ]
                        },

                        // Przykład: Mnożenie Dwumianów
                        ex2_1_title: "Przykład (FOIL)",
                        ex2_1_problem: "Pomnóż $(2x + 1)(x - 5)$.",
                        ex2_1_step1: "Pierwszy: $2x \\cdot x = 2x^2$. Zewnętrzny: $2x \\cdot -5 = -10x$.",
                        ex2_1_step2: "Wewnętrzny: $1 \\cdot x = 1x$. Ostatni: $1 \\cdot -5 = -5$.",
                        ex2_1_step3: "Połącz wyrazy podobne (-10x + 1x).",
                        ex2_1_solution: "Wynik: $2x^2 - 9x - 5$."
                    },
                    section3: {
                        title3: "Dzielenie Pisemne Wielomianów",
                        def3_1: "Używane do dzielenia wielomianu przez inny wielomian dowolnego stopnia. Postępuje zgodnie z tym samym algorytmem co arytmetyczne dzielenie pisemne.",

                        step3_1: "1. Podziel: Podziel wiodący wyraz dzielnej przez wiodący wyraz dzielnika.",
                        step3_2: "2. Pomnóż: Pomnóż wynik przez cały dzielnik.",
                        step3_3: "3. Odejmij: Odejmij ten wynik od oryginału (odwróć znaki!).",
                        step3_4: "4. Spuść: Spuść następny wyraz i powtórz.",

                        math3_1: `\\frac{P(x)}{D(x)} = Q(x) + \\frac{R(x)}{D(x)}`,
                        text3_1: "Gdzie Q to Iloraz, R to Reszta, a D to Dzielnik.",

                        // Przykład: Dzielenie Pisemne
                        ex3_1_title: "Przykład (Dzielenie Pisemne)",
                        ex3_1_problem: "Podziel $2x^2 + 7x + 6$ przez $x + 2$.",
                        ex3_1_step1: "Podziel: $2x^2 \\div x = 2x$. Napisz $2x$ na górze.",
                        ex3_1_step2: "Pomnóż: $2x(x + 2) = 2x^2 + 4x$.",
                        ex3_1_step3: "Odejmij: $(2x^2 + 7x) - (2x^2 + 4x) = 3x$. Spuść $+6$.",
                        ex3_1_step4: "Powtórz: $3x \\div x = 3$. Pomnóż $3(x+2) = 3x + 6$. Odejmij, aby otrzymać $0$.",
                        ex3_1_solution: "Iloraz to $2x + 3$ z Resztą $0$."
                    },
                    section4: {
                        title4: "Dzielenie Syntetyczne",
                        def4_1: "Skrócona metoda dzielenia, która wykorzystuje tylko współczynniki. Jest szybsza, ale ma ścisłe wymaganie.",
                        warning4_1: "Ograniczenie: Dzielenie Syntetyczne działa tylko przy dzieleniu przez liniowy dwumian postaci $(x - c)$.",

                        step4_1: "1. Ustawienie: Napisz 'c' na zewnątrz (jeśli dzielisz przez $x-3$, użyj 3). Napisz współczynniki wewnątrz.",
                        step4_2: "2. Spuść: Spuść pierwszy współczynnik prosto w dół.",
                        step4_3: "3. Pomnóż i Dodaj: Pomnóż dolną liczbę przez 'c', umieść w następnej kolumnie, dodaj w dół.",
                        text4_2: "Liczby w dolnym rzędzie reprezentują współczynniki ilorazu (który jest zawsze o jeden stopień niższy).",

                        // Przykład: Dzielenie Syntetyczne
                        ex4_1_title: "Przykład (Syntetyczne)",
                        ex4_1_problem: "Podziel $x^3 - 4x^2 + 2x - 5$ przez $x - 3$.",
                        ex4_1_step1: "Ustawienie: $c = 3$. Współczynniki to $[1, -4, 2, -5]$.",
                        ex4_1_step2: "Spuść 1. Pomnóż $3(1)=3$. Dodaj do -4: $-4+3 = -1$.",
                        ex4_1_step3: "Pomnóż $3(-1)=-3$. Dodaj do 2: $2-3 = -1$.",
                        ex4_1_step4: "Pomnóż $3(-1)=-3$. Dodaj do -5: $-5-3 = -8$ (Reszta).",
                        ex4_1_solution: "Iloraz: $x^2 - x - 1$, Reszta: $-8$."
                    },
                    example_section: {
                        title_ex: "Przykłady z Rozwiązaniami Krok po Kroku",
                        ex1: {
                            title: "1. Mnożenie Wielomianów",
                            problem: "Rozwiń i uprość:",
                            problem_math: `(2x - 3)(x^2 + 4x - 1)`,
                            step1_title: "Krok 1: Rozdziel 2x",
                            step1_math: `2x(x^2) + 2x(4x) + 2x(-1) = 2x^3 + 8x^2 - 2x`,
                            step2_title: "Krok 2: Rozdziel -3",
                            step2_desc: "Uważaj na znaki.",
                            step2_math: `-3(x^2) - 3(4x) - 3(-1) = -3x^2 - 12x + 3`,
                            step3_title: "Krok 3: Połącz Wyrazy Podobne",
                            step3_desc: "Połącz wyrazy $x^2$ i wyrazy $x$.",
                            step3_math: `2x^3 + (8x^2 - 3x^2) + (-2x - 12x) + 3`,
                            result_title: "Odpowiedź Końcowa",
                            result: `2x^3 + 5x^2 - 14x + 3`
                        },
                        ex2: {
                            title: "2. Dzielenie Pisemne Wielomianów",
                            problem: "Podziel używając Dzielenia Pisemnego:",
                            problem_math: `(x^2 - 5x + 6) \\div (x - 2)`,
                            step1_title: "Krok 1: Podziel Wyrazy Wiodące",
                            step1_desc: "Ile razy $x$ mieści się w $x^2$? Odpowiedź: $x$.",
                            step2_title: "Krok 2: Pomnóż i Odejmij",
                            step2_desc: "Pomnóż $x(x-2) = x^2 - 2x$. Odejmij to od górnego rzędu: $(-5x) - (-2x) = -3x$.",
                            step3_title: "Krok 3: Spuść i Powtórz",
                            step3_desc: "Spuść $+6$. Teraz podziel $-3x$ przez $x$. Odpowiedź: $-3$.",
                            step3_math: `-3(x - 2) = -3x + 6`,
                            step4_title: "Krok 4: Reszta",
                            step4_desc: "Odejmowanie daje 0.",
                            result_title: "Odpowiedź Końcowa",
                            result: `x - 3`
                        },
                        ex3: {
                            title: "3. Dzielenie Syntetyczne",
                            problem: "Podziel używając Dzielenia Syntetycznego:",
                            problem_math: `(3x^3 - 2x^2 + x - 5) \\div (x - 2)`,
                            step1_title: "Krok 1: Ustawienie",
                            step1_desc: "Dzielnik to $x-2$, więc użyj $c = 2$. Współczynniki to [3, -2, 1, -5].",
                            step2_title: "Krok 2: Algorytm",
                            step2_math: `\\text{Dół: } 3 \\\\ \\text{Mnoż: } 2 \\cdot 3 = 6 \\rightarrow \\text{Dodaj do -2} = 4 \\\\ \\text{Mnoż: } 2 \\cdot 4 = 8 \\rightarrow \\text{Dodaj do 1} = 9 \\\\ \\text{Mnoż: } 2 \\cdot 9 = 18 \\rightarrow \\text{Dodaj do -5} = 13`,
                            step3_title: "Krok 3: Interpretacja Wyniku",
                            step3_desc: "Dolny rząd to 3, 4, 9 z Resztą 13. Stopień spada z 3 do 2.",
                            result_title: "Odpowiedź Końcowa",
                            result: `3x^2 + 4x + 9 + \\frac{13}{x-2}`
                        }
                    }
                }
            }
        },
        factorization_techniques: {
            title: "Techniki Faktoryzacji",
            description: "Sztuka rozkładania wielomianów: zamiana złożonych wyrażeń na iloczyny prostszych czynników.",
            lessons: {
                lesson3_title: "Podstawowe Metody Faktoryzacji",
                lesson3: {
                    section1: {
                        title1: "Największy Wspólny Dzielnik (NWD)",
                        def1_1: "Pierwsza zasada faktoryzacji: Zawsze najpierw szukaj Wspólnego Czynnika.",

                        // Plot: Wizualizacja NWD
                        plot1_title: "Wizualizacja NWD",
                        plot1_desc: "'Wyciągamy' wspólny wyraz $2x$ z obu części wyrażenia.",
                        plot1_type: "polynomial_gcf_visual",
                        plot1_data: {
                            original: "2x^2 + 6x",
                            gcf: "2x",
                            remainder: "(x + 3)",
                            color_gcf: "blue",
                            color_rem: "black"
                        },

                        text1_1: "Zidentyfikuj największą liczbę i najwyższą potęgę zmiennej, która dzieli się bez reszty przez każdy wyraz.",
                        math1_1: `ab + ac = a(b + c)`,
                        warning1: "Jeśli wyraz wiodący jest ujemny, zazwyczaj najlepiej jest wyciągnąć również znak minus.",

                        // Przykład: NWD
                        ex1_1_title: "Przykład (NWD)",
                        ex1_1_problem: "Rozłóż na czynniki $12x^3 - 8x^2$.",
                        ex1_1_step1: "Współczynniki: NWD dla 12 i 8 to 4.",
                        ex1_1_step2: "Zmienne: NWD dla $x^3$ i $x^2$ to $x^2$.",
                        ex1_1_step3: "Podziel każdy wyraz przez $4x^2$.",
                        ex1_1_solution: "Wynik: $4x^2(3x - 2)$."
                    },
                    section2: {
                        title2: "Wzory Skróconego Mnożenia",
                        def2_1_title: "Różnica Kwadratów",
                        def2_1: "Dwa idealne kwadraty oddzielone znakiem minus.",
                        math2_1: `a^2 - b^2 = (a - b)(a + b)`,

                        // Plot: Geometria Różnicy Kwadratów
                        plot2_title: "Dowód Geometryczny",
                        plot2_desc: "Pole dużego kwadratu ($a^2$) minus mały kwadrat ($b^2$) można przekształcić w prostokąt o wymiarach $(a-b)$ i $(a+b)$.",
                        plot2_type: "diff_squares_geometry",
                        plot2_data: { a: 5, b: 2 },

                        // Przykład: Różnica Kwadratów
                        ex2_1_title: "Przykład (Różnica Kwadratów)",
                        ex2_1_problem: "Rozłóż $9x^2 - 16$.",
                        ex2_1_step1: "Zidentyfikuj kwadraty: $9x^2 = (3x)^2$ więc $a=3x$. $16 = 4^2$ więc $b=4$.",
                        ex2_1_solution: "Zastosuj wzór: $(3x - 4)(3x + 4)$.",

                        text2_1: "Uwaga: 'Suma Kwadratów' ($a^2 + b^2$) nie może być rozłożona na czynniki w liczbach rzeczywistych.",

                        def2_2_title: "Trójmiany Kwadratowe Zupełne",
                        def2_2: "Wynik podniesienia dwumianu do kwadratu.",
                        math2_2: `a^2 + 2ab + b^2 = (a + b)^2 \\quad \\text{oraz} \\quad a^2 - 2ab + b^2 = (a - b)^2`
                    },
                    section3: {
                        title3: "Faktoryzacja przez Grupowanie",
                        def3_1: "Używana głównie, gdy wielomian ma 4 wyrazy.",

                        // Plot: Wizualizacja Grupowania
                        plot3_title: "Wizualizacja Grupowania",
                        plot3_desc: "Dzielimy 4 wyrazy na dwie pary. Celem jest znalezienie wspólnego czynnika dwumianowego (część w nawiasie).",
                        plot3_type: "grouping_visual",
                        plot3_data: {
                            expr: "x^3 + 2x^2 + 3x + 6",
                            group1: "x^2(x + 2)",
                            group2: "+ 3(x + 2)",
                            common: "(x + 2)"
                        },
                        plot3_description: "To samo pole, inny kształt",
                        step3_1: "1. Grupuj wyrazy: Zgrupuj pierwsze dwa wyrazy i ostatnie dwa wyrazy.",
                        step3_2: "2. Wyciągnij NWD: Wyciągnij NWD z każdej pary oddzielnie.",
                        step3_3: "3. Czynnik Dwumianowy: Jeśli zrobiono to poprawnie, nawiasy będą pasować. Wyciągnij ten wspólny dwumian.",

                        math3_1: `ax + ay + bx + by = a(x+y) + b(x+y) = (a+b)(x+y)`,

                        // Przykład: Grupowanie
                        ex3_1_title: "Przykład (Grupowanie)",
                        ex3_1_problem: "Rozłóż $2x^3 - 3x^2 + 4x - 6$.",
                        ex3_1_step1: "Grupuj: $(2x^3 - 3x^2) + (4x - 6)$.",
                        ex3_1_step2: "Wyciągnij NWD: $x^2(2x - 3) + 2(2x - 3)$.",
                        ex3_1_step3: "Sprawdź zgodność: $(2x - 3)$ jest w obu.",
                        ex3_1_solution: "Wynik: $(x^2 + 2)(2x - 3)$."
                    },
                    section4: {
                        title4: "Zaawansowane Techniki",

                        // --- Sześciany ---
                        def4_1_title: "Suma i Różnica Sześcianów",
                        math4_1: `a^3 - b^3 = (a - b)(a^2 + ab + b^2)`,
                        math4_2: `a^3 + b^3 = (a + b)(a^2 - ab + b^2)`,

                        // Plot: Mnemotechnika SOAP
                        plot4_title: "Metoda SOAP",
                        plot4_desc: "Pomoc wizualna do umieszczania znaków w faktoryzacji sześciennej.",
                        plot4_type: "mnemonic_visual",
                        plot4_data: { mnemonic: "SOAP", meaning: ["Same (Ten sam)", "Opposite (Przeciwny)", "Always (Zawsze)", "Positive (Dodatni)"] },

                        text4_1: "Mnemotechnika: SOAP (Ten sam znak, Przeciwny znak, Zawsze Dodatni).",

                        // Przykład: Różnica Sześcianów
                        ex4_1_title: "Przykład (Sześciany)",
                        ex4_1_problem: "Rozłóż $8x^3 - 27$.",
                        ex4_1_step1: "Zidentyfikuj sześciany: $(2x)^3 - 3^3$. Więc $a=2x, b=3$.",
                        ex4_1_step2: "Zastosuj SOAP: $(2x - 3)((2x)^2 + (2x)(3) + 3^2)$.",
                        ex4_1_solution: "Wynik: $(2x - 3)(4x^2 + 6x + 9)$.",

                        // --- Metoda AC ---
                        def4_2_title: "Trójmiany Kwadratowe (Metoda AC)",
                        text4_2: "Dla $ax^2 + bx + c$, znajdź dwie liczby, które po pomnożeniu dają $a \\cdot c$, a po dodaniu $b$. Rozdziel środkowy wyraz i użyj grupowania.",

                        // Przykład: Metoda AC
                        ex4_2_title: "Przykład (Metoda AC)",
                        ex4_2_problem: "Rozłóż $3x^2 + 10x + 8$.",
                        ex4_2_step1: "Pomnóż $a \\cdot c$: $3(8) = 24$. Znajdź czynniki 24 sumujące się do 10: 6 i 4.",
                        ex4_2_step2: "Rozdziel środkowy wyraz: $3x^2 + 6x + 4x + 8$.",
                        ex4_2_step3: "Grupuj: $3x(x + 2) + 4(x + 2)$.",
                        ex4_2_solution: "Wynik: $(3x + 4)(x + 2)$."
                    },
                    example_section: {
                        title_ex: "Przykłady z Rozwiązaniami Krok po Kroku",
                        ex1: {
                            title: "1. NWD i Różnica Kwadratów",
                            problem: "Rozłóż całkowicie:",
                            problem_math: `3x^3 - 27x`,
                            step1_title: "Krok 1: Wyciągnij NWD",
                            step1_desc: "Oba wyrazy są podzielne przez $3x$.",
                            step1_math: `3x(x^2 - 9)`,
                            step2_title: "Krok 2: Zidentyfikuj Wzór",
                            step2_desc: "Wewnątrz nawiasu, $x^2 - 9$ to Różnica Kwadratów ($x^2 - 3^2$).",
                            step2_math: `(x - 3)(x + 3)`,
                            result_title: "Odpowiedź Końcowa",
                            result: `3x(x - 3)(x + 3)`
                        },
                        ex2: {
                            title: "2. Faktoryzacja przez Grupowanie",
                            problem: "Rozłóż wielomian czterowyrazowy:",
                            problem_math: `x^3 + 4x^2 + 3x + 12`,
                            step1_title: "Krok 1: Grupuj Wyrazy",
                            step1_desc: "Zgrupuj $(x^3 + 4x^2)$ i $(3x + 12)$.",
                            step2_title: "Krok 2: Wyciągnij NWD z Grup",
                            step2_math: `x^2(x + 4) + 3(x + 4)`,
                            step3_title: "Krok 3: Wyciągnij Wspólny Dwumian",
                            step3_desc: "Wyraz $(x+4)$ jest wspólny dla obu części.",
                            result_title: "Odpowiedź Końcowa",
                            result: `(x^2 + 3)(x + 4)`
                        },
                        ex3: {
                            title: "3. Metoda AC (Trójmiany)",
                            problem: "Rozłóż:",
                            problem_math: `2x^2 + 7x + 3`,
                            step1_title: "Krok 1: Pomnóż A i C",
                            step1_desc: "$A=2, C=3$. Iloczyn to $6$. Potrzebujemy czynników 6, które sumują się do $B=7$.",
                            step1_math: `\\text{Czynniki: } 6 \\text{ i } 1 \\quad (6 \\cdot 1 = 6, \\; 6+1 = 7)`,
                            step2_title: "Krok 2: Rozdziel Środkowy Wyraz",
                            step2_math: `2x^2 + 6x + 1x + 3`,
                            step3_title: "Krok 3: Grupuj i Rozwiąż",
                            step3_desc: "Rozłóż przez grupowanie.",
                            step3_math: `2x(x + 3) + 1(x + 3)`,
                            result_title: "Odpowiedź Końcowa",
                            result: `(2x + 1)(x + 3)`
                        }
                    }
                }
            }
        },
        roots_zeros: {
            title: "Pierwiastki i Miejsca Zerowe",
            description: "Łączenie algebry i geometrii: znajdowanie dokładnych wartości, dla których wielomian wynosi zero i zrozumienie Zasadniczego Twierdzenia Algebry.",
            lessons: {
                lesson4_title: "Twierdzenia i Strategie Rozwiązywania",
                lesson4: {
                    section1: {
                        title1: "Twierdzenie Zasadnicze i Twierdzenie o Czynniku",
                        def1_1: "Zasadnicze Twierdzenie Algebry: Każdy wielomian stopnia $n$ ma dokładnie $n$ pierwiastków zespolonych (licząc krotności).",
                        text1_1: "To gwarantuje, że równanie stopnia 5 ma dokładnie 5 rozwiązań.",

                        // Wykres: Pierwiastki vs Czynniki
                        plot1_title: "Połączenie: Pierwiastki i Czynniki",
                        plot1_desc: "Jeśli wykres przecina oś x w $c=2$, to $(x-2)$ jest czynnikiem wielomianu.",
                        plot1_type: "root_factor_visual",
                        plot1_data: {
                            root: 2,
                            factor: "(x - 2)",
                            function: "(x-2)(x+1)(x-4)",
                            domain: [-2, 5]
                        },
                        plot1_description: "- czynnikiem",

                        def1_2: "Twierdzenie o Czynniku:",
                        math1_1: `P(c) = 0 \\iff (x - c) \\text{ jest czynnikiem } P(x)`,
                        text1_2: "Zapewnia to bezpośrednie powiązanie między czynnikami algebraicznymi a geometrycznymi miejscami zerowymi."
                    },
                    section2: {
                        title2: "Twierdzenie o Pierwiastkach Wymiernych",
                        def2_1: "Strategia znajdowania listy *możliwych* pierwiastków wymiernych, gdy wielomian ma współczynniki całkowite.",

                        math2_1: `\\text{Możliwe Pierwiastki} = \\pm \\frac{\\text{Dzielniki Wyrazu Wolnego } (p)}{\\text{Dzielniki Współczynnika Wiodącego } (q)}`,

                        step2_1: "1. Wypisz wszystkie dzielniki wyrazu wolnego ($p$).",
                        step2_2: "2. Wypisz wszystkie dzielniki współczynnika wiodącego ($q$).",
                        step2_3: "3. Utwórz wszystkie ułamki $p/q$ i sprawdź je używając dzielenia syntetycznego.",

                        // Przykład: Twierdzenie o Pierwiastkach Wymiernych
                        ex2_1_title: "Przykład (Szukanie Kandydatów)",
                        ex2_1_problem: "Znajdź możliwe pierwiastki wymierne dla $2x^3 + x^2 - 13x + 6$.",
                        ex2_1_step1: "Stała $p = 6$. Dzielniki: $\\pm 1, \\pm 2, \\pm 3, \\pm 6$.",
                        ex2_1_step2: "Wsp. Wiodący $q = 2$. Dzielniki: $\\pm 1, \\pm 2$.",
                        ex2_1_step3: "Utwórz stosunki $p/q$: $\\pm 1, \\pm 2, \\pm 3, \\pm 6, \\pm 1/2, \\pm 3/2$.",
                        ex2_1_solution: "To są jedyne możliwe pierwiastki wymierne do sprawdzenia."
                    },
                    section3: {
                        title3: "Krotność",
                        def3_1: "Krotność odnosi się do tego, ile razy dany czynnik pojawia się w rozkładzie wielomianu.",
                        math3_1: `P(x) = (x - 2)^3 (x + 1)^2`,

                        // Wykres: Zachowanie Krotności
                        plot3_title: "Wizualizacja Krotności",
                        plot3_desc: "W x=1 (potęga nieparzysta ^1), wykres przecina. W x=2 (potęga parzysta ^2), wykres odbija się.",
                        plot3_type: "multiplicity_visual",
                        plot3_data: {
                            function: "(x-1)(x-2)^2",
                            roots: [
                                { x: 1, type: "cross", label: "Nieparzysta (Przecina)" },
                                { x: 2, type: "bounce", label: "Parzysta (Odbija)" }
                            ]
                        },

                        list3_1: "Krotność Nieparzysta (np. ^1, ^3): Wykres **przecina** oś x.",
                        list3_2: "Krotność Parzysta (np. ^2, ^4): Wykres **dotyka** (odbija się od) osi x.",

                        // Przykład: Krotność
                        ex3_1_title: "Przykład (Zachowanie Wykresu)",
                        ex3_1_problem: "Opisz zachowanie $f(x) = (x+3)^2 (x-1)^3$ w miejscach zerowych.",
                        ex3_1_step1: "Pierwiastek $x=-3$: Krotność 2 (Parzysta). Wykres odbija się.",
                        ex3_1_step2: "Pierwiastek $x=1$: Krotność 3 (Nieparzysta). Wykres przecina."
                    },
                    section4: {
                        title4: "Pierwiastki Zespolone",
                        def4_1: "Jeśli wielomian ma współczynniki rzeczywiste, pierwiastki zespolone zawsze występują w parach sprzężonych.",
                        math4_2: `\\text{Jeśli } a + bi \\text{ jest pierwiastkiem, to } a - bi \\text{ też jest pierwiastkiem.}`,
                        text4_1: "To wyjaśnia, dlaczego wielomiany stopnia nieparzystego muszą mieć co najmniej jeden pierwiastek rzeczywisty (pierwiastki zespolone zużywają stopień w parach po 2).",

                        // Przykład: Sprzężenie Zespolone
                        ex4_1_title: "Przykład (Znajdowanie Pierwiastków)",
                        ex4_1_problem: "Wielomian sześcienny ma pierwiastki $3$ i $2 - i$. Znajdź trzeci pierwiastek.",
                        ex4_1_solution: "Ponieważ pierwiastki zespolone występują w parach, trzecim pierwiastkiem musi być sprzężenie: $2 + i$."
                    },
                    example_section: {
                        title_ex: "Przykłady z Rozwiązaniami Krok po Kroku",
                        ex1: {
                            title: "1. Użycie Twierdzenia o Pierwiastkach Wymiernych",
                            problem: "Znajdź wszystkie możliwe pierwiastki wymierne dla:",
                            problem_math: `P(x) = 2x^3 + x^2 - 13x + 6`,
                            step1_title: "Krok 1: Zidentyfikuj p i q",
                            step1_desc: "Dzielniki wyrazu wolnego (6): $p = 1, 2, 3, 6$. Dzielniki wsp. wiodącego (2): $q = 1, 2$.",
                            step2_title: "Krok 2: Wypisz Kombinacje",
                            step2_desc: "Weź każde p podzielone przez każde q.",
                            step2_math: `\\pm \\frac{1, 2, 3, 6}{1} \\implies \\pm 1, \\pm 2, \\pm 3, \\pm 6 \\\\ \\pm \\frac{1, 2, 3, 6}{2} \\implies \\pm \\frac{1}{2}, \\pm \\frac{3}{2} \\quad (1 \\text{ i } 3 \\text{ to duplikaty})`,
                            result_title: "Odpowiedź Końcowa",
                            result: `\\text{Kandydaci: } \\pm 1, \\pm 2, \\pm 3, \\pm 6, \\pm \\frac{1}{2}, \\pm \\frac{3}{2}`
                        },
                        ex2: {
                            title: "2. Rozwiązywanie z Twierdzeniem o Czynniku",
                            problem: "Czy $(x-2)$ jest czynnikiem $P(x) = x^3 - 4x^2 + 3x + 2$?",
                            step1_title: "Krok 1: Zastosuj Twierdzenie",
                            step1_desc: "Jeśli $(x-2)$ jest czynnikiem, to $P(2)$ musi wynosić 0.",
                            step2_title: "Krok 2: Oblicz P(2)",
                            step2_math: `P(2) = (2)^3 - 4(2)^2 + 3(2) + 2 \\\\ = 8 - 16 + 6 + 2 \\\\ = 0`,
                            step3_title: "Krok 3: Wniosek",
                            step3_desc: "Ponieważ reszta wynosi 0, jest to czynnik.",
                            result_title: "Odpowiedź Końcowa",
                            result: "Tak, $(x-2)$ jest czynnikiem."
                        },
                        ex3: {
                            title: "3. Analiza Krotności z Postaci Iloczynowej",
                            problem: "Opisz zachowanie wykresu w miejscach zerowych:",
                            problem_math: `P(x) = -2(x - 3)^2 (x + 1)^3`,
                            step1_title: "Krok 1: Zidentyfikuj Pierwiastki",
                            step1_desc: "Pierwiastki są w $x = 3$ i $x = -1$.",
                            step2_title: "Krok 2: Sprawdź Krotność",
                            step2_math: `\\text{W } x=3: \\text{ Potęga wynosi 2 (Parzysta)} \\\\ \\text{W } x=-1: \\text{ Potęga wynosi 3 (Nieparzysta)}`,
                            step3_title: "Krok 3: Określ Zachowanie",
                            result_title: "Odpowiedź Końcowa",
                            result: "W $x=3$, wykres dotyka/odbija się. W $x=-1$, wykres przecina oś."
                        }
                    }
                }
            }
        },
        polynomial_equations: {
            title: "Równania Wielomianowe",
            description: "Znajdowanie wartości x, które czynią równanie prawdziwym: od prostych izolacji liniowych do rozwiązywania złożonych problemów wyższego stopnia.",
            lessons: {
                lesson5_title: "Strategie Rozwiązywania i Zastosowania",
                lesson5: {
                    section1: {
                        title1: "Równania Liniowe (Stopień 1)",
                        def1_1: "Najprostsza forma równania wielomianowego.",

                        // Plot: Wizualizacja Rozwiązywania Równań
                        plot1_title: "Izolowanie Zmiennej",
                        plot1_desc: "Rozwiązywanie $2x - 6 = 0$. Aby uzyskać samo x, musimy przenieść stałą (-6) a następnie podzielić przez współczynnik (2).",
                        plot1_type: "linear_solver_visual",
                        plot1_data: {
                            equation: "2x - 6 = 0",
                            step1: "Dodaj 6 do obu stron -> 2x = 6",
                            step2: "Podziel przez 2 -> x = 3",
                            root: 3
                        },

                        math1_1: `ax + b = 0 \\implies x = -\\frac{b}{a}`,
                        text1_1: "Celem jest po prostu wyizolowanie zmiennej za pomocą operacji odwrotnych (dodawanie/odejmowanie, potem mnożenie/dzielenie).",

                        // Przykład: Liniowe
                        ex1_1_title: "Przykład (Liniowe)",
                        ex1_1_problem: "Rozwiąż $3x + 7 = 22$.",
                        ex1_1_step1: "Odejmij 7 od obu stron: $3x = 15$.",
                        ex1_1_step2: "Podziel przez 3: $x = 5$.",
                        ex1_1_solution: "Rozwiązanie: $x = 5$."
                    },
                    section2: {
                        title2: "Równania Kwadratowe (Stopień 2)",
                        def2_1: "Postać Ogólna: $ax^2 + bx + c = 0$.",

                        def2_2_title: "Metoda 1: Faktoryzacja (Własność Iloczynu Równego Zero)",
                        text2_1: "Jeśli $(x-r)(x-s) = 0$, to $x=r$ lub $x=s$. To najszybsza metoda, jeśli liczby są ładne.",

                        // Przykład: Faktoryzacja
                        ex2_1_title: "Przykład (Faktoryzacja)",
                        ex2_1_problem: "Rozwiąż $x^2 - 5x + 6 = 0$.",
                        ex2_1_step1: "Znajdź liczby, które po pomnożeniu dają 6, a po dodaniu -5: (-2, -3).",
                        ex2_1_step2: "Rozłóż: $(x - 2)(x - 3) = 0$.",
                        ex2_1_solution: "Pierwiastki: $x = 2, x = 3$.",

                        def2_3_title: "Metoda 2: Wzór Kwadratowy (Delta)",
                        text2_2: "Używana, gdy faktoryzacja jest trudna lub niemożliwa. Działa dla *każdego* równania kwadratowego.",
                        math2_1: `x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}`,

                        // Przykład: Wzór Kwadratowy
                        ex2_2_title: "Przykład (Wzór Kwadratowy)",
                        ex2_2_problem: "Rozwiąż $2x^2 + 5x - 3 = 0$.",
                        ex2_2_step1: "Zidentyfikuj $a=2, b=5, c=-3$.",
                        ex2_2_step2: "Wyróżnik (Delta): $5^2 - 4(2)(-3) = 25 + 24 = 49$.",
                        ex2_2_step3: "Wzór: $\\frac{-5 \\pm 7}{4}$.",
                        ex2_2_solution: "Pierwiastki: $x = \\frac{1}{2}, x = -3$.",

                        def2_4_title: "Wyróżnik (Delta $\\Delta$)",
                        text2_3: "Wartość pod pierwiastkiem ($b^2 - 4ac$) mówi nam o rozwiązaniach:",

                        // Plot: Przypadki Delty
                        plot2_title: "Delta i Pierwiastki",
                        plot2_desc: "Niebieski (Dod): 2 Pierwiastki. Zielony (Zero): 1 Pierwiastek. Czerwony (Ujem): Brak Pierwiastków Rzeczywistych.",
                        plot2_type: "multi_function",
                        plot2_domain: [-4, 4],
                        plot2_functions: [
                            { expression: "x^2 - 4", color: "blue", label: "D > 0 (2 Rzecz)" },
                            { expression: "x^2", color: "green", label: "D = 0 (1 Rzecz)" },
                            { expression: "x^2 + 2", color: "red", label: "D < 0 (0 Rzecz)" }
                        ],

                        list2_1: "$\\Delta > 0$: Dwa różne rozwiązania rzeczywiste (Przecina oś x dwa razy).",
                        list2_2: "$\\Delta = 0$: Jedno podwójne rozwiązanie rzeczywiste (Dotyka osi x raz).",
                        list2_3: "$\\Delta < 0$: Dwa rozwiązania zespolone (urojone) (Nigdy nie dotyka osi x)."
                    },
                    section3: {
                        title3: "Równania Sześcienne i Wyższych Stopni",
                        def3_1: "Strategia: Zredukuj Stopień.",

                        step3_1: "1. Czy jest NWD? Wyciągnij go.",
                        step3_2: "2. Czy możesz użyć Grupowania? (Częste dla sześciennych z 4 wyrazami).",
                        step3_3: "3. Jeśli nie, użyj Twierdzenia o Pierwiastkach Wymiernych i Dzielenia Syntetycznego, aby zredukować wielomian do Kwadratowego.",

                        text3_1: "Gdy osiągniesz iloraz Kwadratowy, rozwiąż go używając Wzoru Kwadratowego.",

                        // Przykład: Rozwiązywanie Sześciennego
                        ex3_1_title: "Przykład (Rozwiązywanie Wyższego Stopnia)",
                        ex3_1_problem: "Rozwiąż $x^3 - 2x^2 - 5x + 6 = 0$.",
                        ex3_1_step1: "Testuj pierwiastki wymierne. Spróbuj $x=1$: $1 - 2 - 5 + 6 = 0$. Działa!",
                        ex3_1_step2: "Dzielenie Syntetyczne przez 1: Współczynniki [1, -2, -5, 6] $\\to$ Reszta 0.",
                        ex3_1_step3: "Zredukowany Wielomian: $x^2 - x - 6 = 0$.",
                        ex3_1_step4: "Rozwiąż Kwadratowe: Rozłóż $(x-3)(x+2) = 0$.",
                        ex3_1_solution: "Pierwiastki: $x = 1, x = 3, x = -2$."
                    },
                    section4: {
                        title4: "Zadania Tekstowe i Modelowanie",
                        def4_1: "Tłumaczenie Polskiego na Matematykę.",

                        // Plot: Ruch Pocisku
                        plot4_title: "Ruch Pocisku",
                        plot4_desc: "Tor obiektu wyrzuconego w powietrze podąża za krzywą paraboliczną ($h(t) = -16t^2 + vt + h$). Maksymalna wysokość to wierzchołek; uderzenie w ziemię to pierwiastek.",
                        plot4_type: "projectile_motion_visual",
                        plot4_data: {
                            function: "-16*t^2 + 64*t",
                            domain: [0, 4],
                            points: [
                                { x: 2, y: 64, label: "Maks Wysokość" },
                                { x: 4, y: 0, label: "Ziemia" }
                            ]
                        },

                        list4_1: "Problemy z Polem: Długość $\\times$ Szerokość ($x(x+5) = Pole$).",
                        list4_2: "Ruch Pocisku: Wysokość w czasie ($h(t) = -16t^2 + v_0t + h_0$).",
                        list4_3: "Objętość: Objętość pudełka ($V = l \\cdot w \\cdot h$).",

                        // Przykład: Problem z Polem
                        ex4_1_title: "Przykład (Geometria)",
                        ex4_1_problem: "Długość prostokąta jest o 3 większa od szerokości. Pole wynosi 40. Znajdź wymiary.",
                        ex4_1_step1: "Niech $w = x$. Wtedy $l = x+3$.",
                        ex4_1_step2: "Równanie: $x(x+3) = 40 \\implies x^2 + 3x - 40 = 0$.",
                        ex4_1_step3: "Rozłóż: $(x+8)(x-5) = 0$.",
                        ex4_1_solution: "x nie może być ujemną długością (-8). Więc Szerokość = 5, Długość = 8."
                    },
                    example_section: {
                        title_ex: "Przykłady z Rozwiązaniami Krok po Kroku",
                        ex1: {
                            title: "1. Wzór Kwadratowy",
                            problem: "Rozwiąż dla x (dokładne odpowiedzi):",
                            problem_math: `3x^2 - 5x - 7 = 0`,
                            step1_title: "Krok 1: Zidentyfikuj Współczynniki",
                            step1_desc: "$a = 3, \\; b = -5, \\; c = -7$.",
                            step2_title: "Krok 2: Podstaw do Wzoru",
                            step2_math: `x = \\frac{-(-5) \\pm \\sqrt{(-5)^2 - 4(3)(-7)}}{2(3)}`,
                            step3_title: "Krok 3: Uprość",
                            step3_math: `x = \\frac{5 \\pm \\sqrt{25 + 84}}{6} = \\frac{5 \\pm \\sqrt{109}}{6}`,
                            result_title: "Odpowiedź Końcowa",
                            result: "Dwa pierwiastki to $\\frac{5 + \\sqrt{109}}{6}$ i $\\frac{5 - \\sqrt{109}}{6}$."
                        },
                        ex2: {
                            title: "2. Rozwiązywanie Sześciennego przez Grupowanie",
                            problem: "Znajdź wszystkie pierwiastki:",
                            problem_math: `x^3 - 2x^2 - 9x + 18 = 0`,
                            step1_title: "Krok 1: Grupuj Wyrazy",
                            step1_desc: "Zgrupuj pierwsze dwa i ostatnie dwa.",
                            step1_math: `(x^3 - 2x^2) - (9x - 18) = 0`,
                            step2_title: "Krok 2: Wyciągnij NWD",
                            step2_math: `x^2(x - 2) - 9(x - 2) = 0`,
                            step3_title: "Krok 3: Wyciągnij Wspólny Dwumian",
                            step3_math: `(x^2 - 9)(x - 2) = 0`,
                            step4_title: "Krok 4: Rozwiąż Czynniki",
                            step4_desc: "$x^2 - 9$ to różnica kwadratów $(x-3)(x+3)$.",
                            result_title: "Odpowiedź Końcowa",
                            result: `x = 2, \\; x = 3, \\; x = -3`
                        },
                        ex3: {
                            title: "3. Zadanie Tekstowe na Optymalizację",
                            problem: "Prostokątny ogród ma powierzchnię 40 m². Długość jest o 3m większa od szerokości. Znajdź wymiary.",
                            problem_math: `\\text{Pole} = 40, \\quad L = W + 3`,
                            step1_title: "Krok 1: Ustaw Równanie",
                            step1_math: `W(W + 3) = 40 \\implies W^2 + 3W - 40 = 0`,
                            step2_title: "Krok 2: Rozwiąż dla W",
                            step2_desc: "Rozłóż równanie kwadratowe. Czynniki -40, które sumują się do 3 to +8 i -5.",
                            step2_math: `(W + 8)(W - 5) = 0`,
                            step3_title: "Krok 3: Odrzuć Nieprawidłowe Rozwiązania",
                            step3_desc: "$W = -8$ lub $W = 5$. Szerokość nie może być ujemna, więc $W = 5$.",
                            result_title: "Odpowiedź Końcowa",
                            result: "Szerokość = 5m, Długość = 8m."
                        }
                    }
                }
            }
        },
        real_world_applications: {
            title: "Zastosowania w Świecie Rzeczywistym",
            description: "Poliniomy w akcji: modelowanie przestrzeni fizycznej, analiza ruchu, optymalizacja zysków biznesowych i dopasowywanie trendów danych.",
            lessons: {
                lesson6_title: "Modelowanie i Rozwiązywanie Problemów",
                lesson6: {
                    section1: {
                        title1: "Powierzchnia i Objętość (Geometria)",
                        def1_1: "Wielomiany opisują wymiary kształtów geometrycznych, gdy zaangażowane są zmienne.",
                        text1_1: "Typowy Scenariusz: Tworzenie pudełka z płaskiego arkusza przez wycięcie rogów o rozmiarze 'x'.",
                        math1_1: `V(x) = x(L - 2x)(W - 2x)`,

                        // Plot: Diagram Problemu Pudełka
                        plot1_title: "Wizualizacja Cięcia",
                        plot1_desc: "Płaski arkusz tektury z wyciętymi rogami. Złożenie klap tworzy pudełko 3D.",
                        plot1_type: "box_cut_visual",
                        plot1_data: {
                            sheet_width: 12,
                            sheet_height: 12,
                            cut_size: "x",
                            folded_dim: "(12-2x) by (12-2x) by x"
                        },
                        caption: "Wytnij rogi → Złóż → Pudełko!",
                        text1_2: "Tutaj $V(x)$ staje się wielomianem sześciennym (stopnia 3). Znalezienie maksymalnej objętości wymaga znalezienia wierzchołka tej krzywej wielomianowej."
                    },
                    section2: {
                        title2: "Problemy Ruchu (Fizyka)",
                        def2_1: "Rzut Ukośny: Wysokość obiektu wyrzuconego w powietrze jest modelowana przez wielomian kwadratowy ze względu na grawitację.",
                        math2_1: `h(t) = -16t^2 + v_0t + h_0 \\quad (\\text{Jednostki imperialne})`,
                        math2_2: `h(t) = -4.9t^2 + v_0t + h_0 \\quad (\\text{Jednostki metryczne})`,
                        list2_1: "$t$: Czas w sekundach.",
                        list2_2: "$v_0$: Prędkość początkowa.",
                        list2_3: "$h_0$: Wysokość początkowa.",

                        // Plot: Trajektoria Rzutu
                        plot2_title: "Trajektoria Paraboliczna",
                        plot2_desc: "Wysokość w czasie. Wierzchołek to maksymalna wysokość; dodatnie przecięcie z osią x to moment uderzenia w ziemię.",
                        plot2_type: "projectile_motion_visual",
                        plot2_data: {
                            function: "-16*t^2 + 64*t + 5",
                            domain: [0, 4.1],
                            points: [
                                { x: 0, y: 5, label: "Start (h0)" },
                                { x: 2, y: 69, label: "Maks Wysokość" },
                                { x: 4.08, y: 0, label: "Uderzenie" }
                            ]
                        },
                        max_height: "Maks Wysokość (Wierzchołek)",
                        impact: "Uderzenie",
                        gravity: "grawitacja",
                        text2_1: "Rozwiązanie $h(t) = 0$ mówi, kiedy obiekt uderzy w ziemię."
                    },
                    section3: {
                        title3: "Zastosowania Biznesowe (Ekonomia)",
                        def3_1: "Wielomiany modelują kondycję finansową.",
                        math3_1: `P(x) = R(x) - C(x)`,
                        list3_1: "Przychód $R(x)$: Cena $\\times$ Ilość sprzedana.",
                        list3_2: "Koszt $C(x)$: Koszty stałe + Koszty zmienne.",
                        list3_3: "Zysk $P(x)$: Różnica między Przychodem a Kosztem.",

                        // Plot: Analiza Zysku
                        plot3_title: "Wizualizacja Zysku",
                        plot3_desc: "Zielony obszar to Zysk (gdzie Przychód > Koszt). Szczyt krzywej Zysku to Maksymalny Zysk. Punkty, gdzie Przychód równa się Kosztowi, to punkty Progu Rentowności.",
                        plot3_type: "profit_loss_visual",
                        plot3_data: {
                            revenue: "-0.5*x^2 + 50*x", // Przychód Paraboliczny
                            cost: "10*x + 200",       // Koszt Liniowy
                            profit: "-0.5*x^2 + 40*x - 200", // P(x)
                            domain: [0, 100],
                            break_even_points: [5.36, 74.64] // Pierwiastki P(x)
                        },
                        revenue: "Przychód",
                        cost: "Koszt",
                        profit: "Zysk",
                        break_even: "Próg Rentowności",
                        text3_1: "Punkty Progu Rentowności: Pierwiastki $P(x)$ (gdzie Zysk = 0).",
                        text3_2: "Aby zmaksymalizować zysk, znajdujemy wierzchołek paraboli Zysku (dla modeli kwadratowych).",

                        // Przykład: Maks Zysk
                        ex3_1_title: "Przykład (Maksymalizacja Zysku)",
                        ex3_1_problem: "Przychód to $R(x) = 50x - 0.5x^2$, a Koszt to $C(x) = 10x + 200$. Znajdź poziom produkcji $x$ dla maksymalnego zysku.",
                        ex3_1_step1: "Równanie Zysku: $P(x) = (50x - 0.5x^2) - (10x + 200)$.",
                        ex3_1_step2: "Uprość: $P(x) = -0.5x^2 + 40x - 200$.",
                        ex3_1_step3: "Znajdź Wierzchołek ($x = -b/2a$): $x = -40 / (2 \\cdot -0.5) = -40 / -1 = 40$.",
                        ex3_1_solution: "Zmaksymalizuj zysk produkując 40 jednostek."
                    },
                    section4: {
                        title4: "Inżynieria i Modelowanie Danych",
                        def4_1: "Dopasowywanie Krzywych (Regresja): Inżynierowie używają wielomianów do aproksymacji złożonych punktów danych ze świata rzeczywistego.",

                        // Plot: Dopasowywanie Krzywych
                        plot4_title: "Dopasowywanie Trendu",
                        plot4_desc: "Czerwone kropki to dane rzeczywiste (wykres punktowy). Niebieska linia to model wielomianowy (Regresja) używany do przewidywania przyszłych trendów.",
                        plot4_type: "scatter_plot_fit",
                        plot4_data: {
                            points: [{ x: 1, y: 2 }, { x: 2, y: 5 }, { x: 3, y: 10 }, { x: 4, y: 17 }],
                            model: "x^2 + 1", // Pasuje do wzoru 1, 4, 9, 16 (+1)
                            prediction_point: { x: 5, y: 26 },
                            label: "Dopasowanie Kwadratowe"
                        },
                        data: "Dane",
                        prediction: "Przewidywanie",
                        text4_1: "Zbiór rozproszonych punktów danych często można zamodelować za pomocą 'Linii Najlepszego Dopasowania' (Liniowa) lub krzywej (Kwadratowa/Sześcienna), aby przewidzieć przyszłe wyniki.",
                        warning4_1: "Przeuczenie: Użycie wielomianu o zbyt wysokim stopniu może dopasować szum zamiast trendu.",

                        // Przykład: Modelowanie
                        ex4_1_title: "Przykład (Rozpoznawanie Wzorców)",
                        ex4_1_problem: "Znajdź model wielomianowy dla ciągu: 2, 5, 10, 17...",
                        ex4_1_step1: "Pierwsze Różnice: $5-2=3, 10-5=5, 17-10=7$ (Nie liniowe).",
                        ex4_1_step2: "Drugie Różnice: $5-3=2, 7-5=2$ (Stałe).",
                        ex4_1_step3: "Stała druga różnica implikuje model Kwadratowy ($n^2 + 1$).",
                        ex4_1_solution: "Model: $y = x^2 + 1$."
                    },
                    example_section: {
                        title_ex: "Przykłady z Rozwiązaniami Krok po Kroku",
                        ex1: {
                            title: "1. Rzut Ukośny",
                            problem: "Rakieta jest wystrzelona z ziemi ($h_0=0$) z prędkością początkową $v_0 = 98$ m/s. Kiedy wróci na ziemię?",
                            problem_math: `h(t) = -4.9t^2 + 98t + 0`,
                            step1_title: "Krok 1: Ustaw Wysokość na Zero",
                            step1_desc: "Chcemy znaleźć $t$, gdy $h(t) = 0$.",
                            step1_math: `-4.9t^2 + 98t = 0`,
                            step2_title: "Krok 2: Faktoryzuj",
                            step2_desc: "Wyciągnij przed nawias $t$ (lub $-4.9t$).",
                            step2_math: `t(-4.9t + 98) = 0`,
                            step3_title: "Krok 3: Rozwiąż dla t",
                            step3_desc: "Dwa rozwiązania: $t = 0$ (start) i $-4.9t + 98 = 0$.",
                            step3_math: `4.9t = 98 \\implies t = 20`,
                            result_title: "Odpowiedź Końcowa",
                            result: "Rakieta uderza w ziemię po 20 sekundach."
                        },
                        ex2: {
                            title: "2. Maksymalizacja Zysku",
                            problem: "Zysk firmy jest modelowany przez $P(x) = -x^2 + 100x - 900$. Ile jednostek ($x$) należy sprzedać, aby zmaksymalizować zysk?",
                            step1_title: "Krok 1: Zidentyfikuj Typ Funkcji",
                            step1_desc: "To jest parabola otwierająca się w dół (Kwadratowa). Maksimum jest w Wierzchołku.",
                            step2_title: "Krok 2: Wzór na Wierzchołek",
                            step2_math: `x = \\frac{-b}{2a}`,
                            step3_title: "Krok 3: Podstaw Współczynniki",
                            step3_desc: "$a = -1, b = 100$.",
                            step3_math: `x = \\frac{-100}{2(-1)} = \\frac{-100}{-2} = 50`,
                            result_title: "Odpowiedź Końcowa",
                            result: "Sprzedaż 50 jednostek daje maksymalny zysk."
                        },
                        ex3: {
                            title: "3. Konstrukcja Objętości",
                            problem: "Pudełko jest zrobione z arkusza 10x8 przez wycięcie kwadratów o boku $x$. Wyraź wielomian Objętości.",
                            problem_math: `V = L \\cdot W \\cdot H`,
                            step1_title: "Krok 1: Zdefiniuj Wymiary",
                            step1_desc: "Wysokość = $x$. Długość = $10 - 2x$. Szerokość = $8 - 2x$.",
                            step2_title: "Krok 2: Ustaw Równanie",
                            step2_math: `V(x) = x(10 - 2x)(8 - 2x)`,
                            step3_title: "Krok 3: Rozwiń (Postać Ogólna)",
                            step3_desc: "Najpierw pomnóż dwumiany: $(80 - 20x - 16x + 4x^2)$. Następnie pomnóż przez $x$.",
                            result_title: "Odpowiedź Końcowa",
                            result: `V(x) = 4x^3 - 36x^2 + 80x`
                        }
                    }
                }
            }
        },
    },
    ro: {
        polynomial_basics: {
            title: "Bazele Polinoamelor",
            description: "Elementele de bază ale algebrei: înțelegerea structurii, terminologiei și clasificării polinoamelor.",
            lessons: {
                lesson1_title: "Structură și Terminologie",
                lesson1: {
                    section1: {
                        title1: "Definiție și Terminologie",
                        def1_1: "Un polinom este o expresie matematică formată din variabile (numite și nedeterminate) și coeficienți, care implică doar operațiile de adunare, scădere, înmulțire și exponenți întregi nenegativi ai variabilelor.",
                        math1_1: `P(x) = a_n x^n + a_{n-1} x^{n-1} + \\dots + a_1 x + a_0`,

                        // Grafic: Anatomia unui Polinom
                        plot1_title: "Anatomia unui Polinom",
                        plot1_desc: "Descompunerea vizuală a termenului $3x^2$.",
                        plot1_type: "polynomial_anatomy",
                        plot1_data: {
                            expression: "3x^2",
                            labels: [
                                { text: "Coeficient", target: "3", color: "blue" },
                                { text: "Variabilă", target: "x", color: "black" },
                                { text: "Exponent", target: "2", color: "red" },
                                { text: "Grad", target: "2", color: "red" }
                            ]
                        },
                        text1_1: "Vocabular Cheie:",
                        list1_1: "Termen: Fiecare parte a polinomului separată prin semne + sau -.",
                        list1_2: "Coeficient: Factorul numeric al unui termen (de ex. în $5x^2$, 5 este coeficientul).",
                        list1_3: "Constantă: Un termen fără variabilă (grad 0).",
                        warning1: "Expresiile cu exponenți negativi ($x^{-1}$) sau exponenți fracționari ($\\sqrt{x}$) NU sunt polinoame."
                    },
                    section2: {
                        title2: "Grad și Coeficient Principal",
                        def2_1: "Gradul unui polinom este cel mai mare exponent al variabilei prezent în expresie.",
                        def2_2: "Coeficientul Principal (CP) este coeficientul termenului cu cel mai mare grad.",

                        // Exemplu: Grad și CP
                        ex2_1_title: "Verificare Rapidă",
                        ex2_1_problem: "Analizează polinomul $P(x) = 7x^3 - 2x + 5$.",
                        ex2_1_solution: "Cea mai mare putere este 3, deci **Grad = 3**. Coeficientul lui $x^3$ este 7, deci **Coeficient Principal = 7**.",

                        text2_1: "Gradul determină comportamentul final al graficului (dacă merge în sus sau în jos la infinit)."
                    },
                    section3: {
                        title3: "Forma Standard",
                        def3_1: "Un polinom este în Formă Standard când termenii săi sunt ordonați de la cel mai mare grad la cel mai mic grad.",

                        // Exemplu: Reordonare în Formă Standard
                        ex3_1_title: "Exemplu",
                        ex3_1_problem: "Rescrie $f(x) = 4 + x^3 - 2x$ în formă standard.",
                        ex3_1_step1: "Identifică gradele: $4$ (grad 0), $x^3$ (grad 3), $-2x$ (grad 1).",
                        ex3_1_solution: "Ordonează după grad (3, 1, 0): $f(x) = x^3 - 2x + 4$.",

                        math3_1: `\\text{Exemplu: } f(x) = -2x^3 + 4x^2 - x + 7`,
                        text3_1: "Este practică standard să rescriem întotdeauna polinoamele în acest fel înainte de a le analiza."
                    },
                    section4: {
                        title4: "Tipuri de Polinoame",
                        def4_1_title: "Clasificare după Numărul de Termeni",
                        list4_1: "Monom: 1 termen (de ex. $3x^2$)",
                        list4_2: "Binom: 2 termeni (de ex. $x + 5$)",
                        list4_3: "Trinom: 3 termeni (de ex. $x^2 + 3x - 4$)",

                        def4_2_title: "Clasificare după Grad",
                        list4_4: "Liniar: Grad 1 ($mx + b$)",
                        list4_5: "Pătratic: Grad 2 ($ax^2 + bx + c$)",
                        list4_6: "Cubic: Grad 3",

                        // Grafic: Compararea Tipurilor de Polinoame
                        plot4_title: "Compararea Gradelor",
                        plot4_desc: "Liniar este o linie dreaptă. Pătratic este o parabolă în formă de U. Cubic este o curbă în formă de S.",
                        plot4_type: "multi_function",
                        plot4_domain: [-3, 3],
                        plot4_functions: [
                            { expression: "x", color: "blue", label: "Liniar (x)" },
                            { expression: "x^2", color: "green", label: "Pătratic (x^2)" },
                            { expression: "x^3", color: "red", label: "Cubic (x^3)" }
                        ]
                    },
                    section5: {
                        title5: "Egalitatea Polinoamelor",
                        def5_1: "Două polinoame sunt egale dacă și numai dacă au același grad și coeficienții lor corespunzători sunt identici.",

                        // Exemplu: Rezolvarea pentru Constante
                        ex5_1_title: "Exemplu (Găsirea Constantelor)",
                        ex5_1_problem: "Găsește A și B dacă $2x + 5 = Ax + B$.",
                        ex5_1_step1: "Compară coeficienții lui x: $2 = A$.",
                        ex5_1_step2: "Compară termenii constanți: $5 = B$.",
                        ex5_1_solution: "Deci, $A=2$ și $B=5$.",

                        math5_1: `Ax^2 + Bx + C = 2x^2 - 5x + 1 \\implies A=2, B=-5, C=1`,
                        text5_1: "Acest principiu este adesea folosit pentru a rezolva constante necunoscute."
                    },
                    example_section: {
                        title_ex: "Exemple cu Soluții Pas cu Pas",
                        ex1: {
                            title: "1. Formă Standard și Identificare",
                            problem: "Rescrie în formă standard și identifică gradul și coeficientul principal.",
                            problem_math: `P(x) = 4 - 2x + 7x^5 - 3x^2`,
                            step1_title: "Pasul 1: Identifică Exponenții",
                            step1_desc: "Puterile sunt 0 (constantă), 1 ($2x$), 5 ($7x^5$) și 2 ($-3x^2$).",
                            step2_title: "Pasul 2: Reordonează",
                            step2_desc: "Plasează termenii în ordine descrescătoare a puterilor: 5, apoi 2, apoi 1, apoi 0.",
                            step2_math: `P(x) = 7x^5 - 3x^2 - 2x + 4`,
                            step3_title: "Pasul 3: Identifică Grad și CP",
                            step3_desc: "Cea mai mare putere este 5. Numărul din fața lui $x^5$ este 7.",
                            result_title: "Răspuns Final",
                            result: "Grad: 5, Coeficient Principal: 7."
                        },
                        ex2: {
                            title: "2. Validarea Polinoamelor",
                            problem: "Care dintre următoarele sunt polinoame?",
                            problem_math: `A) \\; 3x^2 + 2x^{-1} \\quad B) \\; 5\\sqrt{x} + 2 \\quad C) \\; \\frac{1}{2}x^3 - \\pi`,
                            step1_title: "Pasul 1: Analizează Exponenții",
                            step1_desc: "Polinoamele trebuie să aibă exponenți întregi nenegativi (0, 1, 2, ...).",
                            step2_title: "Pasul 2: Verifică Fiecare Caz",
                            step2_math: `A: x^{-1} \\text{ are un exponent negativ. (Nu e polinom)} \\\\ B: \\sqrt{x} = x^{1/2} \\text{ are o fracție. (Nu e polinom)} \\\\ C: \\text{Coeficienții pot fi fracții (1/2) sau iraționali (}\\pi\\text{). Puterile sunt întregi.}`,
                            result_title: "Răspuns Final",
                            result: "Doar C este un polinom."
                        },
                        ex3: {
                            title: "3. Găsirea Coeficienților (Egalitate)",
                            problem: "Găsește A și B dacă ecuația este adevărată pentru orice x:",
                            problem_math: `2x(x + 3) = Ax^2 + Bx`,
                            step1_title: "Pasul 1: Extinde Partea Stângă",
                            step1_desc: "Distribuie $2x$.",
                            step1_math: `2x \\cdot x + 2x \\cdot 3 = 2x^2 + 6x`,
                            step2_title: "Pasul 2: Compară Coeficienții",
                            step2_math: `2x^2 + 6x = Ax^2 + Bx`,
                            step3_title: "Pasul 3: Potrivește Termenii",
                            step3_desc: "Termenul $x^2$ se potrivește cu A. Termenul $x$ se potrivește cu B.",
                            result_title: "Răspuns Final",
                            result: `A = 2, \\quad B = 6`
                        }
                    }
                }
            }
        },
        polynomial_operations: {
            title: "Operații cu Polinoame",
            description: "Stăpânirea aritmeticii polinoamelor: adunarea, scăderea, înmulțirea și două metode puternice pentru împărțire.",
            lessons: {
                lesson2_title: "Aritmetică și Algoritmi de Împărțire",
                lesson2: {
                    section1: {
                        title1: "Adunare și Scădere",
                        def1_1: "Regula de Aur: Poți aduna sau scădea doar Termeni Asemenea.",
                        def1_2: "Termenii Asemenea sunt termeni care au exact aceeași variabilă ridicată la exact același exponent.",

                        // Grafic: Gruparea Termenilor Asemenea
                        plot1_title: "Vizualizarea Termenilor Asemenea",
                        plot1_desc: "Grupăm termenii după părțile lor variabile. Termenii $x^2$ merg împreună, termenii $x$ merg împreună.",
                        plot1_type: "polynomial_grouping",
                        plot1_data: {
                            expression: "(2x^2 + 3x) + (4x^2 - x)",
                            groups: [
                                { terms: ["2x^2", "4x^2"], color: "red", label: "Pătratic" },
                                { terms: ["3x", "-x"], color: "blue", label: "Liniar" }
                            ]
                        },

                        math1_1: `3x^2 + 5x^2 = 8x^2 \\quad \\text{(Corect)}`,
                        math1_2: `3x^2 + 5x = \\text{Nu se poate combina}`,
                        text1_1: "Când scazi polinoame, amintește-ți să distribui semnul negativ la fiecare termen din al doilea polinom.",

                        // Exemplu: Scădere
                        ex1_1_title: "Exemplu (Scădere)",
                        ex1_1_problem: "Simplifică $(5x^2 + 2x - 1) - (3x^2 - 4x + 2)$.",
                        ex1_1_step1: "Distribuie negativul: $5x^2 + 2x - 1 - 3x^2 + 4x - 2$.",
                        ex1_1_step2: "Grupează termenii asemenea: $(5x^2 - 3x^2) + (2x + 4x) + (-1 - 2)$.",
                        ex1_1_solution: "Rezultat: $2x^2 + 6x - 3$."
                    },
                    section2: {
                        title2: "Înmulțire",
                        def2_1: "Înmulțirea se bazează pe Proprietatea Distributivă și Regula Exponenților: $x^a \\cdot x^b = x^{a+b}$.",
                        list2_1: "Monom × Polinom: Distribuie termenul unic la toți termenii din interior.",
                        list2_2: "Binom × Binom: Folosește metoda FOIL (Primul, Exterior, Interior, Ultimul).",
                        list2_3: "Înmulțire Generală: Înmulțește fiecare termen din primul polinom cu fiecare termen din al doilea.",

                        // Grafic: Metoda Cutiei (Modelul Ariei)
                        plot2_title: "Metoda Cutiei (Modelul Ariei)",
                        plot2_desc: "Vizualizând $(x+2)(x+3)$. Aria celor patru dreptunghiuri interioare însumează produsul.",
                        plot2_type: "polynomial_box_method",
                        plot2_data: {
                            top_labels: ["x", "+3"],
                            side_labels: ["x", "+2"],
                            cells: [
                                { val: "x^2", color: "light-blue" }, { val: "3x", color: "light-green" },
                                { val: "2x", color: "light-green" }, { val: "6", color: "light-yellow" }
                            ]
                        },

                        // Exemplu: Înmulțire Binom
                        ex2_1_title: "Exemplu (FOIL)",
                        ex2_1_problem: "Înmulțește $(2x + 1)(x - 5)$.",
                        ex2_1_step1: "Primul: $2x \\cdot x = 2x^2$. Exterior: $2x \\cdot -5 = -10x$.",
                        ex2_1_step2: "Interior: $1 \\cdot x = 1x$. Ultimul: $1 \\cdot -5 = -5$.",
                        ex2_1_step3: "Combină termenii asemenea (-10x + 1x).",
                        ex2_1_solution: "Rezultat: $2x^2 - 9x - 5$."
                    },
                    section3: {
                        title3: "Împărțirea Lungă a Polinoamelor",
                        def3_1: "Folosită pentru a împărți un polinom la alt polinom de orice grad. Urmează același algoritm ca împărțirea lungă aritmetică.",

                        step3_1: "1. Împarte: Împarte termenul principal al deîmpărțitului la termenul principal al împărțitorului.",
                        step3_2: "2. Înmulțește: Înmulțește rezultatul cu întregul împărțitor.",
                        step3_3: "3. Scade: Scade acest rezultat din original (inversează semnele!).",
                        step3_4: "4. Coboară: Coboară următorul termen și repetă.",

                        math3_1: `\\frac{P(x)}{D(x)} = Q(x) + \\frac{R(x)}{D(x)}`,
                        text3_1: "Unde Q este Câtul, R este Restul, și D este Împărțitorul.",

                        // Exemplu: Împărțire Lungă
                        ex3_1_title: "Exemplu (Împărțire Lungă)",
                        ex3_1_problem: "Împarte $2x^2 + 7x + 6$ la $x + 2$.",
                        ex3_1_step1: "Împarte: $2x^2 \\div x = 2x$. Scrie $2x$ sus.",
                        ex3_1_step2: "Înmulțește: $2x(x + 2) = 2x^2 + 4x$.",
                        ex3_1_step3: "Scade: $(2x^2 + 7x) - (2x^2 + 4x) = 3x$. Coboară $+6$.",
                        ex3_1_step4: "Repetă: $3x \\div x = 3$. Înmulțește $3(x+2) = 3x + 6$. Scade pentru a obține $0$.",
                        ex3_1_solution: "Câtul este $2x + 3$ cu Rest $0$."
                    },
                    section4: {
                        title4: "Împărțirea Sintetică",
                        def4_1: "O metodă prescurtată pentru împărțire care folosește doar coeficienții. Este mai rapidă dar are o cerință strictă.",
                        warning4_1: "Constrângere: Împărțirea Sintetică funcționează doar când împărțim la un binom liniar de forma $(x - c)$.",

                        step4_1: "1. Configurare: Scrie 'c' în exterior (dacă împarți la $x-3$, folosește 3). Scrie coeficienții în interior.",
                        step4_2: "2. Coboară: Coboară primul coeficient direct jos.",
                        step4_3: "3. Înmulțește și Adună: Înmulțește numărul de jos cu 'c', plasează-l în următoarea coloană, adună în jos.",
                        text4_2: "Numerele de pe rândul de jos reprezintă coeficienții câtului (care este întotdeauna cu un grad mai mic).",

                        // Exemplu: Împărțire Sintetică
                        ex4_1_title: "Exemplu (Sintetică)",
                        ex4_1_problem: "Împarte $x^3 - 4x^2 + 2x - 5$ la $x - 3$.",
                        ex4_1_step1: "Configurare: $c = 3$. Coeficienții sunt $[1, -4, 2, -5]$.",
                        ex4_1_step2: "Coboară 1. Înmulțește $3(1)=3$. Adună la -4: $-4+3 = -1$.",
                        ex4_1_step3: "Înmulțește $3(-1)=-3$. Adună la 2: $2-3 = -1$.",
                        ex4_1_step4: "Înmulțește $3(-1)=-3$. Adună la -5: $-5-3 = -8$ (Rest).",
                        ex4_1_solution: "Cât: $x^2 - x - 1$, Rest: $-8$."
                    },
                    example_section: {
                        title_ex: "Exemple cu Soluții Pas cu Pas",
                        ex1: {
                            title: "1. Înmulțirea Polinoamelor",
                            problem: "Extinde și simplifică:",
                            problem_math: `(2x - 3)(x^2 + 4x - 1)`,
                            step1_title: "Pasul 1: Distribuie 2x",
                            step1_math: `2x(x^2) + 2x(4x) + 2x(-1) = 2x^3 + 8x^2 - 2x`,
                            step2_title: "Pasul 2: Distribuie -3",
                            step2_desc: "Ai grijă la semne.",
                            step2_math: `-3(x^2) - 3(4x) - 3(-1) = -3x^2 - 12x + 3`,
                            step3_title: "Pasul 3: Combină Termenii Asemenea",
                            step3_desc: "Combină termenii $x^2$ și termenii $x$.",
                            step3_math: `2x^3 + (8x^2 - 3x^2) + (-2x - 12x) + 3`,
                            result_title: "Răspuns Final",
                            result: `2x^3 + 5x^2 - 14x + 3`
                        },
                        ex2: {
                            title: "2. Împărțirea Lungă a Polinoamelor",
                            problem: "Împarte folosind Împărțirea Lungă:",
                            problem_math: `(x^2 - 5x + 6) \\div (x - 2)`,
                            step1_title: "Pasul 1: Împarte Termenii Principali",
                            step1_desc: "De câte ori intră $x$ în $x^2$? Răspuns: $x$.",
                            step2_title: "Pasul 2: Înmulțește și Scade",
                            step2_desc: "Înmulțește $x(x-2) = x^2 - 2x$. Scade asta din rândul de sus: $(-5x) - (-2x) = -3x$.",
                            step3_title: "Pasul 3: Coboară și Repetă",
                            step3_desc: "Coboară $+6$. Acum împarte $-3x$ la $x$. Răspuns: $-3$.",
                            step3_math: `-3(x - 2) = -3x + 6`,
                            step4_title: "Pasul 4: Rest",
                            step4_desc: "Scăderea dă 0.",
                            result_title: "Răspuns Final",
                            result: `x - 3`
                        },
                        ex3: {
                            title: "3. Împărțirea Sintetică",
                            problem: "Împarte folosind Împărțirea Sintetică:",
                            problem_math: `(3x^3 - 2x^2 + x - 5) \\div (x - 2)`,
                            step1_title: "Pasul 1: Configurare",
                            step1_desc: "Împărțitorul este $x-2$, deci folosește $c = 2$. Coeficienții sunt [3, -2, 1, -5].",
                            step2_title: "Pasul 2: Algoritmul",
                            step2_math: `\\text{Jos: } 3 \\\\ \\text{Înmultim:  } 2 \\cdot 3 = 6 \\rightarrow \\text{Adună la -2} = 4 \\\\ \\text{Înmultim:  } 2 \\cdot 4 = 8 \\rightarrow \\text{Adună la 1} = 9 \\\\ \\text{Înmultim:  } 2 \\cdot 9 = 18 \\rightarrow \\text{Adună la -5} = 13`,
                            step3_title: "Pasul 3: Interpretare Rezultat",
                            step3_desc: "Rândul de jos este 3, 4, 9 cu rest 13. Gradul scade de la 3 la 2.",
                            result_title: "Răspuns Final",
                            result: `3x^2 + 4x + 9 + \\frac{13}{x-2}`
                        }
                    }
                }
            }
        },
        factorization_techniques: {
            title: "Tehnici de Factorizare",
            description: "Arta de a descompune polinoame: convertirea expresiilor complexe în produse de factori mai simpli.",
            lessons: {
                lesson3_title: "Metode Fundamentale de Factorizare",
                lesson3: {
                    section1: {
                        title1: "Cel Mai Mare Divizor Comun (CMMDC)",
                        def1_1: "Prima regulă a factorizării: Caută întotdeauna un Factor Comun mai întâi.",

                        // Plot: Vizualizarea CMMDC
                        plot1_title: "Vizualizarea CMMDC",
                        plot1_desc: "'Scoatem' termenul comun $2x$ din ambele părți ale expresiei.",
                        plot1_type: "polynomial_gcf_visual",
                        plot1_data: {
                            original: "2x^2 + 6x",
                            gcf: "2x",
                            remainder: "(x + 3)",
                            color_gcf: "blue",
                            color_rem: "black"
                        },

                        text1_1: "Identifică cel mai mare număr și cea mai mare putere a variabilei care se împarte exact la fiecare termen.",
                        math1_1: `ab + ac = a(b + c)`,
                        warning1: "Dacă termenul principal este negativ, de obicei este cel mai bine să factorizezi și semnul negativ.",

                        // Exemplu: CMMDC
                        ex1_1_title: "Exemplu (CMMDC)",
                        ex1_1_problem: "Factorizează $12x^3 - 8x^2$.",
                        ex1_1_step1: "Coeficienți: CMMDC al lui 12 și 8 este 4.",
                        ex1_1_step2: "Variabile: CMMDC al lui $x^3$ și $x^2$ este $x^2$.",
                        ex1_1_step3: "Împarte fiecare termen la $4x^2$.",
                        ex1_1_solution: "Rezultat: $4x^2(3x - 2)$."
                    },
                    section2: {
                        title2: "Modele Speciale",
                        def2_1_title: "Diferența de Pătrate",
                        def2_1: "Două pătrate perfecte separate de un semn minus.",
                        math2_1: `a^2 - b^2 = (a - b)(a + b)`,

                        // Plot: Geometria Diferenței de Pătrate
                        plot2_title: "Demonstrație Geometrică",
                        plot2_desc: "Aria unui pătrat mare ($a^2$) minus un pătrat mic ($b^2$) poate fi rearanjată într-un dreptunghi cu dimensiunile $(a-b)$ și $(a+b)$.",
                        plot2_type: "diff_squares_geometry",
                        plot2_data: { a: 5, b: 2 },

                        // Exemplu: Diferența de Pătrate
                        ex2_1_title: "Exemplu (Dif. de Pătrate)",
                        ex2_1_problem: "Factorizează $9x^2 - 16$.",
                        ex2_1_step1: "Identifică pătratele: $9x^2 = (3x)^2$ deci $a=3x$. $16 = 4^2$ deci $b=4$.",
                        ex2_1_solution: "Aplică formula: $(3x - 4)(3x + 4)$.",

                        text2_1: "Notă: O 'Sumă de Pătrate' ($a^2 + b^2$) nu poate fi factorizată în numere reale.",

                        def2_2_title: "Trinoame Pătratice Perfecte",
                        def2_2: "Rezultatul ridicării unui binom la pătrat.",
                        math2_2: `a^2 + 2ab + b^2 = (a + b)^2 \\quad \\text{și} \\quad a^2 - 2ab + b^2 = (a - b)^2`
                    },
                    section3: {
                        title3: "Factorizarea prin Grupare",
                        def3_1: "Folosită în principal când un polinom are 4 termeni.",

                        // Plot: Vizualizarea Grupării
                        plot3_title: "Vizualizarea Grupării",
                        plot3_desc: "Împărțim cei 4 termeni în două perechi. Scopul este să găsim un factor binomial comun (partea din paranteze).",
                        plot3_type: "grouping_visual",
                        plot3_data: {
                            expr: "x^3 + 2x^2 + 3x + 6",
                            group1: "x^2(x + 2)",
                            group2: "+ 3(x + 2)",
                            common: "(x + 2)"
                        },
                        plot3_description: "Aceeași arie, formă diferită",
                        step3_1: "1. Grupează termenii: Grupează primii doi termeni și ultimii doi termeni.",
                        step3_2: "2. Factorizează CMMDC: Extrage CMMDC din fiecare pereche separat.",
                        step3_3: "3. Binom Factor: Dacă se face corect, parantezele se vor potrivi. Factorizează acest binom comun.",

                        math3_1: `ax + ay + bx + by = a(x+y) + b(x+y) = (a+b)(x+y)`,

                        // Exemplu: Grupare
                        ex3_1_title: "Exemplu (Grupare)",
                        ex3_1_problem: "Factorizează $2x^3 - 3x^2 + 4x - 6$.",
                        ex3_1_step1: "Grupează: $(2x^3 - 3x^2) + (4x - 6)$.",
                        ex3_1_step2: "Factorizează CMMDC-uri: $x^2(2x - 3) + 2(2x - 3)$.",
                        ex3_1_step3: "Verifică potrivirea: $(2x - 3)$ este în ambele.",
                        ex3_1_solution: "Rezultat: $(x^2 + 2)(2x - 3)$."
                    },
                    section4: {
                        title4: "Tehnici Avansate",

                        // --- Cuburi ---
                        def4_1_title: "Suma și Diferența Cuburilor",
                        math4_1: `a^3 - b^3 = (a - b)(a^2 + ab + b^2)`,
                        math4_2: `a^3 + b^3 = (a + b)(a^2 - ab + b^2)`,

                        // Plot: Mnemonic SOAP
                        plot4_title: "Metoda SOAP",
                        plot4_desc: "Ajutor vizual pentru plasarea semnelor în factorizarea cubică.",
                        plot4_type: "mnemonic_visual",
                        plot4_data: { mnemonic: "SOAP", meaning: ["Same (Același)", "Opposite (Opus)", "Always (Mereu)", "Positive (Pozitiv)"] },

                        text4_1: "Mnemonic: SOAP (Același semn, Semn Opus, Mereu Pozitiv).",

                        // Exemplu: Diferența de Cuburi
                        ex4_1_title: "Exemplu (Cuburi)",
                        ex4_1_problem: "Factorizează $8x^3 - 27$.",
                        ex4_1_step1: "Identifică cuburile: $(2x)^3 - 3^3$. Deci $a=2x, b=3$.",
                        ex4_1_step2: "Aplică SOAP: $(2x - 3)((2x)^2 + (2x)(3) + 3^2)$.",
                        ex4_1_solution: "Rezultat: $(2x - 3)(4x^2 + 6x + 9)$.",

                        // --- Metoda AC ---
                        def4_2_title: "Trinoame Pătratice (Metoda AC)",
                        text4_2: "Pentru $ax^2 + bx + c$, găsește două numere care înmulțite dau $a \\cdot c$ și adunate dau $b$. Împarte termenul din mijloc și folosește gruparea.",

                        // Exemplu: Metoda AC
                        ex4_2_title: "Exemplu (Metoda AC)",
                        ex4_2_problem: "Factorizează $3x^2 + 10x + 8$.",
                        ex4_2_step1: "Înmulțește $a \\cdot c$: $3(8) = 24$. Găsește factori ai lui 24 care se adună la 10: 6 și 4.",
                        ex4_2_step2: "Împarte termenul din mijloc: $3x^2 + 6x + 4x + 8$.",
                        ex4_2_step3: "Grupează: $3x(x + 2) + 4(x + 2)$.",
                        ex4_2_solution: "Rezultat: $(3x + 4)(x + 2)$."
                    },
                    example_section: {
                        title_ex: "Exemple cu Soluții Pas cu Pas",
                        ex1: {
                            title: "1. CMMDC și Diferența de Pătrate",
                            problem: "Factorizează complet:",
                            problem_math: `3x^3 - 27x`,
                            step1_title: "Pasul 1: Factorizează CMMDC",
                            step1_desc: "Ambii termeni sunt divizibili cu $3x$.",
                            step1_math: `3x(x^2 - 9)`,
                            step2_title: "Pasul 2: Identifică Modelul",
                            step2_desc: "În interiorul parantezei, $x^2 - 9$ este o Diferență de Pătrate ($x^2 - 3^2$).",
                            step2_math: `(x - 3)(x + 3)`,
                            result_title: "Răspuns Final",
                            result: `3x(x - 3)(x + 3)`
                        },
                        ex2: {
                            title: "2. Factorizarea prin Grupare",
                            problem: "Factorizează polinomul cu patru termeni:",
                            problem_math: `x^3 + 4x^2 + 3x + 12`,
                            step1_title: "Pasul 1: Grupează Termenii",
                            step1_desc: "Grupează $(x^3 + 4x^2)$ și $(3x + 12)$.",
                            step2_title: "Pasul 2: Factorizează CMMDC din Grupuri",
                            step2_math: `x^2(x + 4) + 3(x + 4)`,
                            step3_title: "Pasul 3: Factorizează Binomul Comun",
                            step3_desc: "Termenul $(x+4)$ este comun ambelor părți.",
                            result_title: "Răspuns Final",
                            result: `(x^2 + 3)(x + 4)`
                        },
                        ex3: {
                            title: "3. Metoda AC (Trinoame)",
                            problem: "Factorizează:",
                            problem_math: `2x^2 + 7x + 3`,
                            step1_title: "Pasul 1: Înmulțește A și C",
                            step1_desc: "$A=2, C=3$. Produsul este $6$. Avem nevoie de factori ai lui 6 care se adună la $B=7$.",
                            step1_math: `\\text{Factori: } 6 \\text{ și } 1 \\quad (6 \\cdot 1 = 6, \\; 6+1 = 7)`,
                            step2_title: "Pasul 2: Împarte Termenul din Mijloc",
                            step2_math: `2x^2 + 6x + 1x + 3`,
                            step3_title: "Pasul 3: Grupează și Rezolvă",
                            step3_desc: "Factorizează prin grupare.",
                            step3_math: `2x(x + 3) + 1(x + 3)`,
                            result_title: "Răspuns Final",
                            result: `(2x + 1)(x + 3)`
                        }
                    }
                }
            }
        },
        roots_zeros: {
            title: "Rădăcini și Zerouri",
            description: "Conectarea algebrei cu geometria: găsirea valorilor exacte unde un polinom este egal cu zero și înțelegerea Teoremei Fundamentale a Algebrei.",
            lessons: {
                lesson4_title: "Teoreme și Strategii de Rezolvare",
                lesson4: {
                    section1: {
                        title1: "Teorema Fundamentală și Teorema Factorului",
                        def1_1: "Teorema Fundamentală a Algebrei: Orice polinom de grad $n$ are exact $n$ rădăcini complexe (numărând multiplicitatea).",
                        text1_1: "Aceasta garantează că o ecuație de gradul 5 are exact 5 soluții.",

                        // Plot: Rădăcini vs Factori
                        plot1_title: "Conexiune: Rădăcini și Factori",
                        plot1_desc: "Dacă graficul traversează axa x în $c=2$, atunci $(x-2)$ este un factor al polinomului.",
                        plot1_type: "root_factor_visual",
                        plot1_data: {
                            root: 2,
                            factor: "(x - 2)",
                            function: "(x-2)(x+1)(x-4)",
                            domain: [-2, 5]
                        },
                        plot1_description: "- factor",
                        def1_2: "Teorema Factorului:",
                        math1_1: `P(c) = 0 \\iff (x - c) \\text{ este un factor al lui } P(x)`,
                        text1_2: "Aceasta oferă o legătură directă între factorii algebrici și intersecțiile geometrice cu axa x."
                    },
                    section2: {
                        title2: "Teorema Rădăcinii Raționale",
                        def2_1: "O strategie pentru a găsi o listă de *posibile* rădăcini raționale când polinomul are coeficienți întregi.",

                        math2_1: `\\text{Rădăcini Posibile} = \\pm \\frac{\\text{Factorii Termenului Constant } (p)}{\\text{Factorii Coeficientului Principal } (q)}`,

                        step2_1: "1. Listează toți factorii termenului constant ($p$).",
                        step2_2: "2. Listează toți factorii coeficientului principal ($q$).",
                        step2_3: "3. Formează toate fracțiile $p/q$ și testează-le folosind împărțirea sintetică.",

                        // Exemplu: Teorema Rădăcinii Raționale
                        ex2_1_title: "Exemplu (Găsirea Candidaților)",
                        ex2_1_problem: "Găsește posibilele rădăcini raționale pentru $2x^3 + x^2 - 13x + 6$.",
                        ex2_1_step1: "Constant $p = 6$. Factori: $\\pm 1, \\pm 2, \\pm 3, \\pm 6$.",
                        ex2_1_step2: "Coef. Principal $q = 2$. Factori: $\\pm 1, \\pm 2$.",
                        ex2_1_step3: "Formează rapoarte $p/q$: $\\pm 1, \\pm 2, \\pm 3, \\pm 6, \\pm 1/2, \\pm 3/2$.",
                        ex2_1_solution: "Acestea sunt singurele rădăcini raționale posibile de testat."
                    },
                    section3: {
                        title3: "Multiplicitate",
                        def3_1: "Multiplicitatea se referă la de câte ori apare un factor specific în factorizarea polinomului.",
                        math3_1: `P(x) = (x - 2)^3 (x + 1)^2`,

                        // Plot: Comportament Multiplicitate
                        plot3_title: "Vizualizarea Multiplicității",
                        plot3_desc: "La x=1 (putere impară ^1), graficul traversează. La x=2 (putere pară ^2), graficul ricoșează.",
                        plot3_type: "multiplicity_visual",
                        plot3_data: {
                            function: "(x-1)(x-2)^2",
                            roots: [
                                { x: 1, type: "cross", label: "Impar (Traversează)" },
                                { x: 2, type: "bounce", label: "Par (Ricoșează)" }
                            ]
                        },

                        list3_1: "Multiplicitate Impară (de ex., ^1, ^3): Graficul **traversează** axa x.",
                        list3_2: "Multiplicitate Pară (de ex., ^2, ^4): Graficul **atinge** (ricoșează din) axa x.",

                        // Exemplu: Multiplicitate
                        ex3_1_title: "Exemplu (Comportamentul Graficului)",
                        ex3_1_problem: "Descrie comportamentul lui $f(x) = (x+3)^2 (x-1)^3$ la intersecții.",
                        ex3_1_step1: "Rădăcina $x=-3$: Multiplicitate 2 (Pară). Graficul ricoșează.",
                        ex3_1_step2: "Rădăcina $x=1$: Multiplicitate 3 (Impară). Graficul traversează."
                    },
                    section4: {
                        title4: "Rădăcini Complexe",
                        def4_1: "Dacă un polinom are coeficienți reali, rădăcinile complexe vin întotdeauna în perechi conjugate.",
                        math4_2: `\\text{Dacă } a + bi \\text{ este o rădăcină, atunci } a - bi \\text{ este de asemenea o rădăcină.}`,
                        text4_1: "Aceasta explică de ce polinoamele de grad impar trebuie să aibă cel puțin o rădăcină reală (rădăcinile complexe consumă gradul în perechi de 2).",

                        // Exemplu: Conjugate Complexe
                        ex4_1_title: "Exemplu (Găsirea Rădăcinilor)",
                        ex4_1_problem: "Un polinom cubic are rădăcinile $3$ și $2 - i$. Găsește a treia rădăcină.",
                        ex4_1_solution: "Deoarece rădăcinile complexe vin în perechi, a treia rădăcină trebuie să fie conjugata: $2 + i$."
                    },
                    example_section: {
                        title_ex: "Exemple cu Soluții Pas cu Pas",
                        ex1: {
                            title: "1. Folosind Teorema Rădăcinii Raționale",
                            problem: "Găsește toate rădăcinile raționale posibile pentru:",
                            problem_math: `P(x) = 2x^3 + x^2 - 13x + 6`,
                            step1_title: "Pasul 1: Identifică p și q",
                            step1_desc: "Factorii termenului constant (6): $p = 1, 2, 3, 6$. Factorii coef. principal (2): $q = 1, 2$.",
                            step2_title: "Pasul 2: Listează Combinațiile",
                            step2_desc: "Ia fiecare p împărțit la fiecare q.",
                            step2_math: `\\pm \\frac{1, 2, 3, 6}{1} \\implies \\pm 1, \\pm 2, \\pm 3, \\pm 6 \\\\ \\pm \\frac{1, 2, 3, 6}{2} \\implies \\pm \\frac{1}{2}, \\pm \\frac{3}{2} \\quad (1 \\text{ și } 3 \\text{ sunt duplicate})`,
                            result_title: "Răspuns Final",
                            result: `\\text{Candidați: } \\pm 1, \\pm 2, \\pm 3, \\pm 6, \\pm \\frac{1}{2}, \\pm \\frac{3}{2}`
                        },
                        ex2: {
                            title: "2. Rezolvarea cu Teorema Factorului",
                            problem: "Este $(x-2)$ un factor al lui $P(x) = x^3 - 4x^2 + 3x + 2$?",
                            step1_title: "Pasul 1: Aplică Teorema",
                            step1_desc: "Dacă $(x-2)$ este un factor, atunci $P(2)$ trebuie să fie egal cu 0.",
                            step2_title: "Pasul 2: Evaluează P(2)",
                            step2_math: `P(2) = (2)^3 - 4(2)^2 + 3(2) + 2 \\\\ = 8 - 16 + 6 + 2 \\\\ = 0`,
                            step3_title: "Pasul 3: Concluzie",
                            step3_desc: "Deoarece restul este 0, este un factor.",
                            result_title: "Răspuns Final",
                            result: "Da, $(x-2)$ este un factor."
                        },
                        ex3: {
                            title: "3. Analizarea Multiplicității din Forma Factorizată",
                            problem: "Descrie comportamentul graficului la intersecții:",
                            problem_math: `P(x) = -2(x - 3)^2 (x + 1)^3`,
                            step1_title: "Pasul 1: Identifică Rădăcinile",
                            step1_desc: "Rădăcinile sunt la $x = 3$ și $x = -1$.",
                            step2_title: "Pasul 2: Verifică Multiplicitatea",
                            step2_math: `\\text{La } x=3: \\text{ Puterea este 2 (Pară)} \\\\ \\text{La } x=-1: \\text{ Puterea este 3 (Impară)}`,
                            step3_title: "Pasul 3: Determină Comportamentul",
                            result_title: "Răspuns Final",
                            result: "La $x=3$, graficul atinge/ricoșează. La $x=-1$, graficul traversează axa."
                        }
                    }
                }
            }
        },
        polynomial_equations: {
            title: "Ecuații Polinomiale",
            description: "Găsirea valorilor lui x care fac ecuația adevărată: de la izolări liniare simple la rezolvarea problemelor complexe de grad superior.",
            lessons: {
                lesson5_title: "Strategii de Rezolvare și Aplicații",
                lesson5: {
                    section1: {
                        title1: "Ecuații Liniare (Grad 1)",
                        def1_1: "Cea mai simplă formă a unei ecuații polinomiale.",

                        // Plot: Vizualizare Rezolvare Ecuație
                        plot1_title: "Izolarea Variabilei",
                        plot1_desc: "Rezolvând $2x - 6 = 0$. Pentru a obține x singur, trebuie să mutăm constanta (-6) și apoi să împărțim la coeficient (2).",
                        plot1_type: "linear_solver_visual",
                        plot1_data: {
                            equation: "2x - 6 = 0",
                            step1: "Adună 6 la ambele părți -> 2x = 6",
                            step2: "Împarte la 2 -> x = 3",
                            root: 3
                        },

                        math1_1: `ax + b = 0 \\implies x = -\\frac{b}{a}`,
                        text1_1: "Scopul este pur și simplu de a izola variabila folosind operații inverse (adunare/scădere, apoi înmulțire/împărțire).",

                        // Exemplu: Liniar
                        ex1_1_title: "Exemplu (Liniar)",
                        ex1_1_problem: "Rezolvă $3x + 7 = 22$.",
                        ex1_1_step1: "Scade 7 din ambele părți: $3x = 15$.",
                        ex1_1_step2: "Împarte la 3: $x = 5$.",
                        ex1_1_solution: "Soluție: $x = 5$."
                    },
                    section2: {
                        title2: "Ecuații Pătratice (Grad 2)",
                        def2_1: "Forma Standard: $ax^2 + bx + c = 0$.",

                        def2_2_title: "Metoda 1: Factorizarea (Proprietatea Produsului Zero)",
                        text2_1: "Dacă $(x-r)(x-s) = 0$, atunci $x=r$ sau $x=s$. Aceasta este cea mai rapidă metodă dacă numerele sunt drăguțe.",

                        // Exemplu: Factorizare
                        ex2_1_title: "Exemplu (Factorizare)",
                        ex2_1_problem: "Rezolvă $x^2 - 5x + 6 = 0$.",
                        ex2_1_step1: "Găsește numere care înmulțite dau 6 și adunate dau -5: (-2, -3).",
                        ex2_1_step2: "Factorizează: $(x - 2)(x - 3) = 0$.",
                        ex2_1_solution: "Rădăcini: $x = 2, x = 3$.",

                        def2_3_title: "Metoda 2: Formula Pătratică",
                        text2_2: "Folosită când factorizarea este dificilă sau imposibilă. Funcționează pentru *orice* ecuație pătratică.",
                        math2_1: `x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}`,

                        // Exemplu: Formula Pătratică
                        ex2_2_title: "Exemplu (Formula Pătratică)",
                        ex2_2_problem: "Rezolvă $2x^2 + 5x - 3 = 0$.",
                        ex2_2_step1: "Identifică $a=2, b=5, c=-3$.",
                        ex2_2_step2: "Discriminant: $5^2 - 4(2)(-3) = 25 + 24 = 49$.",
                        ex2_2_step3: "Formulă: $\\frac{-5 \\pm 7}{4}$.",
                        ex2_2_solution: "Rădăcini: $x = \\frac{1}{2}, x = -3$.",

                        def2_4_title: "Discriminantul ($\\Delta$)",
                        text2_3: "Valoarea din interiorul rădăcinii pătrate ($b^2 - 4ac$) ne spune despre soluții:",

                        // Plot: Cazuri Discriminant
                        plot2_title: "Discriminantul și Rădăcinile",
                        plot2_desc: "Albastru (Poz): 2 Rădăcini. Verde (Zero): 1 Rădăcină. Roșu (Neg): Fără Rădăcini Reale.",
                        plot2_type: "multi_function",
                        plot2_domain: [-4, 4],
                        plot2_functions: [
                            { expression: "x^2 - 4", color: "blue", label: "D > 0 (2 Reale)" },
                            { expression: "x^2", color: "green", label: "D = 0 (1 Reală)" },
                            { expression: "x^2 + 2", color: "red", label: "D < 0 (0 Reale)" }
                        ],

                        list2_1: "$\\Delta > 0$: Două soluții reale distincte (Traversează axa x de două ori).",
                        list2_2: "$\\Delta = 0$: O soluție reală repetată (Atinge axa x o dată).",
                        list2_3: "$\\Delta < 0$: Două soluții complexe (imaginare) (Nu atinge niciodată axa x)."
                    },
                    section3: {
                        title3: "Ecuații Cubice și de Grad Superior",
                        def3_1: "Strategie: Redu Gradul.",

                        step3_1: "1. Există un CMMDC? Factorizează-l.",
                        step3_2: "2. Poți folosi Gruparea? (Comun pentru cubice cu 4 termeni).",
                        step3_3: "3. Dacă nu, folosește Teorema Rădăcinii Raționale și Împărțirea Sintetică pentru a împărți polinomul la o Pătratică.",

                        text3_1: "Odată ce ajungi la un cât Pătratic, rezolvă-l folosind Formula Pătratică.",

                        // Exemplu: Rezolvarea unei Cubice
                        ex3_1_title: "Exemplu (Rezolvare Grad Superior)",
                        ex3_1_problem: "Rezolvă $x^3 - 2x^2 - 5x + 6 = 0$.",
                        ex3_1_step1: "Testează rădăcini raționale. Încearcă $x=1$: $1 - 2 - 5 + 6 = 0$. Funcționează!",
                        ex3_1_step2: "Împărțire Sintetică la 1: Coeficienți [1, -2, -5, 6] $\\to$ Rest 0.",
                        ex3_1_step3: "Polinom Deprimat: $x^2 - x - 6 = 0$.",
                        ex3_1_step4: "Rezolvă Pătratica: Factorizează $(x-3)(x+2) = 0$.",
                        ex3_1_solution: "Rădăcini: $x = 1, x = 3, x = -2$."
                    },
                    section4: {
                        title4: "Probleme Verbale și Modelare",
                        def4_1: "Traducând Engleza în Matematică.",

                        // Plot: Mișcare Proiectil
                        plot4_title: "Mișcare Proiectil",
                        plot4_desc: "Calea unui obiect aruncat în aer urmează o curbă parabolică ($h(t) = -16t^2 + vt + h$). Înălțimea maximă este vârful; lovirea solului este rădăcina.",
                        plot4_type: "projectile_motion_visual",
                        plot4_data: {
                            function: "-16*t^2 + 64*t",
                            domain: [0, 4],
                            points: [
                                { x: 2, y: 64, label: "Înălțime Max" },
                                { x: 4, y: 0, label: "Sol" }
                            ]
                        },

                        list4_1: "Probleme de Arie: Lungime $\\times$ Lățime ($x(x+5) = Arie$).",
                        list4_2: "Mișcare Proiectil: Înălțime în timp ($h(t) = -16t^2 + v_0t + h_0$).",
                        list4_3: "Volum: Volumul unei cutii ($V = l \\cdot w \\cdot h$).",

                        // Exemplu: Problemă de Arie
                        ex4_1_title: "Exemplu (Geometrie)",
                        ex4_1_problem: "Lungimea unui dreptunghi este cu 3 mai mare decât lățimea. Aria este 40. Găsește dimensiunile.",
                        ex4_1_step1: "Fie $w = x$. Atunci $l = x+3$.",
                        ex4_1_step2: "Ecuație: $x(x+3) = 40 \\implies x^2 + 3x - 40 = 0$.",
                        ex4_1_step3: "Factorizează: $(x+8)(x-5) = 0$.",
                        ex4_1_solution: "x nu poate fi o lungime negativă (-8). Deci Lățime = 5, Lungime = 8."
                    },
                    example_section: {
                        title_ex: "Exemple cu Soluții Pas cu Pas",
                        ex1: {
                            title: "1. Formula Pătratică",
                            problem: "Rezolvă pentru x (răspunsuri exacte):",
                            problem_math: `3x^2 - 5x - 7 = 0`,
                            step1_title: "Pasul 1: Identifică Coeficienții",
                            step1_desc: "$a = 3, \\; b = -5, \\; c = -7$.",
                            step2_title: "Pasul 2: Înlocuiește în Formulă",
                            step2_math: `x = \\frac{-(-5) \\pm \\sqrt{(-5)^2 - 4(3)(-7)}}{2(3)}`,
                            step3_title: "Pasul 3: Simplifică",
                            step3_math: `x = \\frac{5 \\pm \\sqrt{25 + 84}}{6} = \\frac{5 \\pm \\sqrt{109}}{6}`,
                            result_title: "Răspuns Final",
                            result: "Cele două rădăcini sunt $\\frac{5 + \\sqrt{109}}{6}$ și $\\frac{5 - \\sqrt{109}}{6}$."
                        },
                        ex2: {
                            title: "2. Rezolvarea unei Cubice prin Grupare",
                            problem: "Găsește toate rădăcinile:",
                            problem_math: `x^3 - 2x^2 - 9x + 18 = 0`,
                            step1_title: "Pasul 1: Grupează Termenii",
                            step1_desc: "Grupează primii doi și ultimii doi.",
                            step1_math: `(x^3 - 2x^2) - (9x - 18) = 0`,
                            step2_title: "Pasul 2: Factorizează CMMDC-uri",
                            step2_math: `x^2(x - 2) - 9(x - 2) = 0`,
                            step3_title: "Pasul 3: Extrage Binomul Comun",
                            step3_math: `(x^2 - 9)(x - 2) = 0`,
                            step4_title: "Pasul 4: Rezolvă Factorii",
                            step4_desc: "$x^2 - 9$ este o diferență de pătrate $(x-3)(x+3)$.",
                            result_title: "Răspuns Final",
                            result: `x = 2, \\; x = 3, \\; x = -3`
                        },
                        ex3: {
                            title: "3. Problemă Verbală de Optimizare",
                            problem: "O grădină dreptunghiulară are o arie de 40 m². Lungimea este cu 3m mai mare decât lățimea. Găsește dimensiunile.",
                            problem_math: `\\text{Arie} = 40, \\quad L = W + 3`,
                            step1_title: "Pasul 1: Setează Ecuația",
                            step1_math: `W(W + 3) = 40 \\implies W^2 + 3W - 40 = 0`,
                            step2_title: "Pasul 2: Rezolvă pentru W",
                            step2_desc: "Factorizează pătratica. Factorii lui -40 care se adună la 3 sunt +8 și -5.",
                            step2_math: `(W + 8)(W - 5) = 0`,
                            step3_title: "Pasul 3: Renunță la Soluțiile Nevalide",
                            step3_desc: "$W = -8$ sau $W = 5$. Lățimea nu poate fi negativă, deci $W = 5$.",
                            result_title: "Răspuns Final",
                            result: "Lățime = 5m, Lungime = 8m."
                        }
                    }
                }
            }
        },
        real_world_applications: {
            title: "Aplicații în Lumea Reală",
            description: "Văzând polinoamele în acțiune: modelarea spațiului fizic, analiza mișcării, optimizarea profiturilor afacerilor și ajustarea tendințelor datelor.",
            lessons: {
                lesson6_title: "Modelare și Rezolvarea Problemelor",
                lesson6: {
                    section1: {
                        title1: "Arie și Volum (Geometrie)",
                        def1_1: "Polinoamele descriu dimensiunile formelor geometrice atunci când sunt implicate variabile.",
                        text1_1: "Scenariu Comun: Crearea unei cutii dintr-o foaie plată prin tăierea colțurilor de dimensiune 'x'.",
                        math1_1: `V(x) = x(L - 2x)(W - 2x)`,

                        // Plot: Diagramă Problemă Cutie
                        plot1_title: "Vizualizarea Tăieturii",
                        plot1_desc: "O foaie plată de carton cu colțuri tăiate. Îndoirea clapetelor creează o cutie 3D.",
                        plot1_type: "box_cut_visual",
                        plot1_data: {
                            sheet_width: 12,
                            sheet_height: 12,
                            cut_size: "x",
                            folded_dim: "(12-2x) by (12-2x) by x"
                        },
                        caption: "Taie colțuri → Îndoaie → Cutie!",
                        text1_2: "Aici, $V(x)$ devine un polinom cubic (grad 3). Găsirea volumului maxim necesită găsirea vârfului acestei curbe polinomiale."
                    },
                    section2: {
                        title2: "Probleme de Mișcare (Fizică)",
                        def2_1: "Mișcare Proiectil: Înălțimea unui obiect aruncat în aer este modelată de un polinom pătratic datorită gravitației.",
                        math2_1: `h(t) = -16t^2 + v_0t + h_0 \\quad (\\text{Unități imperiale})`,
                        math2_2: `h(t) = -4.9t^2 + v_0t + h_0 \\quad (\\text{Unități metrice})`,
                        list2_1: "$t$: Timp în secunde.",
                        list2_2: "$v_0$: Viteza inițială.",
                        list2_3: "$h_0$: Înălțimea inițială.",

                        // Plot: Traiectorie Proiectil
                        plot2_title: "Traiectorie Parabolică",
                        plot2_desc: "Înălțime în timp. Vârful este înălțimea maximă; intersecția pozitivă cu x este impactul.",
                        plot2_type: "projectile_motion_visual",
                        plot2_data: {
                            function: "-16*t^2 + 64*t + 5",
                            domain: [0, 4.1],
                            points: [
                                { x: 0, y: 5, label: "Start (h0)" },
                                { x: 2, y: 69, label: "Înălțime Max" },
                                { x: 4.08, y: 0, label: "Impact" }
                            ]
                        },
                        max_height: "Înălțime Max (Vârf)",
                        impact: "Impact",
                        gravity: "gravitație",
                        text2_1: "Rezolvarea $h(t) = 0$ îți spune când obiectul atinge solul."
                    },
                    section3: {
                        title3: "Aplicații de Afaceri (Economie)",
                        def3_1: "Polinoamele modelează sănătatea financiară.",
                        math3_1: `P(x) = R(x) - C(x)`,
                        list3_1: "Venit $R(x)$: Preț $\\times$ Cantitate vândută.",
                        list3_2: "Cost $C(x)$: Costuri fixe + Costuri variabile.",
                        list3_3: "Profit $P(x)$: Diferența dintre Venit și Cost.",

                        // Plot: Analiză Profit
                        plot3_title: "Vizualizarea Profitului",
                        plot3_desc: "Regiunea verde este Profit (unde Venit > Cost). Vârful curbei de Profit este Profitul Maxim. Punctele unde Venitul egalează Costul sunt puncte de Break-Even.",
                        plot3_type: "profit_loss_visual",
                        plot3_data: {
                            revenue: "-0.5*x^2 + 50*x", // Venit Parabolic
                            cost: "10*x + 200",       // Cost Liniar
                            profit: "-0.5*x^2 + 40*x - 200", // P(x)
                            domain: [0, 100],
                            break_even_points: [5.36, 74.64] // Rădăcinile lui P(x)
                        },
                        revenue: "Venit",
                        cost: "Cost",
                        profit: "Profit",
                        break_even: "Punct Break-Even",
                        text3_1: "Puncte Break-Even: Rădăcinile lui $P(x)$ (unde Profit = 0).",
                        text3_2: "Pentru a maximiza profitul, găsim vârful parabolei de Profit (pentru modele pătratice).",

                        // Exemplu: Max Profit
                        ex3_1_title: "Exemplu (Maximizarea Profitului)",
                        ex3_1_problem: "Venitul este $R(x) = 50x - 0.5x^2$ și Costul este $C(x) = 10x + 200$. Găsește nivelul de producție $x$ pentru profit maxim.",
                        ex3_1_step1: "Ecuația Profitului: $P(x) = (50x - 0.5x^2) - (10x + 200)$.",
                        ex3_1_step2: "Simplifică: $P(x) = -0.5x^2 + 40x - 200$.",
                        ex3_1_step3: "Găsește Vârf ($x = -b/2a$): $x = -40 / (2 \\cdot -0.5) = -40 / -1 = 40$.",
                        ex3_1_solution: "Maximizează profitul producând 40 de unități."
                    },
                    section4: {
                        title4: "Inginerie și Modelarea Datelor",
                        def4_1: "Ajustarea Curbelor (Regresie): Inginerii folosesc polinoame pentru a aproxima puncte de date complexe din lumea reală.",

                        // Plot: Ajustarea Curbelor
                        plot4_title: "Ajustarea unei Tendințe",
                        plot4_desc: "Punctele roșii sunt date din lumea reală (grafic de dispersie). Linia albastră este un model polinomial (Regresie) folosit pentru a prezice tendințe viitoare.",
                        plot4_type: "scatter_plot_fit",
                        plot4_data: {
                            points: [{ x: 1, y: 2 }, { x: 2, y: 5 }, { x: 3, y: 10 }, { x: 4, y: 17 }],
                            model: "x^2 + 1", // Se potrivește modelului 1, 4, 9, 16 (+1)
                            prediction_point: { x: 5, y: 26 },
                            label: "Ajustare Pătratică"
                        },
                        data: "Date",
                        prediction: "Predicție",
                        text4_1: "Un set de puncte de date împrăștiate poate fi adesea modelat de o 'Linie de cea mai bună potrivire' (Liniară) sau o curbă (Pătratică/Cubică) pentru a prezice rezultate viitoare.",
                        warning4_1: "Supra-ajustare: Folosirea unui polinom cu un grad prea mare ar putea ajusta zgomotul mai degrabă decât tendința.",

                        // Exemplu: Modelare
                        ex4_1_title: "Exemplu (Recunoașterea Modelelor)",
                        ex4_1_problem: "Găsește un model polinomial pentru secvența: 2, 5, 10, 17...",
                        ex4_1_step1: "Primele Diferențe: $5-2=3, 10-5=5, 17-10=7$ (Nu liniar).",
                        ex4_1_step2: "A doua Diferențe: $5-3=2, 7-5=2$ (Constant).",
                        ex4_1_step3: "A doua diferență constantă implică un model Pătratic ($n^2 + 1$).",
                        ex4_1_solution: "Model: $y = x^2 + 1$."
                    },
                    example_section: {
                        title_ex: "Exemple cu Soluții Pas cu Pas",
                        ex1: {
                            title: "1. Mișcare Proiectil",
                            problem: "O rachetă este lansată de la sol ($h_0=0$) cu viteza inițială $v_0 = 98$ m/s. Când se întoarce pe pământ?",
                            problem_math: `h(t) = -4.9t^2 + 98t + 0`,
                            step1_title: "Pasul 1: Setează Înălțimea la Zero",
                            step1_desc: "Vrem să găsim $t$ când $h(t) = 0$.",
                            step1_math: `-4.9t^2 + 98t = 0`,
                            step2_title: "Pasul 2: Factorizează",
                            step2_desc: "Factorizează $t$ (sau $-4.9t$).",
                            step2_math: `t(-4.9t + 98) = 0`,
                            step3_title: "Pasul 3: Rezolvă pentru t",
                            step3_desc: "Două soluții: $t = 0$ (lansare) și $-4.9t + 98 = 0$.",
                            step3_math: `4.9t = 98 \\implies t = 20`,
                            result_title: "Răspuns Final",
                            result: "Racheta lovește solul după 20 de secunde."
                        },
                        ex2: {
                            title: "2. Maximizarea Profitului",
                            problem: "Profitul unei companii este modelat de $P(x) = -x^2 + 100x - 900$. Câte unități ($x$) ar trebui vândute pentru a maximiza profitul?",
                            step1_title: "Pasul 1: Identifică Tipul Funcției",
                            step1_desc: "Aceasta este o parabolă care se deschide în jos (Pătratică). Maximul este la Vârf.",
                            step2_title: "Pasul 2: Formula Vârfului",
                            step2_math: `x = \\frac{-b}{2a}`,
                            step3_title: "Pasul 3: Înlocuiește Coeficienții",
                            step3_desc: "$a = -1, b = 100$.",
                            step3_math: `x = \\frac{-100}{2(-1)} = \\frac{-100}{-2} = 50`,
                            result_title: "Răspuns Final",
                            result: "Vânzarea a 50 de unități produce profitul maxim."
                        },
                        ex3: {
                            title: "3. Construcția Volumului",
                            problem: "O cutie este făcută dintr-o foaie de 10x8 prin tăierea unor pătrate de latură $x$. Exprimă polinomul Volumului.",
                            problem_math: `V = L \\cdot W \\cdot H`,
                            step1_title: "Pasul 1: Definește Dimensiunile",
                            step1_desc: "Înălțime = $x$. Lungime = $10 - 2x$. Lățime = $8 - 2x$.",
                            step2_title: "Pasul 2: Setează Ecuația",
                            step2_math: `V(x) = x(10 - 2x)(8 - 2x)`,
                            step3_title: "Pasul 3: Extinde (Forma Standard)",
                            step3_desc: "Înmulțește binoamele mai întâi: $(80 - 20x - 16x + 4x^2)$. Apoi înmulțește cu $x$.",
                            result_title: "Răspuns Final",
                            result: `V(x) = 4x^3 - 36x^2 + 80x`
                        }
                    }
                }
            }
        },
    }

}