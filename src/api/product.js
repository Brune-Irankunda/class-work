
import { api } from "./client";

// 1. Fetch all products
export async function fetchProducts({
  limit = 12,
  skip = 0,
  signal,
} = {}) {
  const { data } = await api.get("/products", {
    params: { limit, skip },
    signal,
  });

  return data;
}

// 2. Fetch one product by ID
export async function fetchProduct(id, { signal } = {}) {
  const { data } = await api.get(`/products/${id}`, {
    signal,
  });

  return data;
}

// 3. Fetch all product categories
export async function fetchCategories({ signal } = {}) {
  const { data } = await api.get("/products/category-list", {
    signal,
  });

  return data;
}

// 4. Search products
export async function searchProducts(query, { signal } = {}) {
  const { data } = await api.get("/products/search", {
    params: { q: query },
    signal,
  });

  return data;
}

// 5. Create a new product
export async function createProduct(product) {
  const { data } = await api.post("/products/add", product);

  return data;
}

// 6. Delete a product
export async function deleteProduct(id) {
  const { data } = await api.delete(`/products/${id}`);

  return data;
}
