import { create } from "zustand";

export const useGameStates = create((set) => ({
  // game over states
  isGameOver: false,
  setIsGameOver: (isGameOver) => set({ isGameOver }),

  revealedCells: new Set(),
  addRevealedCell: (cellIndex) =>
    set((state) => {
      const newRevealedCells = new Set(state.revealedCells);
      newRevealedCells.add(cellIndex);
      return { revealedCells: newRevealedCells };
    }),
  addMultipleRevealedCells: (cellIndices) =>
    set((state) => {
      const newRevealedCells = new Set(state.revealedCells);
      cellIndices.forEach((index) => newRevealedCells.add(index));
      return { revealedCells: newRevealedCells };
    }),

  flaggedCells: new Set(),
  addFlaggedCell: (cellIndex) =>
    set((state) => {
      const newFlaggedCells = new Set(state.flaggedCells);
      newFlaggedCells.add(cellIndex);
      return { flaggedCells: newFlaggedCells };
    }),
  removeFlaggedCell: (cellIndex) => {
    set((state) => {
      const newFlaggedCells = new Set(state.flaggedCells);
      newFlaggedCells.delete(cellIndex);
      return { flaggedCells: newFlaggedCells };
    });
  },

  minePositions: new Set(),
  setMinePositions: (minePositions) => set({ minePositions }),

  // restart game
  restartGame: () => {
    set({ isGameOver: false });
    set({ revealedCells: new Set() });
    set({ flaggedCells: new Set() });
  },
}));
