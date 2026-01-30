import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../Admin/Tab/Products/ProductApi";
import StarRating from "../../../@All/Component/StarRating/StarRating ";
import { CommonImage, Typography } from "../../../@All/AppForm/Form";
import RelatedProduct from "./RelatedProducts/RelatedProduct";
import AddtoCartButton from "../../../@All/Component/CommonButtons/AddtoCartButton";

const ViewProduct = () => {
  const { id } = useParams();

  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductByIdQuery(id ?? "", {
    refetchOnMountOrArgChange: true,
  });
  const [ProductImages, setProductImages] = useState(0);
  console.log(ProductImages);
  
 

  
  const item = products?.product;
  console.log(products);
  


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium">Loading product...</p>
      </div>
    );
  }

  if (isError || !item) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Product not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-2xl p-6">
  {/* Product Image Section */}
  <div className="flex flex-col md:flex-row gap-4 items-center">

    {/* Thumbnails */}
    <div className="flex md:flex-col gap-2 order-2 md:order-1">
      {item.productImage.map((img: string, index: number) => (
        <CommonImage

         key={`${id}-${index}`}
          src={img}
          onClick={() => setProductImages(index)}
          className={`w-14 h-14 md:w-20 md:h-20 object-cover rounded cursor-pointer 
            ${ProductImages === index ? "border-2 border-black" : "border"}`}
        />
      ))}
    </div>

    {/* Main Image */}
    <div className="order-1 md:order-2 w-full flex justify-center">
      <CommonImage
       key={`${id}-${ProductImages}`}
        src={item.productImage[ProductImages]|| item.productImage?.[0]}
        alt={item.productName}
        className="w-full max-w-md h-[280px] md:h-[480px] object-cover rounded-xl"
      />
    </div>
  </div>

  {/* Product Info */}
  <div className="flex flex-col gap-4">
    <Typography className="text-2xl md:text-3xl font-bold text-gray-800">
      {item.productName}
    </Typography>

    <p className="text-sm text-gray-500">
      Category: {item.productCategory}
    </p>

    <div className="flex items-center gap-4">
      <Typography className="text-xl line-through text-red-600">
        ₹ {item.productOfferPrice}
      </Typography>
      <Typography className="text-2xl font-semibold text-[var(--main-web-color)]">
        ₹ {item.productPrice}
      </Typography>
    </div>

    <StarRating rating={item.averageRating} />

    <Typography className="text-gray-600">
      {item.productDescription}
    </Typography>

    <Typography
      className={`font-medium ${
        item.productStock > 0 ? "text-green-600" : "text-red-500"
      }`}
    >
      {item.productStock > 0 ? "In Stock" : "Out of Stock"}
    </Typography>

    {/* Buttons */}
    <div className="flex flex-col sm:flex-row gap-4 mt-4">
      <AddtoCartButton className="w-full sm:w-[40%]" product={item} />
      <button className="w-full sm:w-[40%] border border-black px-6 py-3 rounded-xl hover:bg-gray-100 transition">
        Buy Now
      </button>
    </div>
  </div>
</div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Related Products</h2>
        <RelatedProduct products={products} />
      </div>
    </div>
  );
};

export default ViewProduct;
