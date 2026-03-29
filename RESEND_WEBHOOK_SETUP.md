# Email Notification Setup - Quick Guide

## Step 1: Get Resend API Key
1. Go to https://resend.com and sign up
2. Navigate to **API Keys** in dashboard
3. Create new API key and copy it
4. For testing, you can use `onboarding@resend.dev` as sender
5. Later, verify your own domain to use `noreply@ammarbass.com`

## Step 2: Create Supabase Webhook

1. Go to your Supabase dashboard
2. Navigate to **Database** → **Webhooks**
3. Click **Create a new webhook** or **Enable Webhooks** (if first time)
4. Configure webhook:

### Webhook Configuration:

**Name:** `notify-private-enquiry`

**Table:** `private_enquiries`

**Events:** Check only `INSERT`

**Type:** `HTTP Request`

**Method:** `POST`

**URL:** `https://api.resend.com/emails`

**HTTP Headers:**
```
Authorization: Bearer YOUR_RESEND_API_KEY_HERE
Content-Type: application/json
```

**HTTP Params (Body):**
```json
{
  "from": "onboarding@resend.dev",
  "to": ["ammar@ammarbass.com"],
  "subject": "New private session enquiry from {{ record.name }}",
  "html": "<div style='font-family: sans-serif; max-width: 600px; margin: 0 auto;'><h2 style='color: #1C1410;'>New Private Session Enquiry</h2><div style='background: #F4EFE6; padding: 20px; border-radius: 8px; margin: 20px 0;'><p><strong>Name:</strong> {{ record.name }}</p><p><strong>Email:</strong> <a href='mailto:{{ record.email }}'>{{ record.email }}</a></p><p><strong>Message:</strong></p><p style='white-space: pre-wrap;'>{{ record.message }}</p><p style='color: #6B5740; font-size: 12px; margin-top: 20px;'><strong>Submitted:</strong> {{ record.created_at }}</p></div><p style='color: #6B5740; font-size: 14px;'>Reply directly to <a href='mailto:{{ record.email }}'>{{ record.email }}</a></p></div>"
}
```

5. Click **Create webhook** or **Confirm**

## Step 3: Test It

1. Go to your website: http://localhost:5173/private-sessions
2. Fill out the contact form
3. Submit
4. Check your email at ammar@ammarbass.com

## Troubleshooting

**Not receiving emails?**
- Check Resend dashboard for delivery logs
- Verify API key is correct
- Check Supabase webhook logs: Database → Webhooks → View logs

**Emails going to spam?**
- This is normal with `onboarding@resend.dev`
- Verify your domain in Resend to fix this

## Next Steps (Optional)

**Use your own domain:**
1. In Resend dashboard, go to **Domains**
2. Add `ammarbass.com`
3. Add DNS records (MX, TXT) to your domain
4. Once verified, change webhook "from" to `noreply@ammarbass.com`
