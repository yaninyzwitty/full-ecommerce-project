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

CREATE TABLE IF NOT EXISTS category_by_seller (
    categoryId UUID PRIMARY KEY,
    name TEXT,
    description TEXT,
    category_thumnail TEXT,
    category_tags
    SET
        < TEXT >,
        starred_categories
    SET
        < TEXT >,
        created_at TIMESTAMP,
        updated_at TIMESTAMP
);