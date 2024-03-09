import {Loader} from "lucide-react";
import React from "react";

function Loading() {
  return (
    <div className="flex-1 pt-14 pl-[70px] lg:pl-60 flex flex-col items-center justify-center min-h-screen ">
      <Loader className="text-gray-700 animate-spin " size={32} />
      <h3 className="text-xl font-medium">Loading orders...</h3>
    </div>
  );
}

export default Loading;
