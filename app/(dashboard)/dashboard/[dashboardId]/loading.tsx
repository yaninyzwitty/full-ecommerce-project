import {Loader} from "lucide-react";
import React from "react";

function Loading() {
  return (
    <div className="flex items-center flex-1  w-full  justify-center pt-14 px-[70px] lg:px-60 min-h-screen  flex-col space-y-2">
      <Loader size={32} className="text-gray-700 animate-spin" />

      <h3 className="text-xl font-medium">Loading dashboard...</h3>
    </div>
  );
}

export default Loading;
