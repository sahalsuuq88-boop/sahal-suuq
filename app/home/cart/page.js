"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Trash2,
  Minus,
  Plus,
  MapPin,
  Bike,
  Store,
  Phone,
  Banknote,
  ArrowRight,
  ShoppingCart,
  Check,
} from "lucide-react";

import api from "../lib/api";
import { useShop } from "../../ShopContext";
import { useUser } from "../../hook/useUser";
import { formatSLSH, formatUSD } from "../../lib/currency";
import ExchangeRate from "../../admin/components/exchange";

export default function CartPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // =========================
  // SHOP
  // =========================
  const {
    products,
    total,
    totalItems,
    updateProductQuantity,
    removeFromCart,
    clearCart,
  } = useShop();

  // =========================
  // AUTH
  // =========================
  const { user, loading } = useUser();

  // =========================
  // MAP PARAMS
  // =========================
  const mapLatitude = searchParams.get("latitude");
  const mapLongitude = searchParams.get("longitude");

  // =========================
  // DELIVERY
  // =========================
  const [deliveryMethod, setDeliveryMethod] = useState("Delivery");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  // =========================
  // SHIPPING ADDRESS
  // =========================
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    phone: "",
    city: "",
  });

  // =========================
  // PAYMENT
  // =========================
  const [paymentMethod, setPaymentMethod] = useState("Zaad");
  const [paymentPhone, setPaymentPhone] = useState("");

  // =========================
  // ORDER / PRICING
  // =========================
  const [isProcessing, setIsProcessing] = useState(false);

  const [pricing, setPricing] = useState({
    subtotal: Number(total || 0),
    deliveryFee: 0,
    grandTotal: Number(total || 0),
  });
  const [exchangeRate, setExchangeRate] = useState(8000);

  useEffect(() => {
    const getExchangeRate = async () => {
      try {
        const response = await api.get("/api/exchange-rate");

        const rate = Number(response?.data?.rate || 8000);

        if (rate > 0) {
          setExchangeRate(rate);
        }
      } catch (error) {
        console.error(
          "GET EXCHANGE RATE ERROR:",
          error?.response?.data || error?.message,
        );

        setExchangeRate(8000);
      }
    };

    getExchangeRate();
  }, []);

  // =========================
  // RECEIVE LOCATION
  // =========================
  useEffect(() => {
    if (!mapLatitude || !mapLongitude) return;

    const lat = Number(mapLatitude);
    const lng = Number(mapLongitude);

    if (Number.isNaN(lat) || Number.isNaN(lng)) return;

    setLatitude(lat);
    setLongitude(lng);
    setDeliveryMethod("Delivery");
  }, [mapLatitude, mapLongitude]);

  // =========================
  // PREFILL USER
  // =========================
  useEffect(() => {
    if (!user) return;

    setShippingAddress((prev) => ({
      ...prev,
      fullName: user.name || prev.fullName,
      phone: user.number || prev.phone,
    }));
  }, [user]);

  // =========================
  // CALCULATE DELIVERY
  // =========================
  useEffect(() => {
    if (
      deliveryMethod !== "Delivery" ||
      latitude === null ||
      longitude === null ||
      !products?.length
    ) {
      return;
    }

    calculateDelivery();
  }, [latitude, longitude, deliveryMethod, products, total]);

  const calculateDelivery = async () => {
    try {
      const orderItems = products.map((item) => ({
        productId: item._id,
        quantity: Number(item.quantity),
      }));

      const response = await api.post("/api/orders/calculate-delivery", {
        orderItems,
        latitude: Number(latitude),
        longitude: Number(longitude),
        deliveryMethod: "Delivery",
      });

      const result = response.data;

      setPricing({
        subtotal: Number(result?.pricing?.subtotal || 0),
        deliveryFee: Number(result?.pricing?.deliveryFee || 0),
        grandTotal: Number(result?.pricing?.grandTotal || 0),
      });
    } catch (error) {
      console.error(
        "DELIVERY CALCULATION ERROR:",
        error?.response?.data || error?.message,
      );
    }
  };

  // =========================
  // SHIPPING CHANGE
  // =========================
  const handleShippingChange = (field, value) => {
    setShippingAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // =========================
  // DELIVERY METHOD
  // =========================
  const handleDeliveryMethod = (method) => {
    setDeliveryMethod(method);

    if (method === "Pickup") {
      setLatitude(null);
      setLongitude(null);

      setPricing({
        subtotal: Number(total || 0),
        deliveryFee: 0,
        grandTotal: Number(total || 0),
      });
    }
  };

  // =========================
  // MAP
  // =========================
  const chooseOnMap = () => {
    router.push("/home/locationMap");
  };

  const changeLocation = () => {
    setLatitude(null);
    setLongitude(null);
    router.push("/home/locationMap");
  };

  // =========================
  // PHONE VALIDATION
  // =========================
  const isValidLocalPhone = (value) => {
    return /^\d{9}$/.test(value.trim());
  };

  // =========================
  // CHECKOUT
  // =========================
  const handleCheckout = async () => {
    if (loading) {
      alert("Your account is still loading.");
      return;
    }

    if (!user) {
      const confirmLogin = window.confirm(
        "Please login before placing your order.",
      );

      if (confirmLogin) {
        router.push("/LoginPage");
      }

      return;
    }

    if (!products?.length) {
      alert("Your shopping cart is empty.");
      return;
    }

    // DELIVERY VALIDATION
    if (deliveryMethod === "Delivery") {
      if (
        !shippingAddress.fullName.trim() ||
        !shippingAddress.phone.trim() ||
        !shippingAddress.city.trim()
      ) {
        alert("Please fill in your name, phone number and city.");
        return;
      }

      if (latitude === null || longitude === null) {
        alert("Please add your delivery location.");
        return;
      }
    }

    // PAYMENT VALIDATION
    if (paymentMethod !== "Cash") {
      if (!paymentPhone.trim()) {
        alert(`Please enter your ${paymentMethod} phone number.`);
        return;
      }

      if (!isValidLocalPhone(paymentPhone)) {
        alert(`Please enter a valid 9-digit ${paymentMethod} phone number.`);
        return;
      }
    }

    try {
      setIsProcessing(true);

      const displaySubtotal = Number(pricing.subtotal || total || 0);

      const displayDeliveryFee =
        deliveryMethod === "Pickup" ? 0 : Number(pricing.deliveryFee || 0);

      const displayGrandTotal =
        deliveryMethod === "Pickup"
          ? displaySubtotal
          : displaySubtotal + displayDeliveryFee;

      // ORDER ITEMS
      const orderItems = products.map((item) => ({
        productId: item._id,
        quantity: Number(item.quantity),
        price: Number(item.price || 0),
      }));

      // ORDER DATA
      const orderData = {
        deliveryMethod,
        paymentMethod,
        paymentPhone: paymentMethod === "Cash" ? null : paymentPhone.trim(),

        orderItems,

        totalPrice: Number(displayGrandTotal),
      };

      // DELIVERY DATA
      if (deliveryMethod === "Delivery") {
        orderData.shippingAddress = {
          fullName: shippingAddress.fullName.trim(),
          phone: shippingAddress.phone.trim(),
          city: shippingAddress.city.trim(),
        };

        orderData.latitude = Number(latitude);
        orderData.longitude = Number(longitude);
      }

      console.log("CREATING ORDER:", JSON.stringify(orderData, null, 2));

      // IMPORTANT:
      // Haddii aad leedahay useOrders() hook,
      // halkan ku xir create(orderData).
      //
      // Tusaale:
      //
      // const { create } = useOrders();
      // const response = await create(orderData);

      const response = await api.post("/api/orders", orderData);

      console.log("CREATE ORDER FULL RESPONSE:", response);
      console.log("CREATE ORDER RESPONSE DATA:", response.data);

      const createdOrder = response?.data?.order || response?.data;

      const orderId =
        response?.data?.data?._id ||
        response?.data?.order?._id ||
        response?.data?._id;

      if (!orderId) {
        throw new Error("Order was created but order ID was not returned.");
      }

      const orderPricing = response?.data?.pricing || {};

      const delivery = response?.data?.delivery || {};

      const finalDeliveryFee =
        deliveryMethod === "Pickup" ? 0 : Number(orderPricing.deliveryFee ?? 0);

      const finalSubtotal = Number(orderPricing.subtotal ?? total);

      const finalGrandTotal = Number(
        orderPricing.grandTotal ?? finalSubtotal + finalDeliveryFee,
      );

      setPricing({
        subtotal: finalSubtotal,
        deliveryFee: finalDeliveryFee,
        grandTotal: finalGrandTotal,
      });

      clearCart();

      alert(
        `Order Successful 🎉

Subtotal: $${finalSubtotal.toFixed(2)}
Delivery: $${finalDeliveryFee.toFixed(2)}
Total: $${finalGrandTotal.toFixed(2)}`,
      );

      router.replace(`/orderSummary/${orderId}`);
    } catch (err) {
      const errorData = err?.response?.data;

      console.error("CREATE ORDER FAILED:", errorData || err);

      if (
        errorData?.storeClosed === true ||
        errorData?.message?.toLowerCase()?.includes("currently closed")
      ) {
        alert(
          errorData?.message ||
            "AWL Trading is currently closed. Please come back later.",
        );

        return;
      }

      if (err?.response?.status === 403) {
        alert(
          errorData?.message ||
            "AWL Trading is currently closed. Please come back later.",
        );

        return;
      }

      alert(
        errorData?.message ||
          err?.message ||
          "Unable to place your order. Please try again.",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // =========================
  // EMPTY CART
  // =========================
  if (!products || products.length === 0) {
    return (
      <main className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-6">
        <div className="flex max-w-md flex-col items-center text-center">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#F4EEE4]">
            <ShoppingCart size={48} className="text-[#A4865A]" />
          </div>

          <h1 className="text-3xl font-extrabold text-[#2D2417]">
            Your Cart is Empty
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            You haven't added any products to your cart yet.
          </p>

          <button
            onClick={() => router.push("/")}
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#2D2417] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#463827]"
          >
            Continue Shopping
            <ArrowRight size={18} />
          </button>
        </div>
      </main>
    );
  }

  // =========================
  // DISPLAY VALUES
  // =========================
  const displaySubtotal = Number(pricing.subtotal || total || 0);

  const displayDeliveryFee =
    deliveryMethod === "Pickup" ? 0 : Number(pricing.deliveryFee || 0);

  const displayGrandTotal =
    deliveryMethod === "Pickup"
      ? displaySubtotal
      : displaySubtotal + displayDeliveryFee;

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#222]">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#111] sm:text-4xl">
            Shopping Cart
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          {/* LEFT */}
          <div className="space-y-6">
            {/* PRODUCTS */}
            <section>
              <h2 className="mb-4 text-lg font-bold">Your Products</h2>

              <div className="space-y-4">
                {products.map((item) => (
                  <div
                    key={item._id}
                    className="rounded-2xl border border-[#E9E5DE] bg-white p-4 sm:p-5"
                  >
                    <div className="flex gap-4">
                      {/* IMAGE */}
                      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#F5F3EF] sm:h-24 sm:w-24">
                        {item.imageUrl || item.image ? (
                          <img
                            src={item.imageUrl || item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <ShoppingCart size={30} className="text-gray-400" />
                          </div>
                        )}
                      </div>

                      {/* DETAILS */}
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#A4865A]">
                          {typeof item.category === "object"
                            ? item.category?.name || "Food"
                            : item.category || "Food"}
                        </p>

                        <h3 className="mt-1 line-clamp-2 text-sm font-bold sm:text-base">
                          {item.name}
                        </h3>

                        <div className="mt-2">
                          <p className="text-sm font-bold text-gray-700">
                            {formatUSD(
                              item.selectedPrice !== undefined
                                ? item.selectedPrice
                                : item.price,
                            )}
                          </p>

                          <p className="mt-1 text-xs font-semibold text-[#A4865A]">
                            {formatSLSH(
                              item.selectedPrice !== undefined
                                ? item.selectedPrice
                                : item.price,
                              exchangeRate,
                            )}
                          </p>

                          {item.selectedUnit && (
                            <p className="mt-1 text-xs font-semibold text-[#2D2417]">
                              Unit: {item.selectedUnit}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* DELETE */}
                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to remove this product?",
                            )
                          ) {
                            removeFromCart(item);
                          }
                        }}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-500 transition hover:bg-red-100"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    {/* QUANTITY */}
                    <div className="mt-4 flex items-center border-t border-[#EFEFEF] pt-4">
                      <span className="flex-1 text-sm text-gray-500">
                        Quantity
                      </span>

                      <div className="flex items-center rounded-xl bg-[#F6F5F2] p-1">
                        <button
                          onClick={() => {
                            const nextQty = Number(item.quantity) - 1;

                            if (nextQty < 1) {
                              if (
                                window.confirm(
                                  "Remove this item from your cart?",
                                )
                              ) {
                                removeFromCart(item);
                              }

                              return;
                            }

                            updateProductQuantity(item, nextQty);
                          }}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-white hover:bg-gray-100"
                        >
                          <Minus size={16} />
                        </button>

                        <span className="min-w-9 text-center text-sm font-extrabold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateProductQuantity(
                              item,
                              Number(item.quantity) + 1,
                            )
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-white hover:bg-gray-100"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <div className="ml-4 min-w-24 text-right">
                        <p className="text-sm font-bold text-[#2D2417]">
                          {formatUSD(
                            Number(
                              item.selectedPrice !== undefined
                                ? item.selectedPrice
                                : item.price || 0,
                            ) * Number(item.quantity || 0),
                          )}
                        </p>

                        <p className="mt-1 text-[11px] font-semibold text-[#A4865A]">
                          {formatSLSH(
                            Number(
                              item.selectedPrice !== undefined
                                ? item.selectedPrice
                                : item.price || 0,
                            ) * Number(item.quantity || 0),
                            exchangeRate,
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* DELIVERY METHOD */}
            <section className="rounded-2xl border border-[#E9E5DE] bg-white p-5">
              <h2 className="mb-4 text-lg font-bold">Delivery Method</h2>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleDeliveryMethod("Delivery")}
                  className={`rounded-xl border p-4 text-center transition ${
                    deliveryMethod === "Delivery"
                      ? "border-[#2D2417] bg-[#2D2417] text-white"
                      : "border-gray-200 bg-white hover:border-[#2D2417]"
                  }`}
                >
                  <Bike size={25} className="mx-auto" />

                  <p className="mt-2 text-sm font-bold">Delivery</p>

                  <p
                    className={`mt-1 text-[11px] ${
                      deliveryMethod === "Delivery"
                        ? "text-gray-300"
                        : "text-gray-500"
                    }`}
                  >
                    To your address
                  </p>
                </button>

                <button
                  onClick={() => handleDeliveryMethod("Pickup")}
                  className={`rounded-xl border p-4 text-center transition ${
                    deliveryMethod === "Pickup"
                      ? "border-[#2D2417] bg-[#2D2417] text-white"
                      : "border-gray-200 bg-white hover:border-[#2D2417]"
                  }`}
                >
                  <Store size={25} className="mx-auto" />

                  <p className="mt-2 text-sm font-bold">Pickup</p>

                  <p
                    className={`mt-1 text-[11px] ${
                      deliveryMethod === "Pickup"
                        ? "text-gray-300"
                        : "text-gray-500"
                    }`}
                  >
                    Pick up yourself
                  </p>
                </button>
              </div>
            </section>

            {/* DELIVERY INFORMATION */}
            {deliveryMethod === "Delivery" && (
              <section className="rounded-2xl border border-[#E9E5DE] bg-white p-5">
                <h2 className="mb-4 text-lg font-bold">Delivery Information</h2>

                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={shippingAddress.fullName}
                    onChange={(e) =>
                      handleShippingChange("fullName", e.target.value)
                    }
                    className="w-full rounded-xl border border-[#E1DED8] bg-[#F8F7F4] px-4 py-3 text-sm outline-none focus:border-[#2D2417]"
                  />

                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={shippingAddress.phone}
                    onChange={(e) =>
                      handleShippingChange("phone", e.target.value)
                    }
                    className="w-full rounded-xl border border-[#E1DED8] bg-[#F8F7F4] px-4 py-3 text-sm outline-none focus:border-[#2D2417]"
                  />

                  <input
                    type="text"
                    placeholder="City"
                    value={shippingAddress.city}
                    onChange={(e) =>
                      handleShippingChange("city", e.target.value)
                    }
                    className="w-full rounded-xl border border-[#E1DED8] bg-[#F8F7F4] px-4 py-3 text-sm outline-none focus:border-[#2D2417]"
                  />

                  <p className="pt-2 text-sm font-bold text-gray-700">
                    Delivery Location
                  </p>

                  {latitude === null || longitude === null ? (
                    <button
                      onClick={chooseOnMap}
                      className="flex min-h-12 w-full items-center gap-3 rounded-xl bg-[#2D2417] px-4 text-left text-sm font-bold text-white transition hover:bg-[#463827]"
                    >
                      <MapPin size={20} />
                      <span>Add Delivery Location</span>
                    </button>
                  ) : (
                    <div className="rounded-xl bg-[#F3F7F4] p-4">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0B3B24]">
                          <Check size={17} className="text-white" />
                        </div>

                        <p className="font-extrabold text-[#0B3B24]">
                          Location Selected
                        </p>
                      </div>

                      <p className="mt-3 text-xs text-gray-600">
                        Latitude: {Number(latitude).toFixed(6)}
                      </p>

                      <p className="mt-1 text-xs text-gray-600">
                        Longitude: {Number(longitude).toFixed(6)}
                      </p>

                      <button
                        onClick={changeLocation}
                        className="mt-3 text-xs font-extrabold text-[#0B3B24]"
                      >
                        Change Location
                      </button>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* PICKUP */}
            {deliveryMethod === "Pickup" && (
              <section className="rounded-2xl border border-[#E9E5DE] bg-white p-5">
                <Store size={28} className="text-[#A4865A]" />

                <h2 className="mt-3 text-lg font-bold">Store Pickup</h2>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  You will collect your order from our store.
                </p>

                <p className="mt-3 text-sm font-bold text-[#0B3B24]">
                  Delivery Fee: $0.00
                </p>
              </section>
            )}

            {/* PAYMENT */}
            <section className="rounded-2xl border border-[#E9E5DE] bg-white p-5">
              <h2 className="mb-4 text-lg font-bold">Payment Method</h2>

              <div className="grid grid-cols-3 gap-2">
                {[
                  {
                    name: "Zaad",
                    icon: Phone,
                  },
                  {
                    name: "Edahab",
                    icon: Phone,
                  },
                  {
                    name: "Cash",
                    icon: Banknote,
                  },
                ].map((payment) => {
                  const Icon = payment.icon;

                  return (
                    <button
                      key={payment.name}
                      onClick={() => setPaymentMethod(payment.name)}
                      className={`flex min-h-20 flex-col items-center justify-center rounded-xl border transition ${
                        paymentMethod === payment.name
                          ? "border-[#2D2417] bg-[#2D2417] text-white"
                          : "border-gray-200 bg-white hover:border-[#2D2417]"
                      }`}
                    >
                      <Icon size={21} />

                      <span className="mt-2 text-[11px] font-bold">
                        {payment.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* PAYMENT PHONE */}
            {paymentMethod !== "Cash" && (
              <section className="rounded-2xl border border-[#E9E5DE] bg-white p-5">
                <h2 className="mb-4 text-lg font-bold">
                  {paymentMethod} Number
                </h2>

                <div className="flex">
                  <div className="flex min-w-16 items-center justify-center rounded-l-xl bg-[#EFEDE8] text-sm font-bold">
                    +252
                  </div>

                  <input
                    type="tel"
                    maxLength={9}
                    placeholder="63XXXXXXX"
                    value={paymentPhone}
                    onChange={(e) =>
                      setPaymentPhone(e.target.value.replace(/\D/g, ""))
                    }
                    className="w-full rounded-r-xl border border-[#DDD] bg-[#F8F7F4] px-4 py-3 text-sm outline-none focus:border-[#2D2417]"
                  />
                </div>

                <p className="mt-2 text-[11px] leading-5 text-gray-400">
                  Enter the phone number used for {paymentMethod} payment.
                </p>
              </section>
            )}
          </div>

          {/* RIGHT / SUMMARY */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-2xl border border-[#E5E1DA] bg-white p-5 sm:p-6">
              <h2 className="mb-6 text-xl font-extrabold">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Items</span>

                  <span className="font-bold">{totalItems}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>

                  <div className="text-right">
                    <p className="font-bold text-[#2D2417]">
                      {formatUSD(displaySubtotal)}
                    </p>

                    <p className="mt-1 text-xs font-semibold text-[#A4865A]">
                      {formatSLSH(displaySubtotal, exchangeRate)}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Delivery</span>

                  <div className="text-right">
                    <p className="font-bold text-[#2D2417]">
                      {formatUSD(displayDeliveryFee)}
                    </p>

                    <p className="mt-1 text-xs font-semibold text-[#A4865A]">
                      {formatSLSH(displayDeliveryFee, exchangeRate)}
                    </p>
                  </div>
                </div>

                <div className="border-t border-[#ECE9E3] pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-extrabold">Total Amount</span>

                    <div className="text-right">
                      <p className="text-xl font-extrabold text-[#0B3B24]">
                        {formatUSD(displayGrandTotal)}
                      </p>

                      <p className="mt-1 text-sm font-bold text-[#A4865A]">
                        {formatSLSH(displayGrandTotal, exchangeRate)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                disabled={isProcessing}
                onClick={handleCheckout}
                className="mt-6 flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#2D2417] px-4 text-sm font-extrabold text-white transition hover:bg-[#463827] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isProcessing ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Processing...
                  </>
                ) : (
                  <>
                    Place Order ${displayGrandTotal.toFixed(2)}
                    <ArrowRight size={19} />
                  </>
                )}
              </button>
            </div>

            {/* CLEAR CART */}
            <button
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to remove all products?",
                  )
                ) {
                  clearCart();
                }
              }}
              className="mt-4 flex w-full items-center justify-center gap-2 py-3 text-sm font-semibold text-red-500 hover:text-red-600"
            >
              <Trash2 size={17} />
              Clear Cart
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
}
