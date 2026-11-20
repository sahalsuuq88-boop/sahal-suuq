"use client";

import React from "react";
import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";
import { useShop } from "../../ShopContext";
import { useWishlistContext } from "../../context/wishlist";

export default function Favorite() {
  const { wishlist, loading, removeFromWishlist } = useWishlistContext();
  const { addToCart } = useShop();

  // =========================
  // REMOVE FAVORITE
  // =========================
  const handleRemove = async (item) => {
    const wishlistId = item?._id || item?.id;

    if (!wishlistId) {
      console.log("Wishlist ID not found:", item);
      return;
    }

    try {
      await removeFromWishlist(wishlistId);
    } catch (error) {
      console.log(
        "REMOVE WISHLIST ERROR:",
        error?.response?.data || error?.message
      );

      alert("Failed to remove this product from favorites.");
    }
  };

  // =========================
  // ADD TO CART
  // =========================
  const handleAddToCart = async (item) => {
    const product = item?.product;

    if (!product?._id) {
      console.log("PRODUCT NOT FOUND:", item);
      return;
    }

    try {
      console.log("ADDING PRODUCT TO CART:", product);

      await addToCart(product);

      alert(
        `${product.name || "Product"} has been added to your cart.`
      );
    } catch (error) {
      console.log(
        "ADD TO CART ERROR:",
        error?.response?.data || error?.message || error
      );

      alert("Product could not be added to cart.");
    }
  };

  return (
    <main className="min-h-screen bg-[#FDFBF7]">
      <div className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-6 lg:px-8">

        {/* =========================
            HEADER
        ========================= */}
        <div className="mb-7 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#111]">
              My Favorites
            </h1>

            <p className="mt-1 text-sm text-[#777]">
              Products you saved
            </p>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#eee] bg-white">
            <Heart
              size={24}
              className="fill-red-500 text-red-500"
            />
          </div>
        </div>

        {/* =========================
            LOADING
        ========================= */}
        {loading && wishlist.length === 0 ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#e9e1d3] border-t-[#2D2417]" />
          </div>
        ) : wishlist.length === 0 ? (
          /* =========================
             EMPTY
          ========================= */
          <div className="flex min-h-[400px] flex-col items-center justify-center">
            <Heart
              size={60}
              className="text-[#C8A96E]"
            />

            <h2 className="mt-4 text-xl font-bold text-[#222]">
              No Favorites Yet
            </h2>

            <p className="mt-1 text-center text-sm text-[#777]">
              Products you save will appear here.
            </p>
          </div>
        ) : (
          /* =========================
             PRODUCTS
          ========================= */
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {wishlist.map((item, index) => {
              const product = item?.product || item;

              const wishlistId =
                item?._id ||
                item?.id ||
                `wishlist-${index}`;

              return (
                <div
                  key={wishlistId}
                  className="overflow-hidden rounded-[18px] border border-[#eee] bg-white transition-shadow duration-200 hover:shadow-md"
                >
                  {/* IMAGE */}
                  <div className="relative h-[170px] w-full bg-[#f2f2f2]">
                    <Image
                      src={
                        product?.imageUrl ||
                        product?.images?.[0] ||
                        "/placeholder.png"
                      }
                      alt={product?.name || "Product"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />

                    {/* REMOVE FAVORITE */}
                    <button
                      type="button"
                      onClick={() => handleRemove(item)}
                      className="absolute right-2.5 top-2.5 flex h-[38px] w-[38px] items-center justify-center rounded-full bg-white shadow-md transition-transform hover:scale-105"
                      aria-label="Remove from favorites"
                    >
                      <Heart
                        size={20}
                        className="fill-red-500 text-red-500"
                      />
                    </button>
                  </div>

                  {/* DETAILS */}
                  <div className="p-[13px]">
                    <p className="text-[10px] font-bold uppercase tracking-[1px] text-[#A4865A]">
                      {product?.category?.name ||
                        product?.category ||
                        "PRODUCT"}
                    </p>

                    <h3 className="mt-1 line-clamp-2 text-[15px] font-semibold leading-5 text-[#222]">
                      {product?.name || "Unnamed Product"}
                    </h3>

                    {/* BOTTOM */}
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-[15px] font-bold text-[#222]">
                        $
                        {Number(product?.price || 0).toFixed(2)}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleAddToCart(item)}
                        className="flex h-[38px] w-[38px] items-center justify-center rounded-xl bg-[#111] text-white transition-all hover:bg-[#2D2417] active:scale-95"
                        aria-label="Add to cart"
                      >
                        <ShoppingCart size={19} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}