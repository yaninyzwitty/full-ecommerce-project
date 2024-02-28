-- seller account 
CREATE TABLE IF NOT EXISTS sellers (
    name TEXT,
    user_id TEXT,
    id UUID PRIMARY KEY,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    store_id TEXT,
    description TEXT
);

CREATE CUSTOM INDEX by_store_id ON sellers (store_id) USING 'StorageAttachedIndex';

CREATE CUSTOM INDEX by_user_id ON sellers (user_id) USING 'StorageAttachedIndex';

CREATE CUSTOM INDEX by_stores_id ON product_by_seller (store_id) USING 'StorageAttachedIndex';

CREATE TABLE product_by_seller (
    product_id UUID PRIMARY KEY,
    name TEXT,
    description TEXT,
    price DECIMAL,
    store_id TEXT,
    category TEXT,
    is_published BOOLEAN,
    subcategorys
    SET
        < TEXT >,
        colors
    SET
        < TEXT >,
        size TEXT,
        images
    SET
        < TEXT >,
        in_stock BOOLEAN,
        availability MAP < TEXT,
        INT >,
        --store , the amount
        created_at TIMESTAMP,
        updated_at TIMESTAMP
);

CREATE STREAM inventory_stream (
    id VARCHAR KEY,
    item VARCHAR,
    quantity INTEGER
) WITH (
    VALUE_FORMAT = 'JSON',
    KAFKA_TOPIC = 'inventory',
    PARTITIONS = 6
);

CREATE TABLE inventory_stream_table WITH (KAFKA_TOPIC = 'inventory_table') AS
SELECT
    item,
    SUM(quantity) AS item_quantity
FROM
    inventory_stream
GROUP BY
    item EMIT CHANGES;

-- Removing the 'email' column
ALTER TABLE
    product_by_seller DROP product_by_seller;

-- Adding the 'phone_number' column
ALTER TABLE
    product_by_seller
ADD
    subcategorys
set
    < text >;

ALTER TABLE
    product_by_seller DROP color;

-- Adding the 'phone_number' column
ALTER TABLE
    product_by_seller
ADD
    colors
set
    < text >;

ALTER TABLE
    product_by_seller
ADD
    is_published boolean