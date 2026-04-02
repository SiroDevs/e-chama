"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/presentation/components/ui/dialogs/alert-dialog";
import { GroupContribution, GroupMember } from "@/domain/entities";
import { ContributionFormValues } from "./arrays";
import ContributionForm from "./form";

interface ContributionDialogProps {
  open: boolean;
  isMember: boolean;
  isLoading: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<GroupContribution>) => void;
  initial?: GroupContribution | null;
  groupId: string;
}

export function ContributionDialog({
  open,
  isMember,
  isLoading,
  onClose,
  onSubmit,
  initial,
  groupId,
}: ContributionDialogProps) {
  const isEditing = !!initial?.id;

  const initialMember: GroupMember | null = initial?.id
    ? ({ member_id: initial.id, full_name: initial.full_name || null, member_no: initial.member_no || null } as unknown as GroupMember)
    : null;

  const handleSubmit = async (values: ContributionFormValues) => {
    onSubmit({
      ...initial,
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
            member_id: initial.id || "",
            amount: initial.amount,
            mode: initial.mode || "",
            reference: initial.reference || "",
            reason: initial.reason || "",
          } : undefined}
          onSubmit={handleSubmit}
          onCancel={onClose}
          isMember={isMember}
          isLoading={isLoading}
        />
      </AlertDialogContent>
    </AlertDialog>
  );
}