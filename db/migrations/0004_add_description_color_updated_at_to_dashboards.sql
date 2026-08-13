-- Adds `description`, `color`, and `updated_at` columns to the `dashboards` table.
-- Depends on: 0002_create_dashboards_table.sql.
--
-- `description` and `color` are nullable: existing rows have neither, and the
-- app falls back to a computed color when `color` is NULL.
-- `color` stores a short key (one of "blue", "purple", "green", "pink",
-- "orange", "teal") rather than a hex value or CSS class, so the UI stays
-- free to change how each key is rendered.

ALTER TABLE dashboards
  ADD COLUMN description TEXT NULL DEFAULT NULL AFTER title,
  ADD COLUMN color VARCHAR(20) NULL DEFAULT NULL AFTER description,
  ADD COLUMN updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER date;
