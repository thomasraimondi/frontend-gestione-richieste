import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Modal() {
  const [open, setOpen] = React.useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/logout`, { withCredentials: true }).then((res) => {
      logout();
      console.log(res);
      handleClose();
      navigate("/login");
    });
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen} sx={{ border: "0px solid #000", color: "#fff", fontSize: "14px", backgroundColor: "red" }}>
        Logout
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Confermi il logout?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Annulla</Button>
          <Button onClick={handleLogout} autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
