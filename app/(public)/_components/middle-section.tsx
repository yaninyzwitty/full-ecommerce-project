"use client";

import {usePathname} from "next/navigation";
import SectionRoute from "./section-route";

function MiddleSection() {
  const pathname = usePathname();

  const routes = [
    {
      name: "New Arrivals",
      href: "/new",
      active: pathname === "/new",
    },
    {
      name: "Fan Favs",
      href: "/fan-favs",
      active: pathname === "/fan-favs",
    },
    {
      name: "Leggins",
      href: "/leggins",
      active: pathname === "/leggins",
    },
    {
      name: "Shorts",
      href: "/shorts",
      active: pathname === "/shorts",
    },
    {
      name: "Tops",
      href: "/tops",
      active: pathname === "/tops",
    },
    {
      name: "Bras",
      href: "/bras",
      active: pathname === "/bras",
    },
  ];
  return (
    <div className="ml-10  hidden lg:flex items-center space-x-5">
      {routes.map((route, idx) => (
        <SectionRoute route={route} key={idx} />
      ))}
    </div>
  );
}

export default MiddleSection;
