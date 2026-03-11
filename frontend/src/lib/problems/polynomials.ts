import type { Problem } from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// POLYNOMIAL PROBLEMS (1–10)
// ─────────────────────────────────────────────────────────────────────────────

export const polynomialProblems: Problem[] = [
  {
    id: 1,
    category: "polynomials",
    difficulty: "beginner",
    acceptedAnswers: ["3"],
    answerPlaceholder: "Enter a number...",
    translations: {
      en: {
        title: "Evaluate a Polynomial",
        description:
          "Evaluate the polynomial $p(x) = 2x^2 - 3x + 1$ at $x = 2$.",
        hint: "Replace x with 2 and apply the order of operations.",
        solution: "$p(2) = 2(2)^2 - 3(2) + 1 = 8 - 6 + 1 = 3$",
        steps: [
          { step: "Substitute x = 2: $2(2)^2 - 3(2) + 1$", explanation: "Replace every x with 2." },
          { step: "$2(4) - 6 + 1$", explanation: "Compute the exponent first: $2^2 = 4$." },
          { step: "$8 - 6 + 1 = 3$", explanation: "Perform the remaining arithmetic left to right." },
        ],
      },
      es: {
        title: "Evaluar un Polinomio",
        description:
          "Evalúa el polinomio $p(x) = 2x^2 - 3x + 1$ en $x = 2$.",
        hint: "Reemplaza x con 2 y aplica el orden de operaciones.",
        solution: "$p(2) = 2(4) - 6 + 1 = 3$",
        steps: [
          { step: "Sustituye x = 2: $2(2)^2 - 3(2) + 1$", explanation: "Reemplaza cada x por 2." },
          { step: "$2(4) - 6 + 1$", explanation: "Calcula el exponente primero: $2^2=4$." },
          { step: "$8 - 6 + 1 = 3$", explanation: "Realiza la aritmética restante de izquierda a derecha." },
        ],
      },
      fr: {
        title: "Évaluer un Polynôme",
        description:
          "Évaluez le polynôme $p(x) = 2x^2 - 3x + 1$ en $x = 2$.",
        hint: "Remplacez x par 2 et appliquez l'ordre des opérations.",
        solution: "$p(2) = 2(4) - 6 + 1 = 3$",
        steps: [
          { step: "Substituez x = 2 : $2(2)^2 - 3(2) + 1$", explanation: "Remplacez chaque x par 2." },
          { step: "$2(4) - 6 + 1$", explanation: "Calculez l'exposant en premier : $2^2=4$." },
          { step: "$8 - 6 + 1 = 3$", explanation: "Effectuez les opérations restantes de gauche à droite." },
        ],
      },
      de: {
        title: "Polynom Auswerten",
        description:
          "Werte das Polynom $p(x) = 2x^2 - 3x + 1$ an der Stelle $x = 2$ aus.",
        hint: "Ersetzen Sie x durch 2 und wenden Sie die Rechenreihenfolge an.",
        solution: "$p(2) = 2(4) - 6 + 1 = 3$",
        steps: [
          { step: "Setze x = 2 ein: $2(2)^2 - 3(2) + 1$", explanation: "Ersetzen Sie jedes x durch 2." },
          { step: "$2(4) - 6 + 1$", explanation: "Berechnen Sie zunächst den Exponenten: $2^2=4$." },
          { step: "$8 - 6 + 1 = 3$", explanation: "Führen Sie die restliche Arithmetik von links nach rechts durch." },
        ],
      },
      pl: {
        title: "Obliczanie Wartości Wielomianu",
        description:
          "Oblicz wartość wielomianu $p(x) = 2x^2 - 3x + 1$ dla $x = 2$.",
        hint: "Podstaw x = 2 i zastosuj kolejność działań.",
        solution: "$p(2) = 2(4) - 6 + 1 = 3$",
        steps: [
          { step: "Podstaw x = 2: $2(2)^2 - 3(2) + 1$", explanation: "Zastąp każde x przez 2." },
          { step: "$2(4) - 6 + 1$", explanation: "Najpierw oblicz potęgę: $2^2=4$." },
          { step: "$8 - 6 + 1 = 3$", explanation: "Wykonaj pozostałe działania od lewej do prawej." },
        ],
      },
      ro: {
        title: "Evaluarea unui Polinom",
        description:
          "Calculează valoarea polinomului $p(x) = 2x^2 - 3x + 1$ pentru $x = 2$.",
        hint: "Înlocuiește x cu 2 și aplică ordinea operațiilor.",
        solution: "$p(2) = 2(4) - 6 + 1 = 3$",
        steps: [
          { step: "Substituie x = 2: $2(2)^2 - 3(2) + 1$", explanation: "Înlocuiește fiecare x cu 2." },
          { step: "$2(4) - 6 + 1$", explanation: "Calculează mai întâi puterea: $2^2=4$." },
          { step: "$8 - 6 + 1 = 3$", explanation: "Efectuează aritmetica rămasă de la stânga la dreapta." },
        ],
      },
    },
  },
  {
    id: 2,
    category: "polynomials",
    difficulty: "beginner",
    acceptedAnswers: ["(x-3)(x+3)", "(x+3)(x-3)"],
    answerPlaceholder: "e.g. (x+a)(x+b)",
    translations: {
      en: {
        title: "Factor a Difference of Squares",
        description: "Factor the polynomial: $x^2 - 9$",
        hint: "Use the identity $a^2 - b^2 = (a-b)(a+b)$.",
        solution: "$x^2 - 9 = (x-3)(x+3)$",
        steps: [
          { step: "Recognise the pattern: $x^2 - 9 = x^2 - 3^2$", explanation: "Both terms are perfect squares." },
          { step: "Apply $a^2 - b^2 = (a-b)(a+b)$ with $a=x$, $b=3$", explanation: "Use the difference-of-squares identity." },
          { step: "$x^2 - 9 = (x-3)(x+3)$", explanation: "Write the fully factored form." },
        ],
      },
      es: {
        title: "Factorizar una Diferencia de Cuadrados",
        description: "Factoriza el polinomio: $x^2 - 9$",
        hint: "Usa la identidad $a^2 - b^2 = (a-b)(a+b)$.",
        solution: "$x^2 - 9 = (x-3)(x+3)$",
        steps: [
          { step: "Reconoce el patrón: $x^2 - 9 = x^2 - 3^2$", explanation: "Ambos términos son cuadrados perfectos." },
          { step: "Aplica $a^2 - b^2 = (a-b)(a+b)$ con $a=x$, $b=3$", explanation: "Usa la identidad de diferencia de cuadrados." },
          { step: "$x^2 - 9 = (x-3)(x+3)$", explanation: "Escribe la forma completamente factorizada." },
        ],
      },
      fr: {
        title: "Factoriser une Différence de Carrés",
        description: "Factorisez le polynôme : $x^2 - 9$",
        hint: "Utilisez l'identité $a^2 - b^2 = (a-b)(a+b)$.",
        solution: "$x^2 - 9 = (x-3)(x+3)$",
        steps: [
          { step: "Reconnaissez le schéma : $x^2 - 9 = x^2 - 3^2$", explanation: "Les deux termes sont des carrés parfaits." },
          { step: "Appliquez $a^2 - b^2 = (a-b)(a+b)$ avec $a=x$, $b=3$", explanation: "Utilisez l'identité différence de deux carrés." },
          { step: "$x^2 - 9 = (x-3)(x+3)$", explanation: "Écrivez la forme entièrement factorisée." },
        ],
      },
      de: {
        title: "Differenz von Quadraten faktorisieren",
        description: "Faktorisieren Sie das Polynom: $x^2 - 9$",
        hint: "Verwenden Sie die Identität $a^2 - b^2 = (a-b)(a+b)$.",
        solution: "$x^2 - 9 = (x-3)(x+3)$",
        steps: [
          { step: "Erkenne das Muster: $x^2 - 9 = x^2 - 3^2$", explanation: "Beide Terme sind vollständige Quadrate." },
          { step: "Wende $a^2 - b^2 = (a-b)(a+b)$ mit $a=x$, $b=3$ an", explanation: "Verwenden Sie die Differenz-der-Quadrate-Identität." },
          { step: "$x^2 - 9 = (x-3)(x+3)$", explanation: "Schreiben Sie die vollständig faktorisierte Form." },
        ],
      },
      pl: {
        title: "Rozkład Różnicy Kwadratów",
        description: "Rozłóż wielomian na czynniki: $x^2 - 9$",
        hint: "Zastosuj wzór $a^2 - b^2 = (a-b)(a+b)$.",
        solution: "$x^2 - 9 = (x-3)(x+3)$",
        steps: [
          { step: "Rozpoznaj wzorzec: $x^2 - 9 = x^2 - 3^2$", explanation: "Oba wyrazy są pełnymi kwadratami." },
          { step: "Zastosuj $a^2 - b^2 = (a-b)(a+b)$ dla $a=x$, $b=3$", explanation: "Użyj wzoru na różnicę kwadratów." },
          { step: "$x^2 - 9 = (x-3)(x+3)$", explanation: "Zapisz w pełni rozłożoną postać." },
        ],
      },
      ro: {
        title: "Factorizarea Diferenței de Pătrate",
        description: "Factorizează polinomul: $x^2 - 9$",
        hint: "Folosește identitatea $a^2 - b^2 = (a-b)(a+b)$.",
        solution: "$x^2 - 9 = (x-3)(x+3)$",
        steps: [
          { step: "Recunoaște modelul: $x^2 - 9 = x^2 - 3^2$", explanation: "Ambii termeni sunt pătrate perfecte." },
          { step: "Aplică $a^2 - b^2 = (a-b)(a+b)$ cu $a=x$, $b=3$", explanation: "Folosește identitatea diferenței de pătrate." },
          { step: "$x^2 - 9 = (x-3)(x+3)$", explanation: "Scrie forma complet factorizată." },
        ],
      },
    },
  },
  {
    id: 3,
    category: "polynomials",
    difficulty: "beginner",
    acceptedAnswers: ["x^2+7x+10", "x^2+10+7x"],
    answerPlaceholder: "e.g. x^2+bx+c",
    translations: {
      en: {
        title: "Expand Binomials",
        description: "Expand the expression: $(x + 2)(x + 5)$",
        hint: "Use the FOIL method (First, Outer, Inner, Last).",
        solution: "$x^2 + 7x + 10$",
        steps: [
          { step: "First: $x \\times x = x^2$", explanation: "Multiply the first terms of each binomial." },
          { step: "Outer: $x \\times 5 = 5x$", explanation: "Multiply the outer terms." },
          { step: "Inner: $2 \\times x = 2x$", explanation: "Multiply the inner terms." },
          { step: "Last: $2 \\times 5 = 10$", explanation: "Multiply the last terms." },
          { step: "Combine like terms: $x^2 + 5x + 2x + 10 = x^2 + 7x + 10$", explanation: "Add the x terms together." }
        ]
      },
      es: {
        title: "Expandir Binomios",
        description: "Expande la expresión: $(x + 2)(x + 5)$",
        hint: "Usa el método FOIL (Primero, Exterior, Interior, Último).",
        solution: "$x^2 + 7x + 10$",
        steps: [
          { step: "Primero: $x \\times x = x^2$", explanation: "Multiplica los primeros términos." },
          { step: "Exterior: $x \\times 5 = 5x$", explanation: "Multiplica los términos exteriores." },
          { step: "Interior: $2 \\times x = 2x$", explanation: "Multiplica los términos interiores." },
          { step: "Último: $2 \\times 5 = 10$", explanation: "Multiplica los últimos términos." },
          { step: "Combina términos semejantes: $x^2 + 5x + 2x + 10 = x^2 + 7x + 10$", explanation: "Suma los términos con x." }
        ]
      },
      fr: {
        title: "Développer des Binômes",
        description: "Développez l'expression : $(x + 2)(x + 5)$",
        hint: "Utilisez la double distributivité.",
        solution: "$x^2 + 7x + 10$",
        steps: [
          { step: "Premier : $x \\times x = x^2$", explanation: "Multipliez les premiers termes." },
          { step: "Extérieur : $x \\times 5 = 5x$", explanation: "Multipliez les termes extérieurs." },
          { step: "Intérieur : $2 \\times x = 2x$", explanation: "Multipliez les termes intérieurs." },
          { step: "Dernier : $2 \\times 5 = 10$", explanation: "Multipliez les derniers termes." },
          { step: "Regroupez les termes : $x^2 + 5x + 2x + 10 = x^2 + 7x + 10$", explanation: "Additionnez les termes en x." }
        ]
      },
      de: {
        title: "Binome Ausmultiplizieren",
        description: "Multipliziere den Ausdruck aus: $(x + 2)(x + 5)$",
        hint: "Wende das Distributivgesetz an (jeden Term mit jedem multiplizieren).",
        solution: "$x^2 + 7x + 10$",
        steps: [
          { step: "Erste: $x \\times x = x^2$", explanation: "Multipliziere die ersten Terme." },
          { step: "Äußere: $x \\times 5 = 5x$", explanation: "Multipliziere die äußeren Terme." },
          { step: "Innere: $2 \\times x = 2x$", explanation: "Multipliziere die inneren Terme." },
          { step: "Letzte: $2 \\times 5 = 10$", explanation: "Multipliziere die letzten Terme." },
          { step: "Zusammenfassen: $x^2 + 5x + 2x + 10 = x^2 + 7x + 10$", explanation: "Addiere die x-Terme." }
        ]
      },
      pl: {
        title: "Mnożenie Dwumianów",
        description: "Rozwiń wyrażenie: $(x + 2)(x + 5)$",
        hint: "Pomnóż każdy wyraz pierwszego nawiasu przez każdy wyraz drugiego nawiasu.",
        solution: "$x^2 + 7x + 10$",
        steps: [
          { step: "Pierwsze: $x \\times x = x^2$", explanation: "Pomnóż pierwsze wyrazy." },
          { step: "Zewnętrzne: $x \\times 5 = 5x$", explanation: "Pomnóż zewnętrzne wyrazy." },
          { step: "Wewnętrzne: $2 \\times x = 2x$", explanation: "Pomnóż wewnętrzne wyrazy." },
          { step: "Ostatnie: $2 \\times 5 = 10$", explanation: "Pomnóż ostatnie wyrazy." },
          { step: "Połącz podobne: $x^2 + 5x + 2x + 10 = x^2 + 7x + 10$", explanation: "Dodaj do siebie wyrazy z x." }
        ]
      },
      ro: {
        title: "Desfacerea Binoamelor",
        description: "Dezvoltă expresia: $(x + 2)(x + 5)$",
        hint: "Înmulțește fiecare termen din prima paranteză cu fiecare termen din a doua.",
        solution: "$x^2 + 7x + 10$",
        steps: [
          { step: "Primii: $x \\times x = x^2$", explanation: "Înmulțește primii termeni." },
          { step: "Exteriori: $x \\times 5 = 5x$", explanation: "Înmulțește termenii exteriori." },
          { step: "Interiori: $2 \\times x = 2x$", explanation: "Înmulțește termenii interiori." },
          { step: "Ultimii: $2 \\times 5 = 10$", explanation: "Înmulțește ultimii termeni." },
          { step: "Combină termenii asemenea: $x^2 + 5x + 2x + 10 = x^2 + 7x + 10$", explanation: "Adună termenii care conțin x." }
        ]
      }
    }
  },
  {
    id: 4,
    category: "polynomials",
    difficulty: "intermediate",
    acceptedAnswers: ["(x+4)(x-2)"],
    answerPlaceholder: "e.g. (x+a)(x+b)",
    translations: {
      en: {
        title: "Factor a Quadratic Trinomial",
        description: "Factor the polynomial: $x^2 + 2x - 8$",
        hint: "Find two numbers that multiply to -8 and add to 2.",
        solution: "$(x+4)(x-2)$",
        steps: [
          { step: "Identify a=1, b=2, c=-8", explanation: "Look at the coefficients of the quadratic." },
          { step: "Find factors of -8", explanation: "Pairs: (1, -8), (-1, 8), (2, -4), (-2, 4)." },
          { step: "Find the sum of 2", explanation: "4 + (-2) = 2. So the numbers are 4 and -2." },
          { step: "Write the factors: $(x+4)(x-2)$", explanation: "Place the numbers into the binomials." }
        ]
      },
      es: {
        title: "Factorizar un Trinomio Cuadrático",
        description: "Factoriza el polinomio: $x^2 + 2x - 8$",
        hint: "Encuentra dos números que multiplicados den -8 y sumados den 2.",
        solution: "$(x+4)(x-2)$",
        steps: [
          { step: "Identifica a=1, b=2, c=-8", explanation: "Mira los coeficientes de la ecuación." },
          { step: "Encuentra factores de -8", explanation: "Pares: (1, -8), (-1, 8), (2, -4), (-2, 4)." },
          { step: "Encuentra la suma de 2", explanation: "4 + (-2) = 2. Los números son 4 y -2." },
          { step: "Escribe los factores: $(x+4)(x-2)$", explanation: "Coloca los números en los binomios." }
        ]
      },
      fr: {
        title: "Factoriser un Trinôme du Second Degré",
        description: "Factorisez le polynôme : $x^2 + 2x - 8$",
        hint: "Trouvez deux nombres dont le produit est -8 et la somme est 2.",
        solution: "$(x+4)(x-2)$",
        steps: [
          { step: "Identifiez a=1, b=2, c=-8", explanation: "Regardez les coefficients du trinôme." },
          { step: "Trouvez les facteurs de -8", explanation: "Paires : (1, -8), (-1, 8), (2, -4), (-2, 4)." },
          { step: "Trouvez la somme de 2", explanation: "4 + (-2) = 2. Les nombres sont donc 4 et -2." },
          { step: "Écrivez les facteurs : $(x+4)(x-2)$", explanation: "Placez les nombres dans les binômes." }
        ]
      },
      de: {
        title: "Ein quadratisches Trinom faktorisieren",
        description: "Faktorisieren Sie das Polynom: $x^2 + 2x - 8$",
        hint: "Finde zwei Zahlen, deren Produkt -8 und deren Summe 2 ist.",
        solution: "$(x+4)(x-2)$",
        steps: [
          { step: "Identifiziere a=1, b=2, c=-8", explanation: "Betrachte die Koeffizienten." },
          { step: "Finde Faktoren von -8", explanation: "Paare: (1, -8), (-1, 8), (2, -4), (-2, 4)." },
          { step: "Finde die Summe von 2", explanation: "4 + (-2) = 2. Die Zahlen sind also 4 und -2." },
          { step: "Schreibe die Faktoren: $(x+4)(x-2)$", explanation: "Setze die Zahlen in die Klammern ein." }
        ]
      },
      pl: {
        title: "Rozkład Trójmianu Kwadratowego",
        description: "Rozłóż wielomian: $x^2 + 2x - 8$",
        hint: "Znajdź dwie liczby, których iloczyn wynosi -8, a suma 2.",
        solution: "$(x+4)(x-2)$",
        steps: [
          { step: "Zidentyfikuj a=1, b=2, c=-8", explanation: "Spójrz na współczynniki trójmianu." },
          { step: "Znajdź czynniki -8", explanation: "Pary: (1, -8), (-1, 8), (2, -4), (-2, 4)." },
          { step: "Znajdź sumę 2", explanation: "4 + (-2) = 2. Szukane liczby to 4 i -2." },
          { step: "Zapisz czynniki: $(x+4)(x-2)$", explanation: "Umieść liczby w nawiasach." }
        ]
      },
      ro: {
        title: "Factorizarea unui Trinom Pătratic",
        description: "Factorizează polinomul: $x^2 + 2x - 8$",
        hint: "Găsește două numere care înmulțite dau -8 și adunate dau 2.",
        solution: "$(x+4)(x-2)$",
        steps: [
          { step: "Identifică a=1, b=2, c=-8", explanation: "Uită-te la coeficienții ecuației." },
          { step: "Găsește factorii lui -8", explanation: "Perechi: (1, -8), (-1, 8), (2, -4), (-2, 4)." },
          { step: "Găsește suma 2", explanation: "4 + (-2) = 2. Deci numerele sunt 4 și -2." },
          { step: "Scrie factorii: $(x+4)(x-2)$", explanation: "Plasează numerele în paranteze." }
        ]
      }
    }
  },
  {
    id: 5,
    category: "polynomials",
    difficulty: "intermediate",
    acceptedAnswers: ["3x^2+x"],
    answerPlaceholder: "e.g. ax^2+bx",
    translations: {
      en: {
        title: "Add Polynomials",
        description: "Simplify: $(2x^2 + 4x - 3) + (x^2 - 3x + 3)$",
        hint: "Combine the like terms (terms with the same exponent).",
        solution: "$3x^2 + x$",
        steps: [
          { step: "Group $x^2$ terms: $2x^2 + x^2 = 3x^2$", explanation: "Add the coefficients of the squared terms." },
          { step: "Group $x$ terms: $4x - 3x = x$", explanation: "Add the coefficients of the linear terms." },
          { step: "Group constants: $-3 + 3 = 0$", explanation: "Add the numbers without variables." },
          { step: "Final result: $3x^2 + x$", explanation: "Combine all the simplified parts." }
        ]
      },
      es: {
        title: "Suma de Polinomios",
        description: "Simplifica: $(2x^2 + 4x - 3) + (x^2 - 3x + 3)$",
        hint: "Combina los términos semejantes (términos con el mismo exponente).",
        solution: "$3x^2 + x$",
        steps: [
          { step: "Agrupa términos $x^2$: $2x^2 + x^2 = 3x^2$", explanation: "Suma los coeficientes de los términos al cuadrado." },
          { step: "Agrupa términos $x$: $4x - 3x = x$", explanation: "Suma los coeficientes de los términos lineales." },
          { step: "Agrupa constantes: $-3 + 3 = 0$", explanation: "Suma los números sin variables." },
          { step: "Resultado final: $3x^2 + x$", explanation: "Combina todas las partes simplificadas." }
        ]
      },
      fr: {
        title: "Addition de Polynômes",
        description: "Simplifiez : $(2x^2 + 4x - 3) + (x^2 - 3x + 3)$",
        hint: "Regroupez les termes semblables (termes avec le même exposant).",
        solution: "$3x^2 + x$",
        steps: [
          { step: "Regroupez les $x^2$ : $2x^2 + x^2 = 3x^2$", explanation: "Additionnez les coefficients des termes au carré." },
          { step: "Regroupez les $x$ : $4x - 3x = x$", explanation: "Additionnez les coefficients des termes linéaires." },
          { step: "Regroupez les constantes : $-3 + 3 = 0$", explanation: "Additionnez les nombres sans variables." },
          { step: "Résultat final : $3x^2 + x$", explanation: "Combinez toutes les parties simplifiées." }
        ]
      },
      de: {
        title: "Polynome Addieren",
        description: "Vereinfache: $(2x^2 + 4x - 3) + (x^2 - 3x + 3)$",
        hint: "Fasse gleichartige Terme zusammen (Terme mit demselben Exponenten).",
        solution: "$3x^2 + x$",
        steps: [
          { step: "Gruppiere $x^2$-Terme: $2x^2 + x^2 = 3x^2$", explanation: "Addiere die Koeffizienten der quadrierten Terme." },
          { step: "Gruppiere $x$-Terme: $4x - 3x = x$", explanation: "Addiere die Koeffizienten der linearen Terme." },
          { step: "Gruppiere Konstanten: $-3 + 3 = 0$", explanation: "Addiere die reinen Zahlen." },
          { step: "Endergebnis: $3x^2 + x$", explanation: "Füge alle vereinfachten Teile zusammen." }
        ]
      },
      pl: {
        title: "Dodawanie Wielomianów",
        description: "Uprość: $(2x^2 + 4x - 3) + (x^2 - 3x + 3)$",
        hint: "Połącz wyrazy podobne (wyrazy o tym samym wykładniku).",
        solution: "$3x^2 + x$",
        steps: [
          { step: "Grupuj wyrazy z $x^2$: $2x^2 + x^2 = 3x^2$", explanation: "Dodaj współczynniki wyrazów kwadratowych." },
          { step: "Grupuj wyrazy z $x$: $4x - 3x = x$", explanation: "Dodaj współczynniki wyrazów liniowych." },
          { step: "Grupuj stałe: $-3 + 3 = 0$", explanation: "Dodaj same liczby." },
          { step: "Wynik końcowy: $3x^2 + x$", explanation: "Połącz wszystkie uproszczone części." }
        ]
      },
      ro: {
        title: "Adunarea Polinoamelor",
        description: "Simplifică: $(2x^2 + 4x - 3) + (x^2 - 3x + 3)$",
        hint: "Combină termenii asemenea (termeni cu același exponent).",
        solution: "$3x^2 + x$",
        steps: [
          { step: "Grupează termenii cu $x^2$: $2x^2 + x^2 = 3x^2$", explanation: "Adună coeficienții termenilor la pătrat." },
          { step: "Grupează termenii cu $x$: $4x - 3x = x$", explanation: "Adună coeficienții termenilor liniari." },
          { step: "Grupează constantele: $-3 + 3 = 0$", explanation: "Adună numerele fără variabile." },
          { step: "Rezultat final: $3x^2 + x$", explanation: "Combină toate părțile simplificate." }
        ]
      }
    }
  },
  {
    id: 6,
    category: "polynomials",
    difficulty: "intermediate",
    acceptedAnswers: ["3, -3", "-3, 3", "x=3, x=-3"],
    answerPlaceholder: "e.g. 5, -5",
    translations: {
      en: {
        title: "Roots of a Polynomial",
        description: "Find the roots of the equation: $x^2 - 9 = 0$",
        hint: "Factor the polynomial, then set each factor to zero.",
        solution: "$x = 3, -3$",
        steps: [
          { step: "Factor: $(x - 3)(x + 3) = 0$", explanation: "Use difference of squares." },
          { step: "Set $x - 3 = 0 \\implies x = 3$", explanation: "Solve the first factor." },
          { step: "Set $x + 3 = 0 \\implies x = -3$", explanation: "Solve the second factor." }
        ]
      },
      es: {
        title: "Raíces de un Polinomio",
        description: "Encuentra las raíces de la ecuación: $x^2 - 9 = 0$",
        hint: "Factoriza el polinomio y luego iguala cada factor a cero.",
        solution: "$x = 3, -3$",
        steps: [
          { step: "Factoriza: $(x - 3)(x + 3) = 0$", explanation: "Usa diferencia de cuadrados." },
          { step: "Iguala $x - 3 = 0 \\implies x = 3$", explanation: "Resuelve el primer factor." },
          { step: "Iguala $x + 3 = 0 \\implies x = -3$", explanation: "Resuelve el segundo factor." }
        ]
      },
      fr: {
        title: "Racines d'un Polynôme",
        description: "Trouvez les racines de l'équation : $x^2 - 9 = 0$",
        hint: "Factorisez le polynôme, puis posez chaque facteur égal à zéro.",
        solution: "$x = 3, -3$",
        steps: [
          { step: "Factorisez : $(x - 3)(x + 3) = 0$", explanation: "Utilisez la différence de deux carrés." },
          { step: "Posez $x - 3 = 0 \\implies x = 3$", explanation: "Résolvez le premier facteur." },
          { step: "Posez $x + 3 = 0 \\implies x = -3$", explanation: "Résolvez le deuxième facteur." }
        ]
      },
      de: {
        title: "Nullstellen eines Polynoms",
        description: "Finde die Nullstellen der Gleichung: $x^2 - 9 = 0$",
        hint: "Faktorisiere das Polynom und setze jeden Faktor gleich null.",
        solution: "$x = 3, -3$",
        steps: [
          { step: "Faktorisiere: $(x - 3)(x + 3) = 0$", explanation: "Verwende die Differenz von Quadraten." },
          { step: "Setze $x - 3 = 0 \\implies x = 3$", explanation: "Löse den ersten Faktor." },
          { step: "Setze $x + 3 = 0 \\implies x = -3$", explanation: "Löse den zweiten Faktor." }
        ]
      },
      pl: {
        title: "Pierwiastki Wielomianu",
        description: "Znajdź pierwiastki równania: $x^2 - 9 = 0$",
        hint: "Rozłóż wielomian, a następnie przyrównaj każdy czynnik do zera.",
        solution: "$x = 3, -3$",
        steps: [
          { step: "Rozłóż: $(x - 3)(x + 3) = 0$", explanation: "Użyj różnicy kwadratów." },
          { step: "Przyrównaj $x - 3 = 0 \\implies x = 3$", explanation: "Rozwiąż pierwszy czynnik." },
          { step: "Przyrównaj $x + 3 = 0 \\implies x = -3$", explanation: "Rozwiąż drugi czynnik." }
        ]
      },
      ro: {
        title: "Rădăcinile unui Polinom",
        description: "Găsește rădăcinile ecuației: $x^2 - 9 = 0$",
        hint: "Factorizează polinomul, apoi egalează fiecare factor cu zero.",
        solution: "$x = 3, -3$",
        steps: [
          { step: "Factorizează: $(x - 3)(x + 3) = 0$", explanation: "Folosește diferența de pătrate." },
          { step: "Egalează $x - 3 = 0 \\implies x = 3$", explanation: "Rezolvă primul factor." },
          { step: "Egalează $x + 3 = 0 \\implies x = -3$", explanation: "Rezolvă al doilea factor." }
        ]
      }
    }
  },
  {
    id: 7,
    category: "polynomials",
    difficulty: "intermediate",
    acceptedAnswers: ["(x+5)^2", "(x+5)(x+5)"],
    answerPlaceholder: "e.g. (x+a)^2",
    translations: {
      en: {
        title: "Perfect Square Trinomial",
        description: "Factor the expression completely: $x^2 + 10x + 25$",
        hint: "Notice that the first and last terms are perfect squares.",
        solution: "$(x+5)^2$",
        steps: [
          { step: "Identify squares: $x^2$ is $(x)^2$, and $25$ is $(5)^2$.", explanation: "Check the first and last terms." },
          { step: "Check the middle term: $2(x)(5) = 10x$.", explanation: "Verify it matches the pattern $a^2 + 2ab + b^2$." },
          { step: "Write as a perfect square: $(x+5)^2$.", explanation: "Apply the formula $(a+b)^2$." }
        ]
      },
      es: {
        title: "Trinomio Cuadrado Perfecto",
        description: "Factoriza la expresión completamente: $x^2 + 10x + 25$",
        hint: "Nota que el primer y último término son cuadrados perfectos.",
        solution: "$(x+5)^2$",
        steps: [
          { step: "Identifica cuadrados: $x^2$ es $(x)^2$, y $25$ es $(5)^2$.", explanation: "Verifica el primer y último término." },
          { step: "Verifica el término medio: $2(x)(5) = 10x$.", explanation: "Comprueba que coincide con el patrón $a^2 + 2ab + b^2$." },
          { step: "Escribe como cuadrado perfecto: $(x+5)^2$.", explanation: "Aplica la fórmula $(a+b)^2$." }
        ]
      },
      fr: {
        title: "Trinôme Carré Parfait",
        description: "Factorisez l'expression complètement : $x^2 + 10x + 25$",
        hint: "Remarquez que le premier et le dernier terme sont des carrés parfaits.",
        solution: "$(x+5)^2$",
        steps: [
          { step: "Identifiez les carrés : $x^2$ est $(x)^2$, et $25$ est $(5)^2$.", explanation: "Vérifiez le premier et le dernier terme." },
          { step: "Vérifiez le terme du milieu : $2(x)(5) = 10x$.", explanation: "Vérifiez qu'il correspond au motif $a^2 + 2ab + b^2$." },
          { step: "Écrivez comme un carré parfait : $(x+5)^2$.", explanation: "Appliquez la formule $(a+b)^2$." }
        ]
      },
      de: {
        title: "Perfektes Quadrat-Trinom",
        description: "Faktorisiere den Ausdruck vollständig: $x^2 + 10x + 25$",
        hint: "Beachte, dass der erste und letzte Term perfekte Quadrate sind.",
        solution: "$(x+5)^2$",
        steps: [
          { step: "Identifiziere Quadrate: $x^2$ ist $(x)^2$, und $25$ ist $(5)^2$.", explanation: "Überprüfe den ersten und letzten Term." },
          { step: "Überprüfe den mittleren Term: $2(x)(5) = 10x$.", explanation: "Verifiziere, ob es dem Muster $a^2 + 2ab + b^2$ entspricht." },
          { step: "Schreibe als perfektes Quadrat: $(x+5)^2$.", explanation: "Wende die Formel $(a+b)^2$ an." }
        ]
      },
      pl: {
        title: "Trójmian Kwadratowy Pełny",
        description: "Rozłóż wyrażenie całkowicie: $x^2 + 10x + 25$",
        hint: "Zauważ, że pierwszy i ostatni wyraz są pełnymi kwadratami.",
        solution: "$(x+5)^2$",
        steps: [
          { step: "Zidentyfikuj kwadraty: $x^2$ to $(x)^2$, a $25$ to $(5)^2$.", explanation: "Sprawdź pierwszy i ostatni wyraz." },
          { step: "Sprawdź środkowy wyraz: $2(x)(5) = 10x$.", explanation: "Upewnij się, że pasuje do wzoru $a^2 + 2ab + b^2$." },
          { step: "Zapisz jako pełny kwadrat: $(x+5)^2$.", explanation: "Zastosuj wzór $(a+b)^2$." }
        ]
      },
      ro: {
        title: "Trinom Pătrat Perfect",
        description: "Factorizează expresia complet: $x^2 + 10x + 25$",
        hint: "Observă că primul și ultimul termen sunt pătrate perfecte.",
        solution: "$(x+5)^2$",
        steps: [
          { step: "Identifică pătratele: $x^2$ este $(x)^2$, și $25$ este $(5)^2$.", explanation: "Verifică primul și ultimul termen." },
          { step: "Verifică termenul din mijloc: $2(x)(5) = 10x$.", explanation: "Verifică dacă se potrivește cu modelul $a^2 + 2ab + b^2$." },
          { step: "Scrie ca un pătrat perfect: $(x+5)^2$.", explanation: "Aplică formula $(a+b)^2$." }
        ]
      }
    }
  },
  {
    id: 8,
    category: "polynomials",
    difficulty: "advanced",
    acceptedAnswers: ["14"],
    answerPlaceholder: "Enter the remainder...",
    translations: {
      en: {
        title: "Remainder Theorem",
        description: "Find the remainder when $p(x) = x^3 - 2x^2 + 5x + 2$ is divided by $(x - 2)$.",
        hint: "By the Remainder Theorem, the remainder is equal to $p(2)$.",
        solution: "14",
        steps: [
          { step: "Identify the root of the divisor: $x - 2 = 0 \\implies x = 2$.", explanation: "Find the value to substitute into the polynomial." },
          { step: "Evaluate $p(2) = (2)^3 - 2(2)^2 + 5(2) + 2$.", explanation: "Substitute 2 for x in the polynomial." },
          { step: "$p(2) = 8 - 2(4) + 10 + 2$.", explanation: "Calculate the powers." },
          { step: "$p(2) = 8 - 8 + 10 + 2 = 12 + 2 = 14$.", explanation: "Simplify to find the remainder." }
        ]
      },
      es: {
        title: "Teorema del Resto",
        description: "Encuentra el residuo cuando $p(x) = x^3 - 2x^2 + 5x + 2$ se divide por $(x - 2)$.",
        hint: "Por el Teorema del Resto, el residuo es igual a $p(2)$.",
        solution: "14",
        steps: [
          { step: "Identifica la raíz del divisor: $x - 2 = 0 \\implies x = 2$.", explanation: "Encuentra el valor a sustituir en el polinomio." },
          { step: "Evalúa $p(2) = (2)^3 - 2(2)^2 + 5(2) + 2$.", explanation: "Sustituye 2 por x en el polinomio." },
          { step: "$p(2) = 8 - 2(4) + 10 + 2$.", explanation: "Calcula las potencias." },
          { step: "$p(2) = 8 - 8 + 10 + 2 = 14$.", explanation: "Simplifica para encontrar el residuo." }
        ]
      },
      fr: {
        title: "Théorème du Reste",
        description: "Trouvez le reste quand $p(x) = x^3 - 2x^2 + 5x + 2$ est divisé par $(x - 2)$.",
        hint: "Selon le théorème du reste, le reste est égal à $p(2)$.",
        solution: "14",
        steps: [
          { step: "Identifiez la racine du diviseur : $x - 2 = 0 \\implies x = 2$.", explanation: "Trouvez la valeur à substituer dans le polynôme." },
          { step: "Évaluez $p(2) = (2)^3 - 2(2)^2 + 5(2) + 2$.", explanation: "Substituez x par 2 dans le polynôme." },
          { step: "$p(2) = 8 - 2(4) + 10 + 2$.", explanation: "Calculez les puissances." },
          { step: "$p(2) = 8 - 8 + 10 + 2 = 14$.", explanation: "Simplifiez pour trouver le reste." }
        ]
      },
      de: {
        title: "Polynomdivision (Restsatz)",
        description: "Finde den Rest, wenn $p(x) = x^3 - 2x^2 + 5x + 2$ durch $(x - 2)$ geteilt wird.",
        hint: "Nach dem Restsatz ist der Rest gleich $p(2)$.",
        solution: "14",
        steps: [
          { step: "Identifiziere die Nullstelle des Divisors: $x - 2 = 0 \\implies x = 2$.", explanation: "Finde den Wert, der in das Polynom eingesetzt werden soll." },
          { step: "Werte aus: $p(2) = (2)^3 - 2(2)^2 + 5(2) + 2$.", explanation: "Setze 2 für x im Polynom ein." },
          { step: "$p(2) = 8 - 2(4) + 10 + 2$.", explanation: "Berechne die Potenzen." },
          { step: "$p(2) = 8 - 8 + 10 + 2 = 14$.", explanation: "Vereinfache, um den Rest zu finden." }
        ]
      },
      pl: {
        title: "Twierdzenie o Reszcie",
        description: "Znajdź resztę z dzielenia $p(x) = x^3 - 2x^2 + 5x + 2$ przez $(x - 2)$.",
        hint: "Zgodnie z Twierdzeniem o Reszcie, reszta jest równa $p(2)$.",
        solution: "14",
        steps: [
          { step: "Zidentyfikuj pierwiastek dzielnika: $x - 2 = 0 \\implies x = 2$.", explanation: "Znajdź wartość do podstawienia w wielomianie." },
          { step: "Oblicz $p(2) = (2)^3 - 2(2)^2 + 5(2) + 2$.", explanation: "Podstaw 2 za x w wielomianie." },
          { step: "$p(2) = 8 - 2(4) + 10 + 2$.", explanation: "Oblicz potęgi." },
          { step: "$p(2) = 8 - 8 + 10 + 2 = 14$.", explanation: "Uprość, aby znaleźć resztę." }
        ]
      },
      ro: {
        title: "Teorema Restului",
        description: "Găsește restul când $p(x) = x^3 - 2x^2 + 5x + 2$ este împărțit la $(x - 2)$.",
        hint: "Conform Teoremei Restului, restul este egal cu $p(2)$.",
        solution: "14",
        steps: [
          { step: "Identifică rădăcina împărțitorului: $x - 2 = 0 \\implies x = 2$.", explanation: "Găsește valoarea care trebuie substituită în polinom." },
          { step: "Evaluează $p(2) = (2)^3 - 2(2)^2 + 5(2) + 2$.", explanation: "Substituie x cu 2 în polinom." },
          { step: "$p(2) = 8 - 2(4) + 10 + 2$.", explanation: "Calculează puterile." },
          { step: "$p(2) = 8 - 8 + 10 + 2 = 14$.", explanation: "Simplifică pentru a găsi restul." }
        ]
      }
    }
  },
  {
    id: 9,
    category: "polynomials",
    difficulty: "advanced",
    acceptedAnswers: ["(x^2+1)(x+3)"],
    answerPlaceholder: "e.g. (x^2+a)(x+b)",
    translations: {
      en: {
        title: "Factor by Grouping",
        description: "Factor the polynomial: $x^3 + 3x^2 + x + 3$",
        hint: "Group the first two terms and the last two terms together.",
        solution: "$(x^2+1)(x+3)$",
        steps: [
          { step: "Group terms: $(x^3 + 3x^2) + (x + 3)$", explanation: "Split the polynomial into two pairs." },
          { step: "Factor out GCF from first group: $x^2(x + 3)$", explanation: "Take out the common $x^2$." },
          { step: "Factor out GCF from second group: $1(x + 3)$", explanation: "Take out a common 1." },
          { step: "Combine: $(x^2 + 1)(x + 3)$", explanation: "Factor out the common binomial $(x+3)$." }
        ]
      },
      es: {
        title: "Factorización por Agrupación",
        description: "Factoriza el polinomio: $x^3 + 3x^2 + x + 3$",
        hint: "Agrupa los dos primeros términos y los dos últimos términos.",
        solution: "$(x^2+1)(x+3)$",
        steps: [
          { step: "Agrupa términos: $(x^3 + 3x^2) + (x + 3)$", explanation: "Divide el polinomio en dos pares." },
          { step: "Extrae el factor común del primer grupo: $x^2(x + 3)$", explanation: "Saca el $x^2$ común." },
          { step: "Extrae el factor común del segundo grupo: $1(x + 3)$", explanation: "Saca un 1 común." },
          { step: "Combina: $(x^2 + 1)(x + 3)$", explanation: "Saca el binomio común $(x+3)$." }
        ]
      },
      fr: {
        title: "Factorisation par Groupement",
        description: "Factorisez le polynôme : $x^3 + 3x^2 + x + 3$",
        hint: "Regroupez les deux premiers termes et les deux derniers termes.",
        solution: "$(x^2+1)(x+3)$",
        steps: [
          { step: "Regroupez les termes : $(x^3 + 3x^2) + (x + 3)$", explanation: "Divisez le polynôme en deux paires." },
          { step: "Factorisez le premier groupe : $x^2(x + 3)$", explanation: "Mettez $x^2$ en évidence." },
          { step: "Factorisez le deuxième groupe : $1(x + 3)$", explanation: "Mettez 1 en évidence." },
          { step: "Combinez : $(x^2 + 1)(x + 3)$", explanation: "Mettez le binôme $(x+3)$ en évidence." }
        ]
      },
      de: {
        title: "Faktorisierung durch Gruppieren",
        description: "Faktorisiere das Polynom: $x^3 + 3x^2 + x + 3$",
        hint: "Gruppiere die ersten beiden und die letzten beiden Terme zusammen.",
        solution: "$(x^2+1)(x+3)$",
        steps: [
          { step: "Terme gruppieren: $(x^3 + 3x^2) + (x + 3)$", explanation: "Teile das Polynom in zwei Paare auf." },
          { step: "Klammere GGF aus erster Gruppe aus: $x^2(x + 3)$", explanation: "Klammere das gemeinsame $x^2$ aus." },
          { step: "Klammere GGF aus zweiter Gruppe aus: $1(x + 3)$", explanation: "Klammere eine gemeinsame 1 aus." },
          { step: "Zusammenfassen: $(x^2 + 1)(x + 3)$", explanation: "Klammere das gemeinsame Binom $(x+3)$ aus." }
        ]
      },
      pl: {
        title: "Grupowanie Wyrazów",
        description: "Rozłóż wielomian: $x^3 + 3x^2 + x + 3$",
        hint: "Grupuj dwa pierwsze i dwa ostatnie wyrazy razem.",
        solution: "$(x^2+1)(x+3)$",
        steps: [
          { step: "Pogrupuj wyrazy: $(x^3 + 3x^2) + (x + 3)$", explanation: "Podziel wielomian na dwie pary." },
          { step: "Wyciągnij czynnik z pierwszej grupy: $x^2(x + 3)$", explanation: "Wyciągnij wspólny $x^2$ przed nawias." },
          { step: "Wyciągnij czynnik z drugiej grupy: $1(x + 3)$", explanation: "Wyciągnij wspólną 1 przed nawias." },
          { step: "Połącz: $(x^2 + 1)(x + 3)$", explanation: "Wyciągnij wspólny dwumian $(x+3)$ przed nawias." }
        ]
      },
      ro: {
        title: "Factorizarea prin Grupare",
        description: "Factorizează polinomul: $x^3 + 3x^2 + x + 3$",
        hint: "Grupează primii doi termeni și ultimii doi termeni împreună.",
        solution: "$(x^2+1)(x+3)$",
        steps: [
          { step: "Grupează termenii: $(x^3 + 3x^2) + (x + 3)$", explanation: "Împarte polinomul în două perechi." },
          { step: "Scoate factorul comun din prima grupă: $x^2(x + 3)$", explanation: "Scoate $x^2$ comun." },
          { step: "Scoate factorul comun din a doua grupă: $1(x + 3)$", explanation: "Scoate un 1 comun." },
          { step: "Combină: $(x^2 + 1)(x + 3)$", explanation: "Scoate factorul comun binomul $(x+3)$." }
        ]
      }
    }
  },
  {
    id: 10,
    category: "polynomials",
    difficulty: "advanced",
    acceptedAnswers: ["3x^2+6x+3", "3(x^2+2x+1)"],
    answerPlaceholder: "e.g. ax^2+bx+c",
    translations: {
      en: {
        title: "Expand and Distribute",
        description: "Expand the expression: $3(x + 1)^2$",
        hint: "First expand $(x+1)^2$, then multiply everything by 3.",
        solution: "$3x^2 + 6x + 3$",
        steps: [
          { step: "Expand the square: $(x + 1)^2 = (x^2 + 2x + 1)$", explanation: "Use the perfect square formula $(a+b)^2 = a^2+2ab+b^2$." },
          { step: "Distribute the 3: $3(x^2 + 2x + 1)$", explanation: "Multiply each term inside the parenthesis by 3." },
          { step: "$3x^2 + 6x + 3$", explanation: "Final expanded form." }
        ]
      },
      es: {
        title: "Expandir y Distribuir",
        description: "Expande la expresión: $3(x + 1)^2$",
        hint: "Primero expande $(x+1)^2$, luego multiplica todo por 3.",
        solution: "$3x^2 + 6x + 3$",
        steps: [
          { step: "Expande el cuadrado: $(x + 1)^2 = (x^2 + 2x + 1)$", explanation: "Usa la fórmula del binomio al cuadrado $(a+b)^2 = a^2+2ab+b^2$." },
          { step: "Distribuye el 3: $3(x^2 + 2x + 1)$", explanation: "Multiplica cada término dentro del paréntesis por 3." },
          { step: "$3x^2 + 6x + 3$", explanation: "Forma expandida final." }
        ]
      },
      fr: {
        title: "Développer et Distribuer",
        description: "Développez l'expression : $3(x + 1)^2$",
        hint: "Développez d'abord $(x+1)^2$, puis multipliez tout par 3.",
        solution: "$3x^2 + 6x + 3$",
        steps: [
          { step: "Développez le carré : $(x + 1)^2 = (x^2 + 2x + 1)$", explanation: "Utilisez la formule de l'identité remarquable $(a+b)^2 = a^2+2ab+b^2$." },
          { step: "Distribuez le 3 : $3(x^2 + 2x + 1)$", explanation: "Multipliez chaque terme à l'intérieur de la parenthèse par 3." },
          { step: "$3x^2 + 6x + 3$", explanation: "Forme finale développée." }
        ]
      },
      de: {
        title: "Ausmultiplizieren und Verteilen",
        description: "Multipliziere den Ausdruck aus: $3(x + 1)^2$",
        hint: "Quadriere zuerst $(x+1)^2$, multipliziere dann alles mit 3.",
        solution: "$3x^2 + 6x + 3$",
        steps: [
          { step: "Quadrat ausrechnen: $(x + 1)^2 = (x^2 + 2x + 1)$", explanation: "Verwende die binomische Formel $(a+b)^2 = a^2+2ab+b^2$." },
          { step: "Die 3 verteilen: $3(x^2 + 2x + 1)$", explanation: "Multipliziere jeden Term in der Klammer mit 3." },
          { step: "$3x^2 + 6x + 3$", explanation: "Ausmultiplizierte Endform." }
        ]
      },
      pl: {
        title: "Rozwijanie i Mnożenie",
        description: "Rozwiń wyrażenie: $3(x + 1)^2$",
        hint: "Najpierw podnieś do kwadratu $(x+1)^2$, następnie pomnóż wszystko przez 3.",
        solution: "$3x^2 + 6x + 3$",
        steps: [
          { step: "Rozwiń kwadrat: $(x + 1)^2 = (x^2 + 2x + 1)$", explanation: "Użyj wzoru skróconego mnożenia $(a+b)^2 = a^2+2ab+b^2$." },
          { step: "Pomnóż przez 3: $3(x^2 + 2x + 1)$", explanation: "Pomnóż każdy wyraz w nawiasie przez 3." },
          { step: "$3x^2 + 6x + 3$", explanation: "Ostateczna rozwinięta postać." }
        ]
      },
      ro: {
        title: "Dezvoltare și Distribuire",
        description: "Dezvoltă expresia: $3(x + 1)^2$",
        hint: "Mai întâi dezvoltă $(x+1)^2$, apoi înmulțește totul cu 3.",
        solution: "$3x^2 + 6x + 3$",
        steps: [
          { step: "Dezvoltă pătratul: $(x + 1)^2 = (x^2 + 2x + 1)$", explanation: "Folosește formula pătratului perfect $(a+b)^2 = a^2+2ab+b^2$." },
          { step: "Distribuie 3: $3(x^2 + 2x + 1)$", explanation: "Înmulțește fiecare termen din paranteză cu 3." },
          { step: "$3x^2 + 6x + 3$", explanation: "Forma finală dezvoltată." }
        ]
      }
    }
  }
];