"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/presentation/components/ui/dialogs";
import { GroupFormValues } from "./arrays";
import GroupForm from "./form";
import { Group } from "@/domain/entities";

interface GroupDialogProps {
  open: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Group>) => void;
}

export function GroupDialog({
  open,
  isLoading,
  onClose,
  onSubmit,
}: GroupDialogProps) {
  const handleSubmit = async (values: GroupFormValues) => {
    onSubmit(values);
  };

  return (
    <AlertDialog open={open} onOpenChange={(o) => !o && onClose()}>
      <AlertDialogContent className="bg-white dark:bg-[#1d1d20] border border-gray-100 dark:border-gray-800 max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-gray-900 dark:text-gray-100">
            Create a New Chama
          </AlertDialogTitle>
        </AlertDialogHeader>

        <GroupForm
          onSubmit={handleSubmit}
          onCancel={onClose}
          isLoading={isLoading}
        />
      </AlertDialogContent>
    </AlertDialog>
  );
}