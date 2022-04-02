-- Deploy bookworm:player_currency to pg

BEGIN;

ALTER TABLE player
ADD COLUMN currency INT NOT NULL DEFAULT 0;

COMMIT;
