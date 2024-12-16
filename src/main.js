import { World } from "./World/World.js";

let world;

function startGame(dialog) {
  world.start();
  dialog.style.display = "none";
}

function endGame(dialog) {
  world.stop();
  document.getElementById("dialog-header").innerHTML = "You win!";
  dialog.style.display = "block";
}

function main() {
  const container = document.getElementById("container");
  const dialog = document.querySelector(".modal-backdrop");
  world = new World(container);
  world.onFinish = () => endGame(dialog);

  const startGameButton = document.getElementById("play-button");
  startGameButton.onclick = () => startGame(dialog);
}

main();
