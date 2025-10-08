'use client'
import OrderCheckout from '@/components/OrderCheckout';
import { useCart } from '@/hooks/useCart'; 

export default function CartPage() {

    const { cartItems, cartTotal, clearCart } = useCart();


    const CartItemDisplay = ({ item }: { item: typeof cartItems[0] }) => (
        <div key={item.id} className="flex justify-between items-center py-2 border-b">
            <div className="text-gray-700">
                {item.title} <span className="text-sm text-gray-500">({item.quantity}x)</span>
            </div>
            <div className="font-semibold text-gray-800">
                ${(item.price * item.quantity).toFixed(2)}
            </div>
        </div>
    );

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">Your Shopping Cart</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
               
                <div className="md:col-span-2">
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Items</h2>
                        
                        {cartItems.length === 0 ? (
                            <p className="text-gray-500">Your cart is empty. Add some products!</p>
                        ) : (
                            <div className="space-y-2">
                                {cartItems.map((item) => (
                                    <CartItemDisplay key={item.id} item={item} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="md:col-span-1">
                    <OrderCheckout
                        cartProducts={cartItems}
                        cartTotal={cartTotal}
                        onCheckoutSuccess={clearCart} 
                    />
                </div>
            </div>
            
            <div className="mt-8 text-center text-sm text-gray-500">
                This is a simulated checkout.
            </div>
        </div>
    );
}