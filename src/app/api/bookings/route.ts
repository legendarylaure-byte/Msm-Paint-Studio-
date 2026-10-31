import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const required = ['name', 'email', 'phone', 'address', 'service', 'property', 'date', 'slot'];
    for (const field of required) {
      if (!body[field] || (typeof body[field] === 'string' && body[field].trim() === '')) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    if (!/^\S+@\S+\.\S+$/.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }
    
    const lead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone.trim(),
      address: body.address.trim(),
      service: body.service,
      property: body.property,
      date: body.date,
      slot: body.slot,
      details: body.details || '',
      colour: body.colour || body.paintName || null,
      calculator: body.calculator || null,
      source: 'booking_form',
      userAgent: request.headers.get('user-agent') || '',
      referer: request.headers.get('referer') || '',
      timestamp: new Date().toISOString(),
      status: 'new',
    };
    
    try {
      const fs = require('fs');
      const path = require('path');
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
    } catch (e) {
      console.error('Failed to save lead:', e);
    }
    
    try {
      const { sendBookingConfirmation } = await import('@/lib/email');
      await sendBookingConfirmation({
        to: lead.email,
        name: lead.name,
        service: lead.service,
        property: lead.property,
        date: lead.date,
        slot: lead.slot,
        colour: lead.colour,
        address: lead.address,
      });
    } catch (e) {
      console.error('Failed to send confirmation email:', e);
    }
    
    console.log('Booking received:', lead);
    
    return NextResponse.json({ 
      success: true, 
      leadId: lead.id,
      message: 'Booking received successfully' 
    });

  } catch (error) {
    console.error('Booking API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
