import {Loader} from "lucide-react";
import React from "react";

function Loading() {
  return (
    <div className="pl-[70px] lg:pl-60 flex-1 w-full pt-14 flex flex-col items-center justify-center min-h-screen">
      <Loader size={32} className="text-gray-700 animate-spin" />

      <h3 className="text-xl font-medium text-gray-700">Loading...</h3>
    </div>
  );
}

export default Loading;
