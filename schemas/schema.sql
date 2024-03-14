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

ALTER TABLE
    product_by_seller
ADD
    inventory INT;

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

CREATE CUSTOM INDEX by_storeid ON category_by_seller (store_id) USING 'StorageAttachedIndex';

ALTER TABLE
    category_by_seller
ADD
    isPublished BOOLEAN;

ALTER TABLE
    category_by_seller
ADD
    store_id TEXT;

ALTER TABLE
    product_by_seller
ADD
    stock_level TEXT;

CREATE TABLE seller_location (
    seller_id TEXT PRIMARY KEY,
    seller_name TEXT,
    city TEXT,
    state TEXT,
    country TEXT,
    zip_code TEXT,
    latitude DOUBLE,
    longitude DOUBLE
);

CREATE TABLE IF NOT EXISTS category_by_seller (
    categoryid uuid PRIMARY KEY,
    category_tags
    set
        < text >,
        category_thumnail text,
        created_at timestamp,
        description text,
        ispublished boolean,
        name text,
        starred_categories
    set
        < text >,
        store_id text,
        updated_at timestamp
);

CREATE CUSTOM INDEX by_storeid ON shopsphere.category_by_seller (store_id) USING 'StorageAttachedIndex';

CREATE TABLE IF NOT EXISTS product_by_seller (
    product_id uuid PRIMARY KEY,
    availability map < text,
    int >,
    category text,
    colors
    set
        < text >,
        created_at timestamp,
        description text,
        images
    set
        < text >,
        in_stock boolean,
        inventory int,
        is_published boolean,
        name text,
        price decimal,
        size text,
        stock_level text,
        store_id text,
        subcategorys
    set
        < text >,
        updated_at timestamp
);

CREATE CUSTOM INDEX by_stores_id ON shopsphere.product_by_seller (store_id) USING 'StorageAttachedIndex';

CREATE TABLE IF NOT EXISTS sellers (
    id uuid PRIMARY KEY,
    created_at timestamp,
    description text,
    name text,
    store_id text,
    updated_at timestamp,
    user_id text,
    banner text,
    allow_notif boolean,
);

CREATE CUSTOM INDEX by_store_id ON shopsphere.sellers (store_id) USING 'StorageAttachedIndex';