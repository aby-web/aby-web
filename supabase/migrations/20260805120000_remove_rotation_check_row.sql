-- Remove the row created while verifying the Kit API key rotation.
DELETE FROM subscribers WHERE email = 'kit-rotation-check@example.com';
