"use client";

import { useEffect, useState } from "react";
import { Briefcase, Calendar, User, MapPin } from "lucide-react";
import { UserCheck, RefreshCcw } from "lucide-react";
import { useSelector } from "react-redux";

import { PageContent, PageContainer } from "@/presentation/components/common";
import { PageButton } from "@/presentation/components/ui/actions";
import { GroupMember } from "@/domain/entities";
import { setError } from "@/application/state/appSlice";
import { RootState } from "@/application/state/store";
import { memberService } from "@/infrastructure/services/memberService";
import { GenericAvatar } from "@/presentation/components/ui";
import { capitalize, handleError } from "@/application/helpers";
import { ProfileTab } from "../members/[id]";

const page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { member, group } = useSelector((state: RootState) => state.group);

  const [memberData, setMemberData] = useState<GroupMember | null>(null);

  const handleRefresh = () => {};

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const { data, error } = await memberService.getGroupMemberByNo(
          member?.member_no!,
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
        handleError(err, {
          tags: { component: "Contribution", action: "submit" },
          userMessage: "Failed to fetch member data",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (member?.member_no) {
      fetchMemberData();
    }
  }, [member?.member_no]);

  return (
    <PageContainer pageTitle="Member Profile" pageIcon={<User />}>
      <PageContent
        breadcrumbs={[
          { title: "Your Profile" },
        ]}
        actions={
          <div className="flex flex-row items-center gap-3">
            <PageButton
              title="Reload data"
              onClick={handleRefresh}
              icon={<RefreshCcw />}
            />
          </div>
        }
      >
        <div className="px-3 py-3 flex flex-col md:flex-row rounded-lg items-center justify-between border bg-white dark:bg-[#1d1d20] shadow-xs gap-4 md:gap-0">
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 w-full md:w-auto">
            <div className="ring-3 ring-blue dark:ring-[#2a2d3e] rounded-full overflow-hidden shrink-0">
              <GenericAvatar
                size={120}
                className="rounded-full w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
              />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100">
                {memberData?.full_name || "Unknown Member"}
              </h1>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3 md:gap-4 mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <Briefcase
                    size={12}
                    className="sm:w-3 sm:h-3 md:w-[14px] md:h-[14px]"
                  />{" "}
                  {capitalize(memberData?.role!) || "member"}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin
                    size={12}
                    className="sm:w-3 sm:h-3 md:w-[14px] md:h-[14px]"
                  />{" "}
                  {memberData?.address || "Nairobi"},{" "}
                  {memberData?.country || "Kenya"}
                </span>
              </div>

              <hr className="border-gray-100 dark:border-white/5 my-2 sm:my-2 md:my-3" />
              <div className="flex flex-wrap justify-center sm:justify-start gap-1">
                <span className="flex items-center gap-1">
                  <Calendar
                    size={12}
                    className="sm:w-3 sm:h-3 md:w-[14px] md:h-[14px]"
                  />{" "}
                  Joined A long time ago
                </span>
              </div>
            </div>
          </div>
          <div className="hidden md:flex flex items-center gap-2 bg-green-600 hover:bg-green-500 transition-colors text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shrink-0">
            <UserCheck size={14} className="sm:w-4 sm:h-4" /> Active
          </div>
        </div>

        <ProfileTab member={memberData!} />
      </PageContent>
    </PageContainer>
  );
};

export default page;
