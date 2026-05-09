"use client";

import { useEffect } from "react";
import { captureException } from "@codmir/sdk/nextjs";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    captureException(error, { mechanism: "error-boundary", digest: error.digest });
  }, [error]);

  return (
    <main style={{ maxWidth: 640, margin: "0 auto", padding: "120px 20px", textAlign: "center" }}>
      <h2 style={{ fontSize: 20, fontWeight: 600, color: "var(--red)", marginBottom: 8 }}>
        Something went wrong
      </h2>
      <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 24 }}>
        This error was automatically captured by the Codmir SDK.
      </p>
      <button
        onClick={reset}
        style={{
          padding: "10px 20px",
          borderRadius: 8,
          border: "1px solid var(--accent)",
          background: "transparent",
          color: "var(--accent)",
          cursor: "pointer",
          fontSize: 14,
        }}
      >
        Try again
      </button>
    </main>
  );
}
