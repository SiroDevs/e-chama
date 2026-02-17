import { z } from "zod";

export const editMemberSchema = z.object({
  first_name: z.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name is too long"),
  last_name: z.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name is too long"),
  email: z.string()
    .email("Please enter a valid email address"),
  phone: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number is too long"),
  id_number: z.string()
    .min(5, "ID number must be at least 5 characters")
    .max(20, "ID number is too long"),
  sex: z.string()
    .min(1, "Please select a gender")
    .refine(val => val !== "", {
      message: "Please select a gender",
    }),
  member_no: z.string()
    .min(3, "Member number must be at least 3 characters")
    .max(20, "Member number is too long"),
  role: z.string() .min(1, "Please select a role"),
  joined_at: z.date(),
});

export const editMemberLabels = {
  first_name: {
    name: "first_name" as const,
    label: "First Name",
    placeholder: "Member's first name",
    required: true,
    type: "text" as const,
  },
  last_name: {
    name: "last_name" as const,
    label: "Last Name",
    placeholder: "Member's last name",
    required: true,
    type: "text" as const,
  },
  email: {
    name: "email" as const,
    label: "Email Address",
    placeholder: "Member's email address",
    required: true,
    type: "email" as const,
  },
  phone: {
    name: "phone" as const,
    label: "Phone Number",
    placeholder: "Member's phone number",
    required: true,
    type: "tel" as const,
  },
  id_number: {
    name: "id_number" as const,
    label: "ID Number",
    placeholder: "Member's national ID number",
    required: false,
    type: "text" as const,
  },
  sex: {
    name: "sex" as const,
    label: "Gender",
    required: true,
    type: "radio" as const,
    options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
    ],
  },
  member_no: {
    name: "member_no" as const,
    label: "Member Number",
    placeholder: "Member's number",
    required: false,
    type: "text" as const,
  },
  role: {
    name: "role" as const,
    label: "Member Role",
    required: true,
    type: "select" as const,
    options: [
      { value: "member", label: "Member" },
      { value: "accountant", label: "Accountant" },
      { value: "treasurer", label: "Treasurer" },
      { value: "secretary", label: "Secretary" },
      { value: "chairperson", label: "Chairperson" },
    ],
  },
  joined_at: {
    name: "joined_at" as const,
    label: "Date Member Joined",
    placeholder: "Select join date",
    required: false,
    type: "date" as const,
  },
};

export type NewMemberFormValues = z.infer<typeof editMemberSchema>;

export const editMemberFieldGroups = [
  {
    id: 1,
    fields: ["first_name", "last_name"] as const,
  },
  {
    id: 2,
    fields: ["phone", "id_number", "sex"] as const,
  },
  {
    id: 3,
    fields: ["email"] as const,
  },
  {
    id: 4,
    fields: ["member_no", "role", "joined_at"] as const,
  },
];