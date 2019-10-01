var token = document.getElementById('token');
var moveSize = 50;
var parentRect = document.getElementById('board').getBoundingClientRect();
var childRect;

// Handle arrows to move the token
document.addEventListener('keydown', function(event) {
  childRect = document.getElementById('token').getBoundingClientRect();

  if (event.code == 'ArrowUp') {
    if(childRect.top > parentRect.top)
      token.style.top = (token.offsetTop - moveSize)+"px";
  }
  else if (event.code == 'ArrowRight') {
    if(childRect.right < parentRect.right)
      token.style.left = (token.offsetLeft + moveSize)+"px";
  }
  else if (event.code == 'ArrowDown') {
    if(childRect.bottom < parentRect.bottom)
      token.style.top = (token.offsetTop + moveSize)+"px";
  }
  else if (event.code == 'ArrowLeft') {
    if(childRect.left > parentRect.left)
      token.style.left = (token.offsetLeft - moveSize)+"px";
  }
});
