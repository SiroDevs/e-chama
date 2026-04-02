"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { HandCoins, LayoutDashboard, Users, User } from "lucide-react";
import { Settings2Icon, Headphones, ArrowRight } from "lucide-react";
import { CalendarsIcon } from "lucide-react";

import { AppIcon, GroupNav } from ".";
import { RootState } from "@/application/state/store";

interface SidebarProps {
  onClose?: () => void;
}

function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();
  const { member } = useSelector((state: RootState) => state.group);
  const isMember = member?.role === "member";

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname === path || pathname.startsWith(path + "/");
  };

  const handleNavClick = () => {
    if (onClose) onClose();
  };

  const navLinkClass = (path: string) =>
    `flex duration-200 px-6 py-2.5 items-center gap-3 rounded-lg mx-2 transition-all ${
      isActive(path)
        ? "text-primary bg-primary/10"
        : "hover:bg-gray-50 dark:hover:bg-gray-800"
    }`;

  return (
    <div className="w-60 shrink-0 md:block h-screen sticky top-0 overflow-hidden bg-white dark:bg-[#1d1d20] shadow-xs">
      <div className="w-full h-full border-r dark:border-gray-800">
        <div className="h-[var(--h-nav)] p-4 md:p-4 flex items-center justify-between">
          <div className="p-1">
            <AppIcon />
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              aria-label="Close sidebar"
            >
              <ArrowRight size={20} className="rotate-180" />
            </button>
          )}
        </div>

        <hr className="bg-gray-400 mx-2" />

        <div className="flex flex-col h-full justify-between">
          <div className="pt-6 text-gray-500 font-medium space-y-1 md:px-2 text-sm overflow-y-auto">
            <GroupNav />

            <Link
              href="/"
              onClick={handleNavClick}
              className={navLinkClass("/")}
            >
              <LayoutDashboard />
              <span>Dashboard</span>
            </Link>

            <Link
              href={isMember ? "/profile" : "/members"}
              onClick={handleNavClick}
              className={navLinkClass(isMember ? "/profile" : "/members")}
            >
              {isMember ? <User /> : <Users />}
              <span>{isMember ? "Profile" : "Members"}</span>
            </Link>

            <Link
              href="/contributions"
              onClick={handleNavClick}
              className={navLinkClass("/contributions")}
            >
              <HandCoins />
              <span>Contributions</span>
            </Link>

            <button
              disabled
              className="flex w-full hover:px-8 disabled:opacity-50 disabled:cursor-not-allowed duration-200 px-6 py-2.5 items-center gap-3 rounded-lg mx-2"
            >
              <HandCoins size={18} />
              <span>Loans</span>
              <span className="ml-auto text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                Soon
              </span>
            </button>

            <Link
              href="/meetings"
              onClick={handleNavClick}
              className={navLinkClass("/meetings")}
            >
              <CalendarsIcon />
              <span>Meetings</span>
            </Link>
          </div>

          <div>
            <div className="text-gray-500 text-sm font-medium space-y-1">
              <Link
                href="/settings"
                onClick={handleNavClick}
                className={navLinkClass("/settings")}
              >
                <Settings2Icon size={18} />
                <span>Settings</span>
              </Link>

              <Link
                href="/support"
                onClick={handleNavClick}
                className={navLinkClass("/support")}
              >
                <Headphones size={18} />
                <span>Support</span>
              </Link>
            </div>

            <div className="flex pb-8 justify-between px-4 md:px-6 items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 py-3 transition-all duration-200 mx-2 rounded-lg mb-4">
              <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex-shrink-0">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
