import { useEffect } from "react";
import { useGameStates } from "../stores/UseGameStates";

export default function Logger() {
  const { revealedCells, isGameOver } = useGameStates();

  useEffect(() => {
    console.log(`${revealedCells.size}. revealed cells: ${[...revealedCells]}`);
  }, [revealedCells]);

  useEffect(() => {
    console.log(`Game Over: ${isGameOver}`);
  }, [isGameOver]);
}
