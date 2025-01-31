import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import { grey, orange } from "@mui/material/colors";
import { useGameStates } from "../stores/UseGameStates";

export default function GameEndModal() {
  const { isGameOver, restartGame } = useGameStates();

  const handleClose = () => {
    restartGame();
    console.log("game restarted");
  };

  return (
    <Dialog
      open={isGameOver}
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
