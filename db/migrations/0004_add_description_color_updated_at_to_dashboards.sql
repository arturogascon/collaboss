-- Adds `description`, `color`, and `updated_at` columns to the `dashboards` table.
-- Depends on: 0002_create_dashboards_table.sql.
--
-- `description` and `color` are nullable: existing rows have neither, and the
-- app falls back to a computed color when `color` is NULL.
-- `color` stores a short key (one of "blue", "purple", "green", "pink",
-- "orange", "teal") rather than a hex value or CSS class, so the UI stays
-- free to change how each key is rendered.
--
-- Postgres has no `ON UPDATE CURRENT_TIMESTAMP` column option (unlike MySQL),
-- so `updated_at` is kept current via a trigger calling `set_updated_at()`,
-- a shared function reused by later migrations for other tables.

-- Up Migration

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

ALTER TABLE dashboards
  ADD COLUMN description TEXT NULL DEFAULT NULL,
  ADD COLUMN color VARCHAR(20) NULL DEFAULT NULL,
  ADD COLUMN updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

CREATE TRIGGER dashboards_set_updated_at
  BEFORE UPDATE ON dashboards
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();

-- Down Migration

DROP TRIGGER IF EXISTS dashboards_set_updated_at ON dashboards;

ALTER TABLE dashboards
  DROP COLUMN updated_at,
  DROP COLUMN color,
  DROP COLUMN description;

-- Dropped last: 0005_rename_dashboards_date_add_cards_timestamps.sql's down
-- migration also depends on this function and runs before this one during
-- a rollback, so `cards_set_updated_at` will already be gone by this point.
DROP FUNCTION IF EXISTS set_updated_at();
