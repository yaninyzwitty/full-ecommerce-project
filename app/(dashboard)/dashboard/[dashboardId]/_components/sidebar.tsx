"use client";
import {
  BarChart4,
  Coins,
  Copy,
  LucidePackage2,
  Package,
  Settings,
  StoreIcon,
  Tags,
  Ticket,
} from "lucide-react";
import {useParams, usePathname} from "next/navigation";
import React from "react";
import SidebarRoute from "./sidebar-route";

function Sidebar() {
  const params = useParams();
  const pathname = usePathname();

  const routes = [
    {
      name: "Analytics",
      href: `/dashboard/${params.dashboardId}`,
      icon: BarChart4,
      isCollapsible: false,
      active: pathname === `/dashboard/${params.dashboardId}`,
    },
    {
      name: "Products",
      href: `/dashboard/${params.dashboardId}/products`,
      icon: Package,
      isCollapsible: true,
      active: pathname.startsWith(`/dashboard/${params.dashboardId}/products`),
    },
    {
      name: "Settings",
      href: `/dashboard/${params.dashboardId}/settings`,
      icon: Settings,
      isCollapsible: false,
      active: pathname === `/dashboard/${params.dashboardId}/settings`,
    },
    {
      name: "Categories",
      href: `/dashboard/${params.dashboardId}/categories`,
      icon: Copy,
      isCollapsible: true,
      active: pathname.startsWith(
        `/dashboard/${params.dashboardId}/categories`
      ),
    },
    {
      name: "Orders",
      href: `/dashboard/${params.dashboardId}/orders`,
      icon: Tags,
      isCollapsible: false,
      active: pathname === `/dashboard/${params.dashboardId}/orders`,
    },
  ];
  return (
    <aside className="pt-14 h-full fixed left-0 z-40 bg-white/80 border-r border-gray-300  w-[70px] lg:w-60 ">
      <div className="flex w-full flex-col h-full space-y-0.5">
        <div className=" items-center space-x-3 mt-4 mx-[25px]  hidden lg:flex">
          <LucidePackage2 className="mr-2" size={28} color="black" />
          <h3 className="font-medium text-balance">Shopshere INC</h3>
        </div>
        <div className="mt-4">
          {routes.map((route) => (
            <SidebarRoute
              key={route.href}
              href={route.href}
              icon={route.icon}
              isCollapsible={route.isCollapsible}
              active={route.active}
              name={route.name}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
