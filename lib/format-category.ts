import { Category, CategoryInProduct, Product } from "@/schemas/typings";
import { getAllCategories } from "./get-category"
import { getAllProducts } from "./get-product";

export const formatCategory = async () => {
    const categories = await getAllCategories();

    const products: Product[] = await getAllProducts();

    const newCategories = categories.map((category: Category) => {
        return {
            id: category.categoryId,
            name: category.name,
            // remaining: !!products && products?.filter(product => product.category === category.name).length
            
        }
    
    }) as CategoryInProduct[];


    return newCategories;



}