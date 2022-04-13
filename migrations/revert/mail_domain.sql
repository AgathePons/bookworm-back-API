-- Revert bookworm:mail_domain from pg

BEGIN;

ALTER TABLE player
  ALTER COLUMN mail TYPE TEXT;

DROP DOMAIN valid_mail;

COMMIT;
