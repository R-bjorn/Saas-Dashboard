import { Product } from "@/types/product";

type Props = {
  products: Product[];
  role: "admin" | "viewer";
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
};

export default function ProductTable({
  products,
  role,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-200 text-left">
        
        {/* HEADER */}
        <thead className="bg-gray-50 text-gray-900">
          <tr>
            <th className="p-3 border-b border-gray-200 text-left font-semibold">
              Name
            </th>
            <th className="p-3 border-b border-gray-200 text-left font-semibold">
              Category
            </th>
            <th className="p-3 border-b border-gray-200 text-left font-semibold">
              Price
            </th>
            <th className="p-3 border-b border-gray-200 text-left font-semibold">
              Status
            </th>
            <th className="p-3 border-b border-gray-200 text-left font-semibold">
              Actions
            </th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody >
          {products.map((p) => (
            <tr
              key={p.id}
              className="hover:bg-gray-700  transition border-b border-gray-100"
            >
              <td className="p-3">{p.name}</td>
              <td className="p-3">{p.category}</td>
              <td className="p-3">${p.price}</td>
              <td className="p-3">{p.status}</td>

              <td className="p-3">
                {role === "admin" && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => onEdit(p)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(p.id!)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}