"use client";

import {onUpdateProductStock} from "@/actions/product";
import {Button} from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {zodResolver} from "@hookform/resolvers/zod";
import {PencilIcon} from "lucide-react";
import {useParams} from "next/navigation";
import {useState, useTransition} from "react";
import {useForm} from "react-hook-form";
import {toast} from "sonner";
import {z} from "zod";

enum STOCK {
  IN_STOCK = "IN_STOCK",
  OUT_OF_STOCK = "OUT_OF_STOCK",
  LIMITED_STOCK = "LIMITED_STOCK",
}

const formSchema = z.object({
  inStock: z.string().min(1, {
    message: "Select one Stock level",
  }),
});

type Props = {
  inStock: string;
};

function InitialProductStock({inStock}: Props) {
  console.log(inStock);
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
      inStock: inStock || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => {
      onUpdateProductStock(
        values,
        params.productId as string,
        params.storeId as string
      )
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }
          if (data.success) {
            toast.success(data.success);
            form.reset();
            setIsEditing(false);
          }
        })
        .catch(() => toast.error("Something went wrong"));
    });
  }
  return (
    <div className="mt-6 bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Product stock level
        <Button variant={"ghost"} onClick={handleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <PencilIcon className="h-4 w-4 mr-2" />
              Edit stock level
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className="text-sm mr-2 font-bold">{inStock}</p>}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 space-y-8"
          >
            <FormField
              control={form.control}
              name="inStock"
              render={({field}) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a stock level " />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={STOCK.IN_STOCK}>
                        {STOCK.IN_STOCK}
                      </SelectItem>
                      <SelectItem value={STOCK.LIMITED_STOCK}>
                        {STOCK.LIMITED_STOCK}
                      </SelectItem>
                      <SelectItem value={STOCK.OUT_OF_STOCK}>
                        {STOCK.OUT_OF_STOCK}
                      </SelectItem>
                    </SelectContent>
                  </Select>
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

export default InitialProductStock;
