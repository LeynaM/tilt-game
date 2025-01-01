import { Game } from "./Game/Game.js";

let game;
let container;
let dialog;
let timeBox;
let timeBoxIntervalId;

const DIALOG_TYPES = {
  WIN: {
    key: "WIN",
    title: "You win!",
    button: "Play again",
  },
  LOSE: {
    key: "LOSE",
    title: "You lose!",
    button: "Play again",
  },
};

function showDialog(type) {
  const title = game.isNewHighscore
    ? "New highscore!"
    : DIALOG_TYPES[type].title;
  dialog.title.innerHTML = title;

  dialog.score.style.display = type === DIALOG_TYPES.WIN.key ? "block" : "none";
  dialog.score.innerHTML = "Score: " + game.score + "s";

  dialog.highscore.style.display = game.highscore ? "block" : "none";
  dialog.highscore.innerHTML = "Highscore: " + game.highscore + "s";

  dialog.button.innerHTML = DIALOG_TYPES[type].button;

  container.style.cursor = "auto";
  dialog.modal.style.display = "block";
}

function hideDialog() {
  container.style.cursor = "none";
  dialog.modal.style.display = "none";
}

function showTimeBox() {
  timeBox.style.display = "block";
  timeBoxIntervalId = setInterval(() => {
    timeBox.innerHTML = game.clock.getElapsedTime().toFixed(3) + "s";
  }, 50);
}

function hideTimeBox() {
  timeBox.style.display = "none";
  clearInterval(timeBoxIntervalId);
}

function startGame(dialog) {
  game.start();
  hideDialog();
  showTimeBox();
}

function winGame(dialog) {
  game.stop();
  showDialog(DIALOG_TYPES.WIN.key);
  hideTimeBox();
}

function loseGame(dialog) {
  game.stop();
  showDialog(DIALOG_TYPES.LOSE.key);
  hideTimeBox();
}

function main() {
  container = document.getElementById("container");
  dialog = {
    modal: document.querySelector(".modal-backdrop"),
    title: document.getElementById("dialog-header"),
    score: document.getElementById("score"),
    highscore: document.getElementById("highscore"),
    button: document.getElementById("play-button"),
  };
  timeBox = document.getElementById("time-box");

  game = new Game(container);
  game.onWin = () => winGame(dialog);
  game.onLose = () => loseGame(dialog);

  dialog.button.onclick = () => startGame(dialog);
}

main();
