import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const matchNavigationPaths = (routerPath: string, optionPath: string) => {
  if (optionPath.startsWith("/#")) {
    return window.location.hash === optionPath;
  }
  return routerPath === optionPath;
};

// utils/date-format.ts
interface DateFormatOptions {
  useNumericFormat?: boolean;
}

export function formatDateTime(
  date: Date | string | null | undefined, 
  options: DateFormatOptions = {}
): string {
  if (!date) return '-';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) return '-';
  
  const { useNumericFormat = false } = options;
  
  if (useNumericFormat) {
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  } else {
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }
}

export function formatDate(
  date: Date | string | null | undefined,
  options: DateFormatOptions = {}
): string {
  if (!date) return '-';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) return '-';
  
  const { useNumericFormat = false } = options;
  
  if (useNumericFormat) {
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  } else {
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}