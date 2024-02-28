// "use client";

import {Button} from "@/components/ui/button";
import {useProductModal} from "@/store";
import Link from "next/link";

type Props = {
  dashboardId: string;
};
function AddProduct({dashboardId}: Props) {
  // const {onOpen} = useProductModal();
  return (
    <Button>
      <Link href={`/dashboard/${dashboardId}/products/add`}>Add Product</Link>
    </Button>
  );
}

export default AddProduct;
