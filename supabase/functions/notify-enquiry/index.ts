import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

serve(async (req) => {
  try {
    const { record } = await req.json()

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: ['ammar@ammarbass.com'],
        subject: `New private session enquiry from ${record.name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1C1410;">New Private Session Enquiry</h2>
            <div style="background: #F4EFE6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${record.name}</p>
              <p><strong>Email:</strong> <a href="mailto:${record.email}">${record.email}</a></p>
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap;">${record.message}</p>
              <p style="color: #6B5740; font-size: 12px; margin-top: 20px;">
                <strong>Submitted:</strong> ${record.created_at}
              </p>
            </div>
            <p style="color: #6B5740; font-size: 14px;">
              Reply directly to <a href="mailto:${record.email}">${record.email}</a>
            </p>
          </div>
        `
      })
    })

    const data = await res.json()

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400
    })
  }
})
