import {getProductsByStoreId} from "@/lib/get-product";
import AddProduct from "./_components/add-product";
import {Payment, columns} from "./_components/columns";
import {DataTable} from "./_components/data-table";
import {ProductTableData} from "@/schemas/typings";

type Props = {
  params: {
    dashboardId: string;
  };
};

async function ProductsPage({params}: Props) {
  const products = await getProductsByStoreId(params.dashboardId);

  const newData = products.map((item: ProductTableData, idx: number) => ({
    id: (idx + 1).toString(),
    name: item.name,
    price: item.price === null ? 0 : item.price,
    isPublished: item.isPublished,
    // inStock: item.inStock,
    category: item.category,
    createdAt: item.createdAt,
  })) as ProductTableData[];

  return (
    <div className="pt-14 pl-[70px] lg:pl-60 ml-6 mt-6  flex-1 mx-5">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-xl mb-2">Your Products</h3>

        <AddProduct dashboardId={params.dashboardId} />
      </div>
      <div className="  py-10">
        <DataTable columns={columns} data={newData} />
      </div>
    </div>
  );
}

export default ProductsPage;
