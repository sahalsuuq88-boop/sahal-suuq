
"use client";

import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { IonIcon } from "@ionic/react";

import {
  alertCircleOutline,
  receiptOutline,
  arrowForwardOutline,
  logInOutline,
  lockClosedOutline,
} from "ionicons/icons";

import useOrders from "../../hook/useOrders";
import { useUser } from "../../hook/useUser";
import api from "../lib/api";


export default function History() {
  const router = useRouter();

  const { user, loading: authLoading } = useUser();

  const {
    items: orders,
    getMyOrders,
    loading,
    error,
  } = useOrders();

  const [exchangeRate, setExchangeRate] = useState(8000);

  // =====================================
  // GET ORDERS ONLY IF USER IS LOGGED IN
  // =====================================

  useEffect(() => {
    if (!authLoading && user) {
      getMyOrders();
    }
  }, [authLoading, user]);

  // =====================================
  // GET EXCHANGE RATE
  // =====================================

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
          error?.response?.data || error?.message
        );

        // Backend error -> fallback
        setExchangeRate(8000);
      }
    };

    getExchangeRate();
  }, []);

  // =====================================
  // AUTH LOADING
  // =====================================

  if (authLoading) {
    return (
      <main className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-5">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#E9E5DE] border-t-[#A4865A] rounded-full animate-spin mx-auto" />

          <p className="mt-4 text-sm text-gray-500">
            Checking your account...
          </p>
        </div>
      </main>
    );
  }

  // =====================================
  // USER NOT LOGGED IN
  // =====================================

  if (!user) {
    return (
      <main className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-5">
        <div className="w-full max-w-md bg-white border border-[#E9E5DE] rounded-2xl p-8 text-center shadow-sm">
          {/* ICON */}

          <div className="w-20 h-20 rounded-full bg-[#F4EEE4] flex items-center justify-center mx-auto">
            <IonIcon
              icon={lockClosedOutline}
              className="text-[#A4865A] text-[38px]"
            />
          </div>

          {/* TITLE */}

          <h1 className="mt-6 text-2xl font-extrabold text-[#222]">
            Login Required
          </h1>

          {/* MESSAGE */}

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Please login first to view your order history.
          </p>

          {/* LOGIN */}

          <button
            type="button"
            onClick={() => router.push("/LoginPage")}
            className="mt-6 w-full h-12 rounded-xl bg-[#111] text-white font-bold flex items-center justify-center gap-2 hover:bg-[#222] transition"
          >
            <IonIcon
              icon={logInOutline}
              className="text-xl"
            />

            Login
          </button>

          {/* BACK */}

          <button
            type="button"
            onClick={() => router.push("/home/shop")}
            className="mt-3 w-full h-12 rounded-xl border border-[#DDD] text-[#222] font-semibold hover:bg-[#F8F6F2] transition"
          >
            Continue Shopping
          </button>
        </div>
      </main>
    );
  }

  // =====================================
  // ORDERS LOADING
  // =====================================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-5">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#E9E5DE] border-t-[#A4865A] rounded-full animate-spin mx-auto" />

          <p className="mt-4 text-sm text-gray-500">
            Loading your orders...
          </p>
        </div>
      </main>
    );
  }

  // =====================================
  // ERROR
  // =====================================

  if (error) {
    return (
      <main className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-5">
        <div className="w-full max-w-md text-center">
          <IonIcon
            icon={alertCircleOutline}
            className="text-[#D9534F] text-[55px]"
          />

          <h1 className="mt-4 text-xl font-extrabold text-[#222]">
            Something went wrong
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {error}
          </p>

          <button
            type="button"
            onClick={() => getMyOrders()}
            className="mt-5 bg-[#111] text-white px-6 py-3 rounded-xl font-bold"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  // =====================================
  // ORDERS
  // =====================================

  const history = Array.isArray(orders)
    ? orders
    : orders?.orders || [];

  // =====================================
  // PAGE
  // =====================================

  return (
    <main className="min-h-screen bg-[#FDFBF7]">
      <div className="max-w-5xl mx-auto px-5 py-8 md:py-12">
        {/* HEADER */}

        <div className="mb-7">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#111]">
            Order History
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {history.length}{" "}
            {history.length === 1 ? "order" : "orders"} placed
            by you
          </p>
        </div>

        {/* EMPTY */}

        {history.length === 0 ? (
          <div className="bg-white border border-[#E9E5DE] rounded-2xl p-8 md:p-12 text-center">
            <div className="w-24 h-24 rounded-full bg-[#F4EEE4] flex items-center justify-center mx-auto">
              <IonIcon
                icon={receiptOutline}
                className="text-[#A4865A] text-[45px]"
              />
            </div>

            <h2 className="mt-6 text-2xl font-extrabold text-[#222]">
              No Orders Yet
            </h2>

            <p className="mt-2 max-w-md mx-auto text-sm leading-6 text-gray-500">
              You have not placed any orders yet. Start shopping
              and your orders will appear here.
            </p>

            <button
              type="button"
              onClick={() => router.push("/home")}
              className="mt-6 bg-[#111] text-white rounded-xl px-6 py-3 font-bold inline-flex items-center gap-2"
            >
              Start Shopping

              <IonIcon
                icon={arrowForwardOutline}
                className="text-lg"
              />
            </button>
          </div>
        ) : (
          /* ORDERS */

          <div className="space-y-5">
            {history.map((order) => {
              const orderItems = Array.isArray(order.orderItems)
                ? order.orderItems
                : [];

              const totalPrice = Number(
                order.totalPrice || 0
              );

              const totalSLSH =
                totalPrice * exchangeRate;

              return (
                <div
                  key={order._id}
                  className="bg-white border border-[#E9E5DE] rounded-2xl p-5 md:p-6"
                >
                  {/* ORDER HEADER */}

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs text-gray-400">
                        Order
                      </p>

                      <p className="mt-1 text-lg font-extrabold text-[#222]">
                        #{String(order._id).slice(-8)}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        {order.createdAt
                          ? new Date(
                              order.createdAt
                            ).toLocaleDateString()
                          : "-"}
                      </p>
                    </div>

                    <StatusBadge status={order.status} />
                  </div>

                  <div className="h-px bg-[#ECE9E3] my-5" />

                  {/* PRODUCTS */}

                  <div className="space-y-3">
                    {orderItems
                      .slice(0, 3)
                      .map((item, index) => {
                        const product =
                          item.productId || item.product;

                        const productName =
                          typeof product === "object"
                            ? product?.name
                            : "Product";

                        const quantity = Number(
                          item.quantity || 0
                        );

                        const price = Number(
                          item.selectedPrice ??
                            item.price ??
                            0
                        );

                        const lineTotal =
                          price * quantity;

                        return (
                          <div
                            key={
                              item._id || index
                            }
                            className="flex items-center justify-between gap-4"
                          >
                            <div className="min-w-0">
                              <p className="text-sm font-bold text-[#222] truncate">
                                {productName ||
                                  "Product"}
                              </p>

                              {/* SELECTED UNIT */}

                              {item.selectedUnit && (
                                <p className="mt-1 text-xs font-semibold text-[#A4865A]">
                                  Unit:{" "}
                                  {item.selectedUnit}
                                </p>
                              )}

                              <p className="mt-1 text-xs text-gray-400">
                                Qty: {quantity}
                              </p>
                            </div>

                            <div className="text-right whitespace-nowrap">
                              <p className="text-sm font-bold text-[#222]">
                                $
                                {lineTotal.toFixed(
                                  2
                                )}
                              </p>

                              <p className="mt-1 text-xs text-gray-400">
                                SLSh{" "}
                                {Math.round(
                                  lineTotal *
                                    exchangeRate
                                ).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        );
                      })}

                    {orderItems.length > 3 && (
                      <p className="text-xs font-semibold text-[#A4865A]">
                        +{orderItems.length - 3} more
                        item
                        {orderItems.length - 3 === 1
                          ? ""
                          : "s"}
                      </p>
                    )}
                  </div>

                  <div className="h-px bg-[#ECE9E3] my-5" />

                  {/* TOTAL */}

                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-base font-extrabold text-[#222]">
                        Total
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        {order.deliveryMethod ===
                        "Pickup"
                          ? "Pickup"
                          : "Delivery"}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xl font-extrabold text-[#A4865A]">
                        $
                        {totalPrice.toFixed(2)}
                      </p>

                      <p className="mt-1 text-sm font-bold text-[#2D2417]">
                        SLSh{" "}
                        {Math.round(
                          totalSLSH
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* VIEW ORDER */}

                  <button
                    type="button"
                    onClick={() =>
                      router.push(
                        `/orderSummary/${order._id}`
                      )
                    }
                    className="mt-5 w-full h-11 rounded-xl bg-[#111] text-white font-bold flex items-center justify-center gap-2 hover:bg-[#222] transition"
                  >
                    View Order

                    <IonIcon
                      icon={arrowForwardOutline}
                      className="text-lg"
                    />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

// =====================================
// STATUS BADGE
// =====================================

function StatusBadge({ status }) {
  const value = status || "Pending";

  const normalized = value.toLowerCase();

  let backgroundColor = "#FFF4D8";
  let textColor = "#A4865A";

  if (normalized === "delivered") {
    backgroundColor = "#E7F6EC";
    textColor = "#2E7D46";
  }

  if (
    normalized === "cancelled" ||
    normalized === "canceled"
  ) {
    backgroundColor = "#FFE8E8";
    textColor = "#C94A4A";
  }

  return (
    <span
      style={{
        backgroundColor,
        color: textColor,
      }}
      className="px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap"
    >
      {value}
    </span>
  );
}


// Waxaan sidoo kale ku daray **selected unit-ka** order history-ga, tusaale `Kiish`, iyo qiimihiisa saxda ah. Markaa haddii customer-ku doorto `Kiish $28`, History wuxuu muujinayaa unit-kaas iyo `$28`, halkii uu ka qaadan lahaa base price-ka product-ka.

// **Muhiim:** `../../lib/api` wuxuu sax yahay haddii `History.jsx` uu ku jiro `app/home/history/`.
