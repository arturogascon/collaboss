## Migrations

Plain, hand-run SQL files documenting how to create the schema — there is no migration runner in this project (see `CLAUDE.md`). Run them in numeric order against the `collaboss` database after `docker-compose up -d`:

```bash
docker exec -i mysql-local mysql -uroot -p"$DB_PASSWORD" collaboss < db/migrations/0001_create_users_table.sql
docker exec -i mysql-local mysql -uroot -p"$DB_PASSWORD" collaboss < db/migrations/0002_create_dashboards_table.sql
docker exec -i mysql-local mysql -uroot -p"$DB_PASSWORD" collaboss < db/migrations/0003_create_cards_table.sql
docker exec -i mysql-local mysql -uroot -p"$DB_PASSWORD" collaboss < db/migrations/0004_add_description_color_updated_at_to_dashboards.sql
docker exec -i mysql-local mysql -uroot -p"$DB_PASSWORD" collaboss < db/migrations/0005_rename_dashboards_date_add_cards_timestamps.sql
docker exec -i mysql-local mysql -uroot -p"$DB_PASSWORD" collaboss < db/migrations/0006_add_color_cards.sql
```

Requires MySQL 8.0.13+ (`mysql:8`, per `docker-compose.yml`) for the `DEFAULT (UUID())` expression on the `id` columns.

Order matters: `dashboards` has a foreign key to `users`, and `cards` has a foreign key to `dashboards`.
