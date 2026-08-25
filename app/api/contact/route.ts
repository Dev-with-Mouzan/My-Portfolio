import { NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: "Email service is not configured." }, { status: 503 })
  }
  const resend = new Resend(apiKey)

  try {
    const body = await request.json()
    const name = typeof body.name === "string" ? body.name.trim().slice(0, 120) : ""
    const email = typeof body.email === "string" ? body.email.trim().slice(0, 200) : ""
    const subject = typeof body.subject === "string" ? body.subject.trim().slice(0, 200) : ""
    const message = typeof body.message === "string" ? body.message.trim().slice(0, 5000) : ""

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 })
    }

    const to = process.env.CONTACT_TO_EMAIL || ""
    if (!to) {
      return NextResponse.json({ error: "Recipient email is not configured." }, { status: 500 })
    }

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [to],
      replyTo: email,
      subject: `${subject} — from ${name}`,
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#141413;color:#e8e5dc;border-radius:12px;border:1px solid #302f2c;">
          <p style="margin:0 0 16px;font-size:13px;color:#9b9589;">New message from your portfolio contact form</p>
          <h2 style="margin:0 0 20px;font-size:20px;color:#d97757;">${escapeHtml(subject)}</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr>
              <td style="padding:8px 0;color:#9b9589;width:80px;">Name</td>
              <td style="padding:8px 0;"><strong>${escapeHtml(name)}</strong></td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#9b9589;">Email</td>
              <td style="padding:8px 0;"><a href="mailto:${escapeHtml(email)}" style="color:#d97757;">${escapeHtml(email)}</a></td>
            </tr>
          </table>
          <div style="margin-top:16px;padding:16px;background:#1e1e1c;border-radius:8px;border-left:3px solid #d97757;white-space:pre-wrap;line-height:1.6;">
            ${escapeHtml(message)}
          </div>
        </div>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ error: "Failed to send message." }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("Contact API error:", err)
    return NextResponse.json({ error: "Invalid request." }, { status: 400 })
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}
