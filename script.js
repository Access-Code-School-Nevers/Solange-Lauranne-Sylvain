// INITIALIZATION //
const moveSize = 32;
let score = 0;
let bestScore = 0;
let level = 0;
let player = document.getElementById('player');
let badguys = document.getElementsByClassName ("badguy");
let walls = document.getElementById ("walls");
let badguySpeed = 1000;
// grid //
let grid = Array(25);
for (let x = 0; x < 25; x++){
  grid[x] = Array(25);
}
let wallMaxId = 0;

loadGame();

function loadGame() {
  // grid
  for(let i = 0; i < 25; i++){
    for(let j = 0; j < 25; j++){
      grid[i][j] = undefined;
    }
  }
  // place player
  let [px, py] = getSquare(player);
  grid[0][0] = 'player';
  player.style.top = '0px';
  player.style.left = '0px';
  // place badguys
  for (i = 0; i < badguys.length; i++){
    let badguy = badguys.item(i);
    badguy.setAttribute('id', 'badguy'+i)
    place (badguy, "badguy"+i);
  }
  // delete existing walls
  let previousWalls = document.getElementsByClassName("wall");
  while (i < previousWalls.length){
    walls.removeChild(previousWalls.item(i));
  }
  // add new walls
  addWalls(150);
  // update score and level
  if (score > bestScore) {
    bestScore = score;
  }
  score = 0;
  level = 0;
  badguySpeed = 1000;
  document.getElementById('score').textContent = 0;
  document.getElementById('bestscore').textContent = bestScore;
  document.getElementById('level').textContent = level;

}

// ENNEMI MOVEMENT in a random direction//
setInterval(function() {
  for (i = 0; i< badguys.length; i++) {
    let direction = Math.floor(Math.random()*4);
    switch (direction) {
      case 1 : moveElem(badguys.item(i), "badguy"+i, 1, 0); break;
      case 2 : moveElem(badguys.item(i), "badguy"+i, -1, 0); break;
      case 3 : moveElem(badguys.item(i), "badguy"+i, 0, 1); break;
      case 0 : moveElem(badguys.item(i), "badguy"+i, 0, -1); break;
    }
    // checkSides(badguys.item(i), 'player');
  }
}, badguySpeed)

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
  // checkSides(player, 'badguy');
});

function getRandomPosition() {
	let randomX = Math.floor(Math.random()*(25));
	let randomY = Math.floor(Math.random()*(25));
	return [randomX,randomY];
}

function place(elem, elemName) {
  let [x, y] = getRandomPosition();
  while (!!grid[x][y]){
    [x, y] = getRandomPosition();
  }
  grid[x][y] = elemName;
  elem.style.top = y * 32 + 'px';
  elem.style.left = x * 32 + 'px';
}

function moveElem(elem, elemName, xMove, yMove) {
  let [x, y] = getSquare(elem);
  let fx = x + xMove;
  let fy = y + yMove;
  //check is destination is empty
  if(fx >= 0 && fx < 25 && fy >= 0 && fy < 25 && (grid[fx][fy] == 'player' || !grid[fx][fy])) {
    //move html element
    elem.style.left = (x + xMove) * 32 + 'px';
    elem.style.top = (y + yMove) * 32 + 'px';
    if (grid[fx][fy] == 'player') {
      gameOver();
    }
    //move elem in the grid
    grid[x][y] = undefined;
    grid[fx][fy] = elemName;
    return true;
  }
  else  { // impossible move
    return false;
  }
}

// return the grid coordinates of an element
function getSquare(elem) {
  let topPx = Math.floor(elem.offsetTop);
  let leftPx = Math.floor(elem.offsetLeft);
  return [Math.floor(leftPx/32), Math.floor(topPx/32)];
}


// increase level every 15seconds
setInterval(function() {
  addWalls(50);
  document.getElementById('level').textContent = level;
}, 15000);

function addWalls(n) {
  if (countEmpty() > 75) {
    for (let i = wallMaxId; i < n + wallMaxId; i++){
      let wall = document.createElement ("div");
      walls.appendChild(wall);
      wall.classList.add ("wall");
      wall.setAttribute('id', 'wall'+i)
      place(wall, 'wall'+i);
    }
    level ++
    wallMaxId += n;
  }
  else {
    gameOver();
  }
}

function gameOver() {
  let replay = confirm(
    `GAME OVER \nYou reached level ${level} whith ${score} points. \nDo you want to play a new game ?`);
  if (replay) {
    loadGame();
  }
}

function countEmpty() {
  let count = 0;
  grid.forEach((row) => {
    row.forEach((square) => {
      if (!square) {
        count ++;
      }
    })
  })
  return count;
}
// function checkSides(elem, elemType) {
  // console.log(elem);
  // let [x, y] = getSquare(elem);
  // for (let i = x-1; i <= x+1; i++){
  //   for (let j = y-1; j<= y+1; j++) {
  //     if (i >= 0 && j >= 0 && i < 25 && j < 25 && !!grid[i][j]) {
  //       console.log(grid[i][j]);
  //       console.log(grid[i][j].indexOf(elemType));
  //       if (grid[i][j].indexOf(elemType) >= 0 ) {
  //         let replay = confirm('GAME OVER \n Do you want to play a game ?');
  //         if (replay) {
  //           location.reload();
  //         }
  //       }
  //     }
  //   }
  // }
// }
