-- Revert bookworm:generator_percent_to_real from pg

BEGIN;

ALTER TABLE generator
ALTER COLUMN clic_percent_value TYPE INTEGER;

ALTER TABLE generator
ALTER COLUMN idle_percent_value TYPE INTEGER;

COMMIT;
