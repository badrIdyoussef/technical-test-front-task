"use client";


 const ProductCard = ({ product }) => (
  <div className="max-w-sm rounded overflow-hidden shadow-lg content-center bg-gray-50">
    
    {product.title && (
    <img alt="Sunset in the mountains" className="w-full" src={product.thumbnail} />
    )}
    <div className="px-6 py-4">
       {product.title && (
        <h2 className="font-bold text-xl mb-2 text-gray-700">{product.title}</h2>
        )}
       {product.description && (
      <p className="text-gray-700 text-base">{product.description}</p>
      )}
    </div>
    <div className="px-6 pt-4 pb-2">
      {product.price && (
      <span className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
        Price: ${ product.price}
      </span>
       )}
      {product.brand && (
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          Brand: {product.brand}
        </span>
      )}
    </div>
  </div>
);

export default ProductCard