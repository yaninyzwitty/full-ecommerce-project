import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {getCategory} from "@/lib/get-category";
import {Category} from "@/schemas/typings";
import CategoryName from "./_components/category-name";
import CategoryDescription from "./_components/category-description";

type Props = {
  params: {
    dashboardId: string;
    categoryId: string;
  };
};

async function CategoryIdPage({params: {categoryId, dashboardId}}: Props) {
  // fetch that category

  const category: Category = await getCategory(categoryId);

  return (
    <div className="pt-14 pl-[70px] lg:pl-60 flex-1">
      <div className="m-3">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-medium">Customize your category</h3>
          <Button disabled>Publish</Button>
        </div>
        <Separator className="my-2" />
      </div>

      <div className="w-full rounded m-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <CategoryName name={category.name} />
          <CategoryDescription description={category.description} />
        </div>
      </div>
    </div>
  );
}

export default CategoryIdPage;
