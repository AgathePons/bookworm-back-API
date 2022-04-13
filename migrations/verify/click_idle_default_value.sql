-- Verify bookworm:click_idle_default_value on pg

BEGIN;

SELECT idle_value FROM player WHERE false;

SELECT click_value FROM player WHERE false;

ROLLBACK;
