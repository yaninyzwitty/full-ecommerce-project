"use client";

import {onUpdateStoreName} from "@/actions/store";
import {Button} from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {zodResolver} from "@hookform/resolvers/zod";
import {PencilIcon} from "lucide-react";
import {useState, useTransition} from "react";
import {useForm} from "react-hook-form";
import {toast} from "sonner";
import {z} from "zod";

const formSchema = z.object({
  storeName: z.string().min(2).max(50, {
    message: "Store name must be less than 50 characters",
  }),
});

type Props = {
  storeId: {
    id: string;
  };
  initialName: string;
};

function GeneralStoreName({storeId, initialName}: Props) {
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState(false);

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
      storeName: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => {
      onUpdateStoreName(values, storeId.id as string)
        .then((data) => {
          if (data?.error) {
            toast.error(data.error);
          }

          if (data.success) {
            setIsEditing(false);
            form.reset();
            toast.success(data.success);
            setIsEditing(false);
          }
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  }

  return (
    <div className="mt-6 bg-slate-100 rounded-lg p-4">
      <div className="font-medium flex items-center justify-between">
        store title
        <Button variant={"ghost"} onClick={handleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <PencilIcon className="h-4 w-4 mr-2" />
              Edit title
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className="text-sm mr-2 font-bold">{initialName}</p>}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 space-y-8"
          >
            <FormField
              control={form.control}
              name="storeName"
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Input
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

export default GeneralStoreName;
