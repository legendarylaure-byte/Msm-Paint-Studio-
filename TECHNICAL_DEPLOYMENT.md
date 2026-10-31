# Technical Deployment Guide

## Project Overview
MSM Painting Studio - Full-Stack Painting Services Platform

## Environment Configuration

### Development Environment
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Development with hot reload
npm run dev -- --port 3001
```

### Production Environment
```bash
# Build for production
npm run build

# Start production server
npm start

# Production with custom port
PORT=3001 npm start
```

### Testing Environment
```bash
# Run full test suite
npm run test:full

# Run analytics tests only
npm run test:analytical

# Run Playwright UI
npm run test:ui
```

## Key Dependencies

### Core Dependencies
- **Next.js 16.4.2** - React framework with server-side rendering
- **React 19.3.0** - UI library
- **Tailwind CSS 4** - Styling framework
- **TypeScript 5** - Type safety

### Development Tools
- **Playwright** - E2E testing framework
- **ESLint** - Code linting
- **Jest** - Unit testing

### Business Logic
- **GSAP** - Animation library
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Canvas Confetti** - Celebration effects

## Technical Architecture

### Frontend Stack
```
/src
├── app/                    # Next.js app router
│   ├── page.tsx          # Main homepage
│   ├── layout.tsx        # Root layout with PWA
│   └── api/              # API routes
├── components/            # UI components
│   ├── sections/         # Page sections
│   ├── ui/              # Atomic components
│   └── ui/              # UI primitives
├── lib/                   # Application logic
│   ├── analytics.ts      # Analytics engine
│   ├── ab-testing.ts     # A/B testing framework
│   └── paint.ts         # Color system
├── hooks/                 # Custom hooks
└── utils/                 # Utility functions
```

### Backend Integration
```
/api/analytics/route.ts    # Analytics API endpoint
/public/sw.js            # Service worker
/src/app/manifest.json     # PWA manifest
```

## Configuration Files

### Environment Variables
Create `.env.local` for development:
```env
# Analytics
NEXT_PUBLIC_ANALYTICS_ENABLED=true
ANALYTICS_ENDPOINT=https://your-analytics-service.com/api

# App
NEXT_PUBLIC_APP_URL=https://msmpainting.com
NEXT_PUBLIC_APP_NAME="MSM Painting Studio"

# Feature Flags
NEXT_PUBLIC_FEATURE_TESTING_ENABLED=true
```

### Build Configuration
```json
{
  "name": "msmpainting",
  "version": "0.1.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "test": "playwright test",
    "test:ui": "playwright test --ui",
    "test:analytical": "jest src/lib/analytics.ts src/lib/ab-testing.ts",
    "test:full": "npm run test && npm run test:analytical"
  }
}
```

## Deployment Checklist

### Pre-Deployment
1. **Environment Setup**
   - Verify all environment variables
   - Configure analytics endpoints
   - Set up monitoring tools

2. **Code Quality**
   - Run linting: `npm run lint`
   - Check TypeScript compilation: `npx tsc --noEmit`
   - Run unit tests: `npm run test:analytical`

3. **Build Verification**
   - Build application: `npm run build`
   - Check bundle size and optimization
   - Verify static assets generation

### During Deployment
4. **Application Start**
   ```bash
   # Start production server
   npm start

   # Verify server health
   curl http://localhost:3000/api/health
   ```

5. **Analytics Integration**
   ```bash
   # Check analytics tracking
   curl -X POST http://localhost:3000/api/analytics \
     -H "Content-Type: application/json" \
     -d '{"name": "page_view", "properties": {"path": "/"}}'
   ```

### Post-Deployment
6. **Monitoring Setup**
   - Monitor analytics event volume
   - Track A/B test performance
   - Monitor application errors

7. **Performance Verification**
   - Check Core Web Vitals
   - Verify image optimization (WebP/AVIF)
   - Monitor loading times

## Service Worker Configuration

The PWA service worker is configured in `public/sw.js` with:

- Offline support for cached pages
- Background sync for form submissions
- Push notification capabilities
- Cache strategies for static assets

## SEO Configuration

### Structured Data
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "MSM Painting Studio",
  "description": "Professional painting services in Berwick, Casey & Cardinia",
  "address": {
    "streetAddress": "9 Hedgeley Drive",
    "addressLocality": "Berwick",
    "addressRegion": "VIC",
    "postalCode": "3806",
    "addressCountry": "AU"
  },
  "telephone": "0400 000 000",
  "openingHours": ["Mo-Fr 07:00-18:00", "Sa 08:00-16:00"],
  "website": "https://msmpainting.com"
}
```

## API Documentation

### Analytics API
```http
POST /api/analytics
Content-Type: application/json

{
  "name": "event_name",
  "properties": {"key": "value"},
  "timestamp": "2024-01-01T12:00:00.000Z",
  "userId": "user_123",
  "sessionId": "session_456"
}

Response: {"success": true, "eventId": "evt_123456789"}
```

## Monitoring & Maintenance

### Health Check Endpoint
```http
GET /api/analytics?event_type=page_view&start_date=2024-01-01T00:00:00Z&end_date=2024-01-01T23:59:59Z&limit=100
```

### Analytics Dashboard
Access analytics at `/analytics` route to view:
- Real-time event tracking
- User session analytics
- A/B test performance
- Conversion metrics

## Troubleshooting

### Common Issues

#### TypeScript Errors
```bash
# Fix TypeScript issues
npx tsc --noEmit
# Check specific file
npx tsc --noEmit src/lib/analytics.ts
```

#### Build Failures
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

#### Analytics Issues
```bash
# Check analytics configuration
NEXT_PUBLIC_ANALYTICS_ENABLED=false
# Verify endpoint connectivity
curl -I http://localhost:3000/api/analytics
```

## Support & Contact

For technical issues:
- **GitHub Issues**: Report bugs and feature requests
- **Technical Support**: Available during business hours
- **Deployment Support**: 24/7 on production environment

## Update & Maintenance

### Regular Tasks
1. **Weekly**: Monitor analytics metrics
2. **Monthly**: Update dependencies
3. **Quarterly**: Review A/B test results
4. **Annually**: Update documentation and refresh codebase

### Emergency Procedures
1. **Downtime**: Immediate notification to stakeholders
2. **Data Loss**: Restore from backup
3. **Security Issues**: Follow incident response protocol

---

**Last Updated**: October 30, 2026
**Version**: 0.1.0
**Environment**: Production Ready