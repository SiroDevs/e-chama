"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { XIcon, SaveIcon } from "lucide-react";
import { z } from "zod";

import { FormInput } from "@/presentation/components/inputs/FormInput";
import { newMemberLabels, newMemberSchema } from "./arrays";
import { newMemberFieldGroups } from "./arrays";
import LoadingSpinner from "@/presentation/components/ui/states/loading-spinner";

type FormData = z.infer<typeof newMemberSchema>;

interface NewMemberFormProps {
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function NewMemberForm({
  onSubmit,
  onCancel,
  loading = false,
}: NewMemberFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(newMemberSchema),
  });

  const handleFormSubmit = (data: FormData) => {
    onSubmit(data);
  };

  return (
    <div className="w-full md:w-4/5 rounded-lg border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <form
          id="new_group_form"
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col w-full gap-6"
        >
          {newMemberFieldGroups.map((group) => (
            <div key={group.id} className="space-y-2">
              <div className="w-full flex flex-col sm:flex-row gap-2">
                {group.fields.map((fieldName) => {
                  const field = newMemberLabels[fieldName];

                  if (field.type === "select") {
                    return (
                      <FormSelect
                        key={field.name}
                        id={field.name}
                        label={field.label}
                        required={field.required}
                        error={errors[field.name]}
                        registration={register(field.name)}
                        options={field.options || []}
                      />
                    );
                  }

                  if (field.type === "radio") {
                    return (
                      <FormRadio
                        key={field.name}
                        id={field.name}
                        label={field.label}
                        required={field.required}
                        error={errors[field.name]}
                        registration={register(field.name)}
                        options={field.options || []}
                      />
                    );
                  }

                  if (field.type === "date") {
                    return (
                      <FormDatePicker
                        key={field.name}
                        id={field.name}
                        label={field.label}
                        required={field.required}
                        error={errors[field.name]}
                        registration={register(field.name)}
                      />
                    );
                  }

                  return (
                    <FormInput
                      key={field.name}
                      id={field.name}
                      label={field.label}
                      placeholder={field.placeholder}
                      type={field.type}
                      autoComplete="off"
                      autoFocus={field.name === "first_name"}
                      required={field.required}
                      error={errors[field.name]}
                      registration={register(field.name)}
                    />
                  );
                })}
              </div>
            </div>
          ))}

          <div className="flex flex-row gap-4 justify-between items-center">
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <XIcon className="w-4 h-4" />
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              <SaveIcon className="w-4 h-4" />
              Save Member
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
