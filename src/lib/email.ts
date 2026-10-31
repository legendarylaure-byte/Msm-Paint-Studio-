import { site } from "./site";

export async function sendBookingConfirmation({
  to,
  name,
  service,
  property,
  date,
  slot,
  colour,
  address,
}: {
  to: string;
  name: string;
  service: string;
  property: string;
  date: string;
  slot: string;
  colour?: string | null;
  address: string;
}) {
  const firstName = name.split(" ")[0];
  const apiKey = process.env.RESEND_API_KEY;
  
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Confirmation - MSM Painting Studio</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(255, 107, 53, 0.3);">
          <tr>
            <td style="background: linear-gradient(135deg, #FF6B35 0%, #e85d2a 100%); padding: 40px 40px 30px 40px; text-align: center;">
              <h1 style="margin: 0; color: white; font-size: 28px; font-weight: 800; letter-spacing: -0.02em;">MSM Painting Studio</h1>
              <p style="margin: 8px 0 0 0; color: rgba(255, 255, 255, 0.95); font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.15em;">Berwick VIC • Free Quotes</p>
            </td>
          </tr>
          
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 16px 0; color: #ffffff; font-size: 24px; font-weight: 800;">Thanks, ${firstName}!</h2>
              <p style="margin: 0 0 24px 0; color: #e5e5e5; font-size: 16px; line-height: 1.6;">
                Your booking enquiry has been received. We're excited to bring your vision to life with our hands-on painting service.
              </p>
              
              <table role="presentation" style="width: 100%; border-collapse: collapse; background: rgba(255, 107, 53, 0.1); border: 1px solid rgba(255, 107, 53, 0.3); border-radius: 12px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 24px;">
                    <h3 style="margin: 0 0 16px 0; color: #FF6B35; font-size: 18px; font-weight: 700;">Your Booking Details</h3>
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 8px 0; color: #a3a3a3; font-size: 14px; width: 40%;">Service</td>
                        <td style="padding: 8px 0; color: #ffffff; font-size: 14px; font-weight: 600;">${service}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #a3a3a3; font-size: 14px;">Property</td>
                        <td style="padding: 8px 0; color: #ffffff; font-size: 14px; font-weight: 600;">${property}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #a3a3a3; font-size: 14px;">Preferred Date</td>
                        <td style="padding: 8px 0; color: #ffffff; font-size: 14px; font-weight: 600;">${date}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #a3a3a3; font-size: 14px;">Preferred Time</td>
                        <td style="padding: 8px 0; color: #ffffff; font-size: 14px; font-weight: 600;">${slot}</td>
                      </tr>
                      ${colour ? `
                      <tr>
                        <td style="padding: 8px 0; color: #a3a3a3; font-size: 14px;">Selected Colour</td>
                        <td style="padding: 8px 0; color: #ffffff; font-size: 14px; font-weight: 600;">${colour}</td>
                      </tr>
                      ` : ''}
                      <tr>
                        <td style="padding: 8px 0; color: #a3a3a3; font-size: 14px;">Job Address</td>
                        <td style="padding: 8px 0; color: #ffffff; font-size: 14px; font-weight: 600;">${address}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 0 0 24px 0; color: #e5e5e5; font-size: 15px; line-height: 1.6;">
                <strong style="color: #ffffff;">What's next?</strong><br>
                We'll review your details and get back to you within one business day to confirm availability and provide your free quote.
              </p>
              
              <p style="margin: 0 0 32px 0; color: #e5e5e5; font-size: 15px; line-height: 1.6;">
                <strong style="color: #ffffff;">Owner on every job.</strong> That's our promise.
              </p>
              
              <div style="text-align: center; padding: 24px; background: rgba(255, 255, 255, 0.05); border-radius: 12px;">
                <p style="margin: 0 0 12px 0; color: #a3a3a3; font-size: 14px;">Questions? Get in touch</p>
                <p style="margin: 0; color: #ffffff; font-size: 16px; font-weight: 600;">
                  <a href="tel:${site.phoneHref.replace('tel:', '')}" style="color: #FF6B35; text-decoration: none;">${site.phone}</a>
                </p>
              </div>
            </td>
          </tr>
          
          <tr>
            <td style="background: #000000; padding: 24px 40px; text-align: center;">
              <p style="margin: 0; color: #737373; font-size: 12px;">
                © ${new Date().getFullYear()} MSM Painting Studio. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
  
  if (apiKey) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'MSM Painting Studio <onboarding@resend.dev>',
          to: [to],
          subject: "Thanks for reaching out - MSM Painting Studio",
          html: html,
        }),
      });
      if (res.ok) {
        return { success: true };
      }
    } catch (e) {
      console.error('Email send error:', e);
    }
  }
  
  console.log('Email would be sent to:', to);
  return { success: true };
}
