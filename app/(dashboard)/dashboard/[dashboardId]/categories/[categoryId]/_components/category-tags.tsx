"use client";

import {onAddCategoryTag, onRemoveCategoryTag} from "@/actions/category";
import {Button} from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {CategoryTagsSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {PencilIcon, X} from "lucide-react";
import {useParams} from "next/navigation";
import {useState, useTransition} from "react";
import {useForm} from "react-hook-form";
import {toast} from "sonner";
import {z} from "zod";

type Props = {
  tags: string[];
};

function CategoryTags({tags}: Props) {
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState(false);
  const params = useParams();

  const handleEdit = () => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const form = useForm<z.infer<typeof CategoryTagsSchema>>({
    resolver: zodResolver(CategoryTagsSchema),
    defaultValues: {
      tag: "",
    },
  });

  function onSubmit(values: z.infer<typeof CategoryTagsSchema>) {
    startTransition(() => {
      onAddCategoryTag(
        values,
        params.categoryId as string,
        params.dashboardId as string
      )
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }

          if (data.success) {
            setIsEditing(false);
            form.reset();
            toast.success("Category tag added successfully");
          }
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  }

  const onClick = (tag: string) => {
    onRemoveCategoryTag(
      tag,
      params.categoryId as string,
      params.dashboardId as string
    )
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        }

        if (data.success) {
          toast.success("Category tag removed successfully");
        }
      })
      .catch(() => toast.error("Something went wrong!"));
  };
  return (
    <div className="mt-6 bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Category tags
        <Button variant={"ghost"} onClick={handleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <PencilIcon className="h-4 w-4 mr-2" />
              Edit tags
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div className="flex-wrap space-y-2 flex items-center space-x-2">
          {!!tags &&
            tags.map((tag, idx) => (
              <div
                key={idx}
                className="text-sm  text-gray-500 bg-white  py-4 px-5   rounded-md relative"
              >
                <p className="m-1">{tag}</p>

                <span
                  className="absolute h-5 cursor-pointer w-5 top-1 right-1   bg-emerald-500 rounded-md flex items-center justify-center hover:opacity-75"
                  onClick={() => onClick(tag)}
                  role="button"
                >
                  <X className="text-white py-1" />
                </span>
              </div>
            ))}
        </div>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 space-y-8"
          >
            <FormField
              control={form.control}
              name="tag"
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="e.g 'milk-shake is great...'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="fle items-center gap-x-2">
              <Button disabled={isPending} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}

export default CategoryTags;
