'use client';

import OrderItem from "@/components/OrderItem";
import { useLocalOrders } from "@/context/LocalOrdersContext";
import { CartsResponse, fetchCarts } from "@/lib/api"; 
import { useQuery } from '@tanstack/react-query';


export default function Orders() {

    const { 
     data: cartsResponse, 
       isLoading, 
      isError,
      error} = useQuery<CartsResponse, Error>({
       queryKey: ['orders', { limit: 5, skip: 0 }], 
       queryFn: () => fetchCarts(5, 0), 
       staleTime: 1000 * 60 * 5, 
      });
      
       const dummyJsonCarts = cartsResponse?.carts || []; 

    const { localOrders } = useLocalOrders(); 
    const allOrdersCount = dummyJsonCarts.length + localOrders.length;


              return (
              <div className="max-w-6xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-2">
              Orders History ({allOrdersCount}) 
                </h2>

 
              {isLoading && (
              <div className="space-y-4">

              <div className="h-40 bg-gray-200 rounded-xl animate-pulse" />
              <div className="h-40 bg-gray-200 rounded-xl animate-pulse" />
              <div className="h-40 bg-gray-200 rounded-xl animate-pulse" />
              </div>
              )}

            {isError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline ml-2">Failed to load orders: {error.message}</span>
            </div>
            )}

            <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
                Local Orders ({localOrders.length})
            </h3>
            
            {localOrders.length > 0 ? (
                <div className="space-y-6">
                    {localOrders.map(order => (
                        <OrderItem key={order.id} cart={order} isLocal={true} />
                    ))}
                </div>
            ) : (
                <div className="text-center p-6 bg-white rounded-xl shadow-inner text-gray-500 mb-8">
                    No orders created locally.
                </div>
            )}


            {!isLoading && !isError && (
                <>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8 border-t pt-4">
                        DummyJSON Orders (Readonly)
                    </h3>
                
                    {dummyJsonCarts.length === 0 ? ( 
              
                      <div className="text-center p-12 bg-white rounded-xl shadow-inner text-gray-500">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No Orders Found</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                It looks like there are no completed orders yet from the API.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {dummyJsonCarts.map(cart => (
                                <OrderItem key={cart.id} cart={cart} isLocal={false} /> 
                            ))}
                        </div>
                    )}
                </>
            )}
  </div>
)}