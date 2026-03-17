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

type Tab = "Profile" | "Contributions";

const TAB_ICONS: Record<Tab, React.ReactNode> = {
  Profile: <User size={15} />,
  Contributions: <HandCoins size={15} />,
};

function TabButton({
  tab,
  active,
  onClick,
}: {
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
        console.error(err);
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
      >
        <div className="px-3 py-3 flex rounded-lg items-center justify-between border bg-white dark:bg-[#1d1d20] shadow-xs">
          <div className="flex items-center gap-3">
            <div className="ring-3 ring-blue dark:ring-[#2a2d3e] rounded-lg overflow-hidden shrink-0">
              <GenericAvatar size={100} className="rounded-lg" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {memberData?.full_name || "Unknown Member"}
              </h1>
              <div className="flex flex-wrap gap-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <Briefcase size={14} /> {capitalize(memberData?.role!) || "member"}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={14} /> {memberData?.address || "Nairobi"}, {memberData?.country || "Kenya"}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={14} /> Joined A long time ago
                </span>
              </div>

              <hr className="border-gray-100 dark:border-white/5 py-1" />
              <div className="flex gap-1">
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
          <div className="flex items-center gap-2 bg-green-600 hover:bg-green-500 transition-colors text-white text-sm font-semibold px-4 py-2 rounded-lg">
            <UserCheck size={16} /> Active
          </div>
        </div>

        {activeTab === "Profile" && <ProfileTab member={memberData!} />}
        {activeTab === "Contributions" && <ContributionsTab member={memberData!} />}
      </PageContent>
    </PageContainer>
  );
};

export default page;
