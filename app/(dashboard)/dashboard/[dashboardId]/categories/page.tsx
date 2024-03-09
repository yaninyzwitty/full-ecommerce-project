import {getCategories} from "@/lib/get-category";
import AddCategory from "./_components/add-category";
import Categories from "./_components/categories";
import {getProductsByStoreId} from "@/lib/get-product";
import LocationError from "../_components/location-error";
import {getSellerLoaction} from "@/lib/get-seller-location";

type Props = {
  params: {
    dashboardId: string;
  };
};
async function CategoriesPage({params: {dashboardId}}: Props) {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const categories = await getCategories(dashboardId);
  const location = await getSellerLoaction(dashboardId);
  const products = await getProductsByStoreId(dashboardId);
  const has_no_location = !location || location.length === 0;

  if (!categories) {
    return (
      <div className="pt-14 pl-[70px] lg:pl-60 flex items-center justify-center h-full">
        {!location || (location.length === 0 && <LocationError />)}
        Sorry no categories found.
      </div>
    );
  }
  return (
    <div className="pt-14 pl-[70px] lg:pl-60 flex-1 ">
      {!location || (location.length === 0 && <LocationError />)}
      <div className="flex items-center justify-between  ml-6 mt-6 mx-5 ">
        <h3 className="font-medium text-xl mb-2">Your Categories</h3>
        <AddCategory
          dashboardId={dashboardId}
          has_no_location={has_no_location}
        />
      </div>

      <div className="px-8">
        <Categories categories={categories} has_no_location={has_no_location} />
      </div>
    </div>
  );
}

export default CategoriesPage;
