import * as React from "react";
import { ReactNode } from "react";

import { Button } from "../button";

interface PageActionProps {
  title: string;
  icon: ReactNode;
  onClick?: () => void;
  size?: "small" | "medium" | "large";
}

export function PageAction({
  title,
  icon,
  size = "medium",
  onClick,
}: PageActionProps) {
  const sizeClasses = {
    small: "px-2 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };

  return (
    <Button onClick={onClick}>
      {icon}
      {title}
    </Button>
  );
}

interface PageButtonProps {
  title: string;
  icon: ReactNode;
  onClick?: () => void;
}

export function PageButton({ title, icon, onClick }: PageButtonProps) {
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={onClick}
        className="p-2 rounded-md hover:bg-gray-100 transition-colors"
        aria-label={title}
      >
        {icon}
      </button>
      {showTooltip && (
        <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap bg-gray-800 text-white text-xs px-2 py-1 rounded z-10">
          {title}
        </div>
      )}
    </div>
  );
}

interface DialogButtonProps {
  label: string;
  form_id: string;
  handleClose?: () => void;
}

export function DialogButton({
  label,
  form_id,
  handleClose,
}: DialogButtonProps) {
  return (
    <div className="flex justify-end gap-2 px-6 pb-4">
      <button
        onClick={handleClose}
        className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
      >
        Cancel
      </button>
      <button
        type="submit"
        form={form_id}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        {label}
      </button>
    </div>
  );
}
