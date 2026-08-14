-- Creates the `dashboards` table.
-- Depends on: 0001_create_users_table.sql (user_id foreign key).

-- Up Migration

CREATE TABLE dashboards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title VARCHAR(255) NOT NULL,
  date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Down Migration

DROP TABLE dashboards;
