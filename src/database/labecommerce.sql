-- Active: 1673975451583@@127.0.0.1@3306

--Tabela de usuários

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    );

INSERT INTO
    users (id, email, password)
VALUES (
        "id01",
        "id01@gmail.com",
        "password01"
    ), (
        "id02",
        "id02@gmail.com",
        "password02"
    ), (
        "id03",
        "id03@gmail.com",
        "password03"
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
        category TEXT NOT NULL
    );

INSERT INTO
    products (id, name, price, category)
VALUES (
        "idProduct01",
        "camiseta 01",
        23,
        "Camiseta"
    ), (
        "idProduct02",
        "camiseta 02",
        30,
        "Regata"
    ), (
        "idProduct03",
        "camiseta 03",
        35,
        "Camisa"
    ), (
        "idProduct04",
        "camiseta 04",
        40,
        "Regata"
    ), (
        "idProduct05",
        "camiseta 05",
        20,
        "Camiseta"
    );

DELETE FROM products WHERE id = "idProduct02";

SELECT * FROM products;

-- daqui
SELECT * FROM users;

SELECT * FROM products;

SELECT * FROM products WHERE name LIKE "%01";

INSERT INTO
    users (id, email, password)
VALUES (
        "id50",
        "id50@gmail.com",
        "password50"
    );

INSERT INTO
    products (id, name, price, category)
VALUES (
        "idProduct50",
        "camiseta 50",
        23,
        "Camiseta"
    );

SELECT * FROM products WHERE id LIKE "%50";

DELETE FROM products WHERE id LIKE "%50";

DELETE FROM users WHERE id LIKE "%50";

UPDATE users SET password = "bananinha123" WHERE id = "id50";

UPDATE products SET price = 1000 WHERE id = "idProduct50";

SELECT * FROM users ORDER BY email ASC;

SELECT * FROM products ORDER BY price ASC LIMIT 3 OFFSET 2;

SELECT * FROM products;

SELECT * FROM products WHERE "price" > 22 AND "price" < 41
ORDER BY price ASC;