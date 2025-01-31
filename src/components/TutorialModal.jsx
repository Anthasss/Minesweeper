import { CircleHelp } from "lucide-react";
import { useState } from "react";
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from "@mui/material";
import { grey, orange } from "@mui/material/colors";

export default function TutorialModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="contained"
        sx={{
          backgroundColor: orange[500],
          color: "black",
          fontWeight: "500",
          margin: "0",
          padding: "0",
          height: "64px",
          width: "64px",
        }}
      >
        <CircleHelp size={48} />
      </Button>
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
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: "0.5em" }}>
          <CircleHelp size={24} />
          Controls
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              color: "white",
              margin: 0,
              marginLeft: 4,
            }}
          >
            Left Click: Reveal cell
            <br />
            Right Click: Flag cell
            <br />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            variant="contained"
            sx={{
              backgroundColor: orange[500],
              color: "black",
              fontWeight: "500",
              m: 2,
              mt: 0,
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
