import * as Codmir from "@codmir/sdk/nextjs";

Codmir.init({
  dsn: process.env.NEXT_PUBLIC_CODMIR_DSN,
  overseerKey: process.env.NEXT_PUBLIC_CODMIR_KEY,
  environment: "development",
  debug: true,
  sampleRate: 1.0,
  replaysSessionSampleRate: 1.0,
  replaysOnErrorSampleRate: 1.0,
  captureUnhandledErrors: true,
  captureUnhandledRejections: true,
  trackRouteChanges: true,
});
