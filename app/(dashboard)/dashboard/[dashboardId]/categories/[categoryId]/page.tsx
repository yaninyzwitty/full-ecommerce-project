import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {getCategory} from "@/lib/get-category";
import {Category} from "@/schemas/typings";
import CategoryName from "./_components/category-name";
import CategoryDescription from "./_components/category-description";
import CategoryThumbnail from "./_components/category-thumbnail";
import CategoryTags from "./_components/category-tags";
import PublishCategory from "./_components/publish-category";

type Props = {
  params: {
    categoryId: string;
  };
};

async function CategoryIdPage({params: {categoryId}}: Props) {
  // fetch that category

  const category: Category = await getCategory(categoryId);
  const fields = [
    category.name,
    category.description,
    category.tags,
    category.categoryThumbnail,
  ];

  const hasAllFields = fields.every(Boolean);

  return (
    <div className="pt-14 pl-[70px] lg:pl-60 flex-1">
      <div className="m-3">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-medium">Customize your category</h3>
          <PublishCategory
            hasAllFields={hasAllFields}
            isPublished={category.isPublished}
          />
        </div>
        <Separator className="my-2" />
      </div>

      <div className="w-full rounded p-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <CategoryName name={category.name} />
          <CategoryDescription description={category.description} />
          <CategoryTags tags={category.tags} />
        </div>
        <div>
          <CategoryThumbnail thumbnailUrl={category.categoryThumbnail} />
        </div>
      </div>
    </div>
  );
}

export default CategoryIdPage;
