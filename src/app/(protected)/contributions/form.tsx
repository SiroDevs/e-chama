"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useForm, type Resolver, type Control } from "react-hook-form";

import { contributionSchema, contributionFields } from "./arrays";
import { contributionGroups, ContributionFormValues } from "./arrays";
import { GroupMember } from "@/domain/entities";
import { Form, FormInput } from "@/presentation/components/ui/inputs";
import { FormActions } from "@/presentation/components/ui/inputs";
import { MemberSearchField } from "@/presentation/components/common";

interface ContributionFormProps {
  onSubmit: (
    values: ContributionFormValues,
    member: GroupMember,
  ) => Promise<void> | void;
  onCancel?: () => void;
  isLoading?: boolean;
  groupId: string;
  member?: GroupMember | null;
  defaultValues?: Partial<ContributionFormValues>;
}

export default function ContributionForm({
  onSubmit,
  onCancel,
  isLoading = false,
  groupId,
  member,
  defaultValues,
}: ContributionFormProps) {
  const [selectedMember, setSelectedMember] = useState<GroupMember | null>(
    member || null,
  );

  const form = useForm<ContributionFormValues>({
    resolver: zodResolver(contributionSchema) as Resolver<ContributionFormValues>,
    defaultValues: {
      member_id: member?.id || "",
      amount: 0,
      mode: "",
      reference: "",
      reason: "",
      ...defaultValues,
    },
  });

  useEffect(() => {
    setSelectedMember(member || null);
    form.setValue("member_id", member?.id || "");
  }, [member]);

  const handleMemberChange = (member: GroupMember | null) => {
    setSelectedMember(member);
    form.setValue("member_id", member?.id || "", { shouldValidate: true });
  };

  const handleSubmit = async (values: ContributionFormValues) => {
    if (!selectedMember) return;
    await onSubmit(values, selectedMember);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {contributionGroups.map((grp) => (
          <div key={grp.id}>
            <fieldset
              className={
                grp.fields.length > 1
                  ? "grid grid-cols-1 gap-4 sm:grid-cols-2"
                  : "w-full"
              }
            >
              {grp.fields.map((fieldName) => {
                const field = contributionFields[fieldName];

                if (field.type === "member-search") {
                  return (
                    <MemberSearchField
                      key={field.name}
                      groupId={groupId}
                      member={member}
                      onChange={handleMemberChange}
                      error={form.formState.errors.member_id?.message}
                    />
                  );
                }

                return (
                  <FormInput
                    key={field.name}
                    control={form.control}
                    name={field.name}
                    label={field.label}
                    placeholder={
                      "placeholder" in field ? field.placeholder : undefined
                    }
                    type={field.type === "select" ? "select" : field.type}
                    options={"options" in field ? field.options : undefined}
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
          disabled={!selectedMember}
          saveLabel="Save Contribution"
        />
      </form>
    </Form>
  );
}
