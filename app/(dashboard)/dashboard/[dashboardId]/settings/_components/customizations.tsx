"use client";
import ModeToggle from "@/components/mode-toggle";
import {Bell, Sun} from "lucide-react";
import React, {useState, useTransition} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";

import {Button} from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {Switch} from "@/components/ui/switch";
import {AllowNotifSchema} from "@/schemas";
import {onAllowNotif} from "@/actions/store";
import {toast} from "sonner";
import {useSearchParams} from "next/navigation";

type Props = {
  allowNotif: boolean;
  storeId: {
    id: string;
  };
};

function Customizations({allowNotif, storeId}: Props) {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const form = useForm<z.infer<typeof AllowNotifSchema>>({
    resolver: zodResolver(AllowNotifSchema),
    defaultValues: {
      enableMessages: allowNotif || false,
    },
  });

  const searchParamValue = searchParams.get("path");

  function onSubmit(data: z.infer<typeof AllowNotifSchema>) {
    startTransition(() => {
      onAllowNotif(data, storeId.id as string)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }

          if (data.success) {
            toast.success(data.success);
          }
        })
        .catch(() => toast.error("Something went wrong"));
    });
  }

  return (
    <div>
      <p className="text-sm font-medium text-gray-500">
        Personalize your experience with these customizations options
      </p>

      {searchParamValue === "Customizations" && (
        <div className="mt-2 w-full bg-gray-100 lg:w-3/4 rounded-md py-8 ">
          <div className="flex items-center justify-between px-6">
            <div className="flex items-center gap-x-3">
              <Sun className="h-6 w-6 mr-2 text-gray-500 shrink-0" />

              <div>
                <h2 className="font-medium text-lg ">Dark mode</h2>
                <p className="text-sm font-medium text-gray-600">
                  Toggle to your best experience
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-gray-200  rounded-md px-4 py-5 ">
                <ModeToggle />
              </div>
              <p className="m-2 text-xs font-bold text-gray-600">
                Toggle to light / dark mode
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-2 w-full bg-gray-100 lg:w-3/4 rounded-md py-8 ">
        <div className="flex items-center justify-between px-6">
          <div className="flex items-center gap-x-3">
            <Bell className="h-6 w-6 mr-2 text-gray-900 shrink-0" />

            <div>
              <h2 className="font-medium text-lg ">Notifications</h2>
              <p className="text-sm font-medium text-gray-600">
                Enable / Disable your notification messages
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-gray-200  rounded-md px-4 py-5 ">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    name="enableMessages"
                    control={form.control}
                    render={({field}) => (
                      <div className="space-y-0.5">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={isPending}
                            onClick={() => {
                              onSubmit({
                                enableMessages: !allowNotif ? true : false,
                              });
                            }}
                          />
                        </FormControl>
                      </div>
                    )}
                  />
                  {/* <Button type="submit">Submit</Button> */}
                </form>
              </Form>
            </div>
            <p className="m-2 text-xs font-bold text-gray-600">
              Notification messages
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customizations;
