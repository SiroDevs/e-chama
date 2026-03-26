export const memberFields = {
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
  kra_pin: {
    name: "kra_pin" as const,
    label: "KRA PIN",
    placeholder: "A123345434J",
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
  sex: {
    name: "sex" as const,
    label: "Gender",
    placeholder: "Select gender",
    required: false,
    type: "radio" as const,
  },
  dob: {
    name: "dob" as const,
    label: "Date of Birth",
    placeholder: "Select date",
    required: false,
    type: "date" as const,
  },
  address: {
    name: "address" as const,
    label: "Physical Address",
    placeholder: "Town or Place",
    required: false,
    type: "text" as const,
  },
  country: {
    name: "country" as const,
    label: "Country",
    placeholder: "Select country",
    required: false,
    type: "select" as const,
  },
};

export const fieldGroups = [
  {
    id: 1,
    fields: ["first_name", "last_name"] as const,
  },
  {
    id: 2,
    fields: ["phone", "member_no"] as const,
  },
  {
    id: 3,
    fields: ["id_number", "kra_pin"] as const,
  },
  {
    id: 4,
    fields: ["sex", "dob"] as const,
  },
  {
    id: 5,
    fields: ["address", "country"] as const,
  },
];
