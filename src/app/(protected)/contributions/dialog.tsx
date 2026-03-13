"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/presentation/components/ui/alert-dialog";
import { GroupContribution, GroupMember } from "@/domain/entities";
import { ContributionFormValues } from "./arrays";
import ContributionForm from "./form";

interface ContributionDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<GroupContribution>) => void;
  initial?: GroupContribution | null;
  groupId: string;
}

export function ContributionDialog({
  open,
  onClose,
  onSubmit,
  initial,
  groupId,
}: ContributionDialogProps) {
  const isEditing = !!initial?.id;

  const initialMember: GroupMember | null = initial?.member_id
    ? ({ id: initial.member_id, full_name: initial.full_name || null, member_no: initial.member_no || null } as GroupMember)
    : null;

  const handleSubmit = async (values: ContributionFormValues, member: GroupMember) => {
    onSubmit({
      ...initial,
      id: member.id,
      full_name: member.full_name || undefined,
      member_no: member.member_no || undefined,
      ...values,
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={(o) => !o && onClose()}>
      <AlertDialogContent className="bg-white dark:bg-[#1d1d20] border border-gray-100 dark:border-gray-800 max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-gray-900 dark:text-gray-100">
            {isEditing ? "Edit Contribution" : "New Contribution"}
          </AlertDialogTitle>
        </AlertDialogHeader>

        <ContributionForm
          groupId={groupId}
          member={initialMember}
          defaultValues={initial ? {
            member_id: initial.member_id || "",
            amount: initial.amount,
            mode: initial.mode || "",
            reference: initial.reference || "",
            reason: initial.reason || "",
          } : undefined}
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      </AlertDialogContent>
    </AlertDialog>
  );
}