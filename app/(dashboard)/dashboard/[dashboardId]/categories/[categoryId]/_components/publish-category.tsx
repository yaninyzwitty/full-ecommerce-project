"use client";

import {onPublishCategory} from "@/actions/category";
import {Button} from "@/components/ui/button";
import {Trash} from "lucide-react";
import {useParams} from "next/navigation";
import {useTransition} from "react";
import {toast} from "sonner";

function PublishCategory({
  hasAllFields,
  isPublished,
}: {
  hasAllFields: boolean;
  isPublished: boolean;
}) {
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      onPublishCategory(
        isPublished ? false : true,
        params.categoryId as string,
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
        .catch(() => toast.error("Something went wrong!"));
    });
  };
  return (
    <>
      {!isPublished && (
        <Button
          disabled={!hasAllFields || isPending}
          className="ml-auto"
          onClick={onClick}
        >
          Publish
        </Button>
      )}
      {isPublished && hasAllFields && (
        <Button
          disabled={isPending}
          className="ml-auto gap-x-3 flex items-center"
          onClick={onClick}
        >
          <Trash className="h-5 w-5" />
          Unpublish
        </Button>
      )}
      ;
    </>
  );
}

export default PublishCategory;
