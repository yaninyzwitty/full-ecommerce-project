"use client";

import {Button} from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {zodResolver} from "@hookform/resolvers/zod";
import {City, Country} from "country-state-city";
import {useForm} from "react-hook-form";
import * as z from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {cn} from "@/lib/utils";
import {useLocationStore} from "@/store";
import {Check, ChevronsUpDown} from "lucide-react";
import {useParams} from "next/navigation";
import {useState, useTransition} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "../ui/popover";
import {FormSchema} from "@/schemas";
import {onAddLocationData} from "@/actions/location";
import {toast} from "sonner";

const countries = Country.getAllCountries();

function PopoverLocationModal() {
  const [chosenCountry, setChosenCountry] = useState("");
  const [isPending, startTransition] = useTransition();

  const params = useParams();
  const {onClose, open} = useLocationStore();
  const cities = City.getCitiesOfCountry(chosenCountry);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(() => {
      onAddLocationData(params.dashboardId as string, data)
        .then((data) => {
          if (data.error) {
            toast.error(data?.error);
          }

          if (data.success) {
            onClose();
            form.reset();
            setChosenCountry("");
            toast.success(data.success);
          }
        })
        .catch(() => toast.error("Something went wrong"));
    });
  }

  return (
    <Dialog onOpenChange={onClose} open={open}>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Enter the location details</DialogTitle>
          <DialogDescription>
            Enter the location details below
          </DialogDescription>
        </DialogHeader>
        <div className="mt-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="country"
                render={({field}) => (
                  <FormItem className="flex flex-col space-y-2">
                    <FormLabel>Country</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            disabled={isPending}
                            variant="outline"
                            role="combobox"
                            className={cn(
                              " justify-between w-full",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? countries.find(
                                  (country) => country.name === field.value
                                )?.name
                              : "Select country..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-[400px] p-0 overflow-y-auto h-[300px]"
                        sideOffset={32}
                        side={"left"}
                      >
                        <Command>
                          <CommandInput placeholder="Search country..." />
                          <CommandEmpty>No country found.</CommandEmpty>
                          <CommandGroup>
                            {countries.map((country) => (
                              <CommandItem
                                value={country.name}
                                key={country.name}
                                onSelect={() => {
                                  form.setValue("country", country.name);
                                  setChosenCountry(country.isoCode);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    country.name === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {country.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      This is the country that will be used in the dashboard.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({field}) => (
                  <FormItem className="flex flex-col space-y-2">
                    <FormLabel>City </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            disabled={!chosenCountry || isPending}
                            variant="outline"
                            role="combobox"
                            className={cn(
                              " justify-between w-full",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? cities?.find(
                                  (city) => city.name === field.value
                                )?.name
                              : "Select city..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-[400px] p-0 overflow-y-auto h-[300px]"
                        sideOffset={32}
                        side={"left"}
                      >
                        <Command>
                          <CommandInput placeholder="Search city..." />
                          <CommandEmpty>No city found.</CommandEmpty>
                          <CommandGroup>
                            {cities?.map((city) => (
                              <CommandItem
                                value={city.name}
                                key={city.name}
                                onSelect={() => {
                                  form.setValue("city", `${city.name}`);
                                  form.setValue(
                                    "cityData",
                                    `${city.latitude}|${city.longitude}|${city.stateCode}`
                                  );
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    city.name === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {city.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      This is the city that you&apos;ve selected
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isPending} type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PopoverLocationModal;
