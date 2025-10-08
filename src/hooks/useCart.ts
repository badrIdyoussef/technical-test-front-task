'use client';

import { useState, useMemo } from 'react';
import type { CartProduct } from '@/context/LocalOrdersContext'; 

// Dummy Product List for demonstration
const INITIAL_PRODUCTS: CartProduct[] = [
    { id: 1, title: 'Wireless Headphones', price: 99.99, quantity: 1 },
    { id: 2, title: 'Mechanical Keyboard', price: 125.50, quantity: 2 },
    { id: 3, title: 'Ergonomic Mouse', price: 45.00, quantity: 1 },
];

export function useCart() {

    const [cartItems, setCartItems] = useState<CartProduct[]>(INITIAL_PRODUCTS);


    const cartTotal = useMemo(() => {
        return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }, [cartItems]);


    const clearCart = () => {
        setCartItems([]);
    };

    return {
        cartItems,
        cartTotal,
        clearCart,
    };
}