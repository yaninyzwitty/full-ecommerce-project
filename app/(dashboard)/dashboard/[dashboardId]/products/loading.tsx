import {Loader} from "lucide-react";
import React from "react";

function Loading() {
  return (
    <div className=" pt-14 pl-[70px] lg:pl-60 flex-1 min-h-screen ">
      <div className="flex items-center  flex-col pt-40 justify-center ">
        <Loader className="h-10 w-10 animate-spin  " strokeWidth={2} />
        Loading...
      </div>
    </div>
  );
}

export default Loading;
