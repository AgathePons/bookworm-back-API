-- Revert bookworm:player_currency from pg

BEGIN;

ALTER TABLE player DROP COLUMN currency;

COMMIT;
