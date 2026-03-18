"use client";

import { Button } from "@/presentation/components/ui";
import * as Sentry from "@sentry/nextjs";
import { useEffect, useState } from "react";

export default function Page() {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    Sentry.logger.info("Sentry example page loaded");
    async function checkConnectivity() {
      const result = await Sentry.diagnoseSdkConnectivity();
      setIsConnected(result !== "sentry-unreachable");
    }
    checkConnectivity();
  }, []);

  return (
    <div className="flex items-center justify-center p-4 pt-8 pb-20">
      <main>
        <Button
          type="button"
          onClick={async () => {
            await Sentry.startSpan(
              {
                name: "Example Frontend/Backend Span",
                op: "test",
              },
              async () => {
                const res = await fetch("/api/sentry-example-api");
              },
            );
          }}
          disabled={!isConnected}
        >
          <span>Throw Sample Error</span>
        </Button>
      </main>
    </div>
  );
}
