-- Deploy bookworm:generator_percent_to_real to pg

BEGIN;

ALTER TABLE generator
ALTER COLUMN clic_percent_value TYPE REAL;

ALTER TABLE generator
ALTER COLUMN idle_percent_value TYPE REAL;

COMMIT;
