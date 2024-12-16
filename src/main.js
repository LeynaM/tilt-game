import { World } from "./World/World.js";

let world;

function startGame(dialog) {
  world.start();
  dialog.style.display = "none";
}

function winGame(dialog) {
  world.stop();
  document.getElementById("dialog-header").innerHTML = "You win!";
  document.getElementById("play-button").innerHTML = "Play again";
  dialog.style.display = "block";
}

function loseGame(dialog) {
  world.stop();
  document.getElementById("dialog-header").innerHTML = "You lose!";
  document.getElementById("play-button").innerHTML = "Play again";
  dialog.style.display = "block";
}

function main() {
  const container = document.getElementById("container");
  const dialog = document.querySelector(".modal-backdrop");
  world = new World(container);
  world.onWin = () => winGame(dialog);
  world.onLose = () => loseGame(dialog);

  const startGameButton = document.getElementById("play-button");
  startGameButton.onclick = () => startGame(dialog);
}

main();
