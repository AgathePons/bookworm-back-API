-- Verify bookworm:init on pg

BEGIN;

SELECT * FROM player WHERE false;
SELECT * FROM generator WHERE false;
SELECT * FROM sentences WHERE false;
SELECT * FROM player_owns_generator WHERE false;

ROLLBACK;
