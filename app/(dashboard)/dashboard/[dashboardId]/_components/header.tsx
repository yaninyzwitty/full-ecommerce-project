"use client";
import {changeStoreName} from "@/actions/store";
import ModeToggle from "@/components/mode-toggle";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {generateColors} from "@/lib/utils";
import {Seller} from "@/schemas/typings";
import {UserButton} from "@clerk/nextjs";
import {Bell, Menu} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {FormEvent, useState, useTransition} from "react";
import {toast} from "sonner";

type Props = {
  store: Seller;
};

function Header({store}: Props) {
  const [value, setValue] = useState<string>(store.name || "");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      changeStoreName(value, store.id, store.storeId)
        .then((data) => {
          if (data?.error) {
            toast.error(data.error);
            setIsEditing(false);
          }
          if (data?.success) {
            toast.success(data.success);
            setIsEditing(false);
          }
        })
        .catch(() => {
          toast.error("Something went wrong");
          setIsEditing(false);
        });
    });
  };

  const handleEdit = () => {
    setIsEditing((editing) => !editing);
  };
  const [hexCode1, hexCode2] = generateColors(store.storeId, store.userId);
  return (
    <header className="h-14 p-5 bg-white border  top-0 fixed w-full z-50 flex items-center justify-between">
      <div className="flex space-x-5 items-center">
        <Link
          href={"/"}
          className="flex hover:opacity-75 transition-opacity duration-150 items-center space-x-4"
        >
          <Image
            src={"/logo.svg"}
            alt={store.name.trim()}
            height={50}
            width={50}
          />

          <h3 className="text-xl font-bold uppercase hidden lg:block">
            ShopSphere
          </h3>
        </Link>

        <div className="lg:flex items-center hidden space-x-2">
          <span
            className="h-6 w-6 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${hexCode1} 0%, ${hexCode2} 100%)`,
            }}
          />

          {isEditing ? (
            <form
              className="flex items-center  space-x-2"
              onSubmit={handleSubmit}
            >
              <Input
                placeholder="Enter new input"
                className="w-fit disabled:pointer-events-none placeholder:text-lg text-base disabled:opacity-50"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={isPending}
              />

              <button
                type="button"
                className="h-6 w-6 rounded-full disabled:pointer-events-none disabled:opacity-50 text-white bg-rose-500 flex items-center justify-center text-sm "
                onClick={() => setIsEditing(false)}
                disabled={isPending}
              >
                x
              </button>
            </form>
          ) : (
            <button
              className="ml-2 border px-3 py-0.5 rounded bg-slate-50 hover:bg-slate-100 "
              onClick={handleEdit}
            >
              <h3 className="font-medium text-lg tracking-widest">
                {store.name}
              </h3>
            </button>
          )}
        </div>

        <Menu size={20} className="cursor-pointer lg:hidden" />
      </div>

      <div className="mx-5 max-w-[400px] lg:w-full">
        <Input
          placeholder="Search..."
          className="focus-visible:ring-0 border border-gray-400 focus:ring-offset-0  focus:ring-0 focus-visible:ring-offset-0"
        />
      </div>

      <div className="mx-6  flex items-center space-x-5">
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />

        <Button size={"sm"} variant={"ghost"}>
          <Bell size={20} className="text-gray-600" />
        </Button>
      </div>
    </header>
  );
}

export default Header;
