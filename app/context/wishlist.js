'use client'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "../home/lib/api";


const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  // =========================
  // GET WISHLIST
  // =========================

  const getWishlist = useCallback(async () => {
    try {
      setLoading(true);

      const response = await api.get("api/whishlist");

      const data = response.data;

      const list = Array.isArray(data)
        ? data
        : data?.wishlist || data?.data || data?.items || [];

      setWishlist(list);

      return list;
    } catch (error) {
      console.log(
        "GET WISHLIST ERROR:",
        error?.response?.data || error?.message
      );

      setWishlist([]);

      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // =========================
  // CHECK PRODUCT
  // =========================

  const isWishlisted = useCallback(
    (productId) => {
      if (!productId) return false;

      return wishlist.some((item) => {
        const id =
          item?.product?._id ||
          item?.product?.id ||
          item?.product;

        return String(id) === String(productId);
      });
    },
    [wishlist]
  );

  // =========================
  // ADD / REMOVE
  // =========================

  const toggleWishlist = async (product) => {
    const productId = product?._id || product?.id;

    if (!productId) {
      console.log("Product ID not found:", product);
      return;
    }

    const existingItem = wishlist.find((item) => {
      const id =
        item?.product?._id ||
        item?.product?.id ||
        item?.product;

      return String(id) === String(productId);
    });

    try {
      // =========================
      // REMOVE
      // =========================

      if (existingItem) {
        const wishlistId = existingItem?._id || existingItem?.id;

        if (!wishlistId) {
          console.log("Wishlist ID not found:", existingItem);
          return;
        }

        await api.delete(`api/whishlist/${wishlistId}`);

        // IMPORTANT:
        // Context-ka isla markiiba ka saar
        setWishlist((prev) =>
          prev.filter(
            (item) =>
              String(item?._id || item?.id) !== String(wishlistId)
          )
        );

        return;
      }

      // =========================
      // ADD
      // =========================

      const response = await api.post("api/whishlist", {
        product: productId,
      });

      const newWishlist = response.data;

      // Ha duplicate-gareyn local state
      setWishlist((prev) => {
        const alreadyExists = prev.some((item) => {
          const id =
            item?.product?._id ||
            item?.product?.id ||
            item?.product;

          return String(id) === String(productId);
        });

        if (alreadyExists) {
          return prev;
        }

        return [...prev, newWishlist];
      });
    } catch (error) {
      console.log(
        "WISHLIST TOGGLE ERROR:",
        error?.response?.data || error?.message
      );

      throw error;
    }
  };

  // =========================
  // REMOVE DIRECTLY
  // =========================

  const removeFromWishlist = async (wishlistId) => {
    if (!wishlistId) return;

    try {
      await api.delete(`api/whishlist/${wishlistId}`);

      setWishlist((prev) =>
        prev.filter(
          (item) =>
            String(item?._id || item?.id) !== String(wishlistId)
        )
      );
    } catch (error) {
      console.log(
        "REMOVE WISHLIST ERROR:",
        error?.response?.data || error?.message
      );

      throw error;
    }
  };

  // =========================
  // COUNT
  // =========================

  const wishlistCount = wishlist.length;

  // =========================
  // LOAD ON LOGIN / APP START
  // =========================

  useEffect(() => {
    getWishlist().catch(() => {});
  }, [getWishlist]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount,
        loading,

        getWishlist,
        isWishlisted,

        toggleWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlistContext = () => {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlistContext must be used inside WishlistProvider"
    );
  }

  return context;
};
