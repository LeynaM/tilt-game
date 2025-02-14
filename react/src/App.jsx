import { useRef } from "react";
import { Game } from "./Game/Game";
import StartGameDialog from "./components/StartGameDialog/StartGameDialog";
import { ScoreComponent } from "./components/ScoreComponent/ScoreComponent";
import { useState } from "react";
import { useEffect } from "react";
import GameOverDialog from "./components/GameOverDialog/GameOverDialog";
import { fetchAllScores, saveScore } from "./utils/utils";

function App() {
  const gameContainer = document.getElementById("game-container");
  let game = useRef(null);
  const [score, setScore] = useState(0);
  const [isScoreVisible, setIsScoreVisible] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (!game.current) {
      game.current = new Game(gameContainer);
      game.current.onScoreUpdated = () => {
        setScore(game.current.score);
      };
      game.current.onGameOver = async () => {
        setIsGameOver(true);
        setIsScoreVisible(false);
      };
    }
  });

  const startGame = () => {
    game.current.start();
    gameContainer.style.cursor = "none";
    setIsScoreVisible(true);
    setIsGameOver(false);
  };

  return (
    <>
      <StartGameDialog onStart={startGame} />
      <GameOverDialog open={isGameOver} onStart={startGame} score={score} />
      {isScoreVisible && <ScoreComponent score={score} />}
    </>
  );
}

export default App;
