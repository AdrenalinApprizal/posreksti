import { NextResponse } from "next/server";

export async function get(request) {
  return NextResponse.json({ message: "Hello from the API!" });
}
