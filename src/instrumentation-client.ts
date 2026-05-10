import * as Codmir from "@codmir/sdk/nextjs";

Codmir.init({
  dsn: process.env.NEXT_PUBLIC_CODMIR_DSN,
  clientKey: process.env.NEXT_PUBLIC_CODMIR_CLIENT_KEY,
  environment: "development",
  debug: true,
  sampleRate: 1.0,
  replaysOnErrorSampleRate: 1.0,
  captureUnhandledErrors: true,
  captureUnhandledRejections: true,
  trackRouteChanges: true,
});
