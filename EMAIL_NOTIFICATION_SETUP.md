# Email Notification Setup for Private Enquiries

This guide will help you set up automatic email notifications when someone submits a private session enquiry.

## Option 1: Supabase Database Webhooks (Recommended - Simplest)

### Step 1: Set up Resend Account
1. Go to https://resend.com and sign up for a free account
2. Verify your email domain (or use resend's onboarding@resend.dev for testing)
3. Get your API key from the dashboard

### Step 2: Create Webhook Endpoint
1. Go to your Supabase dashboard
2. Navigate to Database → Webhooks
3. Click "Create a new webhook"
4. Configure:
   - **Table**: `private_enquiries`
   - **Events**: `INSERT`
   - **Type**: `HTTP Request`
   - **HTTP Method**: `POST`
   - **URL**: `https://api.resend.com/emails`
   - **HTTP Headers**:
     ```
     Authorization: Bearer YOUR_RESEND_API_KEY
     Content-Type: application/json
     ```
   - **Payload**: (Template in next section)

### Step 3: Webhook Payload Template
```json
{
  "from": "onboarding@resend.dev",
  "to": ["ammar@ammarbass.com"],
  "subject": "New private session enquiry from {{ record.name }}",
  "html": "<h2>New Private Session Enquiry</h2><p><strong>Name:</strong> {{ record.name }}</p><p><strong>Email:</strong> {{ record.email }}</p><p><strong>Message:</strong><br>{{ record.message }}</p><p><strong>Submitted:</strong> {{ record.created_at }}</p>"
}
```

## Option 2: Supabase Edge Function (More Control)

### Step 1: Install Supabase CLI
```bash
npm install -g supabase
```

### Step 2: Login and Init
```bash
supabase login
cd ~/Desktop/aby-web
supabase functions new notify-enquiry
```

### Step 3: Create Edge Function
Create file: `supabase/functions/notify-enquiry/index.ts`

```typescript
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
          <h2>New Private Session Enquiry</h2>
          <p><strong>Name:</strong> ${record.name}</p>
          <p><strong>Email:</strong> ${record.email}</p>
          <p><strong>Message:</strong><br>${record.message}</p>
          <p><strong>Submitted:</strong> ${record.created_at}</p>
          <hr>
          <p>Reply directly to: ${record.email}</p>
        `
      })
    })

    return new Response(JSON.stringify({ success: true }), {
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
```

### Step 4: Deploy Edge Function
```bash
supabase functions deploy notify-enquiry --no-verify-jwt
```

### Step 5: Set Environment Variable
In Supabase Dashboard → Edge Functions → Settings:
- Add secret: `RESEND_API_KEY` with your Resend API key

### Step 6: Create Database Trigger
Run this SQL in Supabase SQL Editor:

```sql
CREATE OR REPLACE FUNCTION notify_private_enquiry()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM
    net.http_post(
      url := 'YOUR_EDGE_FUNCTION_URL',
      headers := '{"Content-Type": "application/json"}'::jsonb,
      body := jsonb_build_object('record', to_jsonb(NEW))
    );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_private_enquiry_created
  AFTER INSERT ON private_enquiries
  FOR EACH ROW
  EXECUTE FUNCTION notify_private_enquiry();
```

## Testing

1. Go to `/private-sessions` on your website
2. Fill out the contact form
3. Submit
4. Check your email (ammar@ammarbass.com)

## Troubleshooting

- **Not receiving emails?** Check your Resend dashboard for delivery status
- **Webhook not firing?** Check Supabase Dashboard → Database → Webhooks for logs
- **Edge function errors?** Check Supabase Dashboard → Edge Functions → Logs

## Notes

- Resend free tier: 3,000 emails/month
- Database webhooks are simpler but less flexible
- Edge functions give you more control over email formatting
- Consider upgrading Resend to use your own domain (from@ammarbass.com)
