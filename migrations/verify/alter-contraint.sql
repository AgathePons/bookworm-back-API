-- Verify bookworm:alter-contraint on pgBEGIN;

SELECT clic_flat_value FROM generator WHERE false;

SELECT idle_flat_value FROM generator WHERE false;

SELECT starting_cost FROM generator WHERE false;

SELECT icon FROM generator WHERE false;

ROLLBACK;
