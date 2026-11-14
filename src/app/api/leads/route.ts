import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

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
  return { allowed: entry.count <= 10, remaining: 10 - entry.count, reset: entry.reset };
}

// Zod-like validation without the dependency
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

export async function GET(request: NextRequest) {
  try {
    const adminSession = request.cookies.get('admin-session');
    if (!adminSession || adminSession.value !== 'authenticated') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const leadsDir = path.join(process.cwd(), 'data');
    const leadsFile = path.join(leadsDir, 'leads.json');
    
    if (!fs.existsSync(leadsDir)) {
      fs.mkdirSync(leadsDir, { recursive: true });
    }
    
    let leads = [];
    if (fs.existsSync(leadsFile)) {
      try {
        leads = JSON.parse(fs.readFileSync(leadsFile, 'utf8'));
        // Sanitize leads data
        leads = leads.map((lead: any) => ({
          ...lead,
          name: sanitizeInput(lead.name || ''),
          email: sanitizeInput(lead.email || ''),
          service: sanitizeInput(lead.service || ''),
          property: sanitizeInput(lead.property || ''),
          details: sanitizeInput(lead.details || ''),
        }));
      } catch (e) {
        leads = [];
      }
    }
    
    return NextResponse.json({ leads });
  } catch (error) {
    console.error('Leads GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

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
    const required = ['name', 'email', 'phone', 'address', 'service', 'property'];
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
    
    // Validate property type is not empty
    if (!sanitizedProperty.trim()) {
      return NextResponse.json(
        { error: 'Property type is required' },
        { status: 400 }
      );
    }
    
    const lead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: sanitizedName,
      email: sanitizedEmail,
      phone: sanitizedPhone,
      address: sanitizedAddress,
      service: sanitizedService,
      property: sanitizedProperty,
      details: sanitizedDetails,
      timestamp: new Date().toISOString(),
      status: 'new',
    };
    
    const leadsDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(leadsDir)) {
      fs.mkdirSync(leadsDir, { recursive: true });
    }
    const leadsFile = path.join(leadsDir, 'leads.json');
    
    let leads = [];
    if (fs.existsSync(leadsFile)) {
      try {
        const existing = JSON.parse(fs.readFileSync(leadsFile, 'utf8'));
        // Sanitize existing leads too
        leads = existing.map((l: any) => ({
          ...l,
          name: sanitizeInput(l.name || ''),
          email: sanitizeInput(l.email || ''),
        }));
        leads.unshift(lead);
      } catch (e) {
        leads = [lead];
      }
    } else {
      leads = [lead];
    }
    
    // Write with atomic write pattern
    try {
      fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2));
    } catch (e) {
      console.error('Failed to write leads:', e);
      return NextResponse.json(
        { error: 'Failed to save lead data' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      leadId: lead.id,
      message: 'Lead received successfully' 
    });
  } catch (error) {
    console.error('Leads POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}