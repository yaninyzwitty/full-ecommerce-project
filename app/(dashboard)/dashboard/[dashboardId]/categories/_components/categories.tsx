import CategoryDropdown from "@/components/category-dropdown";
import {MoreHorizontal} from "lucide-react";
import Image from "next/image";
import CreamImage from "@/images/creameries.png";
import React from "react";

function Categories() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-8 gap-5 pb-10">
      {arr.map((item) => (
        <div
          key={item}
          className="border w-full rounded-lg aspect-[110/127] flex flex-col justify-between overflow-hidden "
        >
          <div className="relative group flex-1  bg-amber-50 ">
            <CategoryDropdown>
              <div
                className="absolute top-2 right-2 group-hover:block hidden z-10  p-1.5 rounded-lg "
                role="button"
              >
                <MoreHorizontal
                  className="group-hover:text-white stroke-2 group-hover:opacity-75"
                  size={28}
                />
              </div>
            </CategoryDropdown>
            <Image src={CreamImage} alt="" fill className="object-cover" />

            <div className="absolute group-hover:block  transition-opacity opacity-0 cursor-pointer group-hover:opacity-50 top-0 left-0 right-0 h-[100%] bg-black" />
          </div>
          <div className="py-4 px-2 group-hover:bg-white">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Creameries</h3>

              <span className="ml-auto mx-2 bg-emerald-500 h-6 w-6 rounded-full flex items-center justify-center text-xs text-white">
                32
              </span>
            </div>
            <h3 className="mt-2 text-sm font-bold ">
              Created,
              <span className="block text-gray-700 text-xs mt-1 font-medium lg:text-sm">
                about 6 days ago.
              </span>
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Categories;
