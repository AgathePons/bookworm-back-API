-- Deploy bookworm:alter-type to pg
BEGIN;

ALTER TABLE generator
ALTER COLUMN starting_cost TYPE BIGINT;

ALTER TABLE generator
ALTER COLUMN idle_flat_value TYPE BIGINT;

ALTER TABLE generator
ALTER COLUMN clic_flat_value TYPE BIGINT;

COMMIT;
