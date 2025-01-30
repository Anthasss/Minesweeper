import { useCallback } from "react";
import useGameState from "../stores/UseGameState";

export default function UseCellFunction(setCellStates) {
  const { gridLength } = useGameState();

  // Function to get the row and column of the 8 neighbors around a cell
  const getNeighbors = useCallback(
    (row, col) => {
      const neighbors = [];
      // this part loops through a 3x3 grid around the current cell. It skips the current cell (when i and j are 0)
      /*
      example:
        [-1, -1], [-1, 0], [-1, 1],
        [ 0, -1], [ 0, 0], [ 0, 1],
        [ 1, -1], [ 1, 0], [ 1, 1],
      */
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue;

          // this part refers to the current neighbour that the code is checking
          const newRow = row + i;
          const newCol = col + j;

          // if the neighbour is within the grid, add it to the list of neighbours
          if (newRow >= 0 && newRow < gridLength && newCol >= 0 && newCol < gridLength) {
            neighbors.push({ row: newRow, col: newCol });
          }
        }
      }

      // returns an array with objects containing row and col of the valid neighbours
      /* example [
        {row: 1, col: 1},
        {row: 1, col: 2},
        {row: 1, col: 3},
        {row: 2, col: 1},
        
        row 2, col 2 is the current cell, so it is skipped

        {row: 2, col: 3},
        {row: 3, col: 1},
        {row: 3, col: 2},
        {row: 3, col: 3},

        ]
      */

      return neighbors;
    },
    [gridLength]
  );

  // Function to reveal cells recursively
  /*
  for the parammeters:
  row: the row of the cell to reveal
  col: the column of the cell to reveal
  visited: a set to keep track of the cells that have been visited to avoid infinite loops
   */
  const revealCells = useCallback(
    (row, col, visited = new Set()) => {
      /*
        setCellStates needs index not row and col
        hence the index variable

        key is used to keep track of the cells that have been visited inside the set        
       */
      const index = row * gridLength + col;
      const key = `${row}-${col}`;

      // if the cell is visited, return. Else add it to the visited set
      if (visited.has(key)) return;
      visited.add(key);

      // this part essentially just change the state of the clicked cell to revealed
      setCellStates((prev) => {
        if (!prev[index] || prev[index].isFlagged) return prev;

        const newStates = [...prev];
        newStates[index] = { ...newStates[index], isRevealed: true };

        /* 
        newStates is basically a cell.

        neighboringMineCount is initialized in UseInitializeGame.jsx as a property of a cell
        */
        if (newStates[index].neighboringMineCount === 0) {
          const neighbors = getNeighbors(row, col);
          setTimeout(() => {
            neighbors.forEach((neighbor) => {
              if (!visited.has(`${neighbor.row}-${neighbor.col}`)) {
                revealCells(neighbor.row, neighbor.col, visited);

                // maybe add the increment revealed cell here
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
