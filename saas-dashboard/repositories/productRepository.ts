import { adminDb } from "@/lib/firebaseAdmin";
import { Product } from "@/types/product";

const collection = adminDb.collection("products");

export async function createProduct(data: Product) {
  const docRef = await collection.add(data);
  return { id: docRef.id, ...data };
}

export async function getProducts() {
  const snapshot = await collection.get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];
}

export async function updateProduct(id: string, data: Partial<Product>) {
  await collection.doc(id).update({
    ...data,
    updatedAt: new Date(),
  });
}

export async function deleteProduct(id: string) {
  await collection.doc(id).delete();
}