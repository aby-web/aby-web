 import "jsr:@supabase/functions-js/edge-runtime.d.ts";

  const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

  Deno.serve(async (req) => {
    try {
      const body = await req.json();
      const record = body.record || body;

      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: 'noreply@ammarbass.com',
          to: ['gammar@gmail.com'], // internal notification only; clients see ammar@ammarbass.com
          subject: `New subscriber: ${record.email || 'unknown'}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #1C1410;">New Subscriber</h2>
              <div style="background: #F4EFE6; padding: 20px; border-radius: 8px;">
                <p><strong>Email:</strong> ${record.email || 'unknown'}</p>
                <p><strong>Source:</strong> ${record.source || 'unknown'}</p>
              </div>
            </div>
          `
        })
      });

      const data = await res.json();
      return new Response(JSON.stringify({ success: true, data }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400
      });
    }
  });

