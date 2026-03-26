"use client";

import { FormControl, FormDescription, FormField } from ".";
import { FormItem, FormLabel, FormMessage } from ".";
import { Select, SelectItem } from "@/presentation/components/ui";
import { SelectContent } from "@/presentation/components/ui";
import { SelectTrigger, SelectValue } from "@/presentation/components/ui";

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps {
  control: any;
  name: string;
  label: string;
  options: readonly SelectOption[] | SelectOption[];
  placeholder?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
}

export function FormSelect({
  control,
  name,
  label,
  options,
  placeholder = "Select an option",
  description,
  required = false,
  disabled = false,
}: FormSelectProps) {
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
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            value={field.value}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
