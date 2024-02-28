import {Button} from "@/components/ui/button";
import {Heart, Menu, Search, ShoppingBag} from "lucide-react";
import Link from "next/link";
import MiddleSection from "./middle-section";

function Header() {
  return (
    <header className="h-20  bg-white p-3 flex items-center justify-between w-full flex-1 top-0 z-50 fixed ">
      <div className="flex items-center space-x-2 lg:hidden ">
        <Button variant={"ghost"} size={"icon"} className="rounded-none">
          <Menu size={20} />
        </Button>
        <Button variant={"ghost"} size={"icon"} className="rounded-none ">
          <Search size={20} />
        </Button>
      </div>

      <Link href={"/"} className="">
        <h2 className="uppercase text-3xl font-medium ">ShopSphere</h2>
      </Link>

      <MiddleSection />

      <div className="space-x-4 mx-4 flex items-center">
        <Button
          className="uppercase text-xl  hidden md:inline  rounded-none hover:bg-gray-200"
          variant={"ghost"}
        >
          lOGIN
        </Button>
        <button className="hover:bg-gray-200 hidden md:inline p-2 rounded">
          <Search size={28} />
        </button>
        <button className="hover:bg-gray-200  p-2 rounded">
          <Heart size={28} />
        </button>

        <button className="hover:bg-gray-200 p-2.5 rounded relative">
          <ShoppingBag size={28} />

          <span className="absolute h-4 w-4  bg-rose-500 text-white rounded-full text-xs top-2 right-1 translate-x-2 -translate-y-1">
            3
          </span>
        </button>
      </div>
    </header>
  );
}

export default Header;
