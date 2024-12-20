import { World } from "./World/World.js";
import { Clock } from "three";

let world;
let clock;
let highscore;
let container;
let dialog;
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

function showDialog(type, score, isNewHighscore = false) {
  const title = isNewHighscore ? "New highscore!" : DIALOG_TYPES[type].title;
  dialog.title.innerHTML = title;

  dialog.score.style.display = type === DIALOG_TYPES.WIN.key ? "block" : "none";
  dialog.score.innerHTML = "Score: " + score + "s";

  dialog.highscore.style.display = highscore ? "block" : "none";
  dialog.highscore.innerHTML = "Highscore: " + highscore + "s";

  dialog.button.innerHTML = DIALOG_TYPES[type].button;

  container.style.cursor = "auto";
  dialog.modal.style.display = "block";
}

function hideDialog() {
  container.style.cursor = "none";
  dialog.modal.style.display = "none";
}

function startGame(dialog) {
  world.start();
  clock.start();
  hideDialog();
}

function winGame(dialog) {
  world.stop();
  const score = clock.getElapsedTime();
  let isNewHighscore = false;
  if (!highscore || score < highscore) {
    highscore = score;
    isNewHighscore = true;
  }
  clock.stop();
  showDialog(DIALOG_TYPES.WIN.key, score, isNewHighscore);
}

function loseGame(dialog) {
  world.stop();
  showDialog(DIALOG_TYPES.LOSE.key);
  clock.stop();
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
  world = new World(container);
  clock = new Clock();
  world.onWin = () => winGame(dialog);
  world.onLose = () => loseGame(dialog);

  dialog.button.onclick = () => startGame(dialog);
}

main();
