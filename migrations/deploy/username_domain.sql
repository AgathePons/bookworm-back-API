-- Deploy bookworm:username_domain to pg
BEGIN;

CREATE DOMAIN valid_username AS TEXT
CHECK(
  VALUE ~ '[A-Za-z0-9]{3,15}$'
);
ALTER TABLE player
  ALTER COLUMN username TYPE valid_username;

COMMIT;
