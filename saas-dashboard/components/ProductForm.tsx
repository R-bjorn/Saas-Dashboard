"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";

export default function ProductForm({ onCreated }: { onCreated: () => void }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [status, setStatus] = useState("active");

  const handleSubmit = async () => {
    await apiFetch("/api/products", {
      method: "POST",
      body: JSON.stringify({
        name,
        category,
        price,
        status,
      }),
    });

    // reset form
    setName("");
    setCategory("");
    setPrice(0);
    setStatus("active");

    onCreated(); // refresh dashboard
  };

  return (
    <div className="border p-4 mb-6">
      <h2 className="font-bold mb-2">Add Product</h2>

      <input
        className="border p-2 mr-2"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="border p-2 mr-2"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        className="border p-2 mr-2"
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
      />

      <select
        className="border p-2 mr-2"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white p-2"
      >
        Create
      </button>
    </div>
  );
}