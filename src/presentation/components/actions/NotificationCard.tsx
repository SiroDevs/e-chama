"use client";

import { Avatar } from "@mui/material";
import { ReactNode } from "react";

interface NotificationCardProps {
  title: string;
  message: string;
  icon: ReactNode;
  iconBgColor?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function NotificationCard({
  title,
  message,
  icon,
  iconBgColor = "success.main",
  actionLabel = "Close",
  onAction,
}: NotificationCardProps) {
  return (
    <div className="max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5">
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <Avatar sx={{ m: 1, bgcolor: iconBgColor }}>{icon}</Avatar>
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">{title}</p>
            <p className="mt-1 text-sm text-gray-500">{message}</p>
          </div>
        </div>
      </div>
      {onAction && (
        <div className="flex border-l border-gray-200">
          <button
            onClick={onAction}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {actionLabel}
          </button>
        </div>
      )}
    </div>
  );
}
