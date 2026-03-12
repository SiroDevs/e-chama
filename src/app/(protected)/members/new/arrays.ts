import { z } from "zod";

export const newMemberSchema = z
  .object({
    first_name: z.string().min(4, { message: "Your first name is too short" }),
    last_name: z.string().min(4, { message: "Your last name is too short" }),
    phone: z.string()
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number is too long"),
    id_number: z.string()
      .min(5, "ID number must be at least 5 characters")
      .max(20, "ID number is too long"),
    member_no: z.string()
      .min(3, "Member number must be at least 3 characters")
      .max(20, "Member number is too long"),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  });

export const newMemberFields = {
  first_name: {
    name: "first_name" as const,
    label: "First Name",
    placeholder: "Jane",
    required: true,
    type: "text" as const,
  },
  last_name: {
    name: "last_name" as const,
    label: "Last Name",
    placeholder: "Doe",
    required: true,
    type: "text" as const,
  },
  email: {
    name: "email" as const,
    label: "Email Address",
    placeholder: "member@group.com",
    required: true,
    type: "email" as const,
  },
  phone: {
    name: "phone" as const,
    label: "Phone Number",
    placeholder: "0712345678",
    required: false,
    type: "tel" as const,
  },
  id_number: {
    name: "id_number" as const,
    label: "ID Number",
    placeholder: "12345678",
    required: false,
    type: "text" as const,
  },
  member_no: {
    name: "member_no" as const,
    label: "Member Number",
    placeholder: "001",
    required: false,
    type: "text" as const,
  },
  password: {
    name: "password" as const,
    label: "Password",
    placeholder: "*******",
    required: true,
    type: "password" as const,
  },
};

export const newMemberGroups = [
  {
    id: 1,
    fields: ["first_name", "last_name"] as const,
  },
  {
    id: 2,
    fields: ["phone", "id_number"] as const,
  },
  {
    id: 3,
    fields: ["email"] as const,
  },
  {
    id: 4,
    fields: ["member_no", "password"] as const,
  },
];