"use client";

import { useEffect, useState } from "react";
import { addBreadcrumb, captureMessage } from "@codmir/sdk/nextjs";
import Link from "next/link";

export default function DashboardPage() {
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    addBreadcrumb({ category: "navigation", message: "User landed on dashboard page" });
    captureMessage("Dashboard page viewed", "info");
  }, []);

  const handleClick = () => {
    const next = clicks + 1;
    setClicks(next);
    addBreadcrumb({
      category: "ui.click",
      message: `Dashboard counter clicked (${next})`,
      data: { clicks: next },
    });
  };

  return (
    <main style={{ maxWidth: 640, margin: "0 auto", padding: "60px 20px" }}>
      <Link href="/" style={{ fontSize: 13, color: "var(--muted)", display: "block", marginBottom: 24 }}>
        &larr; Back to scenarios
      </Link>

      <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 8 }}>Dashboard</h1>
      <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 32 }}>
        This page exists for navigation testing. Every page transition is recorded
        as a breadcrumb in the session replay, so navigating here and back creates
        a trail you can review in the Codmir dashboard.
      </p>

      <div style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        padding: 24,
        textAlign: "center",
      }}>
        <p style={{ fontSize: 48, fontWeight: 700, marginBottom: 12 }}>{clicks}</p>
        <button
          onClick={handleClick}
          style={{
            padding: "10px 24px",
            borderRadius: 8,
            border: "1px solid var(--accent)40",
            background: "var(--accent)15",
            color: "var(--accent)",
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          Click me (tracked)
        </button>
        <p style={{ marginTop: 12, fontSize: 12, color: "var(--muted)" }}>
          Each click is a breadcrumb in your session replay
        </p>
      </div>
    </main>
  );
}
