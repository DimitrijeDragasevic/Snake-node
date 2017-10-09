"use strict";

// Reading the input from the user that initiated the process.
let WWidth  = process.argv[2] || 30;    // Reading the 3rd argument as the World width
let WHeight = process.argv[3] || 10;    // Reading the 3rd argument as the World height

let SHx = process.argv[4] || 4;   //Snake head X coordinate
let SHy = process.argv[5] || 6;   //Snake head Y coordinate
let Sl  = process.argv[6] || 3;   // Snake length in segments including the head
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

let snake = [[SHx, SHy]];
// world[SHx][SHy] = SH;

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
    snake.push([Br, Bc]);
    // world[Br][Bc] = SB;
  } else {
    hasExceded = true;
    break;
  }
}

function _inSnake(r, c, snakeArray) {
  for (let snakeSegmentIndex = 0; snakeSegmentIndex < snakeArray.length; snakeSegmentIndex++) {
    let snakeSegmentCoordinates = snakeArray[snakeSegmentIndex];
    if (snakeSegmentCoordinates[0] === r && snakeSegmentCoordinates[1] === c) {
      return snakeSegmentIndex;
    }
  }
  return -1;
}

/**
 * Serializes the world matrix into an ASCII string
 * @param {string[][]} worldMatrix
 * @returns {string}
 */
function world2string(worldMatrix, snakeArray) {
  let s = ""; // Accumulator|Aggregator (this value accumulates the result of the following loops.
  for (let row = 0; row < worldMatrix.length; row++) {
    for (let col = 0; col < worldMatrix[row].length; col++) {
      // if the coordinates (row, col) are present in the snake draw the corresponding character otherwise draw what
      // ever is in the World.
      let snakeSegmentIndex = _inSnake(row, col, snakeArray);
      if (snakeSegmentIndex < 0) {
        s += worldMatrix[row][col];
      } else {
        if (snakeSegmentIndex === 0) {
          s += SH;
        } else {
          s += SB;
        }
      }
    }
    s += '\n';
  }
  return s;
}

/**
 * Draws the world to the screen
 * @param {string[][]} worldMatrix
 * @param {number[]} snakeArray
 */
function drawWorld(worldMatrix, snakeArray) {
  console.log(WWidth, WHeight);
  if (hasExceded) {
    console.warn('Snake body exceeded world');
  }
  console.log(world2string(worldMatrix, snakeArray));
}


function moveSnake(snake, direction) {
  direction = direction || Sd;
  let head  = snake[0];
  switch (direction.toUpperCase()) {
    // Column movement
    case 'N':
      SHx = head[0] - 1;
      SHy = head[1];
      break;
    case 'S':
      SHx = head[0] + 1;
      SHy = head[1];
      break;
    // Row movement
    case 'W':
      SHx = head[0];
      SHy = head[1] - 1;
      break;
    case 'E':
      SHx = head[0];
      SHy = head[1] + 1;
      break;
  }
// if is NOT valid (SHx, SHy) Game over
  if (!isPositionEmpty(SHx, SHy)) {
    console.log('Game Over');
    process.exit(0);
  } else {
    snake.unshift([SHx, SHy]);
    snake.pop();
  }
}

function isPositionEmpty(r, c) {
  return world[r][c] === WS;
}

drawWorld(world, snake);

// TODO: Move the snake for 1 step
moveSnake(snake, 'W');
drawWorld(world, snake);
moveSnake(snake, 'S');
drawWorld(world, snake);
moveSnake(snake, 'E');
drawWorld(world, snake);
moveSnake(snake, 'N');
drawWorld(world, snake);

