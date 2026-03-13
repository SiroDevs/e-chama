"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { newMemberGroups, newMemberFields, newMemberSchema } from "./arrays";
import { Form, FormActions, FormInput } from "@/presentation/components/ui/inputs";

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
              className={
                grp.fields.length > 1
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

        <FormActions
          onCancel={onCancel}
          isLoading={isLoading}
          disabled={false}
          saveLabel="Save Member"
        />
      </form>
    </Form>
  );
}
