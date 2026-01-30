import  { useState } from "react";
import { FaEdit, FaTrash, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import {
  useGetAllProductsQuery,
  useRemoveProductMutation,
} from "../ProductApi";
import { useNavigate } from "react-router-dom";
import { SearchFun } from "../../../../../../@All/Functions/SearchFun";
import { Typography } from "../../../../../../@All/AppForm/Form";
import FilteringProductSkeleton from "../../../../NAVbar/ShopAll/FilteringProduct/FilteringProductSkeleton";


const Cardview = ({  searchData }: any) => {
  const { isFetching,isLoading } = useGetAllProductsQuery();
  const [removeProduct] = useRemoveProductMutation();
  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      removeProduct(id);
    }
  };

  // Slideshow state per card
  const [currentImageIndex, setCurrentImageIndex] = useState<{
    [key: string]: number;
  }>({});

  const prevImage = (id: string, images: string[]) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [id]: prev[id] === 0 ? images.length - 1 : (prev[id] || 0) - 1,
    }));
  };

  const nextImage = (id: string, images: string[]) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [id]: prev[id] === images.length - 1 ? 0 : (prev[id] || 0) + 1,
    }));
  };

  const FilterData = SearchFun(searchData);
  const sortedData = [...FilterData].sort(
    (a, b) => a.productOrder - b.productOrder
  );
      if (isLoading || isFetching) {
    return <FilteringProductSkeleton />;
  }


  return (
    <div className="p-6">
    
      <Typography className="text-2xl font-bold mb-4">
        Product Cards
      </Typography>

 
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {sortedData?.map((product: any) => {
          const images = product.productImage || ["/placeholder.png"];
          const currentIndex = currentImageIndex[product._id] || 0;

          return (
            <div
              key={product._id}
              className="border rounded-xl shadow-md hover:shadow-lg transition p-4 bg-white cursor-pointer"
            >
           
              <div className="relative w-full h-40 overflow-hidden rounded-lg">
                <img
                  src={images[currentIndex]}
                  alt={product.productName}
                  className="w-full h-full object-cover"
                />

                {images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage(product._id, images);
                      }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
                    >
                      <FaArrowLeft size={12} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage(product._id, images);
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
                    >
                      <FaArrowRight size={12} />
                    </button>
                  </>
                )}
              </div>

           
              <div className="mt-3 flex flex-col gap-1">
                <Typography className="text-lg font-semibold">
                  {product.productName}
                </Typography>

                <Typography className="text-sm text-gray-500 line-clamp-2">
                  {product.productDescription}
                </Typography>

                <Typography className="text-lg font-bold mt-1">
                  ₹{product.productPrice}
                </Typography>

                <Typography className="text-sm text-gray-600">
                  Stock: {product.productStock}
                </Typography>
              </div>

            
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/admin/edit/${product._id}`);
                  }}
                  className="flex items-center gap-2 bg-yellow-500 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-yellow-600"
                >
                  <FaEdit size={14} />
                  <Typography>Edit</Typography>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(product._id);
                  }}
                  className="flex items-center gap-2 bg-red-700 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-red-600"
                >
                  <FaTrash size={14} />
                  <Typography>Delete</Typography>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cardview;
