import { Product } from "@/types/product";

type Props = {
  products: Product[];
};

export default function MetricsCards({ products }: Props) {
  const totalProducts = products.length;

  const activeProducts = products.filter(
    (p) => p.status === "active"
  ).length;

  const totalRevenue = products.reduce(
    (sum, p) => sum + p.price,
    0
  );

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="border p-4">
        <p className="text-sm text-gray-500">Total Products</p>
        <p className="text-xl font-bold">{totalProducts}</p>
      </div>

      <div className="border p-4">
        <p className="text-sm text-gray-500">Active Products</p>
        <p className="text-xl font-bold">{activeProducts}</p>
      </div>

      <div className="border p-4">
        <p className="text-sm text-gray-500">Revenue</p>
        <p className="text-xl font-bold">${totalRevenue}</p>
      </div>
    </div>
  );
}