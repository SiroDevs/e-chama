"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Loader2, Search, X } from "lucide-react";

import { GroupMember } from "@/domain/entities";
import { memberService } from "@/infrastructure/services/memberService";

export function MemberSearchField({
  groupId,
  member,
  onChange,
  error,
}: {
  groupId: string;
  member?: GroupMember | null;
  onChange: (member: GroupMember | null) => void;
  error?: string;
}) {
  const [query, setQuery] = useState(member?.full_name || "");
  const [results, setResults] = useState<GroupMember[]>([]);
  const [selected, setSelected] = useState<GroupMember | null>(member || null);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const search = useCallback(
    async (q: string) => {
      if (q.trim().length < 2) {
        setResults([]);
        setShowDropdown(false);
        return;
      }
      setIsSearching(true);
      try {
        const { data } = await memberService.searchGroupMembers(groupId, q);
        setResults(data || []);
        setShowDropdown(true);
      } finally {
        setIsSearching(false);
      }
    },
    [groupId],
  );

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setSelected(null);
    onChange(null);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => search(val), 300);
  };

  const handleSelect = (member: GroupMember) => {
    setSelected(member);
    setQuery(member.full_name || member.member_no || "");
    setShowDropdown(false);
    setResults([]);
    onChange(member);
  };

  const handleClear = () => {
    setSelected(null);
    setQuery("");
    setResults([]);
    setShowDropdown(false);
    onChange(null);
  };

  const inputClass = `w-full pl-8 pr-8 py-2 text-sm rounded-lg border ${
    error ? "border-red-500" : "border-gray-200 dark:border-gray-700"
  } bg-white dark:bg-[#2a2d3e] text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500`;

  return (
    <div className="space-y-1">
      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">
        Member <span className="text-red-500">*</span>
      </label>
      <div className="relative" ref={dropdownRef}>
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          onFocus={() => results.length > 0 && setShowDropdown(true)}
          placeholder="Search by name or member no..."
          className={inputClass}
        />
        {isSearching && (
          <Loader2
            size={14}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 animate-spin"
          />
        )}
        {selected && !isSearching && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={14} />
          </button>
        )}

        {showDropdown && results.length > 0 && (
          <ul className="absolute z-50 mt-1 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2a2d3e] shadow-lg max-h-48 overflow-y-auto">
            {results.map((m) => (
              <li
                key={m.member_id}
                onMouseDown={() => handleSelect(m)}
                className="flex items-center justify-between px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 text-gray-800 dark:text-gray-200"
              >
                <span>{m.full_name || "Unknown"}</span>
                <span className="text-xs text-gray-400">M: {m.member_no}</span>
              </li>
            ))}
          </ul>
        )}

        {showDropdown &&
          !isSearching &&
          results.length === 0 &&
          query.length >= 2 && (
            <div className="absolute z-50 mt-1 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2a2d3e] shadow-lg px-3 py-2 text-sm text-gray-400">
              No members found
            </div>
          )}
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
