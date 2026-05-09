import { NextResponse } from "next/server";

export async function GET() {
  const delayMs = 3000;
  await new Promise((resolve) => setTimeout(resolve, delayMs));
  return NextResponse.json({ ok: true, delayMs, message: "This response was intentionally delayed" });
}
