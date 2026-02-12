"use client";

import { Box, Alert, Typography, Stack, Button } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FormInput } from "@/components/inputs/FormInput";
import { newMemberLabels, newMemberSchema } from "./arrays";
import { newMemberFieldGroups } from "./arrays";
import { FormDatePicker, FormSelect, FormRadio } from "@/components/inputs";
import { ArrowBack, Person } from "@mui/icons-material";
import { Loader } from "@/components/general";

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
    <Box
      sx={{
        width: { xs: "100%", md: "80%" },
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        p: 2,
        backgroundColor: "background.paper",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        "&:hover": {
          boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      {loading ? (
        <Loader
          height="30vh"
          title="Registering the new member ..."
          message="Creating a new profile."
        />
      ) : (
        <Box
          component="form"
          id="new_group_form"
          onSubmit={handleSubmit(handleFormSubmit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 3,
          }}
        >
          {newMemberFieldGroups.map((group) => (
            <div key={group.id}>
              <Typography
                component="div"
                sx={{
                  width: "100%",
                  display: "flex",
                  gap: 1,
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
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
              </Typography>
            </div>
          ))}

          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              startIcon={<Person />}
              variant="contained"
              size="large"
            >
              Create Member
            </Button>
          </Stack>
        </Box>
      )}
    </Box>
  );
}
