"use client";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useParams, useRouter} from "next/navigation";
import {useTransition} from "react";
import {onAddCategoryName} from "@/actions/category";
import {toast} from "sonner";

const formSchema = z.object({
  name: z.string().min(2).max(50, {
    message: "Name must be between 2 and 50 characters",
  }),
});

function AddCategoryPage() {
  const params = useParams();
  const storeId = params.dashboardId as string;
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => {
      onAddCategoryName(values, storeId).then((data) => {
        if (data.error) {
          toast.error(data.error);
        }

        if (data.success) {
          toast.success("Added category successfully");
          router.push(`/dashboard/${storeId}/categories/${data.success}`);
        }
      });
    });
  }

  return (
    <div className="pl-[70px] lg:pl-60 pt-14 flex-1">
      <Separator className="my-4" />

      <div className="max-w-lg mx-auto  space-y-4 mt-4">
        <h1 className="text-3xl font-medium">Create a new category</h1>

        <p className="text-gray-600">Add a new category to your store.</p>

        <div className="mt-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
              <FormField
                control={form.control}
                name="name"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Name of your category</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="eg.'shoes-brown...'"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending}>
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default AddCategoryPage;
