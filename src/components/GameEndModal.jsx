import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import { grey, orange } from "@mui/material/colors";
import { useGameStates } from "../stores/UseGameStates";
import { useVisualCustomization } from "../stores/UseVisualCustomization";
import { initGame } from "../utils/InitGame";
import { useEffect, useState } from "react";

export default function GameEndModal() {
  const { isGameOver, restartGame, isGameWon, setIsGameWon, revealedCells, setMinePositions } = useGameStates();
  const { gridLength, mineCount } = useVisualCustomization();
  const [open, setOpen] = useState(false);
  const [titleMsg, setTitleMsg] = useState("");
  const [btnMsg, setBtnMsg] = useState("");

  const handleClose = () => {
    restartGame();
    setOpen(false);
    initGame(gridLength, mineCount, setMinePositions);
    console.log("game restarted");
  };

  useEffect(() => {
    console.log(`revealedCells: ${revealedCells.size}/${gridLength * gridLength - mineCount}`);
    if (revealedCells.size === gridLength * gridLength - mineCount) {
      setIsGameWon(true);
    }
  }, [revealedCells, gridLength, setIsGameWon, mineCount]);

  useEffect(() => {
    if (isGameOver || isGameWon) {
      setOpen(true);
      if (isGameWon) {
        setTitleMsg("Congratulations! You've won the game!");
        setBtnMsg("Play Again");
      } else {
        setTitleMsg("Game Over! You've hit a mine!");
        setBtnMsg("Try Again");
      }
    }
  }, [isGameWon, isGameOver]);

  return (
    <Dialog
      open={open}
      fullWidth={true}
      maxWidth="xs"
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: grey[900],
          color: "white",
          borderRadius: "0.5em",
        },
      }}
    >
      <DialogTitle>{titleMsg}</DialogTitle>
      <DialogActions>
        <Button
          onClick={handleClose}
          variant="contained"
          sx={{
            backgroundColor: orange[500],
            color: "black",
            fontWeight: "500",
            m: 2,
          }}
        >
          {btnMsg}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
