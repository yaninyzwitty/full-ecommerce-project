import cassandraDb from "@/db";
import { Store } from "@/schemas/typings";
import { redis } from "@/redis";

export const getStoreId = async (storeId: string) => {
    try {
        const cachedData = await redis.get(`store-id-${storeId}`);
        if(cachedData) {

            return JSON.parse(cachedData);
        
        } else {

            const GET_STORE_ID_QUERY = `SELECT id FROM sellers WHERE store_id = ?`;
            const params = [storeId];
    
    
            const result = (await cassandraDb.execute(GET_STORE_ID_QUERY, params, { prepare: true })).rows.map((row ) => ({
                id: row.id?.toString()
    
            }))

            await redis.set(`store-id-${storeId}`, JSON.stringify(result[0]), 'EX', 3600);
    
            return result[0];

            
        }

    } catch (error) {
        console.log(error);
        throw new Error('Error getting the store id');
    
        
    }
}
export const getStoreDetails = async (storeId: string) => {
    try {

        const cachedData = await redis.get(`store-details-${storeId}`);
        if(cachedData) {
            return JSON.parse(cachedData);

        } else {

            const GET_STORE_ID_QUERY = `SELECT * FROM sellers WHERE store_id = ?`;
            const params = [storeId];
    
    
            const result = (await cassandraDb.execute(GET_STORE_ID_QUERY, params, { prepare: true })).rows.map((row ) => ({
                id: row.id?.toString(),
                createdAt: new Date(row.created_at),
                updatedAt: new Date(row.updated_at),
                description: row.description,
                name: row.name,
                storeId: row.store_id,
                userId: row.user_id,
                banner: row.banner
    
            })) as Store[]
            await redis.set(`store-details-${storeId}`, JSON.stringify(result[0]), 'EX', 2400);
    
            return result?.[0];
        }



        
    } catch (error) {
        console.log(error);
        throw new Error('Error getting the store id');
    
        
    }
}


