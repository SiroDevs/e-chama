"use client";

import { Box, Typography, Stack, Button } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FormInput } from "@/presentation/components/inputs/FormInput";
import { editMemberLabels, editMemberSchema } from "./arrays";
import { editMemberFieldGroups } from "./arrays";
import { FormDatePicker, FormSelect, FormRadio } from "@/presentation/components/inputs";
import { CheckBox, Cancel } from "@mui/icons-material";
import { Loader } from "@/presentation/components/general";
import { GroupMember } from "@/data/types/profiles";

type FormData = z.infer<typeof editMemberSchema>;

interface EditMemberFormProps {
  member: GroupMember,
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function EditMemberForm({
  member,
  onSubmit,
  onCancel,
  loading = false,
}: EditMemberFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(editMemberSchema),
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
          title="Registering the edit member ..."
          message="Creating a edit profile."
        />
      ) : (
        <Box
          component="form"
          id="edit_group_form"
          onSubmit={handleSubmit(handleFormSubmit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 3,
          }}
        >
          {editMemberFieldGroups.map((group) => (
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
                  const field = editMemberLabels[fieldName];

                  if (field.type === "select") {
                    return (
                      <FormSelect
                        key={field.name}
                        id={field.name}
                        label={field.label}
                        // value={member.first_name}
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

          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              type="submit"
              startIcon={<CheckBox />}
              variant="contained"
              size="large"
            >
              Save Changes
            </Button>
            <Button
              variant="outlined"
              startIcon={<Cancel />}
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      )}
    </Box>
  );
}
