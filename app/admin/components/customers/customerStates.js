import {
  Users,
  UserPlus,
  UserMinus,
  ShoppingCart,
} from "lucide-react";

export default function CustomerStats({ customers = [] }) {
  const total = customers.length;

  const active = customers.filter(
    (customer) => customer.status === "Active"
  ).length;

  const inactive = customers.filter(
    (customer) => customer.status === "Inactive"
  ).length;

  const totalOrders = customers.reduce(
    (total, customer) =>
      total +
      Number(
        customer.totalOrders ||
          customer.orders ||
          0
      ),
    0
  );

  const cards = [
    {
      title: "Total Customers",
      value: total,
      icon: Users,
      iconClass: "bg-indigo-50 text-indigo-600",
    },
    {
      title: "Active",
      value: active,
      icon: UserPlus,
      iconClass: "bg-green-50 text-green-600",
    },
    {
      title: "Inactive",
      value: inactive,
      icon: UserMinus,
      iconClass: "bg-red-50 text-red-600",
    },
    {
      title: "Total Orders",
      value: totalOrders,
      icon: ShoppingCart,
      iconClass: "bg-orange-50 text-orange-600",
    },
  ];

  return (
    <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl border border-gray-100 bg-white p-5"
          >
            <div
              className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${card.iconClass}`}
            >
              <Icon size={22} />
            </div>

            <p className="mb-1 text-sm text-gray-500">
              {card.title}
            </p>

            <h3 className="text-2xl font-bold text-gray-900">
              {card.value}
            </h3>
          </div>
        );
      })}
    </div>
  );
}