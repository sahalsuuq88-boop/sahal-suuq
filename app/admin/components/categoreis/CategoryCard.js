"use client";

import { useState } from "react";
import { Package, Pencil, Trash2 } from "lucide-react";

import EditCategoryDialog from "./EditCategoryDialog";

export default function CategoryCard({ category, update, remove, getAll }) {
  const [editVisible, setEditVisible] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${category.name}"?`,
    );

    if (!confirmed) return;

    try {
      setDeleting(true);

      await remove(category._id || category.id);

      if (getAll) {
        await getAll();
      }
    } catch (error) {
      console.error(
        "Delete category error:",
        error?.response?.data || error?.message,
      );

      alert(error?.response?.data?.message || "Failed to delete category");
    } finally {
      setDeleting(false);
    }
  };

  const imageUrl = category.image || "https://via.placeholder.com/150";

  const productCount = category.count || category.products || 0;

  return (
    <>
      {" "}
      <div className="flex items-center gap-3 rounded-2xl border border-[#ECE8E1] bg-white p-3 transition hover:shadow-sm">
        {/* IMAGE */}{" "}
        <img
          src={imageUrl}
          alt={category.name}
          className="h-[70px] w-[70px] shrink-0 rounded-xl bg-[#F1F1F1] object-cover"
        />
        {/* INFO */}
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-bold text-[#222]">
            {category.name}
          </h3>

          <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#888]">
            {category.description || "No description"}
          </p>

          <div className="mt-2 flex items-center gap-1.5">
            <Package size={15} className="text-[#A4865A]" />

            <span className="text-xs font-semibold text-[#A4865A]">
              {productCount} Products
            </span>
          </div>
        </div>
        {/* ACTIONS */}
        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={() => setEditVisible(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F5F5F5] text-[#555] transition hover:bg-[#EAEAEA]"
            title="Edit category"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600 transition hover:bg-red-100 disabled:opacity-50"
            title="Delete category"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      <EditCategoryDialog
        category={category}
        visible={editVisible}
        setVisible={setEditVisible}
        update={update}
        getAll={getAll}
      />
    </>
  );
}
