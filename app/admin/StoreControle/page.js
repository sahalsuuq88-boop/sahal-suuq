"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Info,
  Loader2,
  Lock,
  ShieldCheck,
  Store,
  StoreIcon,
} from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const DEFAULT_MESSAGE =
  "AWL Trading is currently closed. Please come back later.";

const reasons = [
  "Prayer Time",
  "Maintenance",
  "Holiday",
  "Temporarily Closed",
  "Other",
];

export default function StoreControl() {
  const router = useRouter();

  // ==========================================
  // STATE
  // ==========================================

  const [isStoreOpen, setIsStoreOpen] = useState(true);

  const [message, setMessage] = useState(DEFAULT_MESSAGE);

  const [reason, setReason] = useState("");

  const [closedUntil, setClosedUntil] = useState("");

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [showReasonOptions, setShowReasonOptions] =
    useState(false);

  const [showConfirmModal, setShowConfirmModal] =
    useState(false);

  const [confirmType, setConfirmType] =
    useState(null);

  const [alertModal, setAlertModal] =
    useState({
      show: false,
      title: "",
      message: "",
      type: "success",
    });

  // ==========================================
  // SHOW ALERT
  // ==========================================

  const showAlert = (
    title,
    message,
    type = "success",
  ) => {
    setAlertModal({
      show: true,
      title,
      message,
      type,
    });
  };

  // ==========================================
  // GET TOKEN
  // ==========================================

  const getToken = () => {
    try {
      return localStorage.getItem("token");
    } catch (error) {
      console.log("Token error:", error);
      return null;
    }
  };

  // ==========================================
  // LOAD STORE STATUS
  // ==========================================

  const fetchStoreStatus = useCallback(async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/system-settings/status`,
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to load store status",
        );
      }

      if (data.success && data.settings) {
        const settings = data.settings;

        setIsStoreOpen(
          settings.isStoreOpen ?? true,
        );

        setMessage(
          settings.message || DEFAULT_MESSAGE,
        );

        setReason(settings.reason || "");

        if (settings.closedUntil) {
          const date = new Date(
            settings.closedUntil,
          );

          if (!isNaN(date.getTime())) {
            setClosedUntil(
              date.toISOString().slice(0, 16),
            );
          } else {
            setClosedUntil("");
          }
        } else {
          setClosedUntil("");
        }
      }
    } catch (error) {
      console.log(
        "Fetch store status error:",
        error,
      );

      showAlert(
        "Error",
        error.message ||
          "Unable to load store status.",
        "error",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {
    fetchStoreStatus();
  }, [fetchStoreStatus]);

  // ==========================================
  // UPDATE STORE STATUS
  // ==========================================

  const updateStoreStatus = async (
    newStatus,
  ) => {
    if (saving) return;

    try {
      setSaving(true);

      const token = getToken();

      if (!token) {
        showAlert(
          "Authentication Error",
          "Your login session has expired. Please login again.",
          "error",
        );

        setTimeout(() => {
          router.replace("/LoginPage");
        }, 1500);

        return;
      }

      // ========================================
      // OPEN STORE
      // ========================================

      if (newStatus === true) {
        const response = await fetch(
          `${API_URL}/api/system-settings/status`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",

              Authorization: `Bearer ${token}`,
            },

            body: JSON.stringify({
              isStoreOpen: true,

              message: "",

              reason: "",

              closedUntil: null,
            }),
          },
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message ||
              "Failed to open the store",
          );
        }

        setIsStoreOpen(true);

        setMessage(
          data.settings?.message || "",
        );

        setReason(
          data.settings?.reason || "",
        );

        setClosedUntil("");

        setShowReasonOptions(false);

        showAlert(
          "Store Opened",
          "Customers can now browse products and place orders.",
          "success",
        );

        return;
      }

      // ========================================
      // CLOSE STORE
      // ========================================

      const finalMessage =
        message.trim() || DEFAULT_MESSAGE;

      const finalReason =
        reason.trim() ||
        "Temporarily Closed";

      let finalClosedUntil = null;

      if (closedUntil.trim()) {
        const date = new Date(closedUntil);

        if (isNaN(date.getTime())) {
          showAlert(
            "Invalid Date",
            "Please enter a valid date. Example: 2026-08-20T18:30",
            "error",
          );

          return;
        }

        finalClosedUntil =
          date.toISOString();
      }

      const response = await fetch(
        `${API_URL}/api/system-settings/status`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            isStoreOpen: false,

            message: finalMessage,

            reason: finalReason,

            closedUntil: finalClosedUntil,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to close the store",
        );
      }

      setIsStoreOpen(false);

      setMessage(
        data.settings?.message ||
          finalMessage,
      );

      setReason(
        data.settings?.reason ||
          finalReason,
      );

      if (data.settings?.closedUntil) {
        const date = new Date(
          data.settings.closedUntil,
        );

        if (!isNaN(date.getTime())) {
          setClosedUntil(
            date.toISOString().slice(0, 16),
          );
        }
      } else {
        setClosedUntil("");
      }

      setShowReasonOptions(false);

      showAlert(
        "Store Closed",
        "Customers can no longer place new orders.",
        "success",
      );
    } catch (error) {
      console.log(
        "Update store status error:",
        error,
      );

      showAlert(
        "Error",
        error.message ||
          "Failed to update store status.",
        "error",
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // OPEN STORE
  // ==========================================

  const handleOpenStore = () => {
    if (saving) return;

    setConfirmType("open");

    setShowConfirmModal(true);
  };

  // ==========================================
  // CLOSE STORE
  // ==========================================

  const handleCloseStore = () => {
    if (saving) return;

    if (!reason.trim()) {
      showAlert(
        "Reason Required",
        "Please select a reason before closing the store.",
        "error",
      );

      return;
    }

    if (!message.trim()) {
      showAlert(
        "Message Required",
        "Please enter a message for customers.",
        "error",
      );

      return;
    }

    setConfirmType("close");

    setShowConfirmModal(true);
  };

  // ==========================================
  // CONFIRM ACTION
  // ==========================================

  const confirmAction = async () => {
    setShowConfirmModal(false);

    if (confirmType === "open") {
      await updateStoreStatus(true);
    }

    if (confirmType === "close") {
      await updateStoreStatus(false);
    }
  };

  // ==========================================
  // SWITCH CHANGE
  // ==========================================

  const handleSwitchChange = () => {
    if (saving) return;

    if (isStoreOpen) {
      handleCloseStore();
    } else {
      handleOpenStore();
    }
  };

  // ==========================================
  // SELECT REASON
  // ==========================================

  const selectReason = (
    selectedReason,
  ) => {
    setReason(selectedReason);

    setShowReasonOptions(false);

    if (
      !message.trim() ||
      message === DEFAULT_MESSAGE
    ) {
      if (
        selectedReason ===
        "Prayer Time"
      ) {
        setMessage(
          "AWL Trading is currently closed for prayer time. Please come back later.",
        );
      } else if (
        selectedReason ===
        "Maintenance"
      ) {
        setMessage(
          "AWL Trading is temporarily closed for maintenance. Please come back later.",
        );
      } else if (
        selectedReason ===
        "Holiday"
      ) {
        setMessage(
          "AWL Trading is currently closed for a holiday. Please come back later.",
        );
      } else if (
        selectedReason ===
        "Temporarily Closed"
      ) {
        setMessage(DEFAULT_MESSAGE);
      } else {
        setMessage(DEFAULT_MESSAGE);
      }
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-[#0B3B24]" />

        <p className="text-sm text-gray-500">
          Loading store settings...
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[#F7F8F7]">
        <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 lg:py-8">

          {/* HEADER */}

          <div className="mb-6 flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm transition hover:bg-gray-50"
            >
              <ArrowLeft
                size={22}
                className="text-[#222]"
              />
            </button>

            <div>
              <h1 className="text-2xl font-extrabold text-[#1D1D1D] sm:text-3xl">
                Store Control
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Control AWL Trading availability
              </p>
            </div>
          </div>

          {/* STATUS CARD */}

          <div
            className={`mb-4 flex gap-4 rounded-2xl border p-5 ${
              isStoreOpen
                ? "border-[#C5E7D1] bg-[#EDF8F1]"
                : "border-[#F1CCCC] bg-[#FFF0F0]"
            }`}
          >
            <div className="flex items-center justify-center">
              {isStoreOpen ? (
                <CheckCircle2
                  size={42}
                  className="text-[#16834D]"
                />
              ) : (
                <Lock
                  size={40}
                  className="text-[#C62828]"
                />
              )}
            </div>

            <div className="flex-1">
              <p className="text-[10px] font-extrabold tracking-widest text-gray-500">
                STORE STATUS
              </p>

              <h2
                className={`mt-1 text-lg font-extrabold ${
                  isStoreOpen
                    ? "text-[#16834D]"
                    : "text-[#C62828]"
                }`}
              >
                {isStoreOpen
                  ? "AWL Trading is OPEN"
                  : "AWL Trading is CLOSED"}
              </h2>

              <p className="mt-1 text-sm leading-6 text-gray-600">
                {isStoreOpen
                  ? "Customers can browse products and place orders."
                  : "Customers cannot place new orders."}
              </p>
            </div>
          </div>

          {/* STORE AVAILABILITY */}

          <div className="mb-6 flex items-center justify-between rounded-2xl border border-[#ECECEC] bg-white p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EDF5F0]">
                <Store
                  size={23}
                  className="text-[#0B3B24]"
                />
              </div>

              <div>
                <h3 className="font-bold text-[#222]">
                  Store Availability
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  {isStoreOpen
                    ? "Store is currently open"
                    : "Store is currently closed"}
                </p>
              </div>
            </div>

            {/* CUSTOM SWITCH */}

            <button
              type="button"
              disabled={saving}
              onClick={handleSwitchChange}
              className={`relative h-7 w-12 rounded-full transition ${
                isStoreOpen
                  ? "bg-[#0B3B24]"
                  : "bg-gray-300"
              } ${
                saving
                  ? "cursor-not-allowed opacity-60"
                  : ""
              }`}
            >
              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${
                  isStoreOpen
                    ? "left-6"
                    : "left-1"
                }`}
              />
            </button>
          </div>

          {/* CLOSED SETTINGS */}

          {!isStoreOpen && (
            <div className="space-y-5">

              {/* REASON */}

              <div>
                <label className="mb-2 block text-sm font-bold text-[#333]">
                  Closing Reason
                </label>

                <div className="relative">
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() =>
                      setShowReasonOptions(
                        !showReasonOptions,
                      )
                    }
                    className="flex min-h-[52px] w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 text-left"
                  >
                    <div className="flex items-center gap-2">
                      <Info
                        size={20}
                        className="text-gray-500"
                      />

                      <span
                        className={
                          reason
                            ? "text-sm text-[#222]"
                            : "text-sm text-gray-400"
                        }
                      >
                        {reason ||
                          "Select reason"}
                      </span>
                    </div>

                    {showReasonOptions ? (
                      <ChevronUp
                        size={20}
                        className="text-gray-500"
                      />
                    ) : (
                      <ChevronDown
                        size={20}
                        className="text-gray-500"
                      />
                    )}
                  </button>

                  {showReasonOptions && (
                    <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                      {reasons.map(
                        (item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() =>
                              selectReason(
                                item,
                              )
                            }
                            className="flex min-h-12 w-full items-center justify-between border-b border-gray-100 px-4 text-left text-sm text-gray-700 last:border-none hover:bg-gray-50"
                          >
                            {item}

                            {reason ===
                              item && (
                              <Check
                                size={19}
                                className="text-[#0B3B24]"
                              />
                            )}
                          </button>
                        ),
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* CUSTOMER MESSAGE */}

              <div>
                <label className="mb-2 block text-sm font-bold text-[#333]">
                  Customer Message
                </label>

                <textarea
                  value={message}
                  onChange={(e) =>
                    setMessage(
                      e.target.value,
                    )
                  }
                  disabled={saving}
                  placeholder="Enter message for customers"
                  rows={4}
                  className="min-h-[110px] w-full resize-none rounded-xl border border-gray-200 bg-white p-4 text-sm text-[#222] outline-none transition focus:border-[#0B3B24] focus:ring-2 focus:ring-[#0B3B24]/10 disabled:cursor-not-allowed disabled:opacity-60"
                />

                <p className="mt-2 text-xs leading-5 text-gray-400">
                  Customers will see this exact
                  message when they try to place
                  an order while the store is
                  closed.
                </p>
              </div>

              {/* CLOSED UNTIL */}

              <div>
                <label className="mb-2 block text-sm font-bold text-[#333]">
                  Closed Until
                </label>

                <input
                  type="datetime-local"
                  value={closedUntil}
                  onChange={(e) =>
                    setClosedUntil(
                      e.target.value,
                    )
                  }
                  disabled={saving}
                  className="h-[52px] w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-[#222] outline-none transition focus:border-[#0B3B24] focus:ring-2 focus:ring-[#0B3B24]/10 disabled:cursor-not-allowed disabled:opacity-60"
                />

                <p className="mt-2 text-xs text-gray-400">
                  Optional. Select the date and
                  time when the store should
                  reopen.
                </p>
              </div>

              {/* CLOSE BUTTON */}

              <button
                type="button"
                disabled={saving}
                onClick={handleCloseStore}
                className="flex h-[54px] w-full items-center justify-center gap-2 rounded-xl bg-[#C62828] text-sm font-extrabold text-white transition hover:bg-[#A91F1F] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <Loader2
                    className="animate-spin"
                    size={21}
                  />
                ) : (
                  <>
                    <Lock size={19} />

                    Close AWL Trading
                  </>
                )}
              </button>
            </div>
          )}

          {/* OPEN STATE */}

          {isStoreOpen && (
            <div className="mb-6 flex gap-3 rounded-2xl bg-[#EDF5F0] p-4">
              <CheckCircle2
                size={24}
                className="shrink-0 text-[#0B3B24]"
              />

              <div>
                <h3 className="text-sm font-extrabold text-[#0B3B24]">
                  AWL Trading is Open
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#53665B]">
                  Customers can browse products
                  and place new orders.
                </p>
              </div>
            </div>
          )}

          {/* INFORMATION */}

          <div className="mt-6 flex gap-3 rounded-2xl bg-[#EDF5F0] p-4">
            <ShieldCheck
              size={25}
              className="shrink-0 text-[#0B3B24]"
            />

            <div>
              <h3 className="text-sm font-extrabold text-[#0B3B24]">
                How Store Control Works
              </h3>

              <p className="mt-1 text-xs leading-5 text-[#53665B]">
                When the store is closed,
                customers cannot create new
                orders. The backend rejects the
                order and sends the customer
                message saved here.
              </p>
            </div>
          </div>

          {/* FOOTER */}

          <div className="pt-6 text-center">
            <p className="text-xs font-semibold text-gray-500">
              Store status is controlled by
              Admin
            </p>

            <p className="mt-1 text-[11px] text-gray-400">
              Changes take effect immediately.
            </p>
          </div>
        </div>
      </div>

      {/* CONFIRM MODAL */}

      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div
              className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${
                confirmType === "close"
                  ? "bg-red-100"
                  : "bg-green-100"
              }`}
            >
              {confirmType === "close" ? (
                <Lock className="text-red-600" />
              ) : (
                <StoreIcon className="text-green-600" />
              )}
            </div>

            <h2 className="text-lg font-extrabold text-[#222]">
              {confirmType === "open"
                ? "Open AWL Trading"
                : "Close AWL Trading"}
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              {confirmType === "open"
                ? "Are you sure you want to open the store? Customers will be able to place new orders."
                : "Are you sure you want to close the store? Customers will no longer be able to place new orders."}
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() =>
                  setShowConfirmModal(false)
                }
                className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={confirmAction}
                className={`rounded-xl px-4 py-2.5 text-sm font-bold text-white ${
                  confirmType === "close"
                    ? "bg-[#C62828] hover:bg-[#A91F1F]"
                    : "bg-[#0B3B24] hover:bg-[#082D1B]"
                }`}
              >
                {confirmType === "open"
                  ? "Open Store"
                  : "Close Store"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ALERT MODAL */}

      {alertModal.show && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
            <div
              className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${
                alertModal.type === "error"
                  ? "bg-red-100"
                  : "bg-green-100"
              }`}
            >
              {alertModal.type === "error" ? (
                <Lock className="text-red-600" />
              ) : (
                <CheckCircle2 className="text-green-600" />
              )}
            </div>

            <h2 className="mt-4 text-lg font-extrabold text-[#222]">
              {alertModal.title}
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              {alertModal.message}
            </p>

            <button
              onClick={() =>
                setAlertModal({
                  ...alertModal,
                  show: false,
                })
              }
              className="mt-6 w-full rounded-xl bg-[#0B3B24] py-3 text-sm font-bold text-white hover:bg-[#082D1B]"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}

