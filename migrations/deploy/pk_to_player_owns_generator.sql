-- Deploy bookworm:pk_to_player_owns_generator to pg

BEGIN;

ALTER TABLE player_owns_generator
ADD COLUMN id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY;

COMMIT;
