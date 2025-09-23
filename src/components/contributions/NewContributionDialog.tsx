"use client";

import { useState } from "react";
import { Box, Button, Alert, Dialog, DialogTitle } from "@mui/material";
import { DialogContent, DialogActions } from "@mui/material";
import { CircularProgress, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/AddCard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useAuthStore } from "@/state/auth/auth";
import { FormInput } from "@/components/inputs/FormInput";
import { newContributionFieldGroups } from "./arrays";
import { newContributionLabels, newContributionSchema } from "./arrays";
import { newContributionAction } from "@/app/(protected)/actions/contribution";
import { FormSelect } from "../inputs/FormSelect";
import { Member } from "@/state/role/profiles";

type FormData = z.infer<typeof newContributionSchema>;

interface NewContributionDialogProps {
  open: boolean;
  name: string;
  member: Member;
  onClose: () => void;
  onContributionAdded: () => void;
}

export default function NewContributionDialog({
  open,
  name,
  member,
  onClose,
  onContributionAdded,
}: NewContributionDialogProps) {
  const [loading, setLoading] = useState(false);
  const { user } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError: setFormError,
  } = useForm<FormData>({
    resolver: zodResolver(newContributionSchema),
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    try {
      const result = await newContributionAction({
        group_id: member!.group_id,
        member_id: member!.id,
        reason: data.reason.trim(),
        mode: data.mode.trim(),
        amount: data.amount,
        reference: data.reference.trim(),
      });

      if (result.success) {
        handleClose();
        onContributionAdded();
      } else {
        setFormError("root", { type: "manual", message: result.error! });
      }
    } catch (err: any) {
      setFormError("root", {
        type: "manual",
        message: err.message || "Failed to add contribution",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AddIcon sx={{ mr: 1, color: "primary.main" }} fontSize="large" />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" component="span">
              Add a New Contribution
            </Typography>
            <Typography variant="body1" component="span">
              For Member: <b>{name}</b>; <b>{member.member_no}</b>
            </Typography>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent>
        {loading ? (
          <Box sx={{ textAlign: "center", py: 2 }}>
            <CircularProgress size={60} thickness={5} />
            <Typography variant="h5" component="h1" gutterBottom>
              Adding the new contribution ...
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

            {newContributionFieldGroups.map((group) => (
              <div key={group.id}>
                <Typography
                  component="div"
                  sx={{
                    width: "100%",
                    display: "flex",
                    gap: 1,
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  {group.fields.map((fieldName) => {
                    const field = newContributionLabels[fieldName];

                    if (field.type === "select") {
                      return (
                        <FormSelect
                          key={field.name}
                          id={field.name}
                          label={field.label}
                          required={field.required}
                          error={errors[field.name]}
                          registration={register(field.name)}
                          options={field.options || []}
                        />
                      );
                    }

                    return (
                      <FormInput
                        key={field.name}
                        id={field.name}
                        label={field.label}
                        placeholder={field.placeholder}
                        type={field.type}
                        autoComplete="off"
                        autoFocus={field.name === "amount"}
                        required={field.required}
                        error={errors[field.name]}
                        registration={register(field.name, {
                          valueAsNumber: field.name === "amount",
                        })}
                      />
                    );
                  })}
                </Typography>
              </div>
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
            Add Contribution
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}
