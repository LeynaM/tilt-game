import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Flex, Text, Button } from "@radix-ui/themes";
import { Game } from "./Game/Game";
import StartGameDialog from "./components/StartGameDialog/StartGameDialog";

let game;

function App() {
  const gameContainer = document.getElementById("game-container");
  if (!game) {
    game = new Game(gameContainer);
  }

  const startGame = () => game.start();

  return (
    <>
      <StartGameDialog onStart={startGame} />
    </>
  );
}

export default App;
