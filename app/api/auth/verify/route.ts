import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@clerk/backend';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 });
    }

    // Verify the token with Clerk
    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });

    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Return user data
    return NextResponse.json({
      id: payload.sub,
      email: payload.email,
      firstName: payload.given_name,
      lastName: payload.family_name,
    });
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
  }
}