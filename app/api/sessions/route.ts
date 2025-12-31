import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Session from "@/models/Session";
import { getToken, verifyToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const token = getToken(req);
    const payload = verifyToken(token || "");

    if (!payload || payload.role !== "mentor") {
      return NextResponse.json(
        { error: "Unauthorized: Must be a mentor" },
        { status: 401 }
      );
    }

    await connectToDB();

    const newSession = await Session.create({
      mentor: payload.userId,
    });

    return NextResponse.json(
      {
        session: newSession,
        link: `/session/${newSession._id}`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("SESSION_CREATE_ERROR:", error);
    return NextResponse.json(
      { error: "Failed to create session" },
      { status: 500 }
    );
  }
}
