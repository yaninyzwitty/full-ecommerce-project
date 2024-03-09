"use client";

import AddlocationButton from "./add-location-button";

function LocationError() {
  return (
    <div className="w-full bg-rose-500/15 px-5 lg:px-10 text-rose-400 justify-between mb-2 h-20 flex items-center p-2">
      <h3 className="mt-2 font-bold text-sm max-w-[400px]">
        Add your location here, if you need to add some product to sell, some
        categories
      </h3>

      <AddlocationButton />
    </div>
  );
}

export default LocationError;
