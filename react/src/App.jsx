import { useRef } from "react";
import { Game } from "./Game/Game";
import StartGameDialog from "./components/StartGameDialog/StartGameDialog";
import { ScoreComponent } from "./components/ScoreComponent/ScoreComponent";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const gameContainer = document.getElementById("game-container");
  let game = useRef(null);
  const [score, setScore] = useState(0);
  const [isScoreVisible, setIsScoreVisible] = useState(false);

  useEffect(() => {
    if (!game.current) {
      game.current = new Game(gameContainer);
      game.current.onScoreUpdated = () => {
        setScore(game.current.score);
      };
    }
  });

  const startGame = () => {
    game.current.start();
    gameContainer.style.cursor = "none";
    setIsScoreVisible(true);
  };

  return (
    <>
      <StartGameDialog onStart={startGame} />
      {isScoreVisible && <ScoreComponent score={score} />}
    </>
  );
}

export default App;
