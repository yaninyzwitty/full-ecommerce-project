"use server";

import { formSchema } from "@/schemas";
import { auth } from "@clerk/nextjs";
import { nanoid } from 'nanoid';
import cassandraDb from "@/db";


import * as  z  from "zod";
import { Collection } from "@datastax/astra-db-ts";
import { revalidatePath } from "next/cache";

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


            const UPDATE_QUERY = `UPDATE sellers SET name = ? WHERE id = ?`;
            const params = [name, id];
            await cassandraDb.execute(UPDATE_QUERY, params, { prepare: true });

            revalidatePath(`/dashboard/${storeId}`);
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