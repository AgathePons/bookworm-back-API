-- Verify bookworm:pk_to_player_owns_generator on pg

BEGIN;

SELECT id FROM player_owns_generator WHERE false;

ROLLBACK;
