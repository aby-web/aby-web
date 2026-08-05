-- Remove the row created while verifying the live deployment.
DELETE FROM subscribers WHERE email = 'live-verify@example.com';
