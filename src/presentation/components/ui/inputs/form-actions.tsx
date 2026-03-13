"use client";

import { SaveIcon, XIcon, Loader2 } from "lucide-react";
import { Button } from "@/presentation/components/ui";

interface FormActionsProps {
  onCancel?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  saveLabel?: string;
}

export function FormActions({
  onCancel,
  isLoading = false,
  disabled = false,
  saveLabel = "Save",
}: FormActionsProps) {
  return (
    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
      <Button
        type="button"
        variant="outline"
        size="lg"
        onClick={onCancel}
        disabled={isLoading}
        className="min-w-[120px]"
      >
        <XIcon className="w-4 h-4 mr-2" />
        Cancel
      </Button>
      <Button
        type="submit"
        size="lg"
        disabled={isLoading || disabled}
        className="min-w-[120px]"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <SaveIcon className="w-4 h-4 mr-2" />
            {saveLabel}
          </>
        )}
      </Button>
    </div>
  );
}