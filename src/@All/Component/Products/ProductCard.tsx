import FilteringProductSkeleton from "../../../App/Pages/NAVbar/ShopAll/FilteringProduct/FilteringProductSkeleton";
import { CommonImage, Typography } from "../../AppForm/Form";
import StarRating from "../StarRating/StarRating ";
import { formatNumber } from "../../Functions/FormatNumber";
import AddtoCartButton from "../CommonButtons/AddtoCartButton";
import TextLoadingRound from "../Loading/TextLoadingRound";
import { useGetAllProductsQuery } from "../../../App/Pages/Admin/Tab/Products/ProductApi";
import { motion,  } from "framer-motion";
import type { Variants } from "framer-motion";
import { Snowflake, Heart } from "lucide-react";
import "../../../App.css";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

const ProductCard = () => {
  const { data: products, isLoading, isFetching } = useGetAllProductsQuery();

  if (isLoading || isFetching) {
    return <FilteringProductSkeleton />;
  }

  const sliced = products?.products?.slice(0, 8);

  return (
    <div className="bg-[var(--main-bg-color)] py-12 md:py-20 w-full min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 mb-3"
          >
            <Snowflake className="text-[var(--main-web-color)] animate-spin-slow" size={18} />
            <Typography className="text-[var(--main-web-color)] font-black uppercase tracking-[0.3em] text-[10px]">
              Artisanal Selection
            </Typography>
          </motion.div>
          <Typography className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            Fast Moving Flavors
          </Typography>
          <div className="h-1.5 w-20 bg-[var(--main-web-color)] rounded-full mt-4" />
        </div>

        {products?.products?.length > 0 ? (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
         
            className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8"
          >
            {sliced?.map((product: any) => (
              <motion.div
                key={product._id}
                variants={cardVariants}
                className="group relative bg-white rounded-[1.8rem] md:rounded-[2.5rem] p-3 md:p-5 shadow-sm border border-slate-50 hover:shadow-[0_25px_60px_rgba(0,0,0,0.06)] transition-all duration-500 flex flex-col h-full"
              >
              
                <a 
                  href={`/viewproduct/${product._id}`} 
                  className="relative aspect-square overflow-hidden rounded-[1.4rem] md:rounded-[2rem] bg-gradient-to-br from-blue-50/50 to-pink-50/50 block"
                >
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: 3 }}
                    className="w-full h-full flex justify-center items-center p-4 md:p-6"
                  >
                    <CommonImage
                      src={product.productImage[0]}
                      alt={product.productName}
                      className="w-full h-full object-contain drop-shadow-xl"
                    />
                  </motion.div>

                  <div className="absolute top-3 left-3">
                    <div className="bg-white/80 backdrop-blur-md p-1.5 md:p-2 rounded-xl text-pink-400 hover:bg-pink-400 hover:text-white transition-all shadow-sm">
                      <Heart size={14} className="md:w-4 md:h-4" />
                    </div>
                  </div>
                </a>

              
                <div className="mt-4 md:mt-6 flex flex-col flex-grow space-y-2 md:space-y-3">
                  <div className="flex flex-col">
                    <Typography className="text-[10px] font-bold text-[var(--main-web-color)] uppercase tracking-widest mb-1">
                      {product.productCategory || "Classic Scoop"}
                    </Typography>
                    <Typography className="text-sm md:text-lg font-black text-slate-800 line-clamp-1 group-hover:text-[var(--main-web-color)] transition-colors">
                      {product.productName}
                    </Typography>
                  </div>

                  <div className="flex items-center gap-1">
                    <StarRating rating={product.averageRating} />
                    <span className="text-[10px] text-slate-400 font-bold hidden md:inline">({product.averageRating})</span>
                  </div>

             
                  <div className="pt-2 mt-auto border-t border-slate-50 flex flex-col gap-3">
                    <div className="flex items-baseline justify-between">
                      <div className="flex flex-col">
                        <Typography className="text-[10px] line-through text-slate-300 font-bold">
                          ₹{formatNumber(product.productOfferPrice)}
                        </Typography>
                        <Typography className="text-lg md:text-2xl font-black text-slate-900 leading-none">
                          ₹{formatNumber(product.productPrice)}
                        </Typography>
                      </div>
                      
                    
                      <div className="hidden lg:block">
                        <AddtoCartButton product={product} className="!w-12 !h-12 !p-0 !rounded-2xl" text="" />
                      </div>
                    </div>

              
                    <div className="lg:hidden">
                       <AddtoCartButton 
                        product={product} 
                        className="w-full !py-2.5 !rounded-xl"
                        text="Add" 
                       />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="flex justify-center items-center py-20">
            <TextLoadingRound text="Chilling the scoops..." />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;