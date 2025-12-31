import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export function getToken(req: NextRequest) {
  return req.cookies.get('token')?.value;
}

export function verifyToken(token: string) {
  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as { userId: string; role: string };
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

export function createToken(payload: { userId: string; role: string }) {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1d' });
}