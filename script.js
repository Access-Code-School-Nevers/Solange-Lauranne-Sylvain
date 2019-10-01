

var player = document.getElementById('player');
var moveSize = 32;
var parentRect = document.getElementById('board').getBoundingClientRect();
var childRect;

// PLAYER MOVEMENT //
document.addEventListener('keydown', function(event) {

  childRect = document.getElementById('player').getBoundingClientRect();

  if (event.code == 'ArrowUp') {
    if(childRect.top > parentRect.top)
      player.style.top = (player.offsetTop - moveSize)+"px";
  }
  else if (event.code == 'ArrowRight') {
    if(childRect.right < parentRect.right)
      player.style.left = (player.offsetLeft + moveSize)+"px";
  }
  else if (event.code == 'ArrowDown') {
    if(childRect.bottom < parentRect.bottom)
      player.style.top = (player.offsetTop + moveSize)+"px";
  }
  else if (event.code == 'ArrowLeft') {
    if(childRect.left > parentRect.left)
      player.style.left = (player.offsetLeft - moveSize)+"px";
  }
});

// RANDOM ENNEMI //
function getRandomPosition() {
	var randomX = Math.floor(Math.random()*(25));
	var randomY = Math.floor(Math.random()*(25));
  console.log ([randomX,randomY])
	return [randomX,randomY];
}
window.onload = function() {
	var badguys = document.getElementsByClassName ("badguy");
  console.log (badguys)
  for (i = 0; i < badguys.length; i++){
    randomPos(badguys.item(i));
  }
  var walls = document.getElementById ("walls");
  // console.log (wall)
  for (let i = 0; i < 50; i++){
  let wall = document.createElement ("div");
  walls.appendChild(wall)
  wall.classList.add ("wall")
  randomPos(wall);
  }
}
function randomPos(elem) {
  var xy = getRandomPosition();
  elem.style.top = xy[0] * 32 + 'px';
  elem.style.left = xy[1] * 32 + 'px';
}
