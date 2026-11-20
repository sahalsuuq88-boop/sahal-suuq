"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
} from "lucide-react";

const menus = [
  {
    title: "Home",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#E8E3DA] bg-white lg:hidden">
      <div className="grid h-[68px] grid-cols-5">
        {menus.map((menu) => {
          const Icon = menu.icon;

          const active =
            pathname === menu.href ||
            (menu.href !== "/admin" &&
              pathname.startsWith(`${menu.href}/`));

          return (
            <Link
              key={menu.title}
              href={menu.href}
              className={`flex flex-col items-center justify-center gap-1 transition ${
                active
                  ? "text-[#C8A96E]"
                  : "text-[#8A8175]"
              }`}
            >
              <Icon
                size={21}
                strokeWidth={active ? 2.5 : 2}
              />

              <span
                className={`text-[10px] ${
                  active ? "font-bold" : "font-medium"
                }`}
              >
                {menu.title}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}