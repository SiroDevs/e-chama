"use client";

import { Edit2Icon, XIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { PageContainer } from "@/presentation/components/common/page-container";
import PageContent from "@/presentation/components/common/page-content";
import { PageButton } from "@/presentation/components/ui/actions";
import { AppDispatch, RootState } from "@/application/state/store";
import { Alert, Card } from "@/presentation/components/ui";
import { AlertDescription, CardContent } from "@/presentation/components/ui";
import { editMemberAction } from "@/application/use-cases/user/member";
import { MemberFormValues, memberToFormValues } from "./arrays";
import { handleError } from "@/application/helpers/error-utils";
import { memberService } from "@/infrastructure/services/memberService";
import { GroupMember } from "@/domain/entities";
import EditMemberForm from "./form";

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const memberNo = params.id as string;
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { group } = useSelector((state: RootState) => state.group);
  const [profileData, setProfileData] = useState<GroupMember | null>(null);

  const handleCancel = () => {
    router.push(`/members/${memberNo}`);
  };

  const handleSubmit = async (values: MemberFormValues) => {
    try {
      setIsLoading(true);
      setError(null);

      await dispatch(
        editMemberAction(
          group?.group_id!,
          values.first_name,
          values.last_name,
          values.phone || "",
          values.id_number || "",
          values.kra_pin || "",
          values.member_no || "",
          values.id_number || "",
          "",
          "",
          "",
          "",
        ),
      );

      router.push(`/members/${memberNo}`);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update member details. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

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
          setProfileData(data);
        } else {
          setError("Profile not found");
        }
      } catch (err) {
        setError("Failed to fetch profile data");
        handleError(err, {
          tags: { component: "Profile Edit", action: "submit" },
          userMessage: "Failed to fetch profile data",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (memberNo) {
      fetchMemberData();
    }
  }, [memberNo]);

  return (
    <PageContainer pageTitle="Edit Profile" pageIcon={<Edit2Icon />}>
      <PageContent
        breadcrumbs={[
          { title: "Members", path: "/members" },
          { title: `Member ${memberNo}`, path: `/members/${memberNo}` },
          { title: `Edit Profile` },
        ]}
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
        <Card className="w-full md:w-3/4 p-4 m-2">
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <EditMemberForm
              initialData={
                profileData ? memberToFormValues(profileData) : undefined
              }
              onSubmit={handleSubmit}
              isLoading={isLoading}
              onCancel={handleCancel}
            />
          </CardContent>
        </Card>
      </PageContent>
    </PageContainer>
  );
};

export default Page;
