"use client";

import { Loader2, FolderOpen } from "lucide-react";
import CategoryCard from "./CategoryCard";

export default function CategoryTable({
  category,
  loading,
  error,
  remove,
  update,
  getAll,
}) {
  const categories = category || [];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        {" "}
        <Loader2 size={35} className="animate-spin text-[#222]" />
        <p className="mt-3 text-sm text-[#888]">Loading categories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 text-center">
        {" "}
        <p className="text-sm font-medium text-red-600">
          {error?.message || "Failed to load categories"}{" "}
        </p>{" "}
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        {" "}
        <FolderOpen size={48} className="text-[#aaa]" />
        <h3 className="mt-4 text-lg font-bold text-[#333]">
          No categories found
        </h3>
        <p className="mt-1 text-sm text-[#999]">
          Add your first category to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 pb-8">
      {categories.map((item) => (
        <CategoryCard
          key={item._id || item.id}
          category={item}
          update={update}
          remove={remove}
          getAll={getAll}
        />
      ))}{" "}
    </div>
  );
}
