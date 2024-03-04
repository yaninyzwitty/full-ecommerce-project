import {getCategories} from "@/lib/get-category";
import AddCategory from "./_components/add-category";
import Categories from "./_components/categories";

type Props = {
  params: {
    dashboardId: string;
  };
};
async function CategoriesPage({params: {dashboardId}}: Props) {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const categories = await getCategories(dashboardId);

  if (!categories) {
    return (
      <div className="pt-14 pl-[70px] lg:pl-60 flex items-center justify-center h-full">
        Sorry no categories found.
      </div>
    );
  }
  return (
    <div className="pt-14 pl-[70px] lg:pl-60 ml-6 mt-6  flex-1 mx-5">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-xl mb-2">Your Categories</h3>
        <AddCategory dashboardId={dashboardId} />
      </div>

      <Categories categories={categories} />
    </div>
  );
}

export default CategoriesPage;
