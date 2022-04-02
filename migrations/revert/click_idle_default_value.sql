-- Revert bookworm:click_idle_default_value from pg

BEGIN;

ALTER TABLE player
ALTER COLUMN idle_value SET DEFAULT 1;

ALTER TABLE player
ALTER COLUMN click_value SET DEFAULT 0;

COMMIT;
