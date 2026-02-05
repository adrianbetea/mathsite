import { e } from "mathjs";
import { title } from "process";

export const linearAlgebraCourse = {
    en: {
        matrixBasics: {
            title: "Matrix Basics",
            description: "Understanding matrix definitions, types, and operations.",
            lessons: {
                lesson1_title: "Matrix Basics",
                lesson1: {
                    section1: {
                        title1: "What is a Matrix?",
                        def1_1: "A matrix is a rectangular array of real numbers. An m x n matrix is an array having m rows and n columns such as:",
                        ex1_1: ` A = \\begin{bmatrix}a_{11} & a_{12} & \\cdots & a_{1n} \\\\ a_{21} & a_{22} & \\cdots & a_{2n} \\\\ \\vdots & \\vdots & \\ddots & \\vdots \\\\ a_{m1} & a_{m2} & \\cdots & a_{mn} \\end{bmatrix}`,
                        expl1_1: "if m = n, we say A is square matrix of degree n. The set of all m x n matrices with real entities will be denoted by \\mathbb{R}^{m \\times n}.",
                    },
                    section2: {
                        title2: "Matrix Addition and Vectors",
                        def1_2: "The matrix sum (or simply sum) of A + B of two m x n matrices A and B is defined to be the m x n matrix C such that c_{ij} = a_{ij} + b_{ij} for all i and j. The scalar multiple \\lambda A of A by a real number \\lambda is the matrix obdained by multiplying each entry of A by \\lambda.",
                        ex1_2: `Here we have two matrices A and B. Let
                        A = \\begin{bmatrix}1 & 0 & 0 &2 \\\\ 0 & 1 & 0 & 3 \\\\ 0 & 0 & 1 & 4 \\end{bmatrix}, and B = \\begin{bmatrix}0 & 1 & 0 & 5 \\\\ 1 & 0 & 1 & 6 \\\\ 0 & 0 & 0 & 7 \\end{bmatrix}. Then,
                        Then A + B = \\begin{bmatrix}1 & 1 & 0 & 7 \\\\ 1 & 1 & 1 & 9 \\\\ 0 & 0 & 1 & 11 \\end{bmatrix}`,
                        ex1_3: `Doubling A gives 2A = \\begin{bmatrix}2 & 0 & 0 & 4 \\\\ 0 & 2 & 0 & 6 \\\\ 0 & 0 & 2 & 8 \\end{bmatrix}`,
                    },
                    section3: {
                        title3: "Matrix Multiplication",
                        def1_3: "We have already defined the sum of two matrices and the scalar multiply of a matrix by a real number. We will now define matrix multiplication. The product AB of two matrices A and B is defined only when the number of columns of A equals the number of rows of B. Suppose A = (\\mathbf{a}_1, \\mathbf{a}_2, \\cdots, \\mathbf{a}_n) is an m x n matrix and B is an n x p matrix with columns \\mathbf{b}_1, \\mathbf{b}_2, \\cdots, \\mathbf{b}_p. Then the product AB is the m x p matrix whose j-th column is A\\mathbf{b}_j for j = 1, 2, \\cdots, p.",
                        def1_3_2: "In other words, if AB = C, then the entry c_{ij} of C is obtained by multiplying the i-th row of A by the j-th column of B. That is, c_{ij} = \\sum_{k=1}^{n} a_{ik}  b_{kj}.",
                        text1_3: "Note that in general, matrix multiplication is not commutative. That is, AB \\ne BA in general.",
                        text2_3: "Here we have two examples of matrix multiplication.",
                        ex1_3: `\\begin{bmatrix} 1 & 3 \\\\ 0 & 2 \\end{bmatrix} \\begin{bmatrix} 4 & 5 \\\\ 6 & 7 \\end{bmatrix} = \\begin{bmatrix} 1 \\cdot 4 + 3 \\cdot 6 & 1 \\cdot 5 + 3 \\cdot 7 \\\\ 0 \\cdot 4 + 2 \\cdot 6 & 0 \\cdot 5 + 2 \\cdot 7 \\end{bmatrix} = \\begin{bmatrix} 22 & 26 \\\\ 12 & 14 \\end{bmatrix}`,
                        ex1_3_2: `\\begin{bmatrix} 2 & 0 & 1 \\\\ 3 & 4 & 5 \\end{bmatrix} \\begin{bmatrix} 1 & 2 \\\\ 0 & 1 \\\\ 4 & 0 \\end{bmatrix} = \\begin{bmatrix} 2 \\cdot 1 + 0 \\cdot 0 + 1 \\cdot 4 & 2 \\cdot 2 + 0 \\cdot 1 + 1 \\cdot 0 \\\\ 3 \\cdot 1 + 4 \\cdot 0 + 5 \\cdot 4 & 3 \\cdot 2 + 4 \\cdot 1 + 5 \\cdot 0 \\end{bmatrix} = \\begin{bmatrix} 6 & 4 \\\\ 23 & 10 \\end{bmatrix}`,
                    },
                    section4: {
                        title4: "Transpose of a Matrix",
                        def1_4: " The transpose of an m x n matrix A is the n x m matrix A^T obtained by interchanging the rows and columns of A. That is, if A = (a_{ij}), then A^T = (b_{ij}), where b_{ij} = a_{ji} for all i and j.",
                        ex1_4: `If A = \\begin{bmatrix}1 & 2 & 3 \\\\ 4 & 5 & 6 \\end{bmatrix}, \\text{ then } A^T = \\begin{bmatrix}1 & 4 \\\\ 2 & 5 \\\\ 3 & 6 \\end{bmatrix}`,
                        def2_4: "A matrix A is called symmetric if A = A^T. A matrix A is called skew-symmetric if A^T = -A.",
                        proposition1_4: "Let A and B be m x n matrices. Then the following statements hold:",
                        item1_4: '1. (A^T)^T = A',
                        item2_4: '2. (A^T + B^T) = A^T + B^T',
                        item3_4: '3. (AB)^T = B^T A^T',
                    },
                    section5: {
                        title5: "Algebra of Matrices",
                        def1_5: "Except for the commutativity of multiplication, the usual laws of algebra hold for matrices.",
                        proposition1_5: "Assuming all the sums and products are defined, then matrix addition and multiplication satisfy the following properties:",
                        item1_5: "1. A + B = B + A (Commutative Law of Addition)",
                        item2_5: "2. (A + B) + C = A + (B + C) (Associative Law of Addition)",
                        item3_5: "3. A(B C) = (AB)C (Associative Law of Multiplication)",
                        item4_5: "4. A(B + C) = AB + AC (Distributive Law 1)",
                        item5_5: "5. (A + B)C = AC + BC (Distributive Law 2)",
                        item6_5: "6. I_m A = A and A I_n = A (Multiplicative Identity)",
                    },
                    example_section: {
                        title_ex: "Examples with Step-by-Step Solutions",
                        
                        // Example 1: Scalar Multiplication & Subtraction
                        example1: {
                            title: "1. Linear Combination of Matrices",
                            problem: `Given A = \\begin{bmatrix} 2 & -1 \\\\ 0 & 3 \\end{bmatrix} \\text{ and } B = \\begin{bmatrix} 1 & 4 \\\\ 5 & -2 \\end{bmatrix}, \\text{ find } 2A - B.`,
                            step1_title: "Step 1: Perform Scalar Multiplication",
                            step1_desc: "First, multiply every element in matrix A by the scalar 2.",
                            step1_math: `2A = 2\\begin{bmatrix} 2 & -1 \\\\ 0 & 3 \\end{bmatrix} = \\begin{bmatrix} 4 & -2 \\\\ 0 & 6 \\end{bmatrix}`,
                            step2_title: "Step 2: Perform Matrix Subtraction",
                            step2_desc: "Subtract the corresponding elements of B from 2A.",
                            step2_math: `\\begin{bmatrix} 4 & -2 \\\\ 0 & 6 \\end{bmatrix} - \\begin{bmatrix} 1 & 4 \\\\ 5 & -2 \\end{bmatrix} = \\begin{bmatrix} 4-1 & -2-4 \\\\ 0-5 & 6-(-2) \\end{bmatrix}`,
                            result_title: "Final Answer",
                            result: `\\begin{bmatrix} 3 & -6 \\\\ -5 & 8 \\end{bmatrix}`
                        },

                        // Example 2: Matrix Multiplication (The Dot Product)
                        example2: {
                            title: "2. Matrix Multiplication",
                            problem: `Compute the product AB where A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix} \\text{ and } B = \\begin{bmatrix} 2 & 0 \\\\ 1 & -1 \\end{bmatrix}.`,
                            step1_title: "Step 1: Check Dimensions",
                            step1_desc: "A is 2x2 and B is 2x2. The inner dimensions match (2=2), so the result will be a 2x2 matrix.",
                            step2_title: "Step 2: Calculate Rows by Columns",
                            step2_desc: "Multiply Row 1 of A by Column 1 of B:",
                            step2_math: `c_{11} = (1)(2) + (2)(1) = 2 + 2 = 4`,
                            step3_title: "Step 3: Calculate Remaining Entries",
                            step3_math: `c_{12} = (1)(0) + (2)(-1) = -2 \\\\ c_{21} = (3)(2) + (4)(1) = 10 \\\\ c_{22} = (3)(0) + (4)(-1) = -4`,
                            result_title: "Final Answer",
                            result: `AB = \\begin{bmatrix} 4 & -2 \\\\ 10 & -4 \\end{bmatrix}`
                        },

                        // Example 3: Transpose Operation
                        example3: {
                            title: "3. Transpose of a Non-Square Matrix",
                            problem: `Find the transpose A^T of matrix A = \\begin{bmatrix} 1 & 2 & 0 \\\\ 3 & 5 & 9 \\end{bmatrix}.`,
                            step1_title: "Step 1: Identify Dimensions",
                            step1_desc: "Matrix A has 2 rows and 3 columns (2x3). The transpose A^T will flip these dimensions to become 3x2.",
                            step2_title: "Step 2: Swap Rows and Columns",
                            step2_desc: "Row 1 of A becomes Column 1 of A^T. Row 2 of A becomes Column 2 of A^T.",
                            step2_math: `\\text{Row 1 } [1, 2, 0] \\rightarrow \\text{Column 1} \\\\ \\text{Row 2 } [3, 5, 9] \\rightarrow \\text{Column 2}`,
                            result_title: "Final Answer",
                            result: `A^T = \\begin{bmatrix} 1 & 3 \\\\ 2 & 5 \\\\ 0 & 9 \\end{bmatrix}`
                        }
                    },
                }
            }
        },
        determinants: {
            title: "Determinants",
            description: "Learn how to calculate determinants and their properties.",
            lessons: {
                lesson2_title: "Determinants",
                lesson2: {
                    section1: {
                        title1: "Introduction to Determinants",
                        def1_1: "The determinant is a scalar value that can be computed from the elements of a square matrix and encodes certain properties of the linear transformation described by the matrix.",
                        def2_2: "The determinant det(A) of A is defined to be",
                        def2_2_formula: `det(A) := \\sum_{\\pi \\in S_n} \\text{sgn}(\\pi) \\, a_{\\pi(1),1} a_{\\pi(2),2} \\cdots a_{\\pi(n),n}`,
                        def2_2_explanation: "where:",
                        def2_2_item1_1: " \\sum_{\\pi \\in S_n}: Summation over all possible permutations (\\pi) in the symmetric group S_{n} (all ways to order n numbers).",
                        def2_2_item1_2: "\\text{sgn}(\\pi): The sign of the permutation (+1 for even permutations, -1 for odd permutations).",
                        def2_2_item1_3: "a_{\\pi(i),i}: The specific matrix entries selected by the permutation function \\pi(i) for each column i.",
                        text_1_1: "Suppose that A is 2 x 2. There are only two elements in S_{2}: the identity permutation (1 2) and the transposition (2 1). Thus, by definition:",
                        ex1_1: "det \\begin{bmatrix} a_{11} a_{12} \\\\ a_{21} a_{22} \\end{bmatrix} = a_{11}a_{22} - a_{12}a_{21}",
                    },
                    section2: {
                        title2: "2 x 2 and 3 x 3 Determinants",
                        def1_2: "The determinant of a 2 x 2 matrix A = \\begin{bmatrix} a_{11} & a_{12} \\\\ a_{21} & a_{22} \\end{bmatrix} is given by det(A) = a_{11}a_{22} - a_{12}a_{21}.",
                        ex1_2: "For example, given A = \\begin{bmatrix} 3 & 5 \\\\ 2 & 4 \\end{bmatrix}, we have det(A) = (3)(4) - (5)(2) = 12 - 10 = 2.",
                        def2_2: "The determinant of a 3 x 3 matrix A = \\begin{bmatrix} a_{11} & a_{12} & a_{13} \\\\ a_{21} & a_{22} & a_{23} \\\\ a_{31} & a_{32} & a_{33} \\end{bmatrix} is given by:",
                        def2_2_formula: `det(A) = a_{11}(a_{22}a_{33} - a_{23}a_{32}) - a_{12}(a_{21}a_{33} - a_{23}a_{31}) + a_{13}(a_{21}a_{32} - a_{22}a_{31})`,
                        ex2_2: "For example, given A = \\begin{bmatrix} 1 & 2 & 3 \\\\ 0 & 4 & 5 \\\\ 1 & 0 & 6 \\end{bmatrix}, we have det(A) = 1(4*6 - 5*0) - 2(0*6 - 5*1) + 3(0*0 - 4*1) = 24 + 10 - 12 = 22.",

                    },
                    section3: {
                        titl3: "Cofactor Expansion (Laplace Expansion)",
                        def1_3: "The cofactor C_{ij} of an element a_{ij} in a square matrix A is defined as C_{ij} = (-1)^{i+j} M_{ij}, where M_{ij} is the minor of a_{ij}, obtained by deleting the i-th row and j-th column from A.",
                        def2_3: "The determinant of an n x n matrix A can be computed using cofactor expansion along any row or column. For expansion along the i-th row, we have:",
                        def2_3_formula: `det(A) = \\sum_{i=1}^{n} (-1)^{i+j} a_{ij} det(A_{ij})`,
                        def2_3_explanation: `This is the Laplace expansion along the i-th row, where A_{ij} is the (n-1) x (n-1) matrix obtained by deleting the i-th row and j-th column from A.`,
                        ex1_3: "For example, for the matrix A = \\begin{bmatrix} 1 & 2 & 3 \\\\ 0 & 4 & 5 \\\\ 1 & 0 & 6 \\end{bmatrix} expanding along the first row gives ",
                        ex1_3_end:"det(A) = 1 * C_{11} + 2 * C_{12} + 3 * C_{13} = 1 * det\\begin{bmatrix}4 & 5 \\\\ 0 & 6\\end{bmatrix} - 2 * det\\begin{bmatrix}0 & 5 \\\\ 1 & 6\\end{bmatrix} + 3 * det\\begin{bmatrix}0 & 4 \\\\ 1 & 0\\end{bmatrix} = 24 + 10 - 12 = 22.",
                    },
                    section4: {
                        title4: "Properties of Determinants",
                        description: "The determinant satisfies several algebraic proprieties that make calculation easier and provide insights into the matrix.",
                        prop1_name: "Multiplicativity",
                        prop1_description: "The determinant of the product of two square matrices equals the product of their determinants:",
                        prop1_formula: `det(AB) = det(A) \\cdot det(B)`,
                        prop2_name: "Invertibility",
                        prop2_description: "A matrix is invertible (non-singular) if and only if its determinant is non-zero:",
                        prop2_formula: `A \\text{ is invertible } \\iff det(A) \\ne 0`,
                        prop3_name: "Invariance under Transpose",
                        prop3_description: "The determinant of a matrix is equal to the determinant of its transpose:",
                        prop3_formula: `det(A) = det(A^T)`,
                        prop4_name: "Determinant of the Inverse",
                        prop4_description: "If a matrix is invertible, the determinant of its inverse is the reciprocal of the determinant of the matrix:",
                        prop4_formula: `det(A^{-1}) = \\frac{1}{det(A)}`,
                    },
                    example_section: {
                        title_ex: "Examples with Step-by-Step Solutions",
                        ex1: {
                            title: "1. Determinant of a 2x2 Matrix",
                            problem: `Find the determinant of the matrix A = \\begin{bmatrix} 4 & 3 \\\\ 6 & -3 \\end{bmatrix}.`,
                            step1_title: "Step 1: Identify the Elements",
                            step1_desc: "The elements of the matrix are a_{11} = 4, a_{12} = 3, a_{21} = 6, and a_{22} = -3.",
                            step2_title: "Step 2: Apply the Determinant Formula",
                            step2_desc: "Use the formula for the determinant of a 2x2 matrix: det(A) = a_{11}a_{22} - a_{12}a_{21}.",
                            step2_math: `det(A) = (4)(-3) - (3)(6)`,
                            result_title: "Final Answer",
                            result: `det(A) = -12 - 18 = -30`
                        },
                        ex2: {
                            title: "2. Determinant of a 3x3 Matrix (Cofactor Expansion)",
                            problem: `Calculate the determinant of A = \\begin{bmatrix} 1 & 5 & 0 \\\\ 2 & 4 & -1 \\\\ 0 & -2 & 0 \\end{bmatrix}.`,
                            step1_title: "Step 1: Choose a Row or Column",
                            step1_desc: "We can expand along any row or column. To simplify calculation, pick the one with the most zeros. Here, Column 3 has two zeros.",
                            step1_math: `\\det(A) = a_{13}C_{13} + a_{23}C_{23} + a_{33}C_{33}`,
                            step2_title: "Step 2: Calculate the Non-Zero Minor",
                            step2_desc: "Only the middle term is non-zero (where a_{23} = -1). We find the minor by ignoring Row 2 and Column 3.",
                            step2_math: `\\text{Minor} = \\det \\begin{bmatrix} 1 & 5 \\\\ 0 & -2 \\end{bmatrix} = (1)(-2) - (5)(0) = -2`,
                            step3_title: "Step 3: Apply Signs and Solve",
                            step3_desc: "The cofactor sign for position (2,3) is negative (-).",
                            result_title: "Final Answer",
                            result: `\\det(A) = -1 \\times (-\\text{Minor}) = (-1) \\times -(-2) = -2`
                        },
                        ex3: {
                            title: "3. Determinant of a Triangular Matrix",
                            problem: `Find the determinant of the upper triangular matrix B = \\begin{bmatrix} 2 & 7 & -3 \\\\ 0 & -4 & 5 \\\\ 0 & 0 & 3 \\end{bmatrix}.`,
                            step1_title: "Step 1: Identify the Matrix Type",
                            step1_desc: "Notice that all entries below the main diagonal are zero. This is an Upper Triangular matrix.",
                            step2_title: "Step 2: Use the Diagonal Property",
                            step2_desc: "For any triangular matrix (upper or lower), the determinant is simply the product of the entries on the main diagonal.",
                            step2_math: `\\det(B) = b_{11} \\times b_{22} \\times b_{33}`,
                            result_title: "Final Answer",
                            result: `\\det(B) = 2 \\times (-4) \\times 3 = -24`
                        }
                    }
                }
            }
        },
        matrixInverse: {
            title: "Matrix Inverse",
            description: "Learn how to find the inverse of a matrix and its applications.",
            lessons: {
                lesson3_title: "Matrix Inverse",
                lesson3: {
                    section1: {
                        title1: "Definition of Matrix Inverse",
                        def1_1: "Suppose two n x n matrices A and B have the propriety that AB = BA = I_n, where I_n is the n x n identity matrix. Then we say that A is invertible (or non-singular) and B is the inverse of A, denoted by A^{-1}. In other words, A^{-1} is the unique matrix such that A A^{-1} = A^{-1} A = I_n.",
                        proposition1_1: "Proposition: Suppose A in R^{n x n} or A in F_2^{n x n}. and A has an inverse B. Then B is unique.",
                        proof1_1: "Proof: Suppose that A has two inverses B and C. Then",
                        proof1_1_math: `B = B I_n = B(AC) = (BA)C = I_n C = C`,
                        expl1_1: "Thus, B = C, and the inverse is unique.",
                        ex1_1: "For example, the inverses of the 2 x 2 elementary matrices are as follows:",
                        ex1_1_list1: "E_1 = \\begin{bmatrix} 0 & 1 \\\\ 1 & 0 \\end{bmatrix} \\Rightarrow E_1^{-1} = \\begin{bmatrix} 0 & 1 \\\\ 1 & 0 \\end{bmatrix}",
                        ex1_1_list2: "E_2 = \\begin{bmatrix} k & 0 \\\\ 0 & 1 \\end{bmatrix} \\Rightarrow E_2^{-1} = \\begin{bmatrix} \\frac{1}{k} & 0 \\\\ 0 & 1 \\end{bmatrix}, k \\ne 0",
                        ex1_1_list3: "E_3 = \\begin{bmatrix} 1 & 0 \\\\ k & 1 \\end{bmatrix} \\Rightarrow E_3^{-1} = \\begin{bmatrix} 1 & 0 \\\\ -k & 1 \\end{bmatrix}",
                    },
                    section2: {
                        title2: "Methods for Finding the Inverse (Inverse Computation and Adjugate Method)",
                        def1_2: "We have two ways of finding the matrix B so that B A = I_n. The first method is simply to multiply the sequence of elementary matrice which row reduces A to I_n. The second method is to form the augmented matrix (A | I_n) and row reduce. The final result will be in the form (I_n | B). This is the method used in most textbooks.",
                        text1_2: "Here we have an example.",
                        method1_1: "Method 1: Inverse Computation",
                        ex1_2: `Suppose we want to find an inverse for`,
                        ex1_2_matrix: `A = \\begin{bmatrix} 1 & 2 & 0 \\\\ 1 & 3 & 1 \\\\0 & 1 & 2 \\end{bmatrix}`,
                        ex1_2_steps1: "Since we only need to solve the matrix equation XA = I_3, we can use our previous strategy of row reducing (A | I_3).",
                        ex1_2_steps2: `(A | I_3) = \\begin{bmatrix} 1 & 2 & 0 & | & 1 & 0 & 0 \\\\ 1 & 3 & 1 & | & 0 & 1 & 0 \\\\ 0 & 1 & 2 & | & 0 & 0 & 1 \\end{bmatrix} \\xrightarrow{R_2 - R_1} \\begin{bmatrix} 1 & 2 & 0 & | & 1 & 0 & 0 \\\\ 0 & 1 & 1 & | & -1 & 1 & 0 \\\\ 0 & 1 & 2 & | & 0 & 0 & 1 \\end{bmatrix} \\xrightarrow{R_3 - R_2}`,
                        ex1_2_steps3: `\\begin{bmatrix} 1 & 2 0 & | & 1 & 0 & 0 \\\\ 0 & 1 & 1 & | & -1 & 1 & 0 \\\\ 0 & 0 & 1 & | & 1 & -1 & 1 \\end{bmatrix} \\xrightarrow{R_2 - R_3} \\begin{bmatrix} 1 & 2 & 0 & | & 1 & 0 & 0 \\\\ 0 & 1 & 0 & | & -2 & 2 & -1 \\\\ 0 & 0 & 1 & | & 1 & -1 & 1 \\end{bmatrix} \\xrightarrow{R_1 - 2R_2}`,
                        ex1_2_steps4: `\\begin{bmatrix} 1 & 0 & 0 & | & 5 & -4 & 2 \\\\ 0 & 1 & 0 & | & -2 & 2 & -1 \\\\ 0 & 0 & 1 & | & 1 & -1 & 1 \\end{bmatrix}`,
                        ex1_2_result: `Thus, A^{-1} = \\begin{bmatrix} 5 & -4 & 2 \\\\ -2 & 2 & -1 \\\\ 1 & -1 & 1 \\end{bmatrix}`,
                        method2_1: "Method 2: Adjugate Method",
                        ex2_2: `Alternatively, we can use the adjugate method. We first compute the matrix of cofactors, then take its transpose to get the adjugate, and finally divide by the determinant of A to get the inverse.`,
                        ex2_2_steps1: "Calculate the determinant of A.",
                        ex2_2_steps1_math: `det(A) = 1(3*2 - 1*1) - 2(1*2 - 0*1) + 0(1*1 - 3*0) = 1`,
                        ex2_2_steps2: "Find the matrix of minors, then the matrix of cofactors.",
                        ex2_2_steps2_math: `\\text{Minors} = \\begin{bmatrix} 5 & 2 & -1 \\\\ 2 & 2 & -1 \\\\ -1 & 1 & 1 \\end{bmatrix}, \\quad \\text{Cofactors} = \\begin{bmatrix} 5 & -2 & -1 \\\\ -2 & 2 & 1 \\\\ -1 & -1 & 1 \\end{bmatrix}`,
                        ex2_2_steps3: "Transpose the matrix of cofactors to get the adjugate.",
                        ex2_2_steps3_math: `\\text{Adj}(A) = \\begin{bmatrix} 5 & -2 & -1 \\\\ -2 & 2 & -1 \\\\ -1 & 1 & 1 \\end{bmatrix}`,
                        ex2_2_steps4: "Finally, divide the adjugate by the determinant to get the inverse.",
                        ex2_2_result: `A^{-1} = \\frac{1}{det(A)} \\text{Adj}(A) = \\begin{bmatrix} 5 & -2 & -1 \\\\ -2 & 2 & -1 \\\\ -1 & 1 & 1 \\end{bmatrix}`,
                        // Verify the second method because it was autogenerated and may contain errors

                    }
                }
            }
        }
    },
    es: {
        matrixBasics: {
            title: "Conceptos Básicos de Matrices",
            description: "Entendiendo definiciones de matrices, tipos y operaciones.",
            lessons: {
                lesson1_title: "Conceptos Básicos de Matrices",
                lesson1: {
                    section1: {
                        title1: "¿Qué es una Matriz?",
                        def1_1: "Una matriz es un arreglo rectangular de números reales. Una matriz m x n es un arreglo que tiene m filas y n columnas, tal como:",
                        ex1_1: ` A = \\begin{bmatrix}a_{11} & a_{12} & \\cdots & a_{1n} \\\\ a_{21} & a_{22} & \\cdots & a_{2n} \\\\ \\vdots & \\vdots & \\ddots & \\vdots \\\\ a_{m1} & a_{m2} & \\cdots & a_{mn} \\end{bmatrix}`,
                        expl1_1: "si m = n, decimos que A es una matriz cuadrada de grado n. El conjunto de todas las matrices m x n con entradas reales se denota por \\mathbb{R}^{m \\times n}.",
                    },
                    section2: {
                        title2: "Suma de Matrices y Vectores",
                        def1_2: "La suma matricial (o simplemente suma) A + B de dos matrices A y B de tamaño m x n se define como la matriz C de m x n tal que c_{ij} = a_{ij} + b_{ij} para todo i y j. El múltiplo escalar \\lambda A de A por un número real \\lambda es la matriz obtenida multiplicando cada entrada de A por \\lambda.",
                        ex1_2: `Aquí tenemos dos matrices A y B. Sean
                        A = \\begin{bmatrix}1 & 0 & 0 &2 \\\\ 0 & 1 & 0 & 3 \\\\ 0 & 0 & 1 & 4 \\end{bmatrix}, y B = \\begin{bmatrix}0 & 1 & 0 & 5 \\\\ 1 & 0 & 1 & 6 \\\\ 0 & 0 & 0 & 7 \\end{bmatrix}. Entonces,
                        A + B = \\begin{bmatrix}1 & 1 & 0 & 7 \\\\ 1 & 1 & 1 & 9 \\\\ 0 & 0 & 1 & 11 \\end{bmatrix}`,
                        ex1_3: `Duplicar A nos da 2A = \\begin{bmatrix}2 & 0 & 0 & 4 \\\\ 0 & 2 & 0 & 6 \\\\ 0 & 0 & 2 & 8 \\end{bmatrix}`,
                    },
                    section3: {
                        title3: "Multiplicación de Matrices",
                        def1_3: "Ya hemos definido la suma de dos matrices y el múltiplo escalar de una matriz por un número real. Ahora definiremos la multiplicación de matrices. El producto AB de dos matrices A y B está definido solo cuando el número de columnas de A es igual al número de filas de B. Suponga que A = (\\mathbf{a}_1, \\mathbf{a}_2, \\cdots, \\mathbf{a}_n) es una matriz m x n y B es una matriz n x p con columnas \\mathbf{b}_1, \\mathbf{b}_2, \\cdots, \\mathbf{b}_p. Entonces el producto AB es la matriz m x p cuya j-ésima columna es A\\mathbf{b}_j para j = 1, 2, \\cdots, p.",
                        def1_3_2: "En otras palabras, si AB = C, entonces la entrada c_{ij} de C se obtiene multiplicando la i-ésima fila de A por la j-ésima columna de B. Es decir, c_{ij} = \\sum_{k=1}^{n} a_{ik}  b_{kj}.",
                        text1_3: "Note que en general, la multiplicación de matrices no es conmutativa. Es decir, AB \\ne BA en general.",
                        text2_3: "Aquí tenemos dos ejemplos de multiplicación de matrices.",
                        ex1_3: `\\begin{bmatrix} 1 & 3 \\\\ 0 & 2 \\end{bmatrix} \\begin{bmatrix} 4 & 5 \\\\ 6 & 7 \\end{bmatrix} = \\begin{bmatrix} 1 \\cdot 4 + 3 \\cdot 6 & 1 \\cdot 5 + 3 \\cdot 7 \\\\ 0 \\cdot 4 + 2 \\cdot 6 & 0 \\cdot 5 + 2 \\cdot 7 \\end{bmatrix} = \\begin{bmatrix} 22 & 26 \\\\ 12 & 14 \\end{bmatrix}`,
                        ex1_3_2: `\\begin{bmatrix} 2 & 0 & 1 \\\\ 3 & 4 & 5 \\end{bmatrix} \\begin{bmatrix} 1 & 2 \\\\ 0 & 1 \\\\ 4 & 0 \\end{bmatrix} = \\begin{bmatrix} 2 \\cdot 1 + 0 \\cdot 0 + 1 \\cdot 4 & 2 \\cdot 2 + 0 \\cdot 1 + 1 \\cdot 0 \\\\ 3 \\cdot 1 + 4 \\cdot 0 + 5 \\cdot 4 & 3 \\cdot 2 + 4 \\cdot 1 + 5 \\cdot 0 \\end{bmatrix} = \\begin{bmatrix} 6 & 4 \\\\ 23 & 10 \\end{bmatrix}`,
                    },
                    section4: {
                        title4: "Transpuesta de una Matriz",
                        def1_4: " La transpuesta de una matriz A de m x n es la matriz A^T de n x m obtenida intercambiando las filas y columnas de A. Es decir, si A = (a_{ij}), entonces A^T = (b_{ij}), donde b_{ij} = a_{ji} para todo i y j.",
                        ex1_4: `\\text{Si A} = \\begin{bmatrix}1 & 2 & 3 \\\\ 4 & 5 & 6 \\end{bmatrix}, \\text{ entonces } A^T = \\begin{bmatrix}1 & 4 \\\\ 2 & 5 \\\\ 3 & 6 \\end{bmatrix}`,
                        def2_4: "Una matriz A se llama simétrica si A = A^T. Una matriz A se llama antisimétrica si A^T = -A.",
                        proposition1_4: "Sean A y B matrices de m x n. Entonces se cumplen las siguientes afirmaciones:",
                        item1_4: '1. (A^T)^T = A',
                        item2_4: '2. (A^T + B^T) = A^T + B^T',
                        item3_4: '3. (AB)^T = B^T A^T',
                    },
                    section5: {
                        title5: "Álgebra de Matrices",
                        def1_5: "Excepto por la conmutatividad de la multiplicación, las leyes usuales del álgebra se aplican a las matrices.",
                        proposition1_5: "Asumiendo que todas las sumas y productos están definidos, la suma y multiplicación de matrices satisfacen las siguientes propiedades:",
                        item1_5: "1. A + B = B + A (Ley Conmutativa de la Adición)",
                        item2_5: "2. (A + B) + C = A + (B + C) (Ley Asociativa de la Adición)",
                        item3_5: "3. A(B C) = (AB)C (Ley Asociativa de la Multiplicación)",
                        item4_5: "4. A(B + C) = AB + AC (Ley Distributiva 1)",
                        item5_5: "5. (A + B)C = AC + BC (Ley Distributiva 2)",
                        item6_5: "6. I_m A = A y A I_n = A (Identidad Multiplicativa)",
                    },
                    example_section: {
                        title_ex: "Ejemplos con Soluciones Paso a Paso",
                        
                        example1: {
                            title: "1. Combinación Lineal de Matrices",
                            problem: `Dadas A = \\begin{bmatrix} 2 & -1 \\\\ 0 & 3 \\end{bmatrix} \\text{ y } B = \\begin{bmatrix} 1 & 4 \\\\ 5 & -2 \\end{bmatrix}, \\text{ encontrar } 2A - B.`,
                            step1_title: "Paso 1: Realizar Multiplicación Escalar",
                            step1_desc: "Primero, multiplica cada elemento en la matriz A por el escalar 2.",
                            step1_math: `2A = 2\\begin{bmatrix} 2 & -1 \\\\ 0 & 3 \\end{bmatrix} = \\begin{bmatrix} 4 & -2 \\\\ 0 & 6 \\end{bmatrix}`,
                            step2_title: "Paso 2: Realizar Resta Matricial",
                            step2_desc: "Resta los elementos correspondientes de B a 2A.",
                            step2_math: `\\begin{bmatrix} 4 & -2 \\\\ 0 & 6 \\end{bmatrix} - \\begin{bmatrix} 1 & 4 \\\\ 5 & -2 \\end{bmatrix} = \\begin{bmatrix} 4-1 & -2-4 \\\\ 0-5 & 6-(-2) \\end{bmatrix}`,
                            result_title: "Respuesta Final",
                            result: `\\begin{bmatrix} 3 & -6 \\\\ -5 & 8 \\end{bmatrix}`
                        },

                        example2: {
                            title: "2. Multiplicación de Matrices",
                            problem: `Calcular el producto AB donde A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix} \\text{ y } B = \\begin{bmatrix} 2 & 0 \\\\ 1 & -1 \\end{bmatrix}.`,
                            step1_title: "Paso 1: Verificar Dimensiones",
                            step1_desc: "A es 2x2 y B es 2x2. Las dimensiones internas coinciden (2=2), por lo que el resultado será una matriz 2x2.",
                            step2_title: "Paso 2: Calcular Filas por Columnas",
                            step2_desc: "Multiplica la Fila 1 de A por la Columna 1 de B:",
                            step2_math: `c_{11} = (1)(2) + (2)(1) = 2 + 2 = 4`,
                            step3_title: "Paso 3: Calcular Entradas Restantes",
                            step3_math: `c_{12} = (1)(0) + (2)(-1) = -2 \\\\ c_{21} = (3)(2) + (4)(1) = 10 \\\\ c_{22} = (3)(0) + (4)(-1) = -4`,
                            result_title: "Respuesta Final",
                            result: `AB = \\begin{bmatrix} 4 & -2 \\\\ 10 & -4 \\end{bmatrix}`
                        },

                        example3: {
                            title: "3. Transpuesta de una Matriz No Cuadrada",
                            problem: `Encontrar la transpuesta A^T de la matriz A = \\begin{bmatrix} 1 & 2 & 0 \\\\ 3 & 5 & 9 \\end{bmatrix}.`,
                            step1_title: "Paso 1: Identificar Dimensiones",
                            step1_desc: "La matriz A tiene 2 filas y 3 columnas (2x3). La transpuesta A^T invertirá estas dimensiones para convertirse en 3x2.",
                            step2_title: "Paso 2: Intercambiar Filas y Columnas",
                            step2_desc: "La Fila 1 de A se convierte en la Columna 1 de A^T. La Fila 2 de A se convierte en la Columna 2 de A^T.",
                            step2_math: `\\text{Fila 1 } [1, 2, 0] \\rightarrow \\text{Columna 1} \\\\ \\text{Fila 2 } [3, 5, 9] \\rightarrow \\text{Columna 2}`,
                            result_title: "Respuesta Final",
                            result: `A^T = \\begin{bmatrix} 1 & 3 \\\\ 2 & 5 \\\\ 0 & 9 \\end{bmatrix}`
                        }
                    },
                }
            }
        },
        determinants: {
            title: "Determinantes",
            description: "Aprenda a calcular determinantes y sus propiedades.",
            lessons: {
                lesson2_title: "Determinantes",
                lesson2: {
                    section1: {
                        title1: "Introducción a los Determinantes",
                        def1_1: "El determinante es un valor escalar que se puede calcular a partir de los elementos de una matriz cuadrada y codifica ciertas propiedades de la transformación lineal descrita por la matriz.",
                        def2_2: "El determinante det(A) de A se define como",
                        def2_2_formula: `det(A) := \\sum_{\\pi \\in S_n} \\text{sgn}(\\pi) \\, a_{\\pi(1),1} a_{\\pi(2),2} \\cdots a_{\\pi(n),n}`,
                        def2_2_explanation: "donde:",
                        def2_2_item1_1: "\\sum_{\\pi \\in S_n}: Sumatoria sobre todas las permutaciones posibles (\\pi) en el grupo simétrico S_n (todas las formas de ordenar n números).",
                        def2_2_item1_2: "\\text{sgn}(\\pi): El signo de la permutación (+1 para permutaciones pares, -1 para permutaciones impares).",
                        def2_2_item1_3: "a_{\\pi(i),i}: Las entradas específicas de la matriz seleccionadas por la función de permutación \\pi(i) para cada columna i.",
                        text_1_1: "Supongamos que A es 2 x 2. Solo hay dos elementos en S_2: la permutación identidad (1 2) y la transposición (2 1). Así, por definición:",
                        ex1_1: "det \\begin{bmatrix} a_{11} a_{12} \\\\ a_{21} a_{22} \\end{bmatrix} = a_{11}a_{22} - a_{12}a_{21}",
                    },
                    section2: {
                        title2: "Determinantes 2 x 2 y 3 x 3",
                        def1_2: "El determinante de una matriz 2 x 2 A = \\begin{bmatrix} a_{11} & a_{12} \\\\ a_{21} & a_{22} \\end{bmatrix} está dado por det(A) = a_{11}a_{22} - a_{12}a_{21}.",
                        ex1_2: "Por ejemplo, dada A = \\begin{bmatrix} 3 & 5 \\\\ 2 & 4 \\end{bmatrix}, tenemos det(A) = (3)(4) - (5)(2) = 12 - 10 = 2.",
                        def2_2: "El determinante de una matriz 3 x 3 A = \\begin{bmatrix} a_{11} & a_{12} & a_{13} \\\\ a_{21} & a_{22} & a_{23} \\\\ a_{31} & a_{32} & a_{33} \\end{bmatrix} está dado por:",
                        def2_2_formula: `det(A) = a_{11}(a_{22}a_{33} - a_{23}a_{32}) - a_{12}(a_{21}a_{33} - a_{23}a_{31}) + a_{13}(a_{21}a_{32} - a_{22}a_{31})`,
                        ex2_2: "Por ejemplo, dada A = \\begin{bmatrix} 1 & 2 & 3 \\\\ 0 & 4 & 5 \\\\ 1 & 0 & 6 \\end{bmatrix}, tenemos det(A) = 1(4*6 - 5*0) - 2(0*6 - 5*1) + 3(0*0 - 4*1) = 24 + 10 - 12 = 22.",
                    },
                    section3: {
                        titl3: "Expansión por Cofactores (Expansión de Laplace)",
                        def1_3: "El cofactor C_{ij} de un elemento a_{ij} en una matriz cuadrada A se define como C_{ij} = (-1)^{i+j} M_{ij}, donde M_{ij} es el menor de a_{ij}, obtenido eliminando la i-ésima fila y la j-ésima columna de A.",
                        def2_3: "El determinante de una matriz n x n A se puede calcular usando la expansión por cofactores a lo largo de cualquier fila o columna. Para la expansión a lo largo de la i-ésima fila, tenemos:",
                        def2_3_formula: `det(A) = \\sum_{i=1}^{n} (-1)^{i+j} a_{ij} det(A_{ij})`,
                        def2_3_explanation: `Esta es la expansión de Laplace a lo largo de la i-ésima fila, donde A_{ij} es la matriz de (n-1) x (n-1) obtenida al eliminar la i-ésima fila y la j-ésima columna de A.`,
                        ex1_3: "Por ejemplo, para la matriz A = \\begin{bmatrix} 1 & 2 & 3 \\\\ 0 & 4 & 5 \\\\ 1 & 0 & 6 \\end{bmatrix} expandiendo a lo largo de la primera fila da ",
                        ex1_3_end: "det(A) = 1 * C_{11} + 2 * C_{12} + 3 * C_{13} = 1 * det\\begin{bmatrix}4 & 5 \\\\ 0 & 6\\end{bmatrix} - 2 * det\\begin{bmatrix}0 & 5 \\\\ 1 & 6\\end{bmatrix} + 3 * det\\begin{bmatrix}0 & 4 \\\\ 1 & 0\\end{bmatrix} = 24 + 10 - 12 = 22.",
                    },
                    section4: {
                        title4: "Propiedades de los Determinantes",
                        description: "El determinante satisface varias propiedades algebraicas que facilitan el cálculo y proporcionan información sobre la matriz.",
                        prop1_name: "Multiplicatividad",
                        prop1_description: "El determinante del producto de dos matrices cuadradas es igual al producto de sus determinantes:",
                        prop1_formula: `det(AB) = det(A) \\cdot det(B)`,
                        prop2_name: "Invertibilidad",
                        prop2_description: "Una matriz es invertible (no singular) si y solo si su determinante es no nulo:",
                        prop2_formula: `A \\text{ es invertible } \\iff det(A) \\ne 0`,
                        prop3_name: "Invarianza bajo Transposición",
                        prop3_description: "El determinante de una matriz es igual al determinante de su transpuesta:",
                        prop3_formula: `det(A) = det(A^T)`,
                        prop4_name: "Determinante de la Inversa",
                        prop4_description: "Si una matriz es invertible, el determinante de su inversa es el recíproco del determinante de la matriz:",
                        prop4_formula: `det(A^{-1}) = \\frac{1}{det(A)}`,
                    },
                    example_section: {
                        title_ex: "Ejemplos con Soluciones Paso a Paso",
                        ex1: {
                            title: "1. Determinante de una Matriz 2x2",
                            problem: `Encontrar el determinante de la matriz A = \\begin{bmatrix} 4 & 3 \\\\ 6 & -3 \\end{bmatrix}.`,
                            step1_title: "Paso 1: Identificar los Elementos",
                            step1_desc: "Los elementos de la matriz son a_{11} = 4, a_{12} = 3, a_{21} = 6, y a_{22} = -3.",
                            step2_title: "Paso 2: Aplicar la Fórmula del Determinante",
                            step2_desc: "Usa la fórmula para el determinante de una matriz 2x2: det(A) = a_{11}a_{22} - a_{12}a_{21}.",
                            step2_math: `det(A) = (4)(-3) - (3)(6)`,
                            result_title: "Respuesta Final",
                            result: `det(A) = -12 - 18 = -30`
                        },
                        ex2: {
                            title: "2. Determinante de una Matriz 3x3 (Expansión de Cofactores)",
                            problem: `Calcular el determinante de A = \\begin{bmatrix} 1 & 5 & 0 \\\\ 2 & 4 & -1 \\\\ 0 & -2 & 0 \\end{bmatrix}.`,
                            step1_title: "Paso 1: Elegir una Fila o Columna",
                            step1_desc: "Podemos expandir a lo largo de cualquier fila o columna. Para simplificar el cálculo, elige la que tenga más ceros. Aquí, la Columna 3 tiene dos ceros.",
                            step1_math: `\\det(A) = a_{13}C_{13} + a_{23}C_{23} + a_{33}C_{33}`,
                            step2_title: "Paso 2: Calcular el Menor No Nulo",
                            step2_desc: "Solo el término del medio es no nulo (donde a_{23} = -1). Encontramos el menor ignorando la Fila 2 y la Columna 3.",
                            step2_math: `\\text{Menor} = \\det \\begin{bmatrix} 1 & 5 \\\\ 0 & -2 \\end{bmatrix} = (1)(-2) - (5)(0) = -2`,
                            step3_title: "Paso 3: Aplicar Signos y Resolver",
                            step3_desc: "El signo del cofactor para la posición (2,3) es negativo (-).",
                            result_title: "Respuesta Final",
                            result: `\\det(A) = -1 \\times (-\\text{Menor}) = (-1) \\times -(-2) = -2`
                        },
                        ex3: {
                            title: "3. Determinante de una Matriz Triangular",
                            problem: `Encontrar el determinante de la matriz triangular superior B = \\begin{bmatrix} 2 & 7 & -3 \\\\ 0 & -4 & 5 \\\\ 0 & 0 & 3 \\end{bmatrix}.`,
                            step1_title: "Paso 1: Identificar el Tipo de Matriz",
                            step1_desc: "Note que todas las entradas debajo de la diagonal principal son cero. Esta es una matriz Triangular Superior.",
                            step2_title: "Paso 2: Usar la Propiedad de la Diagonal",
                            step2_desc: "Para cualquier matriz triangular (superior o inferior), el determinante es simplemente el producto de las entradas en la diagonal principal.",
                            step2_math: `\\det(B) = b_{11} \\times b_{22} \\times b_{33}`,
                            result_title: "Respuesta Final",
                            result: `\\det(B) = 2 \\times (-4) \\times 3 = -24`
                        }
                    }
                }
            }
        },
    },
    fr: {
        matrixBasics: {
            title: "Bases des Matrices",
            description: "Comprendre les définitions, types et opérations matricielles.",
            lessons: {
                lesson1_title: "Bases des Matrices",
                lesson1: {
                    section1: {
                        title1: "Qu'est-ce qu'une Matrice ?",
                        def1_1: "Une matrice est un tableau rectangulaire de nombres réels. Une matrice m x n est un tableau ayant m lignes et n colonnes tel que :",
                        ex1_1: ` A = \\begin{bmatrix}a_{11} & a_{12} & \\cdots & a_{1n} \\\\ a_{21} & a_{22} & \\cdots & a_{2n} \\\\ \\vdots & \\vdots & \\ddots & \\vdots \\\\ a_{m1} & a_{m2} & \\cdots & a_{mn} \\end{bmatrix}`,
                        expl1_1: "si m = n, on dit que A est une matrice carrée de degré n. L'ensemble de toutes les matrices m x n à coefficients réels est noté \\mathbb{R}^{m \\times n}.",
                    },
                    section2: {
                        title2: "Addition Matricielle et Vecteurs",
                        def1_2: "La somme matricielle (ou simplement somme) A + B de deux matrices A et B de taille m x n est définie comme la matrice C de taille m x n telle que c_{ij} = a_{ij} + b_{ij} pour tous i et j. Le produit par un scalaire \\lambda A de A par un nombre réel \\lambda est la matrice obtenue en multipliant chaque coefficient de A par \\lambda.",
                        ex1_2: `Ici, nous avons deux matrices A et B. Soient
                        A = \\begin{bmatrix}1 & 0 & 0 &2 \\\\ 0 & 1 & 0 & 3 \\\\ 0 & 0 & 1 & 4 \\end{bmatrix}, et B = \\begin{bmatrix}0 & 1 & 0 & 5 \\\\ 1 & 0 & 1 & 6 \\\\ 0 & 0 & 0 & 7 \\end{bmatrix}. Alors,
                        A + B = \\begin{bmatrix}1 & 1 & 0 & 7 \\\\ 1 & 1 & 1 & 9 \\\\ 0 & 0 & 1 & 11 \\end{bmatrix}`,
                        ex1_3: `Doubler A donne 2A = \\begin{bmatrix}2 & 0 & 0 & 4 \\\\ 0 & 2 & 0 & 6 \\\\ 0 & 0 & 2 & 8 \\end{bmatrix}`,
                    },
                    section3: {
                        title3: "Multiplication Matricielle",
                        def1_3: "Nous avons déjà défini la somme de deux matrices et le produit scalaire d'une matrice par un nombre réel. Nous allons maintenant définir la multiplication matricielle. Le produit AB de deux matrices A et B est défini uniquement lorsque le nombre de colonnes de A est égal au nombre de lignes de B. Supposons que A = (\\mathbf{a}_1, \\mathbf{a}_2, \\cdots, \\mathbf{a}_n) est une matrice m x n et B est une matrice n x p avec des colonnes \\mathbf{b}_1, \\mathbf{b}_2, \\cdots, \\mathbf{b}_p. Alors le produit AB est la matrice m x p dont la j-ème colonne est A\\mathbf{b}_j pour j = 1, 2, \\cdots, p.",
                        def1_3_2: "En d'autres termes, si AB = C, alors l'élément c_{ij} de C est obtenu en multipliant la i-ème ligne de A par la j-ème colonne de B. C'est-à-dire, c_{ij} = \\sum_{k=1}^{n} a_{ik}  b_{kj}.",
                        text1_3: "Notez qu'en général, la multiplication matricielle n'est pas commutative. C'est-à-dire, AB \\ne BA en général.",
                        text2_3: "Voici deux exemples de multiplication matricielle.",
                        ex1_3: `\\begin{bmatrix} 1 & 3 \\\\ 0 & 2 \\end{bmatrix} \\begin{bmatrix} 4 & 5 \\\\ 6 & 7 \\end{bmatrix} = \\begin{bmatrix} 1 \\cdot 4 + 3 \\cdot 6 & 1 \\cdot 5 + 3 \\cdot 7 \\\\ 0 \\cdot 4 + 2 \\cdot 6 & 0 \\cdot 5 + 2 \\cdot 7 \\end{bmatrix} = \\begin{bmatrix} 22 & 26 \\\\ 12 & 14 \\end{bmatrix}`,
                        ex1_3_2: `\\begin{bmatrix} 2 & 0 & 1 \\\\ 3 & 4 & 5 \\end{bmatrix} \\begin{bmatrix} 1 & 2 \\\\ 0 & 1 \\\\ 4 & 0 \\end{bmatrix} = \\begin{bmatrix} 2 \\cdot 1 + 0 \\cdot 0 + 1 \\cdot 4 & 2 \\cdot 2 + 0 \\cdot 1 + 1 \\cdot 0 \\\\ 3 \\cdot 1 + 4 \\cdot 0 + 5 \\cdot 4 & 3 \\cdot 2 + 4 \\cdot 1 + 5 \\cdot 0 \\end{bmatrix} = \\begin{bmatrix} 6 & 4 \\\\ 23 & 10 \\end{bmatrix}`,
                    },
                    section4: {
                        title4: "Transposée d'une Matrice",
                        def1_4: " La transposée d'une matrice A de m x n est la matrice A^T de n x m obtenue en échangeant les lignes et les colonnes de A. C'est-à-dire, si A = (a_{ij}), alors A^T = (b_{ij}), où b_{ij} = a_{ji} pour tous i et j.",
                        ex1_4: `\\text{Si } A = \\begin{bmatrix}1 & 2 & 3 \\\\ 4 & 5 & 6 \\end{bmatrix}, \\text{alors } A^T = \\begin{bmatrix}1 & 4 \\\\ 2 & 5 \\\\ 3 & 6 \\end{bmatrix}`,
                        def2_4: "Une matrice A est dite symétrique si A = A^T. Une matrice A est dite antisymétrique si A^T = -A.",
                        proposition1_4: "Soient A et B des matrices m x n. Alors les propriétés suivantes sont vérifiées :",
                        item1_4: '1. (A^T)^T = A',
                        item2_4: '2. (A^T + B^T) = A^T + B^T',
                        item3_4: '3. (AB)^T = B^T A^T',
                    },
                    section5: {
                        title5: "Algèbre des Matrices",
                        def1_5: "À l'exception de la commutativité de la multiplication, les lois usuelles de l'algèbre s'appliquent aux matrices.",
                        proposition1_5: "En supposant que toutes les sommes et produits sont définis, l'addition et la multiplication matricielle satisfont les propriétés suivantes :",
                        item1_5: "1. A + B = B + A (Loi Commutative de l'Addition)",
                        item2_5: "2. (A + B) + C = A + (B + C) (Loi Associative de l'Addition)",
                        item3_5: "3. A(B C) = (AB)C (Loi Associative de la Multiplication)",
                        item4_5: "4. A(B + C) = AB + AC (Loi Distributive 1)",
                        item5_5: "5. (A + B)C = AC + BC (Loi Distributive 2)",
                        item6_5: "6. I_m A = A et A I_n = A (Identité Multiplicative)",
                    },
                    example_section: {
                        title_ex: "Exemples avec Solutions Étape par Étape",
                        
                        example1: {
                            title: "1. Combinaison Linéaire de Matrices",
                            problem: `Soient A = \\begin{bmatrix} 2 & -1 \\\\ 0 & 3 \\end{bmatrix} \\text{ et } B = \\begin{bmatrix} 1 & 4 \\\\ 5 & -2 \\end{bmatrix}, \\text{ trouver } 2A - B.`,
                            step1_title: "Étape 1 : Effectuer la Multiplication Scalaire",
                            step1_desc: "Tout d'abord, multipliez chaque élément de la matrice A par le scalaire 2.",
                            step1_math: `2A = 2\\begin{bmatrix} 2 & -1 \\\\ 0 & 3 \\end{bmatrix} = \\begin{bmatrix} 4 & -2 \\\\ 0 & 6 \\end{bmatrix}`,
                            step2_title: "Étape 2 : Effectuer la Soustraction Matricielle",
                            step2_desc: "Soustrayez les éléments correspondants de B à ceux de 2A.",
                            step2_math: `\\begin{bmatrix} 4 & -2 \\\\ 0 & 6 \\end{bmatrix} - \\begin{bmatrix} 1 & 4 \\\\ 5 & -2 \\end{bmatrix} = \\begin{bmatrix} 4-1 & -2-4 \\\\ 0-5 & 6-(-2) \\end{bmatrix}`,
                            result_title: "Réponse Finale",
                            result: `\\begin{bmatrix} 3 & -6 \\\\ -5 & 8 \\end{bmatrix}`
                        },

                        example2: {
                            title: "2. Multiplication Matricielle",
                            problem: `Calculer le produit AB où A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix} \\text{ et } B = \\begin{bmatrix} 2 & 0 \\\\ 1 & -1 \\end{bmatrix}.`,
                            step1_title: "Étape 1 : Vérifier les Dimensions",
                            step1_desc: "A est 2x2 et B est 2x2. Les dimensions internes correspondent (2=2), donc le résultat sera une matrice 2x2.",
                            step2_title: "Étape 2 : Calculer Lignes par Colonnes",
                            step2_desc: "Multipliez la Ligne 1 de A par la Colonne 1 de B :",
                            step2_math: `c_{11} = (1)(2) + (2)(1) = 2 + 2 = 4`,
                            step3_title: "Étape 3 : Calculer les Entrées Restantes",
                            step3_math: `c_{12} = (1)(0) + (2)(-1) = -2 \\\\ c_{21} = (3)(2) + (4)(1) = 10 \\\\ c_{22} = (3)(0) + (4)(-1) = -4`,
                            result_title: "Réponse Finale",
                            result: `AB = \\begin{bmatrix} 4 & -2 \\\\ 10 & -4 \\end{bmatrix}`
                        },

                        example3: {
                            title: "3. Transposée d'une Matrice Non Carrée",
                            problem: `Trouver la transposée A^T de la matrice A = \\begin{bmatrix} 1 & 2 & 0 \\\\ 3 & 5 & 9 \\end{bmatrix}.`,
                            step1_title: "Étape 1 : Identifier les Dimensions",
                            step1_desc: "La matrice A a 2 lignes et 3 colonnes (2x3). La transposée A^T inversera ces dimensions pour devenir 3x2.",
                            step2_title: "Étape 2 : Échanger Lignes et Colonnes",
                            step2_desc: "La Ligne 1 de A devient la Colonne 1 de A^T. La Ligne 2 de A devient la Colonne 2 de A^T.",
                            step2_math: `\\text{Ligne 1 } [1, 2, 0] \\rightarrow \\text{Colonne 1} \\\\ \\text{Ligne 2 } [3, 5, 9] \\rightarrow \\text{Colonne 2}`,
                            result_title: "Réponse Finale",
                            result: `A^T = \\begin{bmatrix} 1 & 3 \\\\ 2 & 5 \\\\ 0 & 9 \\end{bmatrix}`
                        }
                    },
                }
            }
        },
        determinants: {
            title: "Déterminants",
            description: "Apprenez à calculer les déterminants et découvrez leurs propriétés.",
            lessons: {
                lesson2_title: "Déterminants",
                lesson2: {
                    section1: {
                        title1: "Introduction aux Déterminants",
                        def1_1: "Le déterminant est une valeur scalaire qui peut être calculée à partir des éléments d'une matrice carrée et qui encode certaines propriétés de la transformation linéaire décrite par la matrice.",
                        def2_2: "Le déterminant det(A) de A est défini comme",
                        def2_2_formula: `det(A) := \\sum_{\\pi \\in S_n} \\text{sgn}(\\pi) \\, a_{\\pi(1),1} a_{\\pi(2),2} \\cdots a_{\\pi(n),n}`,
                        def2_2_explanation: "où :",
                        def2_2_item1_1: "\\sum_{\\pi \\in S_n} : Somme sur toutes les permutations possibles (\\pi) dans le groupe symétrique S_n (toutes les façons d'ordonner n nombres).",
                        def2_2_item1_2: "\\text{sgn}(\\pi) : Le signe de la permutation (+1 pour les permutations paires, -1 pour les impaires).",
                        def2_2_item1_3: "a_{\\pi(i),i} : Les entrées spécifiques de la matrice sélectionnées par la fonction de permutation \\pi(i) pour chaque colonne i.",
                        text_1_1: "Supposons que A est 2 x 2. Il n'y a que deux éléments dans S_2 : la permutation identité (1 2) et la transposition (2 1). Ainsi, par définition :",
                        ex1_1: "det \\begin{bmatrix} a_{11} a_{12} \\\\ a_{21} a_{22} \\end{bmatrix} = a_{11}a_{22} - a_{12}a_{21}",
                    },
                    section2: {
                        title2: "Déterminants 2 x 2 et 3 x 3",
                        def1_2: "Le déterminant d'une matrice 2 x 2 A = \\begin{bmatrix} a_{11} & a_{12} \\\\ a_{21} & a_{22} \\end{bmatrix} est donné par det(A) = a_{11}a_{22} - a_{12}a_{21}.",
                        ex1_2: "Par exemple, pour A = \\begin{bmatrix} 3 & 5 \\\\ 2 & 4 \\end{bmatrix}, nous avons det(A) = (3)(4) - (5)(2) = 12 - 10 = 2.",
                        def2_2: "Le déterminant d'une matrice 3 x 3 A = \\begin{bmatrix} a_{11} & a_{12} & a_{13} \\\\ a_{21} & a_{22} & a_{23} \\\\ a_{31} & a_{32} & a_{33} \\end{bmatrix} est donné par :",
                        def2_2_formula: `det(A) = a_{11}(a_{22}a_{33} - a_{23}a_{32}) - a_{12}(a_{21}a_{33} - a_{23}a_{31}) + a_{13}(a_{21}a_{32} - a_{22}a_{31})`,
                        ex2_2: "Par exemple, pour A = \\begin{bmatrix} 1 & 2 & 3 \\\\ 0 & 4 & 5 \\\\ 1 & 0 & 6 \\end{bmatrix}, nous avons det(A) = 1(4*6 - 5*0) - 2(0*6 - 5*1) + 3(0*0 - 4*1) = 24 + 10 - 12 = 22.",
                    },
                    section3: {
                        titl3: "Développement par Cofacteurs (Développement de Laplace)",
                        def1_3: "Le cofacteur C_{ij} d'un élément a_{ij} dans une matrice carrée A est défini par C_{ij} = (-1)^{i+j} M_{ij}, où M_{ij} est le mineur de a_{ij}, obtenu en supprimant la i-ème ligne et la j-ème colonne de A.",
                        def2_3: "Le déterminant d'une matrice n x n A peut être calculé en utilisant le développement par cofacteurs le long de n'importe quelle ligne ou colonne. Pour le développement le long de la i-ème ligne, nous avons :",
                        def2_3_formula: `det(A) = \\sum_{i=1}^{n} (-1)^{i+j} a_{ij} det(A_{ij})`,
                        def2_3_explanation: `Ceci est le développement de Laplace le long de la i-ème ligne, où A_{ij} est la matrice (n-1) x (n-1) obtenue en supprimant la i-ème ligne et la j-ème colonne de A.`,
                        ex1_3: "Par exemple, pour la matrice A = \\begin{bmatrix} 1 & 2 & 3 \\\\ 0 & 4 & 5 \\\\ 1 & 0 & 6 \\end{bmatrix} en développant le long de la première ligne donne ",
                        ex1_3_end: "det(A) = 1 * C_{11} + 2 * C_{12} + 3 * C_{13} = 1 * det\\begin{bmatrix}4 & 5 \\\\ 0 & 6\\end{bmatrix} - 2 * det\\begin{bmatrix}0 & 5 \\\\ 1 & 6\\end{bmatrix} + 3 * det\\begin{bmatrix}0 & 4 \\\\ 1 & 0\\end{bmatrix} = 24 + 10 - 12 = 22.",
                    },
                    section4: {
                        title4: "Propriétés des Déterminants",
                        description: "Le déterminant satisfait plusieurs propriétés algébriques qui facilitent le calcul et fournissent des informations sur la matrice.",
                        prop1_name: "Multiplicativité",
                        prop1_description: "Le déterminant du produit de deux matrices carrées est égal au produit de leurs déterminants :",
                        prop1_formula: `det(AB) = det(A) \\cdot det(B)`,
                        prop2_name: "Inversibilité",
                        prop2_description: "Une matrice est inversible (non singulière) si et seulement si son déterminant est non nul :",
                        prop2_formula: `A \\text{ est inversible } \\iff det(A) \\ne 0`,
                        prop3_name: "Invariance par Transposition",
                        prop3_description: "Le déterminant d'une matrice est égal au déterminant de sa transposée :",
                        prop3_formula: `det(A) = det(A^T)`,
                        prop4_name: "Déterminant de l'Inverse",
                        prop4_description: "Si une matrice est inversible, le déterminant de son inverse est l'inverse du déterminant de la matrice :",
                        prop4_formula: `det(A^{-1}) = \\frac{1}{det(A)}`,
                    },
                    example_section: {
                        title_ex: "Exemples avec Solutions Étape par Étape",
                        ex1: {
                            title: "1. Déterminant d'une Matrice 2x2",
                            problem: `Trouver le déterminant de la matrice A = \\begin{bmatrix} 4 & 3 \\\\ 6 & -3 \\end{bmatrix}.`,
                            step1_title: "Étape 1 : Identifier les Éléments",
                            step1_desc: "Les éléments de la matrice sont a_{11} = 4, a_{12} = 3, a_{21} = 6 et a_{22} = -3.",
                            step2_title: "Étape 2 : Appliquer la Formule du Déterminant",
                            step2_desc: "Utilisez la formule du déterminant d'une matrice 2x2 : det(A) = a_{11}a_{22} - a_{12}a_{21}.",
                            step2_math: `det(A) = (4)(-3) - (3)(6)`,
                            result_title: "Réponse Finale",
                            result: `det(A) = -12 - 18 = -30`
                        },
                        ex2: {
                            title: "2. Déterminant d'une Matrice 3x3 (Développement par Cofacteurs)",
                            problem: `Calculer le déterminant de A = \\begin{bmatrix} 1 & 5 & 0 \\\\ 2 & 4 & -1 \\\\ 0 & -2 & 0 \\end{bmatrix}.`,
                            step1_title: "Étape 1 : Choisir une Ligne ou Colonne",
                            step1_desc: "Nous pouvons développer le long de n'importe quelle ligne ou colonne. Pour simplifier, choisissez celle avec le plus de zéros. Ici, la Colonne 3 a deux zéros.",
                            step1_math: `\\det(A) = a_{13}C_{13} + a_{23}C_{23} + a_{33}C_{33}`,
                            step2_title: "Étape 2 : Calculer le Mineur Non Nul",
                            step2_desc: "Seul le terme du milieu est non nul (où a_{23} = -1). Nous trouvons le mineur en ignorant la Ligne 2 et la Colonne 3.",
                            step2_math: `\\text{Mineur} = \\det \\begin{bmatrix} 1 & 5 \\\\ 0 & -2 \\end{bmatrix} = (1)(-2) - (5)(0) = -2`,
                            step3_title: "Étape 3 : Appliquer les Signes et Résoudre",
                            step3_desc: "Le signe du cofacteur pour la position (2,3) est négatif (-).",
                            result_title: "Réponse Finale",
                            result: `\\det(A) = -1 \\times (-\\text{Mineur}) = (-1) \\times -(-2) = -2`
                        },
                        ex3: {
                            title: "3. Déterminant d'une Matrice Triangulaire",
                            problem: `Trouver le déterminant de la matrice triangulaire supérieure B = \\begin{bmatrix} 2 & 7 & -3 \\\\ 0 & -4 & 5 \\\\ 0 & 0 & 3 \\end{bmatrix}.`,
                            step1_title: "Étape 1 : Identifier le Type de Matrice",
                            step1_desc: "Remarquez que toutes les entrées sous la diagonale principale sont nulles. C'est une matrice Triangulaire Supérieure.",
                            step2_title: "Étape 2 : Utiliser la Propriété de la Diagonale",
                            step2_desc: "Pour toute matrice triangulaire (supérieure ou inférieure), le déterminant est simplement le produit des entrées sur la diagonale principale.",
                            step2_math: `\\det(B) = b_{11} \\times b_{22} \\times b_{33}`,
                            result_title: "Réponse Finale",
                            result: `\\det(B) = 2 \\times (-4) \\times 3 = -24`
                        }
                    }
                }
            }
        },
    },
    de: {
        matrixBasics: {
            title: "Matrizengrundlagen",
            description: "Verständnis von Matrizendefinitionen, Typen und Operationen.",
            lessons: {
                lesson1_title: "Matrizengrundlagen",
                lesson1: {
                    section1: {
                        title1: "Was ist eine Matrix?",
                        def1_1: "Eine Matrix ist eine rechteckige Anordnung von reellen Zahlen. Eine m x n Matrix ist eine Anordnung mit m Zeilen und n Spalten wie folgt:",
                        ex1_1: ` A = \\begin{bmatrix}a_{11} & a_{12} & \\cdots & a_{1n} \\\\ a_{21} & a_{22} & \\cdots & a_{2n} \\\\ \\vdots & \\vdots & \\ddots & \\vdots \\\\ a_{m1} & a_{m2} & \\cdots & a_{mn} \\end{bmatrix}`,
                        expl1_1: "wenn m = n, sagen wir, A ist eine quadratische Matrix vom Grad n. Die Menge aller m x n Matrizen mit reellen Einträgen wird mit \\mathbb{R}^{m \\times n} bezeichnet.",
                    },
                    section2: {
                        title2: "Matrizenaddition und Vektoren",
                        def1_2: "Die Matrizensumme (oder einfach Summe) A + B zweier m x n Matrizen A und B ist definiert als die m x n Matrix C, sodass c_{ij} = a_{ij} + b_{ij} für alle i und j gilt. Das skalare Vielfache \\lambda A von A mit einer reellen Zahl \\lambda ist die Matrix, die man erhält, indem man jeden Eintrag von A mit \\lambda multipliziert.",
                        ex1_2: `Hier haben wir zwei Matrizen A und B. Sei
                        A = \\begin{bmatrix}1 & 0 & 0 &2 \\\\ 0 & 1 & 0 & 3 \\\\ 0 & 0 & 1 & 4 \\end{bmatrix}, und B = \\begin{bmatrix}0 & 1 & 0 & 5 \\\\ 1 & 0 & 1 & 6 \\\\ 0 & 0 & 0 & 7 \\end{bmatrix}. Dann gilt,
                        Dann A + B = \\begin{bmatrix}1 & 1 & 0 & 7 \\\\ 1 & 1 & 1 & 9 \\\\ 0 & 0 & 1 & 11 \\end{bmatrix}`,
                        ex1_3: `Das Verdoppeln von A ergibt 2A = \\begin{bmatrix}2 & 0 & 0 & 4 \\\\ 0 & 2 & 0 & 6 \\\\ 0 & 0 & 2 & 8 \\end{bmatrix}`,
                    },
                    section3: {
                        title3: "Matrizenmultiplikation",
                        def1_3: "Wir haben bereits die Summe zweier Matrizen und das skalare Vielfache einer Matrix definiert. Wir werden nun die Matrizenmultiplikation definieren. Das Produkt AB zweier Matrizen A und B ist nur definiert, wenn die Anzahl der Spalten von A gleich der Anzahl der Zeilen von B ist. Angenommen, A = (\\mathbf{a}_1, \\mathbf{a}_2, \\cdots, \\mathbf{a}_n) ist eine m x n Matrix und B ist eine n x p Matrix mit den Spalten \\mathbf{b}_1, \\mathbf{b}_2, \\cdots, \\mathbf{b}_p. Dann ist das Produkt AB die m x p Matrix, deren j-te Spalte A\\mathbf{b}_j für j = 1, 2, \\cdots, p ist.",
                        def1_3_2: "Mit anderen Worten, wenn AB = C, dann erhält man den Eintrag c_{ij} von C durch Multiplikation der i-ten Zeile von A mit der j-ten Spalte von B. Das heißt, c_{ij} = \\sum_{k=1}^{n} a_{ik}  b_{kj}.",
                        text1_3: "Beachten Sie, dass die Matrizenmultiplikation im Allgemeinen nicht kommutativ ist. Das heißt, AB \\ne BA im Allgemeinen.",
                        text2_3: "Hier haben wir zwei Beispiele für die Matrizenmultiplikation.",
                        ex1_3: `\\begin{bmatrix} 1 & 3 \\\\ 0 & 2 \\end{bmatrix} \\begin{bmatrix} 4 & 5 \\\\ 6 & 7 \\end{bmatrix} = \\begin{bmatrix} 1 \\cdot 4 + 3 \\cdot 6 & 1 \\cdot 5 + 3 \\cdot 7 \\\\ 0 \\cdot 4 + 2 \\cdot 6 & 0 \\cdot 5 + 2 \\cdot 7 \\end{bmatrix} = \\begin{bmatrix} 22 & 26 \\\\ 12 & 14 \\end{bmatrix}`,
                        ex1_3_2: `\\begin{bmatrix} 2 & 0 & 1 \\\\ 3 & 4 & 5 \\end{bmatrix} \\begin{bmatrix} 1 & 2 \\\\ 0 & 1 \\\\ 4 & 0 \\end{bmatrix} = \\begin{bmatrix} 2 \\cdot 1 + 0 \\cdot 0 + 1 \\cdot 4 & 2 \\cdot 2 + 0 \\cdot 1 + 1 \\cdot 0 \\\\ 3 \\cdot 1 + 4 \\cdot 0 + 5 \\cdot 4 & 3 \\cdot 2 + 4 \\cdot 1 + 5 \\cdot 0 \\end{bmatrix} = \\begin{bmatrix} 6 & 4 \\\\ 23 & 10 \\end{bmatrix}`,
                    },
                    section4: {
                        title4: "Transponierte einer Matrix",
                        def1_4: " Die Transponierte einer m x n Matrix A ist die n x m Matrix A^T, die durch Vertauschen der Zeilen und Spalten von A entsteht. Das heißt, wenn A = (a_{ij}), dann ist A^T = (b_{ij}), wobei b_{ij} = a_{ji} für alle i und j.",
                        ex1_4: `\\text{Wenn } A = \\begin{bmatrix}1 & 2 & 3 \\\\ 4 & 5 & 6 \\end{bmatrix}, \\text{dann } A^T = \\begin{bmatrix}1 & 4 \\\\ 2 & 5 \\\\ 3 & 6 \\end{bmatrix}`,
                        def2_4: "Eine Matrix A heißt symmetrisch, wenn A = A^T. Eine Matrix A heißt schiefsymmetrisch, wenn A^T = -A.",
                        proposition1_4: "Seien A und B m x n Matrizen. Dann gelten folgende Aussagen:",
                        item1_4: '1. (A^T)^T = A',
                        item2_4: '2. (A^T + B^T) = A^T + B^T',
                        item3_4: '3. (AB)^T = B^T A^T',
                    },
                    section5: {
                        title5: "Matrizenalgebra",
                        def1_5: "Abgesehen von der Kommutativität der Multiplikation gelten für Matrizen die üblichen Gesetze der Algebra.",
                        proposition1_5: "Unter der Annahme, dass alle Summen und Produkte definiert sind, erfüllen die Matrizenaddition und -multiplikation folgende Eigenschaften:",
                        item1_5: "1. A + B = B + A (Kommutativgesetz der Addition)",
                        item2_5: "2. (A + B) + C = A + (B + C) (Assoziativgesetz der Addition)",
                        item3_5: "3. A(B C) = (AB)C (Assoziativgesetz der Multiplikation)",
                        item4_5: "4. A(B + C) = AB + AC (Distributivgesetz 1)",
                        item5_5: "5. (A + B)C = AC + BC (Distributivgesetz 2)",
                        item6_5: "6. I_m A = A und A I_n = A (Multiplikative Identität)",
                    },
                    example_section: {
                        title_ex: "Beispiele mit Schritt-für-Schritt-Lösungen",
                        
                        example1: {
                            title: "1. Linearkombination von Matrizen",
                            problem: `Gegeben A = \\begin{bmatrix} 2 & -1 \\\\ 0 & 3 \\end{bmatrix} \\text{ und } B = \\begin{bmatrix} 1 & 4 \\\\ 5 & -2 \\end{bmatrix}, \\text{ berechne } 2A - B.`,
                            step1_title: "Schritt 1: Skalarmultiplikation durchführen",
                            step1_desc: "Multiplizieren Sie zuerst jedes Element in Matrix A mit dem Skalar 2.",
                            step1_math: `2A = 2\\begin{bmatrix} 2 & -1 \\\\ 0 & 3 \\end{bmatrix} = \\begin{bmatrix} 4 & -2 \\\\ 0 & 6 \\end{bmatrix}`,
                            step2_title: "Schritt 2: Matrizensubtraktion durchführen",
                            step2_desc: "Subtrahieren Sie die entsprechenden Elemente von B von 2A.",
                            step2_math: `\\begin{bmatrix} 4 & -2 \\\\ 0 & 6 \\end{bmatrix} - \\begin{bmatrix} 1 & 4 \\\\ 5 & -2 \\end{bmatrix} = \\begin{bmatrix} 4-1 & -2-4 \\\\ 0-5 & 6-(-2) \\end{bmatrix}`,
                            result_title: "Endergebnis",
                            result: `\\begin{bmatrix} 3 & -6 \\\\ -5 & 8 \\end{bmatrix}`
                        },

                        example2: {
                            title: "2. Matrizenmultiplikation",
                            problem: `Berechnen Sie das Produkt AB, wobei A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix} \\text{ und } B = \\begin{bmatrix} 2 & 0 \\\\ 1 & -1 \\end{bmatrix}.`,
                            step1_title: "Schritt 1: Dimensionen prüfen",
                            step1_desc: "A ist 2x2 und B ist 2x2. Die inneren Dimensionen stimmen überein (2=2), also ist das Ergebnis eine 2x2 Matrix.",
                            step2_title: "Schritt 2: Zeilen mit Spalten berechnen",
                            step2_desc: "Multiplizieren Sie Zeile 1 von A mit Spalte 1 von B:",
                            step2_math: `c_{11} = (1)(2) + (2)(1) = 2 + 2 = 4`,
                            step3_title: "Schritt 3: Restliche Einträge berechnen",
                            step3_math: `c_{12} = (1)(0) + (2)(-1) = -2 \\\\ c_{21} = (3)(2) + (4)(1) = 10 \\\\ c_{22} = (3)(0) + (4)(-1) = -4`,
                            result_title: "Endergebnis",
                            result: `AB = \\begin{bmatrix} 4 & -2 \\\\ 10 & -4 \\end{bmatrix}`
                        },

                        example3: {
                            title: "3. Transponierte einer nicht-quadratischen Matrix",
                            problem: `Finden Sie die Transponierte A^T der Matrix A = \\begin{bmatrix} 1 & 2 & 0 \\\\ 3 & 5 & 9 \\end{bmatrix}.`,
                            step1_title: "Schritt 1: Dimensionen identifizieren",
                            step1_desc: "Matrix A hat 2 Zeilen und 3 Spalten (2x3). Die Transponierte A^T vertauscht diese Dimensionen zu 3x2.",
                            step2_title: "Schritt 2: Zeilen und Spalten vertauschen",
                            step2_desc: "Zeile 1 von A wird zu Spalte 1 von A^T. Zeile 2 von A wird zu Spalte 2 von A^T.",
                            step2_math: `\\text{Zeile 1 } [1, 2, 0] \\rightarrow \\text{Spalte 1} \\\\ \\text{Zeile 2 } [3, 5, 9] \\rightarrow \\text{Spalte 2}`,
                            result_title: "Endergebnis",
                            result: `A^T = \\begin{bmatrix} 1 & 3 \\\\ 2 & 5 \\\\ 0 & 9 \\end{bmatrix}`
                        }
                    },
                }
            }
        },
        determinants: {
            title: "Determinanten",
            description: "Lernen Sie, wie man Determinanten berechnet und ihre Eigenschaften versteht.",
            lessons: {
                lesson2_title: "Determinanten",
                lesson2: {
                    section1: {
                        title1: "Einführung in Determinanten",
                        def1_1: "Die Determinante ist ein Skalarwert, der aus den Elementen einer quadratischen Matrix berechnet werden kann und bestimmte Eigenschaften der durch die Matrix beschriebenen linearen Transformation kodiert.",
                        def2_2: "Die Determinante det(A) von A ist definiert als",
                        def2_2_formula: `det(A) := \\sum_{\\pi \\in S_n} \\text{sgn}(\\pi) \\, a_{\\pi(1),1} a_{\\pi(2),2} \\cdots a_{\\pi(n),n}`,
                        def2_2_explanation: "wobei:",
                        def2_2_item1_1: "\\sum_{\\pi \\in S_n}: Summation über alle möglichen Permutationen (\\pi) in der symmetrischen Gruppe S_n (alle Möglichkeiten, n Zahlen anzuordnen).",
                        def2_2_item1_2: "\\text{sgn}(\\pi): Das Vorzeichen der Permutation (+1 für gerade Permutationen, -1 für ungerade Permutationen).",
                        def2_2_item1_3: "a_{\\pi(i),i}: Die spezifischen Matrixeinträge, die durch die Permutationsfunktion \\pi(i) für jede Spalte i ausgewählt werden.",
                        text_1_1: "Nehmen wir an, A ist 2 x 2. Es gibt nur zwei Elemente in S_2: die Identitätspermutation (1 2) und die Transposition (2 1). Daher gilt per Definition:",
                        ex1_1: "det \\begin{bmatrix} a_{11} a_{12} \\\\ a_{21} a_{22} \\end{bmatrix} = a_{11}a_{22} - a_{12}a_{21}",
                    },
                    section2: {
                        title2: "2 x 2 und 3 x 3 Determinanten",
                        def1_2: "Die Determinante einer 2 x 2 Matrix A = \\begin{bmatrix} a_{11} & a_{12} \\\\ a_{21} & a_{22} \\end{bmatrix} ist gegeben durch det(A) = a_{11}a_{22} - a_{12}a_{21}.",
                        ex1_2: "Zum Beispiel, für A = \\begin{bmatrix} 3 & 5 \\\\ 2 & 4 \\end{bmatrix}, haben wir det(A) = (3)(4) - (5)(2) = 12 - 10 = 2.",
                        def2_2: "Die Determinante einer 3 x 3 Matrix A = \\begin{bmatrix} a_{11} & a_{12} & a_{13} \\\\ a_{21} & a_{22} & a_{23} \\\\ a_{31} & a_{32} & a_{33} \\end{bmatrix} ist gegeben durch:",
                        def2_2_formula: `det(A) = a_{11}(a_{22}a_{33} - a_{23}a_{32}) - a_{12}(a_{21}a_{33} - a_{23}a_{31}) + a_{13}(a_{21}a_{32} - a_{22}a_{31})`,
                        ex2_2: "Zum Beispiel, für A = \\begin{bmatrix} 1 & 2 & 3 \\\\ 0 & 4 & 5 \\\\ 1 & 0 & 6 \\end{bmatrix}, haben wir det(A) = 1(4*6 - 5*0) - 2(0*6 - 5*1) + 3(0*0 - 4*1) = 24 + 10 - 12 = 22.",
                    },
                    section3: {
                        titl3: "Kofaktorentwicklung (Laplacescher Entwicklungssatz)",
                        def1_3: "Der Kofaktor C_{ij} eines Elements a_{ij} in einer quadratischen Matrix A ist definiert als C_{ij} = (-1)^{i+j} M_{ij}, wobei M_{ij} der Minor von a_{ij} ist, der durch Streichen der i-ten Zeile und j-ten Spalte von A entsteht.",
                        def2_3: "Die Determinante einer n x n Matrix A kann durch Kofaktorentwicklung nach einer beliebigen Zeile oder Spalte berechnet werden. Für die Entwicklung nach der i-ten Zeile gilt:",
                        def2_3_formula: `det(A) = \\sum_{i=1}^{n} (-1)^{i+j} a_{ij} det(A_{ij})`,
                        def2_3_explanation: `Dies ist die Laplace-Entwicklung nach der i-ten Zeile, wobei A_{ij} die (n-1) x (n-1) Matrix ist, die durch Streichen der i-ten Zeile und j-ten Spalte von A entsteht.`,
                        ex1_3: "Zum Beispiel, für die Matrix A = \\begin{bmatrix} 1 & 2 & 3 \\\\ 0 & 4 & 5 \\\\ 1 & 0 & 6 \\end{bmatrix} ergibt die Entwicklung nach der ersten Zeile ",
                        ex1_3_end: "det(A) = 1 * C_{11} + 2 * C_{12} + 3 * C_{13} = 1 * det\\begin{bmatrix}4 & 5 \\\\ 0 & 6\\end{bmatrix} - 2 * det\\begin{bmatrix}0 & 5 \\\\ 1 & 6\\end{bmatrix} + 3 * det\\begin{bmatrix}0 & 4 \\\\ 1 & 0\\end{bmatrix} = 24 + 10 - 12 = 22.",
                    },
                    section4: {
                        title4: "Eigenschaften von Determinanten",
                        description: "Die Determinante erfüllt mehrere algebraische Eigenschaften, die die Berechnung erleichtern und Einblicke in die Matrix geben.",
                        prop1_name: "Multiplikativität",
                        prop1_description: "Die Determinante des Produkts zweier quadratischer Matrizen ist gleich dem Produkt ihrer Determinanten:",
                        prop1_formula: `det(AB) = det(A) \\cdot det(B)`,
                        prop2_name: "Invertierbarkeit",
                        prop2_description: "Eine Matrix ist genau dann invertierbar (nicht singulär), wenn ihre Determinante ungleich Null ist:",
                        prop2_formula: `A \\text{ ist invertierbar } \\iff det(A) \\ne 0`,
                        prop3_name: "Invarianz unter Transposition",
                        prop3_description: "Die Determinante einer Matrix ist gleich der Determinante ihrer Transponierten:",
                        prop3_formula: `det(A) = det(A^T)`,
                        prop4_name: "Determinante der Inversen",
                        prop4_description: "Wenn eine Matrix invertierbar ist, ist die Determinante ihrer Inversen der Kehrwert der Determinante der Matrix:",
                        prop4_formula: `det(A^{-1}) = \\frac{1}{det(A)}`,
                    },
                    example_section: {
                        title_ex: "Beispiele mit Schritt-für-Schritt-Lösungen",
                        ex1: {
                            title: "1. Determinante einer 2x2 Matrix",
                            problem: `Finden Sie die Determinante der Matrix A = \\begin{bmatrix} 4 & 3 \\\\ 6 & -3 \\end{bmatrix}.`,
                            step1_title: "Schritt 1: Elemente identifizieren",
                            step1_desc: "Die Elemente der Matrix sind a_{11} = 4, a_{12} = 3, a_{21} = 6 und a_{22} = -3.",
                            step2_title: "Schritt 2: Determinantenformel anwenden",
                            step2_desc: "Verwenden Sie die Formel für die Determinante einer 2x2 Matrix: det(A) = a_{11}a_{22} - a_{12}a_{21}.",
                            step2_math: `det(A) = (4)(-3) - (3)(6)`,
                            result_title: "Endergebnis",
                            result: `det(A) = -12 - 18 = -30`
                        },
                        ex2: {
                            title: "2. Determinante einer 3x3 Matrix (Kofaktorentwicklung)",
                            problem: `Berechnen Sie die Determinante von A = \\begin{bmatrix} 1 & 5 & 0 \\\\ 2 & 4 & -1 \\\\ 0 & -2 & 0 \\end{bmatrix}.`,
                            step1_title: "Schritt 1: Zeile oder Spalte wählen",
                            step1_desc: "Wir können nach jeder Zeile oder Spalte entwickeln. Wählen Sie zur Vereinfachung diejenige mit den meisten Nullen. Hier hat Spalte 3 zwei Nullen.",
                            step1_math: `\\det(A) = a_{13}C_{13} + a_{23}C_{23} + a_{33}C_{33}`,
                            step2_title: "Schritt 2: Den Nicht-Null-Minor berechnen",
                            step2_desc: "Nur der mittlere Term ist ungleich Null (wo a_{23} = -1). Wir finden den Minor, indem wir Zeile 2 und Spalte 3 ignorieren.",
                            step2_math: `\\text{Minor} = \\det \\begin{bmatrix} 1 & 5 \\\\ 0 & -2 \\end{bmatrix} = (1)(-2) - (5)(0) = -2`,
                            step3_title: "Schritt 3: Vorzeichen anwenden und lösen",
                            step3_desc: "Das Kofaktor-Vorzeichen für die Position (2,3) ist negativ (-).",
                            result_title: "Endergebnis",
                            result: `\\det(A) = -1 \\times (-\\text{Minor}) = (-1) \\times -(-2) = -2`
                        },
                        ex3: {
                            title: "3. Determinante einer Dreiecksmatrix",
                            problem: `Finden Sie die Determinante der oberen Dreiecksmatrix B = \\begin{bmatrix} 2 & 7 & -3 \\\\ 0 & -4 & 5 \\\\ 0 & 0 & 3 \\end{bmatrix}.`,
                            step1_title: "Schritt 1: Matrixtyp identifizieren",
                            step1_desc: "Beachten Sie, dass alle Einträge unterhalb der Hauptdiagonale Null sind. Dies ist eine obere Dreiecksmatrix.",
                            step2_title: "Schritt 2: Diagonaleigenschaft nutzen",
                            step2_desc: "Für jede Dreiecksmatrix (obere oder untere) ist die Determinante einfach das Produkt der Einträge auf der Hauptdiagonale.",
                            step2_math: `\\det(B) = b_{11} \\times b_{22} \\times b_{33}`,
                            result_title: "Endergebnis",
                            result: `\\det(B) = 2 \\times (-4) \\times 3 = -24`
                        }
                    }
                }
            }
        },
    },
    pl: {
        matrixBasics: {
            title: "Podstawy Macierzy",
            description: "Zrozumienie definicji, typów i operacji na macierzach.",
            lessons: {
                lesson1_title: "Podstawy Macierzy",
                lesson1: {
                    section1: {
                        title1: "Czym jest Macierz?",
                        def1_1: "Macierz to prostokątna tablica liczb rzeczywistych. Macierz m x n to tablica mająca m wierszy i n kolumn, taka jak:",
                        ex1_1: ` A = \\begin{bmatrix}a_{11} & a_{12} & \\cdots & a_{1n} \\\\ a_{21} & a_{22} & \\cdots & a_{2n} \\\\ \\vdots & \\vdots & \\ddots & \\vdots \\\\ a_{m1} & a_{m2} & \\cdots & a_{mn} \\end{bmatrix}`,
                        expl1_1: "jeśli m = n, mówimy, że A jest macierzą kwadratową stopnia n. Zbiór wszystkich macierzy m x n o elementach rzeczywistych oznaczamy przez \\mathbb{R}^{m \\times n}.",
                    },
                    section2: {
                        title2: "Dodawanie Macierzy i Wektory",
                        def1_2: "Sumę macierzy (lub po prostu sumę) A + B dwóch macierzy A i B wymiaru m x n definiuje się jako macierz C wymiaru m x n taką, że c_{ij} = a_{ij} + b_{ij} dla wszystkich i oraz j. Mnożenie przez skalar \\lambda A macierzy A przez liczbę rzeczywistą \\lambda to macierz otrzymana przez pomnożenie każdego elementu A przez \\lambda.",
                        ex1_2: `Oto dwie macierze A i B. Niech
                        A = \\begin{bmatrix}1 & 0 & 0 &2 \\\\ 0 & 1 & 0 & 3 \\\\ 0 & 0 & 1 & 4 \\end{bmatrix}, oraz B = \\begin{bmatrix}0 & 1 & 0 & 5 \\\\ 1 & 0 & 1 & 6 \\\\ 0 & 0 & 0 & 7 \\end{bmatrix}. Wtedy,
                        A + B = \\begin{bmatrix}1 & 1 & 0 & 7 \\\\ 1 & 1 & 1 & 9 \\\\ 0 & 0 & 1 & 11 \\end{bmatrix}`,
                        ex1_3: `Podwojenie A daje 2A = \\begin{bmatrix}2 & 0 & 0 & 4 \\\\ 0 & 2 & 0 & 6 \\\\ 0 & 0 & 2 & 8 \\end{bmatrix}`,
                    },
                    section3: {
                        title3: "Mnożenie Macierzy",
                        def1_3: "Zdefiniowaliśmy już sumę dwóch macierzy i mnożenie macierzy przez skalar. Teraz zdefiniujemy mnożenie macierzy. Iloczyn AB dwóch macierzy A i B jest zdefiniowany tylko wtedy, gdy liczba kolumn macierzy A jest równa liczbie wierszy macierzy B. Przypuśćmy, że A = (\\mathbf{a}_1, \\mathbf{a}_2, \\cdots, \\mathbf{a}_n) jest macierzą m x n, a B jest macierzą n x p z kolumnami \\mathbf{b}_1, \\mathbf{b}_2, \\cdots, \\mathbf{b}_p. Wtedy iloczyn AB jest macierzą m x p, której j-ta kolumna to A\\mathbf{b}_j dla j = 1, 2, \\cdots, p.",
                        def1_3_2: "Innymi słowy, jeśli AB = C, to element c_{ij} macierzy C otrzymuje się mnożąc i-ty wiersz macierzy A przez j-tą kolumnę macierzy B. To znaczy, c_{ij} = \\sum_{k=1}^{n} a_{ik}  b_{kj}.",
                        text1_3: "Zauważ, że ogólnie rzecz biorąc, mnożenie macierzy nie jest przemienne. To znaczy, że na ogół AB \\ne BA.",
                        text2_3: "Oto dwa przykłady mnożenia macierzy.",
                        ex1_3: `\\begin{bmatrix} 1 & 3 \\\\ 0 & 2 \\end{bmatrix} \\begin{bmatrix} 4 & 5 \\\\ 6 & 7 \\end{bmatrix} = \\begin{bmatrix} 1 \\cdot 4 + 3 \\cdot 6 & 1 \\cdot 5 + 3 \\cdot 7 \\\\ 0 \\cdot 4 + 2 \\cdot 6 & 0 \\cdot 5 + 2 \\cdot 7 \\end{bmatrix} = \\begin{bmatrix} 22 & 26 \\\\ 12 & 14 \\end{bmatrix}`,
                        ex1_3_2: `\\begin{bmatrix} 2 & 0 & 1 \\\\ 3 & 4 & 5 \\end{bmatrix} \\begin{bmatrix} 1 & 2 \\\\ 0 & 1 \\\\ 4 & 0 \\end{bmatrix} = \\begin{bmatrix} 2 \\cdot 1 + 0 \\cdot 0 + 1 \\cdot 4 & 2 \\cdot 2 + 0 \\cdot 1 + 1 \\cdot 0 \\\\ 3 \\cdot 1 + 4 \\cdot 0 + 5 \\cdot 4 & 3 \\cdot 2 + 4 \\cdot 1 + 5 \\cdot 0 \\end{bmatrix} = \\begin{bmatrix} 6 & 4 \\\\ 23 & 10 \\end{bmatrix}`,
                    },
                    section4: {
                        title4: "Transpozycja Macierzy",
                        def1_4: " Transpozycja macierzy A wymiaru m x n to macierz A^T wymiaru n x m otrzymana przez zamianę wierszy i kolumn macierzy A. To znaczy, jeśli A = (a_{ij}), to A^T = (b_{ij}), gdzie b_{ij} = a_{ji} dla wszystkich i oraz j.",
                        ex1_4: `\\text{Jeśli } A = \\begin{bmatrix}1 & 2 & 3 \\\\ 4 & 5 & 6 \\end{bmatrix}, \\text{to }  A^T = \\begin{bmatrix}1 & 4 \\\\ 2 & 5 \\\\ 3 & 6 \\end{bmatrix}`,
                        def2_4: "Macierz A nazywamy symetryczną, jeśli A = A^T. Macierz A nazywamy antysymetryczną, jeśli A^T = -A.",
                        proposition1_4: "Niech A i B będą macierzami m x n. Wtedy zachodzą następujące stwierdzenia:",
                        item1_4: '1. (A^T)^T = A',
                        item2_4: '2. (A^T + B^T) = A^T + B^T',
                        item3_4: '3. (AB)^T = B^T A^T',
                    },
                    section5: {
                        title5: "Algebra Macierzy",
                        def1_5: "Z wyjątkiem przemienności mnożenia, dla macierzy obowiązują zwykłe prawa algebry.",
                        proposition1_5: "Zakładając, że wszystkie sumy i iloczyny są zdefiniowane, dodawanie i mnożenie macierzy spełnia następujące własności:",
                        item1_5: "1. A + B = B + A (Prawo przemienne dodawania)",
                        item2_5: "2. (A + B) + C = A + (B + C) (Prawo łączne dodawania)",
                        item3_5: "3. A(B C) = (AB)C (Prawo łączne mnożenia)",
                        item4_5: "4. A(B + C) = AB + AC (Prawo rozdzielne 1)",
                        item5_5: "5. (A + B)C = AC + BC (Prawo rozdzielne 2)",
                        item6_5: "6. I_m A = A i A I_n = A (Tożsamość multiplikatywna)",
                    },
                    example_section: {
                        title_ex: "Przykłady z Rozwiązaniami Krok po Kroku",
                        
                        example1: {
                            title: "1. Kombinacja Liniowa Macierzy",
                            problem: `Dane są A = \\begin{bmatrix} 2 & -1 \\\\ 0 & 3 \\end{bmatrix} \\text{ oraz } B = \\begin{bmatrix} 1 & 4 \\\\ 5 & -2 \\end{bmatrix}, \\text{ znajdź } 2A - B.`,
                            step1_title: "Krok 1: Wykonaj Mnożenie przez Skalar",
                            step1_desc: "Najpierw pomnóż każdy element macierzy A przez skalar 2.",
                            step1_math: `2A = 2\\begin{bmatrix} 2 & -1 \\\\ 0 & 3 \\end{bmatrix} = \\begin{bmatrix} 4 & -2 \\\\ 0 & 6 \\end{bmatrix}`,
                            step2_title: "Krok 2: Wykonaj Odejmowanie Macierzy",
                            step2_desc: "Odejmij odpowiednie elementy B od 2A.",
                            step2_math: `\\begin{bmatrix} 4 & -2 \\\\ 0 & 6 \\end{bmatrix} - \\begin{bmatrix} 1 & 4 \\\\ 5 & -2 \\end{bmatrix} = \\begin{bmatrix} 4-1 & -2-4 \\\\ 0-5 & 6-(-2) \\end{bmatrix}`,
                            result_title: "Ostateczna Odpowiedź",
                            result: `\\begin{bmatrix} 3 & -6 \\\\ -5 & 8 \\end{bmatrix}`
                        },

                        example2: {
                            title: "2. Mnożenie Macierzy",
                            problem: `Oblicz iloczyn AB gdzie A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix} \\text{ oraz } B = \\begin{bmatrix} 2 & 0 \\\\ 1 & -1 \\end{bmatrix}.`,
                            step1_title: "Krok 1: Sprawdź Wymiary",
                            step1_desc: "A jest 2x2 a B jest 2x2. Wymiary wewnętrzne są zgodne (2=2), więc wynik będzie macierzą 2x2.",
                            step2_title: "Krok 2: Oblicz Wiersze przez Kolumny",
                            step2_desc: "Pomnóż Wiersz 1 z A przez Kolumnę 1 z B:",
                            step2_math: `c_{11} = (1)(2) + (2)(1) = 2 + 2 = 4`,
                            step3_title: "Krok 3: Oblicz Pozostałe Elementy",
                            step3_math: `c_{12} = (1)(0) + (2)(-1) = -2 \\\\ c_{21} = (3)(2) + (4)(1) = 10 \\\\ c_{22} = (3)(0) + (4)(-1) = -4`,
                            result_title: "Ostateczna Odpowiedź",
                            result: `AB = \\begin{bmatrix} 4 & -2 \\\\ 10 & -4 \\end{bmatrix}`
                        },

                        example3: {
                            title: "3. Transpozycja Macierzy Niekwadratowej",
                            problem: `Znajdź transpozycję A^T macierzy A = \\begin{bmatrix} 1 & 2 & 0 \\\\ 3 & 5 & 9 \\end{bmatrix}.`,
                            step1_title: "Krok 1: Zidentyfikuj Wymiary",
                            step1_desc: "Macierz A ma 2 wiersze i 3 kolumny (2x3). Transpozycja A^T odwróci te wymiary na 3x2.",
                            step2_title: "Krok 2: Zamień Wiersze i Kolumny",
                            step2_desc: "Wiersz 1 macierzy A staje się Kolumną 1 macierzy A^T. Wiersz 2 macierzy A staje się Kolumną 2 macierzy A^T.",
                            step2_math: `\\text{Wiersz 1 } [1, 2, 0] \\rightarrow \\text{Kolumna 1} \\\\ \\text{Wiersz 2 } [3, 5, 9] \\rightarrow \\text{Kolumna 2}`,
                            result_title: "Ostateczna Odpowiedź",
                            result: `A^T = \\begin{bmatrix} 1 & 3 \\\\ 2 & 5 \\\\ 0 & 9 \\end{bmatrix}`
                        }
                    },
                }
            }
        },
        determinants: {
            title: "Wyznaczniki",
            description: "Dowiedz się, jak obliczać wyznaczniki i poznaj ich właściwości.",
            lessons: {
                lesson2_title: "Wyznaczniki",
                lesson2: {
                    section1: {
                        title1: "Wprowadzenie do Wyznaczników",
                        def1_1: "Wyznacznik to wartość skalarna, którą można obliczyć z elementów macierzy kwadratowej i która koduje pewne właściwości przekształcenia liniowego opisanego przez macierz.",
                        def2_2: "Wyznacznik det(A) macierzy A definiuje się jako",
                        def2_2_formula: `det(A) := \\sum_{\\pi \\in S_n} \\text{sgn}(\\pi) \\, a_{\\pi(1),1} a_{\\pi(2),2} \\cdots a_{\\pi(n),n}`,
                        def2_2_explanation: "gdzie:",
                        def2_2_item1_1: "\\sum_{\\pi \\in S_n}: Sumowanie po wszystkich możliwych permutacjach (\\pi) w grupie symetrycznej S_n (wszystkie sposoby uporządkowania n liczb).",
                        def2_2_item1_2: "\\text{sgn}(\\pi): Znak permutacji (+1 dla permutacji parzystych, -1 dla permutacji nieparzystych).",
                        def2_2_item1_3: "a_{\\pi(i),i}: Konkretne elementy macierzy wybrane przez funkcję permutacji \\pi(i) dla każdej kolumny i.",
                        text_1_1: "Załóżmy, że A jest 2 x 2. W S_2 są tylko dwa elementy: permutacja tożsamościowa (1 2) i transpozycja (2 1). Zatem z definicji:",
                        ex1_1: "det \\begin{bmatrix} a_{11} a_{12} \\\\ a_{21} a_{22} \\end{bmatrix} = a_{11}a_{22} - a_{12}a_{21}",
                    },
                    section2: {
                        title2: "Wyznaczniki 2 x 2 i 3 x 3",
                        def1_2: "Wyznacznik macierzy 2 x 2 A = \\begin{bmatrix} a_{11} & a_{12} \\\\ a_{21} & a_{22} \\end{bmatrix} jest dany wzorem det(A) = a_{11}a_{22} - a_{12}a_{21}.",
                        ex1_2: "Na przykład, dla A = \\begin{bmatrix} 3 & 5 \\\\ 2 & 4 \\end{bmatrix}, mamy det(A) = (3)(4) - (5)(2) = 12 - 10 = 2.",
                        def2_2: "Wyznacznik macierzy 3 x 3 A = \\begin{bmatrix} a_{11} & a_{12} & a_{13} \\\\ a_{21} & a_{22} & a_{23} \\\\ a_{31} & a_{32} & a_{33} \\end{bmatrix} jest dany wzorem:",
                        def2_2_formula: `det(A) = a_{11}(a_{22}a_{33} - a_{23}a_{32}) - a_{12}(a_{21}a_{33} - a_{23}a_{31}) + a_{13}(a_{21}a_{32} - a_{22}a_{31})`,
                        ex2_2: "Na przykład, dla A = \\begin{bmatrix} 1 & 2 & 3 \\\\ 0 & 4 & 5 \\\\ 1 & 0 & 6 \\end{bmatrix}, mamy det(A) = 1(4*6 - 5*0) - 2(0*6 - 5*1) + 3(0*0 - 4*1) = 24 + 10 - 12 = 22.",
                    },
                    section3: {
                        titl3: "Rozwinięcie Laplace’a",
                        def1_3: "Dopełnienie algebraiczne C_{ij} elementu a_{ij} w macierzy kwadratowej A jest zdefiniowane jako C_{ij} = (-1)^{i+j} M_{ij}, gdzie M_{ij} jest minorem elementu a_{ij}, otrzymanym przez usunięcie i-tego wiersza i j-tej kolumny z A.",
                        def2_3: "Wyznacznik macierzy n x n A można obliczyć za pomocą rozwinięcia Laplace’a względem dowolnego wiersza lub kolumny. Dla rozwinięcia względem i-tego wiersza mamy:",
                        def2_3_formula: `det(A) = \\sum_{i=1}^{n} (-1)^{i+j} a_{ij} det(A_{ij})`,
                        def2_3_explanation: `To jest rozwinięcie Laplace’a względem i-tego wiersza, gdzie A_{ij} jest macierzą (n-1) x (n-1) otrzymaną przez usunięcie i-tego wiersza i j-tej kolumny z A.`,
                        ex1_3: "Na przykład, dla macierzy A = \\begin{bmatrix} 1 & 2 & 3 \\\\ 0 & 4 & 5 \\\\ 1 & 0 & 6 \\end{bmatrix} rozwinięcie względem pierwszego wiersza daje ",
                        ex1_3_end: "det(A) = 1 * C_{11} + 2 * C_{12} + 3 * C_{13} = 1 * det\\begin{bmatrix}4 & 5 \\\\ 0 & 6\\end{bmatrix} - 2 * det\\begin{bmatrix}0 & 5 \\\\ 1 & 6\\end{bmatrix} + 3 * det\\begin{bmatrix}0 & 4 \\\\ 1 & 0\\end{bmatrix} = 24 + 10 - 12 = 22.",
                    },
                    section4: {
                        title4: "Właściwości Wyznaczników",
                        description: "Wyznacznik spełnia kilka właściwości algebraicznych, które ułatwiają obliczenia i dają wgląd w naturę macierzy.",
                        prop1_name: "Multiplikatywność",
                        prop1_description: "Wyznacznik iloczynu dwóch macierzy kwadratowych jest równy iloczynowi ich wyznaczników:",
                        prop1_formula: `det(AB) = det(A) \\cdot det(B)`,
                        prop2_name: "Odwracalność",
                        prop2_description: "Macierz jest odwracalna (nieosobliwa) wtedy i tylko wtedy, gdy jej wyznacznik jest różny od zera:",
                        prop2_formula: `A \\text{ jest odwracalna } \\iff det(A) \\ne 0`,
                        prop3_name: "Niezmienniczość przy Transpozycji",
                        prop3_description: "Wyznacznik macierzy jest równy wyznacznikowi jej transpozycji:",
                        prop3_formula: `det(A) = det(A^T)`,
                        prop4_name: "Wyznacznik Macierzy Odwrotnej",
                        prop4_description: "Jeśli macierz jest odwracalna, wyznacznik jej odwrotności jest odwrotnością wyznacznika tej macierzy:",
                        prop4_formula: `det(A^{-1}) = \\frac{1}{det(A)}`,
                    },
                    example_section: {
                        title_ex: "Przykłady z Rozwiązaniami Krok po Kroku",
                        ex1: {
                            title: "1. Wyznacznik Macierzy 2x2",
                            problem: `Znajdź wyznacznik macierzy A = \\begin{bmatrix} 4 & 3 \\\\ 6 & -3 \\end{bmatrix}.`,
                            step1_title: "Krok 1: Zidentyfikuj Elementy",
                            step1_desc: "Elementy macierzy to a_{11} = 4, a_{12} = 3, a_{21} = 6, oraz a_{22} = -3.",
                            step2_title: "Krok 2: Zastosuj Wzór na Wyznacznik",
                            step2_desc: "Użyj wzoru na wyznacznik macierzy 2x2: det(A) = a_{11}a_{22} - a_{12}a_{21}.",
                            step2_math: `det(A) = (4)(-3) - (3)(6)`,
                            result_title: "Ostateczna Odpowiedź",
                            result: `det(A) = -12 - 18 = -30`
                        },
                        ex2: {
                            title: "2. Wyznacznik Macierzy 3x3 (Rozwinięcie Laplace’a)",
                            problem: `Oblicz wyznacznik A = \\begin{bmatrix} 1 & 5 & 0 \\\\ 2 & 4 & -1 \\\\ 0 & -2 & 0 \\end{bmatrix}.`,
                            step1_title: "Krok 1: Wybierz Wiersz lub Kolumnę",
                            step1_desc: "Możemy rozwijać względem dowolnego wiersza lub kolumny. Aby uprościć obliczenia, wybierz ten z największą liczbą zer. Tutaj Kolumna 3 ma dwa zera.",
                            step1_math: `\\det(A) = a_{13}C_{13} + a_{23}C_{23} + a_{33}C_{33}`,
                            step2_title: "Krok 2: Oblicz Niezerowy Minor",
                            step2_desc: "Tylko środkowy wyraz jest niezerowy (gdzie a_{23} = -1). Znajdujemy minor ignorując Wiersz 2 i Kolumnę 3.",
                            step2_math: `\\text{Minor} = \\det \\begin{bmatrix} 1 & 5 \\\\ 0 & -2 \\end{bmatrix} = (1)(-2) - (5)(0) = -2`,
                            step3_title: "Krok 3: Zastosuj Znaki i Rozwiąż",
                            step3_desc: "Znak dopełnienia dla pozycji (2,3) jest ujemny (-).",
                            result_title: "Ostateczna Odpowiedź",
                            result: `\\det(A) = -1 \\times (-\\text{Minor}) = (-1) \\times -(-2) = -2`
                        },
                        ex3: {
                            title: "3. Wyznacznik Macierzy Trójkątnej",
                            problem: `Znajdź wyznacznik macierzy trójkątnej górnej B = \\begin{bmatrix} 2 & 7 & -3 \\\\ 0 & -4 & 5 \\\\ 0 & 0 & 3 \\end{bmatrix}.`,
                            step1_title: "Krok 1: Zidentyfikuj Typ Macierzy",
                            step1_desc: "Zauważ, że wszystkie elementy poniżej głównej przekątnej są równe zero. To jest macierz Trójkątna Górna.",
                            step2_title: "Krok 2: Użyj Właściwości Przekątnej",
                            step2_desc: "Dla dowolnej macierzy trójkątnej (górnej lub dolnej), wyznacznik jest po prostu iloczynem elementów na głównej przekątnej.",
                            step2_math: `\\det(B) = b_{11} \\times b_{22} \\times b_{33}`,
                            result_title: "Ostateczna Odpowiedź",
                            result: `\\det(B) = 2 \\times (-4) \\times 3 = -24`
                        }
                    }
                }
            }
        },
    },
    ro: {
        matrixBasics: {
            title: "Bazele Matricelor",
            description: "Înțelegerea definițiilor, tipurilor și operațiilor cu matrice.",
            lessons: {
                lesson1_title: "Bazele Matricelor",
                lesson1: {
                    section1: {
                        title1: "Ce este o Matrice?",
                        def1_1: "O matrice este un tablou rectangular de numere reale. O matrice m x n este un tablou având m linii și n coloane, astfel:",
                        ex1_1: ` A = \\begin{bmatrix}a_{11} & a_{12} & \\cdots & a_{1n} \\\\ a_{21} & a_{22} & \\cdots & a_{2n} \\\\ \\vdots & \\vdots & \\ddots & \\vdots \\\\ a_{m1} & a_{m2} & \\cdots & a_{mn} \\end{bmatrix}`,
                        expl1_1: "dacă m = n, spunem că A este o matrice pătratică de gradul n. Mulțimea tuturor matricelor m x n cu elemente reale va fi notată cu \\mathbb{R}^{m \\times n}.",
                    },
                    section2: {
                        title2: "Adunarea Matricelor și Vectorii",
                        def1_2: "Suma matricială (sau simplu suma) A + B a două matrice A și B de dimensiune m x n este definită ca matricea C de dimensiune m x n astfel încât c_{ij} = a_{ij} + b_{ij} pentru toți i și j. Multiplicarea cu un scalar \\lambda A a lui A cu un număr real \\lambda este matricea obținută prin înmulțirea fiecărui element al lui A cu \\lambda.",
                        ex1_2: `Aici avem două matrice A și B. Fie
                        A = \\begin{bmatrix}1 & 0 & 0 &2 \\\\ 0 & 1 & 0 & 3 \\\\ 0 & 0 & 1 & 4 \\end{bmatrix}, și B = \\begin{bmatrix}0 & 1 & 0 & 5 \\\\ 1 & 0 & 1 & 6 \\\\ 0 & 0 & 0 & 7 \\end{bmatrix}. Atunci,
                        A + B = \\begin{bmatrix}1 & 1 & 0 & 7 \\\\ 1 & 1 & 1 & 9 \\\\ 0 & 0 & 1 & 11 \\end{bmatrix}`,
                        ex1_3: `Dublarea lui A dă 2A = \\begin{bmatrix}2 & 0 & 0 & 4 \\\\ 0 & 2 & 0 & 6 \\\\ 0 & 0 & 2 & 8 \\end{bmatrix}`,
                    },
                    section3: {
                        title3: "Înmulțirea Matricelor",
                        def1_3: "Am definit deja suma a două matrice și înmulțirea unei matrice cu un scalar. Acum vom defini înmulțirea matricelor. Produsul AB a două matrice A și B este definit doar atunci când numărul de coloane ale lui A este egal cu numărul de linii ale lui B. Presupunem că A = (\\mathbf{a}_1, \\mathbf{a}_2, \\cdots, \\mathbf{a}_n) este o matrice m x n și B este o matrice n x p cu coloanele \\mathbf{b}_1, \\mathbf{b}_2, \\cdots, \\mathbf{b}_p. Atunci produsul AB este matricea m x p a cărei coloană j este A\\mathbf{b}_j pentru j = 1, 2, \\cdots, p.",
                        def1_3_2: "Cu alte cuvinte, dacă AB = C, atunci elementul c_{ij} al lui C este obținut prin înmulțirea liniei i a lui A cu coloana j a lui B. Adică, c_{ij} = \\sum_{k=1}^{n} a_{ik}  b_{kj}.",
                        text1_3: "Observați că, în general, înmulțirea matricelor nu este comutativă. Adică, AB \\ne BA în general.",
                        text2_3: "Aici avem două exemple de înmulțire a matricelor.",
                        ex1_3: `\\begin{bmatrix} 1 & 3 \\\\ 0 & 2 \\end{bmatrix} \\begin{bmatrix} 4 & 5 \\\\ 6 & 7 \\end{bmatrix} = \\begin{bmatrix} 1 \\cdot 4 + 3 \\cdot 6 & 1 \\cdot 5 + 3 \\cdot 7 \\\\ 0 \\cdot 4 + 2 \\cdot 6 & 0 \\cdot 5 + 2 \\cdot 7 \\end{bmatrix} = \\begin{bmatrix} 22 & 26 \\\\ 12 & 14 \\end{bmatrix}`,
                        ex1_3_2: `\\begin{bmatrix} 2 & 0 & 1 \\\\ 3 & 4 & 5 \\end{bmatrix} \\begin{bmatrix} 1 & 2 \\\\ 0 & 1 \\\\ 4 & 0 \\end{bmatrix} = \\begin{bmatrix} 2 \\cdot 1 + 0 \\cdot 0 + 1 \\cdot 4 & 2 \\cdot 2 + 0 \\cdot 1 + 1 \\cdot 0 \\\\ 3 \\cdot 1 + 4 \\cdot 0 + 5 \\cdot 4 & 3 \\cdot 2 + 4 \\cdot 1 + 5 \\cdot 0 \\end{bmatrix} = \\begin{bmatrix} 6 & 4 \\\\ 23 & 10 \\end{bmatrix}`,
                    },
                    section4: {
                        title4: "Transpusa unei Matrice",
                        def1_4: " Transpusa unei matrice A de dimensiune m x n este matricea A^T de dimensiune n x m obținută prin interschimbarea liniilor și coloanelor lui A. Adică, dacă A = (a_{ij}), atunci A^T = (b_{ij}), unde b_{ij} = a_{ji} pentru toți i și j.",
                        ex1_4: `\\text{Dacă } A = \\begin{bmatrix}1 & 2 & 3 \\\\ 4 & 5 & 6 \\end{bmatrix}, \\text{atunci } A^T = \\begin{bmatrix}1 & 4 \\\\ 2 & 5 \\\\ 3 & 6 \\end{bmatrix}`,
                        def2_4: "O matrice A se numește simetrică dacă A = A^T. O matrice A se numește antisimetrică dacă A^T = -A.",
                        proposition1_4: "Fie A și B matrice m x n. Atunci au loc următoarele afirmații:",
                        item1_4: '1. (A^T)^T = A',
                        item2_4: '2. (A^T + B^T) = A^T + B^T',
                        item3_4: '3. (AB)^T = B^T A^T',
                    },
                    section5: {
                        title5: "Algebra Matricelor",
                        def1_5: "Cu excepția comutativității înmulțirii, legile obișnuite ale algebrei sunt valabile pentru matrice.",
                        proposition1_5: "Presupunând că toate sumele și produsele sunt definite, adunarea și înmulțirea matricelor satisfac următoarele proprietăți:",
                        item1_5: "1. A + B = B + A (Legea comutativă a adunării)",
                        item2_5: "2. (A + B) + C = A + (B + C) (Legea asociativă a adunării)",
                        item3_5: "3. A(B C) = (AB)C (Legea asociativă a înmulțirii)",
                        item4_5: "4. A(B + C) = AB + AC (Legea distributivă 1)",
                        item5_5: "5. (A + B)C = AC + BC (Legea distributivă 2)",
                        item6_5: "6. I_m A = A și A I_n = A (Identitatea multiplicativă)",
                    },
                    example_section: {
                        title_ex: "Exemple cu Soluții Pas cu Pas",
                        
                        example1: {
                            title: "1. Combinație Liniară de Matrice",
                            problem: `Date fiind A = \\begin{bmatrix} 2 & -1 \\\\ 0 & 3 \\end{bmatrix} \și B = \\begin{bmatrix} 1 & 4 \\\\ 5 & -2 \\end{bmatrix}, \calculați 2A - B.`,
                            step1_title: "Pasul 1: Efectuați Înmulțirea cu un Scalar",
                            step1_desc: "Mai întâi, înmulțiți fiecare element din matricea A cu scalarul 2.",
                            step1_math: `2A = 2\\begin{bmatrix} 2 & -1 \\\\ 0 & 3 \\end{bmatrix} = \\begin{bmatrix} 4 & -2 \\\\ 0 & 6 \\end{bmatrix}`,
                            step2_title: "Pasul 2: Efectuați Scăderea Matricială",
                            step2_desc: "Scădeți elementele corespunzătoare ale lui B din 2A.",
                            step2_math: `\\begin{bmatrix} 4 & -2 \\\\ 0 & 6 \\end{bmatrix} - \\begin{bmatrix} 1 & 4 \\\\ 5 & -2 \\end{bmatrix} = \\begin{bmatrix} 4-1 & -2-4 \\\\ 0-5 & 6-(-2) \\end{bmatrix}`,
                            result_title: "Răspuns Final",
                            result: `\\begin{bmatrix} 3 & -6 \\\\ -5 & 8 \\end{bmatrix}`
                        },

                        example2: {
                            title: "2. Înmulțirea Matricelor",
                            problem: `Calculați produsul AB unde A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix} \și B = \\begin{bmatrix} 2 & 0 \\\\ 1 & -1 \\end{bmatrix}.`,
                            step1_title: "Pasul 1: Verificați Dimensiunile",
                            step1_desc: "A este 2x2 și B este 2x2. Dimensiunile interne se potrivesc (2=2), deci rezultatul va fi o matrice 2x2.",
                            step2_title: "Pasul 2: Calculați Linii cu Coloane",
                            step2_desc: "Înmulțiți Linia 1 a lui A cu Coloana 1 a lui B:",
                            step2_math: `c_{11} = (1)(2) + (2)(1) = 2 + 2 = 4`,
                            step3_title: "Pasul 3: Calculați Elementele Rămase",
                            step3_math: `c_{12} = (1)(0) + (2)(-1) = -2 \\\\ c_{21} = (3)(2) + (4)(1) = 10 \\\\ c_{22} = (3)(0) + (4)(-1) = -4`,
                            result_title: "Răspuns Final",
                            result: `AB = \\begin{bmatrix} 4 & -2 \\\\ 10 & -4 \\end{bmatrix}`
                        },

                        example3: {
                            title: "3. Transpusa unei Matrice Nepătratice",
                            problem: `Găsiți transpusa A^T a matricei A = \\begin{bmatrix} 1 & 2 & 0 \\\\ 3 & 5 & 9 \\end{bmatrix}.`,
                            step1_title: "Pasul 1: Identificați Dimensiunile",
                            step1_desc: "Matricea A are 2 linii și 3 coloane (2x3). Transpusa A^T va inversa aceste dimensiuni devenind 3x2.",
                            step2_title: "Pasul 2: Interschimbați Liniile și Coloanele",
                            step2_desc: "Linia 1 a lui A devine Coloana 1 a lui A^T. Linia 2 a lui A devine Coloana 2 a lui A^T.",
                            step2_math: `\\text{Linia 1 } [1, 2, 0] \\rightarrow \\text{Coloana 1} \\\\ \\text{Linia 2 } [3, 5, 9] \\rightarrow \\text{Coloana 2}`,
                            result_title: "Răspuns Final",
                            result: `A^T = \\begin{bmatrix} 1 & 3 \\\\ 2 & 5 \\\\ 0 & 9 \\end{bmatrix}`
                        }
                    },
                }
            }
        },
        determinants: {
            title: "Determinanți",
            description: "Învățați cum să calculați determinanții și proprietățile lor.",
            lessons: {
                lesson2_title: "Determinanți",
                lesson2: {
                    section1: {
                        title1: "Introducere în Determinanți",
                        def1_1: "Determinantul este o valoare scalară care poate fi calculată din elementele unei matrice pătratice și codifică anumite proprietăți ale transformării liniare descrise de matrice.",
                        def2_2: "Determinantul det(A) al matricei A este definit ca",
                        def2_2_formula: `det(A) := \\sum_{\\pi \\in S_n} \\text{sgn}(\\pi) \\, a_{\\pi(1),1} a_{\\pi(2),2} \\cdots a_{\\pi(n),n}`,
                        def2_2_explanation: "unde:",
                        def2_2_item1_1: "\\sum_{\\pi \\in S_n}: Suma peste toate permutările posibile (\\pi) în grupul simetric S_n (toate modurile de a ordona n numere).",
                        def2_2_item1_2: "\\text{sgn}(\\pi): Semnul permutării (+1 pentru permutări pare, -1 pentru permutări impare).",
                        def2_2_item1_3: "a_{\\pi(i),i}: Elementele specifice ale matricei selectate de funcția de permutare \\pi(i) pentru fiecare coloană i.",
                        text_1_1: "Să presupunem că A este 2 x 2. Există doar două elemente în S_2: permutarea identitate (1 2) și transpoziția (2 1). Astfel, prin definiție:",
                        ex1_1: "det \\begin{bmatrix} a_{11} a_{12} \\\\ a_{21} a_{22} \\end{bmatrix} = a_{11}a_{22} - a_{12}a_{21}",
                    },
                    section2: {
                        title2: "Determinanți 2 x 2 și 3 x 3",
                        def1_2: "Determinantul unei matrice 2 x 2 A = \\begin{bmatrix} a_{11} & a_{12} \\\\ a_{21} & a_{22} \\end{bmatrix} este dat de det(A) = a_{11}a_{22} - a_{12}a_{21}.",
                        ex1_2: "De exemplu, pentru A = \\begin{bmatrix} 3 & 5 \\\\ 2 & 4 \\end{bmatrix}, avem det(A) = (3)(4) - (5)(2) = 12 - 10 = 2.",
                        def2_2: "Determinantul unei matrice 3 x 3 A = \\begin{bmatrix} a_{11} & a_{12} & a_{13} \\\\ a_{21} & a_{22} & a_{23} \\\\ a_{31} & a_{32} & a_{33} \\end{bmatrix} este dat de:",
                        def2_2_formula: `det(A) = a_{11}(a_{22}a_{33} - a_{23}a_{32}) - a_{12}(a_{21}a_{33} - a_{23}a_{31}) + a_{13}(a_{21}a_{32} - a_{22}a_{31})`,
                        ex2_2: "De exemplu, pentru A = \\begin{bmatrix} 1 & 2 & 3 \\\\ 0 & 4 & 5 \\\\ 1 & 0 & 6 \\end{bmatrix}, avem det(A) = 1(4*6 - 5*0) - 2(0*6 - 5*1) + 3(0*0 - 4*1) = 24 + 10 - 12 = 22.",
                    },
                    section3: {
                        titl3: "Dezvoltarea după Cofactori (Dezvoltarea Laplace)",
                        def1_3: "Cofactorul C_{ij} al unui element a_{ij} într-o matrice pătratică A este definit ca C_{ij} = (-1)^{i+j} M_{ij}, unde M_{ij} este minorul lui a_{ij}, obținut prin eliminarea liniei i și coloanei j din A.",
                        def2_3: "Determinantul unei matrice n x n A poate fi calculat folosind dezvoltarea după cofactori de-a lungul oricărei linii sau coloane. Pentru dezvoltarea de-a lungul liniei i, avem:",
                        def2_3_formula: `det(A) = \\sum_{i=1}^{n} (-1)^{i+j} a_{ij} det(A_{ij})`,
                        def2_3_explanation: `Aceasta este dezvoltarea Laplace de-a lungul liniei i, unde A_{ij} este matricea (n-1) x (n-1) obținută prin eliminarea liniei i și coloanei j din A.`,
                        ex1_3: "De exemplu, pentru matricea A = \\begin{bmatrix} 1 & 2 & 3 \\\\ 0 & 4 & 5 \\\\ 1 & 0 & 6 \\end{bmatrix} dezvoltarea de-a lungul primei linii dă ",
                        ex1_3_end: "det(A) = 1 * C_{11} + 2 * C_{12} + 3 * C_{13} = 1 * det\\begin{bmatrix}4 & 5 \\\\ 0 & 6\\end{bmatrix} - 2 * det\\begin{bmatrix}0 & 5 \\\\ 1 & 6\\end{bmatrix} + 3 * det\\begin{bmatrix}0 & 4 \\\\ 1 & 0\\end{bmatrix} = 24 + 10 - 12 = 22.",
                    },
                    section4: {
                        title4: "Proprietățile Determinanților",
                        description: "Determinantul satisface câteva proprietăți algebrice care fac calculul mai ușor și oferă perspective asupra matricei.",
                        prop1_name: "Multiplicativitate",
                        prop1_description: "Determinantul produsului a două matrice pătratice este egal cu produsul determinanților lor:",
                        prop1_formula: `det(AB) = det(A) \\cdot det(B)`,
                        prop2_name: "Inversabilitate",
                        prop2_description: "O matrice este inversabilă (nesingulară) dacă și numai dacă determinantul său este nenul:",
                        prop2_formula: `A \\text{ este inversabilă } \\iff det(A) \\ne 0`,
                        prop3_name: "Invarianță la Transpunere",
                        prop3_description: "Determinantul unei matrice este egal cu determinantul transpusei sale:",
                        prop3_formula: `det(A) = det(A^T)`,
                        prop4_name: "Determinantul Inversei",
                        prop4_description: "Dacă o matrice este inversabilă, determinantul inversei sale este reciproca determinantului matricei:",
                        prop4_formula: `det(A^{-1}) = \\frac{1}{det(A)}`,
                    },
                    example_section: {
                        title_ex: "Exemple cu Soluții Pas cu Pas",
                        ex1: {
                            title: "1. Determinantul unei Matrice 2x2",
                            problem: `Găsiți determinantul matricei A = \\begin{bmatrix} 4 & 3 \\\\ 6 & -3 \\end{bmatrix}.`,
                            step1_title: "Pasul 1: Identificați Elementele",
                            step1_desc: "Elementele matricei sunt a_{11} = 4, a_{12} = 3, a_{21} = 6 și a_{22} = -3.",
                            step2_title: "Pasul 2: Aplicați Formula Determinantului",
                            step2_desc: "Folosiți formula pentru determinantul unei matrice 2x2: det(A) = a_{11}a_{22} - a_{12}a_{21}.",
                            step2_math: `det(A) = (4)(-3) - (3)(6)`,
                            result_title: "Răspuns Final",
                            result: `det(A) = -12 - 18 = -30`
                        },
                        ex2: {
                            title: "2. Determinantul unei Matrice 3x3 (Dezvoltarea după Cofactori)",
                            problem: `Calculați determinantul matricei A = \\begin{bmatrix} 1 & 5 & 0 \\\\ 2 & 4 & -1 \\\\ 0 & -2 & 0 \\end{bmatrix}.`,
                            step1_title: "Pasul 1: Alegeți o Linie sau o Coloană",
                            step1_desc: "Putem dezvolta după orice linie sau coloană. Pentru a simplifica calculul, alegeți-o pe cea cu cele mai multe zerouri. Aici, Coloana 3 are două zerouri.",
                            step1_math: `\\det(A) = a_{13}C_{13} + a_{23}C_{23} + a_{33}C_{33}`,
                            step2_title: "Pasul 2: Calculați Minorul Nenul",
                            step2_desc: "Doar termenul din mijloc este nenul (unde a_{23} = -1). Găsim minorul ignorând Linia 2 și Coloana 3.",
                            step2_math: `\\text{Minor} = \\det \\begin{bmatrix} 1 & 5 \\\\ 0 & -2 \\end{bmatrix} = (1)(-2) - (5)(0) = -2`,
                            step3_title: "Pasul 3: Aplicați Semnele și Rezolvați",
                            step3_desc: "Semnul cofactorului pentru poziția (2,3) este negativ (-).",
                            result_title: "Răspuns Final",
                            result: `\\det(A) = -1 \\times (-\\text{Minor}) = (-1) \\times -(-2) = -2`
                        },
                        ex3: {
                            title: "3. Determinantul unei Matrice Triunghiulare",
                            problem: `Găsiți determinantul matricei triunghiulare superioare B = \\begin{bmatrix} 2 & 7 & -3 \\\\ 0 & -4 & 5 \\\\ 0 & 0 & 3 \\end{bmatrix}.`,
                            step1_title: "Pasul 1: Identificați Tipul Matricei",
                            step1_desc: "Observați că toate elementele de sub diagonala principală sunt zero. Aceasta este o matrice Triunghiulară Superioară.",
                            step2_title: "Pasul 2: Folosiți Proprietatea Diagonalei",
                            step2_desc: "Pentru orice matrice triunghiulară (superioară sau inferioară), determinantul este pur și simplu produsul elementelor de pe diagonala principală.",
                            step2_math: `\\det(B) = b_{11} \\times b_{22} \\times b_{33}`,
                            result_title: "Răspuns Final",
                            result: `\\det(B) = 2 \\times (-4) \\times 3 = -24`
                        }
                    }
                }
            }
        },
    }
}