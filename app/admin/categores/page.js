"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import useCategory from "../../hook/useCategory";
import CategoryFilters from "../components/categoreis/categoresFilter";
import CategoryTable from "../components/categoreis/categoresTable";
import AddCategoryDialog from "../components/categoreis/categoresDailog";

export default function CategoriesPage() {
  const {
    items: category,
    loading,
    error,
    getAll,
    create,
    update,
    remove,
  } = useCategory();

  const [search, setSearch] = useState("");
  const [addVisible, setAddVisible] = useState(false);

  useEffect(() => {
    getAll();
  }, []);

  const categoriesList = Array.isArray(category)
    ? category
    : category?.data || category?.categories || [];

  const filteredCategories = categoriesList.filter((cat) => {
    if (!cat) return false;

    const categoryName = cat.name || "";

    return categoryName.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-5 md:p-8">
      {" "}
      <div className="mx-auto max-w-6xl">
        {/* HEADER */}{" "}
        <div className="mb-6 flex items-center justify-between gap-4">
          {" "}
          <div>
            {" "}
            <h1 className="text-3xl font-bold text-[#222]">Categories </h1>
            <p className="mt-1 text-sm text-[#888]">
              Explore our product categories
            </p>
          </div>
          <button
            onClick={() => setAddVisible(true)}
            className="flex items-center gap-2 rounded-xl bg-[#222] px-4 py-3 text-sm font-semibold text-white transition hover:bg-black"
          >
            <Plus size={20} />

            <span>Add Category</span>
          </button>
        </div>
        {/* SEARCH */}
        <CategoryFilters search={search} setSearch={setSearch} />
        {/* CATEGORIES */}
        <CategoryTable
          category={filteredCategories}
          loading={loading}
          error={error}
          getAll={getAll}
          update={update}
          remove={remove}
        />
        {/* ADD CATEGORY MODAL */}
        <AddCategoryDialog
          visible={addVisible}
          setVisible={setAddVisible}
          create={create}
          getAll={getAll}
        />
      </div>
    </div>
  );
}
