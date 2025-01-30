import { useEffect, useState } from "react";
import MineCell from "./MineCell";
import { useColors } from "../stores/UseColors";
import useGameState from "../stores/UseGameState";
import UseInitializeGame from "../hooks/UseInitializeGame";
import UseCellFunction from "../hooks/UseCellFunctions";

export default function MineGrid() {
  // consume states
  const { gridLength, mineCount, isGameOver, revealedCellCount } = useGameState();

  const { gridColor } = useColors();

  // init useStates
  const [minePositions, setMinePositions] = useState(new Set());
  const [cellStates, setCellStates] = useState([]);

  // consume functions
  const initializeGame = UseInitializeGame();
  const revealCells = UseCellFunction(setCellStates);

  // Initialize the game
  useEffect(() => {
    if (!isGameOver) {
      initializeGame(gridLength, mineCount, setMinePositions, setCellStates);
    }
  }, [isGameOver, gridLength, mineCount, initializeGame, setMinePositions, setCellStates]);

  // Check if the game is over
  useEffect(() => {
    console.log(`Revealed cell count: ${revealedCellCount}`);

    if (revealedCellCount === gridLength * gridLength - mineCount) {
      console.log("You win!");
    }
  }, [revealedCellCount, gridLength, mineCount]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className={`${gridColor} grid gap-2 p-2 h-[80%] aspect-square rounded-lg`}
        style={{
          gridTemplateColumns: `repeat(${gridLength}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${gridLength}, minmax(0, 1fr))`,
        }}
      >
        {cellStates.map((cellState, index) => {
          const row = Math.floor(index / gridLength);
          const col = index % gridLength;
          const isMine = minePositions.has(index);

          return (
            <MineCell
              key={index}
              isMine={isMine}
              row={row}
              col={col}
              onReveal={revealCells}
              cellState={cellState}
              setCellState={(newState) => {
                setCellStates((prev) => {
                  const newStates = [...prev];
                  newStates[index] = { ...newStates[index], ...newState };
                  return newStates;
                });
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
