import type { Problem } from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// CALCULUS PROBLEMS (1–10)
// ─────────────────────────────────────────────────────────────────────────────

export const calculusProblems: Problem[] = [
  {
    id: 1,
    category: "calculus",
    difficulty: "beginner",
    acceptedAnswers: ["3x^2", "3x2"],
    answerPlaceholder: "e.g. ax^n",
    translations: {
      en: {
        title: "Derivative of a Power Function",
        description: "Find the derivative of $f(x) = x^3$.",
        hint: "Use the power rule: $\\frac{d}{dx}[x^n] = nx^{n-1}$.",
        solution: "$f'(x) = 3x^2$",
        steps: [
          { step: "Identify n = 3 in $f(x) = x^3$", explanation: "The exponent is 3." },
          { step: "Apply the power rule: $nx^{n-1} = 3x^{3-1}$", explanation: "Bring down the exponent and reduce it by 1." },
          { step: "$f'(x) = 3x^2$", explanation: "Simplified result." },
        ],
      },
      es: {
        title: "Derivada de una Función Potencia",
        description: "Encuentra la derivada de $f(x) = x^3$.",
        hint: "Usa la regla de la potencia: $\\frac{d}{dx}[x^n] = nx^{n-1}$.",
        solution: "$f'(x) = 3x^2$",
        steps: [
          { step: "Identifica n = 3 en $f(x) = x^3$", explanation: "El exponente es 3." },
          { step: "Aplica la regla de la potencia: $3x^{3-1}$", explanation: "Baja el exponente y redúcelo en 1." },
          { step: "$f'(x) = 3x^2$", explanation: "Resultado simplificado." },
        ],
      },
      fr: {
        title: "Dérivée d'une Fonction Puissance",
        description: "Trouvez la dérivée de $f(x) = x^3$.",
        hint: "Utilisez la règle de puissance : $\\frac{d}{dx}[x^n] = nx^{n-1}$.",
        solution: "$f'(x) = 3x^2$",
        steps: [
          { step: "Identifiez n = 3 dans $f(x) = x^3$", explanation: "L'exposant est 3." },
          { step: "Appliquez la règle de puissance : $3x^{3-1}$", explanation: "Descendez l'exposant et réduisez-le de 1." },
          { step: "$f'(x) = 3x^2$", explanation: "Résultat simplifié." },
        ],
      },
      de: {
        title: "Ableitung einer Potenzfunktion",
        description: "Finden Sie die Ableitung von $f(x) = x^3$.",
        hint: "Verwenden Sie die Potenzregel: $\\frac{d}{dx}[x^n] = nx^{n-1}$.",
        solution: "$f'(x) = 3x^2$",
        steps: [
          { step: "Identifiziere n = 3 in $f(x) = x^3$", explanation: "Der Exponent ist 3." },
          { step: "Wende die Potenzregel an: $3x^{3-1}$", explanation: "Bringe den Exponenten herunter und reduziere ihn um 1." },
          { step: "$f'(x) = 3x^2$", explanation: "Vereinfachtes Ergebnis." },
        ],
      },
      pl: {
        title: "Pochodna Funkcji Potęgowej",
        description: "Oblicz pochodną $f(x) = x^3$.",
        hint: "Zastosuj regułę potęgi: $\\frac{d}{dx}[x^n] = nx^{n-1}$.",
        solution: "$f'(x) = 3x^2$",
        steps: [
          { step: "Zidentyfikuj n = 3 w $f(x) = x^3$", explanation: "Wykładnik wynosi 3." },
          { step: "Zastosuj regułę potęgi: $3x^{3-1}$", explanation: "Opuść wykładnik i zmniejsz go o 1." },
          { step: "$f'(x) = 3x^2$", explanation: "Uproszczony wynik." },
        ],
      },
      ro: {
        title: "Derivata unei Funcții Putere",
        description: "Găsește derivata funcției $f(x) = x^3$.",
        hint: "Folosește regula puterii: $\\frac{d}{dx}[x^n] = nx^{n-1}$.",
        solution: "$f'(x) = 3x^2$",
        steps: [
          { step: "Identifică n = 3 în $f(x) = x^3$", explanation: "Exponentul este 3." },
          { step: "Aplică regula puterii: $3x^{3-1}$", explanation: "Coboară exponentul și reduce-l cu 1." },
          { step: "$f'(x) = 3x^2$", explanation: "Rezultat simplificat." },
        ],
      },
    },
  },
  {
    id: 2,
    category: "calculus",
    difficulty: "beginner",
    acceptedAnswers: ["x^2+5x+C", "x^2+5x+c"],
    answerPlaceholder: "e.g. ax^2+bx+C",
    translations: {
      en: {
        title: "Indefinite Integral of a Polynomial",
        description: "Find the indefinite integral: $\\int (2x + 5)\\,dx$",
        hint: "Integrate term by term using $\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C$.",
        solution: "$\\int (2x+5)\\,dx = x^2 + 5x + C$",
        steps: [
          { step: "Integrate $2x$: $\\frac{2x^2}{2} = x^2$", explanation: "Raise the power by 1 and divide by the new power." },
          { step: "Integrate $5$: $5x$", explanation: "$\\int 5\\,dx = 5x$." },
          { step: "Add the constant of integration $C$", explanation: "Every indefinite integral requires $+C$." },
          { step: "$\\int (2x+5)\\,dx = x^2 + 5x + C$", explanation: "Combine all terms." },
        ],
      },
      es: {
        title: "Integral Indefinida de un Polinomio",
        description: "Calcula la integral indefinida: $\\int (2x + 5)\\,dx$",
        hint: "Integra término a término usando $\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C$.",
        solution: "$\\int (2x+5)\\,dx = x^2 + 5x + C$",
        steps: [
          { step: "Integra $2x$: $x^2$", explanation: "Sube la potencia en 1 y divide por la nueva potencia." },
          { step: "Integra $5$: $5x$", explanation: "$\\int 5\\,dx = 5x$." },
          { step: "Agrega la constante $C$", explanation: "Toda integral indefinida requiere $+C$." },
          { step: "$x^2 + 5x + C$", explanation: "Combina todos los términos." },
        ],
      },
      fr: {
        title: "Intégrale Indéfinie d'un Polynôme",
        description: "Calculez l'intégrale indéfinie : $\\int (2x + 5)\\,dx$",
        hint: "Intégrez terme à terme en utilisant $\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C$.",
        solution: "$\\int (2x+5)\\,dx = x^2 + 5x + C$",
        steps: [
          { step: "Intégrez $2x$ : $x^2$", explanation: "Augmentez la puissance de 1 et divisez par la nouvelle puissance." },
          { step: "Intégrez $5$ : $5x$", explanation: "$\\int 5\\,dx = 5x$." },
          { step: "Ajoutez la constante $C$", explanation: "Toute intégrale indéfinie nécessite $+C$." },
          { step: "$x^2 + 5x + C$", explanation: "Combinez tous les termes." },
        ],
      },
      de: {
        title: "Unbestimmtes Integral eines Polynoms",
        description: "Berechnen Sie das unbestimmte Integral: $\\int (2x + 5)\\,dx$",
        hint: "Integrieren Sie term-by-term mit $\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C$.",
        solution: "$\\int (2x+5)\\,dx = x^2 + 5x + C$",
        steps: [
          { step: "Integriere $2x$: $x^2$", explanation: "Erhöhe die Potenz um 1 und dividiere durch die neue Potenz." },
          { step: "Integriere $5$: $5x$", explanation: "$\\int 5\\,dx = 5x$." },
          { step: "Füge die Integrationskonstante $C$ hinzu", explanation: "Jedes unbestimmte Integral benötigt $+C$." },
          { step: "$x^2 + 5x + C$", explanation: "Alle Terme zusammenfassen." },
        ],
      },
      pl: {
        title: "Całka Nieoznaczona Wielomianu",
        description: "Oblicz całkę nieoznaczoną: $\\int (2x + 5)\\,dx$",
        hint: "Całkuj wyraz po wyrazie używając $\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C$.",
        solution: "$\\int (2x+5)\\,dx = x^2 + 5x + C$",
        steps: [
          { step: "Scałkuj $2x$: $x^2$", explanation: "Zwiększ wykładnik o 1 i podziel przez nowy wykładnik." },
          { step: "Scałkuj $5$: $5x$", explanation: "$\\int 5\\,dx = 5x$." },
          { step: "Dodaj stałą całkowania $C$", explanation: "Każda całka nieoznaczona wymaga $+C$." },
          { step: "$x^2 + 5x + C$", explanation: "Połącz wszystkie wyrazy." },
        ],
      },
      ro: {
        title: "Integrala Nedefinită a unui Polinom",
        description: "Calculează integrala nedefinită: $\\int (2x + 5)\\,dx$",
        hint: "Integrează termen cu termen folosind $\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C$.",
        solution: "$\\int (2x+5)\\,dx = x^2 + 5x + C$",
        steps: [
          { step: "Integrează $2x$: $x^2$", explanation: "Mărește puterea cu 1 și împarte la noua putere." },
          { step: "Integrează $5$: $5x$", explanation: "$\\int 5\\,dx = 5x$." },
          { step: "Adaugă constanta de integrare $C$", explanation: "Orice integrală nedefinită necesită $+C$." },
          { step: "$x^2 + 5x + C$", explanation: "Combină toți termenii." },
        ],
      },
    },
  },
  {
    id: 3,
    category: "calculus",
    difficulty: "beginner",
    acceptedAnswers: ["cos(x)", "cosx"],
    answerPlaceholder: "e.g. cos(x)",
    translations: {
      en: {
        title: "Derivative of Sine",
        description: "Find the derivative of $f(x) = \\sin(x)$.",
        hint: "This is a standard trigonometric derivative.",
        solution: "$f'(x) = \\cos(x)$",
        steps: [
          { step: "Recall the rule for sine", explanation: "The rate of change of the sine function is given by the cosine function." },
          { step: "$\\frac{d}{dx}[\\sin(x)] = \\cos(x)$", explanation: "Apply the standard differentiation rule." }
        ]
      },
      es: {
        title: "Derivada del Seno",
        description: "Encuentra la derivada de $f(x) = \\sin(x)$.",
        hint: "Esta es una derivada trigonométrica estándar.",
        solution: "$f'(x) = \\cos(x)$",
        steps: [
          { step: "Recuerda la regla para el seno", explanation: "La tasa de cambio de la función seno está dada por la función coseno." },
          { step: "$\\frac{d}{dx}[\\sin(x)] = \\cos(x)$", explanation: "Aplica la regla de derivación estándar." }
        ]
      },
      fr: {
        title: "Dérivée du Sinus",
        description: "Trouvez la dérivée de $f(x) = \\sin(x)$.",
        hint: "C'est une dérivée trigonométrique usuelle.",
        solution: "$f'(x) = \\cos(x)$",
        steps: [
          { step: "Rappelez-vous la règle pour le sinus", explanation: "Le taux de variation de la fonction sinus est donné par la fonction cosinus." },
          { step: "$\\frac{d}{dx}[\\sin(x)] = \\cos(x)$", explanation: "Appliquez la règle de dérivation standard." }
        ]
      },
      de: {
        title: "Ableitung des Sinus",
        description: "Finde die Ableitung von $f(x) = \\sin(x)$.",
        hint: "Dies ist eine trigonometrische Standardableitung.",
        solution: "$f'(x) = \\cos(x)$",
        steps: [
          { step: "Erinnere dich an die Regel für den Sinus", explanation: "Die Änderungsrate der Sinusfunktion ist die Kosinusfunktion." },
          { step: "$\\frac{d}{dx}[\\sin(x)] = \\cos(x)$", explanation: "Wende die Standard-Ableitungsregel an." }
        ]
      },
      pl: {
        title: "Pochodna Sinusa",
        description: "Oblicz pochodną $f(x) = \\sin(x)$.",
        hint: "To jest podstawowa pochodna funkcji trygonometrycznej.",
        solution: "$f'(x) = \\cos(x)$",
        steps: [
          { step: "Przypomnij sobie regułę dla sinusa", explanation: "Szybkość zmian funkcji sinus opisuje funkcja cosinus." },
          { step: "$\\frac{d}{dx}[\\sin(x)] = \\cos(x)$", explanation: "Zastosuj standardowy wzór na pochodną." }
        ]
      },
      ro: {
        title: "Derivata Sinusului",
        description: "Găsește derivata funcției $f(x) = \\sin(x)$.",
        hint: "Aceasta este o derivată trigonometrică standard.",
        solution: "$f'(x) = \\cos(x)$",
        steps: [
          { step: "Amintește-ți regula pentru sinus", explanation: "Rata de schimbare a funcției sinus este dată de funcția cosinus." },
          { step: "$\\frac{d}{dx}[\\sin(x)] = \\cos(x)$", explanation: "Aplică regula standard de derivare." }
        ]
      }
    }
  },
  {
    id: 4,
    category: "calculus",
    difficulty: "intermediate",
    acceptedAnswers: ["8"],
    answerPlaceholder: "Enter a number...",
    translations: {
      en: {
        title: "Definite Integral",
        description: "Evaluate the definite integral: $\\int_{0}^{2} 3x^2 \\,dx$",
        hint: "Find the antiderivative first, then evaluate it from 0 to 2.",
        solution: "$[x^3]_{0}^{2} = 8 - 0 = 8$",
        steps: [
          { step: "Find antiderivative of $3x^2$", explanation: "Using the power rule: $3(x^3 / 3) = x^3$." },
          { step: "Apply limits: $[x^3]_{0}^{2}$", explanation: "Plug in the upper limit (2) and subtract the lower limit (0)." },
          { step: "$(2)^3 - (0)^3 = 8 - 0 = 8$", explanation: "Calculate the final value." }
        ]
      },
      es: {
        title: "Integral Definida",
        description: "Evalúa la integral definida: $\\int_{0}^{2} 3x^2 \\,dx$",
        hint: "Encuentra la antiderivada primero, luego evalúala de 0 a 2.",
        solution: "$[x^3]_{0}^{2} = 8 - 0 = 8$",
        steps: [
          { step: "Encuentra la antiderivada de $3x^2$", explanation: "Usando la regla de la potencia: $3(x^3 / 3) = x^3$." },
          { step: "Aplica los límites: $[x^3]_{0}^{2}$", explanation: "Sustituye el límite superior (2) y resta el límite inferior (0)." },
          { step: "$(2)^3 - (0)^3 = 8 - 0 = 8$", explanation: "Calcula el valor final." }
        ]
      },
      fr: {
        title: "Intégrale Définie",
        description: "Évaluez l'intégrale définie : $\\int_{0}^{2} 3x^2 \\,dx$",
        hint: "Trouvez d'abord la primitive, puis évaluez-la de 0 à 2.",
        solution: "$[x^3]_{0}^{2} = 8 - 0 = 8$",
        steps: [
          { step: "Trouvez la primitive de $3x^2$", explanation: "En utilisant la règle des puissances : $3(x^3 / 3) = x^3$." },
          { step: "Appliquez les bornes : $[x^3]_{0}^{2}$", explanation: "Remplacez la borne supérieure (2) et soustrayez la borne inférieure (0)." },
          { step: "$(2)^3 - (0)^3 = 8 - 0 = 8$", explanation: "Calculez la valeur finale." }
        ]
      },
      de: {
        title: "Bestimmtes Integral",
        description: "Berechne das bestimmte Integral: $\\int_{0}^{2} 3x^2 \\,dx$",
        hint: "Finde zuerst die Stammfunktion und werte sie dann von 0 bis 2 aus.",
        solution: "$[x^3]_{0}^{2} = 8 - 0 = 8$",
        steps: [
          { step: "Stammfunktion von $3x^2$ finden", explanation: "Mit der Potenzregel: $3(x^3 / 3) = x^3$." },
          { step: "Grenzen einsetzen: $[x^3]_{0}^{2}$", explanation: "Setze die obere Grenze (2) ein und subtrahiere die untere Grenze (0)." },
          { step: "$(2)^3 - (0)^3 = 8 - 0 = 8$", explanation: "Berechne den Endwert." }
        ]
      },
      pl: {
        title: "Całka Oznaczona",
        description: "Oblicz całkę oznaczoną: $\\int_{0}^{2} 3x^2 \\,dx$",
        hint: "Najpierw znajdź funkcję pierwotną, a następnie oblicz ją w granicach od 0 do 2.",
        solution: "$[x^3]_{0}^{2} = 8 - 0 = 8$",
        steps: [
          { step: "Znajdź funkcję pierwotną z $3x^2$", explanation: "Używając reguły potęgi: $3(x^3 / 3) = x^3$." },
          { step: "Zastosuj granice: $[x^3]_{0}^{2}$", explanation: "Podstaw górną granicę (2) i odejmij dolną granicę (0)." },
          { step: "$(2)^3 - (0)^3 = 8 - 0 = 8$", explanation: "Oblicz ostateczną wartość." }
        ]
      },
      ro: {
        title: "Integrala Definită",
        description: "Evaluează integrala definită: $\\int_{0}^{2} 3x^2 \\,dx$",
        hint: "Găsește mai întâi primitiva, apoi evalueaz-o de la 0 la 2.",
        solution: "$[x^3]_{0}^{2} = 8 - 0 = 8$",
        steps: [
          { step: "Găsește primitiva lui $3x^2$", explanation: "Folosind regula puterii: $3(x^3 / 3) = x^3$." },
          { step: "Aplică limitele: $[x^3]_{0}^{2}$", explanation: "Introdu limita superioară (2) și scade limita inferioară (0)." },
          { step: "$(2)^3 - (0)^3 = 8 - 0 = 8$", explanation: "Calculează valoarea finală." }
        ]
      }
    }
  },
  {
    id: 5,
    category: "calculus",
    difficulty: "intermediate",
    acceptedAnswers: ["4(2x+1)", "8x+4"],
    answerPlaceholder: "e.g. a(bx+c)",
    translations: {
      en: {
        title: "Chain Rule",
        description: "Find the derivative of $f(x) = (2x + 1)^2$.",
        hint: "Use the chain rule: $f'(g(x)) \\cdot g'(x)$.",
        solution: "$f'(x) = 2(2x + 1)(2) = 4(2x + 1)$",
        steps: [
          { step: "Identify inner and outer functions", explanation: "Outer function is $u^2$, inner is $u = 2x+1$." },
          { step: "Differentiate the outer function", explanation: "Derivative of $u^2$ is $2u$." },
          { step: "Differentiate the inner function", explanation: "Derivative of $2x+1$ is $2$." },
          { step: "Multiply them together: $2(2x+1) \\cdot 2 = 8x + 4$", explanation: "Combine using the chain rule." }
        ]
      },
      es: {
        title: "Regla de la Cadena",
        description: "Encuentra la derivada de $f(x) = (2x + 1)^2$.",
        hint: "Usa la regla de la cadena: $f'(g(x)) \\cdot g'(x)$.",
        solution: "$f'(x) = 2(2x + 1)(2) = 4(2x + 1)$",
        steps: [
          { step: "Identifica las funciones interna y externa", explanation: "La función externa es $u^2$, la interna es $u = 2x+1$." },
          { step: "Deriva la función externa", explanation: "La derivada de $u^2$ es $2u$." },
          { step: "Deriva la función interna", explanation: "La derivada de $2x+1$ es $2$." },
          { step: "Multiplícalas: $2(2x+1) \\cdot 2 = 8x + 4$", explanation: "Combínalas usando la regla de la cadena." }
        ]
      },
      fr: {
        title: "Règle de Dérivation en Chaîne",
        description: "Trouvez la dérivée de $f(x) = (2x + 1)^2$.",
        hint: "Utilisez la règle de dérivation en chaîne : $f'(g(x)) \\cdot g'(x)$.",
        solution: "$f'(x) = 2(2x + 1)(2) = 4(2x + 1)$",
        steps: [
          { step: "Identifiez les fonctions interne et externe", explanation: "La fonction externe est $u^2$, l'interne est $u = 2x+1$." },
          { step: "Dérivez la fonction externe", explanation: "La dérivée de $u^2$ est $2u$." },
          { step: "Dérivez la fonction interne", explanation: "La dérivée de $2x+1$ est $2$." },
          { step: "Multipliez-les : $2(2x+1) \\cdot 2 = 8x + 4$", explanation: "Combinez-les en utilisant la règle en chaîne." }
        ]
      },
      de: {
        title: "Kettenregel",
        description: "Finde die Ableitung von $f(x) = (2x + 1)^2$.",
        hint: "Verwende die Kettenregel: $f'(g(x)) \\cdot g'(x)$.",
        solution: "$f'(x) = 2(2x + 1)(2) = 4(2x + 1)$",
        steps: [
          { step: "Identifiziere innere und äußere Funktion", explanation: "Äußere Funktion ist $u^2$, innere ist $u = 2x+1$." },
          { step: "Leite die äußere Funktion ab", explanation: "Ableitung von $u^2$ ist $2u$." },
          { step: "Leite die innere Funktion ab", explanation: "Ableitung von $2x+1$ ist $2$." },
          { step: "Multipliziere sie: $2(2x+1) \\cdot 2 = 8x + 4$", explanation: "Kombiniere sie mit der Kettenregel." }
        ]
      },
      pl: {
        title: "Reguła Łańcuchowa",
        description: "Oblicz pochodną $f(x) = (2x + 1)^2$.",
        hint: "Użyj reguły łańcuchowej: $f'(g(x)) \\cdot g'(x)$.",
        solution: "$f'(x) = 2(2x + 1)(2) = 4(2x + 1)$",
        steps: [
          { step: "Zidentyfikuj funkcję wewnętrzną i zewnętrzną", explanation: "Funkcja zewnętrzna to $u^2$, wewnętrzna to $u = 2x+1$." },
          { step: "Oblicz pochodną funkcji zewnętrznej", explanation: "Pochodna $u^2$ to $2u$." },
          { step: "Oblicz pochodną funkcji wewnętrznej", explanation: "Pochodna $2x+1$ to $2$." },
          { step: "Pomnóż je: $2(2x+1) \\cdot 2 = 8x + 4$", explanation: "Połącz używając reguły łańcuchowej." }
        ]
      },
      ro: {
        title: "Regula Lanțului",
        description: "Găsește derivata funcției $f(x) = (2x + 1)^2$.",
        hint: "Folosește regula lanțului: $f'(g(x)) \\cdot g'(x)$.",
        solution: "$f'(x) = 2(2x + 1)(2) = 4(2x + 1)$",
        steps: [
          { step: "Identifică funcția interioară și exterioară", explanation: "Funcția exterioară este $u^2$, interioara este $u = 2x+1$." },
          { step: "Derivează funcția exterioară", explanation: "Derivata lui $u^2$ este $2u$." },
          { step: "Derivează funcția interioară", explanation: "Derivata lui $2x+1$ este $2$." },
          { step: "Înmulțește-le: $2(2x+1) \\cdot 2 = 8x + 4$", explanation: "Combină folosind regula lanțului." }
        ]
      }
    }
  },
  {
    id: 6,
    category: "calculus",
    difficulty: "beginner",
    acceptedAnswers: ["1"],
    answerPlaceholder: "Enter the limit value...",
    translations: {
      en: {
        title: "Fundamental Trigonometric Limit",
        description: "Evaluate the limit: $\\lim_{x \\to 0} \\frac{\\sin(x)}{x}$",
        hint: "This is a special limit you should memorize.",
        solution: "$\\lim_{x \\to 0} \\frac{\\sin(x)}{x} = 1$",
        steps: [
          { step: "Recognize the form", explanation: "Plugging in 0 gives 0/0, an indeterminate form." },
          { step: "Use L'Hopital's Rule (or memorization)", explanation: "Derive top and bottom: $\\cos(x)/1$." },
          { step: "Evaluate at $x=0$: $\\cos(0)/1 = 1$", explanation: "The limit evaluates to 1." }
        ]
      },
      es: {
        title: "Límite Trigonométrico Fundamental",
        description: "Evalúa el límite: $\\lim_{x \\to 0} \\frac{\\sin(x)}{x}$",
        hint: "Este es un límite especial que debes memorizar.",
        solution: "$\\lim_{x \\to 0} \\frac{\\sin(x)}{x} = 1$",
        steps: [
          { step: "Reconoce la forma", explanation: "Sustituir 0 da 0/0, una forma indeterminada." },
          { step: "Usa la regla de L'Hôpital (o memorización)", explanation: "Deriva arriba y abajo: $\\cos(x)/1$." },
          { step: "Evalúa en $x=0$: $\\cos(0)/1 = 1$", explanation: "El límite es igual a 1." }
        ]
      },
      fr: {
        title: "Limite Trigonométrique Fondamentale",
        description: "Évaluez la limite : $\\lim_{x \\to 0} \\frac{\\sin(x)}{x}$",
        hint: "C'est une limite spéciale que vous devriez mémoriser.",
        solution: "$\\lim_{x \\to 0} \\frac{\\sin(x)}{x} = 1$",
        steps: [
          { step: "Reconnaissez la forme", explanation: "Remplacer par 0 donne 0/0, une forme indéterminée." },
          { step: "Utilisez la Règle de L'Hôpital (ou la mémorisation)", explanation: "Dérivez le haut et le bas : $\\cos(x)/1$." },
          { step: "Évaluez en $x=0$ : $\\cos(0)/1 = 1$", explanation: "La limite est 1." }
        ]
      },
      de: {
        title: "Grundlegender trigonometrischer Grenzwert",
        description: "Werte den Grenzwert aus: $\\lim_{x \\to 0} \\frac{\\sin(x)}{x}$",
        hint: "Dies ist ein spezieller Grenzwert, den man sich merken sollte.",
        solution: "$\\lim_{x \\to 0} \\frac{\\sin(x)}{x} = 1$",
        steps: [
          { step: "Erkenne die Form", explanation: "Einsetzen von 0 ergibt 0/0, einen unbestimmten Ausdruck." },
          { step: "Verwende die Regel von L'Hospital (oder auswendig lernen)", explanation: "Leite Zähler und Nenner ab: $\\cos(x)/1$." },
          { step: "Auswerten bei $x=0$: $\\cos(0)/1 = 1$", explanation: "Der Grenzwert ergibt 1." }
        ]
      },
      pl: {
        title: "Podstawowa Granica Trygonometryczna",
        description: "Oblicz granicę: $\\lim_{x \\to 0} \\frac{\\sin(x)}{x}$",
        hint: "Jest to specjalna granica, którą warto zapamiętać.",
        solution: "$\\lim_{x \\to 0} \\frac{\\sin(x)}{x} = 1$",
        steps: [
          { step: "Rozpoznaj postać", explanation: "Podstawienie 0 daje 0/0, symbol nieoznaczony." },
          { step: "Użyj reguły de l'Hospitala (lub zapamiętaj)", explanation: "Oblicz pochodną licznika i mianownika: $\\cos(x)/1$." },
          { step: "Oblicz dla $x=0$: $\\cos(0)/1 = 1$", explanation: "Wartość granicy to 1." }
        ]
      },
      ro: {
        title: "Limită Trigonometrică Fundamentală",
        description: "Evaluează limita: $\\lim_{x \\to 0} \\frac{\\sin(x)}{x}$",
        hint: "Aceasta este o limită specială pe care ar trebui să o memorezi.",
        solution: "$\\lim_{x \\to 0} \\frac{\\sin(x)}{x} = 1$",
        steps: [
          { step: "Recunoaște forma", explanation: "Înlocuirea cu 0 dă 0/0, o formă nedeterminată." },
          { step: "Folosește Regula lui L'Hospital (sau din memorie)", explanation: "Derivează numărătorul și numitorul: $\\cos(x)/1$." },
          { step: "Evaluează la $x=0$: $\\cos(0)/1 = 1$", explanation: "Limita este evaluată la 1." }
        ]
      }
    }
  },
  {
    id: 7,
    category: "calculus",
    difficulty: "beginner",
    acceptedAnswers: ["12x^2", "12x2"],
    answerPlaceholder: "e.g. ax^n",
    translations: {
      en: {
        title: "Second Derivative",
        description: "Find the second derivative of $f(x) = x^4$.",
        hint: "Find the first derivative, then derive that result again.",
        solution: "$f''(x) = 12x^2$",
        steps: [
          { step: "Find $f'(x)$", explanation: "Using the power rule, $f'(x) = 4x^3$." },
          { step: "Derive $f'(x)$ to find $f''(x)$", explanation: "Apply the power rule again to $4x^3$." },
          { step: "$f''(x) = 4 \\cdot 3x^2 = 12x^2$", explanation: "Simplify the final expression." }
        ]
      },
      es: {
        title: "Segunda Derivada",
        description: "Encuentra la segunda derivada de $f(x) = x^4$.",
        hint: "Encuentra la primera derivada, luego deriva ese resultado nuevamente.",
        solution: "$f''(x) = 12x^2$",
        steps: [
          { step: "Encuentra $f'(x)$", explanation: "Usando la regla de la potencia, $f'(x) = 4x^3$." },
          { step: "Deriva $f'(x)$ para encontrar $f''(x)$", explanation: "Aplica la regla de la potencia de nuevo a $4x^3$." },
          { step: "$f''(x) = 4 \\cdot 3x^2 = 12x^2$", explanation: "Simplifica la expresión final." }
        ]
      },
      fr: {
        title: "Dérivée Seconde",
        description: "Trouvez la dérivée seconde de $f(x) = x^4$.",
        hint: "Trouvez la première dérivée, puis dérivez à nouveau ce résultat.",
        solution: "$f''(x) = 12x^2$",
        steps: [
          { step: "Trouvez $f'(x)$", explanation: "En utilisant la règle des puissances, $f'(x) = 4x^3$." },
          { step: "Dérivez $f'(x)$ pour trouver $f''(x)$", explanation: "Appliquez à nouveau la règle des puissances à $4x^3$." },
          { step: "$f''(x) = 4 \\cdot 3x^2 = 12x^2$", explanation: "Simplifiez l'expression finale." }
        ]
      },
      de: {
        title: "Zweite Ableitung",
        description: "Finde die zweite Ableitung von $f(x) = x^4$.",
        hint: "Finde die erste Ableitung und leite dieses Ergebnis dann erneut ab.",
        solution: "$f''(x) = 12x^2$",
        steps: [
          { step: "Finde $f'(x)$", explanation: "Mit der Potenzregel ist $f'(x) = 4x^3$." },
          { step: "Leite $f'(x)$ ab, um $f''(x)$ zu finden", explanation: "Wende die Potenzregel erneut auf $4x^3$ an." },
          { step: "$f''(x) = 4 \\cdot 3x^2 = 12x^2$", explanation: "Vereinfache den endgültigen Ausdruck." }
        ]
      },
      pl: {
        title: "Druga Pochodna",
        description: "Znajdź drugą pochodną $f(x) = x^4$.",
        hint: "Oblicz pierwszą pochodną, a następnie policz pochodną z otrzymanego wyniku.",
        solution: "$f''(x) = 12x^2$",
        steps: [
          { step: "Znajdź $f'(x)$", explanation: "Używając reguły potęgi, $f'(x) = 4x^3$." },
          { step: "Oblicz pochodną $f'(x)$ aby znaleźć $f''(x)$", explanation: "Zastosuj regułę potęgi ponownie dla $4x^3$." },
          { step: "$f''(x) = 4 \\cdot 3x^2 = 12x^2$", explanation: "Uprość wyrażenie końcowe." }
        ]
      },
      ro: {
        title: "Derivata a Doua",
        description: "Găsește derivata a doua a funcției $f(x) = x^4$.",
        hint: "Găsește prima derivată, apoi derivează acel rezultat din nou.",
        solution: "$f''(x) = 12x^2$",
        steps: [
          { step: "Găsește $f'(x)$", explanation: "Folosind regula puterii, $f'(x) = 4x^3$." },
          { step: "Derivează $f'(x)$ pentru a găsi $f''(x)$", explanation: "Aplică regula puterii din nou pentru $4x^3$." },
          { step: "$f''(x) = 4 \\cdot 3x^2 = 12x^2$", explanation: "Simplifică expresia finală." }
        ]
      }
    }
  },
  {
    id: 8,
    category: "calculus",
    difficulty: "beginner",
    acceptedAnswers: ["15e^(3x)", "15e^3x"],
    answerPlaceholder: "e.g. ae^(bx)",
    translations: {
      en: {
        title: "Derivative of an Exponential Function",
        description: "Find the derivative of $f(x) = 5e^{3x}$.",
        hint: "The derivative of $e^{kx}$ is $k e^{kx}$. Don't forget the constant multiplier.",
        solution: "$f'(x) = 15e^{3x}$",
        steps: [
          { step: "Keep the constant 5", explanation: "Constants pull out of the derivative." },
          { step: "Derive $e^{3x}$", explanation: "Using the chain rule, it becomes $3e^{3x}$." },
          { step: "Multiply: $5 \\cdot 3e^{3x} = 15e^{3x}$", explanation: "Combine the constants." }
        ]
      },
      es: {
        title: "Derivada de una Función Exponencial",
        description: "Encuentra la derivada de $f(x) = 5e^{3x}$.",
        hint: "La derivada de $e^{kx}$ es $k e^{kx}$. No olvides el multiplicador constante.",
        solution: "$f'(x) = 15e^{3x}$",
        steps: [
          { step: "Mantén la constante 5", explanation: "Las constantes salen de la derivada." },
          { step: "Deriva $e^{3x}$", explanation: "Usando la regla de la cadena, se convierte en $3e^{3x}$." },
          { step: "Multiplica: $5 \\cdot 3e^{3x} = 15e^{3x}$", explanation: "Combina las constantes." }
        ]
      },
      fr: {
        title: "Dérivée d'une Fonction Exponentielle",
        description: "Trouvez la dérivée de $f(x) = 5e^{3x}$.",
        hint: "La dérivée de $e^{kx}$ est $k e^{kx}$. N'oubliez pas le multiplicateur constant.",
        solution: "$f'(x) = 15e^{3x}$",
        steps: [
          { step: "Gardez la constante 5", explanation: "Les constantes sortent de la dérivée." },
          { step: "Dérivez $e^{3x}$", explanation: "En utilisant la règle en chaîne, cela devient $3e^{3x}$." },
          { step: "Multipliez : $5 \\cdot 3e^{3x} = 15e^{3x}$", explanation: "Combinez les constantes." }
        ]
      },
      de: {
        title: "Ableitung einer Exponentialfunktion",
        description: "Finde die Ableitung von $f(x) = 5e^{3x}$.",
        hint: "Die Ableitung von $e^{kx}$ ist $k e^{kx}$. Vergiss den konstanten Multiplikator nicht.",
        solution: "$f'(x) = 15e^{3x}$",
        steps: [
          { step: "Behalte die Konstante 5 bei", explanation: "Konstanten werden vor die Ableitung gezogen." },
          { step: "Leite $e^{3x}$ ab", explanation: "Mit der Kettenregel wird es zu $3e^{3x}$." },
          { step: "Multipliziere: $5 \\cdot 3e^{3x} = 15e^{3x}$", explanation: "Fasse die Konstanten zusammen." }
        ]
      },
      pl: {
        title: "Pochodna Funkcji Wykładniczej",
        description: "Oblicz pochodną $f(x) = 5e^{3x}$.",
        hint: "Pochodna z $e^{kx}$ to $k e^{kx}$. Nie zapomnij o stałej przed funkcją.",
        solution: "$f'(x) = 15e^{3x}$",
        steps: [
          { step: "Zachowaj stałą 5", explanation: "Stałe wyłączamy przed pochodną." },
          { step: "Oblicz pochodną $e^{3x}$", explanation: "Używając reguły łańcuchowej, otrzymujemy $3e^{3x}$." },
          { step: "Pomnóż: $5 \\cdot 3e^{3x} = 15e^{3x}$", explanation: "Połącz stałe liczbowe." }
        ]
      },
      ro: {
        title: "Derivata unei Funcții Exponențiale",
        description: "Găsește derivata funcției $f(x) = 5e^{3x}$.",
        hint: "Derivata lui $e^{kx}$ este $k e^{kx}$. Nu uita constanta de înmulțire.",
        solution: "$f'(x) = 15e^{3x}$",
        steps: [
          { step: "Păstrează constanta 5", explanation: "Constantele ies în afara derivatei." },
          { step: "Derivează $e^{3x}$", explanation: "Folosind regula lanțului, devine $3e^{3x}$." },
          { step: "Înmulțește: $5 \\cdot 3e^{3x} = 15e^{3x}$", explanation: "Combină constantele." }
        ]
      }
    }
  },
  {
    id: 9,
    category: "calculus",
    difficulty: "advanced",
    acceptedAnswers: ["e^(x^2)+C", "e^(x^2)+c"],
    answerPlaceholder: "e.g. e^(x^2)+C",
    translations: {
      en: {
        title: "Integration by Substitution",
        description: "Evaluate the integral: $\\int 2x e^{x^2} \\,dx$",
        hint: "Let $u = x^2$, which makes $du = 2x \\,dx$.",
        solution: "$\\int 2x e^{x^2} \\,dx = e^{x^2} + C$",
        steps: [
          { step: "Choose u-substitution", explanation: "Let $u = x^2$." },
          { step: "Find $du$", explanation: "Differentiate $u$ to get $du = 2x \\,dx$." },
          { step: "Substitute into integral: $\\int e^u \\,du$", explanation: "Replace $x^2$ with $u$ and $2x\\,dx$ with $du$." },
          { step: "Integrate: $e^u + C$", explanation: "The integral of $e^u$ is $e^u$." },
          { step: "Substitute back: $e^{x^2} + C$", explanation: "Replace $u$ with $x^2$." }
        ]
      },
      es: {
        title: "Integración por Sustitución",
        description: "Evalúa la integral: $\\int 2x e^{x^2} \\,dx$",
        hint: "Sea $u = x^2$, lo que hace que $du = 2x \\,dx$.",
        solution: "$\\int 2x e^{x^2} \\,dx = e^{x^2} + C$",
        steps: [
          { step: "Elige la sustitución u", explanation: "Sea $u = x^2$." },
          { step: "Encuentra $du$", explanation: "Deriva $u$ para obtener $du = 2x \\,dx$." },
          { step: "Sustituye en la integral: $\\int e^u \\,du$", explanation: "Reemplaza $x^2$ con $u$ y $2x\\,dx$ con $du$." },
          { step: "Integra: $e^u + C$", explanation: "La integral de $e^u$ es $e^u$." },
          { step: "Sustituye de vuelta: $e^{x^2} + C$", explanation: "Reemplaza $u$ con $x^2$." }
        ]
      },
      fr: {
        title: "Intégration par Substitution",
        description: "Évaluez l'intégrale : $\\int 2x e^{x^2} \\,dx$",
        hint: "Soit $u = x^2$, ce qui donne $du = 2x \\,dx$.",
        solution: "$\\int 2x e^{x^2} \\,dx = e^{x^2} + C$",
        steps: [
          { step: "Choisissez la substitution en u", explanation: "Soit $u = x^2$." },
          { step: "Trouvez $du$", explanation: "Dérivez $u$ pour obtenir $du = 2x \\,dx$." },
          { step: "Substituez dans l'intégrale : $\\int e^u \\,du$", explanation: "Remplacez $x^2$ par $u$ et $2x\\,dx$ par $du$." },
          { step: "Intégrez : $e^u + C$", explanation: "L'intégrale de $e^u$ est $e^u$." },
          { step: "Substituez en retour : $e^{x^2} + C$", explanation: "Remplacez $u$ par $x^2$." }
        ]
      },
      de: {
        title: "Integration durch Substitution",
        description: "Berechne das Integral: $\\int 2x e^{x^2} \\,dx$",
        hint: "Setze $u = x^2$, was zu $du = 2x \\,dx$ führt.",
        solution: "$\\int 2x e^{x^2} \\,dx = e^{x^2} + C$",
        steps: [
          { step: "Wähle die u-Substitution", explanation: "Setze $u = x^2$." },
          { step: "Finde $du$", explanation: "Leite $u$ ab, um $du = 2x \\,dx$ zu erhalten." },
          { step: "Substituiere im Integral: $\\int e^u \\,du$", explanation: "Ersetze $x^2$ durch $u$ und $2x\\,dx$ durch $du$." },
          { step: "Integriere: $e^u + C$", explanation: "Das Integral von $e^u$ ist $e^u$." },
          { step: "Rücksubstitution: $e^{x^2} + C$", explanation: "Ersetze $u$ durch $x^2$." }
        ]
      },
      pl: {
        title: "Całkowanie przez Podstawienie",
        description: "Oblicz całkę: $\\int 2x e^{x^2} \\,dx$",
        hint: "Niech $u = x^2$, z czego wynika $du = 2x \\,dx$.",
        solution: "$\\int 2x e^{x^2} \\,dx = e^{x^2} + C$",
        steps: [
          { step: "Wybierz podstawienie u", explanation: "Niech $u = x^2$." },
          { step: "Znajdź $du$", explanation: "Zróżniczkuj $u$, aby uzyskać $du = 2x \\,dx$." },
          { step: "Podstaw do całki: $\\int e^u \\,du$", explanation: "Zastąp $x^2$ przez $u$ oraz $2x\\,dx$ przez $du$." },
          { step: "Scałkuj: $e^u + C$", explanation: "Całka z $e^u$ to $e^u$." },
          { step: "Wróć do zmiennej x: $e^{x^2} + C$", explanation: "Zastąp $u$ z powrotem przez $x^2$." }
        ]
      },
      ro: {
        title: "Integrarea prin Substituție",
        description: "Evaluează integrala: $\\int 2x e^{x^2} \\,dx$",
        hint: "Notează $u = x^2$, ceea ce face ca $du = 2x \\,dx$.",
        solution: "$\\int 2x e^{x^2} \\,dx = e^{x^2} + C$",
        steps: [
          { step: "Alege substituția u", explanation: "Fie $u = x^2$." },
          { step: "Găsește $du$", explanation: "Derivează $u$ pentru a obține $du = 2x \\,dx$." },
          { step: "Substituie în integrală: $\\int e^u \\,du$", explanation: "Înlocuiește $x^2$ cu $u$ și $2x\\,dx$ cu $du$." },
          { step: "Integrează: $e^u + C$", explanation: "Integrala lui $e^u$ este $e^u$." },
          { step: "Substituie înapoi: $e^{x^2} + C$", explanation: "Înlocuiește $u$ înapoi cu $x^2$." }
        ]
      }
    }
  },
  {
    id: 10,
    category: "calculus",
    difficulty: "intermediate",
    acceptedAnswers: ["e^x(x+1)", "e^x(1+x)", "xe^x+e^x"],
    answerPlaceholder: "e.g. e^x(x+1)",
    translations: {
      en: {
        title: "Product Rule",
        description: "Find the derivative of $f(x) = x e^x$.",
        hint: "Use the product rule: $(uv)' = u'v + uv'$.",
        solution: "$f'(x) = e^x(x + 1)$",
        steps: [
          { step: "Identify u and v", explanation: "Let $u = x$ and $v = e^x$." },
          { step: "Find derivatives", explanation: "$u' = 1$ and $v' = e^x$." },
          { step: "Apply formula: $(1)(e^x) + (x)(e^x)$", explanation: "Substitute into $u'v + uv'$." },
          { step: "Factor out $e^x$: $e^x(1 + x)$", explanation: "Simplify the final answer." }
        ]
      },
      es: {
        title: "Regla del Producto",
        description: "Encuentra la derivada de $f(x) = x e^x$.",
        hint: "Usa la regla del producto: $(uv)' = u'v + uv'$.",
        solution: "$f'(x) = e^x(x + 1)$",
        steps: [
          { step: "Identifica u y v", explanation: "Sea $u = x$ y $v = e^x$." },
          { step: "Encuentra derivadas", explanation: "$u' = 1$ y $v' = e^x$." },
          { step: "Aplica fórmula: $(1)(e^x) + (x)(e^x)$", explanation: "Sustituye en $u'v + uv'$." },
          { step: "Factoriza $e^x$: $e^x(1 + x)$", explanation: "Simplifica la respuesta final." }
        ]
      },
      fr: {
        title: "Règle du Produit",
        description: "Trouvez la dérivée de $f(x) = x e^x$.",
        hint: "Utilisez la règle du produit : $(uv)' = u'v + uv'$.",
        solution: "$f'(x) = e^x(x + 1)$",
        steps: [
          { step: "Identifiez u et v", explanation: "Soit $u = x$ et $v = e^x$." },
          { step: "Trouvez les dérivées", explanation: "$u' = 1$ et $v' = e^x$." },
          { step: "Appliquez la formule : $(1)(e^x) + (x)(e^x)$", explanation: "Substituez dans $u'v + uv'$." },
          { step: "Mettez $e^x$ en évidence : $e^x(1 + x)$", explanation: "Simplifiez la réponse finale." }
        ]
      },
      de: {
        title: "Produktregel",
        description: "Finde die Ableitung von $f(x) = x e^x$.",
        hint: "Verwende die Produktregel: $(uv)' = u'v + uv'$.",
        solution: "$f'(x) = e^x(x + 1)$",
        steps: [
          { step: "Identifiziere u und v", explanation: "Setze $u = x$ und $v = e^x$." },
          { step: "Finde Ableitungen", explanation: "$u' = 1$ und $v' = e^x$." },
          { step: "Wende Formel an: $(1)(e^x) + (x)(e^x)$", explanation: "Setze in $u'v + uv'$ ein." },
          { step: "Klammere $e^x$ aus: $e^x(1 + x)$", explanation: "Vereinfache die endgültige Antwort." }
        ]
      },
      pl: {
        title: "Wzór na Pochodną Iloczynu",
        description: "Oblicz pochodną $f(x) = x e^x$.",
        hint: "Użyj wzoru na pochodną iloczynu: $(uv)' = u'v + uv'$.",
        solution: "$f'(x) = e^x(x + 1)$",
        steps: [
          { step: "Zidentyfikuj u oraz v", explanation: "Niech $u = x$ oraz $v = e^x$." },
          { step: "Znajdź pochodne", explanation: "$u' = 1$ oraz $v' = e^x$." },
          { step: "Zastosuj wzór: $(1)(e^x) + (x)(e^x)$", explanation: "Podstaw do $u'v + uv'$." },
          { step: "Wyciągnij $e^x$ przed nawias: $e^x(1 + x)$", explanation: "Uprość ostateczną odpowiedź." }
        ]
      },
      ro: {
        title: "Regula Produsului",
        description: "Găsește derivata funcției $f(x) = x e^x$.",
        hint: "Folosește regula produsului: $(uv)' = u'v + uv'$.",
        solution: "$f'(x) = e^x(x + 1)$",
        steps: [
          { step: "Identifică u și v", explanation: "Fie $u = x$ și $v = e^x$." },
          { step: "Găsește derivatele", explanation: "$u' = 1$ și $v' = e^x$." },
          { step: "Aplică formula: $(1)(e^x) + (x)(e^x)$", explanation: "Substituie în $u'v + uv'$." },
          { step: "Dă factor comun $e^x$: $e^x(1 + x)$", explanation: "Simplifică răspunsul final." }
        ]
      }
    }
  }
];