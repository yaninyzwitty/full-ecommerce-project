"use server";
import cassandraDb from '@/db';
import { CategoryDescriptionSchema, CategoryNameSchema, CategoryTagsSchema, CategoryThumbnailSchema } from '@/schemas';
import { revalidatePath } from 'next/cache';
import * as z from 'zod';
import { redis  } from '@/redis';

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
        const result =  (await cassandraDb.execute(SELECT_CATEGORY_QUERY, [], { prepare: true })).rows.find((row) => row.name === name);


        if(!!result){
            return {
                error: "Category name already exists"
            }

        }  else {

            const INSERT_CATEGORY_QUERY = `INSERT INTO category_by_seller (categoryid, name, created_at, store_id) VALUES ( ?, ?, ?, ?)`;
            const params = [categoryId, name, created_at, storeId]
            await cassandraDb.execute(INSERT_CATEGORY_QUERY, params, { prepare: true });

            await redis.del(`categories:${storeId}`)
            // await redis.del(`all-categories`)
    

            
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
        const SELECT_CATEGORY_QUERY = `SELECT *  FROM category_by_seller`;
        const result =  (await cassandraDb.execute(SELECT_CATEGORY_QUERY, [], { prepare: true })).rows[0];
        if(result.name === name){

            console.log(result.name);
            return {
                error: "Category name already exists"
            }
        }  else {




        const updated_at = new Date();
        const UPDATE_CATEGORY_NAME_QUERY = `UPDATE category_by_seller SET  name = ?, updated_at = ? WHERE categoryid = ?`
        const params = [name, updated_at, categoryId]


        await cassandraDb.execute(UPDATE_CATEGORY_NAME_QUERY, params, { prepare: true });
        await redis.del(`categories:${storeId}`)
        // await redis.del(`all-categories`)



        // revalidatePath(`/dashboard/${storeId}/categories`);
        revalidatePath(`/dashboard/${storeId}/categories/${categoryId}`);

        return {
            success: "Category name updated successfully"
        }
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
        await redis.del(`categories:${storeId}`)
        // await redis.del(`all-categories`)



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

};


export const onReplaceCategoryThumbnail = async (values: z.infer<typeof CategoryThumbnailSchema>, categoryId: string, storeId: string)  => {
    try {


        const validatedFields = CategoryThumbnailSchema.safeParse(values);
        if(!validatedFields.success) {
            return {
                error: "Invalid fields"
            }

        
        };


        const { thumbnailUrl  } = validatedFields.data;

        const updated_at = new Date();
        const UPDATE_CATEGORY_THUMBNAIL_QUERY = `UPDATE category_by_seller SET  category_thumnail = ?, updated_at = ? WHERE categoryid = ?`;
        const params = [thumbnailUrl, updated_at, categoryId];

        await cassandraDb.execute(UPDATE_CATEGORY_THUMBNAIL_QUERY, params, { prepare: true });
        await redis.del(`categories:${storeId}`)
        // await redis.del(`all-categories`)


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
};

export const onAddCategoryTag = async (values: z.infer<typeof CategoryTagsSchema>, categoryId: string, storeId: string ) => {
    try {

        const validatedFields = CategoryTagsSchema.safeParse(values);
        if(!validatedFields.success) {
            return {
                error: "Invalid fields"
            }

        
            };


            const {  tag } = validatedFields.data;
            const updated_at = new Date();
            const UPDATE_CATEGORY_TAGS_QUERY = 'UPDATE category_by_seller SET category_tags = category_tags + ? , updated_at = ?  WHERE categoryid = ?';
            const params = [[tag], updated_at, categoryId];


            await cassandraDb.execute(UPDATE_CATEGORY_TAGS_QUERY, params, { prepare: true });
            await redis.del(`categories:${storeId}`)
            // await redis.del(`all-categories`)




            revalidatePath(`/dashboard/${storeId}/categories/${categoryId}`);
            return {
                success: "Category  successfully updated!"
            
            };

 
    } catch (error) {
        console.log(error);
        return {
            error: "Something went wrong"
        };


    
        
    }
}



export const onRemoveCategoryTag = async (tag: string, categoryId: string, storeId: string) => {
    try {

        if(!tag) {
            return {
                error: "Invalid fields"
            }


            
        };

        const updated_at = new Date();
        const UPDATE_CATEGORY_TAGS_QUERY = 'UPDATE category_by_seller SET category_tags = category_tags - ? , updated_at = ?  WHERE categoryid = ?';
        const params = [[tag], updated_at, categoryId];
        await cassandraDb.execute(UPDATE_CATEGORY_TAGS_QUERY, params, { prepare: true });
        await redis.del(`categories:${storeId}`)
        // await redis.del(`all-categories`)


        revalidatePath(`/dashboard/${storeId}/categories/${categoryId}`);


        return {
            success: "Category  successfully updated!"

        
        };
        
    } catch (error) {
        console.log(error);
        return {
            error: "Something went wrong"
        };


    
        
    }
}


export const onPublishCategory = async (isPublished: boolean, categoryId: string, storeId: string) => {
    try {
        const updated_at = new Date();

        const UPDATE_CATEGORY_PUBLISH_STATUS_QUERY = 'UPDATE category_by_seller SET ispublished = ? , updated_at = ?  WHERE categoryid = ?';
        const params = [isPublished, updated_at, categoryId];
        await cassandraDb.execute(UPDATE_CATEGORY_PUBLISH_STATUS_QUERY, params, { prepare: true });

        await redis.del(`categories:${storeId}`)
        await redis.del(`all-categories`)

        revalidatePath(`/dashboard/${storeId}/categories`);
        revalidatePath(`/dashboard/${storeId}/categories/${categoryId}`);




        return {
            success: "Category  successfully updated!"

        };
        
    } catch (error) {
        console.log(error);
        return {
            error: "Something went wrong"
        };
        
    }
}