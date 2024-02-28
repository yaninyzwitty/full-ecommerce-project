"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";

import {useProductModal} from "@/store";
import {Button} from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";

import {z} from "zod";
import {ProductNameSchema} from "@/schemas";
import {Textarea} from "../ui/textarea";

function ProductModal() {
  const form = useForm<z.infer<typeof ProductNameSchema>>({
    resolver: zodResolver(ProductNameSchema),
    defaultValues: {
      productName: "",
    },
  });

  const {onClose, open, storeId} = useProductModal();

  function onSubmit(values: z.infer<typeof ProductNameSchema>) {
    console.log(values);
  }
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[85%]">
        <DialogHeader>
          <DialogTitle className="text-center text-lg text-gray-700">
            Add a product to youe store
          </DialogTitle>
          <DialogDescription className="text-center text-gray-500">
            Add a new product?
          </DialogDescription>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto">
            <div className="w-full  ">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="productName"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Name of your product</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="EcoHarmony Rejuvenation Elixir..."
                            className="w-full"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          This will be the name of your product.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Add product name</Button>
                </form>
              </Form>
            </div>
            <div className="w-full  ">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="productName"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel> Product Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Experience the harmonious blend of nature's rejuvenating essence in our EcoHarmony Rejuvenation Elixir, revitalizing your mind, body, and planet..."
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          This will be the description of your product.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Add product description</Button>
                </form>
              </Form>
            </div>
            <div className="w-full  ">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="productName"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel> Product category</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Experience the harmonious blend of nature's rejuvenating essence in our EcoHarmony Rejuvenation Elixir, revitalizing your mind, body, and planet..."
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Add product description</Button>
                </form>
              </Form>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default ProductModal;
