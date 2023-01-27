export type TPerson = {
    id: string;
    name: string;
    email: string;
    password: number;
    createdAt: string;
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
    description: string;
    imageUrl: string;
}

export type TPurchase = {
    id: string;
    total_price: number;
    paid: number;
    created_at: string;
    buyer_id: string;
}

export type TPurchasesProducts = {
    purchase_id: string;
    product_id: string;
    quantity: number;
}