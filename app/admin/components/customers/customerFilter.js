"use client";

import { Search } from "lucide-react";

export default function CustomerFilters({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
}) {
  const statuses = [
    "All",
    "Active",
    "Inactive",
  ];

  const sortOptions = [
    "Newest",
    "Oldest",
    "Top Spending",
  ];

  return (
    <div className="mb-5 space-y-5">
      {/* Search */}
      <div className="flex h-13 items-center rounded-xl border border-gray-200 bg-white px-4">
        <Search
          size={20}
          className="text-gray-400"
        />

        <input
          type="text"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search by name or email..."
          className="ml-3 h-full w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
        />
      </div>

      {/* Status */}
      <div>
        <p className="mb-3 text-sm font-semibold text-gray-700">
          Filter by status
        </p>

        <div className="flex flex-wrap gap-2">
          {statuses.map((status) => {
            const active =
              statusFilter === status;

            return (
              <button
                key={status}
                type="button"
                onClick={() =>
                  setStatusFilter(status)
                }
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "border-[#C8A96E] bg-[#C8A96E] text-white"
                    : "border-gray-200 bg-white text-gray-600 hover:border-[#C8A96E]"
                }`}
              >
                {status}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sorting */}
      <div>
        <p className="mb-3 text-sm font-semibold text-gray-700">
          Sort customers
        </p>

        <div className="flex flex-wrap gap-2">
          {sortOptions.map((option) => {
            const active = sortBy === option;

            return (
              <button
                key={option}
                type="button"
                onClick={() =>
                  setSortBy(option)
                }
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "border-[#C8A96E] bg-[#C8A96E] text-white"
                    : "border-gray-200 bg-white text-gray-600 hover:border-[#C8A96E]"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}