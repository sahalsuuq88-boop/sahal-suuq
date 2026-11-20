"use client";

import React from "react";
import Image from "next/image";

export default function ProductCard({ product, remove, onEdit, getAll }) {
  if (!product) return null;

  const categoryName =
    typeof product.category === "object" && product.category !== null
      ? product.category.name
      : product.category || "Uncategorized";

  const getStatus = (stock) => {
    if (stock > 10) {
      return {
        label: "In Stock",
        background: "bg-green-50",
        color: "text-green-700",
      };
    }

    if (stock > 0) {
      return {
        label: "Low Stock",
        background: "bg-yellow-50",
        color: "text-yellow-700",
      };
    }

    return {
      label: "Out Of Stock",
      background: "bg-red-50",
      color: "text-red-700",
    };
  };

  const status = getStatus(Number(product.stock) || 0);

  const units = Array.isArray(product.units) ? product.units : [];

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.name}"?`,
    );

    if (!confirmed) return;

    try {
      await remove(product._id);

      if (getAll) {
        await getAll();
      }

      window.alert("Product deleted successfully.");
    } catch (error) {
      console.error(
        "Delete product error:",
        error?.response?.data || error?.message,
      );

      window.alert(
        error?.response?.data?.message || "Failed to delete product.",
      );
    }
  };

  const imageUrl =
    product.imageUrl || product.image || "/placeholder-product.png";

  return (
    <div className="flex gap-4 rounded-2xl border border-[#EEEEEE] bg-white p-3 shadow-sm transition hover:shadow-md">
      {/* IMAGE */}{" "}
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#F1F1F1]">
        <Image
          src={imageUrl}
          alt={product.name || "Product"}
          fill
          sizes="96px"
          className="object-cover"
        />{" "}
      </div>
      {/* INFO */}
      <div className="min-w-0 flex-1">
        {/* TOP */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-base font-bold text-[#222]">
              {product.name}
            </h3>

            <p className="mt-1 text-xs text-[#888]">{categoryName}</p>
          </div>

          {/* BASE PRICE */}
          <p className="shrink-0 text-base font-bold text-[#2D2417]">
            ${Number(product.price || 0).toFixed(2)}
          </p>
        </div>

        {/* UNITS */}
        {units.length > 0 && (
          <div className="mt-3">
            <p className="mb-1 text-[11px] font-semibold text-[#999]">
              Units & Prices
            </p>

            <div className="flex flex-wrap gap-2">
              {units.map((unit, index) => (
                <div
                  key={`${unit.name}-${index}`}
                  className="rounded-lg border border-[#E8E1D6] bg-[#FAF8F5] px-2.5 py-1.5"
                >
                  <span className="text-xs font-semibold text-[#444]">
                    {unit.name}
                  </span>

                  <span className="ml-2 text-xs font-bold text-[#2D2417]">
                    ${Number(unit.price || 0).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MIDDLE */}
        <div className="mt-3 flex items-center justify-between">
          <div>
            <p className="text-[11px] text-[#999]">Stock</p>

            <p className="mt-0.5 text-sm font-semibold text-[#444]">
              {product.stock} units
            </p>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-[10px] font-bold ${status.background} ${status.color}`}
          >
            {status.label}
          </span>
        </div>

        {/* ACTIONS */}
        <div className="mt-3 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => onEdit(product)}
            className="flex items-center gap-1.5 rounded-lg bg-[#F3F3F3] px-3 py-1.5 text-xs font-semibold text-[#333] transition hover:bg-[#e9e9e9]"
          >
            ✎ Edit
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-100"
          >
            🗑 Delete
          </button>
        </div>
      </div>
    </div>
  );
}
