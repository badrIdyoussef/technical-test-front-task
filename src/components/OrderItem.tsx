import { UnifiedOrder, LocalOrder, CartProduct } from  "@/lib/orders"; 

interface OrderItemProps {
    cart: UnifiedOrder; 
    isLocal?: boolean; 
}

export default function OrderItem({ cart, isLocal = false }: OrderItemProps) {

    const totalItems = cart.products.reduce((sum: number, p: { quantity: number; }) => sum + p.quantity, 0);


    const bgColor = isLocal ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-gray-200'; 

    const isLocalOrder = 'createdAt' in cart; 

    return (
        <div className={`border p-4 rounded-xl mb-6 shadow-lg ${bgColor}`}>
            <div className="flex justify-between items-start mb-4 border-b pb-3">
                
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-500">Order ID:</span>
                    <span className={`text-xl font-bold ${isLocalOrder ? 'text-indigo-800' : 'text-indigo-600'}`}>
                        {isLocalOrder ? 'LCL-' : '#'}
                        {cart.id}
                    </span>
                    {isLocalOrder && (
                        <span className="text-xs text-green-600 font-semibold mt-1">
                            (Local Order - {new Date((cart as LocalOrder).createdAt).toLocaleDateString()})
                        </span>
                    )}
                </div>
                
                <div className="text-right">
                    <span className="text-sm font-medium text-gray-500">Total:</span>
                    <span className="text-2xl font-extrabold text-gray-900 ml-2">${cart.total.toFixed(2)}</span>
                </div>
            </div>

            <div className="text-sm text-gray-600 mb-4 flex justify-between">
                <span>Products: <strong className="font-semibold">{cart.totalProducts}</strong></span>
                <span>Total Quantity: <strong className="font-semibold">{totalItems}</strong></span>
            </div>

            <h4 className="text-sm font-semibold text-gray-700 mb-2">Items Purchased:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {cart.products.map((product: CartProduct) => (
                    <div 
                        key={product.id} 
                        className="p-3 border border-gray-100 rounded-lg bg-gray-50 hover:shadow-md transition-shadow"
                    >
                        <p className="font-semibold text-sm truncate text-gray-800">{product.title}</p>
                        <p className="text-xs text-gray-500 mt-1">
                            Qty: <strong className="text-gray-700">{product.quantity}</strong> | Price/unit: ${product.price.toFixed(2)}
                        </p>
                        <p className="text-xs text-indigo-600 font-medium">
                            Subtotal: ${(product.price * product.quantity).toFixed(2)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}