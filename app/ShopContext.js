"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

import shopReducer, { initialState } from "./ShopReducer";

export const ShopContext = createContext(null);

export const ShopProvider = ({ children }) => {
  const [search, setSearch] = useState("");

  const [state, dispatch] = useReducer(shopReducer, initialState);

  const [cartLoaded, setCartLoaded] = useState(false);

  // =========================
  // Load cart from localStorage
  // =========================
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");

      if (savedCart) {
        const cart = JSON.parse(savedCart);

        dispatch({
          type: "LOAD_CART",
          payload: cart,
        });
      }
    } catch (error) {
      console.log("Load cart error:", error);
    } finally {
      setCartLoaded(true);
    }
  }, []);

  // =========================
  // Save cart to localStorage
  // =========================
  useEffect(() => {
    if (!cartLoaded) return;

    try {
      localStorage.setItem(
        "cart",
        JSON.stringify({
          products: state.products,
        }),
      );
    } catch (error) {
      console.log("Save cart error:", error);
    }
  }, [state.products, cartLoaded]);

  // =========================
  // Get unique cart key
  // =========================
  const getCartKey = (product) => {
    const productId = product?._id || product?.id;

    // Product without unit
    if (!product?.selectedUnit) {
      return productId;
    }

    // Product with unit
    return `${productId}-${product.selectedUnit}`;
  };

  // =========================
  // Add to cart
  // =========================
  const addToCart = (product) => {
    const cartKey = getCartKey(product);

    const existing = state.products.find(
      (item) => getCartKey(item) === cartKey,
    );

    let updated;

    if (existing) {
      updated = state.products.map((item) =>
        getCartKey(item) === cartKey
          ? {
              ...item,
              quantity: Number(item.quantity || 0) + 1,
            }
          : item,
      );
    } else {
      updated = [
        ...state.products,
        {
          ...product,

          // Make sure selected price is used
          price:
            product?.selectedPrice !== undefined
              ? Number(product.selectedPrice)
              : Number(product?.price || 0),

          selectedPrice:
            product?.selectedPrice !== undefined
              ? Number(product.selectedPrice)
              : Number(product?.price || 0),

          selectedUnit: product?.selectedUnit || null,

          quantity: 1,
        },
      ];
    }

    dispatch({
      type: "UPDATE_CART",
      payload: {
        products: updated,
      },
    });
  };

  // =========================
  // Total quantity
  // =========================
  const totalItems = state.products.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0,
  );

  // =========================
  // Update product quantity
  // =========================
  const updateProductQuantity = (product, newQuantity) => {
    const quantity = Number(newQuantity);

    const cartKey = getCartKey(product);

    let updated;

    if (quantity <= 0) {
      updated = state.products.filter((item) => getCartKey(item) !== cartKey);
    } else {
      updated = state.products.map((item) =>
        getCartKey(item) === cartKey
          ? {
              ...item,
              quantity,
            }
          : item,
      );
    }

    dispatch({
      type: "UPDATE_CART",
      payload: {
        products: updated,
      },
    });
  };

  // =========================
  // Remove from cart
  // =========================
  const removeFromCart = (product) => {
    const cartKey = getCartKey(product);

    const updated = state.products.filter(
      (item) => getCartKey(item) !== cartKey,
    );

    dispatch({
      type: "UPDATE_CART",
      payload: {
        products: updated,
      },
    });
  };

  // =========================
  // Clear cart
  // =========================
  const clearCart = () => {
    dispatch({
      type: "CLEAR_CART",
    });

    try {
      localStorage.removeItem("cart");
    } catch (error) {
      console.log("Clear cart error:", error);
    }
  };

  // =========================
  // Cart total
  // =========================
  const total = state.products.reduce(
    (sum, item) =>
      sum +
      Number(
        item.selectedPrice !== undefined ? item.selectedPrice : item.price || 0,
      ) *
        Number(item.quantity || 0),
    0,
  );

  return (
    <ShopContext.Provider
      value={{
        products: state.products,
        total,
        totalItems,

        addToCart,
        updateProductQuantity,
        removeFromCart,

        clearCart,

        search,
        setSearch,

        cartLoaded,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error("useShop must be used inside ShopProvider");
  }

  return context;
};

export default ShopContext;
