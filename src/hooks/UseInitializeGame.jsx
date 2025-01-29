// Helper function to count neighboring mines
const countNeighboringMines = (row, col, mines, gridLength) => {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;

      const newRow = row + i;
      const newCol = col + j;

      if (newRow >= 0 && newRow < gridLength && newCol >= 0 && newCol < gridLength) {
        const index = newRow * gridLength + newCol;
        if (mines.has(index)) {
          count++;
        }
      }
    }
  }
  return count;
};

// actual init function
function initializeGame(gridLength, mineCount, setMinePositions, setCellStates, safeIndex = null) {
  const divCount = gridLength * gridLength;
  const mines = new Set();

  while (mines.size < mineCount) {
    const randomIndex = Math.floor(Math.random() * divCount);
    if (safeIndex !== null && randomIndex === safeIndex) continue;
    mines.add(randomIndex);
  }
  setMinePositions(mines);

  // Initialize cell states
  const initialCellStates = Array.from({ length: divCount }, (_, index) => ({
    isRevealed: false,
    isFlagged: false,
    isMine: mines.has(index), // 👈 Add this
    neighborCount: countNeighboringMines(Math.floor(index / gridLength), index % gridLength, mines, gridLength),
  }));
  setCellStates(initialCellStates);
}

export default function UseInitializeGame() {
  return initializeGame;
}
