"use client";

import { Alert, Autocomplete, Box, Stack, TextField } from "@mui/material";
import { UseFormRegister, UseFormHandleSubmit } from "react-hook-form";
import { FormInput, FormSelect } from "@/presentation/components/inputs";
import { newContributionFieldGroups } from "./arrays";
import { newContributionLabels, newContributionSchema } from "./arrays";
import { GroupMember } from "@/data/types/profiles";
import { z } from "zod";

type FormData = z.infer<typeof newContributionSchema>;

interface ContributionFormProps {
  members: GroupMember[];
  onMemberSelect: (event: any, value: string | null) => void;
  errors: any;
  register: UseFormRegister<FormData>;
  handleSubmit: UseFormHandleSubmit<FormData>;
  onSubmit: (data: FormData) => Promise<void>;
}

export function ContributionForm({
  members,
  onMemberSelect,
  errors,
  register,
  handleSubmit,
  onSubmit,
}: ContributionFormProps) {

  return (
    <Box
      component="form"
      id="new_contribution_form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: 2,
        mt: 1,
      }}
    >
      {errors.root && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errors.root.message}
        </Alert>
      )}

      {members.length > 0 && (
        <Stack spacing={2}>
          <Autocomplete
            freeSolo
            id="member-search"
            options={members.map((member) => member.full_name)}
            onChange={onMemberSelect}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Member"
                placeholder="Type to search members..."
                slotProps={{
                  input: {
                    ...params.InputProps,
                    type: "search",
                  },
                }}
              />
            )}
          />
        </Stack>
      )}

      {newContributionFieldGroups.map((group) => (
        <Box key={group.id}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              gap: 1,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            {group.fields.map((fieldName) => {
              const field = newContributionLabels[fieldName];

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

              return (
                <FormInput
                  key={field.name}
                  id={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  type={field.type}
                  autoComplete="off"
                  autoFocus={field.name === "amount"}
                  required={field.required}
                  error={errors[field.name]}
                  registration={register(field.name, {
                    valueAsNumber: field.name === "amount",
                  })}
                />
              );
            })}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
