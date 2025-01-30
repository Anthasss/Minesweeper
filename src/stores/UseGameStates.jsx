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

  minePositions: new Set(),
  setMinePositions: (minePositions) => set({ minePositions }),
}));
