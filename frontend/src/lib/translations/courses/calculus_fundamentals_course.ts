export const calculusFundamentalsCourse = {
    en: {
        limits: {
            title: "Limits & Continuity",
            description: "The foundation of calculus: analyzing function behavior near specific points and at infinity.",
            lessons: {
                lesson1_title: "Limits & Continuity",
                lesson1: {
                    section1: {
                        title1: "Introduction to Limits",
                        def1_1: "The concept of a limit is fundamental to calculus. It describes the value that a function approaches as the input approaches some value.",
                        def1_2: "Formal Definition (Intuitive): We say that the limit of f(x) as x approaches c is L, denoted as:",
                        math1_1: `\\lim_{x \\to c} f(x) = L`,
                        text1_1: "if we can make f(x) arbitrarily close to L by taking x sufficiently close to c, but not equal to c.",
                        def1_3: "One-Sided Limits: Sometimes a function approaches different values from the left and right sides.",
                        list1_1: "Right-hand limit: $\\lim_{x \\to c^+} f(x) = L$",
                        list1_2: "Left-hand limit: $\\lim_{x \\to c^-} f(x) = M$",
                        theorem1_1: "Theorem: The general limit $\\lim_{x \\to c} f(x)$ exists if and only if both one-sided limits exist and are equal (L = M)."
                    },
                    section2: {
                        title2: "Computing Limits & Limit Laws",
                        desc2_1: "For well-behaved functions, limits can often be evaluated by direct substitution. When this fails (indeterminate forms like 0/0), we use algebraic techniques and limit laws.",
                        def2_1_title: "Algebraic Properties of Limits",
                        text2_1: "If $\\lim_{x \\to c} f(x) = L$ and $\\lim_{x \\to c} g(x) = M$, then:",
                        list2_1: "1. Sum Rule: $\\lim(f + g) = L + M$",
                        list2_2: "2. Product Rule: $\\lim(f \\cdot g) = L \\cdot M$",
                        list2_3: "3. Quotient Rule: $\\lim(f / g) = L / M$ (provided $M \\ne 0$)",
                        list2_4: "4. Power Rule: $\\lim (f(x))^n = L^n$",
                        title_tech: "Techniques for Indeterminate Forms ($\\frac{0}{0}$)",
                        tech1: "Factoring: Cancel common factors in rational functions.",
                        tech1_ex: "Ex: \\lim_{x \\to 1} \\frac{x^2-1}{x-1} = \\lim_{x \\to 1} \\frac{(x-1)(x+1)}{x-1} = \\lim_{x \\to 1} (x+1) = 2",
                        tech2: "Conjugates: Multiply numerator and denominator by the conjugate for radicals.",
                        tech2_ex: "Ex: \\lim_{x \\to 0} \\frac{\\sqrt{1+x}-1}{x} = \\lim_{x \\to 0} \\frac{(\\sqrt{1+x}-1)(\\sqrt{1+x}+1)}{x(\\sqrt{1+x}+1)} = \\lim_{x \\to 0} \\frac{1+x-1}{x(\\sqrt{1+x}+1)} = \\frac{1}{2}",
                        tech3: "Trigonometric Identities: Use properties like $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$.",
                        tech3_ex: "Ex: \\lim_{x \\to 0} \\frac{\\sin 3x}{x} = \\lim_{x \\to 0} \\frac{3\\sin 3x}{3x} = 3 \\cdot \\lim_{u \\to 0} \\frac{\\sin u}{u} = 3(1) = 3"
                    },
                    section3: {
                        title3: "Infinite Limits & Limits at Infinity",
                        def3_1_title: "Infinite Limits (Vertical Asymptotes)",
                        def3_1: "If f(x) increases or decreases without bound as x approaches c, we write:",
                        math3_1: `\\lim_{x \\to c} f(x) = \\infty \\quad \\text{or} \\quad \\lim_{x \\to c} f(x) = -\\infty`,
                        text3_1: "Geometrically, this indicates a Vertical Asymptote at x = c.",
                        def3_2_title: "Limits at Infinity (Horizontal Asymptotes)",
                        def3_2: "This describes the end-behavior of a function as x gets very large.",
                        math3_2: `\\lim_{x \\to \\infty} f(x) = L`,
                        text3_2: "If this limit is a finite number L, the line y = L is a Horizontal Asymptote.",
                        rule3_1: "Strategy for Rational Functions: Divide every term by the highest power of x in the denominator."
                    },
                    section4: {
                        title4: "Continuity",
                        def4_1: "Continuity is the mathematical term for a graph that has no holes, jumps, or breaks.",
                        def4_2: "Formal Definition: A function f is continuous at a point x = c if three conditions are met:",
                        cond4_1: "1. f(c) is defined (the point exists).",
                        cond4_2: "2. $\\lim_{x \\to c} f(x)$ exists (the path approaches a specific value).",
                        cond4_3: "3. $\\lim_{x \\to c} f(x) = f(c)$ (the limit equals the function value).",
                        types_title: "Types of Discontinuity",
                        type1: "Removable Discontinuity (Hole): Limit exists, but f(c) is undefined or different.",
                        type2: "Jump Discontinuity: Left and Right limits exist but are different.",
                        type3: "Infinite Discontinuity: The function goes to infinity at the point."
                    },
                    example_section: {
                        title_ex: "Examples with Step-by-Step Solutions",
                        ex1: {
                            title: "1. Solving an Indeterminate Form ($\\frac{0}{0}$)",
                            problem: "Evaluate the limit:",
                            problem_math: `\\lim_{x \\to 3} \\frac{x^2 - 9}{x^2 - 2x - 3}`,
                            step1_title: "Step 1: Attempt Direct Substitution",
                            step1_desc: "Plugging in x = 3 gives $\\frac{9-9}{9-6-3} = \\frac{0}{0}$. This indicates we must simplify.",
                            step2_title: "Step 2: Factor Polynomials",
                            step2_math: `\\frac{(x - 3)(x + 3)}{(x - 3)(x + 1)}`,
                            step3_title: "Step 3: Cancel and Solve",
                            step3_desc: "Cancel the (x-3) term and substitute x = 3 again.",
                            step3_math: `\\lim_{x \\to 3} \\frac{x + 3}{x + 1} = \\frac{3 + 3}{3 + 1} = \\frac{6}{4} = \\frac{3}{2}`,
                            result_title: "Final Answer",
                            result: "The limit is $\\frac{3}{2}$."
                        },
                        ex2: {
                            title: "2. Limits at Infinity",
                            problem: "Determine the end behavior:",
                            problem_math: `\\lim_{x \\to \\infty} \\frac{2x^3 + 7}{5x^3 - 4x + 1}`,
                            step1_title: "Step 1: Identify Highest Powers",
                            step1_desc: "The degree of the numerator is 3 and the denominator is 3.",
                            step2_title: "Step 2: Divide by $x^3$",
                            step2_desc: "Divide every term by the highest power in the denominator.",
                            step2_math: `\\lim_{x \\to \\infty} \\frac{2 + \\frac{7}{x^3}}{5 - \\frac{4}{x^2} + \\frac{1}{x^3}}`,
                            step3_title: "Step 3: Evaluate",
                            step3_desc: "Any term with x in the denominator approaches 0.",
                            step3_math: `\\frac{2 + 0}{5 - 0 + 0} = \\frac{2}{5}`,
                            result_title: "Final Answer",
                            result: "The limit is $\\frac{2}{5}$ (Horizontal Asymptote at $y = \\frac{2}{5}$)."
                        },
                        ex3: {
                            title: "3. Determining Continuity",
                            problem: "Is the function f(x) continuous at x = 1?",
                            problem_math: `f(x) = \\begin{cases} x^2 + 1 & x < 1 \\\\ 3 & x = 1 \\\\ 2x & x > 1 \\end{cases}`,
                            step1_title: "Step 1: Evaluate f(1)",
                            step1_desc: "From the definition, f(1) = 3.",
                            step2_title: "Step 2: Evaluate One-Sided Limits",
                            step2_math: `\\lim_{x \\to 1^-} (x^2 + 1) = 1^2 + 1 = 2 \\\\ \\lim_{x \\to 1^+} (2x) = 2(1) = 2`,
                            step3_title: "Step 3: Compare Limit and Function Value",
                            step3_desc: "The limit exists because left and right limits are both 2. However, the limit (2) does not equal the function value (3).",
                            result_title: "Final Answer",
                            result: "No, f(x) is discontinuous at x = 1 (Removable Discontinuity)."
                        }
                    }
                }
            }
        },
    },
    es: {
       limits: {
            title: "Límites y Continuidad",
            description: "La base del cálculo: analizar el comportamiento de funciones cerca de puntos específicos y en el infinito.",
            lessons: {
                lesson1_title: "Límites y Continuidad",
                lesson1: {
                    section1: {
                        title1: "Introducción a los Límites",
                        def1_1: "El concepto de límite es fundamental para el cálculo. Describe el valor al que se acerca una función cuando la entrada se acerca a algún valor.",
                        def1_2: "Definición Formal (Intuitiva): Decimos que el límite de f(x) cuando x tiende a c es L, denotado como:",
                        math1_1: `\\lim_{x \\to c} f(x) = L`,
                        text1_1: "si podemos hacer que f(x) esté arbitrariamente cerca de L tomando x lo suficientemente cerca de c, pero no igual a c.",
                        def1_3: "Límites Laterales: A veces una función se acerca a valores diferentes desde los lados izquierdo y derecho.",
                        list1_1: "Límite por la derecha: $\\lim_{x \\to c^+} f(x) = L$",
                        list1_2: "Límite por la izquierda: $\\lim_{x \\to c^-} f(x) = M$",
                        theorem1_1: "Teorema: El límite general $\\lim_{x \\to c} f(x)$ existe si y solo si ambos límites laterales existen y son iguales (L = M)."
                    },
                    section2: {
                        title2: "Cálculo de Límites y Leyes de Límites",
                        desc2_1: "Para funciones bien comportadas, los límites a menudo se pueden evaluar por sustitución directa. Cuando esto falla (formas indeterminadas como 0/0), usamos técnicas algebraicas y leyes de límites.",
                        def2_1_title: "Propiedades Algebraicas de los Límites",
                        text2_1: "Si $\\lim_{x \\to c} f(x) = L$ y $\\lim_{x \\to c} g(x) = M$, entonces:",
                        list2_1: "1. Regla de la Suma: $\\lim(f + g) = L + M$",
                        list2_2: "2. Regla del Producto: $\\lim(f \\cdot g) = L \\cdot M$",
                        list2_3: "3. Regla del Cociente: $\\lim(f / g) = L / M$ (siempre que $M \\ne 0$)",
                        list2_4: "4. Regla de la Potencia: $\\lim (f(x))^n = L^n$",
                        title_tech: "Técnicas para Formas Indeterminadas ($\\frac{0}{0}$)",
                        tech1: "Factorización: Cancelar factores comunes en funciones racionales.",
                        tech1_ex: "Ej: \\lim_{x \\to 1} \\frac{x^2-1}{x-1} = \\lim_{x \\to 1} \\frac{(x-1)(x+1)}{x-1} = \\lim_{x \\to 1} (x+1) = 2",
                        tech2: "Conjugados: Multiplicar numerador y denominador por el conjugado para radicales.",
                        tech2_ex: "Ej: \\lim_{x \\to 0} \\frac{\\sqrt{1+x}-1}{x} = \\lim_{x \\to 0} \\frac{(\\sqrt{1+x}-1)(\\sqrt{1+x}+1)}{x(\\sqrt{1+x}+1)} = \\lim_{x \\to 0} \\frac{1+x-1}{x(\\sqrt{1+x}+1)} = \\frac{1}{2}",
                        tech3: "Identidades Trigonométricas: Usar propiedades como $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$.",
                        tech3_ex: "Ej: \\lim_{x \\to 0} \\frac{\\sin 3x}{x} = \\lim_{x \\to 0} \\frac{3\\sin 3x}{3x} = 3 \\cdot \\lim_{u \\to 0} \\frac{\\sin u}{u} = 3(1) = 3"
                    },
                    section3: {
                        title3: "Límites Infinitos y Límites en el Infinito",
                        def3_1_title: "Límites Infinitos (Asíntotas Verticales)",
                        def3_1: "Si f(x) crece o decrece sin límite cuando x se acerca a c, escribimos:",
                        math3_1: `\\lim_{x \\to c} f(x) = \\infty \\quad \\text{o} \\quad \\lim_{x \\to c} f(x) = -\\infty`,
                        text3_1: "Geométricamente, esto indica una Asíntota Vertical en x = c.",
                        def3_2_title: "Límites en el Infinito (Asíntotas Horizontales)",
                        def3_2: "Esto describe el comportamiento final de una función cuando x se hace muy grande.",
                        math3_2: `\\lim_{x \\to \\infty} f(x) = L`,
                        text3_2: "Si este límite es un número finito L, la recta y = L es una Asíntota Horizontal.",
                        rule3_1: "Estrategia para Funciones Racionales: Dividir cada término por la mayor potencia de x en el denominador."
                    },
                    section4: {
                        title4: "Continuidad",
                        def4_1: "La continuidad es el término matemático para una gráfica que no tiene agujeros, saltos o quiebres.",
                        def4_2: "Definición Formal: Una función f es continua en un punto x = c si se cumplen tres condiciones:",
                        cond4_1: "1. f(c) está definida (el punto existe).",
                        cond4_2: "2. $\\lim_{x \\to c} f(x)$ existe (el camino se acerca a un valor específico).",
                        cond4_3: "3. $\\lim_{x \\to c} f(x) = f(c)$ (el límite es igual al valor de la función).",
                        types_title: "Tipos de Discontinuidad",
                        type1: "Discontinuidad Evitable (Agujero): El límite existe, pero f(c) no está definida o es diferente.",
                        type2: "Discontinuidad de Salto: Los límites izquierdo y derecho existen pero son diferentes.",
                        type3: "Discontinuidad Infinita: La función tiende a infinito en el punto."
                    },
                    example_section: {
                        title_ex: "Ejemplos con Soluciones Paso a Paso",
                        ex1: {
                            title: "1. Resolviendo una Forma Indeterminada ($\\frac{0}{0}$)",
                            problem: "Evaluar el límite:",
                            problem_math: `\\lim_{x \\to 3} \\frac{x^2 - 9}{x^2 - 2x - 3}`,
                            step1_title: "Paso 1: Intentar Sustitución Directa",
                            step1_desc: "Sustituyendo x = 3 da $\\frac{9-9}{9-6-3} = \\frac{0}{0}$. Esto indica que debemos simplificar.",
                            step2_title: "Paso 2: Factorizar Polinomios",
                            step2_math: `\\frac{(x - 3)(x + 3)}{(x - 3)(x + 1)}`,
                            step3_title: "Paso 3: Cancelar y Resolver",
                            step3_desc: "Cancelar el término (x-3) y sustituir x = 3 nuevamente.",
                            step3_math: `\\lim_{x \\to 3} \\frac{x + 3}{x + 1} = \\frac{3 + 3}{3 + 1} = \\frac{6}{4} = \\frac{3}{2}`,
                            result_title: "Respuesta Final",
                            result: "El límite es $\\frac{3}{2}$."
                        },
                        ex2: {
                            title: "2. Límites en el Infinito",
                            problem: "Determinar el comportamiento final:",
                            problem_math: `\\lim_{x \\to \\infty} \\frac{2x^3 + 7}{5x^3 - 4x + 1}`,
                            step1_title: "Paso 1: Identificar Potencias Más Altas",
                            step1_desc: "El grado del numerador es 3 y el del denominador es 3.",
                            step2_title: "Paso 2: Dividir por $x^3$",
                            step2_desc: "Dividir cada término por la mayor potencia en el denominador.",
                            step2_math: `\\lim_{x \\to \\infty} \\frac{2 + \\frac{7}{x^3}}{5 - \\frac{4}{x^2} + \\frac{1}{x^3}}`,
                            step3_title: "Paso 3: Evaluar",
                            step3_desc: "Cualquier término con x en el denominador tiende a 0.",
                            step3_math: `\\frac{2 + 0}{5 - 0 + 0} = \\frac{2}{5}`,
                            result_title: "Respuesta Final",
                            result: "El límite es $\\frac{2}{5}$ (Asíntota Horizontal en $y = \\frac{2}{5}$)."
                        },
                        ex3: {
                            title: "3. Determinando Continuidad",
                            problem: "¿Es la función f(x) continua en x = 1?",
                            problem_math: `f(x) = \\begin{cases} x^2 + 1 & x < 1 \\\\ 3 & x = 1 \\\\ 2x & x > 1 \\end{cases}`,
                            step1_title: "Paso 1: Evaluar f(1)",
                            step1_desc: "De la definición, f(1) = 3.",
                            step2_title: "Paso 2: Evaluar Límites Laterales",
                            step2_math: `\\lim_{x \\to 1^-} (x^2 + 1) = 1^2 + 1 = 2 \\\\ \\lim_{x \\to 1^+} (2x) = 2(1) = 2`,
                            step3_title: "Paso 3: Comparar Límite y Valor de la Función",
                            step3_desc: "El límite existe porque los límites izquierdo y derecho son ambos 2. Sin embargo, el límite (2) no es igual al valor de la función (3).",
                            result_title: "Respuesta Final",
                            result: "No, f(x) es discontinua en x = 1 (Discontinuidad Evitable)."
                        }
                    }
                }
            }
        } 
    },
    fr: {
        limits: {
            title: "Limites et Continuité",
            description: "Le fondement du calcul : analyser le comportement des fonctions près de points spécifiques et à l'infini.",
            lessons: {
                lesson1_title: "Limites et Continuité",
                lesson1: {
                    section1: {
                        title1: "Introduction aux Limites",
                        def1_1: "Le concept de limite est fondamental au calcul. Il décrit la valeur vers laquelle une fonction tend lorsque l'entrée s'approche d'une certaine valeur.",
                        def1_2: "Définition Formelle (Intuitive) : Nous disons que la limite de f(x) lorsque x tend vers c est L, notée :",
                        math1_1: `\\lim_{x \\to c} f(x) = L`,
                        text1_1: "si nous pouvons rendre f(x) arbitrairement proche de L en prenant x suffisamment proche de c, mais différent de c.",
                        def1_3: "Limites Latérales : Parfois une fonction s'approche de valeurs différentes par la gauche et par la droite.",
                        list1_1: "Limite à droite : $\\lim_{x \\to c^+} f(x) = L$",
                        list1_2: "Limite à gauche : $\\lim_{x \\to c^-} f(x) = M$",
                        theorem1_1: "Théorème : La limite générale $\\lim_{x \\to c} f(x)$ existe si et seulement si les deux limites latérales existent et sont égales (L = M)."
                    },
                    section2: {
                        title2: "Calcul de Limites et Lois des Limites",
                        desc2_1: "Pour les fonctions bien comportées, les limites peuvent souvent être évaluées par substitution directe. Lorsque cela échoue (formes indéterminées comme 0/0), nous utilisons des techniques algébriques et des lois sur les limites.",
                        def2_1_title: "Propriétés Algébriques des Limites",
                        text2_1: "Si $\\lim_{x \\to c} f(x) = L$ et $\\lim_{x \\to c} g(x) = M$, alors :",
                        list2_1: "1. Règle de la Somme : $\\lim(f + g) = L + M$",
                        list2_2: "2. Règle du Produit : $\\lim(f \\cdot g) = L \\cdot M$",
                        list2_3: "3. Règle du Quotient : $\\lim(f / g) = L / M$ (si $M \\ne 0$)",
                        list2_4: "4. Règle de la Puissance : $\\lim (f(x))^n = L^n$",
                        title_tech: "Techniques pour les Formes Indéterminées ($\\frac{0}{0}$)",
                        tech1: "Factorisation : Annuler les facteurs communs dans les fonctions rationnelles.",
                        tech1_ex: "Ex : \\lim_{x \\to 1} \\frac{x^2-1}{x-1} = \\lim_{x \\to 1} \\frac{(x-1)(x+1)}{x-1} = \\lim_{x \\to 1} (x+1) = 2",
                        tech2: "Conjugués : Multiplier numérateur et dénominateur par le conjugué pour les radicaux.",
                        tech2_ex: "Ex : \\lim_{x \\to 0} \\frac{\\sqrt{1+x}-1}{x} = \\lim_{x \\to 0} \\frac{(\\sqrt{1+x}-1)(\\sqrt{1+x}+1)}{x(\\sqrt{1+x}+1)} = \\lim_{x \\to 0} \\frac{1+x-1}{x(\\sqrt{1+x}+1)} = \\frac{1}{2}",
                        tech3: "Identités Trigonométriques : Utiliser des propriétés comme $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$.",
                        tech3_ex: "Ex : \\lim_{x \\to 0} \\frac{\\sin 3x}{x} = \\lim_{x \\to 0} \\frac{3\\sin 3x}{3x} = 3 \\cdot \\lim_{u \\to 0} \\frac{\\sin u}{u} = 3(1) = 3"
                    },
                    section3: {
                        title3: "Limites Infinies et Limites à l'Infini",
                        def3_1_title: "Limites Infinies (Asymptotes Verticales)",
                        def3_1: "Si f(x) augmente ou diminue sans limite lorsque x s'approche de c, nous écrivons :",
                        math3_1: `\\lim_{x \\to c} f(x) = \\infty \\quad \\text{ou} \\quad \\lim_{x \\to c} f(x) = -\\infty`,
                        text3_1: "Géométriquement, cela indique une Asymptote Verticale en x = c.",
                        def3_2_title: "Limites à l'Infini (Asymptotes Horizontales)",
                        def3_2: "Ceci décrit le comportement final d'une fonction lorsque x devient très grand.",
                        math3_2: `\\lim_{x \\to \\infty} f(x) = L`,
                        text3_2: "Si cette limite est un nombre fini L, la droite y = L est une Asymptote Horizontale.",
                        rule3_1: "Stratégie pour les Fonctions Rationnelles : Diviser chaque terme par la plus haute puissance de x au dénominateur."
                    },
                    section4: {
                        title4: "Continuité",
                        def4_1: "La continuité est le terme mathématique pour un graphique qui n'a pas de trous, de sauts ou de coupures.",
                        def4_2: "Définition Formelle : Une fonction f est continue en un point x = c si trois conditions sont réunies :",
                        cond4_1: "1. f(c) est définie (le point existe).",
                        cond4_2: "2. $\\lim_{x \\to c} f(x)$ existe (le chemin s'approche d'une valeur spécifique).",
                        cond4_3: "3. $\\lim_{x \\to c} f(x) = f(c)$ (la limite est égale à la valeur de la fonction).",
                        types_title: "Types de Discontinuité",
                        type1: "Discontinuité Éliminable (Trou) : La limite existe, mais f(c) est indéfinie ou différente.",
                        type2: "Discontinuité de Saut : Les limites à gauche et à droite existent mais sont différentes.",
                        type3: "Discontinuité Infinie : La fonction tend vers l'infini au point."
                    },
                    example_section: {
                        title_ex: "Exemples avec Solutions Étape par Étape",
                        ex1: {
                            title: "1. Résoudre une Forme Indéterminée ($\\frac{0}{0}$)",
                            problem: "Évaluer la limite :",
                            problem_math: `\\lim_{x \\to 3} \\frac{x^2 - 9}{x^2 - 2x - 3}`,
                            step1_title: "Étape 1 : Essayer la Substitution Directe",
                            step1_desc: "Remplacer x par 3 donne $\\frac{9-9}{9-6-3} = \\frac{0}{0}$. Cela indique que nous devons simplifier.",
                            step2_title: "Étape 2 : Factoriser les Polynômes",
                            step2_math: `\\frac{(x - 3)(x + 3)}{(x - 3)(x + 1)}`,
                            step3_title: "Étape 3 : Annuler et Résoudre",
                            step3_desc: "Annuler le terme (x-3) et remplacer x par 3 à nouveau.",
                            step3_math: `\\lim_{x \\to 3} \\frac{x + 3}{x + 1} = \\frac{3 + 3}{3 + 1} = \\frac{6}{4} = \\frac{3}{2}`,
                            result_title: "Réponse Finale",
                            result: "La limite est $\\frac{3}{2}$."
                        },
                        ex2: {
                            title: "2. Limites à l'Infini",
                            problem: "Déterminer le comportement final :",
                            problem_math: `\\lim_{x \\to \\infty} \\frac{2x^3 + 7}{5x^3 - 4x + 1}`,
                            step1_title: "Étape 1 : Identifier les Puissances les Plus Élevées",
                            step1_desc: "Le degré du numérateur est 3 et celui du dénominateur est 3.",
                            step2_title: "Étape 2 : Diviser par $x^3$",
                            step2_desc: "Diviser chaque terme par la plus haute puissance du dénominateur.",
                            step2_math: `\\lim_{x \\to \\infty} \\frac{2 + \\frac{7}{x^3}}{5 - \\frac{4}{x^2} + \\frac{1}{x^3}}`,
                            step3_title: "Étape 3 : Évaluer",
                            step3_desc: "Tout terme avec x au dénominateur tend vers 0.",
                            step3_math: `\\frac{2 + 0}{5 - 0 + 0} = \\frac{2}{5}`,
                            result_title: "Réponse Finale",
                            result: "La limite est $\\frac{2}{5}$ (Asymptote Horizontale en $y = \\frac{2}{5}$)."
                        },
                        ex3: {
                            title: "3. Déterminer la Continuité",
                            problem: "La fonction f(x) est-elle continue en x = 1 ?",
                            problem_math: `f(x) = \\begin{cases} x^2 + 1 & x < 1 \\\\ 3 & x = 1 \\\\ 2x & x > 1 \\end{cases}`,
                            step1_title: "Étape 1 : Évaluer f(1)",
                            step1_desc: "D'après la définition, f(1) = 3.",
                            step2_title: "Étape 2 : Évaluer les Limites Latérales",
                            step2_math: `\\lim_{x \\to 1^-} (x^2 + 1) = 1^2 + 1 = 2 \\\\ \\lim_{x \\to 1^+} (2x) = 2(1) = 2`,
                            step3_title: "Étape 3 : Comparer la Limite et la Valeur de la Fonction",
                            step3_desc: "La limite existe car les limites gauche et droite sont toutes deux 2. Cependant, la limite (2) n'est pas égale à la valeur de la fonction (3).",
                            result_title: "Réponse Finale",
                            result: "Non, f(x) est discontinue en x = 1 (Discontinuité Éliminable)."
                        }
                    }
                }
            }
        }
    },
    de: {
        limits: {
            title: "Grenzwerte & Stetigkeit",
            description: "Das Fundament der Analysis: Untersuchung des Funktionsverhaltens in der Nähe bestimmter Punkte und im Unendlichen.",
            lessons: {
                lesson1_title: "Grenzwerte & Stetigkeit",
                lesson1: {
                    section1: {
                        title1: "Einführung in Grenzwerte",
                        def1_1: "Das Konzept des Grenzwerts ist fundamental für die Analysis. Es beschreibt den Wert, dem sich eine Funktion nähert, wenn sich die Eingabe einem bestimmten Wert nähert.",
                        def1_2: "Formale Definition (Intuitiv): Wir sagen, dass der Grenzwert von f(x) für x gegen c gleich L ist, geschrieben als:",
                        math1_1: `\\lim_{x \\to c} f(x) = L`,
                        text1_1: "wenn wir f(x) beliebig nahe an L bringen können, indem wir x ausreichend nahe an c wählen, aber ungleich c.",
                        def1_3: "Einseitige Grenzwerte: Manchmal nähert sich eine Funktion unterschiedlichen Werten von links und rechts.",
                        list1_1: "Rechtsseitiger Grenzwert: $\\lim_{x \\to c^+} f(x) = L$",
                        list1_2: "Linksseitiger Grenzwert: $\\lim_{x \\to c^-} f(x) = M$",
                        theorem1_1: "Satz: Der allgemeine Grenzwert $\\lim_{x \\to c} f(x)$ existiert genau dann, wenn beide einseitigen Grenzwerte existieren und gleich sind (L = M)."
                    },
                    section2: {
                        title2: "Berechnung von Grenzwerten & Grenzwertsätze",
                        desc2_1: "Für gutartige Funktionen können Grenzwerte oft durch direkte Substitution berechnet werden. Wenn dies fehlschlägt (unbestimmte Formen wie 0/0), verwenden wir algebraische Techniken und Grenzwertsätze.",
                        def2_1_title: "Algebraische Eigenschaften von Grenzwerten",
                        text2_1: "Wenn $\\lim_{x \\to c} f(x) = L$ und $\\lim_{x \\to c} g(x) = M$, dann:",
                        list2_1: "1. Summenregel: $\\lim(f + g) = L + M$",
                        list2_2: "2. Produktregel: $\\lim(f \\cdot g) = L \\cdot M$",
                        list2_3: "3. Quotientenregel: $\\lim(f / g) = L / M$ (vorausgesetzt $M \\ne 0$)",
                        list2_4: "4. Potenzregel: $\\lim (f(x))^n = L^n$",
                        title_tech: "Techniken für unbestimmte Formen ($\\frac{0}{0}$)",
                        tech1: "Faktorisierung: Kürzen gemeinsamer Faktoren in rationalen Funktionen.",
                        tech1_ex: "Bsp: \\lim_{x \\to 1} \\frac{x^2-1}{x-1} = \\lim_{x \\to 1} \\frac{(x-1)(x+1)}{x-1} = \\lim_{x \\to 1} (x+1) = 2",
                        tech2: "Konjugation: Multiplizieren von Zähler und Nenner mit dem Konjugierten bei Wurzeln.",
                        tech2_ex: "Bsp: \\lim_{x \\to 0} \\frac{\\sqrt{1+x}-1}{x} = \\lim_{x \\to 0} \\frac{(\\sqrt{1+x}-1)(\\sqrt{1+x}+1)}{x(\\sqrt{1+x}+1)} = \\lim_{x \\to 0} \\frac{1+x-1}{x(\\sqrt{1+x}+1)} = \\frac{1}{2}",
                        tech3: "Trigonometrische Identitäten: Verwenden von Eigenschaften wie $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$.",
                        tech3_ex: "Bsp: \\lim_{x \\to 0} \\frac{\\sin 3x}{x} = \\lim_{x \\to 0} \\frac{3\\sin 3x}{3x} = 3 \\cdot \\lim_{u \\to 0} \\frac{\\sin u}{u} = 3(1) = 3"
                    },
                    section3: {
                        title3: "Unendliche Grenzwerte & Grenzwerte im Unendlichen",
                        def3_1_title: "Unendliche Grenzwerte (Vertikale Asymptoten)",
                        def3_1: "Wenn f(x) ohne Schranke wächst oder fällt, wenn x gegen c strebt, schreiben wir:",
                        math3_1: `\\lim_{x \\to c} f(x) = \\infty \\quad \\text{oder} \\quad \\lim_{x \\to c} f(x) = -\\infty`,
                        text3_1: "Geometrisch deutet dies auf eine vertikale Asymptote bei x = c hin.",
                        def3_2_title: "Grenzwerte im Unendlichen (Horizontale Asymptoten)",
                        def3_2: "Dies beschreibt das Endverhalten einer Funktion, wenn x sehr groß wird.",
                        math3_2: `\\lim_{x \\to \\infty} f(x) = L`,
                        text3_2: "Wenn dieser Grenzwert eine endliche Zahl L ist, ist die Gerade y = L eine horizontale Asymptote.",
                        rule3_1: "Strategie für rationale Funktionen: Teile jeden Term durch die höchste Potenz von x im Nenner."
                    },
                    section4: {
                        title4: "Stetigkeit",
                        def4_1: "Stetigkeit ist der mathematische Begriff für einen Graphen, der keine Löcher, Sprünge oder Unterbrechungen hat.",
                        def4_2: "Formale Definition: Eine Funktion f ist stetig an einem Punkt x = c, wenn drei Bedingungen erfüllt sind:",
                        cond4_1: "1. f(c) ist definiert (der Punkt existiert).",
                        cond4_2: "2. $\\lim_{x \\to c} f(x)$ existiert (der Pfad nähert sich einem bestimmten Wert).",
                        cond4_3: "3. $\\lim_{x \\to c} f(x) = f(c)$ (der Grenzwert entspricht dem Funktionswert).",
                        types_title: "Arten von Unstetigkeit",
                        type1: "Hebbare Unstetigkeit (Loch): Grenzwert existiert, aber f(c) ist nicht definiert oder anders.",
                        type2: "Sprungunstetigkeit: Links- und rechtsseitige Grenzwerte existieren, sind aber unterschiedlich.",
                        type3: "Unendliche Unstetigkeit: Die Funktion geht am Punkt gegen Unendlich."
                    },
                    example_section: {
                        title_ex: "Beispiele mit Schritt-für-Schritt-Lösungen",
                        ex1: {
                            title: "1. Lösen einer unbestimmten Form ($\\frac{0}{0}$)",
                            problem: "Berechne den Grenzwert:",
                            problem_math: `\\lim_{x \\to 3} \\frac{x^2 - 9}{x^2 - 2x - 3}`,
                            step1_title: "Schritt 1: Versuch der direkten Substitution",
                            step1_desc: "Einsetzen von x = 3 ergibt $\\frac{9-9}{9-6-3} = \\frac{0}{0}$. Das zeigt an, dass wir vereinfachen müssen.",
                            step2_title: "Schritt 2: Polynome faktorisieren",
                            step2_math: `\\frac{(x - 3)(x + 3)}{(x - 3)(x + 1)}`,
                            step3_title: "Schritt 3: Kürzen und Lösen",
                            step3_desc: "Kürze den Term (x-3) und setze x = 3 erneut ein.",
                            step3_math: `\\lim_{x \\to 3} \\frac{x + 3}{x + 1} = \\frac{3 + 3}{3 + 1} = \\frac{6}{4} = \\frac{3}{2}`,
                            result_title: "Endgültige Antwort",
                            result: "Der Grenzwert ist $\\frac{3}{2}$."
                        },
                        ex2: {
                            title: "2. Grenzwerte im Unendlichen",
                            problem: "Bestimme das Endverhalten:",
                            problem_math: `\\lim_{x \\to \\infty} \\frac{2x^3 + 7}{5x^3 - 4x + 1}`,
                            step1_title: "Schritt 1: Höchste Potenzen identifizieren",
                            step1_desc: "Der Grad des Zählers ist 3 und der des Nenners ist 3.",
                            step2_title: "Schritt 2: Durch $x^3$ teilen",
                            step2_desc: "Teile jeden Term durch die höchste Potenz im Nenner.",
                            step2_math: `\\lim_{x \\to \\infty} \\frac{2 + \\frac{7}{x^3}}{5 - \\frac{4}{x^2} + \\frac{1}{x^3}}`,
                            step3_title: "Schritt 3: Auswerten",
                            step3_desc: "Jeder Term mit x im Nenner geht gegen 0.",
                            step3_math: `\\frac{2 + 0}{5 - 0 + 0} = \\frac{2}{5}`,
                            result_title: "Endgültige Antwort",
                            result: "Der Grenzwert ist $\\frac{2}{5}$ (Horizontale Asymptote bei $y = \\frac{2}{5}$)."
                        },
                        ex3: {
                            title: "3. Bestimmung der Stetigkeit",
                            problem: "Ist die Funktion f(x) stetig bei x = 1?",
                            problem_math: `f(x) = \\begin{cases} x^2 + 1 & x < 1 \\\\ 3 & x = 1 \\\\ 2x & x > 1 \\end{cases}`,
                            step1_title: "Schritt 1: f(1) auswerten",
                            step1_desc: "Aus der Definition, f(1) = 3.",
                            step2_title: "Schritt 2: Einseitige Grenzwerte auswerten",
                            step2_math: `\\lim_{x \\to 1^-} (x^2 + 1) = 1^2 + 1 = 2 \\\\ \\lim_{x \\to 1^+} (2x) = 2(1) = 2`,
                            step3_title: "Schritt 3: Grenzwert und Funktionswert vergleichen",
                            step3_desc: "Der Grenzwert existiert, da der linke und rechte Grenzwert beide 2 sind. Jedoch ist der Grenzwert (2) nicht gleich dem Funktionswert (3).",
                            result_title: "Endgültige Antwort",
                            result: "Nein, f(x) ist unstetig bei x = 1 (Hebbare Unstetigkeit)."
                        }
                    }
                }
            }
        }
    },
    pl: {
        limits: {
            title: "Granice i Ciągłość",
            description: "Podstawa rachunku różniczkowego: analiza zachowania funkcji w pobliżu określonych punktów i w nieskończoności.",
            lessons: {
                lesson1_title: "Granice i Ciągłość",
                lesson1: {
                    section1: {
                        title1: "Wprowadzenie do Granic",
                        def1_1: "Pojęcie granicy jest fundamentalne dla rachunku różniczkowego. Opisuje wartość, do której dąży funkcja, gdy argument zbliża się do pewnej wartości.",
                        def1_2: "Definicja Formalna (Intuicyjna): Mówimy, że granicą funkcji f(x), gdy x dąży do c, jest L, co zapisujemy:",
                        math1_1: `\\lim_{x \\to c} f(x) = L`,
                        text1_1: "jeśli możemy sprawić, by f(x) było dowolnie blisko L, biorąc x wystarczająco blisko c, ale nie równe c.",
                        def1_3: "Granice Jednostronne: Czasami funkcja dąży do różnych wartości z lewej i prawej strony.",
                        list1_1: "Granica prawostronna: $\\lim_{x \\to c^+} f(x) = L$",
                        list1_2: "Granica lewostronna: $\\lim_{x \\to c^-} f(x) = M$",
                        theorem1_1: "Twierdzenie: Granica ogólna $\\lim_{x \\to c} f(x)$ istnieje wtedy i tylko wtedy, gdy obie granice jednostronne istnieją i są równe (L = M)."
                    },
                    section2: {
                        title2: "Obliczanie Granic i Prawa Granic",
                        desc2_1: "Dla funkcji regularnych granice często można obliczyć przez bezpośrednie podstawienie. Gdy to zawodzi (symbole nieoznaczone jak 0/0), używamy technik algebraicznych i praw granic.",
                        def2_1_title: "Algebraiczne Własności Granic",
                        text2_1: "Jeśli $\\lim_{x \\to c} f(x) = L$ i $\\lim_{x \\to c} g(x) = M$, to:",
                        list2_1: "1. Reguła Sumy: $\\lim(f + g) = L + M$",
                        list2_2: "2. Reguła Iloczynu: $\\lim(f \\cdot g) = L \\cdot M$",
                        list2_3: "3. Reguła Ilorazu: $\\lim(f / g) = L / M$ (jeśli $M \\ne 0$)",
                        list2_4: "4. Reguła Potęgi: $\\lim (f(x))^n = L^n$",
                        title_tech: "Techniki dla Symboli Nieoznaczonych ($\\frac{0}{0}$)",
                        tech1: "Faktoryzacja: Skracanie wspólnych czynników w funkcjach wymiernych.",
                        tech1_ex: "Np: \\lim_{x \\to 1} \\frac{x^2-1}{x-1} = \\lim_{x \\to 1} \\frac{(x-1)(x+1)}{x-1} = \\lim_{x \\to 1} (x+1) = 2",
                        tech2: "Sprzężenia: Mnożenie licznika i mianownika przez sprzężenie dla wyrażeń z pierwiastkami.",
                        tech2_ex: "Np: \\lim_{x \\to 0} \\frac{\\sqrt{1+x}-1}{x} = \\lim_{x \\to 0} \\frac{(\\sqrt{1+x}-1)(\\sqrt{1+x}+1)}{x(\\sqrt{1+x}+1)} = \\lim_{x \\to 0} \\frac{1+x-1}{x(\\sqrt{1+x}+1)} = \\frac{1}{2}",
                        tech3: "Tożsamości Trygonometryczne: Używanie własności takich jak $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$.",
                        tech3_ex: "Np: \\lim_{x \\to 0} \\frac{\\sin 3x}{x} = \\lim_{x \\to 0} \\frac{3\\sin 3x}{3x} = 3 \\cdot \\lim_{u \\to 0} \\frac{\\sin u}{u} = 3(1) = 3"
                    },
                    section3: {
                        title3: "Granice Niewłaściwe i Granice w Nieskończoności",
                        def3_1_title: "Granice Niewłaściwe (Asymptoty Pionowe)",
                        def3_1: "Jeśli f(x) rośnie lub maleje bez ograniczeń, gdy x dąży do c, piszemy:",
                        math3_1: `\\lim_{x \\to c} f(x) = \\infty \\quad \\text{lub} \\quad \\lim_{x \\to c} f(x) = -\\infty`,
                        text3_1: "Geometrycznie oznacza to Asymptotę Pionową w x = c.",
                        def3_2_title: "Granice w Nieskończoności (Asymptoty Poziome)",
                        def3_2: "Opisuje to zachowanie funkcji, gdy x staje się bardzo duże.",
                        math3_2: `\\lim_{x \\to \\infty} f(x) = L`,
                        text3_2: "Jeśli ta granica jest liczbą skończoną L, prosta y = L jest Asymptotą Poziomą.",
                        rule3_1: "Strategia dla Funkcji Wymiernych: Podziel każdy wyraz przez najwyższą potęgę x w mianowniku."
                    },
                    section4: {
                        title4: "Ciągłość",
                        def4_1: "Ciągłość to matematyczne określenie wykresu, który nie ma dziur, skoków ani przerw.",
                        def4_2: "Definicja Formalna: Funkcja f jest ciągła w punkcie x = c, jeśli spełnione są trzy warunki:",
                        cond4_1: "1. f(c) jest określona (punkt istnieje).",
                        cond4_2: "2. $\\lim_{x \\to c} f(x)$ istnieje (ścieżka dąży do określonej wartości).",
                        cond4_3: "3. $\\lim_{x \\to c} f(x) = f(c)$ (granica równa się wartości funkcji).",
                        types_title: "Rodzaje Nieciągłości",
                        type1: "Nieciągłość Usuwalna (Dziura): Granica istnieje, ale f(c) jest nieokreślona lub inna.",
                        type2: "Nieciągłość Skokowa: Granice lewostronna i prawostronna istnieją, ale są różne.",
                        type3: "Nieciągłość Nieskończona: Funkcja dąży do nieskończoności w punkcie."
                    },
                    example_section: {
                        title_ex: "Przykłady z Rozwiązaniami Krok po Kroku",
                        ex1: {
                            title: "1. Rozwiązywanie Symbolu Nieoznaczonego ($\\frac{0}{0}$)",
                            problem: "Oblicz granicę:",
                            problem_math: `\\lim_{x \\to 3} \\frac{x^2 - 9}{x^2 - 2x - 3}`,
                            step1_title: "Krok 1: Próba Bezpośredniego Podstawienia",
                            step1_desc: "Podstawienie x = 3 daje $\\frac{9-9}{9-6-3} = \\frac{0}{0}$. To wskazuje, że musimy uprościć.",
                            step2_title: "Krok 2: Faktoryzacja Wielomianów",
                            step2_math: `\\frac{(x - 3)(x + 3)}{(x - 3)(x + 1)}`,
                            step3_title: "Krok 3: Skrócenie i Rozwiązanie",
                            step3_desc: "Skróć czynnik (x-3) i ponownie podstaw x = 3.",
                            step3_math: `\\lim_{x \\to 3} \\frac{x + 3}{x + 1} = \\frac{3 + 3}{3 + 1} = \\frac{6}{4} = \\frac{3}{2}`,
                            result_title: "Ostateczna Odpowiedź",
                            result: "Granica wynosi $\\frac{3}{2}$."
                        },
                        ex2: {
                            title: "2. Granice w Nieskończoności",
                            problem: "Określ zachowanie w nieskończoności:",
                            problem_math: `\\lim_{x \\to \\infty} \\frac{2x^3 + 7}{5x^3 - 4x + 1}`,
                            step1_title: "Krok 1: Zidentyfikuj Najwyższe Potęgi",
                            step1_desc: "Stopień licznika wynosi 3, a mianownika 3.",
                            step2_title: "Krok 2: Podziel przez $x^3$",
                            step2_desc: "Podziel każdy wyraz przez najwyższą potęgę w mianowniku.",
                            step2_math: `\\lim_{x \\to \\infty} \\frac{2 + \\frac{7}{x^3}}{5 - \\frac{4}{x^2} + \\frac{1}{x^3}}`,
                            step3_title: "Krok 3: Oblicz",
                            step3_desc: "Każdy wyraz z x w mianowniku dąży do 0.",
                            step3_math: `\\frac{2 + 0}{5 - 0 + 0} = \\frac{2}{5}`,
                            result_title: "Ostateczna Odpowiedź",
                            result: "Granica wynosi $\\frac{2}{5}$ (Asymptota Pozioma w $y = \\frac{2}{5}$)."
                        },
                        ex3: {
                            title: "3. Określanie Ciągłości",
                            problem: "Czy funkcja f(x) jest ciągła w x = 1?",
                            problem_math: `f(x) = \\begin{cases} x^2 + 1 & x < 1 \\\\ 3 & x = 1 \\\\ 2x & x > 1 \\end{cases}`,
                            step1_title: "Krok 1: Oblicz f(1)",
                            step1_desc: "Z definicji, f(1) = 3.",
                            step2_title: "Krok 2: Oblicz Granice Jednostronne",
                            step2_math: `\\lim_{x \\to 1^-} (x^2 + 1) = 1^2 + 1 = 2 \\\\ \\lim_{x \\to 1^+} (2x) = 2(1) = 2`,
                            step3_title: "Krok 3: Porównaj Granicę i Wartość Funkcji",
                            step3_desc: "Granica istnieje, ponieważ granice lewostronna i prawostronna wynoszą 2. Jednak granica (2) nie jest równa wartości funkcji (3).",
                            result_title: "Ostateczna Odpowiedź",
                            result: "Nie, f(x) jest nieciągła w x = 1 (Nieciągłość Usuwalna)."
                        }
                    }
                }
            }
        }
    },
    ro: {
        limits: {
            title: "Limite și Continuitate",
            description: "Fundamentul analizei matematice: analiza comportamentului funcțiilor în apropierea unor puncte specifice și la infinit.",
            lessons: {
                lesson1_title: "Limite și Continuitate",
                lesson1: {
                    section1: {
                        title1: "Introducere în Limite",
                        def1_1: "Conceptul de limită este fundamental pentru analiza matematică. Descrie valoarea la care tinde o funcție pe măsură ce intrarea se apropie de o anumită valoare.",
                        def1_2: "Definiție Formală (Intuitivă): Spunem că limita lui f(x) când x tinde către c este L, notată ca:",
                        math1_1: `\\lim_{x \\to c} f(x) = L`,
                        text1_1: "dacă putem face f(x) oricât de aproape de L luând x suficient de aproape de c, dar nu egal cu c.",
                        def1_3: "Limite Laterale: Uneori o funcție tinde către valori diferite din părțile stângă și dreaptă.",
                        list1_1: "Limita la dreapta: $\\lim_{x \\to c^+} f(x) = L$",
                        list1_2: "Limita la stânga: $\\lim_{x \\to c^-} f(x) = M$",
                        theorem1_1: "Teoremă: Limita generală $\\lim_{x \\to c} f(x)$ există dacă și numai dacă ambele limite laterale există și sunt egale (L = M)."
                    },
                    section2: {
                        title2: "Calculul Limitelor și Legile Limitelor",
                        desc2_1: "Pentru funcțiile bine comportate, limitele pot fi adesea evaluate prin substituție directă. Când aceasta eșuează (forme nedeterminate precum 0/0), folosim tehnici algebrice și legi ale limitelor.",
                        def2_1_title: "Proprietăți Algebrice ale Limitelor",
                        text2_1: "Dacă $\\lim_{x \\to c} f(x) = L$ și $\\lim_{x \\to c} g(x) = M$, atunci:",
                        list2_1: "1. Regula Sumelor: $\\lim(f + g) = L + M$",
                        list2_2: "2. Regula Produsului: $\\lim(f \\cdot g) = L \\cdot M$",
                        list2_3: "3. Regula Câtului: $\\lim(f / g) = L / M$ (cu condiția $M \\ne 0$)",
                        list2_4: "4. Regula Puterii: $\\lim (f(x))^n = L^n$",
                        title_tech: "Tehnici pentru Forme Nedeterminate ($\\frac{0}{0}$)",
                        tech1: "Factorizare: Simplificarea factorilor comuni în funcții raționale.",
                        tech1_ex: "Ex: \\lim_{x \\to 1} \\frac{x^2-1}{x-1} = \\lim_{x \\to 1} \\frac{(x-1)(x+1)}{x-1} = \\lim_{x \\to 1} (x+1) = 2",
                        tech2: "Conjugate: Înmulțirea numărătorului și numitorului cu conjugatul pentru radicali.",
                        tech2_ex: "Ex: \\lim_{x \\to 0} \\frac{\\sqrt{1+x}-1}{x} = \\lim_{x \\to 0} \\frac{(\\sqrt{1+x}-1)(\\sqrt{1+x}+1)}{x(\\sqrt{1+x}+1)} = \\lim_{x \\to 0} \\frac{1+x-1}{x(\\sqrt{1+x}+1)} = \\frac{1}{2}",
                        tech3: "Identități Trigonometrice: Utilizarea proprietăților precum $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$.",
                        tech3_ex: "Ex: \\lim_{x \\to 0} \\frac{\\sin 3x}{x} = \\lim_{x \\to 0} \\frac{3\\sin 3x}{3x} = 3 \\cdot \\lim_{u \\to 0} \\frac{\\sin u}{u} = 3(1) = 3"
                    },
                    section3: {
                        title3: "Limite Infinite și Limite la Infinit",
                        def3_1_title: "Limite Infinite (Asimptote Verticale)",
                        def3_1: "Dacă f(x) crește sau scade fără limită pe măsură ce x se apropie de c, scriem:",
                        math3_1: `\\lim_{x \\to c} f(x) = \\infty \\quad \\text{sau} \\quad \\lim_{x \\to c} f(x) = -\\infty`,
                        text3_1: "Geometric, aceasta indică o Asimptotă Verticală în x = c.",
                        def3_2_title: "Limite la Infinit (Asimptote Orizontale)",
                        def3_2: "Aceasta descrie comportamentul final al unei funcții când x devine foarte mare.",
                        math3_2: `\\lim_{x \\to \\infty} f(x) = L`,
                        text3_2: "Dacă această limită este un număr finit L, dreapta y = L este o Asimptotă Orizontală.",
                        rule3_1: "Strategie pentru Funcții Raționale: Împărțiți fiecare termen la cea mai mare putere a lui x din numitor."
                    },
                    section4: {
                        title4: "Continuitate",
                        def4_1: "Continuitatea este termenul matematic pentru un grafic care nu are găuri, salturi sau întreruperi.",
                        def4_2: "Definiție Formală: O funcție f este continuă într-un punct x = c dacă sunt îndeplinite trei condiții:",
                        cond4_1: "1. f(c) este definită (punctul există).",
                        cond4_2: "2. $\\lim_{x \\to c} f(x)$ există (calea se apropie de o valoare specifică).",
                        cond4_3: "3. $\\lim_{x \\to c} f(x) = f(c)$ (limita este egală cu valoarea funcției).",
                        types_title: "Tipuri de Discontinuitate",
                        type1: "Discontinuitate Eliminabilă (Gaură): Limita există, dar f(c) este nedefinită sau diferită.",
                        type2: "Discontinuitate de Salt: Limitele la stânga și la dreapta există, dar sunt diferite.",
                        type3: "Discontinuitate Infinită: Funcția tinde la infinit în punct."
                    },
                    example_section: {
                        title_ex: "Exemple cu Soluții Pas cu Pas",
                        ex1: {
                            title: "1. Rezolvarea unei Forme Nedeterminate ($\\frac{0}{0}$)",
                            problem: "Evaluați limita:",
                            problem_math: `\\lim_{x \\to 3} \\frac{x^2 - 9}{x^2 - 2x - 3}`,
                            step1_title: "Pasul 1: Încercați Substituția Directă",
                            step1_desc: "Înlocuind x = 3 obținem $\\frac{9-9}{9-6-3} = \\frac{0}{0}$. Aceasta indică faptul că trebuie să simplificăm.",
                            step2_title: "Pasul 2: Factorizați Polinoamele",
                            step2_math: `\\frac{(x - 3)(x + 3)}{(x - 3)(x + 1)}`,
                            step3_title: "Pasul 3: Simplificați și Rezolvați",
                            step3_desc: "Simplificați termenul (x-3) și înlocuiți din nou x = 3.",
                            step3_math: `\\lim_{x \\to 3} \\frac{x + 3}{x + 1} = \\frac{3 + 3}{3 + 1} = \\frac{6}{4} = \\frac{3}{2}`,
                            result_title: "Răspuns Final",
                            result: "Limita este $\\frac{3}{2}$."
                        },
                        ex2: {
                            title: "2. Limite la Infinit",
                            problem: "Determinați comportamentul final:",
                            problem_math: `\\lim_{x \\to \\infty} \\frac{2x^3 + 7}{5x^3 - 4x + 1}`,
                            step1_title: "Pasul 1: Identificați Cele Mai Mari Puteri",
                            step1_desc: "Gradul numărătorului este 3 și al numitorului este 3.",
                            step2_title: "Pasul 2: Împărțiți la $x^3$",
                            step2_desc: "Împărțiți fiecare termen la cea mai mare putere din numitor.",
                            step2_math: `\\lim_{x \\to \\infty} \\frac{2 + \\frac{7}{x^3}}{5 - \\frac{4}{x^2} + \\frac{1}{x^3}}`,
                            step3_title: "Pasul 3: Evaluați",
                            step3_desc: "Orice termen cu x la numitor tinde la 0.",
                            step3_math: `\\frac{2 + 0}{5 - 0 + 0} = \\frac{2}{5}`,
                            result_title: "Răspuns Final",
                            result: "Limita este $\\frac{2}{5}$ (Asimptotă Orizontală la $y = \\frac{2}{5}$)."
                        },
                        ex3: {
                            title: "3. Determinarea Continuității",
                            problem: "Este funcția f(x) continuă în x = 1?",
                            problem_math: `f(x) = \\begin{cases} x^2 + 1 & x < 1 \\\\ 3 & x = 1 \\\\ 2x & x > 1 \\end{cases}`,
                            step1_title: "Pasul 1: Evaluați f(1)",
                            step1_desc: "Din definiție, f(1) = 3.",
                            step2_title: "Pasul 2: Evaluați Limitele Laterale",
                            step2_math: `\\lim_{x \\to 1^-} (x^2 + 1) = 1^2 + 1 = 2 \\\\ \\lim_{x \\to 1^+} (2x) = 2(1) = 2`,
                            step3_title: "Pasul 3: Comparați Limita și Valoarea Funcției",
                            step3_desc: "Limita există deoarece limitele la stânga și la dreapta sunt ambele 2. Cu toate acestea, limita (2) nu este egală cu valoarea funcției (3).",
                            result_title: "Răspuns Final",
                            result: "Nu, f(x) este discontinuă în x = 1 (Discontinuitate Eliminabilă)."
                        }
                    }
                }
            }
        }
    }
};