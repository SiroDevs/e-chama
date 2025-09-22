"use client";

import { useState } from "react";
import { Box, Alert, CircularProgress } from "@mui/material";
import { Typography, Stack, Button } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useAuthStore } from "@/state/auth/auth";
import { FormInput } from "@/components/inputs/FormInput";
import { newMemberLabels, newMemberSchema } from "./arrays";
import { newMemberFieldGroups } from "./arrays";
import { FormDatePicker, FormSelect, FormRadio } from "@/components/inputs";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveAltIcon from "@mui/icons-material/Person";
import { useRouter } from "next/navigation";
import { newMemberAction } from "../../actions/MemberAction";

type FormData = z.infer<typeof newMemberSchema>;

interface NewMemberFormProps {
  onMemberCreated: () => void;
}

export default function NewMemberForm({ onMemberCreated }: NewMemberFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { member } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(newMemberSchema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    try {
      const result = await newMemberAction({
        groupId: member?.group_id!,
        firstName: data.first_name.trim(),
        lastName: data.last_name.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        idNumber: data.id_number.trim(),
        sex: data.sex.trim(),
        memberNo: data.member_no.trim(),
        role: data.role.trim(),
        joinedAt: data.joined_at.trim(),
      });
      onMemberCreated();
    } catch (err: any) {
      // setFormError("root", {
      //   type: "manual",
      //   message: err.message || "Failed to create chama",
      // });
    } finally {
      setLoading(false);
    }
  };

  function handleBack(): void {
    router.push("/members");
  }

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
        <Box sx={{ textAlign: "center", py: 2 }}>
          <CircularProgress size={60} thickness={5} />
          <Typography variant="h5" component="h1" gutterBottom>
            Registering a new member ...
          </Typography>
        </Box>
      ) : (
        <Box
          component="form"
          id="new_group_form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 3,
          }}
        >
          {errors.root && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errors.root.message}
            </Alert>
          )}
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
                        id={field.name}
                        label={field.label}
                        required={field.required}
                        error={errors[field.name]}
                        registration={register(field.name)}
                        options={field.options || []}
                        defaultValue={field.options[0].value}
                      />
                    );
                  }

                  if (field.type === "radio") {
                    return (
                      <FormRadio
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
              variant="contained"
              startIcon={<ArrowBackIcon />}
              onClick={handleBack}
            >
              Back
            </Button>
            <Button
              type="submit"
              startIcon={<SaveAltIcon />}
              variant="contained"
              size="large"
              loading={loading}
            >
              Proceed
            </Button>
          </Stack>
        </Box>
      )}
    </Box>
  );
}
