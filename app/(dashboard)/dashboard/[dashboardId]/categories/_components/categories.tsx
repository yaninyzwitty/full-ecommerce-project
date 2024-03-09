"use client";
import CategoryDropdown from "@/components/category-dropdown";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Category} from "@/schemas/typings";
import {formatDistanceToNow} from "date-fns";
import {MoreHorizontal} from "lucide-react";
import {Poppins} from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import {useParams, useRouter} from "next/navigation";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

function Categories({
  categories,
  has_no_location,
}: {
  categories: Category[];
  has_no_location: boolean;
}) {
  const params = useParams();
  const router = useRouter();
  const createCategory = () => {
    router.push(`/dashboard/${params.dashboardId as string}/categories/new`);
  };

  return (
    <>
      {categories.length === 0 && (
        <div className="flex items-center flex-col space-y-5 justify-center pt-20">
          <h3 className={cn("text-3xl font-bold", font.className)}>
            Create your first category
          </h3>
          <p className="text-gray-600 font-medium">
            Start by creating your category, your category will be available for
            other sellers
          </p>

          <Button
            className="text-lg py-8 px-4"
            size={"lg"}
            disabled={has_no_location}
            onClick={createCategory}
          >
            Create category
          </Button>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-8 gap-5 pb-10">
        {categories.map((category) => (
          <Link
            key={category.categoryId}
            href={`/dashboard/${params.dashboardId as string}/categories/${
              category.categoryId
            }`}
            className="border w-full rounded-lg aspect-[110/127] flex flex-col justify-between overflow-hidden "
          >
            <div className="relative group flex-1  bg-amber-50 ">
              <CategoryDropdown>
                <div
                  className="absolute top-2 right-2 group-hover:block hidden z-10  p-1.5 rounded-lg "
                  role="button"
                >
                  <MoreHorizontal
                    className="group-hover:text-white stroke-2 group-hover:opacity-75"
                    size={28}
                  />
                </div>
              </CategoryDropdown>
              <Image
                src={category.categoryThumbnail}
                alt=""
                fill
                className="object-cover"
              />

              <div className="absolute group-hover:block  transition-opacity opacity-0 cursor-pointer group-hover:opacity-50 top-0 left-0 right-0 h-[100%] bg-black" />
            </div>
            <div className="py-4 px-2 group-hover:bg-white">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">{category.name}</h3>

                <span className="ml-auto mx-2 bg-emerald-500 h-6 w-6 rounded-full flex items-center justify-center text-xs text-white">
                  {category.remaining || 0}
                </span>
              </div>
              <h3 className="mt-2 text-sm font-bold ">
                Created,
                <span className="block text-gray-700 text-xs mt-1 font-medium lg:text-sm">
                  about{" "}
                  {!!category.updatedAt &&
                    formatDistanceToNow(
                      category.createdAt || category.updatedAt,
                      {
                        addSuffix: true,
                      }
                    )}
                </span>
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Categories;
