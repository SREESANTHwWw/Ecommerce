
import { CommonImage, Typography } from "../../../../../@All/AppForm/Form";
import { formatNumber } from "../../../../../@All/Functions/FormatNumber";
import StarRating from "../../../../../@All/Component/StarRating/StarRating ";
import FilteringProductSkeleton from "./FilteringProductSkeleton";
import TextLoadingRound from "../../../../../@All/Component/Loading/TextLoadingRound";
import AddtoCartButton from "../../../../../@All/Component/CommonButtons/AddtoCartButton";

const FilteringProduct = ({ products, isLoading, isFetching }: any) => {
  if (isLoading || isFetching) {
    return <FilteringProductSkeleton />;
  }

  return (
    <div className="flex justify-center items-center p-2 w-full mt-5">
      {products?.products?.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4 w-full">
          {products.products.map((product: any) => (
            <a
              target="_blank"
              key={product._id}
              href={`/viewproduct/${product._id}`}
              className="bg-white p-4 shadow rounded grid gap-3 hover:-translate-y-2 hover:scale-105 transition-all duration-300 "
            >
              <div className="flex justify-center">
                <CommonImage
                  src={product.productImage[0]}
                  alt={product.productName}
                  className="w-32 h-32 md:w-48 md:h-48 object-contain rounded"
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
  );
};

export default FilteringProduct;
