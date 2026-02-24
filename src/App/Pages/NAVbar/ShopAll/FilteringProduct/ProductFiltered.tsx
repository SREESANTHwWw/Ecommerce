import { motion, AnimatePresence,  } from "framer-motion";
import type{ Variants } from "framer-motion";
import { CommonImage, Typography } from "../../../../../@All/AppForm/Form";
import { formatNumber } from "../../../../../@All/Functions/FormatNumber";
import StarRating from "../../../../../@All/Component/StarRating/StarRating ";
import FilteringProductSkeleton from "./FilteringProductSkeleton";
import TextLoadingRound from "../../../../../@All/Component/Loading/TextLoadingRound";
import AddtoCartButton from "../../../../../@All/Component/CommonButtons/AddtoCartButton";

// 1. Fix the Type issue by explicitly typing the variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring", // TS now knows this is a specific literal, not just any string
      stiffness: 100,
      duration: 0.4,
    }
  },
  hover: { 
    y: -8, 
    transition: { duration: 0.3, ease: "easeInOut" } 
  }
};

const FilteringProduct = ({ products, isLoading, isFetching }: any) => {
  if (isLoading || isFetching) {
    return <FilteringProductSkeleton />;
  }

  const productList = products?.products || [];

  return (
    <div className="p-4 w-full mt-5">
      <AnimatePresence mode="wait">
        {productList.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full"
          >
            {productList.map((product: any) => {
              // Logic for stock status
              const isOutOfStock = product.productStock <= 0;

              return (
                <motion.div
                  key={product._id}
                  variants={cardVariants}
                  whileHover="hover"
                  className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Stock Status Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm ${
                      isOutOfStock 
                        ? "bg-red-100 text-red-600" 
                        : "bg-green-100 text-green-600"
                    }`}>
                      {isOutOfStock ? "Out of Stock" : "In Stock"}
                    </span>
                  </div>

                  <a
                    href={`/viewproduct/${product._id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-square mb-4 overflow-hidden rounded-xl bg-gray-50 flex justify-center items-center">
                      <motion.div 
                        whileHover={{ scale: 1.05 }} 
                        transition={{ duration: 0.4 }}
                      >
                        <CommonImage
                          src={product.productImage[0]}
                          alt={product.productName}
                          className="w-40 h-40 md:w-52 md:h-52 object-contain"
                        />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <Typography className="text-lg font-bold truncate group-hover:text-[var(--main-web-color)] transition-colors">
                        {product.productName}
                      </Typography>

                      <div className="flex items-center gap-2">
                        <StarRating rating={product.averageRating} />
                        <span className="text-xs text-gray-400">
                          ({product.averageRating || 0})
                        </span>
                      </div>

                      <Typography className="text-sm text-gray-500 line-clamp-2 h-10">
                        {product.productDescription}
                      </Typography>

                      <div className="flex items-baseline justify-between pt-2">
                        <div className="flex flex-col ">
                          <span className="text-xs text-red-500 line-through">
                            Rs.{formatNumber(product.productOfferPrice)}
                          </span>
                          <Typography className="text-xl font-extrabold text-gray-900">
                            Rs.{formatNumber(product.productPrice)}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </a>

                  <div className="p-4 pt-0">
                    <AddtoCartButton product={product}  />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="flex flex-col justify-center items-center h-64"
          >
            <TextLoadingRound text="Product Not Found" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilteringProduct;