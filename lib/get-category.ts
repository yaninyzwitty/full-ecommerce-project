import cassandraDb from "@/db";
import { Category, Product } from "@/schemas/typings";
import { redis  } from "@/redis";
import { getAllProducts } from "./get-product";

export async function getCategory (categoryId: string) {
    try {

        const GET_CATEGORY_BY_CATEGORY_ID = `SELECT * FROM category_by_seller WHERE categoryid = ?`;
        const params = [categoryId]

// UPDATE THE CACHE
        const cachedData = await redis.get(`category:${categoryId})`);

        if(cachedData) {
            return JSON.parse(cachedData);
        
        } else {

            const products: Product[] = await getAllProducts();

            const results = (await cassandraDb.execute(GET_CATEGORY_BY_CATEGORY_ID, params, { prepare: true })).rows.map(( row) => ({
                categoryId: row.categoryid?.toString(),
                name: row.name,
                description: row.description,
                isPublished: row.ispublished,
                categoryThumbnail: row.category_thumnail,
                tags: row.category_tags,
                starredCategories: row.starred_categories,
                createdAt: row.created_at,
                updatedAt: row.updated_at,
                remaining: !!products && products?.filter(product => product.category === row.name).length

    
            })).sort((a, b) => b.createdAt - a.createdAt ) as Category[];


            if(results.length > 0 || results) {
                await redis.set(`category:${categoryId}`, JSON.stringify(results[0]), 'EX', 3600);
            
        }

        return results[0] ;
    };









        
    } catch (error: any) {
        console.log(`get_category`, error);
        throw new Error(error.message)
        
    }

}


export const getCategories = async (storeId: string) => {
    try {
        const cachedData = await redis.get(`categories:${storeId}`);
        if(cachedData) {
            return JSON.parse(cachedData);

        } else {

        const GET_CATEGORY = `SELECT * FROM category_by_seller WHERE store_id = ?`;
        const params = [storeId]
        const results = (await cassandraDb.execute(GET_CATEGORY, params, { prepare: true })).rows.map(( row) => ({
            categoryId: row.categoryid?.toString(),
            name: row.name,
            description: row.description,
            isPublished: row.ispublished,
            categoryThumbnail: row.category_thumnail,
            tags: row.category_tags,
            starredCategories: row.starred_categories,
            createdAt: row.created_at,
            updatedAt: row.updated_at,

        })) as Category[];

        await redis.set(`categories:${storeId}`, JSON.stringify(results), 'EX', 3600);
        return results;

    }
 
        
    } catch (error: any) {
        console.log(`get_categories`, error);
        throw new Error(error.message) ;

    
        
    }

}


export const getAllCategories = async () => {
    try {
        const cachedData = await redis.get(`all-categories`);
        if(cachedData) {
            return JSON.parse(cachedData);

        } else {

            const GET_CATEGORY = `SELECT * FROM category_by_seller LIMIT 30`;
            const results = (await cassandraDb.execute(GET_CATEGORY, [], { prepare: true })).rows.map(( row) => ({
                categoryId: row.categoryid?.toString(),
                name: row.name,
                description: row.description,
                isPublished: row.ispublished,
                categoryThumbnail: row.category_thumnail,
                tags: row.category_tags,
                starredCategories: row.starred_categories,
                createdAt: row.created_at,
                updatedAt: row.updated_at,
    
            })) as Category[];
            await redis.set(`all-categories`, JSON.stringify(results), 'EX', 3600);
            return results;


        }



        
    } catch (error: any) {
        console.log(`get_all_categories`, error);
        throw new Error(error.message) ;
        
    }


}





export const getStoreDetailsById = async (storeId: string) => {
    try {

        const GET_STORE_DETAILS_BY_ID = `SELECT name FROM sellers WHERE store_id = ?`;
        const params = [storeId]
        const res = await cassandraDb.execute(GET_STORE_DETAILS_BY_ID, params, { prepare: true });
        return res.rows[0];
        
    } catch (error: any) {
        console.log(`get_store_details_by_id`, error);
        throw new Error(error.message) ;

    
        
    }
}