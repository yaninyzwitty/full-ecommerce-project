import {Loader} from "lucide-react";
import React from "react";

function Loading() {
  return (
    <div className="flex items-center justify-center pt-14 px-[70px] lg:px-60 min-h-screen  flex-col space-y-2">
      <Loader className="h-10 w-10 text-gray-700" />

      <h3>Loading ...</h3>
    </div>
  );
}

export default Loading;
