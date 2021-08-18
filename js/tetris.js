let lastTime = 0;

const canvas = document.getElementById('tetris');
const context = canvas.getContext("2d");

//we do this because the domain usually has 10 columns and 20 rows 
context.scale(20, 20);
// the width of the canva is 200, so dividing it by 20 gives us 10 equal to the usual width of a domain

// the height of the canva is 400 and dividing it into 20 gives us 20 equal to the rows
//_______________________________________________________________________________

// function that allows the game to update every time it appears on the screen
function update(time = 0){
  const deltaTime = time - lastTime;
  // console.log(time);
  lastTime = time;
  // this gives the color to the canvas
  context.fillStyle = '#000';
  // draw a rectangle at position (x, y) and the size is determined by (width and height)
  context.fillRect(0,0,canvas.width, canvas.height);
  
  requestAnimationFrame(update)
}

update();