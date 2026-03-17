"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { GroupSchema, groupFields, GroupFormValues } from "./arrays";
import { Form, FormInput } from "@/presentation/components/ui/inputs";
import { FormActions } from "@/presentation/components/ui/inputs";

interface GroupFormProps {
  onSubmit: (values: GroupFormValues) => Promise<void> | void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export default function GroupForm({
  onSubmit,
  onCancel,
  isLoading = false,
}: GroupFormProps) {
  const form = useForm<GroupFormValues>({
    resolver: zodResolver(GroupSchema),
    defaultValues: {
      title: "",
      description: "",
      initials: "",
      location: "",
      address: "",
    },
  });

  const handleSubmit = async (values: GroupFormValues) => {
    await onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {Object.values(groupFields).map((field) => {
          return (
            <FormInput
              key={field.name}
              control={form.control}
              name={field.name}
              label={field.label}
              placeholder={
                "placeholder" in field ? field.placeholder : undefined
              }
              type={field.type}
              required={field.required}
              autoComplete="off"
              disabled={isLoading}
            />
          );
        })}

        <FormActions
          onCancel={onCancel}
          isLoading={isLoading}
          disabled={false}
          saveLabel="Save Chama"
        />
      </form>
    </Form>
  );
}
