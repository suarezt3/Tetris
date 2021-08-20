let lastTime = 0;
let dropInterval = 1000; //? This variable is what controls the speed with which the chips fall
let dropCounter = 0;

const canvas = document.getElementById("tetris");
// returns a drawing context on the canvas
const context = canvas.getContext("2d");
const canvasNext = document.getElementById("nextPiece");
const contextNext = canvasNext.getContext("2d");
const grid = createMatriz(10, 20);
const colors = [
  null,
  "red",
  "blue",
  "violet",
  "green",
  "purple",
  "orange",
  "pink",
];
// this constant keeps the player information -- esta constante mantiene la información del jugador
const player = {
  pos: { x: 0, y: 0 },
  matriz: null,
  next: null,
  score: 0,
  level: 0,
  lines: 0,
};
//we do this because the domain usually has 10 columns and 20 rows
context.scale(20, 20);
contextNext.scale(19, 19);

// the width of the canva is 200, so dividing it by 20 gives us 10 equal to the usual width of a domain

// the height of the canva is 400 and dividing it into 20 gives us 20 equal to the rows
//_______________________________________________________________________________

//? What this function does is create the pieces
function createPiece(tipo) {
  switch(tipo){
    case "T":
      return [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
      ];
      break;
    case "O":
      return [
        [2, 2],
        [2, 2],
      ];
      break;
    case "L":
      return [
        [0, 3, 0],
        [0, 3, 0],
        [0, 3, 3],
      ];
      break;
    case "J":
      return [
        [0, 4, 0],
        [0, 4, 0],
        [4, 4, 0],
      ];
      break;
    case "I":
      return [
        [0, 5, 0, 0],
        [0, 5, 0, 0],
        [0, 5, 0, 0],
        [0, 5, 0, 0],
      ];
      break;
    case "S":
      return [
        [0, 6, 6],
        [6, 6, 0],
        [0, 0, 0],
      ];
      break;
    case "Z":
      return [
        [7, 7, 0],
        [0, 7, 7],
        [0, 0, 0],
      ];
      break;
  }

}

//_______________________________________________________________________________

function createMatriz(width, height) {
  const matriz = [];
  while (height--) {
    matriz.push(new Array(width).fill(0));

    // console.table(matriz);
  }
  return matriz;
}

//_______________________________________________________________________________

function collide(grid, player) {
  const matriz = player.matriz;
  const offset = player.pos;

  for (let y = 0; y < matriz.length; ++y) {
    for (let x = 0; x < matriz[y].length; ++x) {
      if (
        matriz[y][x] !== 0 &&
        (grid[y + offset.y] && grid[y + offset.y][x + offset.x]) !== 0
      ) {
        return true;
      }
    }
  }

  return false;
}
// console.log(collide(grid, player))

//_______________________________________________________________________________

function merge(grid, player) {
  player.matriz.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        grid[y + player.pos.y][x + player.pos.x] = value;
      }
    });
  });
}

//_______________________________________________________________________________

function drawMatriz(matriz, offset) {
  matriz.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        context.fillStyle = colors[value];
        context.fillRect(x + offset.x, y + offset.y, 1, 1);
      }
    });
  });
}

//__________________________________________________________________________________
// This function is from the box that shows the following tab
function drawMatrizNext (matriz, offset) {
  contextNext.fillStyle = "#000";
  contextNext.fillRect (0, 0, canvasNext.width, canvasNext.height);
  matriz.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        contextNext.fillStyle = colors[value];
        contextNext.fillRect(x + offset.x, y + offset.y, 1, 1);
      }
    });
  });
} 


//_______________________________________________________________________________

// this function allows us to paint the canvas__ esta función nos permite pintar el lienzo
function draw() {
  // this gives the color to the canvas
  context.fillStyle = "#000";
  // draw a rectangle at position (x, y) and the size is determined by (width and height)
  context.fillRect(0, 0, canvas.width, canvas.height);
  drawMatriz(grid, { x: 0, y: 0 });
  drawMatriz(player.matriz, player.pos);
  drawMatrizNext(player.next, {x:1, y:1})

}
// draw();
//____________________________________________________________________________________
// What this function does is erase the lines that are being completed
function gridSweep() {
  let rowCount = 1;
  outer: for (let y = grid.length - 1; y > 0; --y) {
    for (let x = 0; x < grid[y].length; ++x) {
      if (grid[y][x] === 0) {
        continue outer;
      }
    }
    const row = grid.splice(y, 1)[0].fill(0);
    grid.unshift(row);
    ++y;
    player.score += rowCount * 10;
    player.lines++;
    rowCount *= 2;
    if (player.lines % 3 === 0) player.level++;
  }
}


//_______________________________________________________________________________

// function that allows the game to update every time it appears on the screen
function update(time = 0) {
  const deltaTime = time - lastTime;
  // console.log(time);
  lastTime = time;
  dropCounter += deltaTime;
  if (dropCounter > dropInterval) {
    playerDrop();
  }

  draw();
  // informs the browser that it wishes to perform an animation and requests that the browser schedule the repaint of the window for the next animation cycle.informa al navegador que desea realizar una animación y solicita que el navegador programe el repintado de la ventana para el próximo ciclo de animación.
  requestAnimationFrame(update);
}
//_______________________________________________________________________________

function playerDrop() {
  player.pos.y++;
  if (collide(grid, player)) {
    player.pos.y--;
    merge(grid, player);
    playerReset();
    gridSweep();
    updateScore();
  }
  // console.log(collide)
  dropCounter = 0;
}
//_______________________________________________________________________________

function playerMove(direction) {
  player.pos.x += direction;
  if (collide(grid, player)) {
    player.pos.x -= direction;
  }
}
//_______________________________________________________________________________

function playerRotate() {
  const pos = player.pos.x;
  let offset = 1;
  rotate(player.matriz);
  while (collide(grid, player)) {
    player.pos.x += offset;
    offset = -(offset + (offset > 0 ? 1 : -1));
    if (offset > player.matriz[0].length) {
      rotate(player.matriz);
      player.pos.x = pos;
      return;
    }
  }
}

//_______________________________________________________________________________

function rotate(matriz) {
  for (let y = 0; y < matriz.length; ++y) {
    for (let x = 0; x < y; ++x) {
      [matriz[x][y], matriz[y][x]] = [matriz[y][x], matriz[x][y]];
    }
  }

  matriz.forEach((row) => row.reverse());
}

//_______________________________________________________________________________

function playerReset() {
  const pieces = "ILJOTSZ";
  dropInterval = 1000 - (player.level * 100);
  if (player.next === null) {
    player.matriz = createPiece(pieces[pieces.length * Math.random() | 0]);
  }else {
    player.matriz = player.next;
  }
  player.next = createPiece(pieces[pieces.length * Math.random() | 0]);
  player.pos.x =(grid[0].length / 2 | 0) - (player.matriz[0].length / 2 | 0);
  player.pos.y = 0;
  if(collide(grid, player)){
    grid.forEach(row => row.fill(0));
    player.score = 0;
    player.level = 0;
    player.lines = 0;
    updateScore();
  }
}

function updateScore() {
  document.getElementById("score").innerHTML = player.score;
  document.getElementById("level").innerHTML = player.level;
  document.getElementById("lines").innerHTML = player.lines;
}
// pieces[pieces.length + Math.random() ]

console.log(playerReset())
console.log (player.matriz)

//_______________________________________________________________________________
document.addEventListener("keypress", (event) => {
  if (event.key === "s") {
    playerDrop();
  } else if (event.key === "a") {
    playerMove(-1);
  } else if (event.key === "d") {
    playerMove(1);
  } else if (event.key === "q") {
    playerRotate();
  }
});

playerReset();
updateScore();

// console.log(playerReset())
update();

