-- Revert bookworm:alter-contraint from pg

BEGIN;

ALTER TABLE generator
ALTER starting_cost SET NULL;

ALTER TABLE generator
ALTER idle_flat_value SET NULL;

ALTER TABLE generator
ALTER clic_flat_value SET NULL;

ALTER TABLE generator
ALTER icon SET NULL;

COMMIT;
