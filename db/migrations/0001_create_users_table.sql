-- Creates the `users` table.

CREATE TABLE users (
  id CHAR(36) NOT NULL DEFAULT (UUID()) PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);
