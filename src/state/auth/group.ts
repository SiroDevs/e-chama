import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";
import { useAuthStore } from "./auth";
import { UserRole } from "../role/profiles";
import { UserGroup } from "./types";
import { extractRolesFromGroup, validateRoles, getDefaultRole } from "@/types/roles";

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

      setUserGroups: async (groups: UserGroup[], selectedGroupId?: string | null) => {
        const authState = useAuthStore.getState();
        let newSelectedGroup = selectedGroupId;
        
        if (!newSelectedGroup && groups.length > 0) {
          newSelectedGroup = groups[0].group_id;
        }
        
        // Update roles based on the new groups
        let newAvailableRoles: UserRole[] = ['member'];
        if (authState.profile?.is_admin) {
          newAvailableRoles.push('admin');
        }
        
        // If we have a selected group, update roles from that group
        if (newSelectedGroup) {
          const selectedGroup = groups.find(g => g.group_id === newSelectedGroup);
          if (selectedGroup) {
            const groupRoles = extractRolesFromGroup(selectedGroup);
            newAvailableRoles = [...newAvailableRoles, ...groupRoles];
          }
        }
        
        const validRoles = validateRoles(newAvailableRoles);
        const state = get();
        
        set({ 
          userGroups: groups,
          selectedGroup: newSelectedGroup,
          availableRoles: validRoles,
          // Reset to member role if current role is not available
          currentRole: validRoles.includes(state.currentRole) 
            ? state.currentRole 
            : getDefaultRole(validRoles)
        });
      },

      setSelectedGroup: async (groupId: string | null) => {
        const authState = useAuthStore.getState();
        const state = get();
        
        if (groupId === state.selectedGroup) return;
        
        let newAvailableRoles: UserRole[] = ['member'];
        if (authState.profile?.is_admin) {
          newAvailableRoles.push('admin');
        }
        
        // Update roles based on the new selected group
        if (groupId) {
          const selectedGroup = state.userGroups.find(g => g.group_id === groupId);
          if (selectedGroup) {
            const groupRoles = extractRolesFromGroup(selectedGroup);
            newAvailableRoles = [...newAvailableRoles, ...groupRoles];
          }
        }
        
        const validRoles = validateRoles(newAvailableRoles);
        
        set({ 
          selectedGroup: groupId,
          availableRoles: validRoles,
          // Reset to member role if current role is not available
          currentRole: validRoles.includes(state.currentRole) 
            ? state.currentRole 
            : getDefaultRole(validRoles)
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