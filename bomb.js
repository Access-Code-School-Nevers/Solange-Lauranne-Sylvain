let bomb = document.getElementById('bomb');
document.onload =  hide(bomb);
let bombActivated = false;

document.addEventListener('keydown', (event) => {
  console.log(event.code);
  console.log(bombActivated);
  if (event.code == 'Numpad0' && bombActivated == false) {
    let player = document.getElementById('player');
    console.log(player);
    bomb.style.top = player.offsetTop + 'px';
    bomb.style.left = player.offsetLeft + 'px';
    show(bomb);
    bombActivated = true;
    bombTimerStart()
  }
});

function show(elem) {
  // elem.style.display = 'block';
  elem.classList.add('visible');
  elem.classList.remove('not-visible');
}

function hide(elem){
  // elem.style.display = 'none';
  elem.classList.add('not-visible');
  elem.classList.remove('visible');
}

function bombTimerStart() {
  //Décompter un timer
  explodeBomb();
}

function explodeBomb() {
  
}
