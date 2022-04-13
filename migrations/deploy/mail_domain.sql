-- Deploy bookworm:mail_domain to pg

BEGIN;

CREATE DOMAIN valid_mail AS TEXT
CHECK(
  VALUE ~ '^[\w\-\+]+(\.[\w\-]+)*@[\w\-]+(\.[\w\-]+)*\.[\w\-]{2,4}$'
);
ALTER TABLE player
  ALTER COLUMN mail TYPE valid_mail;

COMMIT;
