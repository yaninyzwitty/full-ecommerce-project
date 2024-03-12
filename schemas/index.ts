import * as z from 'zod';

export const formSchema = z.object({
    name: z.string().min(2).max(50),
    description: z.string().min(2).max(500),
  });
export const nameSchema = z.object({
    name: z.string().min(2).max(50),
  });

export const CategoryNameSchema = z.object({
    name: z.string().min(2).max(50),
  });




  export const ProductNameSchema = z.object({
    name: z.string().min(2).max(50)
  })
  export const ProductDescriptionSchema = z.object({
    description: z.string().min(2).max(500)
  });

  export const ProductPriceSchema = z.object({
    price: z.number().min(1)
  })
  export const ProductCategorySchema = z.object({
    category: z.string().min(2).max(50)
  });



  export const ProductImageSchema = z.object({
    imageUrl: z.string()
  })






  export const AddProductFormSchema = z.object({
    name: z.string().min(2).max(50),
    description: z.string().min(2).max(500),
    price: z.string(),
    category: z.string().min(2).max(50),
    subCategory: z.optional(z.string().min(2).max(50)),
    color: z.optional(z.string().min(2).max(50)),
    size: z.optional(z.string().min(2).max(50)),
    images: z.array(z.string()),
  })




  export const ProductColorSchema = z.object({
    color: z.string()
  })


  export const CategoryDescriptionSchema = z.object({
    description: z.string().min(2).max(500, {
      message: "Description must be at least 2 characters long, less than 500 characters"
    })
  });



  export const CategoryThumbnailSchema = z.object({
    thumbnailUrl: z.string()
  });


  

  export const CategoryTagsSchema = z.object({
    tag: z.string().min(2).max(30, {
      message: "Tag must be at least 2 characters long, less than 30 characters"
    
    })

  })


  export const FormSchema = z.object({
    country: z.string({
      required_error: "Please select a country.",
    }),
    cityData: z.string({
      required_error: "Please select a state.",
    }),
  
    city: z.string({
      required_error: "Please select a city.",
    }),
  });


  export const ProductInventorySchema = z.object({
    inventory: z.number()
  })

  export const ProductStockSchema = z.object({
    inStock: z.string()
  })




  export const StoreNameSchema = z.object({
    storeName: z.string().min(2).max(50)
  })
  export const StoreDescriptionSchema = z.object({
    storeDesc: z.string().min(2).max(500)
  })