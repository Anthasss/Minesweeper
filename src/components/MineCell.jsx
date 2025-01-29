/* eslint-disable react/prop-types */
import { Flag } from "lucide-react";
import useGameState from "../stores/UseGameState";
import { useColors } from "../stores/UseColors";

export default function MineCell({ isMine, row, col, onReveal, cellState, setCellState }) {
  const { toggleGameOver, setCurrentCell } = useGameState();
  const { cellColor, gridColor } = useColors();

  const handleFlagging = (e) => {
    e.preventDefault();
    if (!cellState.isRevealed) {
      setCellState({ isFlagged: !cellState.isFlagged });
      console.log(`Cell flagged at row: ${row}, col: ${col}`);
    }
  };

  const handleReveal = () => {
    if (!cellState || cellState.isFlagged || cellState.isRevealed) return;

    setCurrentCell({
      col: col,
      row: row,
    });

    if (isMine) {
      toggleGameOver();
      setCellState({ isRevealed: true });
    } else {
      onReveal(row, col);
    }

    console.log(`Cell revealed at row: ${row}, col: ${col}`);
  };

  if (!cellState) return null;

  return (
    <>
      {!cellState.isRevealed && (
        <div
          className={`${cellColor} w-full h-full grid place-items-center select-none rounded-lg`}
          onContextMenu={handleFlagging}
          onClick={handleReveal}
        >
          {cellState.isFlagged ? <Flag /> : ""}
        </div>
      )}
      {cellState.isRevealed && (
        <div
          className={`${
            isMine ? "bg-red-500" : gridColor
          } w-full h-full grid place-items-center select-none rounded-lg font-bold text-3xl text-center`}
          onContextMenu={handleFlagging}
        >
          {isMine ? "💣" : cellState.neighborCount > 0 ? cellState.neighborCount : ""}
        </div>
      )}
    </>
  );
}
