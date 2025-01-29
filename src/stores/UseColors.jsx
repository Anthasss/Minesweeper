import { create } from "zustand";

export const useColors = create(() => ({
  bgColor: "bg-stone-900",
  gridColor: "bg-stone-100",
  cellColor: "bg-orange-400",
}));
