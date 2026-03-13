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

  return (
    <div className="space-y-1">
      <div className="border-b border-gray-200 dark:border-gray-800 p-2  bg-white dark:bg-[#1d1d20] shadow-xs">
        <div className="flex justify-between items-center px-2">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="flex items-center text-sm" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-1">
                <li className="flex items-center">
                  {breadcrumbs.length > 0 ? (
                    <Link
                      href="/"
                      className="hover:underline transition-colors"
                    >
                      Dashboard
                    </Link>
                  ) : (
                    <span className="text-gray-600 dark:text-gray-400">
                      Dashboard
                    </span>
                  )}
                </li>

                {breadcrumbs.map((breadcrumb, index) => {
                  const isLast = index === breadcrumbs.length - 1;

                  return (
                    <li key={index} className="flex items-center">
                      <ChevronRight fontSize="small" className="mx-1" />

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

      {children && <div className="pt-2 px-2">{children}</div>}
    </div>
  );
}
