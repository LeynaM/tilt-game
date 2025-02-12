import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Flex, Text, Button } from "@radix-ui/themes";
import { Game } from "./Game/Game";

let game;

function App() {
  const gameContainer = document.getElementById("game-container");
  if (!game) {
    game = new Game(gameContainer);
    console.log("test");
  }

  const [count, setCount] = useState(0);
  return <></>;
}

export default App;
