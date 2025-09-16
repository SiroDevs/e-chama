"use client";

import { Logout } from "@mui/icons-material";
import { Button, Dialog } from "@mui/material";
import { DialogActions, DialogContent, DialogTitle } from "@mui/material";
import React, { useState } from "react";

import { handleSignOutAction } from "../actions/client";
import { useAuthStore } from "@/state/auth/auth";

export default function SignOut() {
  const { logoutUser } = useAuthStore();
  const [open, setOpen] = useState(false);

  const handleSignOut = async () => {
    handleClose();
    const result = await handleSignOutAction();
    await logoutUser();
    window.location.href = "/";
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="flex w-full">
      <Button
        endIcon={<Logout />}
        className="w-full gap-6 flex items-center justify-start"
        onClick={handleClickOpen}
      >
        Sign Out
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Sign Out</DialogTitle>
        <DialogContent>Are you sure you want to sign out?</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSignOut} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
function loginUser(arg0: any) {
  throw new Error("Function not implemented.");
}
