/* eslint-disable react/prop-types */
import { Flag } from "lucide-react";
import { useState } from "react";
import { useVisualCustomization } from "../stores/UseVisualCustomization";
import { useGameStates } from "../stores/UseGameStates";

export default function MineCell({ isMine, cellIndex }) {
  // states initialization
  const [isRevealed, setIsRevealed] = useState(false);
  const [isFlagged, setIsFlagged] = useState(false);

  const { cellColor, gridColor } = useVisualCustomization();
  const { addRevealedCell, setIsGameOver } = useGameStates();

  // function
  const handleFlagging = (e) => {
    e.preventDefault();
    setIsFlagged(!isFlagged);
  };

  const handleReveal = () => {
    if (!isFlagged) {
      setIsRevealed(true);

      if (isMine) {
        setIsGameOver(true);
        return;
      }

      addRevealedCell(cellIndex);
    }
  };

  return (
    <>
      {!isRevealed && (
        <div
          className={`${cellColor} w-full h-full grid place-items-center select-none rounded-lg`}
          onContextMenu={handleFlagging}
          onClick={handleReveal}
        >
          {isFlagged ? <Flag /> : ""}
        </div>
      )}
      {isRevealed && (
        <div
          className={`${
            isMine ? "bg-red-500" : gridColor
          } w-full h-full grid place-items-center select-none rounded-lg font-bold text-xl text-center`}
        >
          {isMine ? "💣" : "safe"}
        </div>
      )}
    </>
  );
}
