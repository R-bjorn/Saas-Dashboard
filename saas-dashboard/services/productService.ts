import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "@/repositories/productRepository";
import { Product } from "@/types/product";

export async function createProductService(data: Product) {
  if (!data.name || !data.price) {
    throw new Error("Invalid product data");
  }

  return await createProduct({
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}

export async function getProductsService() {
  return await getProducts();
}

export async function updateProductService(
  id: string,
  data: Partial<Product>
) {
  if (!id) throw new Error("Product ID required");

  return await updateProduct(id, data);
}

export async function deleteProductService(id: string) {
  if (!id) throw new Error("Product ID required");

  return await deleteProduct(id);
}