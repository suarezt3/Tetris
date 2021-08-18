let lastTime = 0;
let dropInterval = 1000;
let dropCounter = 0;

const canvas = document.getElementById('tetris');
// returns a drawing context on the canvas
const context = canvas.getContext("2d");

const grid = createMatriz(10, 20);
// this constant keeps the player information -- esta constante mantiene la información del jugador
const player = {
  pos:{ x: 0, y: 0},
  matriz:[
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
  ]

}
//we do this because the domain usually has 10 columns and 20 rows
context.scale(20, 20);
// the width of the canva is 200, so dividing it by 20 gives us 10 equal to the usual width of a domain

// the height of the canva is 400 and dividing it into 20 gives us 20 equal to the rows

//_______________________________________________________________________________

function drawMatriz(matriz, offset){
  matriz.forEach((row, y) => {
    row.forEach((value, x)=>{
      if(value!==0){
        context.fillStyle = 'red';
        context.fillRect(x + offset.x, y + offset.y, 1, 1)
      }
    })
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

//_______________________________________________________________________________

function createMatriz(width, height){
  const matriz =[];
  while(height--){
    matriz.push(new Array(width).fill(0));

    console.table(matriz);

    return matriz

  }
}

//_______________________________________________________________________________

// function that allows the game to update every time it appears on the screen
function update(time = 0){
  const deltaTime = time - lastTime;
  // console.log(time);
  lastTime = time;
  dropCounter += deltaTime;
  if(dropCounter > dropInterval){
    player.pos.y++;
    dropCounter = 0;
  }

  
  draw();
  // informs the browser that it wishes to perform an animation and requests that the browser schedule the repaint of the window for the next animation cycle.informa al navegador que desea realizar una animación y solicita que el navegador programe el repintado de la ventana para el próximo ciclo de animación.
  requestAnimationFrame(update)

}
//_______________________________________________________________________________

// document.addEventListener("keydown", event=>{
//   if(event.keyCode === 40){

//   }
// })

update();