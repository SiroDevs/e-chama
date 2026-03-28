"use client";

import { type LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center gap-6 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800 bg-gray-50/40 dark:bg-gray-900/20 px-8 py-24 text-center overflow-hidden w-full h-full ${className}`}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 rounded-full bg-gray-100 dark:bg-gray-800/60 blur-3xl opacity-60" />
      </div>

      <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm text-gray-300 dark:text-gray-600">
        <Icon className="w-7 h-7" strokeWidth={1.5} />
      </div>

      <div className="relative flex flex-col items-center gap-2 max-w-sm">
        <p className="text-base font-semibold tracking-tight text-gray-700 dark:text-gray-200">
          {title}
        </p>
        {description && (
          <p className="text-sm leading-relaxed text-gray-400 dark:text-gray-500">
            {description}
          </p>
        )}
      </div>

      {action && (
        <>
          <div className="relative w-full max-w-sm border-t border-gray-200 dark:border-gray-800" />
          <div className="relative">
            {action}
          </div>
        </>
      )}
    </div>
  );
}