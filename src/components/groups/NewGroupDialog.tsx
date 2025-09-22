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
import { newGroupAction } from "@/app/(protected)/actions/GroupAction";
import { newGroupLabels, newGroupSchema } from "./arrays";
import { useGroupStore } from "@/state/auth/group";

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
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user } = useAuthStore();
  const { setUserGroups } = useGroupStore();

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
    setLoading(true);

    try {
      const result = await newGroupAction({
        owner: user!.id,
        title: data.title.trim(),
        description: data.description?.trim() || "",
        initials: data.initials?.trim() || "",
        location: data.location?.trim(),
        address: data.address?.trim() || "",
      });

      if (result.groups && result.groups.length > 0) {
        await setUserGroups(result.groups, result.groupId || null);
      }
      handleClose();
      onGroupCreated();
    } catch (err: any) {
      setFormError("root", {
        type: "manual",
        message: err.message || "Failed to create chama",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
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
              Creating your new chama ...
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
                />
              ))}
          </Box>
        )}
      </DialogContent>

      {!loading && (
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
    </Dialog>
  );
}
