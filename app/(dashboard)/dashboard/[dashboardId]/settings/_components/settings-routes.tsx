"use client";

import {cn} from "@/lib/utils";
import Link from "next/link";
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";

function SettingsRoutes({dashboardId}: {dashboardId: string}) {
  const searchParams = useSearchParams();
  const searchParamValue = searchParams.get("path");
  const [active, setActive] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!searchParamValue) {
      setActive(true);
    }
  }, [active, searchParamValue, setActive]);
  const routes = [
    {
      name: "My Details",
      href: `/dashboard/${dashboardId}/settings`,
      pathname: searchParams?.get("path"),
    },
    {
      name: "Customizations",
      href: `/dashboard/${dashboardId}/settings`,
      pathname: searchParams?.get("path"),
    },
    {
      name: "My Profile",
      href: `/dashboard/${dashboardId}/settings`,
      pathname: searchParams?.get("path"),
    },
    {
      name: "Billing Details",
      href: `/dashboard/${dashboardId}/settings`,
      pathname: searchParams?.get("path"),
    },
    {
      name: "Notifications",
      href: `/dashboard/${dashboardId}/settings`,
      pathname: searchParams?.get("path"),
    },
  ];

  const handleClick = () => {
    setActive(true);
  };
  return (
    <div
      className="m-6 grid grid-cols-2 gap-4 md:grid-cols-3 
      lg:flex lg:items-center lg:space-x-4
    "
    >
      <div
        role="button"
        onClick={() => {
          router.push(`/dashboard/${dashboardId}/settings`);
          handleClick();
        }}
      >
        <h3
          className={cn(
            "text-xs py-2 font-medium bg-gray-100 px-4 rounded-md hover:bg-gray-200/85 transition-all duration-150 cursor-pointer",

            active && !searchParamValue && "bg-gray-300/85 hover:bg-gray-300/85"
          )}
        >
          General
        </h3>
      </div>
      {routes.map((route, idx) => (
        <Link
          key={route.href}
          href={{
            pathname: route.href,
            query: {path: route.name.toString()},
          }}
        >
          <h3
            className={cn(
              "text-xs py-2 font-medium bg-gray-100 px-4 rounded-md hover:bg-gray-200/85 transition-all duration-150 cursor-pointer",
              route.pathname === route.name &&
                "bg-gray-300/85 hover:bg-gray-300/85"
            )}
          >
            {route.name}
          </h3>
        </Link>
      ))}
    </div>
  );
}

export default SettingsRoutes;
