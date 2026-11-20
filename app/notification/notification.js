"use client";

import React from "react";

import {
  Bell,
  ShoppingBag,
  CreditCard,
  Car,
  Tag,
  Box,
  RefreshCw,
  User,
  X,
} from "lucide-react";

const NotificationItem = ({
  item,
  onPress,
  onDelete,
}) => {
  // ==========================================
  // ICON
  // ==========================================

  const getIcon = () => {
    switch (item?.type) {
      case "order":
        return ShoppingBag;

      case "payment":
        return CreditCard;

      case "delivery":
        return Car;

      case "promotion":
        return Tag;

      case "stock":
        return Box;

      case "refund":
        return RefreshCw;

      case "account":
        return User;

      default:
        return Bell;
    }
  };

  // ==========================================
  // ICON BACKGROUND
  // ==========================================

  const getIconBackground = () => {
    switch (item?.priority) {
      case "high":
        return "bg-red-100";

      case "low":
        return "bg-green-100";

      default:
        return "bg-blue-100";
    }
  };

  // ==========================================
  // ICON COLOR
  // ==========================================

  const getIconColor = () => {
    switch (item?.priority) {
      case "high":
        return "text-red-600";

      case "low":
        return "text-green-600";

      default:
        return "text-blue-600";
    }
  };

  const Icon = getIcon();

  // ==========================================
  // DELETE
  // ==========================================

  const handleDelete = (event) => {
    event.stopPropagation();

    if (onDelete) {
      onDelete(item?._id);
    }
  };

  // ==========================================
  // DATE
  // ==========================================

  const formattedDate = item?.createdAt
    ? new Date(item.createdAt).toLocaleString()
    : "";

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div
      onClick={onPress}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (
          event.key === "Enter" ||
          event.key === " "
        ) {
          onPress?.();
        }
      }}
      className={`
        group
        flex
        w-full
        cursor-pointer
        items-start
        rounded-2xl
        border
        p-3.5
        transition-all
        duration-200
        hover:shadow-sm
        active:scale-[0.99]

        ${
          !item?.isRead
            ? "border-blue-200 bg-blue-50 hover:bg-blue-100/70"
            : "border-gray-200 bg-white hover:border-gray-300"
        }
      `}
    >
      {/* =====================================
          ICON
      ===================================== */}

      <div
        className={`
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-xl
          ${getIconBackground()}
        `}
      >
        <Icon
          className={`h-[22px] w-[22px] ${getIconColor()}`}
          strokeWidth={2}
        />
      </div>

      {/* =====================================
          CONTENT
      ===================================== */}

      <div className="min-w-0 flex-1 px-3">

        {/* TITLE */}

        <div className="flex items-center justify-between gap-2">
          <h3 className="min-w-0 flex-1 truncate text-[15px] font-bold text-gray-900">
            {item?.title || "Notification"}
          </h3>

          {/* UNREAD DOT */}

          {!item?.isRead && (
            <span className="h-2 w-2 shrink-0 rounded-full bg-blue-600" />
          )}
        </div>

        {/* MESSAGE */}

        <p className="mt-1 line-clamp-2 text-[13px] leading-[18px] text-gray-500">
          {item?.message || ""}
        </p>

        {/* ORDER STATUS */}

        {item?.order && (
          <p className="mt-1.5 text-xs font-semibold text-[#A4865A]">
            Order: {item.order.status || "-"}
          </p>
        )}

        {/* TIME */}

        {formattedDate && (
          <p className="mt-2 text-[11px] text-gray-400">
            {formattedDate}
          </p>
        )}
      </div>

      {/* =====================================
          DELETE BUTTON
      ===================================== */}

      {onDelete && (
        <button
          type="button"
          onClick={handleDelete}
          aria-label="Delete notification"
          className="
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-lg
            text-red-500
            transition
            hover:bg-red-50
            hover:text-red-600
          "
        >
          <X
            className="h-[18px] w-[18px]"
            strokeWidth={2}
          />
        </button>
      )}
    </div>
  );
};

export default NotificationItem;