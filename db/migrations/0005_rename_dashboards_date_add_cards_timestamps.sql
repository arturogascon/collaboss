-- Renames the `dashboards.date` column to `created_date`, and adds
-- `created_at`/`updated_at` columns to the `cards` table.
-- Depends on: 0002_create_dashboards_table.sql, 0003_create_cards_table.sql.

ALTER TABLE dashboards
  RENAME COLUMN date TO created_date;

ALTER TABLE cards
  ADD COLUMN created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ADD COLUMN updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
