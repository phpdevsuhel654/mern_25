# Database Migrations

Phase 2 provides the initial normalized MySQL schema.

## Files

- migrations/001_create_core_schema.sql
- migrations/001_drop_core_schema.sql

## Run Migration

```sql
SOURCE backend/database/migrations/001_create_core_schema.sql;
```

## Rollback

```sql
SOURCE backend/database/migrations/001_drop_core_schema.sql;
```

## Notes

- Target engine: MySQL 8.0+
- Charset/Collation: utf8mb4 / utf8mb4_unicode_ci
- Includes FK constraints, unique keys, composite indexes, and CHECK constraints
