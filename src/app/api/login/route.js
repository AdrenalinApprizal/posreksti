import { NextResponse } from "next/server";

export async function post(request) {
  return NextResponse.json({ message: "Hello from the API!" });
}
