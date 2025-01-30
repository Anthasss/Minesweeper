/* eslint-disable react/prop-types */
import { Flag } from "lucide-react";
import { useState } from "react";
import { useVisualCustomization } from "../stores/UseVisualCustomization";
import { useGameStates } from "../stores/UseGameStates";
import { getNeighbouringMines } from "../utils/GetNeighbouringMines";

export default function MineCell({ isMine, cellIndex }) {
  const [isFlagged, setIsFlagged] = useState(false);
  const { cellColor, gridColor } = useVisualCustomization();
  const { addRevealedCell, addMultipleRevealedCells, revealedCells, setIsGameOver } = useGameStates();
  const isRevealed = revealedCells.has(cellIndex); // Derive from global state

  // Flood fill logic
  const getNeighborIndices = (index) => {
    const { gridLength } = useVisualCustomization.getState();
    const currentRow = Math.floor(index / gridLength);
    const currentCol = index % gridLength;
    const neighbors = [];
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const newRow = currentRow + i;
        const newCol = currentCol + j;
        if (newRow >= 0 && newRow < gridLength && newCol >= 0 && newCol < gridLength) {
          neighbors.push(newRow * gridLength + newCol);
        }
      }
    }
    return neighbors;
  };

  const floodFill = (startIndex) => {
    const { minePositions } = useGameStates.getState();
    const queue = [startIndex];
    const visited = new Set();
    const cellsToReveal = new Set();

    while (queue.length > 0) {
      const currentIndex = queue.shift();
      if (visited.has(currentIndex) || minePositions.has(currentIndex)) continue;
      visited.add(currentIndex);
      cellsToReveal.add(currentIndex);

      const neighbors = getNeighborIndices(currentIndex);
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor) && !minePositions.has(neighbor)) {
          const minesNearby = getNeighbouringMines(neighbor);
          if (minesNearby === 0) queue.push(neighbor);
          else cellsToReveal.add(neighbor);
        }
      }
    }
    return Array.from(cellsToReveal);
  };

  const handleReveal = () => {
    if (!isFlagged && !isRevealed) {
      if (isMine) {
        setIsGameOver(true);
        addRevealedCell(cellIndex);
        return;
      }

      const minesNearby = getNeighbouringMines(cellIndex);
      if (minesNearby === 0) {
        const cellsToReveal = floodFill(cellIndex);
        addMultipleRevealedCells(cellsToReveal);
      } else {
        addRevealedCell(cellIndex);
      }
    }
  };

  const handleFlagging = (e) => {
    e.preventDefault();
    setIsFlagged(!isFlagged);
  };

  return (
    <>
      {!isRevealed && (
        <div
          className={`${cellColor} w-full h-full grid place-items-center select-none rounded-lg`}
          onContextMenu={handleFlagging}
          onClick={handleReveal}
        >
          {isFlagged ? <Flag /> : ""}
        </div>
      )}
      {isRevealed && (
        <div
          className={`${
            isMine ? "bg-red-500" : gridColor
          } w-full h-full grid place-items-center select-none rounded-lg font-bold text-xl text-center`}
        >
          {isMine ? "💣" : getNeighbouringMines(cellIndex) == 0 ? "" : getNeighbouringMines(cellIndex)}
        </div>
      )}
    </>
  );
}
