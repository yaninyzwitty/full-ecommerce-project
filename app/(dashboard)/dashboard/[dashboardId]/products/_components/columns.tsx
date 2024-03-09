"use client";

import {ColumnDef} from "@tanstack/react-table";
import {formatDistanceToNow} from "date-fns";

import {Button} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {ArrowUpDown, MoreHorizontal} from "lucide-react";

import {ProductTableData} from "@/schemas/typings";
import Link from "next/link";
import {deleteProduct} from "@/actions/product";
import {toast} from "sonner";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<ProductTableData>[] = [
  {
    accessorKey: "id",
    header: "Index",
  },
  {
    accessorKey: "name",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: () => <div className="">Price</div>,
    cell: ({row}) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return (
        <div className=" font-medium">
          {formatted === "$NaN" ? "$0.00" : formatted}
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: () => <div className="hidden lg:block">Category</div>,
    cell: ({row}) => {
      const category: string = row.getValue("category");

      return <div className="hidden lg:block">{category}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="font-medium hidden lg:block">Created At</div>,
    cell: ({row}) => {
      const time = new Date(row.getValue("createdAt"));
      const rdate = formatDistanceToNow(time, {
        addSuffix: true,
      });
      return <div className="hidden lg:block">{rdate}</div>;
    },
  },
  {
    accessorKey: "isPublished",
    header: () => <div className=" hidden lg:block">Published</div>,
    cell: ({row}) => {
      const isPublished = row.getValue("isPublished");
      return (
        <div className="hidden lg:block">{isPublished ? "True" : "False"}</div>
      );
    },
  },

  {
    accessorKey: "inventory",
    header: () => <div className="hidden md:block">Inventory</div>,
    cell: ({row}) => {
      const inventory: string = row.getValue("inventory");
      return <div className="hidden md:block">{inventory}</div>;
    },
  },
  {
    accessorKey: "inStock",
    header: () => <div className=" hidden lg:block">Stock level</div>,
    cell: ({row}) => {
      const stock_level: string = row.getValue("inStock");
      return <div className="hidden lg:block">{stock_level}</div>;
    },
  },
  {
    id: "actions",
    cell: ({row}) => {
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link
                href={`/dashboard/${product.storeId}/products/${product.productId}`}
              >
                Edit Product
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="bg-rose-500/15 text-rose-500  hover:bg-rose-500/20"
              onClick={async () => {
                // delete the product
                deleteProduct(
                  product.productId as string,
                  product.storeId as string
                ).then((data) => {
                  if (data.error) {
                    toast.error(data.error);
                  }

                  if (data.success) {
                    toast.success("Product deleted successfully");
                  }
                });
              }}
            >
              Delete this product
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
