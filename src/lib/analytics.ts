"use client";

import { useState, useEffect } from 'react';

export interface AnalyticsEvent {
  name: string;
  properties: Record<string, any>;
  timestamp: string;
  userId?: string;
  sessionId?: string;
}

// Extend Window interface for custom analytics
declare global {
  interface Window {
    customAnalytics?: {
      track: (event: string, properties: Record<string, any>) => void;
    };
  }
}

class AnalyticsEngine {
  private events: AnalyticsEvent[] = [];
  private sessionId: string;
  private userId: string;
  private isEnabled: boolean;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.userId = this.generateUserId();
    this.isEnabled = this.isAnalyticsEnabled();
  }

  public track(eventName: string, properties: Record<string, any> = {}) {
    const event: AnalyticsEvent = {
      name: eventName,
      properties,
      timestamp: new Date().toISOString(),
      userId: this.userId,
      sessionId: this.sessionId,
    };

    this.events.push(event);

    if (this.isEnabled) {
      this.flushToServer(event);
      this.triggerEventListeners(event);
    }
  }

  public async flushBatchEvents(events: AnalyticsEvent[]): Promise<void> {
    await Promise.all(
      events.map(event => this.flushToServer(event))
    );
  }

  public flushToServer(event: AnalyticsEvent): Promise<void> {
    return fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to send analytics event');
        }
      })
      .catch(error => {
        console.error('Analytics flush failed:', error);
      });
  }

  private isAnalyticsEnabled(): boolean {
    if (typeof window === 'undefined') return false;
    return process.env.NODE_ENV === 'production' &&
           !!process.env.NEXT_PUBLIC_ANALYTICS_ENABLED;
  }

  private generateSessionId(): string {
    return `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateUserId(): string {
    if (typeof window !== 'undefined' && localStorage.getItem('analytics_user_id')) {
      return localStorage.getItem('analytics_user_id')!;
    }

    const newId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    if (typeof window !== 'undefined') {
      localStorage.setItem('analytics_user_id', newId);
    }
    return newId;
  }

  public getAnalyticsData() {
    return {
      events: this.events,
      sessionCount: new Set(this.events.map(e => e.sessionId)).size,
      userCount: new Set(this.events.map(e => e.userId)).size,
      eventCounts: this.events.reduce((acc, event) => {
        acc[event.name] = (acc[event.name] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
    };
  }

  private triggerEventListeners(event: AnalyticsEvent) {
    // Event listeners for real-time updates (simplified)
    if (typeof window !== 'undefined' && window.customAnalytics) {
      window.customAnalytics.track(event.name, event.properties);
    }
  }
}

const analytics = new AnalyticsEngine();

export function useAnalytics() {
  const [analyticsData, setAnalyticsData] = useState({
    events: [] as AnalyticsEvent[],
    sessionCount: 0,
    userCount: 0,
    eventCounts: {} as Record<string, number>,
  });

  useEffect(() => {
    const updateAnalytics = () => {
      setAnalyticsData(analytics.getAnalyticsData());
    };

    updateAnalytics();
  }, []);

  return {
    analyticsData,
  };
}

export { AnalyticsEngine };
export default analytics;