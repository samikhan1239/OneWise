import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDB } from '@/lib/db';
import User from '@/models/User';
import { loginSchema } from '@/zod/schemas';
import { createToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const body = await req.json();
    const { email, password } = loginSchema.parse(body);

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
    }

    const token = createToken({ userId: user._id.toString(), role: user.role });

    const response = NextResponse.json({ message: 'Login successful' });
    response.cookies.set('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}