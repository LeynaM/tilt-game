import { World } from "./World/World.js";
import { Clock } from "three";

let world;
let clock;
let highscore;

function startGame(dialog) {
  world.start();
  clock.start();
  dialog.style.display = "none";
  document.body.style.cursor = "none";
}

function winGame(dialog) {
  world.stop();
  const score = clock.getElapsedTime();
  if (!highscore || score < highscore) {
    highscore = score;
    document.getElementById("dialog-header").innerHTML = "New highscore!";
  } else {
    document.getElementById("dialog-header").innerHTML = "You win!";
  }
  clock.stop();
  document.getElementById("score").style.display = "block";
  document.getElementById("score").innerHTML = "Score: " + score + "s";
  document.getElementById("highscore").style.display = "block";
  document.getElementById("highscore").innerHTML =
    "Highscore: " + highscore + "s";
  document.getElementById("play-button").innerHTML = "Play again";
  document.body.style.cursor = "auto";
  dialog.style.display = "block";
}

function loseGame(dialog) {
  world.stop();
  if (highscore) {
    document.getElementById("highscore").style.display = "block";
    document.getElementById("highscore").innerHTML =
      "Highscore: " + highscore + "s";
  } else {
    document.getElementById("highscore").style.display = "none";
  }
  document.getElementById("score").style.display = "none";
  document.getElementById("dialog-header").innerHTML = "You lose!";
  document.getElementById("play-button").innerHTML = "Play again";
  document.body.style.cursor = "auto";
  dialog.style.display = "block";
}

function main() {
  const container = document.getElementById("container");
  const dialog = document.querySelector(".modal-backdrop");
  world = new World(container);
  clock = new Clock();
  world.onWin = () => winGame(dialog);
  world.onLose = () => loseGame(dialog);

  const startGameButton = document.getElementById("play-button");
  startGameButton.onclick = () => startGame(dialog);
}

main();
