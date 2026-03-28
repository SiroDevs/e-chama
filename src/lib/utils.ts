import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toE164(phone: string, countryCode = "254"): string {
  if (!phone?.trim()) return "";
  
  const cleaned = phone.trim().replace(/\s+/g, "");
  
  if (cleaned.startsWith("+")) {
    return cleaned.length >= 8 ? cleaned : "";
  }
  
  const normalizedCountryCode = countryCode.replace(/^\+/, "");
  
  if (cleaned.startsWith("0")) {
    return `+${normalizedCountryCode}${cleaned.slice(1)}`;
  }
  
  if (cleaned.startsWith(normalizedCountryCode)) {
    return `+${cleaned}`;
  }
  
  if (/^\d{10,15}$/.test(cleaned)) {
    return `+${normalizedCountryCode}${cleaned}`;
  }

  return `+${normalizedCountryCode}${cleaned}`;
}

export function formatNumber(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  return n.toLocaleString();
}
