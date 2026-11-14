import { NextRequest, NextResponse } from 'next/server';

// Simple rate limiter
const rateLimitStore = new Map<string, { count: number; reset: number }>();

function checkRateLimit(ip: string): { allowed: boolean; remaining: number; reset: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);
  
  if (!entry) {
    rateLimitStore.set(ip, { count: 1, reset: now + 60000 });
    return { allowed: true, remaining: 9, reset: now + 60000 };
  }
  
  if (now > entry.reset) {
    rateLimitStore.set(ip, { count: 1, reset: now + 60000 });
    return { allowed: true, remaining: 9, reset: now + 60000 };
  }
  
  entry.count++;
  return { allowed: entry.count <= 20, remaining: 20 - entry.count, reset: entry.reset };
}

function isValidEmail(email: string): boolean {
  return /^\S+@\S+\.\S+$/.test(email);
}

function sanitizeInput(input: string): string {
  return input
    .replace(/[<>&"']/g, (c) => ({
      '<': '<',
      '>': '>',
      '&': '&',
      '"': '"',
      "'": '&#039;'
    }[c] || c));
}

// Allowed services
const ALLOWED_SERVICES = [
  'Interior Painting',
  'Exterior Painting',
  'Shops & Warehouses',
  'Fences & Gates',
  'Colour Advice',
  'Repairs & Prep'
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    
    // Rate limit
    const rateLimitCheck = checkRateLimit(ip);
    if (!rateLimitCheck.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }
    
    // Validate required fields
    const required = ['name', 'email', 'phone', 'address', 'service', 'property', 'date', 'slot'];
    const missing = required.filter(f => !body[f] || body[f].trim() === '');
    
    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required field(s): ${missing.join(', ')}` },
        { status: 400 }
      );
    }
    
    // Validate email
    if (!isValidEmail(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }
    
    // Validate service
    if (!ALLOWED_SERVICES.includes(body.service)) {
      return NextResponse.json(
        { error: 'Invalid service selected' },
        { status: 400 }
      );
    }
    
    // Sanitize all inputs
    const sanitizedName = sanitizeInput(body.name);
    const sanitizedEmail = sanitizeInput(body.email).toLowerCase();
    const sanitizedPhone = sanitizeInput(body.phone);
    const sanitizedAddress = sanitizeInput(body.address);
    const sanitizedService = sanitizeInput(body.service);
    const sanitizedProperty = sanitizeInput(body.property);
    const sanitizedDetails = body.details ? sanitizeInput(body.details) : '';
    const sanitizedColour = body.colour ? sanitizeInput(body.colour) : '';
    
    // Validate property is not empty
    if (!sanitizedProperty.trim()) {
      return NextResponse.json(
        { error: 'Property type is required' },
        { status: 400 }
      );
    }
    
    // In a real app, would save to database and send email
    // For now, just log and return success
    console.log('Booking received:', {
      name: sanitizedName,
      email: sanitizedEmail,
      phone: sanitizedPhone,
      address: sanitizedAddress,
      service: sanitizedService,
      property: sanitizedProperty,
      colour: sanitizedColour,
      date: body.date,
      slot: body.slot,
      details: sanitizedDetails,
    });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Booking received successfully' 
    });
  } catch (error) {
    console.error('Bookings POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Public endpoint for health check or analytics
    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Bookings GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}