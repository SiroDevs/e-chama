"use client";

import React, { useState } from "react";
import { Briefcase, MapPin, Calendar, UserCheck } from "lucide-react";
import { User, Users, LayoutGrid, Link } from "lucide-react";

import { GenericAvatar } from "@/presentation/components/ui";
import ProfileTab from "./profile-tab";

type Tab = "Profile" | "Teams" | "Projects" | "Connections";

const TAB_ICONS: Record<Tab, React.ReactNode> = {
  Profile: <User size={15} />,
  Teams: <Users size={15} />,
  Projects: <LayoutGrid size={15} />,
  Connections: <Link size={15} />,
};

function TabButton({
  tab,
  active,
  onClick,
}: {
  tab: Tab;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-xl border-b-2 ${
        active
          ? "border-blue-500 text-white bg-blue-500 dark:bg-blue-600"
          : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5"
      }`}
    >
      {TAB_ICONS[tab]}
      {tab}
    </button>
  );
}

const TABS: Tab[] = ["Profile", "Teams", "Projects", "Connections"];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>("Profile");

  return (
    <div className="text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <div className="px-3 py-3 flex rounded-lg items-center justify-between border bg-white dark:bg-[#1d1d20] shadow-xs">
        <div className="flex items-center gap-3">
          <div className="ring-3 ring-blue dark:ring-[#2a2d3e] rounded-lg overflow-hidden shrink-0">
            <GenericAvatar size={100} className="rounded-lg" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              John Doe
            </h1>
            <div className="flex flex-wrap gap-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <Briefcase size={14} /> UX Designer
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={14} /> Vatican City
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={14} /> Joined April 2021
              </span>
            </div>

            <hr className="border-gray-100 dark:border-white/5 py-1" />
            <div className="flex gap-1">
              {TABS.map((tab) => (
                <TabButton
                  key={tab}
                  tab={tab}
                  active={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                />
              ))}
            </div>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 transition-colors text-white text-sm font-semibold px-4 py-2 rounded-lg">
          <UserCheck size={16} /> Connected
        </button>
      </div>

      <ProfileTab />
    </div>
  );
}
