let lastTime = 0;
let dropInterval = 1000; //? This variable is what controls the speed with which the chips fall
let dropCounter = 0;

const canvas = document.getElementById('tetris');
// returns a drawing context on the canvas
const context = canvas.getContext("2d");

const grid = createMatriz(10, 20); 
// this constant keeps the player information -- esta constante mantiene la información del jugador
const player = {
  pos:{ x: 0, y: 0},
  matriz: []
};
//we do this because the domain usually has 10 columns and 20 rows
context.scale(20, 20);
// the width of the canva is 200, so dividing it by 20 gives us 10 equal to the usual width of a domain

// the height of the canva is 400 and dividing it into 20 gives us 20 equal to the rows
//_______________________________________________________________________________

//? What this function does is create the pieces
function createPiece(tipo){
  if(tipo === 'T'){
    return [
      [0, 0, 0],
      [0, 1, 0],
      [1, 1, 1],
    ];
  } 
  else if(tipo === 'O'){
    return [
      [1, 1],
      [1, 1],
    ];
  } 
  else if(tipo === 'L'){
    return [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
    ];
  }
  else if(tipo === 'J'){
    return [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0],
    ];
  }
  else if(tipo === 'I'){
    return [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ];
  }
  else if(tipo === 'S'){
    return [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ];
  }
  else if(tipo === 'Z'){
    return [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ];
  }

}

//_______________________________________________________________________________

function createMatriz(width, height){
  const matriz =[];
  while(height--){
    matriz.push(new Array(width).fill(0));

    // console.table(matriz);
  }
  return matriz
}

//_______________________________________________________________________________

function collide(grid, player){
  const matriz = player.matriz;
  const offset = player.pos;
  
  for(let y = 0; y < matriz.length; ++y){
    for(let x=0; x < matriz[y].length; ++x){
      if(matriz[y][x] !== 0 && (grid[y + offset.y] && grid[y + offset.y][x + offset.x]) !== 0 ){
        return true;
      }
    }
  }
  
  return false;
}
// console.log(collide(grid, player))

//_______________________________________________________________________________


function merge(grid, player){
  player.matriz.forEach((row, y) =>{
    row.forEach((value, x)=>{
      if(value !== 0){
        grid[y + player.pos.y][x + player.pos.x] = value;
      }
    })
  })
  
}

//_______________________________________________________________________________

function drawMatriz(matriz, offset){
  matriz.forEach((row, y) => {
    row.forEach((value, x)=>{
      if(value!==0){
        context.fillStyle = 'red';
        context.fillRect(x + offset.x, y + offset.y, 1, 1);
      }
    });
  });
}

//_______________________________________________________________________________

// this function allows us to paint the canvas__ esta función nos permite pintar el lienzo
function draw(){
  // this gives the color to the canvas
  context.fillStyle = '#000';
  // draw a rectangle at position (x, y) and the size is determined by (width and height)
  context.fillRect(0,0,canvas.width, canvas.height);
  drawMatriz(grid, {x:0, y:0});
  drawMatriz(player.matriz, player.pos)
}

draw()
//_______________________________________________________________________________

// function that allows the game to update every time it appears on the screen
function update(time = 0){
  const deltaTime = time - lastTime;
  // console.log(time);
  lastTime = time;
  dropCounter += deltaTime;
  if(dropCounter > dropInterval){
    playerDrop();
  }
  
  draw();
  // informs the browser that it wishes to perform an animation and requests that the browser schedule the repaint of the window for the next animation cycle.informa al navegador que desea realizar una animación y solicita que el navegador programe el repintado de la ventana para el próximo ciclo de animación.
  requestAnimationFrame(update)

}
//_______________________________________________________________________________

function playerDrop(){
  player.pos.y++;
  if(collide(grid, player)){
    player.pos.y--;
    merge(grid, player)
    playerReset();
  }
  // console.log(collide)
  dropCounter = 0; 
}
//_______________________________________________________________________________

function playerMove(direction){
  player.pos.x += direction;
  if(collide(grid, player)){
    player.pos.x -= direction
  }
}
//_______________________________________________________________________________

function playerRotate(){
  const pos = player.pos.x;
  let offset = 1;
  rotate(player.matriz);
  while(collide(grid, player)){
    player.pos.x += offset;
    offset = -(offset + (offset> 0 ? 1: -1));
    if(offset > player.matriz[0].length){
      rotate(player.matriz);
      player.pos.x = pos;
      return;
    }
  }
}

//_______________________________________________________________________________

function rotate(matriz){
  for(let y = 0; y < matriz.length; ++y){
    for(let x = 0; x < y; ++x){
      [matriz[x][y], matriz[y][x]] = [matriz[y][x], matriz[x][y]]
    }
  }

  matriz.forEach(row => row.reverse());

}

//_______________________________________________________________________________

function playerReset(){
  const pieces = 'ILJOTSZ';
  player.matriz = createPiece(pieces[pieces.length * Math.random() | 0]);
  player.pos.x = 0;
  player.pos.y = 0
}

// pieces[pieces.length + Math.random() ]

// console.log(playerReset())

//_______________________________________________________________________________
document.addEventListener("keypress", event =>{
  if(event.key === "s"){
    playerDrop();
  }else if (event.key === "a"){
    playerMove(-1);
  }
  else if (event.key === "d"){
    playerMove(1);
  }else if (event.key === "q"){
    playerRotate();
  }
})
playerReset()
// console.log(playerReset())
update();