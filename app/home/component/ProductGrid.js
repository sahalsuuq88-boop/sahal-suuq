"use client";

import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Heart,
  Star,
  ImageOff,
  ChevronRight,
} from "lucide-react";

import useProducts from "../../hook/useProducts";
import useCategory from "../../hook/useCategory";
import { useWishlistContext } from "../../context/wishlist";
import { ShopContext } from "../../ShopContext";

export default function ProductGrid() {
  const router = useRouter();
  const context = useContext(ShopContext);

  const [activeCategory, setActiveCategory] = useState("ALL");

  // Selected unit for each product
  const [selectedUnits, setSelectedUnits] = useState({});

  const {
    items: categories,
    getAll: getCategories,
    loading: categoriesLoading,
  } = useCategory();

  const {
    items: products,
    loading,
    error,
    getAll: getProducts,
  } = useProducts();

  const { isWishlisted, toggleWishlist } =
    useWishlistContext();

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const productList = Array.isArray(products)
    ? products
    : products?.data || [];

  const filteredProducts =
    activeCategory === "ALL"
      ? productList
      : productList.filter((product) => {
          const productCategory = product?.category;

          if (!productCategory) return false;

          if (typeof productCategory === "object") {
            return (
              String(productCategory?._id) ===
              String(activeCategory)
            );
          }

          return (
            String(productCategory) ===
            String(activeCategory)
          );
        });

  const homeProducts = filteredProducts.slice(0, 4);

  const handleWishlist = async (product) => {
    try {
      await toggleWishlist(product);
    } catch (error) {
      console.error("Wishlist error:", error);
    }
  };

  // Get selected unit
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

  // Change selected unit
  const handleUnitChange = (product, index) => {
    setSelectedUnits((prev) => ({
      ...prev,
      [product._id]: index,
    }));
  };

  // Add product to cart
  const handleAddToCart = (product) => {
    const selectedUnit = getSelectedUnit(product);

    const productForCart = {
      ...product,

      // Selected unit name
      selectedUnit: selectedUnit?.name || null,

      // Selected unit price
      selectedPrice:
        selectedUnit?.price !== undefined
          ? Number(selectedUnit.price)
          : Number(product?.price || 0),

      // Keep normal price updated for cart compatibility
      price:
        selectedUnit?.price !== undefined
          ? Number(selectedUnit.price)
          : Number(product?.price || 0),
    };

    context?.addToCart?.(productForCart);
  };

  if (loading) {
    return (
      <section className="w-full bg-[#FDFBF7] px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex min-h-[250px] flex-col items-center justify-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#E8E3DA] border-t-[#2D2417]" />

          <p className="text-sm font-medium text-gray-500">
            Loading products...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full bg-[#FDFBF7] px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex min-h-[250px] flex-col items-center justify-center gap-4">
          <p className="text-sm font-medium text-red-500">
            Could not load products
          </p>

          <button
            onClick={getProducts}
            className="rounded-xl bg-[#2D2417] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#463827] active:scale-95"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  const categoryList = Array.isArray(categories)
    ? categories
    : categories?.data ||
      categories?.categories ||
      [];

  return (
    <section className="w-full bg-[#FDFBF7] px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-7">
          <span className="text-[11px] font-extrabold tracking-[0.22em] text-[#C8A96E]">
            CURATED CATALOG
          </span>

          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#2D2417] sm:text-3xl">
            Shop by Department
          </h2>
        </div>

        {/* CATEGORIES */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setActiveCategory("ALL")}
            className={`shrink-0 rounded-full px-5 py-2.5 text-xs font-bold transition ${
              activeCategory === "ALL"
                ? "bg-[#2D2417] text-white shadow-md"
                : "border border-[#E8E3DA] bg-white text-[#2D2417] hover:bg-[#F4F1EB]"
            }`}
          >
            ALL
          </button>

          {categoryList.map((category) => {
            const active =
              String(activeCategory) ===
              String(category?._id);

            return (
              <button
                key={category?._id}
                onClick={() =>
                  setActiveCategory(category?._id)
                }
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold capitalize transition ${
                  active
                    ? "bg-[#2D2417] text-white shadow-md"
                    : "border border-[#E8E3DA] bg-white text-[#2D2417] hover:bg-[#F4F1EB]"
                }`}
              >
                <div className="flex items-center gap-2">
                  {category?.image ? (
                    <img
                      src={category.image}
                      alt={category?.name || "Category"}
                      className="h-7 w-7 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-7 w-7 rounded-full bg-[#F4F1EB]" />
                  )}

                  <span>{category?.name}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* SEE ALL */}
        {filteredProducts.length > 4 && (
          <div className="mb-6 flex justify-end">
            <button
              onClick={() => router.push("/shop")}
              className="flex items-center gap-1 text-sm font-bold text-[#2D2417] transition hover:text-[#C8A96E]"
            >
              See All
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* PRODUCTS */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {homeProducts.map((product) => {
            const productId =
              product?._id || product?.id;

            const liked = isWishlisted(productId);

            const units = Array.isArray(product?.units)
              ? product.units
              : [];

            const selectedUnit =
              getSelectedUnit(product);

            const displayPrice =
              selectedUnit?.price !== undefined
                ? Number(selectedUnit.price)
                : Number(product?.price || 0);

            return (
              <article
                key={productId}
                className="group overflow-hidden rounded-2xl border border-[#E8E3DA] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* IMAGE */}
                <div className="relative aspect-square overflow-hidden bg-[#F5F2EC]">
                  {product?.badge && (
                    <span className="absolute left-3 top-3 z-10 rounded-full bg-[#C8A96E] px-3 py-1 text-[10px] font-extrabold text-white">
                      {product.badge}
                    </span>
                  )}

                  {/* WISHLIST */}
                  <button
                    onClick={() =>
                      handleWishlist(product)
                    }
                    className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition hover:scale-110 active:scale-95"
                    aria-label="Wishlist"
                  >
                    <Heart
                      size={19}
                      fill={
                        liked ? "#ef4444" : "none"
                      }
                      color={
                        liked ? "#ef4444" : "#2D2417"
                      }
                    />
                  </button>

                  {product?.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product?.name || "Product"}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-gray-400">
                      <ImageOff size={35} />
                      <span className="text-xs">
                        No Image
                      </span>
                    </div>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C8A96E]">
                    {product?.category?.name ||
                      "DEPARTMENT"}
                  </span>

                  <h3 className="mt-1 truncate text-sm font-extrabold text-[#2D2417] sm:text-base">
                    {product?.name || "Product Name"}
                  </h3>

                  {/* RATING */}
                  <div className="mt-2 flex items-center gap-1">
                    <Star
                      size={13}
                      fill="#f59e0b"
                      color="#f59e0b"
                    />

                    <span className="text-xs font-semibold text-gray-500">
                      {Number(
                        product?.rating || 4.5
                      ).toFixed(1)}
                    </span>
                  </div>

                  {/* UNITS */}
                  {units.length > 0 && (
                    <div className="mt-3 flex flex-col gap-2 ">
                      <p className="mb-2 text-[10px] font-bold text-[#777]">
                        Choose unit
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {units.map((unit, index) => {
                          const active =
                            (selectedUnits[
                              productId
                            ] ?? 0) === index;

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
                              className={`rounded-lg border px-2.5 py-1.5 text-[10px] font-bold transition ${
                                active
                                  ? "border-[#2D2417] bg-[#2D2417] text-white"
                                  : "border-[#E8E3DA] bg-white text-[#2D2417] hover:bg-[#F4F1EB]"
                              }`}
                            >
                              {unit?.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* BOTTOM */}
                  <div className="mt-4 flex items-center justify-between gap-2">
                    <strong className="text-base font-extrabold text-[#2D2417]">
                      ${displayPrice.toFixed(2)}
                    </strong>

                    <button
                      onClick={() =>
                        handleAddToCart(product)
                      }
                      className="rounded-lg bg-[#2D2417] px-3 py-2 text-[11px] font-bold text-white transition hover:bg-[#463827] active:scale-95"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* EMPTY */}
        {homeProducts.length === 0 && (
          <div className="flex min-h-[200px] items-center justify-center">
            <p className="text-sm text-gray-400">
              No products found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
