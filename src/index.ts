import { users, products, purchases } from "./database"
import express, { Request, Response } from 'express'
import cors from 'cors'
import { Category, TPerson, TProduct, TPurchase } from "./types"
import { db } from "./database/knex"

// console.log(users, products, purchases);

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})

// todos os usuários
// app.get("/users", (req: Request, res: Response) => {
//     try {
//         res.status(200).send(users)
//     } catch (error: any) {
//         console.log(error)
//         if (res.statusCode === 200) {
//             res.status(500)
//         }
//         res.send(error.message)
//     }
// })

// Receber compras pelo id
// app.get("/users/:id/purchases", (req: Request, res: Response) => {
//     try {
//         const id = req.params.id;

//         const findUser = purchases.find((purchase) => purchase.userId === id);
//         if (!findUser) {
//             res.status(400);
//             throw new Error("Usuario não encontrado!");
//         }

//         const result = purchases.find((purchase) => purchase.userId === id);

//         res.status(200).send(result);
//         console.log("Compras do usuário encontradas!");
//     } catch (error: any) {
//         console.log(error);

//         if (res.statusCode === 200) {
//             res.status(500);
//         }

//         res.send(error.message);
//     }
// });

//deletar usuário
app.delete("/users/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const findUser = users.find((user) => user.id === id);
        if (!findUser) {
            res.status(400);
            throw new Error("Usuario não encontrado!");
        }

        const userToRemove = users.findIndex((user) => user.id === id)
        if (userToRemove >= 0) {
            users.splice(userToRemove, 1)
        }
        res.status(200).send("User removido com sucesso!")
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})

//alterar usuário por id
app.put("/user/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const newEmail = req.body.email as string | undefined
        const newPassword = req.body.password as string | undefined

        const findUser = users.find((user) => user.id === id)
        if (!findUser) {
            res.status(400)
            throw new Error("Usuario não encontrado!")
        }

        const findNewEmail = users.find((email) => email.id === id)
        if (!findNewEmail) {
            res.status(400)
            throw new Error("Email igual ao anterior!")
        }
        // if (newEmail === req.body.email) {
        //     res.status(400)
        //     throw new Error("Email igual ao anterior!")
        // }

        const regexEmail =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

        const regexPassword =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{4,12}$/g

        if (newEmail !== undefined) {
            if (!newEmail.match(regexEmail)) {
                res.status(400)
                throw new Error("Email inválido!")
            }
        }

        if (newPassword !== undefined) {
            if (typeof newPassword !== "string") {
                res.status(400)
                throw new Error("'Password' deve ser uma string!")
            }
            if (!newPassword.match(regexPassword)) {
                res.status(400)
                throw new Error(
                    "'Password' deve possuir entre 4 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial!"
                )
            }
        }

        const user = users.find((user) => user.id === id)

        if (user) {
            user.email = newEmail || user.email
            user.password = newPassword || user.password
        }

        res.status(200).send("Cadastro atualizado com sucesso")
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
});

//todos os produtos
// app.get("/products", (req: Request, res: Response) => {
//     try {
//         res.status(200).send(products)
//     } catch (error: any) {
//         console.log(error)
//         if (res.statusCode === 200) {
//             res.status(500)
//         }
//         res.send(error.message)
//     }
// })

//procurar produto
// app.get("/products/search", (req: Request, res: Response) => {
//     let productFilter
//     try {
//         const q = req.query.q as string

//         if (q.length <= 1) {
//             res.status(400)
//             throw new Error("Query params deve possuir pelo menos um caractere!")
//         }

//         productFilter = products.filter((product) => {
//             return product.name.toLowerCase().includes(q.toLowerCase())
//         });
//         res.status(200).send(productFilter)
//     } catch (error: any) {
//         console.log(error)

//         if (res.statusCode === 200) {
//             res.status(500)
//         }

//         res.send(error.message)
//     }
// })

//encontrar produto por id
// app.get("/products/:id", (req: Request, res: Response) => {
//     try {
//         const id = req.params.id
//         const findProduct = products.find((product) => product.id === id)
//         if (!findProduct) {
//             res.status(400)
//             throw new Error("Produto não encontrado!")
//         }

//         const result = products.find((product) => product.id === id);

//         res.status(200).send(result);
//         console.log("Produto encontrado!")
//     } catch (error: any) {
//         console.log(error)

//         if (res.statusCode === 200) {
//             res.status(500)
//         }

//         res.send(error.message)
//     }
// });

//deletar produto por id
app.delete("/product/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const findProduct = products.find((product) => product.id === id)
        if (!findProduct) {
            res.status(400)
            throw new Error("Produto não encontrado!")
        }

        const productToRemove = products.findIndex((product) => product.id === id)

        if (productToRemove >= 0) {
            products.splice(productToRemove, 1)
        }

        res.status(200).send("Produto apagado com sucesso!")
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})

//alterar produto por id
app.put("/product/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const newName = req.body.name as string
        const newPrice = req.body.price as number | undefined
        const newCategory = req.body.category as Category | undefined

        const findProduct = products.find((product) => product.id === id)
        if (!findProduct) {
            res.status(400)
            throw new Error("Produto não encontrado!")
        }

        if (newName.length < 1) {
            res.status(400)
            throw new Error("'newName' deve ter pelo menos 1 caractere!")
        }

        if (newPrice && typeof newPrice !== "number") {
            res.status(400)
            throw new Error("'newPrice' deve ser um número!")
        }

        const productToEdit = products.find((product) => product.id === id)

        if (productToEdit) {
            productToEdit.name = newName === undefined ? productToEdit.name : newName
            productToEdit.price = isNaN(newPrice) ? productToEdit.price : newPrice
            productToEdit.category = newCategory || productToEdit.category
        }
        res.status(200).send("Produto atualizado com sucesso!")
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
});

//todas as compras
app.get("/purchases", (req: Request, res: Response) => {
    try {
        res.status(200).send(purchases)
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})

//criar usuário
// app.post("/users", (req: Request, res: Response) => {
//     try {
//         const newId = req.body.id
//         const newEmail = req.body.email
//         const newPassword = req.body.password

//         const findId = users.find((user) => user.id === newId)

//         if (findId) {
//             res.status(400)
//             throw new Error("ID indisponivel!")
//         }

//         const findEmail = users.find((user) => user.email === newEmail);

//         if (findEmail) {
//             res.status(400)
//             throw new Error("E-mail indisponivel!")
//         }

//         const newUser: TPerson = {
//             id: newId,
//             email: newEmail,
//             password: newPassword
//         }

//         users.push(newUser)

//         res.status(201).send("Cadastro realizado com sucesso!")
//     } catch (error: any) {
//         console.log(error)
//         if (res.statusCode === 200) {
//             res.status(500)
//         }
//         res.send(error.message)
//     }
// })

//criar novo produto
// app.post("/products", (req: Request, res: Response) => {
//     try {
//         const newId = req.body.id
//         const newName = req.body.name
//         const newPrice = req.body.price
//         const newCategory = req.body.category

//         const findId = products.find((product) => product.id === newId)

//         if (findId) {
//             res.status(400)
//             throw new Error("ID indisponivel!")
//         }

//         const newProduct: TProduct = {
//             id: newId,
//             name: newName,
//             price: newPrice,
//             category: newCategory,
//         }

//         products.push(newProduct)

//         res.status(201).send("Produto cadastrado com sucesso!")
//     } catch (error: any) {
//         console.log(error)

//         if (res.statusCode === 200) {
//             res.status(500)
//         }

//         res.send(error.message)
//     }
// })

//criar nova compra
// app.post("/purchases", (req: Request, res: Response) => {
//     try {

//         const newUserId = req.body.userId
//         const newProductId = req.body.productId
//         const newQuantity = req.body.quantity
//         const newTotalPrice = req.body.totalPrice

//         const findIdUser = purchases.find((purchase) => purchase.userId === newUserId);

//         if (!findIdUser) {
//             res.status(400)
//             throw new Error("ID do usuario não existe!")
//         }

//         const findIdProduct = products.find(
//             (product) => product.id === newProductId
//         )

//         if (!findIdProduct) {
//             res.status(400)
//             throw new Error("ID do produto não existe!")
//         }

//         if (findIdProduct.price * newQuantity !== newTotalPrice) {
//             res.status(400)
//             throw new Error("Total incorreto!")
//         }

//         const newPurchase: TPurchase = {
//             userId: newUserId,
//             productId: newProductId,
//             quantity: newQuantity,
//             totalPrice: newTotalPrice,
//         }

//         purchases.push(newPurchase)

//         res.status(201).send("Compra realizada com sucesso!")
//     } catch (error: any) {
//         console.log(error)

//         if (res.statusCode === 200) {
//             res.status(500)
//         }

//         res.send(error.message)
//     }
// })


//endpoints com knex

// todos os usuários

app.get("/users", async (req: Request, res: Response) => {
    try {
        const result = await db.raw(`
        SELECT * FROM users;
        `)
        res.status(200).send({ users: result })
    } catch (error: any) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

//todos os produtos
app.get("/products", async (req: Request, res: Response) => {
    try {
        const result = await db.raw(`
        SELECT * FROM products;
        `)
        res.status(200).send({ products: products })
    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

//procurar produto
app.get("/products/search", async (req: Request, res: Response) => {
    try {
        const q = req.query.q as string

        if (q.length <= 1) {
            res.status(400)
            throw new Error("Query params deve possuir pelo menos um caractere!")
        }

        const product = await db.raw(`
        SELECT * FROM products
        WHERE LOWER(name) LIKE("%${q}%");
        `)
        res.status(200).send({ product: product })
    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})


//criar usuário
app.post("/users", async (req: Request, res: Response) => {
    try {
        const { id, name, email, password, createdAt } = req.body

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("ID inválido, deve ser uma string!")
        }

        if (email !== undefined) {
            if (!email.includes("@")) {
                res.status(400)
                throw new Error("E-mail inválido!")
            }
        }

        if (id.length < 1 || name.length < 1) {
            res.status(400)
            throw new Error("'ID' ou 'name' devem ter pelo menos 1 caractere!")
        }

        if (password !== undefined) {
            if (typeof password !== "string") {
                res.status(400)
                throw new Error("'password' deve ser uma string!")
            }
        }

        await db.raw(`
        INSERT INTO users (id, name, email, password, createdAt)
        VALUES ("${id}", "${name}", "${email}","${password}","${createdAt}")
        `)

        res.status(201).send("Cadastro realizado com sucesso!")
    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

//criar novo produto
app.post("/products", async (req: Request, res: Response) => {
    try {
        const { id, name, price, category, imageUrl } = req.body

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("'ID' inválido, deve ser uma string!")
        }

        if (typeof name !== "string") {
            res.status(400)
            throw new Error("'name' inválido, deve ser uma string!")
        }

        if (id.length < 1 || name.length < 1) {
            res.status(400)
            throw new Error("'ID' ou 'name' devem possuir pelo menos 1 caractere!")
        }

        if (typeof price !== "number") {
            res.status(400)
            throw new Error("'price' inválido, deve ser um number!")
        }

        if (typeof category !== "string") {
            res.status(400)
            throw new Error("'category' inválido, deve ser uma string!")
        }

        if (typeof imageUrl !== "string") {
            res.status(400)
            throw new Error("'imageUrl' inválido, deve ser uma string!")
        }

        await db.raw(`
        INSERT INTO products (id, name, price, category, imageUrl)
        VALUES ("${id}", "${name}", "${price}", "${category}", "${imageUrl}")
        `)
        res.status(201).send(`Produto ${name} cadastrado com sucesso!`)
    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

//criar nova compra
app.post("/purchases", async (req: Request, res: Response) => {
    try {

        const { id, total_price, paid, delivered_at, buyer_id } = req.body

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("'ID' inválido, deve ser uma string!")
        }

        if (typeof total_price !== "number") {
            res.status(400)
            throw new Error("'total_price' inválido, deve ser um number!")
        }

        if (typeof delivered_at !== "string") {
            res.status(400)
            throw new Error("'delivered_at' inválido, deve ser uma string!")
        }

        if (paid > 1 && paid < 0) {
            res.status(400)
            throw new Error("'paid' inválido, deve ser 0 ou 1!")
        }

        if (typeof buyer_id !== "string") {
            res.status(400)
            throw new Error("'buyer_id' inválido, deve ser uma string!")
        }

        if (id.length < 1 ||
            paid.length < 1 ||
            delivered_at.length < 1 ||
            buyer_id.length < 1) {
            res.status(400)
            throw new Error("As informações devem ter no mínimo 1 caractere!")
        }

        await db.raw(`
        INSERT INTO purchases (id, total_price, paid, delivered_at, buyer_id)
        VALUES ("${id}", "${total_price}", "${paid}", "${delivered_at}", "${buyer_id}")
        `)
        res.status(201).send(`Compra cadastrada com sucesso!`)
    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

//encontrar produto por id
app.get("/products/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const result = await db.raw(`
        SELECT * FROM products
        WHERE id = "${id}";
        `)

        res.status(200).send(result)
    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

// Receber compras pelo id
app.get("/users/:id/purchases", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const result = await db.raw(`
        SELECT * FROM purchases
        WHERE buyer_id = "${id}";
        `)

        res.status(200).send(result);
    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})
