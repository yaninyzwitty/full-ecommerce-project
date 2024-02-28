"use client";
import {cn} from "@/lib/utils";
import {LucideIcon} from "lucide-react";
import Link from "next/link";

import {useRouter} from "next/navigation";

type Props = {
  href: string;
  icon: LucideIcon;
  isCollapsible: boolean;
  active: boolean;
  name: string;
};
function SidebarRoute({active, href, icon: Icon, isCollapsible, name}: Props) {
  const router = useRouter();
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center space-x-6 m-3 p-4 hover:bg-neutral-600/15 cursor-pointer rounded justify-center lg:justify-start ",
        active && "bg-sky-600/15 hover:bg-sky-600/15 transition duration-150 "
      )}
    >
      <Icon className=" text-gray-700 shrink-0" size={24} />
      <h3 className="hidden lg:inline">{name}</h3>
    </Link>
  );
}

export default SidebarRoute;
