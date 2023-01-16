-- Active: 1673888548755@@127.0.0.1@3306

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