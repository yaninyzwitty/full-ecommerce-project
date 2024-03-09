"use client";

import {onUpdateProductInventory} from "@/actions/product";
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
import {useParams} from "next/navigation";
import {useState, useTransition} from "react";
import {useForm} from "react-hook-form";
import {toast} from "sonner";
import {z} from "zod";

const formSchema = z.object({
  inventory: z.string({
    required_error: "Total items is required",
  }),
});

type Props = {
  inventory: number;
};

function InitialProductInventory({inventory}: Props) {
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
      inventory: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const parsedInt = parseInt(values.inventory);
    if (parsedInt.toString() === "NaN") {
      toast.error("Invalid price");
      return;
    }

    startTransition(() => {
      if (parseInt(values.inventory) === inventory) {
        toast.error("Product updated successfully");

        setIsEditing(false);
        return;
      }
    });

    const allValues = {
      ...values,
      inventory: parsedInt,
    };

    onUpdateProductInventory(
      allValues,
      params.productId as string,
      params.dashboardId as string
    )
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        }

        if (data.success) {
          toast.success(data.success);
          setIsEditing(false);
        }
      })
      .catch(() => toast.error("Something went wrong"));
  }
  return (
    <div className="mt-6 bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Number of Product items
        <Button variant={"ghost"} onClick={handleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <PencilIcon className="h-4 w-4 mr-2" />
              Edit inventory
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className="text-sm mr-2 font-bold">{inventory}</p>}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 space-y-8"
          >
            <FormField
              control={form.control}
              name="inventory"
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="e.g 'milk-shake'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
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

export default InitialProductInventory;
