import { Dispatch } from "@reduxjs/toolkit";

import { Group, GroupExt, UserGroup } from "@/domain/entities";
import { fetchGroupMember, newGroupMember } from "@/app/actions/user-actions";
import { setLoading, setError, setMember, setGroup, setGroups } from "@/application/state/groupSlice";
import { newGroup } from "@/app/actions/group-actions";
import { groupService } from "@/infrastructure/services/groupService";

export const switchGroupAction = (userid: string, group: UserGroup) => {
  return async (dispatch: Dispatch) => {
    try {
      const member = await fetchGroupMember(userid, group.group_id);

      if (member) {
        dispatch(setMember(member));
        dispatch(setGroup(group));
      } else {
        dispatch(
          setError("Failed to set user group")
        );
      }
    } catch (error: unknown) {
      dispatch(
        setError(error instanceof Error ? error.message : "Failed to set user group")
      );
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export async function newGroupAction(
  group: Group,
  user_id: string,
) {
  return async (dispatch: Dispatch) => {
    try {
      const { data, error } = await newGroup(group);
      if (!data) {
        throw new Error("failed to create user group");
      }
      dispatch(setGroup(data));
      const member = await newGroupMember({
        group_id: data.id,
        user_id: user_id,
        member_no: "001",
        role: "official",
      });

      if (!member) {
        throw new Error("Member creation failed");
      }
      dispatch(setMember(member));
    } catch (error: unknown) {
      dispatch(
        setError(error instanceof Error ? error.message : "Failed to set user group")
      );
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export async function searchGroupAction(joinCode: string) {
  try {
    if (!joinCode.trim()) {
      throw new Error("Please enter a Chama code");
    }

    const groupResult = await groupService.searchByCode(joinCode);
    if (groupResult) {
      return groupResult;
    } else {
      throw new Error("No Chama found with this code");
    }
  } catch (err) {
    console.error("Search group error:", err);
    throw new Error("Failed to search for that Chama. Please try again.");
  }
}

export async function joinGroupAction(userId: string, group: GroupExt) {
  return async (dispatch: Dispatch) => {
    try {
      const member = await newGroupMember({
        group_id: group.id,
        user_id: userId,
        member_no: "000",
        role: "member",
      });

      if (!member) {
        throw new Error("Member creation failed");
      }
      const userGroup = await groupService.getUserGroup(group.id, userId);
      const userGroups = await groupService.getUserGroups(userId);
      dispatch(setGroup(userGroup));
      dispatch(setGroups(userGroups));
    } catch (err) {
      console.error("Join group error:", err);
      throw new Error("Failed to join Chama. Please try again.");
    }
  };
}

export async function fetchGroups(userId: string) {
  let groups: UserGroup[] = [];
  try {
    groups = await groupService.getUserGroups(userId);
  } catch (groupError) {
    console.warn("No groups found for this user:", groupError);
  }
  return groups;
}
