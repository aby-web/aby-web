-- Remove rows created while verifying the RLS lockdown.
DELETE FROM private_enquiries WHERE email = 'rls-test@example.com';
DELETE FROM guide_views WHERE guide_slug = 'rls-test';
