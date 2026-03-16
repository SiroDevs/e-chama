"use client";

import { GroupExt } from "@/domain/entities";
import { Users, MapPin, Loader2, Users2 } from "lucide-react";

interface GroupItemProps {
  group: GroupExt;
  isJoining: boolean;
  onJoinGroup: () => void;
}

const getMemberText = (count: number) =>
  count === 1 ? `${count} member` : `${count} members`;

export const GroupItem = ({
  group,
  isJoining,
  onJoinGroup,
}: GroupItemProps) => {
  return (
    <div className="w-full p-4 mb-4 rounded-lg border border-gray-200 shadow-sm bg-white">
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-sm flex-shrink-0">
          {group.initials ? (
            <span>{group.initials}</span>
          ) : (
            <Users2 size={22} />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="font-semibold text-gray-900 text-sm">
              {group.title}
            </span>
            {group.initials && (
              <span className="text-xs text-gray-400">({group.initials})</span>
            )}
          </div>

          {/* Chips */}
          <div className="flex flex-wrap gap-1.5">
            {group.location && (
              <span className="inline-flex items-center gap-1 border border-gray-300 text-gray-600 text-xs rounded-full px-2.5 py-0.5">
                <MapPin size={12} />
                {group.location}
              </span>
            )}
            <span className="inline-flex items-center gap-1 border border-gray-300 text-gray-600 text-xs rounded-full px-2.5 py-0.5">
              <Users size={12} />
              {getMemberText(group.member_count)}
            </span>
          </div>
        </div>

        <button
          onClick={onJoinGroup}
          disabled={isJoining}
          className="min-w-[80px] px-4 py-2 text-sm font-medium text-white bg-blue-600
            hover:bg-blue-700 active:bg-blue-800 rounded-md transition-colors
            disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isJoining ? <Loader2 size={18} className="animate-spin" /> : "Join"}
        </button>
      </div>

      {/* Description */}
      {group.description && (
        <p className="mt-3 text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2 leading-relaxed">
          {group.description}
        </p>
      )}
    </div>
  );
};
