import React from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { Button } from "../ui";
import { Menu } from "lucide-react";

import UserNav from "./usernav";
import ThemeSwitcher from "../ui/theme-switcher";
import PageNavbar, {
  PageNavbarLeftContent,
  PageNavbarRightContent,
} from "./page-navbar";
import ProfileImage from "../../../../public/profile.png";
import { setIsSidebarOpen } from "@/application/state/navSlice";

interface PageContainerProps {
  children: React.ReactNode;
  pageTitle?: string;
  pageIcon?: React.ReactNode;
}

export function PageContainer({
  children,
  pageTitle = "Dashboard",
  pageIcon,
}: PageContainerProps) {
  const dispatch = useDispatch();

  const handleSidebarOpen = () => {
    dispatch(setIsSidebarOpen(true));
  };

  return (
    <div>
      <PageNavbar>
        <PageNavbarLeftContent>
          <Button
            variant="outline"
            size="icon"
            onClick={handleSidebarOpen}
            className="all-center h-8 w-8 md:hidden"
            aria-label="Open sidebar"
          >
            <Menu />
          </Button>

          {pageIcon ? (
            pageIcon
          ) : (
            <Image
              src={ProfileImage}
              alt="User"
              width={40}
              height={40}
              className="rounded-full"
            />
          )}

          <h1
            className="text-xl sm:text-3xl font-semibold text-gray-900 dark:text-white truncate flex-1 min-w-0 mr-2"
            title={pageTitle}
          >
            {pageTitle}
          </h1>
        </PageNavbarLeftContent>

        <PageNavbarRightContent>
          <UserNav />
          <ThemeSwitcher />
        </PageNavbarRightContent>
      </PageNavbar>
      <main className="p-4 w-full md:p-2 space-y-4 h-[calc(99vh-var(--h-nav))] overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
