"use server";

import cassandraDb from "@/db";
import { redis } from "@/redis";
import { AllowNotifSchema, StoreBannerSchema, StoreDescriptionSchema, StoreNameSchema, formSchema } from "@/schemas";
import { auth } from "@clerk/nextjs";
import { nanoid } from 'nanoid';


import { revalidatePath } from "next/cache";
import * as z from "zod";

export const addStore = async (values: z.infer<typeof formSchema>) => {

    try {

        const validatedFields = formSchema.safeParse(values);
        if(!validatedFields.success) {
            return {
                error: "Invalid fields"
            }
        };


        const { userId } = auth();
        const id = crypto.randomUUID()
        const { description, name } = validatedFields.data;

        const storeId = nanoid();
        const insertQuery = `INSERT INTO sellers (name, user_id, id, created_at, updated_at, store_id, description) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const params = [name, userId, id, new Date(), new Date(), storeId, description];



        // add the store to the db

        await cassandraDb.execute(insertQuery, params, { prepare: true })


        return {
            success: `${storeId}`
        }


        
    } catch (error) {
        console.log(error);

        return {
            error: "Something went wrong"
        }
        
    }
}




export async function changeStoreName (name: string, id: string, storeId: string) {
    try {
        if (!name && !id) {
            return {
                error: "Invalid fields"
            }
        
            };


            const UPDATE_QUERY = `UPDATE sellers SET name = ?, updated_at = ?  WHERE id = ?`;
            const params = [name, new Date(), id];
            await cassandraDb.execute(UPDATE_QUERY, params, { prepare: true });

            await redis.del(`store-id-${storeId}`);
            await redis.del(`store-details-${storeId}`);

            revalidatePath(`/dashboard/${storeId}`);
            revalidatePath(`/dashboard/${storeId}/settings`);
            return {
                success: `Store name updated to '${name}`,
            }

        
        
    } catch (error) {
        console.log(error);
        return {
            error: "Something went wrong"
        }
    }


}



export const onUpdateStoreName = async (values: z.infer<typeof StoreNameSchema>, storeId: string) => {
    try {

        const validatedFields = StoreNameSchema.safeParse(values);

        if(!validatedFields.success) {
            return {
                error: "Invalid fields"
            }
        };


        const UPDATE_QUERY = `UPDATE sellers SET name = ?, updated_at = ?  WHERE id = ?`;
        const params = [values.storeName, new Date(),  storeId];
        await cassandraDb.execute(UPDATE_QUERY, params, { prepare: true });
        // await redis.del(`store-id-${storeId}`);
        await redis.del(`cached-details-${storeId}`);


        revalidatePath(`/dashboard/${storeId}/settings`);

        return {
            success: `Store name updated to '${values.storeName}`,
        
        }



        
    } catch (error) {
        console.log(error)

        return {
            error: "Something went wrong!"
        }
        
    }
    
}
export const onUpdateStoreDesc = async (values: z.infer<typeof StoreDescriptionSchema>, storeId: string) => {
    try {

        const validatedFields = StoreDescriptionSchema.safeParse(values);

        if(!validatedFields.success) {
            return {
                error: "Invalid fields"
            }
        };


        const UPDATE_QUERY = `UPDATE sellers SET description = ?, updated_at = ?  WHERE id = ?`;
        const params = [values.storeDesc, new Date(),  storeId];
        await cassandraDb.execute(UPDATE_QUERY, params, { prepare: true });
        await redis.del(`store-id-${storeId}`);
        await redis.del(`cached-details-${storeId}`);


        revalidatePath(`/dashboard/${storeId}/settings`);

        return {
            success: `Store description updated to '${values.storeDesc}`,
        
        }



        
    } catch (error) {
        console.log(error)

        return {
            error: "Something went wrong!"
        }
        
    }
    
}

export const onUpdateStoreBannerImage = async (values: z.infer<typeof StoreBannerSchema>, storeId: string) => {
    try {

        const validatedFields = StoreBannerSchema.safeParse(values);

        if(!validatedFields.success) {
            return {
                error: "Invalid fields"
            }
        };


        const UPDATE_QUERY = `UPDATE sellers SET banner = ?, updated_at = ?  WHERE id = ?`;
        const params = [values.storeImage, new Date(),  storeId];
        await cassandraDb.execute(UPDATE_QUERY, params, { prepare: true });
        await redis.del(`store-id-${storeId}`);
        await redis.del(`cached-details-${storeId}`);


        revalidatePath(`/dashboard/${storeId}/settings`);

        return {
            success: `Store image updated to '${values.storeImage}`,
        
        }



        
    } catch (error) {
        console.log(error)

        return {
            error: "Something went wrong!"
        }
        
    }
    
}



export const onAllowNotif = async (data: z.infer<typeof AllowNotifSchema>, storeId: string ) => {
    try {

        const validatedFields = AllowNotifSchema.safeParse(data);
        if(!validatedFields.success) {
            return {
                error: "Invalid fields"
            }
        };


        const { enableMessages } = validatedFields.data;

        const UPDATE_QUERY = `UPDATE sellers SET allow_notif = ?, updated_at = ?  WHERE id = ?`;
        const params = [enableMessages, new Date(),  storeId];

        await cassandraDb.execute(UPDATE_QUERY, params, { prepare: true });
        await redis.del(`store-id-${storeId}`);
        await redis.del(`cached-details-${storeId}`);

        revalidatePath(`/dashboard/${storeId}/settings`);

        return {
            success: "Enabled messages successfully"
        }







        

    } catch (error) {
        console.log(error )

            return {
                error: "Something went wrong"
            }
        
    }
}