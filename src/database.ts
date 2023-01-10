import { TPerson, TProduct, TPurchase, Category } from "./types";

export const users: TPerson[] = [
    {
        id: "id01",
        email: "id01@gmail.com",
        password: "password01"
    },
    {
        id: "id02",
        email: "id02@gmail.com",
        password: "password02"
    }
]

export const products: TProduct[] = [
    {
        id: "idProduct01",
        name: "camiseta 01",
        price: 23,
        category: Category.REGATTA
    },
    {
        id: "idProduct02",
        name: "camiseta 02",
        price: 30,
        category: Category.SHIRT
    },
    {
        id: "idProduct03",
        name: "camiseta 03",
        price: 35,
        category: Category.TSHIRT
    }
]

export const purchases: TPurchase[] = [
    {
        userId: "id01",
        productId: "idProduct01",
        quantity: 2,
        totalPrice: 46
    },
    {
        userId: "id02",
        productId: "idProduct02",
        quantity: 2,
        totalPrice: 60
    },
    {
        userId: "id03",
        productId: "idProduct03",
        quantity: 1,
        totalPrice: 35
    }
]

export function CreateUser(id: string, email: string, password: string) {
    const newUser: TPerson = { id, email, password }
    users.push(newUser)
    console.log("Usuário cadastrado com sucesso!");
}

export function getAllUsers(users: TPerson[]): TPerson[] {
    return users
}

export function createProduct(id: string, name: string, price: number, category: Category) {
    const newProduct: TProduct = { id, name, price, category }
    products.push(newProduct)
    console.log("Produto cadastrado com sucesso!");
}

export function CreateProduct(id: string, name: string, price: number, category: Category) {
    const newProduct: TProduct = { id, name, price, category }
    products.push(newProduct)
    console.log("Produto cadastrado com sucesso!");
}

export function getAllProducts(products: TProduct[]): TProduct[] {
    return products
}

export function getProductById(idToSearch: string): TProduct[] | undefined {
    return products.filter((product: TProduct) => {
        return product.id === idToSearch
    })
}

export function queryProductsByName(q: string): TProduct[] | undefined {
    return products.filter((product: TProduct) => {
        return product.name.toLowerCase() === q
    })
}

export function createPurchase(userId: string, productId: string, quantity: number, totalPrice: number) {
    const newPurchase: TPurchase = { userId, productId, quantity, totalPrice }
    purchases.push(newPurchase)
    console.log("Compra realizada com sucesso");
}

export function getAllPurchasesFromUserId(userIdToSearch: string): TPurchase[] | undefined {
    return purchases.filter((purchase) => {
        return purchase.userId === userIdToSearch
    })
}