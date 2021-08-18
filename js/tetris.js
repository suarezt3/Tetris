let lastTime = 0;

const canvas = document.getElementById('tetris');
// returns a drawing context on the canvas
const context = canvas.getContext("2d");

const grid = createMatriz(10,20);

//we do this because the domain usually has 10 columns and 20 rows 
context.scale(20, 20);
// the width of the canva is 200, so dividing it by 20 gives us 10 equal to the usual width of a domain

// the height of the canva is 400 and dividing it into 20 gives us 20 equal to the rows

//_______________________________________________________________________________

// this function allows us to paint the canvas__ esta función nos permite pintar el lienzo
function draw(){
  // this gives the color to the canvas
  context.fillStyle = '#000';
  // draw a rectangle at position (x, y) and the size is determined by (width and height)
  context.fillRect(0,0,canvas.width, canvas.height);
}

draw()
//_______________________________________________________________________________

function createMatriz(width,height){
  const matriz =[];
  while(height--){
    
  }
}

//_______________________________________________________________________________

// function that allows the game to update every time it appears on the screen
function update(time = 0){
  const deltaTime = time - lastTime;
  // console.log(time);
  lastTime = time;
  
  // informs the browser that it wishes to perform an animation and requests that the browser schedule the repaint of the window for the next animation cycle.informa al navegador que desea realizar una animación y solicita que el navegador programe el repintado de la ventana para el próximo ciclo de animación.
  requestAnimationFrame(update)
}

update();