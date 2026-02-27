import { Member, Profile, Group, UserGroup, Contribution, Permission } from ".";

export type EntityType = 'members' | 'profiles' | 'groups' | 'permissions';
export const entityTypes: EntityType[] = ["members", "profiles", "groups", "permissions"];

export type AnyEntity = Member | Profile | Group | Permission | Contribution | UserGroup;
