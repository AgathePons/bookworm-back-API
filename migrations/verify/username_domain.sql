-- Verify bookworm:username_domain on pg


BEGIN;

SELECT username FROM player WHERE false;

ROLLBACK;
