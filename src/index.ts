import { users, products, purchases } from "./database"
import express, { Request, Response } from 'express'
import cors from 'cors'
import { TPerson, TProduct, TPurchase, TPurchasesProducts } from "./types"
import { db } from "./database/knex"

// console.log(users, products, purchases);

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

// app.get('/ping', (req: Request, res: Response) => {
//     res.send('Pong!')
// })

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
// app.delete("/users/:id", (req: Request, res: Response) => {
//     try {
//         const id = req.params.id;

//         const findUser = users.find((user) => user.id === id);
//         if (!findUser) {
//             res.status(400);
//             throw new Error("Usuario não encontrado!");
//         }

//         const userToRemove = users.findIndex((user) => user.id === id)
//         if (userToRemove >= 0) {
//             users.splice(userToRemove, 1)
//         }
//         res.status(200).send("User removido com sucesso!")
//     } catch (error: any) {
//         console.log(error)

//         if (res.statusCode === 200) {
//             res.status(500)
//         }

//         res.send(error.message)
//     }
// })

// //alterar usuário por id
// app.put("/user/:id", (req: Request, res: Response) => {
//     try {
//         const id = req.params.id
//         const newEmail = req.body.email as string | undefined
//         const newPassword = req.body.password as string | undefined

//         const findUser = users.find((user) => user.id === id)
//         if (!findUser) {
//             res.status(400)
//             throw new Error("Usuario não encontrado!")
//         }

//         const findNewEmail = users.find((email) => email.id === id)
//         if (!findNewEmail) {
//             res.status(400)
//             throw new Error("Email igual ao anterior!")
//         }
//         // if (newEmail === req.body.email) {
//         //     res.status(400)
//         //     throw new Error("Email igual ao anterior!")
//         // }

//         const regexEmail =
//             /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

//         const regexPassword =
//             /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{4,12}$/g

//         if (newEmail !== undefined) {
//             if (!newEmail.match(regexEmail)) {
//                 res.status(400)
//                 throw new Error("Email inválido!")
//             }
//         }

//         if (newPassword !== undefined) {
//             if (typeof newPassword !== "string") {
//                 res.status(400)
//                 throw new Error("'Password' deve ser uma string!")
//             }
//             if (!newPassword.match(regexPassword)) {
//                 res.status(400)
//                 throw new Error(
//                     "'Password' deve possuir entre 4 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial!"
//                 )
//             }
//         }

//         const user = users.find((user) => user.id === id)

//         if (user) {
//             user.email = newEmail || user.email
//             user.password = newPassword || user.password
//         }

//         res.status(200).send("Cadastro atualizado com sucesso")
//     } catch (error: any) {
//         console.log(error)

//         if (res.statusCode === 200) {
//             res.status(500)
//         }

//         res.send(error.message)
//     }
// });

// //todos os produtos
// // app.get("/products", (req: Request, res: Response) => {
// //     try {
// //         res.status(200).send(products)
// //     } catch (error: any) {
// //         console.log(error)
// //         if (res.statusCode === 200) {
// //             res.status(500)
// //         }
// //         res.send(error.message)
// //     }
// // })

// //procurar produto
// // app.get("/products/search", (req: Request, res: Response) => {
// //     let productFilter
// //     try {
// //         const q = req.query.q as string

// //         if (q.length <= 1) {
// //             res.status(400)
// //             throw new Error("Query params deve possuir pelo menos um caractere!")
// //         }

// //         productFilter = products.filter((product) => {
// //             return product.name.toLowerCase().includes(q.toLowerCase())
// //         });
// //         res.status(200).send(productFilter)
// //     } catch (error: any) {
// //         console.log(error)

// //         if (res.statusCode === 200) {
// //             res.status(500)
// //         }

// //         res.send(error.message)
// //     }
// // })

// //encontrar produto por id
// // app.get("/products/:id", (req: Request, res: Response) => {
// //     try {
// //         const id = req.params.id
// //         const findProduct = products.find((product) => product.id === id)
// //         if (!findProduct) {
// //             res.status(400)
// //             throw new Error("Produto não encontrado!")
// //         }

// //         const result = products.find((product) => product.id === id);

// //         res.status(200).send(result);
// //         console.log("Produto encontrado!")
// //     } catch (error: any) {
// //         console.log(error)

// //         if (res.statusCode === 200) {
// //             res.status(500)
// //         }

// //         res.send(error.message)
// //     }
// // });

// //deletar produto por id
// // app.delete("/product/:id", (req: Request, res: Response) => {
// //     try {
// //         const id = req.params.id

// //         const findProduct = products.find((product) => product.id === id)
// //         if (!findProduct) {
// //             res.status(400)
// //             throw new Error("Produto não encontrado!")
// //         }

// //         const productToRemove = products.findIndex((product) => product.id === id)

// //         if (productToRemove >= 0) {
// //             products.splice(productToRemove, 1)
// //         }

// //         res.status(200).send("Produto apagado com sucesso!")
// //     } catch (error: any) {
// //         console.log(error)

// //         if (res.statusCode === 200) {
// //             res.status(500)
// //         }

// //         res.send(error.message)
// //     }
// // })

// //alterar produto por id
// app.put("/product/:id", (req: Request, res: Response) => {
//     try {
//         const id = req.params.id
//         const newName = req.body.name as string
//         const newPrice = req.body.price as number | undefined
//         const newCategory = req.body.category as Category | undefined

//         const findProduct = products.find((product) => product.id === id)
//         if (!findProduct) {
//             res.status(400)
//             throw new Error("Produto não encontrado!")
//         }

//         if (newName.length < 1) {
//             res.status(400)
//             throw new Error("'newName' deve ter pelo menos 1 caractere!")
//         }

//         if (newPrice && typeof newPrice !== "number") {
//             res.status(400)
//             throw new Error("'newPrice' deve ser um número!")
//         }

//         const productToEdit = products.find((product) => product.id === id)

//         if (productToEdit) {
//             productToEdit.name = newName === undefined ? productToEdit.name : newName
//             productToEdit.price = isNaN(newPrice) ? productToEdit.price : newPrice
//             productToEdit.category = newCategory || productToEdit.category
//         }
//         res.status(200).send("Produto atualizado com sucesso!")
//     } catch (error: any) {
//         console.log(error)

//         if (res.statusCode === 200) {
//             res.status(500)
//         }

//         res.send(error.message)
//     }
// });

// //todas as compras
// // app.get("/purchases", (req: Request, res: Response) => {
// //     try {
// //         res.status(200).send(purchases)
// //     } catch (error: any) {
// //         console.log(error)

// //         if (res.statusCode === 200) {
// //             res.status(500)
// //         }

// //         res.send(error.message)
// //     }
// // })

// //criar usuário
// // app.post("/users", (req: Request, res: Response) => {
// //     try {
// //         const newId = req.body.id
// //         const newEmail = req.body.email
// //         const newPassword = req.body.password

// //         const findId = users.find((user) => user.id === newId)

// //         if (findId) {
// //             res.status(400)
// //             throw new Error("ID indisponivel!")
// //         }

// //         const findEmail = users.find((user) => user.email === newEmail);

// //         if (findEmail) {
// //             res.status(400)
// //             throw new Error("E-mail indisponivel!")
// //         }

// //         const newUser: TPerson = {
// //             id: newId,
// //             email: newEmail,
// //             password: newPassword
// //         }

// //         users.push(newUser)

// //         res.status(201).send("Cadastro realizado com sucesso!")
// //     } catch (error: any) {
// //         console.log(error)
// //         if (res.statusCode === 200) {
// //             res.status(500)
// //         }
// //         res.send(error.message)
// //     }
// // })

// //criar novo produto
// // app.post("/products", (req: Request, res: Response) => {
// //     try {
// //         const newId = req.body.id
// //         const newName = req.body.name
// //         const newPrice = req.body.price
// //         const newCategory = req.body.category

// //         const findId = products.find((product) => product.id === newId)

// //         if (findId) {
// //             res.status(400)
// //             throw new Error("ID indisponivel!")
// //         }

// //         const newProduct: TProduct = {
// //             id: newId,
// //             name: newName,
// //             price: newPrice,
// //             category: newCategory,
// //         }

// //         products.push(newProduct)

// //         res.status(201).send("Produto cadastrado com sucesso!")
// //     } catch (error: any) {
// //         console.log(error)

// //         if (res.statusCode === 200) {
// //             res.status(500)
// //         }

// //         res.send(error.message)
// //     }
// // })

// //criar nova compra
// // app.post("/purchases", (req: Request, res: Response) => {
// //     try {

// //         const newUserId = req.body.userId
// //         const newProductId = req.body.productId
// //         const newQuantity = req.body.quantity
// //         const newTotalPrice = req.body.totalPrice

// //         const findIdUser = purchases.find((purchase) => purchase.userId === newUserId);

// //         if (!findIdUser) {
// //             res.status(400)
// //             throw new Error("ID do usuario não existe!")
// //         }

// //         const findIdProduct = products.find(
// //             (product) => product.id === newProductId
// //         )

// //         if (!findIdProduct) {
// //             res.status(400)
// //             throw new Error("ID do produto não existe!")
// //         }

// //         if (findIdProduct.price * newQuantity !== newTotalPrice) {
// //             res.status(400)
// //             throw new Error("Total incorreto!")
// //         }

// //         const newPurchase: TPurchase = {
// //             userId: newUserId,
// //             productId: newProductId,
// //             quantity: newQuantity,
// //             totalPrice: newTotalPrice,
// //         }

// //         purchases.push(newPurchase)

// //         res.status(201).send("Compra realizada com sucesso!")
// //     } catch (error: any) {
// //         console.log(error)

// //         if (res.statusCode === 200) {
// //             res.status(500)
// //         }

// //         res.send(error.message)
// //     }
// // })


// //endpoints com knex

// // todos os usuários

// app.get("/users", async (req: Request, res: Response) => {
//     try {
//         const result = await db.raw(`
//         SELECT * FROM users;
//         `)
//         res.status(200).send({ users: result })
//     } catch (error: any) {
//         console.log(error)

//         if (req.statusCode === 200) {
//             res.status(500)
//         }

//         if (error instanceof Error) {
//             res.send(error.message)
//         } else {
//             res.send("Erro inesperado")
//         }
//     }
// })

//todos os produtos
// app.get("/products", async (req: Request, res: Response) => {
//     try {
//         const result = await db.raw(`
//         SELECT * FROM products;
//         `)
//         res.status(200).send({ products: products })
//     } catch (error: any) {
//         console.log(error)
//         if (res.statusCode === 200) {
//             res.status(500)
//         }

//         if (error instanceof Error) {
//             res.send(error.message)
//         } else {
//             res.send("Erro inesperado")
//         }
//     }
// })

// //procurar produto
// app.get("/products/search", async (req: Request, res: Response) => {
//     try {
//         const q = req.query.q as string

//         if (q.length <= 1) {
//             res.status(400)
//             throw new Error("Query params deve possuir pelo menos um caractere!")
//         }

//         const product = await db.raw(`
//         SELECT * FROM products
//         WHERE LOWER(name) LIKE("%${q}%");
//         `)
//         res.status(200).send({ product: product })
//     } catch (error: any) {
//         console.log(error)
//         if (res.statusCode === 200) {
//             res.status(500)
//         }

//         if (error instanceof Error) {
//             res.send(error.message)
//         } else {
//             res.send("Erro inesperado")
//         }
//     }
// })


// //criar usuário
// app.post("/users", async (req: Request, res: Response) => {
//     try {
//         const { id, name, email, password, createdAt } = req.body

//         if (typeof id !== "string") {
//             res.status(400)
//             throw new Error("ID inválido, deve ser uma string!")
//         }

//         if (email !== undefined) {
//             if (!email.includes("@")) {
//                 res.status(400)
//                 throw new Error("E-mail inválido!")
//             }
//         }

//         if (id.length < 1 || name.length < 1) {
//             res.status(400)
//             throw new Error("'ID' ou 'name' devem ter pelo menos 1 caractere!")
//         }

//         if (password !== undefined) {
//             if (typeof password !== "string") {
//                 res.status(400)
//                 throw new Error("'password' deve ser uma string!")
//             }
//         }

//         await db.raw(`
//         INSERT INTO users (id, name, email, password, createdAt)
//         VALUES ("${id}", "${name}", "${email}","${password}","${createdAt}")
//         `)

//         res.status(201).send("Cadastro realizado com sucesso!")
//     } catch (error: any) {
//         console.log(error)
//         if (res.statusCode === 200) {
//             res.status(500)
//         }

//         if (error instanceof Error) {
//             res.send(error.message)
//         } else {
//             res.send("Erro inesperado")
//         }
//     }
// })

// //criar novo produto
// app.post("/products", async (req: Request, res: Response) => {
//     try {
//         const { id, name, price, category, imageUrl } = req.body

//         if (typeof id !== "string") {
//             res.status(400)
//             throw new Error("'ID' inválido, deve ser uma string!")
//         }

//         if (typeof name !== "string") {
//             res.status(400)
//             throw new Error("'name' inválido, deve ser uma string!")
//         }

//         if (id.length < 1 || name.length < 1) {
//             res.status(400)
//             throw new Error("'ID' ou 'name' devem possuir pelo menos 1 caractere!")
//         }

//         if (typeof price !== "number") {
//             res.status(400)
//             throw new Error("'price' inválido, deve ser um number!")
//         }

//         if (typeof category !== "string") {
//             res.status(400)
//             throw new Error("'category' inválido, deve ser uma string!")
//         }

//         if (typeof imageUrl !== "string") {
//             res.status(400)
//             throw new Error("'imageUrl' inválido, deve ser uma string!")
//         }

//         await db.raw(`
//         INSERT INTO products (id, name, price, category, imageUrl)
//         VALUES ("${id}", "${name}", "${price}", "${category}", "${imageUrl}")
//         `)
//         res.status(201).send(`Produto ${name} cadastrado com sucesso!`)
//     } catch (error: any) {
//         console.log(error)
//         if (res.statusCode === 200) {
//             res.status(500)
//         }

//         if (error instanceof Error) {
//             res.send(error.message)
//         } else {
//             res.send("Erro inesperado")
//         }
//     }
// })

// //criar nova compra
// app.post("/purchases", async (req: Request, res: Response) => {
//     try {

//         const { id, total_price, paid, created_at, buyer_id } = req.body

//         if (typeof id !== "string") {
//             res.status(400)
//             throw new Error("'ID' inválido, deve ser uma string!")
//         }

//         if (typeof total_price !== "number") {
//             res.status(400)
//             throw new Error("'total_price' inválido, deve ser um number!")
//         }

//         if (typeof created_at !== "string") {
//             res.status(400)
//             throw new Error("'created_at' inválido, deve ser uma string!")
//         }

//         if (paid > 1 && paid < 0) {
//             res.status(400)
//             throw new Error("'paid' inválido, deve ser 0 ou 1!")
//         }

//         if (typeof buyer_id !== "string") {
//             res.status(400)
//             throw new Error("'buyer_id' inválido, deve ser uma string!")
//         }

//         if (id.length < 1 ||
//             paid.length < 1 ||
//             created_at.length < 1 ||
//             buyer_id.length < 1) {
//             res.status(400)
//             throw new Error("As informações devem ter no mínimo 1 caractere!")
//         }

//         await db.raw(`
//         INSERT INTO purchases (id, total_price, paid, created_at, buyer_id)
//         VALUES ("${id}", "${total_price}", "${paid}", "${created_at}", "${buyer_id}")
//         `)
//         res.status(201).send(`Compra cadastrada com sucesso!`)
//     } catch (error: any) {
//         console.log(error)
//         if (res.statusCode === 200) {
//             res.status(500)
//         }

//         if (error instanceof Error) {
//             res.send(error.message)
//         } else {
//             res.send("Erro inesperado")
//         }
//     }
// })

// //encontrar produto por id
// // app.get("/products/:id", async (req: Request, res: Response) => {
// //     try {
// //         const id = req.params.id

// //         const result = await db.raw(`
// //         SELECT * FROM products
// //         WHERE id = "${id}";
// //         `)

// //         res.status(200).send(result)
// //     } catch (error: any) {
// //         console.log(error)
// //         if (res.statusCode === 200) {
// //             res.status(500)
// //         }

// //         if (error instanceof Error) {
// //             res.send(error.message)
// //         } else {
// //             res.send("Erro inesperado")
// //         }
// //     }
// // })

// // Receber compras pelo id
// // app.get("/users/:id/purchases", async (req: Request, res: Response) => {
// //     try {
// //         const id = req.params.id;

// //         const result = await db.raw(`
// //         SELECT * FROM purchases
// //         WHERE buyer_id = "${id}";
// //         `)

// //         res.status(200).send(result);
// //     } catch (error: any) {
// //         console.log(error)
// //         if (res.statusCode === 200) {
// //             res.status(500)
// //         }

// //         if (error instanceof Error) {
// //             res.send(error.message)
// //         } else {
// //             res.send("Erro inesperado")
// //         }
// //     }
// // })

// //deletar produto por id (aprofundamento knex)
// app.delete("/product/:id", async (req: Request, res: Response) => {
//     try {
//         const idToDelete = req.params.id

//         const [product] = await db("products").where({ id: idToDelete })

//         if (product) {
//             await db("products").del().where({ id: idToDelete })
//         } else {
//             res.status(404).send
//             throw new Error("Produto não encontrado, id não existe!");
//         }

//         res.status(200).send("Produto apagado com sucesso!")
//     } catch (error: any) {
//         console.log(error)

//         if (res.statusCode === 200) {
//             res.status(500)
//         }

//         res.send(error.message)
//     }
// })

// //encontrar produto por id (aprofundamento knex)
// app.get("/products/:id", async (req: Request, res: Response) => {
//     try {

//         const id = req.params.id

//         if (id !== undefined) {

//             if (typeof id !== "string") {
//                 res.status(400)
//                 throw new Error("'id' deve ser string")
//             }

//             if (id.length < 1) {
//                 res.status(400)
//                 throw new Error("'id' deve possuir no mínimo 1 caractere")
//             }
//         }

//         const [product] = await db("products").where({ id: id })

//         if (product) {
//             res.status(200).send(product)
//         } else {
//             res.status(404)
//             throw new Error("'id' não encontrada")
//         }

//     } catch (error: any) {
//         console.log(error)
//         if (res.statusCode === 200) {
//             res.status(500)
//         }

//         if (error instanceof Error) {
//             res.send(error.message)
//         } else {
//             res.send("Erro inesperado")
//         }
//     }
// })

// // Receber compras pelo id (aprofundamento knex)
// app.get("/users/:id/purchases", async (req: Request, res: Response) => {
//     try {
//         const findId = req.params.id;

//         const [purchase] = await db("purchases").where({ id: findId })

//         if (purchase) {
//             res.status(200).send(purchase)
//         } else {
//             res.status(404)
//             throw new Error("'id' da compra não encontrada!")
//         }

//     } catch (error: any) {
//         console.log(error)
//         if (res.statusCode === 200) {
//             res.status(500)
//         }

//         if (error instanceof Error) {
//             res.send(error.message)
//         } else {
//             res.send("Erro inesperado")
//         }
//     }
// })

//todas as compras pelo id (aprofundamento knex)
// app.get("/purchases/:id", async (req: Request, res: Response) => {
//     try {
//         const findId = req.params.id

//         const [purchase] = await db("purchases").where({ id: findId })


//         if (purchase) {
//             await db("purchases").where({ id: findId })

//         } else {
//             res.status(404)
//             throw new Error("'id' não encontrada")
//         }

//         res.status(200).send(purchase)
//     } catch (error) {
//         console.log(error)

//         if (req.statusCode === 200) {
//             res.status(500)
//         }

//         if (error instanceof Error) {
//             res.send(error.message)
//         } else {
//             res.send("Erro inesperado")
//         }
//     }
// })





//------------------------------Refatoração para entrega final
// todos os usuários
app.get("/users", async (req: Request, res: Response) => {
    try {
        const result: TPerson = await db("users")
        res.status(200).send(result)
    } catch (error) {
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

// todos os produtos funcionalidade 1
// app.get("/products", async (req: Request, res: Response) => {
//     try {
//         const result:TProduct = await db("products")
//         res.status(200).send(result)
//     } catch (error) {
//         console.log(error)

//         if (req.statusCode === 200) {
//             res.status(500)
//         }

//         if (error instanceof Error) {
//             res.send(error.message)
//         } else {
//             res.send("Erro inesperado")
//         }
//     }
// })

// todos os produtos funcionalidade 2
app.get("/products", async (req: Request, res: Response) => {
    try {
        const searchTerm = req.query.q as string | undefined

        if (searchTerm === undefined) {
            const result: TProduct = await db("products")
            res.status(200).send(result)
        } else {
            const result: TProduct[] = await db("products").where("name", "LIKE", `%${searchTerm}%`)
            res.status(200).send(result)
        }
    } catch (error) {
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

// todos as compras
app.get("/purchases", async (req: Request, res: Response) => {
    try {
        const result: TPurchase = await db("purchases")
        res.status(200).send(result)
    } catch (error) {
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

// deletar user by id
app.delete("/users/:id", async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id

        const [user]: TPerson[] = await db("users").where({ id: idToDelete })

        if (user) {
            await db("users").del().where({ id: idToDelete })
        } else {
            res.status(404).send
            throw new Error("Usuário não encontrado, id não existe!");
        }

        res.status(200).send("Usuário apagado com sucesso!")
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})

// deletar compra by id
app.delete("/purchase/:id", async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id

        const [purchase]: TPurchase[] = await db("purchases").where({ id: idToDelete })

        if (purchase) {
            await db("purchases_products").del().where({ purchase_id: idToDelete })
            await db("purchases").del().where({ id: idToDelete })
        } else {
            res.status(404).send
            throw new Error("Pedido não encontrado, id não existe!");
        }

        res.status(200).send("Pedido cancelado com sucesso!")
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})

// deletar product by id
app.delete("/product/:id", async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id

        const [product]: TProduct[] = await db("products").where({ id: idToDelete })

        if (product) {
            await db("products").del().where({ id: idToDelete })
        } else {
            res.status(404).send
            throw new Error("Produto não encontrado, id não existe!");
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

// alterar user by id
app.put("/user/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const { newId, name, email, password, createdAt } = req.body

        if (newId !== undefined) {

            if (typeof newId !== "string") {
                res.status(400)
                throw new Error("'ID' inválido, deve ser uma string!")
            }

            if (newId.length < 1) {
                res.status(400)
                throw new Error("'ID' deve possuir no mínimo 1 caractere")
            }
        }

        if (name !== undefined) {
            if (typeof name !== "string") {
                res.status(400)
                throw new Error("'name' inválido, deve ser uma string!")
            }
        }

        const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

        if (email !== undefined) {
            if (typeof email !== "string") {
                res.status(400)
                throw new Error("'Email' inválido, deve ser uma string!")
            }
            if (!email.match(regexEmail)) {
                res.status(400)
                throw new Error("'Email' inválido!")
            }
        }

        const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{4,12}$/g

        if (password !== undefined) {
            if (typeof password !== "string") {
                res.status(400)
                throw new Error("'Password' deve ser um string!")
            }
            if (!password.match(regexPassword)) {
                res.status(400)
                throw new Error(
                    "'Password' deve possuir entre 4 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial!"
                )
            }
        }

        if (createdAt !== undefined) {
            if (typeof createdAt !== "string") {
                res.status(400)
                throw new Error("'createdAt' deve ser uma string!")
            }
        }

        const [user]: TPerson[] = await db("users").where({ id: id })

        if (user) {
            const updatedUser = {
                id: newId || user.id,
                name: name || user.name,
                email: email || user.email,
                password: password | user.password,
                createdAt: createdAt || user.createdAt
            }

            await db("users").update(updatedUser).where({ id: id })

        } else {
            res.status(404)
            throw new Error("'id' não encontrada")
        }
        res.status(200).send("Atualização do usuário realizada com sucesso!")
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

// alterar produto pelo id
app.put("/product/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const { newId, name, price, description, imageUrl } = req.body

        if (newId !== undefined) {

            if (typeof newId !== "string") {
                res.status(400)
                throw new Error("ID inválido, deve ser uma string!")
            }

            if (newId.length < 1) {
                res.status(400)
                throw new Error("'id' deve possuir no mínimo 1 caractere")
            }
        }

        if (name !== undefined) {
            if (name.length < 1) {
                res.status(400)
                throw new Error("'name' deve ter pelo menos 1 caractere!")
            }
        }

        if (price && typeof price !== "number") {
            res.status(400)
            throw new Error("'price' deve ser um número!")
        }

        if (description !== undefined) {
            if (typeof description !== "string") {
                res.status(400)
                throw new Error("'description', deve ser uma string!")
            }
        }

        if (imageUrl !== undefined) {
            if (typeof imageUrl !== "string") {
                res.status(400)
                throw new Error("'imageUrl', deve ser uma string!")
            }
        }

        const [product]: TProduct[] = await db("products").where({ id: id })

        if (product) {
            const updatedProduct = {
                id: newId || product.id,
                name: name || product.name,
                price: price || product.price,
                description: description || product.description,
                imageUrl: imageUrl || product.imageUrl
            }

            await db("products").update(updatedProduct).where({ id: id })

        } else {
            res.status(404)
            throw new Error("'id' não encontrada")
        }
        res.status(200).send("Atualização do produto realizada com sucesso!")
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

        const product:TProduct = await db.raw(`
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

        await db.insert({
            id,
            name,
            email,
            password,
            createdAt
        }).into("users")

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

//criar produto
app.post("/products", async (req: Request, res: Response) => {
    try {
        const { id, name, price, description, imageUrl } = req.body

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

        if (typeof description !== "string") {
            res.status(400)
            throw new Error("'description' inválido, deve ser uma string!")
        }

        if (typeof imageUrl !== "string") {
            res.status(400)
            throw new Error("'imageUrl' inválido, deve ser uma string!")
        }

        await db.insert({
            id,
            name,
            price,
            description,
            imageUrl
        }).into("products")

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
        const { id: purchase_id, total_price, paid, created_at, buyer_id, products } = req.body

        interface Product {
            id: string;
            quantity: number;
        }

        if (typeof purchase_id !== "string") {
            res.status(400)
            throw new Error("'ID' inválido, deve ser uma string!")
        }

        if (typeof total_price !== "number") {
            res.status(400)
            throw new Error("'total_price' inválido, deve ser um number!")
        }

        if (typeof created_at !== "string") {
            res.status(400)
            throw new Error("'created_at' inválido, deve ser uma string!")
        }

        if (paid > 1 && paid < 0) {
            res.status(400)
            throw new Error("'paid' inválido, deve ser 0 ou 1!")
        }

        if (typeof buyer_id !== "string") {
            res.status(400)
            throw new Error("'buyer_id' inválido, deve ser uma string!")
        }

        if (purchase_id.length < 1 ||
            created_at.length < 1 ||
            buyer_id.length < 1) {
            res.status(400)
            throw new Error("As informações devem ter no mínimo 1 caractere!")
        }

        const [purchaseIdAlreadyExists]:TPurchase[] = await db("purchases").where({ id: purchase_id })

        if (purchaseIdAlreadyExists) {
            res.status(400)
            throw new Error("'id' da compra já existe")
        }

        const newPurchase:TPurchase = {
            id: purchase_id,
            total_price,
            paid,
            created_at,
            buyer_id
        }
        await db("purchases").insert(newPurchase)

        const purchaseProductInserts:TPurchasesProducts = products.map((p: Product) => {
            return {
                purchase_id,
                product_id: p.id,
                quantity: p.quantity
            };
        });

        await db("purchases_products").insert(purchaseProductInserts)

        const [insertedPurchase]:TPurchase[] = await db("purchases")
            .where({ id: purchase_id })

        const insertedPurchaseProduct = await db("purchases_products")
            .where({ purchase_id })
            .select(
                "purchase_id",
                "product_id",
                "quantity"
            )

        res.status(201).send({
            message: "Pedido realizado com sucesso",
            purchase: insertedPurchase,
            purchaseProduct: insertedPurchaseProduct
        })

    } catch (error) {
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
});

//encontrar produto por id
app.get("/products/:id", async (req: Request, res: Response) => {
    try {

        const id = req.params.id

        if (id !== undefined) {

            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'id' deve ser string")
            }

            if (id.length < 1) {
                res.status(400)
                throw new Error("'id' deve possuir no mínimo 1 caractere")
            }
        }

        const [product]:TProduct[] = await db("products").where({ id: id })

        if (product) {
            res.status(200).send(product)
        } else {
            res.status(404)
            throw new Error("'id' não encontrada")
        }

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

// encontrar compras pelo usuário correspondente a id
app.get('/users/:id/purchases', async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const result:TPurchase[] = await db("purchases").select(
            "id",
            "total_price",
            "paid",
            "created_at",
            "buyer_id"
        )
            .where("buyer_id", "LIKE", `%${id}%`)
        res.status(200).send(result)
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

//todas as compras pelo id 
app.get("/purchases/:id", async (req: Request, res: Response) => {
    try {
        const findId = req.params.id

        const [purchase] = await db("purchases")
            .where({ id: findId })
            .select(
                "id AS purchaseId",
                "total_price AS totalPrice",
                "created_at AS createdAt",
                "paid AS isPaid",
                "buyer_id AS buyerId"
            )

        if (!purchase) {
            res.status(404)
            throw new Error("'id' não encontrada")
        }

        const [buyer] = await db("users")
            .where({ id: purchase.buyerId })
            .select(
                "name AS buyerName",
                "email AS buyerEmail"
            )

        const purchases_products = await db("purchases_products")
            .where({ purchase_id: findId })
            .select(
                "purchase_id",
                "product_id",
                "quantity"
            )

        const productIds = purchases_products.map(p => p.product_id)
        const products = await db("products")
            .whereIn("id", productIds)
            .select(
                "id",
                "name",
                "price",
                "description",
                "imageUrl"
            )

        let totalPrice = 0;
        purchases_products.forEach(async purchase_product => {
            const product = products.find(p => p.id === purchase_product.product_id);
            totalPrice += product.price * purchase_product.quantity;
            product.quantity = purchase_product.quantity;
        });

        res.status(200).send({
            purchaseId: purchase.purchaseId,
            buyerId: purchase.buyerId,
            buyerName: buyer.buyerName,
            buyerEmail: buyer.buyerEmail,
            totalPrice,
            createdAt: purchase.createdAt,
            paid: purchase.paid,
            products
        });

    } catch (error) {
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