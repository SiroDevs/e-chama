"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight, Plus } from "lucide-react";
import { Button } from "../ui";

export interface Breadcrumb {
  title: string;
  path?: string;
}

export interface PageContentProps {
  children?: React.ReactNode;
  breadcrumbs?: Breadcrumb[];
  actions?: React.ReactNode;
  showFab?: boolean;
  fabIcon?: React.ReactNode;
  fabOnClick?: () => void;
  fabHref?: string;
}

export function PageContent(props: PageContentProps) {
  const {
    children,
    breadcrumbs,
    actions = null,
    showFab = false,
    fabIcon = <Plus className="h-5 w-5" />,
    fabOnClick,
    fabHref,
  } = props;

  const FabButton = () => {
    const buttonClasses =
      "bg-[#eee] dark:bg-[#000] text-black dark:text-white border-black dark:border-white shadow-xs rounded-full w-14 h-14 p-0 flex items-center justify-center";

    if (fabHref) {
      return (
        <Link href={fabHref}>
          <Button variant="outline" className={buttonClasses}>
            {fabIcon}
          </Button>
        </Link>
      );
    }

    return (
      <Button variant="outline" onClick={fabOnClick} className={buttonClasses}>
        {fabIcon}
      </Button>
    );
  };

  if (!breadcrumbs || !actions) {
    return (
      <div className="relative">
        {children && <div className="pt-1 px-1">{children}</div>}
        {showFab && (
          <div className="fixed bottom-6 right-6 z-50">
            <FabButton />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="border-b border-gray-200 dark:border-gray-800 p-1 bg-white dark:bg-[#1d1d20] shadow-xs">
        <div className="flex justify-between items-center">
          {breadcrumbs.length > 0 && (
            <nav
              className="flex items-center text-sm overflow-x-auto whitespace-nowrap scrollbar-thin"
              aria-label="Breadcrumb"
            >
              <ol className="flex items-center space-x-1 min-w-max">
                <li className="flex items-center">
                  <Link href="/" className="hover:underline transition-colors">
                    Dashboard
                  </Link>
                </li>

                {breadcrumbs.map((breadcrumb, index) => {
                  const isLast = index === breadcrumbs.length - 1;

                  return (
                    <li key={index} className="flex items-center">
                      <ChevronRight className="h-4 w-4 mx-1 text-gray-400 flex-shrink-0" />

                      {!isLast && breadcrumb.path ? (
                        <Link
                          href={breadcrumb.path}
                          className="hover:underline transition-colors"
                        >
                          {breadcrumb.title}
                        </Link>
                      ) : (
                        <span className="text-gray-900 dark:text-white font-semibold">
                          {breadcrumb.title}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
          )}

          {actions && (
            <div className="flex flex-row gap-1 ml-auto flex-shrink-0 hidden md:block">
              {actions}
            </div>
          )}
        </div>
      </div>

      {children && <div className="pt-2">{children}</div>}

      {showFab && (
        <div className="fixed bottom-10 right-6 z-50 block md:hidden">
          <FabButton />
        </div>
      )}
    </div>
  );
}
