-- Deploy bookworm:drop_next_cost to pg

BEGIN;

ALTER TABLE player_owns_generator DROP COLUMN next_cost;

COMMIT;
