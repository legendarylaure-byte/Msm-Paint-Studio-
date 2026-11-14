import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const token = generateCSRFToken();
    const sessionId = (request.headers.get('cookie') || '').match(/nextjs=([^;]+)/)?.[1];
    
    if (sessionId) {
      // In a real app, store this in a proper store
      // For now, just return the token
    }
    
    return NextResponse.json({ token });
  } catch (error) {
    console.error('CSRF error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function generateCSRFToken(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < 32; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
}