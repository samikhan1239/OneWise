// /api/auth/signup/route.ts (or .js)
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDB } from '@/lib/db';
import User from '@/models/User';
import { registerSchema } from '@/zod/schemas';
import { createToken } from '@/lib/auth';
import { ZodError } from 'zod';

export async function POST(req: NextRequest) {
  try {
    await connectToDB();

    const body = await req.json();

    // Parse and validate with Zod
    const { email, password, role } = registerSchema.parse(body);

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();

    // Create token
    const token = createToken({
      userId: newUser._id.toString(),
      role: newUser.role,
    });

    // Set cookie and respond
    const response = NextResponse.json({
      message: 'User created successfully',
    });
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Signup error:', error); // Log on server for debugging

    if (error instanceof ZodError) {
      // Return detailed validation errors
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: error.issues.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }

    // For other errors (DB, bcrypt, etc.)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}