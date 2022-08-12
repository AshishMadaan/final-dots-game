import "@testing-library/jest-dom/extend-expect";
import { getByText, fireEvent, queryByText } from "@testing-library/dom";
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";

const html = fs.readFileSync(
  path.resolve(__dirname, "../dist/index.html"),
  "utf8"
);

let dom;
let container;

describe("index.html", () => {
  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: "dangerously" });
    container = dom.window.document.body;
  });

  it("renders a heading element", () => {
    const header = container.querySelector("header");
    expect(container.querySelector("header")).not.toBeNull();
    expect(getByText(header, "DOTS GAME!")).toBeInTheDocument();
  });

  it("renders a start button element", () => {
    expect(container.querySelector(".game__toggle")).not.toBeNull();
  });

  it("renders a reset button element", () => {
    expect(container.querySelector(".reset__button")).not.toBeNull();
  });

  it("renders a game board", () => {
    expect(container.querySelector(".game__board")).not.toBeNull();
  });

  it("renders a slider range", () => {
    expect(container.querySelector("#speedControl")).not.toBeNull();
  });
});

describe("start and pause toogle functioanlity", () => {
  it("toggle button text", () => {
    const startBtn = getByText(container, "Start");
    fireEvent.click(startBtn);
    expect(queryByText(container, "Pause")).toBeDefined();
  });
});

describe("dots falling on screen", () => {
  it("dots appear on game start", () => {
    const gameBoard = container.querySelector(".game__board");
    const startBtn = getByText(container, "Start");
    fireEvent.click(startBtn);
    expect(gameBoard.querySelectorAll(".dot")).toBeDefined();
  });
});

describe("dots disappear from screen", () => {
  it("dots disappear on resetting the game", () => {
    const gameBoard = container.querySelector(".game__board");
    const resetBtn = getByText(container, "Reset");
    fireEvent.click(resetBtn);
    expect(gameBoard.querySelector(".dot")).toBeNull();
  });
});
