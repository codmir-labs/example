"use client";

import { useState } from "react";
import { captureException, captureMessage, addBreadcrumb } from "@codmir/sdk/nextjs";

interface ScenarioProps {
  onLog: (entry: string) => void;
}

function ScenarioCard({
  title,
  description,
  color,
  icon,
  children,
}: {
  title: string;
  description: string;
  color: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{
      background: "var(--card)",
      border: "1px solid var(--border)",
      borderRadius: 12,
      padding: 20,
      display: "flex",
      flexDirection: "column",
      gap: 12,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 20 }}>{icon}</span>
        <h3 style={{ fontSize: 15, fontWeight: 600, color }}>{title}</h3>
      </div>
      <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}>{description}</p>
      <div style={{ marginTop: "auto" }}>{children}</div>
    </div>
  );
}

function TriggerButton({
  label,
  color,
  onClick,
  loading,
}: {
  label: string;
  color: string;
  onClick: () => void;
  loading?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      style={{
        width: "100%",
        padding: "10px 16px",
        borderRadius: 8,
        border: `1px solid ${color}40`,
        background: `${color}15`,
        color,
        fontSize: 13,
        fontWeight: 500,
        cursor: loading ? "wait" : "pointer",
        opacity: loading ? 0.6 : 1,
        transition: "all 0.15s",
      }}
    >
      {loading ? "Running..." : label}
    </button>
  );
}

export function CrashScenario({ onLog }: ScenarioProps) {
  const trigger = () => {
    addBreadcrumb({ category: "ui.click", message: "User clicked crash button" });
    try {
      throw new Error("Intentional crash from demo app");
    } catch (err) {
      const id = captureException(err, { scenario: "manual-crash" });
      onLog(`Captured crash error (${id})`);
    }
  };

  return (
    <ScenarioCard
      title="Throw Error"
      description="Throws a caught exception and reports it via captureException. Simulates a try/catch block in production code."
      color="var(--red)"
      icon="💥"
    >
      <TriggerButton label="Throw Error" color="var(--red)" onClick={trigger} />
    </ScenarioCard>
  );
}

export function UnhandledRejectionScenario({ onLog }: ScenarioProps) {
  const trigger = () => {
    addBreadcrumb({ category: "ui.click", message: "User triggered unhandled rejection" });
    onLog("Fired unhandled promise rejection — SDK should auto-capture");
    Promise.reject(new Error("Unhandled promise rejection from demo app"));
  };

  return (
    <ScenarioCard
      title="Unhandled Rejection"
      description="Fires an unhandled promise rejection. The SDK's global handler captures it automatically without try/catch."
      color="var(--orange)"
      icon="🔥"
    >
      <TriggerButton label="Reject Promise" color="var(--orange)" onClick={trigger} />
    </ScenarioCard>
  );
}

export function TypeErrorScenario({ onLog }: ScenarioProps) {
  const trigger = () => {
    addBreadcrumb({ category: "ui.click", message: "User triggered TypeError" });
    try {
      const obj: Record<string, unknown> = {};
      // @ts-expect-error intentional crash
      obj.nested.deep.property.access();
    } catch (err) {
      const id = captureException(err, { scenario: "type-error" });
      onLog(`Captured TypeError (${id})`);
    }
  };

  return (
    <ScenarioCard
      title="TypeError"
      description="Accesses a deeply nested property on undefined. Common production bug — the SDK captures the full stack trace."
      color="var(--yellow)"
      icon="🐛"
    >
      <TriggerButton label="Access undefined" color="var(--yellow)" onClick={trigger} />
    </ScenarioCard>
  );
}

export function SlowAPIScenario({ onLog }: ScenarioProps) {
  const [loading, setLoading] = useState(false);

  const trigger = async () => {
    setLoading(true);
    addBreadcrumb({ category: "http", message: "Starting slow API call" });
    onLog("Calling slow API endpoint...");

    try {
      const res = await fetch("/api/slow");
      const data = await res.json();
      onLog(`Slow API responded after ${data.delayMs}ms`);
      captureMessage(`Slow API call completed in ${data.delayMs}ms`, "warning");
    } catch (err) {
      captureException(err, { scenario: "slow-api" });
      onLog("Slow API call failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScenarioCard
      title="Slow API Call"
      description="Calls a deliberately slow endpoint (3s delay). Demonstrates performance monitoring and breadcrumb trails."
      color="var(--purple)"
      icon="🐢"
    >
      <TriggerButton label="Call Slow API" color="var(--purple)" onClick={trigger} loading={loading} />
    </ScenarioCard>
  );
}

export function FormValidationScenario({ onLog }: ScenarioProps) {
  const [submitted, setSubmitted] = useState(false);

  const trigger = () => {
    setSubmitted(true);
    addBreadcrumb({ category: "ui.submit", message: "User submitted invalid form" });

    try {
      const formData = { email: "", age: -5, name: null };

      if (!formData.email) throw new Error("Validation: email is required");
      if (formData.age < 0) throw new Error("Validation: age cannot be negative");
    } catch (err) {
      const id = captureException(err, {
        scenario: "form-validation",
        formData: { email: "", age: -5, name: null },
      });
      onLog(`Captured form validation error (${id})`);
    }

    setTimeout(() => setSubmitted(false), 2000);
  };

  return (
    <ScenarioCard
      title="Form Validation Crash"
      description="Submits a form with invalid data causing a validation error. The error includes form context for debugging."
      color="var(--green)"
      icon="📝"
    >
      <TriggerButton label={submitted ? "Error shown!" : "Submit Bad Form"} color="var(--green)" onClick={trigger} />
    </ScenarioCard>
  );
}

export function ConsoleFloodScenario({ onLog }: ScenarioProps) {
  const trigger = () => {
    addBreadcrumb({ category: "ui.click", message: "User triggered console flood" });
    let count = 0;

    const interval = setInterval(() => {
      count++;
      captureMessage(`Console flood message #${count}`, "info");
      if (count >= 10) {
        clearInterval(interval);
        onLog(`Sent 10 rapid-fire messages — check rate limiting`);
      }
    }, 100);

    onLog("Flooding 10 messages in 1 second...");
  };

  return (
    <ScenarioCard
      title="Event Flood"
      description="Sends 10 events in rapid succession. Tests the SDK's batching and queue behavior under burst load."
      color="var(--accent)"
      icon="🌊"
    >
      <TriggerButton label="Flood Events" color="var(--accent)" onClick={trigger} />
    </ScenarioCard>
  );
}

export function NetworkErrorScenario({ onLog }: ScenarioProps) {
  const [loading, setLoading] = useState(false);

  const trigger = async () => {
    setLoading(true);
    addBreadcrumb({ category: "http", message: "Calling endpoint that returns 500" });

    try {
      const res = await fetch("/api/error");
      if (!res.ok) {
        throw new Error(`API returned ${res.status}: ${res.statusText}`);
      }
    } catch (err) {
      const id = captureException(err, { scenario: "network-error" });
      onLog(`Captured network error (${id})`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScenarioCard
      title="Server Error (500)"
      description="Calls an endpoint that returns a 500 error. Simulates backend failures that the frontend SDK captures."
      color="var(--red)"
      icon="🔌"
    >
      <TriggerButton label="Call Failing API" color="var(--red)" onClick={trigger} loading={loading} />
    </ScenarioCard>
  );
}

export function MemoryLeakScenario({ onLog }: ScenarioProps) {
  const trigger = () => {
    addBreadcrumb({ category: "ui.click", message: "User triggered memory scenario" });

    const leakyArray: number[][] = [];
    for (let i = 0; i < 1000; i++) {
      leakyArray.push(new Array(1000).fill(i));
    }

    captureMessage("Allocated ~4MB in loop — simulating memory pressure", "warning");
    onLog("Allocated ~4MB of arrays (1000 x 1000 entries)");
  };

  return (
    <ScenarioCard
      title="Memory Pressure"
      description="Allocates a large amount of memory in a tight loop. Reports the event as a warning for monitoring."
      color="var(--orange)"
      icon="🧠"
    >
      <TriggerButton label="Allocate Memory" color="var(--orange)" onClick={trigger} />
    </ScenarioCard>
  );
}
