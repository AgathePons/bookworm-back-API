-- Deploy bookworm:click_idle_default_value to pg

BEGIN;

ALTER TABLE player
ALTER COLUMN idle_value SET DEFAULT 0;

ALTER TABLE player
ALTER COLUMN click_value SET DEFAULT 1;

COMMIT;
