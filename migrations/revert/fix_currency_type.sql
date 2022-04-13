-- Revert bookworm:fix_currency_type from pg


BEGIN;



ALTER TABLE player
ALTER COLUMN currency TYPE INT;

COMMIT;
