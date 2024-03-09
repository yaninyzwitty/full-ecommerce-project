import cassandraDb from "@/db";
import { SellerLocation } from "@/schemas/typings";

export const getSellerLoaction = async (sellerId: string) => {
    try {
        const GET_SELLER_LOCATION_QUERY = `SELECT * FROM seller_location WHERE seller_id = ?`;
        const params = [sellerId];
        const result = (await cassandraDb.execute(GET_SELLER_LOCATION_QUERY, params, { prepare: true })).rows.map((row) => ({
            sellerId: row.seller_id,
            sellerName: row.seller_name,
            city: row.city,
            state: row.state,
            country: row.country,
            zipCode: row.zip_code,
            latitude: row.latitude,
            longitude: row.longitude
        }));


        return result as SellerLocation[]


        
    } catch (error) {
        console.log(`SEELER_LOCATION`, error);
        throw new Error('Error getting seller location')
    
        
    }

}