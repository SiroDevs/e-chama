"use client";

import { User, Shield, Settings2Icon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/presentation/components/ui/tabs";
import { PageContent, PageContainer } from "@/presentation/components/common";
import { ProfileTab, SecurityTab } from ".";

const TABS = [
  { value: "profile", label: "Profile", icon: User, content: <ProfileTab /> },
  { value: "security", label: "Security", icon: Shield, content: <SecurityTab /> },
] as const;

export default function SettingsPage() {
  return (
    <PageContainer pageTitle="Settings" pageIcon={<Settings2Icon />}>
      <PageContent breadcrumbs={[{ title: "Settings" }]}>
        <Tabs defaultValue="profile" className="w-full">

          <TabsList className="w-full justify-start gap-0 h-auto p-0 bg-transparent rounded-none border-b border-gray-200 dark:border-gray-800">
            {TABS.map(({ value, label, icon: Icon }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="
                  relative flex items-center gap-2 px-4 py-3 text-sm rounded-none bg-transparent shadow-none
                  text-gray-400 dark:text-gray-500
                  hover:text-gray-600 dark:hover:text-gray-300
                  data-[state=active]:text-indigo-500 dark:data-[state=active]:text-indigo-400
                  data-[state=active]:bg-transparent
                  transition-colors

                  after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:rounded-full
                  after:bg-indigo-500 dark:after:bg-indigo-400
                  after:scale-x-0 data-[state=active]:after:scale-x-100
                  after:transition-transform after:duration-200 after:origin-center
                "
              >
                <Icon className="w-4 h-4" strokeWidth={1.75} />
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          {TABS.map(({ value, content }) => (
            <TabsContent
              key={value}
              value={value}
              className="mt-6 focus-visible:outline-none"
            >
              {content}
            </TabsContent>
          ))}

        </Tabs>
      </PageContent>
    </PageContainer>
  );
}