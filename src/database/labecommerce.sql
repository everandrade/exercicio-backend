-- Active: 1674840844713@@127.0.0.1@3306

--Tabela de usuários

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        createdAt TEXT
    );

INSERT INTO
    users (
        id,
        name,
        email,
        password,
        "createdAt"
    )
VALUES (
        "id01",
        "nome1",
        "id01@gmail.com",
        "password01",
        DATE("now")
    ), (
        "id02",
        "nome1",
        "id02@gmail.com",
        "password02",
        DATE("now")
    ), (
        "id03",
        "nome1",
        "id03@gmail.com",
        "password03",
        DATE("now")
    );

UPDATE users
SET
    email = "fulana@outro-email.com",
    password = "fulana00"
WHERE id = "id02";

DELETE FROM users WHERE id = "id02";

SELECT * FROM users;

--Tabela de produtos

CREATE TABLE
    products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        imageUrl TEXT NOT NULL
    );

INSERT INTO
    products (
        id,
        name,
        price,
        description,
        imageUrl
    )
VALUES (
        "idProduct01",
        "camiseta 01",
        23,
        "Camiseta Easy Em Algodão Com Estampa Listrada Preto",
        "www.imagem1.com.br"
    ), (
        "idProduct02",
        "camiseta 02",
        30,
        "Regata Easy Em Algodão Com Estampa Listrada Preto",
        "www.imagem2.com.br"
    ), (
        "idProduct03",
        "camiseta 03",
        35,
        "Camiseta Easy Em Algodão Com Estampa Listrada Preto",
        "www.imagem3.com.br"
    ), (
        "idProduct04",
        "camiseta 04",
        40,
        "Regata Easy Em Algodão Com Estampa Listrada Preto",
        "www.imagem4.com.br"
    ), (
        "idProduct05",
        "camiseta 05",
        20,
        "Camiseta Easy Em Algodão Com Estampa Listrada Preto",
        "www.imagem1=5.com.br"
    );

DELETE FROM products WHERE id = "idProduct02";

SELECT * FROM products;

-- daqui

SELECT * FROM users;

SELECT * FROM products;

SELECT * FROM products WHERE name LIKE "%01";

INSERT INTO
    users (
        id,
        name,
        email,
        password,
        createdAt
    )
VALUES (
        "id50",
        "nome50",
        "id50@gmail.com",
        "password50",
        DATE("now")
    );

INSERT INTO
    products (id, name, price, description, "imageUrl")
VALUES (
        "idProduct50",
        "camiseta 50",
        23,
        "Camiseta Easy Em Algodão Com Estampa Listrada Preto",
        "www.produto50.com.br"
    );

SELECT * FROM products WHERE id LIKE "%50";

DELETE FROM products WHERE id LIKE "%50";

DELETE FROM users WHERE id LIKE "%50";

UPDATE users SET password = "bananinha123" WHERE id = "id50";

UPDATE purchases SET created_at = "2023-01-26 14:48:58" WHERE id = "idP03";

SELECT * FROM users ORDER BY email ASC;

SELECT * FROM products ORDER BY price ASC LIMIT 3 OFFSET 2;

SELECT * FROM products;

SELECT *
FROM products
WHERE "price" > 22 AND "price" < 41
ORDER BY price ASC;

-- Relações SQL

CREATE TABLE
    purchases (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        total_price REAL NOT NULL,
        paid INTEGER NOT NULL,
        created_at TEXT,
        buyer_id TEXT NOT NULL,
        Foreign Key (buyer_id) REFERENCES users(id)
    );

INSERT INTO
    purchases (
        id,
        total_price,
        paid,
        created_at,
        buyer_id
    )
VALUES (
        "idP01",
        23,
        0,
        DATETIME(),
        "id01"
    ), ("idP02", 50, 0, "", "id01"), ("idP03", 15, 0, "", "id02"), (
        "idP04",
        18,
        0,
        DATETIME(),
        "id02"
    ), (
        "idP05",
        40,
        0,
        DATETIME(),
        "id03"
    ), (
        "idP06",
        101,
        0,
        DATETIME(),
        "id03"
    );

SELECT * FROM purchases;

DROP TABLE products;

SELECT *
FROM purchases
    INNER JOIN users ON users.id = buyer_id
WHERE users.id = "id01";

-- Relações SQL II

CREATE TABLE
    purchases_products (
        purchase_id TEXT NOT NULL,
        product_id TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        Foreign Key (purchase_id) REFERENCES purchases(id) Foreign Key (product_id) REFERENCES products(id)
    );

INSERT INTO
    purchases_products (
        purchase_id,
        product_id,
        quantity
    )
VALUES ("idP01", "idProduct03", 5), ("idP02", "idProduct01", 2), ("idP03", "idProduct04", 3), ("idP04", "idProduct05", 1), ("idP05", "idProduct01", 7);

DROP TABLE purchases_products;

SELECT
    purchases.id AS purchaseId,
    purchases.total_price AS totalPrice,
    purchases.paid,
    purchases.created_at AS deliveredDate,
    purchases.buyer_id AS buyerId,
    products.id AS productId,
    products.name AS productName,
    products.price
FROM purchases
    LEFT JOIN purchases_products ON purchases_products.purchase_id = purchases.id
    INNER JOIN products ON purchases_products.product_id = products.id;

SELECT * FROM users;
SELECT * FROM products;
SELECT * FROM purchases;
SELECT * FROM purchases_products;

INSERT INTO
    purchases_products (
        purchase_id,
        product_id,
        quantity
    )
VALUES ("idP01", "idProduct02", 2);