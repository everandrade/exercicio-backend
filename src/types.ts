export type TPerson = {
    id: string;
    email: string;
    password: string;
}

export enum Category {
    SHIRT = "Camisa",
    TSHIRT = "Camiseta",
    REGATTA = "Regata"
}

export type TProduct = {
    id: string;
    name: string;
    price: number;
    category: Category;
}

export type TPurchase = {
    userId: string;
    productId: string;
    quantity: number;
    totalPrice: number;
}