"use client";

import { useEffect, useState } from "react";
import { Briefcase, Calendar, User, MapPin } from "lucide-react";
import { UserCheck, HandCoins, RefreshCcw, Edit2Icon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import { PageContainer } from "@/presentation/components/common/page-container";
import PageContent from "@/presentation/components/common/page-content";
import { PageAction, PageButton } from "@/presentation/components/ui/actions";
import { GroupMember } from "@/domain/entities";
import { setError } from "@/application/state/appSlice";
import { RootState } from "@/application/state/store";
import { memberService } from "@/infrastructure/services/memberService";
import { GenericAvatar } from "@/presentation/components/ui";
import ProfileTab from "./profile-tab";
import ContributionsTab from "./contributions-tab";
import { capitalize } from "@/application/helpers/utils";
import { handleError } from "@/application/helpers/error-utils";

type Tab = "Profile" | "Contributions";

const TAB_ICONS: Record<Tab, React.ReactNode> = {
  Profile: <User size={15} />,
  Contributions: <HandCoins size={15} />,
};

function TabButton({tab, active, onClick}: {
  tab: Tab;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-xl border-b-2 ${
        active
          ? "border-blue-500 text-white bg-blue-500 dark:bg-blue-600"
          : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5"
      }`}
    >
      {TAB_ICONS[tab]}
      {tab}
    </button>
  );
}

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
        handleError(err, {
          tags: { component: "Contribution", action: "submit" },
          userMessage: "Failed to fetch member data",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (memberNo) {
      fetchMemberData();
    }
  }, [memberNo]);

  const TABS: Tab[] = ["Profile", "Contributions"];
  const [activeTab, setActiveTab] = useState<Tab>("Profile");

  return (
    <PageContainer pageTitle="Member Profile" pageIcon={<User />}>
      <PageContent
        breadcrumbs={[
          { title: "Members", path: "/members" },
          { title: `Member ${memberNo}` },
        ]}
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
              icon={<Edit2Icon />}
            />
          </div>
        }
        showFab={true}
        fabIcon={<Edit2Icon />}
        fabHref={`/members/${memberNo}/edit`}
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
                <span className="flex items-center gap-1">
                  <Calendar
                    size={12}
                    className="sm:w-3 sm:h-3 md:w-[14px] md:h-[14px]"
                  />{" "}
                  Joined A long time ago
                </span>
              </div>

              <hr className="border-gray-100 dark:border-white/5 my-2 sm:my-2 md:my-3" />
              <div className="flex flex-wrap justify-center sm:justify-start gap-1">
                {TABS.map((tab) => (
                  <TabButton
                    key={tab}
                    tab={tab}
                    active={activeTab === tab}
                    onClick={() => setActiveTab(tab)}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:flex flex items-center gap-2 bg-green-600 hover:bg-green-500 transition-colors text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shrink-0">
            <UserCheck size={14} className="sm:w-4 sm:h-4" /> Active
          </div>
        </div>

        {activeTab === "Profile" && <ProfileTab member={memberData!} />}
        {activeTab === "Contributions" && (
          <ContributionsTab member={memberData!} />
        )}
      </PageContent>
    </PageContainer>
  );
};

export default page;
