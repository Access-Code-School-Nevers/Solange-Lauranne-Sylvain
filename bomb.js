let bomb = document.getElementById('bomb');
document.onload =  hide(bomb);
let bombActivated = false;

document.addEventListener('keydown', (event) => {
  if ((event.code == 'Numpad0' || event.code == 'Space') && bombActivated == false) {
    let player = document.getElementById('player');
    bomb.style.top = player.offsetTop + 'px';
    bomb.style.left = player.offsetLeft + 'px';
    show(bomb);
    bombActivated = true;
    setTimeout(explodeBomb, 1500)
  }
});

function show(elem) {
  elem.style.display = 'block';
}

function hide(elem){
  elem.style.display = 'none';
}

function explodeBomb() {
  let blast = document.getElementsByClassName ('blast');
  for(i = 0; i< blast.length; i++) {
    show(blast.item(i));
  }
  let [x, y] = getSquare(bomb);
  console.log([x, y]);
  for (let i = x-1; i <= x+1; i++){
    for (let j = y-1; j<= y+1; j++) {
      console.log([i, j]);
      if (i >= 0 && j >= 0 && i < 25 && j < 25 && !!grid[i][j]) {
        elem = document.getElementById(grid[i][j]);
        if (grid[i][j] == 'player') {
          let replay = confirm('GAME OVER \n Do you want to play a game ?');
          if (replay) {
            location.reload();
          }
        }
        grid[i][j] = undefined;
        hide(elem);
      }
    }
  }
  setTimeout(function(){
    hide(bomb);
    for(i = 0; i< blast.length; i++) {
      hide(blast.item(i));
    }
    bombActivated = false;
  }, 1000);

  console.log(grid);
}
