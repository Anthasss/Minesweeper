import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import { grey, orange } from "@mui/material/colors";
import { useState, useEffect } from "react";
import useGameState from "../stores/UseGameState";

export default function GameEndModal() {
  // consume states
  const { isGameOver, revealedCellCount, gridLength, mineCount, restartGame } = useGameState();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isGameOver || revealedCellCount === gridLength ** 2 - mineCount) {
      setOpen(true);
      console.log(`correct cell: ${revealedCellCount}/${gridLength ** 2 - mineCount}`);
    }
  }, [isGameOver, revealedCellCount, gridLength, mineCount]);

  const handleClose = () => {
    setOpen(false);
    restartGame();
  };

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
      <DialogTitle>Game Over</DialogTitle>
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
          Try Again
        </Button>
      </DialogActions>
    </Dialog>
  );
}
