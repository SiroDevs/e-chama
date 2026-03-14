"use client";

import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/infrastucture/state/auth/auth";
import { useGroupStore } from "@/infrastucture/state/auth/group";
import { joinGroupAction, searchGroupAction } from "@/application/use-cases/user/group";
import { GroupExt } from "@/domain/entities";
import { GroupItem } from "./GroupItem";

export function SearchGroup() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { setUserGroups } = useGroupStore();
  const [joinCode, setJoinCode] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [foundGroup, setFoundGroup] = useState<GroupExt | null>(null);
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState("");

  const handleJoinCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJoinCode(e.target.value.toUpperCase());
    if (foundGroup) setFoundGroup(null);
    if (error) setError("");
  };

  const handleSearchGroup = async () => {
    setIsSearching(true);
    setError("");

    try {
      const result = await searchGroupAction(joinCode);
      if (result.success && result.group) {
        setFoundGroup(result.group);
      } else {
        setError(result.error || "No group found");
        setFoundGroup(null);
      }
    } catch (err) {
      setError("Failed to search for group. Please try again.");
      console.error("Search error:", err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearchGroup();
  };

  const handleJoinGroup = async () => {
    if (!foundGroup) return;

    setIsJoining(true);
    setError("");

    try {
      const result = await joinGroupAction(user!.id, foundGroup);
      if (result.success) {
        await setUserGroups(result.groups!, foundGroup.id || null);
        router.push("/");
      } else {
        setError(result.error?.toString() || "Failed to join group. Please try again.");
      }
    } catch (err) {
      setError("Failed to join group. Please try again.");
      console.error("Join error:", err);
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-base font-semibold text-left mb-3">
        Join a Chama with a code
      </h2>

      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Enter chama code"
          value={joinCode}
          autoComplete="off"
          onChange={handleJoinCodeChange}
          onKeyPress={handleKeyPress}
          disabled={isSearching || isJoining}
          className="w-full border border-gray-300 rounded-md py-2.5 pl-4 pr-12 text-sm
            placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500
            focus:border-transparent disabled:bg-gray-50 disabled:text-gray-400
            disabled:cursor-not-allowed transition"
        />
        <button
          onClick={handleSearchGroup}
          disabled={isSearching || !joinCode.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md
            text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors
            disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent
            disabled:hover:text-gray-500"
        >
          {isSearching ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Search size={18} />
          )}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-300 text-red-800 rounded-md px-4 py-3 text-sm mb-4">
          {error}
        </div>
      )}

      {foundGroup && (
        <GroupItem
          group={foundGroup}
          isJoining={isJoining}
          onJoinGroup={handleJoinGroup}
        />
      )}
    </div>
  );
}