'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface CartProduct {
    id: number;
    title: string;
    price: number;
    quantity: number;
    total?: number; 
}

export interface LocalOrder {
    id: string | number; 
    userId: number; 
    products: CartProduct[];
    total: number;
    totalProducts: number;
    totalQuantity: number;
    createdAt: number; 
}



const LOCAL_STORAGE_KEY = 'visionyze_local_orders';

export interface LocalOrdersContextType {
    localOrders: LocalOrder[];
    addLocalOrder: (products: CartProduct[], totalAmount: number) => void;
}

const LocalOrdersContext = createContext<LocalOrdersContextType | undefined>(undefined);


export const LocalOrdersProvider = ({ children }: { children: React.ReactNode }) => {
    const [localOrders, setLocalOrders] = useState<LocalOrder[]>([]);


    useEffect(() => {
        const storedOrders = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedOrders) {
            setLocalOrders(JSON.parse(storedOrders));
        }
    }, []);

    useEffect(() => {
        if (localOrders.length > 0) {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localOrders));
        } else if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
            localStorage.removeItem(LOCAL_STORAGE_KEY);
        }
    }, [localOrders]);

    const addLocalOrder = useCallback((
        products: CartProduct[], 
        totalAmount: number
    ) => {
        if (products.length === 0) return;

        const newOrder: LocalOrder = {
            id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`, 
            userId: 1, 
            products: products,
            total: totalAmount,
            totalProducts: products.length,
            totalQuantity: products.reduce((sum, p) => sum + p.quantity, 0),
            createdAt: Date.now(),
        };

        setLocalOrders(prev => [newOrder, ...prev]); 
    }, []);

    const value = {
        localOrders,
        addLocalOrder,
    };

    return (
        <LocalOrdersContext.Provider value={value}>
            {children}
        </LocalOrdersContext.Provider>
    );
};

export const useLocalOrders = () => {
    const context = useContext(LocalOrdersContext);
    if (context === undefined) {
        throw new Error('useLocalOrders must be used within a LocalOrdersProvider');
    }
    return context;
};