import { create } from "zustand";

export const useVisualCustomization = create((set) => ({
  // sizes
  gridLength: 6,
  mineCount: 5,

  // set sizes
  setGridLength: (gridLength) => set({ gridLength }),
  setMineCount: (mineCount) => set({ mineCount }),

  // colors
  cellColor: "bg-orange-500",
  gridColor: "bg-stone-100",
  bgColor: "bg-orange-300",
}));
