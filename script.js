// CONTANTS //
const moveSize = 32;

// INITIALIZE GRID //
let grid = Array(25);
for (let x = 0; x < 25; x++){
  grid[x] = Array(25);
}


// INITIALIZE PLAYER //
let player = document.getElementById('player');
grid[0][0] = 'player';

// INITIALIZE ENNEMIS AND WALLS //
let badguys = document.getElementsByClassName ("badguy");
window.onload = function() {
  for (i = 0; i < badguys.length; i++){
    let badguy = badguys.item(i);
    let [x, y] = getRandomPosition();
    badguy.setAttribute('id', 'badguy'+i)
    create (badguy, "badguy"+i, x, y);
  }
  let walls = document.getElementById ("walls");
  // console.log (wall)
  for (let i = 0; i < 150; i++){
    let wall = document.createElement ("div");
    walls.appendChild(wall);
    wall.classList.add ("wall");
    wall.setAttribute('id', 'wall'+i)
    let positionned = false;
    while (!positionned) {
      let [x, y] = getRandomPosition();
      positionned = create(wall, 'wall'+i, x, y);
    }
  }
}

// ENNEMI MOVEMENT //
setInterval(function() {
  for (i = 0; i< badguys.length; i++) {
    let direction = Math.floor(Math.random()*4);
    switch (direction) {
      case 1 : moveElem(badguys.item(i), "badguy"+i, 1, 0); break;
      case 2 : moveElem(badguys.item(i), "badguy"+i, -1, 0); break;
      case 3 : moveElem(badguys.item(i), "badguy"+i, 0, 1); break;
      case 0 : moveElem(badguys.item(i), "badguy"+i, 0, -1); break;
    }
    checkSides(badguys.item(i), 'player');
  }
}, 1000)

// PLAYER MOVEMENT ON ARROW KEY //
document.addEventListener('keydown', function(event) {
  if (event.code == 'ArrowUp') {
      moveElem(player, 'player', 0, -1);
  }
  else if (event.code == 'ArrowRight') {
      moveElem(player, 'player', 1, 0);
  }
  else if (event.code == 'ArrowDown') {
      moveElem(player, 'player', 0, 1);
  }
  else if (event.code == 'ArrowLeft') {
      moveElem(player, 'player', -1, 0);
  }
  checkSides(player, 'badguy');
});

function getRandomPosition() {
	let randomX = Math.floor(Math.random()*(25));
	let randomY = Math.floor(Math.random()*(25));
  // console.log ([randomX,randomY])
	return [randomX,randomY];
}

function create(elem, elemName, x, y) {
  if (!grid[x][y]){
    grid[x][y] = elemName;
    elem.style.top = y * 32 + 'px';
    elem.style.left = x * 32 + 'px';
    return true;
  }
  else {
    return false;
  }
}

function moveElem(elem, elemName, xMove, yMove) {
  let [x, y] = getSquare(elem);
  let fx = x + xMove;
  let fy = y + yMove;
  //check is destination is empty
  if(fx >= 0 && fx < 25 && fy >= 0 && fy < 25 && !grid[fx][fy]){
    //move elem in the grid
    grid[x][y] = undefined;
    grid[fx][fy] = elemName;
    //move html element
    elem.style.left = (x + xMove) * 32 + 'px';
    elem.style.top = (y + yMove) * 32 + 'px';
    return true;
  }
  else  { // impossible move
    return false;
  }
}

// renvoie la position dans la grille d'un élément
function getSquare(elem) {
  let topPx = Math.floor(elem.offsetTop);
  let leftPx = Math.floor(elem.offsetLeft);
  return [Math.floor(leftPx/32), Math.floor(topPx/32)];
}

function checkSides(elem, elemType) {
  console.log(elem);
  let [x, y] = getSquare(elem);
  for (let i = x-1; i <= x+1; i++){
    for (let j = y-1; j<= y+1; j++) {
      if (i >= 0 && j >= 0 && i < 25 && j < 25 && !!grid[i][j]) {
        console.log(grid[i][j]);
        console.log(grid[i][j].indexOf(elemType));
        if (grid[i][j].indexOf(elemType) >= 0 ) {
          let replay = confirm('GAME OVER \n Do you want to play a game ?');
          if (replay) {
            location.reload();
          }
        }
      }
    }
  }
}
