"use client";

import { useEffect, useState } from "react";
import { getClient } from "@codmir/sdk/nextjs";

export function StatusBar() {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const client = getClient();
    setConnected(!!client);
  }, []);

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 16,
      padding: "12px 16px",
      background: "var(--card)",
      border: "1px solid var(--border)",
      borderRadius: 10,
      marginBottom: 24,
      fontSize: 13,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: connected ? "var(--green)" : "var(--red)",
          boxShadow: connected ? "0 0 6px var(--green)" : "0 0 6px var(--red)",
        }} />
        <span style={{ color: "var(--muted)" }}>SDK</span>
        <span style={{ fontWeight: 500 }}>{connected ? "Connected" : "Not initialized"}</span>
      </div>

      <div style={{ height: 16, width: 1, background: "var(--border)" }} />

      <div style={{ color: "var(--muted)" }}>
        DSN: <span style={{ fontFamily: "monospace", fontSize: 11 }}>
          {process.env.NEXT_PUBLIC_CODMIR_DSN || "not set"}
        </span>
      </div>

      <div style={{ height: 16, width: 1, background: "var(--border)" }} />

      <div style={{ color: "var(--muted)" }}>
        Session replay: <span style={{ fontWeight: 500, color: "var(--green)" }}>recording</span>
      </div>
    </div>
  );
}
