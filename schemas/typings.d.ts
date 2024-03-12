export type Seller = {
    name: string;
    userId: string;
    id: string;
    createdAt: string | Date;
    updatedAt: string | Date;
    storeId: string;
    description: string;
}



export type Combo = {
    value: string;

    label: string;
}


export type Product = {
    productId: string;
    name: string;
    description: string;
    storeId: string;
    price: number;
    inventory: number;
    isPublished: boolean;
    category: string;
    subCategorys: string[];
    stockLevel?: string;
    colors: string[];
    size: string;
    images: string[];
    inStock: "IN_STOCK" | "OUT_OF_STOCK" | "LIMITED_STOCK" | string;
    availablity: Record<string, number>;
    createdAt: string | Date;
    updatedAt: string | Date;

}


//  enum STOCK {
//     IN_STOCK = "IN_STOCK",
//     OUT_OF_STOCK = "OUT_OF_STOCK",
//     LIMITED_STOCK = "LIMITED_STOCK"

// }


export type ProductTableData = {
    id: string;
    inventory: string;
    name: string;

    productId?: string;
    price: number;
    // stockLevel?: string;
    isPublished: boolean;
    storeId?: string;
    category: string;
    inStock: string //availability
    createdAt: string | Date;



};


export type Category = {
    categoryId : string;
    name : string;
    isPublished: boolean;
    description: string;
    categoryThumbnail: string;
    tags: string[];
    starredCategories: string[];
    createdAt: string | Date;
    updatedAt: string | Date;
    remaining?: number;
}



type CategoryInProduct = {
    id: string;
    name: string;
    // remaining: number
}


export type SellerLocation = {
    sellerId: string;
    sellerName: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    latitude: number;
    longitude: number;
}


export type Store = {
    id: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    description: string
    name: string;
    storeId: string;
    userId :string;
    banner: string;
};