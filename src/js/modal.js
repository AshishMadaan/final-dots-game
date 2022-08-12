import { toggleStartBtn, pauseDots, resetGameBoard } from "./util";

// A basic modal overlay to which gives winning game information
const openModal = (gameInterval, state) => {
  const modal = document.querySelector(".modal__overlay");
  const $closeModalButton = document.querySelector(".close");

  modal.classList.add("active");
  pauseDots();
  toggleStartBtn(false);

  $closeModalButton.addEventListener("click", () => {
    const modal = document.querySelector(".modal__overlay");
    modal.classList.remove("active");
    resetGameBoard(gameInterval, state);
  });
};

export { openModal };
