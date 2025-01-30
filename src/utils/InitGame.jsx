export const initGame = (gridLength, mineCount, setMinePositions) => {
  // this part generate the indexes of the mines
  const divCount = gridLength * gridLength;
  const mines = new Set();

  while (mines.size < mineCount) {
    const randomIndex = Math.floor(Math.random() * divCount);
    mines.add(randomIndex);
  }
  setMinePositions(mines);
};
