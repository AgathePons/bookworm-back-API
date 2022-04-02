-- Revert bookworm:pk_to_player_owns_generator from pg

BEGIN;

ALTER TABLE player_owns_generator DROP COLUMN id;

COMMIT;
