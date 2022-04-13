-- Verify bookworm:player_currency on pg

BEGIN;

SELECT currency FROM player WHERE false;

ROLLBACK;
