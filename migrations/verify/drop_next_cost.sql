-- Verify bookworm:drop_next_cost on pg

BEGIN;

SELECT * FROM player_owns_generator WHERE false;

ROLLBACK;
