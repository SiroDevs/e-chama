"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormDatePicker } from "@/presentation/components/ui/form";
import { FormRadioGroup } from "@/presentation/components/ui/form";
import { Form, FormActions } from "@/presentation/components/ui/form";
import { FormInput, FormSelect } from "@/presentation/components/ui/form";
import { NewMemberFormValues, newMemberSchema } from "./schema";
import { newMemberFieldGroups, newMemberFields } from "./fields";
import { countries, sexOptions } from "@/lib";

interface NewMemberFormProps {
  onSubmit: (values: NewMemberFormValues) => Promise<void> | void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export default function NewMemberForm({
  onSubmit,
  onCancel,
  isLoading = false,
}: NewMemberFormProps) {
  const form = useForm<NewMemberFormValues>({
    resolver: zodResolver(newMemberSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      phone: "",
      id_number: "",
      kra_pin: "",
      sex: undefined,
      member_no: "",
      address: "",
      country: "",
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: NewMemberFormValues) => {
    await onSubmit(values);
  };

  const renderField = (fieldName: keyof typeof newMemberFields) => {
    const field = newMemberFields[fieldName];

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
        {newMemberFieldGroups.map((grp) => (
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
          saveLabel="Save Member"
        />
      </form>
    </Form>
  );
}
