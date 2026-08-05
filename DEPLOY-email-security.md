# Email-signup security — deployment status

Target project: **`kfwqxmhxmclsdbvncrre`** (aby-web)

## Done (live)

- [x] CLI authenticated via `SUPABASE_ACCESS_TOKEN` in `.env`, linked to the project
- [x] Secrets set: `KIT_API_KEY`, `ADMIN_PASSWORD`
- [x] `subscribe` Edge Function deployed (`--no-verify-jwt`)
- [x] `list-subscribers` Edge Function deployed (`--no-verify-jwt`)
- [x] Smoke-tested: real signup writes, duplicates collapse, honeypot/fast-submit/invalid all rejected
- [x] RLS tightened (migration `20260805100000`) — anon SELECT returns `[]`, anon INSERT returns 401
- [x] Junk rows cleaned twice: 33 on Aug 4, 9 more that arrived overnight
- [x] Kit key removed from the client bundle; verified absent from `dist/`

Subscribers table: **35 legitimate rows.** Policies: `authenticated` SELECT + DELETE only.

## Remaining

### 1. Deploy the site — REQUIRED, signup forms are currently broken

RLS now blocks the direct writes the live bundle still performs. Until the new
frontend ships, every signup form on the production site will fail. The new code
posts to the `subscribe` function instead, which is already live and working.

### 2. Rotate the Kit API key

The key currently in `.env` shipped in the public bundle for as long as the site
has been live. Treat it as compromised.

```sh
# after generating a new key in Kit:
supabase secrets set KIT_API_KEY=<new-key>
supabase functions deploy subscribe
supabase functions deploy list-subscribers
# then update KIT_API_KEY in .env
```

### 3. Revoke the Supabase access token

`SUPABASE_ACCESS_TOKEN` in `.env` is account-scoped and long-lived. Once the
deploy is finished, delete it at
https://supabase.com/dashboard/account/tokens and remove the line from `.env`.

### 4. Consider changing the admin password

`VITE_ADMIN_PASSWORD` is still the default placeholder value, and it is mirrored
into the `ADMIN_PASSWORD` function secret. If you change it, update both.

## Notes

- `.env` is gitignored and untracked — verified.
- The anon key is `sb_publishable_…`, public by design and safe to expose.
- Rollback for the RLS change, if ever needed, is to re-run the old
  `supabase-fix-subscribers-rls.sql`. Not recommended — that file is what left
  the table open to anonymous reads and deletes.
