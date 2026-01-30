export type CategoryCreateType = {
    _id: string;
    categoryName: string;
    categoryImage: string;
    parentCategory: string;
    description: string;
    isActive: boolean;
};

export type CategoryResponseType = {
     _id: string;
    categoryName: string;
    parentCategory: string;
    categoryImage: string;
    description: string;
    isActive: boolean;
    success: boolean;
    msg: string;
};
