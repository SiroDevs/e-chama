"use client";

import { EnterIcon } from "@radix-ui/react-icons";

import { PageContainer, PageContent } from "@/presentation/components/common";
import { JoinGroup } from "@/presentation/layout/join/JoinGroup";

const Page = () => {
  return (
    <PageContainer pageTitle="Groups" pageIcon={<EnterIcon className="mr-2 h-4 w-4" />}>
      <PageContent breadcrumbs={[{ title: "Groups" }]}>
        <JoinGroup />
      </PageContent>
    </PageContainer>
  );
};

export default Page;
