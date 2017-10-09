"use strict";

// Reading the input from the user that initiated the process.
let WWidth  = process.argv[2] || 30;    // Reading the 3rd argument as the World width
let WHeight = process.argv[3] || 10;    // Reading the 3rd argument as the World height

let SHx = process.argv[4] || 4;   //Snake head X coordinate
let SHy = process.argv[5] || 6;   //Snake head Y coordinate
let Sl  = process.argv[6] || 5;   // Snake length in segments including the head
let Sd  = process.argv[7] || 'S'; // Snake movement direction [N,S,E,W]

// Constants defined that render the world.
const WC = '+'; // world corner
const WV = '|'; // world vertical wall (edge)
const WH = '-'; // world horizontal wall (edge)
const WS = ' '; // world space (a space character)
const SH = 'Q'; // snake head
const SB = 'o'; // snake body
const SF = '*'; // snake food

// Define the World
let world = []; // A 2 dimensional matrix (Array of Arrays => Array of rows which is an array of row cells)
for (let row = 0; row < WHeight; row++) {
  world[row] = [];
  for (let col = 0; col < WWidth; col++) {
    world[row][col] = WS;
  }
}
// Set the world corners
world[0][0]                    = WC; // Top Left cell
world[WHeight - 1][0]          = WC; // Bottom Left cell
world[0][WWidth - 1]           = WC; // Top Right cell
world[WHeight - 1][WWidth - 1] = WC; // Bottom Right cell

// Set the world Vertical Walls (edges)
for (let row = 1; row < WHeight - 1; row++) {
  world[row][0] = world[row][WWidth - 1] = WV;
}
// Set the world Horizontal Walls (edges)
for (let col = 1; col < WWidth - 1; col++) {
  world[0][col] = world[WHeight - 1][col] = WH;
}

// Set the snake in the world
// TODO:Check if the SHx and SHy are within the world.
world[SHx][SHy] = SH;

let Br         = SHx;
let Bc         = SHy;
let hasExceded = false;
for (let body = 0; body < Sl; body++) {
  switch (Sd.toUpperCase()) {
    // Column movement
    case 'W':
      Bc--;
      break;
    case 'E':
      Bc++;
      break;
    // Row movement
    case 'N':
      Br++;
      break;
    case 'S':
      Br--;
      break;
  }
  if ((0 < Br) && (Br < WHeight - 1) && (0 < Bc) && (Bc < WWidth - 1)) {
    world[Br][Bc] = SB;
  } else {
    hasExceded = true;
    break;
  }
}


/**
 * Serializes the world matrix into an ASCII string
 * @param {string[][]} worldMatrix
 * @returns {string}
 */
function world2string(worldMatrix) {
  let s = ""; // Accumulator|Aggregator (this value accumulates the result of the following loops.
  for (let row = 0; row < worldMatrix.length; row++) {
    for (let col = 0; col < worldMatrix[row].length; col++) {
      s += worldMatrix[row][col];
    }
    s += '\n';
  }
  return s;
}

/**
 * Draws the world to the screen
 * @param {string[][]} worldMatrix
 */
function drawWorld(worldMatrix) {
  console.log(WWidth, WHeight);
  if (hasExceded) {
    console.warn('Snake body exceeded world');
  }
  console.log(world2string(worldMatrix));
}

drawWorld(world);

// TODO: Move the snake for 1 step

drawWorld(world);

