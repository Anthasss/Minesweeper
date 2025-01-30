import { create } from "zustand";

const useGameState = create((set) => ({
  // game over state
  isGameOver: false,
  toggleGameOver: () => set((state) => ({ isGameOver: !state.isGameOver })),

  // current open cell
  currentRow: null,
  currentCol: null,
  setCurrentCell: ({ row, col }) => set({ currentRow: row, currentCol: col }),

  // gridLength
  gridLength: 6,
  mineCount: 4,

  // winning condition
  revealedCellCount: 0,
  incrementRevealedCellCount: () => set((state) => ({ revealedCellCount: state.revealedCellCount + 1 })),
  setRevealedCellCountToZero: () => set({ revealedCellCount: 0 }),

  // restart game
  restartGame: () => {
    set({
      isGameOver: false,
      revealedCellCount: 0,
    });
  },
}));

export default useGameState;
