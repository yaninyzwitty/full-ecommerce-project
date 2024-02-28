"use client";

import {onRemoveFromWarehouse} from "@/actions/product";
import {Button} from "@/components/ui/button";
import {useParams} from "next/navigation";
import {startTransition, useTransition} from "react";
import {toast} from "sonner";

type Props = {};

function UnPublishButton({}: Props) {
  const [isPending, startTransition] = useTransition();
  const params = useParams();

  const onClick = () => {
    startTransition(() => {
      onRemoveFromWarehouse(
        false,
        params.productId as string,
        params.dashboardId as string
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
    <Button variant={"ghost"} onClick={onClick} disabled={isPending}>
      Unpublish
    </Button>
  );
}

export default UnPublishButton;
