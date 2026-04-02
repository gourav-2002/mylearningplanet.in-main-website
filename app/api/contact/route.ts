import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'claret.herosite.pro',
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true, // SSL
  auth: {
    user: process.env.SMTP_USER || 'connect@mylearningplanet.in',
    pass: process.env.SMTP_PASS || 'my@1356planetlearning',
  },
});

function ownerEmailHtml(data: {
  name: string;
  email: string;
  phone: string;
  grade: string;
  message: string;
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Contact Form Submission</title>
</head>
<body style="margin:0;padding:0;background:#F0F5FF;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F0F5FF;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 8px 40px rgba(18,81,170,0.12);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0A1F5E,#1251AA);padding:40px 48px;text-align:center;">
              <p style="margin:0 0 8px;color:rgba(255,255,255,0.7);font-size:12px;letter-spacing:0.15em;text-transform:uppercase;">My Learning Planet</p>
              <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;">New Enquiry Received</h1>
              <p style="margin:10px 0 0;color:rgba(255,255,255,0.65);font-size:14px;">A parent has submitted the contact form on your website.</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 48px;">

              <!-- Details Table -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:12px;overflow:hidden;border:1px solid #E0EAFF;">
                <tr style="background:#F0F5FF;">
                  <td style="padding:14px 20px;font-size:12px;font-weight:700;color:#1251AA;text-transform:uppercase;letter-spacing:0.1em;width:140px;">Full Name</td>
                  <td style="padding:14px 20px;font-size:15px;color:#0A1F5E;font-weight:600;">${data.name}</td>
                </tr>
                <tr style="background:#ffffff;">
                  <td style="padding:14px 20px;font-size:12px;font-weight:700;color:#1251AA;text-transform:uppercase;letter-spacing:0.1em;">Email</td>
                  <td style="padding:14px 20px;font-size:15px;color:#0A1F5E;font-weight:600;">
                    <a href="mailto:${data.email}" style="color:#1251AA;text-decoration:none;">${data.email}</a>
                  </td>
                </tr>
                <tr style="background:#F0F5FF;">
                  <td style="padding:14px 20px;font-size:12px;font-weight:700;color:#1251AA;text-transform:uppercase;letter-spacing:0.1em;">Phone</td>
                  <td style="padding:14px 20px;font-size:15px;color:#0A1F5E;font-weight:600;">
                    <a href="tel:${data.phone}" style="color:#1251AA;text-decoration:none;">${data.phone}</a>
                  </td>
                </tr>
                <tr style="background:#ffffff;">
                  <td style="padding:14px 20px;font-size:12px;font-weight:700;color:#1251AA;text-transform:uppercase;letter-spacing:0.1em;">Student Grade</td>
                  <td style="padding:14px 20px;font-size:15px;color:#0A1F5E;font-weight:600;">Class ${data.grade}</td>
                </tr>
                <tr style="background:#F0F5FF;">
                  <td style="padding:14px 20px;font-size:12px;font-weight:700;color:#1251AA;text-transform:uppercase;letter-spacing:0.1em;vertical-align:top;">Message</td>
                  <td style="padding:14px 20px;font-size:15px;color:#374151;line-height:1.6;">${data.message}</td>
                </tr>
              </table>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;">
                <tr>
                  <td align="center">
                    <a href="mailto:${data.email}?subject=Re: Your Enquiry at My Learning Planet"
                       style="display:inline-block;background:linear-gradient(135deg,#0A1F5E,#1251AA);color:#ffffff;font-size:15px;font-weight:700;padding:14px 36px;border-radius:50px;text-decoration:none;letter-spacing:0.03em;">
                      Reply to ${data.name} →
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#F8FAFF;padding:24px 48px;text-align:center;border-top:1px solid #E0EAFF;">
              <p style="margin:0;color:#9CA3AF;font-size:12px;">This is an automated notification from <strong style="color:#1251AA;">mylearningplanet.in</strong></p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function userEmailHtml(name: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>We've Received Your Message</title>
</head>
<body style="margin:0;padding:0;background:#F0F5FF;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F0F5FF;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 8px 40px rgba(18,81,170,0.12);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0A1F5E,#1251AA);padding:48px;text-align:center;">
              <p style="margin:0 0 6px;color:rgba(255,255,255,0.65);font-size:12px;letter-spacing:0.15em;text-transform:uppercase;">My Learning Planet</p>
              <h1 style="margin:0 0 12px;color:#ffffff;font-size:32px;font-weight:700;">We've Got Your Message! ✓</h1>
              <p style="margin:0;color:rgba(255,255,255,0.75);font-size:15px;line-height:1.6;">Thank you for reaching out, ${name}. We're excited to connect with you.</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:48px;">

              <p style="margin:0 0 24px;color:#374151;font-size:16px;line-height:1.7;">
                Hi <strong style="color:#0A1F5E;">${name}</strong>,
              </p>
              <p style="margin:0 0 24px;color:#374151;font-size:16px;line-height:1.7;">
                Thank you for getting in touch with <strong style="color:#1251AA;">My Learning Planet</strong>. Your message has been received and our team is already on it!
              </p>

              <!-- What happens next box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#F0F5FF;border-radius:16px;margin-bottom:32px;overflow:hidden;">
                <tr>
                  <td style="padding:28px 32px;">
                    <p style="margin:0 0 20px;font-size:13px;font-weight:700;color:#1251AA;text-transform:uppercase;letter-spacing:0.12em;">What happens next?</p>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:8px 0;">
                          <table cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="width:32px;height:32px;background:#1251AA;border-radius:50%;text-align:center;vertical-align:middle;">
                                <span style="color:#ffffff;font-size:14px;font-weight:700;">1</span>
                              </td>
                              <td style="padding-left:14px;color:#374151;font-size:15px;line-height:1.5;">Our team reviews your enquiry within <strong>2–4 hours</strong>.</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;">
                          <table cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="width:32px;height:32px;background:#1251AA;border-radius:50%;text-align:center;vertical-align:middle;">
                                <span style="color:#ffffff;font-size:14px;font-weight:700;">2</span>
                              </td>
                              <td style="padding-left:14px;color:#374151;font-size:15px;line-height:1.5;">We'll reach out via <strong>WhatsApp or Email</strong> to schedule your free demo.</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;">
                          <table cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="width:32px;height:32px;background:#F5A623;border-radius:50%;text-align:center;vertical-align:middle;">
                                <span style="color:#ffffff;font-size:14px;font-weight:700;">3</span>
                              </td>
                              <td style="padding-left:14px;color:#374151;font-size:15px;line-height:1.5;">Your child attends a <strong>free 45-minute demo class</strong> — no payment required.</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Direct Contact -->
              <p style="margin:0 0 8px;color:#374151;font-size:15px;">Can't wait? Reach us directly:</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr>
                  <td style="padding:6px 0;">
                    <a href="https://wa.me/919899389313" style="color:#1251AA;font-size:15px;font-weight:600;text-decoration:none;">📱 WhatsApp: +91-9899389313</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;">
                    <a href="mailto:connect@mylearningplanet.in" style="color:#1251AA;font-size:15px;font-weight:600;text-decoration:none;">✉️ Email: connect@mylearningplanet.in</a>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="https://mylearningplanet.in"
                       style="display:inline-block;background:linear-gradient(135deg,#0A1F5E,#1251AA);color:#ffffff;font-size:15px;font-weight:700;padding:14px 40px;border-radius:50px;text-decoration:none;">
                      Visit My Learning Planet →
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Warm sign-off -->
          <tr>
            <td style="padding:0 48px 40px;">
              <p style="margin:0;color:#374151;font-size:16px;line-height:1.7;">
                Warm regards,<br/>
                <strong style="color:#0A1F5E;">Mitali & The My Learning Planet Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#F8FAFF;padding:24px 48px;text-align:center;border-top:1px solid #E0EAFF;">
              <p style="margin:0 0 6px;color:#9CA3AF;font-size:12px;">
                © 2025 My Learning Planet · Gurugram, Haryana, India
              </p>
              <p style="margin:0;color:#9CA3AF;font-size:12px;">
                <a href="https://mylearningplanet.in/privacy-policy" style="color:#1251AA;text-decoration:none;">Privacy Policy</a>
                &nbsp;·&nbsp;
                <a href="https://mylearningplanet.in/terms-of-service" style="color:#1251AA;text-decoration:none;">Terms of Service</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, grade, message } = body;

    // Basic server-side validation
    if (!name || !email || !phone || !grade || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }
    const phoneRegex = /^[+]?[\d\s\-().]{7,15}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json({ error: 'Invalid phone number.' }, { status: 400 });
    }

    // Send notification to owner
    await transporter.sendMail({
      from: `"My Learning Planet Website" <connect@mylearningplanet.in>`,
      to: 'connect@mylearningplanet.in',
      subject: `🎓 New Enquiry from ${name} — My Learning Planet`,
      html: ownerEmailHtml({ name, email, phone, grade, message }),
    });

    // Send confirmation to user
    await transporter.sendMail({
      from: `"My Learning Planet" <connect@mylearningplanet.in>`,
      to: email,
      subject: `We've received your message, ${name}! — My Learning Planet`,
      html: userEmailHtml(name),
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Contact form email error:', err);
    return NextResponse.json({ error: 'Failed to send email. Please try again.' }, { status: 500 });
  }
}
