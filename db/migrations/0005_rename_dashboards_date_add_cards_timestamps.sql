-- Renames the `dashboards.date` column to `created_date`, and adds
-- `created_at`/`updated_at` columns to the `cards` table.
-- Depends on: 0002_create_dashboards_table.sql, 0003_create_cards_table.sql,
-- 0004_add_description_color_updated_at_to_dashboards.sql (set_updated_at()).

-- Up Migration

ALTER TABLE dashboards
  RENAME COLUMN date TO created_date;

ALTER TABLE cards
  ADD COLUMN created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ADD COLUMN updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

CREATE TRIGGER cards_set_updated_at
  BEFORE UPDATE ON cards
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();

-- Down Migration

DROP TRIGGER IF EXISTS cards_set_updated_at ON cards;

ALTER TABLE cards
  DROP COLUMN updated_at,
  DROP COLUMN created_at;

ALTER TABLE dashboards
  RENAME COLUMN created_date TO date;
