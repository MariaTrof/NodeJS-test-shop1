-- Таблица для товаров
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    plu VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL
);
-- Таблица для магазинов
CREATE TABLE shops (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);
-- Таблица для остатков товаров
CREATE TABLE stocks (
    id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    shop_id INT REFERENCES shops(id) ON DELETE CASCADE,
    quantity_on_shelf INT DEFAULT 0,
    quantity_in_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Таблица для истории действий с товарами
CREATE TABLE action_histories (
    id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    shop_id INT REFERENCES shops(id) ON DELETE CASCADE,
    action VARCHAR(50) NOT NULL,
    action_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Заполняем таблицу 
INSERT INTO products (plu, name)
VALUES ('12345', 'Product One'),
    ('23456', 'Product Two'),
    ('34567', 'Product Three');
INSERT INTO products (plu, name)
VALUES ('123454125525', 'Product'),
    ('23wifn456', 'Product 512'),
    ('fhfhhfh34567', 'Product Another One');
--Проверяем данные
SELECT *
FROM products;
INSERT INTO shops (id, name)
VALUES ('14', 'Shop One'),
    ('23', 'Top Shop'),
    ('34', 'Shop Wood');
INSERT INTO stocks (
        id,
        product_id,
        shop_id,
        quantity_on_shelf,
        quantity_in_order,
        created_at
    )
VALUES ('15000', '1', '14', '10', '2', '20.02.2020'),
    ('1444', '2', '14', '1', '20', '10.05.2022'),
    ('1000', '3', '14', '50', '2', '2.12.2023'),
    ('13000', '4', '23', '15', '5', '20.02.2024'),
    ('1200', '5', '34', '10', '20', '20.02.2020'),
    ('130', '6', '23', '10', '4', '20.02.2020');


    --
    ALTER TABLE action_histories ADD COLUMN stock_id INT REFERENCES stocks(id) ON DELETE CASCADE;
ALTER TABLE stocks RENAME COLUMN created_at TO createdAt;
