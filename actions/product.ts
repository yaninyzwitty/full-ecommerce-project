"use server";

import cassandraDb from '@/db';
import { redis } from '@/redis';

import { ProductCategorySchema, ProductColorSchema, ProductDescriptionSchema, ProductImageSchema, ProductNameSchema, ProductPriceSchema } from '@/schemas';
import { revalidatePath } from 'next/cache';
import * as z from 'zod';



export const onAddProduct = async (values: z.infer<typeof ProductNameSchema>, storeId: string) => {
    try {

        const productId = crypto.randomUUID()

        const validatedFields = ProductNameSchema.safeParse(values);
        if(!validatedFields.success) {
            return {
                error: "Invalid fields"
            }   
            
        };
        const { name } = validatedFields.data;

        const INSERT_PRODUCT_QUERY = `INSERT INTO product_by_seller (name, product_id, store_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?)`;
        const params = [name, productId, storeId, new Date(), new Date()];


        await cassandraDb.execute(INSERT_PRODUCT_QUERY, params, { prepare: true });



        return {
            success: productId as string
        }
   
        
    } catch (error) {

        console.log(error);


        return {
            error: "Something went wrong"
        }
        
    }


}





export const onReplaceProductTitle = async (values: z.infer<typeof ProductNameSchema>, productId: string, storeId: string ) => {
    try {
        const validatedFields = ProductNameSchema.safeParse(values);
    
    
        if(!validatedFields.success) {
            return {
                error: "Invalid fields"
            }
        
        };
    
        const { name } = validatedFields.data;

        const UPDATE_PRODUCT_TITLE_QUERY = `UPDATE product_by_seller SET name = ? WHERE product_id = ?` ;

        const params = [name, productId];


        await cassandraDb.execute(UPDATE_PRODUCT_TITLE_QUERY, params, { prepare: true });
        await redis.del(`product:${productId}`);


        revalidatePath(`/dashboard/${storeId}/products/${productId}`)
    
        return {
            success: "Product updated successfully"
        }
        
    } catch (error) {

        console.log(error);

        return {
            error: "Something went wrong"
        }
        
    }
};


export const onReplaceProductDesc = async (values: z.infer<typeof ProductDescriptionSchema>, productId: string, storeId: string) => {

    try {

        const validatedFields = ProductDescriptionSchema.safeParse(values);
        if(!validatedFields.success) {
            return {
                error: "Invalid fields"
            }
        };


        const { description } = validatedFields.data;
        const UPDATE_PRODUCT_DESC_QUERY = `UPDATE product_by_seller SET description = ? WHERE product_id = ?` ;
        const params = [description, productId];



        await cassandraDb.execute(UPDATE_PRODUCT_DESC_QUERY, params, { prepare: true });
        await redis.del(`product:${productId}`);



        revalidatePath(`/dashboard/${storeId}/products/${productId}`)


        return {
            success: "Product description updated successfully"
        }



        


        
    } catch (error) {
        console.log(error);

        return {
            error: "Something went wrong"
        }

        
    }
};


export const onReplaceProductPrice = async (values: z.infer<typeof ProductPriceSchema>, productId: string, storeId: string) => {
    try {
        const validatedFields = ProductPriceSchema.safeParse(values);
        if(!validatedFields.success) {
            return {
                error: "Invalid fields"
            }
        
        };

        const { price } = validatedFields.data;


        const UPDATE_PRODUCT_PRICE_QUERY = `UPDATE product_by_seller SET price = ? WHERE product_id = ?`;
        const params = [price, productId];

        await cassandraDb.execute(UPDATE_PRODUCT_PRICE_QUERY, params, { prepare: true });
        await redis.del(`product:${productId}`);

        revalidatePath(`/dashboard/${storeId}/products/${productId}`);

        return {
            sucess: "Product updated successfully"
        }
        
    } catch (error) {

        console.log(error);
        return {
            error: "Something went wrong"
        }
        
    }
}


export const onReplaceProductCategory = async (values: z.infer<typeof ProductCategorySchema>, productId: string, storeId: string) => {
    try {


        const validatedFields = ProductCategorySchema.safeParse(values);
        if(!validatedFields.success) {
            return {
                error: "Invalid fields"
            }

        
        };


        const UPDATE_PRODUCT_CATEGORY_QUERY = `UPDATE product_by_seller SET category = ?, updated_at = ? WHERE product_id = ?`;
        const params = [values.category, new Date(), productId];
        await cassandraDb.execute(UPDATE_PRODUCT_CATEGORY_QUERY, params, { prepare: true });
        await redis.del(`product:${productId}`);





        revalidatePath(`/dashboard/${storeId}/products/${productId}`);

        return {
            success: "Product updated successfully"
        }
        
    } catch (error) {
            console.log(error);
        return {
            error: "Something went wrong"
        }

    
        
    }
    
};


export const onUpdateProductImage = async (values: z.infer<typeof ProductImageSchema>, productId: string, storeId: string) => {
    try {

        const validatedFields = ProductImageSchema.safeParse(values);
        if(!validatedFields.success) {
            return {
                error: "Invalid fields"
            }
        
        };

        const { imageUrl   } = validatedFields.data;

        const UPDATE_PRODUCT_IMAGE_QUERY = 'UPDATE product_by_seller SET images = images + ? WHERE product_id = ?';
        const params = [[imageUrl]  , productId];

        await cassandraDb.execute(UPDATE_PRODUCT_IMAGE_QUERY, params, { prepare: true });
        await redis.del(`product:${productId}`);


        revalidatePath(`/dashboard/${storeId}/products/${productId}`);

        return {
            success: "Product updated successfully"
        }


        
    } catch (error) {
        console.log(error);
        return {
            error: "Something went wrong"
        }


    
        
    }

};



export const onDeleteProductThumbnail = async (imageUrl: string, productId: string, storeId: string) => {
    try {

        if(!imageUrl || !productId || !storeId) {
            return {
                error: "Invalid fields"
            }

        };

       const UPDATE_PRODUCT_IMAGE_QUERY = 'UPDATE product_by_seller SET images = images -  ? WHERE product_id = ?';
       const params = [[imageUrl], productId];


       await cassandraDb.execute(UPDATE_PRODUCT_IMAGE_QUERY, params, { prepare: true });

       await redis.del(`product:${productId}`);


       revalidatePath(`/dashboard/${storeId}/products/${productId}`);


       return {
        success: "Product updated successfully"
       }
        
    } catch (error) {
        console.log(error);
        return {
            error: "Something went wrong"
        }


    
        
    }

}


export const onAddSubCategory = async (subCategory: z.infer<typeof ProductNameSchema>, productId: string, storeId: string) => {

    try {

        const validatedFields = ProductNameSchema.safeParse(subCategory);
        if(!validatedFields.success) {
            return {
                error: "Invalid fields"
            }
        
        };

        const { 
            name 
           } = validatedFields.data;



           const UPDATE_PRODUCT_SUB_CATEGORY_QUERY = 'UPDATE product_by_seller SET subcategorys = subcategorys + ? WHERE product_id = ?';
           const params = [[ name]  , productId];
   
           await cassandraDb.execute(UPDATE_PRODUCT_SUB_CATEGORY_QUERY, params, { prepare: true });
           await redis.del(`product:${productId}`);

   
           revalidatePath(`/dashboard/${storeId}/products/${productId}`);
   
           return {
               success: "Product updated successfully"
           }
   






        
    } catch (error) {
        console.log(error);
        return {
            error: "Something went wrong"
        }


    
        
    }
};


export const onAddProductColor = async (values: z.infer<typeof ProductColorSchema >, productId: string, storeId: string) => {
    try {
        const validatedFields = ProductColorSchema.safeParse(values);
        if(!validatedFields.success) {
            return {
                error: "Invalid fields"
            }

        
        };


        const { color  } = validatedFields.data;
        console.log(color);

        const UPDATE_PRODUCT_COLOR_QUERY = 'UPDATE product_by_seller SET colors = colors + ? WHERE product_id = ?';
        const params = [[ color]  , productId];


        await cassandraDb.execute(UPDATE_PRODUCT_COLOR_QUERY, params, { prepare: true });
        await redis.del(`product:${productId}`);


        revalidatePath(`/dashboard/${storeId}/products/${productId}`);


        return {
            success: "Product updated successfully"
        }



        
    } catch (error) {
        console.log(error);
        return {
            error: "Something went wrong"
        }
        
    }

};


export const onAddToWarehouse = async (isPublished :boolean , productId: string, storeId: string ) => {
    try {

        const UPDATE_PRODUCT_DESC_QUERY = `UPDATE product_by_seller SET is_published = ? WHERE product_id = ?` ;
        const params = [isPublished, productId];

        await cassandraDb.execute(UPDATE_PRODUCT_DESC_QUERY, params, { prepare: true });
        await redis.del(`product:${productId}`);


        revalidatePath(`/dashboard/${storeId}/products/${productId}`);

        return {
             success: "Product updated successfully"
        }


        
    } catch (error) {
        console.log(error);
        return {
            error: "Something went wrong"
        }
        
    }
}
export const onRemoveFromWarehouse = async (isPublished :boolean , productId: string, storeId: string ) => {
    try {

        const UPDATE_PRODUCT_DESC_QUERY = `UPDATE product_by_seller SET is_published = ? WHERE product_id = ?` ;
        const params = [isPublished, productId];

        await cassandraDb.execute(UPDATE_PRODUCT_DESC_QUERY, params, { prepare: true });
        await redis.del(`product:${productId}`);



        revalidatePath(`/dashboard/${storeId}/products/${productId}`);

        return {
             success: "Product updated successfully"
        }


        
    } catch (error) {
        console.log(error);
        return {
            error: "Something went wrong"
        }
        
    }
};


export const deleteProduct = async (productId: string, storeId: string) => {

    try {
        const DELETE_PRODUCT_QUERY = `DELETE FROM product_by_seller WHERE product_id = ?`;
        const params = [productId];


        await cassandraDb.execute(DELETE_PRODUCT_QUERY, params, { prepare: true });
        await redis.del(`product:${productId}`);



        
        revalidatePath(`/dashboard/${storeId}/products`);
        revalidatePath(`/dashboard/${storeId}/products/${productId}`);

        return {
            success: "Product deleted successfully"
        }




        
    } catch (error) {
        console.log(error);
        return {
            error: "Something went wrong"
        }
        
    }
}