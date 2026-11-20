"use client";

import { Search } from "lucide-react";

export default function CategoryFilters({ search, setSearch }) {
  return (
    <div className="relative mb-5">
      {" "}
      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777]"
      />
      <input
        type="text"
        placeholder="Search categories..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="h-12 w-full rounded-xl border border-[#E5E1DA] bg-white pl-11 pr-4 text-sm text-[#222] outline-none transition focus:border-[#C8A96E] focus:ring-2 focus:ring-[#C8A96E]/20"
      />
    </div>
  );
}
