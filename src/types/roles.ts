import { UserRole, isUserRole } from "@/state/role/profiles";

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

// Extract roles from a group object
export function extractRolesFromGroup(group: any): UserRole[] {
  const roles: string[] = [];
  
  // Adjust these property names based on your actual UserGroup structure
  if (group.is_treasurer || group.isTreasurer) roles.push('treasurer');
  if (group.is_accountant || group.isAccountant) roles.push('accountant');
  if (group.is_secretary || group.isSecretary) roles.push('secretary');
  if (group.is_chairperson || group.isChairperson) roles.push('chairperson');
  if (group.is_vice_chairperson || group.isViceChairperson) roles.push('vicechairperson');
  if (group.is_official || group.isOfficial) roles.push('official');
  
  return validateRoles(roles);
}