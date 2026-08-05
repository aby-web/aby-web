-- Remove rows created while smoke-testing the subscribe Edge Function.
DELETE FROM subscribers WHERE email IN (
  'post-rls-check@example.com',
  'smoketest-real@example.com',
  'smoketestdots@gmail.com',
  'rls-probe@example.com'
);
