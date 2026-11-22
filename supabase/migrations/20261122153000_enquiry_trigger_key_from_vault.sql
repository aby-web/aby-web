-- APPLIED 22 Nov 2026, at Ammar's request.
--
-- The enquiry trigger function held a Supabase secret key in plain text in its
-- body. The key now lives in the Vault under the name `notify_enquiry_key`,
-- and the function reads it from there each time.
--
-- When this was applied, the existing key was copied into the Vault inside the
-- database (so its value never left it), with:
--
--   SELECT vault.create_secret(<the key found in the old function body>,
--     'notify_enquiry_key',
--     'API key the enquiry trigger sends to the notify-enquiry function');
--
-- That statement is not repeated here because it would need the key.
-- To put a new key in:  Supabase > Integrations > Vault > notify_enquiry_key > edit,
-- or:  SELECT vault.update_secret((SELECT id FROM vault.secrets WHERE name = 'notify_enquiry_key'), '<new key>');
--
-- The function is now SECURITY DEFINER (it must be, to read the Vault) with an
-- empty search_path, and it never blocks an enquiry: if the key is missing or
-- the email cannot be queued, the enquiry is still saved and a warning is logged.
--
-- Dry run before applying (rolled back): the old and the new function each
-- queued one request, with identical address, method and headers.
-- After applying: a form-style test enquiry was saved (201) and its email call
-- was accepted (200); the test row was then deleted.

CREATE OR REPLACE FUNCTION public.notify_enquiry_on_insert()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = ''
AS $function$
  declare
    api_key text;
  begin
    -- The key lives in the Vault (encrypted), not in this function.
    select decrypted_secret into api_key
      from vault.decrypted_secrets
     where name = 'notify_enquiry_key';

    if api_key is null or api_key = '' then
      raise warning 'notify_enquiry_on_insert: Vault secret "notify_enquiry_key" is missing, so no enquiry email was sent';
      return NEW;
    end if;

    perform net.http_post(
      url := 'https://kfwqxmhxmclsdbvncrre.functions.supabase.co/notify-enquiry',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || api_key
      ),
      body := jsonb_build_object('record', to_jsonb(NEW))
    );
    return NEW;
  exception when others then
    -- An enquiry must always be saved, even if the email cannot be queued.
    raise warning 'notify_enquiry_on_insert: could not queue the enquiry email (%)', sqlerrm;
    return NEW;
  end;
  $function$;

REVOKE ALL ON FUNCTION public.notify_enquiry_on_insert() FROM PUBLIC, anon, authenticated;
