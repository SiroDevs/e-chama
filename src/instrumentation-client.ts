import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://0869e98d38f2979b334930510fcec9d7@o1365314.ingest.us.sentry.io/4511060825210880",
  tracesSampleRate: 1,
  enableLogs: true,
  sendDefaultPii: true,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
