"use client";

import {onUpdateStoreBannerImage} from "@/actions/store";
import {Button} from "@/components/ui/button";
import {UploadDropzone} from "@/lib/upload-thing";
import {StoreBannerSchema} from "@/schemas";
import {useThumbnailModal} from "@/store";
import {zodResolver} from "@hookform/resolvers/zod";
import {ImagePlus, PencilIcon} from "lucide-react";
import Image from "next/image";
import {useParams, useRouter} from "next/navigation";
import {useState, useTransition} from "react";
import {useForm} from "react-hook-form";
import {toast} from "sonner";
import {z} from "zod";

type Props = {
  bannerImage: string;
  storeId: {
    id: string;
  };
};

function GeneralStoreThumbnail({bannerImage, storeId}: Props) {
  const {onOpen} = useThumbnailModal();
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState(false);

  const params = useParams();
  const router = useRouter();

  const handleEdit = () => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const form = useForm<z.infer<typeof StoreBannerSchema>>({
    resolver: zodResolver(StoreBannerSchema),
    defaultValues: {
      storeImage: "",
    },
  });

  function onSubmit(values: z.infer<typeof StoreBannerSchema>) {
    startTransition(() => {
      onUpdateStoreBannerImage(values, storeId.id)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }
          if (data.success) {
            toast.success("Store image updated successfully");
          }
        })
        .catch((err) => console.log(err));
    });
  }
  return (
    <div className="mt-6 bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Product image
        <Button variant={"ghost"} onClick={handleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <PencilIcon className="h-4 w-4 mr-2" />
              Edit image
            </>
          )}
        </Button>
      </div>

      {!isEditing && !bannerImage && (
        <div className="py-8 flex items-center justify-center h-full">
          <ImagePlus size={48} className="text-muted-foreground" />
        </div>
      )}

      {!isEditing && !!bannerImage && (
        <div
          className="relative h-48 bg-no-repeat bg-cover bg-center rounded-md"
          style={{
            backgroundImage: `url(${bannerImage})`,
          }}
        ></div>
      )}

      {isEditing && (
        <div className="rounded-xl border outline-dashed outline-muted">
          <UploadDropzone
            endpoint="uploadImage"
            onClientUploadComplete={(res) => {
              onSubmit({storeImage: res?.[0].url as string});
              setIsEditing(false);
              router.refresh();
            }}
          />
        </div>
      )}
    </div>
  );
}

export default GeneralStoreThumbnail;
