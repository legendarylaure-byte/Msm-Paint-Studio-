import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || typeof body.name !== 'string') {
      return NextResponse.json(
        { error: 'Event name is required' },
        { status: 400 }
      );
    }

    // Sanitize event data
    const sanitizedEvent = {
      name: body.name,
      properties: body.properties || {},
      timestamp: body.timestamp || new Date().toISOString(),
      userId: body.userId || 'anonymous',
      sessionId: body.sessionId || 'unknown',
    };

    // Store in database or external service
    // For now, we'll just log it and simulate storage
    console.log('Analytics event:', sanitizedEvent);

    // In production, you would:
    // - Store in a database (PostgreSQL, MongoDB, etc.)
    // - Send to analytics services (Google Analytics, Mixpanel, etc.)
    // - Process in real-time or batch

    return NextResponse.json({ 
      success: true, 
      eventId: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` 
    });

  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const eventType = searchParams.get('event_type');
    const startDate = searchParams.get('start_date');
    const endDate = searchParams.get('end_date');
    const limit = parseInt(searchParams.get('limit') || '100');

    // In production, you would query your database
    // For now, return mock data

    const mockData = [
      {
        id: 'evt_123456',
        name: 'page_view',
        properties: { path: '/', title: 'Home Page' },
        userId: 'user_123',
        sessionId: 'sess_123',
        timestamp: '2024-01-01T12:00:00Z',
      },
      {
        id: 'evt_789012',
        name: 'cta_click',
        properties: { button_text: 'Get quoted', location: 'hero' },
        userId: 'user_123',
        sessionId: 'sess_123',
        timestamp: '2024-01-01T12:05:00Z',
      },
      {
        id: 'evt_345678',
        name: 'booking_started',
        properties: { form_type: 'quote', step: 1 },
        userId: 'user_456',
        sessionId: 'sess_456',
        timestamp: '2024-01-01T12:10:00Z',
      },
    ];

    // Filter by event type if specified
    let filteredData = mockData;
    if (eventType) {
      filteredData = filteredData.filter(event => event.name === eventType);
    }

    // Filter by date range if specified
    if (startDate && endDate) {
      filteredData = filteredData.filter(event => 
        event.timestamp >= startDate && event.timestamp <= endDate
      );
    }

    // Apply limit
    filteredData = filteredData.slice(0, limit);

    return NextResponse.json({
      events: filteredData,
      total: filteredData.length,
      hasMore: filteredData.length === limit,
    });

  } catch (error) {
    console.error('Analytics GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}