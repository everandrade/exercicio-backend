import { TPerson, TProduct, TPurchase } from "./types";

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
        category: "regata"
    },
    {
        id: "idProduct02",
        name: "camiseta 02",
        price: 30,
        category: "camiseta"
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
    }
]