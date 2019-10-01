var player = document.getElementById('player');
var moveSize = 50;
var parentRect = document.getElementById('board').getBoundingClientRect();
var childRect;

// Handle arrows to move the player
document.addEventListener('keydown', function(event) {
  childRect = document.getElementById('player').getBoundingClientRect();
  // console.log(event.code);
  if (event.code == 'ArrowUp') {
    if(childRect.top > parentRect.top)
      player.style.top = (player.offsetTop - moveSize)+"px";
  }
  else if (event.code == 'ArrowRight') {
    if(childRect.right < parentRect.right - moveSize)
      player.style.left = (player.offsetLeft + moveSize)+"px";
  }
  else if (event.code == 'ArrowDown') {
    if(childRect.bottom < parentRect.bottom - moveSize)
      player.style.top = (player.offsetTop + moveSize)+"px";
  }
  else if (event.code == 'ArrowLeft') {
    if(childRect.left > parentRect.left)
      player.style.left = (player.offsetLeft - moveSize)+"px";
  }
});
