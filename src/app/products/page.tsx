'use client';

import { 
  fetchCategories, 
  fetchProducts, 
  fetchProductsByCategory, 
  ProductsResponse, 
  searchProducts, 
} from "@/lib/api";
import { useState , useEffect } from "react";
import { useQuery } from '@tanstack/react-query';

import ProductCard from "@/components/ProductCard";

const PAGE_LIMIT = 12; 
const time2Wait  = 500;
export default function Products() {
  
  const [searchTerm, setSearchTerm] = useState(''); 
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(''); 
  const [selectedCategory, setSelectedCategory] = useState('');

  const [currentPage, setCurrentPage] = useState(1); 
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1); 
    }, time2Wait); 

    return () => clearTimeout(handler);
  }, [searchTerm]);


  const { data: categoryData } = useQuery<string[], Error>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const { 
    data: productList, 
    isError, 
    isFetching, 
    error 
  } = useQuery<ProductsResponse, Error>({
    queryKey: ['products', debouncedSearchTerm, selectedCategory, currentPage],
    
    queryFn: () => {
      const skip = (currentPage - 1) * PAGE_LIMIT;
      
      if (debouncedSearchTerm) {
        return searchProducts(debouncedSearchTerm, PAGE_LIMIT, skip);
      } else if (selectedCategory && selectedCategory !== '') { 
        return fetchProductsByCategory(selectedCategory, PAGE_LIMIT, skip);
      } else {
        return fetchProducts(PAGE_LIMIT, skip);
      }
    },
    keepPreviousData: true, 
  });


  const totalItems = productList?.total || 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_LIMIT));
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;
  const products = productList?.products || [];
  
  
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setSearchTerm(''); 
    setDebouncedSearchTerm('');
    setCurrentPage(1); 
  };

  const handleNextPage = () => {
    if (hasNextPage) setCurrentPage(prev => prev + 1);
  };

  const handlePrevPage = () => {
    if (hasPrevPage) setCurrentPage(prev => prev - 1);
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-3">Produits</h2>
      
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <input 
          className="input" 
          value={searchTerm} 
          onChange={e => setSearchTerm(e.target.value)} 
          placeholder="Recherche…" 
        />
        
        <select 
  className="input max-w-xs" 
  value={selectedCategory} 
  onChange={handleCategoryChange} 
>
  <option value="">Toutes Catégories</option> 
  
  {categoryData?.map((category, index) => 
    <option 
      key={index} 
      value={category.slug} 
    >
      {category.name}
    </option>
  )}
</select>
      </div>

      {isFetching && (
        <div className="grid md:grid-cols-3 gap-4">
          {[...Array(PAGE_LIMIT)].map((_, i) => (
            <div key={i} className="skeleton h-60 w-full" />
          ))}
        </div>
      )}

      {isError && (
        <div className="text-red-600 p-4 border border-red-300 rounded">
          Erreur de chargement: {error?.message || 'Une erreur inconnue est survenue.'}
        </div>
      )}

      {!isFetching && products.length === 0 && (
        <div className="text-center p-8 text-gray-500">
          Aucun produit trouvé pour ces critères.
        </div>
      )}

      {!isFetching && products.length > 0 && (
        <div className="grid md:grid-cols-3 gap-4">
          {products.map((product: ProductsResponse) => 
            <ProductCard key={product.id} product={product} />
          )}
        </div>
      )}
      

      {products.length > 0 && (
        <div className="flex items-center gap-2 mt-4">
          <button 
            className={`btn ${!hasPrevPage || isFetching ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handlePrevPage}
            disabled={!hasPrevPage || isFetching}
          >
            Préc.
          </button>
          
          <div className="text-sm">
            Page {currentPage} / {totalPages}
          </div>
          
          <button 
            className={`btn ${!hasNextPage || isFetching ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleNextPage}
            disabled={!hasNextPage || isFetching}
          >
            Suiv.
          </button>
          
          {isFetching && <span className="text-sm text-gray-500 ml-2">Mise à jour...</span>}
        </div>
      )}
    </div>
  );
}