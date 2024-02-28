"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import {Button} from "@/components/ui/button";

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
import {z} from "zod";
import {onAddProductColor} from "@/actions/product";
import {toast} from "sonner";

const formSchema = z.object({
  color: z.string().min(2).max(50, {
    message: "Product name must be less than 50 characters",
  }),
});

type Props = {
  colors: string[];
};

function InitialProductColors({colors}: Props) {
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
      color: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    startTransition(() => {
      onAddProductColor(
        data,
        params.productId as string,
        params.dashboardId as string
      )
        .then((data) => {
          if (data?.error) {
            toast.error(data.error);
          }

          if (data.success) {
            toast.success("Product color added successfully");
            setIsEditing(false);
          }
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };
  return (
    <div className="mt-6 bg-slate-200 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Colors (optional)
        <Button variant={"ghost"} onClick={handleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <PencilIcon className="h-4 w-4 mr-2" />
              Add colors
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div className="flex gap-x-3">
          {!!colors &&
            colors.map((color) => (
              <div
                className="mt-2 rounded-lg h-14 w-14"
                key={color}
                style={{
                  backgroundColor: color,
                }}
              ></div>
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
              name="color"
              render={({field}) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a color " />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="#FFFFFF">White</SelectItem>
                      <SelectItem value="#000000">Black</SelectItem>
                      <SelectItem value="#FF0000">Red</SelectItem>
                      <SelectItem value="#00FF00">Green</SelectItem>
                      <SelectItem value="#0000FF">Blue</SelectItem>
                      <SelectItem value="#FFFF00">Yellow</SelectItem>
                      <SelectItem value="#FF00FF">Magenta</SelectItem>
                      <SelectItem value="#FFA500">Orange</SelectItem>
                      <SelectItem value="#800080">Purple</SelectItem>
                      <SelectItem value="#00FFFF">Cyan</SelectItem>
                      <SelectItem value="#FFC0CB">Pink</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose the colors you want to add
                  </FormDescription>
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

export default InitialProductColors;
