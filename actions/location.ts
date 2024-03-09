"use server";

import * as z from 'zod'
import { getStoreDetailsById } from "@/lib/get-category";
import { FormSchema } from '@/schemas';
import cassandraDb from '@/db';
import { revalidatePath } from 'next/cache';

export const onAddLocationData = async (sellerId: string, values: z.infer<typeof FormSchema>) => {
    // figure the seller name

    try {
        const validatedFields = FormSchema.safeParse(values);
        if(!validatedFields.success) {
            return {
                error: "Invalid fields"
            }
        };

        const { city, cityData, country  } = validatedFields.data;

        const city_data = cityData.split('|');
    
        const storeDetails = await getStoreDetailsById(sellerId);
        const name = storeDetails.name as string;
        const data = {
            name,
            sellerId,
            city,
            country,
            latitude: city_data[0],
            longitude: city_data[1],
            zipCode: city_data[2]
            
        }

        const INSERT_LOCATION_QUERY = `INSERT INTO seller_location (seller_id, seller_name, city, state, country, zip_code, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const params = [data.sellerId, data.name, data.city, data.country,  data.country, data.zipCode, data.latitude, data.longitude];

        await cassandraDb.execute(INSERT_LOCATION_QUERY, params, { prepare: true })



        revalidatePath(`/dashboard/${sellerId}`)
        revalidatePath(`/dashboard/${sellerId}/products`)
        revalidatePath(`/dashboard/${sellerId}/settings`)
        revalidatePath(`/dashboard/${sellerId}/categories`)
        revalidatePath(`/dashboard/${sellerId}/inventory`)

        return {
            success: "Location added successfully" 
     
        }







        
    } catch (error) {
        console.log(error);
        return {
            error: "Something went wrong"
        }
    
        
    }


}