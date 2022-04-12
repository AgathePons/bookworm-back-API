-- Deploy bookworm:column_icon to pg

BEGIN;

ALTER TABLE generator
ADD COLUMN icon TEXT UNIQUE NOT NULL;

COMMIT;
