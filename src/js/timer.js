import { openModal } from "./modal";
import instance from "./state";

// A timer plays if you play game in competition mode
const startTimer = (gameInterval, winningConfig) => {
  const $currentScore = document.getElementById("currentScore");
  const $timer = document.querySelector(".timer");
  const $clearBtn = document.getElementById("clearBtn");
  const $stopWatch = document.getElementById("stopWatch");

  $timer.classList.add("show");
  let counter = winningConfig.timeLimit;

  let gameTimer = setInterval(function () {
    if (counter <= 0) {
      clearInterval(gameTimer);
      $clearBtn.click();
    }
    $stopWatch.innerHTML = "00:" + zeroPad(counter, 2);
    counter = counter - 1;
    if (counter >= 0 && +$currentScore.innerHTML >= 10) {
      openModal(gameInterval, instance.state);
      clearInterval(gameTimer);
      $stopWatch.innerHTML = "00:00";
    }
  }, 1000);

  instance.setState("timerInterval", gameTimer);

  function zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
  }
};

const clearTimer = (timerId) => {
  clearInterval(timerId);
};

export { startTimer, clearTimer };
