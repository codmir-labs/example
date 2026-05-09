"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CrashScenario,
  UnhandledRejectionScenario,
  TypeErrorScenario,
  SlowAPIScenario,
  FormValidationScenario,
  ConsoleFloodScenario,
  NetworkErrorScenario,
  MemoryLeakScenario,
} from "../components/scenarios";
import { EventLog } from "../components/event-log";
import { StatusBar } from "../components/status-bar";

export default function Home() {
  const [log, setLog] = useState<string[]>([]);

  const addLog = (entry: string) => {
    setLog((prev) => [`[${new Date().toLocaleTimeString()}] ${entry}`, ...prev].slice(0, 50));
  };

  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: "40px 20px" }}>
      <header style={{ marginBottom: 40 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "linear-gradient(135deg, #3b82f6, #a855f7)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, fontWeight: 700,
          }}>C</div>
          <h1 style={{ fontSize: 24, fontWeight: 600 }}>Codmir SDK Demo</h1>
        </div>
        <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.6 }}>
          Click the scenarios below to trigger real errors the SDK captures.
          Watch the event log to see what gets sent to your Codmir dashboard.
          Every action you take is being recorded for session replay.
        </p>
      </header>

      <StatusBar />

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 16,
        marginBottom: 32,
      }}>
        <CrashScenario onLog={addLog} />
        <UnhandledRejectionScenario onLog={addLog} />
        <TypeErrorScenario onLog={addLog} />
        <SlowAPIScenario onLog={addLog} />
        <FormValidationScenario onLog={addLog} />
        <ConsoleFloodScenario onLog={addLog} />
        <NetworkErrorScenario onLog={addLog} />
        <MemoryLeakScenario onLog={addLog} />
      </div>

      <div style={{
        display: "flex",
        gap: 12,
        marginBottom: 24,
        fontSize: 13,
      }}>
        <Link href="/dashboard" style={{
          padding: "8px 16px",
          borderRadius: 8,
          background: "var(--card)",
          border: "1px solid var(--border)",
        }}>
          Navigate to Dashboard &rarr;
        </Link>
        <Link href="/nonexistent-page" style={{
          padding: "8px 16px",
          borderRadius: 8,
          background: "var(--card)",
          border: "1px solid var(--border)",
        }}>
          Visit 404 Page &rarr;
        </Link>
      </div>

      <EventLog entries={log} />
    </main>
  );
}
