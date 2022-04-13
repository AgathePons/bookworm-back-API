-- Deploy bookworm:fix_currency_type to pg

BEGIN;



ALTER TABLE player
ALTER COLUMN currency TYPE BIGINT;

COMMIT;
