-- Create function to call Edge Function when new enquiry is inserted
CREATE OR REPLACE FUNCTION notify_private_enquiry()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM
    net.http_post(
      url := 'https://kfwqxmhxmclsdbvncrre.supabase.co/functions/v1/notify-enquiry',
      headers := '{"Content-Type": "application/json", "Authorization": "Bearer YOUR_SUPABASE_SERVICE_ROLE_KEY"}'::jsonb,
      body := jsonb_build_object('record', to_jsonb(NEW))
    );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER on_private_enquiry_created
  AFTER INSERT ON private_enquiries
  FOR EACH ROW
  EXECUTE FUNCTION notify_private_enquiry();
