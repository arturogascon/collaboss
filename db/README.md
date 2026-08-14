## Migrations

Plain, hand-run SQL files documenting how to create the schema — there is no migration runner in this project (see `CLAUDE.md`). Run them in numeric order against the `collaboss` database after `docker-compose up -d`:

```bash
docker exec -i postgres-local psql -U "$DB_USER" -d collaboss < db/migrations/0001_create_users_table.sql
docker exec -i postgres-local psql -U "$DB_USER" -d collaboss < db/migrations/0002_create_dashboards_table.sql
docker exec -i postgres-local psql -U "$DB_USER" -d collaboss < db/migrations/0003_create_cards_table.sql
docker exec -i postgres-local psql -U "$DB_USER" -d collaboss < db/migrations/0004_add_description_color_updated_at_to_dashboards.sql
docker exec -i postgres-local psql -U "$DB_USER" -d collaboss < db/migrations/0005_rename_dashboards_date_add_cards_timestamps.sql
docker exec -i postgres-local psql -U "$DB_USER" -d collaboss < db/migrations/0006_add_color_cards.sql
```

Requires PostgreSQL 13+ (`postgres:16`, per `docker-compose.yml`) for the built-in `gen_random_uuid()` function used as the `DEFAULT` on `id` columns — no extension needs to be created for it.

Order matters: `dashboards` has a foreign key to `users`, and `cards` has a foreign key to `dashboards`. Migration `0004` also defines the shared `set_updated_at()` trigger function that `0004` and `0005` attach to `dashboards`/`cards` to keep `updated_at` current (Postgres has no `ON UPDATE CURRENT_TIMESTAMP` column option like MySQL).
