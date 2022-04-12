-- Verify bookworm:column_icon on pg

BEGIN;

SELECT icon FROM generator WHERE false;

ROLLBACK;
