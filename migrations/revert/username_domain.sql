-- Revert bookworm:username_domain from pg
BEGIN;

ALTER TABLE player
  ALTER COLUMN username TYPE TEXT;

DROP DOMAIN valid_username;

COMMIT;
