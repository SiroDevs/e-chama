"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { RefreshCcw, PlusIcon } from "lucide-react";

import { PageContainer } from "@/presentation/components/common/page-container";
import PageContent from "@/presentation/components/common/page-content";
import { PageAction, PageButton } from "@/presentation/components/ui/actions";
import { GroupMember } from "@/domain/entities";
import { setError } from "@/application/state/authSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/application/state/store";
import { memberService } from "@/infrastructure/services/memberService";

const page = () => {
  const router = useRouter();
  const params = useParams();
  const memberNo = params.id as string;
  const [isLoading, setIsLoading] = useState(false);
  const { group } = useSelector((state: RootState) => state.group);

  const [memberData, setMemberData] = useState<GroupMember | null>(null);

  const handleEditMember = () => {
    router.push(`/members/${memberNo}/edit`);
  };

  const handleRefresh = () => {};

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const { data, error } = await memberService.getGroupMemberByNo(
          memberNo,
          group!.group_id!,
        );

        if (error) {
          setError(error.message);
        } else if (data) {
          setMemberData(data);
        } else {
          setError("Member not found");
        }
      } catch (err) {
        setError("Failed to fetch member data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (memberNo) {
      fetchMemberData();
    }
  }, [memberNo]);

  const pageTitle = isLoading
    ? "Fetching details"
    : memberData?.full_name || "Unknown Member";

  return (
    <main className="flex flex-col min-h-dvh">
      <PageContainer pageTitle={pageTitle} pageIcon={<Users />}>
        <PageContent
          breadcrumbs={[{ title: "Members" }, { title: `Member ${memberNo}` }]}
          actions={
            <div className="flex flex-row items-center gap-3">
              <PageButton
                title="Reload data"
                onClick={handleRefresh}
                icon={<RefreshCcw />}
              />
              <PageAction
                title="Edit Member"
                onClick={handleEditMember}
                icon={<PlusIcon />}
              />
            </div>
          }
        ></PageContent>
      </PageContainer>
    </main>
  );
};

export default page;
