"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Form, FormInput } from "@/presentation/components/ui";
import { newMemberGroups, newMemberFields, newMemberSchema } from "./arrays";
import { SaveIcon, XIcon } from "lucide-react";

export type FormValues = z.infer<typeof newMemberSchema>;

interface NewMemberFormProps {
  onSubmit: (values: FormValues) => Promise<void> | void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export default function NewMemberForm({
  onSubmit,
  onCancel,
  isLoading = false,
}: NewMemberFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(newMemberSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      phone: "",
      id_number: "",
      member_no: "",
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: FormValues) => {
    await onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {newMemberGroups.map((grp) => (
          <div key={grp.id}>
            <fieldset
              className={grp.fields.length > 1 
                ? "grid grid-cols-1 gap-4 sm:grid-cols-2" 
                : "w-full"
              }
            >
              {grp.fields.map((fieldName) => {
                const field = newMemberFields[fieldName];
                return (
                  <FormInput
                    key={field.name}
                    control={form.control}
                    name={field.name}
                    label={field.label}
                    placeholder={field.placeholder}
                    type={field.type}
                    required={field.required}
                    autoComplete="off"
                    disabled={isLoading}
                  />
                );
              })}
            </fieldset>
          </div>
        ))}

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
            disabled={isLoading}
            className="min-w-[120px]"
          >
            {isLoading ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Saving...
              </>
            ) : (
              <>
                <SaveIcon className="w-4 h-4 mr-2" />
                Save Member
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}