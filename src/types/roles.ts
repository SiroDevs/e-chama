import { Member, UserRole, isUserRole } from "@/state/role/profiles";

// Safe function to filter and validate roles
export function validateRoles(roles: string[]): UserRole[] {
  return roles.filter(isUserRole);
}

// Safe function to get default role (fallback to member)
export function getDefaultRole(roles: string[]): UserRole {
  const validRoles = validateRoles(roles);
  return validRoles.includes('member') ? 'member' : validRoles[0] || 'member';
}

// Check if a user has a specific role
export function hasRole(userRoles: string[], targetRole: UserRole): boolean {
  return validateRoles(userRoles).includes(targetRole);
}

export function setUserRole(member: Member): UserRole[] {
  const roles: string[] = [];

  if (member.role == 'treasurer') roles.push('treasurer');
  else if (member.role == 'accountant') roles.push('accountant');
  else if (member.role == 'secretary') roles.push('secretary');
  else if (member.role == 'chairperson') roles.push('chairperson');
  else if (member.role == 'vicechairperson') roles.push('vicechairperson');
  else if (member.role == 'official') roles.push('official');
  else roles.push('member');

  return validateRoles(roles);
}