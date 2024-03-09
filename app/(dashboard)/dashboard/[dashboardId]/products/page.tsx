import {getProductsByStoreId} from "@/lib/get-product";
import {getSellerLoaction} from "@/lib/get-seller-location";
import {ProductTableData} from "@/schemas/typings";
import LocationError from "../_components/location-error";
import AddProduct from "./_components/add-product";
import {columns} from "./_components/columns";
import {DataTable} from "./_components/data-table";

type Props = {
  params: {
    dashboardId: string;
  };
};

async function ProductsPage({params}: Props) {
  const products = await getProductsByStoreId(params.dashboardId);
  const location = await getSellerLoaction(params.dashboardId);
  const has_no_location = !location || location.length === 0;

  const newData = products.map((item: ProductTableData, idx: number) => ({
    id: (idx + 1).toString(),
    name: item.name,
    inventory: item.inventory,
    price: item.price === null ? 0 : item.price,
    isPublished: item.isPublished,
    inStock: item.inStock,
    productId: item.productId,
    storeId: item.storeId,
    category: item.category,
    createdAt: item.createdAt,
  })) as ProductTableData[];

  return (
    <div className="pt-14 pl-[70px] lg:pl-60 flex-1 ">
      {!location || (location.length === 0 && <LocationError />)}
      <div className="flex items-center justify-between ml-6 mx-7 pt-8">
        <h3 className="font-medium text-xl mb-2">Your Products</h3>

        <AddProduct
          dashboardId={params.dashboardId}
          has_no_location={has_no_location}
        />
      </div>
      <div className="p-10">
        <DataTable columns={columns} data={newData} />
      </div>
    </div>
  );
}

export default ProductsPage;
