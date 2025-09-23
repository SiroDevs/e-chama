"use client";

import { useState } from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/AddCard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useAuthStore } from "@/state/auth/auth";
import { newContributionSchema } from "./arrays";
import { newContributionAction } from "@/app/(protected)/actions/contribution";
import { Loader } from "../general/Loader";
import { GroupMember } from "@/types/profiles";
import { ContributionForm } from "./ContributionForm";
import { DialogButton } from "../actions/MenuButton";

type FormData = z.infer<typeof newContributionSchema>;

interface NewContributionDialogProps {
  open: boolean;
  members: GroupMember[];
  onClose: () => void;
  onContributionAdded: () => void;
}

export default function NewContributionDialog({
  open,
  members,
  onClose,
  onContributionAdded,
}: NewContributionDialogProps) {
  const [loading, setLoading] = useState(false);
  const [selectedMember, setSelectedMember] = useState<GroupMember>();
  const { member: currentMember, profile } = useAuthStore();

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

  const handleMemberSelect = (event: any, value: string | null) => {
    if (!value) {
      return;
    }

    const member = members.find((m) => m.full_name === value);
    setSelectedMember(member);
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    try {
      const targetMember = selectedMember || currentMember;

      if (!targetMember) {
        setFormError("root", {
          type: "manual",
          message: "No member selected",
        });
        return;
      }

      const result = await newContributionAction({
        group_id: targetMember.joined_at!,
        member_id: targetMember.id,
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

  const displayMember = selectedMember || currentMember;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AddIcon sx={{ mr: 1, color: "primary.main" }} fontSize="large" />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" component="span">
              Add a New Contribution
            </Typography>
            {members.length == 0 && (
              <Typography variant="body1" component="span">
                For Member:{" "}
                <b>
                  {profile?.first_name} {profile?.last_name}
                </b>
                ; <b>{displayMember!.member_no}</b>
              </Typography>
            )}
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent>
        {loading ? (
          <Loader
            size={60}
            thickness={5}
            title="Adding the new contribution ..."
          />
        ) : (
          <ContributionForm
            members={members}
            selectedMember={selectedMember}
            currentMember={currentMember}
            onMemberSelect={handleMemberSelect}
            errors={errors}
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
          />
        )}
      </DialogContent>

      {!loading && (
        <DialogButton
          label="Add Contribution"
          form_id="new_contribution_form"
          handleClose={handleClose}
        />
      )}
    </Dialog>
  );
}
