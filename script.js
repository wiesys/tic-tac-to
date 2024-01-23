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
  let brivieIndeksi = [];
  document.querySelectorAll('.poga').forEach((poga, index) => {
    if (poga.innerHTML === '&nbsp;') {
      brivieIndeksi.push(index);
    }
  });
  const randomIndex = brivieIndeksi[Math.floor(Math.random() * brivieIndeksi.length)];
  document.querySelectorAll('.poga')[randomIndex].innerText = xVaiO;
  document.querySelectorAll('.poga')[randomIndex].disabled = true;
  if (xVaiO === 'X') {
    xVaiO = 'O';
  } else {
    xVaiO = 'X';
  }
  parbauditUzvaru();
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
