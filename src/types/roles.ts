import { Member, UserRole, isUserRole } from "@/state/role/profiles";

export function validateRoles(roles: string[]): UserRole[] {
  return roles.filter(isUserRole);
}

export function getDefaultRole(roles: string[]): UserRole {
  const validRoles = validateRoles(roles);
  return validRoles.includes('member') ? 'member' : validRoles[0] || 'member';
}

export function hasRole(userRoles: string[], targetRole: UserRole): boolean {
  return validateRoles(userRoles).includes(targetRole);
}

export function setUserRole(member: Member): UserRole[] {
  const roles: string[] = [];
  const role = member.role || 'member';

  if (role === 'treasurer') roles.push('treasurer');
  else if (role === 'accountant') roles.push('accountant');
  else if (role === 'secretary') roles.push('secretary');
  else if (role === 'chairperson') roles.push('chairperson');
  else if (role === 'vicechairperson') roles.push('vicechairperson');
  else if (role === 'official') roles.push('official');
  else roles.push('member');

  return validateRoles(roles);
}
