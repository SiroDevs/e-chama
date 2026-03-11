import Link from "next/link";
import { useSelector } from "react-redux";

import { RootState } from "@/application/state/store";
import { Button } from "@/presentation/components/ui";
import Faq from "../components/common/faq";
import Hero from "../components/common/hero";
import Dashboard from "./Dashboard";

export default function HomePage() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (isAuthenticated) {
    return <Dashboard />;
  }

  return (
    <>
      <Hero />
      <div className="flex flex-col justify-center items-center sm:flex-row gap-4 justify-center mt-8">
        <Link href="/signin">
          <Button size="lg">Sign In</Button>
        </Link>
        <Link href="/signup">
          <Button variant="outline" size="lg">
            Create Account
          </Button>
        </Link>
      </div>
      <Faq />
    </>
  );
}
