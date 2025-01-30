import { useGameStates } from "../stores/UseGameStates";
import { useVisualCustomization } from "../stores/UseVisualCustomization";

export const getNeighbouringMines = (index) => {
  let mineCount = 0;

  const { gridLength } = useVisualCustomization.getState();
  const { minePositions } = useGameStates.getState();
  const currentRow = Math.floor(index / gridLength);
  const currentCol = index % gridLength;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;

      const newRow = currentRow + i;
      const newCol = currentCol + j;

      if (newRow >= 0 && newRow < gridLength && newCol >= 0 && newCol < gridLength) {
        const neighbourIndex = newRow * gridLength + newCol;
        if (minePositions.has(neighbourIndex)) {
          mineCount++;
        }
      }
    }
  }

  return mineCount;
};
