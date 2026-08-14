-- Up Migration

ALTER TABLE cards
    ADD COLUMN color VARCHAR(7) NOT NULL DEFAULT 'blue';

-- Down Migration

ALTER TABLE cards
    DROP COLUMN color;
