"use client";

import { AlertCircle } from "lucide-react";

import {
  Alert,
  AlertDialog,
  AlertTitle,
  AlertDescription,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/presentation/components/ui/dialogs";
import { GroupFormValues } from "./arrays";
import GroupForm from "./form";
import { Group } from "@/domain/entities";
import { RootState } from "@/application/state/store";
import { useSelector } from "react-redux";

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
  const { error } = useSelector((state: RootState) => state.app);
  const handleSubmit = async (values: GroupFormValues) => {
    onSubmit(values);
  };

  return (
    <AlertDialog open={open} onOpenChange={(o) => !o && onClose()}>
      <AlertDialogContent className="bg-white dark:bg-[#1d1d20] border border-gray-100 dark:border-gray-800 max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-gray-900 dark:text-gray-100">
            Create a New Chama
            {/* {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )} */}
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
