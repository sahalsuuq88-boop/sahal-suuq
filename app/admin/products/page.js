"use client";

import useProducts from "../../hook/useProducts";
import React, { useEffect, useMemo, useState } from "react";
import ProductFilters from "../components/products/productFilter";
import ProductCard from "../components/products/ProductRow";
import AddProductDialog from "../components/products/add-product-dialog";
import EditProductDialog from "../components/products/editProduct";


export default function Products() {
  const {
    items: products,
    loading,
    error,
    getAllAdmin,
    create,
    update,
    remove,
  } = useProducts();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [addVisible, setAddVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  useEffect(() => {
    getAllAdmin();
  }, []);

  const productList = Array.isArray(products)
    ? products
    : products?.data || [];

  const filteredProducts = useMemo(() => {
    if (!Array.isArray(productList)) return [];

    return productList.filter((product) => {
      if (!product) return false;

      // SEARCH
      const matchesSearch = (product.name || "")
        .toLowerCase()
        .includes((search || "").toLowerCase());

      // CATEGORY
      let productCategoryId = "";
      let productCategoryName = "";

      if (product.category) {
        if (typeof product.category === "object") {
          productCategoryId = product.category._id || "";
          productCategoryName = product.category.name || "";
        } else {
          productCategoryId = String(product.category);
          productCategoryName = String(product.category);
        }
      }

      const matchesCategory =
        categoryFilter === "All" ||
        productCategoryId === categoryFilter ||
        productCategoryName.toLowerCase() ===
          categoryFilter.toLowerCase();

      // STOCK STATUS
      const stock = Number(product.stock) || 0;

      let matchesStatus = true;

      if (statusFilter === "In Stock") {
        matchesStatus = stock > 10;
      }

      if (statusFilter === "Low Stock") {
        matchesStatus = stock > 0 && stock <= 10;
      }

      if (statusFilter === "Out Of Stock") {
        matchesStatus = stock <= 0;
      }

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [
    productList,
    search,
    categoryFilter,
    statusFilter,
  ]);

  const handleOpenAdd = () => {
    setAddVisible(true);
  };

  const handleOpenEdit = (product) => {
    setProductToEdit(product);
    setEditVisible(true);
  };

  const handleCloseEdit = () => {
    setEditVisible(false);
    setProductToEdit(null);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#222] sm:text-3xl">
              Products
            </h1>

            <p className="mt-1 text-sm text-[#777]">
              Manage all products in your store.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenAdd}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2D2417] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3a3021] sm:w-auto"
          >
            <span className="text-xl leading-none">+</span>
            Add
          </button>
        </div>

        {/* FILTERS */}
        <ProductFilters
          search={search}
          setSearch={setSearch}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        {/* RESULTS HEADER */}
        <div className="mb-4 mt-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#222]">
            Products
          </h2>

          <span className="text-sm text-[#888]">
            {filteredProducts.length} items
          </span>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error?.message || "Failed to load products."}
          </div>
        )}

        {/* LOADING */}
        {loading ? (
          <div className="flex min-h-[250px] items-center justify-center rounded-2xl bg-white">
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#2D2417]" />

              <p className="text-sm text-gray-500">
                Loading products...
              </p>
            </div>
          </div>
        ) : filteredProducts.length === 0 ? (
          /* EMPTY */
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl bg-white px-5 text-center">
            <div className="text-5xl">📦</div>

            <h3 className="mt-4 text-lg font-bold text-[#555]">
              No products found
            </h3>

            <p className="mt-1 text-sm text-[#999]">
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          /* PRODUCTS */
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id || product.id}
                product={product}
                remove={remove}
                onEdit={handleOpenEdit}
                getAll={getAllAdmin}
              />
            ))}
          </div>
        )}
      </div>

      {/* ADD PRODUCT */}
      <AddProductDialog
        visible={addVisible}
        setVisible={setAddVisible}
        create={create}
        getAll={getAllAdmin}
      />

      {/* EDIT PRODUCT */}
      <EditProductDialog
        visible={editVisible}
        setVisible={handleCloseEdit}
        product={productToEdit}
        update={update}
        getAll={getAllAdmin}
      />
    </div>
  );
}