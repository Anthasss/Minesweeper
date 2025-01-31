import { Settings } from "lucide-react";
import { useState } from "react";
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, TextField } from "@mui/material";
import { grey, orange } from "@mui/material/colors";

import { useVisualCustomization } from "../stores/UseVisualCustomization";

export default function SettingsModal() {
  const { gridLength, mineCount, setGridLength, setMineCount } = useVisualCustomization();

  const [open, setOpen] = useState(false);

  const [gridLengthInput, setGridLengthInput] = useState(gridLength);
  const [mineCountInput, setMineCountInput] = useState(mineCount);
  const handleGridLengthChange = (event) => setGridLengthInput(event.target.value);
  const handleMineCountChange = (event) => setMineCountInput(event.target.value);

  const handleApply = () => {
    setOpen(false);
    setGridLength(gridLengthInput);
    setMineCount(mineCountInput);
  };

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
        <Settings size={48} />
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
          <Settings size={24} />
          Settings
        </DialogTitle>
        <DialogContent>
          {/* container for the settings content */}
          <div className="h-full w-full flex flex-col px-4 gap-4">
            {/* settings content */}
            <div className="w-full h-12 flex justify-between items-center">
              <DialogContentText
                sx={{
                  color: "white",
                  margin: 0,
                }}
              >
                Grid Length
              </DialogContentText>
              <TextField
                variant="outlined"
                value={gridLengthInput}
                onChange={handleGridLengthChange}
                sx={{
                  "& .MuiInputBase-root": {
                    height: "42px",
                    width: "100px",
                    color: "white",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ff9800",
                  },
                  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ff9800",
                  },
                  margin: 0,
                }}
              />
            </div>
            <div className="w-full h-12 flex justify-between items-center">
              <DialogContentText
                sx={{
                  color: "white",
                  margin: 0,
                }}
              >
                Mine Count
              </DialogContentText>
              <TextField
                variant="outlined"
                value={mineCountInput}
                onChange={handleMineCountChange}
                sx={{
                  "& .MuiInputBase-root": {
                    height: "42px",
                    width: "100px",
                    color: "white",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ff9800",
                  },
                  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ff9800",
                  },
                  margin: 0,
                }}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleApply}
            variant="contained"
            sx={{
              backgroundColor: orange[500],
              color: "black",
              fontWeight: "500",
              m: 2,
              mt: 0,
            }}
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
