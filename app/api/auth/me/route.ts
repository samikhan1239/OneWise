import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import User from '@/models/User';
import { getToken, verifyToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const token = getToken(req);
  const payload = verifyToken(token || '');

  if (!payload) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectToDB();
  const user = await User.findById(payload.userId).select('-password');
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({ user });
}