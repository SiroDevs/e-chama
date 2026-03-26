"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface Breadcrumb {
  title: string;
  path?: string;
}

export interface PageContentProps {
  children?: React.ReactNode;
  breadcrumbs?: Breadcrumb[];
  actions?: React.ReactNode;
}

export default function PageContent(props: PageContentProps) {
  const { children, breadcrumbs, actions = null } = props;

  if (!breadcrumbs || !actions) {
    return (
      <div className="">
        {children && <div className="pt-1 px-1">{children}</div>}
      </div>
    );
  }

  return (
    <div className="">
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

      {children && <div className="pt-1">{children}</div>}
    </div>
  );
}
