-- Verify bookworm:generator_percent_to_real on pg

BEGIN;

SELECT clic_percent_value FROM generator WHERE false;

SELECT idle_percent_value FROM generator WHERE false;

ROLLBACK;
