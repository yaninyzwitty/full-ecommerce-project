import {Button} from "@/components/ui/button";
import React from "react";

import {Heart, Search, ShoppingBasket} from "lucide-react";
function RightItems() {
  return (
    <div className="ml-auto lg:mx-3 space-x-5 flex items-center max-w-[250px]">
      <Button
        className="uppercase rounded-none border-gray-500 border"
        variant={"ghost"}
        size={"sm"}
      >
        lOGIN
      </Button>

      <Button
        className="border-gray-500 border  rounded-none"
        size={"sm"}
        variant={"ghost"}
      >
        <Search size={18} />
      </Button>
      <Button
        className="border-gray-500 border  rounded-none"
        size={"sm"}
        variant={"ghost"}
      >
        <Heart size={18} />
      </Button>
      <Button
        className="border-gray-500 border  rounded-none relative"
        variant={"ghost"}
        size={"sm"}
      >
        <ShoppingBasket size={22} className="mx-2" />

        <span className="bg-rose-500 text-white absolute h-5 w-5 flex items-center justify-center rounded-full  top-2 right-2 translate-x-2 -translate-y-1 ">
          0
        </span>
      </Button>
    </div>
  );
}

export default RightItems;
