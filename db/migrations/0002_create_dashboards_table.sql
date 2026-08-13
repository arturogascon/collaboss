-- Creates the `dashboards` table.
-- Depends on: 0001_create_users_table.sql (user_id foreign key).

CREATE TABLE dashboards (
  id CHAR(36) NOT NULL DEFAULT (UUID()) PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  title VARCHAR(255) NOT NULL,
  date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
