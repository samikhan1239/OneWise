import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Session from "@/models/Session";
import { getToken, verifyToken } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // ✅ IMPORTANT

  const token = getToken(req);
  const payload = verifyToken(token || "");

  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDB();

  const session = await Session.findById(id);
  if (!session) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  // Check ownership: mentor or joined student
  if (
    session.mentor.toString() !== payload.userId &&
    session.student?.toString() !== payload.userId
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ session });
}
