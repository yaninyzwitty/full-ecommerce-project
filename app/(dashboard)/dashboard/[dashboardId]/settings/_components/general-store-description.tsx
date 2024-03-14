"use client";

import {onUpdateStoreDesc} from "@/actions/store";
import {Button} from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";
import {zodResolver} from "@hookform/resolvers/zod";
import {PencilIcon} from "lucide-react";
import {useParams} from "next/navigation";
import {useState, useTransition} from "react";
import {useForm} from "react-hook-form";
import {toast} from "sonner";
import {z} from "zod";

const formSchema = z.object({
  storeDesc: z.string().min(2).max(500, {
    message: "store name must be less than 500 characters",
  }),
});

type Props = {
  storeId: {
    id: string;
  };
  initialDescription: string;
};

function GeneralStoreDescription({storeId, initialDescription}: Props) {
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      storeDesc: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => {
      onUpdateStoreDesc(values, storeId.id as string)
        .then((data) => {
          if (data?.error) {
            toast.error(data.error);
          }
          if (data?.success) {
            setIsEditing(false);
            form.reset();
            toast.success("Product updated succesfully!");
          }
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  }
  return (
    <div className="mt-6 bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Store description
        <Button variant={"ghost"} onClick={handleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <PencilIcon className="h-4 w-4 mr-2" />
              Edit description
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className="text-sm mr-2 font-bold">{initialDescription}</p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 space-y-8"
          >
            <FormField
              control={form.control}
              name="storeDesc"
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={isPending}
                      placeholder="e.g 'milk-store..'"
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

export default GeneralStoreDescription;
