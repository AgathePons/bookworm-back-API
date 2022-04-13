-- Verify bookworm:fix_currency_type on pg

BEGIN;

SELECT currency FROM player WHERE false;

ROLLBACK;
