import { title } from "process";

export const linearAlgebraCourse = {
    en: {
        matrixBasics: {
            title: "Matrix Basics",
            description: "Understanding matrix definitions, types, and operations.",

            lessons: {
                lesson1: {
                    title1: "What is a Matrix?",
                    def1_1: "A matrix is a rectangular array of real numbers. An m x n matrix is an array having m rows and n columns such as:",
                    ex1_1: ` A = \\begin{bmatrix}a_{11} & a_{12} & \\cdots & a_{1n} \\\\ a_{21} & a_{22} & \\cdots & a_{2n} \\\\ \\vdots & \\vdots & \\ddots & \\vdots \\\\ a_{m1} & a_{m2} & \\cdots & a_{mn} \\end{bmatrix}`,
                    expl1_1: "if m = n, we say A is square matrix of degree n. The set of all m x n matrices with real entities will be denoted by \\mathbb{R}^{m \\times n}.",
                    title2: "Matrix Addition and Vectors",
                    def1_2: "The matrix sum (or simply sum) of A + B of two m x n matrices A and B is defined to be the m x n matrix C such that \\c_ij = a_ij + b_ij for all i and j. The scalar multiple \\lambda A of A by a real number \\lambda is the matrix obdained by multiplying each entry of A by \\lambda.",
                    ex1_2: `Here we have two matrices A and B. Let
                    A = \\begin{bmatrix}1 & 0 & 0 &2 \\\\ 0 & 1 & 0 & 3 \\\\ 0 & 0 & 1 & 4 \\end{bmatrix}, and B = \\begin{bmatrix}0 & 1 & 0 & 5 \\\\ 1 & 0 & 1 & 6 \\\\ 0 & 0 & 0 & 7 \\end{bmatrix}. Then,
                    Then A + B = \\begin{bmatrix}1 & 1 & 0 & 7 \\\\ 1 & 1 & 1 & 9 \\\\ 0 & 0 & 1 & 11 \\end{bmatrix}
                    Doubling A gives 2A = \\begin{bmatrix}2 & 0 & 0 & 4 \\\\ 0 & 2 & 0 & 6 \\\\ 0 & 0 & 2 & 8 \\end{bmatrix}`,

                }
            }
        }
    }
}