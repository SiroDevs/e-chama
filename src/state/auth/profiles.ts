export type Role = 'user' | 'admin';

export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  id_number: string | null;
  kra_pin: string | null;
  country: string | null;
  address: string | null;
  sex: string | null;
  dob: Date | null;
  passport: string | null;
  group: string | null;
  field2: string | null;
  field3: string | null;
  created_at: string;
  updated_at: string | null;
}