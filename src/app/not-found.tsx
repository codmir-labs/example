import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ maxWidth: 640, margin: "0 auto", padding: "120px 20px", textAlign: "center" }}>
      <h1 style={{ fontSize: 72, fontWeight: 700, color: "var(--muted)", marginBottom: 8 }}>404</h1>
      <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 24 }}>
        This page doesn&apos;t exist — the SDK captured this navigation as a breadcrumb.
      </p>
      <Link href="/" style={{ fontSize: 14 }}>&larr; Back to demo</Link>
    </main>
  );
}
