import { Product } from "@/schemas/typings";
import { getProductsByStoreId } from "./get-product"

export const formatInventory = async (storeId: string) => {
    try {
        const products = await getProductsByStoreId(storeId)
        const sortedProducts = products.map((product: Product) => ({
            image: product?.images?.[0],
            product: product.name,
            price: product.price,
            id: `${product.productId.slice(0, 8)}-${product.name.toUpperCase().slice(0, 3)}`



        }));

        return sortedProducts;
        
    } catch (error) {
        console.log('FORMAT_INV', error);
        // throw new Error('Something went wrong!')
        
    }

}