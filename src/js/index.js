import {
  updateSliderHTML,
  updateScoreDOM,
  toggleStartBtn,
  resetGameBoard,
  displayElement,
  pauseDots
} from "./util";
import { addDot } from "./dot";
import { startTimer, clearTimer } from "./timer";
import {
  SMALL_VIEWPORT,
  INITIAL_SIZE,
  INITIAL_SLIDER_VALUE,
  NEW_DOT_INTERVAL,
  isCompetition,
  winningConfig
} from "./constant";

import instance from "./state";

// Main method to initialize the Gameboard and all its events
const dotsGameInit = function (config = {}) {
  // DOM Elements
  const $slider = document.getElementById("speedControl");
  const $startButton = document.getElementById("startBtn");
  const $resetButton = document.getElementById("clearBtn");
  const $modeSelectionDD = document.querySelector(".mode__selection");
  const $changeMode = document.getElementById("changeMode");

  //Default config of the game and can be overwritten by config passed by user
  const defaultConfig = {
    INITIAL_SIZE,
    INITIAL_SLIDER_VALUE,
    NEW_DOT_INTERVAL,
    isCompetition,
    winningConfig
  };

  // Overwritting the default config by user config
  config = { ...defaultConfig, ...config };

  let gameInterval;

  //Default behavior when the game loads initialy
  updateSliderHTML(instance.getState("currentSpeed"));
  updateScoreDOM(0);
  if (window.innerWidth > SMALL_VIEWPORT) {
    displayElement($modeSelectionDD);
  }

  //Attaching event listener to the elements on the Game board

  // Update currentSpeed when slider is adjusted
  $slider.addEventListener("input", (event) => {
    const { value } = event.target;
    instance.setState("currentSpeed", value);
    updateSliderHTML(value);
  });

  // Capture start/pause lick
  $startButton.addEventListener("click", () => {
    let isPlaying = instance.getState("isPlaying");
    instance.setState("isPlaying", !isPlaying);
    toggleStartBtn(!isPlaying);

    // Add a dot to a random spot every second
    if (instance.getState("isPlaying")) {
      gameInterval = setInterval(
        () => addDot(instance.state, config.INITIAL_SIZE),
        config.NEW_DOT_INTERVAL
      );
      if (config.isCompetition) {
        startTimer(gameInterval, config.winningConfig);
      }
    } else {
      clearTimer(gameInterval);
    }

    // stop the animation for all dots on the screen
    pauseDots(instance.getState("isPlaying"));
  });

  // Reset game will reset all the controls
  $resetButton.addEventListener("click", () => {
    resetGameBoard(gameInterval, instance.state);
  });

  // This only works for desktop viewport to change the mode of the game
  $changeMode.addEventListener("change", (event) => {
    const { value } = event.target;
    //resetGameBoard(gameInterval, instance.state);
    config.isCompetition = value === "competition" ? true : false;
  });
};

//Game intializer with the config passed from the user
dotsGameInit({ isCompetition: false });
