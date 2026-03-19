"use client";

import { AlertCircle, Edit2Icon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { XIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { PageContainer } from "@/presentation/components/common/page-container";
import PageContent from "@/presentation/components/common/page-content";
import { PageButton } from "@/presentation/components/ui/actions";
import { useParams, useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/application/state/store";
import EditMemberForm from "./form";
import { Alert, AlertTitle, Card } from "@/presentation/components/ui";
import { AlertDescription, CardContent } from "@/presentation/components/ui";
import { newMemberAction } from "@/application/use-cases/user/member";
import { MemberFormValues, memberToFormValues } from "./arrays";
import { handleError } from "@/application/helpers/error-utils";
import { memberService } from "@/infrastructure/services/memberService";
import { GroupMember } from "@/domain/entities";

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
        newMemberAction(
          values.first_name,
          values.last_name,
          values.phone || "",
          values.email,
          values.password,
          values.member_no || "",
          values.id_number || "",
          "", //kra_pin
          group?.group_id!,
          "", //address
          "", //country
          "", //sex
          "", //dob
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
        const { data, error } = await memberService.fetchGroupMember(
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
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <EditMemberForm
              initialData={memberToFormValues(profileData!)}
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
