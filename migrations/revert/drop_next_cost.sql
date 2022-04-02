-- Revert bookworm:drop_next_cost from pg

BEGIN;

ALTER TABLE player_owns_generator
ADD COLUMN next_cost BIGINT NOT NULL;

COMMIT;
