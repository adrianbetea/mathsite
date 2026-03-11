import type { Problem } from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// MATRIX PROBLEMS (1–10)
// ─────────────────────────────────────────────────────────────────────────────

export const matrixProblems: Problem[] = [
  {
    id: 1,
    category: "matrix",
    difficulty: "beginner",
    acceptedAnswers: ["3 5 7 9"],
    answerPlaceholder: "a b c d  (elements row by row)",
    translations: {
      en: {
        title: "2×2 Matrix Addition",
        description:
          "Add the two matrices:\n$$A = \\begin{pmatrix}2 & 3\\\\4 & 5\\end{pmatrix}, \\quad B = \\begin{pmatrix}1 & 2\\\\3 & 4\\end{pmatrix}$$",
        hint: "Add the corresponding elements at each position.",
        solution:
          "$$A + B = \\begin{pmatrix}3 & 5\\\\7 & 9\\end{pmatrix}$$",
        steps: [
          { step: "Add position (1,1): 2 + 1 = 3", explanation: "Add the top-left elements of both matrices." },
          { step: "Add position (1,2): 3 + 2 = 5", explanation: "Add the top-right elements of both matrices." },
          { step: "Add position (2,1): 4 + 3 = 7", explanation: "Add the bottom-left elements of both matrices." },
          { step: "Add position (2,2): 5 + 4 = 9", explanation: "Add the bottom-right elements of both matrices." },
          { step: "$$A + B = \\begin{pmatrix}3 & 5\\\\7 & 9\\end{pmatrix}$$", explanation: "Collect all results into the final matrix." },
        ],
      },
      es: {
        title: "Suma de Matrices 2×2",
        description:
          "Suma las dos matrices:\n$$A = \\begin{pmatrix}2 & 3\\\\4 & 5\\end{pmatrix}, \\quad B = \\begin{pmatrix}1 & 2\\\\3 & 4\\end{pmatrix}$$",
        hint: "Suma los elementos en cada posición correspondiente.",
        solution: "$$A + B = \\begin{pmatrix}3 & 5\\\\7 & 9\\end{pmatrix}$$",
        steps: [
          { step: "Posición (1,1): 2 + 1 = 3", explanation: "Suma los elementos superiores izquierdos." },
          { step: "Posición (1,2): 3 + 2 = 5", explanation: "Suma los elementos superiores derechos." },
          { step: "Posición (2,1): 4 + 3 = 7", explanation: "Suma los elementos inferiores izquierdos." },
          { step: "Posición (2,2): 5 + 4 = 9", explanation: "Suma los elementos inferiores derechos." },
          { step: "$$A + B = \\begin{pmatrix}3 & 5\\\\7 & 9\\end{pmatrix}$$", explanation: "Reúne todos los resultados en la matriz final." },
        ],
      },
      fr: {
        title: "Addition de Matrices 2×2",
        description:
          "Additionnez les deux matrices:\n$$A = \\begin{pmatrix}2 & 3\\\\4 & 5\\end{pmatrix}, \\quad B = \\begin{pmatrix}1 & 2\\\\3 & 4\\end{pmatrix}$$",
        hint: "Additionnez les éléments correspondants à chaque position.",
        solution: "$$A + B = \\begin{pmatrix}3 & 5\\\\7 & 9\\end{pmatrix}$$",
        steps: [
          { step: "Position (1,1) : 2 + 1 = 3", explanation: "Additionnez les éléments en haut à gauche." },
          { step: "Position (1,2) : 3 + 2 = 5", explanation: "Additionnez les éléments en haut à droite." },
          { step: "Position (2,1) : 4 + 3 = 7", explanation: "Additionnez les éléments en bas à gauche." },
          { step: "Position (2,2) : 5 + 4 = 9", explanation: "Additionnez les éléments en bas à droite." },
          { step: "$$A + B = \\begin{pmatrix}3 & 5\\\\7 & 9\\end{pmatrix}$$", explanation: "Rassemblez tous les résultats dans la matrice finale." },
        ],
      },
      de: {
        title: "2×2 Matrixaddition",
        description:
          "Addieren Sie die zwei Matrizen:\n$$A = \\begin{pmatrix}2 & 3\\\\4 & 5\\end{pmatrix}, \\quad B = \\begin{pmatrix}1 & 2\\\\3 & 4\\end{pmatrix}$$",
        hint: "Addieren Sie die entsprechenden Elemente an jeder Position.",
        solution: "$$A + B = \\begin{pmatrix}3 & 5\\\\7 & 9\\end{pmatrix}$$",
        steps: [
          { step: "Position (1,1): 2 + 1 = 3", explanation: "Addieren Sie die oberen linken Elemente beider Matrizen." },
          { step: "Position (1,2): 3 + 2 = 5", explanation: "Addieren Sie die oberen rechten Elemente beider Matrizen." },
          { step: "Position (2,1): 4 + 3 = 7", explanation: "Addieren Sie die unteren linken Elemente beider Matrizen." },
          { step: "Position (2,2): 5 + 4 = 9", explanation: "Addieren Sie die unteren rechten Elemente beider Matrizen." },
          { step: "$$A + B = \\begin{pmatrix}3 & 5\\\\7 & 9\\end{pmatrix}$$", explanation: "Sammeln Sie alle Ergebnisse in die finale Matrix." },
        ],
      },
      pl: {
        title: "Dodawanie Macierzy 2×2",
        description:
          "Dodaj dwie macierze:\n$$A = \\begin{pmatrix}2 & 3\\\\4 & 5\\end{pmatrix}, \\quad B = \\begin{pmatrix}1 & 2\\\\3 & 4\\end{pmatrix}$$",
        hint: "Dodaj odpowiadające elementy na każdej pozycji.",
        solution: "$$A + B = \\begin{pmatrix}3 & 5\\\\7 & 9\\end{pmatrix}$$",
        steps: [
          { step: "Pozycja (1,1): 2 + 1 = 3", explanation: "Dodaj lewe górne elementy obu macierzy." },
          { step: "Pozycja (1,2): 3 + 2 = 5", explanation: "Dodaj prawe górne elementy obu macierzy." },
          { step: "Pozycja (2,1): 4 + 3 = 7", explanation: "Dodaj lewe dolne elementy obu macierzy." },
          { step: "Pozycja (2,2): 5 + 4 = 9", explanation: "Dodaj prawe dolne elementy obu macierzy." },
          { step: "$$A + B = \\begin{pmatrix}3 & 5\\\\7 & 9\\end{pmatrix}$$", explanation: "Zbierz wszystkie wyniki w ostatecznej macierzy." },
        ],
      },
      ro: {
        title: "Adunarea Matricelor 2×2",
        description:
          "Adună cele două matrice:\n$$A = \\begin{pmatrix}2 & 3\\\\4 & 5\\end{pmatrix}, \\quad B = \\begin{pmatrix}1 & 2\\\\3 & 4\\end{pmatrix}$$",
        hint: "Adună elementele corespunzătoare de la fiecare poziție.",
        solution: "$$A + B = \\begin{pmatrix}3 & 5\\\\7 & 9\\end{pmatrix}$$",
        steps: [
          { step: "Poziția (1,1): 2 + 1 = 3", explanation: "Adună elementele din stânga sus ale ambelor matrice." },
          { step: "Poziția (1,2): 3 + 2 = 5", explanation: "Adună elementele din dreapta sus ale ambelor matrice." },
          { step: "Poziția (2,1): 4 + 3 = 7", explanation: "Adună elementele din stânga jos ale ambelor matrice." },
          { step: "Poziția (2,2): 5 + 4 = 9", explanation: "Adună elementele din dreapta jos ale ambelor matrice." },
          { step: "$$A + B = \\begin{pmatrix}3 & 5\\\\7 & 9\\end{pmatrix}$$", explanation: "Colectează toate rezultatele în matricea finală." },
        ],
      },
    },
  },
  {
    id: 2,
    category: "matrix",
    difficulty: "beginner",
    acceptedAnswers: ["-13"],
    answerPlaceholder: "Enter a number...",
    translations: {
      en: {
        title: "2×2 Determinant",
        description:
          "Find the determinant of:\n$$A = \\begin{pmatrix}3 & 7\\\\1 & -2\\end{pmatrix}$$",
        hint: "For a 2×2 matrix, det(A) = ad − bc.",
        solution: "$$\\det(A) = (3)(-2) - (7)(1) = -6 - 7 = -13$$",
        steps: [
          { step: "Identify a = 3, b = 7, c = 1, d = −2", explanation: "Label the four elements of the 2×2 matrix." },
          { step: "Compute ad = (3)(−2) = −6", explanation: "Multiply the main-diagonal elements." },
          { step: "Compute bc = (7)(1) = 7", explanation: "Multiply the anti-diagonal elements." },
          { step: "$$\\det(A) = ad - bc = -6 - 7 = -13$$", explanation: "Subtract to get the determinant." },
        ],
      },
      es: {
        title: "Determinante 2×2",
        description:
          "Calcula el determinante de:\n$$A = \\begin{pmatrix}3 & 7\\\\1 & -2\\end{pmatrix}$$",
        hint: "Para una matriz 2×2, det(A) = ad − bc.",
        solution: "$$\\det(A) = (3)(-2) - (7)(1) = -13$$",
        steps: [
          { step: "Identifica a = 3, b = 7, c = 1, d = −2", explanation: "Etiqueta los cuatro elementos de la matriz 2×2." },
          { step: "Calcula ad = (3)(−2) = −6", explanation: "Multiplica los elementos de la diagonal principal." },
          { step: "Calcula bc = (7)(1) = 7", explanation: "Multiplica los elementos de la diagonal secundaria." },
          { step: "$$\\det(A) = -6 - 7 = -13$$", explanation: "Resta para obtener el determinante." },
        ],
      },
      fr: {
        title: "Déterminant 2×2",
        description:
          "Calculez le déterminant de :\n$$A = \\begin{pmatrix}3 & 7\\\\1 & -2\\end{pmatrix}$$",
        hint: "Pour une matrice 2×2, det(A) = ad − bc.",
        solution: "$$\\det(A) = (3)(-2) - (7)(1) = -13$$",
        steps: [
          { step: "Identifiez a = 3, b = 7, c = 1, d = −2", explanation: "Nommez les quatre éléments de la matrice 2×2." },
          { step: "Calculez ad = (3)(−2) = −6", explanation: "Multipliez les éléments de la diagonale principale." },
          { step: "Calculez bc = (7)(1) = 7", explanation: "Multipliez les éléments de la diagonale secondaire." },
          { step: "$$\\det(A) = -6 - 7 = -13$$", explanation: "Soustrayez pour obtenir le déterminant." },
        ],
      },
      de: {
        title: "2×2 Determinante",
        description:
          "Berechnen Sie die Determinante von:\n$$A = \\begin{pmatrix}3 & 7\\\\1 & -2\\end{pmatrix}$$",
        hint: "Für eine 2×2 Matrix gilt: det(A) = ad − bc.",
        solution: "$$\\det(A) = (3)(-2) - (7)(1) = -13$$",
        steps: [
          { step: "Identifiziere a = 3, b = 7, c = 1, d = −2", explanation: "Benennen Sie die vier Elemente der 2×2-Matrix." },
          { step: "Berechne ad = (3)(−2) = −6", explanation: "Multiplizieren Sie die Hauptdiagonalelemente." },
          { step: "Berechne bc = (7)(1) = 7", explanation: "Multiplizieren Sie die Nebendiagonalelemente." },
          { step: "$$\\det(A) = -6 - 7 = -13$$", explanation: "Subtrahieren Sie, um die Determinante zu erhalten." },
        ],
      },
      pl: {
        title: "Wyznacznik Macierzy 2×2",
        description:
          "Oblicz wyznacznik macierzy:\n$$A = \\begin{pmatrix}3 & 7\\\\1 & -2\\end{pmatrix}$$",
        hint: "Dla macierzy 2×2: det(A) = ad − bc.",
        solution: "$$\\det(A) = (3)(-2) - (7)(1) = -13$$",
        steps: [
          { step: "Zidentyfikuj a = 3, b = 7, c = 1, d = −2", explanation: "Oznacz cztery elementy macierzy 2×2." },
          { step: "Oblicz ad = (3)(−2) = −6", explanation: "Przemnóż elementy głównej przekątnej." },
          { step: "Oblicz bc = (7)(1) = 7", explanation: "Przemnóż elementy przekątnej bocznej." },
          { step: "$$\\det(A) = -6 - 7 = -13$$", explanation: "Odejmij, aby uzyskać wyznacznik." },
        ],
      },
      ro: {
        title: "Determinantul Matricei 2×2",
        description:
          "Calculează determinantul matricei:\n$$A = \\begin{pmatrix}3 & 7\\\\1 & -2\\end{pmatrix}$$",
        hint: "Pentru o matrice 2×2: det(A) = ad − bc.",
        solution: "$$\\det(A) = (3)(-2) - (7)(1) = -13$$",
        steps: [
          { step: "Identifică a = 3, b = 7, c = 1, d = −2", explanation: "Etichetează cele patru elemente ale matricei 2×2." },
          { step: "Calculează ad = (3)(−2) = −6", explanation: "Înmulțește elementele de pe diagonala principală." },
          { step: "Calculează bc = (7)(1) = 7", explanation: "Înmulțește elementele de pe diagonala secundară." },
          { step: "$$\\det(A) = -6 - 7 = -13$$", explanation: "Scade pentru a obține determinantul." },
        ],
      },
    },
  },
  {
    id: 3,
    category: "matrix",
    difficulty: "beginner",
    acceptedAnswers: ["3 -6 12 0"],
    answerPlaceholder: "a b c d (elements row by row)",
    translations: {
      en: {
        title: "Scalar Multiplication",
        description: "Multiply the matrix by the scalar 3:\n$$3 \\times \\begin{pmatrix} 1 & -2 \\\\ 4 & 0 \\end{pmatrix}$$",
        hint: "Multiply every element inside the matrix by 3.",
        solution: "$$\\begin{pmatrix} 3(1) & 3(-2) \\\\ 3(4) & 3(0) \\end{pmatrix} = \\begin{pmatrix} 3 & -6 \\\\ 12 & 0 \\end{pmatrix}$$",
        steps: [
          { step: "3 × 1 = 3", explanation: "Multiply the top-left element." },
          { step: "3 × (-2) = -6", explanation: "Multiply the top-right element." },
          { step: "3 × 4 = 12", explanation: "Multiply the bottom-left element." },
          { step: "3 × 0 = 0", explanation: "Multiply the bottom-right element." }
        ],
      },
      es: {
        title: "Multiplicación por un Escalar",
        description: "Multiplica la matriz por el escalar 3:\n$$3 \\times \\begin{pmatrix} 1 & -2 \\\\ 4 & 0 \\end{pmatrix}$$",
        hint: "Multiplica cada elemento dentro de la matriz por 3.",
        solution: "$$\\begin{pmatrix} 3 & -6 \\\\ 12 & 0 \\end{pmatrix}$$",
        steps: [
          { step: "3 × 1 = 3", explanation: "Multiplica el elemento superior izquierdo." },
          { step: "3 × (-2) = -6", explanation: "Multiplica el elemento superior derecho." },
          { step: "3 × 4 = 12", explanation: "Multiplica el elemento inferior izquierdo." },
          { step: "3 × 0 = 0", explanation: "Multiplica el elemento inferior derecho." }
        ],
      },
      fr: {
        title: "Multiplication par un Scalaire",
        description: "Multipliez la matrice par le scalaire 3:\n$$3 \\times \\begin{pmatrix} 1 & -2 \\\\ 4 & 0 \\end{pmatrix}$$",
        hint: "Multipliez chaque élément à l'intérieur de la matrice par 3.",
        solution: "$$\\begin{pmatrix} 3 & -6 \\\\ 12 & 0 \\end{pmatrix}$$",
        steps: [
          { step: "3 × 1 = 3", explanation: "Multipliez l'élément en haut à gauche." },
          { step: "3 × (-2) = -6", explanation: "Multipliez l'élément en haut à droite." },
          { step: "3 × 4 = 12", explanation: "Multipliez l'élément en bas à gauche." },
          { step: "3 × 0 = 0", explanation: "Multipliez l'élément en bas à droite." }
        ],
      },
      de: {
        title: "Skalarmultiplikation",
        description: "Multipliziere die Matrix mit dem Skalar 3:\n$$3 \\times \\begin{pmatrix} 1 & -2 \\\\ 4 & 0 \\end{pmatrix}$$",
        hint: "Multipliziere jedes Element in der Matrix mit 3.",
        solution: "$$\\begin{pmatrix} 3 & -6 \\\\ 12 & 0 \\end{pmatrix}$$",
        steps: [
          { step: "3 × 1 = 3", explanation: "Multipliziere das obere linke Element." },
          { step: "3 × (-2) = -6", explanation: "Multipliziere das obere rechte Element." },
          { step: "3 × 4 = 12", explanation: "Multipliziere das untere linke Element." },
          { step: "3 × 0 = 0", explanation: "Multipliziere das untere rechte Element." }
        ],
      },
      pl: {
        title: "Mnożenie przez Skalar",
        description: "Pomnóż macierz przez skalar 3:\n$$3 \\times \\begin{pmatrix} 1 & -2 \\\\ 4 & 0 \\end{pmatrix}$$",
        hint: "Pomnóż każdy element macierzy przez 3.",
        solution: "$$\\begin{pmatrix} 3 & -6 \\\\ 12 & 0 \\end{pmatrix}$$",
        steps: [
          { step: "3 × 1 = 3", explanation: "Pomnóż lewy górny element." },
          { step: "3 × (-2) = -6", explanation: "Pomnóż prawy górny element." },
          { step: "3 × 4 = 12", explanation: "Pomnóż lewy dolny element." },
          { step: "3 × 0 = 0", explanation: "Pomnóż prawy dolny element." }
        ],
      },
      ro: {
        title: "Înmulțirea cu un Scalar",
        description: "Înmulțește matricea cu scalarul 3:\n$$3 \\times \\begin{pmatrix} 1 & -2 \\\\ 4 & 0 \\end{pmatrix}$$",
        hint: "Înmulțește fiecare element din interiorul matricei cu 3.",
        solution: "$$\\begin{pmatrix} 3 & -6 \\\\ 12 & 0 \\end{pmatrix}$$",
        steps: [
          { step: "3 × 1 = 3", explanation: "Înmulțește elementul din stânga sus." },
          { step: "3 × (-2) = -6", explanation: "Înmulțește elementul din dreapta sus." },
          { step: "3 × 4 = 12", explanation: "Înmulțește elementul din stânga jos." },
          { step: "3 × 0 = 0", explanation: "Înmulțește elementul din dreapta jos." }
        ],
      }
    }
  },
  {
    id: 4,
    category: "matrix",
    difficulty: "beginner",
    acceptedAnswers: ["4 4 0 -5"],
    answerPlaceholder: "a b c d (elements row by row)",
    translations: {
      en: {
        title: "Matrix Subtraction",
        description: "Subtract the two matrices:\n$$A = \\begin{pmatrix}5 & 8\\\\3 & 2\\end{pmatrix}, \\quad B = \\begin{pmatrix}1 & 4\\\\3 & 7\\end{pmatrix}$$",
        hint: "Subtract the corresponding elements at each position: A - B.",
        solution: "$$\\begin{pmatrix} 4 & 4 \\\\ 0 & -5 \\end{pmatrix}$$",
        steps: [
          { step: "5 - 1 = 4", explanation: "Subtract top-left elements." },
          { step: "8 - 4 = 4", explanation: "Subtract top-right elements." },
          { step: "3 - 3 = 0", explanation: "Subtract bottom-left elements." },
          { step: "2 - 7 = -5", explanation: "Subtract bottom-right elements." }
        ]
      },
      es: {
        title: "Resta de Matrices",
        description: "Resta las dos matrices:\n$$A = \\begin{pmatrix}5 & 8\\\\3 & 2\\end{pmatrix}, \\quad B = \\begin{pmatrix}1 & 4\\\\3 & 7\\end{pmatrix}$$",
        hint: "Resta los elementos correspondientes en cada posición: A - B.",
        solution: "$$\\begin{pmatrix} 4 & 4 \\\\ 0 & -5 \\end{pmatrix}$$",
        steps: [
          { step: "5 - 1 = 4", explanation: "Resta los elementos superiores izquierdos." },
          { step: "8 - 4 = 4", explanation: "Resta los elementos superiores derechos." },
          { step: "3 - 3 = 0", explanation: "Resta los elementos inferiores izquierdos." },
          { step: "2 - 7 = -5", explanation: "Resta los elementos inferiores derechos." }
        ]
      },
      fr: {
        title: "Soustraction de Matrices",
        description: "Soustrayez les deux matrices:\n$$A = \\begin{pmatrix}5 & 8\\\\3 & 2\\end{pmatrix}, \\quad B = \\begin{pmatrix}1 & 4\\\\3 & 7\\end{pmatrix}$$",
        hint: "Soustrayez les éléments correspondants à chaque position : A - B.",
        solution: "$$\\begin{pmatrix} 4 & 4 \\\\ 0 & -5 \\end{pmatrix}$$",
        steps: [
          { step: "5 - 1 = 4", explanation: "Soustrayez les éléments en haut à gauche." },
          { step: "8 - 4 = 4", explanation: "Soustrayez les éléments en haut à droite." },
          { step: "3 - 3 = 0", explanation: "Soustrayez les éléments en bas à gauche." },
          { step: "2 - 7 = -5", explanation: "Soustrayez les éléments en bas à droite." }
        ]
      },
      de: {
        title: "Matrixsubtraktion",
        description: "Subtrahieren Sie die beiden Matrizen:\n$$A = \\begin{pmatrix}5 & 8\\\\3 & 2\\end{pmatrix}, \\quad B = \\begin{pmatrix}1 & 4\\\\3 & 7\\end{pmatrix}$$",
        hint: "Subtrahieren Sie die entsprechenden Elemente an jeder Position: A - B.",
        solution: "$$\\begin{pmatrix} 4 & 4 \\\\ 0 & -5 \\end{pmatrix}$$",
        steps: [
          { step: "5 - 1 = 4", explanation: "Subtrahieren Sie die oberen linken Elemente." },
          { step: "8 - 4 = 4", explanation: "Subtrahieren Sie die oberen rechten Elemente." },
          { step: "3 - 3 = 0", explanation: "Subtrahieren Sie die unteren linken Elemente." },
          { step: "2 - 7 = -5", explanation: "Subtrahieren Sie die unteren rechten Elemente." }
        ]
      },
      pl: {
        title: "Odejmowanie Macierzy",
        description: "Odejmij dwie macierze:\n$$A = \\begin{pmatrix}5 & 8\\\\3 & 2\\end{pmatrix}, \\quad B = \\begin{pmatrix}1 & 4\\\\3 & 7\\end{pmatrix}$$",
        hint: "Odejmij odpowiadające elementy na każdej pozycji: A - B.",
        solution: "$$\\begin{pmatrix} 4 & 4 \\\\ 0 & -5 \\end{pmatrix}$$",
        steps: [
          { step: "5 - 1 = 4", explanation: "Odejmij lewe górne elementy." },
          { step: "8 - 4 = 4", explanation: "Odejmij prawe górne elementy." },
          { step: "3 - 3 = 0", explanation: "Odejmij lewe dolne elementy." },
          { step: "2 - 7 = -5", explanation: "Odejmij prawe dolne elementy." }
        ]
      },
      ro: {
        title: "Scăderea Matricelor",
        description: "Scade cele două matrice:\n$$A = \\begin{pmatrix}5 & 8\\\\3 & 2\\end{pmatrix}, \\quad B = \\begin{pmatrix}1 & 4\\\\3 & 7\\end{pmatrix}$$",
        hint: "Scade elementele corespunzătoare de la fiecare poziție: A - B.",
        solution: "$$\\begin{pmatrix} 4 & 4 \\\\ 0 & -5 \\end{pmatrix}$$",
        steps: [
          { step: "5 - 1 = 4", explanation: "Scade elementele din stânga sus." },
          { step: "8 - 4 = 4", explanation: "Scade elementele din dreapta sus." },
          { step: "3 - 3 = 0", explanation: "Scade elementele din stânga jos." },
          { step: "2 - 7 = -5", explanation: "Scade elementele din dreapta jos." }
        ]
      }
    }
  },
  {
    id: 5,
    category: "matrix",
    difficulty: "beginner",
    acceptedAnswers: ["1 3 5 2 4 6"],
    answerPlaceholder: "Row by row (e.g. a b c d e f)",
    translations: {
      en: {
        title: "Matrix Transpose",
        description: "Find the transpose of the 3×2 matrix:\n$$A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\\\ 5 & 6 \\end{pmatrix}$$",
        hint: "To transpose a matrix, write its rows as columns.",
        solution: "$$A^T = \\begin{pmatrix} 1 & 3 & 5 \\\\ 2 & 4 & 6 \\end{pmatrix}$$",
        steps: [
          { step: "Row 1 (1, 2) becomes Column 1", explanation: "Take the first row and write it vertically." },
          { step: "Row 2 (3, 4) becomes Column 2", explanation: "Take the second row and write it vertically." },
          { step: "Row 3 (5, 6) becomes Column 3", explanation: "Take the third row and write it vertically." }
        ]
      },
      es: {
        title: "Matriz Transpuesta",
        description: "Encuentra la transpuesta de la matriz 3×2:\n$$A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\\\ 5 & 6 \\end{pmatrix}$$",
        hint: "Para transponer una matriz, escribe sus filas como columnas.",
        solution: "$$A^T = \\begin{pmatrix} 1 & 3 & 5 \\\\ 2 & 4 & 6 \\end{pmatrix}$$",
        steps: [
          { step: "La fila 1 (1, 2) se convierte en la columna 1", explanation: "Toma la primera fila y escríbela verticalmente." },
          { step: "La fila 2 (3, 4) se convierte en la columna 2", explanation: "Toma la segunda fila y escríbela verticalmente." },
          { step: "La fila 3 (5, 6) se convierte en la columna 3", explanation: "Toma la tercera fila y escríbela verticalmente." }
        ]
      },
      fr: {
        title: "Transposée de Matrice",
        description: "Trouvez la transposée de la matrice 3×2 :\n$$A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\\\ 5 & 6 \\end{pmatrix}$$",
        hint: "Pour transposer une matrice, écrivez ses lignes comme des colonnes.",
        solution: "$$A^T = \\begin{pmatrix} 1 & 3 & 5 \\\\ 2 & 4 & 6 \\end{pmatrix}$$",
        steps: [
          { step: "La ligne 1 (1, 2) devient la colonne 1", explanation: "Prenez la première ligne et écrivez-la verticalement." },
          { step: "La ligne 2 (3, 4) devient la colonne 2", explanation: "Prenez la deuxième ligne et écrivez-la verticalement." },
          { step: "La ligne 3 (5, 6) devient la colonne 3", explanation: "Prenez la troisième ligne et écrivez-la verticalement." }
        ]
      },
      de: {
        title: "Transponierte Matrix",
        description: "Finde die Transponierte der 3×2 Matrix:\n$$A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\\\ 5 & 6 \\end{pmatrix}$$",
        hint: "Um eine Matrix zu transponieren, schreibe ihre Zeilen als Spalten.",
        solution: "$$A^T = \\begin{pmatrix} 1 & 3 & 5 \\\\ 2 & 4 & 6 \\end{pmatrix}$$",
        steps: [
          { step: "Zeile 1 (1, 2) wird zu Spalte 1", explanation: "Nimm die erste Zeile und schreibe sie vertikal." },
          { step: "Zeile 2 (3, 4) wird zu Spalte 2", explanation: "Nimm die zweite Zeile und schreibe sie vertikal." },
          { step: "Zeile 3 (5, 6) wird zu Spalte 3", explanation: "Nimm die dritte Zeile und schreibe sie vertikal." }
        ]
      },
      pl: {
        title: "Transpozycja Macierzy",
        description: "Znajdź transpozycję macierzy 3×2:\n$$A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\\\ 5 & 6 \\end{pmatrix}$$",
        hint: "Aby przetransponować macierz, zapisz jej wiersze jako kolumny.",
        solution: "$$A^T = \\begin{pmatrix} 1 & 3 & 5 \\\\ 2 & 4 & 6 \\end{pmatrix}$$",
        steps: [
          { step: "Wiersz 1 (1, 2) staje się Kolumną 1", explanation: "Weź pierwszy wiersz i zapisz go pionowo." },
          { step: "Wiersz 2 (3, 4) staje się Kolumną 2", explanation: "Weź drugi wiersz i zapisz go pionowo." },
          { step: "Wiersz 3 (5, 6) staje się Kolumną 3", explanation: "Weź trzeci wiersz i zapisz go pionowo." }
        ]
      },
      ro: {
        title: "Transpusa Matricei",
        description: "Găsește transpusa matricei 3×2:\n$$A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\\\ 5 & 6 \\end{pmatrix}$$",
        hint: "Pentru a transpune o matrice, scrie rândurile ei drept coloane.",
        solution: "$$A^T = \\begin{pmatrix} 1 & 3 & 5 \\\\ 2 & 4 & 6 \\end{pmatrix}$$",
        steps: [
          { step: "Rândul 1 (1, 2) devine Coloana 1", explanation: "Ia primul rând și scrie-l vertical." },
          { step: "Rândul 2 (3, 4) devine Coloana 2", explanation: "Ia al doilea rând și scrie-l vertical." },
          { step: "Rândul 3 (5, 6) devine Coloana 3", explanation: "Ia al treilea rând și scrie-l vertical." }
        ]
      }
    }
  },
  {
    id: 6,
    category: "matrix",
    difficulty: "intermediate",
    acceptedAnswers: ["4 4 10 8"],
    answerPlaceholder: "a b c d (elements row by row)",
    translations: {
      en: {
        title: "2×2 Matrix Multiplication",
        description: "Multiply the two matrices:\n$$A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}, \\quad B = \\begin{pmatrix} 2 & 0 \\\\ 1 & 2 \\end{pmatrix}$$",
        hint: "Take the dot product of rows from A and columns from B.",
        solution: "$$A \\times B = \\begin{pmatrix} 4 & 4 \\\\ 10 & 8 \\end{pmatrix}$$",
        steps: [
          { step: "Top-Left: (1×2) + (2×1) = 4", explanation: "Row 1 of A times Column 1 of B." },
          { step: "Top-Right: (1×0) + (2×2) = 4", explanation: "Row 1 of A times Column 2 of B." },
          { step: "Bottom-Left: (3×2) + (4×1) = 10", explanation: "Row 2 of A times Column 1 of B." },
          { step: "Bottom-Right: (3×0) + (4×2) = 8", explanation: "Row 2 of A times Column 2 of B." }
        ]
      },
      es: {
        title: "Multiplicación de Matrices 2×2",
        description: "Multiplica las dos matrices:\n$$A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}, \\quad B = \\begin{pmatrix} 2 & 0 \\\\ 1 & 2 \\end{pmatrix}$$",
        hint: "Calcula el producto punto de las filas de A por las columnas de B.",
        solution: "$$A \\times B = \\begin{pmatrix} 4 & 4 \\\\ 10 & 8 \\end{pmatrix}$$",
        steps: [
          { step: "Sup-Izq: (1×2) + (2×1) = 4", explanation: "Fila 1 de A por Columna 1 de B." },
          { step: "Sup-Der: (1×0) + (2×2) = 4", explanation: "Fila 1 de A por Columna 2 de B." },
          { step: "Inf-Izq: (3×2) + (4×1) = 10", explanation: "Fila 2 de A por Columna 1 de B." },
          { step: "Inf-Der: (3×0) + (4×2) = 8", explanation: "Fila 2 de A por Columna 2 de B." }
        ]
      },
      fr: {
        title: "Multiplication de Matrices 2×2",
        description: "Multipliez les deux matrices :\n$$A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}, \\quad B = \\begin{pmatrix} 2 & 0 \\\\ 1 & 2 \\end{pmatrix}$$",
        hint: "Faites le produit scalaire des lignes de A et des colonnes de B.",
        solution: "$$A \\times B = \\begin{pmatrix} 4 & 4 \\\\ 10 & 8 \\end{pmatrix}$$",
        steps: [
          { step: "Haut-Gauche: (1×2) + (2×1) = 4", explanation: "Ligne 1 de A fois Colonne 1 de B." },
          { step: "Haut-Droite: (1×0) + (2×2) = 4", explanation: "Ligne 1 de A fois Colonne 2 de B." },
          { step: "Bas-Gauche: (3×2) + (4×1) = 10", explanation: "Ligne 2 de A fois Colonne 1 de B." },
          { step: "Bas-Droite: (3×0) + (4×2) = 8", explanation: "Ligne 2 de A fois Colonne 2 de B." }
        ]
      },
      de: {
        title: "2×2 Matrixmultiplikation",
        description: "Multiplizieren Sie die beiden Matrizen:\n$$A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}, \\quad B = \\begin{pmatrix} 2 & 0 \\\\ 1 & 2 \\end{pmatrix}$$",
        hint: "Berechne das Skalarprodukt der Zeilen von A und Spalten von B.",
        solution: "$$A \\times B = \\begin{pmatrix} 4 & 4 \\\\ 10 & 8 \\end{pmatrix}$$",
        steps: [
          { step: "Oben-Links: (1×2) + (2×1) = 4", explanation: "Zeile 1 von A mal Spalte 1 von B." },
          { step: "Oben-Rechts: (1×0) + (2×2) = 4", explanation: "Zeile 1 von A mal Spalte 2 von B." },
          { step: "Unten-Links: (3×2) + (4×1) = 10", explanation: "Zeile 2 von A mal Spalte 1 von B." },
          { step: "Unten-Rechts: (3×0) + (4×2) = 8", explanation: "Zeile 2 von A mal Spalte 2 von B." }
        ]
      },
      pl: {
        title: "Mnożenie Macierzy 2×2",
        description: "Pomnóż dwie macierze:\n$$A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}, \\quad B = \\begin{pmatrix} 2 & 0 \\\\ 1 & 2 \\end{pmatrix}$$",
        hint: "Oblicz iloczyn skalarny wierszy macierzy A i kolumn macierzy B.",
        solution: "$$A \\times B = \\begin{pmatrix} 4 & 4 \\\\ 10 & 8 \\end{pmatrix}$$",
        steps: [
          { step: "Lewa-Góra: (1×2) + (2×1) = 4", explanation: "Wiersz 1 z A razy Kolumna 1 z B." },
          { step: "Prawa-Góra: (1×0) + (2×2) = 4", explanation: "Wiersz 1 z A razy Kolumna 2 z B." },
          { step: "Lewy-Dół: (3×2) + (4×1) = 10", explanation: "Wiersz 2 z A razy Kolumna 1 z B." },
          { step: "Prawy-Dół: (3×0) + (4×2) = 8", explanation: "Wiersz 2 z A razy Kolumna 2 z B." }
        ]
      },
      ro: {
        title: "Înmulțirea Matricelor 2×2",
        description: "Înmulțește cele două matrice:\n$$A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}, \\quad B = \\begin{pmatrix} 2 & 0 \\\\ 1 & 2 \\end{pmatrix}$$",
        hint: "Calculează produsul scalar dintre rândurile lui A și coloanele lui B.",
        solution: "$$A \\times B = \\begin{pmatrix} 4 & 4 \\\\ 10 & 8 \\end{pmatrix}$$",
        steps: [
          { step: "Stânga-Sus: (1×2) + (2×1) = 4", explanation: "Rândul 1 din A înmulțit cu Coloana 1 din B." },
          { step: "Dreapta-Sus: (1×0) + (2×2) = 4", explanation: "Rândul 1 din A înmulțit cu Coloana 2 din B." },
          { step: "Stânga-Jos: (3×2) + (4×1) = 10", explanation: "Rândul 2 din A înmulțit cu Coloana 1 din B." },
          { step: "Dreapta-Jos: (3×0) + (4×2) = 8", explanation: "Rândul 2 din A înmulțit cu Coloana 2 din B." }
        ]
      }
    }
  },
  {
    id: 7,
    category: "matrix",
    difficulty: "beginner",
    acceptedAnswers: ["9"],
    answerPlaceholder: "Enter the trace...",
    translations: {
      en: {
        title: "Trace of a Matrix",
        description: "Find the trace of the 3×3 matrix:\n$$A = \\begin{pmatrix} 5 & 2 & 1 \\\\ 0 & -3 & 4 \\\\ 9 & 8 & 7 \\end{pmatrix}$$",
        hint: "The trace is the sum of the elements on the main diagonal.",
        solution: "$$Tr(A) = 5 + (-3) + 7 = 9$$",
        steps: [
          { step: "Identify main diagonal: 5, -3, 7", explanation: "These are the elements from top-left to bottom-right." },
          { step: "Calculate: 5 - 3 + 7 = 9", explanation: "Sum the diagonal elements." }
        ]
      },
      es: {
        title: "Traza de una Matriz",
        description: "Encuentra la traza de la matriz 3×3:\n$$A = \\begin{pmatrix} 5 & 2 & 1 \\\\ 0 & -3 & 4 \\\\ 9 & 8 & 7 \\end{pmatrix}$$",
        hint: "La traza es la suma de los elementos en la diagonal principal.",
        solution: "$$Tr(A) = 5 + (-3) + 7 = 9$$",
        steps: [
          { step: "Identifica la diagonal principal: 5, -3, 7", explanation: "Estos son los elementos desde arriba a la izquierda hasta abajo a la derecha." },
          { step: "Calcula: 5 - 3 + 7 = 9", explanation: "Suma los elementos de la diagonal." }
        ]
      },
      fr: {
        title: "Trace d'une Matrice",
        description: "Trouvez la trace de la matrice 3×3 :\n$$A = \\begin{pmatrix} 5 & 2 & 1 \\\\ 0 & -3 & 4 \\\\ 9 & 8 & 7 \\end{pmatrix}$$",
        hint: "La trace est la somme des éléments sur la diagonale principale.",
        solution: "$$Tr(A) = 5 + (-3) + 7 = 9$$",
        steps: [
          { step: "Identifiez la diagonale principale : 5, -3, 7", explanation: "Ce sont les éléments allant d'en haut à gauche jusqu'en bas à droite." },
          { step: "Calculez : 5 - 3 + 7 = 9", explanation: "Additionnez les éléments de la diagonale." }
        ]
      },
      de: {
        title: "Spur einer Matrix",
        description: "Finde die Spur der 3×3 Matrix:\n$$A = \\begin{pmatrix} 5 & 2 & 1 \\\\ 0 & -3 & 4 \\\\ 9 & 8 & 7 \\end{pmatrix}$$",
        hint: "Die Spur ist die Summe der Elemente auf der Hauptdiagonale.",
        solution: "$$Tr(A) = 5 + (-3) + 7 = 9$$",
        steps: [
          { step: "Identifiziere die Hauptdiagonale: 5, -3, 7", explanation: "Dies sind die Elemente von oben links nach unten rechts." },
          { step: "Berechne: 5 - 3 + 7 = 9", explanation: "Summiere die Diagonalelemente." }
        ]
      },
      pl: {
        title: "Ślad Macierzy",
        description: "Znajdź ślad macierzy 3×3:\n$$A = \\begin{pmatrix} 5 & 2 & 1 \\\\ 0 & -3 & 4 \\\\ 9 & 8 & 7 \\end{pmatrix}$$",
        hint: "Ślad to suma elementów na głównej przekątnej.",
        solution: "$$Tr(A) = 5 + (-3) + 7 = 9$$",
        steps: [
          { step: "Zidentyfikuj główną przekątną: 5, -3, 7", explanation: "Są to elementy od lewego górnego do prawego dolnego rogu." },
          { step: "Oblicz: 5 - 3 + 7 = 9", explanation: "Zsumuj elementy przekątnej." }
        ]
      },
      ro: {
        title: "Urma Matricei",
        description: "Găsește urma matricei 3×3:\n$$A = \\begin{pmatrix} 5 & 2 & 1 \\\\ 0 & -3 & 4 \\\\ 9 & 8 & 7 \\end{pmatrix}$$",
        hint: "Urma este suma elementelor de pe diagonala principală.",
        solution: "$$Tr(A) = 5 + (-3) + 7 = 9$$",
        steps: [
          { step: "Identifică diagonala principală: 5, -3, 7", explanation: "Acestea sunt elementele de la stânga-sus la dreapta-jos." },
          { step: "Calculează: 5 - 3 + 7 = 9", explanation: "Adună elementele diagonalei." }
        ]
      }
    }
  },
  {
    id: 8,
    category: "matrix",
    difficulty: "intermediate",
    acceptedAnswers: ["3 -5 -1 2"],
    answerPlaceholder: "a b c d (elements row by row)",
    translations: {
      en: {
        title: "2×2 Matrix Inverse",
        description: "Find the inverse of the matrix:\n$$A = \\begin{pmatrix} 2 & 5 \\\\ 1 & 3 \\end{pmatrix}$$",
        hint: "Swap a and d, change signs of b and c, and multiply by 1/determinant.",
        solution: "$$A^{-1} = \\begin{pmatrix} 3 & -5 \\\\ -1 & 2 \\end{pmatrix}$$",
        steps: [
          { step: "Det(A) = (2×3) - (5×1) = 6 - 5 = 1", explanation: "First calculate the determinant." },
          { step: "Swap diagonal: a=3, d=2", explanation: "Swap the elements on the main diagonal." },
          { step: "Negate off-diagonal: b=-5, c=-1", explanation: "Change the signs of the other two elements." },
          { step: "Divide by Det(A): Multiply by 1/1", explanation: "Since the determinant is 1, the matrix stays the same." }
        ]
      },
      es: {
        title: "Matriz Inversa 2×2",
        description: "Encuentra la inversa de la matriz:\n$$A = \\begin{pmatrix} 2 & 5 \\\\ 1 & 3 \\end{pmatrix}$$",
        hint: "Intercambia a y d, cambia el signo de b y c, y multiplica por 1/determinante.",
        solution: "$$A^{-1} = \\begin{pmatrix} 3 & -5 \\\\ -1 & 2 \\end{pmatrix}$$",
        steps: [
          { step: "Det(A) = (2×3) - (5×1) = 6 - 5 = 1", explanation: "Primero calcula el determinante." },
          { step: "Intercambia diagonal: a=3, d=2", explanation: "Intercambia los elementos de la diagonal principal." },
          { step: "Niega la otra diagonal: b=-5, c=-1", explanation: "Cambia los signos de los otros dos elementos." },
          { step: "Divide por Det(A): Multiplica por 1/1", explanation: "Como el determinante es 1, la matriz no cambia." }
        ]
      },
      fr: {
        title: "Matrice Inverse 2×2",
        description: "Trouvez l'inverse de la matrice :\n$$A = \\begin{pmatrix} 2 & 5 \\\\ 1 & 3 \\end{pmatrix}$$",
        hint: "Échangez a et d, changez le signe de b et c, puis multipliez par 1/déterminant.",
        solution: "$$A^{-1} = \\begin{pmatrix} 3 & -5 \\\\ -1 & 2 \\end{pmatrix}$$",
        steps: [
          { step: "Det(A) = (2×3) - (5×1) = 6 - 5 = 1", explanation: "Calculez d'abord le déterminant." },
          { step: "Échangez la diagonale : a=3, d=2", explanation: "Échangez les éléments de la diagonale principale." },
          { step: "Négativez l'autre diagonale : b=-5, c=-1", explanation: "Changez les signes des deux autres éléments." },
          { step: "Divisez par Det(A) : Multipliez par 1/1", explanation: "Puisque le déterminant est 1, la matrice reste la même." }
        ]
      },
      de: {
        title: "Inverse 2×2 Matrix",
        description: "Finde die Inverse der Matrix:\n$$A = \\begin{pmatrix} 2 & 5 \\\\ 1 & 3 \\end{pmatrix}$$",
        hint: "Tausche a und d, ändere die Vorzeichen von b und c, multipliziere mit 1/Determinante.",
        solution: "$$A^{-1} = \\begin{pmatrix} 3 & -5 \\\\ -1 & 2 \\end{pmatrix}$$",
        steps: [
          { step: "Det(A) = (2×3) - (5×1) = 6 - 5 = 1", explanation: "Berechne zuerst die Determinante." },
          { step: "Tausche Diagonale: a=3, d=2", explanation: "Tausche die Elemente auf der Hauptdiagonale." },
          { step: "Negiere Nebendiagonale: b=-5, c=-1", explanation: "Ändere die Vorzeichen der anderen beiden Elemente." },
          { step: "Teile durch Det(A): Multipliziere mit 1/1", explanation: "Da die Determinante 1 ist, bleibt die Matrix gleich." }
        ]
      },
      pl: {
        title: "Macierz Odwrotna 2×2",
        description: "Znajdź macierz odwrotną:\n$$A = \\begin{pmatrix} 2 & 5 \\\\ 1 & 3 \\end{pmatrix}$$",
        hint: "Zamień a i d, zmień znaki b i c, i pomnóż przez 1/wyznacznik.",
        solution: "$$A^{-1} = \\begin{pmatrix} 3 & -5 \\\\ -1 & 2 \\end{pmatrix}$$",
        steps: [
          { step: "Det(A) = (2×3) - (5×1) = 6 - 5 = 1", explanation: "Najpierw oblicz wyznacznik." },
          { step: "Zamień przekątną: a=3, d=2", explanation: "Zamień miejscami elementy głównej przekątnej." },
          { step: "Zmień znaki na drugiej przekątnej: b=-5, c=-1", explanation: "Zmień znaki pozostałych dwóch elementów." },
          { step: "Podziel przez Det(A): Pomnóż przez 1/1", explanation: "Ponieważ wyznacznik wynosi 1, macierz pozostaje bez zmian." }
        ]
      },
      ro: {
        title: "Inversa Matricei 2×2",
        description: "Găsește inversa matricei:\n$$A = \\begin{pmatrix} 2 & 5 \\\\ 1 & 3 \\end{pmatrix}$$",
        hint: "Schimbă locurile pentru a și d, schimbă semnul la b și c, apoi înmulțește cu 1/determinant.",
        solution: "$$A^{-1} = \\begin{pmatrix} 3 & -5 \\\\ -1 & 2 \\end{pmatrix}$$",
        steps: [
          { step: "Det(A) = (2×3) - (5×1) = 6 - 5 = 1", explanation: "Calculează mai întâi determinantul." },
          { step: "Schimbă diagonala: a=3, d=2", explanation: "Schimbă locurile elementelor de pe diagonala principală." },
          { step: "Schimbă semnul celorlalte: b=-5, c=-1", explanation: "Schimbă semnul celorlalte două elemente." },
          { step: "Împarte la Det(A): Înmulțește cu 1/1", explanation: "Deoarece determinantul este 1, matricea rămâne la fel." }
        ]
      }
    }
  },
  {
    id: 9,
    category: "matrix",
    difficulty: "intermediate",
    acceptedAnswers: ["5 8"],
    answerPlaceholder: "a b (top to bottom)",
    translations: {
      en: {
        title: "Matrix-Vector Multiplication",
        description: "Multiply the matrix by the vector:\n$$\\begin{pmatrix} 3 & -1 \\\\ 2 & 4 \\end{pmatrix} \\begin{pmatrix} 2 \\\\ 1 \\end{pmatrix}$$",
        hint: "Multiply each row of the matrix by the vector's column.",
        solution: "$$\\begin{pmatrix} 5 \\\\ 8 \\end{pmatrix}$$",
        steps: [
          { step: "Top row: (3 × 2) + (-1 × 1) = 6 - 1 = 5", explanation: "Multiply the first row by the vector." },
          { step: "Bottom row: (2 × 2) + (4 × 1) = 4 + 4 = 8", explanation: "Multiply the second row by the vector." }
        ]
      },
      es: {
        title: "Multiplicación Matriz-Vector",
        description: "Multiplica la matriz por el vector:\n$$\\begin{pmatrix} 3 & -1 \\\\ 2 & 4 \\end{pmatrix} \\begin{pmatrix} 2 \\\\ 1 \\end{pmatrix}$$",
        hint: "Multiplica cada fila de la matriz por la columna del vector.",
        solution: "$$\\begin{pmatrix} 5 \\\\ 8 \\end{pmatrix}$$",
        steps: [
          { step: "Fila superior: (3 × 2) + (-1 × 1) = 6 - 1 = 5", explanation: "Multiplica la primera fila por el vector." },
          { step: "Fila inferior: (2 × 2) + (4 × 1) = 4 + 4 = 8", explanation: "Multiplica la segunda fila por el vector." }
        ]
      },
      fr: {
        title: "Multiplication Matrice-Vecteur",
        description: "Multipliez la matrice par le vecteur :\n$$\\begin{pmatrix} 3 & -1 \\\\ 2 & 4 \\end{pmatrix} \\begin{pmatrix} 2 \\\\ 1 \\end{pmatrix}$$",
        hint: "Multipliez chaque ligne de la matrice par la colonne du vecteur.",
        solution: "$$\\begin{pmatrix} 5 \\\\ 8 \\end{pmatrix}$$",
        steps: [
          { step: "Ligne supérieure: (3 × 2) + (-1 × 1) = 6 - 1 = 5", explanation: "Multipliez la première ligne par le vecteur." },
          { step: "Ligne inférieure: (2 × 2) + (4 × 1) = 4 + 4 = 8", explanation: "Multipliez la deuxième ligne par le vecteur." }
        ]
      },
      de: {
        title: "Matrix-Vektor-Multiplikation",
        description: "Multipliziere die Matrix mit dem Vektor:\n$$\\begin{pmatrix} 3 & -1 \\\\ 2 & 4 \\end{pmatrix} \\begin{pmatrix} 2 \\\\ 1 \\end{pmatrix}$$",
        hint: "Multipliziere jede Zeile der Matrix mit der Spalte des Vektors.",
        solution: "$$\\begin{pmatrix} 5 \\\\ 8 \\end{pmatrix}$$",
        steps: [
          { step: "Obere Zeile: (3 × 2) + (-1 × 1) = 6 - 1 = 5", explanation: "Multipliziere die erste Zeile mit dem Vektor." },
          { step: "Untere Zeile: (2 × 2) + (4 × 1) = 4 + 4 = 8", explanation: "Multipliziere die zweite Zeile mit dem Vektor." }
        ]
      },
      pl: {
        title: "Mnożenie Macierzy przez Wektor",
        description: "Pomnóż macierz przez wektor:\n$$\\begin{pmatrix} 3 & -1 \\\\ 2 & 4 \\end{pmatrix} \\begin{pmatrix} 2 \\\\ 1 \\end{pmatrix}$$",
        hint: "Pomnóż każdy wiersz macierzy przez kolumnę wektora.",
        solution: "$$\\begin{pmatrix} 5 \\\\ 8 \\end{pmatrix}$$",
        steps: [
          { step: "Górny wiersz: (3 × 2) + (-1 × 1) = 6 - 1 = 5", explanation: "Pomnóż pierwszy wiersz przez wektor." },
          { step: "Dolny wiersz: (2 × 2) + (4 × 1) = 4 + 4 = 8", explanation: "Pomnóż drugi wiersz przez wektor." }
        ]
      },
      ro: {
        title: "Înmulțirea Matrice-Vector",
        description: "Înmulțește matricea cu vectorul:\n$$\\begin{pmatrix} 3 & -1 \\\\ 2 & 4 \\end{pmatrix} \\begin{pmatrix} 2 \\\\ 1 \\end{pmatrix}$$",
        hint: "Înmulțește fiecare rând al matricei cu coloana vectorului.",
        solution: "$$\\begin{pmatrix} 5 \\\\ 8 \\end{pmatrix}$$",
        steps: [
          { step: "Rândul de sus: (3 × 2) + (-1 × 1) = 6 - 1 = 5", explanation: "Înmulțește primul rând cu vectorul." },
          { step: "Rândul de jos: (2 × 2) + (4 × 1) = 4 + 4 = 8", explanation: "Înmulțește al doilea rând cu vectorul." }
        ]
      }
    }
  },
  {
    id: 10,
    category: "matrix",
    difficulty: "advanced",
    acceptedAnswers: ["-6"],
    answerPlaceholder: "Enter determinant...",
    translations: {
      en: {
        title: "3×3 Determinant",
        description: "Find the determinant:\n$$A = \\begin{pmatrix} 2 & 0 & 1 \\\\ 3 & -1 & 4 \\\\ 0 & 2 & -2 \\end{pmatrix}$$",
        hint: "Expand along the first row: a(ei-fh) - b(di-fg) + c(dh-eg).",
        solution: "$$\\det(A) = -6$$",
        steps: [
          { step: "First term: 2 × ( (-1)(-2) - (4)(2) )", explanation: "Multiply 2 by the determinant of its 2x2 minor." },
          { step: "2 × (2 - 8) = 2 × (-6) = -12", explanation: "Evaluate the first term." },
          { step: "Second term: -0 × (...)", explanation: "The middle term is zero, so we skip it." },
          { step: "Third term: 1 × ( (3)(2) - (-1)(0) )", explanation: "Multiply 1 by the determinant of its 2x2 minor." },
          { step: "1 × (6 - 0) = 6", explanation: "Evaluate the third term." },
          { step: "Total: -12 - 0 + 6 = -6", explanation: "Sum the terms together." }
        ]
      },
      es: {
        title: "Determinante 3×3",
        description: "Calcula el determinante:\n$$A = \\begin{pmatrix} 2 & 0 & 1 \\\\ 3 & -1 & 4 \\\\ 0 & 2 & -2 \\end{pmatrix}$$",
        hint: "Expande por la primera fila: a(ei-fh) - b(di-fg) + c(dh-eg).",
        solution: "$$\\det(A) = -6$$",
        steps: [
          { step: "Primer término: 2 × ( (-1)(-2) - (4)(2) )", explanation: "Multiplica 2 por el determinante de su menor 2x2." },
          { step: "2 × (2 - 8) = 2 × (-6) = -12", explanation: "Evalúa el primer término." },
          { step: "Segundo término: -0 × (...)", explanation: "El término central es cero, así que lo saltamos." },
          { step: "Tercer término: 1 × ( (3)(2) - (-1)(0) )", explanation: "Multiplica 1 por el determinante de su menor 2x2." },
          { step: "1 × (6 - 0) = 6", explanation: "Evalúa el tercer término." },
          { step: "Total: -12 - 0 + 6 = -6", explanation: "Suma todos los términos." }
        ]
      },
      fr: {
        title: "Déterminant 3×3",
        description: "Calculez le déterminant :\n$$A = \\begin{pmatrix} 2 & 0 & 1 \\\\ 3 & -1 & 4 \\\\ 0 & 2 & -2 \\end{pmatrix}$$",
        hint: "Développez selon la première ligne : a(ei-fh) - b(di-fg) + c(dh-eg).",
        solution: "$$\\det(A) = -6$$",
        steps: [
          { step: "Premier terme : 2 × ( (-1)(-2) - (4)(2) )", explanation: "Multipliez 2 par le déterminant de son mineur 2x2." },
          { step: "2 × (2 - 8) = 2 × (-6) = -12", explanation: "Évaluez le premier terme." },
          { step: "Deuxième terme : -0 × (...)", explanation: "Le terme du milieu est zéro, on l'ignore." },
          { step: "Troisième terme : 1 × ( (3)(2) - (-1)(0) )", explanation: "Multipliez 1 par le déterminant de son mineur 2x2." },
          { step: "1 × (6 - 0) = 6", explanation: "Évaluez le troisième terme." },
          { step: "Total : -12 - 0 + 6 = -6", explanation: "Additionnez les termes." }
        ]
      },
      de: {
        title: "3×3 Determinante",
        description: "Berechne die Determinante:\n$$A = \\begin{pmatrix} 2 & 0 & 1 \\\\ 3 & -1 & 4 \\\\ 0 & 2 & -2 \\end{pmatrix}$$",
        hint: "Entwickle nach der ersten Zeile: a(ei-fh) - b(di-fg) + c(dh-eg).",
        solution: "$$\\det(A) = -6$$",
        steps: [
          { step: "Erster Term: 2 × ( (-1)(-2) - (4)(2) )", explanation: "Multipliziere 2 mit der Determinante ihrer 2x2 Untermatrix." },
          { step: "2 × (2 - 8) = 2 × (-6) = -12", explanation: "Werte den ersten Term aus." },
          { step: "Zweiter Term: -0 × (...)", explanation: "Der mittlere Term ist null, daher überspringen wir ihn." },
          { step: "Dritter Term: 1 × ( (3)(2) - (-1)(0) )", explanation: "Multipliziere 1 mit der Determinante ihrer 2x2 Untermatrix." },
          { step: "1 × (6 - 0) = 6", explanation: "Werte den dritten Term aus." },
          { step: "Gesamt: -12 - 0 + 6 = -6", explanation: "Addiere alle Terme." }
        ]
      },
      pl: {
        title: "Wyznacznik 3×3",
        description: "Oblicz wyznacznik:\n$$A = \\begin{pmatrix} 2 & 0 & 1 \\\\ 3 & -1 & 4 \\\\ 0 & 2 & -2 \\end{pmatrix}$$",
        hint: "Zastosuj rozwinięcie Laplace'a dla pierwszego wiersza: a(ei-fh) - b(di-fg) + c(dh-eg).",
        solution: "$$\\det(A) = -6$$",
        steps: [
          { step: "Pierwszy człon: 2 × ( (-1)(-2) - (4)(2) )", explanation: "Pomnóż 2 przez wyznacznik minora 2x2." },
          { step: "2 × (2 - 8) = 2 × (-6) = -12", explanation: "Oblicz pierwszy człon." },
          { step: "Drugi człon: -0 × (...)", explanation: "Środkowy człon to zero, więc go pomijamy." },
          { step: "Trzeci człon: 1 × ( (3)(2) - (-1)(0) )", explanation: "Pomnóż 1 przez wyznacznik minora 2x2." },
          { step: "1 × (6 - 0) = 6", explanation: "Oblicz trzeci człon." },
          { step: "Suma: -12 - 0 + 6 = -6", explanation: "Zsumuj wszystkie człony." }
        ]
      },
      ro: {
        title: "Determinant 3×3",
        description: "Calculează determinantul:\n$$A = \\begin{pmatrix} 2 & 0 & 1 \\\\ 3 & -1 & 4 \\\\ 0 & 2 & -2 \\end{pmatrix}$$",
        hint: "Dezvoltă după prima linie: a(ei-fh) - b(di-fg) + c(dh-eg).",
        solution: "$$\\det(A) = -6$$",
        steps: [
          { step: "Primul termen: 2 × ( (-1)(-2) - (4)(2) )", explanation: "Înmulțește 2 cu determinantul minorului său 2x2." },
          { step: "2 × (2 - 8) = 2 × (-6) = -12", explanation: "Evaluează primul termen." },
          { step: "Al doilea termen: -0 × (...)", explanation: "Termenul din mijloc este zero, deci îl sărim." },
          { step: "Al treilea termen: 1 × ( (3)(2) - (-1)(0) )", explanation: "Înmulțește 1 cu determinantul minorului său 2x2." },
          { step: "1 × (6 - 0) = 6", explanation: "Evaluează al treilea termen." },
          { step: "Total: -12 - 0 + 6 = -6", explanation: "Adună toți termenii." }
        ]
      }
    }
  }
];