"use client";

import { useState } from "react";
import {
  Check,
  ChevronDown,
  X,
} from "lucide-react";

const STATUS_OPTIONS = [
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const STATUS_STYLES = {
  Processing: {
    background: "bg-amber-100",
    text: "text-amber-700",
    dot: "bg-amber-600",
  },

  Shipped: {
    background: "bg-blue-100",
    text: "text-blue-700",
    dot: "bg-blue-600",
  },

  Delivered: {
    background: "bg-green-100",
    text: "text-green-700",
    dot: "bg-green-600",
  },

  Cancelled: {
    background: "bg-red-100",
    text: "text-red-600",
    dot: "bg-red-600",
  },
};

export default function OrderStatus({
  status,
  onChange,
  loading = false,
}) {
  const [visible, setVisible] =
    useState(false);

  const currentStyle =
    STATUS_STYLES[status] ||
    {
      background: "bg-stone-100",
      text: "text-stone-600",
      dot: "bg-stone-500",
    };

  const handleSelect = async (
    newStatus
  ) => {
    setVisible(false);

    if (newStatus === status) return;

    try {
      await onChange(newStatus);
    } catch (error) {
      console.log(
        "Status update error:",
        error
      );
    }
  };

  return (
    <>
      {/* STATUS BUTTON */}
      <button
        type="button"
        disabled={loading}
        onClick={() => setVisible(true)}
        className={`inline-flex min-h-9 min-w-[50px] items-center justify-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 ${currentStyle.background} ${currentStyle.text}`}
      >
        {loading
          ? "Updating..."
          : status}

        {!loading && (
          <ChevronDown size={14} />
        )}
      </button>

      {/* MODAL */}
      {visible && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/35 p-5"
          onClick={() => setVisible(false)}
        >
          <div
            className="w-full max-w-[380px] rounded-2xl bg-white p-5 shadow-2xl"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            {/* HEADER */}
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-[#2D2417]">
                  Order Status
                </h2>

                <p className="mt-1 text-xs text-stone-500">
                  Select a new status
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setVisible(false)
                }
                className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-100 text-stone-600 transition hover:bg-stone-200"
              >
                <X size={18} />
              </button>
            </div>

            {/* OPTIONS */}
            <div className="space-y-2">
              {STATUS_OPTIONS.map(
                (option) => {
                  const active =
                    option === status;

                  const style =
                    STATUS_STYLES[
                      option
                    ];

                  return (
                    <button
                      type="button"
                      key={option}
                      onClick={() =>
                        handleSelect(
                          option
                        )
                      }
                      className={`flex min-h-12 w-full items-center rounded-xl px-4 transition ${
                        active
                          ? "border border-stone-200"
                          : "border border-transparent"
                      } bg-stone-50 hover:bg-stone-100`}
                    >
                      <span
                        className={`mr-3 h-2.5 w-2.5 rounded-full ${style.dot}`}
                      />

                      <span
                        className={`text-sm font-bold ${style.text}`}
                      >
                        {option}
                      </span>

                      {active && (
                        <Check
                          size={20}
                          className={`ml-auto ${style.text}`}
                        />
                      )}
                    </button>
                  );
                }
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}