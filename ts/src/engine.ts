interface State {
  views: {
    squares: NodeListOf<Element> | null;
    enemy: HTMLDivElement | null;
    timeLeft: HTMLDivElement | null;
    score: HTMLDivElement | null;
    life: HTMLDivElement | null;
  };
  values: {
    timerId: number | null;
    hitPosition: number | null;
    result: number;
    resultMin: number;
    currentTime: number;
    life: number;
  };
  actions: {
    timerId: ReturnType<typeof setTimeout>;
    countDownTimerId: ReturnType<typeof setTimeout>;
  };
}

const state: State = {
  views: {
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
    state.views.life!.textContent = String(state.values.life);
  }
}

function restartTimeLeft() {
  state.values.currentTime = 60;
  state.views.timeLeft!.textContent = String(state.values.currentTime);
}

function restartScore() {
  state.values.result = 0;
  state.views.score!.textContent = String(state.values.result);
}

function playSound(name: string) {
  let audio = new Audio(`../../assets/audios/${name}.m4a`);
  audio.volume = 0.2;
  audio.play();
}

function countDown() {
  state.values.currentTime--;
  state.views.timeLeft!.textContent = String(state.values.currentTime);

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
  state.views.squares!.forEach((square) => {
    square.classList.remove('enemy');
  });
  if (state.values.life > 0) {
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.views.squares![randomNumber];
    randomSquare.classList.add('enemy');
    state.values.hitPosition = Number(randomSquare.id);
  }
}

function addListener() {
  state.views.squares!.forEach((square) => {
    square.addEventListener('mousedown', () => {
      if (state.values.life > 0) {
        if (Number(square.id) === state.values.hitPosition) {
          state.values.result++;
          state.views.score!.textContent = String(state.values.result);
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
