"use client";

import usecategory from "../../../hook/useCategory";
import React, { useEffect } from "react";

const statuses = [
  "All",
  "In Stock",
  "Low Stock",
  "Out Of Stock",
];

export default function ProductFilters({
  search,
  setSearch,
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
}) {
  const {
    items: categories,
    getAll: getCategories,
    loading: categoriesLoading,
  } = usecategory();

  useEffect(() => {
    getCategories();
  }, []);

  const categoriesList = Array.isArray(categories)
    ? categories
    : categories?.data ||
      categories?.categories ||
      [];

  return (
    <div className="space-y-5">

      {/* SEARCH */}
      <div className="flex h-12 items-center rounded-xl border border-[#E5E5E5] bg-white px-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-[#777]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
          />
        </svg>

        <input
          type="text"
          value={search || ""}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search products..."
          className="ml-3 w-full bg-transparent text-sm text-[#222] outline-none placeholder:text-[#999]"
        />
      </div>

      {/* CATEGORY */}
      <div>
        <h3 className="mb-2 text-sm font-bold text-[#333]">
          Category
        </h3>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">

          <button
            type="button"
            onClick={() =>
              setCategoryFilter("All")
            }
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${
              categoryFilter === "All"
                ? "border-[#2D2417] bg-[#2D2417] text-white"
                : "border-[#E1E1E1] bg-white text-[#555] hover:bg-gray-50"
            }`}
          >
            All
          </button>

          {categoriesLoading ? (
            <span className="px-3 py-2 text-sm text-gray-400">
              Loading...
            </span>
          ) : (
            categoriesList.map((item) => {
              const active =
                categoryFilter === item._id;

              return (
                <button
                  type="button"
                  key={item._id}
                  onClick={() =>
                    setCategoryFilter(item._id)
                  }
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${
                    active
                      ? "border-[#2D2417] bg-[#2D2417] text-white"
                      : "border-[#E1E1E1] bg-white text-[#555] hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* STATUS */}
      <div>
        <h3 className="mb-2 text-sm font-bold text-[#333]">
          Stock Status
        </h3>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {statuses.map((item) => {
            const active =
              statusFilter === item;

            return (
              <button
                type="button"
                key={item}
                onClick={() =>
                  setStatusFilter(item)
                }
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "border-[#2D2417] bg-[#2D2417] text-white"
                    : "border-[#E1E1E1] bg-white text-[#555] hover:bg-gray-50"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}