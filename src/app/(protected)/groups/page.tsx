"use client";

import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { EnterIcon } from "@radix-ui/react-icons";

import { PageContainer, PageContent } from "@/presentation/components/common";
import { JoinGroup } from "@/presentation/layout/join/JoinGroup";
import { PageButton } from "@/presentation/components/ui/actions";

const Page = () => {
  const router = useRouter();
  const handleCancel = () => router.push("/");

  return (
    <PageContainer
      pageTitle="Chamas"
      pageIcon={<EnterIcon className="mr-2 h-4 w-4" />}
    >
      <PageContent
        breadcrumbs={[{ title: "Join a Chama" }]}
        actions={
          <div className="flex flex-row items-center gap-3">
            <PageButton
              title="Cancel"
              onClick={handleCancel}
              icon={<XIcon />}
            />
          </div>
        }
      >
        <JoinGroup />
      </PageContent>
    </PageContainer>
  );
};

export default Page;
