import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Session from "@/models/Session";
import { getToken, verifyToken } from "@/lib/auth";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // ✅ IMPORTANT

  const token = getToken(req);
  const payload = verifyToken(token || "");

  if (!payload || payload.role !== "mentor") {
    return NextResponse.json(
      { error: "Unauthorized: Must be a mentor" },
      { status: 401 }
    );
  }

  await connectToDB();

  const session = await Session.findById(id);
  if (!session || session.mentor.toString() !== payload.userId) {
    return NextResponse.json(
      { error: "Session not found or unauthorized" },
      { status: 404 }
    );
  }

  session.status = "ended";
  session.endTime = new Date();
  await session.save();

  return NextResponse.json({ message: "Session ended", session });
}
