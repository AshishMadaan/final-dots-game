import {
  removeDot,
  generateRandomNumber,
  getPosition,
  getAnimationTime,
  addPointToScore
} from "./util";

// A method to add the dot on the Game board
export const addDot = (state, initialSize) => {
  const $gameBoard = document.querySelector(".game__board");
  const randomNum = generateRandomNumber(0, 10);

  const dotSize = randomNum * 10 + initialSize;
  const dotConfig = {
    size: dotSize,
    value: 10 - randomNum,
    position: getPosition(dotSize)
  };

  const dotHTML = document.createElement("div");
  dotHTML.classList.add("dot");
  dotHTML.setAttribute(
    "style",
    `
    height: ${dotConfig.size}px;
    width: ${dotConfig.size}px;
    animation: slideDown ${getAnimationTime(state.currentSpeed)}s linear;
    left: ${dotConfig.position}px;
    `
  );
  dotHTML.setAttribute("data-value", `${dotConfig.value}`);
  dotHTML.addEventListener("click", () => addPointToScore(state, dotHTML));
  dotHTML.addEventListener("animationend", () => removeDot(dotHTML));

  $gameBoard.appendChild(dotHTML);
};
