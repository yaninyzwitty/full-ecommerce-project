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
    isPublished: boolean;
    category: string;
    subCategorys: string[];
    colors: string[];
    size: string;
    images: string[];
    inStock: string;
    availablity: Record<string, number>;
    createdAt: string | Date;
    updatedAt: string | Date;

}


export type ProductTableData = {
    id: string;
    name: string;
    price: number;
    isPublished: boolean;
    category: string;
    // inStock: "In Stock" | "Out of stock" | 'Limited Quantity Available'; //availability
    createdAt: string | Date;
    // inventory: number;



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
}