import { useState, useEffect } from "react";

import { useVisualCustomization } from "../stores/UseVisualCustomization";
import { initGame } from "../utils/InitGame";

import MineCell from "./MineCell";

export default function MineGrid() {
  const { gridLength, mineCount, gridColor } = useVisualCustomization();
  const [minePositions, setMinePositions] = useState(new Set());

  // initialize the game
  useEffect(() => {
    initGame(gridLength, mineCount, setMinePositions);
  }, [gridLength, mineCount]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className={`${gridColor} grid gap-2 p-2 h-[80%] aspect-square rounded-lg`}
        style={{
          gridTemplateColumns: `repeat(${gridLength}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${gridLength}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: gridLength * gridLength }).map((_, index) => {
          const isMine = minePositions.has(index);
          return (
            <MineCell
              key={index}
              isMine={isMine}
              cellIndex={index}
            />
          );
        })}
      </div>
    </div>
  );
}
