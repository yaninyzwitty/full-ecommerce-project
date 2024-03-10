import {cn} from "@/lib/utils";
import {DollarSign} from "lucide-react";
import {Poppins} from "next/font/google";
import React from "react";

type Props = {};
const font = Poppins({weight: ["100", "200", "400"], subsets: ["latin"]});

function Cards({}: Props) {
  return (
    <div className="px-8 py-9 border flex flex-col rounded-md hover:bg-gray-200 transition-all duration-150 cursor-pointer  ">
      <div className="mx-2 flex items-center font-medium tracking-wide  justify-between ">
        Total Payment
        <DollarSign className="text-gray-600 h-5 w-5" />
      </div>

      <div className="mt-2 flex flex-col">
        <h3 className={cn("text-3xl tracking-wider font-bold", font.className)}>
          {numberToDollars(45_231.89)}
        </h3>
        <p className="text-gray-500 text-sm">+20.1% from last month</p>
      </div>
    </div>
  );
}

export default Cards;

function numberToDollars(number: number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}
