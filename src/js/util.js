import instance from "./state";

const generateRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

const updateScoreDOM = (newScore) => {
  const $currentScore = document.getElementById("currentScore");
  $currentScore.innerHTML = newScore;
};

const updateSliderHTML = (newValue) => {
  const $currentSpeed = document.getElementById("currentSpeed");
  $currentSpeed.innerHTML = `${newValue}`;
};

const updateScore = (state, scoreToAdd) => {
  const $currentScore = document.getElementById("currentScore");
  state.score += +scoreToAdd;
  $currentScore.innerHTML = state.score;
};

const toggleStartBtn = (isPlaying) => {
  const $startBtn = document.getElementById("startBtn");
  $startBtn.innerHTML = isPlaying ? "Pause" : "Start";
};

// Dots methods
const removeDot = (dot) => {
  dot.removeEventListener("animationend", removeDot);
  dot.parentNode.removeChild(dot);
};

const getPosition = (dotSize) => {
  const maxWidth = document.querySelector(".game__board").clientWidth;
  const leftPosition = generateRandomNumber(0, maxWidth - dotSize);
  return leftPosition;
};

const getAnimationTime = (fallRate) => {
  const windowHeight = window.innerHeight;
  return windowHeight / fallRate;
};

const addPointToScore = (state, dot) => {
  if (state.isPlaying) {
    updateScore(state, dot.dataset.value);
    removeDot(dot);
  }
};

const resetGameBoard = (gameInterval, gameInitialState) => {
  gameInitialState.score = 0;
  gameInitialState.isPlaying = false;
  gameInitialState.currentSpeed = 50;
  updateScoreDOM(0);
  updateSliderHTML(gameInitialState.currentSpeed);
  toggleStartBtn(false);
  document.getElementById("currentSpeed").value = gameInitialState.currentSpeed;
  document.querySelector(".timer").classList.remove("show");
  document.getElementById("speedControl").value = gameInitialState.currentSpeed;
  clearInterval(gameInterval);
  clearInterval(instance.getState("timerInterval"));
  resetDropDown(document.querySelectorAll("#changeMode option"));

  // Remove all dots from dom
  removeAllDots();
};

const resetDropDown = (element) => {
  for (let i = 0; i < element.length; i++) {
    element[i].selected = element[i].defaultSelected;
  }
};

const removeAllDots = () => {
  const dots = document.querySelectorAll(".dot");
  dots.forEach((cage) => {
    removeDot(cage);
  });
};

const displayElement = (element) => {
  element.classList.add("show");
};

const pauseDots = (isPlaying = false) => {
  const $dots = document.querySelectorAll(".dot");
  $dots.forEach((dot) => {
    dot.style.WebkitAnimationPlayState = isPlaying ? "running" : "paused";
    if (isPlaying) {
      dot.disabled = false;
    } else {
      dot.disabled = true;
    }
  });
};

export {
  generateRandomNumber,
  updateScore,
  updateScoreDOM,
  toggleStartBtn,
  updateSliderHTML,
  getPosition,
  getAnimationTime,
  addPointToScore,
  resetGameBoard,
  removeAllDots,
  displayElement,
  pauseDots,
  removeDot
};
