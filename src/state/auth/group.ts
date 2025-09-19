import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";
import { useAuthStore } from "./auth";
import { UserRole } from "../role/profiles";
import { UserGroup } from "../../types/types";
import { extractRolesFromGroup, validateRoles, getDefaultRole } from "@/types/roles";
import { getUserGroup } from "@/services/GroupService";

interface GroupState {
  userGroups: UserGroup[];
  selectedGroup: string | null;
  currentRole: UserRole;
  availableRoles: UserRole[];
}

interface GroupActions {
  setUserGroups: (groups: UserGroup[], selectedGroupId?: string | null) => void;
  setSelectedGroup: (groupId: string | null) => void;
  setCurrentRole: (role: UserRole) => void;
  setAvailableRoles: (roles: UserRole[]) => void;
  updateRolesFromGroup: (groupId: string) => void;
  clearGroupData: () => void;
}

export const useGroupStore = create<GroupState & GroupActions>()(
  persist(
    (set, get) => ({
      userGroups: [],
      selectedGroup: null,
      currentRole: 'member',
      availableRoles: ['member'],


      setUserGroups: async (groups: UserGroup[], groupId?: string | null) => {
        const authState = useAuthStore.getState();
        let availableRoles: UserRole[] = [];
        if (!groupId) {
          groupId = groups[0].group_id;
        }
        const selectedGroup = await getUserGroup(authState.userId!, groupId!);
        const groupRoles = extractRolesFromGroup(selectedGroup);
        availableRoles = [...availableRoles, ...groupRoles];

        availableRoles.push('member');
        const validRoles = validateRoles(availableRoles);
        set({
          userGroups: groups,
          selectedGroup: groupId,
          availableRoles: validRoles,
          currentRole: groupRoles[0],
        });
      },

      setSelectedGroup: async (groupId: string | null) => {
        const authState = useAuthStore.getState();
        let newUserRoles: UserRole[] = [];

        const selectedGroup = await getUserGroup(authState.userId!, groupId!);
        const groupRoles = extractRolesFromGroup(selectedGroup);
        newUserRoles = [...newUserRoles, ...groupRoles];
        newUserRoles.push('member');
        const validRoles = validateRoles(newUserRoles);
        set({
          selectedGroup: groupId,
          availableRoles: validRoles,
          currentRole: groupRoles[0],
        });
      },

      setCurrentRole: async (role: UserRole) => {
        set({ currentRole: role });
      },

      setAvailableRoles: async (roles: UserRole[]) => {
        const validRoles = validateRoles(roles);
        const state = get();

        set({
          availableRoles: validRoles,
          currentRole: validRoles.includes(state.currentRole)
            ? state.currentRole
            : getDefaultRole(validRoles)
        });
      },

      updateRolesFromGroup: async (groupId: string) => {
        const authState = useAuthStore.getState();
        const state = get();
        const group = state.userGroups.find(g => g.group_id === groupId);

        if (!group) return;

        let newAvailableRoles: UserRole[] = ['member'];
        if (authState.profile?.is_admin) {
          newAvailableRoles.push('admin');
        }

        const groupRoles = extractRolesFromGroup(group);
        newAvailableRoles = [...newAvailableRoles, ...groupRoles];

        const validRoles = validateRoles(newAvailableRoles);

        set({
          availableRoles: validRoles,
          currentRole: validRoles.includes(state.currentRole)
            ? state.currentRole
            : getDefaultRole(validRoles)
        });
      },

      clearGroupData: () => {
        set({
          userGroups: [],
          selectedGroup: null,
          currentRole: 'member',
          availableRoles: ['member']
        });
      },
    }),
    {
      name: "echama:group",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);