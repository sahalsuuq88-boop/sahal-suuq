"use client";

import {
  ShoppingCart,
  Wallet,
  Trash2,
  Users,
} from "lucide-react";

export default function CustomersTable({
  customers = [],
  remove,
  getAll,
}) {
  const handleDelete = async (customer) => {
    const confirmed = window.confirm(
      `Ma hubtaa inaad tirtirto ${customer.name}?`
    );

    if (!confirmed) return;

    try {
      await remove(
        customer._id || customer.id
      );

      if (getAll) {
        await getAll();
      }
    } catch (error) {
      console.error(
        "Failed to delete customer:",
        error
      );

      alert(
        "Customer-ka lama tirtiri karin."
      );
    }
  };

  if (customers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white py-16">
        <Users
          size={48}
          className="text-gray-300"
        />

        <h3 className="mt-4 text-lg font-semibold text-gray-600">
          No customers found
        </h3>

        <p className="mt-1 text-sm text-gray-400">
          Try changing your search or filter.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <h2 className="text-lg font-bold text-gray-800">
          Customer List
        </h2>

        <span className="text-sm text-gray-400">
          {customers.length} customers
        </span>
      </div>

      {/* Customers */}
      <div>
        {customers.map((customer) => {
          const name =
            customer.name || "Unknown";

          const email =
            customer.email || "No email";

          const phone =
            customer.phone ||
            customer.number ||
            "No phone";

          const orders =
            customer.totalOrders ||
            customer.orders ||
            0;

          const spent =
            customer.totalSpent ??
            customer.spent ??
            0;

          const status =
            customer.status || "Inactive";

          const isActive =
            status === "Active";

          return (
            <div
              key={
                customer._id ||
                customer.id
              }
              className="flex flex-col gap-4 border-b border-gray-100 p-5 last:border-b-0 md:flex-row md:items-center"
            >
              {/* Avatar */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#2D2417] text-lg font-bold text-white">
                {name.charAt(0).toUpperCase()}
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-bold text-gray-800">
                  {name}
                </h3>

                <p className="mt-1 truncate text-sm text-gray-500">
                  {email}
                </p>

                <p className="mt-1 truncate text-sm text-gray-400">
                  {phone}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <ShoppingCart size={15} />

                    <span>
                      {orders} Orders
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
                    <Wallet size={15} />

                    <span>
                      ${Number(spent).toFixed(2)} Spent
                    </span>
                  </div>
                </div>
              </div>

              {/* Status + Delete */}
              <div className="flex items-center gap-3 md:flex-col md:items-end">
                <div
                  className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-bold ${
                    isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      isActive
                        ? "bg-green-600"
                        : "bg-gray-400"
                    }`}
                  />

                  {status}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(customer)
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600 transition hover:bg-red-100"
                  aria-label="Delete customer"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}