import { useRef } from "react";
import { Game } from "./Game/Game";
import StartGameDialog from "./components/StartGameDialog/StartGameDialog";
import { ScoreComponent } from "./components/ScoreComponent/ScoreComponent";
import { useState } from "react";
import { useEffect } from "react";
import GameOverDialog from "./components/GameOverDialog/GameOverDialog";
import { generateName } from "./utils/utils";
import { confetti } from "@tsparticles/confetti";

function App() {
  const gameContainer = document.getElementById("game-container");
  let game = useRef(null);
  const [score, setScore] = useState(0);
  const [name, setName] = useState(generateName());
  const [isScoreVisible, setIsScoreVisible] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (!game.current) {
      game.current = new Game(gameContainer);
      game.current.onScoreUpdated = () => {
        setScore(game.current.score);
      };
      game.current.onGameOver = async ({ hasWon }) => {
        if (hasWon) {
          confetti({
            particleCount: 50,
            spread: 360,
            origin: { y: 0.5 },
          });
        }

        setTimeout(() => {
          document.body.style.cursor = "auto";
          setIsGameOver(true);
          setIsScoreVisible(false);
        }, 1000);
      };
    }
  });

  const startGame = () => {
    game.current.start();
    document.body.style.cursor = "none";
    setIsScoreVisible(true);
    setIsGameOver(false);
  };

  return (
    <>
      <StartGameDialog onStart={startGame} name={name} setName={setName} />
      <GameOverDialog
        open={isGameOver}
        onStart={startGame}
        score={score}
        name={name}
      />
      {isScoreVisible && <ScoreComponent score={score} />}
    </>
  );
}

export default App;
