import { useState } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

import { FormField, FormControl } from "@/presentation/components/ui/form";
import { FormItem, FormLabel, FormMessage } from "@/presentation/components/ui/form";
import { Button } from "../button";
import { Input } from "..";

interface SelectOption {
  value: string;
  label: string;
}

interface FormInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  required?: boolean;
  disabled?: boolean;
  showPasswordToggle?: boolean;
  options?: SelectOption[];
}

export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  autoComplete,
  autoFocus = false,
  required = false,
  disabled = false,
  showPasswordToggle = false,
  options,
}: FormInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    showPasswordToggle && type === "password"
      ? showPassword ? "text" : "password"
      : type;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const hasError = !!fieldState.error;

        return (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              {label}
              {required && (
                <span className="text-red-500 text-sm" aria-hidden="true">*</span>
              )}
            </FormLabel>
            <FormControl>
              <div className="relative">
                {type === "select" && options ? (
                  <select
                    {...field}
                    disabled={disabled}
                    aria-invalid={hasError}
                    className={`w-full px-3 py-2 text-sm rounded-lg border ${
                      hasError
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-200 dark:border-gray-700"
                    } bg-white dark:bg-[#2a2d3e] text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <option value="">{placeholder || `Select`}</option>
                    {options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <>
                    <Input
                      type={inputType}
                      placeholder={placeholder}
                      autoComplete={autoComplete}
                      autoFocus={autoFocus}
                      required={required}
                      disabled={disabled}
                      className={`
                        ${showPasswordToggle ? "pr-10" : ""}
                        ${hasError ? "border-red-500 focus-visible:ring-red-500" : ""}
                      `}
                      aria-invalid={hasError}
                      aria-describedby={hasError ? `${name}-error` : undefined}
                      {...field}
                    />
                    {showPasswordToggle && type === "password" && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={disabled}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-500" />
                        )}
                      </Button>
                    )}
                    {hasError && (
                      <div className="absolute right-0 top-0 h-full flex items-center pr-3 pointer-events-none">
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      </div>
                    )}
                  </>
                )}
              </div>
            </FormControl>
            <FormMessage id={`${name}-error`} />
          </FormItem>
        );
      }}
    />
  );
}