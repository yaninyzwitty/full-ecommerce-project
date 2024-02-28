import { auth } from "@clerk/nextjs";
import cassandraDb from "@/db";
import { Combo, Seller } from "@/schemas/typings";

export const  checkAuth = async (storeId: string) => {
    const { userId } = auth();

try {

    const GET_SELLER_QUERY = `SELECT * FROM sellers WHERE store_id = ?`

    const res = (await cassandraDb.execute(GET_SELLER_QUERY, [storeId], { prepare: true })).rows.map((row) => ({
        name: row.name, 
        userId: row.user_id,
        id: row.id?.toString(),
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        storeId: row.store_id,
        description: row.description,
    }));

    // check if the userid match

    const hasUserId = res.find((seller: Seller) => seller.userId === userId);

    if(hasUserId) {
        return true;
    } else {
        return false;
    }
    





} catch (error) {
    console.log('Error', error);
    throw new Error('Something went wrong!')
   
}

};



export const storeDetails = async (storeId: string) => {
    try {
        const { userId } = auth();
        const GET_SELLER_QUERY = `SELECT * FROM sellers WHERE store_id = ?`
    
        const res = (await cassandraDb.execute(GET_SELLER_QUERY, [storeId], { prepare: true })).rows.map((row) => ({
            name: row.name, 
            userId: row.user_id,
            id: row.id?.toString(),
            createdAt: row.created_at,
            updatedAt: row.updated_at,
            storeId: row.store_id,
            description: row.description,
        }));
    
        // check if the userid match
    
        const store = res.find((seller: Seller) => seller.userId === userId);
        return store as Seller;
        
    } catch (error) {
        console.log(error);
        throw new Error('Something went wrong!')


        
    }

}



export const getAllSellerStores = async () => {
    try {
        const { userId } = auth();

        const GET_SELLER_QUERY = `SELECT name, store_id FROM sellers WHERE user_id = ?`;
        const res = (await cassandraDb.execute(GET_SELLER_QUERY, [userId], { prepare: true })).rows.map((row) => ({
            label: row.name,
            value: row.store_id,
        }));


        return res as Combo[];

        
    } catch (error) {
        console.log(error);
        throw new Error('Something went wrong!')

        
    }
}