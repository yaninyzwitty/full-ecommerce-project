"use client";

import {onDeleteProductThumbnail} from "@/actions/product";
import {Dialog, DialogContent} from "@/components/ui/dialog";
import {useThumbnailModal} from "@/store";
import {Trash2Icon} from "lucide-react";
import Image from "next/image";
import {useParams} from "next/navigation";
import {useTransition} from "react";
import {toast} from "sonner";
import {Button} from "../ui/button";
import {Skeleton} from "../ui/skeleton";

type Props = {};

function ThumbnailModal({}: Props) {
  const {imageUrl, index, onClose, open} = useThumbnailModal();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const onSubmit = (imageUrl: string) => {
    startTransition(() => {
      onDeleteProductThumbnail(
        imageUrl,
        params.productId as string,
        params.dashboardId as string
      )
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }

          if (data.success) {
            toast.success(data.success);
            onClose();
          }
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="">
        {!imageUrl ? (
          <ThumbnailModalSkeleton />
        ) : (
          <>
            <div className="m-3 rounded-md w-fit h-[500px]">
              <Image
                src={imageUrl}
                alt="thumbnail"
                fill
                loading="eager"
                className="object-cover"
              />
            </div>

            <Button
              disabled={isPending}
              variant={"destructive"}
              size={"sm"}
              className="absolute m-4"
              onClick={() => onSubmit(imageUrl)}
            >
              <Trash2Icon size={24} />
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ThumbnailModal;

export const ThumbnailModalSkeleton = () => {
  return (
    <div className="m-3 rounded-md w-fit h-[500px]">
      <Skeleton className="object-cover w-full h-full" />
    </div>
  );
};
