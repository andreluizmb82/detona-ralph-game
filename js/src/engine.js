const state = {
  view: {
    squares: document.querySelectorAll('.square'),
    enemy: document.querySelector('.enemy'),
    timeLeft: document.querySelector('#time-left'),
    score: document.querySelector('#score'),
    life: document.querySelector('#life'),
  },
  values: {
    timerId: null,
    hitPosition: 0,
    result: 0,
    resultMin: 60,
    currentTime: 60,
    life: 3,
  },
  actions: {
    timerId: setInterval(randomSquare, 2000),
    countDownTimerId: setInterval(countDown, 1000),
  },
};

function updateLive() {
  if (state.values.result < state.values.resultMin) {
    state.values.life--;
    state.view.life.textContent = state.values.life;
  }
}

function restartTimeLeft() {
  state.values.currentTime = 60;
  state.view.timeLeft.textContent = state.values.currentTime;
}

function restartScore() {
  state.values.result = 0;
  state.view.score.textContent = state.values.result;
}

function playSound(name) {
  let audio = new Audio(`../../assets/audios/${name}.m4a`);
  audio.volume = 0.2;
  audio.play();
}

function countDown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;

  if (state.values.currentTime <= 0) {
    updateLive();
    alert('Game Over! O seu resultado foi: ' + state.values.result);
    restartTimeLeft();
    restartScore();
    if (state.values.life <= 0) {
      clearInterval(state.actions.timerId);
      clearInterval(state.actions.countDownTimerId);
    }
  }
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove('enemy');
  });
  if (state.values.life > 0) {
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add('enemy');
    state.values.hitPosition = randomSquare.id;
  }
}

function addListener() {
  state.view.squares.forEach((square) => {
    square.addEventListener('mousedown', () => {
      if (state.values.life > 0) {
        if (square.id === state.values.hitPosition) {
          state.values.result++;
          state.view.score.textContent = state.values.result;
          state.values.hitPosition = null;
          playSound('hit');
          randomSquare();
        }
      }
    });
  });
}

function init() {
  addListener();
}

init();
