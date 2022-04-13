-- Revert bookworm:cost_factor_to_real from pg

BEGIN;

ALTER TABLE generator
ALTER COLUMN cost_factor TYPE INTEGER;

COMMIT;
