import { useState } from "react";
import { FaEdit, FaTrash, FaChevronLeft, FaChevronRight, FaBox, FaTag } from "react-icons/fa";
import { useGetAllProductsQuery, useRemoveProductMutation } from "../ProductApi";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SearchFun } from "../../../../../../@All/Functions/SearchFun";
import { Typography } from "../../../../../../@All/AppForm/Form";
import FilteringProductSkeleton from "../../../../NAVbar/ShopAll/FilteringProduct/FilteringProductSkeleton";

const Cardview = ({ searchData }: any) => {
  const { isFetching, isLoading } = useGetAllProductsQuery();
  const [removeProduct] = useRemoveProductMutation();
  const navigate = useNavigate();

  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({});

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      removeProduct(id);
    }
  };

  const nextImage = (id: string, images: string[], e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => ({
      ...prev,
      [id]: ((prev[id] || 0) + 1) % images.length,
    }));
  };

  const prevImage = (id: string, images: string[], e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => ({
      ...prev,
      [id]: ((prev[id] || 0) - 1 + images.length) % images.length,
    }));
  };

  const FilterData = SearchFun(searchData);
  const sortedData = [...FilterData].sort((a, b) => a.productOrder - b.productOrder);

  if (isLoading || isFetching) return <FilteringProductSkeleton />;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Product Inventory</h1>
          <p className="text-gray-500 mt-1">Manage your store's products and stock levels.</p>
        </div>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        <AnimatePresence>
          {sortedData?.map((product: any, index: number) => {
            const images = product.productImage?.length > 0 ? product.productImage : ["/placeholder.png"];
            const currentIndex = currentImageIndex[product._id] || 0;

            return (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Image Section */}
                <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentIndex}
                      src={images[currentIndex]}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </AnimatePresence>

                  {/* Stock Badge */}
                  <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm z-10 ${
                    product.productStock > 0 ? "bg-green-500 text-white" : "bg-red-500 text-white"
                  }`}>
                    {product.productStock > 0 ? "In Stock" : "Out of Stock"}
                  </div>

                  {/* Image Navigation Arrows */}
                  {images.length > 1 && (
                    <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={(e) => prevImage(product._id, images, e)} className="p-2 bg-white/80 backdrop-blur-md rounded-full shadow hover:bg-white text-gray-800">
                        <FaChevronLeft size={12} />
                      </button>
                      <button onClick={(e) => nextImage(product._id, images, e)} className="p-2 bg-white/80 backdrop-blur-md rounded-full shadow hover:bg-white text-gray-800">
                        <FaChevronRight size={12} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <Typography className="text-lg font-bold text-gray-800 truncate leading-tight">
                      {product.productName}
                    </Typography>
                    <div className="flex items-center gap-1 text-blue-600 font-bold">
                      <span className="text-xs">₹</span>
                      <span className="text-xl">{product.productPrice}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 line-clamp-2 min-h-[40px] mb-4">
                    {product.productDescription}
                  </p>

                  <div className="flex items-center gap-4 text-xs font-medium text-gray-400 border-t pt-4">
                    <span className="flex items-center gap-1">
                      <FaBox className="text-gray-300" /> {product.productStock} left
                    </span>
                    <span className="flex items-center gap-1 uppercase tracking-tighter">
                      <FaTag className="text-gray-300" /> ID: {product._id.slice(-5)}
                    </span>
                  </div>

                  {/* Action Buttons Overlay / Footer */}
                  <div className="mt-5 flex gap-2">
                    <button
                      onClick={() => navigate(`/admin/edit/${product._id}`)}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-gray-200"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="w-12 flex items-center justify-center py-2.5 border border-red-100 text-red-500 rounded-xl hover:bg-red-50 hover:border-red-200 transition-colors"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Cardview;