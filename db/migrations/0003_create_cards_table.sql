-- Creates the `cards` table.
-- Depends on: 0002_create_dashboards_table.sql (dashboard_id foreign key).
--
-- `image` is nullable: a card is not required to have an image.

-- Up Migration

CREATE TABLE cards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  dashboard_id UUID NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(255) NULL DEFAULT NULL,
  FOREIGN KEY (dashboard_id) REFERENCES dashboards(id) ON DELETE CASCADE
);

-- Down Migration

DROP TABLE cards;
