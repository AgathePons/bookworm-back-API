-- Verify bookworm:cost_factor_to_real on pg

BEGIN;

SELECT cost_factor FROM generator WHERE false;

ROLLBACK;
