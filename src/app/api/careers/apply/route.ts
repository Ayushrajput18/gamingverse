import { NextRequest, NextResponse } from 'next/server'
import { resend, FROM_EMAIL } from '@/lib/resend'

interface ApplicationBody {
  name:       string
  email:      string
  portfolio:  string
  message:    string
  roleId:     string
  roleTitle:  string
}

export async function POST(req: NextRequest) {
  try {
    const body: ApplicationBody = await req.json()
    const { name, email, portfolio, message, roleTitle } = body

    if (!name || !email || !portfolio || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Send to studio hiring address
    await resend.emails.send({
      from:    `GamingVerse Careers <${FROM_EMAIL}>`,
      to:      process.env.CAREERS_EMAIL ?? 'careers@gamingversestudios.com',
      reply_to: email,
      subject: `New Application — ${roleTitle} — ${name}`,
      html: `
        <div style="font-family:monospace;background:#04040a;color:#e8e8f0;padding:32px;max-width:600px;">
          <h2 style="color:#00f5ff;letter-spacing:4px;text-transform:uppercase;font-size:16px;">
            New Application
          </h2>
          <p style="color:#ff4500;letter-spacing:3px;text-transform:uppercase;font-size:12px;">
            ${roleTitle}
          </p>
          <hr style="border-color:rgba(0,245,255,0.15);margin:20px 0;" />
          <table style="width:100%;border-collapse:collapse;">
            ${[['Name', name], ['Email', email], ['Portfolio', portfolio]].map(([k,v]) =>
              `<tr>
                <td style="padding:8px 0;color:#6a6a88;font-size:12px;letter-spacing:2px;text-transform:uppercase;width:30%;">${k}</td>
                <td style="padding:8px 0;color:#e8e8f0;font-size:14px;">${v}</td>
              </tr>`
            ).join('')}
          </table>
          <div style="margin-top:24px;">
            <div style="color:#6a6a88;font-size:12px;letter-spacing:2px;text-transform:uppercase;margin-bottom:8px;">Message</div>
            <div style="color:#e8e8f0;font-size:14px;line-height:1.7;white-space:pre-wrap;">${message}</div>
          </div>
        </div>
      `,
      text: `New Application — ${roleTitle}\n\nName: ${name}\nEmail: ${email}\nPortfolio: ${portfolio}\n\n${message}`,
    })

    // Send confirmation to applicant
    await resend.emails.send({
      from:    `GamingVerse Studios <${FROM_EMAIL}>`,
      to:      email,
      subject: `We received your application — ${roleTitle}`,
      html: `
        <div style="font-family:monospace;background:#04040a;color:#e8e8f0;padding:32px;max-width:560px;">
          <div style="font-size:20px;font-weight:900;color:#00f5ff;letter-spacing:6px;text-transform:uppercase;margin-bottom:24px;">
            GAMING<span style="color:#ff4500;">VERSE</span>
          </div>
          <h2 style="color:#e8e8f0;font-size:18px;letter-spacing:2px;text-transform:uppercase;">
            Application Received
          </h2>
          <p style="color:#6a6a88;font-size:15px;line-height:1.7;">
            Hey ${name}, thanks for applying for <strong style="color:#e8e8f0;">${roleTitle}</strong> at GamingVerse Studios.
          </p>
          <p style="color:#6a6a88;font-size:15px;line-height:1.7;">
            We review every application personally and take hiring seriously. If your background is a strong match
            you will hear from us within two weeks.
          </p>
          <p style="color:#6a6a88;font-size:15px;line-height:1.7;">
            In the meantime, feel free to explore our games at 
            <a href="${process.env.NEXT_PUBLIC_BASE_URL}/games" style="color:#00f5ff;">gamingversestudios.com/games</a>.
          </p>
          <p style="color:#3a3a4a;font-size:11px;margin-top:32px;letter-spacing:2px;">
            © ${new Date().getFullYear()} GamingVerse Studios
          </p>
        </div>
      `,
      text: `Hey ${name},\n\nThanks for applying for ${roleTitle} at GamingVerse Studios.\n\nWe review every application personally and will be in touch within two weeks if there's a strong match.\n\n— GamingVerse Studios`,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[careers/apply]', err)
    return NextResponse.json({ error: 'Failed to send application' }, { status: 500 })
  }
}
