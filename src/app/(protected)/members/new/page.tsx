"use client";

import { Users } from "lucide-react";
import { useSelector } from "react-redux";
import { XIcon, SaveIcon } from "lucide-react";

import { PageContainer } from "@/presentation/components/common/page-container";
import PageContent from "@/presentation/components/common/page-content";
import { PageAction, PageButton } from "@/presentation/components/ui/actions";
import { useRouter } from "next/navigation";
import { RootState } from "@/application/state/store";

const page = () => {
  const router = useRouter();
  const { group } = useSelector((state: RootState) => state.group);
  const handleSaveMember = () => {};

  const handleCancel = () => {
    router.push("/members");
  };

  return (
    <main className="flex flex-col min-h-dvh">
      <PageContainer pageTitle="Register a New Member" pageIcon={<Users />}>
        <PageContent
          breadcrumbs={[{ title: "Members" }, { title: "New Member" }]}
          actions={
            <div className="flex flex-row items-center gap-3">
              <PageButton
                title="Cancel"
                onClick={handleCancel}
                icon={<XIcon />}
              />
              <PageAction
                title="Save Member"
                onClick={handleSaveMember}
                icon={<SaveIcon />}
              />
            </div>
          }
        ></PageContent>
      </PageContainer>
    </main>
  );
};

export default page;
