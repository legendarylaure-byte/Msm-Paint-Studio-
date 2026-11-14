import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// In-memory store for CSRF tokens and failed login attempts
const csrfTokens = new Map<string, string>();
const failedLogins = new Map<string, number[]>();

// Rate limit config
const ADMIN_RATE_LIMIT = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
};

/**
 * Generate a CSRF token
 */
function generateCSRFToken(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < 32; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
}

/**
 * Verify CSRF token (sync check against in-memory store)
 */
function verifyCSRFToken(request: NextRequest, token?: string): boolean {
  if (!token) return false;
  
  const sessionId = request.cookies.get('nextjs')?.value || 'anonymous';
  const storedToken = csrfTokens.get(sessionId);
  
  if (!storedToken) return false;
  if (storedToken !== token) return false;
  
  // Consume the token (one-time use)
  csrfTokens.delete(sessionId);
  return true;
}

/**
 * Check admin rate limit (sync check)
 */
function checkAdminRateLimit(ip: string): { allowed: boolean; resetTime: Date } | null {
  const attempts = failedLogins.get(ip) || [];
  const now = Date.now();
  const validAttempts = attempts.filter(time => now - time < ADMIN_RATE_LIMIT.windowMs);
  
  if (validAttempts.length >= ADMIN_RATE_LIMIT.max) {
    const resetTime = new Date(now + ADMIN_RATE_LIMIT.windowMs);
    return { allowed: false, resetTime };
  }
  
  return { allowed: true, resetTime: new Date(now + ADMIN_RATE_LIMIT.windowMs) };
}

/**
 * Track failed login attempt (sync)
 */
function trackFailedLogin(ip: string) {
  const now = Date.now();
  const attempts = failedLogins.get(ip) || [];
  const validAttempts = attempts.filter(time => now - time < ADMIN_RATE_LIMIT.windowMs);
  validAttempts.push(now);
  failedLogins.set(ip, validAttempts);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get IP from headers (Next.js behind proxy)
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwardedFor ? forwardedFor.split(',')[0] : (realIp || 'unknown');
  
  // ==========================================
  // 1. CSRF Token Generation for forms (GET only)
  // ==========================================
  if (pathname === '/admin/login' && request.method === 'GET') {
    const token = generateCSRFToken();
    const sessionId = request.cookies.get('nextjs')?.value || 'anonymous';
    csrfTokens.set(sessionId, token);
    
    const response = NextResponse.next();
    response.cookies.set('csrf-token', token, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/admin/login',
      maxAge: 60 * 60 * 24, // 24 hours
    });
    return response;
  }
  
  // ==========================================
  // 2. Admin Login Form Protection (POST)
  // ==========================================
  if (pathname === '/admin/login' && request.method === 'POST') {
    const body = await request.json();
    const csrfToken = body.csrfToken;
    const submittedPassword = body.password;
    
    // Verify CSRF token
    if (!verifyCSRFToken(request, csrfToken)) {
      return NextResponse.json(
        { error: 'Invalid CSRF token' },
        { status: 403 }
      );
    }
    
    // Rate limit failed logins
    const rateLimitCheck = checkAdminRateLimit(ip);
    if (!rateLimitCheck?.allowed) {
      return NextResponse.json(
        { error: 'Too many failed attempts. Try again in 15 minutes.' },
        { status: 429 }
      );
    }
    
    // Verify password from environment
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }
    
    if (submittedPassword !== adminPassword) {
      // Track failed attempt
      trackFailedLogin(ip);
      
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
      maxAge: 86400, // 24 hours
    });
    return response;
  }
  
  // ==========================================
  // 3. Protect admin routes
  // ==========================================
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const adminSession = request.cookies.get('admin-session');
    if (!adminSession || adminSession.value !== 'authenticated') {
      return NextResponse.redirect(new URL('/admin/login?redirectTo=' + pathname, request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/:path*',
    '/',
  ],
};