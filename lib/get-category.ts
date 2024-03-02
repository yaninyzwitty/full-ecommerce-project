import cassandraDb from "@/db";
import { Category } from "@/schemas/typings";
import { redis  } from "@/redis";

export async function getCategory (categoryId: string) {
    try {

        const GET_CATEGORY_BY_CATEGORY_ID = `SELECT * FROM category_by_seller WHERE categoryid = ?`;
        const params = [categoryId]

// UPDATE THE CACHE
        const cachedData = await redis.get(`category:${categoryId})`);

        if(cachedData) {
            return JSON.parse(cachedData);
        
        } else {

            const results = (await cassandraDb.execute(GET_CATEGORY_BY_CATEGORY_ID, params, { prepare: true })).rows.map(( row) => ({
                categoryId: row.categoryid?.toString(),
                name: row.name,
                description: row.description,
                isPublished:    row.ispublished,
                categoryThumbnail: row.category_thumnail,
                tags: row.category_tags,
                starredCategories: row.starred_categories,
                createdAt: row.created_at,
                updatedAt: row.updated_at,
    
            })) as Category[];


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