MicroModal.init();
let xVaiO = 'X';
let uzvarasIespejas = [
  [0, 1, 2], // 1. rinda
  [3, 4, 5], // 2. rinda
  [6, 7, 8], // 3. rinda
  [0, 3, 6], // 1. kolonna
  [1, 4, 7], // 2. kolonna
  [2, 5, 8], // 3. kolonna
  [0, 4, 8], // 1. diagonāle
  [2, 4, 6], // 2. diagonāle
];

function sautKonfeti() {
  var defaults = {
    spread: 360,
    ticks: 50,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8'],
  };

  function shoot() {
    confetti({
      ...defaults,
      particleCount: 40,
      scalar: 1.2,
      shapes: ['star'],
    });

    confetti({
      ...defaults,
      particleCount: 10,
      scalar: 0.75,
      shapes: ['circle'],
    });
  }

  setTimeout(shoot, 0);
  setTimeout(shoot, 100);
  setTimeout(shoot, 200);
}

function parbauditUzvaru() {
  uzvarasIespejas.forEach((iespeja, kartasNumurs) => {
    let x = 0;
    let o = 0;
    iespeja.forEach((index) => {
      if (document.querySelectorAll('.poga')[index].innerText === 'X') {
        x++; // palielina x par 1
      } else if (document.querySelectorAll('.poga')[index].innerText === 'O') {
        o++; // palielina o par 1
      }
    });
    if (x === 3) {
      // alert('Uzvarēja X');
      document.querySelector('.uzvaretajs').innerText = 'X';
      setTimeout(MicroModal.show('modal-1'), 500);
      sautKonfeti();
    } else if (o === 3) {
      // alert('Uzvarēja O');
      document.querySelector('.uzvaretajs').innerText = '0';
      setTimeout(MicroModal.show('modal-1'), 500);
      sautKonfeti();
    }
    if (x === 3 || o === 3) {
      document.querySelector('.linijas').style.display = 'block';
      document.querySelectorAll('.linijas line')[kartasNumurs].style.display =
        'block';
    }
  });
}

function datoraGajiens() {
  let galds = [];
  document.querySelectorAll('.poga').forEach((poga, index) => {
    galds[index] = poga.innerHTML;
  });

  let gajiens = atrastLabakoGajienu(galds);
  if (gajiens !== -1) {
    document.querySelectorAll('.poga')[gajiens].innerText = xVaiO;
    document.querySelectorAll('.poga')[gajiens].disabled = true;
    xVaiO = xVaiO === 'X' ? 'O' : 'X';
  }

  parbauditUzvaru();
}

function atrastLabakoGajienu(galds) {
  // Vai varam uzvarēt?
  let winMove = findWinningMove(galds, xVaiO);
  if (winMove !== -1) return winMove;

  // Vai varam nobloķēt?
  let opponent = xVaiO === 'X' ? 'O' : 'X';
  let blockMove = findWinningMove(galds, opponent);
  if (blockMove !== -1) return blockMove;

  // Centrs
  if (galds[4] === '&nbsp;') return 4;

  // Pretējie stūri vai tukši stūri
  let corners = [0, 2, 6, 8];
  let move = findCornerMove(galds, corners);
  if (move !== -1) return move;

  // Tukšas malas
  let sides = [1, 3, 5, 7];
  for (let side of sides) {
    if (galds[side] === '&nbsp;') return side;
  }

  // Nekā nav
  return -1;
}

function findWinningMove(galds, player) {
  for (let i = 0; i < 9; i++) {
    if (galds[i] === '&nbsp;') {
      galds[i] = player;
      if (isWinning(galds, player)) {
        galds[i] = '&nbsp;';
        return i;
      }
      galds[i] = '&nbsp;';
    }
  }
  return -1;
}

function isWinning(galds, player) {
  return uzvarasIespejas.some((combination) => {
    return combination.every((index) => {
      return galds[index] === player;
    });
  });
}

function findCornerMove(galds, corners) {
  let opponent = xVaiO === 'X' ? 'O' : 'X';
  for (let corner of corners) {
    if (galds[corner] === '&nbsp;') {
      // Opposite corner
      let oppositeCorner = 8 - corner;
      if (galds[oppositeCorner] === opponent) return corner;
    }
  }

  // Any empty corner
  for (let corner of corners) {
    if (galds[corner] === '&nbsp;') return corner;
  }

  return -1;
}

const pogas = document.querySelectorAll('.poga');
pogas.forEach((poga) => {
  poga.addEventListener('click', () => {
    poga.innerText = xVaiO;
    poga.disabled = true;
    if (xVaiO === 'X') {
      xVaiO = 'O';
      setTimeout(datoraGajiens, 500);
    } else {
      xVaiO = 'X';
    }
    parbauditUzvaru();
  });
});
