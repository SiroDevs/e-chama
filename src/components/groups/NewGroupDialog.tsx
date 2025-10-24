"use client";

import { useState } from "react";
import { Box, Button, Alert, Dialog, DialogTitle } from "@mui/material";
import { DialogContent, DialogActions } from "@mui/material";
import { CircularProgress, Typography } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { GroupAdd } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useAuthStore } from "@/state/auth/auth";
import { FormInput } from "@/components/inputs/FormInput";
import { newGroupAction } from "@/app/(protected)/actions/group";
import { newGroupLabels, newGroupSchema } from "./arrays";
import { useGroupStore } from "@/state/auth/group";
import { usePreventMultipleSubmit } from "@/hooks/usePreventMultipleSubmit";

type FormData = z.infer<typeof newGroupSchema>;

interface NewGroupDialogProps {
  open: boolean;
  onClose: () => void;
  onGroupCreated: () => void;
}

export default function NewGroupDialog({
  open,
  onClose,
  onGroupCreated,
}: NewGroupDialogProps) {
  const [success, setSuccess] = useState(false);
  const { user, setMemberState } = useAuthStore();
  const { setUserGroups } = useGroupStore();
  const { execute: submitWithProtection, isSubmitting: loading } =
    usePreventMultipleSubmit();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError: setFormError,
  } = useForm<FormData>({
    resolver: zodResolver(newGroupSchema),
  });

  const handleClose = () => {
    reset();
    setSuccess(false);
    onClose();
  };

  const onSubmit = async (data: FormData) => {
    await submitWithProtection(async () => {
      setFormError("root", { message: "" });

      try {
        const result = await newGroupAction({
          owner: user!.id,
          title: data.title.trim(),
          description: data.description?.trim() || "",
          initials: data.initials?.trim() || "",
          location: data.location?.trim(),
          address: data.address?.trim() || "",
        });

        if (result.success && result.groups) {
          await setMemberState(result.member);
          await setUserGroups(result.groups, result.groupId);
          setSuccess(true);

          setTimeout(() => {
            handleClose();
            onGroupCreated();
          }, 1000);
        } else {
          throw new Error("Failed to create chama");
        }
      } catch (err: any) {
        setFormError("root", {
          type: "manual",
          message: err.message || "Failed to create chama",
        });
      }
    });
  };

  return (
    <Dialog
      open={open}
      onClose={!loading ? handleClose : undefined}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <GroupAdd sx={{ mr: 1, color: "primary.main" }} />
          <Typography variant="h6" component="span">
            {success ? "Chama Created!" : "Create a New Chama"}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        {loading ? (
          <Box sx={{ textAlign: "center", py: 2 }}>
            <CircularProgress size={60} thickness={5} />
            <Typography variant="h5" component="h1" gutterBottom>
              {success
                ? "Chama Created Successfully!"
                : "Creating your new chama..."}
            </Typography>
          </Box>
        ) : (
          <Box
            component="form"
            id="new_group_form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            {errors.root && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {errors.root.message}
              </Alert>
            )}

            {Object.values(newGroupLabels)
              .filter((field) => field.name !== "description")
              .map((field) => (
                <FormInput
                  key={field.name}
                  id={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  type="text"
                  autoComplete="off"
                  autoFocus={field.name === "title"}
                  required={field.required}
                  error={errors[field.name]}
                  registration={register(field.name)}
                  disabled={loading}
                />
              ))}
          </Box>
        )}
      </DialogContent>

      {!loading && !success && (
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="new_group_form"
            variant="contained"
            disabled={loading}
          >
            Create Chama
          </Button>
        </DialogActions>
      )}

      {success && (
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose} variant="contained">
            OK
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}
