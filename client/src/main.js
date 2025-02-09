import { Game } from "./Game/Game.js";

let game;
let container;
let dialog;
let scoreBox;

function showDialog() {
  dialog.title.innerHTML = "Game over";

  dialog.score.style.display = "block";
  dialog.highscore.style.display =
    game.highscore > 0 && !game.isNewHighscore ? "block" : "none";
  if (game.isNewHighscore) {
    dialog.score.innerHTML = "New Highscore: " + game.score;
  } else {
    dialog.score.innerHTML = "Score: " + game.score;
    dialog.highscore.innerHTML = "Highscore: " + game.highscore;
  }

  dialog.button.innerHTML = "Play again";

  container.style.cursor = "auto";
  dialog.modal.style.display = "block";
}

function hideDialog() {
  container.style.cursor = "none";
  dialog.modal.style.display = "none";
}

function showScoreBox() {
  scoreBox.style.display = "block";
}

function hideScoreBox() {
  scoreBox.style.display = "none";
}

function startGame(dialog) {
  game.start();
  hideDialog();
  dialog.text.style.display = "none";
  showScoreBox();
}

function gameOver(dialog) {
  game.stop();
  showDialog();
  hideScoreBox();
}

function main() {
  container = document.getElementById("container");
  dialog = {
    modal: document.querySelector(".modal-backdrop"),
    title: document.getElementById("dialog-header"),
    score: document.getElementById("score"),
    highscore: document.getElementById("highscore"),
    button: document.getElementById("play-button"),
    text: document.getElementById("start-text"),
  };
  scoreBox = document.getElementById("score-box");

  game = new Game(container);
  game.onGameOver = () => gameOver(dialog);
  game.onScoreUpdated = () => {
    scoreBox.innerHTML = "Score: " + game.score;
  };

  dialog.button.onclick = () => startGame(dialog);
}

main();
