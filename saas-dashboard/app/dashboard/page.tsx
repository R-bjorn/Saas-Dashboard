"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Product } from "@/types/product";
import ProductForm from "@/components/ProductForm";
import MetricsCards from "@/components/MetricsCards";
import ProductTable from "@/components/ProductTable";

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [role, setRole] = useState<"admin" | "viewer">("viewer");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      await fetchUser();
      await fetchProducts();
      setLoading(false);
    }
    init();
  }, []);

  const fetchProducts = async () => {
    const data = await apiFetch("/api/products");
    setProducts(data);
  };

  const fetchUser = async () => {
    const user = await apiFetch("/api/me");
    setRole(user.role);
  };

  const handleDelete = async (id: string) => {
    await apiFetch("/api/products", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });

    fetchProducts();
  };

  const handleEdit = async (product: Product) => {
    const newName = prompt("New name", product.name);
    if (!newName) return;

    await apiFetch("/api/products", {
      method: "PUT",
      body: JSON.stringify({
        id: product.id,
        name: newName,
      }),
    });

    fetchProducts();
  };

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <MetricsCards products={products} />

      {role === "admin" && (
        <ProductForm onCreated={fetchProducts} />
      )}

      <ProductTable
        products={products}
        role={role}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}