
import { CartsResponse } from "@/lib/api";

export interface CartProduct {
    id: number;
    title: string;
    price: number;
    quantity: number;
}

export interface LocalOrder {
    id: string | number; 
    products: CartProduct[];
    total: number;
    totalProducts: number;
    totalQuantity: number;
    createdAt: number; // 
}

export type UnifiedOrder = CartsResponse['carts'][number] | LocalOrder;