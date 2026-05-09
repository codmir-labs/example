import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { error: "Internal Server Error", message: "Simulated backend failure" },
    { status: 500 },
  );
}
