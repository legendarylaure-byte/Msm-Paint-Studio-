import { NextResponse } from 'next/server';

// Generate CSRF token
function generateCSRFToken(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < 32; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
}

// Simple rate limiter using in-memory store
const failedLogins = new Map<string, number[]>();

const ADMIN_RATE_LIMIT = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const csrfToken = body.csrfToken;
    const submittedPassword = body.password;
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

    // Verify CSRF token (simple check - in production use proper session store)
    if (!csrfToken) {
      return NextResponse.json(
        { error: 'Missing CSRF token' },
        { status: 403 }
      );
    }

    // Rate limit check
    const now = Date.now();
    const attempts = failedLogins.get(ip) || [];
    const validAttempts = attempts.filter(t => now - t < ADMIN_RATE_LIMIT.windowMs);
    
    if (validAttempts.length >= ADMIN_RATE_LIMIT.max) {
      return NextResponse.json(
        { error: 'Too many failed attempts. Try again in 15 minutes.' },
        { status: 429 }
      );
    }

    // Get admin password from environment
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      return NextResponse.json(
        { error: 'Server configuration error - ADMIN_PASSWORD not set' },
        { status: 500 }
      );
    }

    if (submittedPassword !== adminPassword) {
      // Track failed attempt
      const attempts = failedLogins.get(ip) || [];
      attempts.push(Date.now());
      failedLogins.set(ip, attempts.filter(t => now - t < ADMIN_RATE_LIMIT.windowMs));
      
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    // Clear failed attempts on success
    failedLogins.delete(ip);

    // Set authenticated cookie
    const response = NextResponse.json({ success: true });
    response.cookies.set('admin-session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 86400,
    });
    return response;
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}