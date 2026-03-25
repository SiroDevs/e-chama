"use client";

import { UseFormReturn } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem } from ".";
import { FormLabel, FormMessage, Input } from ".";

interface FormDatePickerProps {
  control: UseFormReturn<any>["control"];
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
}

export function FormDatePicker({
  control,
  name,
  label,
  placeholder = "YYYY-MM-DD",
  description,
  required = false,
  disabled = false,
}: FormDatePickerProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </FormLabel>
          <FormControl>
            <Input
              type="date"
              placeholder={placeholder}
              {...field}
              disabled={disabled}
              max={new Date().toISOString().split("T")[0]}
              min="1900-01-01"
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
