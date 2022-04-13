-- Revert bookworm:column_icon from pg
BEGIN;

ALTER TABLE generator DROP COLUMN icon;

COMMIT;
