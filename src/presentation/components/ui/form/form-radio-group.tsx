"use client";

import { RadioGroup, RadioGroupItem } from "..";
import { FormControl, FormDescription, FormField } from "./form";
import { FormItem, FormLabel, FormMessage } from "./form";

interface RadioOption {
  value: string;
  label: string;
}

interface FormRadioGroupProps {
  control: any;
  name: string;
  label: string;
  options: readonly RadioOption[] | RadioOption[];
  description?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export function FormRadioGroup({
  control,
  name,
  label,
  options,
  description,
  required = false,
  disabled = false,
  className,
}: FormRadioGroupProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              value={field.value}
              disabled={disabled}
              className="flex flex-row gap-4"
            >
              {options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={option.value}
                    id={`${name}-${option.value}`}
                  />
                  <label
                    htmlFor={`${name}-${option.value}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </RadioGroup>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
