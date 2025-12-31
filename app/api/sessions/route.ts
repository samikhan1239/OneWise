import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import Session from '@/models/Session';
import { getToken, verifyToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const token = getToken(req);
  const payload = verifyToken(token || '');

  if (!payload || payload.role !== 'mentor') {
    return NextResponse.json({ error: 'Unauthorized: Must be a mentor' }, { status: 401 });
  }

  await connectToDB();
  const newSession = new Session({ mentor: payload.userId });
  await newSession.save();

  // Use session ID as the unique link (e.g., /session/<id>)
  return NextResponse.json({ session: newSession, link: `/session/${newSession._id}` });
}