"use client";

import {Button} from "@/components/ui/button";
import {zodResolver} from "@hookform/resolvers/zod";
import {Fullscreen, PencilIcon, X} from "lucide-react";
import {useParams, useRouter} from "next/navigation";
import {useState, useTransition} from "react";
import {useForm} from "react-hook-form";
import {toast} from "sonner";
import {z} from "zod";
import {UploadDropzone} from "@/lib/upload-thing";
import {onUpdateProductImage} from "@/actions/product";
import {ProductImageSchema} from "@/schemas";
import Image from "next/image";
import {useThumbnailModal} from "@/store";

type Props = {
  images: string[];
};

function InitialProductImage({images}: Props) {
  const {onOpen} = useThumbnailModal();
  console.log(images);
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

  const form = useForm<z.infer<typeof ProductImageSchema>>({
    resolver: zodResolver(ProductImageSchema),
    defaultValues: {
      imageUrl: "",
    },
  });

  function onSubmit(values: z.infer<typeof ProductImageSchema>) {
    startTransition(() => {
      onUpdateProductImage(
        values,
        params.productId as string,
        params.dashboardId as string
      )
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }

          if (data.success) {
            toast.success("Product image updated successfully");
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
              Add image
            </>
          )}
        </Button>
      </div>

      {!isEditing && !!images && images?.length > 0 && (
        <div className="flex items-center gap-x-3 flex-wrap">
          {images.map((image, idx) => (
            <div className="group relative" key={idx}>
              <Image
                src={image}
                alt="image"
                className="rounded hover:opacity-75 hover:invert-0 "
                width={90}
                height={70}
              />

              <span
                className=" left-5 top-5 right-5  bottom-5 absolute hidden group-hover:inline transition-all duration-150 ease-out hover:opacity-75 cursor-pointer "
                onClick={() => onOpen(image, idx)}
              >
                <Fullscreen
                  size={32}
                  className="text-gray-900  m-2"
                  strokeWidth={2}
                />
              </span>
            </div>
          ))}
        </div>
      )}
      {isEditing && (
        <div className="rounded-xl border outline-dashed outline-muted">
          <UploadDropzone
            endpoint="uploadImage"
            onClientUploadComplete={(res) => {
              onSubmit({imageUrl: res?.[0].url as string});
              setIsEditing(false);
              router.refresh();
            }}
          />
        </div>
      )}
    </div>
  );
}

export default InitialProductImage;
