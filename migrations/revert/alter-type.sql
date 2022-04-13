-- Revert bookworm:alter-type from pg
BEGIN;

ALTER TABLE generator
ALTER COLUMN starting_cost TYPE INT;

ALTER TABLE generator
ALTER COLUMN idle_flat_value TYPE INT;

ALTER TABLE generator
ALTER COLUMN clic_flat_value TYPE INT;

COMMIT;
