"use client";

export function EventLog({ entries }: { entries: string[] }) {
  return (
    <div style={{
      background: "var(--card)",
      border: "1px solid var(--border)",
      borderRadius: 12,
      overflow: "hidden",
    }}>
      <div style={{
        padding: "12px 16px",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 600 }}>Event Log</h3>
        <span style={{ fontSize: 12, color: "var(--muted)" }}>
          {entries.length} event{entries.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div style={{
        maxHeight: 300,
        overflow: "auto",
        padding: entries.length ? 0 : 20,
      }}>
        {entries.length === 0 ? (
          <p style={{ color: "var(--muted)", fontSize: 13, textAlign: "center" }}>
            Click a scenario above to start capturing events
          </p>
        ) : (
          entries.map((entry, i) => (
            <div
              key={i}
              style={{
                padding: "8px 16px",
                fontSize: 12,
                fontFamily: "monospace",
                borderBottom: i < entries.length - 1 ? "1px solid var(--border)" : undefined,
                color: entry.includes("error") || entry.includes("Error") || entry.includes("crash")
                  ? "var(--red)"
                  : entry.includes("warning") || entry.includes("Slow")
                    ? "var(--orange)"
                    : "var(--fg)",
                opacity: i === 0 ? 1 : 0.7,
              }}
            >
              {entry}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
