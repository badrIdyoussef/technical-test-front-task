/**
 * API client (DummyJSON) — *AUCUNE logique implémentée*.
 * Implémentez les fonctions en suivant le contrat du README.
 */
const BASE = process.env.NEXT_PUBLIC_API_BASE || "https://dummyjson.com";
export type ProductsResponse = { products: any[]; total: number; skip: number; limit: number };
export type CartsResponse = { carts: any[]; total: number; skip: number; limit: number };
export type UsersResponse = { users: any[]; total: number; skip: number; limit: number };

/** TODO: implémentez fetchProducts(limit, skip) */
export async function fetchProducts(limit=12, skip=0): Promise<ProductsResponse> {
  
  try {
    let products = await fetch(`${BASE}/products?limit=${limit}&skip=${skip}`)
    let productsData = await products.json()
    return productsData
    
  } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch Products" );

  }

}

/** TODO: implémentez searchProducts(query, limit, skip) */
export async function searchProducts(query:string, limit=12, skip=0): Promise<ProductsResponse> {

  try {

    let product = await fetch(`${BASE}/products/search?q=${query} &limit=${limit}&skip=${skip}`)
    let productData = await product.json()
    return productData
    
  } catch (error) {
      console.error(error);

      throw new Error("Failed to search Products");

  }

}

/** TODO: implémentez fetchCategories() */
export async function fetchCategories(): Promise<string[]> {
  
  try {

    let productCategories = await fetch(`${BASE}/products/categories`)
    let productCategoriesData = await productCategories.json()
    return productCategoriesData
    
  } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch Categories");

  }

}

/** TODO: implémentez fetchProductsByCategory(category, limit, skip) */
export async function fetchProductsByCategory(category:string, limit=12, skip=0): Promise<ProductsResponse> {

  try {

    let productsByCategories = await fetch(`${BASE}/products/category/${category}?limit=${limit}&skip=${skip}`)
    let productsByCategoriesData = await productsByCategories.json()
    return productsByCategoriesData
    
  } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch Products By Category");

  }

}

/** TODO: implémentez fetchCarts(limit, skip) */
export async function fetchCarts(limit=5, skip=0): Promise<CartsResponse> {

  try {

    let Carts = await fetch(`${BASE}/carts?limit=${limit}&skip=${skip}`)
    let CartsData = await Carts.json()
    return CartsData
    
  } catch (error) {
      console.error(error);

      throw new Error("Failed to fetch Carts ");

  }

}

/** TODO: implémentez fetchUsers(limit, skip) */
export async function fetchUsers(limit=10, skip=0): Promise<UsersResponse> {


  try {

    let Users = await fetch(`${BASE}/users?limit=${limit}&skip=${skip}`)
    let UsersData = await Users.json()
    return UsersData
    
  } catch (error) {
      console.error(error);

      throw new Error("Failed to fetch Users");

  }

}


