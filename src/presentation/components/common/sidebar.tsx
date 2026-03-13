"use client";

import React from "react";
import Image from "next/image";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { HandCoins, LayoutDashboard, Users } from "lucide-react";
import { ArrowRight2, Headphone, Setting2, Star } from "iconsax-react";

import { AppIcon, GroupNav } from ".";
import ProfileImage from "../../../../public/profile.png";

interface SidebarProps {
  onClose?: () => void;
}

function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const handleNavClick = () => {
    if (onClose) {
      onClose();
    }
  };

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
              <ArrowRight2 size={20} className="rotate-180" />
            </button>
          )}
        </div>

        <hr className="bg-gray-400 mx-2" />

        <div className="flex flex-col h-full justify-between">
          <div className="pt-6 text-gray-500 font-medium space-y-1 md:px-2 text-sm overflow-y-auto">
            <GroupNav/>

            <Link
              href={"/"}
              onClick={handleNavClick}
              className={`flex ${isActive("/") ? "text-primary bg-primary/10" : "hover:bg-gray-50 dark:hover:bg-gray-800"} 
                                duration-200 px-6 py-2.5 items-center gap-3 rounded-lg mx-2 transition-all`}
            >
              <LayoutDashboard />
              <span>Dashboard</span>
            </Link>

            <Link
              href={"/members"}
              onClick={handleNavClick}
              className={`flex ${isActive("/app/teams") ? "text-primary bg-primary/10" : "hover:bg-gray-50 dark:hover:bg-gray-800"} 
                                duration-200 px-6 py-2.5 items-center gap-3 rounded-lg mx-2 transition-all`}
            >
              <Users />
              <span>Members</span>
            </Link>

            <Link
              href={"/contributions"}
              onClick={handleNavClick}
              className={`flex ${isActive("/app/integrations") ? "text-primary bg-primary/10" : "hover:bg-gray-50 dark:hover:bg-gray-800"} 
                                duration-200 px-6 py-2.5 items-center gap-3 rounded-lg mx-2 transition-all`}
            >
              <HandCoins />
              <span>Contributions</span>
            </Link>

            <button
              disabled
              className={`flex w-full ${isActive("/app/benefits") ? "text-primary bg-primary/10" : ""} 
                                hover:px-8 disabled:opacity-50 disabled:cursor-not-allowed duration-200 px-6 py-2.5 items-center gap-3 rounded-lg mx-2`}
            >
              <Star size={18} />
              <span>Loans</span>
              <span className="ml-auto text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                Soon
              </span>
            </button>
          </div>

          <div>
            <div className="text-gray-500 text-sm font-medium space-y-1">
              <Link
                href={"/settings"}
                onClick={handleNavClick}
                className={`flex ${isActive("/app/settings") ? "text-primary bg-primary/10" : "hover:bg-gray-50 dark:hover:bg-gray-800"} 
                                    duration-200 px-6 py-2.5 items-center gap-3 rounded-lg mx-2 transition-all`}
              >
                <Setting2 size={18} />
                <span>Settings</span>
              </Link>

              <Link
                href={"/support"}
                onClick={handleNavClick}
                className={`flex ${isActive("/app/support") ? "text-primary bg-primary/10" : "hover:bg-gray-50 dark:hover:bg-gray-800"} 
                                    duration-200 px-6 py-2.5 items-center gap-3 rounded-lg mx-2 transition-all`}
              >
                <Headphone size={18} />
                <span>Support</span>
              </Link>
            </div>

            <hr className="bg-gray-200 dark:bg-gray-800 mx-2 my-4" />

            <div className="flex pb-8 justify-between px-4 md:px-6 items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 py-3 transition-all duration-200 mx-2 rounded-lg mb-4">
              <div className="flex items-center gap-3 min-w-0">
                <Image
                  src={ProfileImage}
                  alt="User"
                  width={40}
                  height={40}
                  className="rounded-full flex-shrink-0"
                />
                <div className="truncate">
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
                    Steve Jobs
                  </p>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 truncate">
                    steve@apple.com
                  </p>
                </div>
              </div>

              <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex-shrink-0">
                <ArrowRight2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
