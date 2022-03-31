-- Revert bookworm:init from pg

BEGIN;

DROP TABLE IF EXISTS "player_owns_generator",
"player",
"generator",
"sentences";

COMMIT;
