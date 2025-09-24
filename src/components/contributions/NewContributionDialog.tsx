"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/AddCard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { newContributionSchema } from "./arrays";
import { newContributionAction } from "@/app/(protected)/actions/contribution";
import { Loader } from "../general/Loader";
import { GroupMember } from "@/types/profiles";
import { ContributionForm } from "./ContributionForm";
import { DialogButton } from "../actions/MenuButton";
import { Profile } from "@/state/role/profiles";
import { Member } from "@/types/types";

type FormData = z.infer<typeof newContributionSchema>;

interface NewContributionDialogProps {
  open: boolean;
  members: GroupMember[];
  profile: Profile;
  member: Member;
  onClose: () => void;
  onContributionAdded: () => void;
}

export default function NewContributionDialog({
  open,
  members,
  profile,
  member,
  onClose,
  onContributionAdded,
}: NewContributionDialogProps) {
  const [loading, setLoading] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<string>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError: setFormError,
  } = useForm<FormData>({
    resolver: zodResolver(newContributionSchema),
  });

  useEffect(() => {
    if (member?.id) setSelectedMemberId(member?.id);
  }, [open, member.id]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleMemberSelect = (event: any, value: string | null) => {
    if (!value) {
      setSelectedMemberId(member?.id);
      return;
    }

    const selectedMember = members.find((m) => m.full_name === value);
    if (selectedMember) {
      if (selectedMember?.member_id) {
        setSelectedMemberId(selectedMember?.member_id);
      }
    }
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    try {
      const result = await newContributionAction({
        group_id: member.group_id,
        member_id: selectedMemberId,
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

  const selectedMember =
    members.find((m) => m.member_id === selectedMemberId) || member;

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
              For Member:{" "}
              <b>
                {profile.first_name} ${profile.last_name}
              </b>
              ; <b>{member.member_no!}</b>
            </Typography>
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
