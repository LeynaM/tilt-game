import { useEffect, useRef } from "react";
import { Game } from "../../Game/Game";

function GameContainer() {
  const containerRef = useRef(null);
  console.log("a", containerRef);

  useEffect(() => {
    console.log("b", containerRef);
    const game = new Game(containerRef);
  });

  return <div ref={containerRef} />;
}

export { GameContainer };
