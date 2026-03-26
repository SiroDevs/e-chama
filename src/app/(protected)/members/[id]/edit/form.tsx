"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { memberSchema, MemberFormValues } from "./schema";
import { FormDatePicker } from "@/presentation/components/ui/form";
import { FormRadioGroup } from "@/presentation/components/ui/form";
import { Form, FormActions } from "@/presentation/components/ui/form";
import { FormInput, FormSelect } from "@/presentation/components/ui/form";
import { fieldGroups, memberFields } from "./fields";
import { countries, sexOptions } from "@/lib";

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
      member_no: "",
      id_number: "",
      kra_pin: "",
      sex: undefined,
      address: "",
      country: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData]);
  const handleSubmit = async (values: MemberFormValues) => {
    await onSubmit(values);
  };

  const renderField = (fieldName: keyof typeof memberFields) => {
    const field = memberFields[fieldName];

    switch (field.type) {
      case "date":
        return (
          <FormDatePicker
            key={field.name}
            control={form.control}
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
            required={field.required}
            disabled={isLoading}
          />
        );

      case "radio":
        if (field.name === "sex") {
          return (
            <FormRadioGroup
              key={field.name}
              control={form.control}
              name={field.name}
              label={field.label}
              options={sexOptions}
              required={field.required}
              disabled={isLoading}
            />
          );
        }
        break;

      case "select":
        if (field.name === "country") {
          const countryOptions = countries.map((country) => ({
            value: country.code,
            label: country.name,
          }));
          return (
            <FormSelect
              key={field.name}
              control={form.control}
              name={field.name}
              label={field.label}
              options={countryOptions}
              placeholder={field.placeholder}
              required={field.required}
              disabled={isLoading}
            />
          );
        }
        break;

      default:
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
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {fieldGroups.map((grp) => (
          <div key={grp.id}>
            <fieldset
              className={
                grp.fields.length > 1
                  ? "grid grid-cols-1 gap-4 sm:grid-cols-2"
                  : "w-full"
              }
            >
              {grp.fields.map((fieldName) => renderField(fieldName))}
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
