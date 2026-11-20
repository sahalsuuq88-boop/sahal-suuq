"use client";

import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  Search,
  X,
  Heart,
  ShoppingCart,
  Star,
  ImageOff,
  AlertCircle,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";

import useProducts from "../../hook/useProducts";
import useCategory from "../../hook/useCategory";
import { useWishlistContext } from "../../context/wishlist";
import { useShop } from "../../ShopContext";

export default function Shop() {
  const router = useRouter();

  const {
    items: products,
    loading,
    error,
    getAll,
  } = useProducts();

  const {
    items: categories,
    getAll: getCategories,
    loading: categoriesLoading,
  } = useCategory();

  const { isWishlisted, toggleWishlist } =
    useWishlistContext();

  const { addToCart } = useShop();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] =
    useState("All");
  const [sortPrice, setSortPrice] =
    useState("default");

  // Selected unit for each product
  const [selectedUnits, setSelectedUnits] =
    useState({});

  useEffect(() => {
    getAll();
    getCategories();
  }, []);

  const productList = Array.isArray(products)
    ? products
    : products?.data || [];

  const categoryList = Array.isArray(categories)
    ? categories
    : categories?.data ||
      categories?.categories ||
      [];

  // =========================
  // FILTER + SEARCH + SORT
  // =========================

  const filteredProducts = useMemo(() => {
    let result = [...productList];

    // SEARCH
    if (search.trim()) {
      const searchText =
        search.toLowerCase().trim();

      result = result.filter((product) =>
        (product?.name || "")
          .toLowerCase()
          .includes(searchText)
      );
    }

    // CATEGORY
    if (categoryFilter !== "All") {
      result = result.filter((product) => {
        const productCategory =
          product?.category;

        if (!productCategory) return false;

        if (
          typeof productCategory === "object"
        ) {
          return (
            String(productCategory?._id) ===
            String(categoryFilter)
          );
        }

        return (
          String(productCategory) ===
          String(categoryFilter)
        );
      });
    }

    // PRICE SORT
    if (sortPrice === "low-high") {
      result.sort(
        (a, b) =>
          Number(a?.price || 0) -
          Number(b?.price || 0)
      );
    }

    if (sortPrice === "high-low") {
      result.sort(
        (a, b) =>
          Number(b?.price || 0) -
          Number(a?.price || 0)
      );
    }

    return result;
  }, [
    productList,
    search,
    categoryFilter,
    sortPrice,
  ]);

  // =========================
  // WISHLIST
  // =========================

  const handleWishlist = async (product) => {
    try {
      await toggleWishlist(product);
    } catch (error) {
      console.log(
        "Wishlist error:",
        error?.response?.data ||
          error?.message
      );
    }
  };

  // =========================
  // UNIT
  // =========================

  const getSelectedUnit = (product) => {
    const units = Array.isArray(product?.units)
      ? product.units
      : [];

    if (units.length === 0) {
      return null;
    }

    const selectedIndex =
      selectedUnits[product?._id] ?? 0;

    return units[selectedIndex] || units[0];
  };

  const handleUnitChange = (
    product,
    index
  ) => {
    setSelectedUnits((prev) => ({
      ...prev,
      [product._id]: index,
    }));
  };

  // =========================
  // ADD TO CART
  // =========================

  const handleAddToCart = (product) => {
    if (!addToCart) return;

    const selectedUnit =
      getSelectedUnit(product);

    const selectedPrice =
      selectedUnit?.price !== undefined
        ? Number(selectedUnit.price)
        : Number(product?.price || 0);

    const productForCart = {
      ...product,

      // Unit selected by customer
      selectedUnit:
        selectedUnit?.name || null,

      // Price of selected unit
      selectedPrice,

      // Keep normal price compatible
      price: selectedPrice,
    };

    addToCart(productForCart);
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF8F5]">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#E7E5E4] border-t-[#2D2417]" />

          <p className="mt-4 text-sm text-stone-500">
            Loading products...
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF8F5]">
        <div className="text-center">
          <AlertCircle
            size={50}
            className="mx-auto text-red-500"
          />

          <p className="mt-3 text-base font-bold text-red-500">
            Could not load products
          </p>

          <button
            onClick={getAll}
            className="mt-4 rounded-lg bg-[#2D2417] px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* HEADER */}

        <div className="mb-7">

          {/* Search */}

          <div className="mb-5 flex h-[52px] items-center rounded-[14px] border border-stone-200 bg-white px-4">
            <Search
              size={20}
              className="shrink-0 text-stone-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search products..."
              className="ml-3 flex-1 border-none bg-transparent text-sm text-[#2D2417] outline-none placeholder:text-stone-400"
            />

            {search.length > 0 && (
              <button
                onClick={() => setSearch("")}
                className="text-stone-400 hover:text-stone-600"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Categories */}

          {!categoriesLoading &&
            categoryList.length > 0 && (
              <div className="mb-5">
                <p className="mb-2.5 text-sm font-bold text-[#2D2417]">
                  Categories
                </p>

                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  <button
                    onClick={() =>
                      setCategoryFilter("All")
                    }
                    className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition ${
                      categoryFilter === "All"
                        ? "border-[#2D2417] bg-[#2D2417] text-white"
                        : "border-stone-200 bg-white text-stone-600 hover:border-[#2D2417]"
                    }`}
                  >
                    All
                  </button>

                  {categoryList.map(
                    (category) => (
                      <button
                        key={category?._id}
                        onClick={() =>
                          setCategoryFilter(
                            category?._id
                          )
                        }
                        className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition ${
                          String(
                            categoryFilter
                          ) ===
                          String(category?._id)
                            ? "border-[#2D2417] bg-[#2D2417] text-white"
                            : "border-stone-200 bg-white text-stone-600 hover:border-[#2D2417]"
                        }`}
                      >
                        {category?.name}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}

          {/* Sort */}

          <div className="mb-5 flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-3 py-2">
              <SlidersHorizontal
                size={15}
                className="text-stone-500"
              />

              <span className="text-xs font-semibold text-stone-500">
                Sort:
              </span>

              <select
                value={sortPrice}
                onChange={(e) =>
                  setSortPrice(e.target.value)
                }
                className="cursor-pointer bg-transparent text-xs font-bold text-[#2D2417] outline-none"
              >
                <option value="default">
                  Default
                </option>

                <option value="low-high">
                  Price: Low to High
                </option>

                <option value="high-low">
                  Price: High to Low
                </option>
              </select>

              <ChevronDown
                size={14}
                className="text-stone-500"
              />
            </div>
          </div>

          {/* Result Count */}

          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#2D2417]">
              Products
            </h2>

            <span className="text-xs text-stone-500">
              {filteredProducts.length} items
            </span>
          </div>
        </div>

        {/* PRODUCTS */}

        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Search
              size={50}
              className="text-stone-300"
            />

            <h3 className="mt-4 text-lg font-bold text-[#2D2417]">
              No products found
            </h3>

            <p className="mt-1 text-xs text-stone-400">
              Try another search or category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

            {filteredProducts.map((product) => {
              const productId =
                product?._id ||
                product?.id;

              const liked =
                isWishlisted(productId);

              const rating = Number(
                product?.rating || 4.5
              );

              const units = Array.isArray(
                product?.units
              )
                ? product.units
                : [];

              const selectedUnit =
                getSelectedUnit(product);

              const displayPrice =
                selectedUnit?.price !==
                undefined
                  ? Number(
                      selectedUnit.price
                    )
                  : Number(
                      product?.price || 0
                    );

              return (
                <div
                  key={productId}
                  className="rounded-[18px] border border-stone-100 bg-white p-2.5 transition-shadow hover:shadow-md"
                >

                  {/* IMAGE */}

                  <div className="relative flex h-[150px] w-full items-center justify-center overflow-hidden rounded-[14px] bg-[#F8F6F2]">

                    {/* Badge */}

                    {product?.badge && (
                      <div className="absolute left-2.5 top-2.5 z-10 rounded-md bg-[#2D2417] px-2 py-1">
                        <span className="text-[7px] font-black tracking-widest text-[#C8A96E]">
                          {product.badge}
                        </span>
                      </div>
                    )}

                    {/* Wishlist */}

                    <button
                      onClick={() =>
                        handleWishlist(
                          product
                        )
                      }
                      className="absolute right-2.5 top-2.5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-stone-100 bg-white shadow-sm transition hover:scale-105"
                    >
                      <Heart
                        size={21}
                        className={
                          liked
                            ? "fill-red-500 text-red-500"
                            : "text-[#2D2417]"
                        }
                      />
                    </button>

                    {/* Product Image */}

                    {product?.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={
                          product?.name ||
                          "Product"
                        }
                        width={300}
                        height={300}
                        className="h-[80%] w-[80%] object-contain"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <ImageOff
                          size={35}
                          className="text-stone-400"
                        />

                        <span className="mt-1 text-[9px] text-stone-400">
                          No Image
                        </span>
                      </div>
                    )}
                  </div>

                  {/* CONTENT */}

                  <div className="pt-2.5">

                    {/* Category */}

                    <p className="text-[7px] font-extrabold uppercase tracking-[1.3px] text-[#C8A96E]">
                      {product?.category?.name ||
                        "DEPARTMENT"}
                    </p>

                    {/* Name */}

                    <h3 className="mt-1 truncate text-xs font-semibold text-[#2D2417]">
                      {product?.name ||
                        "Product Name"}
                    </h3>

                    {/* Rating */}

                    <div className="mt-1.5 flex items-center">
                      <div className="flex gap-[1px]">
                        {[1, 2, 3, 4, 5].map(
                          (star) => (
                            <Star
                              key={star}
                              size={10}
                              className={
                                star <=
                                Math.round(
                                  rating
                                )
                                  ? "fill-amber-500 text-amber-500"
                                  : "text-stone-300"
                              }
                            />
                          )
                        )}
                      </div>

                      <span className="ml-1 text-[9px] text-stone-400">
                        {rating.toFixed(1)}
                      </span>
                    </div>

                    {/* UNITS */}

                    {units.length > 0 && (
                      <div className="mt-2.5">
                        <p className="mb-1.5 text-[9px] font-bold text-stone-500">
                          Choose unit
                        </p>

                        <div className="flex flex-wrap gap-1">
                          {units.map(
                            (unit, index) => {
                              const active =
                                (selectedUnits[
                                  productId
                                ] ?? 0) ===
                                index;

                              return (
                                <button
                                  key={`${productId}-unit-${index}`}
                                  type="button"
                                  onClick={() =>
                                    handleUnitChange(
                                      product,
                                      index
                                    )
                                  }
                                  className={`rounded-md border px-2 py-1 text-[9px] font-bold transition ${
                                    active
                                      ? "border-[#2D2417] bg-[#2D2417] text-white"
                                      : "border-stone-200 bg-white text-[#2D2417] hover:bg-[#F8F6F2]"
                                  }`}
                                >
                                  {unit?.name}
                                </button>
                              );
                            }
                          )}
                        </div>
                      </div>
                    )}

                    {/* Bottom */}

                    <div className="mt-2.5 flex items-center justify-between border-t border-stone-100 pt-2">
                      <span className="text-[13px] font-extrabold text-[#2D2417]">
                        $
                        {displayPrice.toFixed(
                          2
                        )}
                      </span>

                      <button
                        onClick={() =>
                          handleAddToCart(
                            product
                          )
                        }
                        className="flex h-[29px] items-center gap-1 rounded-lg bg-[#2D2417] px-2.5 text-[8px] font-extrabold text-white transition hover:bg-[#3d3020]"
                      >
                        <ShoppingCart
                          size={11}
                        />

                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}