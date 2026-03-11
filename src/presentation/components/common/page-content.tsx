"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";

export interface Breadcrumb {
  title: string;
  path?: string;
}

export interface PageContentProps {
  children?: React.ReactNode;
  breadcrumbs?: Breadcrumb[];
  actions?: React.ReactNode;
  tagline?: string;
}

export default function PageContent(props: PageContentProps) {
  const { children, breadcrumbs, actions = null, tagline } = props;

  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  const showBackButton = breadcrumbs && breadcrumbs.length > 0;

  return (
    <div className="space-y-4">
      <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
        <div className="flex justify-between">
          <div className="flex items-start gap-2 w-full">
            {showBackButton && (
              <button
                onClick={handleBack}
                className="flex-shrink-0 mr-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft
                  className="text-gray-600 dark:text-gray-400"
                  fontSize="small"
                />
              </button>
            )}

            {tagline && (
              <h3 className="font-semibold">{tagline}</h3>
            )}

            {actions && (
              <div className="flex flex-row gap-1 ml-auto flex-shrink-0">
                {actions}
              </div>
            )}
          </div>
        </div>

        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav
            className="flex items-center text-sm mt-3"
            aria-label="Breadcrumb"
          >
            <ol className="flex items-center space-x-1">
              <li className="flex items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Dashboard
                </span>
              </li>

              {breadcrumbs.map((breadcrumb, index) => (
                <li key={index} className="flex items-center">
                  <ChevronRight
                    fontSize="small"
                    className="text-gray-400 dark:text-gray-600 mx-1"
                  />
                  {breadcrumb.path ? (
                    <Link
                      href={breadcrumb.path}
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:underline transition-colors"
                    >
                      {breadcrumb.title}
                    </Link>
                  ) : (
                    <span className="text-gray-900 dark:text-white font-semibold">
                      {breadcrumb.title}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
      </div>

      {children && <div className="pt-2">{children}</div>}
    </div>
  );
}
