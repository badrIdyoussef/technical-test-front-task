'use client';

import { useLocalOrders } from '@/context/LocalOrdersContext';
import { useRouter } from 'next/navigation';

import type { CartProduct } from '@/context/LocalOrdersContext'; 

interface OrderCheckoutProps {

    cartProducts: CartProduct[];
    cartTotal: number;
    //function to reset the cart in the parent component after successful checkout
    onCheckoutSuccess: () => void; 
}

export default function OrderCheckout({
    cartProducts,
    cartTotal,
    onCheckoutSuccess,
}: OrderCheckoutProps) {
    
    const { addLocalOrder } = useLocalOrders();
    const router = useRouter();

    const isCartEmpty = cartProducts.length === 0;

    const handleSimulatedCheckout = () => {
        if (isCartEmpty) {
            alert("Your cart is empty! Add some products first.");
            return;
        }
        
        addLocalOrder(cartProducts, cartTotal);

        onCheckoutSuccess(); 

        router.push('/orders');
    };

    return (
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Order Summary</h3>
            
            <div className="flex justify-between items-center text-lg font-bold mb-4 border-t pt-2">
                <span>Total:</span>
                <span className="text-2xl text-indigo-700">${cartTotal.toFixed(2)}</span>
            </div>

            <button 
                onClick={handleSimulatedCheckout} 
                disabled={isCartEmpty}
                className="w-full bg-green-600 text-white font-medium py-3 rounded-md hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                Confirm Purchase (Simulated)
            </button>
            
            {isCartEmpty && (
                <p className="text-sm text-red-500 mt-2 text-center">
                    Cannot checkout with an empty cart.
                </p>
            )}
        </div>
    );
}