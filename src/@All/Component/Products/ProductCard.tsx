
import FilteringProductSkeleton from "../../../App/Pages/NAVbar/ShopAll/FilteringProduct/FilteringProductSkeleton";
import { CommonImage, Typography } from "../../AppForm/Form";
import StarRating from "../StarRating/StarRating ";
import { formatNumber } from "../../Functions/FormatNumber";
import AddtoCartButton from "../CommonButtons/AddtoCartButton";
import TextLoadingRound from "../Loading/TextLoadingRound";
import { useGetAllProductsQuery } from "../../../App/Pages/Admin/Tab/Products/ProductApi";


const ProductCard = () => {

     const {data:products, isLoading ,isFetching} = useGetAllProductsQuery()
  if (isLoading || isFetching) {
    return <FilteringProductSkeleton />;
  }
   const sliced = products?.products.slice(0,8)

  return (
    <div className="flex flex-col justify-center gap-10  items-center p-2 w-full mt-10">

       <div className="p-6">
        <Typography className="text-3xl font-bold">Fast Moving Products</Typography>
       </div>
       <div className="w-full flex justify-center">
           {products?.products?.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 p-3  gap-4 md:w-[80%]">
          {sliced?.map((product: any) => (
            <a
              target="_blank"
              key={product._id}
              href={`/viewproduct/${product._id}`}
            className="bg-white p-4 rounded-xl grid gap-3
           shadow-md hover:shadow-xl
           transition-all duration-300
           hover:-translate-y-2 hover:scale-105"

            >
              <div className="flex justify-center">
                <CommonImage
                  src={product.productImage[0]}
                  alt={product.productName}
                  className="w-32 h-32 md:w-48 md:h-48 object-contain rounded-2xl"
                />
              </div>

              <Typography className="text-xl">{product.productName}</Typography>

              <Typography className="text-sm md:text-md line-clamp-3 ">
                {product.productDescription}
              </Typography>

              <StarRating rating={product.averageRating} />

              <div className="flex justify-between">
                <Typography className="line-through text-red-600">
                  {formatNumber(product.productOfferPrice)}
                </Typography>
                <Typography className="text-[var(--main-web-color)]">
                  Rs.{formatNumber(product.productPrice)}
                </Typography>
              </div>

              <AddtoCartButton product={product} />
            </a>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          <TextLoadingRound text="Product Not Found" />
        </div>
      )}

       </div>
   
    </div>
  );
};

export default ProductCard;
