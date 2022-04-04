-- Verify bookworm:mail_domain on pg

BEGIN;

SELECT mail FROM player WHERE false;

ROLLBACK;
