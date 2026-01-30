import { useNavigate } from "react-router-dom";
import { CommonImage, Typography } from "../../../../@All/AppForm/Form";
import StarRating from "../../../../@All/Component/StarRating/StarRating ";
import SearchSkeleton from "./SearchSkeleton";
import TextLoadingRound from "../../../../@All/Component/Loading/TextLoadingRound";

const SearchedProducts = ({ filteredProducts, isLoading,setSearchTab }: any) => {

  const handleViewProduct = (id:any)=>{
        setSearchTab(false)
        navigate(`/viewproduct/${id}`)

  }
  const navigate = useNavigate()
  if (isLoading) {
    return (
      <div className="w-full max-w-3xl mx-auto h-[100vh] overflow-y-auto">
        
        <SearchSkeleton />
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="w-full flex justify-center items-center max-w-3xl mx-auto h-[100vh] overflow-y-auto">
         <TextLoadingRound text="Product Not Found"  />
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto h-[100vh] overflow-y-auto">
      <div className="bg-white p-4 gap-3 grid md:grid-cols-2 grid-cols-1">
        {filteredProducts.map((product: any) => (
          <div
            key={product._id}
            onClick={()=>handleViewProduct(product._id)}
            className="grid grid-cols-2  gap-2 rounded-lg p-2 bg-[var(--main-bg-color)] shadow cursor-pointer"
          >
            <div className="flex justify-center  w-full"> 
                 <CommonImage
              className="w-32 h-32 rounded-2xl object-cover"
              src={product.productImage[0]}
              alt={product.productName}
            />

            </div>
         
            <div className="flex flex-col gap-4">
              <Typography className="md:text-lg text-md font-bold">{product.productName}</Typography>
              <Typography className="text-xs line-clamp-4">{product.productDescription}</Typography>
                <StarRating rating={product.averageRating} />

              <div className="flex gap-3">
                <Typography className="text-md text-red-600 line-through">
                  {product.productOfferPrice}
                </Typography>
                <Typography className="text-md text-[var(--main-web-color)]">
                  Price: ₹{product.productPrice}
                </Typography>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchedProducts;
