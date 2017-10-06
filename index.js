use strict";

let w = process.argv[2] || 30;
let h = process.argv[3] || 10;

let SHx = process.argv[4] || 1; //Snake head X coordinate
let SHy = process.argv[5] || 1; //Snake head Y coordinate
let Sl = process.argv[6] || 3; // Snake length in segments including the head
let Sd = process.argv[7] || 'W'; // Snake movement direction [N,S,E,W]

// Q - snake head
// o - snake body
// + - world corner
// | - world vertical wall (edge)
// - - world horizontal wall (edge)
//   - world space (a space character)
// * - snake food

const SH = 'Q'; // snake head
const SB = 'o'; // snake body
const WC = '+'; // world corner
const WV = '|'; // world vertical wall (edge)
const WH = '-'; // world horizontal wall (edge)
const WS = ' '; // world space (a space character)
const SF = '*'; // snake food

// Draw the World

var matrix = [];
for (var row = 0; row < h; row++) {
    matrix[row] = [];
    for (var col = 0; col < w; col++) {
        matrix[row][col] = WS;
    }
}
matrix[0][0] = WC;
matrix[h - 1][0] = WC;
matrix[0][w - 1] = WC;
matrix[h - 1][w - 1] = WC;

matrix [0][1] = WH;
matrix [0][2] = WH;
matrix [0][3] = WH;
matrix [0][4] = WH;

function strWorld(matrix) {
    var s = "";
    for (var row = 0; row < matrix.length; row++) {
        for (var col = 0; col < matrix[row].length; col++) {
            s += matrix[row][col];
        }
        s += '\n'
    }
    return s;
}

function drawWorld(matrix) {
    console.log(strWorld(matrix));
}

console.log(w, h);
drawWorld(matrix);


// Draw the World with a Snake in it
console.log(w, h, SHx, SHy, Sl, Sd);


// test shoot x___X
