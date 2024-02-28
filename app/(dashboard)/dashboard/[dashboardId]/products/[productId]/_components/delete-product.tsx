"use client";
import {deleteProduct} from "@/actions/product";
import {Button} from "@/components/ui/button";
import {Trash} from "lucide-react";
import {useParams, useRouter} from "next/navigation";
import React, {useTransition} from "react";
import {toast} from "sonner";

function DeleteProduct() {
  const [isPending, startTransition] = useTransition();
  const params = useParams();
  const router = useRouter();
  const onClick = () => {
    startTransition(() => {
      deleteProduct(
        params.productId as string,
        params.dashboardId as string
      ).then((data) => {
        if (data.error) {
          toast.error(data.error);
        }

        if (data.success) {
          toast.success("Product deleted successfully");
          router.push(`/dashboard/${params.dashboardId}/products`);
        }
      });
    });
  };
  return (
    <Button size={"sm"} onClick={onClick} disabled={isPending}>
      <Trash size={20} />
    </Button>
  );
}

export default DeleteProduct;
