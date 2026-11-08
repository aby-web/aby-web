import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }

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
        from: 'Ammar Bass <noreply@ammarbass.com>',
        to: [record.email],
        // Replies reach Ammar rather than the unmonitored noreply address.
        reply_to: 'ammar@ammarbass.com',
        subject: 'Good to have you here',
        html: `
          <div style="font-family: Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #000000; font-size: 13px; line-height: 1.4;">
            <p style="margin: 0 0 12px;">Hey,</p>
            <p style="margin: 0 0 12px;">Good to have you here.</p>
            <p style="margin: 0 0 12px;">When something's on, you'll hear about it first. Classes, workshops, retreats.</p>
            <p style="margin: 0 0 12px;">Anything you need, just get in touch.</p>
            <p style="margin: 0 0 24px;">See you on the mat.</p>

            <hr style="border: none; border-top: 1px solid #CCCCCC; margin-bottom: 16px;" />

            <p style="margin: 0 0 2px; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em;">AMMAR BASS</p>
            <p style="margin: 0 0 12px; font-size: 10px; font-weight: normal;">Yoga Teacher</p>

            <p style="margin: 0 0 4px; font-size: 11px;">W. <a href="https://ammarbass.com" style="color: #000000; text-decoration: none;">ammarbass.com</a></p>
            <p style="margin: 0 0 4px; font-size: 11px;">E. <a href="mailto:ammar@ammarbass.com" style="color: #000000; text-decoration: none;">ammar@ammarbass.com</a></p>
            <p style="margin: 0 0 12px; font-size: 11px;">IG. <a href="https://instagram.com/ammarbass" style="color: #000000; text-decoration: none;">@ammarbass</a></p>

            <p style="margin: 0; font-size: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.08em;">WORKSHOPS • RETREATS • CLASSES • PRIVATE SESSIONS</p>
          </div>
        `
      })
    });

    const data = await res.json();
    return new Response(JSON.stringify({ success: true, data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400
    });
  }
});