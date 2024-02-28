"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

import {useModalStore} from "@/store";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Separator} from "../ui/separator";
import {Textarea} from "../ui/textarea";
import {useTransition} from "react";
import {formSchema} from "@/schemas";
import {addStore} from "@/actions/store";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

function DialogModal() {
  const {onClose, open} = useModalStore();
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => {
      addStore(values)
        .then((data) => {
          if (data?.error) {
            toast.error(data?.error as string);
          }
          if (data.success) {
            onClose();
            router.push(`/dashboard/${data.success}`);

            toast.success(`Store created succesfully!`);
          }
        })
        .catch(() => toast.error("Something went wrong"))
        .finally(() => {
          form.reset();
        });
    });
  }
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">
            Make a{" "}
            <span className="tracking-widest font-bold ">SHOPSPHERE</span>
            seller account
          </DialogTitle>

          <Separator className="w-[0.1rem] bg-gray-500" />

          <div className="mt-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Name of your store</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="store name..."
                          disabled={isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="enter description..."
                          className="resize-none"
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isPending}>
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default DialogModal;
