// "use client";

import {Button} from "@/components/ui/button";
import {useProductModal} from "@/store";
import Link from "next/link";

type Props = {
  dashboardId: string;
  has_no_location: boolean;
};
function AddProduct({dashboardId, has_no_location}: Props) {
  // const {onOpen} = useProductModal();
  return (
    <Button disabled={has_no_location}>
      <Link href={`/dashboard/${dashboardId}/products/add`}>Add Product</Link>
    </Button>
  );
}

export default AddProduct;
