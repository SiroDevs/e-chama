"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { memberGroups, memberFields } from "./arrays";
import { memberSchema, MemberFormValues } from "./arrays";
import { Form, FormActions } from "@/presentation/components/ui/inputs";
import { FormInput } from "@/presentation/components/ui/inputs";
import { useEffect } from "react";

interface EditMemberFormProps {
  initialData?: MemberFormValues;
  onSubmit: (values: MemberFormValues) => Promise<void> | void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export default function EditMemberForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: EditMemberFormProps) {
  const form = useForm<MemberFormValues>({
    resolver: zodResolver(memberSchema),
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

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData]); // form is a stable ref, safe to omit

  const handleSubmit = async (values: MemberFormValues) => {
    await onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {memberGroups.map((grp) => (
          <div key={grp.id}>
            <fieldset
              className={
                grp.fields.length > 1
                  ? "grid grid-cols-1 gap-4 sm:grid-cols-2"
                  : "w-full"
              }
            >
              {grp.fields.map((fieldName) => {
                const field = memberFields[fieldName];
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
          saveLabel="Edit Member"
        />
      </form>
    </Form>
  );
}