"use client";
import {onAddToWarehouse} from "@/actions/product";
import {Button} from "@/components/ui/button";
import {useParams} from "next/navigation";
import React, {useTransition} from "react";
import {toast} from "sonner";
import DeleteProduct from "./delete-product";

function AddToWarehouseButton({hasAllFields}: {hasAllFields: boolean}) {
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const onClick = (isTrue: boolean) => {
    startTransition(() => {
      onAddToWarehouse(
        true,
        params.productId as string,
        params.storeId as string
      )
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }
          if (data.success) {
            toast.success(data.success);
          }
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };
  return (
    <div className="flex items-center space-x-3">
      <Button
        disabled={!hasAllFields || isPending}
        onClick={() => onClick(true)}
      >
        Add to warehouse
      </Button>
      <DeleteProduct />
    </div>
  );
}

export default AddToWarehouseButton;
