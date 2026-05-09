import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Codmir SDK Demo",
  description: "Interactive demo for testing error tracking, session replay, and self-healing patches",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
