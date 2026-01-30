
export type ProductCreateType = {
productName: string;
   productImages: File[] 
  productPrice: number;
  productOfferPrice: number;
  productCategory: string;
  productDescription: string;
  productdiscount: number;
  productQuantity: number;
  productUnit: string;
  productStock: number;
  productStatus: string;

};


export type ProductResponseType = {
  productName: string;
  productImage: string[]; 
  productPrice: number;
  productOfferPrice: number;
  productCategory: string;
  productDescription: string;
  productdiscount: number;
  productQuantity: number;
  productUnit: string;
  productStock: number;
  productStatus: string;
  success: boolean;
};
