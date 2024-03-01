import cassandraDb from "@/db";
import { redis } from "@/redis";
import { Product } from "@/schemas/typings";

export const getProduct = async (dashboardId: string, productId: string) =>  {
    try {


        // check if data in cache


        const cachedData = await redis.get(`product:${productId})`);
        if(cachedData) {
            return JSON.parse(cachedData);
        
        } else {

        


        const GET_PRODUCT_QUERY = `SELECT * FROM product_by_seller WHERE product_id = ?`;

        const params = [productId];


        const res = await cassandraDb.execute(GET_PRODUCT_QUERY, params, { prepare: true });

        const data = res.rows.map((row) => ({
            productId: row.product_id?.toString(),
            name: row.name,
            description: row.description,
            storeId: row.store_id,
            price: parseFloat(row.price),
            isPublished: row.is_published,
            category: row.category,
            subCategorys: row.subcategorys,
            colors: row.colors,
            size: row.size,
            images: row.images,
            inStock: row.inStock,
            availablity: row.availablity,
            createdAt: row.created_at,
            updatedAt: row.updated_at,

        })).find((store ) => store.storeId === dashboardId);
        // return data as Product;

        if(data) {
            await redis.set(`product:${productId}`, JSON.stringify(data), 'EX', 3600);
    return data as Product;

        }




    }
        
    } catch (error) {

        console.log(`get_products`, error);



        throw new Error('Error fetching the product!')
        
    }

}


export const getProductsByStoreId = async (storeId: string) => {
    try {


        // try getting cached data;
        const cachedData = await redis.get(`products:${storeId}`);

        if (cachedData) {
            return JSON.parse(cachedData);
        } else {

        // utilizing SAI 😊
        const GET_PRODUCT_BY_STORE_ID_QUERY = `SELECT * FROM product_by_seller WHERE store_id = ?`;
        const params = [storeId];


        const data = (await cassandraDb.execute(GET_PRODUCT_BY_STORE_ID_QUERY, params, { prepare: true })).rows.map((row) => ({
            productId: row.product_id?.toString(),
            name: row.name,
            description: row.description,
            storeId: row.store_id,
            price: parseFloat(row.price),
            isPublished: row.is_published,
            category: row.category,
            subCategorys: row.subcategorys,
            colors: row.colors,
            size: row.size,
            images: row.images,
            inStock: row.inStock,
            availablity: row.availablity,
            createdAt: row.created_at,
            updatedAt: row.updated_at,

        })) as Product[];

        await redis.set(`products:${storeId}`, JSON.stringify(data), 'EX', 60);




        return data;


    }


        
    } catch (error) {
        console.log(`get_products_store_id`, error);
        throw new Error('Error fetching the products!')

    
        
    }


}