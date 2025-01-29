import { useCallback } from "react";
import useGameState from "../stores/UseGameState";

export default function UseCellFunction(setCellStates) {
  const { gridLength } = useGameState();

  // Function to get valid neighbors
  const getNeighbors = useCallback(
    (row, col) => {
      const neighbors = [];
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue;

          const newRow = row + i;
          const newCol = col + j;

          if (newRow >= 0 && newRow < gridLength && newCol >= 0 && newCol < gridLength) {
            neighbors.push({ row: newRow, col: newCol });
          }
        }
      }
      return neighbors;
    },
    [gridLength]
  );

  // Function to reveal cells recursively
  const revealCells = useCallback(
    (row, col, visited = new Set()) => {
      const index = row * gridLength + col;
      const key = `${row}-${col}`;

      if (visited.has(key)) return;
      visited.add(key);

      setCellStates((prev) => {
        if (!prev[index] || prev[index].isFlagged) return prev;

        const newStates = [...prev];
        newStates[index] = { ...newStates[index], isRevealed: true };

        // If this cell has no neighboring mines, reveal neighbors
        if (newStates[index].neighborCount === 0) {
          const neighbors = getNeighbors(row, col);
          setTimeout(() => {
            neighbors.forEach((neighbor) => {
              if (!visited.has(`${neighbor.row}-${neighbor.col}`)) {
                revealCells(neighbor.row, neighbor.col, visited);
              }
            });
          }, 0);
        }

        return newStates;
      });
    },
    [gridLength, getNeighbors, setCellStates]
  );
  return revealCells;
}
