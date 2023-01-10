import { users, products, purchases } from "./database"
import express, { Request, Response } from 'express'
import cors from 'cors'
import { Category, TPerson, TProduct, TPurchase } from "./types"

console.log(users, products, purchases);

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})

app.get("/users", (req: Request, res: Response) => {
    res.status(200).send(users)
})

app.get("/users/:id/purchases", (req: Request, res: Response) => {
    const id = req.params.id
    const purchaseId = products.filter((purchase) => purchase.id === id)
    res.status(200).send(purchaseId)
})

app.delete("/users/:id", (req: Request, res: Response) => {
    const id = req.params.id
    const userToRemove = users.findIndex((user) => user.id === id)
    if (userToRemove >= 0) {
        users.splice(userToRemove, 1)
    }
    res.status(200).send("User removido com sucesso!")
})

app.put("/user/:id", (req: Request, res: Response) => {
    const id = req.params.id
    const newEmail = req.body.email as string | undefined
    const newPassword = req.body.password as string | undefined
    const userToEdit = users.find((user) => user.id === id)

    if (userToEdit) {
        userToEdit.id = newEmail === undefined ? userToEdit.id : newEmail
        userToEdit.password = newPassword || userToEdit.password
    }
    res.status(200).send("Cadastro atualizado com sucesso!")
})

app.get("/products", (req: Request, res: Response) => {
    res.status(200).send(products)
})

app.get("/products/:id", (req: Request, res: Response) => {
    const id = req.params.id
    const productId = products.find((product) => product.id === id)
    res.status(200).send(productId)
})

app.delete("/product/:id", (req: Request, res: Response) => {
    const id = req.params.id
    const productToRemove = products.findIndex((product) => product.id === id)
    if (productToRemove >= 0) {
        users.splice(productToRemove, 1)
    }
    res.status(200).send("Produto removido com sucesso!")
})

app.put("/product/:id", (req: Request, res: Response) => {
    const id = req.params.id
    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number
    const newCategory = req.body.category as Category
    const productToEdit = products.find((product) => product.id === id)

    if (productToEdit) {
        productToEdit.id = newName === undefined ? productToEdit.id : newName
        productToEdit.price = isNaN(newPrice)? productToEdit.price : newPrice
        productToEdit.category = newCategory || productToEdit.category
    }
    res.status(200).send("Produto atualizado com sucesso!")
})

app.get("/purchases", (req: Request, res: Response) => {
    res.status(200).send(purchases)
})

app.get("/products/search", (req: Request, res: Response) => {
    const q = req.query.q as string
    const searchProduct = products.filter(
        (product) => product.name.toLowerCase().includes(q.toLowerCase())
    )
    res.status(200).send(searchProduct)
})

app.post("/users", (req: Request, res: Response) => {
    const id = req.body.id
    const email = req.body.email
    const password = req.body.password

    const newUser: TPerson = {
        id,
        email,
        password
    }

    users.push(newUser)

    res.status(201).send("Cadastro realizado com sucesso!")
})

app.post("/products", (req: Request, res: Response) => {
    const id = req.body.id
    const name = req.body.name
    const price = req.body.price
    const category = req.body.category

    const newProduct: TProduct = {
        id,
        name,
        price,
        category,
    }

    products.push(newProduct)

    res.status(201).send("Produto cadastrado com sucesso!")
})

app.post("/purchases", (req: Request, res: Response) => {
    const userId = req.body.userId
    const productId = req.body.productID
    const quantity = req.body.quantity
    const totalPrice = req.body.totalPrice

    const newPurchase: TPurchase = {
        userId,
        productId,
        quantity,
        totalPrice,
    }

    purchases.push(newPurchase)

    res.status(201).send("Compra realizada com sucesso!")
})
