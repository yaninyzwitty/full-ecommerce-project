import React from "react";
import AddCategory from "./_components/add-category";

type Props = {
  params: {
    dashboardId: string;
  };
};
function CategoriesPage({params: {dashboardId}}: Props) {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="pt-14 pl-[70px] lg:pl-60 ml-6 mt-6  flex-1 mx-5">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-xl mb-2">Your Categories</h3>

        <AddCategory dashboardId={dashboardId} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-8 gap-5 pb-10">
        {arr.map((item) => (
          <div
            key={item}
            className="border w-full rounded-lg aspect-[110/127] flex flex-col justify-between overflow-hidden "
          >
            <div className="relative group flex-1 bg-amber-50 ">
              {item}

              <div className="absolute group-hover:block  transition-opacity opacity-0 cursor-pointer group-hover:opacity-50 top-0 left-0 right-0 h-[100%] bg-black" />
            </div>
            <div className="p-8">hello</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoriesPage;
