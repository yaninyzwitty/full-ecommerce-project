"use client";

import {useModalStore} from "@/store";

export default function Home() {
  const {onClose, onOpen, open} = useModalStore();
  const arr = [1, 2, 3, 4];

  return (
    <div className="h-full mt-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 m-6">
        <button
          className="p-8 bg-emerald-500 rounded-md h-80 text-white flex items-center justify-center uppercase "
          onClick={onOpen}
        >
          Add a store
        </button>
        {/* {arr.map((item, idx) => (
          <div key={idx}>
            <div className="p-8 bg-sky-500 rounded-md h-80 text-white flex items-center justify-center ">
              <h3>{item}</h3>d
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
}
