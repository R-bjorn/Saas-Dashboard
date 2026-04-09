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
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");
  const [search, setSearch] = useState("");

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

  const filteredProducts = products
  .filter((p) =>
    filter === "all" ? true : p.status === filter
  )
  .filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

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

      {/* Search Input Bar */}
      <input
        type="text"
        placeholder="Search products..."
        className="border px-3 py-1 mb-4 w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Filter Bar */}
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1 border ${
            filter === "all" ? "bg-gray-50 text-gray-900" : ""
          }`}
        >
          All
        </button>

        <button
          onClick={() => setFilter("active")}
          className={`px-3 py-1 border ${
            filter === "active" ? "bg-gray-50 text-gray-900" : ""
          }`}
        >
          Active
        </button>

        <button
          onClick={() => setFilter("inactive")}
          className={`px-3 py-1 border ${
            filter === "inactive" ? "bg-gray-50 text-gray-900" : ""
          }`}
        >
          Inactive
        </button>
      </div>

      <ProductTable
        products={filteredProducts}
        role={role}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}