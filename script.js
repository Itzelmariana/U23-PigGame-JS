'use strict';

let modal = document.querySelector('.modal');
let overlay = document.querySelector('.overlay');
let btnCloseModal = document.querySelector('.close-modal');
let btnsOpenModal = document.querySelectorAll('.show-modal');

function displayModal() {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}

function closeModalEsc(event) {
  if (event.key == 'Escape') {
    closeModal();
  }
}

for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener('click', displayModal);
}

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', closeModalEsc);

let p0El = document.querySelector('.player--0');
let p1El = document.querySelector('.player--1');
let p0Score = document.querySelector('#score--0');
let p1Score = document.querySelector('#score--1');
let p0Current = document.querySelector('#current--0');
let p1Current = document.querySelector('#current--1');

let diceEl = document.querySelector('.dice');
let diceBtn = document.querySelector('.btn--roll');
let holdBtn = document.querySelector('.btn--hold');
let newGameBtn = document.querySelector('.btn--new');

let scores, currentScore, activePlayer, playing;

function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  p0Score.textContent = 0;
  p1Score.textContent = 0;
  p0Current.textContent = 0;
  p1Current.textContent = 0;

  diceEl.classList.add('hidden');
  p0El.classList.remove('player--winner');
  p1El.classList.remove('player--winner');
  p0El.classList.add('player--active');
  p1El.classList.remove('player--active');
}
init();

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  p0El.classList.toggle('player--active');
  p1El.classList.toggle('player--active');
}

function rollDice() {
  if (playing) {
    let randoNum1 = Math.floor(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `./images/dice-${randoNum1}.png`;

    if (randoNum1 !== 1) {
      currentScore += randoNum1;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
}

function handleHold() {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
}

holdBtn.addEventListener('click', handleHold);
diceBtn.addEventListener('click', rollDice);
newGameBtn.addEventListener('click', init);
