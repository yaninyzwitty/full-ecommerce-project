import {Separator} from "@/components/ui/separator";
import {getProduct} from "@/lib/get-product";
import {cn} from "@/lib/utils";
import AddToWarehouseButton from "./_components/add-to-warehouse";
import InitialProductCategory from "./_components/initial-product-category";
import InitialProductColors from "./_components/initial-product-colors";
import InitialProductDescription from "./_components/initial-product-description";
import InitialProductImage from "./_components/initial-product-image";
import InitialProductName from "./_components/initial-product-name";
import InitialProductPrice from "./_components/initial-product-price";
import IntialProductSubCategory from "./_components/initial-product-sub";
import UnPublishButton from "./_components/unpublish-button";
import DeleteProduct from "./_components/delete-product";
import {notFound} from "next/navigation";
import {getCategories} from "@/lib/get-category";
import {formatCategory} from "@/lib/format-category";

type Props = {
  params: {
    dashboardId: string;
    productId: string;
  };
};
async function ProductIdPage({params: {dashboardId, productId}}: Props) {
  const product = await getProduct(dashboardId, productId);
  const categories = await formatCategory();

  if (!product || product === undefined) {
    notFound();
  }

  const requiredFields = [
    product.name,
    product.description,
    product.price.toString() === "NaN" ? null : product.price,
    product.category,
    product.images,
  ];

  const hasAllFields = requiredFields.every(Boolean);

  const remainingFields = requiredFields.filter(
    (requiredField) => requiredField !== null || undefined
  );

  return (
    <div className="pt-14 pl-[70px] lg:pl-60 flex-1">
      <div className="m-3">
        <div className=" flex items-center justify-between ">
          <h3 className="text-2xl font-medium">Add your product information</h3>

          <span
            className={cn(
              "ml-auto mx-5 text-red-600 font-medium gap-x-3",
              hasAllFields &&
                "ml-auto mx-5 text-emerald-500 font-medium gap-x-3"
            )}
          >
            <p>Complete all fields</p>
            {remainingFields.length} / {requiredFields.length}
          </span>

          {product.isPublished ? (
            <div className="flex items-center gap-x-3">
              <UnPublishButton />
              <DeleteProduct />
            </div>
          ) : (
            <AddToWarehouseButton hasAllFields={hasAllFields} />
          )}
        </div>

        <Separator className="my-2" />

        <div className="w-full  rounded-md grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <InitialProductName title={product.name} />
            <InitialProductDescription description={product.description} />
            <InitialProductPrice price={product.price} />
            <InitialProductCategory
              category={product.category}
              categories={categories}
            />
          </div>
          <div>
            <InitialProductImage images={product.images} />
            <IntialProductSubCategory subCategories={product.subCategorys} />
            <InitialProductColors colors={product.colors} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductIdPage;
