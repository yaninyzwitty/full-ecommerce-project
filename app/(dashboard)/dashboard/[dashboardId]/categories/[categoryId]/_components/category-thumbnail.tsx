"use client";

import {Button} from "@/components/ui/button";
import {zodResolver} from "@hookform/resolvers/zod";
import {Fullscreen, ImageIcon, PencilIcon, X} from "lucide-react";
import {useParams, useRouter} from "next/navigation";
import {useState, useTransition} from "react";
import {useForm} from "react-hook-form";
import {toast} from "sonner";
import {z} from "zod";
import {UploadDropzone} from "@/lib/upload-thing";
import {onUpdateProductImage} from "@/actions/product";
import {CategoryThumbnailSchema} from "@/schemas";
import Image from "next/image";
import {useThumbnailModal} from "@/store";
import {onReplaceCategoryThumbnail} from "@/actions/category";

type Props = {
  thumbnailUrl: string;
};

function CategoryThumbnail({thumbnailUrl}: Props) {
  // const {onOpen} = useThumbnailModal();
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

  const form = useForm<z.infer<typeof CategoryThumbnailSchema>>({
    resolver: zodResolver(CategoryThumbnailSchema),
    defaultValues: {
      thumbnailUrl: "",
    },
  });

  function onSubmit(values: z.infer<typeof CategoryThumbnailSchema>) {
    startTransition(() => {
      onReplaceCategoryThumbnail(
        values,
        params.categoryId as string,
        params.dashboardId as string
      );
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
              Add image
            </>
          )}
        </Button>
      </div>

      {!isEditing && !!thumbnailUrl && (
        <div className="relative flex items-center w-full flex-1 ">
          <Image
            src={thumbnailUrl}
            alt="category thumbnail"
            width={400}
            height={300}
            className="object-cover  w-full "
          />
        </div>
      )}

      {!isEditing && !thumbnailUrl && (
        <div className="flex items-center aspect-video justify-center">
          <ImageIcon className="h-5 w-5" strokeWidth={2} />
        </div>
      )}
      {isEditing && (
        <div className="rounded-xl border outline-dashed outline-muted">
          <UploadDropzone
            endpoint="uploadImage"
            onClientUploadComplete={(res) => {
              onSubmit({thumbnailUrl: res?.[0].url as string});
              setIsEditing(false);
              router.refresh();
            }}
          />
        </div>
      )}
    </div>
  );
}

export default CategoryThumbnail;
