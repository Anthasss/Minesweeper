import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import { grey, orange } from "@mui/material/colors";
import { useState } from "react";

export default function GameEndModal() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    console.log("game restarted");
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
