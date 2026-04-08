"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Product } from "@/types/product";
import ProductForm from "@/components/ProductForm";

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await apiFetch("/api/products");
    setProducts(data);
  };

  const totalProducts = products.length;
  const activeProducts = products.filter(
    (p) => p.status === "active"
  ).length;
  const totalRevenue = products.reduce(
    (sum, p) => sum + p.price,
    0
  );

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="border p-4">
          Total Products: {totalProducts}
        </div>
        <div className="border p-4">
          Active Products: {activeProducts}
        </div>
        <div className="border p-4">
          Revenue: ${totalRevenue}
        </div>
      </div>

      <ProductForm onCreated={fetchProducts} />

      {/* Product Table */}
      <table className="w-full border">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-t">
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>${p.price}</td>
              <td>{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}