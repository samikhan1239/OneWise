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

  if (!payload || payload.role !== "student") {
    return NextResponse.json(
      { error: "Unauthorized: Must be a student" },
      { status: 401 }
    );
  }

  await connectToDB();

  const session = await Session.findById(id);
  if (!session) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  if (session.student) {
    return NextResponse.json(
      { error: "Session already joined" },
      { status: 400 }
    );
  }

  if (session.status !== "active") {
    return NextResponse.json(
      { error: "Session not active" },
      { status: 400 }
    );
  }

  session.student = payload.userId;
  await session.save();

  return NextResponse.json({
    message: "Joined session successfully",
    session,
  });
}
