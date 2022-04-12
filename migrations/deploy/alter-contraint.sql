-- Deploy bookworm:alter-contraint to pg

BEGIN;

ALTER TABLE generator
ALTER starting_cost SET NOT NULL;

ALTER TABLE generator
ALTER idle_flat_value SET NOT NULL;

ALTER TABLE generator
ALTER clic_flat_value SET NOT NULL;

ALTER TABLE generator
ALTER icon SET NOT NULL;

COMMIT;
