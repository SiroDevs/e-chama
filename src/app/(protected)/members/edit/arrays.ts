import { z } from "zod";

export const newMemberSchema = z.object({
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
    .max(15, "Phone number is too long")
    .optional()
    .or(z.literal("")),
  
  id_number: z.string()
    .min(5, "ID number must be at least 5 characters")
    .max(20, "ID number is too long")
    .optional()
    .or(z.literal("")),
  
  sex: z.string()
    .min(1, "Please select a gender")
    .optional()
    .or(z.literal("")),
  dob: z.string()
    .optional()
    .or(z.literal("")),
  
  country: z.string()
    .min(2, "Country must be at least 2 characters")
    .max(50, "Country name is too long")
    .optional()
    .or(z.literal("")),
  address: z.string()
    .max(200, "Address is too long")
    .optional()
    .or(z.literal("")),
  
  member_no: z.string()
    .min(3, "Member number must be at least 3 characters")
    .max(20, "Member number is too long")
    .optional()
    .or(z.literal("")),
  role: z.string()
    .min(1, "Please select a role")
    .default("member"),
  joined_at: z.string()
    .optional()
    .or(z.literal("")),
});

export const newMemberLabels = {
  first_name: {
    name: "first_name" as const,
    label: "First Name *",
    placeholder: "Enter first name",
    required: true,
    type: "text" as const,
  },
  last_name: {
    name: "last_name" as const,
    label: "Last Name *",
    placeholder: "Enter last name",
    required: true,
    type: "text" as const,
  },
  email: {
    name: "email" as const,
    label: "Email Address *",
    placeholder: "Enter email address",
    required: true,
    type: "email" as const,
  },
  phone: {
    name: "phone" as const,
    label: "Phone Number",
    placeholder: "Enter phone number",
    required: true,
    type: "tel" as const,
  },
  
  // Identification
  id_number: {
    name: "id_number" as const,
    label: "ID Number",
    placeholder: "Enter national ID number",
    required: false,
    type: "text" as const,
  },
  kra_pin: {
    name: "kra_pin" as const,
    label: "KRA PIN",
    placeholder: "Enter KRA PIN",
    required: false,
    type: "text" as const,
  },
  
  // Personal Details
  sex: {
    name: "sex" as const,
    label: "Gender",
    placeholder: "Select gender",
    required: true,
    type: "select" as const,
    options: [
      { value: "", label: "Select Gender" },
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      { value: "other", label: "Other" },
    ],
  },
  dob: {
    name: "dob" as const,
    label: "Date of Birth",
    placeholder: "Select date of birth",
    required: false,
    type: "date" as const,
  },
  
  country: {
    name: "country" as const,
    label: "Country",
    placeholder: "Enter country",
    required: false,
    type: "text" as const,
  },
  address: {
    name: "address" as const,
    label: "Physical Address",
    placeholder: "Enter full address",
    required: false,
    type: "text" as const,
  },
  
  member_no: {
    name: "member_no" as const,
    label: "Member Number",
    placeholder: "Enter member number",
    required: false,
    type: "text" as const,
  },
  role: {
    name: "role" as const,
    label: "Role *",
    placeholder: "Select role",
    required: true,
    type: "select" as const,
    options: [
      { value: "member", label: "Member" },
      { value: "admin", label: "Admin" },
      { value: "treasurer", label: "Treasurer" },
      { value: "secretary", label: "Secretary" },
      { value: "chairperson", label: "Chairperson" },
    ],
  },
  joined_at: {
    name: "joined_at" as const,
    label: "Date Joined",
    placeholder: "Select join date",
    required: false,
    type: "date" as const,
  },
};

export type NewMemberFormValues = z.infer<typeof newMemberSchema>;

export const newMemberFieldGroups = [
  {
    id: 1,
    fields: ["first_name", "last_name", "id_number"] as const,
  },
  {
    id: 2,
    fields: ["phone","email"] as const,
  },
  {
    id: 3,
    fields: ["sex", "dob"] as const,
  },
  {
    id: 4,
    fields: ["country", "address"] as const,
  },
  {
    id: 5,
    fields: ["member_no", "role", "joined_at"] as const,
  },
];