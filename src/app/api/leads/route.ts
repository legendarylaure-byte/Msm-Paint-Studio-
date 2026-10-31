import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const adminSession = request.cookies.get('admin-session');
    if (!adminSession || adminSession.value !== 'authenticated') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const leadsDir = path.join(process.cwd(), 'data');
    const leadsFile = path.join(leadsDir, 'leads.json');
    
    if (!fs.existsSync(leadsFile)) {
      return NextResponse.json({ leads: [] });
    }
    
    const leads = JSON.parse(fs.readFileSync(leadsFile, 'utf8'));
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
    
    const lead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...body,
      timestamp: body.timestamp || new Date().toISOString(),
      status: body.status || 'new',
      source: body.source || 'calculator',
    };
    
    const leadsDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(leadsDir)) {
      fs.mkdirSync(leadsDir, { recursive: true });
    }
    const leadsFile = path.join(leadsDir, 'leads.json');
    
    let leads = [];
    if (fs.existsSync(leadsFile)) {
      try {
        leads = JSON.parse(fs.readFileSync(leadsFile, 'utf8'));
      } catch (e) {
        leads = [];
      }
    }
    
    leads.unshift(lead);
    fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2));
    
    return NextResponse.json({ success: true, leadId: lead.id });
  } catch (error) {
    console.error('Leads POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
