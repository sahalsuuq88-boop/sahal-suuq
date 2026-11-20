"use client";

import React, { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import axios from "axios";

import {
  CheckCircle2,
  AlertCircle,
  Store,
  Bike,
  Receipt,
  ShoppingCart,
  MapPin,
  Map,
  User,
  Phone,
  Building2,
  Package,
} from "lucide-react";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export default function OrderSummary() {
  const params = useParams();
  const router = useRouter();

  const orderId = Array.isArray(params?.id)
    ? params.id[0]
    : params?.id;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================
  // EXCHANGE RATE
  // =====================================

  const [exchangeRate, setExchangeRate] = useState(8000);

  // =====================================
  // FETCH ORDER
  // =====================================

  useEffect(() => {
    let mounted = true;

    const fetchOrder = async () => {
      if (!orderId) {
        if (mounted) {
          setLoading(false);
          setError("Order ID is missing.");
        }
        return;
      }

      try {
        setLoading(true);
        setError("");

        console.log("========================================");
        console.log("FETCHING ORDER:", orderId);
        console.log("========================================");

        const token =
          typeof window !== "undefined"
            ? localStorage.getItem("token")
            : null;

        const response = await axios.get(
          `${BACKEND_URL}/api/orders/${orderId}`,
          {
            headers: token
              ? {
                  Authorization: `Bearer ${token}`,
                }
              : {},
          }
        );

        console.log("ORDER SUMMARY RESPONSE:", response);
        console.log("ORDER SUMMARY DATA:", response?.data);

        if (!mounted) return;

        /*
          Backend response may be:

          {
            success: true,
            data: {...order}
          }

          OR

          {
            success: true,
            order: {...order}
          }

          OR direct order object.
        */

        const orderData =
          response?.data?.data?.order ||
          response?.data?.data ||
          response?.data?.order ||
          response?.data;

        console.log("ORDER DATA:", orderData);

        if (
          !orderData ||
          typeof orderData !== "object"
        ) {
          setError("This order could not be found.");
          setOrder(null);
          return;
        }

        setOrder(orderData);
      } catch (err) {
        console.log("ORDER SUMMARY ERROR:", err);

        if (!mounted) return;

        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Unable to load this order.";

        setError(message);
        setOrder(null);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchOrder();

    return () => {
      mounted = false;
    };
  }, [orderId]);

  // =====================================
  // FETCH EXCHANGE RATE
  // =====================================

  useEffect(() => {
    let mounted = true;

    const getExchangeRate = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/exchange-rate`
        );

        const rate = Number(
          response?.data?.rate || 8000
        );

        if (mounted && rate > 0) {
          setExchangeRate(rate);
        }
      } catch (error) {
        console.error(
          "GET EXCHANGE RATE ERROR:",
          error?.response?.data ||
            error?.message
        );

        if (mounted) {
          setExchangeRate(8000);
        }
      }
    };

    getExchangeRate();

    return () => {
      mounted = false;
    };
  }, []);

  // =====================================
  // LOADING
  // =====================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#E9E5DE] border-t-[#A4865A] rounded-full animate-spin mx-auto" />

          <p className="mt-4 text-sm text-gray-500">
            Loading your order...
          </p>
        </div>
      </div>
    );
  }

  // =====================================
  // ERROR
  // =====================================

  if (error || !order) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto">
            <AlertCircle
              size={45}
              className="text-red-500"
            />
          </div>

          <h1 className="mt-5 text-2xl font-extrabold text-gray-900">
            Order Not Found
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            {error ||
              "This order could not be found."}
          </p>

          <button
            onClick={() =>
              router.replace("/home")
            }
            className="mt-6 bg-[#111] text-white px-6 py-3 rounded-xl font-bold hover:bg-black transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // =====================================
  // ORDER ITEMS
  // =====================================

  const orderItems = Array.isArray(
    order.orderItems
  )
    ? order.orderItems
    : [];

  // =====================================
  // CALCULATE PRODUCT TOTAL
  // =====================================

  const calculatedTotal = orderItems.reduce(
    (sum, item) => {
      const price = Number(
        item?.selectedPrice ??
          item?.price ??
          0
      );

      const quantity = Number(
        item?.quantity || 0
      );

      return sum + price * quantity;
    },
    0
  );

  // =====================================
  // PRODUCT TOTAL FROM BACKEND
  // =====================================

  const backendTotal = Number(
    order.totalPrice
  );

  const totalPrice =
    Number.isFinite(backendTotal) &&
    backendTotal >= 0
      ? backendTotal
      : calculatedTotal;

  // =====================================
  // DELIVERY
  // =====================================

  const deliveryFee = Number(
    order.deliveryFee || 0
  );

  const deliveryDistance = Number(
    order.deliveryDistance || 0
  );

  const deliveryZone =
    order.deliveryZone || null;

  const deliveryZoneName =
    order.deliveryZoneName || "";

  // =====================================
  // GRAND TOTAL
  // =====================================

  const backendGrandTotal = Number(
    order.grandTotal
  );

  const grandTotal =
    Number.isFinite(backendGrandTotal) &&
    backendGrandTotal >= 0
      ? backendGrandTotal
      : totalPrice + deliveryFee;

  // =====================================
  // SLSH CALCULATIONS
  // =====================================

  const productsTotalSLSH =
    totalPrice * exchangeRate;

  const deliveryFeeSLSH =
    deliveryFee * exchangeRate;

  const grandTotalSLSH =
    grandTotal * exchangeRate;

  // =====================================
  // GENERAL INFO
  // =====================================

  const status = order.status || "Pending";

  const deliveryMethod =
    order.deliveryMethod || "Delivery";

  const isPickup =
    deliveryMethod === "Pickup";

  const isDelivery =
    deliveryMethod === "Delivery";

  const orderNumber = order._id
    ? String(order._id).slice(-8)
    : "--------";

  // =====================================
  // RENDER
  // =====================================

  return (
    <main className="min-h-screen bg-[#FDFBF7]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* SUCCESS */}

        <div className="text-center py-5 mb-6">
          <div className="w-[75px] h-[75px] rounded-full bg-[#2D2417] flex items-center justify-center mx-auto mb-4">
            <CheckCircle2
              size={42}
              className="text-white"
            />
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Order Confirmed!
          </h1>

          <p className="mt-2 text-sm text-gray-500 leading-6 max-w-md mx-auto">
            Thank you for your order. Your order
            has been successfully placed.
          </p>
        </div>

        {/* ORDER INFORMATION */}

        <div className="bg-white border border-[#E9E5DE] rounded-2xl p-5 sm:p-6 mb-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] text-gray-400 mb-1">
                Order Number
              </p>

              <p className="text-lg font-extrabold text-gray-900">
                #{orderNumber}
              </p>
            </div>

            <div className="bg-[#F4EEE4] px-3 py-2 rounded-full">
              <span className="text-xs font-bold text-[#A4865A]">
                {status}
              </span>
            </div>
          </div>

          <div className="h-px bg-[#ECE9E3] my-5" />

          {/* DATE */}

          <InfoRow
            label="Order Date"
            value={
              order.createdAt
                ? new Date(
                    order.createdAt
                  ).toLocaleDateString()
                : "-"
            }
          />

          {/* DELIVERY METHOD */}

          <div className="flex items-center justify-between gap-4 mb-3">
            <span className="text-sm text-gray-500">
              Delivery Method
            </span>

            <div
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full ${
                isPickup
                  ? "bg-[#F4EEE4]"
                  : "bg-[#F1EEE9]"
              }`}
            >
              {isPickup ? (
                <Store
                  size={14}
                  className="text-[#A4865A]"
                />
              ) : (
                <Bike
                  size={14}
                  className="text-[#2D2417]"
                />
              )}

              <span
                className={`text-xs font-bold ${
                  isPickup
                    ? "text-[#A4865A]"
                    : "text-[#2D2417]"
                }`}
              >
                {isPickup
                  ? "Pickup"
                  : "Delivery"}
              </span>
            </div>
          </div>

          {/* PAYMENT */}

          <InfoRow
            label="Payment"
            value={
              order.paymentMethod || "-"
            }
          />
        </div>

        {/* PRODUCTS */}

        <div className="bg-white border border-[#E9E5DE] rounded-2xl p-5 sm:p-6 mb-4">
          <h2 className="text-lg font-extrabold text-gray-900 mb-4">
            Your Products
          </h2>

          {orderItems.length === 0 ? (
            <div className="text-center py-6">
              <Package
                size={30}
                className="text-[#A4865A] mx-auto"
              />

              <p className="mt-2 text-sm text-gray-500">
                No products found for this order.
              </p>
            </div>
          ) : (
            <div>
              {orderItems.map(
                (item, index) => {
                  const product =
                    item?.productId ||
                    item?.product ||
                    null;

                  const productName =
                    typeof product ===
                    "object"
                      ? product?.name ||
                        "Product"
                      : "Product";

                  const quantity = Number(
                    item?.quantity || 0
                  );

                  // IMPORTANT:
                  // Use selectedPrice first
                  const price = Number(
                    item?.selectedPrice ??
                      item?.price ??
                      0
                  );

                  const itemTotal =
                    price * quantity;

                  const itemTotalSLSH =
                    itemTotal *
                    exchangeRate;

                  return (
                    <div
                      key={
                        item?._id || index
                      }
                      className="flex items-center justify-between gap-4 py-3"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 line-clamp-2">
                          {productName}
                        </p>

                        {/* SELECTED UNIT */}

                        {item?.selectedUnit && (
                          <p className="mt-1 text-xs font-semibold text-[#A4865A]">
                            Unit:{" "}
                            {item.selectedUnit}
                          </p>
                        )}

                        <p className="mt-1 text-xs text-gray-400">
                          Qty: {quantity}
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <p className="text-sm font-extrabold text-gray-900">
                          $
                          {itemTotal.toFixed(
                            2
                          )}
                        </p>

                        <p className="mt-1 text-[11px] font-semibold text-[#A4865A]">
                          SLSh{" "}
                          {Math.round(
                            itemTotalSLSH
                          ).toLocaleString()}
                        </p>

                        <p className="mt-1 text-[10px] text-gray-400">
                          $
                          {price.toFixed(
                            2
                          )}{" "}
                          each
                        </p>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          )}

          <div className="h-px bg-[#ECE9E3] my-4" />

          <div className="flex items-center justify-between">
            <div>
              <span className="text-base font-extrabold text-gray-900">
                Products Total
              </span>

              <p className="mt-1 text-xs text-gray-400">
                $
                {totalPrice.toFixed(2)}
              </p>
            </div>

            <div className="text-right">
              <span className="text-lg font-extrabold text-[#A4865A]">
                SLSh{" "}
                {Math.round(
                  productsTotalSLSH
                ).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* ORDER SUMMARY */}

        <div className="bg-white border border-[#E9E5DE] rounded-2xl p-5 sm:p-6 mb-4">
          <h2 className="text-lg font-extrabold text-gray-900 mb-4">
            Order Summary
          </h2>

          {/* PRODUCTS TOTAL */}

          <SummaryRow
            icon={
              <ShoppingCart
                size={17}
              />
            }
            label="Products Total"
            value={
              <div className="text-right">
                <p>
                  $
                  {totalPrice.toFixed(
                    2
                  )}
                </p>

                <p className="mt-1 text-xs text-[#A4865A]">
                  SLSh{" "}
                  {Math.round(
                    productsTotalSLSH
                  ).toLocaleString()}
                </p>
              </div>
            }
          />

          {/* DELIVERY FEE */}

          <SummaryRow
            icon={
              <Bike size={17} />
            }
            label="Delivery Fee"
            value={
              isPickup ||
              deliveryFee === 0 ? (
                <span className="text-green-700">
                  FREE
                </span>
              ) : (
                <div className="text-right">
                  <p>
                    $
                    {deliveryFee.toFixed(
                      2
                    )}
                  </p>

                  <p className="mt-1 text-xs text-[#A4865A]">
                    SLSh{" "}
                    {Math.round(
                      deliveryFeeSLSH
                    ).toLocaleString()}
                  </p>
                </div>
              )
            }
            valueClass={
              isPickup ||
              deliveryFee === 0
                ? "text-green-700"
                : ""
            }
          />

          {/* DELIVERY DETAILS */}

          {isDelivery && (
            <>
              {/* DISTANCE */}

              <SummaryRow
                icon={
                  <MapPin
                    size={17}
                  />
                }
                label="Distance"
                value={`${deliveryDistance.toFixed(
                  2
                )} km`}
              />

              {/* ZONE */}

              {(deliveryZoneName ||
                deliveryZone) && (
                <SummaryRow
                  icon={
                    <Map size={17} />
                  }
                  label="Delivery Zone"
                  value={
                    deliveryZoneName ||
                    `Zone ${deliveryZone}`
                  }
                />
              )}
            </>
          )}

          {/* PICKUP MESSAGE */}

          {isPickup && (
            <div className="flex items-center gap-2 bg-[#F8F5EF] rounded-xl p-3 mt-2">
              <Store
                size={18}
                className="text-[#A4865A] shrink-0"
              />

              <p className="text-xs text-gray-500">
                Store pickup has no delivery
                charge.
              </p>
            </div>
          )}

          <div className="h-px bg-[#ECE9E3] my-4" />

          {/* GRAND TOTAL */}

          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-lg font-extrabold text-gray-900">
                Grand Total
              </p>

              <p className="text-[11px] text-gray-400 mt-1">
                Products + Delivery
              </p>
            </div>

            <div className="text-right">
              <p className="text-2xl font-black text-[#A4865A]">
                ${grandTotal.toFixed(2)}
              </p>

              <p className="mt-1 text-sm font-extrabold text-[#2D2417]">
                SLSh{" "}
                {Math.round(
                  grandTotalSLSH
                ).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* PICKUP INFORMATION */}

        {isPickup && (
          <div className="bg-white border border-[#E9E5DE] rounded-2xl p-5 sm:p-6 mb-4">
            <h2 className="text-lg font-extrabold text-gray-900 mb-4">
              Pickup Information
            </h2>

            <div className="flex items-center gap-3 bg-[#F8F5EF] p-4 rounded-xl">
              <div className="w-11 h-11 rounded-xl bg-[#F4EEE4] flex items-center justify-center shrink-0">
                <Store
                  size={24}
                  className="text-[#A4865A]"
                />
              </div>

              <div>
                <p className="text-sm font-extrabold text-gray-900">
                  Store Pickup
                </p>

                <p className="mt-1 text-xs text-gray-500 leading-5">
                  You will collect your order
                  from the store.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* DELIVERY INFORMATION */}

        {isDelivery &&
          order.shippingAddress && (
            <div className="bg-white border border-[#E9E5DE] rounded-2xl p-5 sm:p-6 mb-4">
              <h2 className="text-lg font-extrabold text-gray-900 mb-5">
                Delivery Information
              </h2>

              <InfoItem
                icon={
                  <User size={18} />
                }
                label="Name"
                value={
                  order.shippingAddress
                    .fullName
                }
              />

              <InfoItem
                icon={
                  <Phone size={18} />
                }
                label="Phone"
                value={
                  order.shippingAddress
                    .phone
                }
              />

              <InfoItem
                icon={
                  <MapPin size={18} />
                }
                label="Address"
                value={
                  order.shippingAddress
                    .address
                }
              />

              <InfoItem
                icon={
                  <Building2
                    size={18}
                  />
                }
                label="City"
                value={
                  order.shippingAddress
                    .city
                }
              />
            </div>
          )}

        {/* BUTTONS */}

        <button
          onClick={() =>
            router.replace(
              "/home/history"
            )
          }
          className="w-full min-h-[52px] rounded-xl bg-[#111] text-white flex items-center justify-center gap-2 font-extrabold text-sm hover:bg-black transition"
        >
          <Receipt size={20} />

          View Order History
        </button>

        <button
          onClick={() =>
            router.replace(
              "/home/shop"
            )
          }
          className="w-full min-h-[50px] rounded-xl border border-gray-300 text-gray-900 flex items-center justify-center font-bold text-sm mt-2 hover:bg-gray-50 transition"
        >
          Continue Shopping
        </button>
      </div>
    </main>
  );
}

// =====================================
// INFO ROW
// =====================================

function InfoRow({
  label,
  value,
}) {
  return (
    <div className="flex items-center justify-between gap-4 mb-3">
      <span className="text-sm text-gray-500">
        {label}
      </span>

      <span className="text-sm font-bold text-gray-900 text-right max-w-[60%]">
        {value || "-"}
      </span>
    </div>
  );
}

// =====================================
// SUMMARY ROW
// =====================================

function SummaryRow({
  icon,
  label,
  value,
  valueClass = "",
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <div className="flex items-center gap-2 flex-1">
        <span className="text-[#A4865A]">
          {icon}
        </span>

        <span className="text-sm text-gray-500">
          {label}
        </span>
      </div>

      <span
        className={`text-sm font-bold text-gray-900 ${valueClass}`}
      >
        {value}
      </span>
    </div>
  );
}

// =====================================
// INFO ITEM
// =====================================

function InfoItem({
  icon,
  label,
  value,
}) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-9 h-9 rounded-xl bg-[#F4EEE4] flex items-center justify-center shrink-0 text-[#A4865A]">
        {icon}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[11px] text-gray-400 mb-1">
          {label}
        </p>

        <p className="text-sm font-semibold text-gray-900 break-words">
          {value || "-"}
        </p>
      </div>
    </div>
  );
}

