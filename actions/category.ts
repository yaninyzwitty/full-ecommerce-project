"use server";
import cassandraDb from '@/db';
import { CategoryDescriptionSchema, CategoryNameSchema } from '@/schemas';
import { revalidatePath } from 'next/cache';
import * as z from 'zod';

export const onAddCategoryName = async (values: z.infer<typeof CategoryNameSchema>, storeId: string ) => {
    
    try {

        const validatedFields = CategoryNameSchema.safeParse(values);
        if(!validatedFields.success){
            return {
                error: "Invalid fields"
            }
        };


        const {  name } = validatedFields.data;

        const created_at = new Date();
        const categoryId = crypto.randomUUID();

    // check if category name already exists


        const SELECT_CATEGORY_QUERY = `SELECT *  FROM category_by_seller`;
        const result = await (await cassandraDb.execute(SELECT_CATEGORY_QUERY, [], { prepare: true })).rows[0];
        if(result.name === name){
            return {
                error: "Category name already exists"
            }
        }  else {
            const INSERT_CATEGORY_QUERY = `INSERT INTO category_by_seller (categoryid, name, created_at) VALUES ( ?, ?, ?)`;
            const paeams = [categoryId, name, created_at]
            await cassandraDb.execute(INSERT_CATEGORY_QUERY, paeams, { prepare: true });
    

            
            revalidatePath(`/dashboard/${storeId}/categories`);
        }







        return {
            success: `${categoryId}`
        }







        
    } catch (error) {


        console.log(error);
        return {
            error: "Something went wrong"
        };
    
        
    }
}


export const onReplaceCategoryName = async (values: z.infer<typeof CategoryNameSchema>, categoryId: string, storeId: string )  => {
    try {

        const validatedFields = CategoryNameSchema.safeParse(values);
        if(!validatedFields.success) {
            return {
                error: "Invalid fields"
            }
        
        };


        const { name } = validatedFields.data;
        const updated_at = new Date();
        const UPDATE_CATEGORY_NAME_QUERY = `UPDATE category_by_seller SET  name = ?, updated_at = ? WHERE categoryid = ?`
        const params = [name, updated_at, categoryId]


        await cassandraDb.execute(UPDATE_CATEGORY_NAME_QUERY, params, { prepare: true });

        revalidatePath(`/dashboard/${storeId}/categories`);
        revalidatePath(`/dashboard/${storeId}/categories/${categoryId}`);

        return {
            success: "Category name updated successfully"
        }





        
    } catch (error) {
        console.log(error);
        return {
            error: "Something went wrong"
        };

    
        
    }

};


export const onReplaceCategoryDescription = async (values: z.infer<typeof CategoryDescriptionSchema>, categoryId: string, storeId: string)  => {
    try {

        const validatedFields = CategoryDescriptionSchema.safeParse(values);
        if(!validatedFields.success) {
            return {
                error: "Invalid fields"
            }

        };

        const { description } = validatedFields.data;

        const updated_at = new Date();

        const UPDATE_CATEGORY_DESCRIPTION_QUERY = `UPDATE category_by_seller SET  description = ?, updated_at = ? WHERE categoryid = ?`
        const params = [description.trim() , updated_at, categoryId]

        await cassandraDb.execute(UPDATE_CATEGORY_DESCRIPTION_QUERY, params, { prepare: true });

        revalidatePath(`/dashboard/${storeId}/categories`);
        revalidatePath(`/dashboard/${storeId}/categories/${categoryId}`);

        return {
            success: "Category  successfully updated!"
        }



        
    } catch (error) {
        console.log(error);
        return {
            error: "Something went wrong"
        };


    
        
    }

}