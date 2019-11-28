

// Ce fichier présente 3 fonctions pour résoudre grille de Sudoku

// FONCTION :solveSudoku -> resoudre un grille de Sudoku
// input: sudoku: un matrix A(9)(9), la valeurs acceptées pour chaque cellule sont un numéro de 0-9 ou ""
// output: un matrix résoulu
// Méthode: Algorithme backtracking:
// 1. Essayer cellule par cellule.
// 2. Pour chaque cellule, trouver les valeur possible. 
// 3. Essayer le premier valeur possible pour cette cellule
// 4. Passer à la cellule prochaine. 
// 5. Répéter étape 2. S'il y a pas aucune valeur possible. Retourner à la cellule avant et essayer autre valeur possible
// 6. Terminer si tous cellule est remplie
function solveSudoku(sudoku) {
    var p
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            // travail avec les cellules non-remplies
            if (sudoku[i][j] === 0 || sudoku[i][j] === "") {
                for (let k = 1; k <= 9; k++) {
                    if (checkPosition(sudoku, i, j, k)) {
                        sudoku[i][j] = k;
                        p = solveSudoku(sudoku);
                        if (p) { return sudoku }
                        sudoku[i][j] = 0
                    }
                }
                return false
            }
        }
    }
    return sudoku
}

// FONCTION check -> vérifier si la grille sudoku est bien rempli (par de duplication dans ligne, colonne, 3x3)

function check(sudoku){
    for (let i = 0; i < 9; i++) {
        for(let j = 0;j <9;j++){
            let value=sudoku[i][j]
            if(value!=="" && value!==0){
                if (!checkPosition(sudoku,i,j,value)){
                    
                    return false
                }
            }
        }
    }
    return true
}

// FONCTION checkPosition -> vérifier si la value k est possible dans position x,y du grille sudoku
// input: sudoku: un matrix A(9)(9) , x, y position ligne et colonne(0-8), k : valeur(1-9)
// output: boolean - si la value k est possible dans position x,y de grille sudoku
function checkPosition(sudoku, x, y, k) {
    // verifier colonne
    for (let i = 0; i < 9; i++) {
        if (sudoku[x][i] === k && i!==y ) {
            return false
        }
    }
    // verifier ligne
    for (let i = 0; i < 9; i++) {
        if (sudoku[i][y] === k && i!==x) {
            return false
        }
    }
    // verifier  3x3
    let a = Math.floor(x / 3),
        b = Math.floor(y / 3)
    for (let i = 3 * a; i <= 3 * a + 2; i++) {
        for (let j = 3 * b; j <= 3 * b + 2; j++) {
            if (sudoku[i][j] === k && i!==x && j!==y) {
                return false
            }
        }
    }
    return true
}

export {solveSudoku,check}