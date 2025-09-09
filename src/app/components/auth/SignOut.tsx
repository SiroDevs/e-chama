"use client";

import { Logout } from "@mui/icons-material";
import { Button, Dialog } from "@mui/material";
import { DialogActions, DialogContent, DialogTitle } from "@mui/material";
import React, { useState } from "react";

import { useRouter } from "next/navigation";
import { signMeOut } from "@/app/(auth)/actions";

export default function SignOut() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleSignOut = () => {
    handleClose();
    signMeOut();
    router.push("/home");
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
        startIcon={<Logout />}
        className="w-full gap-6 flex items-center justify-start"
        onClick={handleClickOpen}
      >
        SignOut
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
