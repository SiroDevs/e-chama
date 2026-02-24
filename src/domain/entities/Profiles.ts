export const UserRoles = [
  'admin',
  'treasurer',
  'accountant',
  'secretary',
  'chairperson',
  'vicechairperson',
  'official',
  'member'
] as const;

export type UserRole = typeof UserRoles[number];

export interface UserRoleInfo {
  role: UserRole;
  label: string;
  description: string;
}

export function isUserRole(role: string): role is UserRole {
  return UserRoles.includes(role as UserRole);
}

export function getRoleInfo(role: string): UserRoleInfo {
  if (isUserRole(role)) {
    return RoleInfo[role];
  }

  return {
    role: 'member',
    label: role,
    description: 'Unknown role'
  };
}

const RoleInfo: Record<UserRole, UserRoleInfo> = {
  admin: {
    role: 'admin',
    label: 'Admin',
    description: 'Full system access'
  },
  treasurer: {
    role: 'treasurer',
    label: 'Treasurer',
    description: 'Manage group finances'
  },
  accountant: {
    role: 'accountant',
    label: 'Accountant',
    description: 'Financial records and reporting'
  },
  secretary: {
    role: 'secretary',
    label: 'Secretary',
    description: 'Chama records and communications'
  },
  chairperson: {
    role: 'chairperson',
    label: 'Chairperson',
    description: 'Chama leader'
  },
  vicechairperson: {
    role: 'vicechairperson',
    label: 'Vice Chairperson',
    description: 'Assists chairperson'
  },
  official: {
    role: 'official',
    label: 'Official',
    description: 'Official with specific responsibilities'
  },
  member: {
    role: 'member',
    label: 'Member',
    description: 'Member with standard privileges'
  }
};

export interface Profile {
  id?: string;
  first_name?: string;
  last_name?: string;
  country?: string;
  address?: string;
  sex?: string;
  dob?: string;
  avatar?: string;
  id_number?: string;
  kra_pin?: string;
}

export interface Member {
  id?: string;
  group_id?: string;
  member_no?: string;
  role?: string;
  joined_at?: string;
}
