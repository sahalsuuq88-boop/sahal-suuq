"use client";

import { ProductRow } from "./ProductRow";

export default function ProductTable({
  products,
  loading,
  error,
  remove,
  onEdit,
}) {
  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-600">{error}</div>;
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-background">
      {" "}
      <table className="w-full">
        {" "}
        <thead className="bg-[#C8A96E] text-white">
          {" "}
          <tr>
            {" "}
            <th className="px-6 py-4 text-left">Product</th>{" "}
            <th className="px-6 py-4 text-left">Category</th>{" "}
            <th className="px-6 py-4 text-left">Price</th>{" "}
            <th className="px-6 py-4 text-left">Stock</th>{" "}
            <th className="px-6 py-4 text-left">Status</th>{" "}
            <th className="px-6 py-4 text-right">Actions</th>{" "}
          </tr>{" "}
        </thead>
        <tbody>
          {products?.length ? (
            products.map((product) => (
              <ProductRow
                key={product._id}
                product={product}
                remove={remove}
                onEdit={onEdit}
              />
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
                className="py-16 text-center text-muted-foreground"
              >
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
