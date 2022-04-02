-- Deploy bookworm:cost_factor_to_real to pg

BEGIN;

ALTER TABLE generator
ALTER COLUMN cost_factor TYPE REAL;

COMMIT;
