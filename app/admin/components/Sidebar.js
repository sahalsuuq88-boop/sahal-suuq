"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Folder,
  Settings,
  MessageSquare,
} from "lucide-react";
import DarkLogo from "../../home/component/dackLogo";

const menus = [
  {
    title: "Dashboard",
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
    title: "Categories",
    href: "/admin/categores",
    icon: Folder,
  },
  {
    title: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
  {
    title: "Messages",
    href: "/admin/messages",
    icon: MessageSquare,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    // <aside
    //   className="
    //     fixed
    //     left-0
    //     top-0
    //     z-40
    //     hidden
    //     h-screen
    //     w-72
    //     shrink-0
    //     flex-col
    //     overflow-y-auto
    //     bg-[#2D2417]
    //     text-white
    //     lg:flex
    //   "
    // ></aside>
    <aside className="hidden lg:flex h-screen w-72 shrink-0 flex-col overflow-y-auto bg-[#2D2417] text-white fixed">
      {/* LOGO */}
      <div className="flex items-center justify-center px-5 py-5">
        <DarkLogo />
      </div>

      {/* MENU */}
      <nav className="mt-4 flex-1 space-y-2 px-4">
        {menus.map((menu) => {
          const Icon = menu.icon;

          const active =
            pathname === menu.href ||
            (menu.href !== "/admin" && pathname.startsWith(menu.href));

          return (
            <Link
              key={menu.title}
              href={menu.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${active
                  ? "bg-[#C8A96E] text-white shadow-sm"
                  : "bg-[#221f19] text-slate-300 hover:bg-[#342d23] hover:text-white"
                }`}
            >
              <Icon size={20} />
              <span className="text-sm font-medium">{menu.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* FOOTER */}
      <div className="border-t border-white/10 p-5">
        <p className="text-sm font-semibold">HEL SUUQ</p>

        <span className="text-xs text-slate-400">Admin Dashboard v1.0</span>
      </div>
    </aside>
  );
}
