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

  const [page, setPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    async function init() {
      await fetchUser();
      await fetchProducts();
      setLoading(false);
    }
    init();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [filter, search]);

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

  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * pageSize,
    page * pageSize
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
        products={paginatedProducts}
        role={role}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Pagination UI */}
      <div className="mt-4 flex items-center gap-2">
        {/* FIRST */}
        <button
          onClick={() => setPage(1)}
          disabled={page === 1}
          className="border px-3 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          First
        </button>

        {/* PREV */}
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="border px-3 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Prev
        </button>

        {/* PAGE INFO */}
        <span className="px-2">
          Page {page} of {totalPages || 1}
        </span>

        {/* NEXT */}
        <button
          onClick={() =>
            setPage((p) => Math.min(p + 1, totalPages))
          }
          disabled={page === totalPages || totalPages === 0}
          className="border px-3 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>

        {/* LAST */}
        <button
          onClick={() => setPage(totalPages)}
          disabled={page === totalPages || totalPages === 0}
          className="border px-3 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Last
        </button>
      </div>
    </div>
  );
}