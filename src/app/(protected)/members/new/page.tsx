"use client";

import { AlertCircle, Users } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { XIcon } from "lucide-react";

import { PageContainer } from "@/presentation/components/common/page-container";
import PageContent from "@/presentation/components/common/page-content";
import { PageButton } from "@/presentation/components/ui/actions";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/application/state/store";
import NewMemberForm, { FormValues } from "./form";
import { useState } from "react";
import { Alert, AlertTitle, Card } from "@/presentation/components/ui";
import { AlertDescription, CardContent } from "@/presentation/components/ui";
import { newMember } from "@/application/use-cases/user/member";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { group } = useSelector((state: RootState) => state.group);

  const handleCancel = () => {
    router.push("/members");
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      setIsLoading(true);
      setError(null);

      await dispatch(
        newMember(
          values.first_name,
          values.last_name,
          values.phone || "",
          values.email,
          values.password,
          values.member_no || "",
          values.id_number || "",
          "",//kra_pin
          group?.group_id!,
          "",//address
          "",//country
          "",//sex
          "",//dob
        ),
      );

      router.push("/members");
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to register member. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
            <NewMemberForm
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
